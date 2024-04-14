import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from '../../models/login-request.model';
import { AuthService } from '../../service/auth.service';
import { Subscriber } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm:FormGroup;
  loginRequest:LoginRequest=new LoginRequest();

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private _router:Router
  )
  {
    this.loginForm=this.fb.group({
      username:[null,[Validators.required]],
      password:[null,[Validators.required]],
    })
  }

  username:string = "";
  password:string = "";

  login(){

    console.log(this.loginForm.getRawValue());


    this.loginRequest=this.loginForm.getRawValue();

    this.authService.login(this.loginRequest).subscribe({
      next:(data:LoginResponse)=>{
        console.log(data);
        alert("Login correcto")
        //redirigir al dashboard
        this._router.navigate(['dashboard'])

        //ALMACENAMOS EL VALOR DEL TOKEN Y ALGUNOS VALORES DE USUARIO

        //PARA SESION STORAGE
        if(data.success)
        {
          sessionStorage.setItem("token",data.token);
          sessionStorage.setItem("idUsuario",data.usuario.idUsuario.toString());
          sessionStorage.setItem("username",data.usuario.username);
          sessionStorage.setItem("fullName",data.persona.nombrePersona)
          sessionStorage.setItem("rolId",data.rol.idRol.toString())
          sessionStorage.setItem("NombreRol",data.rol.nombreRol);
        }
        else{
          return;
        }

      },
      error:(err)=>{},
      complete:()=>{},
    })
   
  }

}
