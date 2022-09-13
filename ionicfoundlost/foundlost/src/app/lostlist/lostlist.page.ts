import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  showDescription = true;
  showLocation = false;
  showCalendar = false;
  entryData = [];
  entryDataSearch = [];
  user = sessionStorage.getItem("user");
  user_id = sessionStorage.getItem("user_id");

  constructor(public http: HttpClient, private navCtrl: NavController) {
    this.ngOnInit;
  }

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
  
  
  toggleSearch(): void {
    // console.log('ici');
    this.searchStatus = !this.searchStatus;
    var element = document.getElementById("searchOptions");
    (this.searchStatus == true) ? element.style.display = "visible" : element.style.display = "hidden";

  }
  toggleLocation(): void {
    this.showLocation = !this.showLocation;
    if (this.showLocation== true){
      this.showCalendar = false;
      this.showDescription = false}
    console.log("location", this.showLocation);    

  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar == true) {
      this.showLocation = false;
      this.showDescription = false;
    }
    console.log("Calendar", this.showCalendar);    

  }
  toggleDescription(): void{
    this.showDescription = !this.showDescription;
    if (this.showLocation == true) {
      this.showCalendar = false;
      this.showLocation = false;
    }
    console.log("description", this.showDescription);    

  }
   
  selectPlaceholder(){
    let placeHolder = "";
    (this.showDescription == true) ? placeHolder = "Filtrer par description" : null;
    (this.showLocation == true) ? placeHolder = "Filtrer par endroit" : null;
    (this.showCalendar == true) ? placeHolder = "Filtrer par Date" : null;
    return placeHolder;
  }

  filter(ev): void{
    // this.entryData.values

    if (this.showCalendar == true) {
      // comment recuperer la valeur??
      // alert(ev.target.value);
      let date = new Date(ev.target.value).toISOString().substring(0, 10);
      this.entryDataSearch=this.entryData.filter((data)=>data.date.match(ev.target.value))
    }
    if (this.showDescription == true) {
      this.entryDataSearch=this.entryData.filter((data)=>data.description.toLowerCase().match(ev.target.value.toLowerCase()))
    }
    if (this.showLocation == true) {
      this.entryDataSearch=this.entryData.filter((data)=>data.location.toLowerCase().match(ev.target.value.toLowerCase()));
    }
    console.log(this.entryDataSearch);    
    }

  
  // change($event1) {
  //   console.log(this.searchStatus);
  //   this.searchStatus = !this.searchStatus;
  //   console.log(this.searchStatus);
  //   const element = document.getElementById("searchOptions");
  //   (this.searchStatus == true) ? element.style.display = "visible" : element.style.display = "hidden";

  // }
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
  
  destroyUser() {
    this.user = "";
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');
    this.navCtrl.navigateBack("authentificate");
  }

  getEntry() {
    this.readAPI(this.bdUrl).subscribe(data => {
      console.log(data);
      data = JSON.parse(JSON.stringify(data))
      for (let i = 0; i < Object.keys(data).length; i++) {
        data[i].filename = (data[i].filename == undefined) ? "object_vide.png" : data[i].filename;
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
          this.entryDataSearch=this.entryData;
      }
      //    console.log(this.entryData);
      // fin boucle for
    }); // fin subscribe 
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}