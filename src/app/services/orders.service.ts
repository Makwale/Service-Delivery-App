import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { AngularFirestore, 
  AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/firestore';
   import { Item } from '../models/item.model';
   import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
	ordersList;
  constructor(private dbs: DatabaseService, 
    private afs: AngularFirestore,
    ) { }

  getOrders(){
  	this.ordersList = [];
  	this.dbs.getOrders().subscribe(datas =>{
      let index = 0;

        for(let data of datas){
        
          let order = {};

          order["data"] = data.payload.doc.data();
          let status = order['data'].status;
          switch(status){
            case 'r':
              order["data"].status = "Out for delivery";
              break;
              case 'p':
              order["data"].status = "Being prepared";
              break;
              case 'd':
              order["data"].status = "Delivered";
              break;
          }
          order["id"] = data.payload.doc.id;

          this.afs.collection("Item", ref => ref.where("oRef" , "==" , `${data.payload.doc.id}`)).snapshotChanges().subscribe( itemsData =>{
            let items = []
            let i = 0;
            for(let itemData of itemsData){
              let item = {};

              let itemDat = itemData.payload.doc.data();
              let itemId = itemData.payload.doc.id;


              this.afs.collection("Prod").doc(itemDat["prodRef"]).valueChanges().subscribe( productData => {
                
                item["data"] = itemDat;
                item["id"] = itemId;
                item["product"] = productData;

                items.push(item);
    
                order["items"] = items;
              })
              

            }

             this.ordersList.push(order);
           
          })

        }
    });

    return this.ordersList;
  }
}


