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
    this.alojamientosService.getAlojamientos().subscribe(data => {
      console.log(data);
    });
  }

}
