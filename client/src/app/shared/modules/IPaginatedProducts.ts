import { IProduct } from './IProduct';

export interface IPaginatedProducts {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}
