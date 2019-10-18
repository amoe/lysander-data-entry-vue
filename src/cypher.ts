interface QueryRegistry {
    [key: string]: string;
};

export const QUERY_DEFINITIONS: QueryRegistry = {
    createPerson: "CREATE (p:Person {name: {name}})"
};
