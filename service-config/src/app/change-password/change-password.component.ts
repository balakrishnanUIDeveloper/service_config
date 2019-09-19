import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginLayer } from '../serviceLayer/userLogin.service';
import { DataLayer } from '../serviceLayer/dataLayer.service';
import { WebStorages } from '../serviceLayer/webstorage.service';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userLayer: UserLoginLayer, private dataLayer: DataLayer, private webstorages: WebStorages) { }
  @ViewChild('changePwd') changePwd: NgForm;
  profileInfo: {};
  pwdUser: {
    oldPassword: "",
    password: ""
  };
  formErr: {
    err: '',
    success: ''
  };
  initForm() {
    this.pwdUser = {
      oldPassword: "",
      password: ""
    }
  }
  errInit() {
    this.formErr = {
      err: '',
      success: ''
    };
  }
  ngOnInit() {
    this.initForm();
    this.errInit();
    this.userLayer.loginUserData.subscribe((data: any) => {
      if (data.hasOwnProperty('success')) {
        this.webstorages.setLocalSt('profileId', data.user._id);
      }
    })
    this.userLayer.checkDefaultPwd.subscribe((data: boolean) => {
      if (data) {
        this.openChangePwd();
      }
    })
  }
  openChangePwd() {
    $('#changePasswordModal').modal();
    this.resetForm();
    this.initForm();
  }
  resetForm() {
    this.initForm();
    this.changePwd.reset();
  }
  onSubmit(f: NgForm) {
    let id = this.webstorages.getLocalSt('profileId');
    this.dataLayer.changePwd(id, this.pwdUser).subscribe((data: any) => {
      if (!data.success) {
        this.formErr['err'] = data.msg;
      }
      else {
        this.initForm();
        this.resetForm()
        this.formErr['err'] = '';
        this.formErr['success'] = data.msg;
      }
    })
  }
}
