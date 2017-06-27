import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsResolveService } from './product-details-resolve.service';
import { ProductByUserComponent } from './product-by-user/product-by-user.component';
import { ProductByUserResolveService } from './product-by-user-resolve.service';
import { ProductResetComponent } from './product-reset/product-reset.component';
import { ProductsCollectionComponent } from './products-collection/products-collection.component';
import { SoldProductsResolveService } from './sold-products-resolve.service';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsCollectionComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductDetailsResolveService
    }
  },
  {
    path: 'users/:userId',
    component: ProductByUserComponent,
    resolve: {
      product: ProductByUserResolveService
    }
  },
  {
    path: 'reset',
    component: ProductResetComponent,
    resolve: {
      products: SoldProductsResolveService
    }
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
