var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var exception_handler_1 = require('angular2/src/facade/exception_handler');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var app_1 = require('./components/app/app');
var interceptors_1 = require('./config/interceptors');
var exception_handler_2 = require('./config/exception-handler');
var profile_1 = require('./services/profile');
browser_1.bootstrap(app_1.AppCmp, [
    router_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    profile_1.ProfileService,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    core_1.provide(http_1.RequestOptions, { useClass: interceptors_1.DfRequestOptions }),
    core_1.provide(exception_handler_1.ExceptionHandler, { useClass: exception_handler_2.CustomExceptionHandler }),
    core_1.provide(Window, { useValue: window })
]);
