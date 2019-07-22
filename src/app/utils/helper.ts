import { Injectable } from "@angular/core";
import { UserSavedModel } from '../models/userSavedModel';

@Injectable()
export class Helper { 
    public static getLocaleDate(date: Date){
        let dia = date.getDate();
        let anho = date.getFullYear();
        let mes = date.getMonth() + 1;
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let segundos = date.getSeconds();

        return dia + "/" + mes + "/" + anho + "-" + hora + ":" + minutos + ":" + segundos;
    }

    public static isAdmin(){
        var user = JSON.parse(sessionStorage.getItem("User-Alojamientosapp")) as UserSavedModel;
        return user && user.roles.includes("ADMIN");
    }

    public static isLogged(){
        var user = JSON.parse(sessionStorage.getItem("User-Alojamientosapp")) as UserSavedModel;
        return user != null;
    }

    public static valDecimalKeyPress(ev: any, func?: (keyCode: number, key: string) => void) {
        Helper.valPress(ev, /[0-9|\.|]/, func);
    }

    public static valDecimalKeyPaste(val: any, ev: any, func?: (keyCode: number, key: string) => void) {
        Helper.valPaste(val, ev, /^[0-9]*$/, func);
    }

    private static valPaste(val: any, ev: any, regex, func?: (keyCode: number, key: string) => void) {
        let theEvent = ev || window.event;
        let keycode = theEvent.keyCode || theEvent.which;
    
        if (!new RegExp(regex).test(val)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
    
        if (func) func(keycode, val);
      }
      
    private static valPress(ev: any, regex, func?: (keyCode: number, key: string) => void) {
        let theEvent = ev || window.event;
        let keycode = theEvent.keyCode || theEvent.which;
        let key = String.fromCharCode(keycode);
        if (!new RegExp(regex).test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
    
        if (func) func(keycode, key);
      }
}