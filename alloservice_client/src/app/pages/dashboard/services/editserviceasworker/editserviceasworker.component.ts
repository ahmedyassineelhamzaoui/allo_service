import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editserviceasworker',
  templateUrl: './editserviceasworker.component.html',
  styleUrl: './editserviceasworker.component.css'
})
export class EditserviceasworkerComponent {

  constructor(
    private dialogRef:MatDialogRef<EditserviceasworkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string}
  ) { }

  ngOnInit():void{
    
  }

  closeEditServiceModal():void{
    this.dialogRef.close();
  }

}
