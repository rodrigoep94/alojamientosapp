import { Ubicacion } from './ubicacion';

export class Alojamiento{
    
    constructor(){
        this.ubicacion = new Ubicacion();
    }

    id: number;
    nombre: string;
    descripcion: string;
    ubicacion: Ubicacion;
    tipoAlojamiento: string;
    categoria: number;
}