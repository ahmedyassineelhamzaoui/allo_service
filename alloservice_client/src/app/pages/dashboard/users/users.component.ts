import { Component,Inject } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { PageEvent } from '@angular/material/paginator';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { EdituserComponent } from './edituser/edituser.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  constructor(
    private userService: UserService,
    private dialog:MatDialog,
    private sharedService: SharedService
    ) { }
 
  isLoading:boolean = false;
  errorMessage:string = '';
  users:any[] = [];
  pageSize:number = 5;
  currentPageIndex:number = 0;

  ngOnInit() {
    this.getAllUsers();
  }

  openAddUserrModal() {
    const dialogRef = this.dialog.open(AdduserComponent);
    dialogRef.afterClosed().subscribe(()=>{
       this.users = [];
       this.getAllUsers();
    });
  }
  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response:any) => {
        this.isLoading = false;
        this.users.push(...response.details.users);
        console.table(this.users);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.currentPageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
  }
  openEditModal(status:string,id:string) {
    const dialogRef = this.dialog.open(EdituserComponent,{
      data: {
        status: status,
        id:id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
       this.users = [];
       this.getAllUsers();
    });
    
  }

  deleteUser(id:string) {

    Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.userService.deleteUser(id).subscribe(
          (response) => {
            this.users = [];
            this.getAllUsers();
            Swal.fire(  
              'Deleted!',  
              'user has been deleted successfuly.',  
              'success'  
            ) 
          },
          (error) => {
            console.log(error);
            Swal.fire(  
              'Error!',  
              this.getFirstError(error.error.details),  
              'error'  
            ) 
          }
        );
         
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'your data are safe',  
          'error'  
        )  
      }  
    })  

    
  }
  
  hasRole(role: string): boolean {
    return this.sharedService.getRoles().some(r => r.role === role);
  }

  hasPermission(permission: string): boolean {
    return this.sharedService.getRoles().some(r => r.permissions.includes(permission));
  }
}
