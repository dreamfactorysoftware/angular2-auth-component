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
var base_http_1 = require('../../services/base-http');
var profile_1 = require('../../services/profile');
var profile_2 = require('../../models/profile');
var HomeCmp = (function () {
    function HomeCmp(profileService) {
        this.profileService = profileService;
        this.profile = new profile_2.Profile();
        var self = this;
        this.profileService
            .get()
            .subscribe(function (data) {
            self.profile = data;
        });
    }
    HomeCmp = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <h3 class=\"text-center\">\n    \tYou are now logged in as {{ profile.name }}\n    </h3>\n  ",
            styles: ["\n    .note{color:#a8a8a8}smile{width:32px;height:32px;display:inline-block;vertical-align:bottom;background:url(assets/img/smile.png)}\n  "],
            providers: [base_http_1.BaseHttpService, profile_1.ProfileService]
        }), 
        __metadata('design:paramtypes', [profile_1.ProfileService])
    ], HomeCmp);
    return HomeCmp;
})();
exports.HomeCmp = HomeCmp;
