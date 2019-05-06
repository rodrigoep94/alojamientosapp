import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAlojamientoComponent } from './alta-alojamiento.component';

describe('AltaAlojamientoComponent', () => {
  let component: AltaAlojamientoComponent;
  let fixture: ComponentFixture<AltaAlojamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaAlojamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
