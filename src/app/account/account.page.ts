import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
	isRegistered = true;
	name = "Login";

  constructor() { }

  ngOnInit() {
  }

  register(){
  	this.name = "Register";
  	this.isRegistered = false;
  }

}
