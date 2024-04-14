import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClienteResponse } from '../../../models/cliente-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ClienteService } from '../../../service/cliente.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-cliente-list',
  templateUrl: './mant-cliente-list.component.html',
  styleUrls: ['./mant-cliente-list.component.scss']
})
export class MantClienteListComponent implements OnInit {

  clientes:ClienteResponse[]=[];
  modalRef?: BsModalRef;
  clienteSelected: ClienteResponse=new ClienteResponse();
  titleModal:string="";
  accionModal:number=0;

  constructor(
    private _route:Router,
    private modalService: BsModalService,
    private _clienteService:ClienteService 
  )
  {

  }

  ngOnInit(): void {

    this.listarClientes();

  }

  listarClientes()
  {
    this._clienteService.getAll().subscribe({
      next:(data:ClienteResponse[])=>{
        this.clientes=data
        console.log("clientes",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearCliente(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO CLIENTE";
    this.clienteSelected=new ClienteResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarCliente(template: TemplateRef<any>,cliente:ClienteResponse)
  { 
    this.clienteSelected=cliente;
    this.titleModal="MODIFICAR CLIENTE";
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
      this.listarClientes();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._clienteService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarClientes();
        },
      })
    }
  }

  


}
