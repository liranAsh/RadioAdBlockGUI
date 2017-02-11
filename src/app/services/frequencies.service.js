/**
 * Created by Liran on 11/02/2017.
 */
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
var core_1 = require("@angular/core");
var FrequenciesService = (function () {
    function FrequenciesService() {
        this.freqs = [];
    }
    FrequenciesService.prototype.getFreqs = function () {
        return this.freqs;
    };
    FrequenciesService.prototype.save = function (freqs) {
        var _this = this;
        freqs.forEach(function (freq) {
            var saveFreq = Object.assign({}, { freq: freq.freq, priority: freq.priority });
            _this.freqs.push(saveFreq);
        });
    };
    FrequenciesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FrequenciesService);
    return FrequenciesService;
}());
exports.FrequenciesService = FrequenciesService;
//# sourceMappingURL=frequencies.service.js.map