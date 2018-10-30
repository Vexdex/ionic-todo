import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


// import { EditItemPage } from '../edit-item/edit-item';

/**
 * Generated class for the DetailsItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details-item',
  templateUrl: 'details-item.html',
})
export class DetailsItemPage {

  public myTitle = 'Details Item';
  public item: any;
  
  public id;
  public title;
  public description;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public dataService: DataProvider
    ) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('item').id;
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;

    this.item = {
      id: this.navParams.get('item').id,
      title: this.navParams.get('item').title,
      description: this.navParams.get('item').description
    }
  }

  editItem(item) {
    console.log("edit item", item);
  /*  this.navCtrl.push(EditItemPage, {
      item: item
    });    */

  }

  deleteItem(id: number) {
    console.log("delete item id: ", id);
    this.dataService.deleteItemById(id);
  }

}
