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


describe('transform', () => {
    it('does the happy path', () => {
        const actualResult = toNeo4jParameters(SAMPLE_FORM_DATA);
        //        expect(2 + 2).toEqual(4);
    });
}); 
