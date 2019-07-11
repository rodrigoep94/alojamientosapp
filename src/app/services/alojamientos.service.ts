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
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    }; 
    var alojamientoGuardado = this.http.post('https://alojapp-backend.herokuapp.com/alojamiento/create', JSON.stringify(alojamiento), options);
    return alojamientoGuardado;
  }

  deleteAlojamiento(idAlojamiento: number){
    var alojamientoEliminado = this.http.put('https://alojapp-backend.herokuapp.com/alojamiento/delete/' + idAlojamiento.toString(), null);
    return alojamientoEliminado;
  }
}
