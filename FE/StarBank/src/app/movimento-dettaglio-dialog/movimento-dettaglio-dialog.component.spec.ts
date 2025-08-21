import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoDettaglioDialogComponent } from './movimento-dettaglio-dialog.component';

describe('MovimentoDettaglioDialogComponent', () => {
  let component: MovimentoDettaglioDialogComponent;
  let fixture: ComponentFixture<MovimentoDettaglioDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimentoDettaglioDialogComponent]
    });
    fixture = TestBed.createComponent(MovimentoDettaglioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
