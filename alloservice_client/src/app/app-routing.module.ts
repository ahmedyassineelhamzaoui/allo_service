import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component';
import { SignupuserComponent } from './auth/components/signupuser/signupuser.component';
import { SigunpworkerComponent } from './auth/components/sigunpworker/sigunpworker.component';
import { VerifyemailComponent } from './auth/components/verifyemail/verifyemail.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { NotauthorizeComponent } from './errors/notauthorize/notauthorize.component';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home' , component: HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'services',component:ServiceComponent},
  {path:'login',component:LoginComponent},
  { path: 'signup-user', component: SignupuserComponent, data: { animation: 'SignupUserPage' } },
  { path: 'signup-worker', component: SigunpworkerComponent, data: { animation: 'SignupWorkerPage' } },
  { path: 'verify-email', component: VerifyemailComponent},
  {path:'notauthorize',component:NotauthorizeComponent},
  {path: '**', component: NotfoundComponent, pathMatch: 'full'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }