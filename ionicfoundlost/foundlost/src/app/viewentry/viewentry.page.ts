import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup,FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  entityData = {
    id_object: 10,
    description: "petite canne a peche",
    status: 0,
    date:"2022-07-13",
    firstname: "edgard",
    lastname: "Peau",
    email: "edgard.peau@free.fr"
    
  };
  constructor(public http:HttpClient) { }

  ngOnInit() {
  }

}
