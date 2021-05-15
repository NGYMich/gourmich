import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueRecetteMobileComponent } from './dialogue-recette-mobile.component';

describe('DialogueRecetteMobileComponent', () => {
  let component: DialogueRecetteMobileComponent;
  let fixture: ComponentFixture<DialogueRecetteMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueRecetteMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueRecetteMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
