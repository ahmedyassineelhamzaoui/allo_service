import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
  constructor(
    private dialogRef:MatDialogRef<EditserviceasadminComponent>,
    private fb: FormBuilder,
    ){}

  closeEditTagModal():void{
    this.dialogRef.close();
  }
  form = this.fb.group({
    serviceStatus: ['PENDING'],
  });
}
