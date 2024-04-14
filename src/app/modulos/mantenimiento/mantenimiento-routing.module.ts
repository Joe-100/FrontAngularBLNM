import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantCargoListComponent } from './component/cargo/mant-cargo-list/mant-cargo-list.component';
import { MantTipoDocumentoListComponent } from './component/tipoDocumento/mant-tipo-documento-list/mant-tipo-documento-list.component';
import { MantClienteListComponent } from './component/cliente/mant-cliente-list/mant-cliente-list.component';
import { MantEmpleadoListComponent } from './component/empleado/mant-empleado-list/mant-empleado-list.component';
import { MantPersonaListComponent } from './component/persona/mant-persona-list/mant-persona-list.component';
import { MantReservaServicioListComponent } from './component/reservaServicio/mant-reserva-servicio-list/mant-reserva-servicio-list.component';
import { MantServicioListComponent } from './component/servicio/mant-servicio-list/mant-servicio-list.component';
import { MantRolListComponent } from './component/rol/mant-rol-list/mant-rol-list.component';
import { MantReservaListComponent } from './component/reserva/mant-reserva-list/mant-reserva-list.component';
import { MantUsuarioListComponent } from './component/usuario/mant-usuario-list/mant-usuario-list.component';
import { MantImagenListComponent } from './component/imagen/mant-imagen-list/mant-imagen-list.component';


const routes: Routes = [

  {
    path:'cargo', component:MantCargoListComponent
  },
  {
    path:'tipoDocumento', component:MantTipoDocumentoListComponent
  },
  {
    path:'cliente', component:MantClienteListComponent
  },
  {
    path:'empleado', component:MantEmpleadoListComponent
  },
  {
    path:'persona', component:MantPersonaListComponent
  },
  {
    path:'reserva', component:MantReservaListComponent
  },
  {
    path:'servicio', component:MantServicioListComponent
  },
  {
    path:'rol', component:MantRolListComponent
  },
  {
    path:'usuario', component:MantUsuarioListComponent
  },
  {
    path:'imagen',component:MantImagenListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
