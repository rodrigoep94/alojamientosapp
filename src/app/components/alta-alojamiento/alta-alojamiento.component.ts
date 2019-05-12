import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from 'src/app/services/localization.service';
import { Alojamiento } from 'src/app/models/alojamiento';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { Router } from '@angular/router';

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
    }

    cargarComboProvincia(){
        this.localizationService.getProvincias().subscribe(data => {
            let list = [];
            data.provincias.forEach(provincia => {
                let comboValue = {
                    id: provincia.id.toString(),
                    name: provincia.nombre
                }
                list.push(comboValue);
            })
            list.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            this.comboProvincias = list;
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
            this.loading = false;
            this.router.navigate(['/listadoAlojamientos']);
        });
    }

    changePais(event){
        this.cargarComboLocalidad(event.id);
    }

    cargarComboLocalidad(idProvincia){
        this.localizationService.getLocalidades(idProvincia).subscribe(data => {
            let list = [];
            data.municipios.forEach(provincia => {
                let comboValue = {
                    id: provincia.id.toString(),
                    name: provincia.nombre
                }
                list.push(comboValue);
            })
            list.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            this.comboLocalidades = list;
        });
    }
}