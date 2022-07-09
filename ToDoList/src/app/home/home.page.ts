import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;
  myTask: '';
  addTask: boolean;

  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false,
    });
    this.showForm();
  }
  
  constructor(public afDB: AngularFireDatabase) {
    const timeformat: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
    
    };

    this.currentDate = new Date().toLocaleTimeString('fr-FR', timeformat);
  }

}
