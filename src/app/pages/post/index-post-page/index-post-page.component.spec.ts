import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPostPageComponent } from './index-post-page.component';

describe('IndexPostPageComponent', () => {
  let component: IndexPostPageComponent;
  let fixture: ComponentFixture<IndexPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
