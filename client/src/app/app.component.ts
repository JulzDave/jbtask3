import { Component } from '@angular/core';
import { fader } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent {

prepareRoute(outlet: RouterOutlet){
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
}

}
