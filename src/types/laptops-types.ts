export interface ILaptopsInitialState {
    fetching: boolean,
    laptops: ILaptops[],
    activePage: number,
    pageSize: number,
    totalLaptopsCount: number,
}

export interface ILaptops {
    id: number | null,
    img: string,
    title: string,
    price: number | null,
}

