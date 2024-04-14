import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {ModalModule} from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantCargoListComponent } from './component/cargo/mant-cargo-list/mant-cargo-list.component';
import { MantCargoRegisterComponent } from './component/cargo/mant-cargo-register/mant-cargo-register.component';
import { MantTipoDocumentoListComponent } from './component/tipoDocumento/mant-tipo-documento-list/mant-tipo-documento-list.component';
import { MantTipoDocumentoRegisterComponent } from './component/tipoDocumento/mant-tipo-documento-register/mant-tipo-documento-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MantClienteRegisterComponent } from './component/cliente/mant-cliente-register/mant-cliente-register.component';
import { MantClienteListComponent } from './component/cliente/mant-cliente-list/mant-cliente-list.component';
import { MantEmpleadoListComponent } from './component/empleado/mant-empleado-list/mant-empleado-list.component';
import { MantEmpleadoRegisterComponent } from './component/empleado/mant-empleado-register/mant-empleado-register.component';
import { MantMedioPagoListComponent } from './component/medioPago/mant-medio-pago-list/mant-medio-pago-list.component';
import { MantMedioPagoRegisterComponent } from './component/medioPago/mant-medio-pago-register/mant-medio-pago-register.component';
import { MantPersonaRegisterComponent } from './component/persona/mant-persona-register/mant-persona-register.component';
import { MantPersonaListComponent } from './component/persona/mant-persona-list/mant-persona-list.component';
import { MantReservaListComponent } from './component/reserva/mant-reserva-list/mant-reserva-list.component';
import { MantReservaRegisterComponent } from './component/reserva/mant-reserva-register/mant-reserva-register.component';
import { MantReservaServicioRegisterComponent } from './component/reservaServicio/mant-reserva-servicio-register/mant-reserva-servicio-register.component';
import { MantReservaServicioListComponent } from './component/reservaServicio/mant-reserva-servicio-list/mant-reserva-servicio-list.component';
import { MantRolListComponent } from './component/rol/mant-rol-list/mant-rol-list.component';
import { MantRolRegisterComponent } from './component/rol/mant-rol-register/mant-rol-register.component';
import { MantServicioRegisterComponent } from './component/servicio/mant-servicio-register/mant-servicio-register.component';
import { MantServicioListComponent } from './component/servicio/mant-servicio-list/mant-servicio-list.component';
import { MantUsuarioListComponent } from './component/usuario/mant-usuario-list/mant-usuario-list.component';
import { MantUsuarioRegisterComponent } from './component/usuario/mant-usuario-register/mant-usuario-register.component';
import { MantImagenRegisterComponent } from './component/imagen/mant-imagen-register/mant-imagen-register.component';
import { MantImagenListComponent } from './component/imagen/mant-imagen-list/mant-imagen-list.component';


@NgModule({
  declarations: [
    MantCargoListComponent,
    MantCargoRegisterComponent,
    MantTipoDocumentoListComponent,
    MantTipoDocumentoRegisterComponent,
    MantClienteRegisterComponent,
    MantClienteListComponent,
    MantEmpleadoListComponent,
    MantEmpleadoRegisterComponent,
    MantMedioPagoListComponent,
    MantMedioPagoRegisterComponent,
    MantPersonaRegisterComponent,
    MantPersonaListComponent,
    MantReservaListComponent,
    MantReservaRegisterComponent,
    MantReservaServicioRegisterComponent,
    MantReservaServicioListComponent,
    MantRolListComponent,
    MantRolRegisterComponent,
    MantServicioRegisterComponent,
    MantServicioListComponent,
    MantUsuarioListComponent,
    MantUsuarioRegisterComponent,
    MantImagenRegisterComponent,
    MantImagenListComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule,
  ]
})
export class MantenimientoModule { }
