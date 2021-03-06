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
var marker_manager_1 = require('../services/marker-manager');
var bing_map_info_window_1 = require('./bing-map-info-window');
var markerId = 0;
/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
 * import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var BingMapMarker = (function () {
    function BingMapMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        this.draggable = false;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new core_1.EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new core_1.EventEmitter();
        this._markerAddedToManger = false;
        this._id = (markerId++).toString();
    }
    /* @internal */
    BingMapMarker.prototype.ngAfterContentInit = function () {
        if (this._infoWindow != null) {
            this._infoWindow.hostMarker = this;
        }
    };
    /** @internal */
    BingMapMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
    };
    BingMapMarker.prototype._addEventListeners = function () {
        var _this = this;
        this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this._infoWindow != null) {
                _this._infoWindow.open();
            }
            _this.markerClick.next(null);
        });
        this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            console.log('marker dragend, event: ' + e);
            // todo
            // this.dragEnd.next({coords: {lat: e.latLng.lat(), lng: e.latLng.lng()}});
        });
    };
    /** @internal */
    BingMapMarker.prototype.id = function () { return this._id; };
    /** @internal */
    BingMapMarker.prototype.toString = function () { return 'BingMapMarker-' + this._id.toString(); };
    /** @internal */
    BingMapMarker.prototype.ngOnDestroy = function () { this._markerManager.deleteMarker(this); };
    __decorate([
        core_1.ContentChild(bing_map_info_window_1.BingMapInfoWindow), 
        __metadata('design:type', bing_map_info_window_1.BingMapInfoWindow)
    ], BingMapMarker.prototype, "_infoWindow", void 0);
    BingMapMarker = __decorate([
        core_1.Directive({
            selector: 'bing-map-marker',
            inputs: ['latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl'],
            outputs: ['markerClick', 'dragEnd']
        }), 
        __metadata('design:paramtypes', [marker_manager_1.MarkerManager])
    ], BingMapMarker);
    return BingMapMarker;
}());
exports.BingMapMarker = BingMapMarker;

//# sourceMappingURL=bing-map-marker.js.map
