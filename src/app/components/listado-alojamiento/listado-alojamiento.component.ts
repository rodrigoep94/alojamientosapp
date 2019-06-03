import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { LogService } from '../../services/log.service';

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
    this.logService.log("Log - Ha ingresado a la pantalla de listado de alojamiento - " + Date.now().toLocaleString());
    this.getAlojamientos();
  }

  getAlojamientos(){
    this.alojamientosService.getAlojamientos().subscribe(data => {
      this.alojamientos = data;
    }, error =>{
      this.logService.log("Error - Ha fallado la llamada al servicio de obtener alojamientos - " + error + " - " + Date.now().toLocaleString());   
    });
  }

  deleteAlojamiento(idAlojamiento){
    if (confirm("¿Está seguro de querer eliminar el alojamiento?")){
      this.alojamientosService.deleteAlojamiento(idAlojamiento).subscribe(data =>{
        this.logService.log("Baja alojamiento - Se ha eliminado con exito el alojamiento con id " + idAlojamiento.toString() + " - " + Date.now().toLocaleString());
        this.getAlojamientos();
      }, error =>{
        this.logService.log("Error - Ha fallado la llamada al servicio de eliminar alojamiento - " + error + " - " + Date.now().toLocaleString());   
      });
    }
  }

}
