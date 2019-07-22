import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-rechazo-alojamiento',
  templateUrl: './rechazo-alojamiento.component.html',
  styleUrls: ['./rechazo-alojamiento.component.scss']
})
export class RechazoAlojamientoComponent implements OnInit {

  rechazoForm: FormGroup;
  submitted = false;
  loading = false;
  motivoRechazo: string;
  idAlojamiento: number;
  constructor(private formBuilder: FormBuilder,
              private activeModal: NgbActiveModal,
              private notifyService: NotifyService,
              private alojamientosService: AlojamientosService) { }

  ngOnInit() {
    this.rechazoForm = this.formBuilder.group({
        motivoRechazo: [null, Validators.required]
    });
  }
  
  closeModal(){
    this.activeModal.close();
  }

  rechazar(){
    this.submitted = true;
    if (this.rechazoForm.invalid) {
        return;
    }
    this.loading = true;
    this.alojamientosService.rechazarAlojamiento(this.motivoRechazo, this.idAlojamiento).subscribe(data => {
      this.loading = false;
      this.notifyService.add("El alojamiento " + this.idAlojamiento.toString() + " ha sido rechazado correctamente");
      this.activeModal.dismiss();
    }, error =>{
    });
  }
  
  get f() { return this.rechazoForm.controls; }

}
