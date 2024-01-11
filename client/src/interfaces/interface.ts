export interface ICategory {
    _id: string;
    name: string;
    color: string;
    __v: number;
    subcategory: ISubcategory[];
}

export interface ISubcategory {
    name: string;
    _id: string;
    products: IProduct[];
}

export interface IProduct {
    title: string;
    description: string;
    rating: number;
    buy: boolean;
    _id: string;
}
