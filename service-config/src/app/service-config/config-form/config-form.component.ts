import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms';
import { ServiceConfigdataLayer } from '../../serviceLayer/storageLayer.service';
import { PopupModalComponent } from '../../popup-modal/popup-modal.component';
import { DataLayer } from '../../serviceLayer/dataLayer.service';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css']
})
export class ConfigFormComponent implements OnInit {
  model: any = {}
  editForm: boolean = false;
  serviceConfigForm: any = {};
  id: string;
  formEdit: boolean = false;
  @ViewChild('serviceForm') serviceForm: NgForm;
  @ViewChild(PopupModalComponent) popupModel: PopupModalComponent;
  serviceConfigData: Array<any> = [
    { 'service': 'Authentication Service' },
    { 'service': 'Steering Service' }
  ];
  resultConfirmation: Array<string> = ['Success only', 'Failure only', 'Success or failure', 'None'];
  sorCounter: Array<string> = ['Return 403 Error', 'Ignore request', 'Return custom error code']
  constructor(private datahandle: DataLayer, private route: ActivatedRoute, private serviceChecker: ServiceConfigdataLayer, private router: Router) { }

  ngOnInit() {
    this.initModel()
    this.route.params.subscribe((data: Params) => {
      this.patchFormModal(data)
    })
  }
  patchFormModal(data: Params) {
    let editData = this.serviceChecker.getEditServiceData(data['id']);
    if (editData && editData.hasOwnProperty('_id')) {
      this.editForm = true;
      this.id = data['id'];
      editData = this.serviceChecker.formatEditServiceData(editData);
      this.patchform(editData);
    }
    else if (!editData && !!data['id']) {
      this.router.navigate(['/home'])
    }
  }
  initModel() {
    this.model = {
      SessionTimeout: {
        'format': "Sec"
      }, 
      ServiceModes: {},
      SessionCachetimeout: {
        'format': "Sec"
      },
      'On Exceeding SoR counter': "",
      'Service Type': "",
      'Result Confirmation': '',
    }
  }
  patchform(editData: any) {
    this.model = editData;
    console.log('patch', editData)
  }
  checkSuccess(res) {
    if (res.code == 0) {
      this.formEdit = true
    }
    this.popupModel.click(res['message']);
  }

  onSubmit(f: NgForm) {
    console.log(this.model)
    let checkerData = { ...this.model };
    this.serviceConfigForm = this.serviceChecker.formatFormData(checkerData);
    if (this.editForm) {
      this.datahandle.updateCheckerData(this.serviceConfigForm, this.id).subscribe((data: any) => {
        this.serviceChecker.getAuthServiceData();
        this.checkSuccess(data)
      })
    } else {
      this.datahandle.addCheckerData(this.serviceConfigForm).subscribe((data: any) => {
        this.serviceChecker.getAuthServiceData();
        this.checkSuccess(data)
      })
    }
    this.initModel();
    this.editForm = false;
  }
  checkFolderName(foldername: string) {
    if (!!foldername) {
      return foldername.split(' ').join('-')
    }
  }
  // file upload
  fileChange(event) {
    console.log(event.target.name, this.checkFolderName(event.target.name))
    let folder = this.checkFolderName(event.target.name);
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append(folder, file, file.name);
      this.datahandle.uploadServiceFile(formData).subscribe((data) => {
        if (data.hasOwnProperty('success') && data['success']) {
          let field = data['field'];
          this.model[field] = data['actualPath'];
        }
      })
    }
  }
  // cancelEdit
  cancelEdit() {
    if (this.editForm) {
      this.router.navigate(['']);
    }
  }
  // filename
  checkFilename(filepath: string) {
    return this.serviceChecker.checkfilename(filepath)
  }
  // canDeactivate
  canDeactivate() {
    if (!this.formEdit && this.serviceForm.dirty) {
      return window.confirm('Discard changes?');
    }
    return true;
  }
  resetserviceMode() {
    // this.model = {};
    let resetField = this.serviceChecker.getresetField();
    for (let items in resetField) {      
      if (this.model.hasOwnProperty(items)) {
        this.model[items] = resetField[items];        
      }
    }    
  }
  resetServiceType() {
    let resetField = this.serviceChecker.resetOnServiceChange();
    for (let items in resetField) {      
      if (this.model.hasOwnProperty(items)) {
        this.model[items] = resetField[items];        
      }
    }    
  }
}
