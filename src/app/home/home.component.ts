import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  javaFunctionalities: string[] = ['Ajout de la difficulté', 'Modification des temps (int) en (time)', 'Ajout des ingrédients (HashSet ou ArrayList)', 'Ajout des catégories d\'aliments'];
  angularFunctionalities: string[] = ['Ajout de recettes', 'Modification de recettes', 'Recette aléatoire', 'Ajustement des quantités d\'ingrédients en fonction du nombre de personnes', 'Livre des recettes'];
  isMobile: boolean;

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile() ? true : false;
  }

  constructor(private deviceService: DeviceDetectorService) {
  }


}
