import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  registarme() {

  }
  dismiss() {
    this.modalCtrl.dismiss();

  }

}
