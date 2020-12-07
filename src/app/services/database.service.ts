import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, 
  AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/firestore';
import { ThrowStmt } from '@angular/compiler';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(private afs: AngularFirestore) { }

  getProduct(){
    return this.afs.collection("Prod").valueChanges();
  }

  creatUserAccount(uid, fname, lname, phone){
  	this.afs.collection('Customer').doc(uid).set({
  		firstName: fname,
  		lastName: lname,
  		phone: phone
  	}).then(()=>{
  		window.alert("Accout created");
  	}).catch(errer=>{
  		window.alert(errer.message)
  	})
  }
}
