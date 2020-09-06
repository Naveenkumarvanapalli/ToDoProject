import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Accounts } from '../accounts';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  isLoginError :boolean = false;

  constructor(private AdminService:AdminService,private route:Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }
  login() {
    this.AdminService.login(this.loginForm.value).then(res=>{
      console.log(res);
      if(res.length > 0){
        // sessionStorage.setItem("accountId",res.accountId);
        // sessionStorage.setItem("mailId",res.mailId);
        // sessionStorage.setItem("username",res.username);
        // sessionStorage.setItem("accountName",res.accountName);

        this.isLoginError = false;
        this.route.navigate(["/lists"]);
      }else{
        this.isLoginError = true;
      }

    }).catch(err=>{
      console.log(err);
      this.isLoginError = true;
    });
    this.loginForm.reset();
  }
  

}
