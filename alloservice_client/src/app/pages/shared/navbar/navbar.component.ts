import { Component } from '@angular/core';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../auth/shared/services/persistance.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  dropdownOpen = false;
  userName: string ="";
  pictureLink:string = '';

  constructor(private persistanceService: PersistanceService,
     private userService: UserService,
     private authService: AuthService,
     private router:Router) {}

  ngOnInit() {
    this.userService.pictureLink$.subscribe(pictureLink => {
      this.pictureLink = pictureLink;
    });
    this.getPictureLink();
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  getPictureLink():void{

      const token = this.persistanceService.get('accessToken')!;
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
  logout():void{
    
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login']);
     
  }
}
