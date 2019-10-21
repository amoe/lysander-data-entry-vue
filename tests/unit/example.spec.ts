import { toNeo4jParameters } from '@/transform';
import { AggregatedForm, Role } from '@/interfaces';

const SAMPLE_FORM_DATA: AggregatedForm = {
    date: new Date('1940-01-01'),
    codenames: [
        { content: "Felix I" },
        { content: "SIS no 1" },
    ],
    persons: [
        { name: "Philip Schneidau", role: Role.Agent },
        { name: "WJ Farley", role: Role.Pilot }
    ],
    locations: [
        { content: "2.4 km E Montcourt-Fromonville, 4.3 km S Montigny sur Loing, 4.7 km NE Nemours, LZ (48° 18’ 00’’ N – 02° 44’ 00’’ E), Seine & Marne" }
    ],
    extraEvents: [
        { content: "Lysanser crashed near Oban (Scotland) due to very bad weather, tailplane & compass damaged inducing fuel breakdown" }
    ]
};

const EXPECTED_RESULT = [
    {
        cypherId: 'createFlight',
        queryParameters: {
            flightId: "1",
            date: '1940-10-19',
            codenames: ['Felix I', 'SIS no 1']
        }
    },
    {
        cypherId: 'createPerson',
        queryParameters: {
            name: 'Philip Schneidau',
            id: "2"
        }
    },
    {
        cypherId: 'createAlias',
        queryParameters: {
            alias: 'Felix',
            id: "3"
        }
    },
    {
        cypherId: 'createAliasContext',
        queryParameters: {
            id: "4",
            aliasId: "3",
            personId: "2",
            flightId: "1"
        }
    }
]



function makeMockedIdGenerator() {
    var counter = 1;
    return () => String(counter++);
}


describe('transform', () => {
    it('does the happy path', () => {
        const actualResult = toNeo4jParameters(SAMPLE_FORM_DATA, makeMockedIdGenerator());
        expect(actualResult).toEqual(EXPECTED_RESULT);
    });
}); 
