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

  constructor(private alojamientosService: AlojamientosService) { }

  alojamientos: any[];

  ngOnInit() {
    this.getAlojamientos();
  }

  getAlojamientos(){
    this.alojamientosService.getAlojamientos().subscribe(data => {
      this.alojamientos = data;
    }, error =>{
    });
  }

  editar(idAlojamiento){
    
  }

  rechazar(idAlojamiento){
    
  }

}
