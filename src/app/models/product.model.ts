import { ThrowStmt } from '@angular/compiler';
import { VirtualTimeScheduler } from 'rxjs';

export class  Product{
    private ref : string;

    private id: number;

    private name: string;

    private description?: string;

    private cat: string;

    private price: number;

    private url: string;

    constructor(ref: string,id: number, name: string, description: string, cat: string, price: number, url: string){
        this.ref = ref;

        this.id = id;
        
        this.name = name;

        this.description = description;

        this.cat = cat;

        this.price = price;

        this.url = url;
    }

    public getRef(): string{
        return this.ref;
    }
    public getId(): number{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getDescripion(): string{
        return this.description;
    }

    public getCategory(): string{
        return this.cat;
    }

    public getPrice(): number{
        return this.price;
    }

    public getURL(): string{
        return this.url;
    }

    equal(product: Product){
        return this.getRef() == product.getRef();
    }



}