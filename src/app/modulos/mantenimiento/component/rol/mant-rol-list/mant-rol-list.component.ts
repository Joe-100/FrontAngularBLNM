import { Component, OnInit, TemplateRef } from '@angular/core';
import { RolResponse } from '../../../models/rol-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { RolService } from '../../../service/rol.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-rol-list',
  templateUrl: './mant-rol-list.component.html',
  styleUrls: ['./mant-rol-list.component.scss']
})
export class MantRolListComponent implements OnInit {

  roles:RolResponse[]=[];
  modalRef?: BsModalRef;
  rolSelected: RolResponse=new RolResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _rolService:RolService 
  )
  {

  }



  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.listarRoles();
    
  }

  listarRoles()
  {
    this._rolService.getAll().subscribe({
      next:(data:RolResponse[])=>{
        this.roles=data
        console.log("roles",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearRoles(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO ROL";
    this.rolSelected=new RolResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarRoles(template: TemplateRef<any>,rol:RolResponse)
  { 
    this.rolSelected=rol;
    this.titleModal="MODIFICAR ROLES";
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
      this.listarRoles();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._rolService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarRoles();
        },
      })
    }
  }


}
