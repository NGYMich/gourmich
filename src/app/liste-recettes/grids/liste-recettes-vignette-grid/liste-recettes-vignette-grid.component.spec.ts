import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecettesVignetteGridComponent } from './liste-recettes-vignette-grid.component';

describe('ListeRecettesVignetteGridComponent', () => {
  let component: ListeRecettesVignetteGridComponent;
  let fixture: ComponentFixture<ListeRecettesVignetteGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRecettesVignetteGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRecettesVignetteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
