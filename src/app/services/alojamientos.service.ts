import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Alojamiento } from '../models/alojamiento';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  constructor(private http: HttpClient) { }

  getAlojamientos(): Observable<any>{
    
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user@gmail.com' + ':' + '1234678') });
    var alojamientos = this.http.get('https://alojapp-backend.herokuapp.com/alojamiento/get', {headers});
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
