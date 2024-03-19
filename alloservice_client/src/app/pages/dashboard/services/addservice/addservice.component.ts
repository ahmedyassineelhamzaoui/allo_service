import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, ValidatorFn, Validators } from '@angular/forms';
import { TagInterface } from '../../../shared/types/tag.interface';
import { TagsService } from '../../../shared/tags.service';
import { ResponseWithDetailsInterface } from '../../../../auth/shared/types/responseWithDetails.interface';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrl: './addservice.component.css'
})
export class AddserviceComponent {


  tags : ResponseWithDetailsInterface[] = [];

  constructor(private fb:FormBuilder,private tagsService:TagsService) { }

  ngOnInit() {
    this.tagsService.getAllTags().subscribe((listOfTags:ResponseWithDetailsInterface)=>{
      this.tags = listOfTags.details['tags'];
    });
  }
   
  form = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(2)]],
    description: ['',[Validators.required, Validators.minLength(5)]],
    servicePicture: [''],
    tags:  ['', this.minTagsValidator(2)],
  });
  saveService():void{
    console.log(this.form.value);
  }
  minTagsValidator(min = 2): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selected = control.value;
      return selected && selected.length >= min ? null : { 'minTags': { value: control.value } };
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
}
