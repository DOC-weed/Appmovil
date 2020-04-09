import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { AlertController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { user } from '../models/user';

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
    console.log(this.User);
    this.volverLogin();
    myForm.reset();

    


  }
  async volverLogin() {
    let alert = await this.alert.create({
      message: "Has sido registrado correctamente",
      buttons: [
        {text:"OK",
      handler: () =>{
        this.nav.navigateForward('/login');
      }}
      ]
    });
    alert.present();
  }

}
