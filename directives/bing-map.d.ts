/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { BingMapsAPIWrapper } from '../services/bing-maps-api-wrapper';
import { LatLngLiteral } from '../services/bing-maps-types';
/**
 * BingMap renders a Bing Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `bing-map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {BingMap} from 'ng2-bingmaps/directives';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [BingMap],
 *  styles: [`
 *    .bing-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
export declare class BingMap implements OnChanges, OnInit {
    private _elem;
    private _mapsWrapper;
    private _longitude;
    private _latitude;
    private _zoom;
    /**
     * Enables/disables zoom and center on double click. Enabled by default.
     */
    disableDoubleClickZoom: boolean;
    /**
     * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
     */
    scrollwheel: boolean;
    /**
     * Color used for the background of the Map div. This color will be visible when tiles have not
     * yet loaded as the user pans. This option can only be set when the map is initialized.
     */
    backgroundColor: string;
    /**
     * The name or url of the cursor to display when mousing over a draggable map. This property uses
     * the css  * cursor attribute to change the icon. As with the css property, you must specify at
     * least one fallback cursor that is not a URL. For example:
     * [draggableCursor]="'url(http://www.example.com/icon.png), auto;'"
     */
    draggableCursor: string;
    /**
     * The name or url of the cursor to display when the map is being dragged. This property uses the
     * css cursor attribute to change the icon. As with the css property, you must specify at least
     * one fallback cursor that is not a URL. For example:
     * [draggingCursor]="'url(http://www.example.com/icon.png), auto;'"
     */
    draggingCursor: string;
    /**
     * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
     * enabled by default.
     */
    keyboardShortcuts: boolean;
    /**
     * The enabled/disabled state of the Zoom control.
     */
    zoomControl: boolean;
    /**
     * Map option attributes that can change over time
     */
    private static _mapOptionsAttributes;
    /**
     * This event emitter gets emitted when the user clicks on the map (but not when they click on a
     * marker or infoWindow).
     */
    mapClick: EventEmitter<MouseEvent>;
    /**
     * This event emitter gets emitted when the user right-clicks on the map (but not when they click
     * on a marker or infoWindow).
     */
    mapRightClick: EventEmitter<MouseEvent>;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     */
    mapDblClick: EventEmitter<MouseEvent>;
    /**
     * This event emitter is fired when the map center changes.
     */
    centerChange: EventEmitter<LatLngLiteral>;
    constructor(_elem: ElementRef, _mapsWrapper: BingMapsAPIWrapper);
    /** @internal */
    ngOnInit(): void;
    private _initMapInstance(el);
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    private _updateMapOptionsChanges(changes);
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    triggerResize(): Promise<void>;
    /**
     * Sets the zoom level of the map. The default value is `8`.
     */
    zoom: number | string;
    /**
     * The longitude that sets the center of the map.
     */
    longitude: number | string;
    /**
     * The latitude that sets the center of the map.
     */
    latitude: number | string;
    private _convertToDecimal(value, defaultValue?);
    private _updateCenter();
    private _handleMapCenterChange();
    private _handleMapZoomChange();
}
