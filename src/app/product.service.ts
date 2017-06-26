import { Inject, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  getProducts(filter: ProductFilter = undefined): Observable<Product[]> {    
    let params: any = new URLSearchParams();

    // Ordenación por defecto: fecha de publicación, descendente
    params.append('_sort', 'title');
    params.append('_order', 'ASC');

    if(filter !== null){
      // Seleccionamos el tipo de ordenacion
      if (filter.orderField !== null && filter.orderField !== ''){
        console.log('CAMPO de FILTRO: ', filter.orderField);
        params.set('_sort', filter.orderField);
      } 
      // else {
      //   params.append('_sort', 'publishedDate');
      // }

      if (filter.orderType !== null && filter.orderType !== ''){
        console.log('TIPO de FILTRO: ', filter.orderType);
        params.set('_order', filter.orderType);
      } 
      // else {
      //   params.append('_order', 'DESC');
      // }

      // Seleccionamos filtros
      if(filter.title !== null && filter.title !== ''){
        params.append('name_like', filter.title);
      }
      if(filter.category !== null  && filter.category !== ''  && filter.category !== '0'){
        params.append('category.id', filter.category);
      }
      if(filter.state !== null && filter.state !== ''){
        params.append('state', filter.state);
      }
      if(filter.description != null && filter.description !== ''){
        params.append('description_like', filter.description);
      }
      if(filter.priceMin != null && filter.priceMin !== 0){
        params.append('price_gte', filter.priceMin);
      }
      if(filter.priceMax != null && filter.priceMax !== 0){
        params.append('price_lte', filter.priceMax);
      }

      if(filter.publishedDate != null && filter.publishedDate !== 'dd/mm/aaaa'){
        let date = new Date(filter.publishedDate);
        params.append('publishedDate_lte', date.getTime());
      }

      if(filter.userName != null && filter.userName !== ''){
        params.append('seller.nick_like', filter.userName);
      }

      console.log('Filtro y orden: ', params);
    }

    return this._http
      .get(`${this._backendUri}/products`, {'search' : params})
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
