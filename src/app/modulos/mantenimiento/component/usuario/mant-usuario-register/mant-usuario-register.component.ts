import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioResponse } from '../../../models/usuario-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioRequest } from '../../../models/usuario-request.model';
import { UsuarioService } from '../../../service/usuario.service';
import { AccionMantConst } from 'src/app/constans/general.constans';

@Component({
  selector: 'app-mant-usuario-register',
  templateUrl: './mant-usuario-register.component.html',
  styleUrls: ['./mant-usuario-register.component.scss']
})
export class MantUsuarioRegisterComponent implements OnInit {

  // Declarando variables de entrada
  @Input() title:string="";
  @Input() usuario:UsuarioResponse= new UsuarioResponse();
  @Input() accion: number = 0;

    // Declarando variables de SALI
  @Output() closeModalEmmit = new EventEmitter<boolean>();


  // Declarando variables de internas
  myForm:FormGroup;
  usuarioEnvio:UsuarioRequest = new UsuarioRequest();

  //delcaramos el constructor
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
  )
  {
    //nuestro formulario cargo request
    this.myForm=this.fb.group({

      idUsuario:[{value:0,disable:true},[Validators.required]],
      idPersona:[{value:0,disable:true},[Validators.required]],
      idRol:[{value:0,disable:true},[Validators.required]],
      username:[null,[Validators.required]],
      password:[null,[Validators.required]],

    })
  } 

  ngOnInit(): void {
    console.log("title ==> ", this.title);
    console.log("title ==> ", this.usuario);
    
    this.myForm.patchValue(this.usuario);
  }

  guardar()
  {
    this.usuarioEnvio = this.myForm.getRawValue()
    
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
    this._usuarioService.create(this.usuarioEnvio).subscribe({
      next:(data:UsuarioResponse)=>{
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
    this._usuarioService.update(this.usuarioEnvio).subscribe({
      next:(data:UsuarioResponse)=>{
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
