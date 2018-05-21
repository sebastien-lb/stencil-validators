import { Validator, ValidatorEntry, defaultValidator, combineValidators } from './validator'
import { FruitValidator } from './fruit-validator/fruit-validator';
import { getLengthValidator } from './length-validator/length-validator';


export enum ValidatorsName {
    fruit = 'fruit',
    length = 'length'
}

export function getValidator<A>(list: Array<string | ValidatorEntry | Validator<A>>): Validator<A> {
    return (list || []).map(v => {
        if (typeof v === 'string') {
            return validatorFactory(v, null);
        } else if ( v && (v as any).name) {
            v = v as ValidatorEntry;
            return validatorFactory(v.name, v.options);
        } else {
            return v as Validator<A>;
        }
    }).reduce(combineValidators, defaultValidator);
}

export function validatorFactory(name: string, options: any): Validator<any> {
    options = options || {};
    switch (name) {
        case (ValidatorsName.fruit):
            return FruitValidator;
        case (ValidatorsName.length):
            return getLengthValidator(options.min, options.max);
        default:
            return defaultValidator;
    }
}


