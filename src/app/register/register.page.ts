import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, 
    private databaseService: DatabaseService, 
    private router: Router) { }

  ngOnInit() {
  }


  registerUser(fname: string, lname:string, phone: string, email: string, password: string){
  	this.authService.
  		creatUserWithEmailAndPassword(email, password).then(userCredential => {
        this.databaseService.creatUserAccount(userCredential.user.uid,
          fname, lname,
          phone, email)

      }).catch(error =>{
        window.alert(error.message);
      })
  }
 

}
