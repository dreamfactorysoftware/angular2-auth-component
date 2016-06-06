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
var profile_1 = require('../models/profile');
var constants = require('../config/constants');
var base_http_1 = require('./base-http');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
var ServerResponse = (function () {
    function ServerResponse(resource) {
        this.resource = resource;
    }
    return ServerResponse;
})();
;
var ProfileService = (function () {
    function ProfileService(httpService) {
        this.httpService = httpService;
        this.baseResourceUrl = constants.DSP_INSTANCE_URL + '/api/v2/user/profile';
        this.resetPasswordUrl = constants.DSP_INSTANCE_URL + '/api/v2/user/password?login=false&reset=true';
    }
    ;
    ProfileService.prototype.get = function () {
        var self = this;
        return this.httpService.http
            .get(this.baseResourceUrl)
            .map(function (response) {
            var profile = profile_1.Profile.fromJson(response.json());
            ProfileService.$$profileUpdated.next(profile);
            return profile;
        });
    };
    ;
    ProfileService.prototype.save = function (profile) {
        var self = this;
        return this.httpService.http.post(this.baseResourceUrl, profile.toJson(true))
            .map(function (response) {
            ProfileService.$$profileUpdated.next(profile);
            return response;
        });
    };
    ;
    ProfileService.prototype.resetPassword = function (oldPassword, newPassword) {
        var data = {
            old_password: oldPassword,
            new_password: newPassword
        };
        return this.httpService.http.post(this.resetPasswordUrl, JSON.stringify(data))
            .map(function (response) {
            return response;
        });
    };
    ProfileService.$$profileUpdated = new Subject_1.Subject();
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [base_http_1.BaseHttpService])
    ], ProfileService);
    return ProfileService;
})();
exports.ProfileService = ProfileService;
