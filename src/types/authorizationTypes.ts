export interface ISingInFormValues {
    email: string;
    password: string;
}

export interface ISingInFormErrors {
    email?: string;
    password?: string;
}

export interface ISingUpFormValues {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface ISingUpFormErrors {
    name?: string;
    email?: string;
    password?: string;
}