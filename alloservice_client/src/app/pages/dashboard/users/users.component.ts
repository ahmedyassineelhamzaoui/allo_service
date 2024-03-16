import { Component,Inject } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { PageEvent } from '@angular/material/paginator';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { EdituserComponent } from './edituser/edituser.component';

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
  openEditModal(status:any) {
    const dialogRef = this.dialog.open(EdituserComponent,{
      data: {
        status: status
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
       this.users = [];
       this.getAllUsers();
    });
    
  }

  hasRole(role: string): boolean {
    return this.sharedService.getRoles().some(r => r.role === role);
  }

  hasPermission(permission: string): boolean {
    return this.sharedService.getRoles().some(r => r.permissions.includes(permission));
  }
}
