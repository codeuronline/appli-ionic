import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { ReactiveFormsModule ,FormGroup, FormBuilder } from '@angular/forms';
import {ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  
  id = this.activatedRouter.snapshot.paramMap.get('id');
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=";
  ionicForm: FormGroup;
  entryData = {
    id_object: null,
    status: null,
    description: null,
    location: null,
    date: null,
    firstname: null,
    lastname: null,
    email: null,
  };
  etat = new String;
  myValue = new Boolean;
  constructor(public userService: UserService, public http: HttpClient, public activatedRouter: ActivatedRoute, public formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.id);
    this.getEntry();
    this.ionicForm = this.formBuilder.group({
      id_object: this.id,
      status: this.entryData.status,
      description: this.entryData.description,
      location: this.entryData.location,
      date: this.entryData.date,
      firstname: this.entryData.firstname,
      lastname: this.entryData.lastname,
      email: this.entryData.email,
    });
    this.myValue = true;
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('date').setValue(date, { onlyself: true });
  }

  getEntry() {
    this.readAPI(this.bdUrl + this.id).subscribe(data => {
      console.log('data :', data);
      data = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (this.id == data[i].id_object) {
          this.entryData = data[i];
        }
      };
      console.log("entrydata:", this.entryData);
      this.etatStatus();
  
      // console.log('entrydata[0]:', this.entryData[0]);
    }); 
      // fin boucle for
  }
  myChange($event) {
    console.log(this.myValue);
    this.myValue = !this.myValue;
    if (this.myValue==true) {
      this.etat = "Found";
    }
    if (this.myValue==false) {
      this.etat = "Lost";
    }
    
    
}
  etatStatus() {
    if (this.entryData.status==1) {
      this.etat = "Found";
    } else {
      this.etat = "Lost";
    }
  
  }
  


  readAPI(URL: string) {
    return this.http.get(URL);
  }
  submit() {
    let formObj = this.ionicForm.getRawValue();
    if (formObj.id_object == null) { formObj.id_object = this.entryData.id_object; }
    if (formObj.description == null) { formObj.description = this.entryData.description; }
    if (formObj.status == null) { formObj.status = this.entryData.status; }
    if (formObj.location == null) { formObj.location = this.entryData.location }
    if (formObj.date == null) { formObj.date = this.entryData.date; }
    if (formObj.firstname == null) { formObj.firstname = this.entryData.firstname; }
    if (formObj.lastname == null) { formObj.lastname = this.entryData.lastname; }
    if (formObj.email == null) { formObj.email = this.entryData.email; }
    console.log(formObj);// {name: '', description: ''}
    let serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    this.userService.updateForm(serializedForm, this.id).
      subscribe(
        (res) => {
          console.log("SUCCES ===", res);

        })
  }
  delete() {
    this.userService.deleteObjet(this.id).subscribe(
      (res) => {
        console.log("SUCCS ===", res)
      }
    ) 
       //manque l'affichage du succes
  }
}

