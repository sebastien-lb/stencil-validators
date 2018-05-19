import { getLengthValidator } from './length-validator';

describe('Length Validator', () => {
    let results: Array<{min: number, max: number, value: string, res: boolean}> = [
        {min: null, max: null, value: 'ok', res: true},
        {min: null, max: null, value: '', res: true},
        {min: null, max: 2, value: 'ok', res: true},
        {min: null, max: 2, value: 'okok', res: false},
        {min: null, max: 2, value: 'o', res: true},
        {min: 4, max: null, value: 'ok', res: false},
        {min: 4, max: null, value: 'okok', res: true},
        {min: 4, max: null, value: 'hello', res: true},
        {min: 3, max: 5, value: 'ok', res: false},
        {min: 3, max: 5, value: 'everyone', res: false},
        {min: 3, max: 5, value: 'hey', res: true},
        {min: 3, max: 5, value: 'hello', res: true},
    ];

    results.forEach(i => 
        it(`Should return ${i.res} for ${i.value} with min: ${i.min} and max: ${i.max}`, () => {
            expect(getLengthValidator(i.min,i.max).validate(i.value)).toEqual(i.res);
        })
    );
});