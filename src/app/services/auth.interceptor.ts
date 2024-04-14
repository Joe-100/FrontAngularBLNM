import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { alert_error } from '../functions/general.functions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router:Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token=sessionStorage.getItem("token");
    //obtesnemos otra vaarialbes



    //SIMULAR LOS ERRORES

    
    let request=req;
    if(token){
      request=req.clone
      (
        {
          setHeaders:{
              authorization: `Bearer ${token}`
          }
        }
      );
    }
   
    
    return next.handle(request).pipe(
      catchError(
        (err:HttpErrorResponse)=>{
          let error = err.error;
          let title:string = "Error en el servidor | Comuniquese con el area de sistemas"

          switch(err.status)
          {
            case 400: //TODO: BAD REQUEST 
              alert("ERROR DEL BAD REQUEST")
              alert_error("ERROR DEL BAD REQUEST","DATOS ENVIADOS INOCRRECTOS")
            break;
            case 401: //TODO: TOKEN INVALIDO | NO TIENES PERMISOS
              alert("VUELVE A INICIAR SESION");
              alert_error("SU SESION HA CADUCADOS","VUELVA A REALIZAR EL LOGIN")
              this.router.navigate([''])
            break;
            case 403: //TODO: NO TIENES PERMISOS PARA EECUTAR UNA DETERMINADA ACCION 
              alert("PERMISOS INSUFICIENTES")
              alert_error("PERMISOS INSUFICIENTES","Coordinine con su administrador")
            break;
            case 404: //TODO: URL NO ENCONTRADA
              alert("RECURSO NO ENCONTRADO")
              alert_error("RECURSO NO ENCONTRADO","")
            break;
            case 500: //TODO: ERROR NO CONTROLADO
              alert("OCURRIO UN PROBLEMA, INTENTELO EN UNOS MINUTOS");
              alert_error("OCURRIO UN ERROR","Intentelo mas tarde")
            break;
            case 0: //TODO: ERROR NO CONTROLADO
              alert_error("OCURRIO UN ERROR","No podemos comunicarnos con el servicio")  
            break;
          default:
            alert("ERROR NO CONTROLADO");
            break
          }


          return throwError(()=>{err})
        })
    );
  }
}
