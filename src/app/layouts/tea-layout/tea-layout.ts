import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LogoService } from '../../shared/services/logo.service';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-tea-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './tea-layout.html',
  styleUrl: './tea-layout.css'
})
export class TeaLayoutComponent implements OnInit, OnDestroy {
  collapsed = false;
  profile: any = null;
  logoUrl: string | null = null;
  currentRoute: string = '';
  private logoSubscription?: Subscription;
  private routeSubscription?: Subscription;

  private allTeaMenuItems: MenuItem[] = [
    { title: "Home", url: "/home", icon: "home" },
    { title: "Dashboard", url: "/tea/dashboard", icon: "dashboard" },
    { title: "TEA Clínica", url: "/tea/clinica", icon: "brain" },
    { title: "Cadastros", url: "/tea/cadastros", icon: "users" },
    { title: "Calendário", url: "/tea/calendario", icon: "calendar" }
  ];

  teaMenuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private logoService: LogoService
  ) {}

  ngOnInit() {
    // Mock data for now - replace with actual auth service later
    this.profile = {
      nome: "Usuário TEA",
      perfil: "admin" // Mude para "terapeuta" para testar sem o Home
    };

    // Filtrar itens do menu baseado no perfil
    this.filterMenuItems();

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
  }

  isActive(path: string): boolean {
    if (path === "/tea/clinica") return this.router.url === "/tea/clinica";
    if (path === "/home") return this.router.url === "/home";
    return this.router.url.startsWith(path);
  }

  signOut() {
    console.log('Sign out from TEA');
    this.router.navigate(['/login']);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  /**
   * Verifica se o usuário atual é admin
   */
  isAdmin(): boolean {
    return this.profile && this.profile.perfil === 'admin';
  }

  /**
   * Filtra os itens do menu baseado no perfil do usuário
   */
  private filterMenuItems(): void {
    if (this.isAdmin()) {
      // Admin vê todos os itens
      this.teaMenuItems = [...this.allTeaMenuItems];
    } else {
      // Outros perfis não veem o item "Home" nem "Dashboard"
      this.teaMenuItems = this.allTeaMenuItems.filter(item => 
        item.url !== '/home' && item.url !== '/tea/dashboard'
      );
    }
  }
}