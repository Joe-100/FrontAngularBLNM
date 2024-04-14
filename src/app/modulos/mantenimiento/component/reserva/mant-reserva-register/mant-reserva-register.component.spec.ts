import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantReservaRegisterComponent } from './mant-reserva-register.component';

describe('MantReservaRegisterComponent', () => {
  let component: MantReservaRegisterComponent;
  let fixture: ComponentFixture<MantReservaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantReservaRegisterComponent]
    });
    fixture = TestBed.createComponent(MantReservaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
