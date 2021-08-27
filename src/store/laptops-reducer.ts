import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILaptops, ILaptopsInitialState} from "../types/laptops-types";
import axios from "axios";

const initialState: ILaptopsInitialState = {
    fetching: false,
    totalLaptopsCount: 0,
    laptops: [],
    activePage: 1,
    pageSize: 4,
}

export const getLaptops = createAsyncThunk(
    'laptops/getLaptops',
    async (page: number | string = 1, {getState, dispatch}: any) => {
        const {pageSize} = getState().laptopsReducerPage
        dispatch(setActivePage(+page))

        const totalCountItems = await axios.get(`http://localhost:3001/laptops`)
        dispatch(setTotalLaptopsCount(totalCountItems.data.length))


        return axios.get(`http://localhost:3001/laptops?_page=${page}&_limit=${pageSize}`)
            .then(response => (response.data))
    }
)
//id_gte=10&id_lte=20&

const laptopsSlice = createSlice({
    name: 'laptops',
    initialState,
    reducers: {
        toggleFetching(state) {
            state.fetching = !state.fetching
        },
        setTotalLaptopsCount(state, action: PayloadAction<number>) {
            state.totalLaptopsCount = action.payload
        },
        setActivePage(state, action: PayloadAction<number>) {
            state.activePage = action.payload
        },
        setLaptops(state, action: PayloadAction<ILaptops[]>) {
            state.laptops = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLaptops.pending, (state) => {
            laptopsSlice.caseReducers.toggleFetching(state);
        })
        builder.addCase(getLaptops.fulfilled, (state, action) => {
            laptopsSlice.caseReducers.setLaptops(state, action);
        })
        builder.addCase(getLaptops.rejected, (state, action) => {
            laptopsSlice.caseReducers.toggleFetching(state);
            alert('Network error')
        })
    },
})


export const {setTotalLaptopsCount, setActivePage} = laptopsSlice.actions
export default laptopsSlice.reducer