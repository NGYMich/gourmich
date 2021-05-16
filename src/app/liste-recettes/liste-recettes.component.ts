import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecetteService} from '../services/RecetteService';
import {DialogueRecetteComponent} from './dialogue-recette/dialogue-recette.component';
import {MatDialog} from '@angular/material/dialog';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DialogueRecetteMobileComponent} from './dialogue-recette-mobile/dialogue-recette-mobile.component';
import {isNumeric} from 'rxjs/internal-compatibility';
import {ImageFormatterComponent} from './ImageFormatterComponent';


@Component({
  selector: 'app-liste-recettes',
  templateUrl: './liste-recettes.component.html',
  styleUrls: ['./liste-recettes.component.css'],
})
export class ListeRecettesComponent implements OnInit, OnDestroy {

  detailedGridChosen = false;
  imageGridChosen = true;
  vignetteGridChosen = false;

  searchValue;
  newData;
  rowData: any;
  isMobile: boolean;

  constructor(private recetteService: RecetteService) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.getListeRecettes();
  }

  getListeRecettes(): void {
    this.recetteService.getRecettes().subscribe(data => {
      this.newData = data;
      this.newData.forEach(recette => {
        if (recette.temps_cuisson !== '' && recette.temps_preparation !== '') {
          recette.temps_total = isNumeric(Number(recette.temps_preparation) + Number(recette.temps_cuisson)) ? this.minToHours(Number(recette.temps_preparation) + Number(recette.temps_cuisson)) : recette.temps_total;
        }
        recette.temps_cuisson = isNumeric(recette.temps_cuisson) ? this.minToHours(Number(recette.temps_cuisson)) : recette.temps_cuisson;
        recette.temps_preparation = isNumeric(recette.temps_preparation) ? this.minToHours(Number(recette.temps_preparation)) : recette.temps_preparation;
      });
      this.rowData = this.newData;
      // this.dataSource.sort = this.sort;
    });
  }

  chooseGrid(details: string): void {
    if (details === 'details') {
      this.detailedGridChosen = true;
      this.imageGridChosen = false;
      this.vignetteGridChosen = false;
    } else if (details === 'vignette') {
      this.detailedGridChosen = false;
      this.imageGridChosen = false;
      this.vignetteGridChosen = true;
    } else if (details === 'images') {
      this.detailedGridChosen = false;
      this.imageGridChosen = true;
      this.vignetteGridChosen = false;
    }
  }

  minToHours(minutes: number): string {
    let newMinutes;
    let newHours;
    if (minutes < 60) {
      return minutes === 0 ? minutes + ' min' : minutes + ' min';
    } else {
      newHours = Math.trunc(minutes / 60);
      newMinutes = minutes - newHours * 60;
    }
    return newMinutes !== 0 ? newHours + 'h' + newMinutes : newHours + 'h' + newMinutes + '0';
  }

}
