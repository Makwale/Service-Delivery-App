import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { AccountService } from '../services/account.service';
import { Customer } from '../models/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
	isRegistered = true;
  isSignedIn = false;
  name = "Login";
  
  isAccountCreated = false;

  constructor( private authService: AuthService, 
    public modalController: ModalController,
    private accs: AccountService,
     private afs: AngularFirestore,
      private toastController: ToastController,
      public loadingController: LoadingController) { }



  ngOnInit() {
  }

  async register(){
  	const modal = await this.modalController.create({
      component: RegisterPage,
    });
    return await modal.present();
  }

  dismis(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  async logingWithEmailAndPassword(username: string, password: string){
    const loading = await this.loadingController.create({
      message: 'Authenticating, Please wait...',
      cssClass: 'my-custom-loading-class'
    });
    await loading.present();

		this.authService.logingWithEmailAndPassword(username, password).then( userCredential => {
      this.afs.collection("Customer", ref => ref.where("email" , "==" , `${username}`)).valueChanges().subscribe(data =>{
        let customer: Customer = data[0] as unknown as Customer;
        this.accs.setCustomer(customer as Customer);
        this.accs.setLoginStatus(true);
          loading.dismiss();
         this.dismis()
      })
      
    }).catch(async error => {
      const toast = await this.toastController.create({
        message: error.message,
        duration: 5000,
        color: "warning"
      });
      
      loading.dismiss();
      toast.present();
     
    })
	}

}

export interface UserCredential{
  additionalUserInfo;
  credential;
  operationType;
  user: User;
}

export interface User{
  displayName;
  email;
  emailVerified;
  isAnonymous;
  metadata;
  multiFactor;
  phoneNumber;
  photoURL;
  providerData;
  providerId;
  refreshToken;
  tenantId;
  uid;

}
