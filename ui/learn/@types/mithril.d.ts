/* eslint-disable */

// Mithril type definitions for Typescript

/**
 * This is the module containing all the types/declarations/etc. for Mithril
 */
declare module _mithril {
  interface MithrilStatic {
    /**
     * Creates a virtual element for use with m.render, m.mount, etc.
     *
     * @param selector A simple CSS selector. May include SVG tags. Nested
     * selectors are not supported.
     * @param attributes Attributes to add. Any DOM attribute may be used
     * as an attribute, although innerHTML and the like may be overwritten
     * silently.
     * @param children Child elements, components, and text to add.
     * @return A virtual element.
     *
     * @see m.render
     * @see m.mount
     * @see m.component
     */
    <T extends MithrilController>(
      selector: string,
      attributes: MithrilAttributes,
      ...children: Array<string | MithrilVirtualElement<T> | MithrilComponent<T>>
    ): MithrilVirtualElement<T>;

    /**
     * Initializes a component for use with m.render, m.mount, etc.
     *
     * @param component A component.
     * @param args Arguments to optionally pass to the component.
     * @return A component.
     *
     * @see m.render
     * @see m.mount
     * @see m
     */
    <T extends MithrilController>(component: MithrilComponent<T>, ...args: any[]): MithrilComponent<T>;

    /**
     * Creates a virtual element for use with m.render, m.mount, etc.
     *
     * @param selector A simple CSS selector. Nested selectors are not
     * supported.
     * @param children Child elements, components, and text to add.
     * @return A virtual element.
     *
     * @see m.render
     * @see m.mount
     * @see m.component
     */
    <T extends MithrilController>(
      selector: string,
      ...children: Array<string | MithrilVirtualElement<T> | MithrilComponent<T>>
    ): MithrilVirtualElement<T>;

    /**
     * Initializes a component for use with m.render, m.mount, etc.
     * Shorthand for m.component.
     *
     * @param selector A component.
     * @param args Arguments to optionally pass to the component.
     * @return A component.
     *
     * @see m.render
     * @see m.mount
     * @see m.component
     */
    <T extends MithrilController>(component: MithrilComponent<T>, ...args: any[]): MithrilComponent<T>;

    /**
     * Creates a getter-setter function that wraps a Mithril promise. Useful
     * for uniform data access, m.withAttr, etc.
     *
     * @param promise A thennable to initialize the property with. It may
     * optionally be a Mithril promise.
     * @return A getter-setter function wrapping the promise.
     *
     * @see m.withAttr
     */
    prop<T>(promise: Thennable<T>): MithrilPromiseProperty<T>;

    /**
     * Creates a getter-setter function that wraps a simple value. Useful
     * for uniform data access, m.withAttr, etc.
     *
     * @param value A value to initialize the property with
     * @return A getter-setter function wrapping the value.
     *
     * @see m.withAttr
     */
    prop<T>(value: T): MithrilBasicProperty<T>;

    /**
     * Creates a getter-setter function that wraps a simple value. Useful
     * for uniform data access, m.withAttr, etc.
     *
     * @return A getter-setter function wrapping the value.
     *
     * @see m.withAttr
     */
    prop<T>(): MithrilBasicProperty<T>;

    /**
     * Returns a event handler that can be bound to an element, firing with
     * the specified property.
     *
     * @param property The property to get from the event.
     * @param callback The handler to use the value from the event.
     * @return A function suitable for listening to an event.
     */
    withAttr(property: string, callback: (value: any) => void): (e: Event) => any;

    /**
     * @deprecated Use m.mount instead
     */
    module<T extends MithrilController>(rootElement: Node, component: MithrilComponent<T>): T;

    /**
     * Mounts a component to a base DOM node.
     *
     * @param rootElement The base node.
     * @param component The component to mount.
     * @return An instance of the top-level component's controller
     */
    mount<T extends MithrilController>(rootElement: Node, component: MithrilComponent<T>): T;

    /**
     * Initializes a component for use with m.render, m.mount, etc.
     *
     * @param selector A component.
     * @param args Arguments to optionally pass to the component.
     * @return A component.
     *
     * @see m.render
     * @see m.mount
     * @see m
     */
    component<T extends MithrilController>(
      component: MithrilComponent<T>,
      ...args: any[]
    ): MithrilComponent<T>;

    /**
     * Trust this string of HTML.
     *
     * @param html The HTML to trust
     * @return A String object instance with an added internal flag to mark
     * it as trusted.
     */
    trust(html: string): MithrilTrustedString;

