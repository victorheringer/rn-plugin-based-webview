export interface BrowserPluginMiddleware {
  /**
   * Middleware that is invoked when the WebView load fails.
   */
  onError?(): void;

  /**
   * Middleware that is invoked when the WebView has finished loading.
   */
  onLoad?(): void;

  /**
   * Middleware that is invoked when the WebView has finished loading.
   */
  onLoadEnd?(params: any): void;

  /**
   * Middleware that is invoked when the WebView starts loading.
   */
  onLoadStart?(params: any): void;

  /**
   * Middleware that is invoked when the WebView is loading.
   */
  onLoadProgress?(): void;

  /**
   * Middleware that is invoked when the WebView receives an http error.
   */
  onHttpError?(): void;

  /**
   * Middleware that is invoked when the WebView process crashes or is killed by the OS on Android.
   */
  onRenderProcessGone?(): void;

  /**
   * Middleware that is invoked when the webview calls window.ReactNativeWebView.postMessage. Setting this property will inject this global into your webview.
   */
  onMessage?(params: any): void;

  /**
   * Middleware that is invoked when the WebView loading starts or ends.
   */
  onNavigationStateChange?(): void;

  /**
   * Middleware that is invoked when the WebView content process is terminated.
   */
  onContentProcessDidTerminate?(): void;

  /**
   * Middleware that is invoked when the scroll event is fired in the WebView.
   */
  onScroll?(): void;

  /**
   * Middleware that allows custom handling of any web view requests. Return true from the function to continue loading the request and false to stop loading.
   */
  onShouldStartLoadWithRequest?(): void;
}

export interface PluginReducer<S, A> {
  /**
   * Initial state value
   */
  initialState?: S;

  /**
   * Defines a initial state for the plugin
   */
  setInitialState?(state: string): void;

  /**
   * Defines a reducer function for the plugin
   */
  reducer?(state: S, action: A): S;
}

export interface PluginComponents {
  /**
   * Use to render componentes like modals or without an UI
   */
  genericComponent?(props: any): any;

  /**
   * Will be render at the header
   */
  headerComponent?(props: any): any;

  /**
   * Will be render at the footer
   */
  footerComponent?(props: any): any;
}

export interface BrowserPlugin<State, Action>
  extends BrowserPluginMiddleware,
    PluginReducer<State, Action>,
    PluginComponents {}
