var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var home_1 = require('../home/home');
var login_1 = require('../login/login');
var profile_1 = require('../profile/profile');
var register_1 = require('../register/register');
var base_http_1 = require('../../services/base-http');
var profile_2 = require('../../services/profile');
var profile_3 = require('../../models/profile');
var AppCmp = (function () {
    function AppCmp(httpService, _router, profileService, location) {
        this.httpService = httpService;
        this._router = _router;
        this.profileService = profileService;
        this.location = location;
        this.hideHeader = false;
        this.profile = new profile_3.Profile();
        this.showDd = false;
        var self = this;
        if (!this.location.path()) {
            this._router.navigate(['/Home']);
        }
        _router.subscribe(function (path) {
            if (path === 'login' || path === 'register') {
                self.hideHeader = true;
            }
            else {
                self.hideHeader = false;
            }
        });
        profile_2.ProfileService.$$profileUpdated.subscribe(function (profile) {
            self.profile = profile;
        });
    }
    AppCmp.prototype.logout = function () {
        this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', '');
        localStorage.setItem('session_token', '');
        this._router.navigate(['Login']);
    };
    AppCmp.prototype.toggleDd = function () {
        this.showDd = !this.showDd;
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <section class=\"sample-app-content\">\n\n    \t<nav class=\"navbar navbar-default df-header\">\n    \t  <div class=\"container-fluid\">\n    \t  \t<div class=\"navbar-header\">\n    \t  \t\t<a href=\"https://www.dreamfactory.com/\">\n    \t  \t\t\t<img class=\"df-logo\" src=\"https://www.dreamfactory.com/sites/default/files/dreamfactory-logo-sm-horz-%402x.png\"/>\n    \t  \t\t</a>\n    \t  \t</div>\n  \t\t\n      \t\t<div [hidden]=\"hideHeader\">\n    \t\t    <div class=\"navbar-collapse collapse navbar-responsive-collapse pull-right\" >\n    \t\t    \t<ul class=\"nav navbar-nav navbar-right\">\n    \t\t\t        <li class=\"dropdown\" [ngClass]=\"{open: showDd}\">\n    \t\t\t          \t<h5>\n    \t\t\t\t\t        <a class=\"dropdown-toggle\" (click)=\"toggleDd()\">\n    \t\t\t\t          \t\t<span class=\"fa fa-fw fa-user\"></span>\n    \t\t\t\t          \t\t{{ profile.name }} \n    \t\t\t\t        \t</a>\n    \t\t\t\t        </h5>\n    \t\t\t          <ul class=\"dropdown-menu\" (click)=\"toggleDd()\">\n    \t\t\t          \t<li><a [routerLink]=\"['/Profile']\">Profile</a></li>\n    \t\t      \t\t\t<li><a (click)=\"logout()\">Logout</a></li>\n    \t\t\t          </ul>\n    \t\t\t        </li>\n    \t\t\t    </ul>\n\t\t    \t\n    \t\t    </div>\n    \t\t</div>\n    \t  </div>\n    \t</nav>\n      <nav >\n      </nav>\n\n      <router-outlet>\n      </router-outlet>\n    </section>\n  ",
            styles: ["\n    html{font-size:14px}.fa-edit.btn-success,.fa-plus,.fa-trash.btn-danger{min-width:35px}.navbar-default{padding:0}.dropdown-toggle{cursor:pointer;background-color:transparent;color:#fff}.df-header{background-color:#7093b5;padding:10px}.df-logo{width:175px;height:24px}.h-centered{text-align:center}.h-centered *{margin:auto;margin-top:5px}.df-header .container-fluid{width:100%}\n  "],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [base_http_1.BaseHttpService, profile_2.ProfileService]
        }),
        router_1.RouteConfig([
            { path: '/home', component: home_1.HomeCmp, as: 'Home' },
            { path: '/profile', component: profile_1.ProfileCmp, as: 'Profile' },
            { path: '/login', component: login_1.LoginCmp, as: 'Login' },
            { path: '/register', component: register_1.RegisterCmp, as: 'Register' }
        ]), 
        __metadata('design:paramtypes', [base_http_1.BaseHttpService, router_1.Router, profile_2.ProfileService, router_1.Location])
    ], AppCmp);
    return AppCmp;
})();
exports.AppCmp = AppCmp;
