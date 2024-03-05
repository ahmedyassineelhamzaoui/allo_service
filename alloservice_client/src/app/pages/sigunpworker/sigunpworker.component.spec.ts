import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigunpworkerComponent } from './sigunpworker.component';

describe('SigunpworkerComponent', () => {
  let component: SigunpworkerComponent;
  let fixture: ComponentFixture<SigunpworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigunpworkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigunpworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
