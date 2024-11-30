import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Locations } from '../../interfaces/locations.interface';
import { LocationsService } from '../../services/locations.service';
import { genericResponse } from '../../../Auth/Interfaces/genericResponse';
import { Servidor } from '../../interfaces/servidor.interface';
import { ServerService } from '../../services/server.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  imports: [CommonModule,ReactiveFormsModule],
})
export class LocationsComponent implements OnInit{

  locations: Locations[] = []; // Lista de Locationss cargados
  locationForm!: FormGroup; // Formulario reactivo para manejar los datos de Locations
  selectedLocations: Locations | null = null; // Usuario seleccionado para editar/ver
  showModal = false; // Control del estado del modal
  submitted = false; // Control para activar validaciones
  modalTitle: string = ''; // Variable para el título del modal
  viewOk = false;
  showDeleteConfirmation = false; // Control de la vista de confirmación
  servidores: Servidor[] = [];  // Lista de Locationss disponibles

  constructor(private fb: FormBuilder, private locationsService: LocationsService,private serverService: ServerService) {}
  ngOnInit(): void {
    this.loadLocations(); // Cargar locationes al inicializar
    this.loadServidors(); // Cargar servidores al inicializar
      this.initializeForm(); // Inicializar el formulario reactivo
  }

  // Inicializa el formulario reactivo
  initializeForm(): void {
    this.locationForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      servidorId: ['', [Validators.required, Validators.minLength(6)]],
      estado: [false], // Estado como checkbox
    });
  }

 // Obtener la lista de Locationss del backend
 // Carga la lista de Locationss desde el servicio
 loadServidors(): void {
  this.serverService.getServidors().subscribe({
    next: (respose: genericResponse) => {
      this.servidores = respose.data;
    },
    error: (err) => console.error('Error al cargar Servidors', err),
  });
}

  // Carga la lista de Locationss desde el servicio
  loadLocations(): void {
    this.locationsService.getLocations().subscribe({
      next: (respose: genericResponse) => {
        this.locations = respose.data;
      },
      error: (err) => console.error('Error al cargar Locationss', err),
    });
  }

  // Abre el modal para agregar un nuevo Locations
  openAddModal(): void {
    this.selectedLocations = null; // Asegurarse de limpiar el Locations seleccionado
    this.locationForm.reset({ estado: false }); // Resetear el formulario con estado inactivo
    this.modalTitle = `Crear Ubicación`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Abre el modal para editar un Locations existente
  openEditModal(servidor: Locations): void {
    this.selectedLocations = servidor;
    this.locationForm.patchValue(servidor); // Llenar el formulario con los datos del Locations
    this.modalTitle = `Editar Ubicación`; // Cambiar el título dinámicamente
    this.viewOk = false;
    this.showModal = true;
  }

  // Guarda el Locations (nuevo o editado)
  saveLocation(): void {
    this.submitted = true;

    if (this.locationForm.invalid) {
      return; // Si el formulario es inválido, detener la ejecución
    }
debugger;
    const servidorData: Locations = { ...this.locationForm.value };

    if (this.selectedLocations) {
      // Si hay un Locations seleccionado, es una edición

      this.locationsService.updateLocations(this.selectedLocations.id, servidorData).subscribe({
        next: () => {
          this.loadLocations(); // Recargar la lista de Locationss
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar Locations', err),
      });
    } else {
      // Si no hay Locations seleccionado, es un nuevo registro
      this.locationsService.createLocations(servidorData).subscribe({
        next: () => {
          this.loadLocations(); // Recargar la lista de Locationss
          this.closeModal();
        },
        error: (err) => console.error('Error al crear Locations', err),
      });
    }
  }

  // Elimina un Locations
  openDeleteConfirmationModal(servidor: Locations): void {
    this.selectedLocations = servidor;
    this.showDeleteConfirmation = true; // Mostrar la confirmación de eliminación
  }

  deleteLocation(): void {
    if (this.selectedLocations) {
      this.locationsService.deleteLocations(this.selectedLocations.id).subscribe({
        next: () => {
          this.loadLocations(); // Recargar lista de Locationss tras eliminar
          this.showDeleteConfirmation = false; // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al eliminar Locations', err);
        },
      });
    }
  }

  // Cierra el modal y resetea los valores
  closeModal(): void {
    this.showModal = false;
    this.submitted = false;
    this.locationForm.reset();
    this.selectedLocations = null;
  }

  // Abre un modal para visualizar detalles de un Locations
  openViewModal(servidor: Locations): void {
    this.locationsService.getLocationsbyId(servidor.id).subscribe({
      next: (response: genericResponse) => {
        console.log(response);
        this.selectedLocations = response.data;
      },
      error: (err) => console.error('Error al cargar Locationss', err),
    });
    this.viewOk = true;
    this.locationForm.patchValue(servidor); // Llenar el formulario con los datos del Locations
    this.modalTitle = `Detalles Ubicación`;
    this.showModal = true;
  }
}
