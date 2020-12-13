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
import { CategorysearchPage } from '../categorysearch/categorysearch.page';
import { OrdersPage } from '../orders/orders.page';


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

  productList: Product[];
  tempList;
  isProductsLoaded = false;
  isImgLoading = true;
  isImgLoaded;

  constructor(public productService: ProductService,
   private cartService: CartService,
   public modalController: ModalController,
   public modalController2: ModalController,
   private toastController: ToastController,
    public accs: AccountService) {
  }

  ngOnInit() {
     this.productList = [];
     this.filter = [];
    this.getProducts()
  }

  isImageLoading(){
    this.isImgLoading = true;
  }

  isImageLoaded(){
    this.isImgLoading = false;
  }

  async navigateToOrders(){
    const modal = await this.modalController.create({
        component: OrdersPage,
      });
      return await modal.present();
  }

  
	getProducts(){
   
    this.productService.getProducts().subscribe(data => {
      let index = 0;
      for(let documentCh of data){
        let product = documentCh.payload.doc.data();
        let id = documentCh.payload.doc.id;
        this.productList.push(new Product(id,index, product["name"], product["description"],  product["cat"], product["price"], product["url"]))
      }
      this.isProductsLoaded = true;
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
   

    async filter(cat){
      var products = [];
      if(cat != 'f'){
        products = 
        this.tempList.filter( c => c.getCategory() == cat);
      }else{
        products = this.tempList;
      }
      
      const modal = await this.modalController.create({
        component: CategorysearchPage,
        componentProps: {
          'productList' : products,
        }
      });
      return await modal.present();
    }

    async login(){
      this.productList = [];
      const modal = await this.modalController.create({
        component: AccountPage,
      });
      return await modal.present();
    }

    async searchProduct(){
      const modal = await this.modalController2.create({
        component: SearchPage,
      });
      return await modal.present();
    }

}
