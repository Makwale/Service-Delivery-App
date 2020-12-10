import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, 
  AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/firestore';
import { ThrowStmt } from '@angular/compiler';
import { Product } from '../models/product.model';
import { CartService } from './cart.service';
import { Customer } from '../models/account.model';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  coordsDe;
  cooddsOr;
  constructor(private afs: AngularFirestore, private cart: CartService, private acc: AccountService) { }

  getProduct(){
    return this.afs.collection("Prod").snapshotChanges();
  }

  creatUserAccount(uid, fname, lname, phone, emailadd){
  	this.afs.collection('Customer').doc(uid).set({
  		firstName: fname,
  		lastName: lname,
      phone: phone,
      email: emailadd
  	}).then(()=>{
  		window.alert("Accout created");
  	}).catch(errer=>{
  		window.alert(errer.message)
  	})
  }

  getOrderCoors( direction){
    this.afs.collection("Order", ref => ref.where("oid", "==", this.acc.customer.email)).valueChanges().subscribe(data => {
      alert("Changes on database");
      for(let d of data){
        this.coordsDe = d["coordsDe"];
        this.cooddsOr = d["coordsOr"];
      }
      //direction.setOrigin(this.cooddsOr);
      direction.setDestination(this.coordsDe);
    })

  
  }

  order(phone, houseNumber, streetName, coord){
    
    this.afs.collection("Order").add({
      odate: new Date(),
      oid: this.acc.customer.email,
      phonenumber: phone,
      housenumber: houseNumber,
      str: streetName,
      coordsOr: coord.coordinates,
      coordsDe: [0,0],

    }).then(docRef => {
      
      for(let item of this.cart.getItemList()){
        this.afs.collection("Item").add({
          id: item.getId(),
          quantity: item.getQuantity(),
          totalprice: item.getTotalPrice(),
          prodRef : item.getProduct().getRef(),
          oRef: docRef.id,
        })
      }
    })
  }
}
