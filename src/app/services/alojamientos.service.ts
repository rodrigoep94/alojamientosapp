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
     var alojamientos = this.get('alojamiento');
     return alojamientos;
   }

   getAlojamientosValidados(): Observable<any>{
     var alojamientos = this.get('alojamiento/estado/VALIDADO');
     return alojamientos;
   }

   getAlojamiento(idAlojamiento: number): Observable<any>{
     var alojamientos = this.get('alojamiento/' + idAlojamiento.toString());
     return alojamientos;
   }

  guardarAlojamiento(alojamiento: Alojamiento){
    var alojamientoGuardado = this.postWithSecurity('alojamiento', JSON.stringify(alojamiento));
    return alojamientoGuardado;
  }

  deleteAlojamiento(idAlojamiento: number){
    var alojamientoEliminado = this.delete('alojamiento/' + idAlojamiento.toString(), null);
    return alojamientoEliminado;
  }

  editarAlojamiento(alojamiento: Alojamiento): Observable<any>{
    var alojamientoGuardado = this.patchWithSecurity('alojamiento', JSON.stringify(alojamiento));
    return alojamientoGuardado;
  }

  guardarPension(pension: any, idAlojamiento: number){
    var pensionAgregada = this.putWithSecurity('pension/' + idAlojamiento.toString(), JSON.stringify(pension));
    return pensionAgregada;
  }

  saveImage(image: any, idAlojamiento: number){
    var imagenAgregada = this.postFile('alojamiento/addFile/' + idAlojamiento.toString(), image);
    return imagenAgregada;
  }

  rechazarAlojamiento(motivo: string, idAlojamiento: number){
    var rechazo = this.postRechazo('alojamiento/uncheck/' + idAlojamiento.toString(), motivo);
    return rechazo;
  }

  aceptarAlojamiento(idAlojamiento: number){
    var rechazo = this.postWithSecurity('alojamiento/check/' + idAlojamiento.toString(), {});
    return rechazo;
  }
}
