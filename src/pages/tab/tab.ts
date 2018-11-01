import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { GoogleMapComponent } from '../../components/google-maps/google-maps';

import { TaskPage } from '../task/task';
import { CategoryPage } from '../category/category';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})

export class TabPage {

  @ViewChild(GoogleMapComponent) mapComponent: GoogleMapComponent;

  public task: any;
  public category: any;
  
  public items = [];  
  public amountTasks: number;
  public amountCats: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public dataService: DataProvider ) {    

    this.task = TaskPage;  
    this.category = CategoryPage;   

    // primary load data            
    this.dataService.getTodos().then((data) => {
      if(data){
        this.items = data;
        this.amountCats = this.items.length;
      }  else {
        this.showAlert('warning', 'List of Todo task and categories is empty. Please, create first category, and add to it tasks...');
      }
      
    });       

    events.subscribe('cat:added', (catsLength, time) => {      
      console.log('addedd task, length items is ', catsLength, 'at', time);
      this.amountCats = catsLength;
    });

    events.subscribe('task:added', (tasksLength, time) => {      
      console.log('addedd task, length items is ', tasksLength, 'at', time);
      this.amountTasks = tasksLength;
    });

    events.subscribe('task:deleted', (id, time) => {      
      console.log('deleted task, length items is ', this.amountTasks - 1, 'at', time);
      --this.amountTasks;
    });
    
    events.subscribe('cat:deleted', (id, time) => {      
      console.log('deleted cat, length items is ', this.amountCats - 1, 'at', time);
      --this.amountCats;
    });

  }

  ionViewDidLoad() { }
  
  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  testMarker(){
 
    let center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());

}

}
