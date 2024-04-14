import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantReservaServicioListComponent } from './mant-reserva-servicio-list.component';

describe('MantReservaServicioListComponent', () => {
  let component: MantReservaServicioListComponent;
  let fixture: ComponentFixture<MantReservaServicioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantReservaServicioListComponent]
    });
    fixture = TestBed.createComponent(MantReservaServicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
