import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantCargoListComponent } from './mant-cargo-list.component';

describe('MantCargoListComponent', () => {
  let component: MantCargoListComponent;
  let fixture: ComponentFixture<MantCargoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantCargoListComponent]
    });
    fixture = TestBed.createComponent(MantCargoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
