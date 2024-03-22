import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddserviceComponent } from './addservice/addservice.component';
import { ServiceService } from '../../shared/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  isLoading:boolean = false;
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
      // this.getAllServices();
   });
  }

  getAllServices() {
    this.isLoading = true;
    this.serviceService.getAllServices().subscribe(
    (response:any)=>{
      this.services = response.details.services;
    },(error)=>{
      this.errorMessage = error.error.message;
    });
  }
}
