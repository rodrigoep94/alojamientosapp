import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  constructor(private http: HttpClient) { }

  getAlojamientos(): Observable<any>{
    var alojamientos = this.http.get('https://alojapp-backend.herokuapp.com/alojamiento/get');
    return alojamientos;
  }
}
