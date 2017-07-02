import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductFilter } from '../product-filter';
import { ProductsAuxiliarService } from '../products-auxiliar.service';


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
  private _auxService: ProductsAuxiliarService;

  constructor(private _categoryService: CategoryService) {
    this._auxService = new ProductsAuxiliarService();
  }

  ngOnInit(): void {
    console.log['[ProductFilterComponent] ngOnInit'];
    this._categoriesSubscription = this._categoryService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data);
    this._productsState = [
      { 'id': 'selling', 'value': 'En venta' },
      { 'id': 'sold', 'value': 'Vendido' }
    ];

    this.productFilter = this._auxService.getLastFilter();

    this._lastField = this.productFilter.orderField;
    this._lastOrder = this.productFilter.orderType;

    // si el filtro viene vacío, establecemos valores por defecto
    if (this.productFilter.orderField === undefined || this.productFilter.orderField === null
      || this.productFilter.orderType === undefined || this.productFilter.orderType === null) {
      this._setDefaultOrder();
      this._setProductFilter(this._lastField, this._lastOrder);
    }

    this.notifyOrderField(this._lastField);
    this.notifyOrderType(this._lastOrder);

    this.notifyHost();

  }

  private _setDefaultOrder(): void {
    this._lastField = 'name';
    this._lastOrder = 'ASC';
  }

  private _setProductFilter(field: string, order: string): void {
    this.productFilter.orderField = this._lastField;
    this.productFilter.orderType = this._lastOrder;
  }

  ngOnDestroy(): void {
    this._categoriesSubscription.unsubscribe();
  }

  notifyHost(): void {
    // Antes de cada búsqueda con filtro, almacenamos el último filtro
    // en las preferencias, para recuperarlo al volver al listado
    this._auxService.saveLastFilter(this.productFilter);
    this.onSearch.emit(this.productFilter);
  }

  resetFilter(): void {
    console.info['[ProductFilterComponent] resetFilter'];

    // Limpiamos el filtro
    this.productFilter = [];

    // establecemos de nuevo los valores por defecto
    this._setDefaultOrder();
    this._setProductFilter(this._lastField, this._lastOrder);

    // Obtenemos los productos con el filtro reseteado
    this.notifyHost();
  }

  notifyOrderField(value: string): void {
    this._lastField = value;
    this._setProductFilter(this._lastField, this._lastOrder);
    this.notifyHost();
  }

  notifyOrderType(value: string): void {
    this._lastOrder = value;
    this._setProductFilter(this._lastField, this._lastOrder);
    this.notifyHost();
  }
}
