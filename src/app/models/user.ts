export class User{
    
    constructor(){
        this.roles =  ["ADMIN"];
    }

    id: number;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: any[];
}