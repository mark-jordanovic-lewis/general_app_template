import { Angular2TokenService } from 'angular2-token';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { CommunicationsComponent } from './communications/communications.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// FAKE DB
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StateStoreService }  from './state-store.service';

HttpClientModule
// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
HttpClientInMemoryWebApiModule.forRoot(
  StateStoreService, { dataEncapsulation: false }
)
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CommunicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(StateStoreService),
    FormsModule
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
