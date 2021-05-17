import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  algorithmSuggestions: string[] = ['Add mobile support',
    'Add authentification / user management',
    'In Livre Recettes, match next and previous buttons',
    'Add recipe validations',
    'Add stars for note',
    'Search for recipes from ingredients',
    'Add on arrow left or right change recipe',
    'Fix Images liste recettes when width too low (take too much width)',
    'Add filter for image view'];
  graphicalSuggestions: string[] = ['Add animations', 'Change fonts', 'Add background', 'Add banner'];


  constructor() {
  }

  ngOnInit(): void {
  }

}
