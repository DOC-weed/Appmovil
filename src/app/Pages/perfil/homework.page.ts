// Importaciones que se necesitan para este modulo
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
  // Variables utilizadas para este modulo========================
    informacion: any;
    URL1: string;
    image = '../../../assets/image/user.png';
  // =============================================================
  constructor(private camera: Camera, private filepath: FilePath, private storage: NativeStorage ) { }

  ngOnInit() {
    // this.informacion = jwt_decode(localStorage.getItem('token'));
    // console.log(this.informacion);
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
      const url = this.filepath.resolveNativePath(imageData).then((urldata) => {
        this.URL1 = urldata;
      }).catch((err => {
        console.log(err);
      }));
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }
  // Función para actualizar los datos
  actualizarPerfil(myform: NgForm) {
  }

}
