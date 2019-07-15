export class User{
    
    constructor(){
        this.roles =  ["USER"];
    }

    id: number;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: any[];
}