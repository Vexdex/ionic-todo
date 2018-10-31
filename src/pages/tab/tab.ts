import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  }

  ionViewDidLoad() { }

}
