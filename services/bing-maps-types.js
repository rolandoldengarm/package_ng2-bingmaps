/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
"use strict";
var Marker = (function () {
    function Marker(map, pushpin) {
        this.map = map;
        this.pushpin = pushpin;
    }
    Marker.prototype.setPosition = function (latLng) {
        this.pushpin.setLocation(new Microsoft.Maps.Location(latLng.lat, latLng.lng));
    };
    Marker.prototype.deleteMarker = function () {
        this.pushpin.setOptions({ visible: false });
    };
    Marker.prototype.setTitle = function (title) {
        console.log('set title');
        this.pushpin.setOptions({ text: title });
    };
    Marker.prototype.setLabel = function (label) {
        // title does not exist on the TSD.
        this.pushpin.setOptions({ title: label });
    };
    Marker.prototype.setDraggable = function (draggable) {
        this.pushpin.setOptions({ draggable: draggable });
    };
    Marker.prototype.setIcon = function (icon) {
        this.pushpin.setOptions({ icon: icon });
    };
    Marker.prototype.getLabel = function () {
        return null;
    };
    Marker.prototype.addListener = function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this.pushpin, eventType, function (e) {
            fn(e);
        });
    };
    return Marker;
}());
exports.Marker = Marker;
(function (MapTypeId) {
    MapTypeId[MapTypeId["aerial"] = 0] = "aerial";
    MapTypeId[MapTypeId["auto"] = 1] = "auto";
    MapTypeId[MapTypeId["birdseye"] = 2] = "birdseye";
    MapTypeId[MapTypeId["collinsBart"] = 3] = "collinsBart";
    MapTypeId[MapTypeId["mercator"] = 4] = "mercator";
    MapTypeId[MapTypeId["ordnanceSurvey"] = 5] = "ordnanceSurvey";
    MapTypeId[MapTypeId["road"] = 6] = "road";
})(exports.MapTypeId || (exports.MapTypeId = {}));
var MapTypeId = exports.MapTypeId;
var InfoWindow = (function () {
    function InfoWindow(map, infoBox) {
        this.map = map;
        this.infoBox = infoBox;
    }
    InfoWindow.prototype.close = function () {
        this.infoBox.setMap(null);
        this.infoBox.setOptions({ visible: false });
    };
    ;
    InfoWindow.prototype.getPosition = function () {
        return {
            lat: this.infoBox.getLocation().latitude,
            lng: this.infoBox.getLocation().longitude
        };
    };
    ;
    InfoWindow.prototype.open = function () {
        // when using custom HTML, you have to do setMap.
        this.infoBox.setMap(this.map);
        this.infoBox.setOptions({ visible: true });
    };
    ;
    InfoWindow.prototype.setOptions = function (options) {
        this.infoBox.setOptions({
            title: options.title,
            description: options.title
        });
    };
    ;
    InfoWindow.prototype.setPosition = function (position) {
        this.infoBox.setLocation(new Microsoft.Maps.Location(position.lat, position.lng));
    };
    ;
    return InfoWindow;
}());
exports.InfoWindow = InfoWindow;

//# sourceMappingURL=bing-maps-types.js.map
