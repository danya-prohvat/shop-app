export interface ICustomerInitialState {
    authorized: boolean,
    formData: IFormData,
    customerData: ICustomerData,
}

export interface IFormData{
    fetching: boolean,
    error: string,
}

export interface ICustomerData{
    email: string,
    name: string,
}