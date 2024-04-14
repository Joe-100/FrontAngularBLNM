import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantClienteListComponent } from './mant-cliente-list.component';

describe('MantClienteListComponent', () => {
  let component: MantClienteListComponent;
  let fixture: ComponentFixture<MantClienteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantClienteListComponent]
    });
    fixture = TestBed.createComponent(MantClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
