import { Routes } from '@angular/router';
import { DashboardGestao } from './layouts/dashboard-gestao/dashboard-gestao';
import { TeaLayoutComponent } from './layouts/tea-layout/tea-layout';
import { DashboardComponent } from './features/gestao-caring/dashboard/dashboard';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './features/home';
import { TeaClinicaComponent } from './features/TEA/components/tea-clinica/tea-clinica.component';
import { TeaDashboardComponent } from './features/TEA/components/tea-dashboard/tea-dashboard.component';
import { TeaPacientesComponent } from './features/TEA/components/tea-pacientes/tea-pacientes.component';
import { TeaCalendarioComponent } from './features/TEA/components/tea-calendario/tea-calendario.component';
import { TeaUsuariosComponent } from './features/TEA/components/tea-usuarios/tea-usuarios.component';
import { CalendarioComponent } from './features/gestao-caring/calendario/calendario';
import { ConfiguracoesComponent } from './features/gestao-caring/configuracoes/configuracoes';
import { TarefasComponent } from './features/gestao-caring/tarefas/tarefas';
import { ClientesComponent } from './features/gestao-caring/clientes/clientes';
import { PacientesComponent } from './features/gestao-caring/pacientes/pacientes';
import { FaturamentoComponent } from './features/gestao-caring/faturamento/faturamento';
import { EmpresasComponent } from './features/gestao-caring/empresas/empresas';
import { ProfissionaisComponent } from './features/gestao-caring/profissionais/profissionais';
import { UsuariosComponent } from './features/usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  {
    path: '',
    component: DashboardGestao,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'tarefas', component: TarefasComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'profissionais', component: ProfissionaisComponent },
      { path: 'faturamento', component: FaturamentoComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ]
  },
  {
    path: 'tea',
    component: TeaLayoutComponent,
    children: [
      { path: '', redirectTo: 'clinica', pathMatch: 'full' },
      { path: 'clinica', component: TeaClinicaComponent },
      { path: 'dashboard', component: TeaDashboardComponent },
  { path: 'pacientes', component: TeaPacientesComponent },
      { path: 'calendario', component: TeaCalendarioComponent },
      { path: 'usuarios', component: TeaUsuariosComponent },
    ]
  },
  { path: '**', redirectTo: '/home' }
];
