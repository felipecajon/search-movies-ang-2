import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbrokenComponent } from './heartbroken.component';

describe('HeartbrokenComponent', () => {
  let component: HeartbrokenComponent;
  let fixture: ComponentFixture<HeartbrokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbrokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbrokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
