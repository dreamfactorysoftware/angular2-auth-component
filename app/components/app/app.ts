import {Component, ViewEncapsulation} from 'angular2/core';
import {
  Router,
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../home/home';
import {LoginCmp} from '../login/login';
import {RegisterCmp} from '../register/register';

import {BaseHttpService} from '../../services/base-http';

@Component({
  selector: 'app',
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  providers: [BaseHttpService]
})
@RouteConfig([
  { path: '/home', component: HomeCmp, as: 'Home' },
  { path: '/login', component: LoginCmp, as: 'Login' },
  { path: '/register', component: RegisterCmp, as: 'Register' }
])
export class AppCmp {

  hideHeader: boolean = false;
  constructor (private httpService: BaseHttpService, private _router:Router) {
    var self = this;
    _router.subscribe((path) => {
      if (path === 'login' || path === 'register') {
        self.hideHeader = true;
      } else {
        self.hideHeader = false;
      }
    });
  }

  logout () {
    this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', '');
    localStorage.setItem('session_token', '');
    this._router.navigate(['Login']);
  }
}
