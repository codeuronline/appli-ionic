import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController,NavController } from "@ionic/angular";

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  isSubmitted = false;
 
  roleMessage = '';
  ionicForm: FormGroup;
  defaultValue: 1;//status
  //defaultDate: "2022-07-11"; 
  user: String;
  user_id: String;

  constructor(public navCtrl: NavController, public apiService: UserService, public formBuilder: FormBuilder,private toastController: ToastController) {}
  
  async message(aValue) {
    let info = [
      { "description": "confirm", "message": "Modification Confirmée", "color": "success" },
      { "description": "treat", "message": "Traitement en cours", "color": "warning" }
    ]
    
    for (let index = 0; index < info.length; index++) {
      if (aValue == info[index].description) {
        let toast = await this.toastController.create({
          header:"",
          message: info[index].message,
          color: info[index].color,
          cssClass: 'toast-custom-class',
          duration: 5000,
          position: 'bottom',
          buttons: [{
            role: "cancel",
            icon: 'close'
          }]
        });
        toast.present();;
      }
    }
  }
  ngOnInit() {
    this.user = sessionStorage.getItem("user");
    this.user_id = sessionStorage.getItem("user_id");
    if (this.user == null || this.user == "") {
      this.navCtrl.navigateBack("authentificate")
    }
    this.ionicForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      status: [1],
      location: [null, [Validators.required, Validators.maxLength(25)]],
      date: [null, [Validators.required]],
      firstname: [null, [Validators.required, Validators.maxLength(25)]],
      lastname: [null, [Validators.required, Validators.maxLength(25)]],
      email: [this.user, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      checkedpicture: [false],
      filename: [''],
      user_id:this.user_id,
    });

  }
  
  get errorControl() {
    return this.ionicForm.controls;
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('date').setValue(date, { onlyself: true });
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.controls) {
      console.log("Veuillez renseigner tous les champs");
      return false;
    } else {
      if (this.ionicForm.valid) {
        let formObj = this.ionicForm.getRawValue()
        console.log(formObj); // {name: '', description: ''}
        let serializedForm = JSON.stringify(formObj);
        console.log(serializedForm);
        this.apiService.submitForm(serializedForm).
          subscribe(
            (res) => {
              console.log("SUCCES ===", res);
            })
        this.message("confirm");
        this.ionicForm.reset();
        this.ngOnInit();
        this.isSubmitted = false;
      }
    }
  }
  destroyUser() {
    this.user = "";
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');
    this.navCtrl.navigateBack("authentificate");
  }
}