import neo4j from 'neo4j-driver';
import { Driver, Session, Result, StatementResult } from 'neo4j-driver/types/v1/index'
import {
    INTERFACES_FILE_VERSION, AggregatedForm, ModelInsert, ModelInsertSpec
} from '@/interfaces';
import { QUERY_DEFINITIONS } from '@/cypher';
import uuidv4 from 'uuid/v4';
import { CannedStatement } from '@/canned-statements';

const INSERT_SOURCE_ROW = `
MATCH (s:Source {name: {sourceName}})
CREATE (r:SourceRow {processed: false, json: {json}}),
       (s)-[:HAS_ROW {position: {index}}]->(r)
`;

// return ordered by position within the source
const RETRIEVE_UNPROCESSED = `
    MATCH (s:Source {name: {sourceName}}),
          (s)-[h:HAS_ROW]->(r:SourceRow {processed: false})
    RETURN r.json AS json
    ORDER BY h.position
`;


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

const FOREACH_DEMO = 'FOREACH (name IN {nameList} | CREATE (p:Person {name: name}))';

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
    submitModel(modelInfo: ModelInsert): Promise<StatementResult[]> {
        console.log("received form data %o", modelInfo);

        // So basically it should be a key for a cypher query and a 
        this.checkInitialized();

        // What are we going to do?
        const txResult = this.session!.writeTransaction(tx => {
            return Promise.all(
                modelInfo.map((m: ModelInsertSpec) => {
                    return tx.run(
                        QUERY_DEFINITIONS[m.cypherId], m.queryParameters
                    );
                })
            );
        });

        return txResult;
    }

    testTransactionSemanticsImplicitSequencing(i: number): void {
        if (i === 0) {
            console.log("done at", new Date());
        }

        const id = uuidv4();
        const txResult = this.session!.writeTransaction(tx => {
            const p1 = tx.run("CREATE (p:Person {id: {id}})", { id });
            const p2 = tx.run("MATCH (p:Person {id: {id}}) RETURN p.id", { id });
            return [p1, p2];
        });

        txResult.then(x => {
            x[1].then(y => {
                const val = y.records[0].get('p.id');
                if (val !== id)
                    throw new Error("something went wrong");

                this.testTransactionSemanticsImplicitSequencing(i - 1);
            }).catch(e => {
                console.log("bad");
            });
        }).catch(e => {
            console.log("bad1");
        });
    }


    testTransactionSemantics(): void {
        this.session!.writeTransaction(tx => {
            tx.run("CREATE (p:Person {id: 1})").then(r => {
                tx.run("MATCH (p:Person {id: 1}) RETURN p").then(r => {
                    console.log("success");
                }).catch(e => {
                    console.log("inner catch", e);
                });
            });
        });
    }

    clearGraph(): Result {
        this.checkInitialized();
        return this.session!.run(CLEAR_CYPHER);
    }

    createSourceWithRows(sourceName: string, rows: object[]): Promise<StatementResult[]> {
        this.checkInitialized();

        const txResult = this.session!.writeTransaction(tx => {
            const promises = [] as Result[];

            const p1 = tx.run(
                "CREATE (s:Source {name: {name}})", { name: sourceName }
            );

            promises.push(p1);

            rows.forEach((row, index) => {
                const p2 = tx.run(INSERT_SOURCE_ROW, {
                    sourceName,
                    index,
                    json: JSON.stringify(row)
                });
                promises.push(p2);
            });

            return Promise.all(promises);
        });

        return txResult;
    }


    search(query: CannedStatement): Result {
        this.checkInitialized();
        return this.session!.run(query.getCypher(), query.getParameters());
    }

    // markRowProcessed(string rowId): Result {

    // }

    // NB: Do we want to unwrap this into a regular promise or something
    // getNextUnprocessedRow(): Result {

    // }


    getUnprocessedRows(sourceName: string): Result {
        this.checkInitialized();
        return this.session!.run(
            RETRIEVE_UNPROCESSED, { sourceName }
        );
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
