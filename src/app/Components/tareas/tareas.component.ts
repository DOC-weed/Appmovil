// Importaciones que se necesitan para este modulo
import { homework } from './../../models/homework';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent implements OnInit {
  // Variables utilizadas para este modulo========================
  @Input() _id: any;
  homework = new homework();
  // =============================================================
  constructor(private service: ServiceService, public modalCtrl: ModalController, public navParams: NavParams,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log(this._id);
  }
  // Función de registrar un tarea nueva
  registarTarea(myform: NgForm) {
    this.homework.idCourse = this._id;
    this.service.postHomework(this.homework).then( res => {
      console.log(res);
      this.succes();
      this.closeModal();
      myform.reset();
    }).catch(err=>{
      this.error();
    });
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  // Alerts 
 async succes() {
    const alert = await this.alertCtrl.create({
      message: 'Se registro la tarea',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }

   async error() {
    const alert = await this.alertCtrl.create({
      message: 'No se registro la tarea',
      buttons: [{text: 'ok'}]
    });
    return await alert.present();
  }

}
