import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaCancellazioneCartaDialogComponent } from './conferma-cancellazione-carta-dialog.component';

describe('ConfermaCancellazioneCartaDialogComponent', () => {
  let component: ConfermaCancellazioneCartaDialogComponent;
  let fixture: ComponentFixture<ConfermaCancellazioneCartaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfermaCancellazioneCartaDialogComponent]
    });
    fixture = TestBed.createComponent(ConfermaCancellazioneCartaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
