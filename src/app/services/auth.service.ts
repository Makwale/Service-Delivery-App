import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '../account/account.page';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private angularFrAuth: AngularFireAuth){ 
  	
  }

	async logingWithEmailAndPassword(email, password): Promise<UserCredential>{
		return this.angularFrAuth.signInWithEmailAndPassword ( email, password) as Promise<UserCredential>;
	}

	async creatUserWithEmailAndPassword(email, password): Promise<UserCredential>{
		return this.angularFrAuth.createUserWithEmailAndPassword ( email,  password) as Promise<UserCredential>;
	}
		

}
