import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {
  @Input('navOut') navOut: string;
  modelDisplayData: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  click(modelData: string) {
    this.modelDisplayData = modelData;

    $("#myModal").modal('show');
  }
  navigateTo() {
    if (this.navOut) {
      this.router.navigate([this.navOut])
    }
  }
}
