import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { PersonaRequest } from '../models/persona-request.model';
import { PersonaResponse } from '../models/persona-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constans/url.constans';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends CrudService<PersonaRequest,PersonaResponse> {

  constructor(
    protected http:HttpClient,
  ) {
    super(http,urlConstants.persona);
   }
}
