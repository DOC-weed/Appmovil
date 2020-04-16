// Importaciones que se necesitan para este modulo
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
  //Variables utilizadas para este modulo========================
User = new user();
passito: string;
 //=============================================================
  constructor(private service: ServiceService, public alert: AlertController, public nav: NavController) { }

  ngOnInit() {
  }
  //Función de registar los nuevos datos y guardarlos en un usuario
  registrar(myForm: NgForm) {
    //funcion del servicio
  }

  // Alertas
  async volverLogin() {//Alerta exito
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
  async error(err) { //Alerta de error
    const alert = await this.alert.create({
      message:'Ocurrio un error' + err,
      buttons: [{
        text:'ok'
      }]
    });
    return await alert.present();
  }

}
