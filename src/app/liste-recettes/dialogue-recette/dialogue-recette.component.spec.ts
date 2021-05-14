import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueRecetteComponent } from './dialogue-recette.component';

describe('DialogueRecetteComponent', () => {
  let component: DialogueRecetteComponent;
  let fixture: ComponentFixture<DialogueRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
