/*jshint -W069 */
/**
 * # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 * @class SmartthingsApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var SmartthingsApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function SmartthingsApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.smartthings.com/v1';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
                this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name SmartthingsApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    SmartthingsApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

            /**
            * Set Token
            * @method
            * @name SmartthingsApi#setToken
            * @param {string} value - token's value
            * @param {string} headerOrQueryName - the header or query name to send the token at
            * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
            */
            SmartthingsApi.prototype.setToken = function (value, headerOrQueryName, isQuery) {
                this.token.value = value;
                this.token.headerOrQueryName = headerOrQueryName;
                this.token.isQuery = isQuery;
            };
        /**
        * Set Auth headers
        * @method
        * @name SmartthingsApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        SmartthingsApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (!this.token.isQuery) {
                if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.value) {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }
            }
            return headers;
        };

/**
 * Get a list of devices.
 * @method
 * @name SmartthingsApi#getDevices
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.capability - The device capabilities to filter the results by.
The capabilities are treated as an "and" so all capabilities must be present.

     * @param {array} parameters.locationId - The device locations to filter the results by.

     * @param {array} parameters.deviceId - The device ids to filter the results by.

     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.getDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['capability'] !== undefined){
                    queryParameters['capability'] = parameters['capability'];
                }
        
        
        


 

                if(parameters['locationId'] !== undefined){
                    queryParameters['locationId'] = parameters['locationId'];
                }
        
        
        


 

                if(parameters['deviceId'] !== undefined){
                    queryParameters['deviceId'] = parameters['deviceId'];
                }
        
        
        


 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Install a device. This is only available for SmartApp managed devices.
The SmartApp that creates the device is responsible for handling commands for the device and
updating the status of the device by creating events.

 * @method
 * @name SmartthingsApi#installDevice
 * @param {object} parameters - method options and parameters
     * @param {} parameters.installationRequest - Installation Request
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.installDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        
            if(parameters['installationRequest'] !== undefined){
                body = parameters['installationRequest'];
            }


        if(parameters['installationRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installationRequest'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a device's description.
 * @method
 * @name SmartthingsApi#getDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
 */
 SmartthingsApi.prototype.getDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a device by device id.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.

 * @method
 * @name SmartthingsApi#deleteDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
 */
 SmartthingsApi.prototype.deleteDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the properties of a device.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.

 * @method
 * @name SmartthingsApi#updateDevice
 * @param {object} parameters - method options and parameters
     * @param {} parameters.updateDeviceRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
 */
 SmartthingsApi.prototype.updateDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        
            if(parameters['updateDeviceRequest'] !== undefined){
                body = parameters['updateDeviceRequest'];
            }


        if(parameters['updateDeviceRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateDeviceRequest'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Execute commands on a device.
 * @method
 * @name SmartthingsApi#executeDeviceCommands
 * @param {object} parameters - method options and parameters
     * @param {} parameters.executeCapabilityCommand - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
 */
 SmartthingsApi.prototype.executeDeviceCommands = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}/commands';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        
            if(parameters['executeCapabilityCommand'] !== undefined){
                body = parameters['executeCapabilityCommand'];
            }


        if(parameters['executeCapabilityCommand'] === undefined){
            deferred.reject(new Error('Missing required  parameter: executeCapabilityCommand'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create events for a device. When a device is managed by a SmartApp then it is responsible for creating events
to update the attributes of the device in the SmartThings platform.
The token must be for a SmartApp and it must be the SmartApp that created the Device.

 * @method
 * @name SmartthingsApi#createDeviceEvents
 * @param {object} parameters - method options and parameters
     * @param {} parameters.deviceEventRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
 */
 SmartthingsApi.prototype.createDeviceEvents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}/events';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        
            if(parameters['deviceEventRequest'] !== undefined){
                body = parameters['deviceEventRequest'];
            }


        if(parameters['deviceEventRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceEventRequest'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the current status of all of a device's component's attributes.
The results may be filtered if the requester only has permission to
view a subset of the device's components or capabilities.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.

 * @method
 * @name SmartthingsApi#getDeviceStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
 */
 SmartthingsApi.prototype.getDeviceStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}/status';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the status of all attributes of a the component.
The results may be filtered if the requester only has permission to view a subset of the component's capabilities.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.

 * @method
 * @name SmartthingsApi#getDeviceComponentStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
     * @param {string} parameters.componentId - The name of the component.
 */
 SmartthingsApi.prototype.getDeviceComponentStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}/components/{componentId}/status';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{componentId}', parameters['componentId']);
        
        


        if(parameters['componentId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: componentId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the current status of a device component's capability.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.

 * @method
 * @name SmartthingsApi#getDeviceStatusByCapability
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceId - the device ID
     * @param {string} parameters.componentId - The name of the component.
     * @param {string} parameters.capabilityId - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 */
 SmartthingsApi.prototype.getDeviceStatusByCapability = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices/{deviceId}/components/{componentId}/capabilities/{capabilityId}/status';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{componentId}', parameters['componentId']);
        
        


        if(parameters['componentId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: componentId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{capabilityId}', parameters['capabilityId']);
        
        


        if(parameters['capabilityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: capabilityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a device profile.
 * @method
 * @name SmartthingsApi#createDeviceProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {} parameters.request - The device profile to be created.
 */
 SmartthingsApi.prototype.createDeviceProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/deviceprofiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['request'] !== undefined){
                body = parameters['request'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List device profiles.
 * @method
 * @name SmartthingsApi#listDeviceProfiles
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.listDeviceProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/deviceprofiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * GET a device profile's description.
 * @method
 * @name SmartthingsApi#getDeviceProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceProfileId - the device profile ID
 */
 SmartthingsApi.prototype.getDeviceProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/deviceprofiles/{deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a device profile by ID. Admin use only
 * @method
 * @name SmartthingsApi#deleteDeviceProfile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.deviceProfileId - the device profile ID
 */
 SmartthingsApi.prototype.deleteDeviceProfile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/deviceprofiles/{deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List all Locations currently available in a user account.
 * @method
 * @name SmartthingsApi#listLocations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.listLocations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a Location for a user.  We will try and create the Location geographically close to the country code provided in the request body. If we do not support Location creation in the requested country code, then the API will return a 422 error response with an error code of UnsupportedGeoRegionError.

 * @method
 * @name SmartthingsApi#createLocation
 * @param {object} parameters - method options and parameters
     * @param {} parameters.createLocationRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.createLocation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        
            if(parameters['createLocationRequest'] !== undefined){
                body = parameters['createLocationRequest'];
            }


        if(parameters['createLocationRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createLocationRequest'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a specific Location from a user's account.
 * @method
 * @name SmartthingsApi#getLocation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.locationId - The ID of the location.
 */
 SmartthingsApi.prototype.getLocation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations/{locationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{locationId}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * All the fields in the request body are optional. Only the specified
fields will be updated.
 * @method
 * @name SmartthingsApi#updateLocation
 * @param {object} parameters - method options and parameters
     * @param {} parameters.updateLocationRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.locationId - The ID of the location.
 */
 SmartthingsApi.prototype.updateLocation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations/{locationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        
            if(parameters['updateLocationRequest'] !== undefined){
                body = parameters['updateLocationRequest'];
            }


        if(parameters['updateLocationRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateLocationRequest'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{locationId}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a Location from a user's account.
 * @method
 * @name SmartthingsApi#deleteLocation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.locationId - The ID of the location.
 */
 SmartthingsApi.prototype.deleteLocation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations/{locationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{locationId}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List all installed applications within a location.
 * @method
 * @name SmartthingsApi#listInstallations
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.locationId - The ID of the location that both the installed smart app and source
are associated with.
     * @param {string} parameters.installedAppStatus - State of the Installed App.
 */
 SmartthingsApi.prototype.listInstallations = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 

                if(parameters['locationId'] !== undefined){
                    queryParameters['locationId'] = parameters['locationId'];
                }
        
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 

                if(parameters['installedAppStatus'] !== undefined){
                    queryParameters['installedAppStatus'] = parameters['installedAppStatus'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch a single installed application.
 * @method
 * @name SmartthingsApi#getInstallation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.installedAppId - The ID of the installed application.
 */
 SmartthingsApi.prototype.getInstallation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete an Installed App.
 * @method
 * @name SmartthingsApi#deleteInstallation
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.locationId - The ID of the location that both the installed smart app and source
are associated with.
 */
 SmartthingsApi.prototype.deleteInstallation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 

                if(parameters['locationId'] !== undefined){
                    queryParameters['locationId'] = parameters['locationId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List all configurations potentially filtered by status for an installed
app.
 * @method
 * @name SmartthingsApi#listInstallationConfig
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.configurationStatus - Filter for configuration status.
 */
 SmartthingsApi.prototype.listInstallationConfig = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/configs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 

                if(parameters['configurationStatus'] !== undefined){
                    queryParameters['configurationStatus'] = parameters['configurationStatus'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch a detailed install configuration model containing actual
config entries / values.
 * @method
 * @name SmartthingsApi#getInstallationConfig
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.configurationId - The ID of the install configuration.
 */
 SmartthingsApi.prototype.getInstallationConfig = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/configs/{configurationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{configurationId}', parameters['configurationId']);
        
        


        if(parameters['configurationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: configurationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the subscriptions for the installed app.

 * @method
 * @name SmartthingsApi#listSubscriptions
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.listSubscriptions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/subscriptions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a subscription to a type of event from the specified source.
Both the source and the installed app must be in the location specified
and the installed app must have read access to the event being subscribed to.

For installed app principal:
* installed app id matches the incoming request installed app id
* if the subscription is a device subscription then there must be a `r:devices:$deviceId` scope
* if it is a capability subscription then the location must match the installed app location, and there must be a `r:devices:*:$capability` or `r:devices:*` scope

For user token:
* user must have ability to read the installed app
* if the subscription is a device subscription then the user must be able to access the device
* if it is a capability subscription then the location must match the installed apps location

 * @method
 * @name SmartthingsApi#saveSubscription
 * @param {object} parameters - method options and parameters
     * @param {} parameters.request - The Subscription to be created.
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.saveSubscription = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/subscriptions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['request'] !== undefined){
                body = parameters['request'];
            }


 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete all subscriptions for the installed app.

 * @method
 * @name SmartthingsApi#deleteAllSubscriptions
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - Limit deletion to subscriptions for a particular device.
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.deleteAllSubscriptions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/subscriptions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['deviceId'] !== undefined){
                    queryParameters['deviceId'] = parameters['deviceId'];
                }
        
        
        


 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a specific subscription for the installed app.

 * @method
 * @name SmartthingsApi#getSubscription
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.subscriptionId - The ID of the subscription
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.getSubscription = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/subscriptions/{subscriptionId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{subscriptionId}', parameters['subscriptionId']);
        
        


        if(parameters['subscriptionId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: subscriptionId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a specific subscription for the installed app.

 * @method
 * @name SmartthingsApi#deleteSubscription
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.subscriptionId - The ID of the subscription
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.deleteSubscription = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/subscriptions/{subscriptionId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{subscriptionId}', parameters['subscriptionId']);
        
        


        if(parameters['subscriptionId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: subscriptionId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the schedules for the installed app.

 * @method
 * @name SmartthingsApi#getSchedules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.getSchedules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/schedules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a schedule for an installed app. The installed app must be in the location specified and the installed app must have permission to create schedules.

 * @method
 * @name SmartthingsApi#createSchedule
 * @param {object} parameters - method options and parameters
     * @param {} parameters.request - The schedule to be created.
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.createSchedule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/schedules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['request'] !== undefined){
                body = parameters['request'];
            }


 
        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete all schedules for the installed app.

 * @method
 * @name SmartthingsApi#deleteSchedules
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.deleteSchedules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/schedules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a specific schedule for the installed app.

 * @method
 * @name SmartthingsApi#getSchedule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.scheduleName - The name of the schedule
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.getSchedule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/schedules/{scheduleName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scheduleName}', parameters['scheduleName']);
        
        


        if(parameters['scheduleName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scheduleName'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete a specific schedule for the installed app.

 * @method
 * @name SmartthingsApi#deleteSchedule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.installedAppId - The ID of the installed application.
     * @param {string} parameters.scheduleName - The name of the schedule
     * @param {string} parameters.authorization - OAuth token
 */
 SmartthingsApi.prototype.deleteSchedule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/installedapps/{installedAppId}/schedules/{scheduleName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{installedAppId}', parameters['installedAppId']);
        
        


        if(parameters['installedAppId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: installedAppId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scheduleName}', parameters['scheduleName']);
        
        


        if(parameters['scheduleName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scheduleName'));
            return deferred.promise;
        }
 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create an app integration.

A single developer account is allowed to contain a maximum of 500 apps.  Upon hitting that limit a 422 error
response is returned with an error code of LimitError.

 * @method
 * @name SmartthingsApi#createApp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {} parameters.createOrUpdateAppRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 */
 SmartthingsApi.prototype.createApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrUpdateAppRequest'] !== undefined){
                body = parameters['createOrUpdateAppRequest'];
            }


        if(parameters['createOrUpdateAppRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrUpdateAppRequest'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List all apps configured in an account.
 * @method
 * @name SmartthingsApi#listApps
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appType - The App Type of the application.
 */
 SmartthingsApi.prototype.listApps = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 

                if(parameters['appType'] !== undefined){
                    queryParameters['appType'] = parameters['appType'];
                }
        
        
        


        if(parameters['appType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a single app.
 * @method
 * @name SmartthingsApi#getApp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
 */
 SmartthingsApi.prototype.getApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an app.
 * @method
 * @name SmartthingsApi#updateApp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
     * @param {} parameters.createOrUpdateAppRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 */
 SmartthingsApi.prototype.updateApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['createOrUpdateAppRequest'] !== undefined){
                body = parameters['createOrUpdateAppRequest'];
            }


        if(parameters['createOrUpdateAppRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: createOrUpdateAppRequest'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete an app.
 * @method
 * @name SmartthingsApi#deleteApp
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
 */
 SmartthingsApi.prototype.deleteApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get settings for an app.
 * @method
 * @name SmartthingsApi#getAppSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
 */
 SmartthingsApi.prototype.getAppSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update settings for an app.
 * @method
 * @name SmartthingsApi#updateAppSettings
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId  field of an app.
     * @param {} parameters.updateAppSettingsRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 */
 SmartthingsApi.prototype.updateAppSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateAppSettingsRequest'] !== undefined){
                body = parameters['updateAppSettingsRequest'];
            }


        if(parameters['updateAppSettingsRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateAppSettingsRequest'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get an app's oauth settings.
 * @method
 * @name SmartthingsApi#getAppOauth
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
 */
 SmartthingsApi.prototype.getAppOauth = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}/oauth';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update an app's oauth settings.
 * @method
 * @name SmartthingsApi#updateAppOauth
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
     * @param {} parameters.updateAppOAuthRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 */
 SmartthingsApi.prototype.updateAppOauth = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}/oauth';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['updateAppOAuthRequest'] !== undefined){
                body = parameters['updateAppOAuthRequest'];
            }


        if(parameters['updateAppOAuthRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: updateAppOAuthRequest'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * When an app is first created an OAuth client/secret are automatically generated for the integration.  However,
there are times when it maybe useful to re-generate a client/secret.  Such as in cases where a secret becomes
compromised.

 * @method
 * @name SmartthingsApi#generateAppOauth
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.appNameOrId - The appName or appId field of an app.
     * @param {} parameters.generateAppOAuthRequest - # Overview

This is the reference documentation for the SmartThings API.

The SmartThings API supports [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1), and all responses are sent as [JSON](http://www.json.org/).

# Authentication

All SmartThings resources are protected with [OAuth 2.0 Bearer Tokens](https://tools.ietf.org/html/rfc6750#section-2.1) sent on the request as an `Authorization: Bearer <TOKEN>` header, and operations require specific OAuth scopes that specify the exact permissions authorized by the user.

## Token types

There are two types of tokens: SmartApp tokens, and personal access tokens.

SmartApp tokens are used to communicate between third-party integrations, or SmartApps, and the SmartThings API.
When a SmartApp is called by the SmartThings platform, it is sent an authorization token that can be used to interact with the SmartThings API.

Personal access tokens are used to interact with the API for non-SmartApp use cases. They can be created and managed on the [personal access tokens page](https://account.smartthings.com/tokens).

## OAuth2 scopes

Operations are protected by specific OAuth scopes that specify the permissions authorized for the particular token.

SmartApp token scopes are derived from the permissions requested by the SmartApp and granted by the end-user during installation.
Personal access token scopes are associated with the specific permissions authorized when creating them.

Scopes are generally in the form `permission:entity-type:entity-id`.

**An `*` used for the `entity-id` specifies that the permission may be applied to all entities that the token type has access to, or may be replaced with a specific ID.**

For more information about authorization and permissions, please see the [Authorization and permissions guide](https://smartthings.developer.samsung.com/docs/guides/smartapps/auth-and-permissions.html).

<!-- ReDoc-Inject: <security-definitions> -->

# Errors

The SmartThings API uses conventional HTTP response codes to indicate the success or failure of a request.
In general, a `2XX` response code indicates success, a `4XX` response code indicates an error given the inputs for the request, and a `5XX` response code indicates a failure on the SmartThings platform.

API errors will contain a JSON response body with more information about the error:

```json
{
  "requestId": "031fec1a-f19f-470a-a7da-710569082846"
  "error": {
    "code": "ConstraintViolationError",
    "message": "Validation errors occurred while process your request.",
    "details": [
      { "code": "PatternError", "target": "latitude", "message": "Invalid format." },
      { "code": "SizeError", "target": "name", "message": "Too small." },
      { "code": "SizeError", "target": "description", "message": "Too big." }
    ]
  }
}
```

## Error Response Body

The error response attributes are:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | String | No | A request identifier that can be used to correlate an error to additional logging on the SmartThings servers.
| error | Error | **Yes** | The Error object, documented below.

## Error Object

The Error object contains the following attributes:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| code | String | **Yes** | A SmartThings-defined error code that serves as a more specific indicator of the error than the HTTP error code specified in the response. See [SmartThings Error Codes](#section/Errors/SmartThings-Error-Codes) for more information.
| message | String | **Yes** | A description of the error, intended to aid developers in debugging of error responses.
| target | String | No | The target of the particular error. For example, it could be the name of the property that caused the error.
| details | Error[] | No | An array of Error objects that typically represent distinct, related errors that occurred during the request. As an optional attribute, this may be null or an empty array.

## Standard HTTP Error Codes

The following table lists the most common HTTP error response:

| Code | Name | Description |
| --- | --- | --- |
| 400 | Bad Request | The client has issued an invalid request. This is commonly used to specify validation errors in a request payload.
| 401 | Unauthorized | Authorization for the API is required, but the request has not been authenticated.
| 403 | Forbidden | The request has been authenticated but does not have appropriate permissions, or a requested resource is not found.
| 404 | Not Found | Specifies the requested path does not exist.
| 406 | Not Acceptable | The client has requested a MIME type via the Accept header for a value not supported by the server.
| 422 | Unprocessable Entity | The client has made a valid request, but the server cannot process it. This is often used for APIs for which certain limits have been exceeded.
| 429 | Too Many Requests | The client has exceeded the number of requests allowed for a given time window.
| 500 | Internal Server Error | An unexpected error on the SmartThings servers has occurred. These errors should be rare.
| 501 | Not Implemented | The client request was valid and understood by the server, but the requested feature has yet to be implemented. These errors should be rare.

## SmartThings Error Codes

SmartThings specifies several standard custom error codes.
These provide more information than the standard HTTP error response codes.
The following table lists the standard SmartThings error codes and their description:

| Code | Typical HTTP Status Codes | Description |
| --- | --- | --- |
| PatternError | 400, 422 | The client has provided input that does not match the expected pattern.
| ConstraintViolationError | 422 | The client has provided input that has violated one or more constraints.
| NotNullError | 422 | The client has provided a null input for a field that is required to be non-null.
| NullError | 422 | The client has provided an input for a field that is required to be null.
| NotEmptyError | 422 | The client has provided an empty input for a field that is required to be non-empty.
| SizeError | 400, 422 | The client has provided a value that does not meet size restrictions.
| Unexpected Error | 500 | A non-recoverable error condition has occurred. Indicates a problem occurred on the SmartThings server that is no fault of the client.
| UnprocessableEntityError | 422 | The client has sent a malformed request body.
| TooManyRequestError | 429 | The client issued too many requests too quickly.
| LimitError | 422 | The client has exceeded certain limits an API enforces.
| UnsupportedOperationError | 400, 422 | The client has issued a request to a feature that currently isn't supported by the SmartThings platform. These should be rare.

## Custom Error Codes

An API may define its own error codes where appropriate.
These custom error codes are documented as part of that specific API's documentation.

# API Versions

The SmartThings API supports both path and header-based versioning.
The following are equivalent:

- https://api.smartthings.com/v1/locations
- https://api.smartthings.com/locations with header `Accept: application/vnd.smartthings+json;v=1`

Currently, only version 1 is available.

# Paging

Operations that return a list of objects return a paginated response.
The `_links` object contains the items returned, and links to the next and previous result page, if applicable.

```json
{
  "items": [
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
      "name": "Home"
    },
    {
      "locationId": "6b3d1909-1e1c-43ec-adc2-5f94d6g4fbf9",
      "name": "Work"
    }
    ....
  ],
  "_links": {
    "next": {
      "href": "https://api.smartthings.com/v1/locations?page=3"
    },
    "previous": {
      "href": "https://api.smartthings.com/v1/locations?page=1"
    }
  }
}
```

 */
 SmartthingsApi.prototype.generateAppOauth = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/apps/{appNameOrId}/oauth/generate';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{appNameOrId}', parameters['appNameOrId']);
        
        


        if(parameters['appNameOrId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: appNameOrId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['generateAppOAuthRequest'] !== undefined){
                body = parameters['generateAppOAuthRequest'];
            }


        if(parameters['generateAppOAuthRequest'] === undefined){
            deferred.reject(new Error('Missing required  parameter: generateAppOAuthRequest'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch a list of Scenes for the logged in user and given locationId
 * @method
 * @name SmartthingsApi#listScenes
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.max - The max number of items to return
     * @param {integer} parameters.offset - The index where the list of items should start
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.locationId - The ID of the location.
 */
 SmartthingsApi.prototype.listScenes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/scenes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['max'] !== undefined){
                    queryParameters['max'] = parameters['max'];
                }
        
        
        


 

                if(parameters['offset'] !== undefined){
                    queryParameters['offset'] = parameters['offset'];
                }
        
        
        


 
        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{locationId}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Execute a Scene by id for the logged in user and given locationId
 * @method
 * @name SmartthingsApi#executeScene
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.authorization - OAuth token
     * @param {string} parameters.locationId - The ID of the location.
     * @param {string} parameters.sceneId - The ID of the Scene.
 */
 SmartthingsApi.prototype.executeScene = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/scenes/{sceneId}/execute';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
                if(parameters['authorization'] !== undefined){
                    headers['Authorization'] = parameters['authorization'];
                }
        


        if(parameters['authorization'] === undefined){
            deferred.reject(new Error('Missing required  parameter: authorization'));
            return deferred.promise;
        }
 
        
            path = path.replace('{locationId}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{sceneId}', parameters['sceneId']);
        
        


        if(parameters['sceneId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sceneId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return SmartthingsApi;
})();

exports.SmartthingsApi = SmartthingsApi;
