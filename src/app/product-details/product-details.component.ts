import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmationService } from 'primeng/primeng';

import { Product } from '../product';
import { User } from '../user';
import { ProductService } from '../product.service';

import { ProductsAuxiliarService } from '../products-auxiliar.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnDestroy, OnInit {

  
  product: Product;
  dataUser: User;

  private _productSubscription: Subscription;
  private _addFav: string = 'Añadir a favoritos';
  private _removeFav: string = 'Eliminar de favoritos';
  private _isFav: boolean;
  private _favAux: ProductsAuxiliarService;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService) { 
       this._favAux = new ProductsAuxiliarService();
    }

  ngOnInit(): void {
    this._route.data.forEach((data: { product: Product }) => this.product = data.product);
    this.dataUser = this.product.seller;
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

  goBack(): void {
    window.history.back();
  }

  showProductsByUser(user: User): void {
    this._router.navigate(['/users', user.id]);
  }

  // método auxiliar para comprobar si el producto está almacenado en favoritos
  isFav(productId: number): boolean {
    return this._favAux.isFav(productId);    
  }

  // método auxiliar para añadir/eliminar el producto de favoritos
  manageFav(productId: number): void {
    this._favAux.manageLike(productId);
  } 
}
