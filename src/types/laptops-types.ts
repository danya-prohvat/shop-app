export interface ILaptopsInitialState extends ITotalCountItems {
    fetching: boolean,
    laptops: ILaptops[],
    page: number,
    pageSize: number,
}

export interface ILaptops {
    id: number | null,
    img: string,
    title: string,
    price: number | null,
}

export interface ITotalCountItems {
    totalCountItems: number,
}
