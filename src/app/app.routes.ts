import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {ManagementComponent} from "./components/management/management.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {SongsComponent} from "./components/songs/songs.component";

export const routes: Routes = [
  { path: '', component: ManagementComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'songs', component: SongsComponent }
];
