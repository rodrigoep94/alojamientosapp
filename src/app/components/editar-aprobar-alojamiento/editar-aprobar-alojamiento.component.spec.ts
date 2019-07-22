import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAprobarAlojamientoComponent } from './editar-aprobar-alojamiento.component';

describe('EditarAprobarAlojamientoComponent', () => {
  let component: EditarAprobarAlojamientoComponent;
  let fixture: ComponentFixture<EditarAprobarAlojamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAprobarAlojamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAprobarAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
