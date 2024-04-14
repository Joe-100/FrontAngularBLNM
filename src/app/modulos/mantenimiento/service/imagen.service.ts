import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { ClienteRequest } from '../models/cliente-request.model';
import { ClienteResponse } from '../models/cliente-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constans/url.constans';
import { ImagenRequest } from '../models/imagen-request.model';
import { ImagenResponse } from '../models/imagen-response.model';

@Injectable({
  providedIn: 'root'
})
export class ImagenService extends CrudService<ImagenRequest,ImagenResponse> {

  constructor(
    protected http:HttpClient,
  ) { 
    super(http, urlConstants.imagen);
  }
}
