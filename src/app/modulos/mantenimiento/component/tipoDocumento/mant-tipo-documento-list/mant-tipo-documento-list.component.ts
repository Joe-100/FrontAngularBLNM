import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoDocumentoResponse } from '../../../models/tipoDocumento-response.model';
import { TipoDocumentoService } from '../../../service/tipo-documento.service';
import { Router } from '@angular/router';
import { AccionMantConst } from 'src/app/constans/general.constans';


@Component({
  selector: 'app-mant-tipo-documento-list',
  templateUrl: './mant-tipo-documento-list.component.html',
  styleUrls: ['./mant-tipo-documento-list.component.scss']
})
export class MantTipoDocumentoListComponent implements OnInit {

  tipoDocumentos:TipoDocumentoResponse[]=[];
  modalRef?: BsModalRef;
  tipoDocumentoSelected: TipoDocumentoResponse=new TipoDocumentoResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _tipoDocumentoService:TipoDocumentoService 
  )
  {

  }

  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.listarTipoDocumentos();
    
  }

  listarTipoDocumentos()
  {
    this._tipoDocumentoService.getAll().subscribe({
      next:(data:TipoDocumentoResponse[])=>{
        this.tipoDocumentos=data
        console.log("tipoDocumentos",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearTipoDocumento(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO DOCUMENTO";
    this.tipoDocumentoSelected=new TipoDocumentoResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarTipoDocumento(template: TemplateRef<any>,cargo:TipoDocumentoResponse)
  { 
    this.tipoDocumentoSelected=cargo;
    this.titleModal="MODIFICAR TIPO DOCUMENTO";
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
      this.listarTipoDocumentos();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._tipoDocumentoService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarTipoDocumentos();
        },
      })
    }
  }


}
