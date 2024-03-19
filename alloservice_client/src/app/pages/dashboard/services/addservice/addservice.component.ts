import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
  });
  saveService():void{
    console.log(this.form.value);
  }
}
