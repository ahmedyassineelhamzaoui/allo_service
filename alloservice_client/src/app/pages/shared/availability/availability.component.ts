import { Component, Input } from '@angular/core';
import { AvailabilityRequestInterface } from '../types/availabilityRequest.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  

  days : string[] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

}
