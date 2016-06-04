/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
// main modules
__export(require('./directives'));
__export(require('./services'));
exports.NG2_BINGMAPS_PROVIDERS = [
    new core_1.Provider(maps_api_loader_1.MapsAPILoader, { useClass: lazy_maps_api_loader_1.LazyMapsAPILoader }),
];

//# sourceMappingURL=core.js.map
