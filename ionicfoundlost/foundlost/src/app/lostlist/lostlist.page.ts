import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {
  // Créer deux propriétés
  // URL du serveur backend
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=lost";
  imgUrl = "http://localhost/ionicserver/upload/";
  searchStatus = new Boolean;
  entryData = [];
  user = sessionStorage.getItem("user");

  constructor(public http: HttpClient, private navCtrl: NavController) {
    this.ngOnInit;
  }

  change($event1)
  {
    console.log("hello");
    console.log(this.searchStatus);
    this.searchStatus = !this.searchStatus;
    console.log(this.searchStatus);
    const element = document.getElementById("searchOptions");
     (this.searchStatus == true) ? element.style.display = "visible": element.style.display = "hidden";
    
  }  
  ngOnInit() {
    console.log("searchStatus",this.searchStatus);
    this.user=sessionStorage.getItem("user");
    if (this.user == null || this.user == "") {
      this.navCtrl.navigateBack("authentificate")
    }
    this.getEntry();
    this.searchStatus = false;
    
  }

  getEntry() {
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log(data);
      data = JSON.parse(JSON.stringify(data))
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
      }
  //    console.log(this.entryData);
       // fin boucle for
    }); // fin subscribe 
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}