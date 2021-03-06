import { FoundlistPageModule } from './../foundlist/foundlist.module';
// import { File } from '@awesome-cordova-plugins/file';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  // element de fichier uploader
  file: File;
  filename: String;
  extension: String;
  fileNew: Boolean;
  routerHref = "home";
  isSubmitted = false;
  handlerMessagelost = '';
  roleMessage = '';
  //  ELEMENT de fichier à télécharger //
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
    checkedpicture: 0,
    filename: null,
    // file: null,
  };


  etat = new String;
  myValue = new Boolean;
  myOptionPicture = new Boolean;


  constructor(
    private alertController: AlertController,
    public userService: UserService,
    public http: HttpClient,
    public activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    public navCtrl: NavController) { }

  async presentAlert(etat) {
    switch (etat) {
      case "delete":
        const alertDelete = await this.alertController.create({
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
        await alertDelete.present();
        var { role } = await alertDelete.onDidDismiss();
        this.roleMessage = `Dismissed with role: ${role}`;
        break;
      case "update":
        const alertUpdate = await this.alertController.create({
          header: 'Confirmer la Modification',
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
              handler: () => { this.handlerMessagelost = 'Modification Confirmée'; }
            }
          ]
        });
        await alertUpdate.present();
        var { role } = await alertUpdate.onDidDismiss();
        this.roleMessage = `Dismissed with role: ${role}`; break;
    }

  }
  getFileExtension(filename) {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }
  ngOnInit() {
    console.log(this.id);
    this.getEntry();
    this.fileNew = false;
    this.myValue = (this.entryData.status == 1) ? true : null;
    this.etat = (this.myValue == true) ? "Trouvé" : "Perdu";
    this.routerHref = (this.entryData.status == 1) ? 'foundlist' : 'lostlist';
    this.ionicFormView = this.formBuilder.group({
      id_object: this.id,
      status: this.myValue,
      description: null,
      location: null ,//new FormControl([ null, this.entryData.location, [Validators.required, Validators.maxLength(25)]),
      date: null,
      firstname: null,//new FormControl([this.entryData.firstname, [Validators.required, Validators.maxLength(25)]]),
      lastname: null,//new FormControl([this.entryData.lastname, [Validators.required, Validators.maxLength(25)]]),
      email: null,//new FormControl([this.entryData.email, [Validators.required, Validators.email]]),
      checkedpicture: null,
      filename: null,
      //file: null,
    });
    this.myOptionPicture = (this.entryData.checkedpicture == 1) ? true : false;
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
  get errorControl() {
    return this.ionicFormView.controls;
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
  myChangePhoto($event) {
    this.myOptionPicture = !this.myOptionPicture
  }

  etatStatus() {
    if (this.entryData.status == 1) {
      this.etat = "Trouvé";
    } else {
      this.etat = "Perdu";
    }
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  // async submitImageForm() {
  //   let formData = new FormData();
  //   formData.append('file', this.file,
  //     "object_" + this.id + "." + this.getFileExtension(this.filename));

  //   try {
  //     const response = await fetch('http://localhost/ionicserver/upload/upload.php', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // traitement des images
  onFileChange($event) {
    const oldfilenemame = $event.target.files[0].name;
    this.filename = "object_" + this.id + "." + this.getFileExtension(oldfilenemame);
    this.file = $event.target.files[0];
    this.fileNew = true;
    console.log("filename", this.filename);
    console.log("file:", this.file);
  }
  async onSubmit() {
    // creer un object ecoute
    let formObj = this.ionicFormView.value;
    // test les changement selon l'ecoute
    // si l'objet ecoute est 
    formObj.id_object = this.entryData.id_object;
    formObj.description = (this.ionicFormView.get('description').value != null) ? this.ionicFormView.get('description').value : this.entryData.description;
    formObj.status = (this.myValue == true) ? 1 : 0;
    formObj.date = (this.ionicFormView.get('date').value != null) ? this.ionicFormView.get('date').value : this.entryData.date;
    formObj.description = (this.ionicFormView.get('description').value != null) ? this.ionicFormView.get('description').value : this.entryData.description;
    formObj.location = (this.ionicFormView.get('location').value != null) ? this.ionicFormView.get('location').value : this.entryData.location;
    formObj.firstname = (this.ionicFormView.get('firstname').value != null) ? this.ionicFormView.get('firstname').value : this.entryData.firstname;
    formObj.lastname = (this.ionicFormView.get('lastname').value != null) ? this.ionicFormView.get('lastname').value : this.entryData.lastname;
    formObj.email = (this.ionicFormView.get('email').value != null) ? this.ionicFormView.get('email').value : this.entryData.email;
  
    
    if (this.myOptionPicture == true) {
      //this.submitImageForm();   
      formObj.checkedpicture = true;
      if (this.fileNew == true) {
        //generation d'un nouveau formulaire pour l'image
        formObj.filename = this.filename;
        let formData = new FormData();
        formData.append('id', formObj.filename);
        formData.append('photo', this.file);
        formObj.file = formData;
        
        try {
          const response = await fetch('http://localhost/ionicserver/image.php', {
            method: 'POST',
            body: formData,
          })
          console.log("response =>", response)
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          console.log(response);
        } catch (err) {
          console.log(err)
            ;
        }
      } else { 
        formObj.filename =this.entryData.filename
      }
    } else {
      formObj.checkedpicture = this.entryData.checkedpicture;
      if (formObj.filename == null) {
        if (this.entryData.filename == null) {
          formObj.filename = null;
        } else {
          formObj.filename = this.entryData.filename;
        }
      }
      
    }
    let serializedForm = JSON.stringify(formObj);
    console.log("objet Json", serializedForm);
    this.userService.updateForm(serializedForm, this.id).
      subscribe(
        (res) => {
          console.log("SUCCES ===", res);

        })
    this.presentAlert("update");
    this.navCtrl.navigateBack(this.routerHref);
    //this.ionicFormView.reset();

    // formObj recoit l'etat des valeurs du formulaire

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  goBack() {
    

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  delete() {
    this.userService.deleteObjet(this.id).subscribe(
      (res) => {
        console.log("SUCCES ===>", res)
      }
    )
    this.presentAlert("delete");
    this.ngOnInit();
    this.navCtrl.navigateBack(this.routerHref);
    //manque l'affichage du succes
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 



}


