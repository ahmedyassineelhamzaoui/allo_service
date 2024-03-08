import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../shared/store/reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authWorkerActions } from '../../shared/store/action';
import { RegisterRequestWorkerInterface } from '../../shared/types/registerRequestWorker.interface';

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
    gender: ['MALE'],
    cardType: ['PASSPORT'],
    location: ['CASABLANCA'],
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
  genders =[
    {value:'MALE',name:'Male'},
    {value:'FEMALE',name:'Female'}
  ]

  onSubmit() {
    this.showBackendError = true;
    this.markFormControlsAsTouched(this.form);
    if (this.form.valid) {
      const request: RegisterRequestWorkerInterface = {
        firstName: this.form.get('firstName')?.value || '',
        lastName: this.form.get('lastName')?.value || '',
        email: this.form.get('email')?.value || '',
        password: this.form.get('password')?.value || '',
        phone: this.form.get('phone')?.value || '',
        location: this.form.get('location')?.value || '',
        gender: this.form.get('gender')?.value || '',
        cardType: this.form.get('cardType')?.value || '',
        cardDocument: this.form.get('cardDocument')?.value || '',
        cardNumber: this.form.get('cardNumber')?.value || ''
      };
      this.store.dispatch(authWorkerActions.register({ request }));
    }
  }
  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
  
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
}
