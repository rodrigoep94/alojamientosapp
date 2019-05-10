import { TestBed } from '@angular/core/testing';

import { AlojamientosService } from './alojamientos.service';

describe('AlojamientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlojamientosService = TestBed.get(AlojamientosService);
    expect(service).toBeTruthy();
  });
});
