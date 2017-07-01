import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { User } from '../user';

@Component({
  selector: 'app-user-products-list',
  templateUrl: './user-products-list.component.html',
  styleUrls: ['./user-products-list.component.css']
})
export class UserProductsListComponent implements OnInit {

@Input() dataUser: User;
@Output() clickOnProdList = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  notifyProductList(userToShow: User): void {
    console.info("[notifyProductList] Opening product List for User:");
    console.info(userToShow);
    this.clickOnProdList.emit(userToShow);
  }

}
