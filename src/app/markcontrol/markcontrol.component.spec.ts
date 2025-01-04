import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkcontrolComponent } from './markcontrol.component';

describe('MarkcontrolComponent', () => {
  let component: MarkcontrolComponent;
  let fixture: ComponentFixture<MarkcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkcontrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
