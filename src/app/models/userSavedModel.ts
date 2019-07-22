export class UserSavedModel{
    
    constructor(user, password, roles){
        this.username = user;
        this.password = password;
        this.roles =  roles;
    }

    username: string;
    password: string;
    roles: any[];
}