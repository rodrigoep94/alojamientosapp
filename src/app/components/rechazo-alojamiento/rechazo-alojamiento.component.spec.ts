import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoAlojamientoComponent } from './rechazo-alojamiento.component';

describe('RechazoAlojamientoComponent', () => {
  let component: RechazoAlojamientoComponent;
  let fixture: ComponentFixture<RechazoAlojamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazoAlojamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazoAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
