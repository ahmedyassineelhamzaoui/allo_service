import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(private sharedService:SharedService) { }

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
}
