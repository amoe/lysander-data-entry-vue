export interface AggregatedForm {
    date: Date,
    codenames: OperationCodename[],
    persons: Person[],
    locations: Location[]
    extraEvents: ExtraEvent[]
}

export interface Location {
    content: string;
}

export enum Role {
    Agent = "agent"
}


export interface Person {
    name: string;
    role: Role | null;
}

// Really it should just be a string, but Vue wants an object.
export interface OperationCodename {
    content: string;
};

export interface ExtraEvent {
    content: string;
}

// Stupid hack to make webpack reload the interfaces properly
export const INTERFACES_FILE_VERSION = 1;
