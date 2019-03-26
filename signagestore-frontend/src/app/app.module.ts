import { Angular2TokenService } from 'angular2-token';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { CommunicationsComponent } from './communications/communications.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { UserShareService } from './user-share.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CommunicationsComponent,
    LandingPageComponent,
    UserCreateComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Angular2TokenService,
    UserShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
