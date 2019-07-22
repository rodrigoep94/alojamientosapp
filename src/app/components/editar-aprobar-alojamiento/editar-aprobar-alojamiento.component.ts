import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alojamiento } from 'src/app/models/alojamiento';
import { NotifyService } from 'src/app/services/notify.service';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-aprobar-alojamiento',
  templateUrl: './editar-aprobar-alojamiento.component.html',
  styleUrls: ['./editar-aprobar-alojamiento.component.scss']
})
export class EditarAprobarAlojamientoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private alojamientosService: AlojamientosService,
              private activeModal: NgbActiveModal,
              private notifyService: NotifyService) { }

  idAlojamiento: number;
  alojamientoForm: FormGroup;
  model: Alojamiento = new Alojamiento();
  submitted = false;
  loading = false;

  ngOnInit() {
    this.alojamientoForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      categoria: [null, Validators.required],
    });

    this.getAlojamiento();
  }

  getAlojamiento(){
    this.alojamientosService.getAlojamiento(this.idAlojamiento).subscribe(data => {
      this.model = data;
      this.model.tipoPension = data.pensiones[0].tipopension;
      this.model.valorPension = data.pensiones[0].precio;
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.alojamientoForm.controls; }

  submit() {
      this.submitted = true;
      if (this.alojamientoForm.invalid) {
          return;
      }
      this.loading = true;
      this.alojamientosService.editarAlojamiento(this.model).subscribe(data => {
        this.loading = false;

        this.alojamientosService.aceptarAlojamiento(this.idAlojamiento).subscribe(data => {
          this.notifyService.add("El alojamiento " + this.idAlojamiento.toString() + " ha sido aprobado correctamente");
          this.activeModal.dismiss();
        })
      }, error =>{
      });
  }

  closeModal(){
    this.activeModal.close();
  }
}
