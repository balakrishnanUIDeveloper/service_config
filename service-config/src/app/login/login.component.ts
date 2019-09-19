import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataLayer } from '../serviceLayer/dataLayer.service';
import { Router } from '@angular/router';
import { WebStorages } from '../serviceLayer/webstorage.service';
import { UserLoginLayer } from '../serviceLayer/userLogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;  
  user = {
    username: "",
    password: ""
  }
  formErr = {
    username: "",
    password: "",
    loginFail: ""
  }
  constructor(private datalayer: DataLayer, private router: Router, private webstorages: WebStorages, private userLayer: UserLoginLayer) { }
  ngOnInit() {
    this.checkUsertoRegister()
    if (this.webstorages.getLocalSt('JWT')) {
      this.checkLogged();
    }
    this.userLayer.loginUserData.subscribe((data: any) => {
      if (data.hasOwnProperty('success') && data.success) {
        this.webstorages.setLocalSt('profileId', data.user._id);
        this.userLayer.setLoggedIn();
        this.router.navigate(['/home']);
      }
    })
  }
  checkUsertoRegister() {
    this.userLayer.checkIfUserAvailable();
  }
  checkDefaultPwd() {
    if (this.user['password'] == "changeme") {
      this.userLayer.checkDefaultPwd.next(true);
    }
  }
  submitForm(f: NgForm) {
    this.datalayer.login(this.user).subscribe((data: any) => {
      if (data['success'] && data.hasOwnProperty('token')) {
        this.webstorages.setLocalSt('JWT', data.token);
        this.userLayer.setLoggedIn();
        this.checkLogged();
        this.checkDefaultPwd()
        this.router.navigate(['/home']);
      }
      else if (data['msg']) {
        this.formErr.loginFail = data['msg'];
      }
    })
  }
  checkLogged() {
    this.userLayer.checkuserLog();
  }
}
