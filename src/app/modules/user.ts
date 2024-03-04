export class User {

    userId? : number;
    names? : string;
    email? : string;
    password? : string;

    constructor(user : any)
{
    this.userId =  user.userId;
    this.names = user.names;
    this.email = user.email;
    this.password = user.password;
    
}
}




