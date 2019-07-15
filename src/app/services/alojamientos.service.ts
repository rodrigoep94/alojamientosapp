import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Alojamiento } from '../models/alojamiento';
import { BaseService } from './service.base';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
   }

  getAlojamientos(): Observable<any>{
    var alojamientos = this.get('alojamiento/get');
    return alojamientos;
  }

  guardarAlojamiento(alojamiento: Alojamiento){
    var alojamientoGuardado = this.postWithSecurity('alojamiento/create', JSON.stringify(alojamiento));
    return alojamientoGuardado;
  }

  deleteAlojamiento(idAlojamiento: number){
    var alojamientoEliminado = this.delete('alojamiento/delete/' + idAlojamiento.toString(), null);
    return alojamientoEliminado;
  }
}
