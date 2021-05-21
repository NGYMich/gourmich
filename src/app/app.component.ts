import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slider} from './animations';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-ui';
  isShowing: boolean;
  temporaryDisabled = false;
  isMobile: boolean;

  constructor(private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile() ? true : false;
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
