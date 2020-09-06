import { Injectable } from '@angular/core';
import { DoList} from './doList';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  envUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAllAccounts(data:any){
    return this.http.get<DoList[]>(this.envUrl+"doLists?_sort=id&_order=desc&accountId=" + data,httpOptions).toPromise().then(res =>{
      return res;
    });
  }

  createTask(data:any){
    return this.http.post<DoList[]>(this.envUrl+"doLists?_sort=id&_order=desc",data,httpOptions).toPromise().then(res=>{
      return res
    });
  }

  updateTask(data:any,id:Number){
    return this.http.put<DoList[]>(this.envUrl+"doLists/" + id, data).toPromise().then(res => {
      return res;
    })
  }

  deleteTask(id: Number) {
    return this.http.delete<DoList[]>(this.envUrl+"doLists/" + id).toPromise().then(res => {
      return res;
    })
  }
}
