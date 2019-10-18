interface QueryRegistry {
    [key: string]: string;
};

export const QUERY_DEFINITIONS: QueryRegistry = {
    createPerson: "CREATE (p:Person {name: {name}})",
    createFlight: "CREATE (f:Flight {date: {date}, names: {codenames}})"
};
