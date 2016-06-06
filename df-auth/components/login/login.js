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
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var base_http_1 = require('../../services/base-http');
var constants = require('../../config/constants');
var profile_1 = require('../../models/profile');
var LoginCmp = (function () {
    function LoginCmp(formBuilder, httpService, _router) {
        this.httpService = httpService;
        this._router = _router;
        this.email = new common_1.Control('', common_1.Validators.required);
        this.password = new common_1.Control('', common_1.Validators.required);
        this.form = formBuilder.group({
            email: this.email,
            password: this.password
        });
    }
    LoginCmp.prototype.storeToken = function (data) {
        this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
        localStorage.setItem('session_token', data.session_token);
        this._router.navigate(['Home']);
    };
    LoginCmp.prototype.forgot = function () {
        var _this = this;
        if (!this.email.value) {
            alert('Please enter your email.');
            return;
        }
        var doc = {
            email: this.email.value,
            reset: true
        };
        this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/system/admin/password?reset=true', JSON.stringify(doc))
            .subscribe(function (data) {
            alert('A password reset email has been sent to the provided email address.');
        }, function (error) {
            _this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/user/password?reset=true', JSON.stringify(doc))
                .subscribe(function (data) {
                alert('A password reset email has been sent to the provided email address.');
            }, function (error) {
                alert('Error, cannot reset password. Try again');
            });
        });
    };
    LoginCmp.prototype.formSubmit = function () {
        var _this = this;
        var self = this;
        this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/system/admin/session', JSON.stringify(this.form.value))
            .subscribe(function (data) {
            self.storeToken(data.json());
        }, function (error) {
            _this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/user/session', JSON.stringify(_this.form.value))
                .subscribe(function (data) {
                self.storeToken(data.json());
            }, function (error) {
                alert('Error, cannot login. Try again');
            });
        });
    };
    LoginCmp.profile = new profile_1.Profile();
    LoginCmp = __decorate([
        core_1.Component({
            selector: 'df-login',
            template: "\n\n    <div class=\"login-wrapper\">\n      <div class=\"card\">\n          <div class=\"card-height-indicator\"></div>\n          <div class=\"card-content\">\n              <div class=\"card-image\">\n                  <h3 class=\"card-image-headline\">Login</h3>\n              </div>\n\n              <div class=\"card-body\">\n                  <form class=\"form-horizontal\" [ngFormModel]=\"form\">\n                    <div class=\"form-group\">\n                      <label class=\"col-sm-2 control-label\" for=\"email\">Email</label>\n                      <div class=\"col-sm-10\">\n                        <input class=\"form-control\" ngControl=\"email\" name=\"email\">\n                      </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                      <label class=\"col-sm-2 control-label\" for=\"password\">Password</label>\n                      <div class=\"col-sm-10\">\n                        <input class=\"form-control\" type=\"password\" ngControl=\"password\" name=\"password\">\n                      </div>\n                    </div>\n\n                    <div class=\"text-center\">\n                  \n                    </div>\n\n                  </form>\n              </div>\n          \n              <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <a (click)=\"formSubmit()\" class=\"btn btn-success btn-raised pull-right\">Login</a>\n                </div>\n                <div class=\"col-md-6\">\n                  <a (click)=\"forgot()\" class=\"btn btn-info btn-raised pull-left\">Forgot Password</a>\n                </div>\n              </div>\n\n              <div class=\"row signup-link\">\n                <div class=\"col-md-12\">\n                  <a class=\"pull-right\" [routerLink]=\"['/Register']\">Sign Up</a>\n                </div>\n              </div>\n\n          </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .login-wrapper{text-align:center}.login-wrapper>.card{width:400px;padding:10px;text-align:center;width:500px;margin:auto;font-size:inherit}.signup-link{margin-top:25px}\n  "],
            directives: [common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
            providers: [base_http_1.BaseHttpService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, base_http_1.BaseHttpService, router_1.Router])
    ], LoginCmp);
    return LoginCmp;
})();
exports.LoginCmp = LoginCmp;
