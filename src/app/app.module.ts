import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HeaderFooterComponent } from './components/header-footer/header-footer.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { AddressInfoComponent } from './components/address-info/address-info.component';
import { BuildingInfoComponent } from './components/building-info/building-info.component';
import { FloorInfoComponent } from './components/floor-info/floor-info.component';
import { PlotInfoComponent } from './components/plot-info/plot-info.component';
import { GisDataInfoComponent } from './components/gis-data-info/gis-data-info.component';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ProductComponent } from './components/product/product.component';
import { NewsComponent } from './components/news/news.component';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutosizeModule} from 'ngx-autosize';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';

import { MapOverlayComponent } from './components/map-overlay/map-overlay.component';
import { GMapModule } from 'primeng/gmap';
import { OlMapComponent } from './components/ol-map/ol-map.component';
import { MapComponent } from './components/map/map.component';
import { AddressMapComponent } from './components/maps/address-map/address-map.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { DrawModifyVectorFeatureComponent } from './components/maps/draw-modify-vector-feature/draw-modify-vector-feature.component';
import { PlotMapComponent } from './components/maps/plot-map/plot-map.component';
import { BuildingMapComponent } from './components/maps/building-map/building-map.component';
import { FloorMapComponent } from './components/maps/floor-map/floor-map.component';
import { UnitMapComponent } from './components/maps/unit-map/unit-map.component';
import { GeoMapPortalComponent } from './components/maps/geo-map-portal/geo-map-portal.component';
import { DrawModifyVectorFeatureFormComponent } from './components/maps/draw-modify-vector-feature-form/draw-modify-vector-feature-form.component';
import { GeoserverApplicationPortalComponent } from './components/maps/geoserver-application-portal/geoserver-application-portal.component';

@NgModule({
  // Components declarations
  declarations: [
    AppComponent,
    MapComponent,
    HeaderFooterComponent,
    UserRegistrationComponent,
    OlMapComponent,
    AddressInfoComponent,
    BuildingInfoComponent,
    FloorInfoComponent,
    PlotInfoComponent,
    GisDataInfoComponent,
    MapOverlayComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    ProductComponent,
    NewsComponent,
    UnitInfoComponent,
    AddressMapComponent,
    UserRoleComponent,
    DrawModifyVectorFeatureComponent,
    DrawModifyVectorFeatureFormComponent,
    PlotMapComponent,
    BuildingMapComponent,
    FloorMapComponent,
    UnitMapComponent,
    GeoMapPortalComponent,
    GeoserverApplicationPortalComponent
  ],
  // Third party Components Imports
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GMapModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    CommonModule,
    DialogModule,
    TranslateModule,
    ScrollPanelModule,
    BrowserAnimationsModule,
    DataTableModule,
    SharedModule,
    HttpClientModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextareaModule,
    AutosizeModule,
    // Application Router
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'product', component: ProductComponent },
      { path: 'news', component: NewsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    // to configure the TranslateModule by specifying a loader, a parser and/or a missing translations handler
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
