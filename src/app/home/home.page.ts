import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { AccountPage } from '../account/account.page';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AccountService } from '../services/account.service';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    init: true,
    autoplay: {
      delay: 5000
    },
    speed: 1500,
    slidesPerView: 1
    
  }

  slideOptsProds = {
    init: true,
    autoplay: false,
    speed: 1500,
    slidesPerView: 2,
    spaceBetween : 10
  }

  productList : Product[] = [];
  category = "All";
  tempList;
  isImageLoading;
  constructor(private productService: ProductService,
   private cartService: CartService,
   public modalController: ModalController, private toastController: ToastController, private accs: AccountService) {
  }

  ngOnInit() {
    this.getProducts()
   
  }

  isLoading(){
    this.isImageLoading = true;
  }

  isLoaded(){
    this.isImageLoading = false;
  }

  
	getProducts(){
    this.productService.getProduct().subscribe(data => {
      let index = 0;
      for(let documentCh of data){
        let product = documentCh.payload.doc.data();
        let id = documentCh.payload.doc.id;
        this.productList.push(new Product(id,index, product["name"], product["description"],  product["cat"], product["price"], product["url"]))
      }
      this.tempList = this.productList;
    })
	}

  // this is the mothod you have to pay attention on
// i passed the product as argument
// check on the component constructor, i created sersionService object
// that object is the one will be used to add product to the cart
  async addToCart(product: Product){

      if(this.accs.getLoginStatus()){
        if(!this.cartService.equal(product)){
          // we asume the product doesnt exist in the cart
          // so we add our product by calling the addItemToList
          // addItemToList is a method declared in CartService
          this.cartService.addItemToList(product);
        
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
   

    async filter(cat, ref){
      let categ;
      switch(cat){
        case 'f':
          categ = cat;
          break;
        case 'b':
          categ = cat
          break;
        case 'p':
          categ = cat;
      }

      const modal = await this.modalController.create({
        component: SearchPage,
        componentProps: {
          'category' : categ,
        }
      });
      return await modal.present();
    }

    viewAll(){
      this.productList = this.tempList;
      this.category = "All"
    }

    async login(){
      const modal = await this.modalController.create({
        component: AccountPage,
      });
      return await modal.present();
    }

    async searchProduct(){
      const modal = await this.modalController.create({
        component: SearchPage,
      });
      return await modal.present();
    }

}
