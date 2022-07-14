import { ViewentryPage } from './../viewentry/viewentry.page';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {
  id_object = null;
  // Créer deux propriétés
  // URL du serveur backend
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=lost";
  // Un tableau
  entryData = [];
  dataToTransfer = {
  id_object: Number,
  description: String,
  status: Boolean,
  date: Date,
  firstname: String,
  lastName: String,
  email: String,
  }

  constructor(public http: HttpClient, private activatedRouter: ActivatedRoute ,public navCtrl: NavController,public NavParams) {
    this.getEntry();
  }

  ngOnInit() {
  }
  getEntry() {
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log(data);
      data = JSON.parse(JSON.stringify(data))
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.entryData[i] = {
          "id_object": data[i].id_object,
          "status": data[i].status,
          "description": data[i].description,
          "date": data[i].date,
          "location": data[i].location,
          "firstname": data[i].firstname,
          "lastname": data[i].lastname,
          "email": data[i].email
        };
      } // fin boucle for
    }); // fin subscribe 
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

  goViewentry(value) {
    console.log(value);
    let data= this.entryData.filter(function(obj) {
      return obj.id_object = data.id_object ;
    });
    this.navCtrl.push(ViewentryPage, data);
    console.log(this.dataToTransfer);
    console.log(this.activatedRouter.snapshot.paramMap.get('id'));
    
    this.navCtrl.navigateForward("viewentry/" + this.dataToTransfer);
    //this.navCtrl.push(ViewentryPage);
  }
}