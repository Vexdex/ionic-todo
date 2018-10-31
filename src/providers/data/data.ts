import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {
  
  constructor(public storage: Storage) { }

  // actions on the all items
  // get whole data from storage
  getData(): any {
    return this.storage.get('todo');      
  }
 
  // save all data in storage
  save(data): void {
    this.storage.set('todo', data);    
  }

  // delete all data from storage
  deleteAll(): void {
    this.storage.set('todo', '');
  }

  // actions with the lonely item
  updateItemById(id: number, item: any){    
    this.getData().then(
      data => {
        let rest = data.filter(item => item.id !== id);
        rest.push(item);
        this.save(rest); 
      },
      error => 
        console.log("error in during update ", error)      
    );
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

  
}
