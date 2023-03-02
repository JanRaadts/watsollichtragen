import { Component } from '@angular/core';
import { UiChangesService } from 'src/app/service/ui-changes.service';
import { WeatherService } from 'src/app/service/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  showResults!: boolean ;
  currentTemperatur: any = 0
  subscription!: Subscription;

  constructor(private uiService:UiChangesService, private wService:WeatherService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showResults = value)
    this.subscription = this.wService.onGetTemperature().subscribe(value => this.currentTemperatur = value)
  }

}
