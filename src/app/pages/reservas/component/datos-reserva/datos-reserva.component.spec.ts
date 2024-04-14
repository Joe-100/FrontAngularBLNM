import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosReservaComponent } from './datos-reserva.component';

describe('DatosReservaComponent', () => {
  let component: DatosReservaComponent;
  let fixture: ComponentFixture<DatosReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosReservaComponent]
    });
    fixture = TestBed.createComponent(DatosReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
