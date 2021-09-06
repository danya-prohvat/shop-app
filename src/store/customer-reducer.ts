import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICustomerData, ICustomerInitialState, IInBasket} from "../types/customer-types";
import {ISingInFormValues, ISingUpFormValues} from "../types/authorizationTypes";
import axios from "axios";
import {ILaptops} from "../types/laptops-types";

const initialState: ICustomerInitialState = {
    authorized: false,
    formData: {
        fetching: false,
        error: '',
    },
    customerData: {
        id: '',
        email: '',
        name: '',
        inBasket: [],
        basket: []
    }

}


export const editLaptopsInBasket = createAsyncThunk(
    'customer/editLaptopsInBasket',
    async (laptopId: number, {getState}: any) => {
        const {id, inBasket}: IInBasket = getState().customerReducerPage.customerData

        let newLaptopsInBasket: string[] = inBasket;

        if (inBasket.includes(laptopId.toString()))
            newLaptopsInBasket = inBasket.filter(laptop => +laptop !== laptopId)
        else
            newLaptopsInBasket = [...newLaptopsInBasket, laptopId.toString()];


        return axios.patch(`http://localhost:3001/customers/${id}`, {inBasket: newLaptopsInBasket})
            .then(response => (response.data))
    }
)
export const getLaptopsInBasket = createAsyncThunk(
    'customer/getLaptopsInBasket',
    async (_, {getState}: any) => {
        const {inBasket}: IInBasket = getState().customerReducerPage.customerData
        const urlParams = inBasket.map(laptopId => `id=${laptopId}&`).join('');
        return axios.get(`http://localhost:3001/laptops?${urlParams}`)
            .then(response => (response.data))
    }
)
export const signInThunk = createAsyncThunk(
    'customer/signIn',
    async ({email, password}: ISingInFormValues) => {
        return axios.get(`http://localhost:3001/customers?email=${email}&password=${password}`)
            .then(response => (response.data))
    }
)
export const signUpThunk = createAsyncThunk(
    'customer/signUp',
    async (values: ISingUpFormValues) => {
        const isCustomer = await axios.get(`http://localhost:3001/customers?email=${values.email}`)
            .then(response => (response.data))
        if (isCustomer.length > 0)
            return 'That account already exists'
        else
            return axios.post(`http://localhost:3001/customers`, {
                email: values.email,
                password: values.password,
                name: values.name,
                inBasket: []
            })
                .then(response => (response.data))
    }
)

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        toggleFormFetching(state) {
            state.formData.fetching = !state.formData.fetching
        },
        signIn(state, action: PayloadAction<ICustomerData[]>) {
            if (action.payload.length > 0) {
                state.formData.error = ''
                state.authorized = true
                state.customerData.inBasket = action.payload[0].inBasket
                state.customerData.email = action.payload[0].email
                state.customerData.id = action.payload[0].id
                state.customerData.name = action.payload[0].name
            } else state.formData.error = 'Incorrect email or password'
        },
        signUp(state, action: PayloadAction<ICustomerData | string>) {
            if (typeof action.payload == 'string') state.formData.error = action.payload
            else {
                state.customerData.id = action.payload.id
                state.customerData.email = action.payload.email
                state.customerData.name = action.payload.name
                state.authorized = true
                state.formData.error = ''
            }
        },
        setBasket(state, action: PayloadAction<ILaptops[]>) {
            state.customerData.basket = action.payload;
        },
        setInBasket(state, action: PayloadAction<ICustomerData>) {
            console.log(action.payload.inBasket)
            state.customerData.inBasket = action.payload.inBasket;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInThunk.pending, (state) => {
            customerSlice.caseReducers.toggleFormFetching(state);
        })
        builder.addCase(signInThunk.fulfilled, (state, action) => {
            customerSlice.caseReducers.signIn(state, action);
            customerSlice.caseReducers.toggleFormFetching(state);
        })
        builder.addCase(signInThunk.rejected, (state, action) => {
            customerSlice.caseReducers.toggleFormFetching(state);
            alert('Network error')
        })
        builder.addCase(signUpThunk.pending, (state) => {
            customerSlice.caseReducers.toggleFormFetching(state);
        })
        builder.addCase(signUpThunk.fulfilled, (state, action) => {
            customerSlice.caseReducers.signUp(state, action);
            customerSlice.caseReducers.toggleFormFetching(state);
        })
        builder.addCase(signUpThunk.rejected, (state, action) => {
            customerSlice.caseReducers.toggleFormFetching(state);
            alert('Network error')
        })
        builder.addCase(getLaptopsInBasket.fulfilled, (state, action) => {
            customerSlice.caseReducers.setBasket(state, action);
        })
        builder.addCase(getLaptopsInBasket.rejected, (state, action) => {
            alert('Network error')
        })
        builder.addCase(editLaptopsInBasket.fulfilled, (state, action) => {
            customerSlice.caseReducers.setInBasket(state, action);
        })
        builder.addCase(editLaptopsInBasket.rejected, (state, action) => {
            alert('Network error')
        })
    },
})


export const {} = customerSlice.actions
export default customerSlice.reducer