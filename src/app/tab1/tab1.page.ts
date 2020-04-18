// Importaciones que se necesitan para este modulo
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { HomeworkPage } from '../Pages/perfil/homework.page';
import { TareasComponent } from '../Components/tareas/tareas.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // Variables utilizadas para este modulo========================
  course = new Course();
  blnmostarcurso = false;
  getCursos: Array<any>;
  // =============================================================
  constructor(private service: ServiceService, public modalCtrl: ModalController, public alert: AlertController) {}

  ngOnInit() {

  }
// mostrar y ocultar formulario
  mostrarform() {
    this.blnmostarcurso = true;

  }
  ocultarform() {
    this.blnmostarcurso = false;
  }
  // Crud
  obtenercursosId() {
    // Aqui tienes que mandar id y remplazar el string por la variable de la función
    const _id = '5e9902eba956254b0059e545';
    this.service.GetCourseId(_id)
    .subscribe(res => {
      console.log(res);
    });
  }
  registarCurso(myform: NgForm) {

    // tslint:disable-next-line:max-line-length
    const form = {nameCourse:myform.value.nombre,topicCourse:myform.value.tema,descriptionCourse:myform.value.des,days:myform.value.days,date:myform.value.date,hour:myform.value.hour,place:myform.value.place}
    console.log(form);
    this.service.postCourse(form)
    .subscribe(res => {
      console.log(res);
      myform.reset();
      this.blnmostarcurso = false;
      this.succes();
    });
  }


  // Alertas y Modal
  async dejarTarea() {
    const modal = await this.modalCtrl.create({
      component: TareasComponent
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
  async error(err) {
    const alert = await this.alert.create({
      message:'Ocurrio un error' + err,
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }


}
