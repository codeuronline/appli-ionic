import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = sessionStorage.getItem("user");        // user reçoit la variable de session
  user_id = sessionStorage.getItem("user_id");  // user_id reçoit la variable de session
  // constructeur du composant en injectant la dépendance NavController
  constructor(public navCtrl: NavController) {
    this.ngInit();
  }
  // initialise la page du composant
  ngInit() {
    console.log(this.user);
    // si la variable est null on redirige vers la page authentificate
    if (this.user == null) {
      this.navCtrl.navigateBack("authentificate")
    }
  }
  // détruit les variables de session 
  destroyUser() {
    this.user = "";// efface la variable user
    sessionStorage.removeItem('user'); //supprime la variable user de sessionstorage
    sessionStorage.removeItem('user_id');//supprime la variable user_id de sessionstorage
    this.navCtrl.navigateBack("authentificate");// redirection vers l'arrière
  }
  // redirige vers l'élement indiqué
  goTo(element) {
    this.navCtrl.navigateForward(element);//redirection vers l'avant
  }
}
