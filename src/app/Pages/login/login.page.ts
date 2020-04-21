// Importaciones que se necesitan para este modulo
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userlogin } from '../../models/userLogin';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Variables utilizadas para este modulo========================
user = new userlogin();
  // =============================================================
  constructor(private service: ServiceService, public route: Router, public nav: NavController, public alert: AlertController,
  private storage: Storage) { }

  

  ngOnInit() {

  }

  iniciarSesion(myForm: NgForm ) {
    this.service.Login(this.user).then((usuario: any) => {
      if (usuario.status == "User not found") {
          const err = 'Usuario no encontrado';
          this.error(err);
      }else if (usuario.status == "Incorrect password"){
          const err = 'contraseña incorrecta';
          this.error(err);
      }else{
        console.log(usuario.token);
        const token = jwt_decode(usuario.token);
        console.log(token);
        //localStorage.setItem('token', usuario.token);
       this.storage.set('token', usuario.token);
      myForm.reset();
      this.nav.navigateForward('/tabs');
    }
    }).catch((err) => {
      console.log(err);
      this.error('esto no jalo');
    });
  }
  // Navegacion al modulo de registro de usuario
  gotregistrar() {
    this.nav.navigateForward('/registrar');
  }
  gotcamera() {
     this.nav.navigateForward('/perfil');
  }
  gotc(){
    this.nav.navigateForward('/tabs');
  }
  // Alertas =======================================================

  async error(err) {// Alerta de error
    const alert = await this.alert.create({
      message:err,
      buttons: [{
        text:'ok'
      }]
    });
    return await alert.present();
  }

}
