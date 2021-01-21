import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

	productList : Product[] = [];
  filteredProducts: Product[] = [];
  isImageLoaded = false;
  tempList;
  constructor(private productService: ProductService,
   private cartService: CartService,
   public modalController: ModalController, private toastController: ToastController, private accs: AccountService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
     let tempVar: Product[] = []
  
      for(let documentCh of data){

        let product = documentCh.payload.doc.data();
      
        let id = documentCh.payload.doc.id;
        
        tempVar.push(new Product(id, product["name"], product["description"],  product["cat"], product["price"], product["url"]))
      
      }
      this.productList = tempVar;
      this.tempList = this.productList;
    })
  }

  async addToCart(product: Product){

      if(this.accs.getLoginStatus()){
        if(!this.cartService.equal(product)){
          // we asume the product doesnt exist in the cart
          // so we add our product by calling the addItemToList
          // addItemToList is a method declared in CartService
          this.cartService.addItemToList(product);
          const toast = await this.toastController.create({
            message: 'Product added into the cart',
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


  isLoading(){
    
    this.isImageLoaded = false;
  }

  isLoaded(){
    
    this.isImageLoaded = true;
  }

  getProducts(){
    return this.productService.getProducts();
  }


	dismis(){
		this.modalController.dismiss({
		      'dismissed': true
		    });
	}

	searchProduct(value: string){
    if(value.length > 0){
      
		 this.filteredProducts = this.tempList.filter( c =>  c.getName().toLowerCase().startsWith(value.toLowerCase()));
    }else{
      this.filteredProducts = [];
    }
      
	}
	
}
