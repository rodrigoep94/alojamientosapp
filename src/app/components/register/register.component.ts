import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import * as crypto from 'crypto-js';

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
    private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        nombre: [null, Validators.required],
        apellido: [null, Validators.required],
        username: [null, Validators.required],
        password: [null, Validators.required]
    });
  }

  closeModal(){
    this.activeModal.close();
  }

  register(){
    // Encrypt
    var ciphertext = crypto.AES.encrypt('my message', 'alojamientosapp');
    var encrypted = ciphertext.toString(crypto.enc.Utf8);
    console.log(ciphertext.toString());
    console.log(encrypted);
     
    // Decrypt
    var bytes  = crypto.AES.decrypt(ciphertext.toString(), 'alojamientosapp');
    var plaintext = bytes.toString(crypto.enc.Utf8);
     
    console.log(plaintext);
    
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    // encriptar password
    // llamar servicio de registro
  }

  get f() { return this.registerForm.controls; }

}
