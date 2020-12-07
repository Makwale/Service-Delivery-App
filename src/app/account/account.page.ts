import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
	isRegistered = true;
  name = "Login";
  
 

  formControlFName = new FormControl('');
	formControlLName = new FormControl('');
	formControlPhone = new FormControl('');
	formControlEmail = new FormControl('');
	formControlPassword = new FormControl('');
	formControlCPassword = new FormControl('');
  isAccountCreated = false;
  
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  emailError = new ErrorStateMatcher();
  passwordError = new ErrorStateMatcher();

  constructor( private authService: AuthService, private databaseService: DatabaseService, private router: Router) { }



  ngOnInit() {
  }

  register(){
  	this.name = "Register";
  	this.isRegistered = false;
  }

  registerUser(fname: string, lname:string, phone: string, email: string, password: string){
  	this.authService.
  		creatUserWithEmailAndPassword(email, password).then(userCredential => {
        this.databaseService.creatUserAccount(userCredential.user.uid,
          fname, lname,
          phone)
      }).catch(error =>{
        window.alert(error.message);
      })
  }

  	results(res){
		res.then(userCredential => {
			this.creatAccount(userCredential.user.uid);
			this.isAccountCreated = true;
		}).catch(error =>{
			window.alert(error.message);
		})
	}

	creatAccount(uid){
		this.databaseService.creatUserAccount(uid,
		 this.formControlFName.value, this.formControlLName.value,
		 this.formControlPhone.value)
  }
  
  logingWithEmailAndPassword(username: string, password: string){
		this.authService.logingWithEmailAndPassword(username, password).then( userCredential => {
      this.router.navigateByUrl("tabs/home");
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
