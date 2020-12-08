import { Injectable } from '@angular/core';
import { Customer } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  customer: Customer;
  constructor() { }
  
  public setCustomer( customer: Customer){
    this.customer = customer;
  }
}
