import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoService } from '../../../shared/services/logo.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  email = '';
  senha = '';
  nome = '';
  loading = false;
  activeTab: 'login' | 'signup' = 'login';
  logoUrl: string | null = null;
  private logoSubscription?: Subscription;

  constructor(
    private router: Router,
    private logoService: LogoService
  ) {}

  ngOnInit() {
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

  switchTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
    this.clearForm();
  }

  clearForm() {
    this.email = '';
    this.senha = '';
    this.nome = '';
  }

  async handleLogin(event: Event) {
    event.preventDefault();
    this.loading = true;

    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (this.email && this.senha) {
        this.showToast('Login realizado', 'Bem-vindo ao Gestão Caring!', 'success');
        this.router.navigate(['/dashboard']);
      } else {
        this.showToast('Erro no login', 'Email e senha são obrigatórios', 'error');
      }
    } catch (error) {
      this.showToast('Erro', 'Ocorreu um erro inesperado', 'error');
    } finally {
      this.loading = false;
    }
  }

  async handleSignUp(event: Event) {
    event.preventDefault();
    this.loading = true;

    try {
      // Validar domínio do email
      if (!this.email.endsWith('@caringsaude.com.br')) {
        this.showToast(
          'Email não autorizado',
          'Apenas emails @caringsaude.com.br são permitidos para cadastro',
          'error'
        );
        this.loading = false;
        return;
      }

      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.nome && this.email && this.senha) {
        this.showToast(
          'Cadastro realizado',
          'Verifique seu email para confirmar a conta',
          'success'
        );
        this.switchTab('login');
      } else {
        this.showToast('Erro no cadastro', 'Todos os campos são obrigatórios', 'error');
      }
    } catch (error) {
      this.showToast('Erro', 'Ocorreu um erro inesperado', 'error');
    } finally {
      this.loading = false;
    }
  }

  isEmailValid(): boolean {
    return !this.email || this.email.endsWith('@caringsaude.com.br');
  }

  onImageError(event: any) {
    console.log('Erro ao carregar imagem:', event);
    // Hide logo if it fails to load
    event.target.style.display = 'none';
  }

  private showToast(title: string, message: string, type: 'success' | 'error') {
    // Mock toast implementation
    const toast = {
      title,
      message,
      type,
      timestamp: new Date()
    };
    console.log('Toast:', toast);
    
    // In a real app, you would integrate with a toast service
    alert(`${title}: ${message}`);
  }
}
