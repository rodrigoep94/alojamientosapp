import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { LogService } from '../../services/log.service';
import { Helper } from '../../utils/helper';

@Component({
  selector: 'app-listado-alojamiento',
  templateUrl: './listado-alojamiento.component.html',
  styleUrls: ['./listado-alojamiento.component.scss']
})
export class ListadoAlojamientoComponent implements OnInit {

  constructor(private alojamientosService: AlojamientosService,
              private logService: LogService) { }

  alojamientos: any[];

  ngOnInit() {
    this.logService.log("Log - Ha ingresado a la pantalla de listado de alojamiento - " + Helper.getLocaleDate(new Date()));
    this.getAlojamientos();
  }

  getAlojamientos(){
    this.alojamientosService.getAlojamientos().subscribe(data => {
      this.alojamientos = data;
    }, error =>{
      this.logService.log("Error - Ha fallado la llamada al servicio de obtener alojamientos - " + error + " - " + Helper.getLocaleDate(new Date()));   
    });
  }

  deleteAlojamiento(idAlojamiento){
    if (confirm("¿Está seguro de querer eliminar el alojamiento?")){
      this.alojamientosService.deleteAlojamiento(idAlojamiento).subscribe(data =>{
        this.logService.log("Baja alojamiento - Se ha eliminado con exito el alojamiento con id " + idAlojamiento.toString() + " - " + Helper.getLocaleDate(new Date()));
        this.getAlojamientos();
      }, error =>{
        this.logService.log("Error - Ha fallado la llamada al servicio de eliminar alojamiento - " + error + " - " + Helper.getLocaleDate(new Date()));   
      });
    }
  }

}
