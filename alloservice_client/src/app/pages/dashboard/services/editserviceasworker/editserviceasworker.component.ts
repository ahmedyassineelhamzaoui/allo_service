import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../../shared/service.service';
import { ResponseWithDetailsInterface } from '../../../../auth/shared/types/responseWithDetails.interface';
import {Observable} from 'rxjs';
import { ServiceResponseInterface } from '../../../shared/types/serviceResponse.interface';

@Component({
  selector: 'app-editserviceasworker',
  templateUrl: './editserviceasworker.component.html',
  styleUrl: './editserviceasworker.component.css'
})
export class EditserviceasworkerComponent {

  service : ServiceResponseInterface = {
    id: '',
    user: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: []
    },
    title: '',
    price: 0,
    servicePicture: {
      id: '',
      link: ''
    },
    description: '',
    tags: [],
    availability: [],
    serviceStatus: ''
  };
  constructor(
    private dialogRef:MatDialogRef<EditserviceasworkerComponent>,
    private serviceService:ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string}
  ) { }

  ngOnInit():void{
    
  }

  closeEditServiceModal():void{
    this.dialogRef.close();
  }
  getServiceById(id:string){
      this.serviceService.getServiceById(id).subscribe(
        (response:any) =>{
          console.log(response);
        },
        (error)=>{
          console.log(error);
        }
      )
  }
}
