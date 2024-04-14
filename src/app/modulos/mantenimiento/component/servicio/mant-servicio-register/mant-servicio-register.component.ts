import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicioResponse } from '../../../models/servicio-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioRequest } from '../../../models/servicio-request.model';
import { ServicioService } from '../../../service/servicio.service';
import { AccionMantConst } from 'src/app/constans/general.constans';
import { VServicioImagen } from '../../../models/VServicioImagen.model';
import { ImagenResponse } from '../../../models/imagen-response.model';
import { ImagenService } from '../../../service/imagen.service';

@Component({
  selector: 'app-mant-servicio-register',
  templateUrl: './mant-servicio-register.component.html',
  styleUrls: ['./mant-servicio-register.component.scss']
})
export class MantServicioRegisterComponent implements OnInit {

  // Declarando variables de entrada
  @Input() title:string="";
  @Input() servicio:ServicioResponse= new ServicioResponse();
  @Input() accion: number = 0;
  

    // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();


  // Declarando variables de internas
  myForm:FormGroup;
  servicioEnvio:ServicioRequest = new ServicioRequest();
  imagen:ImagenResponse[]=[];

  //delcaramos el constructor
  constructor(
    private fb: FormBuilder,
    private _serviciosService: ServicioService,
    private _imagenService:ImagenService,
  )
  {
    //nuestro formulario srvicio request
    this.myForm=this.fb.group({

      idServicio:[{value:0,disable:true},[Validators.required]],
      nombreServicio:[null,[Validators.required]],
      descripcionServicio:[null,[Validators.required]],
      precio:[null,[Validators.required]],
      linkImagen:[null,[Validators.required]],

    })
  } 


  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.servicio);
    
    this.obtenerImagen();
    this.myForm.patchValue(this.servicio);
  }

  guardar()
  {
    this.servicioEnvio = this.myForm.getRawValue()
    
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

  crearRegistro(){
    //llamar al servicio rest ==> permitire crear un nuevo registro en base de datos
    this._serviciosService.create(this.servicioEnvio).subscribe({
      next:(data:ServicioResponse)=>{
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

  obtenerImagen(){
    this._imagenService.getAll().subscribe({
      next:(data:ImagenResponse[]) => 
        {
          this.imagen=data;
        },
      error:() => {},
      complete:() => {},
    })
  }

  editarRegistro(){
    this._serviciosService.update(this.servicioEnvio).subscribe({
      next:(data:ServicioResponse)=>{
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
