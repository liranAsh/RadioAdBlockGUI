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
/**
 * Import decorators and services from angular
 */
var core_1 = require('@angular/core');
/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        //check authentication
    };
    AppComponent = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            selector: 'ae-app',
            styleUrls: ['./app.theme.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n    <!--<div [class.m2app-dark]=\"isDarkTheme\">-->\n        <!--<main>-->\n            <!--<router-outlet></router-outlet>-->\n            <!--<br/>-->\n            <!--<md-slide-toggle (change)=\"isDarkTheme = !isDarkTheme\" [checked]=\"isDarkTheme\" color=\"primary\">-->\n                <!--Set Dark theme2-->\n            <!--</md-slide-toggle>-->\n        <!--</main>-->\n    <!--</div>-->\n    <router-outlet></router-outlet>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map