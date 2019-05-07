import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsdisplayPage } from './newsdisplay.page';

describe('NewsdisplayPage', () => {
  let component: NewsdisplayPage;
  let fixture: ComponentFixture<NewsdisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsdisplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsdisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
