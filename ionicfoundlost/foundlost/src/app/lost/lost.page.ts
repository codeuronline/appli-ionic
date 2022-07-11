import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup,FormBuilder ,Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  ionicForm: FormGroup;
  // ionicForm = new FormGroup({
  //   description: new FormControl(),
  //   date: new FormControl(),
  //   location: new FormControl(),
  //   firstnam: new FormControl(),
  //   lastname: new FormControl(),
  //   email: new FormControl()
  // });
  
  data: { "description": "", "location": "", "date": "", "firstname": "", "lastname": "", "email": "" };
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

    // this.http.post("www.domain.com/api", serializedForm)
    //     .subscribe(
    //         data => console.log("success!", data),
    //         error => console.error("couldn't post because", error)
    //     );
   
    console.log(formObj);
    console.log(serializedForm);
    this.apiService.submitForm(serializedForm).
      subscribe(
        (res) => {console.log("SUCCES ===", res);
       
      })
  }
}
    // let data = {
    //   description: this.ionicForm.get('description'),
    //   date: this.ionicForm.get(''),
    //   status: 0,
    //   location: this.ionicForm.getRawValue('location'),
    //   firstnam: this.ionicForm.get('firstname'),
    //   lastname: this.ionicForm.get('lastname'),
    //   email: this.ionicForm.get('email')
    // }
    
//     console.log(this.data);
//   this.apiService.submitForm(this.ionicForm).subscribe((res) => {

//       console.log("SUCCES ===", res);
//      }
//      )
  //   }

