import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, 
    private databaseService: DatabaseService, 
    private router: Router,
    public modalController: ModalController, 
    private toastController: ToastController) { }

  ngOnInit() {
  }


  async registerUser(fname: string, lname:string, phone: string, email: string, password: string){
  	this.authService.
  		creatUserWithEmailAndPassword(email, password).then(userCredential => {
        this.databaseService.creatUserAccount(userCredential.user.uid,
          fname, lname,
          phone, email)

      }).catch(async error =>{
        const toast = await this.toastController.create({
          message: error.message,
          duration: 5000,
          color: "warning"
        });
        
        toast.present();
      })
  }
 
 dismis(){
    this.modalController.dismiss({
      'dismissed': true
    });
 }

}
