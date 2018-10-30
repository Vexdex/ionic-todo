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

  update(id: number, item: any){
    // this.storage.set('todo', data);
  }

  deleteItemById(id: number): void {
    this.storage.get('todo')
      .then((data) => {        
        let rest = data.filter(item => item.id !== id);
        this.save(rest);        
      },
      (error) => {
        console.log(error);
      });    
  }

  deleteAll(): void {
    this.storage.set('todo', '');
  }

}
