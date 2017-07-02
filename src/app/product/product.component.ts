import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsAuxiliarService } from '../products-auxiliar.service';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  // Servicio auxiliar para el manejo de favoritos
  private _favAux: ProductsAuxiliarService;

  @Input() data: Product;
  @Output() clickOnDetail = new EventEmitter<Product>();

  constructor(){
    this._favAux = new ProductsAuxiliarService();
  }

  notifyDetail(product: Product): void {
    console.info("Clicked detail for product: " + product.name);
    this.clickOnDetail.emit(product);
  }

  //método auxiliar para comprobar si el producto está incluido como favorito
  isFav(productId: number): boolean {
    return this._favAux.isFav(productId);    
  }

  // método auxiliar para almacenar/eliminar un producto de favoritos
  manageFav(productId: number): void {
    this._favAux.manageLike(productId);
  } 

}
