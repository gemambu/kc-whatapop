import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-product-by-user',
  templateUrl: './product-by-user.component.html',
  styleUrls: ['./product-by-user.component.css']
})
export class ProductByUserComponent implements OnInit {

  @Input() data: User;

  @Output() clickOnUser = new EventEmitter<User>();

  notifyDetail(user: User): void {
    console.info("Clicked detail for product: " + user.name);
    this.clickOnUser.emit(user);
  }

  constructor() { }

  ngOnInit() {
    console.log('Llego a la nueva página!!!');
    window.scrollTo(0, 0);
  }

  goBack(): void {
    window.history.back();
  }

}
