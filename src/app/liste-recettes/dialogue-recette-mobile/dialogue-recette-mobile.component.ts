import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogue-recette-mobile',
  templateUrl: './dialogue-recette-mobile.component.html',
  styleUrls: ['./dialogue-recette-mobile.component.css']
})
export class DialogueRecetteMobileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public recette: any) { }

  ngOnInit(): void {
    this.recette = this.recette.recette;
    console.log(this.recette);
  }

}
