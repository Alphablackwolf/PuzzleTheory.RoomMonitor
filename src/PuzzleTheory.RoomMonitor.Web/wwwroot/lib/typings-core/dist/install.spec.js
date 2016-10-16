"use strict";
var test = require('blue-tape');
var Promise = require('any-promise');
var path_1 = require('path');
var events_1 = require('events');
var nock = require('nock');
var install_1 = require('./install');
var fs_1 = require('./utils/fs');
var config_1 = require('./utils/config');
var rc_1 = require('./utils/rc');
test('install', function (t) {
    var emitter = new events_1.EventEmitter();
    t.test('install everything', function (t) {
        var FIXTURE_DIR = path_1.join(__dirname, '__test__/install-fixture');
        return fs_1.rimraf(path_1.join(FIXTURE_DIR, 'typings'))
            .then(function () {
            return install_1.install({
                cwd: FIXTURE_DIR,
                emitter: emitter
            });
        })
            .then(function () {
            return Promise.all([
                fs_1.readFile(path_1.join(FIXTURE_DIR, 'typings/index.d.ts'), 'utf8'),
                fs_1.readFile(path_1.join(FIXTURE_DIR, 'typings/modules/test/index.d.ts'), 'utf8'),
                fs_1.readFile(path_1.join(FIXTURE_DIR, 'typings/globals/test/index.d.ts'), 'utf8')
            ]);
        })
            .then(function (_a) {
            var mainDts = _a[0], mainFile = _a[1], globalMainFile = _a[2];
            t.equal(mainDts, [
                "/// <reference path=\"globals/test/index.d.ts\" />",
                "/// <reference path=\"modules/test/index.d.ts\" />",
                ""
            ].join('\n'));
            t.equal(mainFile, [
                "// Generated by typings",
                "// Source: custom_typings/module.d.ts",
                "declare module 'test' {",
                "function test (): boolean",
                "",
                "export default test",
                "}",
                ""
            ].join('\n'));
            t.equal(globalMainFile, [
                "// Generated by typings",
                "// Source: custom_typings/global.d.ts",
                "declare module \"x\" {}",
                ''
            ].join('\n'));
        });
    });
    t.test('install dependency', function (t) {
        var DEPENDENCY = '@scope/test=file:custom_typings/module.d.ts';
        var REGISTRY_DEPENDENCY = 'registry:dt/node@>=4.0';
        var PEER_DEPENDENCY = 'file:custom_typings/named/typings.json';
        var GLOBAL_DEPENDENCY = 'file:custom_typings/global.d.ts';
        var FIXTURE_DIR = path_1.join(__dirname, '__test__/install-dependency-fixture');
        var CONFIG = path_1.join(FIXTURE_DIR, config_1.CONFIG_FILE);
        nock(rc_1.default.registryURL)
            .get('/entries/dt/node/versions/%3E%3D4.0/latest')
            .reply(200, {
            tag: '4.0.0+20160226132328',
            version: '4.0.0',
            description: null,
            compiler: null,
            location: 'github:DefinitelyTyped/DefinitelyTyped/node/node.d.ts#48c1e3c1d6baefa4f1a126f188c27c4fefd36bff',
            updated: '2016-02-26T13:23:28.000Z'
        });
        nock('https://raw.githubuserstuff.com/')
            .get('/DefinitelyTyped/DefinitelyTyped/48c1e3c1d6baefa4f1a126f188c27c4fefd36bff/node/node.d.ts')
            .reply(200, '// Type definitions for Node.js v4.x');
        rc_1.default.urlRewrites = { '(.*)content(.*)': '$1stuff$2' };
        return fs_1.writeFile(CONFIG, '{}')
            .then(function () {
            return fs_1.rimraf(path_1.join(FIXTURE_DIR, 'typings'));
        })
            .then(function () {
            return Promise.all([
                install_1.installDependencyRaw(DEPENDENCY, {
                    cwd: FIXTURE_DIR,
                    saveDev: true,
                    emitter: emitter
                }),
                install_1.installDependencyRaw(REGISTRY_DEPENDENCY, {
                    cwd: FIXTURE_DIR,
                    save: true,
                    global: true,
                    emitter: emitter
                }),
                install_1.installDependencyRaw(GLOBAL_DEPENDENCY, {
                    cwd: FIXTURE_DIR,
                    saveDev: true,
                    global: true,
                    emitter: emitter
                }),
                install_1.installDependencyRaw(PEER_DEPENDENCY, {
                    cwd: FIXTURE_DIR,
                    savePeer: true,
                    emitter: emitter
                })
            ]);
        })
            .then(function () {
            return fs_1.readConfig(CONFIG);
        })
            .then(function (config) {
            t.deepEqual(config, {
                devDependencies: {
                    '@scope/test': 'file:custom_typings/module.d.ts'
                },
                peerDependencies: {
                    named: PEER_DEPENDENCY
                },
                globalDependencies: {
                    node: 'registry:dt/node#4.0.0+20160226132328'
                },
                globalDevDependencies: {
                    global: 'file:custom_typings/global.d.ts'
                }
            });
        });
    });
    t.test('install empty', function (t) {
        var FIXTURE_DIR = path_1.join(__dirname, '__test__/install-empty');
        return install_1.install({
            cwd: FIXTURE_DIR,
            emitter: emitter
        })
            .then(function () {
            return Promise.all([
                fs_1.readFile(path_1.join(FIXTURE_DIR, 'typings/main/index.d.ts'), 'utf8'),
                fs_1.readFile(path_1.join(FIXTURE_DIR, 'typings/browser/index.d.ts'), 'utf8')
            ]);
        })
            .then(function (_a) {
            var main = _a[0], browser = _a[1];
            t.equal(main, '');
            t.equal(browser, '');
        });
    });
});
//# sourceMappingURL=install.spec.js.map