    /**
     * Render a virtual DOM tree.
     *
     * @param rootElement The base element/node to render the tree from.
     * @param children One or more child nodes to add to the tree.
     * @param forceRecreation If true, overwrite the entire tree without
     * diffing against it.
     */
    render<T extends MithrilController>(
      rootElement: Element,
      children: MithrilVirtualElement<T> | MithrilVirtualElement<T>[],
      forceRecreation?: boolean,
    ): void;

    redraw: {
      /**
       * Force a redraw the active component. It redraws asynchronously by
       * default to allow for simultaneous events to run before redrawing,
       * such as the event combination keypress + input frequently used for
       * input.
       *
       * @param force If true, redraw synchronously.
       */
      (force?: boolean): void;

      strategy: {
        /**
         * Gets the current redraw strategy, which returns one of the
         * following:
         *
         * "all" - recreates the DOM tree from scratch
         * "diff" - recreates the DOM tree from scratch
         * "none" - leaves the DOM tree intact
         *
         * This is useful for event handlers, which may want to cancel
         * the next redraw if the event doesn't update the UI.
         *
         * @return The current strategy
         */
        (): string;

        /**
         * Sets the current redraw strategy. The parameter must be one of
         * the following values:
         *
         * "all" - recreates the DOM tree from scratch
         * "diff" - recreates the DOM tree from scratch
         * "none" - leaves the DOM tree intact
         *
         * This is useful for event handlers, which may want to cancel
         * the next redraw if the event doesn't update the UI.
         *
         * @param value The value to set
         * @return The new strategy
         */
        (value: string): string;

        /**
         * @private
         * Implementation detail - it's a MithrilBasicProperty instance
         */
        toJSON(): string;
      };
    };

    route: {
      /**
       * Enable routing, mounting a controller based on the route. It
       * automatically mounts the components for you, starting with the one
       * specified by the default route.
       *
       * @param rootElement The element to mount the active controller to.
       * @param defaultRoute The route to start with.
       * @param routes A key-value mapping of pathname to controller.
       */
      <T extends MithrilController>(
        rootElement: Element,
        defaultRoute: string,
        routes: MithrilRoutes<T>,
      ): void;

      /**
       * This allows m.route to be used as the `config` attribute for a
       * virtual element, particularly useful for cases like this:
       *
       * ```ts
       * // Note that the '#' is not required in `href`, thanks to the
       * `config` setting.
       * m("a[href='/dashboard/alicesmith']", {config: m.route});
       * ```
       */
      <T extends MithrilController>(
        element: Element,
        isInitialized: boolean,
        context?: MithrilContext,
        vdom?: MithrilVirtualElement<T>,
      ): void;

      /**
       * Programmatically redirect to another route.
       *
       * @param path The route to go to.
       * @param params Parameters to pass as a query string.
       * @param shouldReplaceHistory Whether to replace the current history
       * instead of adding a new one.
       */
      (path: string, params?: any, shouldReplaceHistory?: boolean): void;

      /**
       * Gets the current route.
       *
       * @return The current route.
       */
      (): string;

      /**
       * Gets a route parameter.
       *
       * @param key The key to get.
       * @return The value associated with the parameter key.
       */
      param(key: string): string;

      /**
       * The current routing mode. This may be changed before calling
       * m.route to change the part of the URL used to perform the routing.
       *
       * The value can be set to one of the following, defaulting to
       * "hash":
       *
       * "search" - Uses the query string. This allows for named anchors to
       * work on the page, but changes cause IE8 and lower to refresh the
       * page.
       *
       * "hash" - Uses the hash. This is the only routing mode that does
       * not cause page refreshes on any browser, but it does not support
       * named anchors.
       *
       * "pathname" - Uses the URL pathname. This requires server-side
       * setup to support bookmarking and page refreshes. It always causes
       * page refreshes on IE8 and lower. Note that this requires that the
       * application to be run from the root of the URL.
       */
      mode: string;

      /**
       * Serialize an object into a query string.
       *
       * @param data The data to serialize.
       * @return The serialized string.
       */
      buildQueryString(data: Object): String;

      /**
       * Parse a query string into an object.
       *
       * @param data The data to parse.
       * @return The parsed object data.
       */
      parseQueryString(data: String): Object;
    };

    /**
     * Send a request to a server to server. Note that the `url` option is
     * required.
     *
     * @param options The options to use
     * @return A promise to the returned data for "GET" requests, or a void
     * promise for any other request type.
     *
     * @see MithrilXHROptions for the available options.
     */
    request<T>(options: MithrilXHROptions<T>): MithrilPromise<T>;

