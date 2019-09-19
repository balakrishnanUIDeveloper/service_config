import { Component, OnInit } from '@angular/core';
import { UserLoginLayer } from '../serviceLayer/userLogin.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userLayer: UserLoginLayer) { }
  isLogged: boolean = false;
  ngOnInit() {
    // this.isLogged = this.userLayer.checkIsLogged()
    this.userLayer.loginData.subscribe((data: boolean) => {
      this.isLogged = data;
    })
  }
  logout() {
    this.userLayer.logOut();
  }

}
