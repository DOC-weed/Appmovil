import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { AlertController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { user } from '../../models/user';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
User = new user();
passito: string;
  constructor(private service: ServiceService, public alert: AlertController, public nav: NavController) { }

  ngOnInit() {
  }
  registrar(myForm: NgForm) {
    //funcion del servicio
  }

  // Alertas
  async volverLogin() {
    const alert = await this.alert.create({
      message: 'Has sido registrado correctamente',
      buttons: [
        {text:'OK',
         handler: () =>{
        this.nav.navigateForward('/login');
            }}
              ]
          });
    return await alert.present();
  }
  async error(err) {
    const alert = await this.alert.create({
      message:'Ocurrio un error' + err,
      buttons: [{
        text:'ok'
      }]
    });
    return await alert.present();
  }

}
