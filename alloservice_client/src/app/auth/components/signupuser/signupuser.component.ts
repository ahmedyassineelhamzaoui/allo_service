import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../shared/store/reducer';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestClientInterface } from '../../shared/types/registerRequestClient.interface';
import { authActions } from '../../shared/store/action';

@Component({
  selector: 'app-signupuser',
  templateUrl: './signupuser.component.html',
  styleUrl: './signupuser.component.css'
})
export class SignupuserComponent {
  showBackendError = true;
  
  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(
    private fb: FormBuilder,
    private store: Store) { }
    ngOnInit() {
      this.showBackendError = false;
    }
    form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    onSubmit() {
      this.showBackendError = true;
      this.markFormControlsAsTouched(this.form);
      if (this.form.valid) {
        const request: RegisterRequestClientInterface = {
          firstName: this.form.get('firstName')?.value || '',
          lastName: this.form.get('lastName')?.value || '',
          email: this.form.get('email')?.value || '',
          password: this.form.get('password')?.value || '',
        };
        this.store.dispatch(authActions.register({ request }));
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
