import { UserService } from './../api/user.service';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foundlist',
  templateUrl: './foundlist.page.html',
  styleUrls: ['./foundlist.page.scss'],
})
export class FoundlistPage implements OnInit {
  id_object = null;
  user: string;
  roleMessage = "";
  handlerMessagelost = "";
  routerHref = "home";


// Créer deux propriétés
  // URL du serveur backend
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=found";
  imgUrl="http://localhost/ionicserver/upload/"
  // Un tableau
  entryData = [];
  constructor(public http: HttpClient,public navCtrl:NavController,private userService: UserService, private alertController:AlertController) {
   
  }
  async presentAlert(etat) {
   
    const alertDelete = await this.alertController.create({
      header: 'Confirmer la Suppression',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => { this.handlerMessagelost = 'Suppression Annulée'; }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { this.handlerMessagelost = 'Suppression Confirmée'; }
        }
      ]
    });
    await alertDelete.present();
    var { role } = await alertDelete.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  //doRefresh($event) {
    delete(id) {
      this.userService.deleteObjet(id).subscribe(
        (res) => {
          console.log("SUCCES ===>", res)
        }
      )
      this.presentAlert("delete");
      this.ngOnInit();
      this.navCtrl.navigateBack(this.routerHref);
      //manque l'affichage du succes
    }  
  //}

  ngOnInit() {
    this.user=sessionStorage.getItem("user");
    if (this.user == null || this.user == "") {
      this.navCtrl.navigateBack("authentificate")
    }
    this.getEntry();
  }
  getEntry() {
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log(data)
      data = JSON.parse(JSON.stringify(data));   
      for (let i = 0; i < Object.keys(data).length; i++) {
        data[i].filename = (data[i].filename == undefined) ? "object_vide.png" : data[i].filename;
        this.entryData[i] = {
          "id_object": data[i].id_object,
          "status": data[i].status,
          "description": data[i].description,
          "date": data[i].date,
          "location": data[i].location,
          "firstname": data[i].firstname,
          "lastname": data[i].lastname,
          "email": data[i].email,
          "checkedpicture": data[i].checkedpicture,
          "filename": data[i].picture,
          "filenameWithUrl":this.imgUrl+data[i].filename,
        };
      } // fin boucle for
    }); // fin subscribe 
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

 
}
