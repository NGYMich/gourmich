import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  algorithmSuggestions: string[] = ['Add mobile support', 'Add authentification / user management', 'In Livre Recettes, match next and previous buttons', 'Add recipe validations', 'Add stars for note', 'Search for recipes from ingredients', 'Add on arrow left or right change recipe', 'Fix vignette autoheight'];
  graphicalSuggestions: string[] = ['Add animations', 'Change fonts', 'Add background', 'Add banner'];


  constructor() {
  }

  ngOnInit(): void {
  }

}
