import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServiceConfigComponent } from './service-config/service-config.component';
import { ConfigFormComponent } from './service-config/config-form/config-form.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { Authorization } from './serviceLayer/authorization.service';
import { canDeactivateGaurd } from './serviceLayer/can-deactivate-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [Authorization] },
  {
    path: 'serviceConfiguration', component: ServiceConfigComponent, canActivate: [Authorization], children: [
      { path: 'add', component: ConfigFormComponent, canDeactivate: [canDeactivateGaurd] },
      { path: 'edit/:id', component: ConfigFormComponent, canDeactivate: [canDeactivateGaurd] }
    ]
  },
  // { path: 'add', component: ServiceConfigComponent },
  { path: 'systemConfiguration', component: SystemConfigComponent, canActivate: [Authorization], canDeactivate: [canDeactivateGaurd] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
