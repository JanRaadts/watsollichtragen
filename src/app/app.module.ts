import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadingscreenComponent } from './components/loadingscreen/loadingscreen.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { ResultsComponent } from './components/results/results.component';

export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingscreenComponent,
    CityFormComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    // Add the module like so:    
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
