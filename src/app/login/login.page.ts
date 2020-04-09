import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userlogin } from '../models/userLogin';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user = new userlogin();
  constructor(private service: ServiceService, public route: Router, public nav: NavController) { }

  ngOnInit() {
  }

  iniciarSesion(myForm: NgForm ) {
    // importar servicio
      this.nav.navigateForward('/tabs');
      console.log(this.user);
      myForm.reset();
  }
  gotregistrar(){
    this.nav.navigateForward('/registrar');
  }

}
