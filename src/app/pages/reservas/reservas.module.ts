import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ListarServiciosComponent } from './component/listar-servicios/listar-servicios.component';
import { DatosReservaComponent } from './component/datos-reserva/datos-reserva.component';
import { SharedModule } from 'src/app/modulos/shared/shared.module';


@NgModule({
  declarations: [
    ListarServiciosComponent,
    DatosReservaComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    SharedModule
  ]
})
export class ReservasModule { }
