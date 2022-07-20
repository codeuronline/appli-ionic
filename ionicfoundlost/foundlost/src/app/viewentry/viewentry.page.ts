import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';



@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  routerHref = "home";
  isSubmitted = false;
  handlerMessagelost = '';
  roleMessage = '';
  //  ELEMENT de fichier à télécharger //
  fichierAEnvoyer: File = null;
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
    checkedpicture: null,
    filename: null,
    file: null,   
  };
  // element de fichier uploader
  file: null;
  filename = new String;
  extension= new String
    ;
  etat = new String;
  myValue = new Boolean;
  myOptionPicture = new Boolean;

  envoiFichier(fichiers: FileList) {
    this.fichierAEnvoyer = fichiers.item(0)
  }
  envoiFichierParLeService(){
    // this.userService.postFile(this.fichierAEnvoyer).subscribe(resulat => {
    
    // }, erreur => {
    //   console.log("Erreur lors de l'envoi du fichier : ", erreur);
    // })
  }
    constructor(private alertController: AlertController, public userService: UserService, public http: HttpClient, public activatedRouter: ActivatedRoute, public formBuilder: FormBuilder, public navCtrl: NavController) { }

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
  ngOnInit() {
    console.log(this.id);
    this.getEntry();
    this.myValue = (this.entryData.status == 1) ? true : null;
    this.etat = (this.myValue == true) ? "Trouvé" : "Perdu";
    this.routerHref = (this.entryData.status == 1) ? 'foundlist' : 'lostlist';
    this.ionicFormView = this.formBuilder.group({
      id_object: this.id,
      status: this.myValue,
      description: null,
      location: new FormControl([null, [Validators.required, Validators.maxLength(25)]]),
      date: null,
      firstname: new FormControl([null, [Validators.required, Validators.maxLength(25)]]),
      lastname: new FormControl([null, [Validators.required, Validators.maxLength(25)]]),
      email: new FormControl([null, [Validators.required, Validators.email]]),
      checkedpicture: null,
      filename: null,
      file:null,
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

  onSubmit() {

    // creer un object ecoute
    let formObj = this.ionicFormView.value;
    // test les changement selon l'ecoute 
    // si l'objet ecoute est 
    formObj.id_object = this.entryData.id_object;
    formObj.description = (this.ionicFormView.get('description').value != null) ? this.ionicFormView.get('description').value : this.entryData.description;
    formObj.status = (this.myValue == true) ? 1 : 0;
    formObj.date = (this.ionicFormView.get('date').value != null) ? this.ionicFormView.get('date').value : this.entryData.date;
    formObj.location = (this.ionicFormView.get('location').value != null) ? this.ionicFormView.get('location').value : this.entryData.location;
    formObj.firstname = (this.ionicFormView.get('firstname').value != null) ? this.ionicFormView.get('firstname').value : this.entryData.firstname;
    formObj.lastname = (this.ionicFormView.get('lastname').value != null) ? this.ionicFormView.get('lastname').value : this.entryData.lastname;
    formObj.email = (this.ionicFormView.get('email').value != null) ? this.ionicFormView.get('email').value : this.entryData.email;
    if (this.myOptionPicture == true) {
      formObj.checkedpicture = 1;
      formObj.filename = "bob.png";
      formObj.file = "A BIG BLOB"
      formObj.filename= "object_"+this.id+ "."+ this.getFileExtension(formObj.filename);
    } else {   
      formObj.checkedpicture = 0;
      formObj.filename = null;
      formObj.file = null;
    }
         //formObj.filename = (this.ionicFormView.get('picture').value != null) ? this.ionicFormView.get('picture.value:') : this.entryData.filename// ici picture est le nom du fichier
;
    
    
    // if (formObj.description == null) { formObj.description = this.entryData.description; }
    // if (formObj.status == null) { formObj.status = this.entryData.status }
    // if (formObj.location == null) { formObj.location = this.entryData.location }
    // if (formObj.date == null) { formObj.date = this.entryData.date; }
    // if (formObj.firstname == null) { formObj.firstname = this.entryData.firstname; }
    // if (formObj.lastname == null) { formObj.lastname = this.entryData.lastname; }
    // if (formObj.email == null) { formObj.email = this.entryData.email; }
    // if (formObj.picture == null) { formObj.picture = this.entryData.picture } //picture est le blob du fichier
    // console.log(formObj);// {name: '', description: ''}
    let serializedForm = JSON.stringify(formObj);
    console.log("objet Json",serializedForm);
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

  goBack() {
    this.navCtrl.navigateBack(this.routerHref);

  }


  delete() {
    this.userService.deleteObjet(this.id).subscribe(
      (res) => {
        console.log("SUCCES ===", res)
      }
    )
    this.presentAlert("delete");
    this.goBack();
    //manque l'affichage du succes

  }
  envoyerFichier() {
    
  }
 getFileExtension(filename)
{
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}
  //traitement des images
  seeImage(event) {
    this.filename = "object_"+this.id +"."+ this.getFileExtension(event.target.files[0].name); 
    this.file =event.target.files[0];
  }
  
  loadImageFromDevice(event) {

    const file = event.target.files[0];
    const filename = event.target.files[0].name;

    this.filename = "object_"+this.id +"."+this.getFileExtension(filename)
    this.file = file;
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = () => {

      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);

    };

    reader.onerror = (error) => {

      //handle errors

    };
  }

}
