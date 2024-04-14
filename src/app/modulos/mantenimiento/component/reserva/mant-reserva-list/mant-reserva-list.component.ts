import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReservaResponse } from '../../../models/reserva-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ReservaService } from '../../../service/reserva.service';
import { AccionMantConst } from 'src/app/constans/general.constans';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { ViewReservaUsuario } from '../../../models/ViewReservaUsuario.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { forkJoin, ignoreElements } from 'rxjs';
import { ServicioService } from '../../../service/servicio.service';
import { MedioPagoService } from '../../../service/medio-pago.service';
import { ServicioResponse } from '../../../models/servicio-response.model';
import { MedioPagoResponse } from '../../../models/medioPago-response.model';
import { UsuarioResponse } from '../../../models/usuario-response.model';
import { UsuarioService } from '../../../service/usuario.service';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mant-reserva-list',
  templateUrl: './mant-reserva-list.component.html',
  styleUrls: ['./mant-reserva-list.component.scss']
})
export class MantReservaListComponent implements OnInit {

  config ={
    backdrop:true,
    ignoreBackdropClick:true
  };

  genericFilterRequest: GenericFilterRequest = new GenericFilterRequest();
  vReservas: ViewReservaUsuario[] = [];

  reservas:ReservaResponse[]=[];
  modalRef?: BsModalRef;
  reservaSelected: ViewReservaUsuario=new ViewReservaUsuario();
  titleModal:string="";
  accionModal = AccionMantConst.editar;
  myFormFilter:FormGroup; 
  totalItems:number=0;
  itemsPerPage:number = 5;
  request: GenericFilterRequest = new GenericFilterRequest();


  tiposDeServicios:ServicioResponse[]=[];
  mediosDepago:MedioPagoResponse[]=[];
  Usuarios:UsuarioResponse[]=[];

  constructor(
    private _route:Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _reservaService:ReservaService,
    private _tiposServicio:ServicioService,
    private _mediopago:MedioPagoService,
    private _usuarios:UsuarioService
  )
  {
     //nuestro formulario cargo request
    this.myFormFilter=this.fb.group({

      fechaReserva:["",[]],
      nombreServicio:["",[]],

    });
  }



  // PRIMER EVENTO QUE EJECUTA EL COMPONENTE
  ngOnInit(): void {

    this.filtrar();
  
    // this.obtenerlistas();
    
  }

  listarReservas()
  {
    this._reservaService.genericFilterView(this.genericFilterRequest ).subscribe({
      next:(data:GenericFilterResponse<ViewReservaUsuario>)=>{
        this.vReservas=data.lista;
        console.log("reservas",data);
      },
      error:(err)=>{
        console.log("error",err);
      },
      complete:()=>{
        //falta
      },
    });
  }


  crearReserva(template: TemplateRef<any>)
  {
    this.titleModal="NUEVA RESERVA";
    this.reservaSelected=new ViewReservaUsuario();
    this.accionModal=AccionMantConst.crear;
    this.openModal(template);
  }

  editarReserva(template: TemplateRef<any>,reserva:ViewReservaUsuario)
  { 
    this.reservaSelected=reserva;
    this.titleModal="MODIFICAR RESERVA";
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
      this.listarReservas();
    }
  }

  // obtenerlistas()
  // {
  //   forkJoin([
  //     this._tiposServicio.getAll(),
  //     this._mediopago.getAll(),
  //     this._usuarios.getAll(),
  //   ]).subscribe({
  //     next:(data:any)=> {
  //       this.tiposDeServicios=data[0];
  //       this.mediosDepago=data[1];
  //       this.Usuarios=data[2];
  //     },
  //     error:(err)=> {},
  //     complete:()=> {},
  //   });
  // }

  filtrar()
  {
    let valueForm = this.myFormFilter.getRawValue();

    this.request.filtros.push({name:"fechaReserva",value: valueForm.fechaReserva});
    this.request.filtros.push({name:"nombreServicio",value: valueForm.nombreServicio});

    this._reservaService.genericFilterView(this.genericFilterRequest).subscribe({
      next:(data: GenericFilterResponse<ViewReservaUsuario>)=>{
        console.log(data);
        this.vReservas = data.lista;
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
      this._reservaService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarReservas();
        },
      })
    }
  }


  
}
