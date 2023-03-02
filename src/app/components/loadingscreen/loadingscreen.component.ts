import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.scss']
})
export class LoadingscreenComponent {

  options: AnimationOptions = {    
    path: '../../assets/lottie/69847-pulsing-sun.json'  
  };  

   // This is the component function that binds to the animationCreated event from the package  
 onAnimate(animationItem: AnimationItem): void {    
  // console.log(animationItem);  
}

}
