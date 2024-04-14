import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServicioResponse } from '../../../models/servicio-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ServicioService } from '../../../service/servicio.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-servicio-list',
  templateUrl: './mant-servicio-list.component.html',
  styleUrls: ['./mant-servicio-list.component.scss']
})
export class MantServicioListComponent implements OnInit{

   config ={
    backdrop:true,
    ignoreBackdropClick:true
  };

  

  servicios:ServicioResponse[]=[];
  modalRef?: BsModalRef;
  servicioSelected: ServicioResponse=new ServicioResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _servicioService:ServicioService 
  )
  {

  }



  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.listarServicios();
    
  }

  listarServicios()
  {
    this._servicioService.getAll().subscribe({
      next:(data:ServicioResponse[])=>{
        this.servicios=data
        console.log("servicios",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearServicio(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO SERVICIO";
    this.servicioSelected=new ServicioResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarServicio(template: TemplateRef<any>,servicio:ServicioResponse)
  { 
    this.servicioSelected=servicio;
    this.titleModal="MODIFICAR SERVICIO";
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
      this.listarServicios();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._servicioService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarServicios();
        },
      })
    }
  }

}
