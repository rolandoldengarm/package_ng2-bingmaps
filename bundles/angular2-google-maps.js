System.registerDynamic("angular2-google-maps/directives/bing-map.js", ["@angular/core", "../services/bing-maps-api-wrapper", "../services/marker-manager", "../services/info-window-manager"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var bing_maps_api_wrapper_1 = $__require('../services/bing-maps-api-wrapper');
  var marker_manager_1 = $__require('../services/marker-manager');
  var info_window_manager_1 = $__require('../services/info-window-manager');
  var BingMap = (function() {
    function BingMap(_elem, _mapsWrapper) {
      this._elem = _elem;
      this._mapsWrapper = _mapsWrapper;
      this._longitude = 0;
      this._latitude = 0;
      this._zoom = 8;
      this.disableDoubleClickZoom = false;
      this.scrollwheel = true;
      this.keyboardShortcuts = true;
      this.zoomControl = true;
      this.mapClick = new core_1.EventEmitter();
      this.mapRightClick = new core_1.EventEmitter();
      this.mapDblClick = new core_1.EventEmitter();
      this.centerChange = new core_1.EventEmitter();
    }
    BingMap.prototype.ngOnInit = function() {
      var container = this._elem.nativeElement.querySelector('.bing-map-container-inner');
      this._initMapInstance(container);
    };
    BingMap.prototype._initMapInstance = function(el) {
      this._mapsWrapper.createMap(el, {
        center: {
          lat: this._latitude,
          lng: this._longitude
        },
        zoom: this._zoom
      });
      this._handleMapCenterChange();
      this._handleMapZoomChange();
    };
    BingMap.prototype.ngOnChanges = function(changes) {
      this._updateMapOptionsChanges(changes);
    };
    BingMap.prototype._updateMapOptionsChanges = function(changes) {
      var options = {};
      var optionKeys = Object.keys(changes).filter(function(k) {
        return BingMap._mapOptionsAttributes.indexOf(k) !== -1;
      });
      optionKeys.forEach(function(k) {
        options[k] = changes[k].currentValue;
      });
    };
    BingMap.prototype.triggerResize = function() {
      var _this = this;
      return new Promise(function(resolve) {
        setTimeout(function() {
          return _this._mapsWrapper.triggerMapEvent('resize').then(function() {
            return resolve();
          });
        });
      });
    };
    Object.defineProperty(BingMap.prototype, "zoom", {
      set: function(value) {
        this._zoom = this._convertToDecimal(value, 8);
        if (typeof this._zoom === 'number') {
          this._mapsWrapper.setZoom(this._zoom);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BingMap.prototype, "longitude", {
      set: function(value) {
        this._longitude = this._convertToDecimal(value);
        this._updateCenter();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BingMap.prototype, "latitude", {
      set: function(value) {
        this._latitude = this._convertToDecimal(value);
        this._updateCenter();
      },
      enumerable: true,
      configurable: true
    });
    BingMap.prototype._convertToDecimal = function(value, defaultValue) {
      if (defaultValue === void 0) {
        defaultValue = null;
      }
      if (typeof value === 'string') {
        return parseFloat(value);
      } else if (typeof value === 'number') {
        return value;
      }
      return defaultValue;
    };
    BingMap.prototype._updateCenter = function() {
      if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
        return;
      }
      this._mapsWrapper.setCenter({
        lat: this._latitude,
        lng: this._longitude
      });
    };
    BingMap.prototype._handleMapCenterChange = function() {
      var _this = this;
      this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function() {
        _this._mapsWrapper.getCenter().then(function(center) {
          _this._latitude = center.lat;
          _this._longitude = center.lng;
          _this.centerChange.emit({
            lat: _this._latitude,
            lng: _this._longitude
          });
        });
      });
    };
    BingMap.prototype._handleMapZoomChange = function() {
      var _this = this;
      this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function() {
        _this._mapsWrapper.getZoom().then(function(z) {
          return _this._zoom = z;
        });
      });
    };
    BingMap._mapOptionsAttributes = ['disableDoubleClickZoom', 'scrollwheel', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl'];
    BingMap = __decorate([core_1.Component({
      selector: 'bing-map',
      providers: [bing_maps_api_wrapper_1.BingMapsAPIWrapper, marker_manager_1.MarkerManager, info_window_manager_1.InfoWindowManager],
      inputs: ['longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel', 'backgroundColor', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl'],
      outputs: ['mapClick', 'mapRightClick', 'mapDblClick', 'centerChange'],
      host: {'[class.bing-map-container]': 'true'},
      styles: ["\n    .bing-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .bing-map-content {\n      display:none;\n    }\n  "],
      template: "\n    <div class='bing-map-container-inner'></div>\n    <div class='bing-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
    }), __metadata('design:paramtypes', [core_1.ElementRef, bing_maps_api_wrapper_1.BingMapsAPIWrapper])], BingMap);
    return BingMap;
  }());
  exports.BingMap = BingMap;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives/bing-map-marker.js", ["@angular/core", "../services/marker-manager", "./bing-map-info-window"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var marker_manager_1 = $__require('../services/marker-manager');
  var bing_map_info_window_1 = $__require('./bing-map-info-window');
  var markerId = 0;
  var BingMapMarker = (function() {
    function BingMapMarker(_markerManager) {
      this._markerManager = _markerManager;
      this.draggable = false;
      this.markerClick = new core_1.EventEmitter();
      this.dragEnd = new core_1.EventEmitter();
      this._markerAddedToManger = false;
      this._id = (markerId++).toString();
    }
    BingMapMarker.prototype.ngAfterContentInit = function() {
      if (this._infoWindow != null) {
        this._infoWindow.hostMarker = this;
      }
    };
    BingMapMarker.prototype.ngOnChanges = function(changes) {
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
    BingMapMarker.prototype._addEventListeners = function() {
      var _this = this;
      this._markerManager.createEventObservable('click', this).subscribe(function() {
        if (_this._infoWindow != null) {
          _this._infoWindow.open();
        }
        _this.markerClick.next(null);
      });
      this._markerManager.createEventObservable('dragend', this).subscribe(function(e) {
        console.log('marker dragend, event: ' + e);
      });
    };
    BingMapMarker.prototype.id = function() {
      return this._id;
    };
    BingMapMarker.prototype.toString = function() {
      return 'BingMapMarker-' + this._id.toString();
    };
    BingMapMarker.prototype.ngOnDestroy = function() {
      this._markerManager.deleteMarker(this);
    };
    __decorate([core_1.ContentChild(bing_map_info_window_1.BingMapInfoWindow), __metadata('design:type', bing_map_info_window_1.BingMapInfoWindow)], BingMapMarker.prototype, "_infoWindow", void 0);
    BingMapMarker = __decorate([core_1.Directive({
      selector: 'bing-map-marker',
      inputs: ['latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl'],
      outputs: ['markerClick', 'dragEnd']
    }), __metadata('design:paramtypes', [marker_manager_1.MarkerManager])], BingMapMarker);
    return BingMapMarker;
  }());
  exports.BingMapMarker = BingMapMarker;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives/bing-map-info-window.js", ["@angular/core", "../services/info-window-manager", "./bing-map-info-window-action"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var info_window_manager_1 = $__require('../services/info-window-manager');
  var bing_map_info_window_action_1 = $__require('./bing-map-info-window-action');
  var infoWindowId = 0;
  var BingMapInfoWindow = (function() {
    function BingMapInfoWindow(_infoWindowManager) {
      this._infoWindowManager = _infoWindowManager;
      this.infoWindowClose = new core_1.EventEmitter();
      this._infoWindowAddedToManager = false;
      this._id = (infoWindowId++).toString();
    }
    BingMapInfoWindow.prototype.ngAfterContentInit = function() {
      this._infoWindowManager.addInfoWindow(this);
      this._infoWindowAddedToManager = true;
    };
    BingMapInfoWindow.prototype.ngOnChanges = function(changes) {
      if (!this._infoWindowAddedToManager) {
        return;
      }
      if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' && typeof this.longitude === 'number') {
        this._infoWindowManager.setPosition(this);
      }
      this._setInfoWindowOptions(changes);
    };
    BingMapInfoWindow.prototype._setInfoWindowOptions = function(changes) {
      var options = {};
      var optionKeys = Object.keys(changes).filter(function(k) {
        return BingMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1;
      });
      optionKeys.forEach(function(k) {
        options[k] = changes[k].currentValue;
      });
      this._infoWindowManager.setOptions(this, options);
    };
    BingMapInfoWindow.prototype.open = function() {
      return this._infoWindowManager.open(this);
    };
    BingMapInfoWindow.prototype.close = function() {
      var _this = this;
      return this._infoWindowManager.close(this).then(function() {
        _this.infoWindowClose.emit(void 0);
      });
    };
    BingMapInfoWindow.prototype.id = function() {
      return this._id;
    };
    BingMapInfoWindow.prototype.toString = function() {
      return 'BingMapInfoWindow-' + this._id.toString();
    };
    BingMapInfoWindow.prototype.ngOnDestroy = function() {
      this._infoWindowManager.deleteInfoWindow(this);
    };
    BingMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth', 'title', 'description'];
    __decorate([core_1.ContentChildren(bing_map_info_window_action_1.BingMapInfoWindowAction), __metadata('design:type', core_1.QueryList)], BingMapInfoWindow.prototype, "infoWindowActions", void 0);
    BingMapInfoWindow = __decorate([core_1.Component({
      selector: 'bing-map-info-window',
      inputs: ['latitude', 'longitude', 'disableAutoPan', 'title', 'description'],
      directives: [bing_map_info_window_action_1.BingMapInfoWindowAction],
      template: '',
      outputs: ['infoWindowClose']
    }), __metadata('design:paramtypes', [info_window_manager_1.InfoWindowManager])], BingMapInfoWindow);
    return BingMapInfoWindow;
  }());
  exports.BingMapInfoWindow = BingMapInfoWindow;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives/bing-map-info-window-action.js", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var BingMapInfoWindowAction = (function() {
    function BingMapInfoWindowAction() {
      this.actionClicked = new core_1.EventEmitter();
    }
    __decorate([core_1.Input(), __metadata('design:type', String)], BingMapInfoWindowAction.prototype, "label", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], BingMapInfoWindowAction.prototype, "actionClicked", void 0);
    BingMapInfoWindowAction = __decorate([core_1.Directive({selector: 'bing-map-info-window-action'}), __metadata('design:paramtypes', [])], BingMapInfoWindowAction);
    return BingMapInfoWindowAction;
  }());
  exports.BingMapInfoWindowAction = BingMapInfoWindowAction;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/directives.js", ["./directives/bing-map", "./directives/bing-map-marker", "./directives/bing-map-info-window", "./directives/bing-map-info-window-action"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var bing_map_1 = $__require('./directives/bing-map');
  var bing_map_marker_1 = $__require('./directives/bing-map-marker');
  var bing_map_info_window_1 = $__require('./directives/bing-map-info-window');
  var bing_map_info_window_action_1 = $__require('./directives/bing-map-info-window-action');
  var bing_map_2 = $__require('./directives/bing-map');
  exports.BingMap = bing_map_2.BingMap;
  var bing_map_marker_2 = $__require('./directives/bing-map-marker');
  exports.BingMapMarker = bing_map_marker_2.BingMapMarker;
  var bing_map_info_window_2 = $__require('./directives/bing-map-info-window');
  exports.BingMapInfoWindow = bing_map_info_window_2.BingMapInfoWindow;
  exports.NG2_BINGMAPS_DIRECTIVES = [bing_map_1.BingMap, bing_map_marker_1.BingMapMarker, bing_map_info_window_1.BingMapInfoWindow, bing_map_info_window_action_1.BingMapInfoWindowAction];
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/maps-api-loader/noop-maps-api-loader.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var NoOpMapsAPILoader = (function() {
    function NoOpMapsAPILoader() {}
    NoOpMapsAPILoader.prototype.load = function() {
      throw new Error('todo');
    };
    ;
    return NoOpMapsAPILoader;
  }());
  exports.NoOpMapsAPILoader = NoOpMapsAPILoader;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/marker-manager.js", ["@angular/core", "rxjs/Observable", "./bing-maps-api-wrapper"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var Observable_1 = $__require('rxjs/Observable');
  var bing_maps_api_wrapper_1 = $__require('./bing-maps-api-wrapper');
  var MarkerManager = (function() {
    function MarkerManager(_mapsWrapper, _zone) {
      this._mapsWrapper = _mapsWrapper;
      this._zone = _zone;
      this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function(marker) {
      var _this = this;
      var m = this._markers.get(marker);
      if (m == null) {
        return Promise.resolve();
      }
      return m.then(function(m) {
        return _this._zone.run(function() {
          m.deleteMarker();
          _this._markers.delete(marker);
        });
      });
    };
    MarkerManager.prototype.updateMarkerPosition = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setPosition({
          lat: marker.latitude,
          lng: marker.longitude
        });
      });
    };
    MarkerManager.prototype.updateTitle = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setTitle(marker.title);
      });
    };
    MarkerManager.prototype.updateLabel = function(marker) {
      return this._markers.get(marker).then(function(m) {
        m.setLabel(marker.label);
      });
    };
    MarkerManager.prototype.updateDraggable = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setDraggable(marker.draggable);
      });
    };
    MarkerManager.prototype.updateIcon = function(marker) {
      return this._markers.get(marker).then(function(m) {
        return m.setIcon(marker.iconUrl);
      });
    };
    MarkerManager.prototype.addMarker = function(marker) {
      var markerPromise = this._mapsWrapper.createMarker({
        position: {
          lat: marker.latitude,
          lng: marker.longitude
        },
        label: marker.label,
        draggable: marker.draggable,
        icon: marker.iconUrl
      });
      this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function(marker) {
      return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function(eventName, marker) {
      var _this = this;
      return Observable_1.Observable.create(function(observer) {
        _this._markers.get(marker).then(function(m) {
          m.addListener(eventName, function(e) {
            return _this._zone.run(function() {
              return observer.next(e);
            });
          });
        });
      });
    };
    MarkerManager = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [bing_maps_api_wrapper_1.BingMapsAPIWrapper, core_1.NgZone])], MarkerManager);
    return MarkerManager;
  }());
  exports.MarkerManager = MarkerManager;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/bing-maps-types.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Marker = (function() {
    function Marker(map, pushpin) {
      this.map = map;
      this.pushpin = pushpin;
    }
    Marker.prototype.setPosition = function(latLng) {
      this.pushpin.setLocation(new Microsoft.Maps.Location(latLng.lat, latLng.lng));
    };
    Marker.prototype.deleteMarker = function() {
      this.pushpin.setOptions({visible: false});
    };
    Marker.prototype.setTitle = function(title) {
      console.log('set title');
      this.pushpin.setOptions({text: title});
    };
    Marker.prototype.setLabel = function(label) {
      this.pushpin.setOptions({title: label});
    };
    Marker.prototype.setDraggable = function(draggable) {
      this.pushpin.setOptions({draggable: draggable});
    };
    Marker.prototype.setIcon = function(icon) {
      this.pushpin.setOptions({icon: icon});
    };
    Marker.prototype.getLabel = function() {
      return null;
    };
    Marker.prototype.addListener = function(eventType, fn) {
      Microsoft.Maps.Events.addHandler(this.pushpin, eventType, function(e) {
        fn(e);
      });
    };
    return Marker;
  }());
  exports.Marker = Marker;
  (function(MapTypeId) {
    MapTypeId[MapTypeId["aerial"] = 0] = "aerial";
    MapTypeId[MapTypeId["auto"] = 1] = "auto";
    MapTypeId[MapTypeId["birdseye"] = 2] = "birdseye";
    MapTypeId[MapTypeId["collinsBart"] = 3] = "collinsBart";
    MapTypeId[MapTypeId["mercator"] = 4] = "mercator";
    MapTypeId[MapTypeId["ordnanceSurvey"] = 5] = "ordnanceSurvey";
    MapTypeId[MapTypeId["road"] = 6] = "road";
  })(exports.MapTypeId || (exports.MapTypeId = {}));
  var MapTypeId = exports.MapTypeId;
  var InfoWindow = (function() {
    function InfoWindow(map, infoBox) {
      this.map = map;
      this.infoBox = infoBox;
    }
    InfoWindow.prototype.close = function() {
      this.infoBox.setMap(null);
      this.infoBox.setOptions({visible: false});
    };
    ;
    InfoWindow.prototype.getPosition = function() {
      return {
        lat: this.infoBox.getLocation().latitude,
        lng: this.infoBox.getLocation().longitude
      };
    };
    ;
    InfoWindow.prototype.open = function() {
      this.infoBox.setMap(this.map);
      this.infoBox.setOptions({visible: true});
    };
    ;
    InfoWindow.prototype.setOptions = function(options) {
      this.infoBox.setOptions({
        title: options.title,
        description: options.title
      });
    };
    ;
    InfoWindow.prototype.setPosition = function(position) {
      this.infoBox.setLocation(new Microsoft.Maps.Location(position.lat, position.lng));
    };
    ;
    return InfoWindow;
  }());
  exports.InfoWindow = InfoWindow;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/bing-maps-api-wrapper.js", ["@angular/core", "rxjs/Observable", "./maps-api-loader/maps-api-loader", "./bing-maps-types", "./maps-api-loader/lazy-maps-api-loader"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var Observable_1 = $__require('rxjs/Observable');
  var maps_api_loader_1 = $__require('./maps-api-loader/maps-api-loader');
  var mapTypes = $__require('./bing-maps-types');
  var lazy_maps_api_loader_1 = $__require('./maps-api-loader/lazy-maps-api-loader');
  var BingMapsAPIWrapper = (function() {
    function BingMapsAPIWrapper(_loader, _zone, _config) {
      var _this = this;
      this._loader = _loader;
      this._zone = _zone;
      this._config = _config;
      this._map = new Promise(function(resolve) {
        _this._mapResolver = resolve;
      });
    }
    BingMapsAPIWrapper.prototype.createMap = function(el, mapOptions) {
      var _this = this;
      return this._loader.load().then(function() {
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
    BingMapsAPIWrapper.prototype.setMapOptions = function(options) {
      this._map.then(function(m) {
        m.setOptions({
          center: new Microsoft.Maps.Location(options.center.lat, options.center.lng),
          zoom: options.zoom,
          mapTypeId: options.mapTypeId
        });
      });
    };
    BingMapsAPIWrapper.prototype.createMarker = function(options) {
      if (options === void 0) {
        options = {};
      }
      return this._map.then(function(map) {
        var loc = new Microsoft.Maps.Location(options.position.lat, options.position.lng);
        var pushpin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pushpin);
        return new mapTypes.Marker(map, pushpin);
      });
    };
    BingMapsAPIWrapper.prototype.createInfoWindow = function(options) {
      return this._map.then(function(map) {
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
    BingMapsAPIWrapper.prototype.subscribeToMapEvent = function(eventName) {
      var _this = this;
      return Observable_1.Observable.create(function(observer) {
        _this._map.then(function(m) {
          Microsoft.Maps.Events.addHandler(m, eventName, function(e) {
            _this._zone.run(function() {
              return observer.next(e);
            });
          });
        });
      });
    };
    BingMapsAPIWrapper.prototype.setCenter = function(latLng) {
      return this._map.then(function(map) {
        return map.setOptions({center: new Microsoft.Maps.Location(latLng.lat, latLng.lng)});
      });
    };
    BingMapsAPIWrapper.prototype.getZoom = function() {
      return this._map.then(function(map) {
        return map.getZoom();
      });
    };
    BingMapsAPIWrapper.prototype.setZoom = function(zoom) {
      return this._map.then(function(map) {
        return map.setOptions({zoom: zoom});
      });
    };
    BingMapsAPIWrapper.prototype.getCenter = function() {
      return this._map.then(function(map) {
        var center = map.getCenter();
        return {
          lat: center.latitude,
          lng: center.longitude
        };
      });
    };
    BingMapsAPIWrapper.prototype.triggerMapEvent = function(eventName) {
      return this._map.then(function(m) {
        return Microsoft.Maps.Events.invoke(m, eventName, null);
      });
    };
    BingMapsAPIWrapper = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [maps_api_loader_1.MapsAPILoader, core_1.NgZone, lazy_maps_api_loader_1.LazyMapsAPILoaderConfig])], BingMapsAPIWrapper);
    return BingMapsAPIWrapper;
  }());
  exports.BingMapsAPIWrapper = BingMapsAPIWrapper;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/info-window-manager.js", ["@angular/core", "./bing-maps-api-wrapper"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var bing_maps_api_wrapper_1 = $__require('./bing-maps-api-wrapper');
  var InfoWindowManager = (function() {
    function InfoWindowManager(_mapsWrapper, _zone) {
      this._mapsWrapper = _mapsWrapper;
      this._zone = _zone;
      this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function(infoWindow) {
      var _this = this;
      var iWindow = this._infoWindows.get(infoWindow);
      if (iWindow == null) {
        return Promise.resolve();
      }
      return iWindow.then(function(i) {
        return _this._zone.run(function() {
          i.close();
          _this._infoWindows.delete(infoWindow);
        });
      });
    };
    InfoWindowManager.prototype.setPosition = function(infoWindow) {
      return this._infoWindows.get(infoWindow).then(function(i) {
        return i.setPosition({
          lat: infoWindow.latitude,
          lng: infoWindow.longitude
        });
      });
    };
    InfoWindowManager.prototype.open = function(infoWindow) {
      return this._infoWindows.get(infoWindow).then(function(w) {
        w.open();
      });
    };
    InfoWindowManager.prototype.close = function(infoWindow) {
      return this._infoWindows.get(infoWindow).then(function(w) {
        return w.close();
      });
    };
    InfoWindowManager.prototype.setOptions = function(infoWindow, options) {
      return this._infoWindows.get(infoWindow).then(function(i) {
        return i.setOptions(options);
      });
    };
    InfoWindowManager.prototype.addInfoWindow = function(infoWindow) {
      var options = {
        title: infoWindow.title,
        description: infoWindow.description
      };
      if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
        options.position = {
          lat: infoWindow.latitude,
          lng: infoWindow.longitude
        };
      }
      if (typeof infoWindow.infoWindowActions !== 'undefined' && infoWindow.infoWindowActions.length > 0) {
        options.actions = [];
        infoWindow.infoWindowActions.forEach(function(infoWindowAction) {
          options.actions.push({
            label: infoWindowAction.label,
            eventHandler: function() {
              infoWindowAction.actionClicked.emit(null);
            }
          });
        });
      }
      var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
      this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    InfoWindowManager = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [bing_maps_api_wrapper_1.BingMapsAPIWrapper, core_1.NgZone])], InfoWindowManager);
    return InfoWindowManager;
  }());
  exports.InfoWindowManager = InfoWindowManager;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/maps-api-loader/maps-api-loader.js", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var MapsAPILoader = (function() {
    function MapsAPILoader() {}
    MapsAPILoader = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], MapsAPILoader);
    return MapsAPILoader;
  }());
  exports.MapsAPILoader = MapsAPILoader;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services/maps-api-loader/lazy-maps-api-loader.js", ["@angular/core", "./maps-api-loader"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var maps_api_loader_1 = $__require('./maps-api-loader');
  (function(ScriptProtocol) {
    ScriptProtocol[ScriptProtocol["HTTP"] = 0] = "HTTP";
    ScriptProtocol[ScriptProtocol["HTTPS"] = 1] = "HTTPS";
    ScriptProtocol[ScriptProtocol["AUTO"] = 2] = "AUTO";
  })(exports.ScriptProtocol || (exports.ScriptProtocol = {}));
  var ScriptProtocol = exports.ScriptProtocol;
  var LazyMapsAPILoaderConfig = (function() {
    function LazyMapsAPILoaderConfig() {
      this.apiKey = null;
      this.clientId = null;
      this.channel = null;
      this.apiVersion = '3';
      this.hostAndPath = 'www.bing.com/api/maps/mapcontrol';
      this.protocol = ScriptProtocol.HTTPS;
      this.libraries = [];
      this.region = null;
      this.language = null;
    }
    return LazyMapsAPILoaderConfig;
  }());
  exports.LazyMapsAPILoaderConfig = LazyMapsAPILoaderConfig;
  var DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();
  var LazyMapsAPILoader = (function(_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(_config) {
      _super.call(this);
      this._config = _config;
      if (this._config === null || this._config === undefined) {
        this._config = DEFAULT_CONFIGURATION;
      }
    }
    LazyMapsAPILoader.prototype.load = function() {
      if (this._scriptLoadingPromise) {
        return this._scriptLoadingPromise;
      }
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      var callbackName = "angular2bingmaps" + new Date().getMilliseconds();
      script.src = this._getScriptSrc(callbackName);
      this._scriptLoadingPromise = new Promise(function(resolve, reject) {
        window[callbackName] = function() {
          resolve();
        };
        script.onerror = function(error) {
          reject(error);
        };
      });
      document.body.appendChild(script);
      return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function(callbackName) {
      var protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
      var protocol;
      switch (protocolType) {
        case ScriptProtocol.AUTO:
          protocol = '';
          break;
        case ScriptProtocol.HTTP:
          protocol = 'http:';
          break;
        case ScriptProtocol.HTTPS:
          protocol = 'https:';
          break;
      }
      var hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
      var queryParams = {callback: callbackName};
      var params = Object.keys(queryParams).map(function(k, i) {
        var param = (i === 0) ? '?' : '&';
        return param += k + "=" + queryParams[k];
      }).join('');
      return protocol + "//" + hostAndPath + params;
    };
    LazyMapsAPILoader = __decorate([core_1.Injectable(), __param(0, core_1.Optional()), __metadata('design:paramtypes', [LazyMapsAPILoaderConfig])], LazyMapsAPILoader);
    return LazyMapsAPILoader;
  }(maps_api_loader_1.MapsAPILoader));
  exports.LazyMapsAPILoader = LazyMapsAPILoader;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/services.js", ["./services/maps-api-loader/maps-api-loader", "./services/maps-api-loader/noop-maps-api-loader", "./services/bing-maps-api-wrapper", "./services/marker-manager", "./services/info-window-manager", "./services/maps-api-loader/lazy-maps-api-loader"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var maps_api_loader_1 = $__require('./services/maps-api-loader/maps-api-loader');
  exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
  var noop_maps_api_loader_1 = $__require('./services/maps-api-loader/noop-maps-api-loader');
  exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;
  var bing_maps_api_wrapper_1 = $__require('./services/bing-maps-api-wrapper');
  exports.BingMapsAPIWrapper = bing_maps_api_wrapper_1.BingMapsAPIWrapper;
  var marker_manager_1 = $__require('./services/marker-manager');
  exports.MarkerManager = marker_manager_1.MarkerManager;
  var info_window_manager_1 = $__require('./services/info-window-manager');
  exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
  var lazy_maps_api_loader_1 = $__require('./services/maps-api-loader/lazy-maps-api-loader');
  exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
  exports.LazyMapsAPILoaderConfig = lazy_maps_api_loader_1.LazyMapsAPILoaderConfig;
  exports.ScriptProtocol = lazy_maps_api_loader_1.ScriptProtocol;
  return module.exports;
});

System.registerDynamic("angular2-google-maps/core.js", ["@angular/core", "./services/maps-api-loader/maps-api-loader", "./services/maps-api-loader/lazy-maps-api-loader", "./directives", "./services"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  var maps_api_loader_1 = $__require('./services/maps-api-loader/maps-api-loader');
  var lazy_maps_api_loader_1 = $__require('./services/maps-api-loader/lazy-maps-api-loader');
  __export($__require('./directives'));
  __export($__require('./services'));
  exports.NG2_BINGMAPS_PROVIDERS = [new core_1.Provider(maps_api_loader_1.MapsAPILoader, {useClass: lazy_maps_api_loader_1.LazyMapsAPILoader})];
  return module.exports;
});

//# sourceMappingURL=angular2-google-maps.js.map