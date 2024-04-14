import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservaResponse } from '../../../models/reserva-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaRequest } from '../../../models/reserva-request.model';
import { ReservaService } from '../../../service/reserva.service';
import { AccionMantConst } from 'src/app/constans/general.constans';
import { ViewReservaUsuario } from '../../../models/ViewReservaUsuario.model';
import { ServicioResponse } from '../../../models/servicio-response.model';
import { MedioPagoResponse } from '../../../models/medioPago-response.model';
import { UsuarioResponse } from '../../../models/usuario-response.model';
import { MedioPagoService } from '../../../service/medio-pago.service';
import { ServicioService } from '../../../service/servicio.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-mant-reserva-register',
  templateUrl: './mant-reserva-register.component.html',
  styleUrls: ['./mant-reserva-register.component.scss']
})
export class MantReservaRegisterComponent implements OnInit {

  // Declarando variables de entrada
  @Input() title:string="";
  @Input() reserva:ViewReservaUsuario= new ViewReservaUsuario();
  @Input() accion: number = 0; 
  @Input() tiposServicio:ServicioResponse[]=[];
  @Input() mediosDepago:MedioPagoResponse[]=[];
  @Input() Usuarios:UsuarioResponse[]=[];

    // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();


  // Declarando variables de internas
  myForm:FormGroup;
  reservaEnvio:ReservaRequest = new ReservaRequest();
  medioPago:MedioPagoResponse[]=[];
  servicio:ServicioResponse[]=[];
  usuarios:UsuarioResponse[]=[];

  //delcaramos el constructor
  constructor(
    private fb: FormBuilder,
    private _reservaService: ReservaService,
    private _medioPagoService: MedioPagoService,
    private _servicioService: ServicioService,
    private _usuarioService: UsuarioService,
  )
  {
    //nuestro formulario cargo request
    this.myForm=this.fb.group({

      idReserva:[{value:0,disable:true},[Validators.required]],
      idUsuario:[null,[Validators.required]],
      idServicio:[null,[Validators.required]],
      idMedioPago:[null,[Validators.required]],
      fechaReserva:[null,[Validators.required]],
      horaReserva:[null,[Validators.required]],
    })
  } 



  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.reserva);
    
    this.obtenerMEdioPAgo();
    this.obtenerServicio();
    this.obtenerUsuarios();
    this.myForm.patchValue(this.reserva);
  }
 
   guardar()
  {
    // this._reservaService = this.myForm.getRawValue()
    
    switch(this.accion){
      case AccionMantConst.crear:
        //crear un nuevo egistro
        this.crearRegistro();
        break;
      case AccionMantConst.editar:
        //inactivar
        this.editarRegistro();
        break;
      case AccionMantConst.eliminar:
        //eliminar registro
        break;
    }
  }

  obtenerMEdioPAgo(){
    this._medioPagoService.getAll().subscribe({
      next:(data:MedioPagoResponse[])=>
        {
          this.medioPago=data;
        },
      error:()=>{},
      complete:()=>{}
    })
  }

  obtenerServicio(){
    this._servicioService.getAll().subscribe({
      next:(data:ServicioResponse[])=>
        {
          this.servicio=data;
        },
      error:()=>{},
      complete:()=>{}
    })
  }

  obtenerUsuarios(){
    this._usuarioService.getAll().subscribe({
      next:(data:UsuarioResponse[])=>
        {
          this.usuarios=data;
        },
      error:()=>{},
      complete:()=>{}
    })
  }

  crearRegistro(){

    // var nombrelocal=this.myForm.getRawValue()
    // console.log(nombrelocal)
    // //llamar al servicio rest ==> permitire crear un nuevo registro en base de datos
    this._reservaService.create(this.myForm.getRawValue()).subscribe({
      next:(data:ReservaResponse)=>{
        alert("Creado de forma correcta");
      },
      error:()=>{
          alert("Ocurrio un error");
      },
      complete:()=>{
        this.cerrarModal(true);
      },
    })
  }

  editarRegistro(){
    this._reservaService.update(this.reservaEnvio).subscribe({
      next:(data:ReservaResponse)=>{
        alert("actualizado de forma correcta");
      },
      error:()=>{
          alert("Ocurrio un error");
      },
      complete:()=>{
        this.cerrarModal(true);
      },
    })

  }

  cerrarModal(res:boolean)
  {
    //true ==> hubo modificacion en la base de datos
    //false ==> NO hubo modificacion en la base de datos
    this.closeModalEmmit.emit(res);
  }

}
