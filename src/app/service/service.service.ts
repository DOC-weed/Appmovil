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
    return this.http.post(this.urlUsers + '/', User);
  }

//crear cursos
  postCourse(Courseinfo: Course){
    return this.http.post(this.urlCourses , Courseinfo);
  }

//Obtener curso por id
  GetCourseId(_id: string){
      return this.http.get(this.urlCourses + `/${_id}`);
  }

  //crear homework
  postHomework(Homework: homework){
    console.log(Homework);

    return this.http.post(this.urlHomeworks , Homework);

  }
//Obtener homework por id
  GetHomeworkId(_id: string){
        return this.http.get(this.urlHomeworks + `/${_id}`);
  }

}
