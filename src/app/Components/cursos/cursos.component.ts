import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ServiceService } from '../../service/service.service';
import * as jwt_decode from 'jwt-decode';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos: any;
  nombres: any;
  miscursos = [];
  datosp: any;

  constructor(public modalCtrl: ModalController, private service: ServiceService, private alert: AlertController, private  storage: Storage) { }

  ngOnInit() {
    this.obtenercursos();
    this.storage.get('token').then((usuario: any) =>{
      this.datosp = jwt_decode(usuario);
      console.log(this.datosp);
    });
  }
  obtenerpersonas(){
    this.service.getUsers().then((res: any)=> {
      this.nombres= res;
      console.log(this.nombres);
    }).catch(err => {
      console.log(err);
    });
  }
  registarme(id) {
    this.miscursos.push(id);
    console.log(this.miscursos);
    const _id = this.datosp.resp._id;
    console.log(_id);

    this.service.registerCourse(_id,this.miscursos).then(res=>{
      console.log(res);
      this.succes();
      this.obtenerpersonas();
    }).catch(err =>{
      console.log(err);
      this.error();
    });
  }
  dismiss() {
    this.modalCtrl.dismiss();

  }
  obtenercursos() {
    this.service.getCourse().then((res:any)=> {
      this.cursos=res;
      console.log(this.cursos);
    }).catch(err =>{
      console.log(err);
    });
  }

  obtenerpersona(id){
    this.service.getUserId(id).then((user: any)=>{
        this.nombres=user;
        console.log(this.nombres);
      }).catch(err=>{
        console.log(err);
      });
  }
  // Alerts
  async succes() {
    const alert = await this.alert.create({
      message: 'Te uniste al curso',
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
