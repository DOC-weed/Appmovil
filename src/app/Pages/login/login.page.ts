// Importaciones que se necesitan para este modulo
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userlogin } from '../../models/userLogin';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { NativeStorage } from '@ionic-native/native-storage/ngx';



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
  private storage: NativeStorage) { }

  ngOnInit() {
  }

  iniciarSesion(myForm: NgForm ) {
    this.service.Login(this.user).then((usuario: any) => {
      console.log(usuario);
      if (usuario.status == "User not found") {
          const err = 'Usuario no encontrado';
          this.error(err);

      }else if (usuario.status == "Incorrect password"){
          const err = 'contraseña incorrecta';
          this.error(err);
      }else{
        this.storage.setItem('token', usuario.token).then((res)=>{
          this.nav.navigateForward('/tabs');
          console.log(usuario.token);
        }
        ).catch((err)=> {
          console.log(err);
        });
      }
      myForm.reset();
    }).catch((err: any) => {
      console.log(err);
      this.error(err);
    });
  }
  // Navegacion al modulo de registro de usuario
  gotregistrar() {
    this.nav.navigateForward('/registrar');
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
