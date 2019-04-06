var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('smarthings-api node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'smarthings-api', name: 'smarthings-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'smarthings-api');
            done();
        });
    });

    it('should handle getDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getDevices',
                getDevices_capability: '<node property>', // (1) define node properties
                getDevices_locationId: '<node property>', // (1) define node properties
                getDevices_deviceId: '<node property>', // (1) define node properties
                getDevices_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle installDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'installDevice',
                installDevice_installationRequest: '<node property>', // (1) define node properties
                installDevice_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getDevice',
                getDevice_authorization: '<node property>', // (1) define node properties
                getDevice_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteDevice',
                deleteDevice_authorization: '<node property>', // (1) define node properties
                deleteDevice_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'updateDevice',
                updateDevice_updateDeviceRequest: '<node property>', // (1) define node properties
                updateDevice_authorization: '<node property>', // (1) define node properties
                updateDevice_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle executeDeviceCommands()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'executeDeviceCommands',
                executeDeviceCommands_executeCapabilityCommand: '<node property>', // (1) define node properties
                executeDeviceCommands_authorization: '<node property>', // (1) define node properties
                executeDeviceCommands_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createDeviceEvents()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'createDeviceEvents',
                createDeviceEvents_deviceEventRequest: '<node property>', // (1) define node properties
                createDeviceEvents_authorization: '<node property>', // (1) define node properties
                createDeviceEvents_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getDeviceStatus',
                getDeviceStatus_authorization: '<node property>', // (1) define node properties
                getDeviceStatus_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceComponentStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getDeviceComponentStatus',
                getDeviceComponentStatus_authorization: '<node property>', // (1) define node properties
                getDeviceComponentStatus_deviceId: '<node property>', // (1) define node properties
                getDeviceComponentStatus_componentId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceStatusByCapability()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getDeviceStatusByCapability',
                getDeviceStatusByCapability_authorization: '<node property>', // (1) define node properties
                getDeviceStatusByCapability_deviceId: '<node property>', // (1) define node properties
                getDeviceStatusByCapability_componentId: '<node property>', // (1) define node properties
                getDeviceStatusByCapability_capabilityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createDeviceProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'createDeviceProfile',
                createDeviceProfile_authorization: '<node property>', // (1) define node properties
                createDeviceProfile_request: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listDeviceProfiles()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listDeviceProfiles',
                listDeviceProfiles_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getDeviceProfile',
                getDeviceProfile_authorization: '<node property>', // (1) define node properties
                getDeviceProfile_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDeviceProfile()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteDeviceProfile',
                deleteDeviceProfile_authorization: '<node property>', // (1) define node properties
                deleteDeviceProfile_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listLocations()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listLocations',
                listLocations_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createLocation()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'createLocation',
                createLocation_createLocationRequest: '<node property>', // (1) define node properties
                createLocation_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLocation()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getLocation',
                getLocation_authorization: '<node property>', // (1) define node properties
                getLocation_locationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateLocation()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'updateLocation',
                updateLocation_updateLocationRequest: '<node property>', // (1) define node properties
                updateLocation_authorization: '<node property>', // (1) define node properties
                updateLocation_locationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteLocation()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteLocation',
                deleteLocation_authorization: '<node property>', // (1) define node properties
                deleteLocation_locationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listInstallations()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listInstallations',
                listInstallations_authorization: '<node property>', // (1) define node properties
                listInstallations_locationId: '<node property>', // (1) define node properties
                listInstallations_installedAppStatus: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getInstallation()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getInstallation',
                getInstallation_authorization: '<node property>', // (1) define node properties
                getInstallation_installedAppId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteInstallation()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteInstallation',
                deleteInstallation_authorization: '<node property>', // (1) define node properties
                deleteInstallation_installedAppId: '<node property>', // (1) define node properties
                deleteInstallation_locationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listInstallationConfig()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listInstallationConfig',
                listInstallationConfig_authorization: '<node property>', // (1) define node properties
                listInstallationConfig_installedAppId: '<node property>', // (1) define node properties
                listInstallationConfig_configurationStatus: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getInstallationConfig()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getInstallationConfig',
                getInstallationConfig_authorization: '<node property>', // (1) define node properties
                getInstallationConfig_installedAppId: '<node property>', // (1) define node properties
                getInstallationConfig_configurationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listSubscriptions()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listSubscriptions',
                listSubscriptions_installedAppId: '<node property>', // (1) define node properties
                listSubscriptions_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveSubscription()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'saveSubscription',
                saveSubscription_request: '<node property>', // (1) define node properties
                saveSubscription_installedAppId: '<node property>', // (1) define node properties
                saveSubscription_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteAllSubscriptions()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteAllSubscriptions',
                deleteAllSubscriptions_deviceId: '<node property>', // (1) define node properties
                deleteAllSubscriptions_installedAppId: '<node property>', // (1) define node properties
                deleteAllSubscriptions_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSubscription()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getSubscription',
                getSubscription_installedAppId: '<node property>', // (1) define node properties
                getSubscription_subscriptionId: '<node property>', // (1) define node properties
                getSubscription_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteSubscription()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteSubscription',
                deleteSubscription_installedAppId: '<node property>', // (1) define node properties
                deleteSubscription_subscriptionId: '<node property>', // (1) define node properties
                deleteSubscription_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSchedules()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getSchedules',
                getSchedules_installedAppId: '<node property>', // (1) define node properties
                getSchedules_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createSchedule()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'createSchedule',
                createSchedule_request: '<node property>', // (1) define node properties
                createSchedule_installedAppId: '<node property>', // (1) define node properties
                createSchedule_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteSchedules()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteSchedules',
                deleteSchedules_installedAppId: '<node property>', // (1) define node properties
                deleteSchedules_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSchedule()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getSchedule',
                getSchedule_installedAppId: '<node property>', // (1) define node properties
                getSchedule_scheduleName: '<node property>', // (1) define node properties
                getSchedule_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteSchedule()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteSchedule',
                deleteSchedule_installedAppId: '<node property>', // (1) define node properties
                deleteSchedule_scheduleName: '<node property>', // (1) define node properties
                deleteSchedule_authorization: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle createApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'createApp',
                createApp_authorization: '<node property>', // (1) define node properties
                createApp_createOrUpdateAppRequest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listApps()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listApps',
                listApps_authorization: '<node property>', // (1) define node properties
                listApps_appType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getApp',
                getApp_authorization: '<node property>', // (1) define node properties
                getApp_appNameOrId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'updateApp',
                updateApp_authorization: '<node property>', // (1) define node properties
                updateApp_appNameOrId: '<node property>', // (1) define node properties
                updateApp_createOrUpdateAppRequest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteApp()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'deleteApp',
                deleteApp_authorization: '<node property>', // (1) define node properties
                deleteApp_appNameOrId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAppSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getAppSettings',
                getAppSettings_authorization: '<node property>', // (1) define node properties
                getAppSettings_appNameOrId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateAppSettings()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'updateAppSettings',
                updateAppSettings_authorization: '<node property>', // (1) define node properties
                updateAppSettings_appNameOrId: '<node property>', // (1) define node properties
                updateAppSettings_updateAppSettingsRequest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAppOauth()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'getAppOauth',
                getAppOauth_authorization: '<node property>', // (1) define node properties
                getAppOauth_appNameOrId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateAppOauth()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'updateAppOauth',
                updateAppOauth_authorization: '<node property>', // (1) define node properties
                updateAppOauth_appNameOrId: '<node property>', // (1) define node properties
                updateAppOauth_updateAppOAuthRequest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle generateAppOauth()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'generateAppOauth',
                generateAppOauth_authorization: '<node property>', // (1) define node properties
                generateAppOauth_appNameOrId: '<node property>', // (1) define node properties
                generateAppOauth_generateAppOAuthRequest: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listScenes()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'listScenes',
                listScenes_max: '<node property>', // (1) define node properties
                listScenes_offset: '<node property>', // (1) define node properties
                listScenes_authorization: '<node property>', // (1) define node properties
                listScenes_locationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle executeScene()', function (done) {
        var flow = [
            { id: 'n1', type: 'smarthings-api', name: 'smarthings-api',
                method: 'executeScene',
                executeScene_authorization: '<node property>', // (1) define node properties
                executeScene_locationId: '<node property>', // (1) define node properties
                executeScene_sceneId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'smarthings-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
