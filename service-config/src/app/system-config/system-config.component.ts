import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { SystemConfigStorageLayer } from '../serviceLayer/systemConfigLayer.service';
import { DataLayer } from '../serviceLayer/dataLayer.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceConfigdataLayer } from '../serviceLayer/storageLayer.service';
@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.css']
})
export class SystemConfigComponent implements OnInit {
  @ViewChild('systemConfigForm') systemConfigForm: NgForm;
  @ViewChild(PopupModalComponent) popupModel: PopupModalComponent;
  sysConfig: {} = {};
  rangeInfoData: [] = [];
  formEdit: boolean = false;
  editRangeInfo: boolean = false;
  editRange: any;
  constructor(private sysDataLayer: SystemConfigStorageLayer, private datahandle: DataLayer, private serviceLayer: ServiceConfigdataLayer) { }

  ngOnInit() {
    this.sysDataLayer.getsysConfigData();
    this.initHandle();
    this.sysDataLayer.systemServiceHandle.subscribe((data: any) => {
      if (data.length > 0) {
        this.sysConfig = data[0];
        this.checkRadio()
      }
      else {
        this.initHandle();
      }
    })

  }
  initHandle() {
    this.sysConfig['Range choice'] = "Range";
    this.sysConfig['RangeInfo'] = [];
    this.sysConfig['Thread count'] = 100;
    this.sysConfig['Queue Size'] = 8192;
  }
  cancelEdit() {
    this.sysConfig['RangeInfo'] = [];
    this.sysConfig['RangeInfo'] = [...this.editRange]
    this.editRange = [];
    this.editRangeInfo = false;
    this.resetRangeInfo();
  }
  editid(index: string) {
    this.editRange = [...this.sysConfig['RangeInfo']];
    let edit = this.sysConfig['RangeInfo'].splice(index, 1);
    console.log(this.editRange)
    // console.log(edit);
    if (edit.length > 0) {
      this.editRangeInfo = true
      if (!!edit[0]['Start'] && !!edit[0]['End']) {
        this.sysConfig['Start'] = edit[0]['Start'];
        this.sysConfig['End'] = edit[0]['End'];
        this.sysConfig['Range choice'] = "Range";
      }
      if (!!edit[0]['Pattern']) {
        this.sysConfig['Pattern'] = edit[0]['Pattern'];
        this.sysConfig['Range choice'] = "Pattern";
      }
    }
  }
  assignDeleteID(index: string) {
    this.sysConfig['RangeInfo'].splice(index, 1)
  }
  checkSuccess(res) {
    if (res.code == 0) {
      this.formEdit = true
    }
    this.popupModel.click(res['message']);
  }
  resetRangeInfo() {
    this.systemConfigForm.controls['rangeInfogroup'].reset();
  }
  addRangeInfo(f: NgModelGroup) {
    let tData = [];
    for (let checkData in f.value) {
      if (!!f.value[checkData]) {
        tData.push(checkData);
      }
    }
    if (tData.length > 0) {
      this.sysConfig['RangeInfo'].push(f.value);
      this.resetRangeInfo();
      this.editRangeInfo = false;
      this.editRange = []
    }
  }
  checkRadio() {
    let f = this.sysConfig['Range choice']
    if (f == "Range") {
      this.sysConfig['Pattern'] = "";
    }
    else {
      this.sysConfig['Start'] = "";
      this.sysConfig['End'] = "";
    }
  }
  onSubmit(f: NgForm) {
    if (this.sysConfig['_id']) {
      this.datahandle.updateSysConfigData(this.sysConfig, this.sysConfig['_id']).subscribe((data: any) => {
        this.sysDataLayer.getsysConfigData();
        this.checkSuccess(data);
      })
    }
    else {
      this.datahandle.addSysConfigData(this.sysConfig).subscribe((data: any) => {
        this.sysDataLayer.getsysConfigData();
        this.checkSuccess(data);
      })
    }
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();

      formData.append('uploadFile', file, file.name);
      this.datahandle.uploadFile(formData).subscribe((data) => {
        if (data.hasOwnProperty('success') && data['success']) {
          this.sysConfig['SSL Certificate'] = data['actualPath'];
        }
      })
    }
  }
  checkFilename(filepath: string) {
    return this.serviceLayer.checkfilename(filepath)
  }
  // can deactivate 
  canDeactivate() {
    if (!this.formEdit && this.systemConfigForm.dirty) {
      return window.confirm('Discard changes?');
    }
    return true;
  }

}
