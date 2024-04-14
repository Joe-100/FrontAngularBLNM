import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmpleadoResponse } from '../../../models/empleado-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../service/empleado.service';
import { AccionMantConst } from 'src/app/constans/general.constans';
import { ViewEmpleadoPersona } from '../../../models/VEmpleadoPersona.model';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mant-empleado-list',
  templateUrl: './mant-empleado-list.component.html',
  styleUrls: ['./mant-empleado-list.component.scss']
})
export class MantEmpleadoListComponent implements OnInit {

  config ={
    backdrop:true,
    ignoreBackdropClick:true
  };

  genericFilterRequest: GenericFilterRequest = new GenericFilterRequest();
  vEmpleados: ViewEmpleadoPersona[] = [];

  empleados:EmpleadoResponse[]=[];
  modalRef?: BsModalRef;
  empleadoSelected: ViewEmpleadoPersona=new ViewEmpleadoPersona();
  titleModal:string="";
  accionModal:number=AccionMantConst.editar;

  myFormFilter:FormGroup; 
  totalItems:number=0;
  itemsPerPage:number = 5;
  request: GenericFilterRequest = new GenericFilterRequest();

  constructor(
    private _route:Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _empleadoService:EmpleadoService 
  )
  {
     //nuestro formulario cargo request
    this.myFormFilter=this.fb.group({

      idEmpleado: ["",[]],
      idPersona: ["",[]],
      idCargo: ["",[]],
      telefonoEmpleado: ["",[]],

    });

  }

  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.listarEmpleados();
    
  }

  listarEmpleados()
  {
    this._empleadoService.genericFilterView(this.genericFilterRequest).subscribe({
      next:(data:GenericFilterResponse<ViewEmpleadoPersona>)=>{
        this.vEmpleados=data.lista
        console.log("empleados",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearEmpleado(template: TemplateRef<any>)
  {
    this.titleModal="NUEVO EMPLEADO";
    this.empleadoSelected=new ViewEmpleadoPersona();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarEmpleado(template: TemplateRef<any>,cargo:ViewEmpleadoPersona)
  { 
    this.empleadoSelected=cargo;
    this.titleModal="MODIFICAR EMPLEADO";
    this.accionModal=AccionMantConst.editar;
    this.openModal(template);
  }

  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({},{class:"gray modal-lg"},this.config));
  }


  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide();
    if (res){
      this.listarEmpleados();
    }
  }

  filtrar()
  {
    let valueForm = this.myFormFilter.getRawValue();

    this.request.filtros.push({name:"id",value: valueForm.idEmpleado});
    this.request.filtros.push({name:"idCargo",value: valueForm.idCargo});
    this.request.filtros.push({name:"idPersona",value: valueForm.idPersona});
    this.request.filtros.push({name:"telefonoEmpleado",value: valueForm.telefonoEmpleado});

    this._empleadoService.genericFilterView(this.genericFilterRequest).subscribe({
      next:(data: GenericFilterResponse<ViewEmpleadoPersona>)=>{
        console.log(data);
        this.vEmpleados = data.lista;
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

  eliminarRegistro(id:number)
  {
    let result = confirm("¿Estas seguro de eliminar el registro?");
     
    if(result)
    {
      this._empleadoService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarEmpleados();
        },
      })
    }
  }


}
