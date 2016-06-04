/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BingMapMarker } from '../directives/bing-map-marker';
import { BingMapsAPIWrapper } from './bing-maps-api-wrapper';
import { Marker } from './bing-maps-types';
export declare class MarkerManager {
    private _mapsWrapper;
    private _zone;
    private _markers;
    constructor(_mapsWrapper: BingMapsAPIWrapper, _zone: NgZone);
    deleteMarker(marker: BingMapMarker): Promise<void>;
    updateMarkerPosition(marker: BingMapMarker): Promise<void>;
    updateTitle(marker: BingMapMarker): Promise<void>;
    updateLabel(marker: BingMapMarker): Promise<void>;
    updateDraggable(marker: BingMapMarker): Promise<void>;
    updateIcon(marker: BingMapMarker): Promise<void>;
    addMarker(marker: BingMapMarker): void;
    getNativeMarker(marker: BingMapMarker): Promise<Marker>;
    createEventObservable<T>(eventName: string, marker: BingMapMarker): Observable<T>;
}
