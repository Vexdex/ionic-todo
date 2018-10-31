import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})

export class AddItemPage {
  public myTitle = 'Add';
  
  title: string;
  description: string;  
  complete: boolean = false;  
 
  constructor(public view: ViewController) {
  }

  ionViewDidLoad() {}

  saveItem() {
    let item = {
      title: this.title,
      description: this.description,
      complete: this.complete
    }
    this.view.dismiss(item);
  }

  close() {
    this.view.dismiss();
  }
  
}
