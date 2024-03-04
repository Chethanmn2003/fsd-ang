import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';

const routes: Routes = [
  
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component : HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path : "signup",
    component : SignupComponent
  },
  {
    path : "myDashboard",
    component : MyDashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
