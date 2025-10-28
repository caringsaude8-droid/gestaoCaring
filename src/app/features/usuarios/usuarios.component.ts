import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  perfil: 'admin' | 'terapeuta' | 'recepcao' | 'supervisor';
  status: 'ativo' | 'inativo';
  dataUltimoAcesso: string;
  dataCriacao: string;
  avatar?: string;
  especialidades?: string[];
  departamento?: string;
}

interface UserStats {
  total: number;
  ativos: number;
  inativos: number;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  searchTerm: string = '';
  selectedPerfil: string = '';
  selectedStatus: string = '';
  
  users: User[] = [
    {
      id: '1',
      nome: 'Ana Santos Silva',
      email: 'ana.santos@caring.com',
      telefone: '(11) 99999-0001',
      perfil: 'admin',
      status: 'ativo',
      dataUltimoAcesso: '2024-01-26',
      dataCriacao: '2023-01-15',
      departamento: 'Administração'
    },
    {
      id: '2',
      nome: 'Dr. Pedro Lima Costa',
      email: 'pedro.lima@caring.com',
      telefone: '(11) 99999-0002',
      perfil: 'terapeuta',
      status: 'ativo',
      dataUltimoAcesso: '2024-01-25',
      dataCriacao: '2023-03-20',
      especialidades: ['ABA', 'Fonoaudiologia'],
      departamento: 'TEA'
    },
    {
      id: '3',
      nome: 'Maria Oliveira Santos',
      email: 'maria.oliveira@caring.com',
      telefone: '(11) 99999-0003',
      perfil: 'recepcao',
      status: 'ativo',
      dataUltimoAcesso: '2024-01-26',
      dataCriacao: '2023-06-10',
      departamento: 'Atendimento'
    },
    {
      id: '4',
      nome: 'Dr. Carlos Eduardo',
      email: 'carlos.eduardo@caring.com',
      telefone: '(11) 99999-0004',
      perfil: 'supervisor',
      status: 'ativo',
      dataUltimoAcesso: '2024-01-24',
      dataCriacao: '2023-02-28',
      especialidades: ['Terapia Ocupacional', 'Supervisão Clínica'],
      departamento: 'TEA'
    },
    {
      id: '5',
      nome: 'Julia Ferreira',
      email: 'julia.ferreira@caring.com',
      telefone: '(11) 99999-0005',
      perfil: 'terapeuta',
      status: 'ativo',
      dataUltimoAcesso: '2024-01-20',
      dataCriacao: '2024-01-15',
      especialidades: ['Psicologia'],
      departamento: 'TEA'
    },
    {
      id: '6',
      nome: 'Roberto Almeida',
      email: 'roberto.almeida@caring.com',
      telefone: '(11) 99999-0006',
      perfil: 'recepcao',
      status: 'inativo',
      dataUltimoAcesso: '2024-01-10',
      dataCriacao: '2023-08-15',
      departamento: 'Atendimento'
    }
  ];

  filteredUsers: User[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredUsers = [...this.users];
  }

  get stats(): UserStats {
    return {
      total: this.users.length,
      ativos: this.users.filter(u => u.status === 'ativo').length,
      inativos: this.users.filter(u => u.status === 'inativo').length
    };
  }

  onSearch(): void {
    this.filterUsers();
  }

  onPerfilChange(): void {
    this.filterUsers();
  }

  onStatusChange(): void {
    this.filterUsers();
  }

  private filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesPerfil = !this.selectedPerfil || user.perfil === this.selectedPerfil;
      const matchesStatus = !this.selectedStatus || user.status === this.selectedStatus;

      return matchesSearch && matchesPerfil && matchesStatus;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedPerfil = '';
    this.selectedStatus = '';
    this.filteredUsers = [...this.users];
  }

  getPerfilLabel(perfil: string): string {
    const labels: { [key: string]: string } = {
      'admin': 'Administrador',
      'terapeuta': 'Terapeuta',
      'recepcao': 'Recepção',
      'supervisor': 'Supervisor'
    };
    return labels[perfil] || perfil;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'ativo': 'Ativo',
      'inativo': 'Inativo'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getPerfilClass(perfil: string): string {
    return `perfil-${perfil}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  getDaysAgo(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Ontem';
    if (diffDays === 0) return 'Hoje';
    return `${diffDays} dias atrás`;
  }

  openAddUserModal(): void {
    console.log('Abrir modal para adicionar usuário');
    // Implementar modal ou navegação
  }

  editUser(user: User): void {
    console.log('Editar usuário:', user);
    // Implementar edição
  }

  toggleUserStatus(user: User): void {
    const newStatus = user.status === 'ativo' ? 'inativo' : 'ativo';
    user.status = newStatus;
    console.log(`Usuário ${user.nome} ${newStatus === 'ativo' ? 'ativado' : 'desativado'}`);
    // Implementar chamada para API
  }

  viewUserDetails(user: User): void {
    console.log('Ver detalhes do usuário:', user);
    // Implementar visualização detalhada
  }

  resetPassword(user: User): void {
    console.log('Resetar senha do usuário:', user);
    // Implementar reset de senha
  }
}