import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage {

  public cats = [];  
  public amountCats: number;
  public myTitle = 'catagories';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public events: Events,
              public dataService: DataProvider) {
    this.dataService.getData().then((data) => {
      if(data){
        // data exists
        this.cats = data;
      }  
      this.amountCats = this.cats.length;
    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}

/*
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { DetailsItemPage } from '../details-item/details-item';

import { DataProvider } from '../../providers/data/data';

*/