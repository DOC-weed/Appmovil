import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CursosComponent } from '../Components/cursos/cursos.component';
import { ServiceService } from '../service/service.service';
import * as jwt_decode from 'jwt-decode';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  datosp: any;
  miscursos: any;

  constructor(public modalctrl: ModalController, private service: ServiceService, private  storage: Storage) {}

  ngOnInit( ){ 
    // this.datosp = jwt_decode(localStorage.getItem('token'));
     this.storage.get('token').then((usuario: any) =>{
      this.datosp = jwt_decode(usuario);
      console.log(this.datosp);
    });
    // this.obtenermiscursos();
  }
  async opencursos() {
    const modal = await this.modalctrl.create({
      component: CursosComponent
    });
    return await modal.present();
  }
  dejarcurso() {
    
  }

  obtenermiscursos() {
    const arr = this.datosp.resp.Cursos;
    for (var i = 0; i < arr.length-1; i++) {
      this.service.GetCourseId(arr[i]).then((res:any)=> {
      this.miscursos=res;
      console.log(this.miscursos);
    }).catch(err =>{
      console.log(err);
    });
    }

}



}
