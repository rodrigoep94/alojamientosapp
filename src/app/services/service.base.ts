import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserSavedModel } from '../models/userSavedModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

    private baseUrl = "http://localhost:9090/";
    private logedUser = JSON.parse(sessionStorage.getItem("User-Alojamientosapp")) as UserSavedModel;

    constructor(protected http: HttpClient){
    }

    public postWithSecurity(url, model){
        
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password));
        let options = {
          headers: httpHeaders
        };
        return this.http.post(this.baseUrl + url, model, options)
    }

    public putWithSecurity(url, model){
        
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password));
        let options = {
          headers: httpHeaders
        };
        return this.http.put(this.baseUrl + url, model, options)
    }

    public patchWithSecurity(url, model){
        
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password));
        let options = {
          headers: httpHeaders
        };
        return this.http.patch(this.baseUrl + url, model, options)
    }

    public postFile(url, image){
        
        let httpHeaders = new HttpHeaders()
            .set('Authorization', 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password));
        let options = {
          headers: httpHeaders
        };

        let formData: FormData = new FormData();
        formData.append('file', image);

        return this.http.post(this.baseUrl + url, formData, options)
    }

    public postRechazo(url, motivo){
        
        let httpHeaders = new HttpHeaders()
            .set('Authorization', 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password));
        let options = {
          headers: httpHeaders
        };

        let formData: FormData = new FormData();
        formData.append('justificacion', motivo);

        return this.http.post(this.baseUrl + url, formData, options)
    }

    public post(url, model){
        
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        let options = {
          headers: httpHeaders
        };
          
        return this.http.post(this.baseUrl + url, model, options)
    }

    public put(url){
        let headers = new HttpHeaders({ 
            Authorization: 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password) 
        });       
        return this.http.put(this.baseUrl + url, null, {headers});
    }

    public delete(url, model){
        let headers = new HttpHeaders({ 
            Authorization: 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password) 
        });       
        return this.http.put(this.baseUrl + url, null, {headers});
    }

    public get(url) : Observable<any>{
        
        if (this.logedUser == null){
            throw new Error("Debe encontrarse logueado para realizar la accion"); 
        }
        
        let headers = new HttpHeaders({ 
            Authorization: 'Basic ' + btoa(this.logedUser.username + ':' + this.logedUser.password) 
        });       
        return this.http.get(this.baseUrl + url, {headers});
    }

}