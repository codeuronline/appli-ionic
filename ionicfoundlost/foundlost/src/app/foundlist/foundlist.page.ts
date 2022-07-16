import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foundlist',
  templateUrl: './foundlist.page.html',
  styleUrls: ['./foundlist.page.scss'],
})
export class FoundlistPage implements OnInit {
  id_object = null;
// Créer deux propriétés
  // URL du serveur backend
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=found";
  // Un tableau
  entryData = [];
  constructor(public http: HttpClient) {
    this.getEntry();
  }

  ngOnInit() {
  }
  getEntry() {
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log(data)
      data = JSON.parse(JSON.stringify(data));   
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

 
}
