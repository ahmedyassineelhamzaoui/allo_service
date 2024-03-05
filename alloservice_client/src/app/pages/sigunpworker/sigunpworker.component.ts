import { Component } from '@angular/core';

@Component({
  selector: 'app-sigunpworker',
  templateUrl: './sigunpworker.component.html',
  styleUrl: './sigunpworker.component.css'
})
export class SigunpworkerComponent {

  cardtypes = [
    { value: 'PASSPORT', name: 'Passport' },
    { value: 'IDENTITY_CARD', name: 'Identity Card' },
    { value: 'GREYCARD', name: 'Grey Card' },    
  ];
  
}
