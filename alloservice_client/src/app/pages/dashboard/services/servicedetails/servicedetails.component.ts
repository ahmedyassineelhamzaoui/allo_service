import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../../shared/service.service';
import { ServiceResponseInterface } from '../../../shared/types/serviceResponse.interface';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrl: './servicedetails.component.css'
})
export class ServicedetailsComponent {
  service:ServiceResponseInterface = {} as ServiceResponseInterface;
  constructor(
    private dialogRef: MatDialogRef<ServicedetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string},
    private serviceService: ServiceService
  ) { }
  closeModal():void{
    this.dialogRef.close();
  }
  ngOnInit() {
    this.serviceService.getServiceDetails(this.data.id).subscribe(
    (response:any)=>{
      this.service = response.details.service;
      console.log(this.service);
    },
    (error)=>{
      console.log(error);
    }
  )}
}
