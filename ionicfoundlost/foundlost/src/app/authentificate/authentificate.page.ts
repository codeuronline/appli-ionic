
import { Component, OnInit, Query } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
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
  user_id: string;
  //user: string;
  password: string;
  passwordVerify: string;
  captcha: BigInteger;
  ionicForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  showRecover = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    public apiService: UserService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public activatedRouter: ActivatedRoute,
    public navCtrl: NavController) { }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordToggleIcon = (this.showPassword) ? 'eye' : "eye-off-outline";
  }

  toggleRecover(): void {
    this.showRecover = !this.showRecover;
    this.ngOnInit();
  }
  ngOnInit() {
    //en fonction de la checkbox pour recover est activée  on oriente sur l'un des formulaires de vérification
    if (this.showRecover == false) {
      // la checkbox n'est pas activée
      this.ionicForm = this.formBuilder.group({
        email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')]],
        // controles:-> champ nécessaire & regex d'email
        password: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+.*[a-z0-9]+.*[^\w]+|[a-zA-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[a-zA-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[a-zA-Z]+|[^\w]+.*[a-zA-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[a-zA-Z]+/), Validators.minLength(8),Validators.maxLength(20)]],
        //controles :-> champ nécessaire & regex de mot de passe & longueur minimum & maxmimum du champ
      })
    } else {
      // la checkbox pour recover est activée
      this.ionicForm = this.formBuilder.group({
        email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')]],
        password: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+.*[a-z0-9]+.*[^\w]+|[a-zA-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[a-zA-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[a-zA-Z]+|[^\w]+.*[a-zA-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[a-zA-Z]+/), Validators.minLength(8),Validators.maxLength(20)]],
        passwordVerify: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+.*[a-z0-9]+.*[^\w]+|[a-zA-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[a-zA-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[a-zA-Z]+|[^\w]+.*[a-zA-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[a-zA-Z]+/), Validators.minLength(8),Validators.maxLength(20)]],
        captcha: ['', [Validators.required,Validators.pattern('[0-9]{1,5}$')]],// champ ->nécessaire & regex d'un entier entre 0 et 99999
      })
    }
  }
  // récupere les erreurs du formulaire
  get errorControl() {
    return this.ionicForm.controls;
  }
  // renvoie si 2 valeurs sont egales
  controlPassword(valeur1, valeur2) {
    return (valeur1 == valeur2) ? true : false;
  }
  submitForm() {
    this.isSubmitted = true;
    //tester si ionicForm n'est pas valide
    if (!this.ionicForm.valid) {
      console.log('Remplissez les champs requis')
      this.message('no_conform');
      return false;
    } else {
      console.log(this.ionicForm.value)
      if (this.showRecover == true) {//test si recover a été coché
        if (this.controlPassword(this.ionicForm.get('password').value, this.ionicForm.get('passwordVerify').value)) {// test si les 2 mots de pass
          console.log("test", this.ionicForm.value)
          this.email_user = this.ionicForm.get('email_user').value;
          console.log(this.email_user)
          this.apiService.recoverUser(this.ionicForm.value).subscribe((res) => {// on appelle la méthodr recoverUser de l'api
            console.log(typeof (JSON.parse(res)));
            console.log("SUCCES Recover ===", res);
            console.log("email_user => ", this.email_user);
            let value = JSON.parse(res);
            console.log(value.match(/^([0-9]){1,5}$/))
            // je vérifie si la valeur renvoyée est bien un entier correspondant à l'id_user un entier entre 1 et 5 digit
            if (value.match(/^([0-9]){1,5}$/)) {
              this.user_id = value;
              console.log("email_user =>", this.email_user);
              console.log("valid_control_recover");
              this.message("valid_control_recover");
              sessionStorage.setItem("user", this.email_user);
              sessionStorage.setItem("user_id", this.user_id);
              this.navCtrl.navigateForward("home");
            } else {
              // cas ou la reponse renvoyée est autre chose qu'un chiffre 
              console.log("recover_error_captcha");
              this.message("recover_error_captcha");
            }
          })
        } else { this.message("recover_error_mdp") }
      } else {
        console.log("test ", this.ionicForm.value)
        this.email_user = this.ionicForm.get('email_user').value;
        console.log(this.email_user)
        this.apiService.createUser(this.ionicForm.value).subscribe((res) => {
          console.log(typeof (JSON.parse(res)));
          console.log("SUCCES Creation ===", res);
          let value = JSON.parse(res);
          //  console.log(value.match(/^([0-9]){1,5}$/))
          if (JSON.parse(res) == false) {
            console.log("error_mail");
            this.message("error_mail");
          } else {
            console.log(JSON.parse(res))
            if (JSON.parse(res).match(/^([0-9]){1,5}$/)) {
              this.user_id = value;
              console.log("ValidateRegister");
              // console.log(this.ionicForm.get('email_user'));
              this.message("validateRegister");
              sessionStorage.setItem("user", this.email_user);
              sessionStorage.setItem("user_id", this.user_id);
              this.navCtrl.navigateForward("home");
            }
          }
        })
      }
      this.isSubmitted = false;
    }
    this.ionicForm.reset();
  }
  
  async message(aValue) { // methode du toast
    let info = [// liste des messages d'erreur de la page sollicitant un Toast
      { "description": "validateRegister", "message": "Inscription effectuée avec succès", "color": "success" },
      { "description": "valid_control_recover", "message": "Réinscription effectuée avec succès", "color": "warning" },
      { "description": "valid_control", "message": "Identification réussie", "color": "success" },
      { "description": "error_mail", "message": "Adresse mail déjà existante", "color": "warning" },
      { "description": "failure", "message": "Erreur de mot de pass/login", "color": "warning" },
      { "description": "no_conform", "message": "Identification non conforme", "color": "warning" },
      { "description": "recover_error_captcha", "message": "Erreur: Erreur de Captcha ", "color": "warning" },
      { "description": "recover_error_mdp", "message": "Erreur: Mot de passe non similaire", "color": "warning" },
      { "description": "recover_error_email", "message": "Erreur: Email non défini", "color": "warning" },
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
  // controlPassword(ev) {
  //   if (this.password === ev.target.value) return true;
  // }

  control() {
    this.isSubmitted = true;
    console.log(this.ionicForm)
    if (!this.ionicForm.valid) {
      this.message('no_conform');
      console.log('Remplissez les champs requis')
      return false;
    } else {
      //ionicform ->valid
      this.email_user = this.ionicForm.get('email_user').value;
      console.log(this.ionicForm);
      if (this.showRecover == true) {
        this.captcha = this.ionicForm.get('captcha').value;
        this.passwordVerify = this.ionicForm.get('passwordVerify').value;

      }
      //console.log(this.ionicForm.value)
      this.apiService.connexion(this.ionicForm.value).subscribe((res) => {
        console.log("SUCCES Connexion ===", res);
        console.log("controle")
        let value = JSON.parse(res);
        //console.log(value.match(/^([0-9]){1,5}$/))
        if (value.match(/^([0-9]){1,5}$/)) {
          //generer un id de session
          console.log("valid_control");
          this.message("valid_control");
          this.user_id = value;
          sessionStorage.setItem("user", this.email_user);
          sessionStorage.setItem("user_id", this.user_id);
          // une connexion on recupere 
          // sessionStorage.setItem('user_id', this.user_id);
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
