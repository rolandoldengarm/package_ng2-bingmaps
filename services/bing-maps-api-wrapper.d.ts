/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import * as mapTypes from './bing-maps-types';
import { LazyMapsAPILoaderConfig } from './maps-api-loader/lazy-maps-api-loader';
/**
 * Wrapper class that handles the communication with the Bing Maps Javascript
 * API v8
 */
export declare class BingMapsAPIWrapper {
    private _loader;
    private _zone;
    private _config;
    private _map;
    private _mapResolver;
    constructor(_loader: MapsAPILoader, _zone: NgZone, _config: LazyMapsAPILoaderConfig);
    createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void>;
    setMapOptions(options: mapTypes.MapOptions): void;
    /**
     * Creates a Bing map marker with the map context
     */
    createMarker(options?: mapTypes.MarkerOptions): Promise<mapTypes.Marker>;
    createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow>;
    subscribeToMapEvent<E>(eventName: string): Observable<E>;
    setCenter(latLng: mapTypes.LatLngLiteral): Promise<void>;
    getZoom(): Promise<number>;
    setZoom(zoom: number): Promise<void>;
    getCenter(): Promise<mapTypes.LatLngLiteral>;
    /**
     * Triggers the given event name on the map instance.
     */
    triggerMapEvent(eventName: string): Promise<void>;
}
