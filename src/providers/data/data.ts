import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {
  
  constructor(public storage: Storage) {
    console.log('Hello DataProvider Provider');  
  }

  getData() {
    return this.storage.get('todo'); 
  }
 
  save(data){
    this.storage.set('todo', data);
  }

}
