import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-details-cat',
  templateUrl: 'details-cat.html',
})

export class DetailsCatPage {

  myTitle = 'category details';

  catDetails: any;  
  tasks: any;
  showForm: boolean;
  
  private task: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              public dataService: DataProvider) {
    this.catDetails = navParams.get('catDetails');

    this.showForm = false;    

    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsCatPage', this.catDetails);
    this.myTitle = 'category ' + this.catDetails.title + ' details';
    this.tasks = this.catDetails.tasks;
  }

  close() {
    // go to Previous screen   
    this.navCtrl.pop();
  }
  
  addTask(){    
    this.showForm = true;
  }

  saveForm(){        
    // go to Data service
    this.dataService.addTaskToCat(this.task.value, this.catDetails.id).then( data => {
      this.tasks = data;
      // reset and close form
      this.showForm = false;    
      // refresh tasks list    
      this.events.publish('task:added', this.tasks.length, Date.now());
    });
    
  }

  deleteCat(cat) {  
    this.dataService.deleteCatById(cat.id);
    this.events.publish('cat:deleted', cat.id, Date.now());
    // go to Previous screen   
    this.navCtrl.pop();
  }

  confirmDeleteCat() {
    const confirm = this.alertCtrl.create({
      title: 'Delete this category?',
      message: 'Do you confirm to delete this category and all linked tasks ' + this.catDetails.title + '?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('cancel delete this category clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {            
            this.deleteCat(this.catDetails); 
          }
        }
      ]
    });
    confirm.present();
  }

}
