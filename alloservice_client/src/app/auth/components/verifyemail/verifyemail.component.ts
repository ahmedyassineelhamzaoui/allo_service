import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../shared/store/reducer';
import { Store } from '@ngrx/store';
import { MessageService } from '../../shared/services/message.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms'
import { MailRequestInterface } from '../../shared/types/mailRequest.interface';
import { verifyEmailActions } from '../../shared/store/action';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrl: './verifyemail.component.css'
})
export class VerifyemailComponent {
  showBackendError = true;
  showBackendSuccess = true;
  message: string ='';

  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private messageService: MessageService
    ) { }

    // after the component init get name frome message service
    ngOnInit() {
      this.messageService.currentMessage.subscribe((message: string) => this.message = message);
    }

    formMailVerification = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });

    getFirstError(error: any): string {
      return error;
    }
    markFormControlsAsTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
  
        if (control instanceof FormGroup) {
          this.markFormControlsAsTouched(control);
        }
      });
    }
    verifyEmail() {
      this.showBackendError = true;
      this.markFormControlsAsTouched(this.formMailVerification);
      console.log(this.formMailVerification.getRawValue());
      if (this.formMailVerification.valid) {
        const request: MailRequestInterface = {
          code: this.formMailVerification.get('code')?.value || ''
        };
        this.store.dispatch(verifyEmailActions.mail({ request }));
      }
    }
}
