import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editserviceasadmin',
  templateUrl: './editserviceasadmin.component.html',
  styleUrl: './editserviceasadmin.component.css'
})
export class EditserviceasadminComponent {

  serviceStatus = [
    {name:'pending',value:'PENDING'},
    {name:'approved',value:'APPROVED'},
    {name:'rejected',value:'NOT_APPROVED'}
  ]
  form = this.fb.group({
    serviceStatus: ['PENDING'],
  });
  constructor(
    private dialogRef:MatDialogRef<EditserviceasadminComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: string,status: string},
    ){
      this.form = this.fb.group({
        serviceStatus: [this.data.status]
      });
    }

  closeEditTagModal():void{
    this.dialogRef.close();
  }
  
}
