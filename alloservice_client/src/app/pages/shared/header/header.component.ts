import { Component } from '@angular/core';
import { AuthService } from '../../../auth/shared/services/auth.service';
import {  map } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   constructor(private authService: AuthService) { }
  
   isUserAuthenticated = this.authService.isUserAuthenticated();
  
}
