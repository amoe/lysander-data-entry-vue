// canned-statements

export class FuzzySearchStatement {
    constructor() {
    }

    getCypher(): string {
        return "RETURN 42";
    }

    getParameters(): object {
        return {};
    }
}
