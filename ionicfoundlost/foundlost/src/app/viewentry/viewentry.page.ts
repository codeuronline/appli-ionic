import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';




@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  id_object = this.activatedRouter.snapshot.paramMap.get('id');
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=";
  
  
  entryData = [];    
  
  constructor(public Userservice: UserService, private NavController: NavController, private activatedRouter: ActivatedRoute, public http: HttpClient) {
    console.log(this.id_object);
    this.getEntry();
  }
  ngOnInit() {
  this.getEntry()   
  }
  getEntry() {

    this.readAPI(this.bdUrl+this.id_object).subscribe(data => {
      data = JSON.parse(JSON.stringify(data));
      console.log(data);
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
  
  delete() {
    const bdDelete = 'http://localhost/ionicserver/manage-data.php?key=delete=id_task';
    this.readAPI(bdDelete + this.id_object);
  }
}

