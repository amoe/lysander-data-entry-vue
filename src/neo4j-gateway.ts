import neo4j from 'neo4j-driver';

export class Neo4jGateway {
    hostname: string;
    username: string;
    password: string;

    constructor(hostname: string, username: string, password: string) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
    }

    submit(): void {
        console.log("I would submit something");
        var driver = neo4j.driver(
            'bolt://' + this.hostname,
            neo4j.auth.basic(this.username, this.password)
        );
        console.log(driver);
        var session = driver.session();

        session.run('MATCH (n) RETURN n', {}).then((result) => {
            result.records.forEach(function(record) {
                console.log(record.get('n'));
            })
            session.close()
            driver.close();
        }).catch(function(error) {
            console.log("error is %o", error);
            driver.close();
        });


    }
}
