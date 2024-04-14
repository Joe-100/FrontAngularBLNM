import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoResponse } from '../../../models/empleado-response.model';
import { EmpleadoRequest } from '../../../models/empleado-request.model';
import { EmpleadoService } from '../../../service/empleado.service';
import { AccionMantConst } from 'src/app/constans/general.constans';
import { ViewEmpleadoPersona } from '../../../models/VEmpleadoPersona.model';


@Component({
  selector: 'app-mant-empleado-register',
  templateUrl: './mant-empleado-register.component.html',
  styleUrls: ['./mant-empleado-register.component.scss']
})
export class MantEmpleadoRegisterComponent implements OnInit {

  // Declarando variables de entrada
  @Input() title:string="";
  @Input() empleado:ViewEmpleadoPersona= new ViewEmpleadoPersona();
  @Input() accion: number = 0;

    // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();


  // Declarando variables de internas
  myForm:FormGroup;
  empleadoEnvio:EmpleadoRequest = new EmpleadoRequest();

  //delcaramos el constructor
  constructor(
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
  )
  {
    //nuestro formulario cargo request
    this.myForm=this.fb.group({

      idEmpleado:[{value:0,disable:true},[Validators.required]],
      idPersona:[{value:0,disable:true},[Validators.required]],
      idCargo:[{value:0,disable:true},[Validators.required]],
      telefonoEmpleado:[null,[Validators.required]],

    })
  } 

  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.empleado);
    
    this.myForm.patchValue(this.empleado);
  }

  guardar()
  {
    this.empleadoEnvio = this.myForm.getRawValue()
    
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
    this._empleadoService.create(this.empleadoEnvio).subscribe({
      next:(data:EmpleadoResponse)=>{
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
    this._empleadoService.update(this.empleadoEnvio).subscribe({
      next:(data:EmpleadoResponse)=>{
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
