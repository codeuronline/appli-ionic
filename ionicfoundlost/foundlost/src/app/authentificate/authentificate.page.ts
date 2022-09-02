
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentificate',
  templateUrl: './authentificate.page.html',
  styleUrls: ['./authentificate.page.scss'],
})
export class AuthentificatePage implements OnInit {

  handlerMessagelost = '';
  roleMessage = '';
  email_user: string;
  user: string;
  password: string;
  passwordVerify: string;
  captcha: BigInteger;
  ionicForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  showRecover = false;
  passwordToggleIcon = 'eye';
  
  constructor(
    public apiService: UserService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public activatedRouter: ActivatedRoute,
    public navCtrl: NavController) { this.ngOnInit(); }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordToggleIcon = (this.showPassword) ? "eye-off-outline" : 'eye';
  }

  toggleRecover(): void {
    this.showRecover = !this.showRecover;
  }
  ngOnInit() {
    if (this.showRecover == false) {
      this.ionicForm = this.formBuilder.group({
        email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.pattern(/[A-Z]+.*[0-9]+.*[^\w]+|[A-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[A-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[A-Z]+|[^\w]+.*[A-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[A-Z]+/), Validators.minLength(8)]],
        
      })
    } else {
      //marche pas
      this.ionicForm = this.formBuilder.group({
        email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.pattern(/[A-Z]+.*[0-9]+.*[^\w]+|[A-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[A-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[A-Z]+|[^\w]+.*[A-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[A-Z]+/), Validators.minLength(8)]],
        passwordVerify: ['', [Validators.required, Validators.pattern(/[A-Z]+.*[0-9]+.*[^\w]+|[A-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[A-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[A-Z]+|[^\w]+.*[A-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[A-Z]+/), Validators.minLength(8)]],
        captcha: ['', [Validators.required, Validators.pattern(/[0-9]{1,2,3,4,5}/)]],
      })
    }
  }
  get errorControl() {
       return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    //tester si showrecover est coché
    console.log(this.ionicForm);
    if (!this.ionicForm.valid) {
      console.log('Remplissez les champs requis')
      this.message('no_conform');
      return false;
    } else {
      console.log(this.ionicForm.value)
      if (this.showRecover == true) {
        this.apiService.recoverUser(this.ionicForm.value).subscribe((res) => {
          console.log(typeof (JSON.parse(JSON.stringify(res))));
          console.log("SUCCES ===", res);
          if (JSON.parse(res) == false) {
            console.log("error_mail");
            this.message("error_mail");
          } else {
            this.email_user = this.ionicForm.get('email_user').value;
            console.log("ValidateRegister");
            this.message("ValidateRegister");
            this.navCtrl.navigateForward("home");
          }
        })
      } else {
        this.apiService.createUser(this.ionicForm.value).subscribe((res) => {
          console.log(typeof (JSON.parse(JSON.stringify(res))));
          console.log("SUCCES ===", res);
          if (JSON.parse(res) == false) {
            console.log("error_mail");
            this.message("error_mail");
          } else {
            this.email_user = this.ionicForm.get('email_user').value;
            console.log("ValidateRegister");
            this.message("validateRegister");
            this.navCtrl.navigateForward("home");
          }
        })
      }

      this.isSubmitted = false;
    }
    this.ionicForm.reset();
  }
  async message(aValue) {
    let info = [
      { "description": "validateRegister", "message": "Inscription effectuée avec succès", "color": "success" },
      { "description": "valid_control", "message": "Identification réussie", "color": "success" },
      { "description": "error_mail", "message": "Adresse mail déjà existante", "color": "warning" },
      { "description": "failure", "message": "Erreur de mot de pass/login", "color": "warning" },
      { "description": "no_conform", "message": "Identification non conforme", "color": "warning" },
      { "description": "recover_error_captcha", "Message": "Erreur: Erreur de Captcha ", "color": "warning" },
      { "description": "recover_error_mdp", "Message": "Erreur: Mot de passe non similaire", "color": "warning" },
      { "description": "recover_error_email", "Message": "Erreur: Email non défini", "color": "warning" },
    ]

    for (let index = 0; index < info.length; index++) {
      if (aValue == info[index].description) {
        let toast = await this.toastController.create({
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
  controlPassword(ev) {
    if (this.password === ev.target.value) return true;
  }

  control() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.message('no_conform');
      console.log('Remplissez les champs requis')
      return false;
    } else {
      //ionicform ->valid
      this.email_user = this.ionicForm.get('email_user').value;
      if (this.showRecover == true) {
        this.captcha = this.ionicForm.get('captcha').value;
        this.passwordVerify = this.ionicForm.get('passwordVerify').value;
        
      }
      //console.log(this.ionicForm.value)
      this.apiService.connexion(this.ionicForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
        console.log("controle")
        if (JSON.parse(res) == true) {
          //generer un id de session
          console.log("valid_control");
          this.message("valid_control");
          sessionStorage.setItem("user", this.email_user);
          this.navCtrl.navigateForward("home");
        } else {
          console.log("failure");
          this.message("failure");
          // this.router.navigateByUrl("/inscription");
        }
      })
      this.isSubmitted = false;
    }
    this.ionicForm.reset();
  }
}
