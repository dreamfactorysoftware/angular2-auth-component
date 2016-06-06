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
var RegisterCmp = (function () {
    function RegisterCmp(httpService, formBuilder, _router) {
        this.httpService = httpService;
        this.formBuilder = formBuilder;
        this._router = _router;
        this.form = formBuilder.group({
            first_name: new common_1.Control('', common_1.Validators.required),
            last_name: new common_1.Control(''),
            email: new common_1.Control('', common_1.Validators.required),
            password: new common_1.Control('', common_1.Validators.required)
        });
    }
    RegisterCmp.prototype.storeToken = function (data) {
        this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', data && data.session_token);
        localStorage.setItem('session_token', data.session_token);
        this._router.navigate(['Home']);
    };
    RegisterCmp.prototype.register = function () {
        var self = this;
        this.httpService.http
            .post(constants.DSP_INSTANCE_URL + '/api/v2/user/register?login=true', JSON.stringify(this.form.value))
            .subscribe(function (response) {
            self.storeToken(response.json());
        }, function (error) {
            alert('Error, cannot register. Try again');
        });
    };
    RegisterCmp = __decorate([
        core_1.Component({
            selector: 'df-register',
            template: "\n    <div class=\"signin-card\">\n\n      <h1 class=\"text-center\">Register</h1>\n      <form class=\"form-horizontal\" [ngFormModel]=\"form\" (ngSubmit)=\"register()\">\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">First name</label>\n          <div class=\"col-sm-10\">\n            <input class=\"form-control\" ngControl=\"first_name\">\n          </div>\n        </div>\n    \n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Last name</label>\n          <div class=\"col-sm-10\">\n            <input class=\"form-control\" ngControl=\"last_name\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Email</label>\n          <div class=\"col-sm-10\">\n            <input class=\"form-control\" type=\"email\" ngControl=\"email\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Password</label>\n          <div class=\"col-sm-10\">\n            <input class=\"form-control\" type=\"password\" ngControl=\"password\">\n          </div>\n        </div>\n\n        <div class=\"text-center\">\n          <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n          <a class=\"btn btn-danger\" [routerLink]=\"['/Login']\">Back</a>\n        </div>\n\n      </form>\n    </div>\n  ",
            styles: ["\n\n  "],
            providers: [base_http_1.BaseHttpService],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [base_http_1.BaseHttpService, common_1.FormBuilder, router_1.Router])
    ], RegisterCmp);
    return RegisterCmp;
})();
exports.RegisterCmp = RegisterCmp;
