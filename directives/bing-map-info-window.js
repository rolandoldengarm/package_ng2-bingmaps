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
var info_window_manager_1 = require('../services/info-window-manager');
var bing_map_info_window_action_1 = require('./bing-map-info-window-action');
var infoWindowId = 0;
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
var BingMapInfoWindow = (function () {
    function BingMapInfoWindow(_infoWindowManager) {
        this._infoWindowManager = _infoWindowManager;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new core_1.EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    BingMapInfoWindow.prototype.ngAfterContentInit = function () {
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
    };
    /** @internal */
    BingMapInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        this._setInfoWindowOptions(changes);
    };
    BingMapInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return BingMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    BingMapInfoWindow.prototype.open = function () {
        return this._infoWindowManager.open(this);
    };
    /**
     * Closes the info window.
     */
    BingMapInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(void 0); });
    };
    /** @internal */
    BingMapInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    BingMapInfoWindow.prototype.toString = function () { return 'BingMapInfoWindow-' + this._id.toString(); };
    /** @internal */
    BingMapInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    BingMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth', 'title', 'description'];
    __decorate([
        core_1.ContentChildren(bing_map_info_window_action_1.BingMapInfoWindowAction), 
        __metadata('design:type', core_1.QueryList)
    ], BingMapInfoWindow.prototype, "infoWindowActions", void 0);
    BingMapInfoWindow = __decorate([
        core_1.Component({
            selector: 'bing-map-info-window',
            inputs: ['latitude', 'longitude', 'disableAutoPan', 'title', 'description'],
            directives: [bing_map_info_window_action_1.BingMapInfoWindowAction],
            template: '',
            outputs: ['infoWindowClose']
        }), 
        __metadata('design:paramtypes', [info_window_manager_1.InfoWindowManager])
    ], BingMapInfoWindow);
    return BingMapInfoWindow;
}());
exports.BingMapInfoWindow = BingMapInfoWindow;

//# sourceMappingURL=bing-map-info-window.js.map
