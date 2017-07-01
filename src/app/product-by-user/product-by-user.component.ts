import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { User } from '../user';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { ProductFilter } from '../product-filter';
import { Product } from '../product';

import { ProductsCollectionComponent } from '../products-collection/products-collection.component';

import { ProductFilterComponent } from '../product-filter/product-filter.component';


@Component({
  selector: 'app-product-by-user',
  templateUrl: './product-by-user.component.html',
  styleUrls: ['./product-by-user.component.css']
})
export class ProductByUserComponent implements OnInit {

  @Input() userToShow: User;
  @Output() clickOnProdList = new EventEmitter<User>();

  private _filter: ProductFilter = {};

  private _userSubscription: Subscription;
  private products: Observable<Product[]>;
  private _collection: ProductsCollectionComponent;
  private _productFilter: ProductFilterComponent;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _productService: ProductService
    
  ) { }

  ngOnInit() {

    this._route.data.forEach((data: { product: User }) => this.userToShow = data.product);

    console.log('Consultando productos del usuario: ', this.userToShow.nick);
    console.log('info del usu: ', this.userToShow);

    this._filter.userId = this.userToShow.id;

    this._collection = new ProductsCollectionComponent(
        this._productService, 
        this._route, 
        this._router);

    window.scrollTo(0, 0);
  }

  getFilter(): ProductFilter{
    return this._filter;
  }
  

  goBack(): void {
    window.history.back();
  }

}
