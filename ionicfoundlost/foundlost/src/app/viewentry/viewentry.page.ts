import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute}from '@angular/router'




@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  id_object= null;
  bdUrl="http://localhost/ionicserver/retrieve-data.php?key=id&id=";
  entrydata = {
    "id_object": null,
    "status": null,
    "description": null,
    "date": null,
    "location": null,
    "firstname": null,
    "lastname": null,
    "email": null

  };
    
  constructor(private activatedRouter: ActivatedRoute,public http:HttpClient) {
    let id_object = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(id_object);
    this.id_object = id_object;
    this.getEntry();
}  
  ngOnInit() {
  }
  getEntry() {
    this.readAPI(this.bdUrl+this.id_object).subscribe((data) => {
      data = JSON.parse(JSON.stringify(data));   
      console.log(data);    
    }); // fin subscribe 
}
  readAPI(URL: string) {
    return this.http.get(URL);
  }
}
