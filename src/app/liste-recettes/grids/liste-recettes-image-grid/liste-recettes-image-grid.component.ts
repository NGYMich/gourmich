import {Component, Input, OnInit} from '@angular/core';
import {DialogueRecetteMobileComponent} from '../../dialogue-recette-mobile/dialogue-recette-mobile.component';
import {DialogueRecetteComponent} from '../../dialogue-recette/dialogue-recette.component';
import {MatDialog} from '@angular/material/dialog';
import {Recette} from '../../../model/recette';
import {HttpClient} from "@angular/common/http";
import {RecetteService} from "../../../services/RecetteService";
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-liste-recettes-image-grid',
  templateUrl: './liste-recettes-image-grid.component.html',
  styleUrls: ['./liste-recettes-image-grid.component.css']
})
export class ListeRecettesImageGridComponent implements OnInit {
  @Input() rowData: any;
  @Input() isMobile: boolean;

  recettesFiltrees: Recette[];
  originalRecettes: Recette[];
  filtre: string;

  constructor(public dialog: MatDialog, private recetteService: RecetteService) {
  }

  ngOnInit(): void {


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
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    }
  }

  filtrerRecette(filtre: string, reset: boolean): void {
      this.recetteService.getRecettes().subscribe(data => {
        if (this.filtre !== '' && reset !== true) {
          this.filtre = this.filtre.toLocaleLowerCase();
          // data = data.filter((recette: any) => recette?.nom?.toLocaleLowerCase().indexOf(this.filtre) !== -1);
          data = data.filter((recette: any) => JSON.stringify(recette).toLocaleLowerCase().indexOf(this.filtre) !== -1);
        } else {
          this.filtre = '';
        }
        this.rowData = data;
      });
    }
}
