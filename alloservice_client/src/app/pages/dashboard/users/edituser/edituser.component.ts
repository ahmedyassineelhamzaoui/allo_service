import { Component } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  errorMessage: string = '';
  successMessage: string = '';

  status = [
    { value: 'ACTIVE', name: 'Active' },
    { value: 'INACTIVE', name: 'Inactive' },
  ]

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<EdituserComponent>,
    private fb: FormBuilder,
  ) { }

  closeEditModal() {
    this.errorMessage = '';
    this.successMessage = '';
    this.dialogRef.close();
  }
}
