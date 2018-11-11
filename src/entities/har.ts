
// Type definitions for HAR spec version 1.2
// http://www.softwareishard.com/blog/har-12-spec/

export type HAR = {
    log: Log;
}

/**
 * <log>
 * This object represents the root of exported data.
 * There is one <page> object for every exported web page and one <entry> object for every HTTP request. In case when an HTTP trace tool isn't able to group requests by a page, the <pages> object is empty and individual requests doesn't have a parent page.
 */

export type Log = {
    version: string; // Version number of the format. If empty, string "1.1" is assumed by default.
    creator: Creator; // Name and version info of the log creator application.
    browser?: Browser; // Name and version info of used browser.
    pages?: Pages; // List of all exported (tracked) pages. Leave out this field if the application does not support grouping by pages.
    entries: Entries; // List of all exported (tracked) requests.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <creator>
 */
export type Creator = {
    name: string; // Name of the application/browser used to export the log.
    version: string; // Version of the application/browser used to export the log.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <browser>
 */
export type Browser = {
    name: string; // Name of the application/browser used to export the log.
    version: string; // Version of the application/browser used to export the log.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <pages>
 * This object represents list of exported pages.
 */
export type Pages = Page[];

export type Page = {
    startedDateTime: string; // Date and time stamp for the beginning of the page load (ISO 8601 - YYYY-MM-DDThh:mm:ss.sTZD, e.g. 2009-07-24T19:20:30.45+01:00).
    id: string; // Unique identifier of a page within the <log>. Entries use it to refer the parent page.
    title: string; // Page title.
    pageTimings: PageTimings; // Detailed timing info about page load.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <pageTimings>
 * This object describes timings for various events (states) fired during the page load. All times are specified in milliseconds. If a time info is not available appropriate field is set to -1.
 * Depeding on the browser, onContentLoad property represents DOMContentLoad event or document.readyState == interactive.
 */
export type PageTimings = {
    onContentLoad: number; // Content of the page loaded. Number of milliseconds since page load started (page.startedDateTime). Use -1 if the timing does not apply to the current request.
    onLoad: number; // Page is loaded (onLoad event fired). Number of milliseconds since page load started (page.startedDateTime). Use -1 if the timing does not apply to the current request.
    comment: string; // A comment provided by the user or the application.
}

/**
 * <entries>'
 * This object represents an array with all exported HTTP requests. Sorting entries by startedDateTime (starting from the oldest) is preferred way how to export data since it can make importing faster. However the reader application should always make sure the array is sorted (if required for the import).
 */
export type Entries = Entry[];

export type Entry = {
    pageref?: string; // Reference to the parent page. Leave out this field if the application does not support grouping by pages.
    startedDateTime: string; // Date and time stamp of the request start (ISO 8601 - YYYY-MM-DDThh:mm:ss.sTZD).
    time: number; // Total elapsed time of the request in milliseconds. This is the sum of all timings available in the timings object (i.e. not including -1 values) .
    request: Request; // Detailed info about the request.
    response: Response; // Detailed info about the response.
    cache: Cache; // Info about cache usage.
    timings: Timings; // Detailed timing info about request/response round trip.
    serverIPAddress?: string; // IP address of the server that was connected (result of DNS resolution).
    connection?: string; // Unique ID of the parent TCP/IP connection, can be the client or server port number. Note that a port number doesn't have to be unique identifier in cases where the port is shared for more connections. If the port isn't available for the application, any other unique connection ID can be used instead (e.g. connection index). Leave out this field if the application doesn't support this info.
    comment?: string // A comment provided by the user or the application.
}

/**
 * <request>
 * This object contains detailed info about performed request.
 * The total request size sent can be computed as follows (if both values are available):
 * var totalSize = entry.request.headersSize + entry.request.bodySize;
 */
export type Request = {
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"; // Request method (GET, POST, ...).
    url: string; // Absolute URL of the request (fragments are not included).
    httpVersion: string; // Request HTTP Version.
    cookies: Cookies; // List of cookie objects.
    headers: NameValue[]; // List of header objects.
    queryString: NameValue[]; // List of query parameter objects.
    postData?: PostData; // Posted data info.
    headersSize: number; // Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body. Set to -1 if the info is not available.
    bodySize: number; // Size of the request body (POST data payload) in bytes. Set to -1 if the info is not available.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <response>
 * This object contains detailed info about the response.
 * The size of received response-headers is computed only from headers that are really received from the server. Additional headers appended by the browser are not included in this number, but they appear in the list of header objects.
 * The total response size received can be computed as follows (if both values are available):
 * var totalSize = entry.response.headersSize + entry.response.bodySize;
 */
export type Response = {
    status: number; // Response status.
    statusText: string; // Response status description.
    httpVersion: string; // Response HTTP Version.
    cookies: Cookies; // List of cookie objects.
    headers: NameValue[]; // List of header objects.
    content: Content; // Details about the response body.
    redirectURL: string; // Redirection target URL from the Location response header.
    headersSize: number; // Total number of bytes from the start of the HTTP response message until (and including) the double CRLF before the body. Set to -1 if the info is not available.
    bodySize: number; // Size of the received response body in bytes. Set to zero in case of responses coming from the cache (304). Set to -1 if the info is not available.
    comment?: string // A comment provided by the user or the application.
}

/**
 * <cookies>
 * This object contains list of all cookies (used in <request> and <response> objects).
 */
export type Cookies = Cookie[];

export type Cookie = {
    name: string; // The name of the cookie.
    value: string; // The cookie value.
    path?: string; // The path pertaining to the cookie.
    domain?: string; // The host of the cookie.
    expires?: string; // Cookie expiration time. (ISO 8601 - YYYY-MM-DDThh:mm:ss.sTZD, e.g. 2009-07-24T19:20:30.123+02:00).
    httpOnly?: boolean; // Set to true if the cookie is HTTP only, false otherwise.
    secure?: boolean; // True if the cookie was transmitted over ssl, false otherwise.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <headers>
 * This object contains list of all headers (used in <request> and <response> objects).
 */
export type Headers = NameValue[];

/**
 * This object contains list of all parameters & values parsed from a query string, if any (embedded in <request> object).
 */
export type QueryString = NameValue[];

/**
 * <postData>
 * This object describes posted data, if any (embedded in <request> object).
 */
export type PostData = {
    mimeType: string; // Mime type of posted data.
    params: Params; // List of posted parameters (in case of URL encoded parameters).
    text: string; // Plain text posted data
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <params>
 * List of posted parameters, if any (embedded in <postData> object).
 */
export type Params = Param[];

export type Param = {
    name: "paramName" // name of a posted parameter.
    value?: "paramValue" // value of a posted parameter or content of a posted file.
    fileName?: "example.pdf" // name of a posted file.
    contentType: "application/pdf" // content type of a posted file.
    comment?: "" // A comment provided by the user or the application.
}

/**
 * <content>
 * This object describes details about response content (embedded in <response> object).
 * Before setting the text field, the HTTP response is decoded (decompressed & unchunked), than trans-coded from its original character set into UTF-8. Additionally, it can be encoded using e.g. base64. Ideally, the application should be able to unencode a base64 blob and get a byte-for-byte identical resource to what the browser operated on.
 * Encoding field is useful for including binary responses (e.g. images) into the HAR file.
 */
export type Content = {
    size: number; // Length of the returned content in bytes. Should be equal to response.bodySize if there is no compression and bigger when the content has been compressed.
    compression?: number; // Number of bytes saved. Leave out this field if the information is not available.
    mimeType: string; // MIME type of the response text (value of the Content-Type response header). The charset attribute of the MIME type is included (if available).
    text?: string; // Response body sent from the server or loaded from the browser cache. This field is populated with textual content only. The text field is either HTTP decoded text or a encoded (e.g. "base64") representation of the response body. Leave out this field if the information is not available.
    encoding?: string; // Encoding used for response text field e.g "base64". Leave out this field if the text field is HTTP decoded (decompressed & unchunked), than trans-coded from its original character set into UTF-8.
    comment?: string; // A comment provided by the user or the application.
}

/**
 * <cache>
 * This objects contains info about a request coming from browser cache.
 */
export type Cache = {
    beforeRequest: null | {}; // State of a cache entry before the request. Leave out this field if the information is not available.
    afterRequest: null | {}; // State of a cache entry after the request. Leave out this field if the information is not available.
    comment?: ""; // A comment provided by the user or the application.
}

export type CacheState = {
    expires?: "2009-04-16T15:50:36"; // Expiration time of the cache entry.
    lastAccess: "2009-16-02T15:50:34"; // The last time the cache entry was opened.
    eTag: ""; // Etag
    hitCount: 0; // The number of times the cache entry has been opened.
    comment?: ""; // A comment provided by the user or the application.
}

/**
 * <timings>
 * This object describes various phases within request-response round trip. All times are specified in milliseconds.
 * The send, wait and receive timings are not optional and must have non-negative values.
 * An exporting tool can omit the blocked, dns, connect and ssl, timings on every request if it is unable to provide them. Tools that can provide these timings can set their values to -1 if they don’t apply. For example, connect would be -1 for requests which re-use an existing connection.
 * The time value for the request must be equal to the sum of the timings supplied in this section (excluding any -1 values).
 */
export type Timings = {
    blocked: number; // Time spent in a queue waiting for a network connection. Use -1 if the timing does not apply to the current request.
    dns: number; // DNS resolution time. The time required to resolve a host name. Use -1 if the timing does not apply to the current request.
    connect: number; // Time required to create TCP connection. Use -1 if the timing does not apply to the current request.
    send: number; // Time required to send HTTP request to the server.
    wait: number; // Waiting for a response from the server.
    receive: number; // Time required to read entire response from the server (or cache).
    ssl: number; // Time required for SSL/TLS negotiation. If this field is defined then the time is also included in the connect field (to ensure backward compatibility with HAR 1.1). Use -1 if the timing does not apply to the current request.
    comment?: string; // A comment provided by the user or the application.
}

export type NameValue = {
    name: string;
    value: string;
    comment?: string;
}
