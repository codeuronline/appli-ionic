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
  id = this.activatedRouter.snapshot.paramMap.get('id');

  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=id&id=";
  oneData = [];
  entryData = [];    
  constructor(private NavController: NavController,private NavParams: NavParams,private activatedRouter: ActivatedRoute, public http: HttpClient, r,) {
    console.log(this.id);
    this.getEntry();
  }
  ngOnInit() {
  }
  getEntry() {
    // this.oneData =
    //   (this.lostlist.entryData.map(item => item[0].filter(item => item === this.id_object))) ?
    //     this.lostlist.entryData.map(item => item[0].filter(item => item === this.id_object)) :
    //     this.foundlist.entryData.map(item => item[0].filter(item => item === this.id_object));
    // console.log(this.oneData)
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log('data');
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
}

