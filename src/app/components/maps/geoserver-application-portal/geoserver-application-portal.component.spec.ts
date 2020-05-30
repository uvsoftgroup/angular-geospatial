import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoserverApplicationPortalComponent } from './geoserver-application-portal.component';

describe('GeoserverApplicationPortalComponent', () => {
  let component: GeoserverApplicationPortalComponent;
  let fixture: ComponentFixture<GeoserverApplicationPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoserverApplicationPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoserverApplicationPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
