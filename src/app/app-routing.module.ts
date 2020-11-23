import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBusinessComponent } from './pages/register-business/register-business.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'cadastro', component: RegisterComponent },
  { path: 'cadastro-usuario', component: RegisterUserComponent },
  { path: 'cadastro-empresa', component: RegisterBusinessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
