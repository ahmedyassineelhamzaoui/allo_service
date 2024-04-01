import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../../shared/service.service';
import { ResponseWithDetailsInterface } from '../../../../auth/shared/types/responseWithDetails.interface';
import {Observable, forkJoin} from 'rxjs';
import { ServiceResponseInterface } from '../../../shared/types/serviceResponse.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TagsService } from '../../../shared/tags.service';
import { TagInterface } from '../../../shared/types/tag.interface';
import { UpdateServiceRequestInterface } from '../../../shared/types/updateServiceRequest.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editserviceasworker',
  templateUrl: './editserviceasworker.component.html',
  styleUrl: './editserviceasworker.component.css'
})
export class EditserviceasworkerComponent {

  form: FormGroup = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(2)]],
    description: ['',[Validators.required, Validators.minLength(5)]],
    price : ['',[Validators.required, Validators.min(0)]],
    servicePicture: ['',Validators.required],
  });

  isSubmiting:boolean = false;
  file!: File;
  errorMessage = '';
  tags : TagInterface[] = [];
  selectedTag!: string ;
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
    private tagService:TagsService,
    private fb:FormBuilder,
    private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string}
  ) { }

  

  ngOnInit(): void {
    this.getAllTags();
    this.getServiceById(this.data.id);
    
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
  updateService(id:string):void{
    this.markFormControlsAsTouched(this.form);
    if (this.form.valid) {
      this.isSubmiting = true;
      const request: UpdateServiceRequestInterface = {
        title: this.form.get('title')?.value || '',
        description: this.form.get('description')?.value || '',
        price: Number(this.form.get('price')?.value),
        picture_id: id
      };
      if (!this.file) {
        this.file = new File([''], 'empty');
      }
      this.serviceService.editServiceAsWorker(this.data.id, request, this.file).subscribe(
        (response: ResponseWithDetailsInterface) => {
          this.isSubmiting = false;
          this.toaster.success('Service updated successfully');
        },
        (error: HttpErrorResponse) => {
          this.isSubmiting = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  selectFile(event: any) {
    this.file = event.target.files.item(0);
  }
  
  closeEditServiceModal():void{
    this.dialogRef.close();
  }
  getServiceById(id:string){
      this.serviceService.getServiceById(id).subscribe(
        (response:any) =>{
          this.service = response.details.service;
          this.form = this.fb.group({
            title: [this.service.title, [Validators.required, Validators.minLength(2)]],
            description: [this.service.description, [Validators.required, Validators.minLength(5)]],
            price: [this.service.price, [Validators.required, Validators.min(0)]],
          });
        },
        (error)=>{
          console.log(error);
        }
      )
  }
  getAllTags(){
    this.tagService.getAllTags().subscribe(
      (response:ResponseWithDetailsInterface) =>{
          this.tags = response.details['tags'];
      },(error)=>{
        console.log(error);
      }
      )
  }
  
}
