import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from 'src/app/services/localization.service';
import { Alojamiento } from 'src/app/models/alojamiento';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { Router } from '@angular/router';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-alta-alojamiento',
  templateUrl: './alta-alojamiento.component.html',
  styleUrls: ['./alta-alojamiento.component.scss']
})
export class AltaAlojamientoComponent implements OnInit {
    comboProvincias = [];
    comboLocalidades = [];
    comboAlojamiento = ["Hotel", "Posada", "Cabana", "Otro"]
    registerForm: FormGroup;
    model: Alojamiento = new Alojamiento();
    submitted = false;
    loading = false;

    constructor(private formBuilder: FormBuilder,
                private localizationService: LocalizationService,
                private alojamientosService: AlojamientosService,
                private logService: LogService,
                private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            provincia: [null, Validators.required],
            localidad: [null, Validators.required],
            direccion: [null, Validators.required],
            tipoAlojamiento: [null, Validators.required],
            categoria: [null, Validators.required],
            nombre: [null, Validators.required],
            descripcion: [null, Validators.required]
        });
        this.registerForm.controls.provincia.disabled;
        this.cargarComboProvincia();

        this.logService.log("Log - Ha ingresado a la pantalla de alta de alojamiento - " + Date.now().toLocaleString());
    }

    cargarComboProvincia(){
        this.localizationService.getProvincias().subscribe(data => {
            this.comboProvincias = this.formatDataForUbicationDropdowns(data.provincias);
        }, error =>{
            this.logService.log("Error - Ha fallado la llamada al servicio de provincias - " + Date.now().toLocaleString());   
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.alojamientosService.guardarAlojamiento(this.model).subscribe(data => {
            this.logService.log("Alta alojamiento - Se ha creado con exito el alojamiento con id " + data.id.toString() + " - " + Date.now().toLocaleString());
            this.loading = false;
            this.router.navigate(['/listadoAlojamientos']);
        }, error =>{
            this.logService.log("Error - Ha fallado la llamada al servicio de alta de alojamiento - " + error + " - " +Date.now().toLocaleString());   
        });
    }

    changePais(event){
        this.cargarComboLocalidad(event.id);
    }

    cargarComboLocalidad(idProvincia){
        this.localizationService.getLocalidades(idProvincia).subscribe(data => {
            this.comboLocalidades = this.formatDataForUbicationDropdowns(data.municipios);
        }, error =>{
            this.logService.log("Error - Ha fallado la llamada al servicio de localidades - " + error + " - " + Date.now().toLocaleString());   
        });
    }

    private formatDataForUbicationDropdowns(list){
        let values = [];
        list.forEach(provincia => {
            let comboValue = {
                id: provincia.id.toString(),
                name: provincia.nombre
            }
            values.push(comboValue);
        })

        values.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });

        return values;
    }
}