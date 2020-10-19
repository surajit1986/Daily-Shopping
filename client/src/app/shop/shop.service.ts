import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPaginatedProducts } from '../shared/modules/IPaginatedProducts';
import { IBrands } from '../shared/modules/IBrand';
import { IProductType } from '../shared/modules/IProductType';
import {map} from 'rxjs/operators';
import { ProductParams } from '../shared/modules/ProductParams';
import { IProduct } from '../shared/modules/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  baseUrl: string = "http://localhost:5000/api/";

  constructor(private http: HttpClient) { 
  }

  getProducts(shopParams: ProductParams){

    let params = new HttpParams();

    if (shopParams.brandId > 0){
      params = params.append('brandid', shopParams.brandId.toString());
    }

    if (shopParams.typeId > 0){
      params = params.append('typeid', shopParams.typeId.toString());
    }

    if (shopParams.sort){
      params = params.append('sort', shopParams.sort);
    }
    if (shopParams.pageIndex > 0){
      params = params.append('pageIndex', shopParams.pageIndex.toString());
    }
    if (shopParams.pageSize > 0){
      params = params.append('pageSize', shopParams.pageSize.toString());
    }
    if (shopParams.search){
      params = params.append('search', shopParams.search.toString());
    }

   // return this.http.get<IPaginatedProducts>(this.baseUrl + 'Products/?brandid=' + brandId.toString() + '&typeid='+ typeId.toString());
    

    return this.http.get<IPaginatedProducts>(this.baseUrl + 'Products', {observe: 'response', params})
                    .pipe(
                      map(response => {
                        return response.body;
                      })
                    );
  }

  getBrands(){
    return this.http.get<IBrands[]>(this.baseUrl + 'Products/brands');
  }

  getProductTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + 'Products/types');
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'Products/' + id.toString());
  }
}
