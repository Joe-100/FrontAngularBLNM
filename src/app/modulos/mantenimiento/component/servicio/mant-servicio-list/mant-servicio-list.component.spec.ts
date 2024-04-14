import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantServicioListComponent } from './mant-servicio-list.component';

describe('MantServicioListComponent', () => {
  let component: MantServicioListComponent;
  let fixture: ComponentFixture<MantServicioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantServicioListComponent]
    });
    fixture = TestBed.createComponent(MantServicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
