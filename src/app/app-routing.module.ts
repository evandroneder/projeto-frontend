import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegisterBusinessComponent } from './pages/register-business/register-business.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterComponent } from './pages/register/register.component';
import { ServiceComponent } from './pages/service/service.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'cadastro',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard],
  },
  {
    path: 'cadastro-usuario',
    component: RegisterUserComponent,
    canActivate: [NotLoggedInGuard],
  },
  {
    path: 'cadastro-empresa',
    component: RegisterBusinessComponent,
    canActivate: [NotLoggedInGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  {
    path: 'servico/:id',
    component: ServiceComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'perfil', component: PerfilComponent, canActivate: [LoggedInGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
