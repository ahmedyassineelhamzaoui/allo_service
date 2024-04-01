import { Component,Inject } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EdituserRequestInterface } from '../../../shared/types/edituserRequest.interface';
import { PersistanceService } from '../../../../auth/shared/services/persistance.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  errorMessage: string = '';
  successMessage: string = '';
  role : string = '';
  statues = [
    { value: 'ACTIVE', name: 'Active' },
    { value: 'INACTIVE', name: 'Inactive' },
  ]
  roles = [
    { value: 'ROLE_SUPER_ADMIN', authority: 'Super admin' },
    { value: 'ROLE_ADMIN', authority: 'Admin' },
    { value: 'ROLE_WORKER', authority: 'Worker' },
    { value: 'ROLE_USER', authority: 'User' },
  ]
  form = this.fb.group({
    status: ['ACTIVE'],
    role: ['ROLE_USER']
  });

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<EdituserComponent>,
    private fb: FormBuilder,
    private persistenceService:PersistanceService,
    @Inject(MAT_DIALOG_DATA) public data: { status: string, id: string},
  ) { 
    
  }
  ngOnInit() {
    this.getUser();
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
        console.log(error);
        this.successMessage = '';
        this.errorMessage = this.getFirstError(error.error.details);
      }
    );
  }
  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }
  getUser(){
    const token = this.persistenceService.get('accessToken')!;
    this.userService.getAuthenticUser(token).subscribe(
      (response) => {
        this.role = response.details['user'].authorities[0].authority;
        console.log(response.details['user'].authorities[0].authority)
        this.form = this.fb.group({
          status: [this.data.status],
          role: [response.details['user'].authorities[0].authority]
        });
      },(error)=>{
        console.log(error);
      }
    );
  }
}