    deferred: {
      /**
       * Create a Mithril deferred object. It behaves synchronously if
       * possible, an intentional deviation from Promises/A+. Note that
       * deferreds are completely separate from the redrawing system, and
       * never trigger a redraw on their own.
       *
       * @return A new Mithril deferred instance.
       *
       * @see m.deferred.onerror for the error callback called for Error
       * subclasses
       */
      <T>(): MithrilDeferred<T>;

      /**
       * A callback for all uncaught native Error subclasses in deferreds.
       * This defaults to synchronously rethrowing all errors, a deviation
       * from Promises/A+, but the behavior is configurable. To restore
       * Promises/A+-compatible behavior. simply set this to a no-op.
       */
      onerror(e: Error): void;
    };

    /**
     * Takes a list of promises or thennables and returns a Mithril promise
     * that resolves once all in the list are resolved, or rejects if any of
     * them reject.
     *
     * @param promises A list of promises to try to resolve.
     * @return A promise that resolves to all the promises if all resolve, or
     * rejects with the error contained in the first rejection.
     */
    sync<T>(promises: Thennable<T>[]): MithrilPromise<T[]>;

    /**
     * Use this and endComputation if your views aren't redrawing after
     * calls to third-party libraries. For integrating asynchronous code,
     * this should be called before any asynchronous work is done. For
     * synchronous code, this should be called at the beginning of the
     * problematic segment. Note that these calls must be balanced, much like
     * braces and parentheses. This is mostly used internally. Prefer
     * m.redraw where possible, especially when making repeated calls.
     *
     * @see endComputation
     * @see m.render
     */
    startComputation(): void;

    /**
     * Use startComputation and this if your views aren't redrawing after
     * calls to third-party libraries. For integrating asynchronous code,
     * this should be called after all asynchronous work completes. For
     * synchronous code, this should be called at the end of the problematic
     * segment. Note that these calls must be balanced, much like braces and
     * parentheses. This is mostly used internally. Prefer m.redraw where
     * possible, especially when making repeated calls.
     *
     * @see startComputation
     * @see m.render
     */
    endComputation(): void;

    /**
     * This overwrites the internal version of window used by Mithril.
     * It's mostly useful for testing, and is also used internally by
     * Mithril to test itself. By default Mithril uses `window` for the
     * dependency.
     *
     * @param mockWindow The mock to use for the window.
     * @return The mock that was passed in.
     */
    deps(mockWindow: Window): Window;
  }

  interface MithrilTrustedString extends String {
    /** @private Implementation detail. Don't depend on it. */
    $trusted: boolean;
  }

  /**
   * The interface for a virtual element. It's best to consider this immutable
   * for most use cases.
   *
   * @see m
   */
  interface MithrilVirtualElement<T extends MithrilController> {
    /**
     * A key to optionally associate with this element.
     */
    key?: number;

    /**
     * The tag name of this element.
     */
    tag?: string;

    /**
     * The attributes of this element.
     */
    attrs?: MithrilAttributes;

    /**
     * The children of this element.
     */
    children?: Array<string | MithrilVirtualElement<T> | MithrilComponent<T>>;
  }

  /**
   * An event passed by Mithril to unload event handlers.
   */
  interface MithrilEvent {
    /**
     * Prevent the default behavior of scrolling the page and updating the
     * URL on next route change.
     */
    preventDefault(): void;
  }

  /**
   * A context object for configuration functions.
   *
   * @see MithrilElementConfig
   */
  interface MithrilContext {
    /**
     * A function to call when the node is unloaded. Useful for cleanup.
     */
    onunload?(): any;

    /**
     * Set true if the backing DOM node needs to be retained between route
     * changes if possible. Set false if this node needs to be recreated
     * every single time, regardless of how "different" it is.
     */
    retain?: boolean;
  }

  /**
   * This represents a callback function for a virtual element's config
   * attribute. It's a low-level function useful for extra cleanup after
   * removal from the tree, storing instances of third-party classes that
   * need to be associated with the DOM, etc.
   *
   * @see MithrilAttributes
   * @see MithrilContext
   */
  interface MithrilElementConfig {
    /**
     * A callback function for a virtual element's config attribute.
     *
     * @param element The associated DOM element.
     * @param isInitialized Whether this is the first call for the virtual
     * element or not.
     * @param context The associated context for this element.
     * @param vdom The associated virtual element.
     */
    <T extends MithrilController>(
      element: Element,
      isInitialized: boolean,
      context: MithrilContext,
      vdom: MithrilVirtualElement<T>,
    ): void;
  }

  /**
   * This represents the attributes available for configuring virtual elements,
   * beyond the applicable DOM attributes.
   *
   * @see m
   */
  interface MithrilAttributes {
    /**
     * The class name(s) for this virtual element, as a space-separated list.
     */
    className?: string;

