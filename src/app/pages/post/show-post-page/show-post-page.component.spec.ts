import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPostPageComponent } from './show-post-page.component';

describe('ShowPostPageComponent', () => {
  let component: ShowPostPageComponent;
  let fixture: ComponentFixture<ShowPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
