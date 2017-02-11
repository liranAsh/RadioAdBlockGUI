"use strict";
var testing_1 = require('@angular/core/testing');
var home_component_1 = require('./home.component');
var forms_1 = require('@angular/forms');
// Setup redux with ngrx
var store_1 = require('@ngrx/store');
var auth_store_1 = require('../../store/auth.store');
describe('App component', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({
        imports: [
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            store_1.StoreModule.provideStore({ authStore: auth_store_1.authStore }, { authStore: auth_store_1.authInitialState }),
        ],
        providers: [
            home_component_1.HomeComponent,
        ],
    }); });
    it('should have default data', testing_1.inject([home_component_1.HomeComponent], function (home) {
        expect(home.messageForm.controls['messageText'].value).toEqual('Angular2');
    }));
});
//# sourceMappingURL=home.spec.js.map