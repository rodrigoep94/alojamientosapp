import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAlojamientoComponent } from './listado-alojamiento.component';

describe('ListadoAlojamientoComponent', () => {
  let component: ListadoAlojamientoComponent;
  let fixture: ComponentFixture<ListadoAlojamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAlojamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
