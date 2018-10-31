import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { TaskPage } from '../task/task';
import { CategoryPage } from '../category/category';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})

export class TabPage {
  public task: any;
  public category: any;
  
  public items = [];  
  public amountTasks: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events,
              public dataService: DataProvider ) {    

    this.task = TaskPage;  
    this.category = CategoryPage;   

    // primary load data            
    this.dataService.getData().then((data) => {
      if(data){
        this.items = data;
      }  
      this.amountTasks = this.items.length;
    });       

    events.subscribe('task:added', (itemsLength, time) => {      
      console.log('addedd task, length items is ', itemsLength, 'at', time);
      this.amountTasks = itemsLength;
    });

    events.subscribe('task:deleted', (id, time) => {      
      console.log('deleted task, length items is ', this.amountTasks - 1, 'at', time);
      --this.amountTasks;
    });
    
  }

  ionViewDidLoad() { }

}
