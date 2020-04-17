// Importaciones que se necesitan para este modulo
import { homework } from './../../models/homework';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent implements OnInit {
  // Variables utilizadas para este modulo========================
  homework = new homework();
  // =============================================================
  constructor(private service: ServiceService, public modalCtrl: ModalController) { }

  ngOnInit() {}
  // Función de registrar un tarea nueva 
  registarTarea(myform: NgForm) {

    if (myform.value.fileName == null) {
      myform.value.fileName="undefined"
    }


    this.service.postHomework(myform.value)
    .subscribe(res =>{
      console.log(res);
      if (res) {
        this.closeModal();
      }
    });





  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
