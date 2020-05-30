import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// Open Layers
import Feature from 'ol/Feature';
import { PlotInfo } from 'src/app/domain_model/plot-info';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss']
})
export class MapOverlayComponent implements OnInit {
  public objectKeys = Object.keys;

    public elements: any[] = [];

    public plot = false;

    @Output() public onClose = new EventEmitter<undefined>();
    @Output() public onSelectItem = new EventEmitter<Feature>();

  constructor() { }

  ngOnInit() {
  }

  @Input()
    set features(features: Feature[]) {
        if (features) {
            this.elements = [];
            if (features.length > 0) {
                const poi = features[0].get('poi');
                if (poi) {
                    features.forEach((feature) => {
                        const details = feature.get('poi');
                        this.elements.push(details);
                    });
                    this.plot = true;
                } else {
                    features.forEach((feature) => {
                        if (!this.elements[feature.get('type')]) {
                            this.elements[feature.get('type')] = [];
                        }

                        this.elements[feature.get('type')].push(
                            feature.getProperties(),
                        );
                    });
                }
            } else {
                this.plot = false;
            }
        }
    }

    public close() {
        this.onClose.emit();
    }

    public getPlotLocation(plotInfo: PlotInfo) {
      return (
        plotInfo.plCode +
          '' +
          plotInfo.plType +
            '/' +
            plotInfo.plName +
          '/' +
          plotInfo.plId
      );
  }

}
