import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientModule  //sin este no podemos consumier ningun servicio web
    SharedModule
  ]
})
export class AuthModule { }
