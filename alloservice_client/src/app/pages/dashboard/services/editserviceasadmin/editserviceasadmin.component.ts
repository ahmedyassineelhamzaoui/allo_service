import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../../shared/service.service';
import { RequestStatusInterface } from '../../../shared/types/requestStatus.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editserviceasadmin',
  templateUrl: './editserviceasadmin.component.html',
  styleUrl: './editserviceasadmin.component.css'
})
export class EditserviceasadminComponent {
  errorMessage:string = '';
  serviceStatus = [
    {name:'approved',value:'APPROVED'},
    {name:'rejected',value:'NOT_APPROVED'}
  ]
  form = this.fb.group({
    serviceStatus: ['PENDING'],
  });
  constructor(
    private dialogRef:MatDialogRef<EditserviceasadminComponent>,
    private fb: FormBuilder,
    private serviceService: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string,status: string},
    private toastr:ToastrService
    ){
      this.form = this.fb.group({
        serviceStatus: [this.data.status]
      });
    }

  closeEditTagModal():void{
    this.dialogRef.close();
  }
  editServiceStatus():void{
    const request:RequestStatusInterface = {
      serviceStatus: this.form.get('serviceStatus')?.value || 'PENDING'
    }
    this.serviceService.editServiceAsAdmin(this.data.id,request).subscribe(
      (response:any)=>{
        console.log(response);
        this.toastr.success('Service status updated successfully');
        this.dialogRef.close();
      },
      (error)=>{
        this.errorMessage = error.error.message;
        console.log(error);
      }
    )
  }
  closeAlert():void{
    this.errorMessage = '';
  }
}
