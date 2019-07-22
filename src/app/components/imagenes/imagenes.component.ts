import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { Alojamiento } from 'src/app/models/alojamiento';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {

  idAlojamiento: number;
  imagenes: string[] = [];
  constructor(private activeModal: NgbActiveModal,
              private alojamientosService: AlojamientosService) { }

  ngOnInit() {
    this.loadImages();
  }

  loadImages(){
    this.alojamientosService.getAlojamiento(this.idAlojamiento).subscribe(data => {
      this.imagenes = data.referenceFiles.map(x => x.fileDownloadUri);
    })
  }

  closeModal(){
    this.activeModal.close();
  }
}
