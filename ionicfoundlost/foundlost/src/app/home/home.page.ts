import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user : string;
  
  constructor(public navCtrl: NavController) {
  }
ngInit() {
  this.user=sessionStorage.getItem("user");
  if (this.user == null || this.user == "") {
    this.navCtrl.navigateBack("authentificate")
  }   
 }
destroyUser() {
    this.user = "";
    sessionStorage.removeItem('user');
    this.navCtrl.navigateBack("authentificate");
  }
}
