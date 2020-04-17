// Importaciones que se necesitan para este modulo
import { Component, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-h',
  templateUrl: './menu-h.component.html',
  styleUrls: ['./menu-h.component.scss'],
})
export class MenuHComponent implements OnInit {
  //Variables utilizadas para este modulo========================
  image = '../../../assets/image/user.png';

  //=============================================================
  constructor(public navCtrl: NavController) { }

  ngOnInit() {}
//Función para salir de la aplicacion y eliminar todos los datos que se encuentren en el storage
  cerrarsesion() {
    this.navCtrl.navigateForward('/login');
    localStorage.clear();
  }
  gotoperfil() {
    this.navCtrl.navigateForward('/perfil');
  }
  
}
