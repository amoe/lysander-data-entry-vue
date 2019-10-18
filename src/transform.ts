import {
    INTERFACES_FILE_VERSION, AggregatedForm, ModelInsert
} from '@/interfaces';

console.log(INTERFACES_FILE_VERSION);


export function toNeo4jParameters(form: AggregatedForm): ModelInsert {
    return [
        {
            cypherId: 'createPerson',
            queryParameters: {
                name: 'fry'
            }
        },
        {
            cypherId: 'createPerson',
            queryParameters: {
                name: 'leela'
            }
        }
    ];
}
