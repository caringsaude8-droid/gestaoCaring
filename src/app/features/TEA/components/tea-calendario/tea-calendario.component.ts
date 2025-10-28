import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeaAppointment {
  id: string;
  patientName: string;
  therapistName: string;
  type: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  room: string;
  notes?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: TeaAppointment[];
}

@Component({
  selector: 'app-tea-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tea-calendario.component.html',
  styleUrls: ['./tea-calendario.component.css']
})
export class TeaCalendarioComponent implements OnInit {
  currentDate = new Date();
  selectedTherapist = '';
  calendarDays: CalendarDay[] = [];
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  appointments: TeaAppointment[] = [
    {
      id: '1',
      patientName: 'João Silva Santos',
      therapistName: 'Dr. Maria Santos',
      type: 'Terapia ABA',
      date: '2024-01-26',
      time: '09:00',
      duration: 45,
      status: 'scheduled',
      room: 'Sala 1',
      notes: 'Primeira sessão do mês'
    },
    {
      id: '2',
      patientName: 'Ana Costa Lima',
      therapistName: 'Dr. Pedro Lima',
      type: 'Fonoaudiologia',
      date: '2024-01-26',
      time: '10:30',
      duration: 30,
      status: 'completed',
      room: 'Sala 2'
    },
    {
      id: '3',
      patientName: 'Lucas Oliveira',
      therapistName: 'Dr. Carla Souza',
      type: 'Terapia Ocupacional',
      date: '2024-01-26',
      time: '14:00',
      duration: 60,
      status: 'scheduled',
      room: 'Sala 3',
      notes: 'Avaliação trimestral'
    }
  ];

  get todaysAppointments(): TeaAppointment[] {
    const today = new Date().toISOString().split('T')[0];
    return this.appointments.filter(app => app.date === today);
  }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const dayAppointments = this.appointments.filter(app => 
        app.date === date.toISOString().split('T')[0]
      );
      
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        appointments: dayAppointments
      });
    }
    
    this.calendarDays = days;
  }

  getCurrentMonthYear(): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDay(day: CalendarDay) {
    console.log('Dia selecionado:', day);
  }

  filterAppointments() {
    // Implementar filtro por terapeuta
    this.generateCalendar();
  }

  openNewAppointment() {
    console.log('Abrindo modal para nova sessão');
    // Implementar modal de nova sessão
  }

  getMonthStats() {
    const monthAppointments = this.appointments.filter(app => {
      const appDate = new Date(app.date);
      return appDate.getMonth() === this.currentDate.getMonth() &&
             appDate.getFullYear() === this.currentDate.getFullYear();
    });

    return {
      scheduled: monthAppointments.filter(app => app.status === 'scheduled').length,
      completed: monthAppointments.filter(app => app.status === 'completed').length,
      cancelled: monthAppointments.filter(app => app.status === 'cancelled').length,
      noShow: monthAppointments.filter(app => app.status === 'no-show').length
    };
  }
}