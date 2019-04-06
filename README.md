node-red-contrib-smarthings-api
=====================

Node-RED node for smarthings-api

# Overview

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


Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-smarthings-api

Usage
-----

### Methods

- getDevices

    Get a list of devices.

- installDevice

    Install a device. This is only available for SmartApp managed devices.
The SmartApp that creates the device is responsible for handling commands for the device and
updating the status of the device by creating events.


- getDevice

    Get a device's description.

- deleteDevice

    Delete a device by device id.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.


- updateDevice

    Update the properties of a device.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.


- executeDeviceCommands

    Execute commands on a device.

- createDeviceEvents

    Create events for a device. When a device is managed by a SmartApp then it is responsible for creating events
to update the attributes of the device in the SmartThings platform.
The token must be for a SmartApp and it must be the SmartApp that created the Device.


- getDeviceStatus

    Get the current status of all of a device's component's attributes.
The results may be filtered if the requester only has permission to
view a subset of the device's components or capabilities.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.


- getDeviceComponentStatus

    Get the status of all attributes of a the component.
The results may be filtered if the requester only has permission to view a subset of the component's capabilities.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.


- getDeviceStatusByCapability

    Get the current status of a device component's capability.
If the token is for a SmartApp that created the device then it implicitly has permission for this api.


- createDeviceProfile

    Create a device profile.

- listDeviceProfiles

    List device profiles.

- getDeviceProfile

    GET a device profile's description.

- deleteDeviceProfile

    Delete a device profile by ID. Admin use only

- listLocations

    List all Locations currently available in a user account.

- createLocation

    Create a Location for a user.  We will try and create the Location geographically close to the country code provided in the request body. If we do not support Location creation in the requested country code, then the API will return a 422 error response with an error code of UnsupportedGeoRegionError.


- getLocation

    Get a specific Location from a user's account.

- updateLocation

    All the fields in the request body are optional. Only the specified
fields will be updated.

- deleteLocation

    Delete a Location from a user's account.

- listInstallations

    List all installed applications within a location.

- getInstallation

    Fetch a single installed application.

- deleteInstallation

    Delete an Installed App.

- listInstallationConfig

    List all configurations potentially filtered by status for an installed
app.

- getInstallationConfig

    Fetch a detailed install configuration model containing actual
config entries / values.

- listSubscriptions

    List the subscriptions for the installed app.


- saveSubscription

    Create a subscription to a type of event from the specified source.
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


- deleteAllSubscriptions

    Delete all subscriptions for the installed app.


- getSubscription

    Get a specific subscription for the installed app.


- deleteSubscription

    Delete a specific subscription for the installed app.


- getSchedules

    List the schedules for the installed app.


- createSchedule

    Create a schedule for an installed app. The installed app must be in the location specified and the installed app must have permission to create schedules.


- deleteSchedules

    Delete all schedules for the installed app.


- getSchedule

    Get a specific schedule for the installed app.


- deleteSchedule

    Delete a specific schedule for the installed app.


- createApp

    Create an app integration.

A single developer account is allowed to contain a maximum of 500 apps.  Upon hitting that limit a 422 error
response is returned with an error code of LimitError.


- listApps

    List all apps configured in an account.

- getApp

    Get a single app.

- updateApp

    Update an app.

- deleteApp

    Delete an app.

- getAppSettings

    Get settings for an app.

- updateAppSettings

    Update settings for an app.

- getAppOauth

    Get an app's oauth settings.

- updateAppOauth

    Update an app's oauth settings.

- generateAppOauth

    When an app is first created an OAuth client/secret are automatically generated for the integration.  However,
there are times when it maybe useful to re-generate a client/secret.  Such as in cases where a secret becomes
compromised.


- listScenes

    Fetch a list of Scenes for the logged in user and given locationId

- executeScene

    Execute a Scene by id for the logged in user and given locationId


