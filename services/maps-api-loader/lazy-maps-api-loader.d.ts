/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
import { MapsAPILoader } from './maps-api-loader';
export declare enum ScriptProtocol {
    HTTP = 0,
    HTTPS = 1,
    AUTO = 2,
}
export declare class LazyMapsAPILoaderConfig {
    /**
     * The Bing Maps API Key (see:
     * https://developers.google.com/maps/documentation/javascript/get-api-key)
     */
    apiKey: string;
    /**
     * The Google Maps client ID (for premium plans).
     * When you have a Google Maps APIs Premium Plan license, you must authenticate
     * your application with either an API key or a client ID.
     * The Google Maps API will fail to load if both a client ID and an API key are included.
     */
    clientId: string;
    /**
     * The Google Maps channel name (for premium plans).
     * A channel parameter is an optional parameter that allows you to track usage under your client
     * ID by assigning a distinct channel to each of your applications.
     */
    channel: string;
    /**
     * Google Maps API version.
     */
    apiVersion: string;
    /**
     * Host and Path used for the `<script>` tag.
     */
    hostAndPath: string;
    /**
     * Protocol used for the `<script>` tag.
     */
    protocol: ScriptProtocol;
    /**
     * Defines which Google Maps libraries should get loaded.
     */
    libraries: string[];
    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.google.com/maps/documentation/javascript/basics#Region
     */
    region: string;
    /**
     * The Google Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.google.com/maps/documentation/javascript/basics#Language
     */
    language: string;
}
export declare class LazyMapsAPILoader extends MapsAPILoader {
    private _config;
    private _scriptLoadingPromise;
    constructor(_config: LazyMapsAPILoaderConfig);
    load(): Promise<void>;
    private _getScriptSrc(callbackName);
}
