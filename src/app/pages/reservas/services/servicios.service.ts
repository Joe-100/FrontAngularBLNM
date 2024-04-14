import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constans/url.constans';
import { ServicioRequest } from 'src/app/models/servicio-request.model';
import { ServicioResponse } from 'src/app/models/servicio-response.model';
import { CrudService } from 'src/app/modulos/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService extends CrudService<ServicioRequest,ServicioResponse> {

  constructor(
    protected http:HttpClient,
  ) {
    super(http, urlConstants.servicio)
   }
}
