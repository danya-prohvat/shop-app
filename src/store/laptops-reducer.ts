import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILaptops, ILaptopsInitialState, IGetLaptopsPayload, IFilterData} from "../types/laptops-types";
import axios from "axios";

const initialState: ILaptopsInitialState = {
    fetching: false,
    totalLaptopsCount: 0,
    laptops: [],
    activePage: 1,
    pageSize: 16,
    filterData: {
        title: '',
        maxPrice: '',
        minPrice: '',
    }
}

export const getLaptops = createAsyncThunk(
    'laptops/getLaptops',
    async ({page, title, minPrice, maxPrice, fromForm = false}: IGetLaptopsPayload, {getState, dispatch}: any) => {
        const {pageSize, activePage, filterData} = getState().laptopsReducerPage

        if (!fromForm){
            title = filterData.title
            minPrice = filterData.minPrice
            maxPrice = filterData.maxPrice

            if (!page) page = activePage
            dispatch(setActivePage(page!))
        } else {
            dispatch(setActivePage(1))
            if (!(title || minPrice || maxPrice)) {
                title = ''
                minPrice = ''
                maxPrice = ''
            }
        }

        dispatch(setFilterData({title: title, minPrice: minPrice, maxPrice: maxPrice}))

        await axios.get(`http://localhost:3001/laptops?${minPrice && '&price_gte=' + minPrice}${maxPrice && '&price_lte=' + maxPrice}${title && '&title_like=' + title}`)
            .then(response => dispatch(setTotalLaptopsCount(response.data.length)))
        return axios.get(`http://localhost:3001/laptops?_page=${page}&_limit=${pageSize}${minPrice && '&price_gte=' + minPrice}${maxPrice && '&price_lte=' + maxPrice}${title && '&title_like=' + title}`)
            .then(response => (response.data))
    }
)

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
        setFilterData(state, action: PayloadAction<IFilterData>) {
            state.filterData.title = action.payload.title
            state.filterData.maxPrice = action.payload.maxPrice
            state.filterData.minPrice = action.payload.minPrice
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLaptops.pending, (state) => {
            laptopsSlice.caseReducers.toggleFetching(state);
        })
        builder.addCase(getLaptops.fulfilled, (state, action) => {
            laptopsSlice.caseReducers.setLaptops(state, action);
            laptopsSlice.caseReducers.toggleFetching(state);
        })
        builder.addCase(getLaptops.rejected, (state, action) => {
            laptopsSlice.caseReducers.toggleFetching(state);
            alert('Network error')
        })
    },
})


export const {setTotalLaptopsCount, setActivePage, setFilterData} = laptopsSlice.actions
export default laptopsSlice.reducer