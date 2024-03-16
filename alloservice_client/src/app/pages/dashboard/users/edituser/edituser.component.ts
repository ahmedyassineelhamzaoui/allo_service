import { Component,Inject } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  errorMessage: string = '';
  successMessage: string = '';

  statues = [
    { value: 'ACTIVE', name: 'Active' },
    { value: 'INACTIVE', name: 'Inactive' },
  ]

  form = this.fb.group({
    status: ['ACTIVE']
  });

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<EdituserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { status: string },
  ) { 
    this.form = this.fb.group({
      status: [this.data.status]
    });
  }
  
  closeEditModal() {
    this.errorMessage = '';
    this.successMessage = '';
    this.dialogRef.close();
  }
  editUser() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
