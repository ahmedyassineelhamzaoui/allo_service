import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrl: './addservice.component.css'
})
export class AddserviceComponent {

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
  }
   
  form = this.fb.group({
    title: [''],
    description: [''],
    servicePicture: [''],
    tags: [],
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
