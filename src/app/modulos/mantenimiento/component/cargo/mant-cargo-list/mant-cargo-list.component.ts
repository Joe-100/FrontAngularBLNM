import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CargoService } from '../../../service/cargo.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/constans/general.constans';
import { CargoResponse } from '../../../models/cargo-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mant-cargo-list',
  templateUrl: './mant-cargo-list.component.html',
  styleUrls: ['./mant-cargo-list.component.scss']
})
export class MantCargoListComponent implements OnInit {

  cargos:CargoResponse[]=[];
  modalRef?: BsModalRef;
  cargoSelected: CargoResponse=new CargoResponse();
  titleModal:string="";
  accionModal:number=0;
  myFormFilter: FormGroup;
  totalItems:number=0;
  itemsPerPage:number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();

  constructor(
    private _route:Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _cargoService:CargoService 
  )
  {
    //nuestro formulario cargo request
    this.myFormFilter=this.fb.group({

      nombreCargo:["",[]],

    });

  }



  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.filtrar();
    
  }

  listarCargos()
  {
    this._cargoService.getAll().subscribe({
      next:(data:CargoResponse[])=>{
        this.cargos=data
        console.log("cargos",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearCargo(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO CARGO";
    this.cargoSelected=new CargoResponse();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarCargo(template: TemplateRef<any>,cargo:CargoResponse)
  { 
    this.cargoSelected=cargo;
    this.titleModal="MODIFICAR CARGO";
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
      this.listarCargos();
    }
  }

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._cargoService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarCargos();
        },
      });
    }
  }

  filtrar()
  {
    let valueForm = this.myFormFilter.getRawValue();

    this.request.filtros.push({name:"nombreCargo",value: valueForm.nombreCargo});

    this._cargoService.genericFilter(this.request).subscribe({
      next:(data: GenericFilterResponse<CargoResponse>)=>{
        console.log(data);
        this.cargos = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error:()=>{
        console.log("error")
      },
      complete:()=>{
        console.log("completo")
      },
    })

  }

  changePage(event: PageChangedEvent){
    this.request.numeroPagina = event.page;
    this.filtrar();
  }

  changeItemsPerPage()
  {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }

}
