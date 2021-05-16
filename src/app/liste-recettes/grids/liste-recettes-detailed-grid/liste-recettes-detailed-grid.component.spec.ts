import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecettesDetailedGridComponent } from './liste-recettes-detailed-grid.component';

describe('ListeRecettesDetailedGridComponent', () => {
  let component: ListeRecettesDetailedGridComponent;
  let fixture: ComponentFixture<ListeRecettesDetailedGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRecettesDetailedGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRecettesDetailedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
