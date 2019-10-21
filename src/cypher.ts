interface QueryRegistry {
    [key: string]: string;
};

const CREATE_ALIAS_CONTEXT = `
MATCH (p:Person {id: {personId}}),
      (a:Alias {id: {aliasId}}),
      (f:Flight {id: {flightId}})
CREATE (ac:AliasContext {id: {id}}),
       (p)-[:HAS_ALIAS_CONTEXT]->(ac),
       (ac)-[:POINTS_TO]->(a),
       (ac)-[:IN_CONTEXT]->(f);
`;

export const QUERY_DEFINITIONS: QueryRegistry = {
    createPerson: "CREATE (p:Person {name: {name}, id: {id}})",
    createFlight: "CREATE (f:Flight {date: {date}, names: {codenames}, id: {flightId}})",
    createAlias: "CREATE (a:Alias {alias: {alias}, id: {id}})",
    createAliasContext: CREATE_ALIAS_CONTEXT,
    txSemanticsTester1: "CREATE (p:Person {id: 1})",
    txSemanticsTester2: "MATCH (p:Person {id: 1}) RETURN p.id"    // need to test case
};
