/// Holds the dotvvm viewmodel

import { createArray, isPrimitive, keys } from "./utils/objects";
import { DotvvmEvent } from "./events";
import { extendToObservableArrayIfRequired } from "./serialization/deserialize"
import { areObjectTypesEqual, getObjectTypeInfo } from "./metadata/typeMap";
import { coerce } from "./metadata/coercer";
import { patchViewModel } from "./postback/updater";
import { wrapObservable } from "./utils/knockout";
import { logWarning } from "./utils/logging";
import { observable } from "knockout";
import {ValidationError} from "./validation/error";
import { errorsSymbol } from "./validation/common";


export const currentStateSymbol = Symbol("currentState")
export const notifySymbol = Symbol("notify")
export const lastSetErrorSymbol = Symbol("lastSetError")

const internalPropCache = Symbol("internalPropCache")
const updateSymbol = Symbol("update")
const updatePropertySymbol = Symbol("updateProperty")

let isViewModelUpdating: boolean = false;

export function getIsViewModelUpdating() {
    return isViewModelUpdating;
}

export type UpdatableObjectExtensions<T> = {
    [notifySymbol]: (newValue: T) => void
    [currentStateSymbol]: T
    [updateSymbol]?: UpdateDispatcher<T>
}

type RenderContext<TViewModel> = {
    // timeFromStartGetter: () => number
    // secondsTimeGetter: () => Date
    update: (updater: StateUpdate<TViewModel>) => void
    dataContext: TViewModel
    parentContext?: RenderContext<any>
    // replacableControls?: { [id: string] : RenderFunction<any> }
    "@extensions"?: { [name: string]: any }
}
// type RenderFunction<TViewModel> = (context: RenderContext<TViewModel>) => virtualDom.VTree;
class TwoWayBinding<T> {
    constructor(
        public readonly update: (updater: StateUpdate<T>) => void,
        public readonly value: T
    ) { }
}

export class StateManager<TViewModel extends { $type?: TypeDefinition }> {
    public readonly stateObservable: DeepKnockoutObservable<TViewModel>;
    private _state: DeepReadonly<TViewModel>
    public get state() {
        return this._state
    }
    private _isDirty: boolean = false;
    public get isDirty() {
        return this._isDirty
    }
    private _currentFrameNumber : number | null = 0;

    constructor(
        initialState: DeepReadonly<TViewModel>,
        public stateUpdateEvent: DotvvmEvent<DeepReadonly<TViewModel>>
    ) {
        this._state = coerce(initialState, initialState.$type || { type: "dynamic" })
        this.stateObservable = createWrappedObservable(initialState, (initialState as any)["$type"], u => this.update(u as any))
        this.dispatchUpdate()
    }

    public dispatchUpdate() {
        if (!this._isDirty) {
            this._isDirty = true;
            this._currentFrameNumber = window.requestAnimationFrame(this.rerender.bind(this))
        }
    }

    public doUpdateNow() {
        if (this._currentFrameNumber !== null)
            window.cancelAnimationFrame(this._currentFrameNumber);
        this.rerender(performance.now());
    }

    private rerender(time: number) {
        this._isDirty = false

        try {
            isViewModelUpdating = true
            ko.delaySync.pause()

            this.stateUpdateEvent.trigger(this._state);

            (this.stateObservable as any)[notifySymbol as any](this._state)
        } finally {
            try {
                ko.delaySync.resume()
            } finally {
                isViewModelUpdating = false
            }
        }
        //logInfoVerbose("New state dispatched, t = ", performance.now() - time, "; t_cpu = ", performance.now() - realStart);
    }

    public setState(newState: DeepReadonly<TViewModel>): DeepReadonly<TViewModel> {
        if (compileConstants.debug && newState == null) throw new Error("State can't be null or undefined.")
        if (newState === this._state) return newState

        const type = newState.$type || this._state.$type

        const coercionResult = coerce(newState, type!, this._state)

        this.dispatchUpdate();
        return this._state = coercionResult
    }

    public patchState(patch: Partial<TViewModel>): DeepReadonly<TViewModel> {
        return this.setState(patchViewModel(this._state, patch))
    }

    public update(updater: StateUpdate<TViewModel>) {
        return this.setState(updater(this._state))
    }
}

class FakeObservableObject<T extends object> implements UpdatableObjectExtensions<T> {
    public [currentStateSymbol]: T
    public [errorsSymbol]: Array<ValidationError>
    public [updateSymbol]: UpdateDispatcher<T>
    public [notifySymbol](newValue: T) {
        console.assert(newValue)
        this[currentStateSymbol] = newValue

        const c = this[internalPropCache]
        for (const p of keys(c)) {
            const observable = c[p]
            if (observable) {
                observable[notifySymbol]((newValue as any)[p])
            }
        }
    }
    public [internalPropCache]: { [name: string]: (KnockoutObservable<any> & UpdatableObjectExtensions<any>) | null } = {}

