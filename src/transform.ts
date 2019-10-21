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

    // XXX: Aliases don't make sense in this model
    // Why, well for one we don't have them in the form itself!

    form.persons.forEach(p => {
        const personSpec: ModelInsertSpec = {
            cypherId: 'createPerson',
            queryParameters: {
                name: p.name,
                id: idGenerator()
            }
        };

        base.push(personSpec);
    });

    return base;
}
