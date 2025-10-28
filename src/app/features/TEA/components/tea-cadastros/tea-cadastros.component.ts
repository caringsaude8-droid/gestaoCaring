import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeaPatient {
  id: string;
  name: string;
  birthDate: string;
  age: number;
  spectrum: string;
  therapist: string;
  status: 'active' | 'inactive' | 'waiting';
  lastSession: string;
  progressLevel: number;
}

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  activePatients: number;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-tea-cadastros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tea-cadastros.component.html',
  styleUrls: ['./tea-cadastros.component.css']
})
export class TeaCadastrosComponent implements OnInit {
  activeTab: 'patients' | 'therapists' = 'patients';
  searchTerm = '';

  patients: TeaPatient[] = [
    {
      id: '1',
      name: 'João Silva Santos',
      birthDate: '2018-03-15',
      age: 6,
      spectrum: 'Autismo Leve',
      therapist: 'Dr. Maria Santos',
      status: 'active',
      lastSession: '25/01/2024',
      progressLevel: 75
    },
    {
      id: '2',
      name: 'Ana Costa Lima',
      birthDate: '2019-08-22',
      age: 5,
      spectrum: 'Autismo Moderado',
      therapist: 'Dr. Pedro Lima',
      status: 'active',
      lastSession: '24/01/2024',
      progressLevel: 68
    },
    {
      id: '3',
      name: 'Lucas Oliveira',
      birthDate: '2020-01-10',
      age: 4,
      spectrum: 'Asperger',
      therapist: 'Dr. Carla Souza',
      status: 'waiting',
      lastSession: '20/01/2024',
      progressLevel: 82
    }
  ];

  therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Maria Santos',
      specialty: 'Terapia ABA',
      email: 'maria.santos@email.com',
      phone: '(11) 99999-0001',
      activePatients: 15,
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. Pedro Lima',
      specialty: 'Fonoaudiologia',
      email: 'pedro.lima@email.com',
      phone: '(11) 99999-0002',
      activePatients: 12,
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. Carla Souza',
      specialty: 'Terapia Ocupacional',
      email: 'carla.souza@email.com',
      phone: '(11) 99999-0003',
      activePatients: 18,
      status: 'active'
    }
  ];

  filteredPatients: TeaPatient[] = [];
  filteredTherapists: Therapist[] = [];

  ngOnInit() {
    this.filteredPatients = this.patients;
    this.filteredTherapists = this.therapists;
  }

  setActiveTab(tab: 'patients' | 'therapists') {
    this.activeTab = tab;
    this.searchTerm = '';
    this.onSearch();
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    
    if (this.activeTab === 'patients') {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(term) ||
        patient.spectrum.toLowerCase().includes(term) ||
        patient.therapist.toLowerCase().includes(term)
      );
    } else {
      this.filteredTherapists = this.therapists.filter(therapist =>
        therapist.name.toLowerCase().includes(term) ||
        therapist.specialty.toLowerCase().includes(term) ||
        therapist.email.toLowerCase().includes(term)
      );
    }
  }

  openAddModal() {
    console.log('Abrindo modal para adicionar:', this.activeTab);
    // Implementar modal de cadastro
  }

  getPatientStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active': 'Ativo',
      'inactive': 'Inativo',
      'waiting': 'Aguardando'
    };
    return labels[status] || status;
  }

  getTherapistStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active': 'Ativo',
      'inactive': 'Inativo'
    };
    return labels[status] || status;
  }
}