import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/loginModel';
import * as crypto from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';
import { UserSavedModel } from 'src/app/models/userSavedModel';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public messageError: string;
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  model = new LoginModel();
  
  constructor(private formBuilder: FormBuilder,
              private activeModal: NgbActiveModal,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
    });
  }

  login(){
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    this.loginForm.disable();
    this.loading = true;
    
    this.loginService.login(this.model).subscribe(data => {
        var userLogged = data as User;
        let newUserToSave = new UserSavedModel(userLogged.email, this.model.password, userLogged.roles);
        
        sessionStorage.setItem("User-Alojamientosapp", JSON.stringify(newUserToSave));
        this.activeModal.dismiss();
    }, error =>{
      this.loginForm.enable();
      this.loading = false;
      this.setErrorMessage(error.status);
    });
  }

  setErrorMessage(error){
    if (error == "404") this.messageError = "El usuario no se encuentra registrado en el sistema";
    if (error == "400") this.messageError = "La contraseña es incorrecta";
  }

  closeModal(){
    this.activeModal.close();
  }

  get f() { return this.loginForm.controls; }

}
