import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const app_route: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(app_route)],
  exports: [RouterModule]
})
export class routes {
  //router = routes
}
