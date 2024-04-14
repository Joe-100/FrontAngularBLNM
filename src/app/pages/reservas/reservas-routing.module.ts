import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarServiciosComponent } from './component/listar-servicios/listar-servicios.component';
import { DatosReservaComponent } from './component/datos-reserva/datos-reserva.component';

const routes: Routes = [
  
  {
    path:'listarServicios', component:ListarServiciosComponent
  },
  {
    path: 'datosReserva', component:DatosReservaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
