import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../shared/user.service';
import { UserInterface } from '../../../shared/types/user.interface';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent {
  constructor(
    private dialogRef: MatDialogRef<UserdetailsComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string},
  ){
  }
  user: UserInterface = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services :[],
    authorities: [],
    picture: {
      id: '',
      link: ''
    },
    gender: '',
    location: '',
    card: {
      id: '',
      cardNumber: '',
      cardType: '',
      link: '',
    }
  };
  
  ngOnInit() {
    console.log('ok');
    this.getUserInfo(this.data.id);
  }
  transformRole(role: string) {
    return role.replace('ROLE_','').replace('_',' ').toLowerCase();
  }
  closeUserDetailsModal() {
    this.dialogRef.close();
  }
  getUserInfo(id: string) {
    this.userService.getUserInfo(id).subscribe(
      (response) => {
        this.user = response.details['user'];
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
