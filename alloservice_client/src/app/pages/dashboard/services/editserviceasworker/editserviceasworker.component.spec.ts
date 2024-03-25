import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditserviceasworkerComponent } from './editserviceasworker.component';

describe('EditserviceasworkerComponent', () => {
  let component: EditserviceasworkerComponent;
  let fixture: ComponentFixture<EditserviceasworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditserviceasworkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditserviceasworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
