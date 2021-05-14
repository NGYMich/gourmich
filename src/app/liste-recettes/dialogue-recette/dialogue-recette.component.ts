import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Recette} from "../../model/recette";

@Component({
  selector: 'app-dialogue-recette',
  templateUrl: './dialogue-recette.component.html',
  styleUrls: ['./dialogue-recette.component.css']
})
export class DialogueRecetteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public recette: any) { }

  ngOnInit(): void {
    this.recette = this.recette.recette;
    console.log(this.recette);
  }

}