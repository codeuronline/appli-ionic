import { FoundlistPageModule } from './../foundlist/foundlist.module';

import { NavController, ToastController } from '@ionic/angular';
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
  description: String;
  fileNew: Boolean;
  firstname: String;
  date: Date;
  location: String;
  routerHref = "home";
  isSubmitted = false;
  handlerMessagelost = '';
  roleMessage = '';
  user: String;
  user_id: String;
  //  ELEMENT de fichier à télécharger //
  id = this.activatedRouter.snapshot.paramMap.get('id');
  imgEmpty = "object_vide.png";
  imgUrl = "http://localhost/ionicserver/upload/";
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=";
  entryData = {
    id_object: null,
    status: null,
    description: null,
    location: null,
    date: null,
    firstname: null,
    lastname: null,
    email: null,
    checkedpicture: 1,
    filename: null,
    newUrlImg: null,
    user_id: null,
  };
  etat = new String;
  myValue = new Boolean;
  myOptionPicture = new Boolean;
  ionicFormView: FormGroup;

  constructor(
    private toastController: ToastController,
    public userService: UserService,
    public http: HttpClient,
    public activatedRouter: ActivatedRoute,
    public formBuilder: FormBuilder,
    public navCtrl: NavController) {
    
    //this.ionicFormView = this.entryData;


  }

  async message(aValue) {
    let info = [
      { "description": "confirm", "message": "Modification Confirmée", "color": "success" },
      { "description": "treat", "message": "Traitement en cours", "color": "warning" }
    ]

    for (let index = 0; index < info.length; index++) {
      if (aValue == info[index].description) {
        let toast = await this.toastController.create({
          header: "",
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
  getFileExtension(filename) {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }
  ngOnInit() {
    
    this.user = sessionStorage.getItem("user");
    this.user_id = sessionStorage.getItem("user_id");
    if (this.user == null || this.user == "") {
      this.navCtrl.navigateBack("authentificate")
    }
    this.getEntry();
    console.log("ngOnInit->", this.entryData);
    this.fileNew = false;
    this.myValue = (this.entryData.status == 1) ? true : false;
    this.etat = (this.myValue == true) ? "Trouvé" : "Perdu";
    this.routerHref = (this.entryData.status == 1) ? 'foundlist' : 'lostlist';
    this.myOptionPicture = (this.entryData.checkedpicture == 1) ? true : false;
    console.log(this.entryData);  
    console.log("formulaire rempli ->", this.ionicFormView);
    this.ionicFormView = this.formBuilder.group({
      description: [this.entryData.description],
      status: [this.entryData.status],
      location: [this.entryData.location],
      date: [this.entryData.date],
      firstname: [this.entryData.firstname],
      lastname: [this.entryData.lastname],
      email: [this.entryData.email,[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      checkedpicture: [this.entryData.checkedpicture],
      filename: [this.entryData.filename],
      user_id:[this.user_id],
    });
    
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicFormView.get('date').setValue(date, { onlyself: true });
  }

    getEntry() {
    this.readAPI(this.bdUrl + this.id).subscribe(data => {
      data = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (this.id == data[i].id_object) {
          data[i].newUrlImg = (data[i].filename == null) ? this.imgUrl + this.imgEmpty : this.imgUrl + data[i].filename;
          this.entryData = data[i];
        }
      };
      console.log("getEntry_readData:", this.entryData);
      this.ionicFormView = this.formBuilder.group({
        description: [this.entryData.description],
        status: [this.entryData.status],
        location: [this.entryData.location],
        date: [this.entryData.date],
        firstname: [this.entryData.firstname],
        lastname: [this.entryData.lastname],
        email: [this.entryData.email,[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
        checkedpicture: [this.entryData.checkedpicture],
        filename: [this.entryData.filename],
        user_id:[this.user_id],
      });
      this.etatStatus();     
    });
    return this.entryData;
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
    if (this.entryData.status == true ||this.entryData.status=="1") {
      this.etat = "Trouvé";
    } else {
      this.etat = "Perdu";
    }
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

  onFileChange($event) {
    const oldfilenemame = $event.target.files[0].name;
    this.filename = "object_" + this.id + "." + this.getFileExtension(oldfilenemame);
    this.file = $event.target.files[0];
    this.fileNew = true;
    console.log("filename", this.filename);
    console.log("file:", this.file);
  }

  async onSubmit() {
    this.message("treat");
    // creer un object ecoute
    let formObj = this.ionicFormView.value;
    // test les changement selon l'ecoute
    formObj.id_object = this.entryData.id_object;
    console.log(this.myValue,this.etat);
    formObj.description = (this.ionicFormView.get('description').value != null) ? this.ionicFormView.get('description').value : this.entryData.description;
    formObj.status = (this.ionicFormView.get('status').value != null) ? (this.ionicFormView.get('status').value== true) ? "0":"1" : this.entryData.status;
    formObj.date = (this.ionicFormView.get('date').value != null) ? this.ionicFormView.get('date').value : this.entryData.date; 
    formObj.location = (this.ionicFormView.get('location').value != null) ? this.ionicFormView.get('location').value : this.entryData.location;
    formObj.firstname = (this.ionicFormView.get('firstname').value != null) ? this.ionicFormView.get('firstname').value : this.entryData.firstname;
    formObj.lastname = (this.ionicFormView.get('lastname').value != null) ? this.ionicFormView.get('lastname').value : this.entryData.lastname;
    formObj.email = (this.ionicFormView.get('email').value != null) ? this.ionicFormView.get('email').value : this.entryData.email;
    formObj.user_id = this.user_id;

    // cas si le toggle picture est activé  
    if (this.myOptionPicture == true) {
      //this.submitImageForm();   
      formObj.checkedpicture = true;
      if (this.fileNew == true) {
        //generation d'un nouveau formulaire pour l'image
        formObj.filename = this.filename;
        let formData = new FormData();
        //ajout de l'id de l'objet
        formData.append('id', formObj.filename);
        //ajout de fichier image
        formData.append('photo', this.file);
        formObj.file = formData;
        // envoie du fichier sous forme de requete ajax
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
        formObj.filename = this.entryData.filename
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
    // envoie des modifications des informations
    let serializedForm = JSON.stringify(formObj);
    console.log("objet Json", serializedForm);
    this.userService.updateForm(serializedForm, this.id).
      subscribe(
        (res) => {
          console.log("SUCCES ===", res);

        })
    this.message("confirm");
    this.ngOnInit();
    this.navCtrl.navigateBack(this.routerHref);
    //this.ionicFormView.reset();

    // formObj recoit l'etat des valeurs du formulaire

  }
  destroyUser() {
    this.user = "";
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');
    this.navCtrl.navigateBack("authentificate");
  }

  goBack() {
    if (this.entryData.status == 1) {
      this.routerHref = "/foundlist"
    } else { this.routerHref = "/lostlist" }
    this.navCtrl.navigateBack(this.routerHref);

  }

  // delete() {
  //   this.userService.deleteObjet(this.id).subscribe(
  //     (res) => {
  //       console.log("SUCCES ===>", res)
  //     }
  //   )
  //   this.ngOnInit();
  //   this.navCtrl.navigateBack(this.routerHref);
  //   //manque l'affichage du succes
  // }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////




}


