import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { DetailsItemPage } from '../details-item/details-item';

import { DataProvider } from '../../providers/data/data';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 
  public items = [];
  public myTitle = 'Todo tasks';
  public amountTasks: number;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public dataService: DataProvider) { 
    
    // primary load data            
    this.dataService.getData().then((data) => {
      if(data){
        this.items = data;
      }  
      this.amountTasks = this.items.length;
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
 
  deleteAllItems(){
    this.items = [];
    this.dataService.deleteAll();
  }
   
  viewItem(event, item){
    event.stopPropagation();
    this.navCtrl.push(DetailsItemPage, {
      item: item
    });
  }
  
  checkComplete(event, item) {
    event.stopPropagation();    
    item.complete = !!!item.complete;
    this.dataService.updateItemById(item.id, item);
  }

  confirmDeleteAllItems() {
    const confirm = this.alertCtrl.create({
      title: 'Delete All todo Tasks?',
      message: 'Do you confirm to delete all tasks?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('cancel delete all tasks clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {
            this.deleteAllItems();            
          }
        }
      ]
    });
    confirm.present();
  }


}