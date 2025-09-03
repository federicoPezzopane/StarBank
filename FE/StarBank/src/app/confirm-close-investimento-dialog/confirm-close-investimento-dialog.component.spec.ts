import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCloseInvestimentoDialogComponent } from './confirm-close-investimento-dialog.component';

describe('ConfirmCloseInvestimentoDialogComponent', () => {
  let component: ConfirmCloseInvestimentoDialogComponent;
  let fixture: ComponentFixture<ConfirmCloseInvestimentoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCloseInvestimentoDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmCloseInvestimentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
