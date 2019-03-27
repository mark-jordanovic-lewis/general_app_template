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

import { UserService } from './user.service';
import { HttpServiceService } from './http-service.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CommunicationsComponent,
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
