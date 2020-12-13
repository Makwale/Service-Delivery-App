import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList;

  constructor(private dbs: DatabaseService) {     
  
  }

  getProducts() { 
   return this.dbs.getProducts();
  }

  


  
}
