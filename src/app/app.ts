/*
 * Angular Modules
 */
import { enableProdMode, NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Setup redux with ngrx
import { Store, StoreModule } from '@ngrx/store';
import { authStore, authInitialState } from './store/auth.store';

/**
 * Import our child components
 */
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './components/app.component';

/**
 * Import material UI Components
 */
import { MaterialModule } from '@angular/material';

import { routes } from './app.routes';

/**
 * Import the authentication service to be injected into our component
 */
import { Authentication } from './services/authentication';
import {ManagementComponent} from "./components/management/management.component";
import {FrequenciesService} from "./services/frequencies.service";
import {SettingsComponent} from "./components/settings/settings.component";
import {EmptyFreqsComponent} from "./components/empty_freqs/empty-freqs.component";
import {SongsService} from "./services/songs.service";
import {SongsComponent} from "./components/songs/songs.component";
import {RecordAdComponent} from "./components/record_ad/record-ad.component";
import {RecorderComponent} from "./components/ui-components/recorder/recorder.component";

/*
 * provide('AppStore', { useValue: appStore }),
 */
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true }),
        StoreModule.provideStore({ authStore }, { authStore: authInitialState }),
    ],
    providers: [Authentication, FrequenciesService, SongsService],
    entryComponents: [RecordAdComponent],
    declarations: [
      AppComponent,
      RecordAdComponent,
      SettingsComponent,
      ManagementComponent,
      EmptyFreqsComponent,
      SongsComponent,
      RecorderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
