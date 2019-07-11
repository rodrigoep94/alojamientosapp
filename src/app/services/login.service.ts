import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: LoginModel){
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    }; 
    var userObtenido = this.http.post('https://alojapp-backend.herokuapp.com/usuario/login', JSON.stringify(user), options);
    return userObtenido;
  }

  register(user: User){
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    }; 
    var userLogeado = this.http.post('https://alojapp-backend.herokuapp.com/usuario/register', JSON.stringify(user), options);
    return userLogeado;
  }

}
