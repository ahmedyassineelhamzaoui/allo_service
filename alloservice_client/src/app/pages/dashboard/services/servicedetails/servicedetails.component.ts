import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrl: './servicedetails.component.css'
})
export class ServicedetailsComponent {

  constructor(
    private dialogRef: MatDialogRef<ServicedetailsComponent>
  ) { }
  closeModal():void{
    this.dialogRef.close();
  }
}
