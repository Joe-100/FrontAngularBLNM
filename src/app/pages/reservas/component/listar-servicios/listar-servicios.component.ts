import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicioResponse } from 'src/app/models/servicio-response.model';
import { ServiciosService } from '../../services/servicios.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.scss']
})
export class ListarServiciosComponent implements OnInit{

  servicios:ServicioResponse[]=[];
  modalRef?: BsModalRef;
  serviciosSelected: ServicioResponse=new ServicioResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _serviciosService:ServiciosService
  )
  {

  }



  ngOnInit(): void {
    this.listarServicios();
  }

   listarServicios()
  {
    this._serviciosService.getAll().subscribe({
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
    this.serviciosSelected=new ServicioResponse();
    this.accionModal=AccionMantConst.crear;
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


}
