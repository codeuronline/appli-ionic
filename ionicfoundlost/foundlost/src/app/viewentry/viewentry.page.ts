import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  handlerMessagelost= '';
  roleMessage = '';
  id = this.activatedRouter.snapshot.paramMap.get('id');
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=";
  ionicFormView: FormGroup;
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
  constructor(private alertController: AlertController, public userService: UserService, public http: HttpClient, public activatedRouter: ActivatedRoute, public formBuilder: FormBuilder, public navCtrl: NavController) { }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmer la Suppression',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => { this.handlerMessagelost = 'Suppression Annulée'; }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { this.handlerMessagelost = 'Suppression Confirmée'; }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  ngOnInit() {
    console.log(this.id);
    this.getEntry();
    this.ionicFormView = this.formBuilder.group({
      id_object: this.id,
      status: this.entryData.status,
      description: null,
      location: null,
      date: null,
      firstname: null,
      lastname: null,
      email: null,
    });
    this.myValue = (this.entryData.status==1)?true:false;
    this.etat = (this.myValue) ? "Trouvé" : "Perdu";
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicFormView.get('date').setValue(date, { onlyself: true });
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
    this.myValue = !this.myValue;
    if (this.myValue == true) {
      this.etat = "Trouvé";
    }
    if (this.myValue == false) {
      this.etat = "Perdu";
    }
    
    
  }
  etatStatus() {
    if (this.entryData.status==1) {
      this.etat = "Trouvé";
    } else {
      this.etat = "Perdu";
    }
  
  }
  
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  
  submit() {
    // formObj recoit l'etat des valeurs du formulaire
    let formObj = this.ionicFormView.value;
    // charge les valeurs qui n'ont pas ete modifié
    formObj.id_object = this.entryData.id_object;
    formObj.description = (this.ionicFormView.get('description').value != null) ? this.ionicFormView.get('description').value : this.entryData.description;
    formObj.status = (this.myValue == true) ? 1 : 0;
    formObj.date = (this.ionicFormView.get('date').value != null) ? this.ionicFormView.get('date').value : this.entryData.date;
    formObj.location = (this.ionicFormView.get('location').value != null) ? this.ionicFormView.get('location').value : this.entryData.location;
    formObj.firstname = (this.ionicFormView.get('firstname').value != null) ? this.ionicFormView.get('firstname').value : this.entryData.firstname;
    formObj.lastname = (this.ionicFormView.get('lastname').value != null) ? this.ionicFormView.get('lastname').value : this.entryData.lastname;
    formObj.email = (this.ionicFormView.get('email').value != null) ? this.ionicFormView.get('email').value : this.entryData.email;
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
        console.log("SUCCES ===", res)
      }
    )
    this.presentAlert();
    //manque l'affichage du succes
    if (this.entryData.status == 1) {
      this.navCtrl.navigateBack("foundlist");
    } else{
  
      this.navCtrl.navigateBack("lostlist");
    
    }
  }
}
