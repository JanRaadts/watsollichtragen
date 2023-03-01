import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

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

  // This is the option that uses the package's AnimationOption interface  
  options: AnimationOptions = {    
    path: '../../assets/lottie/69847-pulsing-sun.json'  
  };  


  constructor(){}

  onClick(){
    this.loading = true;

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.getLocation();
  }, 1000);

    // this.getLocation();
  }

  getLocation(){
    const successCallback = (position:any) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude
      this.url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBerlin`
      this.fetchWeather();
    };
    
    const errorCallback = () => {
      alert("standort nicht gefunden")
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
    console.log(this.currentTemperatur)
  }


    getGeo() {
      this.geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${this.city}&apiKey=e5002b4ebd9540a481613abeccde07c7`
      fetch(this.geoUrl).then((response) => response.json())
      .then((quotesData) => {this.coordinates = quotesData; this.getLatLon()});

  
  }

  getLatLon(){

    console.log(this.coordinates)

    if (this.coordinates.features.length === 0) {
      alert(`Keinen Ort mit dem Namen gefunden`);
    } else {
      this.lon = `${this.coordinates.features[0].geometry.coordinates[0]}`;
    this.lat = `${this.coordinates.features[0].geometry.coordinates[1]}`;
    this.url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBerlin`
    this.fetchWeather();
    }
  }

 onSubmit(){
  this.geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${this.city}&apiKey=e5002b4ebd9540a481613abeccde07c7`
  this.getGeo()
  this.city = ""
 }

 // This is the component function that binds to the animationCreated event from the package  
 onAnimate(animationItem: AnimationItem): void {    
  console.log(animationItem);  
}

}
