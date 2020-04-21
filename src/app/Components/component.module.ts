import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuHComponent } from '../Components/menu-h/menu-h.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MenuHComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ MenuHComponent]
})
export class ComponentModule { }
