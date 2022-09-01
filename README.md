## ATTENTION BUG D'AFFICHAGE

### Page d'Accueil de l'appli :

![Accueil](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/accueilionic.png)

### Page de déclaration d'un objet perdu(la meme interface existe pour l'objet trouvé) :

![Interface objets perdus](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/interfacePerdu.png)

### Confirmation de déclaration d'un objet quand tous les champs ont été remplis et valides

![Confirmation objets perdus](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/confirmationPerdu.png)

### Page de modification d'un objet avec accès a tous les champs:

#### --> possibilité d'attacher une photo à l'objet

#### --> de supprimer la déclaration en cliquant sur la poubelle

#### --> de changer le statut

#### --> de modifier "tous les champs"

![Modification](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/listobjectperdu-voir-modifcation.png)

### Confirmation de suppression de l'objet

![Suppression](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/confirmation-suppression.png)

### Affichage de la liste des objets perdus avec l'option voir sur chaque objet

![list voir objet perdu](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/listobjectperdu-voir.png)

### Affichage de la liste des objets perdus

![liste objets perdus](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/listobjectperdu.png)
### Mise à Jour -> du 28/07/2022
#### Correction du comportement de la page view si l'objet a été trouvé -> tous les champs ont été désativés
#### Si le status trouvé n'a pas été validé -> il appapartient toujours au objet perdu et tous les champs sont modifiables
#### Correction des formulaires found et lost qui tranmettaient aucune valeur de status
#### Correction de l'affichage de la page d'accueil affichant correctement le bouton liste objet trouvé
#### Correction de l'affichage de la Date au seul format Date et non plus au format DateTime dasn les 3 formulaires
### Mise à Jour -> du 05/08/2022
#### Ajout de la page Authentification
#### Seul les utilisateurs enregistrés peuvent consulter l'appli
#### Filtrage des informations de connexion via regex coté front et back
### Mise à Jour -> du 06/08/2022
#### Controle de la visibilité du mot de passe sur la page d'authentification
#### Révision de la cohérence de l'enchainement des pages
##### -> La déconnexion n'est accessible seulement qu'à partir de la page home
##### -> La suppression n'est accessible seulement que pour les objets qui ont status trouvé dans la page list found
##### -> Modification de routage dans la barre de navigation différent de celui utilisé pour l'appli
##### -> Révision du design et de l'affichage des boutons -> toujours en cours
##### -> Révision de l'affichage des Toasts -> encours
### Mise à jour -> 08/08/2022
#### -> Nouveau design
#### -> Refonte des images / logo
#### -> Cohérence des toasts 
#### -> Creation  d'un bibliothèque des toasts 
#### -> Modification à venir 
##### -> Séléction d'une liste rapide pour changer le status de l'objet
##### -> Suppression de la page "detail d'un objet" au profit de ?????
### Mise à jour -> 26/08/2022 
#### -> Déploiement de l'outil de filtrage dans les listes d'objets
![filtrage](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/n_list_lost_filter.png)
![toast](https://raw.githubusercontent.com/codeuronline/appli-ionic/master/ionicfoundlost/foundlost/image_interface/n_toast.png)
### Mise à jour -> 27/08/2022
#### Filtrage par Description/Localisation/ Date opérationnelle
#### -> à faire : récupération de Mot de passe
##### -> Déclencher une procédure pour avertir la personne à retrouver un objet si la correspondance existe 
##### -> Revoir le présentation de la page detail/view
##### -> Changer le status dans la liste d'objet perdu a trouvé avec un simple glissement
##### -> Image par la page view....
##### -> Revoir l'élément card de filtrage
### Mise à jour -> 28/08/2022
##### -> Mise en place des éléments si on a perdu son mot de pass  mot de pass perdu case Recover
##### -> Mise en place du captcha / et de la vérification du password
### Mise à jour  -> 01/09/2022
#### ->  confirmation via mail du reset password avec + une cle pour redefinir le mot de pass



