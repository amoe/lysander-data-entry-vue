import neo4j from 'neo4j-driver';
import { Driver } from 'neo4j-driver/types/v1/index'


export class Neo4jGateway {
    hostname: string;
    username: string;
    password: string;
    driver: Driver | null;

    constructor(hostname: string, username: string, password: string) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.driver = null;
    }

    initialize(): void {
        this.driver = neo4j.driver(
            'bolt://' + this.hostname,
            neo4j.auth.basic(this.username, this.password)
        );
    }

    submit(name: string): void {
        console.log("I would submit something");
        var session = this.driver!.session();

        session.run('CREATE (p:Person {name: {name}}) RETURN p', { 'name': name }).then((result) => {
            result.records.forEach(function(record) {
                console.log(record.get('p'));
            })
            session.close()
            this.driver!.close();
        }).catch((error) => {
            console.log("error is %o", error);
            this.driver!.close();
        });
    }
}
