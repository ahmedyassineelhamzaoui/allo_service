import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editserviceasadmin',
  templateUrl: './editserviceasadmin.component.html',
  styleUrl: './editserviceasadmin.component.css'
})
export class EditserviceasadminComponent {

  constructor(private dialogRef:MatDialogRef<EditserviceasadminComponent>){}

  closeEditTagModal():void{
    this.dialogRef.close();
  }
}
