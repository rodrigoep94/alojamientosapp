import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserSavedModel } from '../models/userSavedModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

    private baseUrl = "https://alojapp-backend.herokuapp.com/";

    constructor(protected http: HttpClient){
    }

    public post(url, model){
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        let options = {
          headers: httpHeaders
        };
        return this.http.post(this.baseUrl + url, model, options)
    }

    public get(url) : Observable<any>{
        let logedUser = JSON.parse(sessionStorage.getItem("User-Alojamientosapp")) as UserSavedModel;
        console.log(logedUser);
        if (logedUser == null){
            throw new Error("Debe encontrarse logueado para ver los alojamientos"); 
        }
        console.log(logedUser);
        let headers = new HttpHeaders({ 
            Authorization: 'Basic ' + btoa(logedUser.username + ':' + logedUser.password) 
        });       
        return this.http.get(this.baseUrl + url, {headers});
    }

}