import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentiCardComponent } from './investimenti-card.component';

describe('InvestimentiCardComponent', () => {
  let component: InvestimentiCardComponent;
  let fixture: ComponentFixture<InvestimentiCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestimentiCardComponent]
    });
    fixture = TestBed.createComponent(InvestimentiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