    public [updatePropertySymbol](propName: keyof DeepReadonly<T>, valUpdate: StateUpdate<any>) {
        this[updateSymbol](vm => {
            if(vm==null)
                return vm
            const newValue = valUpdate(vm[propName])
            if (vm[propName] === newValue)
                return vm
            return Object.freeze({ ...vm, [propName]: newValue }) as any
        })
    }
    constructor(initialValue: T, updater: UpdateDispatcher<T>, typeId: TypeDefinition, typeInfo: ObjectTypeMetadata | undefined, additionalProperties: string[]) {
        this[currentStateSymbol] = initialValue
        this[updateSymbol] = updater
        this[errorsSymbol] = []
        for (const p of keys(typeInfo?.properties || {}).concat(additionalProperties)) {
            this[internalPropCache][p] = null

            Object.defineProperty(this, p, {
                enumerable: true,
                configurable: false,
                get() {
                    const cached = this[internalPropCache][p]
                    if (cached) return cached

                    const currentState = this[currentStateSymbol]
                    const newObs = createWrappedObservable(
                        currentState[p],
                        typeInfo?.properties[p]?.type,
                        u => this[updatePropertySymbol](p, u)
                    )

                    const isDynamic = typeId === undefined || typeId.hasOwnProperty("type") && (typeId as any)["type"] === "dynamic";
                    if (typeInfo && p in typeInfo.properties) {
                        const clientExtenders = typeInfo.properties[p].clientExtenders;
                        if (clientExtenders) {
                            for (const e of clientExtenders) {
                                (ko.extenders as any)[e.name](newObs, e.parameter)
                            }
                        }
                    } else if (!isDynamic && p.indexOf("$") !== 0) {
                        logWarning("state-manager", `Unknown property '${p}' set on an object of type ${typeId}.`);
                    }

                    this[internalPropCache][p] = newObs
                    return newObs
                }
            })
        }
        Object.seal(this)
    }
}

/**
 * Recursively unwraps knockout observables from the object / array hierarchy. When nothing needs to be unwrapped, the original object is returned.
 * @param allowStateUnwrap Allows accessing [currentStateSymbol], which makes it faster, but doesn't register in the knockout dependency tracker
*/
export function unmapKnockoutObservables(viewModel: any, allowStateUnwrap: boolean = false): any {
    const value = ko.unwrap(viewModel)

    if (isPrimitive(value)) {
        return value
    }

    if (value instanceof Date) {
        // return serializeDate(value)
        return value
    }

    if (allowStateUnwrap && currentStateSymbol in value) {
        return value[currentStateSymbol]
    }

    if (value instanceof Array) {
        let result: any = null
        for (let i = 0; i < value.length; i++) {
            const unwrappedItem = unmapKnockoutObservables(ko.unwrap(value[i]), allowStateUnwrap)
            if (unwrappedItem !== value[i]) {
                result ??= [...value]
                result[i] = unwrappedItem
            }
        }
        return result ?? value
    }

    let result: any = null;
    for (const prop of keys(value)) {
        const v = ko.unwrap(value[prop])
        if (typeof v != "function") {
            const unwrappedProp = unmapKnockoutObservables(v, allowStateUnwrap)
            if (unwrappedProp !== value[prop]) {
                result ??= { ...value }
                result[prop] = unwrappedProp
            }
        }
    }
    return result ?? value
}

function createObservableObject<T extends object>(initialObject: T, typeHint: TypeDefinition | undefined, update: ((updater: StateUpdate<any>) => void)) {
    const typeId = (initialObject as any)["$type"] || typeHint
    let typeInfo;
    if (typeId && !(typeId.hasOwnProperty("type") && typeId["type"] === "dynamic")) {
        typeInfo = getObjectTypeInfo(typeId)
    }

    const pSet = new Set(keys(typeInfo?.properties ?? {}));
    const additionalProperties = keys(initialObject).filter(p => !pSet.has(p))

    return new FakeObservableObject(initialObject, update, typeId, typeInfo, additionalProperties) as FakeObservableObject<T> & DeepKnockoutObservableObject<T>
}

/** Informs that we cloned an ko.observable, so updating it won't work */
function logObservableCloneWarning(value: any) {
    function findClonedObservable(value: any, path: string): [string, any] | undefined {
        // find observable not created by dotvvm
        if (!value[notifySymbol] && ko.isObservable(value)) {
            return [path, value]
        }
        value = ko.unwrap(value)
        if (isPrimitive(value)) return;
        if (value instanceof Array) {
            for (let i = 0; i < value.length; i++) {
                const result = findClonedObservable(value[i], path + "/" + i)
                if (result) return result
            }
        }
        if (typeof value == "object") {
            for (const p of keys(value)) {
                const result = findClonedObservable(value[p], path + "/" + p)
                if (result) return result
            }
        }
    }

    const foundObservable = findClonedObservable(value, "")
    if (foundObservable) {
        logWarning("state-manager", `Replacing old knockout observable with a new one, just because it is not created by DotVVM. Please do not assign objects with knockout observables into the knockout tree directly. Observable is at ${foundObservable[0]}, value =`, unmapKnockoutObservables(foundObservable[1], true))
    }
}

