import { Component, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-h',
  templateUrl: './menu-h.component.html',
  styleUrls: ['./menu-h.component.scss'],
})
export class MenuHComponent implements OnInit {

  
  constructor(public navCtrl: NavController) { }

  ngOnInit() {}
  cerrarsesion() {
    this.navCtrl.navigateForward('/login');
    localStorage.clear();


  }
  gotoperfil() {
    this.navCtrl.navigateForward('/perfil');
  }

}
