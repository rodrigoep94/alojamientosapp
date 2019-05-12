import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

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
    });
  }

  deleteAlojamiento(idAlojamiento){
    if (confirm("¿Está seguro de querer eliminar el alojamiento?")){
      this.alojamientosService.deleteAlojamiento(idAlojamiento).subscribe(data =>{
        this.getAlojamientos();
      })
    }
  }

}
