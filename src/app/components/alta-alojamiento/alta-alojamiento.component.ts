import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from 'src/app/services/localization.service';
import { Alojamiento } from 'src/app/models/alojamiento';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { Router } from '@angular/router';
import { Helper } from '../../utils/helper';
import { LogService } from '../../services/log.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-alta-alojamiento',
  templateUrl: './alta-alojamiento.component.html',
  styleUrls: ['./alta-alojamiento.component.scss']
})
export class AltaAlojamientoComponent implements OnInit {
    comboProvincias = [];
    comboLocalidades = [];
    comboAlojamiento = ["Hotel", "Posada", "Cabana", "Otro"]
    comboPension = ["Desayuno", "Media", "Completa"]
    registerForm: FormGroup;
    model: Alojamiento = new Alojamiento();
    submitted = false;
    loading = false;

    constructor(private formBuilder: FormBuilder,
                private localizationService: LocalizationService,
                private alojamientosService: AlojamientosService,
                private logService: LogService,
                private notifyService: NotifyService,
                private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            provincia: [null, Validators.required],
            localidad: [null, Validators.required],
            direccion: [null, Validators.required],
            tipoAlojamiento: [null, Validators.required],
            valorPension: [null, Validators.required],
            tipoPension: [null, Validators.required],
            categoria: [null, Validators.required],
            nombre: [null, Validators.required],
            descripcion: [null, Validators.required],
            imagenUno: [null],
            imagenDos: [null],
            imagenTres: [null]
        });
        this.registerForm.controls.provincia.disabled;
        this.cargarComboProvincia();
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
            var newModel = data as Alojamiento;
            var pension = {
                tipopension: this.model.tipoPension,
                precio: this.model.valorPension
            };
            
            this.alojamientosService.guardarPension(pension, newModel.id).subscribe(data => {
                console.log(this.model);
                this.saveImages(newModel.id);
                this.loading = false;
                this.notifyService.add("Alojamiento creado con éxito");
                this.router.navigate(['/listadoAlojamientos']);
            });
        }, error =>{
        });
    }

    saveImages(idAlojamiento: number){
        if(this.model.imagenUno){
            this.alojamientosService.saveImage(this.model.imagenUno, idAlojamiento).subscribe(data => {
            });
        }

        if(this.model.imagenDos){
            this.alojamientosService.saveImage(this.model.imagenDos, idAlojamiento).subscribe(data => {
            });
        }

        if(this.model.imagenTres){
            this.alojamientosService.saveImage(this.model.imagenTres, idAlojamiento).subscribe(data => {
            });
        }
    }

    cargarComboProvincia(){
        this.localizationService.getProvincias().subscribe(data => {
            this.comboProvincias = this.formatDataForUbicationDropdowns(data.provincias);
        }, error =>{
        });
    }

    changePais(event){
        this.cargarComboLocalidad(event.id);
    }

    cargarComboLocalidad(idProvincia){
        this.localizationService.getLocalidades(idProvincia).subscribe(data => {
            this.comboLocalidades = this.formatDataForUbicationDropdowns(data.municipios);
        }, error =>{
        });
    }

    changeImage(ev, imagen: number){
        switch(imagen){
            case 1:
                this.model.imagenUno = ev.target.files[0];
                break;
            case 2:
                this.model.imagenDos = ev.target.files[0];
                break;
            case 3:
                this.model.imagenTres = ev.target.files[0];
                break;
            default:
                break;
        }
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