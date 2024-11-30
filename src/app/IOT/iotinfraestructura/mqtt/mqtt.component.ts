import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mqtt } from '../../interfaces/mqtt.interface';
import { MqttService } from '../../services/mqtt.service';
import { CommonModule } from '@angular/common';
import { genericResponse } from '../../../Auth/Interfaces/genericResponse';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrl: './mqtt.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class MqttComponent implements OnInit{

  mqtts: Mqtt[] = []; // Lista de MQTTs cargados
  mqttForm!: FormGroup; // Formulario reactivo para manejar los datos de MQTT
  selectedMqtt: Mqtt | null = null; // Usuario seleccionado para editar/ver
  showModal = false; // Control del estado del modal
  submitted = false; // Control para activar validaciones
  modalTitle: string = ''; // Variable para el título del modal
  viewOk = false;
  showDeleteConfirmation = false; // Control de la vista de confirmación

  constructor(private fb: FormBuilder, private mqttService: MqttService) {}
  ngOnInit(): void {
    this.loadMqtts(); // Cargar MQTTs al inicializar
    this.initializeForm(); // Inicializar el formulario reactivo
  }

  // Inicializa el formulario reactivo
  initializeForm(): void {
    this.mqttForm = this.fb.group({
      direccionIPBroker: ['', [Validators.required, Validators.minLength(3)]],
      usuarioMQTT: ['', [Validators.required, Validators.minLength(3)]],
      claveMQTT: ['', [Validators.required, Validators.minLength(6)]],
      estado: [false], // Estado como checkbox
    });
  }

  // Carga la lista de MQTTs desde el servicio
  loadMqtts(): void {
    this.mqttService.getMqtts().subscribe({
      next: (respose: genericResponse) => {
        this.mqtts = respose.data;
      },
      error: (err) => console.error('Error al cargar MQTTs', err),
    });
  }

  // Abre el modal para agregar un nuevo MQTT
  openAddModal(): void {
    this.selectedMqtt = null; // Asegurarse de limpiar el MQTT seleccionado
    this.mqttForm.reset({ estado: false }); // Resetear el formulario con estado inactivo
    this.modalTitle = `Crear MQTT`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Abre el modal para editar un MQTT existente
  openEditModal(mqtt: Mqtt): void {
    this.selectedMqtt = mqtt;
    this.mqttForm.patchValue(mqtt); // Llenar el formulario con los datos del MQTT
    this.modalTitle = `Editar MQTT`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Guarda el MQTT (nuevo o editado)
  saveMqtt(): void {
    this.submitted = true;

    if (this.mqttForm.invalid) {
      return; // Si el formulario es inválido, detener la ejecución
    }
debugger;
    const mqttData: Mqtt = { ...this.mqttForm.value };

    if (this.selectedMqtt) {
      // Si hay un MQTT seleccionado, es una edición

      this.mqttService.updateMqtt(this.selectedMqtt.id, mqttData).subscribe({
        next: () => {
          this.loadMqtts(); // Recargar la lista de MQTTs
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar MQTT', err),
      });
    } else {
      // Si no hay MQTT seleccionado, es un nuevo registro
      this.mqttService.createMqtt(mqttData).subscribe({
        next: () => {
          this.loadMqtts(); // Recargar la lista de MQTTs
          this.closeModal();
        },
        error: (err) => console.error('Error al crear MQTT', err),
      });
    }
  }

  // Elimina un MQTT
  openDeleteConfirmationModal(mqtt: Mqtt): void {
    this.selectedMqtt = mqtt;
    this.showDeleteConfirmation = true; // Mostrar la confirmación de eliminación
  }

  deleteMqtt(): void {
    if (this.selectedMqtt) {
      this.mqttService.deleteMqtt(this.selectedMqtt.id).subscribe({
        next: () => {
          this.loadMqtts(); // Recargar lista de MQTTs tras eliminar
          this.showDeleteConfirmation = false; // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al eliminar MQTT', err);
        },
      });
    }
  }

  // Cierra el modal y resetea los valores
  closeModal(): void {
    this.showModal = false;
    this.submitted = false;
    this.mqttForm.reset();
    this.selectedMqtt = null;
  }

  // Abre un modal para visualizar detalles de un MQTT
  openViewModal(mqtt: Mqtt): void {
    this.mqttService.getMqttbyId(mqtt.id).subscribe({
      next: (response: genericResponse) => {
        console.log(response);
        this.selectedMqtt = response.data;
      },
      error: (err) => console.error('Error al cargar MQTTs', err),
    });
    this.viewOk = true;
    this.mqttForm.patchValue(mqtt); // Llenar el formulario con los datos del MQTT
    this.modalTitle = `Detalles Usuario`;
    this.showModal = true;
  }
}
