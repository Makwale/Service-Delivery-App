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
  //This is the object that make the images to slide on the home page
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

  //This variable is the array that store a list of the products
  productList: Product[];

  //This is the temporary variable that is used to store list of products temporaly in case the user wants to search a product 
  tempList;

  //This is the variable that check if products are loaded into productsList variable
  isProductsLoaded = false;

  //This is the variable that check if image of product is still downloading
  isImgLoading = true;


   //This is the variable that check if image of product is downloaded
  isImgLoaded;
  

  constructor(public productService: ProductService,
   private cartService: CartService,
   public modalController: ModalController,
   public modalController2: ModalController,
   private toastController: ToastController,
    public accs: AccountService) {
  }

  //This method runs first when the user initialze the app
  ngOnInit() {
    //This line initializes the prodictList array variable
     this.productList = [];
     //this.filter = [];

     //This line calls the getProducts() method which is responsible for loading the products
    this.getProducts()
  }

  //This method changes the state of isImgLoading variable
  isImageLoading(){
    this.isImgLoading = true;
  }

  //And also this one does the same thing of changing the state of isImgLoading variable
  isImageLoaded(){
    this.isImgLoading = false;
  }

  //This navigate the user to the Order page
  async navigateToOrders(){
    const modal = await this.modalController.create({
        component: OrdersPage,
      });
      return await modal.present();
  }

  //This is the method that load the products to the productList array variable
	getProducts(){
   
    this.productService.getProducts().subscribe(data => {
      let index = 0;
      for(let documentCh of data){
        let product = documentCh.payload.doc.data();
        let id = documentCh.payload.doc.id;
        
        //This line add product to the productList 
        this.productList.push(new Product(id,index, product["name"], product["description"],  product["cat"], product["price"], product["url"]))
      }

      //This line changes the state of isProductsLoaded when the products are loaded to the productList array variable 
      this.isProductsLoaded = true;

      //This line assign the productsList values which are the products list to the tempList variable
      this.tempList = this.productList;
    })
	}

  //This method add the item to the cart
  async addToCart(product: Product){
      //This line checks if the user has signedin so that the app can allow the user to start shopping
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
   
// This is the method used to search the products based on category
// The categories are f for fast food, b for burgers, p for pizzas, and t for traditional but traditional food are not included
    async filter(cat){
      //This line i declared products array variable to store the products of specific category
      var products = [];

      //This line check if category is not fast food
      //If is not fast food we get inside if statement
      if(cat != 'f'){
        //This line assign all products of specific category that the user has selected
        products = 
        this.tempList.filter( c => c.getCategory() == cat);
      }else{
        products = this.tempList;
      }
      
      //This line navigate the user to the CategorysearchPage to display all products of specific category
      const modal = await this.modalController.create({
        component: CategorysearchPage,
        componentProps: {
          'productList' : products,
        }
      });
      return await modal.present();
    }

    //This method opens the login page
    async login(){
      this.productList = [];
      const modal = await this.modalController.create({
        component: AccountPage,
      });
      return await modal.present();
    }

     //This method is used to open the SearchPage in case you want to search the product by name
    async searchProduct(){
      const modal = await this.modalController2.create({
        component: SearchPage,
      });
      return await modal.present();
    }

}