    /**
     * The class name(s) for this virtual element, as a space-separated list.
     */
    class?: string;

    /**
     * A custom, low-level configuration in case this element needs special
     * cleanup after removal from the tree.
     *
     * @see MithrilElementConfig
     */
    config?: MithrilElementConfig;
  }

  /**
   * The basis of a Mithril controller instance.
   */
  interface MithrilController {
    /**
     * An optional handler to call when the associated virtual element is
     * destroyed.
     *
     * @param evt An associated event.
     */
    onunload?(evt: MithrilEvent): any;
  }

  /**
   * This represents a controller function.
   *
   * @see MithrilControllerConstructor
   */
  interface MithrilControllerFunction<T extends MithrilController> {
    (): T;
  }

  /**
   * This represents a controller constructor.
   *
   * @see MithrilControllerFunction
   */
  interface MithrilControllerConstructor<T extends MithrilController> {
    new (): T;
  }

  /**
   * This represents a view factory.
   */
  interface MithrilView<T extends MithrilController> {
    /**
     * Creates a view out of virtual elements.
     */
    (ctrl: T): MithrilVirtualElement<T>;
  }

  /**
   * This represents a Mithril component.
   *
   * @see m
   * @see m.component
   */
  interface MithrilComponent<T extends MithrilController> {
    /**
     * The component's controller.
     *
     * @see m.component
     */
    controller: MithrilControllerFunction<T> | MithrilControllerConstructor<T>;

    /**
     * Creates a view out of virtual elements.
     *
     * @see m.component
     */
    view(ctrl: T): MithrilVirtualElement<T>;
  }

  /**
   * This is the base interface for property getter-setters
   *
   * @see m.prop
   */
  interface MithrilProperty<T> {
    /**
     * Gets the contained value.
     *
     * @return The contained value.
     */
    (): T;

    /**
     * Sets the contained value.
     *
     * @param value The new value to set.
     * @return The newly set value.
     */
    (value: T): T;
  }

  /**
   * This represents a non-promise getter-setter functions.
   *
   * @see m.prop which returns objects that implement this interface.
   */
  interface MithrilBasicProperty<T> extends MithrilProperty<T> {
    /**
     * Makes this serializable to JSON.
     */
    toJSON(): T;
  }

  /**
   * This represents a promise getter-setter function.
   *
   * @see m.prop which returns objects that implement this interface.
   */
  interface MithrilPromiseProperty<T> extends MithrilPromise<T>, MithrilProperty<MithrilPromise<T>> {
    /**
     * Gets the contained promise.
     *
     * @return The contained value.
     */
    (): MithrilPromise<T>;

    /**
     * Sets the contained promise.
     *
     * @param value The new value to set.
     * @return The newly set value.
     */
    (value: MithrilPromise<T>): MithrilPromise<T>;

    /**
     * Sets the contained wrapped value.
     *
     * @param value The new value to set.
     * @return The newly set value.
     */
    (value: T): MithrilPromise<T>;
  }

  /**
   * This represents a key-value mapping linking routes to components.
   */
  interface MithrilRoutes<T extends MithrilController> {
    /**
     * The key represents the route. The value represents the corresponding
     * component.
     */
    [key: string]: MithrilComponent<T>;
  }

  /**
   * This represents a Mithril deferred object.
   */
  interface MithrilDeferred<T> {
    /**
     * Resolve this deferred's promise with a value.
     *
     * @param value The value to resolve the promise with.
     */
    resolve(value?: T): void;

    /**
     * Reject this deferred with an error.
     *
     * @param value The reason for rejecting the promise.
     */
    reject(reason?: any): void;

    /**
     * The backing promise.
     *
     * @see MithrilPromise
     */
    promise: MithrilPromise<T>;
  }

  /**
   * This represents a thennable success callback.
   */
  interface MithrilSuccessCallback<T, U> {
    (value: T): U | Thennable<U>;
  }

  /**
   * This represents a thennable error callback.
   */
  interface MithrilErrorCallback<T> {
    (value: Error): T | Thennable<T>;
  }

  /**
   * This represents a thennable.
   */
  interface Thennable<T> {
    then<U>(success: (value: T) => U): Thennable<U>;
    then<U, V>(success: (value: T) => U, error: (value: Error) => V): Thennable<U> | Thennable<V>;
    catch?: <U>(error: (value: Error) => U) => Thennable<U>;
  }

