import { Injectable } from '@angular/core';

@Injectable()
export class FavsAuxiliarService {


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

  // Gestión de favoritos
  manageLike(productId: number): void {
    if (typeof(Storage) !== "undefined") {
      // Obtenemos el array almacenado
      var starProduct: string[] = JSON.parse(localStorage.getItem("starProducts"));

      console.log('storage: ', starProduct);

      if(starProduct !== null && starProduct.length !== 0){
        if(starProduct.indexOf(productId.toString()) === -1) {
          starProduct.push(productId.toString());
        } else {
          let position = starProduct.indexOf(productId.toString());
          starProduct.splice(position, 1);
        }
      } else {
        console.log('inicializo starProduct');
        starProduct = [];
        starProduct.push(productId.toString());
      }

      localStorage.setItem("starProducts", JSON.stringify(starProduct));
      console.log('Productos favoritos: ', starProduct);
    }
  }

}
