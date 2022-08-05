import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { AlertController, NavController } from '@ionic/angular';
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
  user :string;
  constructor(public navCtrl: NavController, private alertController: AlertController, public apiService: UserService, public formBuilder: FormBuilder) {

      // go ahead and authenticate them without getting a new token.}) 
    

    }
  
  destroyUser() {
    this.user = null;
    sessionStorage.removeItem('user');
    this.navCtrl.navigateBack("autentificate");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Déclaration d'objet perdu",
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { this.handlerMessagelost = 'Déclaration confirmée'; }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  ngOnInit() {
    this.user=sessionStorage.getItem("user");
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
      email: [null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
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
    // tester sur le formulaire est valide -> a faire
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Veuillez renseigner tous les champs!')
      return false;
    } else {
      if (this.ionicForm.valid) {
        let formObj = this.ionicForm.getRawValue();
        console.log(formObj);
        let serializedForm = JSON.stringify(formObj);
        console.log(serializedForm);
        this.apiService.submitForm(serializedForm).
          subscribe(
            (res) => {
              console.log("SUCCES ===", res);
            })
        this.presentAlert();
        this.ionicForm.reset();
        this.isSubmitted = false;
      }
    }



  }
}

