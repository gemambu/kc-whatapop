import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductFilter } from '../product-filter';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy, OnInit {

  @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();

  productFilter: ProductFilter = {};
  categories: Category[];
  private _categoriesSubscription: Subscription;
  private _productsState: any;
  private _lastField: string;
  private _lastOrder: string;
  
  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoriesSubscription = this._categoryService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data);
      this._productsState = [
        {'id':'selling',
        'value':'En venta'},
        {'id':'sold',
        'value':'Vendido'}
      ];
      
      this._setDefaultOrder();
      this._setProductFilter(this._lastField, this._lastOrder);

      this.notifyOrderField(this._lastField);
      this.notifyOrderType(this._lastOrder);
      
  }

  private _setDefaultOrder(): void {
      this._lastField = 'name';
      this._lastOrder = 'ASC';
  }

  private _setProductFilter(field: string, order: string): void{
    this.productFilter = { orderField: field, orderType: order };
  }

  ngOnDestroy(): void {
    this._categoriesSubscription.unsubscribe();
  }

  notifyHost(): void {
    this.onSearch.emit(this.productFilter);
  }

  resetFilter(): void {
    this._setDefaultOrder();
    this._setProductFilter(this._lastField, this._lastOrder );
    this.notifyHost();
  }

  notifyOrderField(value: string): void{
    this._lastField = value;
    this._setProductFilter(this._lastField, this._lastOrder );    
    this.notifyHost();
  }

  notifyOrderType(value: string): void{
    this._lastOrder = value;
    this._setProductFilter(this._lastField, this._lastOrder ); 
    this.notifyHost();
  }
}
