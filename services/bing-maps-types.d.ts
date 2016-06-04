/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
export interface LatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}
export declare class Marker {
    map: Microsoft.Maps.Map;
    private pushpin;
    constructor(map: Microsoft.Maps.Map, pushpin: Microsoft.Maps.Pushpin);
    setPosition(latLng: LatLngLiteral): void;
    deleteMarker(): void;
    setTitle(title: string): void;
    setLabel(label: string): void;
    setDraggable(draggable: boolean): void;
    setIcon(icon: string): void;
    getLabel(): string;
    addListener(eventType: string, fn: Function): void;
}
export interface MarkerOptions {
    position: LatLngLiteral;
    title?: string;
    label?: string;
    draggable?: boolean;
    icon?: string;
}
export interface LatLngLiteral {
    lat: number;
    lng: number;
}
export interface MouseEvent {
    latLng: LatLng;
}
export declare enum MapTypeId {
    aerial = 0,
    auto = 1,
    birdseye = 2,
    collinsBart = 3,
    mercator = 4,
    ordnanceSurvey = 5,
    road = 6,
}
export interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    mapTypeId?: MapTypeId;
}
export declare class InfoWindow {
    private map;
    private infoBox;
    constructor(map: Microsoft.Maps.Map, infoBox: Microsoft.Maps.Infobox);
    close(): void;
    getPosition(): LatLngLiteral;
    open(): void;
    setOptions(options: InfoWindowOptions): void;
    setPosition(position: LatLngLiteral): void;
}
export interface MVCObject {
    constructor(): void;
}
export interface Size {
    height: number;
    width: number;
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
    equals(other: Size): boolean;
    toString(): string;
}
export interface InfoWindowOptions {
    title?: string;
    description?: string;
    disableAutoPan?: boolean;
    maxWidth?: number;
    pixelOffset?: Size;
    position?: LatLngLiteral;
    zIndex?: number;
    actions?: InfoWindowAction[];
}
export interface InfoWindowAction {
    label: string;
    eventHandler: (args?: any) => void;
}
