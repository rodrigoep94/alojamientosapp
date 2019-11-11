import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import * as crypto from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public messageError: string;
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  model = new User();

  constructor(private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private activeModal: NgbActiveModal,
    private loginService: LoginService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, Validators.required],
        password: [null, Validators.required]
    });
  }

  closeModal(){
    this.activeModal.close();
  }

  register(){
    debugger;
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }

    this.registerForm.disable();
    this.loading = true;

    this.loginService.register(this.model).subscribe(data => {
        this.loading = false;
        this.notifyService.add("Usuario registrado con éxito");
        this.activeModal.dismiss();
    }, error =>{
        this.messageError = "Hubo un error al procesar la solicitud. Por favor intente nuevamente."
        this.registerForm.enable();
        this.loading = false;
    });
  }

  get f() { return this.registerForm.controls; }

}
