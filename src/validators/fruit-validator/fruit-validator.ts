import { Validator } from '../validator';

export const FruitValidator: Validator<string> = {
    validate: (value: string) => {
        let fruits = ['banana','apple','cherry'];
        return fruits.find(a => a === value) ? true : false;
    },
    errorMessage: 'You must enter a valid fruit name'
}

