import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import * as crypto from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public messageError: string;
  registerForm: FormGroup;
  submitted = false;
  model = new User();

  constructor(private formBuilder: FormBuilder,
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
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    console.log(this.model);
    this.loginService.register(this.model).subscribe(data => {
        console.log(data);
        this.activeModal.close();
    }, error =>{
        console.log(error);
    });
  }

  get f() { return this.registerForm.controls; }

}
