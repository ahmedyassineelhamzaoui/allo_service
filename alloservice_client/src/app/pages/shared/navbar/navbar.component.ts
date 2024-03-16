import { Component } from '@angular/core';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../auth/shared/services/persistance.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dropdownOpen = false;
  userName: string ="";
  constructor(private persistanceService: PersistanceService, private router: Router,private toastr: ToastrService) {}
  ngOnInit() {
   this.userName =  this.persistanceService.getUsername('name')!;
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
