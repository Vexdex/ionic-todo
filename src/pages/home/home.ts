import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { DetailsItemPage } from '../details-item/details-item';
import { DataProvider } from '../../providers/data/data';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 
  public items = [];
  public myTitle = 'Todo';

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              public dataService: DataProvider) { 

    this.dataService.getData().then((todos) => {
      if(todos){
        this.items = todos;
      }  
    });  
  }
 
  ionViewDidLoad(){}
   
  addItem(){ 
    let addModal = this.modalCtrl.create(AddItemPage); 
    addModal.onDidDismiss((item) => { 
          if(item){
            this.saveItem(item);
          } 
    }); 
    addModal.present(); 
  }
 
  saveItem(item){
    // get max id in this.items
    if(this.items.length) {
      item.id = this.items.reduce((max, p) => p.id > max ? p.id : max, this.items[0].id) + 1;
    } else {
      item.id = 0;
    }
    
    this.items.push(item);    
    this.dataService.save(this.items);
  }
 
  clearItems(){
    this.items = [];
    this.dataService.deleteAll();
  }
   
  viewItem(event, item){
    event.stopPropagation();
    this.navCtrl.push(DetailsItemPage, {
      item: item
    });
  }

  deleteItem(event, item) {
    event.stopPropagation();
    this.dataService.deleteItemById(item.id);
  }
 
  
}