import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss']
})
export class TemplateSidebarComponent implements OnInit {
  
  menu:any[]=[]
  ngOnInit(): void {
    
    this.rellenarMenu()
  }

  rellenarMenu(){
    let rolId = sessionStorage.getItem("rolId");

    switch(rolId)
    {
      //TODO: CUANDO ES ADMINISTRADOR
      case"1":
        this.menu = [
          {
            name:"Clientes", target:"TargerMantenimiento", icon:"fas fa-users",
            subMenu:[
              // {name:"cargo",url:"mantenimiento/cargo",icon:"fa-solid fa-user-gear"},
              {name:"Persona",url:"mantenimiento/persona",icon:"fas fa-users"},
              // {name:"tipoDocumento",url:"mantenimiento/tipoDocumento",icon:"fas fa-file"},
              {name:"Usuarios",url:"mantenimiento/usuario",icon:"fa-solid fa-user-group"},
              {name:"Empleados",url:"mantenimiento/empleado",icon:"fa-solid fa-people-group"},
              // {name:"servicio",url:"mantenimiento/servicio",icon:"fas fa-file"},
              
            ]
          },
          {
            name:"Gestion", target:"TargerGestion", icon:"fas fa-edit",
            subMenu:[
              {name:"Servicios",url:"mantenimiento/servicio",icon:"fas fa-tags"},
              {name:"Atencion",url:"mantenimiento/reserva",icon:"fas fa-bell-concierge"},
              {name:"Tipo Documento",url:"mantenimiento/tipoDocumento",icon:"fa-regular fa-id-card"},
              {name:"Cargos",url:"mantenimiento/cargo",icon:"fa-solid fa-network-wired"},
              {name:"Roles",url:"mantenimiento/rol",icon:"fa-solid fa-puzzle-piece"},
              {name:"Imagenes",url:"mantenimiento/imagen",icon:"fas fa-images"},
            ]
          }
        ];
        break;
      case"2":break;
      case"3":break;
      case"4":break;
      case"5":break;
      case"6":break;
    }
  }

  
}
