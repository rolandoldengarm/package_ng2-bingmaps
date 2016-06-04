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
var Observable_1 = require('rxjs/Observable');
var maps_api_loader_1 = require('./maps-api-loader/maps-api-loader');
var mapTypes = require('./bing-maps-types');
var lazy_maps_api_loader_1 = require('./maps-api-loader/lazy-maps-api-loader');
/**
 * Wrapper class that handles the communication with the Bing Maps Javascript
 * API v8
 */
var BingMapsAPIWrapper = (function () {
    function BingMapsAPIWrapper(_loader, _zone, _config) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._config = _config;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    BingMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            // todo other options
            var map = new Microsoft.Maps.Map(el, {
                credentials: _this._config.apiKey,
                center: new Microsoft.Maps.Location(mapOptions.center.lat, mapOptions.center.lng),
                zoom: mapOptions.zoom,
                mapTypeId: mapOptions.mapTypeId
            });
            _this._mapResolver(map);
            return;
        });
    };
    BingMapsAPIWrapper.prototype.setMapOptions = function (options) {
        this._map.then(function (m) {
            m.setOptions({
                center: new Microsoft.Maps.Location(options.center.lat, options.center.lng),
                zoom: options.zoom,
                mapTypeId: options.mapTypeId
            });
            // todo other options
        });
    };
    /**
     * Creates a Bing map marker with the map context
     */
    BingMapsAPIWrapper.prototype.createMarker = function (options) {
        if (options === void 0) { options = {}; }
        return this._map.then(function (map) {
            var loc = new Microsoft.Maps.Location(options.position.lat, options.position.lng);
            var pushpin = new Microsoft.Maps.Pushpin(loc);
            map.entities.push(pushpin);
            return new mapTypes.Marker(map, pushpin);
        });
    };
    BingMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._map.then(function (map) {
            var infoBox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(options.position.lat, options.position.lng), {
                visible: false,
                title: options.title,
                description: options.description,
                actions: options.actions
            });
            map.entities.push(infoBox);
            return new mapTypes.InfoWindow(map, infoBox);
        });
    };
    BingMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this._map.then(function (m) {
                Microsoft.Maps.Events.addHandler(m, eventName, function (e) {
                    _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    BingMapsAPIWrapper.prototype.setCenter = function (latLng) {
        return this._map.then(function (map) { return map.setOptions({ center: new Microsoft.Maps.Location(latLng.lat, latLng.lng) }); });
    };
    BingMapsAPIWrapper.prototype.getZoom = function () {
        return this._map.then(function (map) { return map.getZoom(); });
    };
    BingMapsAPIWrapper.prototype.setZoom = function (zoom) {
        return this._map.then(function (map) { return map.setOptions({ zoom: zoom }); });
    };
    BingMapsAPIWrapper.prototype.getCenter = function () {
        return this._map.then(function (map) {
            var center = map.getCenter();
            return {
                lat: center.latitude,
                lng: center.longitude
            };
        });
    };
    /**
     * Triggers the given event name on the map instance.
     */
    BingMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return Microsoft.Maps.Events.invoke(m, eventName, null); });
    };
    BingMapsAPIWrapper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [maps_api_loader_1.MapsAPILoader, core_1.NgZone, lazy_maps_api_loader_1.LazyMapsAPILoaderConfig])
    ], BingMapsAPIWrapper);
    return BingMapsAPIWrapper;
}());
exports.BingMapsAPIWrapper = BingMapsAPIWrapper;

//# sourceMappingURL=bing-maps-api-wrapper.js.map
