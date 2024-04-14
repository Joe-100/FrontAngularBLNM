import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteRequest } from 'src/app/models/cliente-request.model';
import { ClienteResponse } from 'src/app/models/cliente-response.model';
import { ClienteService } from '../../../service/cliente.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-cliente-register',
  templateUrl: './mant-cliente-register.component.html',
  styleUrls: ['./mant-cliente-register.component.scss']
})
export class MantClienteRegisterComponent implements OnInit {

  @Input() title:string="";
  @Input() cliente:ClienteResponse= new ClienteResponse();
  @Input() accion: number = 0;

    // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();


  myForm:FormGroup;
  clienteEnvio:ClienteRequest = new ClienteRequest();

  constructor(
    private fb: FormBuilder,
    private _clienteService: ClienteService,
  )
  {
    //nuestro formulario cargo request
    this.myForm=this.fb.group({

      idCliente:[{value:0,disable:true},[Validators.required]],
      idPersona:[{value:0,disable:true},[Validators.required]],
      telefonoCliente:[null,[Validators.required]],
      correoCliente:[null,[Validators.required]]

    })
  } 

  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.cliente);
    
    this.myForm.patchValue(this.cliente);
  }

  guardar()
  {
    this.clienteEnvio = this.myForm.getRawValue()
    
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
    this._clienteService.create(this.clienteEnvio).subscribe({
      next:(data:ClienteResponse)=>{
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
    this._clienteService.update(this.clienteEnvio).subscribe({
      next:(data:ClienteResponse)=>{
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
