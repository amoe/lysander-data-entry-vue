import {
    INTERFACES_FILE_VERSION, AggregatedForm, ModelInsert, IdGenerator, ModelInsertSpec
} from '@/interfaces';
import { getIsoDate } from './date';

console.log(INTERFACES_FILE_VERSION);

export function toNeo4jParameters(form: AggregatedForm, idGenerator: IdGenerator): ModelInsert {
    // XXX: it's not testable to call all of these methods here
    // ordering is important
    const flightId = idGenerator();

    // Under this model a row always declares a flight
    const base: ModelInsert = [
        {
            cypherId: 'createFlight',
            queryParameters: {
                flightId: flightId,
                date: getIsoDate(form.date),
                codenames: form.codenames.map(n => n.content)
            }
        }
    ];

    form.persons.forEach(p => {
        const thisPersonId = idGenerator();


        const personSpec: ModelInsertSpec = {
            cypherId: 'createPerson',
            queryParameters: {
                name: p.name,
                id: thisPersonId
            }
        };

        base.push(personSpec);

        // Add all the person's aliases

        p.aliases.forEach(a => {
            const aliasId = idGenerator();
            const alias = {
                cypherId: 'createAlias',
                queryParameters: {
                    alias: a.name,
                    id: aliasId
                }
            };
            base.push(alias)

            const aliasContextId = idGenerator();
            const aliasContext = {
                cypherId: 'createAliasContext',
                queryParameters: {
                    id: aliasContextId,
                    personId: thisPersonId,
                    aliasId: aliasId,
                    flightId: flightId
                }
            };

            base.push(aliasContext);
        });
    });

    console.log("transformed to %o", base);

    return base;
}
