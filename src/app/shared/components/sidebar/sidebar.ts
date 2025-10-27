import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoService } from '../../services/logo.service';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

interface SubMenuItem {
  title: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  collapsed = false;
  cadastrosOpen = false;
  profile: any = null;
  logoUrl: string | null = null;
  private logoSubscription?: Subscription;

  menuItems: MenuItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: "dashboard" },
    { title: "Tarefas", url: "/tarefas", icon: "tasks" },
    { title: "Faturamento", url: "/faturamento", icon: "money" },
    { title: "Controle de Reajustes", url: "/controle-reajustes", icon: "trending" },
    { title: "Calendário", url: "/calendario", icon: "calendar" },
    { title: "Configurações", url: "/configuracoes", icon: "settings" },
  ];

  adminMenuItems: MenuItem[] = [
    { title: "Notificações", url: "/notificacoes-usuarios", icon: "users" },
  ];

  cadastrosSubItems: SubMenuItem[] = [
    { title: "Clientes", url: "/clientes" },
    { title: "Pacientes", url: "/pacientes" },
    { title: "Profissionais Médicos", url: "/profissionais" },
    { title: "Empresas", url: "/empresas" },
  ];

  constructor(
    private router: Router,
    private logoService: LogoService
  ) {}

  ngOnInit() {
    // Mock data for now - replace with actual auth service later
    this.profile = {
      nome: "Usuário Teste",
      perfil: "admin"
    };

    // Subscribe to logo changes
    this.logoSubscription = this.logoService.logoUrl$.subscribe(logoUrl => {
      this.logoUrl = logoUrl;
    });
  }

  ngOnDestroy() {
    if (this.logoSubscription) {
      this.logoSubscription.unsubscribe();
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  toggleCadastros() {
    this.cadastrosOpen = !this.cadastrosOpen;
  }

  isActive(path: string): boolean {
    if (path === "/dashboard") return this.router.url === "/dashboard";
    return this.router.url.startsWith(path);
  }

  isCadastrosActive(): boolean {
    return this.router.url === "/clientes" || this.router.url === "/pacientes" || this.router.url === "/profissionais" || this.router.url === "/empresas";
  }

  isAdmin(): boolean {
    return this.profile?.perfil === 'admin' || this.profile?.perfil === 'administrador';
  }

  signOut() {
    console.log('Sign out');
    this.router.navigate(['/auth']);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
