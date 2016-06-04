/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
import { NgZone } from '@angular/core';
import { BingMapInfoWindow } from '../directives/bing-map-info-window';
import { BingMapsAPIWrapper } from './bing-maps-api-wrapper';
import { InfoWindowOptions } from './bing-maps-types';
export declare class InfoWindowManager {
    private _mapsWrapper;
    private _zone;
    private _infoWindows;
    constructor(_mapsWrapper: BingMapsAPIWrapper, _zone: NgZone);
    deleteInfoWindow(infoWindow: BingMapInfoWindow): Promise<void>;
    setPosition(infoWindow: BingMapInfoWindow): Promise<void>;
    open(infoWindow: BingMapInfoWindow): Promise<void>;
    close(infoWindow: BingMapInfoWindow): Promise<void>;
    setOptions(infoWindow: BingMapInfoWindow, options: InfoWindowOptions): Promise<void>;
    addInfoWindow(infoWindow: BingMapInfoWindow): void;
}
