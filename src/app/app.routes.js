"use strict";
var home_component_1 = require('./components/home/home.component');
var management_component_1 = require("./components/management/management.component");
exports.routes = [
    { path: '', component: management_component_1.ManagementComponent },
    { path: 'management', component: management_component_1.ManagementComponent },
    { path: 'home', component: home_component_1.HomeComponent }
];
//# sourceMappingURL=app.routes.js.map