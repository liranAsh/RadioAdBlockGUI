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
 * Created by Liran on 11/02/2017.
 */
var core_1 = require("@angular/core");
var frequencies_service_1 = require("../../services/frequencies.service");
var frequency_1 = require("../../models/frequency");
var ManagementComponent = (function () {
    function ManagementComponent(freqService) {
        this.freqService = freqService;
    }
    ManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.freqs = [];
        // Init frequencies from service
        this.freqService.getFreqs().forEach(function (freq) {
            _this.freqs.push(new frequency_1.Frequency(freq.freq, freq.priority));
        });
    };
    ManagementComponent = __decorate([
        core_1.Component({
            templateUrl: "./management.component.html",
            styles: ["\n\n    .outer {\n        display: table;\n        position: absolute;\n        height: 80%;\n        width: 99%;\n    }\n    \n    .middle {\n        display: table-cell;\n        vertical-align: middle;\n    }\n    \n    .inner {\n      margin-left: auto;\n      margin-right: auto;\n      width: 50%;\n      text-align: center;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [frequencies_service_1.FrequenciesService])
    ], ManagementComponent);
    return ManagementComponent;
}());
exports.ManagementComponent = ManagementComponent;
//# sourceMappingURL=management.component.js.map