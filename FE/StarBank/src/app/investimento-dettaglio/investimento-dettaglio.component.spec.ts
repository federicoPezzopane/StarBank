import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentoDettaglioComponent } from './investimento-dettaglio.component';

describe('InvestimentoDettaglioComponent', () => {
  let component: InvestimentoDettaglioComponent;
  let fixture: ComponentFixture<InvestimentoDettaglioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestimentoDettaglioComponent]
    });
    fixture = TestBed.createComponent(InvestimentoDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
