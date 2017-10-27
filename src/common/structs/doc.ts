import { Time } from "./basic";

/**
 * Main API Return
 */
export interface TopLevel<T extends Meta = {}, K extends Includes = {}> {
    meta?: T;
    includes?: K;
}

export interface CollectionDoc<
    T extends Resource,
    K extends Meta = {},
    P extends Includes = {}
> extends TopLevel<K, P> {
    data: T[];
}

export interface SingleDoc<
    T extends Resource | string,
    K extends Meta = {},
    P extends Includes = {}
> extends TopLevel<K, P> {
    data: T;
}

export interface Resource<T extends Meta = {}> {
    id: ResourceId;
    meta?: T;
}

export interface Meta {
    [key: string]: any;
}

export interface Includes {
    [key: string]: {
        [key: string]: Resource | any;
    };
}

/**
 * A unique identifier for resources
 */
export type ResourceId = string;

export interface ResourceEvents {
    created?: Time;
    updated?: Time;
    deleted?: Time;
}

export interface ResourceState<T extends string = ""> {
    current: T;
    changed: Time;
    job: JobInfo;
    error?: ResourceError;
}

export interface ResourceError {
    message: string;
    time: Time;
    block: boolean;
}

export interface JobInfo {
    id: string;
    queued: Time;
    queue: string;
}
