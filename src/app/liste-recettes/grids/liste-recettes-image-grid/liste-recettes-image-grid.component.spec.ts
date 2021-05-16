import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecettesImageGridComponent } from './liste-recettes-image-grid.component';

describe('ListeRecettesImageGridComponent', () => {
  let component: ListeRecettesImageGridComponent;
  let fixture: ComponentFixture<ListeRecettesImageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRecettesImageGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRecettesImageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
