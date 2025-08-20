import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentiComponent } from './investimenti.component';

describe('InvestimentiComponent', () => {
  let component: InvestimentiComponent;
  let fixture: ComponentFixture<InvestimentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestimentiComponent]
    });
    fixture = TestBed.createComponent(InvestimentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
