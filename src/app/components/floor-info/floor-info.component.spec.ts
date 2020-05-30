import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorInfoComponent } from './floor-info.component';

describe('FloorInfoComponent', () => {
  let component: FloorInfoComponent;
  let fixture: ComponentFixture<FloorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
