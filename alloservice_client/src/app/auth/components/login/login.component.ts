import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestInterface } from '../../shared/types/loginRequest.interface';
import { loginActions } from '../../shared/store/action';
import { Store } from '@ngrx/store';
import { selectIsSubmitting, selectValidationErrors } from '../../shared/store/reducer';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showBackendError = true;
  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(private store: Store,
    private fb: FormBuilder,private http:HttpClient,private route: ActivatedRoute,private authService:AuthService) { }
  
    formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  signIn() {
    this.showBackendError = true;
    this.markFormControlsAsTouched(this.formLogin);
    if (this.formLogin.valid) {
      const request: LoginRequestInterface = this.formLogin.getRawValue();
      this.store.dispatch(loginActions.login({ request }));
    }
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
