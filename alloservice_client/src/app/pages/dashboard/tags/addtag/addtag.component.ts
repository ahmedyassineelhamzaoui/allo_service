import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrl: './addtag.component.css'
})
export class AddtagComponent {

  constructor(
    private dialogRef:MatDialogRef<AddtagComponent>
  ){
  }
  closeAddTagModal():void{
    this.dialogRef.close();
  }
}
