import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../shared/store/reducer';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sigunpworker',
  templateUrl: './sigunpworker.component.html',
  styleUrl: './sigunpworker.component.css'
})
export class SigunpworkerComponent {
  showBackendError = true;

  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store) { }
  cardtypes = [
    { value: 'PASSPORT', name: 'Passport' },
    { value: 'IDENTITY_CARD', name: 'Identity Card' },
    { value: 'GREYCARD', name: 'Grey Card' },
  ];
  cities = [
    { value: 'Casablanca', name: 'Casablanca' },
    { value: 'Rabat', name: 'Rabat' },
    { value: 'Fès', name: 'Fès' },
    { value: 'Tanger', name: 'Tanger' },
    { value: 'Marrakech', name: 'Marrakech' },
    { value: 'Meknès', name: 'Meknès' },
    { value: 'Salé', name: 'Salé' },
    { value: 'Agadir', name: 'Agadir' },
    { value: 'Oujda', name: 'Oujda' },
    { value: 'Tétouan', name: 'Tétouan' },
    { value: 'Kenitra', name: 'Kenitra' },
    { value: 'El Jadida', name: 'El Jadida' },
    { value: 'Nador', name: 'Nador' },
    { value: 'Safi', name: 'Safi' },
    { value: 'Beni Mellal', name: 'Beni Mellal' },
    { value: 'Ouarzazate', name: 'Ouarzazate' },
    { value: 'Settat', name: 'Settat' },
    { value: 'Khouribga', name: 'Khouribga' },
    { value: 'Berkane', name: 'Berkane' },    
    { value: 'Larache', name: 'Larache' },    
  ]

}
