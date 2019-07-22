import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public usuario;
  public usuarioLogueado;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    this.usuario = JSON.parse(sessionStorage.getItem('User-Alojamientosapp'));
    this.usuarioLogueado = this.usuario != null;
  }

  login(){
    var modal = this.modalService.open(LoginComponent);
    modal.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      this.getUsuario();
      window.location.reload();
    })
  }

  register(){
    this.modalService.open(RegisterComponent);
  }
  
  logout(){
    sessionStorage.removeItem('User-Alojamientosapp');
    this.getUsuario();
    window.location.reload();
  }

}
