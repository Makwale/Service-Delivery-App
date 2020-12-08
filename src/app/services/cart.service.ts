import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

import { Item } from '../models/item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   // This is the list to store the items/products
	itemsList: Item[] = [];
  // this member variable is use to keep total number of items
	private totalItems:number = 0;

  // this member variable is used to keep the total price
	private totalPrice:number = 0; 

  constructor() { 

  }

  getItemList(){ return this.itemsList ;}

// This is the method we call in home component to add product
// So you pay attention here
  addItemToList(product: Product): void{ 
    // now you add product by calling the push method on the itemList array
    
      this.itemsList.push(new Item(this.totalItems,product));
      this.totalItems++;
    
      this.setTotalPrice(product);

  }

  getTotalItems(){ return this.getItemList().length}

  setTotalPrice(product: Product) {
   
    this.totalPrice  = this.totalPrice + product.getPrice();
   }

  getTotalPrice(){ return this.totalPrice;}

  deleteItem(id){
      let index = 0;
      
      // this.totalPrice = this.totalPrice - this.itemsList[id].getTotalPrice();
  		// this.itemsList.splice(index,1);
  		for(let item of this.itemsList){
  			if(item.getId() == id){
  				this.totalPrice = this.totalPrice - item.getTotalPrice();
          this.itemsList.splice(index,1);
          if(this.itemsList.length == 0) {
            this.totalItems = 0;
          }
  				break;
  			}

  			index = index + 1;
  		}
  		
  }

	equal(product: Product): boolean{
        for(let item of this.itemsList){
          if(item.getProduct().equal(product)){
            return true;
          }
        }

      return false;
  }

  increasingQnty(id){

    this.itemsList[id].setQuantity();
    this.itemsList[id].increaseTotalPrice();
   
    this.totalPrice = this.totalPrice + this.itemsList[id].getProduct().getPrice();
  
  }

    decreasingQnty(id){
      this.itemsList[id].decreaseQuantity();
      this.itemsList[id].decreaseTotalPrice();
     
      this.totalPrice = this.totalPrice - this.itemsList[id].getProduct().getPrice();
    }

}
