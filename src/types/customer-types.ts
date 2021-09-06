import {ILaptops} from "./laptops-types";

export interface ICustomerInitialState {
    authorized: boolean,
    formData: IFormData,
    customerData: ICustomerData,
}

export interface IFormData {
    fetching: boolean,
    error: string,
}

export interface ICustomerData extends IInBasket {
    id: string;
    email: string,
    name: string,
    basket: ILaptops[],
}

export interface IInBasket {
    id: string;
    inBasket: string[],
}