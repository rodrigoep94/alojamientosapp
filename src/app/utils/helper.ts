import { Injectable } from "@angular/core";

@Injectable()
export class Helper { 
    public static getLocaleDate(date: Date){
        debugger;
        let dia = date.getDate();
        let anho = date.getFullYear();
        let mes = date.getMonth() + 1;
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let segundos = date.getSeconds();

        return dia + "/" + mes + "/" + anho + "-" + hora + ":" + minutos + ":" + segundos;
    }
}