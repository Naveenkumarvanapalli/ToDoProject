import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user_data:any;
  emailId:any;

  constructor( private AdminService:AdminService) {
    this.user_data = new FormGroup({
      accountName: new FormControl('', Validators.required),
      mailId: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
      active: new FormControl(false, Validators.required),
      createdBy: new FormControl('Admin', Validators.required),
      createdDate: new FormControl(''),
      modifiedBy: new FormControl('Admin', Validators.required),
      modifiedDate: new FormControl('')
    });
    this.emailId = new FormGroup({
      mail: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

  clickBtn(){
    this.user_data.patchValue({createdDate:new Date()});
    this.user_data.patchValue({modifiedDate:new Date()});
    this.AdminService.createUserServiceCall(this.user_data.value).then(res =>{
      this.user_data.reset();
      this.user_data.patchValue({ active: true,createdBy:"Admin",modifiedBy:"Admin"});
    }).catch(error=>{
      console.log(error);
    });
  }

}
