import { Injectable } from '@angular/core';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductsAuxiliarService {

  saveLastFilter(filter: ProductFilter): void {
    if (typeof (Storage) !== "undefined") {
      var saveFilter: any[] = [];
      if (filter !== null) {

        saveFilter.push({
          'title': filter.title,
          'category': filter.category,
          'state': filter.state,
          'description': filter.description,
          'priceMin': filter.priceMin,
          'priceMax': filter.priceMax,
          'publishedDate': filter.publishedDate,
          'orderField': filter.orderField,
          'orderType': filter.orderType,
          'userId': filter.userId,
          'userName': filter.userName
        });

        localStorage.setItem("lastFilter", JSON.stringify(saveFilter));
        console.log('Filtro almacenado: ', saveFilter);
      }
    }
  }

  getLastFilter(): ProductFilter {
    if (typeof (Storage) !== "undefined") {
      var savedFilter: ProductFilter = [];
      var lastFilter: any[] = JSON.parse(localStorage.getItem("lastFilter"));

      savedFilter.title = lastFilter[0]['title'] !== undefined ? lastFilter[0]['title'] : undefined;
      savedFilter.description = lastFilter[0]['description'] !== undefined ? lastFilter[0]['description'] : undefined;
      savedFilter.category = lastFilter[0]['category'] !== undefined ? lastFilter[0]['category'] : undefined;
      savedFilter.state = lastFilter[0]['state'] !== undefined ? lastFilter[0]['state'] : undefined;
      savedFilter.priceMin = lastFilter[0]['priceMin'] !== undefined ? lastFilter[0]['priceMin'] : undefined;
      savedFilter.priceMax = lastFilter[0]['priceMax'] !== undefined ? lastFilter[0]['priceMax'] : undefined;
      savedFilter.publishedDate = lastFilter[0]['publishedDate'] !== undefined ? lastFilter[0]['publishedDate'] : undefined;
      savedFilter.userId = lastFilter[0]['userId'] !== undefined ? lastFilter[0]['userId'] : undefined;
      savedFilter.userName = lastFilter[0]['userName'] !== undefined ? lastFilter[0]['userName'] : undefined;
      savedFilter.orderField = lastFilter[0]['orderField'] !== undefined ? lastFilter[0]['orderField'] : undefined;
      savedFilter.orderType = lastFilter[0]['orderType'] !== undefined ? lastFilter[0]['orderType'] : undefined;

      return savedFilter;

    }
    return null;
  }

  isFav(productId: number): boolean {
    var result: boolean = false;
    if (typeof (Storage) !== "undefined") {
      var starProduct: string[] = JSON.parse(localStorage.getItem("starProducts"));
      if (starProduct !== null && starProduct.length !== 0) {
        if (starProduct.indexOf(productId.toString()) !== -1) {
          result = true;
        }
      }
    }

    return result;
  }

  // Gestión de favoritos
  manageLike(productId: number): void {
    if (typeof (Storage) !== "undefined") {
      // Obtenemos el array almacenado
      var starProduct: string[] = JSON.parse(localStorage.getItem("starProducts"));

      console.log('storage: ', starProduct);

      if (starProduct !== null && starProduct.length !== 0) {
        if (starProduct.indexOf(productId.toString()) === -1) {
          starProduct.push(productId.toString());
        } else {
          let position = starProduct.indexOf(productId.toString());
          starProduct.splice(position, 1);
        }
      } else {
        starProduct = [];
        starProduct.push(productId.toString());
      }

      localStorage.setItem("starProducts", JSON.stringify(starProduct));
      console.log('[ProductsAuxiliarService] Productos almacenados en favoritos: ', starProduct);
    }
  }

}
