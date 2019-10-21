import {
    INTERFACES_FILE_VERSION, AggregatedForm, ModelInsert, IdGenerator,
    ModelInsertSpec, Person
} from '@/interfaces';
import { getIsoDate } from './date';

console.log(INTERFACES_FILE_VERSION);

function transformPerson(p: Person, idGenerator: IdGenerator, flightId: string): ModelInsertSpec[] {
    const thisPersonId = idGenerator();
    const result: ModelInsertSpec[] = [];

    const personSpec: ModelInsertSpec = {
        cypherId: 'createPerson',
        queryParameters: {
            name: p.name,
            id: thisPersonId
        }
    };

    result.push(personSpec);

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
        result.push(alias)

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

        result.push(aliasContext);
    });

    return result;
}

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

    // Extend array with the stuff that's person-related
    form.persons.forEach(p => {
        base.push(...transformPerson(p, idGenerator, flightId))
    });

    console.log("transformed to %o", base);

    return base;
}
