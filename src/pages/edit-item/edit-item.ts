import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})

export class EditItemPage {

  public myTitle = 'Edit';

  id: number;
  title: string;
  description: string; 
  complete: boolean; 

  item: any; 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,              
              public dataService: DataProvider) {
  }

  ionViewDidLoad() {  
    this.id =  this.navParams.get('item').id;
    this.title =  this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;  
    this.complete = this.navParams.get('item').complete;  
  }

  saveItem() {    
    this.dataService.updateItemById(this.id, {
      id: this.id,
      title: this.title,
      description: this.description,
      complete: this.complete
    });
    
    // go to Previous screen   
    this.navCtrl.pop();
  }

  close() {
    // go to Previous screen   
    this.navCtrl.pop();
  }

}
