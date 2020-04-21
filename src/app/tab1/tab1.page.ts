// Importaciones que se necesitan para este modulo
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { HomeworkPage } from '../Pages/perfil/homework.page';
import { TareasComponent } from '../Components/tareas/tareas.component';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // Variables utilizadas para este modulo========================
  course = new Course();
  blnmostarcurso = false;
  getCursos: any;
  datosp: any;
  mensajse: string;
  myid;
  // =============================================================
  constructor(private service: ServiceService, public modalCtrl: ModalController,
              public alert: AlertController, private  storage: Storage) {}

  ngOnInit() {
    this.storage.get('token').then((usuario: any) =>{
      this.datosp = jwt_decode(usuario);
      console.log(this.datosp);
      this.myid = this.datosp.resp._id
      this.obtenercursosId(this.myid);
    });
    
    // this.datosp = jwt_decode(localStorage.getItem('token'));
    //   console.log(this.datosp);
     


  }
// mostrar y ocultar formulario
  mostrarform() {
    this.blnmostarcurso = true;

  }
  ocultarform() {
    this.blnmostarcurso = false;
  }
  // Crud
  obtenercursosId(id) {
    // Aqui tienes que mandar id y remplazar el string por la variable de la función
    this.service.GetCourseIdP(id)
    .then((res: any) => {
      this.getCursos = res;
      console.log(this.getCursos);
    });
  }

  registarCurso(myform: NgForm) {
    this.course.idPersona = this.datosp.resp._id;
    this.service.postCourse(this.course).then(res => {
      console.log(res);
      myform.reset();
      this.blnmostarcurso = false;
      this.succes();
      this.obtenercursosId(this.myid);
    }).catch(err => {
      console.log(err);
      this.error();
    });
  }

  sendmsg(id, text) {
    this.service.GetCourseId(id).then((res: any)=> {
      const curso = res;
      console.log(curso);
      this.service.updateCourseMsg(id,text).then(res => {
        this.sendmesg();
        this.mensajse = '';
        this.obtenercursosId(this.myid);
      }).catch(err =>{
        this.error();
      });
    }).catch( err =>{
      this.error();
    });
  }


  // Alertas y Modal
  async dejarTarea(id) {
    const modal = await this.modalCtrl.create({
      component: TareasComponent,
      componentProps: {
      '_id': id
    }
    });
    return await modal.present();
  }
  async succes() {
    const alert = await this.alert.create({
      message: 'Se registro el curso correctamente',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }

  async sendmesg() {
    const alert = await this.alert.create({
      message: 'se mando el mensaje',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }

  async error() {
    const alert = await this.alert.create({
      message:'Ocurrio un error',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }


}
