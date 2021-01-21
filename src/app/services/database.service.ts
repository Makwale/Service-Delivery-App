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
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  coordsDe;
  cooddsOr;
  constructor(private toastController: ToastController, public loadingController: LoadingController,
    private afs: AngularFirestore,
     private cart: CartService,
      private acc: AccountService,
       public modalController: ModalController) { }


  getProducts(){
    return this.afs.collection("Prod").snapshotChanges();
  }

  async creatUserAccount(uid, fname, lname, phone, emailadd){
  	
    const loading = await this.loadingController.create({
      message: 'Creating account, Please wait...',
      cssClass: 'my-custom-loading-class'
    });
    await loading.present();

    this.afs.collection('Customer').doc(uid).set({
  		firstName: fname,
  		lastName: lname,
      phone: phone,
      email: emailadd
  	}).then(async ()=>{
  		const toast = await this.toastController.create({
            message: 'Account created successfully',
            duration: 3000,
            color: "success"
          });
      loading.dismiss();
      toast.present();

      this.modalController.dismiss({
      'dismissed': true
      });
  	}).catch(async errer=>{
  		const toast = await this.toastController.create({
            message: errer.message,
            duration: 3000,
            color: "success"
          });
      loading.dismiss();
      toast.present();
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

  async order(phone, houseNumber, streetName, coord){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      cssClass: 'my-custom-loading-class'
    });
    await loading.present();

    this.afs.collection("Order").add({
      odate: new Date(),
      oid: this.acc.customer.email,
      phonenumber: phone,
      housenumber: houseNumber,
      str: streetName,
      coordsOr: coord.coordinates,
      coordsDe: [0,0],

    }).then( async docRef => {
      
      for(let item of this.cart.getItemList()){
        this.afs.collection("Item").add({
          quantity: item.getQuantity(),
          totalprice: item.getTotalPrice(),
          prodRef : item.getProduct().getId(),
          oRef: docRef.id,
        })
      }

      const toast = await this.toastController.create({
            message: 'Your order is succesful',
            duration: 3000,
            color: "success"
          });
      loading.dismiss();
      toast.present();

    })
  }

  getOrders(){
    return this.afs.collection("Order", ref => ref.where("oid", "==", this.acc.customer.email)).snapshotChanges();
  }
}
