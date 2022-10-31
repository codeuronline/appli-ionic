import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // On définit une propriété de type HttpHeaders qui représente les options de configuration
  // d’un entête d'une requête http (la requête vers le serveur)
  headers: HttpHeaders;
  constructor(public http: HttpClient) {
    // On instancie le service
    this.headers = new HttpHeaders();
    // On définit les options de configuration et la CORS policy
    this.headers.append('Accept', 'application/json'); // accepte les objets jsons
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
  }
  // méthode qui envoie les données du formulaire au serveur backend.
  submitForm(data) {
    return this.http.post('http://localhost/ionicserver/manage-data.php?key=create', data,{responseType: 'text' });
  }// méthode pour supprimer le number de l'objet,-> id_user est transmis pour verifier que la suppression autoriséé
  deleteObjet(number,user_id) {
    console.log(number)
    // rajout d'un prarametre user_id pour verifier qu'il est propriétaire de la déclaration avant suppression
    return this.http.delete('http://localhost/ionicserver/manage-data.php?key=delete&user_id='+user_id+'&id_task='+number,{responseType: 'text' });
  }
    //  méthode qui met à jour les données d'un objet number avec data
  updateForm(data,number) {
    return this.http.put('http://localhost/ionicserver/manage-data.php?key=update&id_task=' + number, data, { responseType: 'text' });
  }
   // méthode qui insère un utilisateur
  createUser(data) {
    return this.http.post("http://localhost/ionicserver/manage-data.php?key=user", data,{responseType: 'text' });
  }
  // méthode qui redefinie l'utilsiateur
  recoverUser(data) {
    return this.http.post("http://localhost/ionicserver/manage-data.php?key=recover", data,{responseType: 'text' });
  }
  // méthode qui vérifie la connexion 
  connexion(data) {
    return this.http.post("http://localhost/ionicserver/manage-data.php?key=connexion", data,{responseType:'text'});
  }
}

