import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { User } from '../user';

@Component({
  selector: 'app-user-products-list',
  templateUrl: './user-products-list.component.html',
  styleUrls: ['./user-products-list.component.css']
})
export class UserProductsListComponent {

  @Input() dataUser: User;
  @Output() clickOnProdList = new EventEmitter<User>();

  notifyProductList(userToShow: User): void {
    console.info(userToShow);
    this.clickOnProdList.emit(userToShow);
  }

}
