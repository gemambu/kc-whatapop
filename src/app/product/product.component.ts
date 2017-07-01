import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavsAuxiliarService } from '../favs-auxiliar.service';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  private _favAux: FavsAuxiliarService;

  @Input() data: Product;

  @Output() clickOnDetail = new EventEmitter<Product>();

  constructor(){
    this._favAux = new FavsAuxiliarService();
  }

  notifyDetail(product: Product): void {
    console.info("Clicked detail for product: " + product.name);
    this.clickOnDetail.emit(product);
  }

  //método auxiliar para comprobar si el producto está incluido como favorito
  isFav(productId: number): boolean {
    return this._favAux.isFav(productId);    
  }

}
