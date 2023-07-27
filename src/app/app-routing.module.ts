import { SignupPageComponent } from './signup-page/signup-page.component';
import { authGuard } from './guards/auth.guard';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './project/project.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'employees/list', component: EmployeesListComponent, canActivate: [authGuard] },
  { path: 'projects/add', component: ProjectsAddComponent },
  { path: 'projects/list', component: ProjectsListComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
