import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaCartaDialogComponent } from './richiesta-carta-dialog.component';

describe('RichiestaCartaDialogComponent', () => {
  let component: RichiestaCartaDialogComponent;
  let fixture: ComponentFixture<RichiestaCartaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RichiestaCartaDialogComponent]
    });
    fixture = TestBed.createComponent(RichiestaCartaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
