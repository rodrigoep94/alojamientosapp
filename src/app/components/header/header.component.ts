import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver/src/FileSaver';
import { Helper } from '../../utils/helper';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  login(){
    this.modalService.open(LoginComponent);
  }

  register(){
    this.modalService.open(RegisterComponent);
  }

}
