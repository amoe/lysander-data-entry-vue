import neo4j from 'neo4j-driver';
import { Driver, Session, Result, StatementResult } from 'neo4j-driver/types/v1/index'
import {
    INTERFACES_FILE_VERSION, AggregatedForm
} from '@/interfaces';


const CLEAR_CYPHER = `MATCH (n) DETACH DELETE n`;

// Works fine
const CYPHER_QUERY = `
CREATE (p:Person {name: {name}})
RETURN p
`;


const MODEL_CYPHER = `
CREAT (f:Flight {date: "1940-10-19",
                  names: ['Felix I', 'SIS no 1']}),
       (p:Person {name: "Philip Schneidau"}),
       (a:Alias {alias: "Felix"}),
       (ac:AliasContext),
       (p)-[:HAS_ALIAS_CONTEXT]->(ac),
       (ac)-[:POINTS_TO]->(a),
       (ac)-[:IN_CONTEXT]->(f),

       (p)-[:INVOLVED_IN {role: 'agent'}]->(f),

       (p2:Person {name: "WJ Farley"}),
       (p2)-[:INVOLVED_IN {role: 'pilot'}]->(f),

       (l:Location {coordinates: "48° 18’ 00’’ N – 02° 44’ 00’’ E"}),
       (f)-[:ACTUAL_DESTINATION]->(l),

       (e:Event {description: "Lysanser crashed near Oban (Scotland) due to very bad weather, tailplane &
compass damaged inducing fuel breakdown"}),
       (f)-[:HAS_SUB_EVENT]->(e);
`;

const MULTIPLE_STATEMENT_DEMO = [
    'CREATE (p:Person {name: "Fry"})',
    'CREATE (p:Person {name: "Leela"})'
];

export class Neo4jGateway {
    hostname: string;
    username: string;
    password: string;
    driver: Driver | null;
    session: Session | null;

    constructor(hostname: string, username: string, password: string) {
        console.log("neo4j-gateway: using interfaces version %o", INTERFACES_FILE_VERSION);
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.driver = null;
        this.session = null;
    }

    initialize(): void {
        this.driver = neo4j.driver(
            'bolt://' + this.hostname,
            neo4j.auth.basic(this.username, this.password)
        );
        this.session = this.driver.session();
    }

    checkInitialized(): void {
        if (this.driver === null) {
            throw new Error("driver was not initialized");
        }
        if (this.session === null) {
            throw new Error("session was not initialized");
        }
    }

    submit(name: string): void {
        console.log("I would submit something");
        this.checkInitialized();

        this.session!.run(CYPHER_QUERY, { 'name': name }).then((result) => {
            result.records.forEach(function(record) {
                console.log(record.get('p'));
            })

        }).catch((error) => {
            console.log("error is %o", error);
        });
    }

    // A Result is actually a promise although it doesn't look like it.
    submitModel(formData: AggregatedForm): Result {
        console.log("received form data %o", formData);
        this.checkInitialized();
        return this.session!.run(MODEL_CYPHER);
    }

    demoMultiStatement(): void {
        // Promise.all returns a promise that blocks until everything's done.
        const txResult = this.session!.writeTransaction(tx => {
            return Promise.all(
                MULTIPLE_STATEMENT_DEMO.map(cypher => tx.run(cypher))
            );
        });

        txResult.then((r: StatementResult[]) => {
            console.log("r is %o", r);

        }).catch(e => {
            console.log("e is %o", e);
        });
    }

    clearGraph(): Result {
        this.checkInitialized();
        return this.session!.run(CLEAR_CYPHER);
    }

    destroy(): void {
        if (this.session !== null) {
            this.session.close();
        }

        if (this.driver !== null) {
            this.driver.close();
        }
    }
}
