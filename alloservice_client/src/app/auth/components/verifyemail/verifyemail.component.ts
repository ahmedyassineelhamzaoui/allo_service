import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../shared/store/reducer';
import { Store } from '@ngrx/store';
import { MessageService } from '../../shared/services/message.service';
import { FormBuilder } from '@angular/forms'

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
}
