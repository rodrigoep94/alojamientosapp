import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { ImagenesComponent } from '../imagenes/imagenes.component';
import { LogService } from '../../services/log.service';
import { Helper } from '../../utils/helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-alojamiento',
  templateUrl: './listado-alojamiento.component.html',
  styleUrls: ['./listado-alojamiento.component.scss']
})
export class ListadoAlojamientoComponent implements OnInit {

  constructor(private alojamientosService: AlojamientosService,
              private modalService: NgbModal) { }

  alojamientos: any[];

  ngOnInit() {
    this.getAlojamientos();
  }

  getAlojamientos(){
    this.alojamientosService.getAlojamientos().subscribe(data => {
      this.alojamientos = data;
      console.log(data);
    }, error =>{
    });
  }

  editar(idAlojamiento){
    
  }

  rechazar(idAlojamiento){
    
  }

  verImagenes(idAlojamiento){
    var modal = this.modalService.open(ImagenesComponent, { size: "lg" });
    modal.componentInstance.idAlojamiento = idAlojamiento;
  }

}
