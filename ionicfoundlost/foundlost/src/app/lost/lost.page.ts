import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
  isSubmitted = false;
  handlerMessagelost = '';
  roleMessage = '';
  ionicForm: FormGroup;
  defaultValue: 0;
  defaultDate: "2022-07-11";
  user: string;
  user_id: string;

  constructor(public navCtrl: NavController, private alertController: AlertController, public apiService: UserService, public formBuilder: FormBuilder,private toastController: ToastController) { }
  
  async message(aValue) {
    let info = [
      { "description": "confirm", "message": "Création confirmé", "color": "success" },
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
      status: [0],
      location: [null, [Validators.required, Validators.maxLength(25)]],
      date: [null, [Validators.required]],
      firstname: [null, [Validators.required, Validators.maxLength(25)]],
      lastname: [null, [Validators.required, Validators.maxLength(25)]],
      email: [this.user, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      checkedpicture: [false],
      filename: [''],
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
    if (!this.ionicForm.valid) {
      console.log('Veuillez renseigner tous les champs!')
      return false;
    } else {
      if (this.ionicForm.valid) {
        this.message("treat");
        let formObj = this.ionicForm.getRawValue();
        console.log(formObj);
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
}
