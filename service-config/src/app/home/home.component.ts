import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceConfigdataLayer } from '../serviceLayer/storageLayer.service';
import { DataLayer } from '../serviceLayer/dataLayer.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serviceConfigData: Array<any> = [];
  deleteID: string = "";
  @ViewChild(PopupModalComponent) popupModel: PopupModalComponent;
  constructor(private serviceLayer: ServiceConfigdataLayer, private datahandle: DataLayer) { }

  ngOnInit() {
    this.serviceLayer.getAuthServiceData();
    this.serviceLayer.authServiceData.subscribe((data: Array<any>) => {
      this.serviceConfigData = data;
    })
  }
  checkSuccess(res) {
    this.popupModel.click(res['message']);
  }

  confirmDelete() {
    if (this.deleteID != "") {
      this.datahandle.deleteCheckerData(this.deleteID).subscribe((data: any) => {
        this.serviceLayer.getAuthServiceData();
        this.checkSuccess(data);
      })
    }
  }
  assignDeleteID(id: string) {
    this.deleteID = id;
    $("#confirmDelete").modal('show');
  }
  clearDelete() {
    this.deleteID = "";
  }
  checkFilename(filepath: string) {
    return this.serviceLayer.checkfilename(filepath)
  }
}
