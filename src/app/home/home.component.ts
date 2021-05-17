import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isNumeric} from 'rxjs/internal-compatibility';
import {DialogueRecetteMobileComponent} from '../liste-recettes/dialogue-recette-mobile/dialogue-recette-mobile.component';
import {DialogueRecetteComponent} from '../liste-recettes/dialogue-recette/dialogue-recette.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Recette} from '../model/recette';
import {RecetteService} from '../services/RecetteService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  javaFunctionalities: string[] = ['Ajout de la difficulté', 'Modification des temps (int) en (time)', 'Ajout des ingrédients (HashSet ou ArrayList)', 'Ajout des catégories d\'aliments'];
  angularFunctionalities: string[] = ['Ajout de recettes', 'Modification de recettes', 'Recette aléatoire', 'Ajustement des quantités d\'ingrédients en fonction du nombre de personnes', 'Livre des recettes'];
  isMobile: boolean;
  rowData;
  private homeRecettesDisplayed: any;

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile() ? true : false;
  }

  constructor(public dialog: MatDialog, private deviceService: DeviceDetectorService, private recetteService: RecetteService) {
    this.isMobile = this.deviceService.isMobile();
    this.getListeRecettes();
  }

  getListeRecettes(): void {
    this.recetteService.getRecettes().subscribe(data => {
      this.homeRecettesDisplayed = new Array();

      const randomIntArray = [];
      while (randomIntArray.length < 5){
        const r = Math.floor(Math.random() * data.length);
        if (randomIntArray.indexOf(r) === -1) { randomIntArray.push(r); }
      }
      for (const i of randomIntArray) {
        this.homeRecettesDisplayed.push(data[i]);
      }
      this.rowData = this.homeRecettesDisplayed;
    });
  }

  ouvrirRecette(recette): void {
    if (this.isMobile) {
      const dialogRef = this.dialog.open(DialogueRecetteMobileComponent, {
        width: '100%',
        height: '80%',
        data: {recette},
        autoFocus: false,
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    } else {
      const dialogRef = this.dialog.open(DialogueRecetteComponent, {
        width: '100%',
        height: '80%',
        data: {recette},
        autoFocus: false,
        backdropClass: 'dialog-class',
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    }
  }

  getRandomArbitrary(min, max): number {
    return Math.random() * (max - min) + min;
  }


}
