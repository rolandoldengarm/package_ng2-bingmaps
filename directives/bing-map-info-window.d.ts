/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
import { SimpleChange, OnDestroy, OnChanges, EventEmitter, QueryList } from '@angular/core';
import { InfoWindowManager } from '../services/info-window-manager';
import { BingMapMarker } from './bing-map-marker';
import { BingMapInfoWindowAction } from './bing-map-info-window-action';
/**
 * BingMapInfoWindow renders a info window inside a {@link BingMapMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {NG2_BINGMAPS_DIRECTIVES} from 'ng2-bingmaps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [NG2_BINGMAPS_DIRECTIVES],
 *  styles: [`
 *    .bing-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <bing-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <bing-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <bing-map-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </bing-map-info-window>
 *      </bing-map-marker>
 *    </bing-map>
 *  `
 * })
 * ```
 */
export declare class BingMapInfoWindow implements OnDestroy, OnChanges {
    private _infoWindowManager;
    /**
     * The latitude position of the info window (only usefull if you use it ouside of a {@link
     * SebmGoogleMapMarker}).
     */
    latitude: number;
    /**
     * The longitude position of the info window (only usefull if you use it ouside of a {@link
     * SebmGoogleMapMarker}).
     */
    longitude: number;
    /**
     * The title to display in the info window
     */
    title: string;
    /**
     * The description to display in the info window.
     */
    description: string;
    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     */
    disableAutoPan: boolean;
    /**
     * Maximum width of the infowindow, regardless of content's width. This value is only considered
     * if it is set before a call to open. To change the maximum width when changing content, call
     * close, update maxWidth, and then open.
     */
    maxWidth: number;
    /**
     * Holds the marker that is the host of the info window (if available)
     */
    hostMarker: BingMapMarker;
    /**
     * Emits an event when the info window is closed.
     */
    infoWindowClose: EventEmitter<void>;
    /**
     * Zero or more actions to show on the info window
     */
    infoWindowActions: QueryList<BingMapInfoWindowAction>;
    private static _infoWindowOptionsInputs;
    private _infoWindowAddedToManager;
    private _id;
    constructor(_infoWindowManager: InfoWindowManager);
    ngAfterContentInit(): void;
    /** @internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private _setInfoWindowOptions(changes);
    /**
     * Opens the info window.
     */
    open(): Promise<void>;
    /**
     * Closes the info window.
     */
    close(): Promise<void>;
    /** @internal */
    id(): string;
    /** @internal */
    toString(): string;
    /** @internal */
    ngOnDestroy(): void;
}
