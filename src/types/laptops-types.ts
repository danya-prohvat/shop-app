export interface ILaptopsInitialState {
    fetching: boolean,
    laptops: ILaptops[],
    activePage: number,
    pageSize: number,
    totalLaptopsCount: number,
    filterData: IFilterData,
}

export interface ILaptops {
    id:number,
    img: string,
    title: string,
    price: number | null,
}

export interface IGetLaptopsPayload {
    page?: number;
    title?: string;
    minPrice?: string;
    maxPrice?: string;
    fromForm?: boolean;
}

export interface IFilterData {
    title: string | undefined;
    maxPrice: string | undefined;
    minPrice: string | undefined;
}