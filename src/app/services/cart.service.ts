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
  // this member variable is used to keep the total price
	private totalPrice:number = 0; 

  constructor() { 

  }

  getItemList(){ return this.itemsList ;}

// This is the method we call in home component to add product
// So you pay attention here
  addItemToList(product: Product): void{ 
    // now you add product by calling the push method on the itemList array
    
      this.itemsList.push(new Item(product));

      this.setTotalPrice(product.getPrice());

  }

  getTotalItems(){ return this.getItemList().length}

  setTotalPrice(price: number) {
   
    this.totalPrice  = this.totalPrice + price;
   }

  getTotalPrice(){ return this.totalPrice;}

  deleteItem(id: string){

       let index = 0;
      
      
  		for(let item of this.itemsList){

  		  if(item.getProduct().getId() == id){

          this.totalPrice = this.totalPrice - this.itemsList[index].getTotalPrice();
          this.itemsList.splice(index,1);
          break;
        }
        index++;
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

  increasingQnty(id: string){

    let index = 0;
    for(let item of this.itemsList){

        if(item.getProduct().getId() == id){
          this.itemsList[index].setQuantity();
          this.itemsList[index].increaseTotalPrice();
          this.totalPrice = this.totalPrice + this.itemsList[index].getProduct().getPrice();
          break;
        }

        index++;
      }

    
   
  
  }

  decreasingQnty(id: string){

      let index = 0;
    for(let item of this.itemsList){

        if(item.getProduct().getId() == id){

          this.itemsList[index].decreaseQuantity();
          this.itemsList[index].decreaseTotalPrice();
     
          this.totalPrice = this.totalPrice - this.itemsList[index].getProduct().getPrice();
          
          break;
        }

        index++;
    }
     
  }

}
