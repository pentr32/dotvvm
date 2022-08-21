﻿interface KnockoutStatic {
    delaySync: KnockoutDelaySync;
}
interface KnockoutDelaySync {
    pause(): void;
    isPaused: boolean;
    resume(): void;
    run(action: () => void): void;
}

interface KnockoutUtils {
    cloneNodes<T extends Node>(nodesArray: T[], shouldCleanNodes?: boolean): T[];
}

interface KnockoutObservableStatic {
    <T>(value?: T | null, validator?: (newValue: T[]) => void): KnockoutObservable<T>;
}
interface KnockoutObservableArrayStatic {
    <T>(value?: T[] | null, validator?: (newValue: T[]) => void): KnockoutObservableArray<T>;
}

interface KnockoutObservable<T> {
    readonly state?: T;
    patchState?(patch: any): void;
    setState?(newState: any): void;
    readonly updater?: UpdateDispatcher<T>;
}