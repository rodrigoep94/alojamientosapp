import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { User } from '../models/user';
import { BaseService } from './service.base';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(protected http: HttpClient) { 
    super(http);
  }

  login(user: LoginModel){
    var userObtenido = this.post('usuario/login', JSON.stringify(user));
    return userObtenido;
  }

  register(user: User){
    var userLogeado = this.post('usuario/register', JSON.stringify(user));
    return userLogeado;
  }

}
