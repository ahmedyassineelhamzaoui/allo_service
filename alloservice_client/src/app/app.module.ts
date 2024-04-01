import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component';
import { SigunpworkerComponent } from './auth/components/sigunpworker/sigunpworker.component';
import { SignupuserComponent } from './auth/components/signupuser/signupuser.component';
import { VerifyemailComponent } from './auth/components/verifyemail/verifyemail.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { NotauthorizeComponent } from './errors/notauthorize/notauthorize.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './auth/shared/store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { redirectAfterLoginEffect,loginEffect, registerClientEffect, redirectAfterRegisterClientEffect,redirectAfterEmailEffect,mailVerificationEffect,registerWorkerEffect,redirectAfterRegisterWorkerEffect } from './auth/shared/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './pages/shared/sidebar/sidebar.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { AdduserComponent } from './pages/dashboard/users/adduser/adduser.component';
import { EdituserComponent } from './pages/dashboard/users/edituser/edituser.component';
import { ServicesComponent } from './pages/dashboard/services/services.component';
import { AddserviceComponent } from './pages/dashboard/services/addservice/addservice.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagsComponent } from './pages/dashboard/tags/tags.component';
import { AvailabilityComponent } from './pages/shared/availability/availability.component';
import { ServicedetailsComponent } from './pages/dashboard/services/servicedetails/servicedetails.component';
import { EdittagComponent } from './pages/dashboard/tags/edittag/edittag.component';
import { AddtagComponent } from './pages/dashboard/tags/addtag/addtag.component';
import { EditserviceasadminComponent } from './pages/dashboard/services/editserviceasadmin/editserviceasadmin.component';
import { EditserviceasworkerComponent } from './pages/dashboard/services/editserviceasworker/editserviceasworker.component';
import { SpinnerComponent } from './pages/shared/spinner/spinner.component';
import { SettingComponent } from './pages/dashboard/setting/setting.component';
import { UserdetailsComponent } from './pages/dashboard/users/userdetails/userdetails.component';
import { AuthGuard } from './auth/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    ServiceComponent,
    SigunpworkerComponent,
    SignupuserComponent,
    VerifyemailComponent,
    NotfoundComponent,
    NotauthorizeComponent,
    ForbiddenComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    AdduserComponent,
    EdituserComponent,
    ServicesComponent,
    AddserviceComponent,
    TagsComponent,
    AvailabilityComponent,
    ServicedetailsComponent,
    EdittagComponent,
    AddtagComponent,
    EditserviceasadminComponent,
    EditserviceasworkerComponent,
    SpinnerComponent,
    SettingComponent,
    UserdetailsComponent,
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    StoreModule.forFeature(authFeatureKey, authReducer),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: !isDevMode(), 
      autoPause: true,
      trace: false, 
      traceLimit: 75, 
      connectInZone: true 
    }),
    EffectsModule.forRoot({
      loginEffect,
      redirectAfterLoginEffect,
      registerClientEffect,
      redirectAfterRegisterClientEffect,
      mailVerificationEffect,
      redirectAfterEmailEffect,
      registerWorkerEffect,
      redirectAfterRegisterWorkerEffect
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
