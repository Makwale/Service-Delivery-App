import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';


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
    private databaseService: DatabaseService, 
    private router: Router, 
    public modalController: ModalController) { }



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
  
  logingWithEmailAndPassword(username: string, password: string){
		this.authService.logingWithEmailAndPassword(username, password).then( userCredential => {
      this.dismis()
    }).catch(error => {
      alert(error.message);
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
