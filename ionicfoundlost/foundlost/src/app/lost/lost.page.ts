import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup,FormBuilder ,Validators } from '@angular/forms';
@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  ionicForm: FormGroup;
  defaultDate: "2022-07-11";
  constructor(public apiService:UserService,public formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('date').setValue(date, { onlyself: true});
  }
  submitForm() {
    let data = {
      description: this.ionicForm.get("description") ,
      status: 0,
      date: this.ionicForm.get("date"),
      firstname: this.ionicForm.get("firstname"),
      lastname: this.ionicForm.get("lastname"),
      email: this.ionicForm.get(""),

    }
    console.log(this.ionicForm.value);
    // this.apiService.submitForm(data).subscribe((res) => {
    //   console.log("SUCCES ===", res);
    // }
    // )
  }
}
