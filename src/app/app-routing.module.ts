import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterBusinessComponent } from './pages/register-business/register-business.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterComponent } from './pages/register/register.component';
import { ServiceComponent } from './pages/service/service.component';

const routes: Routes = [
  { path: 'cadastro', component: RegisterComponent },
  { path: 'cadastro-usuario', component: RegisterUserComponent },
  { path: 'cadastro-empresa', component: RegisterBusinessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servico/:id', component: ServiceComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
