import { Component,Inject } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EdituserRequestInterface } from '../../../shared/types/edituserRequest.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: { status: string, id: string},
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

    const request : EdituserRequestInterface = {
      id: this.data.id,
      status: this.form.get('status')?.value || 'ACTIVE'
    }
    this.userService.updateUser(request).subscribe(
      (response) => {
        this.errorMessage = '';
        this.successMessage = "accound status has been updated successfully";
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = this.getFirstError(error.error.details);
      }
    );
  }
  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }
}
