import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alojamiento } from 'src/app/models/alojamiento';
import { NotifyService } from 'src/app/services/notify.service';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Helper } from 'src/app/utils/helper';

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
  comboPension = ["Desayuno", "Media", "Completa"];

  ngOnInit() {
    this.alojamientoForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      categoria: [null, Validators.required],
      valorPension: [null, Validators.required],
      tipoPension: [null, Validators.required],
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

        
        var pension = {
          tipopension: this.model.tipoPension,
          precio: this.model.valorPension
      };
      
      this.alojamientosService.guardarPension(pension, this.idAlojamiento);

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
    
  public valNumKeyPress(ev: any) {
      Helper.valDecimalKeyPress(ev)
  }

  public valNumKeyPaste(ev:any){
      // Get pasted data via clipboard API
      let clipboardData = ev.clipboardData || window['clipboardData'];
      let pastedData = clipboardData.getData('Text');
  
      Helper.valDecimalKeyPaste(pastedData, ev);
  }
}
