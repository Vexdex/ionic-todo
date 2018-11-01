import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { DetailsCatPage } from '../details-cat/details-cat';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage {

  public cats = [];  
  public amountCats: number;
  public myTitle = 'categories';

  private category : FormGroup;
  public showForm: boolean;

  public singleCat = {
    id: 0,
    title: 'my category',
    tasks: [
      {
        id: 0,
        name: 'my task',
        description: 'descr of my task'
      }
    ]
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public events: Events,
              private formBuilder: FormBuilder,
              public dataService: DataProvider) {

    this.showForm = false;
    this.loadData();

    this.category = this.formBuilder.group({
      title: ['', Validators.required]
    });
   
    events.subscribe('cat:deleted', (id, time) => {            
      this.cats = this.cats.filter(item => item.id !== parseInt(id));      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  loadData() {
    this.dataService.getTodos().then(data => {
      if(data){
        // data exists
        this.cats = data;
        this.amountCats = this.cats.length;        
      }  else {
        // in future - add alerts
      }      
    });
  }

  addCat(){
    console.log("adding cat");
    this.showForm = true;
  }

  logForm(){
    console.log(this.category.value)
    // go to Data service
    this.dataService.addCategory(this.category.value).then( data => {
      this.cats = data;
      // reset and close form
      this.showForm = false;    
      // refresh categories list    
      this.events.publish('cat:added', this.cats.length, Date.now());
    });
    
  }

  getDetails(cat) {
    const modal = this.modalCtrl.create(DetailsCatPage, {catDetails: cat});
    modal.present();
    console.log(cat);
  }
}