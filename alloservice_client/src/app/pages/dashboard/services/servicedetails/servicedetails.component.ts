import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrl: './servicedetails.component.css'
})
export class ServicedetailsComponent {

  constructor(
    private dialogRef: MatDialogRef<ServicedetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string},

  ) { }
  closeModal():void{
    this.dialogRef.close();
  }
  ngOnInit() {
    console.log(this.data.id);
  }
}
