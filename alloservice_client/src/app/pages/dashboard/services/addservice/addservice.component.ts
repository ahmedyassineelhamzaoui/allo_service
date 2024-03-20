import { Component, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, ValidatorFn, Validators } from '@angular/forms';
import { TagInterface } from '../../../shared/types/tag.interface';
import { TagsService } from '../../../shared/tags.service';
import { ResponseWithDetailsInterface } from '../../../../auth/shared/types/responseWithDetails.interface';
import { AvailabilityRequestInterface } from '../../../shared/types/availabilityRequest.interface';
import { AvailabilityComponent } from '../../../shared/availability/availability.component';
import { Days } from '../../../shared/enums/days.enum';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrl: './addservice.component.css'
})
export class AddserviceComponent {


  tags : ResponseWithDetailsInterface[] = [];
  days = Object.keys(Days)
  .filter(key => isNaN(Number(key))) 
  .map((key) => ({ id: key, name: key })); 

  constructor(private fb:FormBuilder,private tagsService:TagsService) { }

  ngOnInit() {
    this.tagsService.getAllTags().subscribe((listOfTags:ResponseWithDetailsInterface)=>{
      this.tags = listOfTags.details['tags'];
    });
    
  }

  
   
  form = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(2)]],
    description: ['',[Validators.required, Validators.minLength(5)]],
    price : ['',[Validators.required, Validators.min(0)]],
    servicePicture: [''],
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
    console.log(this.form.value);
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
      day: [''],
    });
    this.availabilities.push(availabilityForm);
  }

  removeAvailability(availabilityIndex: number) {
    this.availabilities.removeAt(availabilityIndex);
  }
  
}
