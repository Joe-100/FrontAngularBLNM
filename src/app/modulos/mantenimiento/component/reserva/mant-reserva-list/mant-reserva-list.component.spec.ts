import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantReservaListComponent } from './mant-reserva-list.component';

describe('MantReservaListComponent', () => {
  let component: MantReservaListComponent;
  let fixture: ComponentFixture<MantReservaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantReservaListComponent]
    });
    fixture = TestBed.createComponent(MantReservaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
