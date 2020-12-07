import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit() {
    console.log(this.cartService.getTotalPrice())

  }

  deleteItem(item: Item){
		this.cartService.deleteItem(item.getId());
		
	}

	getTotalPrice(){
		return this.cartService.getTotalPrice()
	}

	increasingQnty(item: Item){
		this.cartService.increasingQnty(item.getId());
	}

	decreasingQnty(item: Item){
		if(item.getQuantity() > 1)
			this.cartService.decreasingQnty(item.getId());
  }
  
  checkout(){
    console.log(this.getTotalPrice());
  }

}
