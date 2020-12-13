import { Injectable } from '@angular/core';

import { Customer } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  customer: Customer;
  loginStatus = false;
  constructor() { }
  
  public setCustomer( customer: Customer){
    this.customer = customer;
  }

  setLoginStatus(status: boolean): void{
    this.loginStatus = status;
  }

  getLoginStatus(): boolean{
    return this.loginStatus;
  }
}
