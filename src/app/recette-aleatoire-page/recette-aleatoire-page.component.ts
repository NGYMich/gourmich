import {Component, OnInit} from '@angular/core';
import {RecetteService} from '../services/RecetteService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recette-aleatoire-page',
  templateUrl: './recette-aleatoire-page.component.html',
  styleUrls: ['./recette-aleatoire-page.component.css']
})
export class RecetteAleatoirePageComponent implements OnInit {
  listeRecettes;
  showRandomRecetteInfos = true;
  selectedRandomRecette;

  constructor(private recetteService: RecetteService) { }

  ngOnInit(): void {
    this.getListeRecettes();
  }

  showRandomRecette(): void {
    console.log(this.listeRecettes);
    this.showRandomRecetteInfos = true;
    const randomInt = Math.floor(Math.random() * Math.floor(this.listeRecettes.length));
    console.log(randomInt);
    console.log(this.listeRecettes[randomInt]);
    this.selectedRandomRecette = this.listeRecettes[randomInt];
  }


  async getListeRecettes() {
    this.recetteService.getRecettes().subscribe(data => {
      this.listeRecettes = data;
      // console.log(this.listeRecettes);
      /*      this.listeRecettes.forEach(recette => {
              recette.temps_total = this.minToHours(Number(recette.temps_preparation) + Number(recette.temps_cuisson));
              recette.temps_cuisson = this.minToHours(Number(recette.temps_cuisson));
              recette.temps_preparation = this.minToHours(Number(recette.temps_preparation));
            })*/
    });
  }

}
