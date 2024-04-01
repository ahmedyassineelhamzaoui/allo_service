import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddserviceComponent } from './addservice/addservice.component';
import { ServiceService } from '../../shared/service.service';
import { ServicedetailsComponent } from './servicedetails/servicedetails.component';
import { EditserviceasadminComponent } from './editserviceasadmin/editserviceasadmin.component';
import { EditserviceasworkerComponent } from './editserviceasworker/editserviceasworker.component';
import Swal from 'sweetalert2';
import { ResponseWithoutDetailsInterface } from '../../../auth/shared/types/responseWithoutDetails.interface';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  isLoading:boolean = true;
  errorMessage:string = '';
  services:any[] = [];
  pageSize:number = 5;
  currentPageIndex:number = 0;

  constructor(
    private sharedService:SharedService,
    private dialog:MatDialog,
    private serviceService:ServiceService
  ) { }

  ngOnInit(){
    this.getAllServices();
  }

  openEditServiceAsAdmin(id:string,status:string):void{
    const dialog = this.dialog.open(EditserviceasadminComponent,{
      data:{
        id: id,
        status :status
      }
    });
    dialog.afterClosed().subscribe(()=>{
      this.services = [];
      this.getAllServices();
    });
  }
  openEditServiceAsWWorker(id:string):void{
    const dialog = this.dialog.open(EditserviceasworkerComponent,{
      data:{
        id: id
      }
    });
    dialog.afterClosed().subscribe(()=>{
      this.services = [];
      this.getAllServices();
    });
  }
  hasRole(role: string): boolean {
    return this.sharedService.getRoles().some(r => r.role === role);
  }

  hasPermission(permission: string): boolean {
    return this.sharedService.getRoles().some(r => r.permissions.includes(permission));
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.currentPageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
  }
  openAddServiceModal() {
   const dialog = this.dialog.open(AddserviceComponent);
   dialog.afterClosed().subscribe(()=>{
      this.services = [];
      this.getAllServices();
   });
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe(
    (response:any)=>{
      this.services = response.details.services;
      this.isLoading = false;
    },(error)=>{
      this.errorMessage = error.error.message;
      this.isLoading = false;
    });
  }
  showMoreDetails(id:string){
    this.dialog.open(ServicedetailsComponent,{
      data:{
        id: id
      }
    });
  }
  deleteService(id:string) {
    Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this service!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.serviceService.deleteService(id).subscribe(
          (response:ResponseWithoutDetailsInterface) => {
            this.services = [];
            this.getAllServices();
            Swal.fire(  
              'Deleted!',  
              'service has been deleted successfuly.',  
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
          'info'  
        )  
      }  
    })  
  }
  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }
}
