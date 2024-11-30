import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Device } from '../../interfaces/Devices.interface';
import { DeviceService } from '../../services/devices.service';
import { genericResponse } from '../../../Auth/Interfaces/genericResponse';
import { LocationsService } from '../../services/locations.service';
import { Locations } from '../../interfaces/locations.interface';


@Component({
  selector: 'app-devices',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent implements OnInit {

  devices: Device[] = []; // Lista de Devices cargados
  deviceForm!: FormGroup; // Formulario reactivo para manejar los datos de Device
  selectedDevice: Device | null = null; // Usuario seleccionado para editar/ver
  showModal = false; // Control del estado del modal
  submitted = false; // Control para activar validaciones
  modalTitle: string = ''; // Variable para el título del modal
  viewOk = false;
  showDeleteConfirmation = false; // Control de la vista de confirmación
  locationes: Locations[] = []; // Lista de Location disponibles

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private locationsService: LocationsService
  ) {}
  ngOnInit(): void {
    this.loadDevice(); // Cargar locationes al inicializar
    this.loadLocations(); // Cargar Devicees al inicializar
    this.initializeForm(); // Inicializar el formulario reactivo
  }

  // Inicializa el formulario reactivo
  initializeForm(): void {
    this.deviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      deviceKey: ['', [Validators.required, Validators.minLength(3)]],
      deviceType: ['', [Validators.required, Validators.minLength(6)]],
      idLocation: ['', [Validators.required, Validators.minLength(6)]],
      estado: [false], // Estado como checkbox
    });
  }

  // Obtener la lista de Devices del backend
  // Carga la lista de Locationss desde el servicio
  loadLocations(): void {
    this.locationsService.getLocations().subscribe({
      next: (respose: genericResponse) => {
        this.locationes = respose.data;
      },
      error: (err) => console.error('Error al cargar Locationss', err),
    });
  }

  // Carga la lista de Devices desde el servicio
  loadDevice(): void {
    this.deviceService.getDevices().subscribe({
      next: (respose: genericResponse) => {
        this.devices = respose.data;
      },
      error: (err) => console.error('Error al cargar Devices', err),
    });
  }

  // Abre el modal para agregar un nuevo Device
  openAddModal(): void {
    this.selectedDevice = null; // Asegurarse de limpiar el Device seleccionado
    this.deviceForm.reset({ estado: false }); // Resetear el formulario con estado inactivo
    this.modalTitle = `Crear Ubicación`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Abre el modal para editar un Device existente
  openEditModal(servidor: Device): void {
    this.selectedDevice = servidor;
    this.deviceForm.patchValue(servidor); // Llenar el formulario con los datos del Device
    this.modalTitle = `Editar Ubicación`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Guarda el Device (nuevo o editado)
  saveDevice(): void {
    this.submitted = true;

    if (this.deviceForm.invalid) {
      return; // Si el formulario es inválido, detener la ejecución
    }
    debugger;
    const servidorData: Device = { ...this.deviceForm.value };

    if (this.selectedDevice) {
      // Si hay un Device seleccionado, es una edición

      this.deviceService
        .updateDevice(this.selectedDevice.id, servidorData)
        .subscribe({
          next: () => {
            this.loadDevice(); // Recargar la lista de Devices
            this.closeModal();
          },
          error: (err) => console.error('Error al actualizar Device', err),
        });
    } else {
      // Si no hay Device seleccionado, es un nuevo registro
      this.deviceService.createDevice(servidorData).subscribe({
        next: () => {
          this.loadDevice(); // Recargar la lista de Devices
          this.closeModal();
        },
        error: (err) => console.error('Error al crear Device', err),
      });
    }
  }

  // Elimina un Device
  openDeleteConfirmationModal(servidor: Device): void {
    this.selectedDevice = servidor;
    this.showDeleteConfirmation = true; // Mostrar la confirmación de eliminación
  }

  deleteDevice(): void {
    if (this.selectedDevice) {
      this.deviceService.deleteDevice(this.selectedDevice.id).subscribe({
        next: () => {
          this.loadDevice(); // Recargar lista de Devices tras eliminar
          this.showDeleteConfirmation = false; // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al eliminar Device', err);
        },
      });
    }
  }

  // Cierra el modal y resetea los valores
  closeModal(): void {
    this.showModal = false;
    this.submitted = false;
    this.deviceForm.reset();
    this.selectedDevice = null;
  }

  // Abre un modal para visualizar detalles de un Device
  openViewModal(servidor: Device): void {
    this.deviceService.getDevicebyId(servidor.id).subscribe({
      next: (response: genericResponse) => {
        console.log(response);
        this.selectedDevice = response.data;
      },
      error: (err) => console.error('Error al cargar Devices', err),
    });
    this.viewOk = true;
    this.deviceForm.patchValue(servidor); // Llenar el formulario con los datos del Device
    this.modalTitle = `Detalles Ubicación`;
    this.showModal = true;
  }
}
