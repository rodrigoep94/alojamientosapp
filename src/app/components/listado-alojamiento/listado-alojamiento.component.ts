import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { ImagenesComponent } from '../imagenes/imagenes.component';
import { LogService } from '../../services/log.service';
import { Helper } from '../../utils/helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RechazoAlojamientoComponent } from '../rechazo-alojamiento/rechazo-alojamiento.component';
import { EditarAprobarAlojamientoComponent } from '../editar-aprobar-alojamiento/editar-aprobar-alojamiento.component';

@Component({
  selector: 'app-listado-alojamiento',
  templateUrl: './listado-alojamiento.component.html',
  styleUrls: ['./listado-alojamiento.component.scss']
})
export class ListadoAlojamientoComponent implements OnInit {

  constructor(private alojamientosService: AlojamientosService,
              private modalService: NgbModal) { }

  alojamientos: any[];
  errorMessage: string;

  ngOnInit() {
    this.getAlojamientos();
  }

  getAlojamientos(){
    try {
      if(this.isAdmin()) {
        this.getAlojamientosAdmin();
      } 
      else {
        this.getAlojamientosUser();
      }
    }
    catch (error) {
      this.errorMessage = "Debe encontrarse logueado para ver los alojamientos";
    }
  }

  getAlojamientosUser(){
    this.alojamientosService.getAlojamientosValidados().subscribe(data => {
      this.alojamientos = data;
    })
  }

  getAlojamientosAdmin(){
    this.alojamientosService.getAlojamientos().subscribe(data => {
      this.alojamientos = data.filter(x => x.justificacionRechazo == null);
    }, error =>{
    });
  }

  editar(idAlojamiento){
    var modal = this.modalService.open(EditarAprobarAlojamientoComponent);
    modal.componentInstance.idAlojamiento = idAlojamiento;
    
    modal.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      this.getAlojamientos();
    })
  }

  rechazar(idAlojamiento){
    var modal = this.modalService.open(RechazoAlojamientoComponent);
    modal.componentInstance.idAlojamiento = idAlojamiento;
    
    modal.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      this.getAlojamientos();
    })
  }

  verImagenes(idAlojamiento){
    var modal = this.modalService.open(ImagenesComponent, { size: "lg" });
    modal.componentInstance.idAlojamiento = idAlojamiento;
  }

  getEstado(check){
    if (check == null){
      return "A validar";
    }

    if (check){
      return "Aceptado";
    }
  }
  isChecked(check){
    return check == null;
  }

  isAdmin(){
    return Helper.isAdmin();
  }

}
