/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
"use strict";
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
var noop_maps_api_loader_1 = require('./services/maps-api-loader/noop-maps-api-loader');
exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;
var bing_maps_api_wrapper_1 = require('./services/bing-maps-api-wrapper');
exports.BingMapsAPIWrapper = bing_maps_api_wrapper_1.BingMapsAPIWrapper;
var marker_manager_1 = require('./services/marker-manager');
exports.MarkerManager = marker_manager_1.MarkerManager;
var info_window_manager_1 = require('./services/info-window-manager');
exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
exports.LazyMapsAPILoaderConfig = lazy_maps_api_loader_1.LazyMapsAPILoaderConfig;
exports.ScriptProtocol = lazy_maps_api_loader_1.ScriptProtocol;

//# sourceMappingURL=services.js.map
