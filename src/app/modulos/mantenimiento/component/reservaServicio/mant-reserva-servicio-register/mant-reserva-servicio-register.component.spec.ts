import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantReservaServicioRegisterComponent } from './mant-reserva-servicio-register.component';

describe('MantReservaServicioRegisterComponent', () => {
  let component: MantReservaServicioRegisterComponent;
  let fixture: ComponentFixture<MantReservaServicioRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantReservaServicioRegisterComponent]
    });
    fixture = TestBed.createComponent(MantReservaServicioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
