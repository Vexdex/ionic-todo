import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})

export class EditItemPage {

  public myTitle = 'Edit Item';

  title: string;
  description: string; 

  item: any; 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public view:ViewController,
              public dataService: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad load');

    this.title =  this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;

    this.item = {
      title: this.navParams.get('item').title,
      description: this.navParams.get('item').description
    }

    console.log('ionViewDidLoad item', this.item);
  }

  saveItem() {
/*    let editedItem = {
      title: this.title,
      description: this.description
    }
    this.dataService.update(editedItem);
  */
   
  }

}
