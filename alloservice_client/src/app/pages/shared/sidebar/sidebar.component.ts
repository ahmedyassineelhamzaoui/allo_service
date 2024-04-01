import { Component } from '@angular/core';
import { PersistanceService } from '../../../auth/shared/services/persistance.service';
import { UserService } from '../user.service';
import { error } from 'console';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  pictureLink:string = '';
  userName:string = '';
  constructor(
    private persistenceService:PersistanceService,
    private userService:UserService,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.userService.pictureLink$.subscribe(pictureLink => {
      this.pictureLink = pictureLink;
    });
    this.userService.userName$.subscribe(userName => {
      this.userName = userName;
    });
    
  }
  getUserInfo():void{
    const token = this.persistenceService.get('accessToken')!;
    if(token){
      this.userService.getAuthenticUser(token).subscribe(
        (response) => {
            this.pictureLink = response.details['user'].picture.link;
        },(error)=>{
          console.log(error);
        }
      );
    }
  }
  hasRole(role: string): boolean {
    return this.sharedService.getRoles().some(r => r.role === role);
  }
}
