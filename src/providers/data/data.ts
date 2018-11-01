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


  getTodos(): any {
    return this.storage.get('todos');      
  }
 
  // save all data in storage
  saveTodos(data): void {
    this.storage.set('todos', data);    
  }

  // save all data in storage
  addCategory(data) {
    return this.storage.get('todos').then(items => {
      let todos = [];
      if(items) {
        // get max id of categories
        todos = items;        
        todos.push({
          id: todos.reduce((max, c) => c.id > max ? c.id : max, todos[0].id) + 1,
          title: data.title,
          tasks: []
        });
      } else {
        // cats does not exists
        todos.push({
          id: 0,
          title: data.title,
          tasks: []
        });
      };
      this.storage.set('todos', todos);             
      return todos;
    });   
  };

  deleteCatById(id: number): void {
    this.storage.get('todos')
      .then((data) => {        
        let rest = data.filter(cat => cat.id !== id);
        this.saveTodos(rest); 
      },
      (error) => {
        console.log(error);
      });    
  }

  // save task in category in storage
  addTaskToCat(task, id) {
    return this.storage.get('todos').then(items => {      
      // let todos = [];
      items.forEach((cat) => {
        if(cat.id == id) {
          if(cat.tasks.length == 0) {
            cat.tasks.push({
              id: 0,
              title: task.title,
              description: task.description
            });
          } else {
            // get max id tasks
            cat.tasks.push({
              id: cat.tasks.reduce((max, c) => c.id > max ? c.id : max, cat.tasks[0].id) + 1,
              title: task.title,
              description: task.description
            });
          }
        }
      });
      this.storage.set('todos', items);             
      return items;
    });   
  };
}
