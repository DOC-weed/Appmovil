// Importaciones que se necesitan para este modulo
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Storage } from '@ionic/storage';

import { ServiceService } from '../../service/service.service';
import { ModalController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
  // Variables utilizadas para este modulo========================
    image = '../../../assets/image/user.png';
    datosp: any;
    myid: any;
    usuario2: any;
    mostrar=true;
  // =============================================================
  constructor(private camera: Camera, private service: ServiceService,public alert: AlertController, private storage:Storage ) { }

  ngOnInit() {
    // this.informacion = jwt_decode(localStorage.getItem('token'));
    // console.log(this.informacion);
    this.storage.get('token').then((usuario: any) =>{
      this.datosp = jwt_decode(usuario);
      this.myid = this.datosp.resp._id;
      // this.User.name=this.datosp.resp.name;
      // this.User.lastname=this.datosp.resp.lastname;
      // this.User.email =this.datosp.resp.email;
      console.log(this.datosp);
      console.log(this.myid);
    });

  }
  // Función nativa para tomar las fotos y almacenar su url
  tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,'+imageData;
      // const url = this.filepath.resolveNativePath(imageData).then((urldata) => {
        
      // }).catch((err => {
      //   console.log(err);
      // }));
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }
  getusuarioid(){
    this.service.getUserId(this.myid).then((user: any)=> {
      this.usuario2 = user;
      this.usuario2.imagen = this.image;
      this.mostrar=false;
      console.log(this.usuario2);
    }).catch(err=>{
      console.log(err);
    });
  }
  // Función para actualizar los datos
  actualizarPerfil(myform: NgForm) {
    this.service.updateUserImage(this.myid, this.usuario2).then(res=>{
        this.succes();
        myform.reset();
      }).catch(err=>{
        this.error();
      });
  }

   async succes() {
    const alert = await this.alert.create({
      message: 'Se modificaron sus datos, cierre sesión para ver los cambios',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }
  async error() {
    const alert = await this.alert.create({
      message: 'Ocurrio un error',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }

}
