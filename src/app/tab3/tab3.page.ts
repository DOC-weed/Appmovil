import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CursosComponent } from '../Components/cursos/cursos.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public modalctrl: ModalController) {}

  async opencursos() {
    const modal = await this.modalctrl.create({
      component: CursosComponent
    });
    return await modal.present();

  }
  dejarcurso() {
    
  }

}
