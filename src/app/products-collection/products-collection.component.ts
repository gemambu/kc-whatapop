import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

import { Product } from '../product';
import { ProductFilter } from '../product-filter';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products-collection',
  templateUrl: './products-collection.component.html',
  styleUrls: ['./products-collection.component.css']
})
export class ProductsCollectionComponent implements OnDestroy, OnInit {

  // Parámetros para reutilización de codigo
  @Input() defaultSearch: boolean = true;
  @Input() defaultFilter: ProductFilter = null;

  products: Product[];
  private _filterStream$: Subject<ProductFilter> = new Subject;

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._filterStream$
      .switchMap((filter: ProductFilter) => this._productService.getProducts(filter))
      .subscribe((products: Product[]) => this.products = products);

    // comprobamos si es la primera búsqueda de productos o se busca por usuario
    if (this.defaultSearch) { 
      this.filterCollection(null); 
    } else {
      console.log('Búsqueda de productos por usuario');
      this.filterCollection(this.defaultFilter);
    }
  }

  ngOnDestroy(): void {
    this._filterStream$.unsubscribe();
  }

  filterCollection(filter: ProductFilter): void {
    this._filterStream$.next(filter);
  }

  showDetails(productToShow: Product): void {
    console.info("Opening detail for product: " + productToShow.name);
    this.router.navigate(['/products', productToShow.id]);
  }
}
