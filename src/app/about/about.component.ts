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
    'Add filter for image view',
    'Add backup database spring (see pg_dump google)',
    'Add mobile management for matdialog',
    'Fix Image on Dialog when width low (widto too low)'
    ];
  graphicalSuggestions: string[] = ['Add animations', 'Change fonts', 'Add background', 'Add banner'];


  constructor() {
  }

  ngOnInit(): void {
  }

}
