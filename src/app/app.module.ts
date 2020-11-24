import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


//Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { LogoutComponent } from './logout/logout.component';


//Servicios
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    //PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ServiceModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
