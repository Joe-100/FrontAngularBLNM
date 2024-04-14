import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsuarioResponse } from '../../../models/usuario-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-usuario-list',
  templateUrl: './mant-usuario-list.component.html',
  styleUrls: ['./mant-usuario-list.component.scss']
})
export class MantUsuarioListComponent implements OnInit{

  usuarios:UsuarioResponse[]=[];
  modalRef?: BsModalRef;
  usuarioSelected: UsuarioResponse=new UsuarioResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _usuarioService:UsuarioService 
  )
  {

  }



  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.listarUsuarios();
    
  }

  listarUsuarios()
  {
    this._usuarioService.getAll().subscribe({
      next:(data:UsuarioResponse[])=>{
        this.usuarios=data
        console.log("usuarios",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearUsuario(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO USUARIO";
    this.usuarioSelected=new UsuarioResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarUsuario(template: TemplateRef<any>,usuario:UsuarioResponse)
  { 
    this.usuarioSelected=usuario;
    this.titleModal="MODIFICAR USUARIO";
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
      this.listarUsuarios();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._usuarioService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarUsuarios();
        },
      })
    }
  }

}
