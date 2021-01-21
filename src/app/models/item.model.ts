import { ThrowStmt } from '@angular/compiler';
import { Product } from './product.model';

export class Item{

    private quantity?:number;

    private product: Product;

    private totalPrice: number;

    constructor(product: Product){

        this.product = product;

        this.quantity = 1;
        
        this.totalPrice = product.getPrice();

    }

    public getQuantity(): number{
        return this.quantity;
    }

     public getProduct(): Product{
         return this.product;
     }

     public getTotalPrice(): number{
         return this.totalPrice;
     }


    public setQuantity(): void{
        this.quantity++;
    }

    public decreaseQuantity(): void{
        this.quantity--;
    }

     public increaseTotalPrice(): void{
         this.totalPrice = this.totalPrice + this.product.getPrice();
     }

     public decreaseTotalPrice(): void{
        this.totalPrice = this.totalPrice - this.product.getPrice();
    }
}