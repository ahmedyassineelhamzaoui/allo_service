import { Component } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequestInterface } from '../../../shared/types/userRequest.interface';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {


  
  errorMessage: string = '';
  successMessage: string = '';
  details: string='';
  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<AdduserComponent>,
    private fb: FormBuilder,
  ) { }
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email:  ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['ROLE_ADMIN'],
  });
  roles = [
    { value: 'ROLE_SUPER_ADMIN', name: 'Super Admin'},
    { value: 'ROLE_ADMIN', name: 'Admin' },
    { value: 'ROLE_USER', name: 'User' },
    { value: 'ROLE_WORKER', name: 'Worker' },
  ]

  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }

  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
  
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }

  closeUserModal() {
    this.errorMessage = '';
    this.successMessage = '';
    this.dialogRef.close();
  }
  saveUser() {
    this.markFormControlsAsTouched(this.form);
    if (this.form.valid) {
      const request: UserRequestInterface = {
        firstName: this.form.get('firstName')?.value || '',
        lastName: this.form.get('lastName')?.value || '',
        email: this.form.get('email')?.value || '',
        password: this.form.get('password')?.value || '',
        role: this.form.get('role')?.value || '',
      };
      this.userService.addUser(request).subscribe(
        (response: any) => {
          this.errorMessage = '';
          this.successMessage = 'User added successfully';
          this.form.reset();
        },
        (error:HttpErrorResponse) => {
          this.errorMessage = error.error.detalis;
          this.successMessage = '';
        }
      );
    }
  }
}
