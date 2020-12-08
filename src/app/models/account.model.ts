import { ThrowStmt } from '@angular/compiler';

 
 export class Customer{
    private firstName: string;
    private lastName: string;
    private phone: string;
    email: string;

    constructor(fistname, lastname, phone, email){
        this.firstName = fistname;
        this.lastName  = lastname;
        this.phone = phone;
        this.email = email;
    }

    public getFirstname(): string{
        return this.firstName;
    }

    public getLastName() : string{
        return this.lastName;
    }

    public getEmail(): string{
        return this.email;
    }
    
 }