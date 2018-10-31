import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';

import { EditItemPage } from '../edit-item/edit-item';

@Component({
  selector: 'page-details-item',
  templateUrl: 'details-item.html',
})

export class DetailsItemPage {

  public myTitle = 'Task details';
  public item: any;
  
  public id;
  public title;
  public description;
  public complete;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public dataService: DataProvider
    ) {
  }

  ionViewDidLoad() {  
    this.id = this.navParams.get('item').id;
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.complete = this.navParams.get('item').complete;

    this.item = {
      id: this.navParams.get('item').id,
      title: this.navParams.get('item').title,
      description: this.navParams.get('item').description,
      complete: this.navParams.get('item').complete
    }  
  }

  editItem(item) { 
    this.navCtrl.push(EditItemPage, {
      item: item
    });    
  }

  deleteItem(item) {  
    this.dataService.deleteItemById(item.id);
    // go to Previous screen   
    this.navCtrl.pop();
  }

  confirmDeleteItem(item) {
    const confirm = this.alertCtrl.create({
      title: 'Delete todo Task?',
      message: 'Do you confirm to delete this task?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('cancel delete task id: ' + item + ' clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {
            this.deleteItem(item);            
          }
        }
      ]
    });
    confirm.present();
  }

}
