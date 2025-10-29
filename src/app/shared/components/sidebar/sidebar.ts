import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  currentRoute: string = '';
  private logoSubscription?: Subscription;
  private routeSubscription?: Subscription;

  // Itens básicos que aparecem sempre
  basicMenuItems: MenuItem[] = [
    { title: "Home", url: "/home", icon: "home" },
    { title: "Calendário", url: "/calendario", icon: "calendar" },
  ];

  // Menu apenas com Home para página de usuários
  usuariosMenuItems: MenuItem[] = [
    { title: "Home", url: "/home", icon: "home" },
  ];

  // Itens completos que aparecem apenas no dashboard
  fullMenuItems: MenuItem[] = [
    { title: "Home", url: "/home", icon: "home" },
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

    // Subscribe to route changes
    this.currentRoute = this.router.url;
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnDestroy() {
    if (this.logoSubscription) {
      this.logoSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.updateMainContentMargin();
  }

  private updateMainContentMargin() {
    // Atualiza a classe CSS do elemento main para ajustar a margem
    const mainElement = document.querySelector('main');
    if (mainElement) {
      if (this.collapsed) {
        mainElement.classList.add('sidebar-collapsed');
      } else {
        mainElement.classList.remove('sidebar-collapsed');
      }
    }
  }

  toggleCadastros() {
    this.cadastrosOpen = !this.cadastrosOpen;
  }

  isActive(path: string): boolean {
    if (path === "/home") return this.router.url === "/home" || this.router.url === "/";
    if (path === "/dashboard") return this.router.url === "/dashboard";
    return this.router.url.startsWith(path);
  }

  isCadastrosActive(): boolean {
    return this.router.url === "/clientes" || this.router.url === "/pacientes" || this.router.url === "/profissionais" || this.router.url === "/empresas";
  }

  isAdmin(): boolean {
    return this.profile?.perfil === 'admin' || this.profile?.perfil === 'administrador';
  }

  // Verifica se está nas páginas que devem mostrar menu básico
  isBasicMenuPage(): boolean {
    return this.currentRoute === '/home' || 
           this.currentRoute === '/' ||
           this.currentRoute.startsWith('/calendario');
  }

  // Verifica se está na página de usuários (deve mostrar apenas Home)
  isUsuariosPage(): boolean {
    return this.currentRoute.startsWith('/usuarios');
  }

  // Verifica se deve mostrar menu completo (quando está no dashboard ou suas sub-rotas)
  shouldShowFullMenu(): boolean {
    return this.currentRoute.startsWith('/dashboard') || 
           this.currentRoute.startsWith('/tarefas') ||
           this.currentRoute.startsWith('/faturamento') ||
           this.currentRoute.startsWith('/controle-reajustes') ||
           this.currentRoute.startsWith('/calendario') ||
           this.currentRoute.startsWith('/configuracoes') ||
           this.currentRoute.startsWith('/clientes') ||
           this.currentRoute.startsWith('/pacientes') ||
           this.currentRoute.startsWith('/profissionais') ||
           this.currentRoute.startsWith('/empresas') ||
           this.currentRoute.startsWith('/notificacoes-usuarios');
  }

  // Retorna os itens do menu baseado na rota atual
  getMenuItems(): MenuItem[] {
    if (this.isUsuariosPage()) {
      return this.usuariosMenuItems;
    }
    if (this.isBasicMenuPage()) {
      return this.basicMenuItems;
    }
    return this.fullMenuItems;
  }

  signOut() {
    console.log('Sign out');
    this.router.navigate(['/login']);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
