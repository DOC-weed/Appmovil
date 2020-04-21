import { Injectable } from '@angular/core';
import { CanActivate,  Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(public navCtrl: NavController) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( localStorage.getItem('token')) {
        return true;
      } else {
        return false;
        this.navCtrl.navigateForward('/login');
      }
  }
}
