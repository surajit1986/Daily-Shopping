import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrands } from '../shared/modules/IBrand';
import { IProduct } from '../shared/modules/IProduct';
import { IProductType } from '../shared/modules/IProductType';
import { ProductParams } from '../shared/modules/ProductParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrands[];
  types: IProductType[];
  shopParams: ProductParams;
  totalRecordsCount = 0;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low To High', value: 'priceAsc'},
    {name: 'price: High To Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = new ProductParams();
    this.shopParams.brandId = 0;
    this.shopParams.typeId = 0;
    this.shopParams.sort = 'name';
    this.shopParams.pageSize = 6;
    this.shopParams.pageIndex = 1;
  }



  ngOnInit(): void {
    this.getBrands();
    this.getProductTypes();
    this.getProducts();
  }

  getProducts(): void{
    this.shopService.getProducts(this.shopParams).subscribe(
      result => {
        this.products = result.data;
        this.shopParams.pageIndex = result.pageIndex;
        this.shopParams.pageSize = result.pageSize;
        this.totalRecordsCount = result.count;

      },
      error => {
        console.log(error);
      }

    );
  }

  getBrands(): void{
    this.shopService.getBrands().subscribe(
      result => {
        this.brands = [{id: 0, name: 'All Brands'}, ...result];
      },
      error => {
        console.log(error);
      }

    );

  }

  getProductTypes(): void{
    this.shopService.getProductTypes().subscribe(
      result => {
        this.types = [{id: 0, name: 'All Types'}, ...result];
      },
      error => {
        console.log(error);
      }
    );

  }

  onBrandSelection(brandId: number): void{
    this.shopParams.brandId = brandId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onTypeSelection(typeId: number): void{
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSortSelection(sort: string): void{
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChange(event: any): void{
    this.shopParams.pageIndex = event;
    this.getProducts();
  }

  onSearch(): void{
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset(): void{
    this.shopParams.search = '';
    this.shopParams = new ProductParams();
    this.getProducts();
  }

}
