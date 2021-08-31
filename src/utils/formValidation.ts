import {
    ISingInFormErrors,
    ISingInFormValues,
    ISingUpFormErrors,
    ISingUpFormValues
} from "../types/authorizationTypes";
import {IFilterFormValues} from "../types/catalogTypes";

export const signInFormValidation = (values: ISingInFormValues): ISingInFormErrors => {
    const errors: ISingInFormErrors = {};

    if (!values.email) errors.email = 'filed is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'incorrect email';

    if (!values.password) errors.password = 'filed is required';
    else if (values.password.length < 4) errors.password = 'password must be more than 4 symbols';
    else if (!/^[A-Z0-9._-]{4,}$/i.test(values.password)) errors.password = 'incorrect password';

    return errors;
};

export const signUpFormValidation = (values: ISingUpFormValues): ISingUpFormErrors => {
    const errors: ISingUpFormErrors = {};

    if (!values.name) errors.name = 'filed is required';
    else if (!/^[A-Z\s]{1,}$/i.test(values.name)) errors.name = 'incorrect name';


    if (!values.email) errors.email = 'filed is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'incorrect email';

    if (!values.password) errors.password = 'filed is required';
    else if (values.password.length < 4) errors.password = 'password must be more than 4 symbols';
    else if (!/^[A-Z0-9._-]{4,}$/i.test(values.password)) errors.password = 'incorrect password';

    if (values.password !== values.repeatPassword) errors.password = 'password mismatch';

    return errors;
};

export const FilterFormValidation = (values: IFilterFormValues): void => {
        // values.minPrice = values.minPrice.toString().replace(' ', '');
        // values.maxPrice = values.maxPrice.toString().replace(' ', '');

        values.title = values.title.trimStart();
};