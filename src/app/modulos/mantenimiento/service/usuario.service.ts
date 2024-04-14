import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { UsuarioRequest } from '../models/usuario-request.model';
import { UsuarioResponse } from '../models/usuario-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constans/url.constans';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<UsuarioRequest,UsuarioResponse> {

  constructor(
    protected http:HttpClient,
  ) {
    super(http, urlConstants.usuario);
   }
}
