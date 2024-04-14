import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantServicioRegisterComponent } from './mant-servicio-register.component';

describe('MantServicioRegisterComponent', () => {
  let component: MantServicioRegisterComponent;
  let fixture: ComponentFixture<MantServicioRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantServicioRegisterComponent]
    });
    fixture = TestBed.createComponent(MantServicioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
