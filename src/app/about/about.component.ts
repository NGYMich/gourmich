import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  algorithmSuggestions: string[] = ['Add mobile support', 'Add authentification / user management', 'In Livre Recettes, show recipe when its image is clicked'];
  graphicalSuggestions: string[] = ['Add animations', 'Change fonts', 'Add background', 'Add banner'];


  constructor() {
  }

  ngOnInit(): void {
  }

}
