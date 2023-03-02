import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  showWeather: boolean = false

  constructor() { }

  changeUi():void{
    this.showWeather = !this.showWeather;
  
  }
}
