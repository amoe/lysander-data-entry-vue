// canned-statements

export interface CannedStatement {
    getCypher(): string;
    getParameters(): object;
}


export class FuzzySearchStatement implements CannedStatement {
    constructor() {
    }

    getCypher(): string {
        return "RETURN 42";
    }

    getParameters(): object {
        return {};
    }
}



const foo = `
MATCH (n)
WHERE apoc.text.fuzzyMatch(n.content, {query})
RETURN n
`;
