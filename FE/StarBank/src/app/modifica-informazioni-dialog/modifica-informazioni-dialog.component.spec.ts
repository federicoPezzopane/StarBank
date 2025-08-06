import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaInformazioniDialogComponent } from './modifica-informazioni-dialog.component';

describe('ModificaInformazioniDialogComponent', () => {
  let component: ModificaInformazioniDialogComponent;
  let fixture: ComponentFixture<ModificaInformazioniDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaInformazioniDialogComponent]
    });
    fixture = TestBed.createComponent(ModificaInformazioniDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
