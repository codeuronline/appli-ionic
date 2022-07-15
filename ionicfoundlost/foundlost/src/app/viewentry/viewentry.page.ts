import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  id = this.activatedRouter.snapshot.paramMap.get('id');
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=";
  id_object;
  
  ionicForm: FormGroup;  
  entryData = {status:null,
    description:null,
    location: null,
    date:null,
    firstname:null,
    lastname:null,
    email:null};
  constructor(public userService: UserService, public http:HttpClient , public activatedRouter: ActivatedRoute,public formBuilder: FormBuilder) {}
  
  ngOnInit() {
    console.log(this.id);
    this.getEntry();
    this.ionicForm = this.formBuilder.group({
      id_object: this.id,
      status: this.entryData.status,
      description: this.entryData[0].description,    
      location: this.entryData[0].location,
      date: this.entryData[0].date,
      firstname: this.entryData[0].firstname,
      lastname: this.entryData[0].lastname,
      email: this.entryData[0].email,
    });
    // this.id_object = this.id;
    // this.status = this.entryData.status;
    // this.description = this.entryData.description;
    // this.location = this.entryData.location;
    // this.date = this.entryData.date;
    // this.firstname = this.entryData.firstname;
    // this.lastname = this.entryData.lastname;
    //   this.email = this.entryData.email;
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
  }
  
  getEntry() {
    
    this.readAPI(this.bdUrl + this.id).subscribe(data => {
      console.log('data :', data);
      data = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (data[i].id_object == this.id) {
          this.entryData = data[i];
        }
      };
      console.log("entrydata:", this.entryData);
      
      // console.log('entrydata[0]:', this.entryData[0]);
    }); 
      // fin boucle for
    }
  

  

  readAPI(URL: string) {
    return this.http.get(URL);
  }
  submit() {
    let formObj = this.ionicForm.getRawValue();
    console.log(formObj);// {name: '', description: ''}
    let serializedForm = JSON.stringify(formObj);    
    console.log(serializedForm);
    this.userService.updateForm(serializedForm,this.id).
      subscribe(
        (res) => {console.log("SUCCES ===", res);
       
      })
}
}

