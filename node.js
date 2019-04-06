'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function SmartthingsApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.getDevices_capability = config.getDevices_capability;
        this.getDevices_capabilityType = config.getDevices_capabilityType || 'str';
        this.getDevices_locationId = config.getDevices_locationId;
        this.getDevices_locationIdType = config.getDevices_locationIdType || 'str';
        this.getDevices_deviceId = config.getDevices_deviceId;
        this.getDevices_deviceIdType = config.getDevices_deviceIdType || 'str';
        this.getDevices_authorization = config.getDevices_authorization;
        this.getDevices_authorizationType = config.getDevices_authorizationType || 'str';
        this.installDevice_installationRequest = config.installDevice_installationRequest;
        this.installDevice_installationRequestType = config.installDevice_installationRequestType || 'str';
        this.installDevice_authorization = config.installDevice_authorization;
        this.installDevice_authorizationType = config.installDevice_authorizationType || 'str';
        this.getDevice_authorization = config.getDevice_authorization;
        this.getDevice_authorizationType = config.getDevice_authorizationType || 'str';
        this.getDevice_deviceId = config.getDevice_deviceId;
        this.getDevice_deviceIdType = config.getDevice_deviceIdType || 'str';
        this.deleteDevice_authorization = config.deleteDevice_authorization;
        this.deleteDevice_authorizationType = config.deleteDevice_authorizationType || 'str';
        this.deleteDevice_deviceId = config.deleteDevice_deviceId;
        this.deleteDevice_deviceIdType = config.deleteDevice_deviceIdType || 'str';
        this.updateDevice_updateDeviceRequest = config.updateDevice_updateDeviceRequest;
        this.updateDevice_updateDeviceRequestType = config.updateDevice_updateDeviceRequestType || 'str';
        this.updateDevice_authorization = config.updateDevice_authorization;
        this.updateDevice_authorizationType = config.updateDevice_authorizationType || 'str';
        this.updateDevice_deviceId = config.updateDevice_deviceId;
        this.updateDevice_deviceIdType = config.updateDevice_deviceIdType || 'str';
        this.executeDeviceCommands_executeCapabilityCommand = config.executeDeviceCommands_executeCapabilityCommand;
        this.executeDeviceCommands_executeCapabilityCommandType = config.executeDeviceCommands_executeCapabilityCommandType || 'str';
        this.executeDeviceCommands_authorization = config.executeDeviceCommands_authorization;
        this.executeDeviceCommands_authorizationType = config.executeDeviceCommands_authorizationType || 'str';
        this.executeDeviceCommands_deviceId = config.executeDeviceCommands_deviceId;
        this.executeDeviceCommands_deviceIdType = config.executeDeviceCommands_deviceIdType || 'str';
        this.createDeviceEvents_deviceEventRequest = config.createDeviceEvents_deviceEventRequest;
        this.createDeviceEvents_deviceEventRequestType = config.createDeviceEvents_deviceEventRequestType || 'str';
        this.createDeviceEvents_authorization = config.createDeviceEvents_authorization;
        this.createDeviceEvents_authorizationType = config.createDeviceEvents_authorizationType || 'str';
        this.createDeviceEvents_deviceId = config.createDeviceEvents_deviceId;
        this.createDeviceEvents_deviceIdType = config.createDeviceEvents_deviceIdType || 'str';
        this.getDeviceStatus_authorization = config.getDeviceStatus_authorization;
        this.getDeviceStatus_authorizationType = config.getDeviceStatus_authorizationType || 'str';
        this.getDeviceStatus_deviceId = config.getDeviceStatus_deviceId;
        this.getDeviceStatus_deviceIdType = config.getDeviceStatus_deviceIdType || 'str';
        this.getDeviceComponentStatus_authorization = config.getDeviceComponentStatus_authorization;
        this.getDeviceComponentStatus_authorizationType = config.getDeviceComponentStatus_authorizationType || 'str';
        this.getDeviceComponentStatus_deviceId = config.getDeviceComponentStatus_deviceId;
        this.getDeviceComponentStatus_deviceIdType = config.getDeviceComponentStatus_deviceIdType || 'str';
        this.getDeviceComponentStatus_componentId = config.getDeviceComponentStatus_componentId;
        this.getDeviceComponentStatus_componentIdType = config.getDeviceComponentStatus_componentIdType || 'str';
        this.getDeviceStatusByCapability_authorization = config.getDeviceStatusByCapability_authorization;
        this.getDeviceStatusByCapability_authorizationType = config.getDeviceStatusByCapability_authorizationType || 'str';
        this.getDeviceStatusByCapability_deviceId = config.getDeviceStatusByCapability_deviceId;
        this.getDeviceStatusByCapability_deviceIdType = config.getDeviceStatusByCapability_deviceIdType || 'str';
        this.getDeviceStatusByCapability_componentId = config.getDeviceStatusByCapability_componentId;
        this.getDeviceStatusByCapability_componentIdType = config.getDeviceStatusByCapability_componentIdType || 'str';
        this.getDeviceStatusByCapability_capabilityId = config.getDeviceStatusByCapability_capabilityId;
        this.getDeviceStatusByCapability_capabilityIdType = config.getDeviceStatusByCapability_capabilityIdType || 'str';
        this.createDeviceProfile_authorization = config.createDeviceProfile_authorization;
        this.createDeviceProfile_authorizationType = config.createDeviceProfile_authorizationType || 'str';
        this.createDeviceProfile_request = config.createDeviceProfile_request;
        this.createDeviceProfile_requestType = config.createDeviceProfile_requestType || 'str';
        this.listDeviceProfiles_authorization = config.listDeviceProfiles_authorization;
        this.listDeviceProfiles_authorizationType = config.listDeviceProfiles_authorizationType || 'str';
        this.getDeviceProfile_authorization = config.getDeviceProfile_authorization;
        this.getDeviceProfile_authorizationType = config.getDeviceProfile_authorizationType || 'str';
        this.getDeviceProfile_deviceProfileId = config.getDeviceProfile_deviceProfileId;
        this.getDeviceProfile_deviceProfileIdType = config.getDeviceProfile_deviceProfileIdType || 'str';
        this.deleteDeviceProfile_authorization = config.deleteDeviceProfile_authorization;
        this.deleteDeviceProfile_authorizationType = config.deleteDeviceProfile_authorizationType || 'str';
        this.deleteDeviceProfile_deviceProfileId = config.deleteDeviceProfile_deviceProfileId;
        this.deleteDeviceProfile_deviceProfileIdType = config.deleteDeviceProfile_deviceProfileIdType || 'str';
        this.listLocations_authorization = config.listLocations_authorization;
        this.listLocations_authorizationType = config.listLocations_authorizationType || 'str';
        this.createLocation_createLocationRequest = config.createLocation_createLocationRequest;
        this.createLocation_createLocationRequestType = config.createLocation_createLocationRequestType || 'str';
        this.createLocation_authorization = config.createLocation_authorization;
        this.createLocation_authorizationType = config.createLocation_authorizationType || 'str';
        this.getLocation_authorization = config.getLocation_authorization;
        this.getLocation_authorizationType = config.getLocation_authorizationType || 'str';
        this.getLocation_locationId = config.getLocation_locationId;
        this.getLocation_locationIdType = config.getLocation_locationIdType || 'str';
        this.updateLocation_updateLocationRequest = config.updateLocation_updateLocationRequest;
        this.updateLocation_updateLocationRequestType = config.updateLocation_updateLocationRequestType || 'str';
        this.updateLocation_authorization = config.updateLocation_authorization;
        this.updateLocation_authorizationType = config.updateLocation_authorizationType || 'str';
        this.updateLocation_locationId = config.updateLocation_locationId;
        this.updateLocation_locationIdType = config.updateLocation_locationIdType || 'str';
        this.deleteLocation_authorization = config.deleteLocation_authorization;
        this.deleteLocation_authorizationType = config.deleteLocation_authorizationType || 'str';
        this.deleteLocation_locationId = config.deleteLocation_locationId;
        this.deleteLocation_locationIdType = config.deleteLocation_locationIdType || 'str';
        this.listInstallations_authorization = config.listInstallations_authorization;
        this.listInstallations_authorizationType = config.listInstallations_authorizationType || 'str';
        this.listInstallations_locationId = config.listInstallations_locationId;
        this.listInstallations_locationIdType = config.listInstallations_locationIdType || 'str';
        this.listInstallations_installedAppStatus = config.listInstallations_installedAppStatus;
        this.listInstallations_installedAppStatusType = config.listInstallations_installedAppStatusType || 'str';
        this.getInstallation_authorization = config.getInstallation_authorization;
        this.getInstallation_authorizationType = config.getInstallation_authorizationType || 'str';
        this.getInstallation_installedAppId = config.getInstallation_installedAppId;
        this.getInstallation_installedAppIdType = config.getInstallation_installedAppIdType || 'str';
        this.deleteInstallation_authorization = config.deleteInstallation_authorization;
        this.deleteInstallation_authorizationType = config.deleteInstallation_authorizationType || 'str';
        this.deleteInstallation_installedAppId = config.deleteInstallation_installedAppId;
        this.deleteInstallation_installedAppIdType = config.deleteInstallation_installedAppIdType || 'str';
        this.deleteInstallation_locationId = config.deleteInstallation_locationId;
        this.deleteInstallation_locationIdType = config.deleteInstallation_locationIdType || 'str';
        this.listInstallationConfig_authorization = config.listInstallationConfig_authorization;
        this.listInstallationConfig_authorizationType = config.listInstallationConfig_authorizationType || 'str';
        this.listInstallationConfig_installedAppId = config.listInstallationConfig_installedAppId;
        this.listInstallationConfig_installedAppIdType = config.listInstallationConfig_installedAppIdType || 'str';
        this.listInstallationConfig_configurationStatus = config.listInstallationConfig_configurationStatus;
        this.listInstallationConfig_configurationStatusType = config.listInstallationConfig_configurationStatusType || 'str';
        this.getInstallationConfig_authorization = config.getInstallationConfig_authorization;
        this.getInstallationConfig_authorizationType = config.getInstallationConfig_authorizationType || 'str';
        this.getInstallationConfig_installedAppId = config.getInstallationConfig_installedAppId;
        this.getInstallationConfig_installedAppIdType = config.getInstallationConfig_installedAppIdType || 'str';
        this.getInstallationConfig_configurationId = config.getInstallationConfig_configurationId;
        this.getInstallationConfig_configurationIdType = config.getInstallationConfig_configurationIdType || 'str';
        this.listSubscriptions_installedAppId = config.listSubscriptions_installedAppId;
        this.listSubscriptions_installedAppIdType = config.listSubscriptions_installedAppIdType || 'str';
        this.listSubscriptions_authorization = config.listSubscriptions_authorization;
        this.listSubscriptions_authorizationType = config.listSubscriptions_authorizationType || 'str';
        this.saveSubscription_request = config.saveSubscription_request;
        this.saveSubscription_requestType = config.saveSubscription_requestType || 'str';
        this.saveSubscription_installedAppId = config.saveSubscription_installedAppId;
        this.saveSubscription_installedAppIdType = config.saveSubscription_installedAppIdType || 'str';
        this.saveSubscription_authorization = config.saveSubscription_authorization;
        this.saveSubscription_authorizationType = config.saveSubscription_authorizationType || 'str';
        this.deleteAllSubscriptions_deviceId = config.deleteAllSubscriptions_deviceId;
        this.deleteAllSubscriptions_deviceIdType = config.deleteAllSubscriptions_deviceIdType || 'str';
        this.deleteAllSubscriptions_installedAppId = config.deleteAllSubscriptions_installedAppId;
        this.deleteAllSubscriptions_installedAppIdType = config.deleteAllSubscriptions_installedAppIdType || 'str';
        this.deleteAllSubscriptions_authorization = config.deleteAllSubscriptions_authorization;
        this.deleteAllSubscriptions_authorizationType = config.deleteAllSubscriptions_authorizationType || 'str';
        this.getSubscription_installedAppId = config.getSubscription_installedAppId;
        this.getSubscription_installedAppIdType = config.getSubscription_installedAppIdType || 'str';
        this.getSubscription_subscriptionId = config.getSubscription_subscriptionId;
        this.getSubscription_subscriptionIdType = config.getSubscription_subscriptionIdType || 'str';
        this.getSubscription_authorization = config.getSubscription_authorization;
        this.getSubscription_authorizationType = config.getSubscription_authorizationType || 'str';
        this.deleteSubscription_installedAppId = config.deleteSubscription_installedAppId;
        this.deleteSubscription_installedAppIdType = config.deleteSubscription_installedAppIdType || 'str';
        this.deleteSubscription_subscriptionId = config.deleteSubscription_subscriptionId;
        this.deleteSubscription_subscriptionIdType = config.deleteSubscription_subscriptionIdType || 'str';
        this.deleteSubscription_authorization = config.deleteSubscription_authorization;
        this.deleteSubscription_authorizationType = config.deleteSubscription_authorizationType || 'str';
        this.getSchedules_installedAppId = config.getSchedules_installedAppId;
        this.getSchedules_installedAppIdType = config.getSchedules_installedAppIdType || 'str';
        this.getSchedules_authorization = config.getSchedules_authorization;
        this.getSchedules_authorizationType = config.getSchedules_authorizationType || 'str';
        this.createSchedule_request = config.createSchedule_request;
        this.createSchedule_requestType = config.createSchedule_requestType || 'str';
        this.createSchedule_installedAppId = config.createSchedule_installedAppId;
        this.createSchedule_installedAppIdType = config.createSchedule_installedAppIdType || 'str';
        this.createSchedule_authorization = config.createSchedule_authorization;
        this.createSchedule_authorizationType = config.createSchedule_authorizationType || 'str';
        this.deleteSchedules_installedAppId = config.deleteSchedules_installedAppId;
        this.deleteSchedules_installedAppIdType = config.deleteSchedules_installedAppIdType || 'str';
        this.deleteSchedules_authorization = config.deleteSchedules_authorization;
        this.deleteSchedules_authorizationType = config.deleteSchedules_authorizationType || 'str';
        this.getSchedule_installedAppId = config.getSchedule_installedAppId;
        this.getSchedule_installedAppIdType = config.getSchedule_installedAppIdType || 'str';
        this.getSchedule_scheduleName = config.getSchedule_scheduleName;
        this.getSchedule_scheduleNameType = config.getSchedule_scheduleNameType || 'str';
        this.getSchedule_authorization = config.getSchedule_authorization;
        this.getSchedule_authorizationType = config.getSchedule_authorizationType || 'str';
        this.deleteSchedule_installedAppId = config.deleteSchedule_installedAppId;
        this.deleteSchedule_installedAppIdType = config.deleteSchedule_installedAppIdType || 'str';
        this.deleteSchedule_scheduleName = config.deleteSchedule_scheduleName;
        this.deleteSchedule_scheduleNameType = config.deleteSchedule_scheduleNameType || 'str';
        this.deleteSchedule_authorization = config.deleteSchedule_authorization;
        this.deleteSchedule_authorizationType = config.deleteSchedule_authorizationType || 'str';
        this.createApp_authorization = config.createApp_authorization;
        this.createApp_authorizationType = config.createApp_authorizationType || 'str';
        this.createApp_createOrUpdateAppRequest = config.createApp_createOrUpdateAppRequest;
        this.createApp_createOrUpdateAppRequestType = config.createApp_createOrUpdateAppRequestType || 'str';
        this.listApps_authorization = config.listApps_authorization;
        this.listApps_authorizationType = config.listApps_authorizationType || 'str';
        this.listApps_appType = config.listApps_appType;
        this.listApps_appTypeType = config.listApps_appTypeType || 'str';
        this.getApp_authorization = config.getApp_authorization;
        this.getApp_authorizationType = config.getApp_authorizationType || 'str';
        this.getApp_appNameOrId = config.getApp_appNameOrId;
        this.getApp_appNameOrIdType = config.getApp_appNameOrIdType || 'str';
        this.updateApp_authorization = config.updateApp_authorization;
        this.updateApp_authorizationType = config.updateApp_authorizationType || 'str';
        this.updateApp_appNameOrId = config.updateApp_appNameOrId;
        this.updateApp_appNameOrIdType = config.updateApp_appNameOrIdType || 'str';
        this.updateApp_createOrUpdateAppRequest = config.updateApp_createOrUpdateAppRequest;
        this.updateApp_createOrUpdateAppRequestType = config.updateApp_createOrUpdateAppRequestType || 'str';
        this.deleteApp_authorization = config.deleteApp_authorization;
        this.deleteApp_authorizationType = config.deleteApp_authorizationType || 'str';
        this.deleteApp_appNameOrId = config.deleteApp_appNameOrId;
        this.deleteApp_appNameOrIdType = config.deleteApp_appNameOrIdType || 'str';
        this.getAppSettings_authorization = config.getAppSettings_authorization;
        this.getAppSettings_authorizationType = config.getAppSettings_authorizationType || 'str';
        this.getAppSettings_appNameOrId = config.getAppSettings_appNameOrId;
        this.getAppSettings_appNameOrIdType = config.getAppSettings_appNameOrIdType || 'str';
        this.updateAppSettings_authorization = config.updateAppSettings_authorization;
        this.updateAppSettings_authorizationType = config.updateAppSettings_authorizationType || 'str';
        this.updateAppSettings_appNameOrId = config.updateAppSettings_appNameOrId;
        this.updateAppSettings_appNameOrIdType = config.updateAppSettings_appNameOrIdType || 'str';
        this.updateAppSettings_updateAppSettingsRequest = config.updateAppSettings_updateAppSettingsRequest;
        this.updateAppSettings_updateAppSettingsRequestType = config.updateAppSettings_updateAppSettingsRequestType || 'str';
        this.getAppOauth_authorization = config.getAppOauth_authorization;
        this.getAppOauth_authorizationType = config.getAppOauth_authorizationType || 'str';
        this.getAppOauth_appNameOrId = config.getAppOauth_appNameOrId;
        this.getAppOauth_appNameOrIdType = config.getAppOauth_appNameOrIdType || 'str';
        this.updateAppOauth_authorization = config.updateAppOauth_authorization;
        this.updateAppOauth_authorizationType = config.updateAppOauth_authorizationType || 'str';
        this.updateAppOauth_appNameOrId = config.updateAppOauth_appNameOrId;
        this.updateAppOauth_appNameOrIdType = config.updateAppOauth_appNameOrIdType || 'str';
        this.updateAppOauth_updateAppOAuthRequest = config.updateAppOauth_updateAppOAuthRequest;
        this.updateAppOauth_updateAppOAuthRequestType = config.updateAppOauth_updateAppOAuthRequestType || 'str';
        this.generateAppOauth_authorization = config.generateAppOauth_authorization;
        this.generateAppOauth_authorizationType = config.generateAppOauth_authorizationType || 'str';
        this.generateAppOauth_appNameOrId = config.generateAppOauth_appNameOrId;
        this.generateAppOauth_appNameOrIdType = config.generateAppOauth_appNameOrIdType || 'str';
        this.generateAppOauth_generateAppOAuthRequest = config.generateAppOauth_generateAppOAuthRequest;
        this.generateAppOauth_generateAppOAuthRequestType = config.generateAppOauth_generateAppOAuthRequestType || 'str';
        this.listScenes_max = config.listScenes_max;
        this.listScenes_maxType = config.listScenes_maxType || 'str';
        this.listScenes_offset = config.listScenes_offset;
        this.listScenes_offsetType = config.listScenes_offsetType || 'str';
        this.listScenes_authorization = config.listScenes_authorization;
        this.listScenes_authorizationType = config.listScenes_authorizationType || 'str';
        this.listScenes_locationId = config.listScenes_locationId;
        this.listScenes_locationIdType = config.listScenes_locationIdType || 'str';
        this.executeScene_authorization = config.executeScene_authorization;
        this.executeScene_authorizationType = config.executeScene_authorizationType || 'str';
        this.executeScene_locationId = config.executeScene_locationId;
        this.executeScene_locationIdType = config.executeScene_locationIdType || 'str';
        this.executeScene_sceneId = config.executeScene_sceneId;
        this.executeScene_sceneIdType = config.executeScene_sceneIdType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client = new lib.SmartthingsApi();
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureTokenValue) {
                if (this.service.secureTokenIsQuery) {
                    client.setToken(this.service.credentials.secureTokenValue,
                                    this.service.secureTokenHeaderOrQueryName, true);
                } else {
                    client.setToken(this.service.credentials.secureTokenValue,
                                    this.service.secureTokenHeaderOrQueryName, false);
                }
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'getDevices') {
                var getDevices_parameters = [];
                var getDevices_nodeParam;
                var getDevices_nodeParamType;

                getDevices_nodeParam = node.getDevices_capability;
                getDevices_nodeParamType = node.getDevices_capabilityType;
                if (getDevices_nodeParamType === 'str') {
                    getDevices_parameters.capability = getDevices_nodeParam || '';
                } else {
                    getDevices_parameters.capability = RED.util.getMessageProperty(msg, getDevices_nodeParam);
                }
                getDevices_parameters.capability = !!getDevices_parameters.capability ? getDevices_parameters.capability : msg.payload;
                
                getDevices_nodeParam = node.getDevices_locationId;
                getDevices_nodeParamType = node.getDevices_locationIdType;
                if (getDevices_nodeParamType === 'str') {
                    getDevices_parameters.locationId = getDevices_nodeParam || '';
                } else {
                    getDevices_parameters.locationId = RED.util.getMessageProperty(msg, getDevices_nodeParam);
                }
                getDevices_parameters.locationId = !!getDevices_parameters.locationId ? getDevices_parameters.locationId : msg.payload;
                
                getDevices_nodeParam = node.getDevices_deviceId;
                getDevices_nodeParamType = node.getDevices_deviceIdType;
                if (getDevices_nodeParamType === 'str') {
                    getDevices_parameters.deviceId = getDevices_nodeParam || '';
                } else {
                    getDevices_parameters.deviceId = RED.util.getMessageProperty(msg, getDevices_nodeParam);
                }
                getDevices_parameters.deviceId = !!getDevices_parameters.deviceId ? getDevices_parameters.deviceId : msg.payload;
                
                getDevices_nodeParam = node.getDevices_authorization;
                getDevices_nodeParamType = node.getDevices_authorizationType;
                if (getDevices_nodeParamType === 'str') {
                    getDevices_parameters.authorization = getDevices_nodeParam || '';
                } else {
                    getDevices_parameters.authorization = RED.util.getMessageProperty(msg, getDevices_nodeParam);
                }
                getDevices_parameters.authorization = !!getDevices_parameters.authorization ? getDevices_parameters.authorization : msg.payload;
                                result = client.getDevices(getDevices_parameters);
            }
            if (!errorFlag && node.method === 'installDevice') {
                var installDevice_parameters = [];
                var installDevice_nodeParam;
                var installDevice_nodeParamType;

                installDevice_nodeParam = node.installDevice_installationRequest;
                installDevice_nodeParamType = node.installDevice_installationRequestType;
                if (installDevice_nodeParamType === 'str') {
                    installDevice_parameters.installationRequest = installDevice_nodeParam || '';
                } else {
                    installDevice_parameters.installationRequest = RED.util.getMessageProperty(msg, installDevice_nodeParam);
                }
                installDevice_parameters.installationRequest = !!installDevice_parameters.installationRequest ? installDevice_parameters.installationRequest : msg.payload;
                
                installDevice_nodeParam = node.installDevice_authorization;
                installDevice_nodeParamType = node.installDevice_authorizationType;
                if (installDevice_nodeParamType === 'str') {
                    installDevice_parameters.authorization = installDevice_nodeParam || '';
                } else {
                    installDevice_parameters.authorization = RED.util.getMessageProperty(msg, installDevice_nodeParam);
                }
                installDevice_parameters.authorization = !!installDevice_parameters.authorization ? installDevice_parameters.authorization : msg.payload;
                                result = client.installDevice(installDevice_parameters);
            }
            if (!errorFlag && node.method === 'getDevice') {
                var getDevice_parameters = [];
                var getDevice_nodeParam;
                var getDevice_nodeParamType;

                getDevice_nodeParam = node.getDevice_authorization;
                getDevice_nodeParamType = node.getDevice_authorizationType;
                if (getDevice_nodeParamType === 'str') {
                    getDevice_parameters.authorization = getDevice_nodeParam || '';
                } else {
                    getDevice_parameters.authorization = RED.util.getMessageProperty(msg, getDevice_nodeParam);
                }
                getDevice_parameters.authorization = !!getDevice_parameters.authorization ? getDevice_parameters.authorization : msg.payload;
                
                getDevice_nodeParam = node.getDevice_deviceId;
                getDevice_nodeParamType = node.getDevice_deviceIdType;
                if (getDevice_nodeParamType === 'str') {
                    getDevice_parameters.deviceId = getDevice_nodeParam || '';
                } else {
                    getDevice_parameters.deviceId = RED.util.getMessageProperty(msg, getDevice_nodeParam);
                }
                getDevice_parameters.deviceId = !!getDevice_parameters.deviceId ? getDevice_parameters.deviceId : msg.payload;
                                result = client.getDevice(getDevice_parameters);
            }
            if (!errorFlag && node.method === 'deleteDevice') {
                var deleteDevice_parameters = [];
                var deleteDevice_nodeParam;
                var deleteDevice_nodeParamType;

                deleteDevice_nodeParam = node.deleteDevice_authorization;
                deleteDevice_nodeParamType = node.deleteDevice_authorizationType;
                if (deleteDevice_nodeParamType === 'str') {
                    deleteDevice_parameters.authorization = deleteDevice_nodeParam || '';
                } else {
                    deleteDevice_parameters.authorization = RED.util.getMessageProperty(msg, deleteDevice_nodeParam);
                }
                deleteDevice_parameters.authorization = !!deleteDevice_parameters.authorization ? deleteDevice_parameters.authorization : msg.payload;
                
                deleteDevice_nodeParam = node.deleteDevice_deviceId;
                deleteDevice_nodeParamType = node.deleteDevice_deviceIdType;
                if (deleteDevice_nodeParamType === 'str') {
                    deleteDevice_parameters.deviceId = deleteDevice_nodeParam || '';
                } else {
                    deleteDevice_parameters.deviceId = RED.util.getMessageProperty(msg, deleteDevice_nodeParam);
                }
                deleteDevice_parameters.deviceId = !!deleteDevice_parameters.deviceId ? deleteDevice_parameters.deviceId : msg.payload;
                                result = client.deleteDevice(deleteDevice_parameters);
            }
            if (!errorFlag && node.method === 'updateDevice') {
                var updateDevice_parameters = [];
                var updateDevice_nodeParam;
                var updateDevice_nodeParamType;

                updateDevice_nodeParam = node.updateDevice_updateDeviceRequest;
                updateDevice_nodeParamType = node.updateDevice_updateDeviceRequestType;
                if (updateDevice_nodeParamType === 'str') {
                    updateDevice_parameters.updateDeviceRequest = updateDevice_nodeParam || '';
                } else {
                    updateDevice_parameters.updateDeviceRequest = RED.util.getMessageProperty(msg, updateDevice_nodeParam);
                }
                updateDevice_parameters.updateDeviceRequest = !!updateDevice_parameters.updateDeviceRequest ? updateDevice_parameters.updateDeviceRequest : msg.payload;
                
                updateDevice_nodeParam = node.updateDevice_authorization;
                updateDevice_nodeParamType = node.updateDevice_authorizationType;
                if (updateDevice_nodeParamType === 'str') {
                    updateDevice_parameters.authorization = updateDevice_nodeParam || '';
                } else {
                    updateDevice_parameters.authorization = RED.util.getMessageProperty(msg, updateDevice_nodeParam);
                }
                updateDevice_parameters.authorization = !!updateDevice_parameters.authorization ? updateDevice_parameters.authorization : msg.payload;
                
                updateDevice_nodeParam = node.updateDevice_deviceId;
                updateDevice_nodeParamType = node.updateDevice_deviceIdType;
                if (updateDevice_nodeParamType === 'str') {
                    updateDevice_parameters.deviceId = updateDevice_nodeParam || '';
                } else {
                    updateDevice_parameters.deviceId = RED.util.getMessageProperty(msg, updateDevice_nodeParam);
                }
                updateDevice_parameters.deviceId = !!updateDevice_parameters.deviceId ? updateDevice_parameters.deviceId : msg.payload;
                                result = client.updateDevice(updateDevice_parameters);
            }
            if (!errorFlag && node.method === 'executeDeviceCommands') {
                var executeDeviceCommands_parameters = [];
                var executeDeviceCommands_nodeParam;
                var executeDeviceCommands_nodeParamType;

                executeDeviceCommands_nodeParam = node.executeDeviceCommands_executeCapabilityCommand;
                executeDeviceCommands_nodeParamType = node.executeDeviceCommands_executeCapabilityCommandType;
                if (executeDeviceCommands_nodeParamType === 'str') {
                    executeDeviceCommands_parameters.executeCapabilityCommand = executeDeviceCommands_nodeParam || '';
                } else {
                    executeDeviceCommands_parameters.executeCapabilityCommand = RED.util.getMessageProperty(msg, executeDeviceCommands_nodeParam);
                }
                executeDeviceCommands_parameters.executeCapabilityCommand = !!executeDeviceCommands_parameters.executeCapabilityCommand ? executeDeviceCommands_parameters.executeCapabilityCommand : msg.payload;
                
                executeDeviceCommands_nodeParam = node.executeDeviceCommands_authorization;
                executeDeviceCommands_nodeParamType = node.executeDeviceCommands_authorizationType;
                if (executeDeviceCommands_nodeParamType === 'str') {
                    executeDeviceCommands_parameters.authorization = executeDeviceCommands_nodeParam || '';
                } else {
                    executeDeviceCommands_parameters.authorization = RED.util.getMessageProperty(msg, executeDeviceCommands_nodeParam);
                }
                executeDeviceCommands_parameters.authorization = !!executeDeviceCommands_parameters.authorization ? executeDeviceCommands_parameters.authorization : msg.payload;
                
                executeDeviceCommands_nodeParam = node.executeDeviceCommands_deviceId;
                executeDeviceCommands_nodeParamType = node.executeDeviceCommands_deviceIdType;
                if (executeDeviceCommands_nodeParamType === 'str') {
                    executeDeviceCommands_parameters.deviceId = executeDeviceCommands_nodeParam || '';
                } else {
                    executeDeviceCommands_parameters.deviceId = RED.util.getMessageProperty(msg, executeDeviceCommands_nodeParam);
                }
                executeDeviceCommands_parameters.deviceId = !!executeDeviceCommands_parameters.deviceId ? executeDeviceCommands_parameters.deviceId : msg.payload;
                                result = client.executeDeviceCommands(executeDeviceCommands_parameters);
            }
            if (!errorFlag && node.method === 'createDeviceEvents') {
                var createDeviceEvents_parameters = [];
                var createDeviceEvents_nodeParam;
                var createDeviceEvents_nodeParamType;

                createDeviceEvents_nodeParam = node.createDeviceEvents_deviceEventRequest;
                createDeviceEvents_nodeParamType = node.createDeviceEvents_deviceEventRequestType;
                if (createDeviceEvents_nodeParamType === 'str') {
                    createDeviceEvents_parameters.deviceEventRequest = createDeviceEvents_nodeParam || '';
                } else {
                    createDeviceEvents_parameters.deviceEventRequest = RED.util.getMessageProperty(msg, createDeviceEvents_nodeParam);
                }
                createDeviceEvents_parameters.deviceEventRequest = !!createDeviceEvents_parameters.deviceEventRequest ? createDeviceEvents_parameters.deviceEventRequest : msg.payload;
                
                createDeviceEvents_nodeParam = node.createDeviceEvents_authorization;
                createDeviceEvents_nodeParamType = node.createDeviceEvents_authorizationType;
                if (createDeviceEvents_nodeParamType === 'str') {
                    createDeviceEvents_parameters.authorization = createDeviceEvents_nodeParam || '';
                } else {
                    createDeviceEvents_parameters.authorization = RED.util.getMessageProperty(msg, createDeviceEvents_nodeParam);
                }
                createDeviceEvents_parameters.authorization = !!createDeviceEvents_parameters.authorization ? createDeviceEvents_parameters.authorization : msg.payload;
                
                createDeviceEvents_nodeParam = node.createDeviceEvents_deviceId;
                createDeviceEvents_nodeParamType = node.createDeviceEvents_deviceIdType;
                if (createDeviceEvents_nodeParamType === 'str') {
                    createDeviceEvents_parameters.deviceId = createDeviceEvents_nodeParam || '';
                } else {
                    createDeviceEvents_parameters.deviceId = RED.util.getMessageProperty(msg, createDeviceEvents_nodeParam);
                }
                createDeviceEvents_parameters.deviceId = !!createDeviceEvents_parameters.deviceId ? createDeviceEvents_parameters.deviceId : msg.payload;
                                result = client.createDeviceEvents(createDeviceEvents_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceStatus') {
                var getDeviceStatus_parameters = [];
                var getDeviceStatus_nodeParam;
                var getDeviceStatus_nodeParamType;

                getDeviceStatus_nodeParam = node.getDeviceStatus_authorization;
                getDeviceStatus_nodeParamType = node.getDeviceStatus_authorizationType;
                if (getDeviceStatus_nodeParamType === 'str') {
                    getDeviceStatus_parameters.authorization = getDeviceStatus_nodeParam || '';
                } else {
                    getDeviceStatus_parameters.authorization = RED.util.getMessageProperty(msg, getDeviceStatus_nodeParam);
                }
                getDeviceStatus_parameters.authorization = !!getDeviceStatus_parameters.authorization ? getDeviceStatus_parameters.authorization : msg.payload;
                
                getDeviceStatus_nodeParam = node.getDeviceStatus_deviceId;
                getDeviceStatus_nodeParamType = node.getDeviceStatus_deviceIdType;
                if (getDeviceStatus_nodeParamType === 'str') {
                    getDeviceStatus_parameters.deviceId = getDeviceStatus_nodeParam || '';
                } else {
                    getDeviceStatus_parameters.deviceId = RED.util.getMessageProperty(msg, getDeviceStatus_nodeParam);
                }
                getDeviceStatus_parameters.deviceId = !!getDeviceStatus_parameters.deviceId ? getDeviceStatus_parameters.deviceId : msg.payload;
                                result = client.getDeviceStatus(getDeviceStatus_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceComponentStatus') {
                var getDeviceComponentStatus_parameters = [];
                var getDeviceComponentStatus_nodeParam;
                var getDeviceComponentStatus_nodeParamType;

                getDeviceComponentStatus_nodeParam = node.getDeviceComponentStatus_authorization;
                getDeviceComponentStatus_nodeParamType = node.getDeviceComponentStatus_authorizationType;
                if (getDeviceComponentStatus_nodeParamType === 'str') {
                    getDeviceComponentStatus_parameters.authorization = getDeviceComponentStatus_nodeParam || '';
                } else {
                    getDeviceComponentStatus_parameters.authorization = RED.util.getMessageProperty(msg, getDeviceComponentStatus_nodeParam);
                }
                getDeviceComponentStatus_parameters.authorization = !!getDeviceComponentStatus_parameters.authorization ? getDeviceComponentStatus_parameters.authorization : msg.payload;
                
                getDeviceComponentStatus_nodeParam = node.getDeviceComponentStatus_deviceId;
                getDeviceComponentStatus_nodeParamType = node.getDeviceComponentStatus_deviceIdType;
                if (getDeviceComponentStatus_nodeParamType === 'str') {
                    getDeviceComponentStatus_parameters.deviceId = getDeviceComponentStatus_nodeParam || '';
                } else {
                    getDeviceComponentStatus_parameters.deviceId = RED.util.getMessageProperty(msg, getDeviceComponentStatus_nodeParam);
                }
                getDeviceComponentStatus_parameters.deviceId = !!getDeviceComponentStatus_parameters.deviceId ? getDeviceComponentStatus_parameters.deviceId : msg.payload;
                
                getDeviceComponentStatus_nodeParam = node.getDeviceComponentStatus_componentId;
                getDeviceComponentStatus_nodeParamType = node.getDeviceComponentStatus_componentIdType;
                if (getDeviceComponentStatus_nodeParamType === 'str') {
                    getDeviceComponentStatus_parameters.componentId = getDeviceComponentStatus_nodeParam || '';
                } else {
                    getDeviceComponentStatus_parameters.componentId = RED.util.getMessageProperty(msg, getDeviceComponentStatus_nodeParam);
                }
                getDeviceComponentStatus_parameters.componentId = !!getDeviceComponentStatus_parameters.componentId ? getDeviceComponentStatus_parameters.componentId : msg.payload;
                                result = client.getDeviceComponentStatus(getDeviceComponentStatus_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceStatusByCapability') {
                var getDeviceStatusByCapability_parameters = [];
                var getDeviceStatusByCapability_nodeParam;
                var getDeviceStatusByCapability_nodeParamType;

                getDeviceStatusByCapability_nodeParam = node.getDeviceStatusByCapability_authorization;
                getDeviceStatusByCapability_nodeParamType = node.getDeviceStatusByCapability_authorizationType;
                if (getDeviceStatusByCapability_nodeParamType === 'str') {
                    getDeviceStatusByCapability_parameters.authorization = getDeviceStatusByCapability_nodeParam || '';
                } else {
                    getDeviceStatusByCapability_parameters.authorization = RED.util.getMessageProperty(msg, getDeviceStatusByCapability_nodeParam);
                }
                getDeviceStatusByCapability_parameters.authorization = !!getDeviceStatusByCapability_parameters.authorization ? getDeviceStatusByCapability_parameters.authorization : msg.payload;
                
                getDeviceStatusByCapability_nodeParam = node.getDeviceStatusByCapability_deviceId;
                getDeviceStatusByCapability_nodeParamType = node.getDeviceStatusByCapability_deviceIdType;
                if (getDeviceStatusByCapability_nodeParamType === 'str') {
                    getDeviceStatusByCapability_parameters.deviceId = getDeviceStatusByCapability_nodeParam || '';
                } else {
                    getDeviceStatusByCapability_parameters.deviceId = RED.util.getMessageProperty(msg, getDeviceStatusByCapability_nodeParam);
                }
                getDeviceStatusByCapability_parameters.deviceId = !!getDeviceStatusByCapability_parameters.deviceId ? getDeviceStatusByCapability_parameters.deviceId : msg.payload;
                
                getDeviceStatusByCapability_nodeParam = node.getDeviceStatusByCapability_componentId;
                getDeviceStatusByCapability_nodeParamType = node.getDeviceStatusByCapability_componentIdType;
                if (getDeviceStatusByCapability_nodeParamType === 'str') {
                    getDeviceStatusByCapability_parameters.componentId = getDeviceStatusByCapability_nodeParam || '';
                } else {
                    getDeviceStatusByCapability_parameters.componentId = RED.util.getMessageProperty(msg, getDeviceStatusByCapability_nodeParam);
                }
                getDeviceStatusByCapability_parameters.componentId = !!getDeviceStatusByCapability_parameters.componentId ? getDeviceStatusByCapability_parameters.componentId : msg.payload;
                
                getDeviceStatusByCapability_nodeParam = node.getDeviceStatusByCapability_capabilityId;
                getDeviceStatusByCapability_nodeParamType = node.getDeviceStatusByCapability_capabilityIdType;
                if (getDeviceStatusByCapability_nodeParamType === 'str') {
                    getDeviceStatusByCapability_parameters.capabilityId = getDeviceStatusByCapability_nodeParam || '';
                } else {
                    getDeviceStatusByCapability_parameters.capabilityId = RED.util.getMessageProperty(msg, getDeviceStatusByCapability_nodeParam);
                }
                getDeviceStatusByCapability_parameters.capabilityId = !!getDeviceStatusByCapability_parameters.capabilityId ? getDeviceStatusByCapability_parameters.capabilityId : msg.payload;
                                result = client.getDeviceStatusByCapability(getDeviceStatusByCapability_parameters);
            }
            if (!errorFlag && node.method === 'createDeviceProfile') {
                var createDeviceProfile_parameters = [];
                var createDeviceProfile_nodeParam;
                var createDeviceProfile_nodeParamType;

                createDeviceProfile_nodeParam = node.createDeviceProfile_authorization;
                createDeviceProfile_nodeParamType = node.createDeviceProfile_authorizationType;
                if (createDeviceProfile_nodeParamType === 'str') {
                    createDeviceProfile_parameters.authorization = createDeviceProfile_nodeParam || '';
                } else {
                    createDeviceProfile_parameters.authorization = RED.util.getMessageProperty(msg, createDeviceProfile_nodeParam);
                }
                createDeviceProfile_parameters.authorization = !!createDeviceProfile_parameters.authorization ? createDeviceProfile_parameters.authorization : msg.payload;
                
                createDeviceProfile_nodeParam = node.createDeviceProfile_request;
                createDeviceProfile_nodeParamType = node.createDeviceProfile_requestType;
                if (createDeviceProfile_nodeParamType === 'str') {
                    createDeviceProfile_parameters.request = createDeviceProfile_nodeParam || '';
                } else {
                    createDeviceProfile_parameters.request = RED.util.getMessageProperty(msg, createDeviceProfile_nodeParam);
                }
                createDeviceProfile_parameters.request = !!createDeviceProfile_parameters.request ? createDeviceProfile_parameters.request : msg.payload;
                                result = client.createDeviceProfile(createDeviceProfile_parameters);
            }
            if (!errorFlag && node.method === 'listDeviceProfiles') {
                var listDeviceProfiles_parameters = [];
                var listDeviceProfiles_nodeParam;
                var listDeviceProfiles_nodeParamType;

                listDeviceProfiles_nodeParam = node.listDeviceProfiles_authorization;
                listDeviceProfiles_nodeParamType = node.listDeviceProfiles_authorizationType;
                if (listDeviceProfiles_nodeParamType === 'str') {
                    listDeviceProfiles_parameters.authorization = listDeviceProfiles_nodeParam || '';
                } else {
                    listDeviceProfiles_parameters.authorization = RED.util.getMessageProperty(msg, listDeviceProfiles_nodeParam);
                }
                listDeviceProfiles_parameters.authorization = !!listDeviceProfiles_parameters.authorization ? listDeviceProfiles_parameters.authorization : msg.payload;
                                result = client.listDeviceProfiles(listDeviceProfiles_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceProfile') {
                var getDeviceProfile_parameters = [];
                var getDeviceProfile_nodeParam;
                var getDeviceProfile_nodeParamType;

                getDeviceProfile_nodeParam = node.getDeviceProfile_authorization;
                getDeviceProfile_nodeParamType = node.getDeviceProfile_authorizationType;
                if (getDeviceProfile_nodeParamType === 'str') {
                    getDeviceProfile_parameters.authorization = getDeviceProfile_nodeParam || '';
                } else {
                    getDeviceProfile_parameters.authorization = RED.util.getMessageProperty(msg, getDeviceProfile_nodeParam);
                }
                getDeviceProfile_parameters.authorization = !!getDeviceProfile_parameters.authorization ? getDeviceProfile_parameters.authorization : msg.payload;
                
                getDeviceProfile_nodeParam = node.getDeviceProfile_deviceProfileId;
                getDeviceProfile_nodeParamType = node.getDeviceProfile_deviceProfileIdType;
                if (getDeviceProfile_nodeParamType === 'str') {
                    getDeviceProfile_parameters.deviceProfileId = getDeviceProfile_nodeParam || '';
                } else {
                    getDeviceProfile_parameters.deviceProfileId = RED.util.getMessageProperty(msg, getDeviceProfile_nodeParam);
                }
                getDeviceProfile_parameters.deviceProfileId = !!getDeviceProfile_parameters.deviceProfileId ? getDeviceProfile_parameters.deviceProfileId : msg.payload;
                                result = client.getDeviceProfile(getDeviceProfile_parameters);
            }
            if (!errorFlag && node.method === 'deleteDeviceProfile') {
                var deleteDeviceProfile_parameters = [];
                var deleteDeviceProfile_nodeParam;
                var deleteDeviceProfile_nodeParamType;

                deleteDeviceProfile_nodeParam = node.deleteDeviceProfile_authorization;
                deleteDeviceProfile_nodeParamType = node.deleteDeviceProfile_authorizationType;
                if (deleteDeviceProfile_nodeParamType === 'str') {
                    deleteDeviceProfile_parameters.authorization = deleteDeviceProfile_nodeParam || '';
                } else {
                    deleteDeviceProfile_parameters.authorization = RED.util.getMessageProperty(msg, deleteDeviceProfile_nodeParam);
                }
                deleteDeviceProfile_parameters.authorization = !!deleteDeviceProfile_parameters.authorization ? deleteDeviceProfile_parameters.authorization : msg.payload;
                
                deleteDeviceProfile_nodeParam = node.deleteDeviceProfile_deviceProfileId;
                deleteDeviceProfile_nodeParamType = node.deleteDeviceProfile_deviceProfileIdType;
                if (deleteDeviceProfile_nodeParamType === 'str') {
                    deleteDeviceProfile_parameters.deviceProfileId = deleteDeviceProfile_nodeParam || '';
                } else {
                    deleteDeviceProfile_parameters.deviceProfileId = RED.util.getMessageProperty(msg, deleteDeviceProfile_nodeParam);
                }
                deleteDeviceProfile_parameters.deviceProfileId = !!deleteDeviceProfile_parameters.deviceProfileId ? deleteDeviceProfile_parameters.deviceProfileId : msg.payload;
                                result = client.deleteDeviceProfile(deleteDeviceProfile_parameters);
            }
            if (!errorFlag && node.method === 'listLocations') {
                var listLocations_parameters = [];
                var listLocations_nodeParam;
                var listLocations_nodeParamType;

                listLocations_nodeParam = node.listLocations_authorization;
                listLocations_nodeParamType = node.listLocations_authorizationType;
                if (listLocations_nodeParamType === 'str') {
                    listLocations_parameters.authorization = listLocations_nodeParam || '';
                } else {
                    listLocations_parameters.authorization = RED.util.getMessageProperty(msg, listLocations_nodeParam);
                }
                listLocations_parameters.authorization = !!listLocations_parameters.authorization ? listLocations_parameters.authorization : msg.payload;
                                result = client.listLocations(listLocations_parameters);
            }
            if (!errorFlag && node.method === 'createLocation') {
                var createLocation_parameters = [];
                var createLocation_nodeParam;
                var createLocation_nodeParamType;

                createLocation_nodeParam = node.createLocation_createLocationRequest;
                createLocation_nodeParamType = node.createLocation_createLocationRequestType;
                if (createLocation_nodeParamType === 'str') {
                    createLocation_parameters.createLocationRequest = createLocation_nodeParam || '';
                } else {
                    createLocation_parameters.createLocationRequest = RED.util.getMessageProperty(msg, createLocation_nodeParam);
                }
                createLocation_parameters.createLocationRequest = !!createLocation_parameters.createLocationRequest ? createLocation_parameters.createLocationRequest : msg.payload;
                
                createLocation_nodeParam = node.createLocation_authorization;
                createLocation_nodeParamType = node.createLocation_authorizationType;
                if (createLocation_nodeParamType === 'str') {
                    createLocation_parameters.authorization = createLocation_nodeParam || '';
                } else {
                    createLocation_parameters.authorization = RED.util.getMessageProperty(msg, createLocation_nodeParam);
                }
                createLocation_parameters.authorization = !!createLocation_parameters.authorization ? createLocation_parameters.authorization : msg.payload;
                                result = client.createLocation(createLocation_parameters);
            }
            if (!errorFlag && node.method === 'getLocation') {
                var getLocation_parameters = [];
                var getLocation_nodeParam;
                var getLocation_nodeParamType;

                getLocation_nodeParam = node.getLocation_authorization;
                getLocation_nodeParamType = node.getLocation_authorizationType;
                if (getLocation_nodeParamType === 'str') {
                    getLocation_parameters.authorization = getLocation_nodeParam || '';
                } else {
                    getLocation_parameters.authorization = RED.util.getMessageProperty(msg, getLocation_nodeParam);
                }
                getLocation_parameters.authorization = !!getLocation_parameters.authorization ? getLocation_parameters.authorization : msg.payload;
                
                getLocation_nodeParam = node.getLocation_locationId;
                getLocation_nodeParamType = node.getLocation_locationIdType;
                if (getLocation_nodeParamType === 'str') {
                    getLocation_parameters.locationId = getLocation_nodeParam || '';
                } else {
                    getLocation_parameters.locationId = RED.util.getMessageProperty(msg, getLocation_nodeParam);
                }
                getLocation_parameters.locationId = !!getLocation_parameters.locationId ? getLocation_parameters.locationId : msg.payload;
                                result = client.getLocation(getLocation_parameters);
            }
            if (!errorFlag && node.method === 'updateLocation') {
                var updateLocation_parameters = [];
                var updateLocation_nodeParam;
                var updateLocation_nodeParamType;

                updateLocation_nodeParam = node.updateLocation_updateLocationRequest;
                updateLocation_nodeParamType = node.updateLocation_updateLocationRequestType;
                if (updateLocation_nodeParamType === 'str') {
                    updateLocation_parameters.updateLocationRequest = updateLocation_nodeParam || '';
                } else {
                    updateLocation_parameters.updateLocationRequest = RED.util.getMessageProperty(msg, updateLocation_nodeParam);
                }
                updateLocation_parameters.updateLocationRequest = !!updateLocation_parameters.updateLocationRequest ? updateLocation_parameters.updateLocationRequest : msg.payload;
                
                updateLocation_nodeParam = node.updateLocation_authorization;
                updateLocation_nodeParamType = node.updateLocation_authorizationType;
                if (updateLocation_nodeParamType === 'str') {
                    updateLocation_parameters.authorization = updateLocation_nodeParam || '';
                } else {
                    updateLocation_parameters.authorization = RED.util.getMessageProperty(msg, updateLocation_nodeParam);
                }
                updateLocation_parameters.authorization = !!updateLocation_parameters.authorization ? updateLocation_parameters.authorization : msg.payload;
                
                updateLocation_nodeParam = node.updateLocation_locationId;
                updateLocation_nodeParamType = node.updateLocation_locationIdType;
                if (updateLocation_nodeParamType === 'str') {
                    updateLocation_parameters.locationId = updateLocation_nodeParam || '';
                } else {
                    updateLocation_parameters.locationId = RED.util.getMessageProperty(msg, updateLocation_nodeParam);
                }
                updateLocation_parameters.locationId = !!updateLocation_parameters.locationId ? updateLocation_parameters.locationId : msg.payload;
                                result = client.updateLocation(updateLocation_parameters);
            }
            if (!errorFlag && node.method === 'deleteLocation') {
                var deleteLocation_parameters = [];
                var deleteLocation_nodeParam;
                var deleteLocation_nodeParamType;

                deleteLocation_nodeParam = node.deleteLocation_authorization;
                deleteLocation_nodeParamType = node.deleteLocation_authorizationType;
                if (deleteLocation_nodeParamType === 'str') {
                    deleteLocation_parameters.authorization = deleteLocation_nodeParam || '';
                } else {
                    deleteLocation_parameters.authorization = RED.util.getMessageProperty(msg, deleteLocation_nodeParam);
                }
                deleteLocation_parameters.authorization = !!deleteLocation_parameters.authorization ? deleteLocation_parameters.authorization : msg.payload;
                
                deleteLocation_nodeParam = node.deleteLocation_locationId;
                deleteLocation_nodeParamType = node.deleteLocation_locationIdType;
                if (deleteLocation_nodeParamType === 'str') {
                    deleteLocation_parameters.locationId = deleteLocation_nodeParam || '';
                } else {
                    deleteLocation_parameters.locationId = RED.util.getMessageProperty(msg, deleteLocation_nodeParam);
                }
                deleteLocation_parameters.locationId = !!deleteLocation_parameters.locationId ? deleteLocation_parameters.locationId : msg.payload;
                                result = client.deleteLocation(deleteLocation_parameters);
            }
            if (!errorFlag && node.method === 'listInstallations') {
                var listInstallations_parameters = [];
                var listInstallations_nodeParam;
                var listInstallations_nodeParamType;

                listInstallations_nodeParam = node.listInstallations_authorization;
                listInstallations_nodeParamType = node.listInstallations_authorizationType;
                if (listInstallations_nodeParamType === 'str') {
                    listInstallations_parameters.authorization = listInstallations_nodeParam || '';
                } else {
                    listInstallations_parameters.authorization = RED.util.getMessageProperty(msg, listInstallations_nodeParam);
                }
                listInstallations_parameters.authorization = !!listInstallations_parameters.authorization ? listInstallations_parameters.authorization : msg.payload;
                
                listInstallations_nodeParam = node.listInstallations_locationId;
                listInstallations_nodeParamType = node.listInstallations_locationIdType;
                if (listInstallations_nodeParamType === 'str') {
                    listInstallations_parameters.locationId = listInstallations_nodeParam || '';
                } else {
                    listInstallations_parameters.locationId = RED.util.getMessageProperty(msg, listInstallations_nodeParam);
                }
                listInstallations_parameters.locationId = !!listInstallations_parameters.locationId ? listInstallations_parameters.locationId : msg.payload;
                
                listInstallations_nodeParam = node.listInstallations_installedAppStatus;
                listInstallations_nodeParamType = node.listInstallations_installedAppStatusType;
                if (listInstallations_nodeParamType === 'str') {
                    listInstallations_parameters.installedAppStatus = listInstallations_nodeParam || '';
                } else {
                    listInstallations_parameters.installedAppStatus = RED.util.getMessageProperty(msg, listInstallations_nodeParam);
                }
                listInstallations_parameters.installedAppStatus = !!listInstallations_parameters.installedAppStatus ? listInstallations_parameters.installedAppStatus : msg.payload;
                                result = client.listInstallations(listInstallations_parameters);
            }
            if (!errorFlag && node.method === 'getInstallation') {
                var getInstallation_parameters = [];
                var getInstallation_nodeParam;
                var getInstallation_nodeParamType;

                getInstallation_nodeParam = node.getInstallation_authorization;
                getInstallation_nodeParamType = node.getInstallation_authorizationType;
                if (getInstallation_nodeParamType === 'str') {
                    getInstallation_parameters.authorization = getInstallation_nodeParam || '';
                } else {
                    getInstallation_parameters.authorization = RED.util.getMessageProperty(msg, getInstallation_nodeParam);
                }
                getInstallation_parameters.authorization = !!getInstallation_parameters.authorization ? getInstallation_parameters.authorization : msg.payload;
                
                getInstallation_nodeParam = node.getInstallation_installedAppId;
                getInstallation_nodeParamType = node.getInstallation_installedAppIdType;
                if (getInstallation_nodeParamType === 'str') {
                    getInstallation_parameters.installedAppId = getInstallation_nodeParam || '';
                } else {
                    getInstallation_parameters.installedAppId = RED.util.getMessageProperty(msg, getInstallation_nodeParam);
                }
                getInstallation_parameters.installedAppId = !!getInstallation_parameters.installedAppId ? getInstallation_parameters.installedAppId : msg.payload;
                                result = client.getInstallation(getInstallation_parameters);
            }
            if (!errorFlag && node.method === 'deleteInstallation') {
                var deleteInstallation_parameters = [];
                var deleteInstallation_nodeParam;
                var deleteInstallation_nodeParamType;

                deleteInstallation_nodeParam = node.deleteInstallation_authorization;
                deleteInstallation_nodeParamType = node.deleteInstallation_authorizationType;
                if (deleteInstallation_nodeParamType === 'str') {
                    deleteInstallation_parameters.authorization = deleteInstallation_nodeParam || '';
                } else {
                    deleteInstallation_parameters.authorization = RED.util.getMessageProperty(msg, deleteInstallation_nodeParam);
                }
                deleteInstallation_parameters.authorization = !!deleteInstallation_parameters.authorization ? deleteInstallation_parameters.authorization : msg.payload;
                
                deleteInstallation_nodeParam = node.deleteInstallation_installedAppId;
                deleteInstallation_nodeParamType = node.deleteInstallation_installedAppIdType;
                if (deleteInstallation_nodeParamType === 'str') {
                    deleteInstallation_parameters.installedAppId = deleteInstallation_nodeParam || '';
                } else {
                    deleteInstallation_parameters.installedAppId = RED.util.getMessageProperty(msg, deleteInstallation_nodeParam);
                }
                deleteInstallation_parameters.installedAppId = !!deleteInstallation_parameters.installedAppId ? deleteInstallation_parameters.installedAppId : msg.payload;
                
                deleteInstallation_nodeParam = node.deleteInstallation_locationId;
                deleteInstallation_nodeParamType = node.deleteInstallation_locationIdType;
                if (deleteInstallation_nodeParamType === 'str') {
                    deleteInstallation_parameters.locationId = deleteInstallation_nodeParam || '';
                } else {
                    deleteInstallation_parameters.locationId = RED.util.getMessageProperty(msg, deleteInstallation_nodeParam);
                }
                deleteInstallation_parameters.locationId = !!deleteInstallation_parameters.locationId ? deleteInstallation_parameters.locationId : msg.payload;
                                result = client.deleteInstallation(deleteInstallation_parameters);
            }
            if (!errorFlag && node.method === 'listInstallationConfig') {
                var listInstallationConfig_parameters = [];
                var listInstallationConfig_nodeParam;
                var listInstallationConfig_nodeParamType;

                listInstallationConfig_nodeParam = node.listInstallationConfig_authorization;
                listInstallationConfig_nodeParamType = node.listInstallationConfig_authorizationType;
                if (listInstallationConfig_nodeParamType === 'str') {
                    listInstallationConfig_parameters.authorization = listInstallationConfig_nodeParam || '';
                } else {
                    listInstallationConfig_parameters.authorization = RED.util.getMessageProperty(msg, listInstallationConfig_nodeParam);
                }
                listInstallationConfig_parameters.authorization = !!listInstallationConfig_parameters.authorization ? listInstallationConfig_parameters.authorization : msg.payload;
                
                listInstallationConfig_nodeParam = node.listInstallationConfig_installedAppId;
                listInstallationConfig_nodeParamType = node.listInstallationConfig_installedAppIdType;
                if (listInstallationConfig_nodeParamType === 'str') {
                    listInstallationConfig_parameters.installedAppId = listInstallationConfig_nodeParam || '';
                } else {
                    listInstallationConfig_parameters.installedAppId = RED.util.getMessageProperty(msg, listInstallationConfig_nodeParam);
                }
                listInstallationConfig_parameters.installedAppId = !!listInstallationConfig_parameters.installedAppId ? listInstallationConfig_parameters.installedAppId : msg.payload;
                
                listInstallationConfig_nodeParam = node.listInstallationConfig_configurationStatus;
                listInstallationConfig_nodeParamType = node.listInstallationConfig_configurationStatusType;
                if (listInstallationConfig_nodeParamType === 'str') {
                    listInstallationConfig_parameters.configurationStatus = listInstallationConfig_nodeParam || '';
                } else {
                    listInstallationConfig_parameters.configurationStatus = RED.util.getMessageProperty(msg, listInstallationConfig_nodeParam);
                }
                listInstallationConfig_parameters.configurationStatus = !!listInstallationConfig_parameters.configurationStatus ? listInstallationConfig_parameters.configurationStatus : msg.payload;
                                result = client.listInstallationConfig(listInstallationConfig_parameters);
            }
            if (!errorFlag && node.method === 'getInstallationConfig') {
                var getInstallationConfig_parameters = [];
                var getInstallationConfig_nodeParam;
                var getInstallationConfig_nodeParamType;

                getInstallationConfig_nodeParam = node.getInstallationConfig_authorization;
                getInstallationConfig_nodeParamType = node.getInstallationConfig_authorizationType;
                if (getInstallationConfig_nodeParamType === 'str') {
                    getInstallationConfig_parameters.authorization = getInstallationConfig_nodeParam || '';
                } else {
                    getInstallationConfig_parameters.authorization = RED.util.getMessageProperty(msg, getInstallationConfig_nodeParam);
                }
                getInstallationConfig_parameters.authorization = !!getInstallationConfig_parameters.authorization ? getInstallationConfig_parameters.authorization : msg.payload;
                
                getInstallationConfig_nodeParam = node.getInstallationConfig_installedAppId;
                getInstallationConfig_nodeParamType = node.getInstallationConfig_installedAppIdType;
                if (getInstallationConfig_nodeParamType === 'str') {
                    getInstallationConfig_parameters.installedAppId = getInstallationConfig_nodeParam || '';
                } else {
                    getInstallationConfig_parameters.installedAppId = RED.util.getMessageProperty(msg, getInstallationConfig_nodeParam);
                }
                getInstallationConfig_parameters.installedAppId = !!getInstallationConfig_parameters.installedAppId ? getInstallationConfig_parameters.installedAppId : msg.payload;
                
                getInstallationConfig_nodeParam = node.getInstallationConfig_configurationId;
                getInstallationConfig_nodeParamType = node.getInstallationConfig_configurationIdType;
                if (getInstallationConfig_nodeParamType === 'str') {
                    getInstallationConfig_parameters.configurationId = getInstallationConfig_nodeParam || '';
                } else {
                    getInstallationConfig_parameters.configurationId = RED.util.getMessageProperty(msg, getInstallationConfig_nodeParam);
                }
                getInstallationConfig_parameters.configurationId = !!getInstallationConfig_parameters.configurationId ? getInstallationConfig_parameters.configurationId : msg.payload;
                                result = client.getInstallationConfig(getInstallationConfig_parameters);
            }
            if (!errorFlag && node.method === 'listSubscriptions') {
                var listSubscriptions_parameters = [];
                var listSubscriptions_nodeParam;
                var listSubscriptions_nodeParamType;

                listSubscriptions_nodeParam = node.listSubscriptions_installedAppId;
                listSubscriptions_nodeParamType = node.listSubscriptions_installedAppIdType;
                if (listSubscriptions_nodeParamType === 'str') {
                    listSubscriptions_parameters.installedAppId = listSubscriptions_nodeParam || '';
                } else {
                    listSubscriptions_parameters.installedAppId = RED.util.getMessageProperty(msg, listSubscriptions_nodeParam);
                }
                listSubscriptions_parameters.installedAppId = !!listSubscriptions_parameters.installedAppId ? listSubscriptions_parameters.installedAppId : msg.payload;
                
                listSubscriptions_nodeParam = node.listSubscriptions_authorization;
                listSubscriptions_nodeParamType = node.listSubscriptions_authorizationType;
                if (listSubscriptions_nodeParamType === 'str') {
                    listSubscriptions_parameters.authorization = listSubscriptions_nodeParam || '';
                } else {
                    listSubscriptions_parameters.authorization = RED.util.getMessageProperty(msg, listSubscriptions_nodeParam);
                }
                listSubscriptions_parameters.authorization = !!listSubscriptions_parameters.authorization ? listSubscriptions_parameters.authorization : msg.payload;
                                result = client.listSubscriptions(listSubscriptions_parameters);
            }
            if (!errorFlag && node.method === 'saveSubscription') {
                var saveSubscription_parameters = [];
                var saveSubscription_nodeParam;
                var saveSubscription_nodeParamType;

                saveSubscription_nodeParam = node.saveSubscription_request;
                saveSubscription_nodeParamType = node.saveSubscription_requestType;
                if (saveSubscription_nodeParamType === 'str') {
                    saveSubscription_parameters.request = saveSubscription_nodeParam || '';
                } else {
                    saveSubscription_parameters.request = RED.util.getMessageProperty(msg, saveSubscription_nodeParam);
                }
                saveSubscription_parameters.request = !!saveSubscription_parameters.request ? saveSubscription_parameters.request : msg.payload;
                
                saveSubscription_nodeParam = node.saveSubscription_installedAppId;
                saveSubscription_nodeParamType = node.saveSubscription_installedAppIdType;
                if (saveSubscription_nodeParamType === 'str') {
                    saveSubscription_parameters.installedAppId = saveSubscription_nodeParam || '';
                } else {
                    saveSubscription_parameters.installedAppId = RED.util.getMessageProperty(msg, saveSubscription_nodeParam);
                }
                saveSubscription_parameters.installedAppId = !!saveSubscription_parameters.installedAppId ? saveSubscription_parameters.installedAppId : msg.payload;
                
                saveSubscription_nodeParam = node.saveSubscription_authorization;
                saveSubscription_nodeParamType = node.saveSubscription_authorizationType;
                if (saveSubscription_nodeParamType === 'str') {
                    saveSubscription_parameters.authorization = saveSubscription_nodeParam || '';
                } else {
                    saveSubscription_parameters.authorization = RED.util.getMessageProperty(msg, saveSubscription_nodeParam);
                }
                saveSubscription_parameters.authorization = !!saveSubscription_parameters.authorization ? saveSubscription_parameters.authorization : msg.payload;
                                result = client.saveSubscription(saveSubscription_parameters);
            }
            if (!errorFlag && node.method === 'deleteAllSubscriptions') {
                var deleteAllSubscriptions_parameters = [];
                var deleteAllSubscriptions_nodeParam;
                var deleteAllSubscriptions_nodeParamType;

                deleteAllSubscriptions_nodeParam = node.deleteAllSubscriptions_deviceId;
                deleteAllSubscriptions_nodeParamType = node.deleteAllSubscriptions_deviceIdType;
                if (deleteAllSubscriptions_nodeParamType === 'str') {
                    deleteAllSubscriptions_parameters.deviceId = deleteAllSubscriptions_nodeParam || '';
                } else {
                    deleteAllSubscriptions_parameters.deviceId = RED.util.getMessageProperty(msg, deleteAllSubscriptions_nodeParam);
                }
                deleteAllSubscriptions_parameters.deviceId = !!deleteAllSubscriptions_parameters.deviceId ? deleteAllSubscriptions_parameters.deviceId : msg.payload;
                
                deleteAllSubscriptions_nodeParam = node.deleteAllSubscriptions_installedAppId;
                deleteAllSubscriptions_nodeParamType = node.deleteAllSubscriptions_installedAppIdType;
                if (deleteAllSubscriptions_nodeParamType === 'str') {
                    deleteAllSubscriptions_parameters.installedAppId = deleteAllSubscriptions_nodeParam || '';
                } else {
                    deleteAllSubscriptions_parameters.installedAppId = RED.util.getMessageProperty(msg, deleteAllSubscriptions_nodeParam);
                }
                deleteAllSubscriptions_parameters.installedAppId = !!deleteAllSubscriptions_parameters.installedAppId ? deleteAllSubscriptions_parameters.installedAppId : msg.payload;
                
                deleteAllSubscriptions_nodeParam = node.deleteAllSubscriptions_authorization;
                deleteAllSubscriptions_nodeParamType = node.deleteAllSubscriptions_authorizationType;
                if (deleteAllSubscriptions_nodeParamType === 'str') {
                    deleteAllSubscriptions_parameters.authorization = deleteAllSubscriptions_nodeParam || '';
                } else {
                    deleteAllSubscriptions_parameters.authorization = RED.util.getMessageProperty(msg, deleteAllSubscriptions_nodeParam);
                }
                deleteAllSubscriptions_parameters.authorization = !!deleteAllSubscriptions_parameters.authorization ? deleteAllSubscriptions_parameters.authorization : msg.payload;
                                result = client.deleteAllSubscriptions(deleteAllSubscriptions_parameters);
            }
            if (!errorFlag && node.method === 'getSubscription') {
                var getSubscription_parameters = [];
                var getSubscription_nodeParam;
                var getSubscription_nodeParamType;

                getSubscription_nodeParam = node.getSubscription_installedAppId;
                getSubscription_nodeParamType = node.getSubscription_installedAppIdType;
                if (getSubscription_nodeParamType === 'str') {
                    getSubscription_parameters.installedAppId = getSubscription_nodeParam || '';
                } else {
                    getSubscription_parameters.installedAppId = RED.util.getMessageProperty(msg, getSubscription_nodeParam);
                }
                getSubscription_parameters.installedAppId = !!getSubscription_parameters.installedAppId ? getSubscription_parameters.installedAppId : msg.payload;
                
                getSubscription_nodeParam = node.getSubscription_subscriptionId;
                getSubscription_nodeParamType = node.getSubscription_subscriptionIdType;
                if (getSubscription_nodeParamType === 'str') {
                    getSubscription_parameters.subscriptionId = getSubscription_nodeParam || '';
                } else {
                    getSubscription_parameters.subscriptionId = RED.util.getMessageProperty(msg, getSubscription_nodeParam);
                }
                getSubscription_parameters.subscriptionId = !!getSubscription_parameters.subscriptionId ? getSubscription_parameters.subscriptionId : msg.payload;
                
                getSubscription_nodeParam = node.getSubscription_authorization;
                getSubscription_nodeParamType = node.getSubscription_authorizationType;
                if (getSubscription_nodeParamType === 'str') {
                    getSubscription_parameters.authorization = getSubscription_nodeParam || '';
                } else {
                    getSubscription_parameters.authorization = RED.util.getMessageProperty(msg, getSubscription_nodeParam);
                }
                getSubscription_parameters.authorization = !!getSubscription_parameters.authorization ? getSubscription_parameters.authorization : msg.payload;
                                result = client.getSubscription(getSubscription_parameters);
            }
            if (!errorFlag && node.method === 'deleteSubscription') {
                var deleteSubscription_parameters = [];
                var deleteSubscription_nodeParam;
                var deleteSubscription_nodeParamType;

                deleteSubscription_nodeParam = node.deleteSubscription_installedAppId;
                deleteSubscription_nodeParamType = node.deleteSubscription_installedAppIdType;
                if (deleteSubscription_nodeParamType === 'str') {
                    deleteSubscription_parameters.installedAppId = deleteSubscription_nodeParam || '';
                } else {
                    deleteSubscription_parameters.installedAppId = RED.util.getMessageProperty(msg, deleteSubscription_nodeParam);
                }
                deleteSubscription_parameters.installedAppId = !!deleteSubscription_parameters.installedAppId ? deleteSubscription_parameters.installedAppId : msg.payload;
                
                deleteSubscription_nodeParam = node.deleteSubscription_subscriptionId;
                deleteSubscription_nodeParamType = node.deleteSubscription_subscriptionIdType;
                if (deleteSubscription_nodeParamType === 'str') {
                    deleteSubscription_parameters.subscriptionId = deleteSubscription_nodeParam || '';
                } else {
                    deleteSubscription_parameters.subscriptionId = RED.util.getMessageProperty(msg, deleteSubscription_nodeParam);
                }
                deleteSubscription_parameters.subscriptionId = !!deleteSubscription_parameters.subscriptionId ? deleteSubscription_parameters.subscriptionId : msg.payload;
                
                deleteSubscription_nodeParam = node.deleteSubscription_authorization;
                deleteSubscription_nodeParamType = node.deleteSubscription_authorizationType;
                if (deleteSubscription_nodeParamType === 'str') {
                    deleteSubscription_parameters.authorization = deleteSubscription_nodeParam || '';
                } else {
                    deleteSubscription_parameters.authorization = RED.util.getMessageProperty(msg, deleteSubscription_nodeParam);
                }
                deleteSubscription_parameters.authorization = !!deleteSubscription_parameters.authorization ? deleteSubscription_parameters.authorization : msg.payload;
                                result = client.deleteSubscription(deleteSubscription_parameters);
            }
            if (!errorFlag && node.method === 'getSchedules') {
                var getSchedules_parameters = [];
                var getSchedules_nodeParam;
                var getSchedules_nodeParamType;

                getSchedules_nodeParam = node.getSchedules_installedAppId;
                getSchedules_nodeParamType = node.getSchedules_installedAppIdType;
                if (getSchedules_nodeParamType === 'str') {
                    getSchedules_parameters.installedAppId = getSchedules_nodeParam || '';
                } else {
                    getSchedules_parameters.installedAppId = RED.util.getMessageProperty(msg, getSchedules_nodeParam);
                }
                getSchedules_parameters.installedAppId = !!getSchedules_parameters.installedAppId ? getSchedules_parameters.installedAppId : msg.payload;
                
                getSchedules_nodeParam = node.getSchedules_authorization;
                getSchedules_nodeParamType = node.getSchedules_authorizationType;
                if (getSchedules_nodeParamType === 'str') {
                    getSchedules_parameters.authorization = getSchedules_nodeParam || '';
                } else {
                    getSchedules_parameters.authorization = RED.util.getMessageProperty(msg, getSchedules_nodeParam);
                }
                getSchedules_parameters.authorization = !!getSchedules_parameters.authorization ? getSchedules_parameters.authorization : msg.payload;
                                result = client.getSchedules(getSchedules_parameters);
            }
            if (!errorFlag && node.method === 'createSchedule') {
                var createSchedule_parameters = [];
                var createSchedule_nodeParam;
                var createSchedule_nodeParamType;

                createSchedule_nodeParam = node.createSchedule_request;
                createSchedule_nodeParamType = node.createSchedule_requestType;
                if (createSchedule_nodeParamType === 'str') {
                    createSchedule_parameters.request = createSchedule_nodeParam || '';
                } else {
                    createSchedule_parameters.request = RED.util.getMessageProperty(msg, createSchedule_nodeParam);
                }
                createSchedule_parameters.request = !!createSchedule_parameters.request ? createSchedule_parameters.request : msg.payload;
                
                createSchedule_nodeParam = node.createSchedule_installedAppId;
                createSchedule_nodeParamType = node.createSchedule_installedAppIdType;
                if (createSchedule_nodeParamType === 'str') {
                    createSchedule_parameters.installedAppId = createSchedule_nodeParam || '';
                } else {
                    createSchedule_parameters.installedAppId = RED.util.getMessageProperty(msg, createSchedule_nodeParam);
                }
                createSchedule_parameters.installedAppId = !!createSchedule_parameters.installedAppId ? createSchedule_parameters.installedAppId : msg.payload;
                
                createSchedule_nodeParam = node.createSchedule_authorization;
                createSchedule_nodeParamType = node.createSchedule_authorizationType;
                if (createSchedule_nodeParamType === 'str') {
                    createSchedule_parameters.authorization = createSchedule_nodeParam || '';
                } else {
                    createSchedule_parameters.authorization = RED.util.getMessageProperty(msg, createSchedule_nodeParam);
                }
                createSchedule_parameters.authorization = !!createSchedule_parameters.authorization ? createSchedule_parameters.authorization : msg.payload;
                                result = client.createSchedule(createSchedule_parameters);
            }
            if (!errorFlag && node.method === 'deleteSchedules') {
                var deleteSchedules_parameters = [];
                var deleteSchedules_nodeParam;
                var deleteSchedules_nodeParamType;

                deleteSchedules_nodeParam = node.deleteSchedules_installedAppId;
                deleteSchedules_nodeParamType = node.deleteSchedules_installedAppIdType;
                if (deleteSchedules_nodeParamType === 'str') {
                    deleteSchedules_parameters.installedAppId = deleteSchedules_nodeParam || '';
                } else {
                    deleteSchedules_parameters.installedAppId = RED.util.getMessageProperty(msg, deleteSchedules_nodeParam);
                }
                deleteSchedules_parameters.installedAppId = !!deleteSchedules_parameters.installedAppId ? deleteSchedules_parameters.installedAppId : msg.payload;
                
                deleteSchedules_nodeParam = node.deleteSchedules_authorization;
                deleteSchedules_nodeParamType = node.deleteSchedules_authorizationType;
                if (deleteSchedules_nodeParamType === 'str') {
                    deleteSchedules_parameters.authorization = deleteSchedules_nodeParam || '';
                } else {
                    deleteSchedules_parameters.authorization = RED.util.getMessageProperty(msg, deleteSchedules_nodeParam);
                }
                deleteSchedules_parameters.authorization = !!deleteSchedules_parameters.authorization ? deleteSchedules_parameters.authorization : msg.payload;
                                result = client.deleteSchedules(deleteSchedules_parameters);
            }
            if (!errorFlag && node.method === 'getSchedule') {
                var getSchedule_parameters = [];
                var getSchedule_nodeParam;
                var getSchedule_nodeParamType;

                getSchedule_nodeParam = node.getSchedule_installedAppId;
                getSchedule_nodeParamType = node.getSchedule_installedAppIdType;
                if (getSchedule_nodeParamType === 'str') {
                    getSchedule_parameters.installedAppId = getSchedule_nodeParam || '';
                } else {
                    getSchedule_parameters.installedAppId = RED.util.getMessageProperty(msg, getSchedule_nodeParam);
                }
                getSchedule_parameters.installedAppId = !!getSchedule_parameters.installedAppId ? getSchedule_parameters.installedAppId : msg.payload;
                
                getSchedule_nodeParam = node.getSchedule_scheduleName;
                getSchedule_nodeParamType = node.getSchedule_scheduleNameType;
                if (getSchedule_nodeParamType === 'str') {
                    getSchedule_parameters.scheduleName = getSchedule_nodeParam || '';
                } else {
                    getSchedule_parameters.scheduleName = RED.util.getMessageProperty(msg, getSchedule_nodeParam);
                }
                getSchedule_parameters.scheduleName = !!getSchedule_parameters.scheduleName ? getSchedule_parameters.scheduleName : msg.payload;
                
                getSchedule_nodeParam = node.getSchedule_authorization;
                getSchedule_nodeParamType = node.getSchedule_authorizationType;
                if (getSchedule_nodeParamType === 'str') {
                    getSchedule_parameters.authorization = getSchedule_nodeParam || '';
                } else {
                    getSchedule_parameters.authorization = RED.util.getMessageProperty(msg, getSchedule_nodeParam);
                }
                getSchedule_parameters.authorization = !!getSchedule_parameters.authorization ? getSchedule_parameters.authorization : msg.payload;
                                result = client.getSchedule(getSchedule_parameters);
            }
            if (!errorFlag && node.method === 'deleteSchedule') {
                var deleteSchedule_parameters = [];
                var deleteSchedule_nodeParam;
                var deleteSchedule_nodeParamType;

                deleteSchedule_nodeParam = node.deleteSchedule_installedAppId;
                deleteSchedule_nodeParamType = node.deleteSchedule_installedAppIdType;
                if (deleteSchedule_nodeParamType === 'str') {
                    deleteSchedule_parameters.installedAppId = deleteSchedule_nodeParam || '';
                } else {
                    deleteSchedule_parameters.installedAppId = RED.util.getMessageProperty(msg, deleteSchedule_nodeParam);
                }
                deleteSchedule_parameters.installedAppId = !!deleteSchedule_parameters.installedAppId ? deleteSchedule_parameters.installedAppId : msg.payload;
                
                deleteSchedule_nodeParam = node.deleteSchedule_scheduleName;
                deleteSchedule_nodeParamType = node.deleteSchedule_scheduleNameType;
                if (deleteSchedule_nodeParamType === 'str') {
                    deleteSchedule_parameters.scheduleName = deleteSchedule_nodeParam || '';
                } else {
                    deleteSchedule_parameters.scheduleName = RED.util.getMessageProperty(msg, deleteSchedule_nodeParam);
                }
                deleteSchedule_parameters.scheduleName = !!deleteSchedule_parameters.scheduleName ? deleteSchedule_parameters.scheduleName : msg.payload;
                
                deleteSchedule_nodeParam = node.deleteSchedule_authorization;
                deleteSchedule_nodeParamType = node.deleteSchedule_authorizationType;
                if (deleteSchedule_nodeParamType === 'str') {
                    deleteSchedule_parameters.authorization = deleteSchedule_nodeParam || '';
                } else {
                    deleteSchedule_parameters.authorization = RED.util.getMessageProperty(msg, deleteSchedule_nodeParam);
                }
                deleteSchedule_parameters.authorization = !!deleteSchedule_parameters.authorization ? deleteSchedule_parameters.authorization : msg.payload;
                                result = client.deleteSchedule(deleteSchedule_parameters);
            }
            if (!errorFlag && node.method === 'createApp') {
                var createApp_parameters = [];
                var createApp_nodeParam;
                var createApp_nodeParamType;

                createApp_nodeParam = node.createApp_authorization;
                createApp_nodeParamType = node.createApp_authorizationType;
                if (createApp_nodeParamType === 'str') {
                    createApp_parameters.authorization = createApp_nodeParam || '';
                } else {
                    createApp_parameters.authorization = RED.util.getMessageProperty(msg, createApp_nodeParam);
                }
                createApp_parameters.authorization = !!createApp_parameters.authorization ? createApp_parameters.authorization : msg.payload;
                
                createApp_nodeParam = node.createApp_createOrUpdateAppRequest;
                createApp_nodeParamType = node.createApp_createOrUpdateAppRequestType;
                if (createApp_nodeParamType === 'str') {
                    createApp_parameters.createOrUpdateAppRequest = createApp_nodeParam || '';
                } else {
                    createApp_parameters.createOrUpdateAppRequest = RED.util.getMessageProperty(msg, createApp_nodeParam);
                }
                createApp_parameters.createOrUpdateAppRequest = !!createApp_parameters.createOrUpdateAppRequest ? createApp_parameters.createOrUpdateAppRequest : msg.payload;
                                result = client.createApp(createApp_parameters);
            }
            if (!errorFlag && node.method === 'listApps') {
                var listApps_parameters = [];
                var listApps_nodeParam;
                var listApps_nodeParamType;

                listApps_nodeParam = node.listApps_authorization;
                listApps_nodeParamType = node.listApps_authorizationType;
                if (listApps_nodeParamType === 'str') {
                    listApps_parameters.authorization = listApps_nodeParam || '';
                } else {
                    listApps_parameters.authorization = RED.util.getMessageProperty(msg, listApps_nodeParam);
                }
                listApps_parameters.authorization = !!listApps_parameters.authorization ? listApps_parameters.authorization : msg.payload;
                
                listApps_nodeParam = node.listApps_appType;
                listApps_nodeParamType = node.listApps_appTypeType;
                if (listApps_nodeParamType === 'str') {
                    listApps_parameters.appType = listApps_nodeParam || '';
                } else {
                    listApps_parameters.appType = RED.util.getMessageProperty(msg, listApps_nodeParam);
                }
                listApps_parameters.appType = !!listApps_parameters.appType ? listApps_parameters.appType : msg.payload;
                                result = client.listApps(listApps_parameters);
            }
            if (!errorFlag && node.method === 'getApp') {
                var getApp_parameters = [];
                var getApp_nodeParam;
                var getApp_nodeParamType;

                getApp_nodeParam = node.getApp_authorization;
                getApp_nodeParamType = node.getApp_authorizationType;
                if (getApp_nodeParamType === 'str') {
                    getApp_parameters.authorization = getApp_nodeParam || '';
                } else {
                    getApp_parameters.authorization = RED.util.getMessageProperty(msg, getApp_nodeParam);
                }
                getApp_parameters.authorization = !!getApp_parameters.authorization ? getApp_parameters.authorization : msg.payload;
                
                getApp_nodeParam = node.getApp_appNameOrId;
                getApp_nodeParamType = node.getApp_appNameOrIdType;
                if (getApp_nodeParamType === 'str') {
                    getApp_parameters.appNameOrId = getApp_nodeParam || '';
                } else {
                    getApp_parameters.appNameOrId = RED.util.getMessageProperty(msg, getApp_nodeParam);
                }
                getApp_parameters.appNameOrId = !!getApp_parameters.appNameOrId ? getApp_parameters.appNameOrId : msg.payload;
                                result = client.getApp(getApp_parameters);
            }
            if (!errorFlag && node.method === 'updateApp') {
                var updateApp_parameters = [];
                var updateApp_nodeParam;
                var updateApp_nodeParamType;

                updateApp_nodeParam = node.updateApp_authorization;
                updateApp_nodeParamType = node.updateApp_authorizationType;
                if (updateApp_nodeParamType === 'str') {
                    updateApp_parameters.authorization = updateApp_nodeParam || '';
                } else {
                    updateApp_parameters.authorization = RED.util.getMessageProperty(msg, updateApp_nodeParam);
                }
                updateApp_parameters.authorization = !!updateApp_parameters.authorization ? updateApp_parameters.authorization : msg.payload;
                
                updateApp_nodeParam = node.updateApp_appNameOrId;
                updateApp_nodeParamType = node.updateApp_appNameOrIdType;
                if (updateApp_nodeParamType === 'str') {
                    updateApp_parameters.appNameOrId = updateApp_nodeParam || '';
                } else {
                    updateApp_parameters.appNameOrId = RED.util.getMessageProperty(msg, updateApp_nodeParam);
                }
                updateApp_parameters.appNameOrId = !!updateApp_parameters.appNameOrId ? updateApp_parameters.appNameOrId : msg.payload;
                
                updateApp_nodeParam = node.updateApp_createOrUpdateAppRequest;
                updateApp_nodeParamType = node.updateApp_createOrUpdateAppRequestType;
                if (updateApp_nodeParamType === 'str') {
                    updateApp_parameters.createOrUpdateAppRequest = updateApp_nodeParam || '';
                } else {
                    updateApp_parameters.createOrUpdateAppRequest = RED.util.getMessageProperty(msg, updateApp_nodeParam);
                }
                updateApp_parameters.createOrUpdateAppRequest = !!updateApp_parameters.createOrUpdateAppRequest ? updateApp_parameters.createOrUpdateAppRequest : msg.payload;
                                result = client.updateApp(updateApp_parameters);
            }
            if (!errorFlag && node.method === 'deleteApp') {
                var deleteApp_parameters = [];
                var deleteApp_nodeParam;
                var deleteApp_nodeParamType;

                deleteApp_nodeParam = node.deleteApp_authorization;
                deleteApp_nodeParamType = node.deleteApp_authorizationType;
                if (deleteApp_nodeParamType === 'str') {
                    deleteApp_parameters.authorization = deleteApp_nodeParam || '';
                } else {
                    deleteApp_parameters.authorization = RED.util.getMessageProperty(msg, deleteApp_nodeParam);
                }
                deleteApp_parameters.authorization = !!deleteApp_parameters.authorization ? deleteApp_parameters.authorization : msg.payload;
                
                deleteApp_nodeParam = node.deleteApp_appNameOrId;
                deleteApp_nodeParamType = node.deleteApp_appNameOrIdType;
                if (deleteApp_nodeParamType === 'str') {
                    deleteApp_parameters.appNameOrId = deleteApp_nodeParam || '';
                } else {
                    deleteApp_parameters.appNameOrId = RED.util.getMessageProperty(msg, deleteApp_nodeParam);
                }
                deleteApp_parameters.appNameOrId = !!deleteApp_parameters.appNameOrId ? deleteApp_parameters.appNameOrId : msg.payload;
                                result = client.deleteApp(deleteApp_parameters);
            }
            if (!errorFlag && node.method === 'getAppSettings') {
                var getAppSettings_parameters = [];
                var getAppSettings_nodeParam;
                var getAppSettings_nodeParamType;

                getAppSettings_nodeParam = node.getAppSettings_authorization;
                getAppSettings_nodeParamType = node.getAppSettings_authorizationType;
                if (getAppSettings_nodeParamType === 'str') {
                    getAppSettings_parameters.authorization = getAppSettings_nodeParam || '';
                } else {
                    getAppSettings_parameters.authorization = RED.util.getMessageProperty(msg, getAppSettings_nodeParam);
                }
                getAppSettings_parameters.authorization = !!getAppSettings_parameters.authorization ? getAppSettings_parameters.authorization : msg.payload;
                
                getAppSettings_nodeParam = node.getAppSettings_appNameOrId;
                getAppSettings_nodeParamType = node.getAppSettings_appNameOrIdType;
                if (getAppSettings_nodeParamType === 'str') {
                    getAppSettings_parameters.appNameOrId = getAppSettings_nodeParam || '';
                } else {
                    getAppSettings_parameters.appNameOrId = RED.util.getMessageProperty(msg, getAppSettings_nodeParam);
                }
                getAppSettings_parameters.appNameOrId = !!getAppSettings_parameters.appNameOrId ? getAppSettings_parameters.appNameOrId : msg.payload;
                                result = client.getAppSettings(getAppSettings_parameters);
            }
            if (!errorFlag && node.method === 'updateAppSettings') {
                var updateAppSettings_parameters = [];
                var updateAppSettings_nodeParam;
                var updateAppSettings_nodeParamType;

                updateAppSettings_nodeParam = node.updateAppSettings_authorization;
                updateAppSettings_nodeParamType = node.updateAppSettings_authorizationType;
                if (updateAppSettings_nodeParamType === 'str') {
                    updateAppSettings_parameters.authorization = updateAppSettings_nodeParam || '';
                } else {
                    updateAppSettings_parameters.authorization = RED.util.getMessageProperty(msg, updateAppSettings_nodeParam);
                }
                updateAppSettings_parameters.authorization = !!updateAppSettings_parameters.authorization ? updateAppSettings_parameters.authorization : msg.payload;
                
                updateAppSettings_nodeParam = node.updateAppSettings_appNameOrId;
                updateAppSettings_nodeParamType = node.updateAppSettings_appNameOrIdType;
                if (updateAppSettings_nodeParamType === 'str') {
                    updateAppSettings_parameters.appNameOrId = updateAppSettings_nodeParam || '';
                } else {
                    updateAppSettings_parameters.appNameOrId = RED.util.getMessageProperty(msg, updateAppSettings_nodeParam);
                }
                updateAppSettings_parameters.appNameOrId = !!updateAppSettings_parameters.appNameOrId ? updateAppSettings_parameters.appNameOrId : msg.payload;
                
                updateAppSettings_nodeParam = node.updateAppSettings_updateAppSettingsRequest;
                updateAppSettings_nodeParamType = node.updateAppSettings_updateAppSettingsRequestType;
                if (updateAppSettings_nodeParamType === 'str') {
                    updateAppSettings_parameters.updateAppSettingsRequest = updateAppSettings_nodeParam || '';
                } else {
                    updateAppSettings_parameters.updateAppSettingsRequest = RED.util.getMessageProperty(msg, updateAppSettings_nodeParam);
                }
                updateAppSettings_parameters.updateAppSettingsRequest = !!updateAppSettings_parameters.updateAppSettingsRequest ? updateAppSettings_parameters.updateAppSettingsRequest : msg.payload;
                                result = client.updateAppSettings(updateAppSettings_parameters);
            }
            if (!errorFlag && node.method === 'getAppOauth') {
                var getAppOauth_parameters = [];
                var getAppOauth_nodeParam;
                var getAppOauth_nodeParamType;

                getAppOauth_nodeParam = node.getAppOauth_authorization;
                getAppOauth_nodeParamType = node.getAppOauth_authorizationType;
                if (getAppOauth_nodeParamType === 'str') {
                    getAppOauth_parameters.authorization = getAppOauth_nodeParam || '';
                } else {
                    getAppOauth_parameters.authorization = RED.util.getMessageProperty(msg, getAppOauth_nodeParam);
                }
                getAppOauth_parameters.authorization = !!getAppOauth_parameters.authorization ? getAppOauth_parameters.authorization : msg.payload;
                
                getAppOauth_nodeParam = node.getAppOauth_appNameOrId;
                getAppOauth_nodeParamType = node.getAppOauth_appNameOrIdType;
                if (getAppOauth_nodeParamType === 'str') {
                    getAppOauth_parameters.appNameOrId = getAppOauth_nodeParam || '';
                } else {
                    getAppOauth_parameters.appNameOrId = RED.util.getMessageProperty(msg, getAppOauth_nodeParam);
                }
                getAppOauth_parameters.appNameOrId = !!getAppOauth_parameters.appNameOrId ? getAppOauth_parameters.appNameOrId : msg.payload;
                                result = client.getAppOauth(getAppOauth_parameters);
            }
            if (!errorFlag && node.method === 'updateAppOauth') {
                var updateAppOauth_parameters = [];
                var updateAppOauth_nodeParam;
                var updateAppOauth_nodeParamType;

                updateAppOauth_nodeParam = node.updateAppOauth_authorization;
                updateAppOauth_nodeParamType = node.updateAppOauth_authorizationType;
                if (updateAppOauth_nodeParamType === 'str') {
                    updateAppOauth_parameters.authorization = updateAppOauth_nodeParam || '';
                } else {
                    updateAppOauth_parameters.authorization = RED.util.getMessageProperty(msg, updateAppOauth_nodeParam);
                }
                updateAppOauth_parameters.authorization = !!updateAppOauth_parameters.authorization ? updateAppOauth_parameters.authorization : msg.payload;
                
                updateAppOauth_nodeParam = node.updateAppOauth_appNameOrId;
                updateAppOauth_nodeParamType = node.updateAppOauth_appNameOrIdType;
                if (updateAppOauth_nodeParamType === 'str') {
                    updateAppOauth_parameters.appNameOrId = updateAppOauth_nodeParam || '';
                } else {
                    updateAppOauth_parameters.appNameOrId = RED.util.getMessageProperty(msg, updateAppOauth_nodeParam);
                }
                updateAppOauth_parameters.appNameOrId = !!updateAppOauth_parameters.appNameOrId ? updateAppOauth_parameters.appNameOrId : msg.payload;
                
                updateAppOauth_nodeParam = node.updateAppOauth_updateAppOAuthRequest;
                updateAppOauth_nodeParamType = node.updateAppOauth_updateAppOAuthRequestType;
                if (updateAppOauth_nodeParamType === 'str') {
                    updateAppOauth_parameters.updateAppOAuthRequest = updateAppOauth_nodeParam || '';
                } else {
                    updateAppOauth_parameters.updateAppOAuthRequest = RED.util.getMessageProperty(msg, updateAppOauth_nodeParam);
                }
                updateAppOauth_parameters.updateAppOAuthRequest = !!updateAppOauth_parameters.updateAppOAuthRequest ? updateAppOauth_parameters.updateAppOAuthRequest : msg.payload;
                                result = client.updateAppOauth(updateAppOauth_parameters);
            }
            if (!errorFlag && node.method === 'generateAppOauth') {
                var generateAppOauth_parameters = [];
                var generateAppOauth_nodeParam;
                var generateAppOauth_nodeParamType;

                generateAppOauth_nodeParam = node.generateAppOauth_authorization;
                generateAppOauth_nodeParamType = node.generateAppOauth_authorizationType;
                if (generateAppOauth_nodeParamType === 'str') {
                    generateAppOauth_parameters.authorization = generateAppOauth_nodeParam || '';
                } else {
                    generateAppOauth_parameters.authorization = RED.util.getMessageProperty(msg, generateAppOauth_nodeParam);
                }
                generateAppOauth_parameters.authorization = !!generateAppOauth_parameters.authorization ? generateAppOauth_parameters.authorization : msg.payload;
                
                generateAppOauth_nodeParam = node.generateAppOauth_appNameOrId;
                generateAppOauth_nodeParamType = node.generateAppOauth_appNameOrIdType;
                if (generateAppOauth_nodeParamType === 'str') {
                    generateAppOauth_parameters.appNameOrId = generateAppOauth_nodeParam || '';
                } else {
                    generateAppOauth_parameters.appNameOrId = RED.util.getMessageProperty(msg, generateAppOauth_nodeParam);
                }
                generateAppOauth_parameters.appNameOrId = !!generateAppOauth_parameters.appNameOrId ? generateAppOauth_parameters.appNameOrId : msg.payload;
                
                generateAppOauth_nodeParam = node.generateAppOauth_generateAppOAuthRequest;
                generateAppOauth_nodeParamType = node.generateAppOauth_generateAppOAuthRequestType;
                if (generateAppOauth_nodeParamType === 'str') {
                    generateAppOauth_parameters.generateAppOAuthRequest = generateAppOauth_nodeParam || '';
                } else {
                    generateAppOauth_parameters.generateAppOAuthRequest = RED.util.getMessageProperty(msg, generateAppOauth_nodeParam);
                }
                generateAppOauth_parameters.generateAppOAuthRequest = !!generateAppOauth_parameters.generateAppOAuthRequest ? generateAppOauth_parameters.generateAppOAuthRequest : msg.payload;
                                result = client.generateAppOauth(generateAppOauth_parameters);
            }
            if (!errorFlag && node.method === 'listScenes') {
                var listScenes_parameters = [];
                var listScenes_nodeParam;
                var listScenes_nodeParamType;

                listScenes_nodeParam = node.listScenes_max;
                listScenes_nodeParamType = node.listScenes_maxType;
                if (listScenes_nodeParamType === 'str') {
                    listScenes_parameters.max = listScenes_nodeParam || '';
                } else {
                    listScenes_parameters.max = RED.util.getMessageProperty(msg, listScenes_nodeParam);
                }
                listScenes_parameters.max = !!listScenes_parameters.max ? listScenes_parameters.max : msg.payload;
                
                listScenes_nodeParam = node.listScenes_offset;
                listScenes_nodeParamType = node.listScenes_offsetType;
                if (listScenes_nodeParamType === 'str') {
                    listScenes_parameters.offset = listScenes_nodeParam || '';
                } else {
                    listScenes_parameters.offset = RED.util.getMessageProperty(msg, listScenes_nodeParam);
                }
                listScenes_parameters.offset = !!listScenes_parameters.offset ? listScenes_parameters.offset : msg.payload;
                
                listScenes_nodeParam = node.listScenes_authorization;
                listScenes_nodeParamType = node.listScenes_authorizationType;
                if (listScenes_nodeParamType === 'str') {
                    listScenes_parameters.authorization = listScenes_nodeParam || '';
                } else {
                    listScenes_parameters.authorization = RED.util.getMessageProperty(msg, listScenes_nodeParam);
                }
                listScenes_parameters.authorization = !!listScenes_parameters.authorization ? listScenes_parameters.authorization : msg.payload;
                
                listScenes_nodeParam = node.listScenes_locationId;
                listScenes_nodeParamType = node.listScenes_locationIdType;
                if (listScenes_nodeParamType === 'str') {
                    listScenes_parameters.locationId = listScenes_nodeParam || '';
                } else {
                    listScenes_parameters.locationId = RED.util.getMessageProperty(msg, listScenes_nodeParam);
                }
                listScenes_parameters.locationId = !!listScenes_parameters.locationId ? listScenes_parameters.locationId : msg.payload;
                                result = client.listScenes(listScenes_parameters);
            }
            if (!errorFlag && node.method === 'executeScene') {
                var executeScene_parameters = [];
                var executeScene_nodeParam;
                var executeScene_nodeParamType;

                executeScene_nodeParam = node.executeScene_authorization;
                executeScene_nodeParamType = node.executeScene_authorizationType;
                if (executeScene_nodeParamType === 'str') {
                    executeScene_parameters.authorization = executeScene_nodeParam || '';
                } else {
                    executeScene_parameters.authorization = RED.util.getMessageProperty(msg, executeScene_nodeParam);
                }
                executeScene_parameters.authorization = !!executeScene_parameters.authorization ? executeScene_parameters.authorization : msg.payload;
                
                executeScene_nodeParam = node.executeScene_locationId;
                executeScene_nodeParamType = node.executeScene_locationIdType;
                if (executeScene_nodeParamType === 'str') {
                    executeScene_parameters.locationId = executeScene_nodeParam || '';
                } else {
                    executeScene_parameters.locationId = RED.util.getMessageProperty(msg, executeScene_nodeParam);
                }
                executeScene_parameters.locationId = !!executeScene_parameters.locationId ? executeScene_parameters.locationId : msg.payload;
                
                executeScene_nodeParam = node.executeScene_sceneId;
                executeScene_nodeParamType = node.executeScene_sceneIdType;
                if (executeScene_nodeParamType === 'str') {
                    executeScene_parameters.sceneId = executeScene_nodeParam || '';
                } else {
                    executeScene_parameters.sceneId = RED.util.getMessageProperty(msg, executeScene_nodeParam);
                }
                executeScene_parameters.sceneId = !!executeScene_parameters.sceneId ? executeScene_parameters.sceneId : msg.payload;
                                result = client.executeScene(executeScene_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'SmartthingsApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('smarthings-api', SmartthingsApiNode);
    function SmartthingsApiServiceNode(n) {
        RED.nodes.createNode(this, n);

        this.secureTokenValue = n.secureTokenValue;
        this.secureTokenHeaderOrQueryName = n.secureTokenHeaderOrQueryName;
        this.secureTokenIsQuery = n.secureTokenIsQuery;
    }

    RED.nodes.registerType('smarthings-api-service', SmartthingsApiServiceNode, {
        credentials: {
            secureTokenValue: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
