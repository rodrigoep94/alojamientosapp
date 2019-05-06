import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'app-alta-alojamiento',
  templateUrl: './alta-alojamiento.component.html',
  styleUrls: ['./alta-alojamiento.component.scss']
})
export class AltaAlojamientoComponent implements OnInit {
    comboProvincias = [];
    comboLocalidades = [];
    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private localizationService: LocalizationService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            provincia: [null, Validators.required],
            localidad: [null, Validators.required]
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
            this.comboProvincias = list;
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

    changePais(event){
        console.log(event);
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
            this.comboLocalidades = list;
        });
    }
}
