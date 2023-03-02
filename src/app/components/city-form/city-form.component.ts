import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent {

  @Output() searchedCity: EventEmitter<any> = new EventEmitter
  city!: string

  constructor(private wService:WeatherService){

  }



  onSubmit(){
    const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${this.city}&apiKey=e5002b4ebd9540a481613abeccde07c7`
    this.city = ""
    this.wService.addCity(geoUrl)
   }
}
