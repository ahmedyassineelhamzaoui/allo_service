import { Component } from '@angular/core';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {
  days : string[] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

}
