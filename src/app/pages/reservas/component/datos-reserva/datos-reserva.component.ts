import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioRequest } from 'src/app/models/servicio-request.model';
import { ServicioResponse } from 'src/app/models/servicio-response.model';
import { ServiciosService } from '../../services/servicios.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-datos-reserva',
  templateUrl: './datos-reserva.component.html',
  styleUrls: ['./datos-reserva.component.scss']
})
export class DatosReservaComponent implements OnInit {

   // Declarando variables de entrada
  @Input() title:string="";
  @Input() servicios:ServicioResponse= new ServicioResponse();
  @Input() accion: number = 0;

  // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  // Declarando variables de internas
  myForm:FormGroup;
  servicioEnvio:ServicioRequest = new ServicioRequest();

  //delcaramos el constructor
  constructor(
    private fb: FormBuilder,
    private _serviciosService: ServiciosService,
  )
  {
    //nuestro formulario cargo request
    this.myForm=this.fb.group({

      idServicio:[{value:0,disable:true},[Validators.required]],
      nombreServicio:[null,[Validators.required]],
      descripcionServicio:[null,[Validators.required]],
      precio:[null,[Validators.required]],

    })
  } 

  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.servicios);
    
    this.myForm.patchValue(this.servicios);
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
