import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourglassEndComponent } from './hourglass-end.component';

describe('HourglassEndComponent', () => {
  let component: HourglassEndComponent;
  let fixture: ComponentFixture<HourglassEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourglassEndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourglassEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
