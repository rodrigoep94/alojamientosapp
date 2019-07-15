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
    
    this.loginService.login(this.model).subscribe(data => {
        console.log(data);
        let newUserToSave = new UserSavedModel(this.model.username, this.model.password, []);
        
        sessionStorage.setItem("User-Alojamientosapp", JSON.stringify(newUserToSave));
        this.activeModal.dismiss();
    }, error =>{
        console.log(error);
    });
  }

  closeModal(){
    this.activeModal.close();
  }

  get f() { return this.loginForm.controls; }

}
