import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonificoDialogComponent } from './bonifico-dialog.component';

describe('BonificoDialogComponent', () => {
  let component: BonificoDialogComponent;
  let fixture: ComponentFixture<BonificoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonificoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonificoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
