import { keys } from "../utils/objects";


let types: TypeMap = {};

export function getTypeInfo(typeId: string): TypeMetadata {
    var result = types[typeId];
    if (!result) {
        throw new Error(`Cannot find type metadata for '${typeId}'!`);
    }
    return result;
}

export function getObjectTypeInfo(typeId: string): ObjectTypeMetadata {
    const typeInfo = getTypeInfo(typeId);
    if (typeInfo.type !== "object") {
        throw `Cannot convert object to an enum type ${typeId}!`;
    }
    return typeInfo;
}

export function getKnownTypes() {
    return keys(types);
}

export function updateTypeInfo(newTypes: TypeMap | undefined) {
    types = { ...types, ...newTypes };
}

export function replaceTypeInfo(newTypes: TypeMap | undefined) {
    types = newTypes || {};
}

export function areObjectTypesEqual(currentValue: any, newVal: any): boolean {
    if (currentValue["$type"] && currentValue["$type"] === newVal["$type"]) {
        // objects with type must have a same type
        return true;
    }
    else if (!currentValue["$type"] && !newVal["$type"]) {
        // dynamic objects must have the same properties
        let currentValueKeys = keys(currentValue);
        let newValKeys = keys(newVal);
        return currentValueKeys.length == newValKeys.length &&
            new Set([...currentValueKeys, ...newValKeys]).size == currentValueKeys.length;
    }
    return false;
}
