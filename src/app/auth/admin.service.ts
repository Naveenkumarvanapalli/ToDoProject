import { Injectable } from '@angular/core';
import { Accounts } from './accounts';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import {environment} from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  envUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createUserServiceCall(data:any){
    return this.http.post<Accounts[]>(this.envUrl+'accounts',data).toPromise().then(res =>{
      return res;
    });
  }

  getAllAccounts(){
    this.http.get<Accounts[]>(this.envUrl+"accounts").toPromise().then(res =>{
      return res;
    }).catch(res =>{
      return ("Unable to get the users :" + res)
    });
  }
  login(data:any){
    return this.http.get<Accounts[]>(this.envUrl+"accounts?username=" + data.userName +"&password=" + data.password).toPromise().then(res=>{
      return res;
    })
  }

  getSingleAccount(mail: String) {
    this.http.get<Accounts[]>(this.envUrl+"accounts?mailId=" + mail).toPromise().then(res => {
      if(res.length == 0){
        return ("User Not Exits");
      }else{
        return res;
      }
    }).catch(res => {
      return ("Unable to get the user info :" + res)
    });
  }

  deleteAccount(id: Number) {
    this.http.delete<Accounts[]>(this.envUrl+"accounts/" + id).toPromise().then(res => {
      return res;
    }).catch(res => {
      return ("Unable to Delete the user :" + res);
    });
  }

  updateAccount( data: any) {
    this.http.put<Accounts[]>(this.envUrl+"accounts/" + data.id, data).toPromise().then(res => {
      return res;
    }).catch(res => {
      return ("Unable to Update the user :" + res);
    });
  }
}
