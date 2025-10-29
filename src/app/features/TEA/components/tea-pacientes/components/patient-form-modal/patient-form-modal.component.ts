import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Patient {
	id: string;
	nome: string;
	cpf: string;
	email: string;
	telefone: string;
	birthDate: string;
	age: number;
	spectrum: string;
	therapist: string;
	status: 'active' | 'inactive' | 'waiting';
	lastSession: string;
	progressLevel: number;
	avatar?: string;
	especialidades?: string[];
	observacoes?: string;
	dataNascimento: string;
	dataCriacao: string;
}

@Component({
	selector: 'app-patient-form-modal',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: 'patient-form-modal.component.html',
	styleUrls: ['patient-form-modal.component.css']
})
export class PatientFormModalComponent implements OnInit, OnChanges {
	@Input() show: boolean = false;
	@Input() patient: Patient | null = null;
	@Input() mode: 'create' | 'edit' = 'create';
	@Output() close = new EventEmitter<void>();
	@Output() save = new EventEmitter<Patient>();

	formData: Partial<Patient> = {};

	get modalTitle(): string {
		return this.mode === 'create' ? 'Novo Paciente' : 'Editar Paciente';
	}
	get submitButtonText(): string {
		return this.mode === 'create' ? 'Criar Paciente' : 'Salvar Alterações';
	}

	ngOnInit() {
		this.resetForm();
	}
	ngOnChanges() {
		if (this.show) {
			this.resetForm();
		}
	}

	resetForm(): void {
		if (this.mode === 'edit' && this.patient) {
			this.formData = { ...this.patient };
		} else {
			this.formData = {
				nome: '',
				birthDate: '',
				age: 0,
				spectrum: '',
				therapist: '',
				status: 'active',
				lastSession: '',
				progressLevel: 0
			};
		}
	}

	onClose(): void {
		this.close.emit();
	}

	onSubmit(): void {
		if (this.isFormValid()) {
			const patientData: Patient = {
				...this.formData as Patient,
				id: this.patient?.id || Date.now().toString(),
				progressLevel: this.formData.progressLevel ?? 0
			};
			this.save.emit(patientData);
		}
	}

	isFormValid(): boolean {
		return !!(
			this.formData.nome?.trim() &&
			this.formData.birthDate?.trim() &&
			this.formData.age &&
			this.formData.spectrum?.trim() &&
			this.formData.therapist?.trim() &&
			(this.formData.status === 'active' || this.formData.status === 'inactive' || this.formData.status === 'waiting') &&
			this.formData.lastSession?.trim() &&
			(this.formData.progressLevel !== undefined)
		);
	}
}