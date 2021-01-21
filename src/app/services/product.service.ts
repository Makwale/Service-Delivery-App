import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { DatabaseService } from './database.service';
import { AngularFirestore, 
  AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) {     
  	this.getProducts()
  	
  }

 

  getProducts() { 
  	return this.afs.collection("Prod").snapshotChanges();
  }
  
}
