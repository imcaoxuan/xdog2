"use strict";/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.30.1(829382514cb1065f5ebb90f436e1c6103e153953)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/
var _amdLoaderGlobal = this, _commonjsGlobal = typeof global == "object" ? global : {}, AMDLoader;
(function (l) {
    l.global = _amdLoaderGlobal;
    var E = function () {
        function v() {
            this._detected = !1, this._isWindows = !1, this._isNode = !1, this._isElectronRenderer = !1, this._isWebWorker = !1, this._isElectronNodeIntegrationWebWorker = !1
        }

        return Object.defineProperty(v.prototype, "isWindows", {
            get: function () {
                return this._detect(), this._isWindows
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(v.prototype, "isNode", {
            get: function () {
                return this._detect(), this._isNode
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(v.prototype, "isElectronRenderer", {
            get: function () {
                return this._detect(), this._isElectronRenderer
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(v.prototype, "isWebWorker", {
            get: function () {
                return this._detect(), this._isWebWorker
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(v.prototype, "isElectronNodeIntegrationWebWorker", {
            get: function () {
                return this._detect(), this._isElectronNodeIntegrationWebWorker
            }, enumerable: !1, configurable: !0
        }), v.prototype._detect = function () {
            this._detected || (this._detected = !0, this._isWindows = v._isWindows(), this._isNode = typeof module != "undefined" && !!module.exports, this._isElectronRenderer = typeof process != "undefined" && typeof process.versions != "undefined" && typeof process.versions.electron != "undefined" && process.type === "renderer", this._isWebWorker = typeof l.global.importScripts == "function", this._isElectronNodeIntegrationWebWorker = this._isWebWorker && typeof process != "undefined" && typeof process.versions != "undefined" && typeof process.versions.electron != "undefined" && process.type === "worker")
        }, v._isWindows = function () {
            return typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.indexOf("Windows") >= 0 ? !0 : typeof process != "undefined" ? process.platform === "win32" : !1
        }, v
    }();
    l.Environment = E
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function (l) {
    var E = function () {
        function a(n, _, s) {
            this.type = n, this.detail = _, this.timestamp = s
        }

        return a
    }();
    l.LoaderEvent = E;
    var v = function () {
        function a(n) {
            this._events = [new E(1, "", n)]
        }

        return a.prototype.record = function (n, _) {
            this._events.push(new E(n, _, l.Utilities.getHighPerformanceTimestamp()))
        }, a.prototype.getEvents = function () {
            return this._events
        }, a
    }();
    l.LoaderEventRecorder = v;
    var g = function () {
        function a() {
        }

        return a.prototype.record = function (n, _) {
        }, a.prototype.getEvents = function () {
            return []
        }, a.INSTANCE = new a, a
    }();
    l.NullLoaderEventRecorder = g
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function (l) {
    var E = function () {
        function v() {
        }

        return v.fileUriToFilePath = function (g, a) {
            if (a = decodeURI(a).replace(/%23/g, "#"), g) {
                if (/^file:\/\/\//.test(a)) return a.substr(8);
                if (/^file:\/\//.test(a)) return a.substr(5)
            } else if (/^file:\/\//.test(a)) return a.substr(7);
            return a
        }, v.startsWith = function (g, a) {
            return g.length >= a.length && g.substr(0, a.length) === a
        }, v.endsWith = function (g, a) {
            return g.length >= a.length && g.substr(g.length - a.length) === a
        }, v.containsQueryString = function (g) {
            return /^[^\#]*\?/gi.test(g)
        }, v.isAbsolutePath = function (g) {
            return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(g)
        }, v.forEachProperty = function (g, a) {
            if (g) {
                var n = void 0;
                for (n in g) g.hasOwnProperty(n) && a(n, g[n])
            }
        }, v.isEmpty = function (g) {
            var a = !0;
            return v.forEachProperty(g, function () {
                a = !1
            }), a
        }, v.recursiveClone = function (g) {
            if (!g || typeof g != "object" || g instanceof RegExp || !Array.isArray(g) && Object.getPrototypeOf(g) !== Object.prototype) return g;
            var a = Array.isArray(g) ? [] : {};
            return v.forEachProperty(g, function (n, _) {
                _ && typeof _ == "object" ? a[n] = v.recursiveClone(_) : a[n] = _
            }), a
        }, v.generateAnonymousModule = function () {
            return "===anonymous" + v.NEXT_ANONYMOUS_ID++ + "==="
        }, v.isAnonymousModule = function (g) {
            return v.startsWith(g, "===anonymous")
        }, v.getHighPerformanceTimestamp = function () {
            return this.PERFORMANCE_NOW_PROBED || (this.PERFORMANCE_NOW_PROBED = !0, this.HAS_PERFORMANCE_NOW = l.global.performance && typeof l.global.performance.now == "function"), this.HAS_PERFORMANCE_NOW ? l.global.performance.now() : Date.now()
        }, v.NEXT_ANONYMOUS_ID = 1, v.PERFORMANCE_NOW_PROBED = !1, v.HAS_PERFORMANCE_NOW = !1, v
    }();
    l.Utilities = E
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function (l) {
    function E(a) {
        if (a instanceof Error) return a;
        var n = new Error(a.message || String(a) || "Unknown Error");
        return a.stack && (n.stack = a.stack), n
    }

    l.ensureError = E;
    var v = function () {
        function a() {
        }

        return a.validateConfigurationOptions = function (n) {
            function _(e) {
                if (e.phase === "loading") {
                    console.error('Loading "' + e.moduleId + '" failed'), console.error(e), console.error("Here are the modules that depend on it:"), console.error(e.neededBy);
                    return
                }
                if (e.phase === "factory") {
                    console.error('The factory method of "' + e.moduleId + '" has thrown an exception'), console.error(e);
                    return
                }
            }

            if (n = n || {}, typeof n.baseUrl != "string" && (n.baseUrl = ""), typeof n.isBuild != "boolean" && (n.isBuild = !1), typeof n.paths != "object" && (n.paths = {}), typeof n.config != "object" && (n.config = {}), typeof n.catchError == "undefined" && (n.catchError = !1), typeof n.recordStats == "undefined" && (n.recordStats = !1), typeof n.urlArgs != "string" && (n.urlArgs = ""), typeof n.onError != "function" && (n.onError = _), Array.isArray(n.ignoreDuplicateModules) || (n.ignoreDuplicateModules = []), n.baseUrl.length > 0 && (l.Utilities.endsWith(n.baseUrl, "/") || (n.baseUrl += "/")), typeof n.cspNonce != "string" && (n.cspNonce = ""), typeof n.preferScriptTags == "undefined" && (n.preferScriptTags = !1), Array.isArray(n.nodeModules) || (n.nodeModules = []), n.nodeCachedData && typeof n.nodeCachedData == "object" && (typeof n.nodeCachedData.seed != "string" && (n.nodeCachedData.seed = "seed"), (typeof n.nodeCachedData.writeDelay != "number" || n.nodeCachedData.writeDelay < 0) && (n.nodeCachedData.writeDelay = 1e3 * 7), !n.nodeCachedData.path || typeof n.nodeCachedData.path != "string")) {
                var s = E(new Error("INVALID cached data configuration, 'path' MUST be set"));
                s.phase = "configuration", n.onError(s), n.nodeCachedData = void 0
            }
            return n
        }, a.mergeConfigurationOptions = function (n, _) {
            n === void 0 && (n = null), _ === void 0 && (_ = null);
            var s = l.Utilities.recursiveClone(_ || {});
            return l.Utilities.forEachProperty(n, function (e, t) {
                e === "ignoreDuplicateModules" && typeof s.ignoreDuplicateModules != "undefined" ? s.ignoreDuplicateModules = s.ignoreDuplicateModules.concat(t) : e === "paths" && typeof s.paths != "undefined" ? l.Utilities.forEachProperty(t, function (r, i) {
                    return s.paths[r] = i
                }) : e === "config" && typeof s.config != "undefined" ? l.Utilities.forEachProperty(t, function (r, i) {
                    return s.config[r] = i
                }) : s[e] = l.Utilities.recursiveClone(t)
            }), a.validateConfigurationOptions(s)
        }, a
    }();
    l.ConfigurationOptionsUtil = v;
    var g = function () {
        function a(n, _) {
            if (this._env = n, this.options = v.mergeConfigurationOptions(_), this._createIgnoreDuplicateModulesMap(), this._createNodeModulesMap(), this._createSortedPathsRules(), this.options.baseUrl === "") {
                if (this.options.nodeRequire && this.options.nodeRequire.main && this.options.nodeRequire.main.filename && this._env.isNode) {
                    var s = this.options.nodeRequire.main.filename,
                        e = Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\"));
                    this.options.baseUrl = s.substring(0, e + 1)
                }
                if (this.options.nodeMain && this._env.isNode) {
                    var s = this.options.nodeMain, e = Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\"));
                    this.options.baseUrl = s.substring(0, e + 1)
                }
            }
        }

        return a.prototype._createIgnoreDuplicateModulesMap = function () {
            this.ignoreDuplicateModulesMap = {};
            for (var n = 0; n < this.options.ignoreDuplicateModules.length; n++) this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[n]] = !0
        }, a.prototype._createNodeModulesMap = function () {
            this.nodeModulesMap = Object.create(null);
            for (var n = 0, _ = this.options.nodeModules; n < _.length; n++) {
                var s = _[n];
                this.nodeModulesMap[s] = !0
            }
        }, a.prototype._createSortedPathsRules = function () {
            var n = this;
            this.sortedPathsRules = [], l.Utilities.forEachProperty(this.options.paths, function (_, s) {
                Array.isArray(s) ? n.sortedPathsRules.push({from: _, to: s}) : n.sortedPathsRules.push({
                    from: _,
                    to: [s]
                })
            }), this.sortedPathsRules.sort(function (_, s) {
                return s.from.length - _.from.length
            })
        }, a.prototype.cloneAndMerge = function (n) {
            return new a(this._env, v.mergeConfigurationOptions(n, this.options))
        }, a.prototype.getOptionsLiteral = function () {
            return this.options
        }, a.prototype._applyPaths = function (n) {
            for (var _, s = 0, e = this.sortedPathsRules.length; s < e; s++) if (_ = this.sortedPathsRules[s], l.Utilities.startsWith(n, _.from)) {
                for (var t = [], r = 0, i = _.to.length; r < i; r++) t.push(_.to[r] + n.substr(_.from.length));
                return t
            }
            return [n]
        }, a.prototype._addUrlArgsToUrl = function (n) {
            return l.Utilities.containsQueryString(n) ? n + "&" + this.options.urlArgs : n + "?" + this.options.urlArgs
        }, a.prototype._addUrlArgsIfNecessaryToUrl = function (n) {
            return this.options.urlArgs ? this._addUrlArgsToUrl(n) : n
        }, a.prototype._addUrlArgsIfNecessaryToUrls = function (n) {
            if (this.options.urlArgs) for (var _ = 0, s = n.length; _ < s; _++) n[_] = this._addUrlArgsToUrl(n[_]);
            return n
        }, a.prototype.moduleIdToPaths = function (n) {
            if (this._env.isNode) {
                var _ = this.nodeModulesMap[n] === !0 || this.options.amdModulesPattern instanceof RegExp && !this.options.amdModulesPattern.test(n);
                if (_) return this.isBuild() ? ["empty:"] : ["node|" + n]
            }
            var s = n, e;
            if (!l.Utilities.endsWith(s, ".js") && !l.Utilities.isAbsolutePath(s)) {
                e = this._applyPaths(s);
                for (var t = 0, r = e.length; t < r; t++) this.isBuild() && e[t] === "empty:" || (l.Utilities.isAbsolutePath(e[t]) || (e[t] = this.options.baseUrl + e[t]), !l.Utilities.endsWith(e[t], ".js") && !l.Utilities.containsQueryString(e[t]) && (e[t] = e[t] + ".js"))
            } else !l.Utilities.endsWith(s, ".js") && !l.Utilities.containsQueryString(s) && (s = s + ".js"), e = [s];
            return this._addUrlArgsIfNecessaryToUrls(e)
        }, a.prototype.requireToUrl = function (n) {
            var _ = n;
            return l.Utilities.isAbsolutePath(_) || (_ = this._applyPaths(_)[0], l.Utilities.isAbsolutePath(_) || (_ = this.options.baseUrl + _)), this._addUrlArgsIfNecessaryToUrl(_)
        }, a.prototype.isBuild = function () {
            return this.options.isBuild
        }, a.prototype.isDuplicateMessageIgnoredFor = function (n) {
            return this.ignoreDuplicateModulesMap.hasOwnProperty(n)
        }, a.prototype.getConfigForModule = function (n) {
            if (this.options.config) return this.options.config[n]
        }, a.prototype.shouldCatchError = function () {
            return this.options.catchError
        }, a.prototype.shouldRecordStats = function () {
            return this.options.recordStats
        }, a.prototype.onError = function (n) {
            this.options.onError(n)
        }, a
    }();
    l.Configuration = g
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function (l) {
    var E = function () {
        function e(t) {
            this._env = t, this._scriptLoader = null, this._callbackMap = {}
        }

        return e.prototype.load = function (t, r, i, o) {
            var u = this;
            if (!this._scriptLoader) if (this._env.isWebWorker) this._scriptLoader = new a; else if (this._env.isElectronRenderer) {
                var c = t.getConfig().getOptionsLiteral().preferScriptTags;
                c ? this._scriptLoader = new v : this._scriptLoader = new n(this._env)
            } else this._env.isNode ? this._scriptLoader = new n(this._env) : this._scriptLoader = new v;
            var f = {callback: i, errorback: o};
            if (this._callbackMap.hasOwnProperty(r)) {
                this._callbackMap[r].push(f);
                return
            }
            this._callbackMap[r] = [f], this._scriptLoader.load(t, r, function () {
                return u.triggerCallback(r)
            }, function (p) {
                return u.triggerErrorback(r, p)
            })
        }, e.prototype.triggerCallback = function (t) {
            var r = this._callbackMap[t];
            delete this._callbackMap[t];
            for (var i = 0; i < r.length; i++) r[i].callback()
        }, e.prototype.triggerErrorback = function (t, r) {
            var i = this._callbackMap[t];
            delete this._callbackMap[t];
            for (var o = 0; o < i.length; o++) i[o].errorback(r)
        }, e
    }(), v = function () {
        function e() {
        }

        return e.prototype.attachListeners = function (t, r, i) {
            var o = function () {
                t.removeEventListener("load", u), t.removeEventListener("error", c)
            }, u = function (f) {
                o(), r()
            }, c = function (f) {
                o(), i(f)
            };
            t.addEventListener("load", u), t.addEventListener("error", c)
        }, e.prototype.load = function (t, r, i, o) {
            if (/^node\|/.test(r)) {
                var u = t.getConfig().getOptionsLiteral(),
                    c = _(t.getRecorder(), u.nodeRequire || l.global.nodeRequire), f = r.split("|"), p = null;
                try {
                    p = c(f[1])
                } catch (m) {
                    o(m);
                    return
                }
                t.enqueueDefineAnonymousModule([], function () {
                    return p
                }), i()
            } else {
                var d = document.createElement("script");
                d.setAttribute("async", "async"), d.setAttribute("type", "text/javascript"), this.attachListeners(d, i, o);
                var y = t.getConfig().getOptionsLiteral().trustedTypesPolicy;
                y && (r = y.createScriptURL(r)), d.setAttribute("src", r);
                var h = t.getConfig().getOptionsLiteral().cspNonce;
                h && d.setAttribute("nonce", h), document.getElementsByTagName("head")[0].appendChild(d)
            }
        }, e
    }();

    function g(e) {
        var t = e.getConfig().getOptionsLiteral().trustedTypesPolicy;
        try {
            var r = t ? self.eval(t.createScript("", "true")) : new Function("true");
            return r.call(self), !0
        } catch (i) {
            return !1
        }
    }

    var a = function () {
        function e() {
            this._cachedCanUseEval = null
        }

        return e.prototype._canUseEval = function (t) {
            return this._cachedCanUseEval === null && (this._cachedCanUseEval = g(t)), this._cachedCanUseEval
        }, e.prototype.load = function (t, r, i, o) {
            if (/^node\|/.test(r)) {
                var u = t.getConfig().getOptionsLiteral(),
                    c = _(t.getRecorder(), u.nodeRequire || l.global.nodeRequire), f = r.split("|"), p = null;
                try {
                    p = c(f[1])
                } catch (h) {
                    o(h);
                    return
                }
                t.enqueueDefineAnonymousModule([], function () {
                    return p
                }), i()
            } else {
                var d = t.getConfig().getOptionsLiteral().trustedTypesPolicy,
                    y = /^((http:)|(https:)|(file:))/.test(r) && r.substring(0, self.origin.length) !== self.origin;
                if (!y && this._canUseEval(t)) {
                    fetch(r).then(function (h) {
                        if (h.status !== 200) throw new Error(h.statusText);
                        return h.text()
                    }).then(function (h) {
                        h = h + `
//# sourceURL=` + r;
                        var m = d ? self.eval(d.createScript("", h)) : new Function(h);
                        m.call(self), i()
                    }).then(void 0, o);
                    return
                }
                try {
                    d && (r = d.createScriptURL(r)), importScripts(r), i()
                } catch (h) {
                    o(h)
                }
            }
        }, e
    }(), n = function () {
        function e(t) {
            this._env = t, this._didInitialize = !1, this._didPatchNodeRequire = !1
        }

        return e.prototype._init = function (t) {
            this._didInitialize || (this._didInitialize = !0, this._fs = t("fs"), this._vm = t("vm"), this._path = t("path"), this._crypto = t("crypto"))
        }, e.prototype._initNodeRequire = function (t, r) {
            var i = r.getConfig().getOptionsLiteral().nodeCachedData;
            if (!i || this._didPatchNodeRequire) return;
            this._didPatchNodeRequire = !0;
            var o = this, u = t("module");

            function c(f) {
                var p = f.constructor, d = function (h) {
                    try {
                        return f.require(h)
                    } finally {
                    }
                };
                return d.resolve = function (h, m) {
                    return p._resolveFilename(h, f, !1, m)
                }, d.resolve.paths = function (h) {
                    return p._resolveLookupPaths(h, f)
                }, d.main = process.mainModule, d.extensions = p._extensions, d.cache = p._cache, d
            }

            u.prototype._compile = function (f, p) {
                var d = u.wrap(f.replace(/^#!.*/, "")), y = r.getRecorder(), h = o._getCachedDataPath(i, p),
                    m = {filename: p}, P;
                try {
                    var I = o._fs.readFileSync(h);
                    P = I.slice(0, 16), m.cachedData = I.slice(16), y.record(60, h)
                } catch (M) {
                    y.record(61, h)
                }
                var b = new o._vm.Script(d, m), R = b.runInThisContext(m), U = o._path.dirname(p), w = c(this),
                    O = [this.exports, w, this, p, U, process, _commonjsGlobal, Buffer], C = R.apply(this.exports, O);
                return o._handleCachedData(b, d, h, !m.cachedData, r), o._verifyCachedData(b, d, h, P, r), C
            }
        }, e.prototype.load = function (t, r, i, o) {
            var u = this, c = t.getConfig().getOptionsLiteral(),
                f = _(t.getRecorder(), c.nodeRequire || l.global.nodeRequire), p = c.nodeInstrumenter || function (R) {
                    return R
                };
            this._init(f), this._initNodeRequire(f, t);
            var d = t.getRecorder();
            if (/^node\|/.test(r)) {
                var y = r.split("|"), h = null;
                try {
                    h = f(y[1])
                } catch (R) {
                    o(R);
                    return
                }
                t.enqueueDefineAnonymousModule([], function () {
                    return h
                }), i()
            } else {
                r = l.Utilities.fileUriToFilePath(this._env.isWindows, r);
                var m = this._path.normalize(r), P = this._getElectronRendererScriptPathOrUri(m),
                    I = Boolean(c.nodeCachedData), b = I ? this._getCachedDataPath(c.nodeCachedData, r) : void 0;
                this._readSourceAndCachedData(m, b, d, function (R, U, w, O) {
                    if (R) {
                        o(R);
                        return
                    }
                    var C;
                    U.charCodeAt(0) === e._BOM ? C = e._PREFIX + U.substring(1) + e._SUFFIX : C = e._PREFIX + U + e._SUFFIX, C = p(C, m);
                    var M = {filename: P, cachedData: w}, N = u._createAndEvalScript(t, C, M, i, o);
                    u._handleCachedData(N, C, b, I && !w, t), u._verifyCachedData(N, C, b, O, t)
                })
            }
        }, e.prototype._createAndEvalScript = function (t, r, i, o, u) {
            var c = t.getRecorder();
            c.record(31, i.filename);
            var f = new this._vm.Script(r, i), p = f.runInThisContext(i), d = t.getGlobalAMDDefineFunc(), y = !1,
                h = function () {
                    return y = !0, d.apply(null, arguments)
                };
            return h.amd = d.amd, p.call(l.global, t.getGlobalAMDRequireFunc(), h, i.filename, this._path.dirname(i.filename)), c.record(32, i.filename), y ? o() : u(new Error("Didn't receive define call in " + i.filename + "!")), f
        }, e.prototype._getElectronRendererScriptPathOrUri = function (t) {
            if (!this._env.isElectronRenderer) return t;
            var r = t.match(/^([a-z])\:(.*)/i);
            return r ? "file:///" + (r[1].toUpperCase() + ":" + r[2]).replace(/\\/g, "/") : "file://" + t
        }, e.prototype._getCachedDataPath = function (t, r) {
            var i = this._crypto.createHash("md5").update(r, "utf8").update(t.seed, "utf8").update(process.arch, "").digest("hex"),
                o = this._path.basename(r).replace(/\.js$/, "");
            return this._path.join(t.path, o + "-" + i + ".code")
        }, e.prototype._handleCachedData = function (t, r, i, o, u) {
            var c = this;
            t.cachedDataRejected ? this._fs.unlink(i, function (f) {
                u.getRecorder().record(62, i), c._createAndWriteCachedData(t, r, i, u), f && u.getConfig().onError(f)
            }) : o && this._createAndWriteCachedData(t, r, i, u)
        }, e.prototype._createAndWriteCachedData = function (t, r, i, o) {
            var u = this,
                c = Math.ceil(o.getConfig().getOptionsLiteral().nodeCachedData.writeDelay * (1 + Math.random())),
                f = -1, p = 0, d = void 0, y = function () {
                    setTimeout(function () {
                        d || (d = u._crypto.createHash("md5").update(r, "utf8").digest());
                        var h = t.createCachedData();
                        if (!(h.length === 0 || h.length === f || p >= 5)) {
                            if (h.length < f) {
                                y();
                                return
                            }
                            f = h.length, u._fs.writeFile(i, Buffer.concat([d, h]), function (m) {
                                m && o.getConfig().onError(m), o.getRecorder().record(63, i), y()
                            })
                        }
                    }, c * Math.pow(4, p++))
                };
            y()
        }, e.prototype._readSourceAndCachedData = function (t, r, i, o) {
            if (!r) this._fs.readFile(t, {encoding: "utf8"}, o); else {
                var u = void 0, c = void 0, f = void 0, p = 2, d = function (y) {
                    y ? o(y) : --p == 0 && o(void 0, u, c, f)
                };
                this._fs.readFile(t, {encoding: "utf8"}, function (y, h) {
                    u = h, d(y)
                }), this._fs.readFile(r, function (y, h) {
                    !y && h && h.length > 0 ? (f = h.slice(0, 16), c = h.slice(16), i.record(60, r)) : i.record(61, r), d()
                })
            }
        }, e.prototype._verifyCachedData = function (t, r, i, o, u) {
            var c = this;
            !o || t.cachedDataRejected || setTimeout(function () {
                var f = c._crypto.createHash("md5").update(r, "utf8").digest();
                o.equals(f) || (u.getConfig().onError(new Error("FAILED TO VERIFY CACHED DATA, deleting stale '" + i + "' now, but a RESTART IS REQUIRED")), c._fs.unlink(i, function (p) {
                    p && u.getConfig().onError(p)
                }))
            }, Math.ceil(5e3 * (1 + Math.random())))
        }, e._BOM = 65279, e._PREFIX = "(function (require, define, __filename, __dirname) { ", e._SUFFIX = `
});`, e
    }();

    function _(e, t) {
        if (t.__$__isRecorded) return t;
        var r = function (o) {
            e.record(33, o);
            try {
                return t(o)
            } finally {
                e.record(34, o)
            }
        };
        return r.__$__isRecorded = !0, r
    }

    l.ensureRecordedNodeRequire = _;

    function s(e) {
        return new E(e)
    }

    l.createScriptLoader = s
})(AMDLoader || (AMDLoader = {}));
var AMDLoader;
(function (l) {
    var E = function () {
        function s(e) {
            var t = e.lastIndexOf("/");
            t !== -1 ? this.fromModulePath = e.substr(0, t + 1) : this.fromModulePath = ""
        }

        return s._normalizeModuleId = function (e) {
            var t = e, r;
            for (r = /\/\.\//; r.test(t);) t = t.replace(r, "/");
            for (t = t.replace(/^\.\//g, ""), r = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//; r.test(t);) t = t.replace(r, "/");
            return t = t.replace(/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//, ""), t
        }, s.prototype.resolveModule = function (e) {
            var t = e;
            return l.Utilities.isAbsolutePath(t) || (l.Utilities.startsWith(t, "./") || l.Utilities.startsWith(t, "../")) && (t = s._normalizeModuleId(this.fromModulePath + t)), t
        }, s.ROOT = new s(""), s
    }();
    l.ModuleIdResolver = E;
    var v = function () {
        function s(e, t, r, i, o, u) {
            this.id = e, this.strId = t, this.dependencies = r, this._callback = i, this._errorback = o, this.moduleIdResolver = u, this.exports = {}, this.error = null, this.exportsPassedIn = !1, this.unresolvedDependenciesCount = this.dependencies.length, this._isComplete = !1
        }

        return s._safeInvokeFunction = function (e, t) {
            try {
                return {returnedValue: e.apply(l.global, t), producedError: null}
            } catch (r) {
                return {returnedValue: null, producedError: r}
            }
        }, s._invokeFactory = function (e, t, r, i) {
            return e.isBuild() && !l.Utilities.isAnonymousModule(t) ? {
                returnedValue: null,
                producedError: null
            } : e.shouldCatchError() ? this._safeInvokeFunction(r, i) : {
                returnedValue: r.apply(l.global, i),
                producedError: null
            }
        }, s.prototype.complete = function (e, t, r) {
            this._isComplete = !0;
            var i = null;
            if (this._callback) if (typeof this._callback == "function") {
                e.record(21, this.strId);
                var o = s._invokeFactory(t, this.strId, this._callback, r);
                i = o.producedError, e.record(22, this.strId), !i && typeof o.returnedValue != "undefined" && (!this.exportsPassedIn || l.Utilities.isEmpty(this.exports)) && (this.exports = o.returnedValue)
            } else this.exports = this._callback;
            if (i) {
                var u = l.ensureError(i);
                u.phase = "factory", u.moduleId = this.strId, this.error = u, t.onError(u)
            }
            this.dependencies = null, this._callback = null, this._errorback = null, this.moduleIdResolver = null
        }, s.prototype.onDependencyError = function (e) {
            return this._isComplete = !0, this.error = e, this._errorback ? (this._errorback(e), !0) : !1
        }, s.prototype.isComplete = function () {
            return this._isComplete
        }, s
    }();
    l.Module = v;
    var g = function () {
        function s() {
            this._nextId = 0, this._strModuleIdToIntModuleId = new Map, this._intModuleIdToStrModuleId = [], this.getModuleId("exports"), this.getModuleId("module"), this.getModuleId("require")
        }

        return s.prototype.getMaxModuleId = function () {
            return this._nextId
        }, s.prototype.getModuleId = function (e) {
            var t = this._strModuleIdToIntModuleId.get(e);
            return typeof t == "undefined" && (t = this._nextId++, this._strModuleIdToIntModuleId.set(e, t), this._intModuleIdToStrModuleId[t] = e), t
        }, s.prototype.getStrModuleId = function (e) {
            return this._intModuleIdToStrModuleId[e]
        }, s
    }(), a = function () {
        function s(e) {
            this.id = e
        }

        return s.EXPORTS = new s(0), s.MODULE = new s(1), s.REQUIRE = new s(2), s
    }();
    l.RegularDependency = a;
    var n = function () {
        function s(e, t, r) {
            this.id = e, this.pluginId = t, this.pluginParam = r
        }

        return s
    }();
    l.PluginDependency = n;
    var _ = function () {
        function s(e, t, r, i, o) {
            o === void 0 && (o = 0), this._env = e, this._scriptLoader = t, this._loaderAvailableTimestamp = o, this._defineFunc = r, this._requireFunc = i, this._moduleIdProvider = new g, this._config = new l.Configuration(this._env), this._hasDependencyCycle = !1, this._modules2 = [], this._knownModules2 = [], this._inverseDependencies2 = [], this._inversePluginDependencies2 = new Map, this._currentAnonymousDefineCall = null, this._recorder = null, this._buildInfoPath = [], this._buildInfoDefineStack = [], this._buildInfoDependencies = []
        }

        return s.prototype.reset = function () {
            return new s(this._env, this._scriptLoader, this._defineFunc, this._requireFunc, this._loaderAvailableTimestamp)
        }, s.prototype.getGlobalAMDDefineFunc = function () {
            return this._defineFunc
        }, s.prototype.getGlobalAMDRequireFunc = function () {
            return this._requireFunc
        }, s._findRelevantLocationInStack = function (e, t) {
            for (var r = function (m) {
                return m.replace(/\\/g, "/")
            }, i = r(e), o = t.split(/\n/), u = 0; u < o.length; u++) {
                var c = o[u].match(/(.*):(\d+):(\d+)\)?$/);
                if (c) {
                    var f = c[1], p = c[2], d = c[3], y = Math.max(f.lastIndexOf(" ") + 1, f.lastIndexOf("(") + 1);
                    if (f = f.substr(y), f = r(f), f === i) {
                        var h = {line: parseInt(p, 10), col: parseInt(d, 10)};
                        return h.line === 1 && (h.col -= "(function (require, define, __filename, __dirname) { ".length), h
                    }
                }
            }
            throw new Error("Could not correlate define call site for needle " + e)
        }, s.prototype.getBuildInfo = function () {
            if (!this._config.isBuild()) return null;
            for (var e = [], t = 0, r = 0, i = this._modules2.length; r < i; r++) {
                var o = this._modules2[r];
                if (!!o) {
                    var u = this._buildInfoPath[o.id] || null, c = this._buildInfoDefineStack[o.id] || null,
                        f = this._buildInfoDependencies[o.id];
                    e[t++] = {
                        id: o.strId,
                        path: u,
                        defineLocation: u && c ? s._findRelevantLocationInStack(u, c) : null,
                        dependencies: f,
                        shim: null,
                        exports: o.exports
                    }
                }
            }
            return e
        }, s.prototype.getRecorder = function () {
            return this._recorder || (this._config.shouldRecordStats() ? this._recorder = new l.LoaderEventRecorder(this._loaderAvailableTimestamp) : this._recorder = l.NullLoaderEventRecorder.INSTANCE), this._recorder
        }, s.prototype.getLoaderEvents = function () {
            return this.getRecorder().getEvents()
        }, s.prototype.enqueueDefineAnonymousModule = function (e, t) {
            if (this._currentAnonymousDefineCall !== null) throw new Error("Can only have one anonymous define call per script file");
            var r = null;
            this._config.isBuild() && (r = new Error("StackLocation").stack || null), this._currentAnonymousDefineCall = {
                stack: r,
                dependencies: e,
                callback: t
            }
        }, s.prototype.defineModule = function (e, t, r, i, o, u) {
            var c = this;
            u === void 0 && (u = new E(e));
            var f = this._moduleIdProvider.getModuleId(e);
            if (this._modules2[f]) {
                this._config.isDuplicateMessageIgnoredFor(e) || console.warn("Duplicate definition of module '" + e + "'");
                return
            }
            var p = new v(f, e, this._normalizeDependencies(t, u), r, i, u);
            this._modules2[f] = p, this._config.isBuild() && (this._buildInfoDefineStack[f] = o, this._buildInfoDependencies[f] = (p.dependencies || []).map(function (d) {
                return c._moduleIdProvider.getStrModuleId(d.id)
            })), this._resolve(p)
        }, s.prototype._normalizeDependency = function (e, t) {
            if (e === "exports") return a.EXPORTS;
            if (e === "module") return a.MODULE;
            if (e === "require") return a.REQUIRE;
            var r = e.indexOf("!");
            if (r >= 0) {
                var i = t.resolveModule(e.substr(0, r)), o = t.resolveModule(e.substr(r + 1)),
                    u = this._moduleIdProvider.getModuleId(i + "!" + o), c = this._moduleIdProvider.getModuleId(i);
                return new n(u, c, o)
            }
            return new a(this._moduleIdProvider.getModuleId(t.resolveModule(e)))
        }, s.prototype._normalizeDependencies = function (e, t) {
            for (var r = [], i = 0, o = 0, u = e.length; o < u; o++) r[i++] = this._normalizeDependency(e[o], t);
            return r
        }, s.prototype._relativeRequire = function (e, t, r, i) {
            if (typeof t == "string") return this.synchronousRequire(t, e);
            this.defineModule(l.Utilities.generateAnonymousModule(), t, r, i, null, e)
        }, s.prototype.synchronousRequire = function (e, t) {
            t === void 0 && (t = new E(e));
            var r = this._normalizeDependency(e, t), i = this._modules2[r.id];
            if (!i) throw new Error("Check dependency list! Synchronous require cannot resolve module '" + e + "'. This is the first mention of this module!");
            if (!i.isComplete()) throw new Error("Check dependency list! Synchronous require cannot resolve module '" + e + "'. This module has not been resolved completely yet.");
            if (i.error) throw i.error;
            return i.exports
        }, s.prototype.configure = function (e, t) {
            var r = this._config.shouldRecordStats();
            t ? this._config = new l.Configuration(this._env, e) : this._config = this._config.cloneAndMerge(e), this._config.shouldRecordStats() && !r && (this._recorder = null)
        }, s.prototype.getConfig = function () {
            return this._config
        }, s.prototype._onLoad = function (e) {
            if (this._currentAnonymousDefineCall !== null) {
                var t = this._currentAnonymousDefineCall;
                this._currentAnonymousDefineCall = null, this.defineModule(this._moduleIdProvider.getStrModuleId(e), t.dependencies, t.callback, null, t.stack)
            }
        }, s.prototype._createLoadError = function (e, t) {
            var r = this, i = this._moduleIdProvider.getStrModuleId(e),
                o = (this._inverseDependencies2[e] || []).map(function (c) {
                    return r._moduleIdProvider.getStrModuleId(c)
                }), u = l.ensureError(t);
            return u.phase = "loading", u.moduleId = i, u.neededBy = o, u
        }, s.prototype._onLoadError = function (e, t) {
            var r = this._createLoadError(e, t);
            this._modules2[e] || (this._modules2[e] = new v(e, this._moduleIdProvider.getStrModuleId(e), [], function () {
            }, null, null));
            for (var i = [], o = 0, u = this._moduleIdProvider.getMaxModuleId(); o < u; o++) i[o] = !1;
            var c = !1, f = [];
            for (f.push(e), i[e] = !0; f.length > 0;) {
                var p = f.shift(), d = this._modules2[p];
                d && (c = d.onDependencyError(r) || c);
                var y = this._inverseDependencies2[p];
                if (y) for (var o = 0, u = y.length; o < u; o++) {
                    var h = y[o];
                    i[h] || (f.push(h), i[h] = !0)
                }
            }
            c || this._config.onError(r)
        }, s.prototype._hasDependencyPath = function (e, t) {
            var r = this._modules2[e];
            if (!r) return !1;
            for (var i = [], o = 0, u = this._moduleIdProvider.getMaxModuleId(); o < u; o++) i[o] = !1;
            var c = [];
            for (c.push(r), i[e] = !0; c.length > 0;) {
                var f = c.shift(), p = f.dependencies;
                if (p) for (var o = 0, u = p.length; o < u; o++) {
                    var d = p[o];
                    if (d.id === t) return !0;
                    var y = this._modules2[d.id];
                    y && !i[d.id] && (i[d.id] = !0, c.push(y))
                }
            }
            return !1
        }, s.prototype._findCyclePath = function (e, t, r) {
            if (e === t || r === 50) return [e];
            var i = this._modules2[e];
            if (!i) return null;
            var o = i.dependencies;
            if (o) for (var u = 0, c = o.length; u < c; u++) {
                var f = this._findCyclePath(o[u].id, t, r + 1);
                if (f !== null) return f.push(e), f
            }
            return null
        }, s.prototype._createRequire = function (e) {
            var t = this, r = function (i, o, u) {
                return t._relativeRequire(e, i, o, u)
            };
            return r.toUrl = function (i) {
                return t._config.requireToUrl(e.resolveModule(i))
            }, r.getStats = function () {
                return t.getLoaderEvents()
            }, r.hasDependencyCycle = function () {
                return t._hasDependencyCycle
            }, r.config = function (i, o) {
                o === void 0 && (o = !1), t.configure(i, o)
            }, r.__$__nodeRequire = l.global.nodeRequire, r
        }, s.prototype._loadModule = function (e) {
            var t = this;
            if (!(this._modules2[e] || this._knownModules2[e])) {
                this._knownModules2[e] = !0;
                var r = this._moduleIdProvider.getStrModuleId(e), i = this._config.moduleIdToPaths(r),
                    o = /^@[^\/]+\/[^\/]+$/;
                this._env.isNode && (r.indexOf("/") === -1 || o.test(r)) && i.push("node|" + r);
                var u = -1, c = function (f) {
                    if (u++, u >= i.length) t._onLoadError(e, f); else {
                        var p = i[u], d = t.getRecorder();
                        if (t._config.isBuild() && p === "empty:") {
                            t._buildInfoPath[e] = p, t.defineModule(t._moduleIdProvider.getStrModuleId(e), [], null, null, null), t._onLoad(e);
                            return
                        }
                        d.record(10, p), t._scriptLoader.load(t, p, function () {
                            t._config.isBuild() && (t._buildInfoPath[e] = p), d.record(11, p), t._onLoad(e)
                        }, function (y) {
                            d.record(12, p), c(y)
                        })
                    }
                };
                c(null)
            }
        }, s.prototype._loadPluginDependency = function (e, t) {
            var r = this;
            if (!(this._modules2[t.id] || this._knownModules2[t.id])) {
                this._knownModules2[t.id] = !0;
                var i = function (o) {
                    r.defineModule(r._moduleIdProvider.getStrModuleId(t.id), [], o, null, null)
                };
                i.error = function (o) {
                    r._config.onError(r._createLoadError(t.id, o))
                }, e.load(t.pluginParam, this._createRequire(E.ROOT), i, this._config.getOptionsLiteral())
            }
        }, s.prototype._resolve = function (e) {
            var t = this, r = e.dependencies;
            if (r) for (var i = 0, o = r.length; i < o; i++) {
                var u = r[i];
                if (u === a.EXPORTS) {
                    e.exportsPassedIn = !0, e.unresolvedDependenciesCount--;
                    continue
                }
                if (u === a.MODULE) {
                    e.unresolvedDependenciesCount--;
                    continue
                }
                if (u === a.REQUIRE) {
                    e.unresolvedDependenciesCount--;
                    continue
                }
                var c = this._modules2[u.id];
                if (c && c.isComplete()) {
                    if (c.error) {
                        e.onDependencyError(c.error);
                        return
                    }
                    e.unresolvedDependenciesCount--;
                    continue
                }
                if (this._hasDependencyPath(u.id, e.id)) {
                    this._hasDependencyCycle = !0, console.warn("There is a dependency cycle between '" + this._moduleIdProvider.getStrModuleId(u.id) + "' and '" + this._moduleIdProvider.getStrModuleId(e.id) + "'. The cyclic path follows:");
                    var f = this._findCyclePath(u.id, e.id, 0) || [];
                    f.reverse(), f.push(u.id), console.warn(f.map(function (y) {
                        return t._moduleIdProvider.getStrModuleId(y)
                    }).join(` => 
`)), e.unresolvedDependenciesCount--;
                    continue
                }
                if (this._inverseDependencies2[u.id] = this._inverseDependencies2[u.id] || [], this._inverseDependencies2[u.id].push(e.id), u instanceof n) {
                    var p = this._modules2[u.pluginId];
                    if (p && p.isComplete()) {
                        this._loadPluginDependency(p.exports, u);
                        continue
                    }
                    var d = this._inversePluginDependencies2.get(u.pluginId);
                    d || (d = [], this._inversePluginDependencies2.set(u.pluginId, d)), d.push(u), this._loadModule(u.pluginId);
                    continue
                }
                this._loadModule(u.id)
            }
            e.unresolvedDependenciesCount === 0 && this._onModuleComplete(e)
        }, s.prototype._onModuleComplete = function (e) {
            var t = this, r = this.getRecorder();
            if (!e.isComplete()) {
                var i = e.dependencies, o = [];
                if (i) for (var u = 0, c = i.length; u < c; u++) {
                    var f = i[u];
                    if (f === a.EXPORTS) {
                        o[u] = e.exports;
                        continue
                    }
                    if (f === a.MODULE) {
                        o[u] = {
                            id: e.strId, config: function () {
                                return t._config.getConfigForModule(e.strId)
                            }
                        };
                        continue
                    }
                    if (f === a.REQUIRE) {
                        o[u] = this._createRequire(e.moduleIdResolver);
                        continue
                    }
                    var p = this._modules2[f.id];
                    if (p) {
                        o[u] = p.exports;
                        continue
                    }
                    o[u] = null
                }
                e.complete(r, this._config, o);
                var d = this._inverseDependencies2[e.id];
                if (this._inverseDependencies2[e.id] = null, d) for (var u = 0, c = d.length; u < c; u++) {
                    var y = d[u], h = this._modules2[y];
                    h.unresolvedDependenciesCount--, h.unresolvedDependenciesCount === 0 && this._onModuleComplete(h)
                }
                var m = this._inversePluginDependencies2.get(e.id);
                if (m) {
                    this._inversePluginDependencies2.delete(e.id);
                    for (var u = 0, c = m.length; u < c; u++) this._loadPluginDependency(e.exports, m[u])
                }
            }
        }, s
    }();
    l.ModuleManager = _
})(AMDLoader || (AMDLoader = {}));
var define, AMDLoader;
(function (l) {
    var E = new l.Environment, v = null, g = function (s, e, t) {
        typeof s != "string" && (t = e, e = s, s = null), (typeof e != "object" || !Array.isArray(e)) && (t = e, e = null), e || (e = ["require", "exports", "module"]), s ? v.defineModule(s, e, t, null, null) : v.enqueueDefineAnonymousModule(e, t)
    };
    g.amd = {jQuery: !0};
    var a = function (s, e) {
        e === void 0 && (e = !1), v.configure(s, e)
    }, n = function () {
        if (arguments.length === 1) {
            if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
                a(arguments[0]);
                return
            }
            if (typeof arguments[0] == "string") return v.synchronousRequire(arguments[0])
        }
        if ((arguments.length === 2 || arguments.length === 3) && Array.isArray(arguments[0])) {
            v.defineModule(l.Utilities.generateAnonymousModule(), arguments[0], arguments[1], arguments[2], null);
            return
        }
        throw new Error("Unrecognized require call")
    };
    n.config = a, n.getConfig = function () {
        return v.getConfig().getOptionsLiteral()
    }, n.reset = function () {
        v = v.reset()
    }, n.getBuildInfo = function () {
        return v.getBuildInfo()
    }, n.getStats = function () {
        return v.getLoaderEvents()
    }, n.define = g;

    function _() {
        if (typeof l.global.require != "undefined" || typeof require != "undefined") {
            var s = l.global.require || require;
            if (typeof s == "function" && typeof s.resolve == "function") {
                var e = l.ensureRecordedNodeRequire(v.getRecorder(), s);
                l.global.nodeRequire = e, n.nodeRequire = e, n.__$__nodeRequire = e
            }
        }
        E.isNode && !E.isElectronRenderer && !E.isElectronNodeIntegrationWebWorker ? (module.exports = n, require = n) : (E.isElectronRenderer || (l.global.define = g), l.global.require = n)
    }

    l.init = _, (typeof l.global.define != "function" || !l.global.define.amd) && (v = new l.ModuleManager(E, l.createScriptLoader(E), g, n, l.Utilities.getHighPerformanceTimestamp()), typeof l.global.require != "undefined" && typeof l.global.require != "function" && n.config(l.global.require), define = function () {
        return g.apply(null, arguments)
    }, define.amd = g.amd, typeof doNotInitLoader == "undefined" && _())
})(AMDLoader || (AMDLoader = {}));

//# sourceMappingURL=./thirds/monaco-editor/min-maps/vs/loader.js.map