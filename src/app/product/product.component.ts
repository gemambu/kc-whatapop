import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() data: Product;

  @Output() clickOnDetail = new EventEmitter<Product>();

  notifyDetail(product: Product): void {
    console.info("Clicked detail for product: " + product.name);
    this.clickOnDetail.emit(product);
  }

  // método auxiliar para comprobar si el producto está incluido como favorito en
  // el localStorage
  isFav(productId: number): boolean {
    var result: boolean = false;
    if (typeof(Storage) !== "undefined") {
      var starProduct: string[] = JSON.parse(localStorage.getItem("starProducts"));
      if(starProduct !== null && starProduct.length !== 0){
        if(starProduct.indexOf(productId.toString()) !== -1){
          result = true;
        }
      }
    } 

    return result;
  }

}