function createWrappedObservable<T>(initialValue: DeepReadonly<T>, typeHint: TypeDefinition | undefined, updater: UpdateDispatcher<T>): DeepKnockoutObservable<T> {

    let isUpdating = false

    function triggerLastSetErrorUpdate(obs: KnockoutObservable<T>) {
        obs.valueHasMutated && obs.valueHasMutated();
    }

    function observableValidator(this: KnockoutObservable<T>, newValue: any): any {
        if (isUpdating) return { newValue, notifySubscribers: false }
        updatedObservable = true

        try {
            const notifySubscribers = (this as any)[lastSetErrorSymbol];
            (this as any)[lastSetErrorSymbol] = void 0;

            const unmappedValue = unmapKnockoutObservables(newValue);
            if (compileConstants.debug && unmappedValue !== newValue) {
                logObservableCloneWarning(newValue)
            }

            const oldValue = obs[currentStateSymbol];
            const coerceResult = coerce(unmappedValue, typeHint || { type: "dynamic" }, oldValue);

            updater(_ => coerceResult);
            const result = notifyCore(coerceResult, oldValue, true);

            return { newValue: result!.newContents, notifySubscribers };

        } catch (err) {
            (this as any)[lastSetErrorSymbol] = err;
            triggerLastSetErrorUpdate(this);
            logWarning("state-manager", `Cannot update observable to ${newValue}:`, err)
            throw err
        }
    }

    const obs = initialValue instanceof Array ? ko.observableArray([], observableValidator) : ko.observable(null, observableValidator) as any
    let updatedObservable = false

    function notify(newVal: any) {
        const currentValue = obs[currentStateSymbol]

        if (newVal === currentValue) {
            return
        }

        const observableWasSetFromOutside = updatedObservable
        updatedObservable = false

        obs[lastSetErrorSymbol] = void 0;
        obs[currentStateSymbol] = newVal

        const result = notifyCore(newVal, currentValue, observableWasSetFromOutside);
        if (result && "newContents" in result) {
            try {
                isUpdating = true
                obs(result.newContents)
            }
            finally {
                isUpdating = false
            }
        }
    }

    function notifyCore(newVal: any, currentValue: any, observableWasSetFromOutside: boolean) {
        let newContents
        const oldContents = obs.peek()
        if (isPrimitive(newVal) || newVal instanceof Date) {
            // primitive value
            newContents = newVal
        }
        else if (newVal instanceof Array) {
            extendToObservableArrayIfRequired(obs)

            // when the observable is updated from the outside, we have to rebuild it to make sure that it contains
            // notifiable observables
            // otherwise, we want to skip the big update whenever possible - Knockout tends to update everything in the DOM when
            // we update the observableArray
            const skipUpdate = !observableWasSetFromOutside && oldContents instanceof Array && oldContents.length == newVal.length

            if (!skipUpdate) {
                // take at most newVal.length from the old value
                newContents = oldContents instanceof Array ? oldContents.slice(0, newVal.length) : []
                // then append (potential) new values into the array
                for (let index = 0; index < newVal.length; index++) {
                    if (newContents[index] && newContents[index][notifySymbol as any]) {
                        continue
                    }
                    const indexForClosure = index
                    newContents[index] = createWrappedObservable(newVal[index], Array.isArray(typeHint) ? typeHint[0] : void 0, update => updater((viewModelArray: any) => {
                        if (viewModelArray == null || viewModelArray.length <= indexForClosure) {
                            // the item or the array does not exist anymore
                            return viewModelArray
                        }
                        const newElement = update(viewModelArray[indexForClosure])
                        const newArray = createArray(viewModelArray)
                        newArray[indexForClosure] = newElement
                        return Object.freeze(newArray) as any
                    }))
                }
            }
            else {
                newContents = oldContents
            }

            // notify child objects
            for (let index = 0; index < newContents.length; index++) {
                newContents[index][notifySymbol as any](newVal[index])
            }

            if (skipUpdate) {
                return
            }
        }
        else if (!observableWasSetFromOutside && oldContents && oldContents[notifySymbol] && areObjectTypesEqual(currentValue, newVal)) {
            // smart object, supports the notification by itself
            oldContents[notifySymbol as any](newVal)

            // don't update the observable itself (the object itself doesn't change, only its properties)
            return
        }
        else {
            // create new object and replace
            newContents = createObservableObject(newVal, typeHint, updater)
        }

        // return a result indicating that the observable needs to be set
        return { newContents };
    }

    obs[notifySymbol] = notify
    notify(initialValue)

    Object.defineProperty(obs, "state", {
        get: () => {
            let resultState
            updater(state => {
                resultState = state
                return state
            })
            return resultState
        },
        configurable: false
    });
    Object.defineProperty(obs, "patchState", {
        get: () => (patch: any) => {
            updater(state => patchViewModel(state, patch))
        },
        configurable: false
    });
    Object.defineProperty(obs, "setState", {
        get: () => (newState: any) => {
            updater(_ => newState);
        },
        configurable: false
    });
    Object.defineProperty(obs, "updater", {
        get: () => updater,
        configurable: false
    });
    return obs
}

