import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NavController } from '@ionic/angular';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  ionicForm: FormGroup;
  defaultValue: 0;
  defaultDate: "2022-07-11";
  constructor(public apiService: UserService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      description: '',
      status: 0,
      location: '',
      date: '',
      firstname: '',
      lastname: '',
      email: '',
    });
  
  }
  
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('date').setValue(date, { onlyself: true });
  }
  
  submitForm() {
    //
    let formObj = this.ionicForm.getRawValue(); // {name: '', description: ''}
    let serializedForm = JSON.stringify(formObj);    
    console.log(serializedForm);
    this.apiService.submitForm(serializedForm).
      subscribe(
        (res) => {console.log("SUCCES ===", res);
       
        })
  
  }
}
    
