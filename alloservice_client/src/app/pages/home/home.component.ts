import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResponseWithDetailsInterface } from '../../auth/shared/types/responseWithDetails.interface';
import { ServiceResponseInterface } from '../shared/types/serviceResponse.interface';
import { AuthService } from '../../auth/shared/services/auth.service';
import { SharedService } from '../shared/shared.service';
import { PersistanceService } from '../../auth/shared/services/persistance.service';
import { ServicedetailsComponent } from '../dashboard/services/servicedetails/servicedetails.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  services: ServiceResponseInterface[] = [];

  value:  any;
  isUserAuthenticated: boolean = false;
  token: string = '';

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private persistanceService: PersistanceService,
    private dialog:MatDialog
  ) {
    const token = this.persistanceService.get('accessToken')!;
    if(token){
      this.authService.isTokenValid().subscribe((value) => {
        this.isUserAuthenticated = value;
      });
    }
  }

  ngOnInit() {
    this.serviceService.getLatestSixServices().subscribe(
      (data : ResponseWithDetailsInterface) => {
      this.services = data.details['services'];
    },(error) => {
      console.log(error);
    });
  }
  showServiceDetails(id:string){
    this.dialog.open(ServicedetailsComponent,{
      data:{
        id: id
      }
    });
  }


  
}
