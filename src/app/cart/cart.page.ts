import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { CartService } from '../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public cartService: CartService, public modalController: ModalController) { }

  ngOnInit() {

  }

  deleteItem(item: Item){
		this.cartService.deleteItem(item.getProduct().getId());
		
	}

	getTotalPrice(){
		return this.cartService.getTotalPrice()
	}

	increasingQnty(item: Item){
		this.cartService.increasingQnty(item.getProduct().getId());
	}

	decreasingQnty(item: Item){
		if(item.getQuantity() > 1)
			this.cartService.decreasingQnty(item.getProduct().getId());
  	}
  
  async checkout(){
    const modal = await this.modalController.create({
      component: CheckoutPage,
    });
    return await modal.present();
  }

}
