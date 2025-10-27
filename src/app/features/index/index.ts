import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="index-container">
      <div class="hero-section">
        <h1 class="hero-title">Sistema Gestão Caring</h1>
        <p class="hero-subtitle">
          Plataforma completa para gestão de saúde corporativa
        </p>
        <a routerLink="/dashboard" class="btn btn-primary">
          Acessar Dashboard
        </a>
      </div>

      <div class="features-grid">
        <div class="card feature-card">
          <div class="card-content">
            <div class="feature-icon">📊</div>
            <h3>Dashboard Completo</h3>
            <p>Visualize todas as informações importantes em um só lugar</p>
          </div>
        </div>

        <div class="card feature-card">
          <div class="card-content">
            <div class="feature-icon">📋</div>
            <h3>Gestão de Tarefas</h3>
            <p>Organize e acompanhe todas as atividades da equipe</p>
          </div>
        </div>

        <div class="card feature-card">
          <div class="card-content">
            <div class="feature-icon">💰</div>
            <h3>Faturamento</h3>
            <p>Controle completo das finanças e faturamento</p>
          </div>
        </div>

        <div class="card feature-card">
          <div class="card-content">
            <div class="feature-icon">📅</div>
            <h3>Calendário</h3>
            <p>Gerencie compromissos e eventos importantes</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .index-container {
      padding: 3rem 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
    }
    .hero-title {
      font-size: 3rem;
      font-weight: bold;
      color: #2563eb;
      margin: 0 0 1rem 0;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: #6b7280;
      margin: 0 0 2rem 0;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .feature-card {
      text-align: center;
    }
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: bold;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }
    .feature-card p {
      color: #6b7280;
      margin: 0;
    }
    .card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .card-content {
      color: #374151;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      font-size: 0.875rem;
      text-decoration: none;
      display: inline-block;
      transition: all 0.2s ease-in-out;
    }
    .btn-primary {
      background-color: #2563eb;
      color: white;
    }
    .btn-primary:hover {
      background-color: #1d4ed8;
    }
  `]
})
export class IndexComponent {}