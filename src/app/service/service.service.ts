import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { homework } from '../models/homework';
import { Course } from '../models/course';
import { userlogin } from '../models/userLogin';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private urlUsers = 'http://localhost:3000/users';
  private urlCourses = 'http://localhost:3000/courses/';
  private urlHomeworks = 'http://localhost:3000/homeworks/';

  constructor(private http: HttpClient) { }



  Login(Userlogin: userlogin) {
    return this.http.post(this.urlUsers +'/login', Userlogin).toPromise();
  }

//crear usuario
  postUser(User: user){
    return this.http.post(this.urlUsers + '/', User).toPromise();
  }

  getUsers(){
      return this.http.get(this.urlUsers + '/').toPromise();
  }

  getUserId(_id: any){
    return this.http.get(this.urlUsers + `/${_id}`).toPromise();
  }


  updateUser(_id:any,User: user){
    return this.http.post(this.urlUsers +  `/${_id}`,User).toPromise();
  }
  updateImg(_id:any,img:string){
    return this.http.post(this.urlUsers + `/${_id}/${img}`).toPromise();
  }

//crear cursos
  postCourse(Courseinfo: Course){
    return this.http.post(this.urlCourses , Courseinfo).toPromise();
  }

//Obtener curso por id
  GetCourseId(_id: any){
      return this.http.get(this.urlCourses + `/${_id}`).toPromise();
  }

  GetCourseIdP(_id: any){
      return this.http.get(this.urlCourses + `Persona/${_id}`).toPromise();
  }

  getCourse(){
    return this.http.get(this.urlCourses ).toPromise();
  }

  updateCourse(_id:any,Courseinfo:Course){
    return this.http.put(this.urlCourses + `/${_id}`,Courseinfo).toPromise();
  }

  updateCourseMsg(_id:any,msg:string){
    return this.http.put(this.urlCourses + `/${_id}/${msg}`).toPromise();
  }

  //crear homework
  postHomework(Homework: homework){
    console.log(Homework);

    return this.http.post(this.urlHomeworks , Homework).toPromise();

  }
//Obtener homework por id
  GetHomeworkId(_id: string){
        return this.http.get(this.urlHomeworks + `/${_id}`).toPromise();
  }

  getHomeworks(){
    return this.http.get(this.urlHomeworks).toPromise();
  }

}
