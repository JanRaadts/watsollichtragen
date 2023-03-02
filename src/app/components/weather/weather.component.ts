import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  showWeather: boolean = true
  loading: boolean = false
  locationInput: boolean = false
  data:any
  currentTemperatur: any = 0
  coordinates: any 
  lat: any = 0
  lon: any = 0
  url!: string
  city!: string
  GEO_API: string = "e9e1604216e7465488692640e2190af5"
  geoUrl!: string 




  constructor(){
    this.onClick()
  }

  onClick(){
    this.loading = true;

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.getLocation();
  }, 2000);
  }

  getLocation(){
    const successCallback = (position:any) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude
      this.url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBerlin`
      this.fetchWeather();
    };
    
    const errorCallback = () => {
      this.loading = false
      this.locationInput = true
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
  }

  fetchWeather(){
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => {this.data = quotesData; this.getTemperature(); this.showWeather = !this.showWeather; this.loading = false} )
  }


  getTemperature(){
    this.currentTemperatur = this.data.current_weather.temperature
  }


    getGeo() {
      fetch(this.geoUrl).then((response) => response.json())
      .then((quotesData) => {this.coordinates = quotesData; this.getLatLon()});
  }

  getLatLon(){
    if (this.coordinates.features.length === 0) {
      alert(`Keinen Ort mit dem Namen gefunden`);
    } else {
      this.lon = `${this.coordinates.features[0].geometry.coordinates[0]}`;
    this.lat = `${this.coordinates.features[0].geometry.coordinates[1]}`;
    this.url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBerlin`
    this.fetchWeather();
    }
  }

 addCity(event:any){
  this.geoUrl = event
  this.getGeo()
  console.log(event)
 }

}
