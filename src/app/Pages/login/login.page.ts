import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userlogin } from '../../models/userLogin';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user = new userlogin();
  constructor(private service: ServiceService, public route: Router, public nav: NavController, public alert: AlertController) { }

  ngOnInit() {
  }

  iniciarSesion(myForm: NgForm ) {
    this.service.Login(this.user).then((usuario: any) => {
      console.log(usuario);
      if (usuario.status == "User not found") {
        console.log('Usuario no encontrado');

      }else if (usuario.status == "Incorrect password"){
          console.log('contraseña incorrecta');

      }else{
        
        localStorage.setItem('token', usuario.token);
        this.nav.navigateForward('/tabs');

      }
    }).catch((err: any) => {
      console.log(err);
      this.error(err);
    });
  }
  gotregistrar() {
    this.nav.navigateForward('/registrar');
  }
  //Alertas

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
