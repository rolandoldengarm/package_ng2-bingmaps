/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var bing_maps_api_wrapper_1 = require('../services/bing-maps-api-wrapper');
var marker_manager_1 = require('../services/marker-manager');
var info_window_manager_1 = require('../services/info-window-manager');
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
var BingMap = (function () {
    function BingMap(_elem, _mapsWrapper) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        this._longitude = 0;
        this._latitude = 0;
        this._zoom = 8;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * The enabled/disabled state of the Zoom control.
         */
        this.zoomControl = true;
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new core_1.EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new core_1.EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new core_1.EventEmitter();
    }
    /** @internal */
    BingMap.prototype.ngOnInit = function () {
        var container = this._elem.nativeElement.querySelector('.bing-map-container-inner');
        this._initMapInstance(container);
    };
    BingMap.prototype._initMapInstance = function (el) {
        this._mapsWrapper.createMap(el, {
            center: { lat: this._latitude, lng: this._longitude },
            zoom: this._zoom
        });
        this._handleMapCenterChange();
        this._handleMapZoomChange();
    };
    /* @internal */
    BingMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
    };
    BingMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return BingMap._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        // todo this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    BingMap.prototype.triggerResize = function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () { return _this._mapsWrapper.triggerMapEvent('resize').then(function () { return resolve(); }); });
        });
    };
    Object.defineProperty(BingMap.prototype, "zoom", {
        /**
         * Sets the zoom level of the map. The default value is `8`.
         */
        set: function (value) {
            this._zoom = this._convertToDecimal(value, 8);
            if (typeof this._zoom === 'number') {
                this._mapsWrapper.setZoom(this._zoom);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMap.prototype, "longitude", {
        /**
         * The longitude that sets the center of the map.
         */
        set: function (value) {
            this._longitude = this._convertToDecimal(value);
            this._updateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMap.prototype, "latitude", {
        /**
         * The latitude that sets the center of the map.
         */
        set: function (value) {
            this._latitude = this._convertToDecimal(value);
            this._updateCenter();
        },
        enumerable: true,
        configurable: true
    });
    BingMap.prototype._convertToDecimal = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return value;
        }
        return defaultValue;
    };
    BingMap.prototype._updateCenter = function () {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapsWrapper.setCenter({
            lat: this._latitude,
            lng: this._longitude,
        });
    };
    BingMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this._latitude = center.lat;
                _this._longitude = center.lng;
                _this.centerChange.emit({ lat: _this._latitude, lng: _this._longitude });
            });
        });
    };
    BingMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) { return _this._zoom = z; });
        });
    };
    /**
     * Map option attributes that can change over time
     */
    BingMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl'
    ];
    BingMap = __decorate([
        core_1.Component({
            selector: 'bing-map',
            providers: [bing_maps_api_wrapper_1.BingMapsAPIWrapper, marker_manager_1.MarkerManager, info_window_manager_1.InfoWindowManager],
            inputs: [
                'longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel',
                'backgroundColor', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl'
            ],
            outputs: ['mapClick', 'mapRightClick', 'mapDblClick', 'centerChange'],
            host: { '[class.bing-map-container]': 'true' },
            styles: ["\n    .bing-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .bing-map-content {\n      display:none;\n    }\n  "],
            template: "\n    <div class='bing-map-container-inner'></div>\n    <div class='bing-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, bing_maps_api_wrapper_1.BingMapsAPIWrapper])
    ], BingMap);
    return BingMap;
}());
exports.BingMap = BingMap;

//# sourceMappingURL=bing-map.js.map
