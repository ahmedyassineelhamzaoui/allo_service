import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edittag',
  templateUrl: './edittag.component.html',
  styleUrl: './edittag.component.css'
})
export class EdittagComponent {

  constructor(
    private dialogRef:MatDialogRef<EdittagComponent>
  ){
  }
  closeEditTagModal():void{
    this.dialogRef.close();
  }
}
