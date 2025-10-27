import { Routes } from '@angular/router';
import { Default } from './layouts/default/default';
import { DashboardComponent } from './features/dashboard/dashboard';
import { AuthComponent } from './features/auth/auth/auth';
import { CalendarioComponent } from './features/calendario/calendario';
import { ConfiguracoesComponent } from './features/configuracoes/configuracoes';
import { TarefasComponent } from './features/tarefas/tarefas';
import { ClientesComponent } from './features/clientes/clientes';
import { PacientesComponent } from './features/pacientes/pacientes';
import { FaturamentoComponent } from './features/faturamento/faturamento';
import { EmpresasComponent } from './features/empresas/empresas';
import { ProfissionaisComponent } from './features/profissionais/profissionais';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: Default,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'tarefas', component: TarefasComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'profissionais', component: ProfissionaisComponent },
      { path: 'faturamento', component: FaturamentoComponent },
      { path: 'empresas', component: EmpresasComponent },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
