import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  imports: [CommonModule],
})
export class LocationsComponent {
  locations = [];

  //constructor(private locationService: LocationService) {}

  ngOnInit() {
    //this.locationService.getLocations().subscribe(data => {
      //this.locations = data;
  //  }
  //);
  }

  // Lógica para agregar, editar y eliminar ubicaciones
}
