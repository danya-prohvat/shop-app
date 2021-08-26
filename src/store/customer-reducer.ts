import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICustomerData, ICustomerInitialState} from "../types/customer-types";
import {ISingInFormValues, ISingUpFormValues} from "../types/authoriationTypes";
import axios from "axios";

const initialState: ICustomerInitialState = {
    authorized: false,
    formData: {
        fetching: false,
        error: '',
    },
    customerData: {
        email: '',
        name: '',
    }
}

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
                state.customerData.email = action.payload[0].email
                state.customerData.name = action.payload[0].name
            } else state.formData.error = 'Incorrect email or password'
        },
        signUp(state, action: PayloadAction<ICustomerData | string>) {
            if (typeof action.payload == 'string') state.formData.error = action.payload
            else {
                state.customerData.email = action.payload.email
                state.customerData.name = action.payload.name
                state.authorized = true
                state.formData.error = ''
            }
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
    },
})


export const {} = customerSlice.actions
export default customerSlice.reducer