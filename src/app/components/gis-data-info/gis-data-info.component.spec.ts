import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GisDataInfoComponent } from './gis-data-info.component';

describe('GisDataInfoComponent', () => {
  let component: GisDataInfoComponent;
  let fixture: ComponentFixture<GisDataInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GisDataInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GisDataInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
