import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/constans/general.constans';


import { CargoService } from '../../../service/cargo.service';
import { CargoRequest } from '../../../models/cargo-request.model';
import { CargoResponse } from '../../../models/cargo-response.model';


@Component({
  selector: 'app-mant-cargo-register',
  templateUrl: './mant-cargo-register.component.html',
  styleUrls: ['./mant-cargo-register.component.scss']
})
export class MantCargoRegisterComponent implements OnInit {
  
  // Declarando variables de entrada
  @Input() title:string="";
  @Input() cargo:CargoResponse= new CargoResponse();
  @Input() accion: number = 0;

    // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();


  // Declarando variables de internas
  myForm:FormGroup;
  cargoEnvio:CargoRequest = new CargoRequest();

  //delcaramos el constructor
  constructor(
    private fb: FormBuilder,
    private _cargoService: CargoService,
  )
  {
    //nuestro formulario cargo request
    this.myForm=this.fb.group({

      idCargo:[{value:0,disable:true},[Validators.required]],
      nombreCargo:[null,[Validators.required]],

    })
  } 


  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.cargo);
    
    this.myForm.patchValue(this.cargo);
  }

  guardar()
  {
    this.cargoEnvio = this.myForm.getRawValue()
    
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
    this._cargoService.create(this.cargoEnvio).subscribe({
      next:(data:CargoResponse)=>{
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
    this._cargoService.update(this.cargoEnvio).subscribe({
      next:(data:CargoResponse)=>{
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
 