import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent {

  @Output() searchedCity: EventEmitter<any> = new EventEmitter
  city!: string



  onSubmit(){
    const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${this.city}&apiKey=e5002b4ebd9540a481613abeccde07c7`
    this.city = ""

    this.searchedCity.emit(geoUrl)
   }
}
