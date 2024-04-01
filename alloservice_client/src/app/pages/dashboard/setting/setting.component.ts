import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { PersistanceService } from '../../../auth/shared/services/persistance.service';
import { UserInterface } from '../../shared/types/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserInfoRequestnterface } from '../../shared/types/updateUserInfoRequestInterface.interface';
import { ResponseWithDetailsInterface } from '../../../auth/shared/types/responseWithDetails.interface';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserDocumentinterface } from '../../shared/types/updateUserDocument.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  isLoading : boolean = true;

  displayUserInfoContent : boolean = true;
  displayUserDocument : boolean = true;
  displayEditPasswordForm: boolean = true;
  displayEditAvatarForm: boolean = true;

  emailDisabled : boolean = true;
  errorMessage  : string = '';
  cardDocument !: File;
  imageAvatar  !: File;
  isSubmiting: boolean = false;
  isFormUserInfoSubmiting: boolean = false;
  isFormAvatarSubmiting: boolean = false;
  isFormPasswordSubmiting: boolean = false;

  form1 = this.fb.group({
    firstName: ['',[Validators.required, Validators.minLength(2)]],
    lastName: ['',[Validators.required, Validators.minLength(5)]],
    email: ['',[Validators.required, Validators.email]],
    phone : ['',[Validators.required,  Validators.pattern(/^(?:\+212|0)[5-7]\d{8}$/)]],
    gender: ['MALE'],
    location: ['Casablanca'],
  });
  form2 = this.fb.group({
    cardType: [''],
    cardNumber: ['',[Validators.required, Validators.minLength(5)]],
  });
  form3 = this.fb.group({
    imageProfile: ['',[Validators.required]],
  });
  form4 = this.fb.group({
    oldPassword: ['',[Validators.required, Validators.minLength(8)]],
    newPassword: ['',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
    ]],
    confirmPassword: ['',[
      Validators.required,
       Validators.minLength(8),
       Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
      ]],
  }, { validator: this.passwordMatchValidator });

  user: UserInterface = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services: [],
    authorities: [],
    picture: {
      id: '',
      link: ''
    },
    gender: '',
    location: '',
    card: {
      id: '',
      cardNumber: '',
      cardType: '',
      link: '',
    }
  };
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
  genders = [
    { value: 'MALE', name: 'Male' },
    { value: 'FEMALE', name: 'Female' }
  ]
  types = [
    { value: 'PASSPORT', name: 'Passport' },
    { value: 'IDENTITY_CARD', name: 'Identity Card' },
    { value: 'GREYCARD', name: 'Driving License'}
  ]
  constructor(
    private persistenceService: PersistanceService,
    private userService: UserService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) { }
  
  ngOnInit(): void {
    this.isLoading = true;
   this.getUser();
  }
  

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPassword')!.value === formGroup.get('confirmPassword')!.value
      ? null : { 'mismatch': true };
  }
  getUser(){
    const token = this.persistenceService.get('accessToken')!;
    this.userService.getAuthenticUser(token).subscribe(
      (response) => {
        this.user = response.details['user'];
        this.form1 = this.fb.group({
          firstName: [this.user.firstName,[Validators.required, Validators.minLength(2)]],
          lastName: [this.user.lastName,[Validators.required, Validators.minLength(5)]],
          email: [this.user.email,[Validators.required, Validators.email]],
          phone : [this.user.phone,[Validators.required,  Validators.pattern(/^(?:\+212|0)[5-7]\d{8}$/)]],
          gender: [this.user.gender], 
          location: [this.user.location],
        });
        this.form2 = this.fb.group({
          cardType: [this.user.card ? this.user.card.cardType : ''] ,
          cardNumber: [this.user.card ? this.user.card.cardNumber : '' ,[Validators.required, Validators.minLength(5)]],
        });
        this.isLoading = false;
      },(error)=>{
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  selectFile(event: any) {
    this.cardDocument = event.target.files.item(0);
  }
  updateMyInfo(){
    this.markFormControlsAsTouched(this.form1);
    this.isFormUserInfoSubmiting = true;
    if (this.form1.valid) {
      const request: UpdateUserInfoRequestnterface = {
        firstName: this.form1.get('firstName')?.value || '',
        lastName: this.form1.get('lastName')?.value || '',
        email: this.form1.get('email')?.value || '',
        phone: this.form1.get('phone')?.value || '',
        gender : this.form1.get('gender')?.value || '',
        location: this.form1.get('location')?.value || '',
      };
      this.userService.updateUserInfo(request,this.user.id).subscribe(
        (response:ResponseWithDetailsInterface) => {
          this.isFormUserInfoSubmiting = false;
          this.user = response.details['user'];
          this.userService.updateUsername(this.user.firstName);
          this.toaster.success('Your information has been updated successfully');
        },(error)=>{
          console.log(error);
          this.isFormUserInfoSubmiting = false;
          this.errorMessage = error.error.message;
        }
      );
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
  updateMyDocument(){
    this.markFormControlsAsTouched(this.form2);
    if(this.form2.valid){
      this.isSubmiting = true;
      const request: UpdateUserDocumentinterface = {
        cardType: this.form2.get('cardType')?.value || '',
        cardNumber: this.form2.get('cardNumber')?.value || ''
      };
      if (!this.cardDocument) {
        this.cardDocument = new File([''], 'empty');
      }
      this.userService.updateUserDocument(request,this.cardDocument,this.user.id).subscribe(
        (response:ResponseWithDetailsInterface) => {
          console.log(response);
          this.user = response.details['user'];
          this.isSubmiting = false;
          this.toaster.success('Your document has been updated successfully');
        },(error)=>{
          this.isSubmiting = false;
          this.errorMessage = error.error.message;
        }
      );
    }
    
  }
  hideErrorAlert(){
    this.errorMessage = '';
  }
  showUserInfo(){
    this.displayUserInfoContent = !this.displayUserInfoContent;
  }
  showIdentityContent(){
    this.displayUserDocument = !this.displayUserDocument;
  }
  showEditPasswordForm(){
    this.displayEditPasswordForm = !this.displayEditPasswordForm;
  }
  showEditAvatarForm(){
    this.displayEditAvatarForm = ! this.displayEditAvatarForm;
  }
  selectAvatar(event: any) {
    this.imageAvatar = event.target.files.item(0);
  }
  updateMyAvatar(){
    this.markFormControlsAsTouched(this.form3);
    if(this.form3.valid){
      this.isFormAvatarSubmiting = true;
      this.userService.updateUserAvatar(this.imageAvatar,this.user.id).subscribe(
        (response:ResponseWithDetailsInterface) => {
          this.user = response.details['user'];
          this.isFormAvatarSubmiting = false;
          this.userService.updatePictureLink(this.user.picture.link); 
          this.toaster.success('Your avatar has been updated successfully');
        },(error)=>{
          this.isFormAvatarSubmiting = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  updateUserPassword(){
    this.markFormControlsAsTouched(this.form4);
    if(this.form4.valid){
      this.isFormPasswordSubmiting = true;
      this.userService.updateUserPassword(this.form4.value,this.user.id).subscribe(
        (response:ResponseWithDetailsInterface) => {
          this.isFormPasswordSubmiting = false;
          this.toaster.success('Your password has been updated successfully');
        },(error)=>{
          this.isFormPasswordSubmiting = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
