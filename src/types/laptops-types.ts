import {IFilterFormValues} from "./catalogTypes";

export interface ILaptopsInitialState {
    fetching: boolean,
    laptops: ILaptops[],
    activePage: number,
    pageSize: number,
    totalLaptopsCount: number,
    filterData: IFilterFormValues,
}

export interface ILaptops {
    id: number | null,
    img: string,
    title: string,
    price: number | null,
}

export interface IGetLaptopsPayload {
    page?: string | number;
    title?: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
    fromForm?: boolean;
}