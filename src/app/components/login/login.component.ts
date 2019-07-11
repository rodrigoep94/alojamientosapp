import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/loginModel';
import * as crypto from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public messageError: string;
  loginForm: FormGroup;
  submitted = false;
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
    
    var loginModelEncrypted = {...this.model} as LoginModel;    
    loginModelEncrypted.password = crypto.HmacSHA1(this.model.password, 'alojamientosapp').toString();
    console.log(loginModelEncrypted);
    
    this.loginService.login(loginModelEncrypted).subscribe(data => {
        console.log(data);
        sessionStorage.setItem("User-Alojamientosapp", JSON.stringify(data));
        console.log(sessionStorage.getItem('User-Alojamientosapp'));
    }, error =>{
        console.log(error);
    });
  }

  closeModal(){
    this.activeModal.close();
  }

  get f() { return this.loginForm.controls; }

}