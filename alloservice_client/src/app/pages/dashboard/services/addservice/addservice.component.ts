import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TagsService } from '../../../shared/tags.service';
import { ResponseWithDetailsInterface } from '../../../../auth/shared/types/responseWithDetails.interface';
import { Days } from '../../../shared/enums/days.enum';
import { AddServiceReqeustInterface } from '../../../shared/types/addServiceRequest.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceService } from '../../../shared/service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrl: './addservice.component.css'
})
export class AddserviceComponent {

  isSubmiting:boolean = false;
  file!: File;
  errorMessage = '';
  tags : ResponseWithDetailsInterface[] = [];
  days = Object.keys(Days)
  .filter(key => isNaN(Number(key))) 
  .map((key) => ({ id: key, name: key })); 

  constructor(
    private fb:FormBuilder,
    private tagsService:TagsService,
    private serviceService:ServiceService,
    private matDialog: MatDialogRef<AddserviceComponent>,
    private toaster:ToastrService
  ) { }

  ngOnInit() {
    this.tagsService.getAllTags().subscribe((listOfTags:ResponseWithDetailsInterface)=>{
      this.tags = listOfTags.details['tags'];
    });
    
  }

  
   
  form = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(2)]],
    description: ['',[Validators.required, Validators.minLength(5)]],
    price : ['',[Validators.required, Validators.min(0)]],
    servicePicture: ['',Validators.required],
    tags:  ['', this.minTagsValidator(2)],
    availabilities: this.fb.array([
      this.fb.group({
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        day: ['',[Validators.required,this.minDaysValidator(1)]],
      })
    ])

  });

 
  get availabilities() {
    return this.form.controls["availabilities"] as FormArray;
  }

  saveService():void{
    this.markFormControlsAsTouched(this.form);
    if (this.form.valid) {
      this.isSubmiting = true;
      const formValues = this.form.getRawValue();

      const request: AddServiceReqeustInterface = {
        title: this.form.get('title')?.value || '',
        description: this.form.get('description')?.value || '',
        price: Number(this.form.get('price')?.value),
        tags: Array.isArray(formValues.tags) ? formValues.tags.map((tagId: string) => ({ id: tagId, name: '' })) : [],
        availabilities: this.form.get('availabilities')?.value.map((availability: any) => ({
          ...availability,
          startTime: availability.startTime + ':00',
          endTime: availability.endTime + ':00'
        })) || [],
      };
      this.serviceService.createService(request,this.file).subscribe(
        (response: any) => {
          this.isSubmiting = false;
          this.form.reset();
          this.toaster.success('Service added successfully');
        },
        (error:HttpErrorResponse) => {
          this.isSubmiting = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  minTagsValidator(min = 2): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selected = control.value;
      return selected && selected.length >= min ? null : { 'minTags': { value: control.value } };
    };
  }
  
  minDaysValidator(min = 1): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selected = control.value;
      return selected && selected.length >= min ? null : { 'minDays': { value: control.value } };
    };
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
  
  addAvailability() {
    const availabilityForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      day: ['',[Validators.required,this.minDaysValidator(1)]],
    });
    this.availabilities.push(availabilityForm);
  }

  removeAvailability(availabilityIndex: number) {
    this.availabilities.removeAt(availabilityIndex);
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
  }
  closeAlert() {
    this.errorMessage = '';
  }
  closeAddServiceModal(){
    this.matDialog.close();
  }
  
}
