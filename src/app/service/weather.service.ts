import { Injectable } from '@angular/core';
import { UiChangesService } from './ui-changes.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  data:any
  coordinates: any 
  lat: any = 0
  lon: any = 0
  url!: string
  geoUrl!: string 
  private temperatureSubject = new Subject<any>();


  constructor(private uiService:UiChangesService){}



  onClick(){
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
      this.toggleInput()
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
  }

  fetchWeather(){
    fetch(this.url)
    .then((response) => response.json())
    .then((quotesData) => {this.data = quotesData; this.getTemperature(); this.toggleLoading(); this.toggleResults()}  )
  }


  getTemperature(){
    this.temperatureSubject.next(this.data.current_weather.temperature);
  }

  onGetTemperature():Observable<any>{
    return this.temperatureSubject.asObservable();
    }   

  addCity(event:any){
    this.geoUrl = event
    this.getGeo()
    console.log(event)
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

  toggleLoading(){
    this.uiService.toggleLoading()
  }

  toggleResults(){
    this.uiService.toggleResults()
  }

  toggleInput(){
    this.uiService.toggleInput()
  }
 
}
