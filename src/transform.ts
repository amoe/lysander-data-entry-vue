import {
    INTERFACES_FILE_VERSION, AggregatedForm, ModelInsert, IdGenerator
} from '@/interfaces';

console.log(INTERFACES_FILE_VERSION);

export function toNeo4jParameters(form: AggregatedForm, idGenerator: IdGenerator): ModelInsert {
    // XXX: it's not testable to call all of these methods here
    // ordering is important
    const flightId = idGenerator();
    const personId = idGenerator();
    const aliasId = idGenerator();
    const aliasContextId = idGenerator();




    return [
        {
            cypherId: 'createFlight',
            queryParameters: {
                flightId: flightId,
                date: '1940-10-19',
                codenames: ['Felix I', 'SIS no 1']
            }
        },
        {
            cypherId: 'createPerson',
            queryParameters: {
                name: 'Philip Schneidau',
                id: personId
            }
        },
        {
            cypherId: 'createAlias',
            queryParameters: {
                alias: 'Felix',
                id: aliasId
            }
        },
        {
            cypherId: 'createAliasContext',
            queryParameters: {
                id: aliasContextId,
                aliasId,
                personId,
                flightId
            }
        }
    ];
}

// export function toNeo4jParameters(form: AggregatedForm, idGenerator: IdGenerator): ModelInsert {
//     return [
//         {
//             cypherId: 'txSemanticsTester1',
//             queryParameters: {}
//         },
//         {
//             cypherId: 'txSemanticsTester2',
//             queryParameters: {}
//         },
//     ];
// }
