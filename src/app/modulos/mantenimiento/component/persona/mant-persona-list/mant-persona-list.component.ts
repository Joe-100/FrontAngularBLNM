import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonaResponse } from '../../../models/persona-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PersonaService } from '../../../service/persona.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-persona-list',
  templateUrl: './mant-persona-list.component.html',
  styleUrls: ['./mant-persona-list.component.scss']
})
export class MantPersonaListComponent implements OnInit {

  personas:PersonaResponse[]=[];
  modalRef?: BsModalRef;
  personaSelected: PersonaResponse=new PersonaResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _personaService:PersonaService 
  )
  {

  }



  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.listarPersonas();
    
  }

  listarPersonas()
  {
    this._personaService.getAll().subscribe({
      next:(data:PersonaResponse[])=>{
        this.personas=data
        console.log("personas",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearPersona(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO PERSONA";
    this.personaSelected=new PersonaResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarPersona(template: TemplateRef<any>,persona:PersonaResponse)
  { 
    this.personaSelected=persona;
    this.titleModal="MODIFICAR PERSONA";
    this.accionModal=AccionMantConst.editar;
    this.openModal(template);
  }

  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide();
    if (res){
      this.listarPersonas();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._personaService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarPersonas();
        },
      })
    }
  }


}
