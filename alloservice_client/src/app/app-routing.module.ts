import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component';
import { SigunpworkerComponent } from './pages/sigunpworker/sigunpworker.component';
import { SignupuserComponent } from './pages/signupuser/signupuser.component';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home' , component: HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'services',component:ServiceComponent},
  { path: 'signup-user', component: SignupuserComponent, data: { animation: 'SignupUserPage' } },
  { path: 'signup-worker', component: SigunpworkerComponent, data: { animation: 'SignupWorkerPage' } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
