export interface IFilterFormValues {
    title: string ;
    minPrice: string ;
    maxPrice: string ;
}
export interface ILaptopProps {
    id:number;
    title: string;
    price: number | null;
    img: string;
}