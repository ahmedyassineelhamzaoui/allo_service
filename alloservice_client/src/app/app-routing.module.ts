import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component';
import { SignupuserComponent } from './auth/components/signupuser/signupuser.component';
import { SigunpworkerComponent } from './auth/components/sigunpworker/sigunpworker.component';
import { VerifyemailComponent } from './auth/components/verifyemail/verifyemail.component';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home' , component: HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'services',component:ServiceComponent},
  { path: 'signup-user', component: SignupuserComponent, data: { animation: 'SignupUserPage' } },
  { path: 'signup-worker', component: SigunpworkerComponent, data: { animation: 'SignupWorkerPage' } },
  { path: 'verify-email', component: VerifyemailComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }