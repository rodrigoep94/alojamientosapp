import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private http: HttpClient) { }
  
  getProvincias(): Observable<any>{
    var provincias = this.http.get('https://apis.datos.gob.ar/georef/api/provincias');
    return provincias;
  }

  getLocalidades(idProvincia): Observable<any>{
    var provincias = this.http.get('https://apis.datos.gob.ar/georef/api/municipios?provincia=' + idProvincia.toString() + '&campos=id,nombre&max=100');
    return provincias;
  }
}
