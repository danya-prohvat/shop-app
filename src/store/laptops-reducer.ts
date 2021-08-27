import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILaptops, ILaptopsInitialState, ITotalCountItems} from "../types/laptops-types";
import axios from "axios";

const initialState: ILaptopsInitialState = {
    fetching: false,
    totalCountItems: 0,
    laptops: [],
    page: 1,
    pageSize: 4,
}

export const getLaptopsTotalCountItems = createAsyncThunk(
    'laptops/getLaptopsTotalCountItems',
    async () => {
        return axios.get(`http://localhost:3001/laptopsInfo`)
            .then(response => (response.data))
    }
)

export const getLaptops = createAsyncThunk(
    'laptops/getLaptops',
    async (page: number | string = 1, {getState, dispatch}: any) => {
        const {pageSize} = getState().laptopsReducerPage
        dispatch(setActivePage(+page))
        return axios.get(`http://localhost:3001/laptops?_page=${page}&_limit=${pageSize}`)
            .then(response => {
                console.log(response.data.length)
                // id_gte=10&id_lte=20&
                return response.data;
            })
    }
)


const laptopsSlice = createSlice({
    name: 'laptops',
    initialState,
    reducers: {
        toggleFormFetching(state) {
            state.fetching = !state.fetching
        },
        setLaptopsTotalCountItems(state, action: PayloadAction<ITotalCountItems>) {
            state.totalCountItems = action.payload.totalCountItems
        },
        setLaptops(state, action: PayloadAction<ILaptops[]>) {
            state.laptops = action.payload
        },
        setActivePage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLaptopsTotalCountItems.pending, (state) => {
            laptopsSlice.caseReducers.toggleFormFetching(state);
        })
        builder.addCase(getLaptopsTotalCountItems.fulfilled, (state, action) => {
            laptopsSlice.caseReducers.setLaptopsTotalCountItems(state, action);
        })
        builder.addCase(getLaptopsTotalCountItems.rejected, (state, action) => {
            laptopsSlice.caseReducers.toggleFormFetching(state);
            alert('Network error')
        })
        builder.addCase(getLaptops.pending, (state) => {
            laptopsSlice.caseReducers.toggleFormFetching(state);
        })
        builder.addCase(getLaptops.fulfilled, (state, action) => {
            laptopsSlice.caseReducers.setLaptops(state, action);
        })
        builder.addCase(getLaptops.rejected, (state, action) => {
            laptopsSlice.caseReducers.toggleFormFetching(state);
            alert('Network error')
        })
    },
})


export const {setActivePage} = laptopsSlice.actions
export default laptopsSlice.reducer