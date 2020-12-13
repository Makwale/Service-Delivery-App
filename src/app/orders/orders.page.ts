import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
	ordersList = []
  constructor(public modalController: ModalController, private ordersService: OrdersService) { }

  ngOnInit() {

  	this.ordersList = this.ordersService.getOrders();
  }

   dismis(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
