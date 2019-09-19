import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { DataLayer } from './serviceLayer/dataLayer.service';
import { ServiceConfigdataLayer } from './serviceLayer/storageLayer.service';
import { ServiceConfigComponent } from './service-config/service-config.component';
import { NavComponent } from './nav/nav.component';
import { ConfigFormComponent } from './service-config/config-form/config-form.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { SystemConfigStorageLayer } from './serviceLayer/systemConfigLayer.service';
import { WebStorages } from './serviceLayer/webstorage.service';
import { TokenInterceptor } from './serviceLayer/token.interceptor';
import { Authorization } from './serviceLayer/authorization.service';
import { UserLoginLayer } from './serviceLayer/userLogin.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { canDeactivateGaurd } from './serviceLayer/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ServiceConfigComponent,
    NavComponent,
    ConfigFormComponent,
    PopupModalComponent,
    SystemConfigComponent,    
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataLayer, ServiceConfigdataLayer, SystemConfigStorageLayer, WebStorages, Authorization, UserLoginLayer, canDeactivateGaurd
    , { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
