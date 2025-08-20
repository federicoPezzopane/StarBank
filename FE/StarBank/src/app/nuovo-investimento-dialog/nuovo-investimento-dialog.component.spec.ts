import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoInvestimentoDialogComponent } from './nuovo-investimento-dialog.component';

describe('NuovoInvestimentoDettaglioComponent', () => {
  let component: NuovoInvestimentoDialogComponent;
  let fixture: ComponentFixture<NuovoInvestimentoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuovoInvestimentoDialogComponent]
    });
    fixture = TestBed.createComponent(NuovoInvestimentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
