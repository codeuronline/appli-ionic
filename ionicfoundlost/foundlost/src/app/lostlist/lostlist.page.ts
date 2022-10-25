import { UserService } from './../api/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {
  // Créer deux propriétés
  // URL du serveur backend
  bdUrl = "http://localhost/ionicserver/retrieve-data.php?key=lost";
  imgUrl = "http://localhost/ionicserver/upload/";
  input = document.getElementById("search");
  searchStatus = true;
  routerHref = "home";
  showDescription = true;
  showLocation = false;
  showCalendar = false;
  entryData = [];
  entryDataSearch = [];
  user = sessionStorage.getItem("user");
  user_id = sessionStorage.getItem("user_id");

  constructor(public http: HttpClient, private navCtrl: NavController,private toastController:ToastController,private userService:UserService) {
    this.ngOnInit;
  }
//fonction affichant le status de la selection de la barre de recheerche
  showStatusSearch() {
    var aStatus = "information";
    if (this.showCalendar == false && this.showLocation == false) {
      aStatus = 'information';
    }
    if (this.showCalendar == true && this.showLocation == false) {
      aStatus = "calendar";
    }
    if (this.showCalendar == false && this.showLocation == true) {
      aStatus = "location";
    }
    
    return aStatus; 
    }
  
  // fonction affichant l'etat de visibilité de la barre de recherche
  toggleSearch(): void {
    // console.log('ici');
    this.searchStatus = !this.searchStatus;
    var element = document.getElementById("searchOptions");
    (this.searchStatus == true) ? element.style.display = "visible" : element.style.display = "hidden";

  }
  // fonction  affichant l'etat de recherche pour location
  toggleLocation(): void {
    this.showLocation = !this.showLocation;
    if (this.showLocation== true){
      this.showCalendar = false;
      this.showDescription = false}
    console.log("location", this.showLocation);    

  }
// fonction  affichant l'etat de recherche pour calendar
  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar == true) {
      this.showLocation = false;
      this.showDescription = false;
    }
    console.log("Calendar", this.showCalendar);    

  }
  // fonction  affichant l'etat de recherche pour description
  toggleDescription(): void{
    this.showDescription = !this.showDescription;
    if (this.showLocation == true) {
      this.showCalendar = false;
      this.showLocation = false;
    }
    console.log("description", this.showDescription);    

  }
   // fonction affichant l'invite du "placeholder"
  selectPlaceholder(){
    let placeHolder = "";
    (this.showDescription == true) ? placeHolder = "Filtrer par description" : null;
    (this.showLocation == true) ? placeHolder = "Filtrer par endroit" : null;
    (this.showCalendar == true) ? placeHolder = "Filtrer par Date" : null;
    return placeHolder;
  }

  // fonction filtrant selon le choix de recherche les élements
  filter(ev): void{
    // this.entryData.values

    if (this.showCalendar == true) {
      // date est une nouvelle date de l'element renvoye par le formulaire  qu'on sous une chaine de caractere en ISO et qu'on prélève la sous chaine commenant a l'indice 0 et se terminany a 10
      let date = new Date(ev.target.value).toISOString().substring(0, 10);
      //filtre le tableau entryData en selectionnant la date et la correspondance des elements saisis
      this.entryDataSearch=this.entryData.filter((data)=>data.date.match(ev.target.value))
    }
    if (this.showDescription == true) {
      //filtre le tableau entryData en selectionnant la description et la correspondance des elements saisis
      this.entryDataSearch=this.entryData.filter((data)=>data.description.toLowerCase().match(ev.target.value.toLowerCase()))
    }
    if (this.showLocation == true) {
      //filtre le tableau entryData en selectionnant la localisation et la correspondance des elements saisis
      this.entryDataSearch=this.entryData.filter((data)=>data.location.toLowerCase().match(ev.target.value.toLowerCase()));
    }
    console.log(this.entryDataSearch);    
    }

  ngOnInit() {
    console.log("searchStatus", this.searchStatus);
    this.user = sessionStorage.getItem("user");
    this.user_id = sessionStorage.getItem("user_id");
    if (this.user == null || this.user == "") {
      this.navCtrl.navigateBack("authentificate")
    }
    this.getEntry();
    this.searchStatus = false;
  }
  
  // fonction permettant de détruire l'utilisateur enregistré et ces variables associé
  destroyUser() {
    this.user = "";
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');
    this.navCtrl.navigateBack("authentificate");
  }
// fonction permettant de recuperer les données dans les tables entryData et entryDataSearch
  getEntry() {
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log(data);
      data = JSON.parse(JSON.stringify(data))
      //on parcourt l'ensemble de ces clées de l'objet tableau data
      for (let i = 0; i < Object.keys(data).length; i++) {
        //pour chaque élement on enrichit d'un champ supplémentaire filename s'il n'est pas défini avec une adresse d'image vide
        data[i].filename = (data[i].filename == undefined) ? "object_vide.png" : data[i].filename;
        // on affecte chaque elements de la liste de entrydata
        this.entryData[i] = {
          "id_object": data[i].id_object,
          "status": data[i].status,
          "description": data[i].description,
          "date": data[i].date,
          "location": data[i].location,
          "firstname": data[i].firstname,
          "lastname": data[i].lastname,
          "email": data[i].email,
          "checkedpicture": data[i].checkedpicture,
          "filename": data[i].picture,
          "filenameWithUrl": this.imgUrl + data[i].filename,
          "user_id": data[i].user_id,
        }
        // on copie entryData dans l'entryDataSearch afin de manipuler les données que dans EnrtyDataSearch et avoir une sauveagrde intact des EntryData de data
          this.entryDataSearch=this.entryData;
      }
      
    }); // fin subscribe 
  }
  // fonction qui lit l'adresse URL  dans le http
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  // fonction permettant d'envoyer  un toast selon le message voulu
  async message(aValue) {
    // tableau des valeurs recensées donnant lieu à un Toast
    let info = [
      { "description": "confirm", "message": "suppression Confirmée", "color": "success" },
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
  // fonction supprimant l'objet 
  delete(id, user_id = this.user_id) {
    // on solicite la méthode deleteObjetc dans userService
    this.userService.deleteObjet(id,user_id).subscribe(
      (res) => {
        console.log("SUCCES ===>", res)
      }
    )
    // affiche le toast de confirmation
    this.message("confirm");
    //on reiniatilise la page
    this.ngOnInit();
    // et on se positionne a la page precedents
    this.navCtrl.navigateBack(this.routerHref);
  }  
}