import {
    INTERFACES_FILE_VERSION, AggregatedForm, ModelInsert
} from '@/interfaces';

console.log(INTERFACES_FILE_VERSION);

import uuidv4 from 'uuid/v4';


export function toNeo4jParameters(form: AggregatedForm): ModelInsert {
    return [
        {
            cypherId: 'createFlight',
            queryParameters: {
                date: new Date('1940-10-19'),
                codenames: ['Felix I', 'SIS no 1']
            }
        },
        {
            cypherId: 'createPerson',
            queryParameters: {
                name: 'Philip Schneidau',
            }
        },
        {
            cypherId: 'createAlias',
            queryParameters: {
                alias: 'Felix'
            }
        }
    ];
}
