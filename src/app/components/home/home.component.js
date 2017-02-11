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
var forms_1 = require('@angular/forms');
/**
 * Import the ngrx configured store
 */
var store_1 = require('@ngrx/store');
var HomeComponent = (function () {
    function HomeComponent(store) {
        this.store = store;
        this.messageForm = new forms_1.FormGroup({
            messageText: new forms_1.FormControl('Angular2'),
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var state = this.store.select('authStore').subscribe(function (state) {
            _this.name = state.username;
        });
    };
    HomeComponent.prototype.doNotify = function () {
        var message = {
            title: "Content-Image Notification",
            body: "Short message plus a custom content image",
        };
        new Notification(message.title, message);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'ae-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss'],
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map