import { Component } from '@angular/core';
import { UiChangesService } from './service/ui-changes.service';
import { WeatherService } from './service/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  locationInput: boolean = false
  loading: boolean = true
  showResults: boolean = false;
  subscription!: Subscription;

  constructor(private uiService:UiChangesService, private wService:WeatherService){
    this.subscription = this.uiService.onToggle().subscribe(value => this.showResults = value)
    this.subscription = this.uiService.onToggleLoading().subscribe(value => this.loading = value)
    this.subscription = this.uiService.onToggleInput().subscribe(value => this.locationInput = value)
    this.wService.onClick()
  }
}
