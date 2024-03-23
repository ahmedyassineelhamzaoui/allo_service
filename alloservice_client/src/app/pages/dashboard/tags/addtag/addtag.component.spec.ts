import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtagComponent } from './addtag.component';

describe('AddtagComponent', () => {
  let component: AddtagComponent;
  let fixture: ComponentFixture<AddtagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
