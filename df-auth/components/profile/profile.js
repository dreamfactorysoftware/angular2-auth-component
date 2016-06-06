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
var common_1 = require('angular2/common');
var profile_1 = require('../../models/profile');
var base_http_1 = require('../../services/base-http');
var profile_2 = require('../../services/profile');
var router_2 = require('angular2/router');
var ProfileCmp = (function () {
    function ProfileCmp(profileService, router, params, formBuilder, httpService) {
        this.profileService = profileService;
        this.router = router;
        this.params = params;
        this.formBuilder = formBuilder;
        this.httpService = httpService;
        this.setPassword = false;
        this.firstName = new common_1.Control('', common_1.Validators.required);
        this.lastName = new common_1.Control('', common_1.Validators.required);
        this.name = new common_1.Control('');
        this.email = new common_1.Control('');
        this.phone = new common_1.Control('');
        this.profile = new profile_1.Profile();
        var self = this;
        this.profileService
            .get()
            .subscribe(function (data) {
            self.profile = data;
        });
        this.form = this.formBuilder.group({
            firstName: this.firstName,
            lastName: this.lastName,
            name: this.name,
            email: this.email,
            phone: this.phone
        });
    }
    ProfileCmp.prototype.save = function () {
        var _this = this;
        var self = this;
        if (this.setPassword) {
            if (this.newPassword !== this.verifyPassword) {
                alert('Please enter same new password in confirm password');
                return;
            }
            this.profileService.resetPassword(this.oldPassword, this.newPassword)
                .subscribe(function (response) {
                alert('Password updated');
            });
        }
        this.profileService.save(this.profile)
            .subscribe(function (response) {
            alert('Profile updated');
            _this.router.navigate(['Home']);
        });
    };
    ProfileCmp = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n\n   <form class=\"form-horizontal profile-form\" [ngFormModel]=\"form\" (ngSubmit)=\"save()\">\n     <fieldset>\n       <legend class=\"text-center\">Profile</legend>\n       <div class=\"form-group\">\n         <label for=\"firstName\" class=\"col-sm-3 control-label\">First name</label>\n         <div class=\"col-sm-9\">\n           <input class=\"form-control\" [(ngModel)]=\"profile.firstName\">\n         </div>\n       </div>\n\n       <div class=\"form-group\">\n         <label for=\"lastName\" class=\"col-sm-3 control-label\">Last name</label>\n         <div class=\"col-sm-9\">\n           <input class=\"form-control\" [(ngModel)]=\"profile.lastName\">\n         </div>\n       </div>\n\n       <div class=\"form-group\">\n         <label for=\"name\" class=\"col-sm-3 control-label\">Display Name</label>\n         <div class=\"col-sm-9\">\n           <input class=\"form-control\" [(ngModel)]=\"profile.name\">\n         </div>\n       </div>\n\n       <div class=\"form-group\">\n         <label for=\"email\" class=\"col-sm-3 control-label\">Email</label>\n         <div class=\"col-sm-9\">\n           <input class=\"form-control\" [(ngModel)]=\"profile.email\">\n         </div>\n       </div>\n\n       <div class=\"form-group\">\n         <label for=\"phone\" class=\"col-sm-3 control-label\">Phone</label>\n         <div class=\"col-sm-9\">\n           <input type=\"email\"class=\"form-control\" [(ngModel)]=\"profile.phone\">\n         </div>\n       </div>\n\n       <div class=\"form-group\">\n         <label for=\"phone\" class=\"col-sm-3 control-label\"></label>\n         <div class=\"col-sm-9\">\n           <input type=\"checkbox\" [(ngModel)]=\"setPassword\">\n           Set password manually \n         </div>\n       </div>\n\n       <div *ngIf=\"setPassword\" class=\"form-group\">\n         <label for=\"phone\" class=\"col-sm-3 control-label\"></label>\n         <div class=\"col-sm-9\">\n           <div class=\"row\">\n             <div class=\"col-sm-12\">\n               <input type=\"password\"class=\"form-control\" [(ngModel)]=\"oldPassword\" placeholder=\"Old password\">\n             </div>\n           </div>\n\n           <div class=\"row\">\n             <div class=\"col-sm-12\">\n               <input type=\"password\"class=\"form-control\" [(ngModel)]=\"newPassword\" placeholder=\"New password\">\n             </div>\n           </div>\n\n           <div class=\"row\">\n             <div class=\"col-sm-12\">\n               <input type=\"password\"class=\"form-control\" [(ngModel)]=\"verifyPassword\" placeholder=\"Confirm new password\">\n             </div>\n           </div>\n\n         </div>        \n       </div>\n\n\n       <div class=\"text-center\">\n         <button type=\"submit\" class=\"btn btn-primary btn-raised\">Save</button>\n         <a class=\"btn btn-danger btn-raised\" [routerLink]=\"['/Home']\">Cancel</a>\n       </div>\n     </fieldset>>\n   </form>\n\t",
            styles: ["\n   .profile-form{max-width:500px;margin:auto}\n\t"],
            providers: [base_http_1.BaseHttpService, profile_2.ProfileService],
            directives: [common_1.FORM_DIRECTIVES, router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [profile_2.ProfileService, router_1.Router, router_1.RouteParams, common_1.FormBuilder, base_http_1.BaseHttpService])
    ], ProfileCmp);
    return ProfileCmp;
})();
exports.ProfileCmp = ProfileCmp;
