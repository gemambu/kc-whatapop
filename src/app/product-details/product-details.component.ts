import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmationService } from 'primeng/primeng';

import { Product } from '../product';
import { User } from '../user';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnDestroy, OnInit {

  product: Product;
  private _productSubscription: Subscription;
  private _addFav: string = 'Añadir a favoritos';
  private _removeFav: string = 'Eliminar de favoritos';
  private _isFav: boolean;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._route.data.forEach((data: { product: Product }) => this.product = data.product);
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    if (this._productSubscription !== undefined) {
      this._productSubscription.unsubscribe();
    }
  }

  private _buyProduct(): void {
    this._productSubscription = this._productService
      .buyProduct(this.product.id)
      .subscribe(() => this._showPurchaseConfirmation())
  }

  private _showPurchaseConfirmation(): void {
    this._confirmationService.confirm({
      rejectVisible: false,
      message: 'Producto comprado. ¡Enhorabuena!',
      accept: () => this._router.navigate(['/product'])
    });
  }

  showPurchaseWarning(): void {
    this._confirmationService.confirm({
      message: `Vas a comprar ${this.product.name}. ¿Estás seguro?`,
      accept: () => this._buyProduct()
    });
  }

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
      console.log('favoritos: ', starProduct);
    }
  }

  goBack(): void {
    window.history.back();
  }

  showProducts(userToShow: User): void {
    console.log('user:', userToShow);
    console.info("Opening product List for User: " + userToShow.nick);
    this._router.navigate(['/users', userToShow.id]);
  }

}