  /**
   * This represents a Mithril promise object.
   */
  interface MithrilPromise<T> extends Thennable<T>, MithrilProperty<MithrilPromise<T>> {
    /**
     * Chain this promise with a simple success callback, propogating
     * rejections.
     *
     * @param success The callback to call when the promise is resolved.
     * @return The chained promise.
     */
    then<U>(success: MithrilSuccessCallback<T, U>): MithrilPromise<U>;

    /**
     * Chain this promise with a success callback and error callback, without
     * propogating rejections.
     *
     * @param success The callback to call when the promise is resolved.
     * @param error The callback to call when the promise is rejected.
     * @return The chained promise.
     */
    then<U, V>(
      success: MithrilSuccessCallback<T, U>,
      error: MithrilErrorCallback<V>,
    ): MithrilPromise<U> | MithrilPromise<V>;

    /**
     * Chain this promise with a single error callback, without propogating
     * rejections.
     *
     * @param error The callback to call when the promise is rejected.
     * @return The chained promise.
     */
    catch<U>(error: MithrilErrorCallback<U>): MithrilPromise<T> | MithrilPromise<U>;
  }

  /**
   * This represents the available options for configuring m.request.
   *
   * @see m.request
   */
  interface MithrilXHROptions<T> {
    /**
     * This represents the HTTP method used, one of the following:
     *
     * - "GET" (default)
     * - "POST"
     * - "PUT"
     * - "DELETE"
     * - "HEAD"
     * - "OPTIONS"
     */
    method?: string;

    /**
     * The URL to send the request to.
     */
    url: string;

    /**
     * The username for HTTP authentication.
     */
    user?: string;

    /**
     * The password for HTTP authentication.
     */
    password?: string;

    /**
     * The data to be sent. It's automatically serialized in the right format
     * depending on the method (with exception of HTML5 FormData), and put in
     * the appropriate section of the request.
     */
    data?: any;

    /**
     * Whether to run it in the background, i.e. true if it doesn't affect
     * template rendering.
     */
    background?: boolean;

    /**
     * Set an initial value while the request is working, to populate the
     * promise getter-setter.
     */
    initialValue?: T;

    /**
     * An optional preprocessor function to unwrap a successful response, in
     * case the response contains metadata wrapping the data.
     *
     * @param data The data to unwrap.
     * @return The unwrapped result.
     */
    unwrapSuccess?(data: any): T;

    /**
     * An optional preprocessor function to unwrap an unsuccessful response,
     * in case the response contains metadata wrapping the data.
     *
     * @param data The data to unwrap.
     * @return The unwrapped result.
     */
    unwrapError?(data: any): T;

    /**
     * An optional function to serialize the data. This defaults to
     * `JSON.stringify`.
     *
     * @param dataToSerialize The data to serialize.
     * @return The serialized form as a string.
     */
    serialize?(dataToSerialize: any): string;

    /**
     * An optional function to deserialize the data. This defaults to
     * `JSON.parse`.
     *
     * @param dataToSerialize The data to parse.
     * @return The parsed form.
     */
    deserialize?(dataToDeserialize: string): any;

    /**
     * An optional function to extract the data from a raw XMLHttpRequest,
     * useful if the relevant data is in a response header or the status
     * field.
     *
     * @param xhr The associated XMLHttpRequest.
     * @param options The options passed to this request.
     * @return string The serialized format.
     */
    extract?(xhr: XMLHttpRequest, options: MithrilXHROptions<T>): string;

    /**
     * The parsed data, or its children if it's an array, will be passed to
     * this class constructor if it's given, to parse it into classes.
     *
     * @param data The data to parse.
     * @return The new instance for the list.
     */
    type?: new (data: Object) => any;

    /**
     * An optional function to run between `open` and `send`, useful for
     * adding request headers or using XHR2 features such as the `upload`
     * property. It is even possible to override the XHR altogether with a
     * similar object, such as an XDomainRequest instance.
     *
     * @param xhr The associated XMLHttpRequest.
     * @param options The options passed to this request.
     * @return The new XMLHttpRequest, or nothing if the same one is kept.
     */
    config?(xhr: XMLHttpRequest, options: MithrilXHROptions<T>): any;

    /**
     * For JSONP requests, this must be the string "jsonp". Otherwise, it's
     * ignored.
     */
    dataType?: string;

    /**
     * For JSONP requests, this is the query string key for the JSONP
     * request. This is useful for APIs that don't use common conventions,
     * such as `www.example.com/?jsonpCallback=doSomething`. It defaults to
     * `callback` for JSONP requests, and is ignored for any other kind of
     * request.
     */
    callbackKey?: string;
  }
}

declare var Mithril: _mithril.MithrilStatic;
declare var m: _mithril.MithrilStatic;

declare module 'mithril' {
  export = m;
}
