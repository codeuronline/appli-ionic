
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
  ionicForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController, private router: Router, private alertController: AlertController, public activatedRouter: ActivatedRoute,
    public navCtrl: NavController) { }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordToggleIcon = (this.showPassword) ? "eye-off-outline" : 'eye';
  }
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
    //this.user = sessionStorage.getItem('user');
    this.ionicForm = this.formBuilder.group({
      email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern(/[A-Z]+.*[0-9]+.*[^\w]+|[A-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[A-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[A-Z]+|[^\w]+.*[A-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[A-Z]+/), Validators.minLength(8)]]
    })

  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {

    this.isSubmitted = true;

    if (!this.ionicForm.valid) {
      console.log('Remplissez les champs requis')
      return false;
    } else {
      console.log(this.ionicForm.value)

      this.apiService.createUser(this.ionicForm.value).subscribe((res) => {
        console.log(typeof(JSON.parse(JSON.stringify(res))));
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

      this.isSubmitted = false;
    }

    this.ionicForm.reset();
  }

  async message(aValue) {
    let info = [
      { "description": "validateRegister", "message": "Inscription effectuée avec succès", "color": "success" },
      { "description": "valid_control","message":"Identification réussi","color": "success"},
      { "description": "error_mail", "message": "Adresse mail déjà existante", "color": "warning" },
      { "description": "failure", "message": "Erreur de mot de login/passe", "color": "warning" }]
    
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

  control() {
    this.isSubmitted = true;
    
    if (!this.ionicForm.valid) {
      console.log('Remplissez les champs requis')

      return false;
    } else {
      this.email_user = this.ionicForm.get('email_user').value;
      console.log(this.ionicForm.value)
      this.apiService.connexion(this.ionicForm.value).subscribe((res) => {
        console.log("SUCCES ===", res);
        console.log(res);
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
