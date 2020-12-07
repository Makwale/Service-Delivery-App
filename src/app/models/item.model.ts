import { ThrowStmt } from '@angular/compiler';
import { Product } from './product.model';

export class Item{
    private id:number;
    private quantity?:number;
    private product: Product;
    private totalPrice: number;

    constructor(id:number, product: Product){
        this.id = id;
        this.product = product;
        this.quantity = 1;
        this.totalPrice = product.getPrice();

    }

    public getId(): number{
        return this.id;
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

     
    public setId(id: number): void{
        this.id = id;
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