import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Product } from './product';
import { ProductFilter } from './product-filter';
import { ProductService } from './product.service';

@Injectable()
export class ProductByUserResolveService implements Resolve<Product[]> {

  constructor(
    private _productService: ProductService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {

    // Creamos una instancia de Product Filter, y establecemos el estado
    // como sold
    let filter: ProductFilter = {};
    filter.userId = route.params['userId'];

    // Obtenemos los productos con el filtro creado
    let soldProducts: Observable<Product[]> = this._productService.getProducts(filter);
    return soldProducts;
  }

}
