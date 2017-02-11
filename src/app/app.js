"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
 * Angular Modules
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
// Setup redux with ngrx
var store_1 = require('@ngrx/store');
var auth_store_1 = require('./store/auth.store');
/**
 * Import our child components
 */
var home_component_1 = require('./components/home/home.component');
var app_component_1 = require('./components/app.component');
/**
 * Import material UI Components
 */
var material_1 = require('@angular/material');
var app_routes_1 = require('./app.routes');
/**
 * Import the authentication service to be injected into our component
 */
var authentication_1 = require('./services/authentication');
var management_component_1 = require("./components/management/management.component");
var frequencies_service_1 = require("./services/frequencies.service");
/*
 * provide('AppStore', { useValue: appStore }),
 */
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                material_1.MaterialModule.forRoot(),
                router_1.RouterModule.forRoot(app_routes_1.routes, { useHash: true }),
                store_1.StoreModule.provideStore({ authStore: auth_store_1.authStore }, { authStore: auth_store_1.authInitialState }),
            ],
            providers: [authentication_1.Authentication, frequencies_service_1.FrequenciesService],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, management_component_1.ManagementComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map