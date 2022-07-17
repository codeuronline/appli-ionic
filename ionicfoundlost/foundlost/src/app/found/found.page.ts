import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  AlertController } from "@ionic/angular";

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  ionicForm: FormGroup;
  defaultValue: 1;
  defaultDate: "2022-07-11";
  handlerMessagelost= '';
  roleMessage='';

  constructor(private alertController: AlertController,public apiService: UserService, public formBuilder: FormBuilder) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Déclaration d'objet trouvé",
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
    this.ionicForm = this.formBuilder.group({
      description: '',
      status: 1,
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
    this.presentAlert();
    this.ionicForm.reset();
  }
}
