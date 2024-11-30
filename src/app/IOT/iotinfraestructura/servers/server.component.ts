import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servidor } from '../../interfaces/servidor.interface';
import { ServerService } from '../../services/server.service';
import { genericResponse } from '../../../Auth/Interfaces/genericResponse';
import { Mqtt } from '../../interfaces/mqtt.interface';
import { MqttService } from '../../services/mqtt.service';

@Component({
  selector: 'app-server',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements OnInit{

  servidores: Servidor[] = []; // Lista de Servidors cargados
  servidorForm!: FormGroup; // Formulario reactivo para manejar los datos de Servidor
  selectedServidor: Servidor | null = null; // Usuario seleccionado para editar/ver
  showModal = false; // Control del estado del modal
  submitted = false; // Control para activar validaciones
  modalTitle: string = ''; // Variable para el título del modal
  viewOk = false;
  showDeleteConfirmation = false; // Control de la vista de confirmación
  mqtts: Mqtt[] = []; // Lista de Servidors disponibles

  constructor(private fb: FormBuilder, private serverService: ServerService,private mqttService: MqttService) {}
  ngOnInit(): void {
    this.loadServidors(); // Cargar servidores al inicializar
    this.loadMqtts(); // Cargar la lista de Servidors al iniciar
      this.initializeForm(); // Inicializar el formulario reactivo
  }

  // Inicializa el formulario reactivo
  initializeForm(): void {
    this.servidorForm = this.fb.group({
      nombreHost: ['', [Validators.required, Validators.minLength(3)]],
      direccionIP: ['', [Validators.required, Validators.minLength(3)]],
      idMQTT: ['', [Validators.required, Validators.minLength(6)]],
      estado: [false], // Estado como checkbox
    });
  }

 // Obtener la lista de Servidors del backend
 loadMqtts(): void {
  this.mqttService.getMqtts().subscribe({
    next: (respose: genericResponse) => {
      this.mqtts = respose.data;
    },
    error: (err) => console.error('Error al cargar Servidors', err),
  });
}

  // Carga la lista de Servidors desde el servicio
  loadServidors(): void {
    this.serverService.getServidors().subscribe({
      next: (respose: genericResponse) => {
        this.servidores = respose.data;
      },
      error: (err) => console.error('Error al cargar Servidors', err),
    });
  }

  // Abre el modal para agregar un nuevo Servidor
  openAddModal(): void {
    this.selectedServidor = null; // Asegurarse de limpiar el Servidor seleccionado
    this.servidorForm.reset({ estado: false }); // Resetear el formulario con estado inactivo
    this.modalTitle = `Crear Servidor`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Abre el modal para editar un Servidor existente
  openEditModal(servidor: Servidor): void {
    this.selectedServidor = servidor;
    this.servidorForm.patchValue(servidor); // Llenar el formulario con los datos del Servidor
    this.modalTitle = `Editar Servidor`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Guarda el Servidor (nuevo o editado)
  saveServidor(): void {
    this.submitted = true;

    if (this.servidorForm.invalid) {
      return; // Si el formulario es inválido, detener la ejecución
    }
debugger;
    const servidorData: Servidor = { ...this.servidorForm.value };

    if (this.selectedServidor) {
      // Si hay un Servidor seleccionado, es una edición

      this.serverService.updateServidor(this.selectedServidor.id, servidorData).subscribe({
        next: () => {
          this.loadServidors(); // Recargar la lista de Servidors
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar Servidor', err),
      });
    } else {
      // Si no hay Servidor seleccionado, es un nuevo registro
      this.serverService.createServidor(servidorData).subscribe({
        next: () => {
          this.loadServidors(); // Recargar la lista de Servidors
          this.closeModal();
        },
        error: (err) => console.error('Error al crear Servidor', err),
      });
    }
  }

  // Elimina un Servidor
  openDeleteConfirmationModal(servidor: Servidor): void {
    this.selectedServidor = servidor;
    this.showDeleteConfirmation = true; // Mostrar la confirmación de eliminación
  }

  deleteServidor(): void {
    if (this.selectedServidor) {
      this.serverService.deleteServidor(this.selectedServidor.id).subscribe({
        next: () => {
          this.loadServidors(); // Recargar lista de Servidors tras eliminar
          this.showDeleteConfirmation = false; // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al eliminar Servidor', err);
        },
      });
    }
  }

  // Cierra el modal y resetea los valores
  closeModal(): void {
    this.showModal = false;
    this.submitted = false;
    this.servidorForm.reset();
    this.selectedServidor = null;
  }

  // Abre un modal para visualizar detalles de un Servidor
  openViewModal(servidor: Servidor): void {
    this.serverService.getServidorbyId(servidor.id).subscribe({
      next: (response: genericResponse) => {
        console.log(response);
        this.selectedServidor = response.data;
      },
      error: (err) => console.error('Error al cargar Servidors', err),
    });
    this.viewOk = true;
    this.servidorForm.patchValue(servidor); // Llenar el formulario con los datos del Servidor
    this.modalTitle = `Detalles Usuario`;
    this.showModal = true;
  }
}
