import { Component } from '@angular/core';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { map } from 'rxjs';
import { SharedService } from '../shared.service';
import { PersistanceService } from '../../../auth/shared/services/persistance.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  value:  any;
  isUserAuthenticated: boolean = false;
  canShowDashboard: boolean = false;
  token: string = '';
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private persistanceService: PersistanceService
  ) {
    const token = this.persistanceService.get('accessToken')!;
    if(token){
      this.authService.isTokenValid().subscribe((value) => {
        this.isUserAuthenticated = value;
        this.canShowDashboard = this.sharedService.hasRole("ROLE_ADMIN") || this.sharedService.hasRole("ROLE_SUPER_ADMIN") || this.sharedService.hasRole("ROLE_WORKER");

      });
    }
  }
}
