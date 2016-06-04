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
/**
 * BingMapInfoWindowAction renders an action in an info window {@link BingMapInfoWindow}
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
 *        <bing-map-info-window>
 *          <bing-map-info-window-action [label]="actionlabel" (actionClicked)="actionClicked()></bing-map-info-window-action>
 *        </bing-map-info-window>
 *      </bing-map-marker>
 *    </bing-map>
 *  `
 * })
 * ```
 */
var BingMapInfoWindowAction = (function () {
    function BingMapInfoWindowAction() {
        /**
         * Emits an event when the action has been clicked
         */
        this.actionClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BingMapInfoWindowAction.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BingMapInfoWindowAction.prototype, "actionClicked", void 0);
    BingMapInfoWindowAction = __decorate([
        core_1.Directive({
            selector: 'bing-map-info-window-action'
        }), 
        __metadata('design:paramtypes', [])
    ], BingMapInfoWindowAction);
    return BingMapInfoWindowAction;
}());
exports.BingMapInfoWindowAction = BingMapInfoWindowAction;

//# sourceMappingURL=bing-map-info-window-action.js.map
