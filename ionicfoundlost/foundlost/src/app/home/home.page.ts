import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = sessionStorage.getItem("user");
  user_id = sessionStorage.getItem("user_id");
  
  constructor(public navCtrl: NavController) {
    this.ngInit();
  }
 
ngInit() {
  this.user = sessionStorage.getItem("user");
  this.user_id =sessionStorage.getItem("user_id");
  // this.user_id = sessionStorage.getItem("user_id");
  console.log(this.user);
  if (this.user == null) {
    this.navCtrl.navigateBack("authentificate")
  }   
 }
destroyUser() {
    this.user = "";
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');
    this.navCtrl.navigateBack("authentificate");
  }

  goTo(element){
    this.navCtrl.navigateForward(element);
  }
}
