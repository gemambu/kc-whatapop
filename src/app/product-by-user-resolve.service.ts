import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class ProductByUserResolveService implements Resolve<User> {

  constructor(
    private _userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // Obtenemos los productos con el filtro creado
    let userInfo: Observable<User> = this._userService.getUser(route.params['userId']);
    return userInfo;
  }

}
