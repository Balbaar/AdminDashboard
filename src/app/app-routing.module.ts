import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "manage", component: ManageComponent},
  { path: "create", component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
