import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public messageError: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required],
        nombre: [null, Validators.required],
        apellido: [null, Validators.required]
    });
  }

  closeModal(){
    this.activeModal.close();
  }

  get f() { return this.registerForm.controls; }

}
