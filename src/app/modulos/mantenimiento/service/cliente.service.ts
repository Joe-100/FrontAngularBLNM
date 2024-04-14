import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { ClienteRequest } from '../models/cliente-request.model';
import { ClienteResponse } from '../models/cliente-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constans/url.constans';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<ClienteRequest,ClienteResponse>{

  constructor(
    protected http:HttpClient,
  ) {
    super(http, urlConstants.cliente);
   }
}