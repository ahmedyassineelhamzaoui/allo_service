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
import { registerClientEffect, redirectAfterRegisterClientEffect } from './auth/shared/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

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
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
      registerClientEffect,
      redirectAfterRegisterClientEffect
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
