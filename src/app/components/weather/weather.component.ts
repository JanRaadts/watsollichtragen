import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  showWeather: boolean = true
  data:any
  currentTemperatur: any = 0
  lat: number = 0
  lon: number = 0
  url!: string 


// tarifa latitude=36.02&longitude=-5.61
// Kiel latitude=54.32&longitude=10.13

  constructor(){}

  onClick(){
    this.getLocation();
    // this.fetchWeather();
  }

  fetchWeather(){
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => {this.data = quotesData; this.getTemperature(); this.showWeather = !this.showWeather;} )
  }

  getLocation(){
    const successCallback = (position:any) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude
      console.log(this.lat, this.lon)
      console.log(this.url)
      this.url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBerlin`
      this.fetchWeather();
    };
    
    const errorCallback = () => {
      alert("standort nicht gefunden")
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
  }

  getTemperature(){
    this.currentTemperatur = this.data.current_weather.temperature
    console.log(this.currentTemperatur)
  }
}
