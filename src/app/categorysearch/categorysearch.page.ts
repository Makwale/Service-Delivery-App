import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ModalController } from '@ionic/angular';
import { AccountService } from '../services/account.service';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categorysearch',
  templateUrl: './categorysearch.page.html',
  styleUrls: ['./categorysearch.page.scss'],
})
export class CategorysearchPage implements OnInit {
	@Input() productList: Product[];
	tempList;
  constructor(public modalController: ModalController,
  	private cartService: CartService,
   private toastController: ToastController,
    public accs: AccountService) { }

  ngOnInit() {
  	this.tempList = this.productList;
  }


  async addToCart(product: Product){

      if(this.accs.getLoginStatus()){
        if(!this.cartService.equal(product)){
          // we asume the product doesnt exist in the cart
          // so we add our product by calling the addItemToList
          // addItemToList is a method declared in CartService
          this.cartService.addItemToList(product);
        	const toast = await this.toastController.create({
            message: 'Product added into your cart',
            duration: 3000,
            color: "dark"
          });
          toast.present();
        }else{
          const toast = await this.toastController.create({
            message: 'Product already added into your cart',
            duration: 3000,
            color: "dark"
          });
          toast.present();
        }

      }else{
         const toast = await this.toastController.create({
            message: 'Login to start making orders',
            duration: 3000,
            color: "dark"
          });
          toast.present();
      }
    }
   


  searchProduct(value: string){
	    if(value.length > 0){
	    	
			this.productList = this.tempList.filter( c =>  c.getName().toLowerCase().startsWith(value.toLowerCase()));
	    }else{
	    	
	    	this.productList = this.tempList;
	    }
      
	}

	dismis(){
		this.modalController.dismiss({
		      'dismissed': true
		    });
	}


}
