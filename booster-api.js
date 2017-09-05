/*! BoosterSDK@3.17.15 2017-08-08 */
(function() {
    var requirejs, require, define;
    (function(global) {
        function isFunction(e) {
            return ostring.call(e) === "[object Function]"
        }

        function isArray(e) {
            return ostring.call(e) === "[object Array]"
        }

        function each(e, t) {
            if (e) {
                var n;
                for (n = 0; n < e.length; n += 1)
                    if (e[n] && t(e[n], n, e)) break
            }
        }

        function eachReverse(e, t) {
            if (e) {
                var n;
                for (n = e.length - 1; n > -1; n -= 1)
                    if (e[n] && t(e[n], n, e)) break
            }
        }

        function hasProp(e, t) {
            return hasOwn.call(e, t)
        }

        function getOwn(e, t) {
            return hasProp(e, t) && e[t]
        }

        function eachProp(e, t) {
            var n;
            for (n in e)
                if (hasProp(e, n) && t(e[n], n)) break
        }

        function mixin(e, t, n, r) {
            return t && eachProp(t, function(t, i) {
                if (n || !hasProp(e, i)) r && typeof t != "string" ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
            }), e
        }

        function bind(e, t) {
            return function() {
                return t.apply(e, arguments)
            }
        }

        function scripts() {
            return document.getElementsByTagName("script")
        }

        function defaultOnError(e) {
            throw e
        }

        function getGlobal(e) {
            if (!e) return e;
            var t = global;
            return each(e.split("."), function(e) {
                t = t[e]
            }), t
        }

        function makeError(e, t, n, r) {
            var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
            return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
        }

        function newContext(e) {
            function v(e) {
                var t, n;
                for (t = 0; e[t]; t += 1) {
                    n = e[t];
                    if (n === ".") e.splice(t, 1), t -= 1;
                    else if (n === "..") {
                        if (t === 1 && (e[2] === ".." || e[0] === "..")) break;
                        t > 0 && (e.splice(t - 1, 2), t -= 2)
                    }
                }
            }

            function m(e, t, n) {
                var r, i, s, u, a, f, l, c, h, p, d, m = t && t.split("/"),
                    g = m,
                    y = o.map,
                    b = y && y["*"];
                e && e.charAt(0) === "." && (t ? (getOwn(o.pkgs, t) ? g = m = [t] : g = m.slice(0, m.length - 1), e = g.concat(e.split("/")), v(e), i = getOwn(o.pkgs, r = e[0]), e = e.join("/"), i && e === r + "/" + i.main && (e = r)) : e.indexOf("./") === 0 && (e = e.substring(2)));
                if (n && y && (m || b)) {
                    u = e.split("/");
                    for (a = u.length; a > 0; a -= 1) {
                        l = u.slice(0, a).join("/");
                        if (m)
                            for (f = m.length; f > 0; f -= 1) {
                                s = getOwn(y, m.slice(0, f).join("/"));
                                if (s) {
                                    s = getOwn(s, l);
                                    if (s) {
                                        c = s, h = a;
                                        break
                                    }
                                }
                            }
                        if (c) break;
                        !p && b && getOwn(b, l) && (p = getOwn(b, l), d = a)
                    }!c && p && (c = p, h = d), c && (u.splice(0, h, c), e = u.join("/"))
                }
                return e
            }

            function g(e) {
                isBrowser && each(scripts(), function(t) {
                    if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName) return t.parentNode.removeChild(t), !0
                })
            }

            function y(e) {
                var t = getOwn(o.paths, e);
                if (t && isArray(t) && t.length > 1) return t.shift(), r.require.undef(e), r.require([e]), !0
            }

            function b(e) {
                var t, n = e ? e.indexOf("!") : -1;
                return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
            }

            function w(e, t, n, i) {
                var s, o, u, a, f = null,
                    l = t ? t.name : null,
                    h = e,
                    v = !0,
                    g = "";
                return e || (v = !1, e = "_@r" + (p += 1)), a = b(e), f = a[0], e = a[1], f && (f = m(f, l, i), o = getOwn(c, f)), e && (f ? o && o.normalize ? g = o.normalize(e, function(e) {
                    return m(e, l, i)
                }) : g = m(e, l, i) : (g = m(e, l, i), a = b(g), f = a[0], g = a[1], n = !0, s = r.nameToUrl(g))), u = f && !o && !n ? "_unnormalized" + (d += 1) : "", {
                    prefix: f,
                    name: g,
                    parentMap: t,
                    unnormalized: !!u,
                    url: s,
                    originalName: h,
                    isDefine: v,
                    id: (f ? f + "!" + g : g) + u
                }
            }

            function E(e) {
                var t = e.id,
                    n = getOwn(u, t);
                return n || (n = u[t] = new r.Module(e)), n
            }

            function S(e, t, n) {
                var r = e.id,
                    i = getOwn(u, r);
                hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : (i = E(e), i.error && t === "error" ? n(i.error) : i.on(t, n))
            }

            function x(e, t) {
                var n = e.requireModules,
                    r = !1;
                t ? t(e) : (each(n, function(t) {
                    var n = getOwn(u, t);
                    n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
                }), r || req.onError(e))
            }

            function T() {
                globalDefQueue.length && (apsp.apply(l, [l.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
            }

            function N(e) {
                delete u[e], delete a[e]
            }

            function C(e, t, n) {
                var r = e.map.id;
                e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, i) {
                    var s = r.id,
                        o = getOwn(u, s);
                    o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : C(o, t, n))
                }), n[r] = !0)
            }

            function k() {
                var e, n, i, u, f = o.waitSeconds * 1e3,
                    l = f && r.startTime + f < (new Date).getTime(),
                    c = [],
                    h = [],
                    p = !1,
                    d = !0;
                if (t) return;
                t = !0, eachProp(a, function(t) {
                    e = t.map, n = e.id;
                    if (!t.enabled) return;
                    e.isDefine || h.push(t);
                    if (!t.error)
                        if (!t.inited && l) y(n) ? (u = !0, p = !0) : (c.push(n), g(n));
                        else if (!t.inited && t.fetched && e.isDefine) {
                        p = !0;
                        if (!e.prefix) return d = !1
                    }
                });
                if (l && c.length) return i = makeError("timeout", "Load timeout for modules: " + c, null, c), i.contextName = r.contextName, x(i);
                d && each(h, function(e) {
                    C(e, {}, {})
                }), (!l || u) && p && (isBrowser || isWebWorker) && !s && (s = setTimeout(function() {
                    s = 0, k()
                }, 50)), t = !1
            }

            function L(e) {
                hasProp(c, e[0]) || E(w(e[0], null, !0)).init(e[1], e[2])
            }

            function A(e, t, n, r) {
                e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
            }

            function O(e) {
                var t = e.currentTarget || e.srcElement;
                return A(t, r.onScriptLoad, "load", "onreadystatechange"), A(t, r.onScriptError, "error"), {
                    node: t,
                    id: t && t.getAttribute("data-requiremodule")
                }
            }

            function M() {
                var e;
                T();
                while (l.length) {
                    e = l.shift();
                    if (e[0] === null) return x(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                    L(e)
                }
            }
            var t, n, r, i, s, o = {
                    waitSeconds: 7,
                    baseUrl: "./",
                    paths: {},
                    pkgs: {},
                    shim: {},
                    config: {}
                },
                u = {},
                a = {},
                f = {},
                l = [],
                c = {},
                h = {},
                p = 1,
                d = 1;
            return i = {
                require: function(e) {
                    return e.require ? e.require : e.require = r.makeRequire(e.map)
                },
                exports: function(e) {
                    e.usingExports = !0;
                    if (e.map.isDefine) return e.exports ? e.exports : e.exports = c[e.map.id] = {}
                },
                module: function(e) {
                    return e.module ? e.module : e.module = {
                        id: e.map.id,
                        uri: e.map.url,
                        config: function() {
                            var t, n = getOwn(o.pkgs, e.map.id);
                            return t = n ? getOwn(o.config, e.map.id + "/" + n.main) : getOwn(o.config, e.map.id), t || {}
                        },
                        exports: c[e.map.id]
                    }
                }
            }, n = function(e) {
                this.events = getOwn(f, e.id) || {}, this.map = e, this.shim = getOwn(o.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
            }, n.prototype = {
                init: function(e, t, n, r) {
                    r = r || {};
                    if (this.inited) return;
                    this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                        this.emit("error", e)
                    })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
                },
                defineDep: function(e, t) {
                    this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
                },
                fetch: function() {
                    if (this.fetched) return;
                    this.fetched = !0, r.startTime = (new Date).getTime();
                    var e = this.map;
                    if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                    r.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    }))
                },
                load: function() {
                    var e = this.map.url;
                    h[e] || (h[e] = !0, r.load(this.map.id, e))
                },
                check: function() {
                    if (!this.enabled || this.enabling) return;
                    var e, t, n = this.map.id,
                        i = this.depExports,
                        s = this.exports,
                        o = this.factory;
                    if (!this.inited) this.fetch();
                    else if (this.error) this.emit("error", this.error);
                    else if (!this.defining) {
                        this.defining = !0;
                        if (this.depCount < 1 && !this.defined) {
                            if (isFunction(o)) {
                                if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                    s = r.execCb(n, o, i, s)
                                } catch (u) {
                                    e = u
                                } else s = r.execCb(n, o, i, s);
                                this.map.isDefine && (t = this.module, t && t.exports !== undefined && t.exports !== this.exports ? s = t.exports : s === undefined && this.usingExports && (s = this.exports));
                                if (e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", x(this.error = e)
                            } else s = o;
                            this.exports = s, this.map.isDefine && !this.ignore && (c[n] = s, req.onResourceLoad && req.onResourceLoad(r, this.map, this.depMaps)), N(n), this.defined = !0
                        }
                        this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                    }
                },
                callPlugin: function() {
                    var e = this.map,
                        t = e.id,
                        n = w(e.prefix);
                    this.depMaps.push(n), S(n, "defined", bind(this, function(n) {
                        var i, s, a, f = this.map.name,
                            l = this.map.parentMap ? this.map.parentMap.name : null,
                            c = r.makeRequire(e.parentMap, {
                                enableBuildCallback: !0
                            });
                        if (this.map.unnormalized) {
                            n.normalize && (f = n.normalize(f, function(e) {
                                return m(e, l, !0)
                            }) || ""), s = w(e.prefix + "!" + f, this.map.parentMap), S(s, "defined", bind(this, function(e) {
                                this.init([], function() {
                                    return e
                                }, null, {
                                    enabled: !0,
                                    ignore: !0
                                })
                            })), a = getOwn(u, s.id), a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this, function(e) {
                                this.emit("error", e)
                            })), a.enable());
                            return
                        }
                        i = bind(this, function(e) {
                            this.init([], function() {
                                return e
                            }, null, {
                                enabled: !0
                            })
                        }), i.error = bind(this, function(e) {
                            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(u, function(e) {
                                e.map.id.indexOf(t + "_unnormalized") === 0 && N(e.map.id)
                            }), x(e)
                        }), i.fromText = bind(this, function(n, s) {
                            var u = e.name,
                                a = w(u),
                                f = useInteractive;
                            s && (n = s), f && (useInteractive = !1), E(a), hasProp(o.config, t) && (o.config[u] = o.config[t]);
                            try {
                                req.exec(n)
                            } catch (l) {
                                return x(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
                            }
                            f && (useInteractive = !0), this.depMaps.push(a), r.completeLoad(u), c([u], i)
                        }), n.load(e.name, c, i, o)
                    })), r.enable(n, this), this.pluginMaps[n.id] = n
                },
                enable: function() {
                    a[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                        var n, s, o;
                        if (typeof e == "string") {
                            e = w(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(i, e.id);
                            if (o) {
                                this.depExports[t] = o(this);
                                return
                            }
                            this.depCount += 1, S(e, "defined", bind(this, function(e) {
                                this.defineDep(t, e), this.check()
                            })), this.errback && S(e, "error", bind(this, this.errback))
                        }
                        n = e.id, s = u[n], !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
                    })), eachProp(this.pluginMaps, bind(this, function(e) {
                        var t = getOwn(u, e.id);
                        t && !t.enabled && r.enable(e, this)
                    })), this.enabling = !1, this.check()
                },
                on: function(e, t) {
                    var n = this.events[e];
                    n || (n = this.events[e] = []), n.push(t)
                },
                emit: function(e, t) {
                    each(this.events[e], function(e) {
                        e(t)
                    }), e === "error" && delete this.events[e]
                }
            }, r = {
                config: o,
                contextName: e,
                registry: u,
                defined: c,
                urlFetched: h,
                defQueue: l,
                Module: n,
                makeModuleMap: w,
                nextTick: req.nextTick,
                onError: x,
                configure: function(e) {
                    e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                    var t = o.pkgs,
                        n = o.shim,
                        i = {
                            paths: !0,
                            config: !0,
                            map: !0
                        };
                    eachProp(e, function(e, t) {
                        i[t] ? t === "map" ? (o.map || (o.map = {}), mixin(o[t], e, !0, !0)) : mixin(o[t], e, !0) : o[t] = e
                    }), e.shim && (eachProp(e.shim, function(e, t) {
                        isArray(e) && (e = {
                            deps: e
                        }), (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)), n[t] = e
                    }), o.shim = n), e.packages && (each(e.packages, function(e) {
                        var n;
                        e = typeof e == "string" ? {
                            name: e
                        } : e, n = e.location, t[e.name] = {
                            name: e.name,
                            location: n || e.name,
                            main: (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                        }
                    }), o.pkgs = t), eachProp(u, function(e, t) {
                        !e.inited && !e.map.unnormalized && (e.map = w(t))
                    }), (e.deps || e.callback) && r.require(e.deps || [], e.callback)
                },
                makeShimExports: function(e) {
                    function t() {
                        var t;
                        return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                    }
                    return t
                },
                makeRequire: function(t, n) {
                    function s(o, a, f) {
                        var l, h, p;
                        return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0), typeof o == "string" ? isFunction(a) ? x(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = w(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : x(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (M(), r.nextTick(function() {
                            M(), p = E(w(null, t)), p.skipMap = n.skipMap, p.init(o, a, f, {
                                enabled: !0
                            }), k()
                        }), s)
                    }
                    return n = n || {}, mixin(s, {
                        isBrowser: isBrowser,
                        toUrl: function(e) {
                            var n, i = e.lastIndexOf("."),
                                s = e.split("/")[0],
                                o = s === "." || s === "..";
                            return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(m(e, t && t.id, !0), n, !0)
                        },
                        defined: function(e) {
                            return hasProp(c, w(e, t, !1, !0).id)
                        },
                        specified: function(e) {
                            return e = w(e, t, !1, !0).id, hasProp(c, e) || hasProp(u, e)
                        }
                    }), t || (s.undef = function(e) {
                        T();
                        var n = w(e, t, !0),
                            r = getOwn(u, e);
                        g(e), delete c[e], delete h[n.url], delete f[e], r && (r.events.defined && (f[e] = r.events), N(e))
                    }), s
                },
                enable: function(e) {
                    var t = getOwn(u, e.id);
                    t && E(e).enable()
                },
                completeLoad: function(e) {
                    var t, n, r, i = getOwn(o.shim, e) || {},
                        s = i.exports;
                    T();
                    while (l.length) {
                        n = l.shift();
                        if (n[0] === null) {
                            n[0] = e;
                            if (t) break;
                            t = !0
                        } else n[0] === e && (t = !0);
                        L(n)
                    }
                    r = getOwn(u, e);
                    if (!t && !hasProp(c, e) && r && !r.inited) {
                        if (o.enforceDefine && (!s || !getGlobal(s))) {
                            if (y(e)) return;
                            return x(makeError("nodefine", "No define call for " + e, null, [e]))
                        }
                        L([e, i.deps || [], i.exportsFn])
                    }
                    k()
                },
                nameToUrl: function(e, t, n) {
                    var r, i, s, u, a, f, l, c, h;
                    if (req.jsExtRegExp.test(e)) c = e + (t || "");
                    else {
                        r = o.paths, i = o.pkgs, a = e.split("/");
                        for (f = a.length; f > 0; f -= 1) {
                            l = a.slice(0, f).join("/"), s = getOwn(i, l), h = getOwn(r, l);
                            if (h) {
                                isArray(h) && (h = h[0]), a.splice(0, f, h);
                                break
                            }
                            if (s) {
                                e === s.name ? u = s.location + "/" + s.main : u = s.location, a.splice(0, f, u);
                                break
                            }
                        }
                        c = a.join("/"), c += t || (/^data\:|\?/.test(c) || n ? "" : ".js"), c = (c.charAt(0) === "/" || c.match(/^[\w\+\.\-]+:/) ? "" : o.baseUrl) + c
                    }
                    return o.urlArgs ? c + ((c.indexOf("?") === -1 ? "?" : "&") + o.urlArgs) : c
                },
                load: function(e, t) {
                    req.load(r, e, t)
                },
                execCb: function(e, t, n, r) {
                    return t.apply(r, n)
                },
                onScriptLoad: function(e) {
                    if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                        interactiveScript = null;
                        var t = O(e);
                        r.completeLoad(t.id)
                    }
                },
                onScriptError: function(e) {
                    var t = O(e);
                    if (!y(t.id)) return x(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
                }
            }, r.require = r.makeRequire(), r
        }

        function getInteractiveScript() {
            return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function(e) {
                if (e.readyState === "interactive") return interactiveScript = e
            }), interactiveScript)
        }
        var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.9",
            commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
            jsSuffixRegExp = /\.js$/,
            currDirRegExp = /^\.\//,
            op = Object.prototype,
            ostring = op.toString,
            hasOwn = op.hasOwnProperty,
            ap = Array.prototype,
            apsp = ap.splice,
            isBrowser = typeof window != "undefined" && typeof navigator != "undefined" && !!window.document,
            isWebWorker = !isBrowser && typeof importScripts != "undefined",
            readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
            defContextName = "_",
            isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
            contexts = {},
            cfg = {},
            globalDefQueue = [],
            useInteractive = !1;
        if (typeof define != "undefined") return;
        if (typeof requirejs != "undefined") {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = undefined
        }
        typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function(e, t, n, r) {
            var i, s, o = defContextName;
            return !isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []), s && s.context && (o = s.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), s && i.configure(s), i.require(e, t, n)
        }, req.config = function(e) {
            return req(e)
        }, req.nextTick = typeof setTimeout != "undefined" ? function(e) {
            setTimeout(e, 4)
        } : function(e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
            req[e] = function() {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, n) {
            var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
        }, req.load = function(e, t, n) {
            var r = e && e.config || {},
                i;
            if (isBrowser) return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
            if (isWebWorker) try {
                importScripts(n), e.completeLoad(t)
            } catch (s) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
            head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
            if (dataMain) return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function(e, t, n) {
            var r, i;
            typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
                t.push(n)
            }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    })(this), define("../lib/require.js", function() {});
    var Zepto = function() {
        function _(e) {
            return e == null ? String(e) : N[C.call(e)] || "object"
        }

        function D(e) {
            return _(e) == "function"
        }

        function P(e) {
            return e != null && e == e.window
        }

        function H(e) {
            return e != null && e.nodeType == e.DOCUMENT_NODE
        }

        function B(e) {
            return _(e) == "object"
        }

        function j(e) {
            return B(e) && !P(e) && Object.getPrototypeOf(e) == Object.prototype
        }

        function F(e) {
            return e instanceof Array
        }

        function I(e) {
            return typeof e.length == "number"
        }

        function q(e) {
            return o.call(e, function(e) {
                return e != null
            })
        }

        function R(e) {
            return e.length > 0 ? n.fn.concat.apply([], e) : e
        }

        function U(e) {
            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }

        function z(e) {
            return e in f ? f[e] : f[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
        }

        function W(e, t) {
            return typeof t == "number" && !l[U(e)] ? t + "px" : t
        }

        function X(e) {
            var t, n;
            return a[e] || (t = u.createElement(e), u.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), a[e] = n), a[e]
        }

        function V(e) {
            return "children" in e ? s.call(e.children) : n.map(e.childNodes, function(e) {
                if (e.nodeType == 1) return e
            })
        }

        function $(n, r, i) {
            for (t in r) i && (j(r[t]) || F(r[t])) ? (j(r[t]) && !j(n[t]) && (n[t] = {}), F(r[t]) && !F(n[t]) && (n[t] = []), $(n[t], r[t], i)) : r[t] !== e && (n[t] = r[t])
        }

        function J(e, t) {
            return t == null ? n(e) : n(e).filter(t)
        }

        function K(e, t, n, r) {
            return D(t) ? t.call(e, n, r) : t
        }

        function Q(e, t, n) {
            n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
        }

        function G(t, n) {
            var r = t.className,
                i = r && r.baseVal !== e;
            if (n === e) return i ? r.baseVal : r;
            i ? r.baseVal = n : t.className = n
        }

        function Y(e) {
            var t;
            try {
                return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : !/^0/.test(e) && !isNaN(t = Number(e)) ? t : /^[\[\{]/.test(e) ? n.parseJSON(e) : e) : e
            } catch (r) {
                return e
            }
        }

        function Z(e, t) {
            t(e);
            for (var n in e.childNodes) Z(e.childNodes[n], t)
        }
        var e, t, n, r, i = [],
            s = i.slice,
            o = i.filter,
            u = window.document,
            a = {},
            f = {},
            l = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            },
            c = /^\s*<(\w+|!)[^>]*>/,
            h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            d = /^(?:body|html)$/i,
            v = /([A-Z])/g,
            m = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            g = ["after", "prepend", "before", "append"],
            y = u.createElement("table"),
            b = u.createElement("tr"),
            w = {
                tr: u.createElement("tbody"),
                tbody: y,
                thead: y,
                tfoot: y,
                td: b,
                th: b,
                "*": u.createElement("div")
            },
            E = /complete|loaded|interactive/,
            S = /^\.([\w-]+)$/,
            x = /^#([\w-]*)$/,
            T = /^[\w-]*$/,
            N = {},
            C = N.toString,
            k = {},
            L, A, O = u.createElement("div"),
            M = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            };
        return k.matches = function(e, t) {
            if (!t || !e || e.nodeType !== 1) return !1;
            var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
            if (n) return n.call(e, t);
            var r, i = e.parentNode,
                s = !i;
            return s && (i = O).appendChild(e), r = ~k.qsa(i, t).indexOf(e), s && O.removeChild(e), r
        }, L = function(e) {
            return e.replace(/-+(.)?/g, function(e, t) {
                return t ? t.toUpperCase() : ""
            })
        }, A = function(e) {
            return o.call(e, function(t, n) {
                return e.indexOf(t) == n
            })
        }, k.fragment = function(t, r, i) {
            var o, a, f;
            return h.test(t) && (o = n(u.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(p, "<$1></$2>")), r === e && (r = c.test(t) && RegExp.$1), r in w || (r = "*"), f = w[r], f.innerHTML = "" + t, o = n.each(s.call(f.childNodes), function() {
                f.removeChild(this)
            })), j(i) && (a = n(o), n.each(i, function(e, t) {
                m.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
            })), o
        }, k.Z = function(e, t) {
            return e = e || [], e.__proto__ = n.fn, e.selector = t || "", e
        }, k.isZ = function(e) {
            return e instanceof k.Z
        }, k.init = function(t, r) {
            var i;
            if (!t) return k.Z();
            if (typeof t == "string") {
                t = t.trim();
                if (t[0] == "<" && c.test(t)) i = k.fragment(t, RegExp.$1, r), t = null;
                else {
                    if (r !== e) return n(r).find(t);
                    i = k.qsa(u, t)
                }
            } else {
                if (D(t)) return n(u).ready(t);
                if (k.isZ(t)) return t;
                if (F(t)) i = q(t);
                else if (B(t)) i = [t], t = null;
                else if (c.test(t)) i = k.fragment(t.trim(), RegExp.$1, r), t = null;
                else {
                    if (r !== e) return n(r).find(t);
                    i = k.qsa(u, t)
                }
            }
            return k.Z(i, t)
        }, n = function(e, t) {
            return k.init(e, t)
        }, n.extend = function(e) {
            var t, n = s.call(arguments, 1);
            return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function(n) {
                $(e, n, t)
            }), e
        }, k.qsa = function(e, t) {
            var n, r = t[0] == "#",
                i = !r && t[0] == ".",
                o = r || i ? t.slice(1) : t,
                u = T.test(o);
            return H(e) && u && r ? (n = e.getElementById(o)) ? [n] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : s.call(u && !r ? i ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t))
        }, n.contains = function(e, t) {
            return e !== t && e.contains(t)
        }, n.type = _, n.isFunction = D, n.isWindow = P, n.isArray = F, n.isPlainObject = j, n.isEmptyObject = function(e) {
            var t;
            for (t in e) return !1;
            return !0
        }, n.inArray = function(e, t, n) {
            return i.indexOf.call(t, e, n)
        }, n.camelCase = L, n.trim = function(e) {
            return e == null ? "" : String.prototype.trim.call(e)
        }, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function(e, t) {
            var n, r = [],
                i, s;
            if (I(e))
                for (i = 0; i < e.length; i++) n = t(e[i], i), n != null && r.push(n);
            else
                for (s in e) n = t(e[s], s), n != null && r.push(n);
            return R(r)
        }, n.each = function(e, t) {
            var n, r;
            if (I(e)) {
                for (n = 0; n < e.length; n++)
                    if (t.call(e[n], n, e[n]) === !1) return e
            } else
                for (r in e)
                    if (t.call(e[r], r, e[r]) === !1) return e;
            return e
        }, n.grep = function(e, t) {
            return o.call(e, t)
        }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            N["[object " + t + "]"] = t.toLowerCase()
        }), n.fn = {
            forEach: i.forEach,
            reduce: i.reduce,
            push: i.push,
            sort: i.sort,
            indexOf: i.indexOf,
            concat: i.concat,
            map: function(e) {
                return n(n.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return n(s.apply(this, arguments))
            },
            ready: function(e) {
                return E.test(u.readyState) && u.body ? e(n) : u.addEventListener("DOMContentLoaded", function() {
                    e(n)
                }, !1), this
            },
            get: function(t) {
                return t === e ? s.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    this.parentNode != null && this.parentNode.removeChild(this)
                })
            },
            each: function(e) {
                return this.forEach(function(t, n) {
                    return e.call(t, n, t) !== !1
                }), this
            },
            filter: function(e) {
                return D(e) ? this.not(this.not(e)) : n(o.call(this, function(t) {
                    return k.matches(t, e)
                }))
            },
            add: function(e, t) {
                return n(A(this.concat(n(e, t))))
            },
            is: function(e) {
                return this.length > 0 && k.matches(this[0], e)
            },
            not: function(t) {
                var r = [];
                if (D(t) && t.call !== e) this.each(function(e) {
                    t.call(this, e) || r.push(this)
                });
                else {
                    var i = typeof t == "string" ? this.filter(t) : I(t) && D(t.item) ? s.call(t) : n(t);
                    this.forEach(function(e) {
                        i.indexOf(e) < 0 && r.push(e)
                    })
                }
                return n(r)
            },
            has: function(e) {
                return this.filter(function() {
                    return B(e) ? n.contains(this, e) : n(this).find(e).size()
                })
            },
            eq: function(e) {
                return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
            },
            first: function() {
                var e = this[0];
                return e && !B(e) ? e : n(e)
            },
            last: function() {
                var e = this[this.length - 1];
                return e && !B(e) ? e : n(e)
            },
            find: function(e) {
                var t, r = this;
                return typeof e == "object" ? t = n(e).filter(function() {
                    var e = this;
                    return i.some.call(r, function(t) {
                        return n.contains(t, e)
                    })
                }) : this.length == 1 ? t = n(k.qsa(this[0], e)) : t = this.map(function() {
                    return k.qsa(this, e)
                }), t
            },
            closest: function(e, t) {
                var r = this[0],
                    i = !1;
                typeof e == "object" && (i = n(e));
                while (r && !(i ? i.indexOf(r) >= 0 : k.matches(r, e))) r = r !== t && !H(r) && r.parentNode;
                return n(r)
            },
            parents: function(e) {
                var t = [],
                    r = this;
                while (r.length > 0) r = n.map(r, function(e) {
                    if ((e = e.parentNode) && !H(e) && t.indexOf(e) < 0) return t.push(e), e
                });
                return J(t, e)
            },
            parent: function(e) {
                return J(A(this.pluck("parentNode")), e)
            },
            children: function(e) {
                return J(this.map(function() {
                    return V(this)
                }), e)
            },
            contents: function() {
                return this.map(function() {
                    return s.call(this.childNodes)
                })
            },
            siblings: function(e) {
                return J(this.map(function(e, t) {
                    return o.call(V(t.parentNode), function(e) {
                        return e !== t
                    })
                }), e)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(e) {
                return n.map(this, function(t) {
                    return t[e]
                })
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = X(this.nodeName))
                })
            },
            replaceWith: function(e) {
                return this.before(e).remove()
            },
            wrap: function(e) {
                var t = D(e);
                if (this[0] && !t) var r = n(e).get(0),
                    i = r.parentNode || this.length > 1;
                return this.each(function(s) {
                    n(this).wrapAll(t ? e.call(this, s) : i ? r.cloneNode(!0) : r)
                })
            },
            wrapAll: function(e) {
                if (this[0]) {
                    n(this[0]).before(e = n(e));
                    var t;
                    while ((t = e.children()).length) e = t.first();
                    n(e).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                var t = D(e);
                return this.each(function(r) {
                    var i = n(this),
                        s = i.contents(),
                        o = t ? e.call(this, r) : e;
                    s.length ? s.wrapAll(o) : i.append(o)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    n(this).replaceWith(n(this).children())
                }), this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each(function() {
                    var r = n(this);
                    (t === e ? r.css("display") == "none" : t) ? r.show(): r.hide()
                })
            },
            prev: function(e) {
                return n(this.pluck("previousElementSibling")).filter(e || "*")
            },
            next: function(e) {
                return n(this.pluck("nextElementSibling")).filter(e || "*")
            },
            html: function(e) {
                return arguments.length === 0 ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {
                    var r = this.innerHTML;
                    n(this).empty().append(K(this, e, t, r))
                })
            },
            text: function(t) {
                return arguments.length === 0 ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                    this.textContent = t === e ? "" : "" + t
                })
            },
            attr: function(n, r) {
                var i;
                return typeof n == "string" && r === e ? this.length == 0 || this[0].nodeType !== 1 ? e : n == "value" && this[0].nodeName == "INPUT" ? this.val() : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i : this.each(function(e) {
                    if (this.nodeType !== 1) return;
                    if (B(n))
                        for (t in n) Q(this, t, n[t]);
                    else Q(this, n, K(this, r, e, this.getAttribute(n)))
                })
            },
            removeAttr: function(e) {
                return this.each(function() {
                    this.nodeType === 1 && Q(this, e)
                })
            },
            prop: function(t, n) {
                return t = M[t] || t, n === e ? this[0] && this[0][t] : this.each(function(e) {
                    this[t] = K(this, n, e, this[t])
                })
            },
            data: function(t, n) {
                var r = this.attr("data-" + t.replace(v, "-$1").toLowerCase(), n);
                return r !== null ? Y(r) : e
            },
            val: function(e) {
                return arguments.length === 0 ? this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function(t) {
                    this.value = K(this, e, t, this.value)
                })
            },
            offset: function(e) {
                if (e) return this.each(function(t) {
                    var r = n(this),
                        i = K(this, e, t, r.offset()),
                        s = r.offsetParent().offset(),
                        o = {
                            top: i.top - s.top,
                            left: i.left - s.left
                        };
                    r.css("position") == "static" && (o.position = "relative"), r.css(o)
                });
                if (this.length == 0) return null;
                var t = this[0].getBoundingClientRect();
                return {
                    left: t.left + window.pageXOffset,
                    top: t.top + window.pageYOffset,
                    width: Math.round(t.width),
                    height: Math.round(t.height)
                }
            },
            css: function(e, r) {
                if (arguments.length < 2) {
                    var i = this[0],
                        s = getComputedStyle(i, "");
                    if (!i) return;
                    if (typeof e == "string") return i.style[L(e)] || s.getPropertyValue(e);
                    if (F(e)) {
                        var o = {};
                        return n.each(F(e) ? e : [e], function(e, t) {
                            o[t] = i.style[L(t)] || s.getPropertyValue(t)
                        }), o
                    }
                }
                var u = "";
                if (_(e) == "string") !r && r !== 0 ? this.each(function() {
                    this.style.removeProperty(U(e))
                }) : u = U(e) + ":" + W(e, r);
                else
                    for (t in e) !e[t] && e[t] !== 0 ? this.each(function() {
                        this.style.removeProperty(U(t))
                    }) : u += U(t) + ":" + W(t, e[t]) + ";";
                return this.each(function() {
                    this.style.cssText += ";" + u
                })
            },
            index: function(e) {
                return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(e) {
                return e ? i.some.call(this, function(e) {
                    return this.test(G(e))
                }, z(e)) : !1
            },
            addClass: function(e) {
                return e ? this.each(function(t) {
                    r = [];
                    var i = G(this),
                        s = K(this, e, t, i);
                    s.split(/\s+/g).forEach(function(e) {
                        n(this).hasClass(e) || r.push(e)
                    }, this), r.length && G(this, i + (i ? " " : "") + r.join(" "))
                }) : this
            },
            removeClass: function(t) {
                return this.each(function(n) {
                    if (t === e) return G(this, "");
                    r = G(this), K(this, t, n, r).split(/\s+/g).forEach(function(e) {
                        r = r.replace(z(e), " ")
                    }), G(this, r.trim())
                })
            },
            toggleClass: function(t, r) {
                return t ? this.each(function(i) {
                    var s = n(this),
                        o = K(this, t, i, G(this));
                    o.split(/\s+/g).forEach(function(t) {
                        (r === e ? !s.hasClass(t) : r) ? s.addClass(t): s.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function(t) {
                if (!this.length) return;
                var n = "scrollTop" in this[0];
                return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function() {
                    this.scrollTop = t
                } : function() {
                    this.scrollTo(this.scrollX, t)
                })
            },
            scrollLeft: function(t) {
                if (!this.length) return;
                var n = "scrollLeft" in this[0];
                return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function() {
                    this.scrollLeft = t
                } : function() {
                    this.scrollTo(t, this.scrollY)
                })
            },
            position: function() {
                if (!this.length) return;
                var e = this[0],
                    t = this.offsetParent(),
                    r = this.offset(),
                    i = d.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return r.top -= parseFloat(n(e).css("margin-top")) || 0, r.left -= parseFloat(n(e).css("margin-left")) || 0, i.top += parseFloat(n(t[0]).css("border-top-width")) || 0, i.left += parseFloat(n(t[0]).css("border-left-width")) || 0, {
                    top: r.top - i.top,
                    left: r.left - i.left
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent || u.body;
                    while (e && !d.test(e.nodeName) && n(e).css("position") == "static") e = e.offsetParent;
                    return e
                })
            }
        }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function(t) {
            var r = t.replace(/./, function(e) {
                return e[0].toUpperCase()
            });
            n.fn[t] = function(i) {
                var s, o = this[0];
                return i === e ? P(o) ? o["inner" + r] : H(o) ? o.documentElement["scroll" + r] : (s = this.offset()) && s[t] : this.each(function(e) {
                    o = n(this), o.css(t, K(this, i, e, o[t]()))
                })
            }
        }), g.forEach(function(e, t) {
            var r = t % 2;
            n.fn[e] = function() {
                var e, i = n.map(arguments, function(t) {
                        return e = _(t), e == "object" || e == "array" || t == null ? t : k.fragment(t)
                    }),
                    s, o = this.length > 1;
                return i.length < 1 ? this : this.each(function(e, u) {
                    s = r ? u : u.parentNode, u = t == 0 ? u.nextSibling : t == 1 ? u.firstChild : t == 2 ? u : null, i.forEach(function(e) {
                        if (o) e = e.cloneNode(!0);
                        else if (!s) return n(e).remove();
                        Z(s.insertBefore(e, u), function(e) {
                            e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML)
                        })
                    })
                })
            }, n.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function(t) {
                return n(t)[e](this), this
            }
        }), k.Z.prototype = n.fn, k.uniq = A, k.deserializeValue = Y, n.zepto = k, n
    }();
    window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto),
        function(e) {
            function h(e) {
                return e._zid || (e._zid = n++)
            }

            function p(e, t, n, r) {
                t = d(t);
                if (t.ns) var i = v(t.ns);
                return (u[h(e)] || []).filter(function(e) {
                    return e && (!t.e || e.e == t.e) && (!t.ns || i.test(e.ns)) && (!n || h(e.fn) === h(n)) && (!r || e.sel == r)
                })
            }

            function d(e) {
                var t = ("" + e).split(".");
                return {
                    e: t[0],
                    ns: t.slice(1).sort().join(" ")
                }
            }

            function v(e) {
                return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
            }

            function m(e, t) {
                return e.del && !f && e.e in l || !!t
            }

            function g(e) {
                return c[e] || f && l[e] || e
            }

            function y(t, n, i, s, o, a, f) {
                var l = h(t),
                    p = u[l] || (u[l] = []);
                n.split(/\s/).forEach(function(n) {
                    if (n == "ready") return e(document).ready(i);
                    var u = d(n);
                    u.fn = i, u.sel = o, u.e in c && (i = function(t) {
                        var n = t.relatedTarget;
                        if (!n || n !== this && !e.contains(this, n)) return u.fn.apply(this, arguments)
                    }), u.del = a;
                    var l = a || i;
                    u.proxy = function(e) {
                        e = T(e);
                        if (e.isImmediatePropagationStopped && e.isImmediatePropagationStopped()) return;
                        e.data = s;
                        var n = l.apply(t, e._args == r ? [e] : [e].concat(e._args));
                        return n === !1 && (e.preventDefault(), e.stopPropagation()), n
                    }, u.i = p.length, p.push(u), "addEventListener" in t && t.addEventListener(g(u.e), u.proxy, m(u, f))
                })
            }

            function b(e, t, n, r, i) {
                var s = h(e);
                (t || "").split(/\s/).forEach(function(t) {
                    p(e, t, n, r).forEach(function(t) {
                        delete u[s][t.i], "removeEventListener" in e && e.removeEventListener(g(t.e), t.proxy, m(t, i))
                    })
                })
            }

            function T(t, n) {
                if (n || !t.isDefaultPrevented) {
                    n || (n = t), e.each(x, function(e, r) {
                        var i = n[e];
                        t[e] = function() {
                            return this[r] = w, i && i.apply(n, arguments)
                        }, t[r] = E
                    });
                    if (n.defaultPrevented !== r ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) t.isDefaultPrevented = w
                }
                return t
            }

            function N(e) {
                var t, n = {
                    originalEvent: e
                };
                for (t in e) !S.test(t) && e[t] !== r && (n[t] = e[t]);
                return T(n, e)
            }
            var t = e.zepto.qsa,
                n = 1,
                r, i = Array.prototype.slice,
                s = e.isFunction,
                o = function(e) {
                    return typeof e == "string"
                },
                u = {},
                a = {},
                f = "onfocusin" in window,
                l = {
                    focus: "focusin",
                    blur: "focusout"
                },
                c = {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                };
            a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents", e.event = {
                add: y,
                remove: b
            }, e.proxy = function(t, n) {
                if (s(t)) {
                    var r = function() {
                        return t.apply(n, arguments)
                    };
                    return r._zid = h(t), r
                }
                if (o(n)) return e.proxy(t[n], t);
                throw new TypeError("expected function")
            }, e.fn.bind = function(e, t, n) {
                return this.on(e, t, n)
            }, e.fn.unbind = function(e, t) {
                return this.off(e, t)
            }, e.fn.one = function(e, t, n, r) {
                return this.on(e, t, n, r, 1)
            };
            var w = function() {
                    return !0
                },
                E = function() {
                    return !1
                },
                S = /^([A-Z]|returnValue$|layer[XY]$)/,
                x = {
                    preventDefault: "isDefaultPrevented",
                    stopImmediatePropagation: "isImmediatePropagationStopped",
                    stopPropagation: "isPropagationStopped"
                };
            e.fn.delegate = function(e, t, n) {
                return this.on(t, e, n)
            }, e.fn.undelegate = function(e, t, n) {
                return this.off(t, e, n)
            }, e.fn.live = function(t, n) {
                return e(document.body).delegate(this.selector, t, n), this
            }, e.fn.die = function(t, n) {
                return e(document.body).undelegate(this.selector, t, n), this
            }, e.fn.on = function(t, n, u, a, f) {
                var l, c, h = this;
                if (t && !o(t)) return e.each(t, function(e, t) {
                    h.on(e, n, u, t, f)
                }), h;
                !o(n) && !s(a) && a !== !1 && (a = u, u = n, n = r);
                if (s(u) || u === !1) a = u, u = r;
                return a === !1 && (a = E), h.each(function(r, s) {
                    f && (l = function(e) {
                        return b(s, e.type, a), a.apply(this, arguments)
                    }), n && (c = function(t) {
                        var r, o = e(t.target).closest(n, s).get(0);
                        if (o && o !== s) return r = e.extend(N(t), {
                            currentTarget: o,
                            liveFired: s
                        }), (l || a).apply(o, [r].concat(i.call(arguments, 1)))
                    }), y(s, t, a, u, n, c || l)
                })
            }, e.fn.off = function(t, n, i) {
                var u = this;
                return t && !o(t) ? (e.each(t, function(e, t) {
                    u.off(e, n, t)
                }), u) : (!o(n) && !s(i) && i !== !1 && (i = n, n = r), i === !1 && (i = E), u.each(function() {
                    b(this, t, i, n)
                }))
            }, e.fn.trigger = function(t, n) {
                return t = o(t) || e.isPlainObject(t) ? e.Event(t) : T(t), t._args = n, this.each(function() {
                    "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
                })
            }, e.fn.triggerHandler = function(t, n) {
                var r, i;
                return this.each(function(s, u) {
                    r = N(o(t) ? e.Event(t) : t), r._args = n, r.target = u, e.each(p(u, t.type || t), function(e, t) {
                        i = t.proxy(r);
                        if (r.isImmediatePropagationStopped && r.isImmediatePropagationStopped()) return !1
                    })
                }), i
            }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
                e.fn[t] = function(e) {
                    return e ? this.bind(t, e) : this.trigger(t)
                }
            }), ["focus", "blur"].forEach(function(t) {
                e.fn[t] = function(e) {
                    return e ? this.bind(t, e) : this.each(function() {
                        try {
                            this[t]()
                        } catch (e) {}
                    }), this
                }
            }), e.Event = function(e, t) {
                o(e) || (t = e, e = t.type);
                var n = document.createEvent(a[e] || "Events"),
                    r = !0;
                if (t)
                    for (var i in t) i == "bubbles" ? r = !!t[i] : n[i] = t[i];
                return n.initEvent(e, r, !0), T(n)
            }
        }(Zepto),
        function($) {
            function triggerAndReturn(e, t, n) {
                var r = $.Event(t);
                return $(e).trigger(r, n), !r.isDefaultPrevented()
            }

            function triggerGlobal(e, t, n, r) {
                if (e.global) return triggerAndReturn(t || document, n, r)
            }

            function ajaxStart(e) {
                e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
            }

            function ajaxStop(e) {
                e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
            }

            function ajaxBeforeSend(e, t) {
                var n = t.context;
                if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
                triggerGlobal(t, n, "ajaxSend", [e, t])
            }

            function ajaxSuccess(e, t, n, r) {
                var i = n.context,
                    s = "success";
                n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), triggerGlobal(n, i, "ajaxSuccess", [t, n, e]), ajaxComplete(s, t, n)
            }

            function ajaxError(e, t, n, r, i) {
                var s = r.context;
                r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), triggerGlobal(r, s, "ajaxError", [n, r, e || t]), ajaxComplete(t, n, r)
            }

            function ajaxComplete(e, t, n) {
                var r = n.context;
                n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
            }

            function empty() {}

            function mimeToDataType(e) {
                return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
            }

            function appendQuery(e, t) {
                return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
            }

            function serializeData(e) {
                e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined)
            }

            function parseArguments(e, t, n, r) {
                var i = !$.isFunction(t);
                return {
                    url: e,
                    data: i ? t : undefined,
                    success: i ? $.isFunction(n) ? n : undefined : t,
                    dataType: i ? r || n : n
                }
            }

            function serialize(e, t, n, r) {
                var i, s = $.isArray(t),
                    o = $.isPlainObject(t);
                $.each(t, function(t, u) {
                    i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u)
                })
            }
            var jsonpID = 0,
                document = window.document,
                key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                scriptTypeRE = /^(?:text|application)\/javascript/i,
                xmlTypeRE = /^(?:text|application)\/xml/i,
                jsonType = "application/json",
                htmlType = "text/html",
                blankRE = /^\s*$/;
            $.active = 0, $.ajaxJSONP = function(e, t) {
                if ("type" in e) {
                    var n = e.jsonpCallback,
                        r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID,
                        i = document.createElement("script"),
                        s = window[r],
                        o, u = function(e) {
                            $(i).triggerHandler("error", e || "abort")
                        },
                        a = {
                            abort: u
                        },
                        f;
                    return t && t.promise(a), $(i).on("load error", function(n, u) {
                        clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined
                    }), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function() {
                        o = arguments
                    }, i.src = e.url.replace(/=\?/, "=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function() {
                        u("timeout")
                    }, e.timeout)), a)
                }
                return $.ajax(e)
            }, $.ajaxSettings = {
                type: "GET",
                beforeSend: empty,
                success: empty,
                error: empty,
                complete: empty,
                context: null,
                global: !0,
                xhr: function() {
                    return new window.XMLHttpRequest
                },
                accepts: {
                    script: "text/javascript, application/javascript, application/x-javascript",
                    json: jsonType,
                    xml: "application/xml, text/xml",
                    html: htmlType,
                    text: "text/plain"
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0
            }, $.ajax = function(options) {
                var settings = $.extend({}, options || {}),
                    deferred = $.Deferred && $.Deferred();
                for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
                ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
                var dataType = settings.dataType,
                    hasPlaceholder = /=\?/.test(settings.url);
                if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
                var mime = settings.accepts[dataType],
                    headers = {},
                    setHeader = function(e, t) {
                        headers[e.toLowerCase()] = [e, t]
                    },
                    protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
                    xhr = settings.xhr(),
                    nativeSetHeader = xhr.setRequestHeader,
                    abortTimeout;
                deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
                if (mime = settings.mimeType || mime) mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
                (settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
                if (settings.headers)
                    for (name in settings.headers) setHeader(name, settings.headers[name]);
                xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
                        var result, error = !1;
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                            dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
                            try {
                                dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
                            } catch (e) {
                                error = e
                            }
                            error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
                        } else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
                    }
                };
                if (ajaxBeforeSend(xhr, settings) === !1) return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
                if (settings.xhrFields)
                    for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
                var async = "async" in settings ? settings.async : !0;
                xhr.open(settings.type, settings.url, async, settings.username, settings.password);
                for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
                return settings.timeout > 0 && (abortTimeout = setTimeout(function() {
                    xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
                }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
            }, $.get = function(e, t, n, r) {
                return $.ajax(parseArguments.apply(null, arguments))
            }, $.post = function(e, t, n, r) {
                var i = parseArguments.apply(null, arguments);
                return i.type = "POST", $.ajax(i)
            }, $.getJSON = function(e, t, n) {
                var r = parseArguments.apply(null, arguments);
                return r.dataType = "json", $.ajax(r)
            }, $.fn.load = function(e, t, n) {
                if (!this.length) return this;
                var r = this,
                    i = e.split(/\s/),
                    s, o = parseArguments(e, t, n),
                    u = o.success;
                return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function(e) {
                    r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments)
                }, $.ajax(o), this
            };
            var escape = encodeURIComponent;
            $.param = function(e, t) {
                var n = [];
                return n.add = function(e, t) {
                    this.push(escape(e) + "=" + escape(t))
                }, serialize(n, e, t), n.join("&").replace(/%20/g, "+")
            }
        }(Zepto),
        function(e) {
            e.fn.serializeArray = function() {
                var t = [],
                    n;
                return e([].slice.call(this.get(0).elements)).each(function() {
                    n = e(this);
                    var r = n.attr("type");
                    this.nodeName.toLowerCase() != "fieldset" && !this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
                        name: n.attr("name"),
                        value: n.val()
                    })
                }), t
            }, e.fn.serialize = function() {
                var e = [];
                return this.serializeArray().forEach(function(t) {
                    e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
                }), e.join("&")
            }, e.fn.submit = function(t) {
                if (t) this.bind("submit", t);
                else if (this.length) {
                    var n = e.Event("submit");
                    this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
                }
                return this
            }
        }(Zepto),
        function(e) {
            "__proto__" in {} || e.extend(e.zepto, {
                Z: function(t, n) {
                    return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
                },
                isZ: function(t) {
                    return e.type(t) === "array" && "__Z" in t
                }
            });
            try {
                getComputedStyle(undefined)
            } catch (t) {
                var n = getComputedStyle;
                window.getComputedStyle = function(e) {
                    try {
                        return n(e)
                    } catch (t) {
                        return null
                    }
                }
            }
        }(Zepto), window.Zepto = Zepto, "$" in window || (window.$ = Zepto), typeof define == "function" && define.amd && define("zepto", [], function() {
            return Zepto
        }),
        function() {
            var e = this,
                t = e._,
                n = {},
                r = Array.prototype,
                i = Object.prototype,
                s = Function.prototype,
                o = r.push,
                u = r.slice,
                a = r.concat,
                f = i.toString,
                l = i.hasOwnProperty,
                c = r.forEach,
                h = r.map,
                p = r.reduce,
                d = r.reduceRight,
                v = r.filter,
                m = r.every,
                g = r.some,
                y = r.indexOf,
                b = r.lastIndexOf,
                w = Array.isArray,
                E = Object.keys,
                S = s.bind,
                x = function(e) {
                    if (e instanceof x) return e;
                    if (!(this instanceof x)) return new x(e);
                    this._wrapped = e
                };
            typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.5.2";
            var T = x.each = x.forEach = function(e, t, r) {
                if (e == null) return;
                if (c && e.forEach === c) e.forEach(t, r);
                else if (e.length === +e.length) {
                    for (var i = 0, s = e.length; i < s; i++)
                        if (t.call(r, e[i], i, e) === n) return
                } else {
                    var o = x.keys(e);
                    for (var i = 0, s = o.length; i < s; i++)
                        if (t.call(r, e[o[i]], o[i], e) === n) return
                }
            };
            x.map = x.collect = function(e, t, n) {
                var r = [];
                return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function(e, i, s) {
                    r.push(t.call(n, e, i, s))
                }), r)
            };
            var N = "Reduce of empty array with no initial value";
            x.reduce = x.foldl = x.inject = function(e, t, n, r) {
                var i = arguments.length > 2;
                e == null && (e = []);
                if (p && e.reduce === p) return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
                T(e, function(e, s, o) {
                    i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
                });
                if (!i) throw new TypeError(N);
                return n
            }, x.reduceRight = x.foldr = function(e, t, n, r) {
                var i = arguments.length > 2;
                e == null && (e = []);
                if (d && e.reduceRight === d) return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
                var s = e.length;
                if (s !== +s) {
                    var o = x.keys(e);
                    s = o.length
                }
                T(e, function(u, a, f) {
                    a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
                });
                if (!i) throw new TypeError(N);
                return n
            }, x.find = x.detect = function(e, t, n) {
                var r;
                return C(e, function(e, i, s) {
                    if (t.call(n, e, i, s)) return r = e, !0
                }), r
            }, x.filter = x.select = function(e, t, n) {
                var r = [];
                return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function(e, i, s) {
                    t.call(n, e, i, s) && r.push(e)
                }), r)
            }, x.reject = function(e, t, n) {
                return x.filter(e, function(e, r, i) {
                    return !t.call(n, e, r, i)
                }, n)
            }, x.every = x.all = function(e, t, r) {
                t || (t = x.identity);
                var i = !0;
                return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function(e, s, o) {
                    if (!(i = i && t.call(r, e, s, o))) return n
                }), !!i)
            };
            var C = x.some = x.any = function(e, t, r) {
                t || (t = x.identity);
                var i = !1;
                return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function(e, s, o) {
                    if (i || (i = t.call(r, e, s, o))) return n
                }), !!i)
            };
            x.contains = x.include = function(e, t) {
                return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function(e) {
                    return e === t
                })
            }, x.invoke = function(e, t) {
                var n = u.call(arguments, 2),
                    r = x.isFunction(t);
                return x.map(e, function(e) {
                    return (r ? t : e[t]).apply(e, n)
                })
            }, x.pluck = function(e, t) {
                return x.map(e, function(e) {
                    return e[t]
                })
            }, x.where = function(e, t, n) {
                return x.isEmpty(t) ? n ? void 0 : [] : x[n ? "find" : "filter"](e, function(e) {
                    for (var n in t)
                        if (t[n] !== e[n]) return !1;
                    return !0
                })
            }, x.findWhere = function(e, t) {
                return x.where(e, t, !0)
            }, x.max = function(e, t, n) {
                if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
                if (!t && x.isEmpty(e)) return -Infinity;
                var r = {
                    computed: -Infinity,
                    value: -Infinity
                };
                return T(e, function(e, i, s) {
                    var o = t ? t.call(n, e, i, s) : e;
                    o > r.computed && (r = {
                        value: e,
                        computed: o
                    })
                }), r.value
            }, x.min = function(e, t, n) {
                if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
                if (!t && x.isEmpty(e)) return Infinity;
                var r = {
                    computed: Infinity,
                    value: Infinity
                };
                return T(e, function(e, i, s) {
                    var o = t ? t.call(n, e, i, s) : e;
                    o < r.computed && (r = {
                        value: e,
                        computed: o
                    })
                }), r.value
            }, x.shuffle = function(e) {
                var t, n = 0,
                    r = [];
                return T(e, function(e) {
                    t = x.random(n++), r[n - 1] = r[t], r[t] = e
                }), r
            }, x.sample = function(e, t, n) {
                return arguments.length < 2 || n ? e[x.random(e.length - 1)] : x.shuffle(e).slice(0, Math.max(0, t))
            };
            var k = function(e) {
                return x.isFunction(e) ? e : function(t) {
                    return t[e]
                }
            };
            x.sortBy = function(e, t, n) {
                var r = k(t);
                return x.pluck(x.map(e, function(e, t, i) {
                    return {
                        value: e,
                        index: t,
                        criteria: r.call(n, e, t, i)
                    }
                }).sort(function(e, t) {
                    var n = e.criteria,
                        r = t.criteria;
                    if (n !== r) {
                        if (n > r || n === void 0) return 1;
                        if (n < r || r === void 0) return -1
                    }
                    return e.index - t.index
                }), "value")
            };
            var L = function(e) {
                return function(t, n, r) {
                    var i = {},
                        s = n == null ? x.identity : k(n);
                    return T(t, function(n, o) {
                        var u = s.call(r, n, o, t);
                        e(i, u, n)
                    }), i
                }
            };
            x.groupBy = L(function(e, t, n) {
                (x.has(e, t) ? e[t] : e[t] = []).push(n)
            }), x.indexBy = L(function(e, t, n) {
                e[t] = n
            }), x.countBy = L(function(e, t) {
                x.has(e, t) ? e[t]++ : e[t] = 1
            }), x.sortedIndex = function(e, t, n, r) {
                n = n == null ? x.identity : k(n);
                var i = n.call(r, t),
                    s = 0,
                    o = e.length;
                while (s < o) {
                    var u = s + o >>> 1;
                    n.call(r, e[u]) < i ? s = u + 1 : o = u
                }
                return s
            }, x.toArray = function(e) {
                return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
            }, x.size = function(e) {
                return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
            }, x.first = x.head = x.take = function(e, t, n) {
                return e == null ? void 0 : t == null || n ? e[0] : u.call(e, 0, t)
            }, x.initial = function(e, t, n) {
                return u.call(e, 0, e.length - (t == null || n ? 1 : t))
            }, x.last = function(e, t, n) {
                return e == null ? void 0 : t == null || n ? e[e.length - 1] : u.call(e, Math.max(e.length - t, 0))
            }, x.rest = x.tail = x.drop = function(e, t, n) {
                return u.call(e, t == null || n ? 1 : t)
            }, x.compact = function(e) {
                return x.filter(e, x.identity)
            };
            var A = function(e, t, n) {
                return t && x.every(e, x.isArray) ? a.apply(n, e) : (T(e, function(e) {
                    x.isArray(e) || x.isArguments(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
                }), n)
            };
            x.flatten = function(e, t) {
                return A(e, t, [])
            }, x.without = function(e) {
                return x.difference(e, u.call(arguments, 1))
            }, x.uniq = x.unique = function(e, t, n, r) {
                x.isFunction(t) && (r = n, n = t, t = !1);
                var i = n ? x.map(e, n, r) : e,
                    s = [],
                    o = [];
                return T(i, function(n, r) {
                    if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n)) o.push(n), s.push(e[r])
                }), s
            }, x.union = function() {
                return x.uniq(x.flatten(arguments, !0))
            }, x.intersection = function(e) {
                var t = u.call(arguments, 1);
                return x.filter(x.uniq(e), function(e) {
                    return x.every(t, function(t) {
                        return x.indexOf(t, e) >= 0
                    })
                })
            }, x.difference = function(e) {
                var t = a.apply(r, u.call(arguments, 1));
                return x.filter(e, function(e) {
                    return !x.contains(t, e)
                })
            }, x.zip = function() {
                var e = x.max(x.pluck(arguments, "length").concat(0)),
                    t = new Array(e);
                for (var n = 0; n < e; n++) t[n] = x.pluck(arguments, "" + n);
                return t
            }, x.object = function(e, t) {
                if (e == null) return {};
                var n = {};
                for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
                return n
            }, x.indexOf = function(e, t, n) {
                if (e == null) return -1;
                var r = 0,
                    i = e.length;
                if (n) {
                    if (typeof n != "number") return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
                    r = n < 0 ? Math.max(0, i + n) : n
                }
                if (y && e.indexOf === y) return e.indexOf(t, n);
                for (; r < i; r++)
                    if (e[r] === t) return r;
                return -1
            }, x.lastIndexOf = function(e, t, n) {
                if (e == null) return -1;
                var r = n != null;
                if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
                var i = r ? n : e.length;
                while (i--)
                    if (e[i] === t) return i;
                return -1
            }, x.range = function(e, t, n) {
                arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
                var r = Math.max(Math.ceil((t - e) / n), 0),
                    i = 0,
                    s = new Array(r);
                while (i < r) s[i++] = e, e += n;
                return s
            };
            var O = function() {};
            x.bind = function(e, t) {
                var n, r;
                if (S && e.bind === S) return S.apply(e, u.call(arguments, 1));
                if (!x.isFunction(e)) throw new TypeError;
                return n = u.call(arguments, 2), r = function() {
                    if (this instanceof r) {
                        O.prototype = e.prototype;
                        var i = new O;
                        O.prototype = null;
                        var s = e.apply(i, n.concat(u.call(arguments)));
                        return Object(s) === s ? s : i
                    }
                    return e.apply(t, n.concat(u.call(arguments)))
                }
            }, x.partial = function(e) {
                var t = u.call(arguments, 1);
                return function() {
                    return e.apply(this, t.concat(u.call(arguments)))
                }
            }, x.bindAll = function(e) {
                var t = u.call(arguments, 1);
                if (t.length === 0) throw new Error("bindAll must be passed function names");
                return T(t, function(t) {
                    e[t] = x.bind(e[t], e)
                }), e
            }, x.memoize = function(e, t) {
                var n = {};
                return t || (t = x.identity),
                    function() {
                        var r = t.apply(this, arguments);
                        return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
                    }
            }, x.delay = function(e, t) {
                var n = u.call(arguments, 2);
                return setTimeout(function() {
                    return e.apply(null, n)
                }, t)
            }, x.defer = function(e) {
                return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
            }, x.throttle = function(e, t, n) {
                var r, i, s, o = null,
                    u = 0;
                n || (n = {});
                var a = function() {
                    u = n.leading === !1 ? 0 : new Date, o = null, s = e.apply(r, i)
                };
                return function() {
                    var f = new Date;
                    !u && n.leading === !1 && (u = f);
                    var l = t - (f - u);
                    return r = this, i = arguments, l <= 0 ? (clearTimeout(o), o = null, u = f, s = e.apply(r, i)) : !o && n.trailing !== !1 && (o = setTimeout(a, l)), s
                }
            }, x.debounce = function(e, t, n) {
                var r, i, s, o, u;
                return function() {
                    s = this, i = arguments, o = new Date;
                    var a = function() {
                            var f = new Date - o;
                            f < t ? r = setTimeout(a, t - f) : (r = null, n || (u = e.apply(s, i)))
                        },
                        f = n && !r;
                    return r || (r = setTimeout(a, t)), f && (u = e.apply(s, i)), u
                }
            }, x.once = function(e) {
                var t = !1,
                    n;
                return function() {
                    return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
                }
            }, x.wrap = function(e, t) {
                return function() {
                    var n = [e];
                    return o.apply(n, arguments), t.apply(this, n)
                }
            }, x.compose = function() {
                var e = arguments;
                return function() {
                    var t = arguments;
                    for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
                    return t[0]
                }
            }, x.after = function(e, t) {
                return function() {
                    if (--e < 1) return t.apply(this, arguments)
                }
            }, x.keys = E || function(e) {
                if (e !== Object(e)) throw new TypeError("Invalid object");
                var t = [];
                for (var n in e) x.has(e, n) && t.push(n);
                return t
            }, x.values = function(e) {
                var t = x.keys(e),
                    n = t.length,
                    r = new Array(n);
                for (var i = 0; i < n; i++) r[i] = e[t[i]];
                return r
            }, x.pairs = function(e) {
                var t = x.keys(e),
                    n = t.length,
                    r = new Array(n);
                for (var i = 0; i < n; i++) r[i] = [t[i], e[t[i]]];
                return r
            }, x.invert = function(e) {
                var t = {},
                    n = x.keys(e);
                for (var r = 0, i = n.length; r < i; r++) t[e[n[r]]] = n[r];
                return t
            }, x.functions = x.methods = function(e) {
                var t = [];
                for (var n in e) x.isFunction(e[n]) && t.push(n);
                return t.sort()
            }, x.extend = function(e) {
                return T(u.call(arguments, 1), function(t) {
                    if (t)
                        for (var n in t) e[n] = t[n]
                }), e
            }, x.pick = function(e) {
                var t = {},
                    n = a.apply(r, u.call(arguments, 1));
                return T(n, function(n) {
                    n in e && (t[n] = e[n])
                }), t
            }, x.omit = function(e) {
                var t = {},
                    n = a.apply(r, u.call(arguments, 1));
                for (var i in e) x.contains(n, i) || (t[i] = e[i]);
                return t
            }, x.defaults = function(e) {
                return T(u.call(arguments, 1), function(t) {
                    if (t)
                        for (var n in t) e[n] === void 0 && (e[n] = t[n])
                }), e
            }, x.clone = function(e) {
                return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
            }, x.tap = function(e, t) {
                return t(e), e
            };
            var M = function(e, t, n, r) {
                if (e === t) return e !== 0 || 1 / e == 1 / t;
                if (e == null || t == null) return e === t;
                e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
                var i = f.call(e);
                if (i != f.call(t)) return !1;
                switch (i) {
                    case "[object String]":
                        return e == String(t);
                    case "[object Number]":
                        return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +e == +t;
                    case "[object RegExp]":
                        return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
                }
                if (typeof e != "object" || typeof t != "object") return !1;
                var s = n.length;
                while (s--)
                    if (n[s] == e) return r[s] == t;
                var o = e.constructor,
                    u = t.constructor;
                if (o !== u && !(x.isFunction(o) && o instanceof o && x.isFunction(u) && u instanceof u)) return !1;
                n.push(e), r.push(t);
                var a = 0,
                    l = !0;
                if (i == "[object Array]") {
                    a = e.length, l = a == t.length;
                    if (l)
                        while (a--)
                            if (!(l = M(e[a], t[a], n, r))) break
                } else {
                    for (var c in e)
                        if (x.has(e, c)) {
                            a++;
                            if (!(l = x.has(t, c) && M(e[c], t[c], n, r))) break
                        }
                    if (l) {
                        for (c in t)
                            if (x.has(t, c) && !(a--)) break;
                        l = !a
                    }
                }
                return n.pop(), r.pop(), l
            };
            x.isEqual = function(e, t) {
                return M(e, t, [], [])
            }, x.isEmpty = function(e) {
                if (e == null) return !0;
                if (x.isArray(e) || x.isString(e)) return e.length === 0;
                for (var t in e)
                    if (x.has(e, t)) return !1;
                return !0
            }, x.isElement = function(e) {
                return !!e && e.nodeType === 1
            }, x.isArray = w || function(e) {
                return f.call(e) == "[object Array]"
            }, x.isObject = function(e) {
                return e === Object(e)
            }, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
                x["is" + e] = function(t) {
                    return f.call(t) == "[object " + e + "]"
                }
            }), x.isArguments(arguments) || (x.isArguments = function(e) {
                return !!e && !!x.has(e, "callee")
            }), typeof /./ != "function" && (x.isFunction = function(e) {
                return typeof e == "function"
            }), x.isFinite = function(e) {
                return isFinite(e) && !isNaN(parseFloat(e))
            }, x.isNaN = function(e) {
                return x.isNumber(e) && e != +e
            }, x.isBoolean = function(e) {
                return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
            }, x.isNull = function(e) {
                return e === null
            }, x.isUndefined = function(e) {
                return e === void 0
            }, x.has = function(e, t) {
                return l.call(e, t)
            }, x.noConflict = function() {
                return e._ = t, this
            }, x.identity = function(e) {
                return e
            }, x.times = function(e, t, n) {
                var r = Array(Math.max(0, e));
                for (var i = 0; i < e; i++) r[i] = t.call(n, i);
                return r
            }, x.random = function(e, t) {
                return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
            };
            var _ = {
                escape: {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;"
                }
            };
            _.unescape = x.invert(_.escape);
            var D = {
                escape: new RegExp("[" + x.keys(_.escape).join("") + "]", "g"),
                unescape: new RegExp("(" + x.keys(_.unescape).join("|") + ")", "g")
            };
            x.each(["escape", "unescape"], function(e) {
                x[e] = function(t) {
                    return t == null ? "" : ("" + t).replace(D[e], function(t) {
                        return _[e][t]
                    })
                }
            }), x.result = function(e, t) {
                if (e == null) return void 0;
                var n = e[t];
                return x.isFunction(n) ? n.call(e) : n
            }, x.mixin = function(e) {
                T(x.functions(e), function(t) {
                    var n = x[t] = e[t];
                    x.prototype[t] = function() {
                        var e = [this._wrapped];
                        return o.apply(e, arguments), F.call(this, n.apply(x, e))
                    }
                })
            };
            var P = 0;
            x.uniqueId = function(e) {
                var t = ++P + "";
                return e ? e + t : t
            }, x.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var H = /(.)^/,
                B = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "	": "t",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
            x.template = function(e, t, n) {
                var r;
                n = x.defaults({}, n, x.templateSettings);
                var i = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g");
                window.bb_hacks = {}, window.bb_hacks.escape = x.escape;
                var s = 0,
                    o = "__p+='";
                e.replace(i, function(t, n, r, i, u) {
                    return o += e.slice(s, u).replace(j, function(e) {
                        return "\\" + B[e]
                    }), n && (o += "'+\n((__t=(" + n + "))==null?'':bb_hacks.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
                }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
                try {
                    r = new Function(n.variable || "obj", "_", o)
                } catch (u) {
                    throw u.source = o, u
                }
                if (t) return r(t, x);
                var a = function(e) {
                    return r.call(this, e, x)
                };
                return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
            }, x.chain = function(e) {
                return x(e).chain()
            };
            var F = function(e) {
                return this._chain ? x(e).chain() : e
            };
            x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
                var t = r[e];
                x.prototype[e] = function() {
                    var n = this._wrapped;
                    return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], F.call(this, n)
                }
            }), T(["concat", "join", "slice"], function(e) {
                var t = r[e];
                x.prototype[e] = function() {
                    return F.call(this, t.apply(this._wrapped, arguments))
                }
            }), x.extend(x.prototype, {
                chain: function() {
                    return this._chain = !0, this
                },
                value: function() {
                    return this._wrapped
                }
            }), typeof define == "function" && define.amd && define("underscore", [], function() {
                return x
            })
        }.call(this),
        function(e, t) {
            typeof exports != "undefined" ? t(e, exports, require("underscore")) : typeof define == "function" && define.amd ? define("backbone", ["underscore", "zepto", "exports"], function(n, r, i) {
                e.Backbone = t(e, i, n, r)
            }) : e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
        }(this, function(e, t, n, r) {
            var i = e.Backbone,
                s = [],
                o = s.push,
                u = s.slice,
                a = s.splice;
            t.VERSION = "1.1.0", t.$ = r, t.noConflict = function() {
                return e.Backbone = i, this
            }, t.emulateHTTP = !1, t.emulateJSON = !1;
            var f = t.Events = {
                    on: function(e, t, n) {
                        if (!c(this, "on", e, [t, n]) || !t) return this;
                        this._events || (this._events = {});
                        var r = this._events[e] || (this._events[e] = []);
                        return r.push({
                            callback: t,
                            context: n,
                            ctx: n || this
                        }), this
                    },
                    once: function(e, t, r) {
                        if (!c(this, "once", e, [t, r]) || !t) return this;
                        var i = this,
                            s = n.once(function() {
                                i.off(e, s), t.apply(this, arguments)
                            });
                        return s._callback = t, this.on(e, s, r)
                    },
                    off: function(e, t, r) {
                        var i, s, o, u, a, f, l, h;
                        if (!this._events || !c(this, "off", e, [t, r])) return this;
                        if (!e && !t && !r) return this._events = {}, this;
                        u = e ? [e] : n.keys(this._events);
                        for (a = 0, f = u.length; a < f; a++) {
                            e = u[a];
                            if (o = this._events[e]) {
                                this._events[e] = i = [];
                                if (t || r)
                                    for (l = 0, h = o.length; l < h; l++) s = o[l], (t && t !== s.callback && t !== s.callback._callback || r && r !== s.context) && i.push(s);
                                i.length || delete this._events[e]
                            }
                        }
                        return this
                    },
                    trigger: function(e) {
                        if (!this._events) return this;
                        var t = u.call(arguments, 1);
                        if (!c(this, "trigger", e, t)) return this;
                        var n = this._events[e],
                            r = this._events.all;
                        return n && h(n, t), r && h(r, arguments), this
                    },
                    stopListening: function(e, t, r) {
                        var i = this._listeningTo;
                        if (!i) return this;
                        var s = !t && !r;
                        !r && typeof t == "object" && (r = this), e && ((i = {})[e._listenId] = e);
                        for (var o in i) e = i[o], e.off(t, r, this), (s || n.isEmpty(e._events)) && delete this._listeningTo[o];
                        return this
                    }
                },
                l = /\s+/,
                c = function(e, t, n, r) {
                    if (!n) return !0;
                    if (typeof n == "object") {
                        for (var i in n) e[t].apply(e, [i, n[i]].concat(r));
                        return !1
                    }
                    if (l.test(n)) {
                        var s = n.split(l);
                        for (var o = 0, u = s.length; o < u; o++) e[t].apply(e, [s[o]].concat(r));
                        return !1
                    }
                    return !0
                },
                h = function(e, t) {
                    var n, r = -1,
                        i = e.length,
                        s = t[0],
                        o = t[1],
                        u = t[2];
                    switch (t.length) {
                        case 0:
                            while (++r < i)(n = e[r]).callback.call(n.ctx);
                            return;
                        case 1:
                            while (++r < i)(n = e[r]).callback.call(n.ctx, s);
                            return;
                        case 2:
                            while (++r < i)(n = e[r]).callback.call(n.ctx, s, o);
                            return;
                        case 3:
                            while (++r < i)(n = e[r]).callback.call(n.ctx, s, o, u);
                            return;
                        default:
                            while (++r < i)(n = e[r]).callback.apply(n.ctx, t)
                    }
                },
                p = {
                    listenTo: "on",
                    listenToOnce: "once"
                };
            n.each(p, function(e, t) {
                f[t] = function(t, r, i) {
                    var s = this._listeningTo || (this._listeningTo = {}),
                        o = t._listenId || (t._listenId = n.uniqueId("l"));
                    return s[o] = t, !i && typeof r == "object" && (i = this), t[e](r, i, this), this
                }
            }), f.bind = f.on, f.unbind = f.off, n.extend(t, f);
            var d = t.Model = function(e, t) {
                var r = e || {};
                t || (t = {}), this.cid = n.uniqueId("c"), this.attributes = {}, t.collection && (this.collection = t.collection), t.parse && (r = this.parse(r, t) || {}), r = n.defaults({}, r, n.result(this, "defaults")), this.set(r, t), this.changed = {}, this.initialize.apply(this, arguments)
            };
            n.extend(d.prototype, f, {
                changed: null,
                validationError: null,
                idAttribute: "id",
                initialize: function() {},
                toJSON: function(e) {
                    return n.clone(this.attributes)
                },
                sync: function() {
                    return t.sync.apply(this, arguments)
                },
                get: function(e) {
                    return this.attributes[e]
                },
                escape: function(e) {
                    return n.escape(this.get(e))
                },
                has: function(e) {
                    return this.get(e) != null
                },
                set: function(e, t, r) {
                    var i, s, o, u, a, f, l, c;
                    if (e == null) return this;
                    typeof e == "object" ? (s = e, r = t) : (s = {})[e] = t, r || (r = {});
                    if (!this._validate(s, r)) return !1;
                    o = r.unset, a = r.silent, u = [], f = this._changing, this._changing = !0, f || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), c = this.attributes, l = this._previousAttributes, this.idAttribute in s && (this.id = s[this.idAttribute]);
                    for (i in s) t = s[i], n.isEqual(c[i], t) || u.push(i), n.isEqual(l[i], t) ? delete this.changed[i] : this.changed[i] = t, o ? delete c[i] : c[i] = t;
                    if (!a) {
                        u.length && (this._pending = !0);
                        for (var h = 0, p = u.length; h < p; h++) this.trigger("change:" + u[h], this, c[u[h]], r)
                    }
                    if (f) return this;
                    if (!a)
                        while (this._pending) this._pending = !1, this.trigger("change", this, r);
                    return this._pending = !1, this._changing = !1, this
                },
                unset: function(e, t) {
                    return this.set(e, void 0, n.extend({}, t, {
                        unset: !0
                    }))
                },
                clear: function(e) {
                    var t = {};
                    for (var r in this.attributes) t[r] = void 0;
                    return this.set(t, n.extend({}, e, {
                        unset: !0
                    }))
                },
                hasChanged: function(e) {
                    return e == null ? !n.isEmpty(this.changed) : n.has(this.changed, e)
                },
                changedAttributes: function(e) {
                    if (!e) return this.hasChanged() ? n.clone(this.changed) : !1;
                    var t, r = !1,
                        i = this._changing ? this._previousAttributes : this.attributes;
                    for (var s in e) {
                        if (n.isEqual(i[s], t = e[s])) continue;
                        (r || (r = {}))[s] = t
                    }
                    return r
                },
                previous: function(e) {
                    return e == null || !this._previousAttributes ? null : this._previousAttributes[e]
                },
                previousAttributes: function() {
                    return n.clone(this._previousAttributes)
                },
                fetch: function(e) {
                    e = e ? n.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
                    var t = this,
                        r = e.success;
                    return e.success = function(n) {
                        if (!t.set(t.parse(n, e), e)) return !1;
                        r && r(t, n, e), t.trigger("sync", t, n, e)
                    }, I(this, e), this.sync("read", this, e)
                },
                save: function(e, t, r) {
                    var i, s, o, u = this.attributes;
                    e == null || typeof e == "object" ? (i = e, r = t) : (i = {})[e] = t, r = n.extend({
                        validate: !0
                    }, r);
                    if (i && !r.wait) {
                        if (!this.set(i, r)) return !1
                    } else if (!this._validate(i, r)) return !1;
                    i && r.wait && (this.attributes = n.extend({}, u, i)), r.parse === void 0 && (r.parse = !0);
                    var a = this,
                        f = r.success;
                    return r.success = function(e) {
                        a.attributes = u;
                        var t = a.parse(e, r);
                        r.wait && (t = n.extend(i || {}, t));
                        if (n.isObject(t) && !a.set(t, r)) return !1;
                        f && f(a, e, r), a.trigger("sync", a, e, r)
                    }, I(this, r), s = this.isNew() ? "create" : r.patch ? "patch" : "update", s === "patch" && (r.attrs = i), o = this.sync(s, this, r), i && r.wait && (this.attributes = u), o
                },
                destroy: function(e) {
                    e = e ? n.clone(e) : {};
                    var t = this,
                        r = e.success,
                        i = function() {
                            t.trigger("destroy", t, t.collection, e)
                        };
                    e.success = function(n) {
                        (e.wait || t.isNew()) && i(), r && r(t, n, e), t.isNew() || t.trigger("sync", t, n, e)
                    };
                    if (this.isNew()) return e.success(), !1;
                    I(this, e);
                    var s = this.sync("delete", this, e);
                    return e.wait || i(), s
                },
                url: function() {
                    var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || F();
                    return this.isNew() ? e : e + (e.charAt(e.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
                },
                parse: function(e, t) {
                    return e
                },
                clone: function() {
                    return new this.constructor(this.attributes)
                },
                isNew: function() {
                    return this.id == null
                },
                isValid: function(e) {
                    return this._validate({}, n.extend(e || {}, {
                        validate: !0
                    }))
                },
                _validate: function(e, t) {
                    if (!t.validate || !this.validate) return !0;
                    e = n.extend({}, this.attributes, e);
                    var r = this.validationError = this.validate(e, t) || null;
                    return r ? (this.trigger("invalid", this, r, n.extend(t, {
                        validationError: r
                    })), !1) : !0
                }
            });
            var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
            n.each(v, function(e) {
                d.prototype[e] = function() {
                    var t = u.call(arguments);
                    return t.unshift(this.attributes), n[e].apply(n, t)
                }
            });
            var m = t.Collection = function(e, t) {
                    t || (t = {}), t.model && (this.model = t.model), t.comparator !== void 0 && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, n.extend({
                        silent: !0
                    }, t))
                },
                g = {
                    add: !0,
                    remove: !0,
                    merge: !0
                },
                y = {
                    add: !0,
                    remove: !1
                };
            n.extend(m.prototype, f, {
                model: d,
                initialize: function() {},
                toJSON: function(e) {
                    return this.map(function(t) {
                        return t.toJSON(e)
                    })
                },
                sync: function() {
                    return t.sync.apply(this, arguments)
                },
                add: function(e, t) {
                    return this.set(e, n.extend({
                        merge: !1
                    }, t, y))
                },
                remove: function(e, t) {
                    var r = !n.isArray(e);
                    e = r ? [e] : n.clone(e), t || (t = {});
                    var i, s, o, u;
                    for (i = 0, s = e.length; i < s; i++) {
                        u = e[i] = this.get(e[i]);
                        if (!u) continue;
                        delete this._byId[u.id], delete this._byId[u.cid], o = this.indexOf(u), this.models.splice(o, 1), this.length--, t.silent || (t.index = o, u.trigger("remove", u, this, t)), this._removeReference(u)
                    }
                    return r ? e[0] : e
                },
                set: function(e, t) {
                    t = n.defaults({}, t, g), t.parse && (e = this.parse(e, t));
                    var r = !n.isArray(e);
                    e = r ? e ? [e] : [] : n.clone(e);
                    var i, s, o, u, a, f, l, c = t.at,
                        h = this.model,
                        p = this.comparator && c == null && t.sort !== !1,
                        v = n.isString(this.comparator) ? this.comparator : null,
                        m = [],
                        y = [],
                        b = {},
                        w = t.add,
                        E = t.merge,
                        S = t.remove,
                        x = !p && w && S ? [] : !1;
                    for (i = 0, s = e.length; i < s; i++) {
                        a = e[i], a instanceof d ? o = u = a : o = a[h.prototype.idAttribute];
                        if (f = this.get(o)) S && (b[f.cid] = !0), E && (a = a === u ? u.attributes : a, t.parse && (a = f.parse(a, t)), f.set(a, t), p && !l && f.hasChanged(v) && (l = !0)), e[i] = f;
                        else if (w) {
                            u = e[i] = this._prepareModel(a, t);
                            if (!u) continue;
                            m.push(u), u.on("all", this._onModelEvent, this), this._byId[u.cid] = u, u.id != null && (this._byId[u.id] = u)
                        }
                        x && x.push(f || u)
                    }
                    if (S) {
                        for (i = 0, s = this.length; i < s; ++i) b[(u = this.models[i]).cid] || y.push(u);
                        y.length && this.remove(y, t)
                    }
                    if (m.length || x && x.length) {
                        p && (l = !0), this.length += m.length;
                        if (c != null)
                            for (i = 0, s = m.length; i < s; i++) this.models.splice(c + i, 0, m[i]);
                        else {
                            x && (this.models.length = 0);
                            var T = x || m;
                            for (i = 0, s = T.length; i < s; i++) this.models.push(T[i])
                        }
                    }
                    l && this.sort({
                        silent: !0
                    });
                    if (!t.silent) {
                        for (i = 0, s = m.length; i < s; i++)(u = m[i]).trigger("add", u, this, t);
                        (l || x && x.length) && this.trigger("sort", this, t)
                    }
                    return r ? e[0] : e
                },
                reset: function(e, t) {
                    t || (t = {});
                    for (var r = 0, i = this.models.length; r < i; r++) this._removeReference(this.models[r]);
                    return t.previousModels = this.models, this._reset(), e = this.add(e, n.extend({
                        silent: !0
                    }, t)), t.silent || this.trigger("reset", this, t), e
                },
                push: function(e, t) {
                    return this.add(e, n.extend({
                        at: this.length
                    }, t))
                },
                pop: function(e) {
                    var t = this.at(this.length - 1);
                    return this.remove(t, e), t
                },
                unshift: function(e, t) {
                    return this.add(e, n.extend({
                        at: 0
                    }, t))
                },
                shift: function(e) {
                    var t = this.at(0);
                    return this.remove(t, e), t
                },
                slice: function() {
                    return u.apply(this.models, arguments)
                },
                get: function(e) {
                    return e == null ? void 0 : this._byId[e.id] || this._byId[e.cid] || this._byId[e]
                },
                at: function(e) {
                    return this.models[e]
                },
                where: function(e, t) {
                    return n.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
                        for (var n in e)
                            if (e[n] !== t.get(n)) return !1;
                        return !0
                    })
                },
                findWhere: function(e) {
                    return this.where(e, !0)
                },
                sort: function(e) {
                    if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                    return e || (e = {}), n.isString(this.comparator) || this.comparator.length === 1 ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
                },
                pluck: function(e) {
                    return n.invoke(this.models, "get", e)
                },
                fetch: function(e) {
                    e = e ? n.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
                    var t = e.success,
                        r = this;
                    return e.success = function(n) {
                        var i = e.reset ? "reset" : "set";
                        r[i](n, e), t && t(r, n, e), r.trigger("sync", r, n, e)
                    }, I(this, e), this.sync("read", this, e)
                },
                create: function(e, t) {
                    t = t ? n.clone(t) : {};
                    if (!(e = this._prepareModel(e, t))) return !1;
                    t.wait || this.add(e, t);
                    var r = this,
                        i = t.success;
                    return t.success = function(e, t, n) {
                        n.wait && r.add(e, n), i && i(e, t, n)
                    }, e.save(null, t), e
                },
                parse: function(e, t) {
                    return e
                },
                clone: function() {
                    return new this.constructor(this.models)
                },
                _reset: function() {
                    this.length = 0, this.models = [], this._byId = {}
                },
                _prepareModel: function(e, t) {
                    if (e instanceof d) return e.collection || (e.collection = this), e;
                    t = t ? n.clone(t) : {}, t.collection = this;
                    var r = new this.model(e, t);
                    return r.validationError ? (this.trigger("invalid", this, r.validationError, t), !1) : r
                },
                _removeReference: function(e) {
                    this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
                },
                _onModelEvent: function(e, t, n, r) {
                    if ((e === "add" || e === "remove") && n !== this) return;
                    e === "destroy" && this.remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], t.id != null && (this._byId[t.id] = t)), this.trigger.apply(this, arguments)
                }
            });
            var b = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
            n.each(b, function(e) {
                m.prototype[e] = function() {
                    var t = u.call(arguments);
                    return t.unshift(this.models), n[e].apply(n, t)
                }
            });
            var w = ["groupBy", "countBy", "sortBy"];
            n.each(w, function(e) {
                m.prototype[e] = function(t, r) {
                    var i = n.isFunction(t) ? t : function(e) {
                        return e.get(t)
                    };
                    return n[e](this.models, i, r)
                }
            });
            var E = t.View = function(e) {
                    this.cid = n.uniqueId("view"), e || (e = {}), n.extend(this, n.pick(e, x)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
                },
                S = /^(\S+)\s*(.*)$/,
                x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
            n.extend(E.prototype, f, {
                tagName: "div",
                $: function(e) {
                    return this.$el.find(e)
                },
                initialize: function() {},
                render: function() {
                    return this
                },
                remove: function() {
                    return this.$el.remove(), this.stopListening(), this
                },
                setElement: function(e, n) {
                    return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
                },
                delegateEvents: function(e) {
                    if (!e && !(e = n.result(this, "events"))) return this;
                    this.undelegateEvents();
                    for (var t in e) {
                        var r = e[t];
                        n.isFunction(r) || (r = this[e[t]]);
                        if (!r) continue;
                        var i = t.match(S),
                            s = i[1],
                            o = i[2];
                        r = n.bind(r, this), s += ".delegateEvents" + this.cid, o === "" ? this.$el.on(s, r) : this.$el.on(s, o, r)
                    }
                    return this
                },
                undelegateEvents: function() {
                    return this.$el.off(".delegateEvents" + this.cid), this
                },
                _ensureElement: function() {
                    if (!this.el) {
                        var e = n.extend({}, n.result(this, "attributes"));
                        this.id && (e.id = n.result(this, "id")), this.className && (e["class"] = n.result(this, "className"));
                        var r = t.$("<" + n.result(this, "tagName") + ">").attr(e);
                        this.setElement(r, !1)
                    } else this.setElement(n.result(this, "el"), !1)
                }
            }), t.sync = function(e, r, i) {
                var s = N[e];
                n.defaults(i || (i = {}), {
                    emulateHTTP: t.emulateHTTP,
                    emulateJSON: t.emulateJSON
                });
                var o = {
                    type: s,
                    dataType: "json"
                };
                i.url || (o.url = n.result(r, "url") || F()), i.data == null && r && (e === "create" || e === "update" || e === "patch") && (o.contentType = "application/json", o.data = JSON.stringify(i.attrs || r.toJSON(i))), i.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
                    model: o.data
                } : {});
                if (i.emulateHTTP && (s === "PUT" || s === "DELETE" || s === "PATCH")) {
                    o.type = "POST", i.emulateJSON && (o.data._method = s);
                    var u = i.beforeSend;
                    i.beforeSend = function(e) {
                        e.setRequestHeader("X-HTTP-Method-Override", s);
                        if (u) return u.apply(this, arguments)
                    }
                }
                o.type !== "GET" && !i.emulateJSON && (o.processData = !1), o.type === "PATCH" && T && (o.xhr = function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                });
                var a = i.xhr = t.ajax(n.extend(o, i));
                return r.trigger("request", r, a, i), a
            };
            var T = typeof window != "undefined" && !!window.ActiveXObject && (!window.XMLHttpRequest || !(new XMLHttpRequest).dispatchEvent),
                N = {
                    create: "POST",
                    update: "PUT",
                    patch: "PATCH",
                    "delete": "DELETE",
                    read: "GET"
                };
            t.ajax = function() {
                return t.$.ajax.apply(t.$, arguments)
            };
            var C = t.Router = function(e) {
                    e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
                },
                k = /\((.*?)\)/g,
                L = /(\(\?)?:\w+/g,
                A = /\*\w+/g,
                O = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            n.extend(C.prototype, f, {
                initialize: function() {},
                route: function(e, r, i) {
                    n.isRegExp(e) || (e = this._routeToRegExp(e)), n.isFunction(r) && (i = r, r = ""), i || (i = this[r]);
                    var s = this;
                    return t.history.route(e, function(n) {
                        var o = s._extractParameters(e, n);
                        i && i.apply(s, o), s.trigger.apply(s, ["route:" + r].concat(o)), s.trigger("route", r, o), t.history.trigger("route", s, r, o)
                    }), this
                },
                navigate: function(e, n) {
                    return t.history.navigate(e, n), this
                },
                _bindRoutes: function() {
                    if (!this.routes) return;
                    this.routes = n.result(this, "routes");
                    var e, t = n.keys(this.routes);
                    while ((e = t.pop()) != null) this.route(e, this.routes[e])
                },
                _routeToRegExp: function(e) {
                    return e = e.replace(O, "\\$&").replace(k, "(?:$1)?").replace(L, function(e, t) {
                        return t ? e : "([^/]+)"
                    }).replace(A, "(.*?)"), new RegExp("^" + e + "$")
                },
                _extractParameters: function(e, t) {
                    var r = e.exec(t).slice(1);
                    return n.map(r, function(e) {
                        return e ? decodeURIComponent(e) : null
                    })
                }
            });
            var M = t.History = function() {
                    this.handlers = [], n.bindAll(this, "checkUrl"), typeof window != "undefined" && (this.location = window.location, this.history = window.history)
                },
                _ = /^[#\/]|\s+$/g,
                D = /^\/+|\/+$/g,
                P = /msie [\w.]+/,
                H = /\/$/,
                B = /[?#].*$/;
            M.started = !1, n.extend(M.prototype, f, {
                interval: 50,
                getHash: function(e) {
                    var t = (e || this).location.href.match(/#(.*)$/);
                    return t ? t[1] : ""
                },
                getFragment: function(e, t) {
                    if (e == null)
                        if (this._hasPushState || !this._wantsHashChange || t) {
                            e = this.location.pathname;
                            var n = this.root.replace(H, "");
                            e.indexOf(n) || (e = e.slice(n.length))
                        } else e = this.getHash();
                    return e.replace(_, "")
                },
                start: function(e) {
                    if (M.started) throw new Error("Backbone.history has already been started");
                    M.started = !0, this.options = n.extend({
                        root: "/"
                    }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                    var r = this.getFragment(),
                        i = document.documentMode,
                        s = P.exec(navigator.userAgent.toLowerCase()) && (!i || i <= 7);
                    this.root = ("/" + this.root + "/").replace(D, "/"), s && this._wantsHashChange && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(r)), this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !s ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = r;
                    var o = this.location,
                        u = o.pathname.replace(/[^\/]$/, "$&/") === this.root;
                    if (this._wantsHashChange && this._wantsPushState) {
                        if (!this._hasPushState && !u) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                        this._hasPushState && u && o.hash && (this.fragment = this.getHash().replace(_, ""), this.history.replaceState({}, document.title, this.root + this.fragment + o.search))
                    }
                    if (!this.options.silent) return this.loadUrl()
                },
                stop: function() {
                    t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), M.started = !1
                },
                route: function(e, t) {
                    this.handlers.unshift({
                        route: e,
                        callback: t
                    })
                },
                checkUrl: function(e) {
                    var t = this.getFragment();
                    t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe)));
                    if (t === this.fragment) return !1;
                    this.iframe && this.navigate(t), this.loadUrl()
                },
                loadUrl: function(e) {
                    return e = this.fragment = this.getFragment(e), n.any(this.handlers, function(t) {
                        if (t.route.test(e)) return t.callback(e), !0
                    })
                },
                navigate: function(e, t) {
                    if (!M.started) return !1;
                    if (!t || t === !0) t = {
                        trigger: !!t
                    };
                    var n = this.root + (e = this.getFragment(e || ""));
                    e = e.replace(B, "");
                    if (this.fragment === e) return;
                    this.fragment = e, e === "" && n !== "/" && (n = n.slice(0, -1));
                    if (this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(n);
                        this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
                    }
                    if (t.trigger) return this.loadUrl(e)
                },
                _updateHash: function(e, t, n) {
                    if (n) {
                        var r = e.href.replace(/(javascript:|#).*$/, "");
                        e.replace(r + "#" + t)
                    } else e.hash = "#" + t
                }
            }), t.history = new M;
            var j = function(e, t) {
                var r = this,
                    i;
                e && n.has(e, "constructor") ? i = e.constructor : i = function() {
                    return r.apply(this, arguments)
                }, n.extend(i, r, t);
                var s = function() {
                    this.constructor = i
                };
                return s.prototype = r.prototype, i.prototype = new s, e && n.extend(i.prototype, e), i.__super__ = r.prototype, i
            };
            d.extend = m.extend = C.extend = E.extend = M.extend = j;
            var F = function() {
                    throw new Error('A "url" property or function must be specified')
                },
                I = function(e, t) {
                    var n = t.error;
                    t.error = function(r) {
                        n && n(e, r, t), e.trigger("error", e, r, t)
                    }
                };
            return t
        }), define("utils/class", ["backbone", "underscore"], function(e, t) {
            var n = function() {
                this.initialize.apply(this, arguments)
            };
            return t.extend(n.prototype, e.Events, {
                initialize: function() {}
            }), n.extend = e.Model.extend, n
        }), define("utils/url", ["utils/class"], function(e) {
            var t = e.extend({
                initialize: function() {},
                getURLParameter: function(e) {
                    return decodeURI((RegExp(e + "=" + "(.+?)(&|$)").exec(window.location.search) || [undefined, null])[1])
                },
                buildProtocolRelativeURL: function(e) {
                    return e.indexOf("http") !== -1 ? (e = e.replace("http:", ""), e = e.replace("https:", "")) : e = "//" + e, e
                }
            });
            return t
        }), define("utils/sync.prop", ["zepto", "utils/url"], function(e, t) {
            function i(i) {
                if (n === "null") return i({});
                var s = (new t).buildProtocolRelativeURL(n) + "/api/sdk/properties?gameId=" + r;
                e.ajax({
                    url: s,
                    dataType: "json",
                    success: function(e) {
                        i(e)
                    },
                    error: function() {
                        i({})
                    }
                })
            }
            var n = (new t).getURLParameter("bm.source"),
                r = window.location.pathname.split("/")[1];
            return i
        }), define("utils/localization", ["utils/class"], function(e) {
            var t = e.extend({
                load: function(e) {
                    this.defaultLanguage = "en-us";
                    var t = e || window.navigator.userLanguage || window.navigator.language;
                    t = t.toLowerCase();
                    var n = ["en-us", "ja-jp", "ja"];
                    n.indexOf(t) === -1 && (t = this.defaultLanguage), this.localization = {}, this.missingStrings = {}, this.debugMode = !1;
                    var r = this,
                        i = new XMLHttpRequest;
                    i.onload = function() {
                        if (i.status !== 200 && i.status !== 0) {
                            console.warn("Language '" + t + "' not found. Loading '" + r.defaultLanguage + "' instead. Status: " + i.status), r.load(r.defaultLanguage);
                            return
                        }
                        var e = i.responseText,
                            n = e.split("\n");
                        for (var s = 0; s < n.length; s++) {
                            var o = r.csvToArray(n[s]);
                            if (!o || !o[0] || !o[1]) {
                                console.warn("Found dud line in " + t + ".csv on line " + (s + 1) + ". Source: " + n[s]);
                                continue
                            }
                            r.put(o[0], o[1]), o[2] && console.log("Comment on key: " + o[0] + "\n -- " + o[2])
                        }
                        r.language = t
                    }, i.open("get","/tetris/lang/" + t + ".csv", !0), i.send()
                },
                get: function(e) {
                    if (this.language === undefined) return console.error("Language not yet loaded, exiting"), null;
                    this.localization[e + "_PC"] && (e += "_PC");
                    var t = this.localization[e],
                        n = t;
                    if (!t) return this.missing(e), null;
                    if (arguments.length !== 0) {
                        var r = Array.prototype.slice.call(arguments);
                        r.splice(0, 1, t), n = this.format.apply(this, r)
                    }
                    if (this.debugMode) {
                        var i = !1,
                            s = 0,
                            o = n.split("");
                        while (!i) /\s/gi.test(o[s]) || o.splice(s, 1, "W"), s += 1, s >= o.length && (i = !0);
                        n = o.join("")
                    }
                    return n
                },
                put: function(e, t) {
                    this.localization[e] = t
                },
                missing: function(e) {
                    this.missingStrings[e] = e
                },
                csvToArray: function(e) {
                    var t = /^\s*(?:"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,"\s\\]*(?:\s+[^,"\s\\]+)*)\s*(?:,\s*(?:"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,"\s\\]*(?:\s+[^,"\s\\]+)*)\s*)*$/,
                        n = /(?!\s*$)\s*(?:"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,"\s\\]*(?:\s+[^,"\s\\]+)*))\s*(?:,|$)/g;
                    if (!t.test(e)) return console.warn("CSVtoArray: Invalid csv text.\n\nSee http://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript for help."), console.warn(e), null;
                    var r = [];
                    return e.replace(n, function(e, t, n, i) {
                        return t !== undefined && t !== "" ? r.push(t.replace(/\\'/g, "'")) : n !== undefined && n !== "" ? r.push(n.replace(/\\"/g, '"')) : i !== undefined && i !== "" && r.push(i), ""
                    }), /,\s*$/.test(e) && r.push(""), r
                },
                format: function() {
                    var e = arguments[0];
                    for (var t = 1; t < arguments.length; t++) {
                        var n = new RegExp("\\{" + (t - 1) + "\\}", "gm");
                        e = e.replace(n, arguments[t])
                    }
                    return e
                }
            });
            return t
        }), define("utils/user.agent", ["utils/class"], function(e) {
            var t = e.extend({
                initialize: function() {},
                isIOS: function() {
                    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
                },
                isMobile: function() {
                    var e = !1;
                    return function(t) {
                        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(t.substr(0, 4))) e = !0
                    }(navigator.userAgent || navigator.vendor || window.opera), e
                },
                isAndroid: function() {
                    return navigator.userAgent.match(/Android/i)
                },
                isIPad: function() {
                    return navigator.userAgent.match(/iPad/i)
                },
                supportsVideo: function() {
                    return !!document.createElement("video").canPlayType
                },
                supportsWebM: function() {
                    if (!this.supportsVideo()) return !1;
                    var e = document.createElement("video");
                    return e.canPlayType('video/webm; codecs="vp8, vorbis"')
                }
            });
            return t
        }), define("utils/image.changer", ["zepto", "utils/class"], function(e, t) {
            var n = t.extend({
                initialize: function() {},
                changeRotationImage: function(t, n) {
                    var r = e("#booster-orientation-screen-" + n).css("background-image"),
                        i = r.split("url("),
                        s = i[1].replace('"', "").split("images"),
                        o = s[0] + "images/" + t;
                    e("#booster-orientation-screen-" + n).css("background-image", "url('" + o + "')")
                },
                changeSplashImage: function(t) {
                    var n = e("#splash-logo").css("background-image"),
                        r = n.split("url("),
                        i = r[1].replace('"', "").split("images"),
                        s = i[0] + "images/" + t;
                    e("#splash-logo").css("background-image", "url('" + s + "')")
                }
            });
            return n
        }),
        function() {
            var e = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
                t = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
                n = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
                r = typeof location != "undefined" && location.href,
                i = r && location.protocol && location.protocol.replace(/\:/, ""),
                s = r && location.hostname,
                o = r && (location.port || void 0),
                u = [];
            define("text", [], function() {
                var a, f, l;
                return typeof window != "undefined" && window.navigator && window.document ? f = function(e, t) {
                    var n = a.createXhr();
                    n.open("GET", e, !0), n.onreadystatechange = function() {
                        n.readyState === 4 && t(n.responseText)
                    }, n.send(null)
                } : typeof process != "undefined" && process.versions && process.versions.node ? (l = require.nodeRequire("fs"), f = function(e, t) {
                    t(l.readFileSync(e, "utf8"))
                }) : typeof Packages != "undefined" && (f = function(e, t) {
                    var n = new java.io.File(e),
                        r = java.lang.System.getProperty("line.separator"),
                        n = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(n), "utf-8")),
                        i, s, o = "";
                    try {
                        i = new java.lang.StringBuffer, (s = n.readLine()) && s.length() && s.charAt(0) === 65279 && (s = s.substring(1));
                        for (i.append(s);
                            (s = n.readLine()) !== null;) i.append(r), i.append(s);
                        o = String(i.toString())
                    } finally {
                        n.close()
                    }
                    t(o)
                }), a = {
                    version: "0.27.0",
                    strip: function(e) {
                        if (e) {
                            var e = e.replace(t, ""),
                                r = e.match(n);
                            r && (e = r[1])
                        } else e = "";
                        return e
                    },
                    jsEscape: function(e) {
                        return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
                    },
                    createXhr: function() {
                        var t, n, r;
                        if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                        for (n = 0; n < 3; n++) {
                            r = e[n];
                            try {
                                t = new ActiveXObject(r)
                            } catch (i) {}
                            if (t) {
                                e = [r];
                                break
                            }
                        }
                        if (!t) throw Error("createXhr(): XMLHttpRequest not available");
                        return t
                    },
                    get: f,
                    parseName: function(e) {
                        var t = !1,
                            n = e.indexOf("."),
                            r = e.substring(0, n),
                            e = e.substring(n + 1, e.length),
                            n = e.indexOf("!");
                        return n !== -1 && (t = e.substring(n + 1, e.length), t = t === "strip", e = e.substring(0, n)), {
                            moduleName: r,
                            ext: e,
                            strip: t
                        }
                    },
                    xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
                    useXhr: function(e, t, n, r) {
                        var i = a.xdRegExp.exec(e),
                            s;
                        return i ? (e = i[2], i = i[3], i = i.split(":"), s = i[1], i = i[0], (!e || e === t) && (!i || i === n) && (!s && !i || s === r)) : !0
                    },
                    finishLoad: function(e, t, n, r, i) {
                        n = t ? a.strip(n) : n, i.isBuild && i.inlineText && (u[e] = n), r(n)
                    },
                    load: function(e, t, n, u) {
                        var f = a.parseName(e),
                            l = f.moduleName + "." + f.ext,
                            c = t.toUrl(l),
                            h = u && u.text && u.text.useXhr || a.useXhr;
                        !r || h(c, i, s, o) ? a.get(c, function(t) {
                            a.finishLoad(e, f.strip, t, n, u)
                        }) : t([l], function(e) {
                            a.finishLoad(f.moduleName + "." + f.ext, f.strip, e, n, u)
                        })
                    },
                    write: function(e, t, n) {
                        if (t in u) {
                            var r = a.jsEscape(u[t]);
                            n.asModule(e + "!" + t, "define(function () { return '" + r + "';});\n")
                        }
                    },
                    writeFile: function(e, t, n, r, i) {
                        var t = a.parseName(t),
                            s = t.moduleName + "." + t.ext,
                            o = n.toUrl(t.moduleName + "." + t.ext) + ".js";
                        a.load(s, n, function() {
                            var t = function(e) {
                                return r(o, e)
                            };
                            t.asModule = function(e, t) {
                                return r.asModule(e, o, t)
                            }, a.write(e, s, t, i)
                        }, i)
                    }
                }
            })
        }(), define("text!templates/rotation.html", [], function() {
            return '<iframe id="booster-orientation-screen-<%= orientation %>" name="booster-orientation-screen" class="hide" src="<%- source %>/sdk.rotatescreen/rotatescreen?bm.gameid=<%- bmGameId %>&isPortrait=<%- portrait %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("text!templates/rotation_legacy.html", [], function() {
            return '<div id="booster-orientation-screen-<%= orientation %>">\r\n  <div id="logo"></div>\r\n  <p id="rotation-text">Please rotate your device.</p><!-- TODO: make text external -->\r\n</div>\r\n'
        }), define("utils/debug.message", ["utils/class", "utils/url"], function(e, t) {
            var n = new t,
                r = e.extend({
                    setMessage: function() {
                        (n.getURLParameter("mode") !== "null" || n.getURLParameter("mode") === "test") && console.info(arguments)
                    }
                });
            return r
        }), define("views/rotation.screen", ["zepto", "underscore", "backbone", "utils/image.changer", "text!templates/rotation.html", "text!templates/rotation_legacy.html", "utils/debug.message", "utils/url"], function(e, t, n, r, i, s, o, u) {
            var a = new r,
                f = new o,
                l = n.View.extend({
                    orientation: "portrait",
                    minimalUI: !1,
                    rotationImage: "rotate.png",
                    onShow: function() {
                        f.setMessage("rotation.screen on show")
                    },
                    onHide: function() {
                        f.setMessage("rotation.screen on hide")
                    },
                    initialize: function(t) {
                        t.orientation != undefined && (this.orientation = t.orientation), t.minimalUI != undefined && (this.minimalUI = t.minimalUI), t.rotationImage != undefined && (this.rotationImage = t.rotationImage), t.onShow !== undefined && (this.onShow = t.onShow), t.onHide !== undefined && (this.onHide = t.onHide), this.minimalUI && e(window).on("resize", function() {
                            window.scrollTo(0, 1)
                        }), f.setMessage(this.orientation + " rotation screen initialized"), this.render(this.orientation, t.bmGameId)
                    },
                    render: function(n, r) {
                        var o = new u,
                            f = o.getURLParameter("bm.source") === "null" || r === "null",
                            l;
                        f ? l = t.template(s, {
                            orientation: n
                        }) : l = t.template(i, {
                            orientation: n.toLowerCase() === "portrait" ? "p" : "l",
                            portrait: n.toLowerCase() === "portrait" ? 1 : 0,
                            bmGameId: r,
                            source: o.buildProtocolRelativeURL(o.getURLParameter("bm.source"))
                        }), e("body").append(l), this.onChange(n), f && this.rotationImage != "rotate.png" && (a.changeRotationImage(this.rotationImage, n), e("#rotation-text").remove())
                    },
                    onChange: function(t) {
                        var n = this;
                        e(window).on("orientationchange", function(e) {
                            if (t === "both") return;
                            var r = window.orientation;
                            r === 0 || r === 180 ? r = "portrait" : r === 90 || r === -90 ? r = "landscape" : document.documentElement.clientWidth > document.documentElement.clientHeight ? r = "landscape" : r = "portrait", r !== t ? n.onShow() : n.onHide()
                        })
                    }
                });
            return l
        }), define("text!templates/splash.html", [], function() {
            return '<iframe id="booster-splash" name="booster-splash" class="hide" src="<%- source %>/sdk.splashscreen/splashscreen?bm.gameid=<%= bmGameId %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("text!templates/splash_legacy.html", [], function() {
            return '<div id="booster-splash">\r\n  <div id="splash-logo" class="content"></div>\r\n</div>\r\n'
        }), define("text!templates/splash_video.html", [], function() {
            return '<div id="booster-splash" class="booster-splash-video">\r\n    <video id="splash-video" src="<%= baseURL %>/images/coolgames.webm" autoplay></video>\r\n</div>\r\n'
        }), define("views/splash.screen", ["zepto", "underscore", "backbone", "utils/image.changer", "utils/debug.message", "text!templates/splash.html", "text!templates/splash_legacy.html", "text!templates/splash_video.html", "utils/url", "utils/user.agent"], function(e, t, n, r, i, s, o, u, a, f) {
            var l = new r,
                c = new i,
                h = n.View.extend({
                    splashImage: "BoosterMedia320x115.png",
                    el: "body",
                    events: {
                        "oanimationend #booster-splash": "splashFinshed",
                        "animationend #booster-splash": "splashFinshed",
                        "webkitAnimationEnd #booster-splash": "splashFinshed"
                    },
                    initialize: function(e) {
                        e.splashImage != undefined && (this.splashImage = e.splashImage), this.isCoolgames() && (this.splashImage = "coolgames.png"), this.render(e.bmGameId), c.setMessage("Splashscreen initialized")
                    },
                    splashFinshed: function() {
                        e("#booster-splash").remove();
                        try {
                            window.Booster.onSplashFinishedEvent.call()
                        } catch (t) {
                            c.setMessage("No onSplashFinishedEvent"), console.log(t)
                        }
                    },
                    render: function(n) {
                        var r = new f,
                            i = new a,
                            c = null,
                            h = r.supportsWebM(),
                            p = i.getURLParameter("bm.source") === "null" || n === "null";
                        this.isChromeStore() && h ? c = t.template(u, {
                            baseURL: window.bb_base_path
                        }) : p ? c = t.template(o, {}) : c = t.template(s, {
                            bmGameId: n,
                            source: i.buildProtocolRelativeURL(i.getURLParameter("bm.source"))
                        }), e("body").append(c), p && this.isWordgames() ? e("#booster-splash").addClass("isWordgames") : p && this.splashImage != "BoosterMedia320x115.png" && !this.isChromeStore() ? l.changeSplashImage(this.splashImage) : p && this.isCoolgames() && e("#booster-splash").addClass("isCoolgames")
                    },
                    isCoolgames: function() {
                        var e = window.location.hostname;
                        return e.indexOf("coolgames") !== -1
                    },
                    isChromeStore: function() {
                        var e = window.location.href;
                        return e.indexOf("chrome") !== -1 || e.indexOf("google") !== -1
                    },
                    isWordgames: function() {
                        var e = window.location.href;
                        return e.indexOf("wordgames") !== -1
                    }
                });
            return h
        }), define("utils/extend.zepto", ["zepto", "utils/class"], function(e, t) {
            var n = t.extend({
                initialize: function() {},
                attachScript: function(t, n, r) {
                    var i = document.createElement("script");
                    i.type = "text/javascript", i.onload = n, i.onerror = r, i.src = t, e("head").append(i)
                },
                attachDirectScript: function(t) {
                    var n = document.createElement("script");
                    n.type = "text/javascript", n.text = t, e("head").append(n)
                },
                attachCSS: function(t, n, r) {
                    var i = document.createElement("link");
                    i.rel = "stylesheet", i.type = "text/css", i.onload = n, i.onerror = r, i.href = t, e("head").append(i)
                },
                attachMetaTag: function(t, n) {
                    var r = document.createElement("meta");
                    r.name = t, r.content = n, e("head").prepend(r)
                }
            });
            return n
        }), define("views/meta.tags", ["zepto", "underscore", "backbone", "utils/extend.zepto"], function(e, t, n, r) {
            var i = n.View.extend({
                el: "body",
                extendZepto: null,
                initialize: function() {
                    this.extendZepto = new r, this.checkAndAddTag("viewport", "user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimal-ui"), this.checkAndAddTag("mobile-web-app-capable", "yes"), this.checkAndAddTag("apple-mobile-web-app-capable", "yes"), this.checkAndAddTag("apple-mobile-web-app-status-bar-style", "yes")
                },
                checkAndAddTag: function(t, n) {
                    e('[name="' + t + '"]').length == 0 && this.extendZepto.attachMetaTag(t, n)
                }
            });
            return i
        }),
        function(e) {
            var t = function(t) {
                this._options = {
                    checkOnLoad: !1,
                    resetOnEnd: !1,
                    loopCheckTime: 50,
                    loopMaxNumber: 5,
                    baitClass: "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
                    baitStyle: "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
                    debug: !1
                }, this._var = {
                    version: "3.2.1",
                    bait: null,
                    checking: !1,
                    loop: null,
                    loopNumber: 0,
                    event: {
                        detected: [],
                        notDetected: []
                    }
                }, t !== undefined && this.setOption(t);
                var n = this,
                    r = function() {
                        setTimeout(function() {
                            n._options.checkOnLoad === !0 && (n._options.debug === !0 && n._log("onload->eventCallback", "A check loading is launched"), n._var.bait === null && n._creatBait(), setTimeout(function() {
                                n.check()
                            }, 1))
                        }, 1)
                    };
                e.addEventListener !== undefined ? e.addEventListener("load", r, !1) : e.attachEvent("onload", r)
            };
            t.prototype._options = null, t.prototype._var = null, t.prototype._bait = null, t.prototype._log = function(e, t) {
                console.log("[AdBlock][" + e + "] " + t)
            }, t.prototype.setOption = function(e, t) {
                if (t !== undefined) {
                    var n = e;
                    e = {}, e[n] = t
                }
                for (var r in e) this._options[r] = e[r], this._options.debug === !0 && this._log("setOption", 'The option "' + r + '" he was assigned to "' + e[r] + '"');
                return this
            }, t.prototype._creatBait = function() {
                var t = document.createElement("div");
                t.setAttribute("class", this._options.baitClass), t.setAttribute("style", this._options.baitStyle), this._var.bait = e.document.body.appendChild(t), this._var.bait.offsetParent, this._var.bait.offsetHeight, this._var.bait.offsetLeft, this._var.bait.offsetTop, this._var.bait.offsetWidth, this._var.bait.clientHeight, this._var.bait.clientWidth, this._options.debug === !0 && this._log("_creatBait", "Bait has been created")
            }, t.prototype._destroyBait = function() {
                e.document.body.removeChild(this._var.bait), this._var.bait = null, this._options.debug === !0 && this._log("_destroyBait", "Bait has been removed")
            }, t.prototype.check = function(e) {
                e === undefined && (e = !0), this._options.debug === !0 && this._log("check", "An audit was requested " + (e === !0 ? "with a" : "without") + " loop");
                if (this._var.checking === !0) return this._options.debug === !0 && this._log("check", "A check was canceled because there is already an ongoing"), !1;
                this._var.checking = !0, this._var.bait === null && this._creatBait();
                var t = this;
                return this._var.loopNumber = 0, e === !0 && (this._var.loop = setInterval(function() {
                    t._checkBait(e)
                }, this._options.loopCheckTime)), setTimeout(function() {
                    t._checkBait(e)
                }, 1), this._options.debug === !0 && this._log("check", "A check is in progress ..."), !0
            }, t.prototype._checkBait = function(t) {
                var n = !1;
                this._var.bait === null && this._creatBait(), e.document.body.getAttribute("abp") && (n = !0);
                if (e.getComputedStyle !== undefined) {
                    var r = e.getComputedStyle(this._var.bait, null);
                    r && (r.getPropertyValue("display") == "none" || r.getPropertyValue("visibility") == "hidden") && (n = !0)
                }
                this._options.debug === !0 && this._log("_checkBait", "A check (" + (this._var.loopNumber + 1) + "/" + this._options.loopMaxNumber + " ~" + (1 + this._var.loopNumber * this._options.loopCheckTime) + "ms) was conducted and detection is " + (n === !0 ? "positive" : "negative")), t === !0 && (this._var.loopNumber++, this._var.loopNumber >= this._options.loopMaxNumber && this._stopLoop());
                if (n === !0) this._stopLoop(), this._destroyBait(), this.emitEvent(!0), t === !0 && (this._var.checking = !1);
                else if (this._var.loop === null || t === !1) this._destroyBait(), this.emitEvent(!1), t === !0 && (this._var.checking = !1)
            }, t.prototype._stopLoop = function(e) {
                clearInterval(this._var.loop), this._var.loop = null, this._var.loopNumber = 0, this._options.debug === !0 && this._log("_stopLoop", "A loop has been stopped")
            }, t.prototype.emitEvent = function(e) {
                this._options.debug === !0 && this._log("emitEvent", "An event with a " + (e === !0 ? "positive" : "negative") + " detection was called");
                var t = this._var.event[e === !0 ? "detected" : "notDetected"];
                for (var n in t) this._options.debug === !0 && this._log("emitEvent", "Call function " + (parseInt(n) + 1) + "/" + t.length), t.hasOwnProperty(n) && t[n]();
                return this._options.resetOnEnd === !0 && this.clearEvent(), this
            }, t.prototype.clearEvent = function() {
                this._var.event.detected = [], this._var.event.notDetected = [], this._options.debug === !0 && this._log("clearEvent", "The event list has been cleared")
            }, t.prototype.on = function(e, t) {
                return this._var.event[e === !0 ? "detected" : "notDetected"].push(t), this._options.debug === !0 && this._log("on", 'A type of event "' + (e === !0 ? "detected" : "notDetected") + '" was added'), this
            }, t.prototype.onDetected = function(e) {
                return this.on(!0, e)
            }, t.prototype.onNotDetected = function(e) {
                return this.on(!1, e)
            }, e.AdBlock = t, e.AdBlock === undefined && (e.AdBlock = new t({
                checkOnLoad: !0,
                resetOnEnd: !0
            }))
        }(window), define("adblock", function() {}), define("text!templates/ad-blocker/ja.html", [], function() {
            return '<div class=\'ad-block-bg\'>\r\n<div class="ad-block-root ad-block-root-ja">\r\n    <div class="ad-block-title">ADBLOCKをご利用の方</div>\r\n    <div class="ad-block-main">ADBLOCKが<br>有効化されているため<br>ページを表示できません。\r\n      <br><br>\r\n      「このページでは<br>実行しない」に設定を<br>変更してください。</div>\r\n    <div class="ad-block-footer">変更後、<br>更新をしてください。</div>\r\n</div>\r\n</div>\r\n'
        }), define("text!templates/ad-blocker/en.html", [], function() {
            return '<div class=\'ad-block-bg\'>\r\n  <div class="ad-block-root">\r\n      <div class="ad-block-title">Using adblock?</div>\r\n      <div class="ad-block-main">Ads help us make games and feed Quark.</div>\r\n      <div class="ad-block-footer">Please disable adblock for this site</div>\r\n  </div>\r\n</div>\r\n'
        }), define("views/adblocker.screen", ["zepto", "underscore", "backbone", "adblock", "utils/url", "text!templates/ad-blocker/ja.html", "text!templates/ad-blocker/en.html"], function(e, t, n, r, i, s, o) {
            var u = new i,
                a = u.getURLParameter("sitetype");
            if (a === "vas") return function() {};
            var f = new AdBlock,
                l = ["en", "ja"],
                c = n.View.extend({
                    lang: "en",
                    initialize: function() {
                        localization = localization || {};
                        var t = this,
                            n = localization.language || window.navigator.userLanguage || window.navigator.language;
                        n = n.toLowerCase().split("-").shift(), this.lang = l.indexOf(n) === -1 ? "en" : n, f.setOption("checkOnLoad", !1), f.on(!0, function() {
                            window.blockAdBlocker && window.blockAdBlocker(), t.render()
                        }), f.on(!1, function() {
                            e(".ad-block-bg").hide()
                        }), e(window).on("ready", function() {
                            f.check(!1)
                        })
                    },
                    render: function() {
                        var n;
                        this.lang === "ja" ? n = t.template(s)() : n = t.template(o)(), e("body").append(n)
                    }
                });
            return c
        }), define("booster", ["zepto", "underscore", "backbone", "utils/class", "utils/localization", "utils/user.agent", "views/rotation.screen", "views/splash.screen", "views/meta.tags", "views/adblocker.screen", "utils/url", "utils/extend.zepto", "utils/debug.message"], function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
            var p = new h,
                d = r.extend({
                    extendZepto: null,
                    orientation: "both",
                    splash: !0,
                    minimalUI: !1,
                    rotationImage: "rotate.png",
                    splashImage: "BoosterMedia320x115.png",
                    localization: null,
                    rotationOnShow: function() {},
                    rotationOnHide: function() {},
                    initialize: function(t) {
                        p.setMessage("Booster Class initialize: ", t), t == undefined && (t = {}), this.localization = new i, this.localization.load(t.lang), this.extendZepto = new c, window.localization = this.localization, t.orientation != undefined && (this.orientation = t.orientation), t.splash != undefined && (this.splash = Boolean(t.splash)), t.minimalUI != undefined && (this.minimalUI = Boolean(t.minimalUI)), t.rotationImage != undefined && (this.rotationImage = t.rotationImage), t.splashImage != undefined && (this.splashImage = t.splashImage), t.rotationOnShow != undefined && (this.rotationOnShow = t.rotationOnShow), t.rotationOnHide != undefined && (this.rotationOnHide = t.rotationOnHide);
                        var n = "",
                            r = "",
                            a = !1,
                            h = new l;
                        new f;
                        try {
                            n = h.getURLParameter("bm.gameid"), r = h.getURLParameter("bm.source"), r = h.buildProtocolRelativeURL(r), a = h.getURLParameter("bm.splashDisabled") === "true"
                        } catch (d) {
                            console.log(d)
                        }
                        this.splash && !a && new u({
                            splashImage: this.splashImage,
                            bmGameId: n
                        });
                        var v = new s;
                        this.orientation != "both" && (v.isMobile() || v.isIPad() || v.isAndroid()) && new o({
                            orientation: this.orientation,
                            minimalUI: this.minimalUI,
                            rotationImage: this.rotationImage,
                            bmGameId: n,
                            onShow: this.rotationOnShow,
                            onHide: this.rotationOnHide
                        }), e("body").css("height") === "0px" && (this.addBodyHeight(), e(window).resize(this.addBodyHeight))
                    },
                    addBodyHeight: function() {
                        var t = e(window).height();
                        e("body").css("height", Number(t) + "px")
                    }
                });
            return d
        }), define("models/analytics", ["zepto", "underscore", "backbone", "utils/url", "utils/debug.message"], function(e, t, n, r, i) {
            var s = ["UA-34318136-1"],
                o = new i,
                u = n.Model.extend({
                    firstMenuLoad: !0,
                    gameId: 0,
                    name: "",
                    developer: "",
                    category: "",
                    sessionId: "unkown",
                    bmsource: (new r).getURLParameter("bm.source"),
                    initialize: function(n) {
                        o.setMessage("Booster Analytics initialize: ", n), window.Booster.apiProps && !t.isEmpty(window.Booster.apiProps) && window.Booster.apiProps.gameProperties && window.Booster.apiProps.gameProperties["sdk.analyticsId"] && (n.gameAnalyticsId = window.Booster.apiProps.gameProperties["sdk.analyticsId"], o.setMessage("Booster Analytics apiProps gameAnalyticsId applied: ", n)), this.gameId = n.gameId, this.name = n.gameName, this.developer = n.developer, this.category = n.gameCategory, n.gameAnalyticsId !== void 0 && s.push(n.gameAnalyticsId), n.bmsource !== void 0 && (this.bmsource = n.bmsource);
                        var r = document.createElement("script");
                        r.type = "text/javascript", r.async = !0, r.src = ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                        var i = e("script").get(0);
                        i.parentNode.insertBefore(r, i), this._setVariables()
                    },
                    gamePlay: function() {
                        this._trackPageGoogle("gameplay")
                    },
                    initialized: function() {
                        this.firstMenuLoad && (this.firstMenuLoad = !1, this.gamePlay()), this._trackEventGoogle("initialized")
                    },
                    menu: function() {
                        this._trackEventGoogle("menu")
                    },
                    level: function(e) {
                        this._trackEventGoogle("level", parseInt(e))
                    },
                    score: function(e) {
                        this._trackEventGoogle("score", parseInt(e))
                    },
                    levelFailed: function(e) {
                        this._trackEventGoogle("level failed", parseInt(e))
                    },
                    adDisplay: function() {
                        this._trackEventGoogle("adDisplay")
                    },
                    adClick: function() {
                        this._trackEventGoogle("adClick")
                    },
                    adSkip: function() {
                        this._trackEventGoogle("adSkip")
                    },
                    adTimerPassed: function() {
                        this._trackEventGoogle("adTimerPassed")
                    },
                    adBlocked: function() {
                        this._trackEventGoogle("adBlockedByNils")
                    },
                    customEvent: function(e, t) {
                        if (t == undefined) this._trackEventGoogle(e);
                        else try {
                            this._trackEventGoogle(e, t)
                        } catch (n) {
                            console.log("eventData isn't supported in this way, maybe you made a mistake?"), console.log(n)
                        }
                    },
                    moreGames: function() {
                        this._trackEventGoogle("more games")
                    },
                    blockAdBlocker: function() {
                        this._trackEventGoogle("block AdBlocker")
                    },
                    _setVariables: function(e, t, n) {
                        var i = new r,
                            o = String(this.bmsource),
                            u = i.getURLParameter("uno.exp");
                        window._gaq = window._gaq || [];
                        for (var a = 0; a < s.length; a++) window._gaq.push(["b._setAccount", s[a]]), window._gaq.push(["b._setCustomVar", 1, "GameName", '"' + String(this.name) + '"', 3]), window._gaq.push(["b._setCustomVar", 2, "GameID", '"' + String(this.gameId) + '"', 3]), window._gaq.push(["b._setCustomVar", 3, "Category", '"' + String(this.category) + '"', 3]), window._gaq.push(["b._setCustomVar", 5, "Source", '"' + o + '"', 3]), window._gaq.push(["b._setCustomVar", 4, "dimension1", u]);
                        var f = this;
                        window.onMoreGames = function() {
                            f.moreGames()
                        }, window.onAdDisplay = function() {
                            f.adDisplay()
                        }, window.onAdClick = function() {
                            f.adClick()
                        }, window.onAdSkip = function() {
                            f.adSkip()
                        }, window.onTimerPassed = function() {
                            f.adTimerPassed()
                        }, window.onAdBlocked = function() {
                            f.adBlocked()
                        }, window.blockAdBlocker = function() {
                            f.blockAdBlocker()
                        }, this.initialized()
                    },
                    _trackEventGoogle: function(e, t) {
                        for (var n = 0; n < s.length; n++) window._gaq.push(["b._setAccount", s[n]]), typeof t == "number" ? window._gaq.push(["b._trackEvent", this.gameId, e, null, t]) : typeof t == "undefined" ? window._gaq.push(["b._trackEvent", this.gameId, e, null]) : window._gaq.push(["b._trackEvent", this.gameId, e, String(t)])
                    },
                    _trackPageGoogle: function(e) {
                        for (var t = 0; t < s.length; t++) window._gaq.push(["b._setAccount", s[t]]), window._gaq.push(["b._trackPageview", "/ingame/" + this.category + "/" + this.developer + "/" + this.gameId + "/" + this.name + "/" + e])
                    }
                });
            return u
        });
    var NO_JQUERY = {};
    (function(e, t, n) {
        if (!("console" in e)) {
            var r = e.console = {};
            r.log = r.warn = r.error = r.debug = function() {}
        }
        t === NO_JQUERY && (t = {
            fn: {},
            extend: function() {
                var e = arguments[0];
                for (var t = 1, n = arguments.length; t < n; t++) {
                    var r = arguments[t];
                    for (var i in r) e[i] = r[i]
                }
                return e
            }
        }), t.fn.pm = function() {
            return console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])"), this
        }, t.pm = e.pm = function(e) {
            i.send(e)
        }, t.pm.bind = e.pm.bind = function(e, t, n, r, s) {
            i.bind(e, t, n, r, s === !0)
        }, t.pm.unbind = e.pm.unbind = function(e, t) {
            i.unbind(e, t)
        }, t.pm.origin = e.pm.origin = null, t.pm.poll = e.pm.poll = 200;
        var i = {
            send: function(e) {
                var n = t.extend({}, i.defaults, e),
                    r = n.target;
                if (!n.target) {
                    console.warn("postmessage target window required");
                    return
                }
                if (!n.type) {
                    console.warn("postmessage type required");
                    return
                }
                var s = {
                    data: n.data,
                    type: n.type
                };
                n.success && (s.callback = i._callback(n.success)), n.error && (s.errback = i._callback(n.error)), "postMessage" in r && !n.hash ? (i._bind(), r.postMessage(JSON.stringify(s), n.origin || "*")) : (i.hash._bind(), i.hash.send(n, s))
            },
            bind: function(e, t, n, r, s) {
                i._replyBind(e, t, n, r, s)
            },
            _replyBind: function(n, r, s, o, u) {
                "postMessage" in e && !o ? i._bind() : i.hash._bind();
                var a = i.data("listeners.postmessage");
                a || (a = {}, i.data("listeners.postmessage", a));
                var f = a[n];
                f || (f = [], a[n] = f), f.push({
                    fn: r,
                    callback: u,
                    origin: s || t.pm.origin
                })
            },
            unbind: function(e, t) {
                var n = i.data("listeners.postmessage");
                if (n)
                    if (e)
                        if (t) {
                            var r = n[e];
                            if (r) {
                                var s = [];
                                for (var o = 0, u = r.length; o < u; o++) {
                                    var a = r[o];
                                    a.fn !== t && s.push(a)
                                }
                                n[e] = s
                            }
                        } else delete n[e];
                else
                    for (var o in n) delete n[o]
            },
            data: function(e, t) {
                return t === n ? i._data[e] : (i._data[e] = t, t)
            },
            _data: {},
            _CHARS: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
            _random: function() {
                var e = [];
                for (var t = 0; t < 32; t++) e[t] = i._CHARS[0 | Math.random() * 32];
                return e.join("")
            },
            _callback: function(e) {
                var t = i.data("callbacks.postmessage");
                t || (t = {}, i.data("callbacks.postmessage", t));
                var n = i._random();
                return t[n] = e, n
            },
            _bind: function() {
                i.data("listening.postmessage") || (e.addEventListener ? e.addEventListener("message", i._dispatch, !1) : e.attachEvent && e.attachEvent("onmessage", i._dispatch), i.data("listening.postmessage", 1))
            },
            _dispatch: function(e) {
                try {
                    var t = JSON.parse(e.data)
                } catch (n) {
                    console.warn("postmessage data invalid json: ", n);
                    return
                }
                if (!t.type) {
                    console.warn("postmessage message type required");
                    return
                }
                var r = i.data("callbacks.postmessage") || {},
                    s = r[t.type];
                if (s) s(t.data);
                else {
                    var o = i.data("listeners.postmessage") || {},
                        u = o[t.type] || [];
                    for (var a = 0, f = u.length; a < f; a++) {
                        var l = u[a];
                        if (l.origin && l.origin !== "*" && e.origin !== l.origin) {
                            console.warn("postmessage message origin mismatch", e.origin, l.origin);
                            if (t.errback) {
                                var c = {
                                    message: "postmessage origin mismatch",
                                    origin: [e.origin, l.origin]
                                };
                                i.send({
                                    target: e.source,
                                    data: c,
                                    type: t.errback
                                })
                            }
                            continue
                        }

                        function h(n) {
                            t.callback && i.send({
                                target: e.source,
                                data: n,
                                type: t.callback
                            })
                        }
                        try {
                            l.callback ? l.fn(t.data, h, e) : h(l.fn(t.data, e))
                        } catch (n) {
                            if (!t.errback) throw n;
                            i.send({
                                target: e.source,
                                data: n,
                                type: t.errback
                            })
                        }
                    }
                }
            }
        };
        i.hash = {
            send: function(t, n) {
                var r = t.target,
                    s = t.url;
                if (!s) {
                    console.warn("postmessage target window url is required");
                    return
                }
                s = i.hash._url(s);
                var o, u = i.hash._url(e.location.href);
                if (e == r.parent) o = "parent";
                else try {
                    for (var a = 0, f = parent.frames.length; a < f; a++) {
                        var l = parent.frames[a];
                        if (l == e) {
                            o = a;
                            break
                        }
                    }
                } catch (c) {
                    o = e.name
                }
                if (o == null) {
                    console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list");
                    return
                }
                var h = {
                        "x-requested-with": "postmessage",
                        source: {
                            name: o,
                            url: u
                        },
                        postmessage: n
                    },
                    p = "#x-postmessage-id=" + i._random();
                r.location = s + p + encodeURIComponent(JSON.stringify(h))
            },
            _regex: /^\#x\-postmessage\-id\=(\w{32})/,
            _regex_len: "#x-postmessage-id=".length + 32,
            _bind: function() {
                i.data("polling.postmessage") || (setInterval(function() {
                    var t = "" + e.location.hash,
                        n = i.hash._regex.exec(t);
                    if (n) {
                        var r = n[1];
                        i.hash._last !== r && (i.hash._last = r, i.hash._dispatch(t.substring(i.hash._regex_len)))
                    }
                }, t.pm.poll || 200), i.data("polling.postmessage", 1))
            },
            _dispatch: function(t) {
                if (!t) return;
                try {
                    t = JSON.parse(decodeURIComponent(t));
                    if (!(t["x-requested-with"] === "postmessage" && t.source && t.source.name != null && t.source.url && t.postmessage)) return
                } catch (n) {
                    return
                }
                var r = t.postmessage,
                    s = i.data("callbacks.postmessage") || {},
                    o = s[r.type];
                if (o) o(r.data);
                else {
                    var u;
                    t.source.name === "parent" ? u = e.parent : u = e.frames[t.source.name];
                    var a = i.data("listeners.postmessage") || {},
                        f = a[r.type] || [];
                    for (var l = 0, c = f.length; l < c; l++) {
                        var h = f[l];
                        if (h.origin) {
                            var p = /https?\:\/\/[^\/]*/.exec(t.source.url)[0];
                            if (h.origin !== "*" && p !== h.origin) {
                                console.warn("postmessage message origin mismatch", p, h.origin);
                                if (r.errback) {
                                    var d = {
                                        message: "postmessage origin mismatch",
                                        origin: [p, h.origin]
                                    };
                                    i.send({
                                        target: u,
                                        data: d,
                                        type: r.errback,
                                        hash: !0,
                                        url: t.source.url
                                    })
                                }
                                continue
                            }
                        }

                        function v(e) {
                            r.callback && i.send({
                                target: u,
                                data: e,
                                type: r.callback,
                                hash: !0,
                                url: t.source.url
                            })
                        }
                        try {
                            h.callback ? h.fn(r.data, v) : v(h.fn(r.data))
                        } catch (n) {
                            if (!r.errback) throw n;
                            i.send({
                                target: u,
                                data: n,
                                type: r.errback,
                                hash: !0,
                                url: t.source.url
                            })
                        }
                    }
                }
            },
            _url: function(e) {
                return ("" + e).replace(/#.*$/, "")
            }
        }, t.extend(i, {
            defaults: {
                target: null,
                url: null,
                type: null,
                data: null,
                success: null,
                error: null,
                origin: "*",
                hash: !1
            }
        })
    })(this, typeof jQuery == "undefined" ? NO_JQUERY : jQuery), "JSON" in window && window.JSON || (JSON = {}),
        function() {
            function f(e) {
                return e < 10 ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                    var t = meta[e];
                    return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, r, i, s, o = gap,
                    u, a = t[e];
                a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
                switch (typeof a) {
                    case "string":
                        return quote(a);
                    case "number":
                        return isFinite(a) ? String(a) : "null";
                    case "boolean":
                    case "null":
                        return String(a);
                    case "object":
                        if (!a) return "null";
                        gap += indent, u = [];
                        if (Object.prototype.toString.apply(a) === "[object Array]") {
                            s = a.length;
                            for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                            return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                        }
                        if (rep && typeof rep == "object") {
                            s = rep.length;
                            for (n = 0; n < s; n += 1) r = rep[n], typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                        } else
                            for (r in a) Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                        return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
                }
            }
            typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
                return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
                return this.valueOf()
            });
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
                var r;
                gap = "", indent = "";
                if (typeof n == "number")
                    for (r = 0; r < n; r += 1) indent += " ";
                else typeof n == "string" && (indent = n);
                rep = t;
                if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                    "": e
                });
                throw new Error("JSON.stringify")
            }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
                function walk(e, t) {
                    var n, r, i = e[t];
                    if (i && typeof i == "object")
                        for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                    return reviver.call(e, t, i)
                }
                var j;
                cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }));
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }(), define("postmessage", function() {}), define("text!templates/community.html", [], function() {
            return '<iframe id="booster-community-tab" name="booster-community-tab" class="hide" src="<%- source %>/sdk.index/index?bm.gameid=<%- bmGameId %>" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>\r\n'
        }), define("models/savestate.model", ["backbone", "utils/url", "utils/debug.message"], function(e, t, n) {
            var r = new n,
                i = e.Model.extend({
                    giCustomerCode: "'",
                    giGameCode: "",
                    giDestinationCode: "",
                    giDestinationEndUserName: "",
                    giCommunityUrl: "",
                    giLoginUrl: "",
                    giSession: null,
                    communityEnabled: !1,
                    profileAvailable: !1,
                    uiCommunityName: "",
                    uiCommunityAvatarUrl: "",
                    loadPackage: null,
                    gameId: (new t).getURLParameter("bm.gameid"),
                    category: (new t).getURLParameter("bm.category"),
                    bmsource: (new t).getURLParameter("bm.source"),
                    initialize: function(e) {
                        r.setMessage("Booster Savestate initialize: ", e);
                        var n = new t;
                        e = e || {}, e.gameId !== void 0 && (this.gameId = e.gameId), e.bmsource !== void 0 && (this.bmsource = e.bmsource), e.category !== void 0 && (this.category = e.category), this.gameId != "null" && this.bmsource != "null" && (this.requestGameCode(this.gameId, this.bmsource), this.initCommunity())
                    },
                    requestGameCode: function(e, n) {
                        var r = new t,
                            i = r.buildProtocolRelativeURL(n) + "/boosterbar.bbresolvegamecode/bbresolvegamecode?gameId=" + e,
                            s = new XMLHttpRequest;
                        s.open("GET", i, !1), s.send(), this.giGameCode = s.responseText, console.log(s.responseText)
                    },
                    initCommunity: function() {
                        var e = this,
                            t = new XMLHttpRequest;
                        t.onload = function() {
                            try {
                                e.hasCommunity(JSON.parse(t.responseText)), e.giSession && e.giSession !== "" && e.initProfile()
                            } catch (n) {
                                console.warn("Error parsing json in initCommunity")
                            }
                        }, t.onerror = function() {
                            console.warn("Error fetching url in initCommunity")
                        };
                        var n = "//" + this.bmsource + "/gameinfo/" + this.gameId + "?gameCode=" + this.giGameCode + "&categoryCode=" + this.category;
                        t.open("get", n, !0), "withCredentials" in t && (t.withCredentials = !0), t.setRequestHeader("Content-type", "text/plain"), t.send()
                    },
                    hasCommunity: function(e) {
                        this.giCustomerCode = e.customerCode, this.giDestinationCode = e.destinationCode, this.giDestinationEndUserName = e.destinationEndUserName, this.giCommunityUrl = e.communityUrl, this.giLoginUrl = e.loginUrl, this.giSession = e.session, this.giCommunityUrl !== null && (this.communityEnabled = !0)
                    },
                    initProfile: function() {
                        if (this.gameId === undefined || this.gameId === null) {
                            console.warn("Before calling initProfile make sure to call initCommunity");
                            return
                        }
                        var e = this,
                            t = new XMLHttpRequest;
                        t.onload = function() {
                            try {
                                e.userHasProfile(JSON.parse(t.responseText))
                            } catch (n) {
                                console.warn("Error parsing json in initProfile")
                            }
                        }, t.onerror = function() {
                            console.warn("Error fetching url in initProfile")
                        };
                        var n = this.giCommunityUrl + "api/v1/" + this.giCustomerCode + "/" + this.giDestinationCode + "/profile/me?session=" + this.giSession;
                        t.open("get", n, !0), "withCredentials" in t && (t.withCredentials = !0), t.setRequestHeader("Content-type", "text/plain"), t.send()
                    },
                    userHasProfile: function(e) {
                        e && e.hasOwnProperty("payload") && (this.uiCommunityName = e.payload.username, this.uiCommunityAvatarUrl = e.payload.avatar.small, this.profileAvailable = !0)
                    },
                    userLoggedIn: function() {
                        return Booster.loggedIn = !!this.giSession && this.profileAvailable
                    },
                    getCommunityUrl: function() {
                        var e = "v1";
                        return this.giCommunityUrl + "api/" + e + "/" + this.giCustomerCode + "/" + this.giDestinationCode + "/state/" + this.giGameCode + "/"
                    },
                    save: function(e) {
                        this.userLoggedIn() == 1 && this.saveToRemote(e)
                    },
                    saveToRemote: function(e) {
                        var t = this,
                            n = new XMLHttpRequest,
                            r = this.getCommunityUrl() + "set/",
                            i = "values=" + JSON.stringify(e) + "&session=" + this.giSession;
                        n.onerror = function() {
                            console.warn("Error fetching url in saveRemote")
                        }, n.open("post", r + "?" + i, !0), n.send(i)
                    },
                    load: function(e) {
                        if (this.userLoggedIn() == 1) return this.loadFromRemote(e)
                    },
                    loadFromRemote: function(e) {
                        e = e.join(",");
                        var t = new XMLHttpRequest,
                            n = this;
                        t.onload = function() {
                            JSON.parse(t.responseText), n.handleLoadResponse(JSON.parse(t.responseText))
                        };
                        var r = this.getCommunityUrl(),
                            i = "keys=" + e + "&session=" + this.giSession;
                        t.open("get", r + "?" + i, !0), t.send()
                    },
                    handleLoadResponse: function(e) {
                        return loadPackage = e.payload.values, loadPackage
                    }
                });
            return i
        }), define("views/community.frame", ["zepto", "underscore", "backbone", "postmessage", "text!templates/community.html", "utils/url", "models/savestate.model", "utils/debug.message"], function(e, t, n, r, i, s, o, u) {
            var a = new u,
                f = n.View.extend({
                    el: "body",
                    savestate: {},
                    bmsource: (new s).getURLParameter("bm.source"),
                    initialize: function(e) {
                        var t = e.bmGameId || e.gameId;
                        a.setMessage("Community initialized"), this.render(t), e.bmsource !== void 0 && (this.bmsource = e.bmsource)
                    },
                    close: function() {
                        e("iframe#booster-community-tab").addClass("hide")
                    },
                    open: function() {
                        e("iframe#booster-community-tab").removeClass();
                        var t = new s;
                        pm({
                            target: window.frames["booster-community-tab"],
                            url: t.buildProtocolRelativeURL(this.bmsource),
                            type: "open-menu"
                        })
                    },
                    render: function(n) {
                        var r = new s,
                            o = t.template(i, {
                                bmGameId: n,
                                source: r.buildProtocolRelativeURL(this.bmsource)
                            });
                        e("body").append(o)
                    }
                });
            return f
        }), define("models/highscore", ["backbone"], function(e) {
            var t = e.Model.extend({
                defaults: {
                    score: 0
                },
                initialize: function() {},
                submit: function(e) {
                    return this.get("score") < e ? (this.set("score", e), !0) : !1
                }
            }, {
                singleton: null,
                getInstance: function() {
                    return t.singleton = t.singleton || new t, t.singleton
                }
            });
            return t
        }), define("text!templates/highscore.html", [], function() {
            return '<iframe id="booster-highscore-popup" name="booster-highscore-popup" class="hide" src="<%- source %>/sdk.highscore/highscore?bm.gameid=<%- bmGameId %><%= iframe %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("utils/cookie", ["utils/class", "utils/url"], function(e, t) {
            var n = e.extend({
                setCookie: function(e, t, n) {
                    var r = "";
                    if (n) {
                        var i = new Date;
                        i.setTime(i.getTime() + n * 60 * 1e3), r = "expires=" + i.toGMTString()
                    }
                    document.cookie = e + "=" + t + "; " + r + ";path=/"
                },
                setHighscoreCookie: function(e, t) {
                    var n = window.location.origin + "/shared/booster/yahoo-timeapi/yahootime.php",
                        r = new XMLHttpRequest;
                    r.open("GET", n, !1), r.send(), this.setCookie(e, t, r.responseText)
                },
                returnUpcomingSunday: function(e) {
                    var t = 36e5;
                    return t.toExponential() * e * 24
                },
                getCookie: function(e) {
                    var t = e + "=",
                        n = document.cookie.split(";");
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r];
                        while (i.charAt(0) === " ") i = i.substring(1);
                        if (i.indexOf(t) !== -1) return i.substring(t.length, i.length)
                    }
                    return null
                }
            });
            return n
        }), define("views/highscore.frame", ["zepto", "underscore", "backbone", "postmessage", "models/highscore", "text!templates/highscore.html", "utils/url", "utils/cookie", "utils/debug.message"], function(e, t, n, r, i, s, o, u, a) {
            var f = new a,
                l = n.View.extend({
                    callback: new Function,
                    bmsource: (new o).getURLParameter("bm.source"),
                    gmo_iframe: window.name.indexOf("gmo_iframe") !== -1,
                    initialize: function(e) {
                        f.setMessage("Highscore frame initialize: ", e);
                        var t = e.bmGameId || e.gameId;
                        this._render(e.bmGameId), e.bmsource !== void 0 && (this.bmsource = e.bmsource);
                        var n = this;
                        pm.bind("bbhighscore", function(e) {
                            n._close()
                        }), pm.bind("refreshHighscore", function(e) {
                            n._refresh()
                        })
                    },
                    getHighscoreFrameName: function() {
                        return "booster-highscore-popup"
                    },
                    _close: function() {
                        this.callback != undefined && this.callback.call(), e("iframe#" + this.getHighscoreFrameName()).addClass("hide")
                    },
                    _refresh: function() {
                        this._close(), pm({
                            target: window.frames[this.getHighscoreFrameName()],
                            type: "refreshHighscorePage"
                        })
                    },
                    submitSession: function(e) {
                        var t = new u,
                            n = t.getCookie("sessionData_" + e.bmGameId);
                        n || (n = t.getCookie("sessionData"));
                        var r = n ? JSON.parse(n) : {},
                            i = 0;
                        if (r[e.level] == undefined || parseInt(r[e.level]) < parseInt(e.score)) r[e.level] = e.score;
                        for (var s in r) i += parseInt(r[s]);
                        t.setHighscoreCookie("sessionData_" + e.bmGameId, JSON.stringify(r)), this.submit({
                            score: i,
                            bmGameId: e.bmGameId,
                            callback: e.callback
                        })
                    },
                    submit: function(e) {
                        var t = i.getInstance(),
                            n = new o,
                            r = Math.round(e.score);
                        n.getURLParameter("submitallscores") == "true" || t.submit(r) ? this.scoreSubmit(e, r) : (this.callback = e.callback, this.callback.call())
                    },
                    scoreSubmit: function(t, n) {
                        f.setMessage("score submitted: " + n);
                        var r = new o;
                        this.callback = t.callback, e("iframe#" + this.getHighscoreFrameName()).removeClass("hide"), pm({
                            target: window.frames[this.getHighscoreFrameName()],
                            url: r.buildProtocolRelativeURL(r.getURLParameter("bm.source")),
                            type: "open-highscore",
                            data: {
                                highscore: n,
                                bmGameId: t.bmGameId
                            },
                            success: function(e) {
                                console.log(e)
                            },
                            error: function(e) {
                                console.log(e)
                            }
                        })
                    },
                    _render: function(n) {
                        var r = new o,
                            i = t.template(s, {
                                bmGameId: n,
                                iframe: this.gmo_iframe ? "&iframe=true" : "",
                                source: r.buildProtocolRelativeURL(this.bmsource)
                            });
                        e("body").append(i)
                    }
                });
            return l
        }), define("text!templates/tab.html", [], function() {
            return '<div id="booster-tab" class="icon-menu <%= side %>"></div>'
        }), define("text!templates/logo-tab.html", [], function() {
            return '<div id="booster-tab-logo" class="<%- side %>" style="background-image: url(<%- baseURL %>/images/<%- icon %>)"></div>\r\n'
        }), define("text!templates/noTab.html", [], function() {
            return '<div id="booster-noTab" class="hide"></div>\r\n'
        }), define("views/booster.tab", ["zepto", "underscore", "backbone", "postmessage", "views/community.frame", "views/highscore.frame", "text!templates/tab.html", "text!templates/logo-tab.html", "text!templates/noTab.html", "utils/url", "utils/debug.message"], function(e, t, n, r, i, s, o, u, a, f, l) {
            var c = new l,
                h = n.View.extend({
                    TOTAL_NR_OF_POSITIONS: 18,
                    el: "body",
                    events: {
                        "touchend #booster-tab": "_click",
                        "touchend #booster-tab-logo": "_click"
                    },
                    community: {},
                    highscore: {},
                    isOpen: !1,
                    position: 0,
                    side: "left",
                    menuIcon: undefined,
                    clicked: !1,
                    hasId: !1,
                    gameId: (new f).getURLParameter("bm.gameid"),
                    bmsource: (new f).getURLParameter("bm.source"),
                    noTab: !1,
                    initialize: function(t) {
                        c.setMessage("Booster Tab initialize: ", t), t.gameId !== void 0 && (this.gameId = t.gameId), t.bmsource !== void 0 && (this.bmsource = t.bmsource), t.gameCode !== void 0 && (window.__gameCode = t.gameCode), t.position != undefined && (this.position = t.position, this.side = this.position <= this.TOTAL_NR_OF_POSITIONS / 2 ? "left" : "right", t.tabIcon && (t.tabIcon.indexOf(".png") != -1 ? this.menuIcon = t.tabIcon : console.log("File for the menu icon isn't a .png extension"))), !t.noTab || (this.noTab = !!t.noTab);
                        var n = new f;
                        this.bmsource != "null" && this.gameId != "null" ? (c.setMessage("Booster tab rendered, bm.source & bm.gameid present in url"), this.hasId = !0, this._render()) : c.setMessage("Booster tab not rendered, no bm.source & bm.game present in url");
                        var r = this;
                        e("#booster-tab").click(function(e) {
                            r._click(e)
                        }), e("#booster-tab-logo").click(function(e) {
                            r._click(e)
                        }), pm.bind("bbmenu", function(e) {
                            r._close()
                        }), pm.bind("content-loaded", function(e) {
                            r._initCommunity()
                        }), pm.bind("bblogin", function(e) {
                            r.goToLogin()
                        }), pm.bind("backtoPortal", function() {
                            r.goBackToPortal()
                        }), pm.bind("refreshPage", function(e) {
                            r._refresh()
                        })
                    },
                    _click: function(e) {
                        e.preventDefault();
                        if (!this.clicked) {
                            this.clicked = !0;
                            var t = this;
                            setTimeout(function() {
                                t._open()
                            }, 400);
                            var t = this;
                            setTimeout(function() {
                                t.clicked = !1
                            }, 1e3)
                        }
                    },
                    _close: function() {
                        e("#booster-tab").removeClass("hide"), e("#booster-tab-logo").removeClass("hide"), this.isOpen = !1, this.community.close();
                        try {
                            window.Booster.onCloseTab.call()
                        } catch (t) {
                            console.log("onCloseTab not implemented")
                        }
                    },
                    getPosition: function() {
                        return this.position <= this.TOTAL_NR_OF_POSITIONS / 2 ? Number(this.position) * 10 + "" : Number(this.position - this.TOTAL_NR_OF_POSITIONS / 2) * 10 + ""
                    },
                    goBackToPortal: function() {
                        var e = new f;
                        window.top.location = e.buildProtocolRelativeURL(this.bmsource)
                    },
                    goToLogin: function() {
                        var e = window.top.location.href,
                            t = new f;
                        window.top.location = t.buildProtocolRelativeURL(this.bmsource + "/community.login/login?source=boosterBar&ret=" + encodeURIComponent(e))
                    },
                    _initCommunity: function() {
                        var t = this.getPosition();
                        e("#booster-tab").removeClass("hide"), e("#booster-tab-logo").removeClass("hide"), pm({
                            target: window.frames["booster-community-tab"],
                            type: "content-pos",
                            data: {
                                position: "content-" + this.side,
                                top: t
                            },
                            error: function(e) {
                                console.log(e)
                            }
                        })
                    },
                    _open: function() {
                        e("#booster-tab").addClass("hide"), e("#booster-tab-logo").addClass("hide"), this.isOpen = !0, this.community.open();
                        try {
                            window.Booster.onOpenTab.call()
                        } catch (t) {
                            console.log("onOpenTab not implemented")
                        }
                    },
                    _refresh: function() {
                        this._close(), pm({
                            target: window.frames["booster-community-tab"],
                            type: "refreshPage"
                        })
                    },
                    _render: function() {
                        if (this.noTab) var n = t.template(a)();
                        else if (this.menuIcon != undefined) var n = t.template(u, {
                            side: this.side,
                            baseURL: window.bb_base_path,
                            icon: this.menuIcon
                        });
                        else var n = t.template(o, {
                            side: this.side
                        });
                        e("body").append(n), e("#booster-tab-logo").css("top", this.getPosition() + "%"), e("#booster-tab").css("top", this.getPosition() + "%"), e("#booster-tab").addClass("hide"), e("#booster-tab-logo").addClass("hide"), this.community = new i({
                            bmGameId: this.gameId
                        }), this.highscore = new s({
                            bmGameId: this.gameId
                        })
                    },
                    submitScore: function(e) {
                        this.hasId ? this.highscore.submit({
                            score: e.score,
                            bmGameId: this.gameId,
                            callback: e.callback
                        }) : e.callback != undefined && e.callback.call()
                    },
                    submitSessionScore: function(e) {
                        this.hasId ? this.highscore.submitSession({
                            level: e.level,
                            score: e.score,
                            bmGameId: this.gameId,
                            callback: e.callback
                        }) : e.callback != undefined && e.callback.call()
                    }
                });
            return h
        }),
        function(e) {
            var t = "Close",
                n = "BeforeClose",
                r = "AfterClose",
                i = "BeforeAppend",
                s = "MarkupParse",
                o = "Open",
                u = "Change",
                a = "mfp",
                f = "." + a,
                l = "mfp-ready",
                c = "mfp-removing",
                h = "mfp-prevent-close",
                p, d = function() {},
                v = !!window.jQuery,
                m, g = e(window),
                y, b, w, E, S, x = function(e, t) {
                    p.ev.on(a + e + f, t)
                },
                T = function(t, n, r, i) {
                    var s = document.createElement("div");
                    return s.className = "mfp-" + t, r && (s.innerHTML = r), i ? n && n.appendChild(s) : (s = e(s), n && s.appendTo(n)), s
                },
                N = function(t, n) {
                    p.ev.triggerHandler(a + t, n), p.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), p.st.callbacks[t] && p.st.callbacks[t].apply(p, e.isArray(n) ? n : [n]))
                },
                C = function(t) {
                    if (t !== S || !p.currTemplate.closeBtn) p.currTemplate.closeBtn = e(p.st.closeMarkup.replace("%title%", p.st.tClose)), S = t;
                    return p.currTemplate.closeBtn
                },
                k = function() {
                    e.magnificPopup.instance || (p = new d, p.init(), e.magnificPopup.instance = p)
                },
                L = function() {
                    var e = document.createElement("p").style,
                        t = ["ms", "O", "Moz", "Webkit"];
                    if (e.transition !== undefined) return !0;
                    while (t.length)
                        if (t.pop() + "Transition" in e) return !0;
                    return !1
                };
            d.prototype = {
                constructor: d,
                init: function() {
                    var t = navigator.appVersion;
                    p.isIE7 = t.indexOf("MSIE 7.") !== -1, p.isIE8 = t.indexOf("MSIE 8.") !== -1, p.isLowIE = p.isIE7 || p.isIE8, p.isAndroid = /android/gi.test(t), p.isIOS = /iphone|ipad|ipod/gi.test(t), p.supportsTransition = L(), p.probablyMobile = p.isAndroid || p.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), b = e(document), p.popupsCache = {}
                },
                open: function(t) {
                    y || (y = e(document.body));
                    var n;
                    if (t.isObj === !1) {
                        p.items = t.items.toArray(), p.index = 0;
                        var r = t.items,
                            i;
                        for (n = 0; n < r.length; n++) {
                            i = r[n], i.parsed && (i = i.el[0]);
                            if (i === t.el[0]) {
                                p.index = n;
                                break
                            }
                        }
                    } else p.items = e.isArray(t.items) ? t.items : [t.items], p.index = t.index || 0;
                    if (p.isOpen) {
                        p.updateItemHTML();
                        return
                    }
                    p.types = [], E = "", t.mainEl && t.mainEl.length ? p.ev = t.mainEl.eq(0) : p.ev = b, t.key ? (p.popupsCache[t.key] || (p.popupsCache[t.key] = {}), p.currTemplate = p.popupsCache[t.key]) : p.currTemplate = {}, p.st = e.extend(!0, {}, e.magnificPopup.defaults, t), p.fixedContentPos = p.st.fixedContentPos === "auto" ? !p.probablyMobile : p.st.fixedContentPos, p.st.modal && (p.st.closeOnContentClick = !1, p.st.closeOnBgClick = !1, p.st.showCloseBtn = !1, p.st.enableEscapeKey = !1), p.bgOverlay || (p.bgOverlay = T("bg").on("click" + f, function() {
                        p.close()
                    }), p.wrap = T("wrap").attr("tabindex", -1).on("click" + f, function(e) {
                        p._checkIfClose(e.target) && p.close()
                    }), p.container = T("container", p.wrap)), p.contentContainer = T("content"), p.st.preloader && (p.preloader = T("preloader", p.container, p.st.tLoading));
                    var u = e.magnificPopup.modules;
                    for (n = 0; n < u.length; n++) {
                        var a = u[n];
                        a = a.charAt(0).toUpperCase() + a.slice(1), p["init" + a].call(p)
                    }
                    N("BeforeOpen"), p.st.showCloseBtn && (p.st.closeBtnInside ? (x(s, function(e, t, n, r) {
                        n.close_replaceWith = C(r.type)
                    }), E += " mfp-close-btn-in") : p.wrap.append(C())), p.st.alignTop && (E += " mfp-align-top"), p.fixedContentPos ? p.wrap.css({
                        overflow: p.st.overflowY,
                        overflowX: "hidden",
                        overflowY: p.st.overflowY
                    }) : p.wrap.css({
                        top: g.scrollTop(),
                        position: "absolute"
                    }), (p.st.fixedBgPos === !1 || p.st.fixedBgPos === "auto" && !p.fixedContentPos) && p.bgOverlay.css({
                        height: b.height(),
                        position: "absolute"
                    }), p.st.enableEscapeKey && b.on("keyup" + f, function(e) {
                        e.keyCode === 27 && p.close()
                    }), g.on("resize" + f, function() {
                        p.updateSize()
                    }), p.st.closeOnContentClick || (E += " mfp-auto-cursor"), E && p.wrap.addClass(E);
                    var c = p.wH = g.height(),
                        h = {};
                    if (p.fixedContentPos && p._hasScrollBar(c)) {
                        var d = p._getScrollbarSize();
                        d && (h.marginRight = d)
                    }
                    p.fixedContentPos && (p.isIE7 ? e("body, html").css("overflow", "hidden") : h.overflow = "hidden");
                    var v = p.st.mainClass;
                    return p.isIE7 && (v += " mfp-ie7"), v && p._addClassToMFP(v), p.updateItemHTML(), N("BuildControls"), e("html").css(h), p.bgOverlay.add(p.wrap).prependTo(p.st.prependTo || y), p._lastFocusedEl = document.activeElement, setTimeout(function() {
                        p.content ? (p._addClassToMFP(l), p._setFocus()) : p.bgOverlay.addClass(l), b.on("focusin" + f, p._onFocusIn)
                    }, 16), p.isOpen = !0, p.updateSize(c), N(o), t
                },
                close: function() {
                    if (!p.isOpen) return;
                    N(n), p.isOpen = !1, p.st.removalDelay && !p.isLowIE && p.supportsTransition ? (p._addClassToMFP(c), setTimeout(function() {
                        p._close()
                    }, p.st.removalDelay)) : p._close()
                },
                _close: function() {
                    N(t);
                    var n = c + " " + l + " ";
                    p.bgOverlay.detach(), p.wrap.detach(), p.container.empty(), p.st.mainClass && (n += p.st.mainClass + " "), p._removeClassFromMFP(n);
                    if (p.fixedContentPos) {
                        var i = {
                            marginRight: ""
                        };
                        p.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
                    }
                    b.off("keyup" + f + " focusin" + f), p.ev.off(f), p.wrap.attr("class", "mfp-wrap").removeAttr("style"), p.bgOverlay.attr("class", "mfp-bg"), p.container.attr("class", "mfp-container"), p.st.showCloseBtn && (!p.st.closeBtnInside || p.currTemplate[p.currItem.type] === !0) && p.currTemplate.closeBtn && p.currTemplate.closeBtn.detach(), p._lastFocusedEl && e(p._lastFocusedEl).focus(), p.currItem = null, p.content = null, p.currTemplate = null, p.prevHeight = 0, N(r)
                },
                updateSize: function(e) {
                    if (p.isIOS) {
                        var t = document.documentElement.clientWidth / window.innerWidth,
                            n = window.innerHeight * t;
                        p.wrap.css("height", n), p.wH = n
                    } else p.wH = e || g.height();
                    p.fixedContentPos || p.wrap.css("height", p.wH), N("Resize")
                },
                updateItemHTML: function() {
                    var t = p.items[p.index];
                    p.contentContainer.detach(), p.content && p.content.detach(), t.parsed || (t = p.parseEl(p.index));
                    var n = t.type;
                    N("BeforeChange", [p.currItem ? p.currItem.type : "", n]), p.currItem = t;
                    if (!p.currTemplate[n]) {
                        var r = p.st[n] ? p.st[n].markup : !1;
                        N("FirstMarkupParse", r), r ? p.currTemplate[n] = e(r) : p.currTemplate[n] = !0
                    }
                    w && w !== t.type && p.container.removeClass("mfp-" + w + "-holder");
                    var i = p["get" + n.charAt(0).toUpperCase() + n.slice(1)](t, p.currTemplate[n]);
                    p.appendContent(i, n), t.preloaded = !0, N(u, t), w = t.type, p.container.prepend(p.contentContainer), N("AfterChange")
                },
                appendContent: function(e, t) {
                    p.content = e, e ? p.st.showCloseBtn && p.st.closeBtnInside && p.currTemplate[t] === !0 ? p.content.find(".mfp-close").length || p.content.append(C()) : p.content = e : p.content = "", N(i), p.container.addClass("mfp-" + t + "-holder"), p.contentContainer.append(p.content)
                },
                parseEl: function(t) {
                    var n = p.items[t],
                        r;
                    n.tagName ? n = {
                        el: e(n)
                    } : (r = n.type, n = {
                        data: n,
                        src: n.src
                    });
                    if (n.el) {
                        var i = p.types;
                        for (var s = 0; s < i.length; s++)
                            if (n.el.hasClass("mfp-" + i[s])) {
                                r = i[s];
                                break
                            }
                        n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
                    }
                    return n.type = r || p.st.type || "inline", n.index = t, n.parsed = !0, p.items[t] = n, N("ElementParse", n), p.items[t]
                },
                addGroup: function(e, t) {
                    var n = function(n) {
                        n.mfpEl = this, p._openClick(n, e, t)
                    };
                    t || (t = {});
                    var r = "click.magnificPopup";
                    t.mainEl = e, t.items ? (t.isObj = !0, e.off(r).on(r, n)) : (t.isObj = !1, t.delegate ? e.off(r).on(r, t.delegate, n) : (t.items = e, e.off(r).on(r, n)))
                },
                _openClick: function(t, n, r) {
                    var i = r.midClick !== undefined ? r.midClick : e.magnificPopup.defaults.midClick;
                    if (!i && (t.which === 2 || t.ctrlKey || t.metaKey)) return;
                    var s = r.disableOn !== undefined ? r.disableOn : e.magnificPopup.defaults.disableOn;
                    if (s)
                        if (e.isFunction(s)) {
                            if (!s.call(p)) return !0
                        } else if (g.width() < s) return !0;
                    t.type && (t.preventDefault(), p.isOpen && t.stopPropagation()), r.el = e(t.mfpEl), r.delegate && (r.items = n.find(r.delegate)), p.open(r)
                },
                updateStatus: function(e, t) {
                    if (p.preloader) {
                        m !== e && p.container.removeClass("mfp-s-" + m), !t && e === "loading" && (t = p.st.tLoading);
                        var n = {
                            status: e,
                            text: t
                        };
                        N("UpdateStatus", n), e = n.status, t = n.text, p.preloader.html(t), p.preloader.find("a").on("click", function(e) {
                            e.stopImmediatePropagation()
                        }), p.container.addClass("mfp-s-" + e), m = e
                    }
                },
                _checkIfClose: function(t) {
                    if (e(t).hasClass(h)) return;
                    var n = p.st.closeOnContentClick,
                        r = p.st.closeOnBgClick;
                    if (n && r) return !0;
                    if (!p.content || e(t).hasClass("mfp-close") || p.preloader && t === p.preloader[0]) return !0;
                    if (t !== p.content[0] && !e.contains(p.content[0], t)) {
                        if (r && e.contains(document, t)) return !0
                    } else if (n) return !0;
                    return !1
                },
                _addClassToMFP: function(e) {
                    p.bgOverlay.addClass(e), p.wrap.addClass(e)
                },
                _removeClassFromMFP: function(e) {
                    this.bgOverlay.removeClass(e), p.wrap.removeClass(e)
                },
                _hasScrollBar: function(e) {
                    return (p.isIE7 ? b.height() : document.body.scrollHeight) > (e || g.height())
                },
                _setFocus: function() {
                    (p.st.focus ? p.content.find(p.st.focus).eq(0) : p.wrap).focus()
                },
                _onFocusIn: function(t) {
                    if (t.target !== p.wrap[0] && !e.contains(p.wrap[0], t.target)) return p._setFocus(), !1
                },
                _parseMarkup: function(t, n, r) {
                    var i;
                    r.data && (n = e.extend(r.data, n)), N(s, [t, n, r]), e.each(n, function(e, n) {
                        if (n === undefined || n === !1) return !0;
                        i = e.split("_");
                        if (i.length > 1) {
                            var r = t.find(f + "-" + i[0]);
                            if (r.length > 0) {
                                var s = i[1];
                                s === "replaceWith" ? r[0] !== n[0] && r.replaceWith(n) : s === "img" ? r.is("img") ? r.attr("src", n) : r.replaceWith('<img src="' + n + '" class="' + r.attr("class") + '" />') : r.attr(i[1], n)
                            }
                        } else t.find(f + "-" + e).html(n)
                    })
                },
                _getScrollbarSize: function() {
                    if (p.scrollbarSize === undefined) {
                        var e = document.createElement("div");
                        e.id = "mfp-sbm", e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), p.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
                    }
                    return p.scrollbarSize
                }
            }, e.magnificPopup = {
                instance: null,
                proto: d.prototype,
                modules: [],
                open: function(t, n) {
                    return k(), t ? t = e.extend(!0, {}, t) : t = {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
                },
                close: function() {
                    return e.magnificPopup.instance && e.magnificPopup.instance.close()
                },
                registerModule: function(t, n) {
                    n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
                },
                defaults: {
                    disableOn: 0,
                    key: null,
                    midClick: !1,
                    mainClass: "",
                    preloader: !0,
                    focus: "",
                    closeOnContentClick: !1,
                    closeOnBgClick: !0,
                    closeBtnInside: !0,
                    showCloseBtn: !0,
                    enableEscapeKey: !0,
                    modal: !1,
                    alignTop: !1,
                    removalDelay: 0,
                    prependTo: null,
                    fixedContentPos: "auto",
                    fixedBgPos: "auto",
                    overflowY: "auto",
                    closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                    tClose: "Close (Esc)",
                    tLoading: "Loading..."
                }
            }, e.fn.magnificPopup = function(t) {
                k();
                var n = e(this);
                if (typeof t == "string")
                    if (t === "open") {
                        var r, i = v ? n.data("magnificPopup") : n[0].magnificPopup,
                            s = parseInt(arguments[1], 10) || 0;
                        i.items ? r = i.items[s] : (r = n, i.delegate && (r = r.find(i.delegate)), r = r.eq(s)), p._openClick({
                            mfpEl: r
                        }, n, i)
                    } else p.isOpen && p[t].apply(p, Array.prototype.slice.call(arguments, 1));
                else t = e.extend(!0, {}, t), v ? n.data("magnificPopup", t) : n[0].magnificPopup = t, p.addGroup(n, t);
                return n
            };
            var A = "inline",
                O, M, _, D = function() {
                    _ && (M.after(_.addClass(O)).detach(), _ = null)
                };
            e.magnificPopup.registerModule(A, {
                options: {
                    hiddenClass: "hide",
                    markup: "",
                    tNotFound: "Content not found"
                },
                proto: {
                    initInline: function() {
                        p.types.push(A), x(t + "." + A, function() {
                            D()
                        })
                    },
                    getInline: function(t, n) {
                        D();
                        if (t.src) {
                            var r = p.st.inline,
                                i = e(t.src);
                            if (i.length) {
                                var s = i[0].parentNode;
                                s && s.tagName && (M || (O = r.hiddenClass, M = T(O), O = "mfp-" + O), _ = i.after(M).detach().removeClass(O)), p.updateStatus("ready")
                            } else p.updateStatus("error", r.tNotFound), i = e("<div>");
                            return t.inlineElement = i, i
                        }
                        return p.updateStatus("ready"), p._parseMarkup(n, {}, t), n
                    }
                }
            });
            var P = "ajax",
                H, B = function() {
                    H && y.removeClass(H)
                },
                j = function() {
                    B(), p.req && p.req.abort()
                };
            e.magnificPopup.registerModule(P, {
                options: {
                    settings: null,
                    cursor: "mfp-ajax-cur",
                    tError: '<a href="%url%">The content</a> could not be loaded.'
                },
                proto: {
                    initAjax: function() {
                        p.types.push(P), H = p.st.ajax.cursor, x(t + "." + P, j), x("BeforeChange." + P, j)
                    },
                    getAjax: function(t) {
                        H && y.addClass(H), p.updateStatus("loading");
                        var n = e.extend({
                            url: t.src,
                            success: function(n, r, i) {
                                var s = {
                                    data: n,
                                    xhr: i
                                };
                                N("ParseAjax", s), p.appendContent(e(s.data), P), t.finished = !0, B(), p._setFocus(), setTimeout(function() {
                                    p.wrap.addClass(l)
                                }, 16), p.updateStatus("ready"), N("AjaxContentAdded")
                            },
                            error: function() {
                                B(), t.finished = t.loadError = !0, p.updateStatus("error", p.st.ajax.tError.replace("%url%", t.src))
                            }
                        }, p.st.ajax.settings);
                        return p.req = e.ajax(n), ""
                    }
                }
            });
            var F, I = function(t) {
                if (t.data && t.data.title !== undefined) return t.data.title;
                var n = p.st.image.titleSrc;
                if (n) {
                    if (e.isFunction(n)) return n.call(p, t);
                    if (t.el) return t.el.attr(n) || ""
                }
                return ""
            };
            e.magnificPopup.registerModule("image", {
                options: {
                    markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                    cursor: "mfp-zoom-out-cur",
                    titleSrc: "title",
                    verticalFit: !0,
                    tError: '<a href="%url%">The image</a> could not be loaded.'
                },
                proto: {
                    initImage: function() {
                        var e = p.st.image,
                            n = ".image";
                        p.types.push("image"), x(o + n, function() {
                            p.currItem.type === "image" && e.cursor && y.addClass(e.cursor)
                        }), x(t + n, function() {
                            e.cursor && y.removeClass(e.cursor), g.off("resize" + f)
                        }), x("Resize" + n, p.resizeImage), p.isLowIE && x("AfterChange", p.resizeImage)
                    },
                    resizeImage: function() {
                        var e = p.currItem;
                        if (!e || !e.img) return;
                        if (p.st.image.verticalFit) {
                            var t = 0;
                            p.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", p.wH - t)
                        }
                    },
                    _onImageHasSize: function(e) {
                        e.img && (e.hasSize = !0, F && clearInterval(F), e.isCheckingImgSize = !1, N("ImageHasSize", e), e.imgHidden && (p.content && p.content.removeClass("mfp-loading"), e.imgHidden = !1))
                    },
                    findImageSize: function(e) {
                        var t = 0,
                            n = e.img[0],
                            r = function(i) {
                                F && clearInterval(F), F = setInterval(function() {
                                    if (n.naturalWidth > 0) {
                                        p._onImageHasSize(e);
                                        return
                                    }
                                    t > 200 && clearInterval(F), t++, t === 3 ? r(10) : t === 40 ? r(50) : t === 100 && r(500)
                                }, i)
                            };
                        r(1)
                    },
                    getImage: function(t, n) {
                        var r = 0,
                            i = function() {
                                t && (t.img[0].complete ? (t.img.off(".mfploader"), t === p.currItem && (p._onImageHasSize(t), p.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, N("ImageLoadComplete")) : (r++, r < 200 ? setTimeout(i, 100) : s()))
                            },
                            s = function() {
                                t && (t.img.off(".mfploader"), t === p.currItem && (p._onImageHasSize(t), p.updateStatus("error", o.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0)
                            },
                            o = p.st.image,
                            u = n.find(".mfp-img");
                        if (u.length) {
                            var a = document.createElement("img");
                            a.className = "mfp-img", t.img = e(a).on("load.mfploader", i).on("error.mfploader", s), a.src = t.src, u.is("img") && (t.img = t.img.clone()), a = t.img[0], a.naturalWidth > 0 ? t.hasSize = !0 : a.width || (t.hasSize = !1)
                        }
                        return p._parseMarkup(n, {
                            title: I(t),
                            img_replaceWith: t.img
                        }, t), p.resizeImage(), t.hasSize ? (F && clearInterval(F), t.loadError ? (n.addClass("mfp-loading"), p.updateStatus("error", o.tError.replace("%url%", t.src))) : (n.removeClass("mfp-loading"), p.updateStatus("ready")), n) : (p.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, n.addClass("mfp-loading"), p.findImageSize(t)), n)
                    }
                }
            });
            var q, R = function() {
                return q === undefined && (q = document.createElement("p").style.MozTransform !== undefined), q
            };
            e.magnificPopup.registerModule("zoom", {
                options: {
                    enabled: !1,
                    easing: "ease-in-out",
                    duration: 300,
                    opener: function(e) {
                        return e.is("img") ? e : e.find("img")
                    }
                },
                proto: {
                    initZoom: function() {
                        var e = p.st.zoom,
                            r = ".zoom",
                            i;
                        if (!e.enabled || !p.supportsTransition) return;
                        var s = e.duration,
                            o = function(t) {
                                var n = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    r = "all " + e.duration / 1e3 + "s " + e.easing,
                                    i = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    s = "transition";
                                return i["-webkit-" + s] = i["-moz-" + s] = i["-o-" + s] = i[s] = r, n.css(i), n
                            },
                            u = function() {
                                p.content.css("visibility", "visible")
                            },
                            a, f;
                        x("BuildControls" + r, function() {
                            if (p._allowZoom()) {
                                clearTimeout(a), p.content.css("visibility", "hidden"), i = p._getItemToZoom();
                                if (!i) {
                                    u();
                                    return
                                }
                                f = o(i), f.css(p._getOffset()), p.wrap.append(f), a = setTimeout(function() {
                                    f.css(p._getOffset(!0)), a = setTimeout(function() {
                                        u(), setTimeout(function() {
                                            f.remove(), i = f = null, N("ZoomAnimationEnded")
                                        }, 16)
                                    }, s)
                                }, 16)
                            }
                        }), x(n + r, function() {
                            if (p._allowZoom()) {
                                clearTimeout(a), p.st.removalDelay = s;
                                if (!i) {
                                    i = p._getItemToZoom();
                                    if (!i) return;
                                    f = o(i)
                                }
                                f.css(p._getOffset(!0)), p.wrap.append(f), p.content.css("visibility", "hidden"), setTimeout(function() {
                                    f.css(p._getOffset())
                                }, 16)
                            }
                        }), x(t + r, function() {
                            p._allowZoom() && (u(), f && f.remove(), i = null)
                        })
                    },
                    _allowZoom: function() {
                        return p.currItem.type === "image"
                    },
                    _getItemToZoom: function() {
                        return p.currItem.hasSize ? p.currItem.img : !1
                    },
                    _getOffset: function(t) {
                        var n;
                        t ? n = p.currItem.img : n = p.st.zoom.opener(p.currItem.el || p.currItem);
                        var r = n.offset(),
                            i = parseInt(n.css("padding-top"), 10),
                            s = parseInt(n.css("padding-bottom"), 10);
                        r.top -= e(window).scrollTop() - i;
                        var o = {
                            width: n.width(),
                            height: (v ? n.innerHeight() : n[0].offsetHeight) - s - i
                        };
                        return R() ? o["-moz-transform"] = o.transform = "translate(" + r.left + "px," + r.top + "px)" : (o.left = r.left, o.top = r.top), o
                    }
                }
            });
            var U = "iframe",
                z = "//about:blank",
                W = function(e) {
                    if (p.currTemplate[U]) {
                        var t = p.currTemplate[U].find("iframe");
                        t.length && (e || (t[0].src = z), p.isIE8 && t.css("display", e ? "block" : "none"))
                    }
                };
            e.magnificPopup.registerModule(U, {
                options: {
                    markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                    srcAction: "iframe_src",
                    patterns: {
                        youtube: {
                            index: "youtube.com",
                            id: "v=",
                            src: "//www.youtube.com/embed/%id%?autoplay=1"
                        },
                        vimeo: {
                            index: "vimeo.com/",
                            id: "/",
                            src: "//player.vimeo.com/video/%id%?autoplay=1"
                        },
                        gmaps: {
                            index: "//maps.google.",
                            src: "%id%&output=embed"
                        }
                    }
                },
                proto: {
                    initIframe: function() {
                        p.types.push(U), x("BeforeChange", function(e, t, n) {
                            t !== n && (t === U ? W() : n === U && W(!0))
                        }), x(t + "." + U, function() {
                            W()
                        })
                    },
                    getIframe: function(t, n) {
                        var r = t.src,
                            i = p.st.iframe;
                        e.each(i.patterns, function() {
                            if (r.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? r = r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : r = this.id.call(this, r)), r = this.src.replace("%id%", r), !1
                        });
                        var s = {};
                        return i.srcAction && (s[i.srcAction] = r), p._parseMarkup(n, s, t), p.updateStatus("ready"), n
                    }
                }
            });
            var X = function(e) {
                    var t = p.items.length;
                    return e > t - 1 ? e - t : e < 0 ? t + e : e
                },
                V = function(e, t, n) {
                    return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
                };
            e.magnificPopup.registerModule("gallery", {
                options: {
                    enabled: !1,
                    arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                    preload: [0, 2],
                    navigateByImgClick: !0,
                    arrows: !0,
                    tPrev: "Previous (Left arrow key)",
                    tNext: "Next (Right arrow key)",
                    tCounter: "%curr% of %total%"
                },
                proto: {
                    initGallery: function() {
                        var n = p.st.gallery,
                            r = ".mfp-gallery",
                            i = Boolean(e.fn.mfpFastClick);
                        p.direction = !0;
                        if (!n || !n.enabled) return !1;
                        E += " mfp-gallery", x(o + r, function() {
                            n.navigateByImgClick && p.wrap.on("click" + r, ".mfp-img", function() {
                                if (p.items.length > 1) return p.next(), !1
                            }), b.on("keydown" + r, function(e) {
                                e.keyCode === 37 ? p.prev() : e.keyCode === 39 && p.next()
                            })
                        }), x("UpdateStatus" + r, function(e, t) {
                            t.text && (t.text = V(t.text, p.currItem.index, p.items.length))
                        }), x(s + r, function(e, t, r, i) {
                            var s = p.items.length;
                            r.counter = s > 1 ? V(n.tCounter, i.index, s) : ""
                        }), x("BuildControls" + r, function() {
                            if (p.items.length > 1 && n.arrows && !p.arrowLeft) {
                                var t = n.arrowMarkup,
                                    r = p.arrowLeft = e(t.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(h),
                                    s = p.arrowRight = e(t.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(h),
                                    o = i ? "mfpFastClick" : "click";
                                r[o](function() {
                                    p.prev()
                                }), s[o](function() {
                                    p.next()
                                }), p.isIE7 && (T("b", r[0], !1, !0), T("a", r[0], !1, !0), T("b", s[0], !1, !0), T("a", s[0], !1, !0)), p.container.append(r.add(s))
                            }
                        }), x(u + r, function() {
                            p._preloadTimeout && clearTimeout(p._preloadTimeout), p._preloadTimeout = setTimeout(function() {
                                p.preloadNearbyImages(), p._preloadTimeout = null
                            }, 16)
                        }), x(t + r, function() {
                            b.off(r), p.wrap.off("click" + r), p.arrowLeft && i && p.arrowLeft.add(p.arrowRight).destroyMfpFastClick(), p.arrowRight = p.arrowLeft = null
                        })
                    },
                    next: function() {
                        p.direction = !0, p.index = X(p.index + 1), p.updateItemHTML()
                    },
                    prev: function() {
                        p.direction = !1, p.index = X(p.index - 1), p.updateItemHTML()
                    },
                    goTo: function(e) {
                        p.direction = e >= p.index, p.index = e, p.updateItemHTML()
                    },
                    preloadNearbyImages: function() {
                        var e = p.st.gallery.preload,
                            t = Math.min(e[0], p.items.length),
                            n = Math.min(e[1], p.items.length),
                            r;
                        for (r = 1; r <= (p.direction ? n : t); r++) p._preloadItem(p.index + r);
                        for (r = 1; r <= (p.direction ? t : n); r++) p._preloadItem(p.index - r)
                    },
                    _preloadItem: function(t) {
                        t = X(t);
                        if (p.items[t].preloaded) return;
                        var n = p.items[t];
                        n.parsed || (n = p.parseEl(t)), N("LazyLoad", n), n.type === "image" && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                            n.hasSize = !0
                        }).on("error.mfploader", function() {
                            n.hasSize = !0, n.loadError = !0, N("LazyLoadError", n)
                        }).attr("src", n.src)), n.preloaded = !0
                    }
                }
            });
            var $ = "retina";
            e.magnificPopup.registerModule($, {
                    options: {
                        replaceSrc: function(e) {
                            return e.src.replace(/\.\w+$/, function(e) {
                                return "@2x" + e
                            })
                        },
                        ratio: 1
                    },
                    proto: {
                        initRetina: function() {
                            if (window.devicePixelRatio > 1) {
                                var e = p.st.retina,
                                    t = e.ratio;
                                t = isNaN(t) ? t() : t, t > 1 && (x("ImageHasSize." + $, function(e, n) {
                                    n.img.css({
                                        "max-width": n.img[0].naturalWidth / t,
                                        width: "100%"
                                    })
                                }), x("ElementParse." + $, function(n, r) {
                                    r.src = e.replaceSrc(r, t)
                                }))
                            }
                        }
                    }
                }),
                function() {
                    var t = 1e3,
                        n = "ontouchstart" in window,
                        r = function() {
                            g.off("touchmove" + s + " touchend" + s)
                        },
                        i = "mfpFastClick",
                        s = "." + i;
                    e.fn.mfpFastClick = function(i) {
                        return e(this).each(function() {
                            var o = e(this),
                                u;
                            if (n) {
                                var a, f, l, c, h, p;
                                o.on("touchstart" + s, function(e) {
                                    c = !1, p = 1, h = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], f = h.clientX, l = h.clientY, g.on("touchmove" + s, function(e) {
                                        h = e.originalEvent ? e.originalEvent.touches : e.touches, p = h.length, h = h[0];
                                        if (Math.abs(h.clientX - f) > 10 || Math.abs(h.clientY - l) > 10) c = !0, r()
                                    }).on("touchend" + s, function(e) {
                                        r();
                                        if (c || p > 1) return;
                                        u = !0, e.preventDefault(), clearTimeout(a), a = setTimeout(function() {
                                            u = !1
                                        }, t), i()
                                    })
                                })
                            }
                            o.on("click" + s, function() {
                                u || i()
                            })
                        })
                    }, e.fn.destroyMfpFastClick = function() {
                        e(this).off("touchstart" + s + " click" + s), n && g.off("touchmove" + s + " touchend" + s)
                    }
                }(), k()
        }(window.Zepto), define("magnificpopup", ["zepto"], function() {}), define("models/gads", ["zepto", "backbone", "utils/user.agent", "utils/debug.message"], function(e, t, n, r) {
            var i = {};
            return i = function(t) {
                function w() {
                    var t = !1;
                    return b = function() {
                        setTimeout(function() {
                            var n = e(window).width(),
                                r = e(window).height(),
                                s = n > r ? n : r;
                            p ? i.resize(n, r, google.ima.ViewMode.FULLSCREEN) : t && i && c ? i.resize(n, r, google.ima.ViewMode.FULLSCREEN) : !t && i && c && i.resize(s, s, google.ima.ViewMode.FULLSCREEN), t = !t
                        }, 500)
                    }, b
                }

                function E() {
                    function r() {
                        e -= 1;
                        if (e <= 0) {
                            clearInterval(n), P();
                            return
                        }
                        $("#" + t.options.timerID + " span").html(e)
                    }
                    var e = 15,
                        n = setInterval(r, 1e3)
                }

                function S() {
                    var e = t.options.i18n.adTextTimer || "Ad will close automatically";
                    $("#" + t.options.mediaWrapperID + " iframe").css("height", "320px"), $("#" + t.options.mediaWrapperID + " :first-child").prepend('<div id="GADS_ad_timer">' + e + " <span>15</span> </div>")
                }

                function x(e) {
                    // console.log("GADS -> initRewardingVideoAd");
                    // if (e) {
                    //     t.utils.extend(t.options, e), a || (a = t.options.description_url), a !== "[description_url]" && (a = encodeURIComponent(a)), l = document.getElementById(t.options.contentElementID), t.options.width === "" && t.options.height === "" && (c = !0);
                    //     if (t.options.adTagUrl === "") {
                    //         var n = "320x250|480x320|640x480",
                    //             r;
                    //         if (t.options.portal) r = "https://pubads.g.doubleclick.net/gampad/ads?", r += "sz=480x320|640x480|320x250&iu=/10947743/", r += t.options.portal + "_ingame", r += "&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=" + a + "&correlator=[timestamp]", t.options.gameId && (r += "&cust_params=revtrack%3D" + t.options.gameId);
                    //         else if (t.options.gameId && t.options.unitName) {
                    //             var i = t.options.unitName;
                    //             r = "https://pubads.g.doubleclick.net/gampad/ads?sz=", r += n + "&iu=/10947743/", r += i, r += "&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]", r += "&description_url=" + a + "&correlator=[timestamp]", r += "&cust_params=gamename%3D" + t.options.gameId
                    //         } else r = t.options.testing ? "https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=480x320,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]" : "//pubads.g.doubleclick.net/gampad/ads?sz=" + n + "&iu=/10947743/CONTENT&cust_params=p_game%3D" + t.options.channelID + "&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=" + a + "&correlator=[timestamp]";
                    //         t.options.adTagUrl = r
                    //     }
                    //     t.options.mediaWrapperID === "" ? console.error("GADS -> media id missing or incorrect") : t.options.adsWrapperID === "" ? console.error("GADS -> ads id missing or incorrect") : k()
                    // } else console.error("GADS -> no options object found")
                }

                function T(e) {
                    console.log("GADS DFP start"), google.ima.settings.setLocale(navigator.language);
                    if (e) {
                        t.utils.extend(t.options, e), l = document.getElementById(t.options.contentElementID), a || (a = t.options.description_url), a !== "[description_url]" && (a = encodeURIComponent(a)), t.options.width === "" && t.options.height === "" && (c = !0), t.options.isPlayScreen && (p = !0);
                        if (t.options.adTagUrl === "") {
                            var r = "320x250|480x320|640x480",
                                i = new n,
                                s;
                            if (t.options.portal && t.options.portal !== "null") s = "https://pubads.g.doubleclick.net/gampad/ads?", s += "sz=480x320|640x480|320x250&iu=/10947743/", s += t.options.portal + "_ingame", s += "&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=" + a + "&correlator=[timestamp]", t.options.gameId && (s += "&cust_params=revtrack%3D" + t.options.gameId);
                            else if (t.options.gameId && d[t.options.channel_name][t.options.channel_type]) {
                                var o;
                                i.isMobile() || i.isAndroid() || i.isIPad() ? o = d[t.options.channel_name][t.options.channel_type] : o = d[t.options.channel_name]._pc, s = "https://pubads.g.doubleclick.net/gampad/ads?sz=", s += r + "&iu=/10947743/", s += o, s += "&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]", s += "&description_url=" + a + "&correlator=[timestamp]", s += "&cust_params=gamename%3D" + t.options.gameId
                            } else s = t.options.testing ? "https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=480x320,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]" : "//pubads.g.doubleclick.net/gampad/ads?sz=" + r + "&iu=/10947743/CONTENT&cust_params=p_game%3D" + t.options.channelID + "&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=" + a + "&correlator=[timestamp]";
                            y.setMessage("adTagUrl: " + s), t.options.adTagUrl = s, t.options.mediaWrapperID === "" ? console.error("GADS media id missing or incorrect") : t.options.adsWrapperID === "" ? console.error("GADS ads id missing or incorrect") : k()
                        } else t.options.mediaWrapperID === "" ? console.error("GADS media id missing or incorrect") : t.options.adsWrapperID === "" ? console.error("GADS ads id missing or incorrect") : (y.setMessage("GADS.options.adTagUrl:", t.options.adTagUrl), k())
                    } else console.error("GADS no options object found")
                }

                function C() {
                    try {
                        u = new google.ima.AdDisplayContainer(document.getElementById(t.options.mediaWrapperID))
                    } catch (e) {
                        P()
                    }
                }

                function k() {
                    var e, n;
                    document.getElementById(t.options.adsWrapperID).style.display = "block", document.getElementById(t.options.mediaWrapperID).innerHTML = "", t.options.width === "" && t.options.height === "" ? (e = document.getElementById(t.options.adsWrapperID).clientWidth, n = document.getElementById(t.options.adsWrapperID).clientHeight) : (e = t.options.width, n = t.options.height), C(), u.initialize(), s = new google.ima.AdsLoader(u), s.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE), s.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, L, !1), s.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, M, !1), l.addEventListener("ended", N);
                    var r = new google.ima.AdsRequest;
                    r.linearAdSlotWidth = e, r.linearAdSlotHeight = n, r.nonLinearAdSlotWidth = e, r.nonLinearAdSlotHeight = n, r.adTagUrl = t.options.adTagUrl, r.forceNonLinearFullSlot = !0, r.vastLoadTimeout = 15e3, h = !1, s.requestAds(r)
                }

                function L(n) {
                    o = new google.ima.AdsRenderingSettings, o.restoreCustomPlaybackStateOnAdBreakComplete = !0, o.loadVideoTimeout = 15e3, i = n.getAdsManager(l, o), i.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, M), i.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, _), i.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, D), i.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, O), i.addEventListener(google.ima.AdEvent.Type.LOADED, O), i.addEventListener(google.ima.AdEvent.Type.CLICK, O), i.addEventListener(google.ima.AdEvent.Type.STARTED, O), i.addEventListener(google.ima.AdEvent.Type.COMPLETE, O), i.addEventListener(google.ima.AdEvent.Type.SKIPPED, O), i.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, O), i.addEventListener(google.ima.AdEvent.Type.AD_ERROR, O), i.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, A);
                    try {
                        c === !0 ? i.init(e(window).width(), e(window).height(), google.ima.ViewMode.FULLSCREEN) : i.init(t.options.width, t.options.height, google.ima.ViewMode.NORMAL), i.start()
                    } catch (r) {
                        P()
                    }
                }

                function A() {
                    i.start()
                }

                function O(n) {
                    var r = n.getAd();
                    switch (n.type) {
                        case google.ima.AdEvent.Type.LOADED:
                            t.options.onLoaded.call(), !r.isLinear(), e(window).off("orientationchange", w()), e(window).on("orientationchange", w());
                            break;
                        case google.ima.AdEvent.Type.CLICK:
                            t.options.onAdClick.call();
                            break;
                        case google.ima.AdEvent.Type.STARTED:
                            r.isLinear() ? f = setInterval(function() {
                                var e = i.getRemainingTime()
                            }, 300) : (E(), S());
                            break;
                        case google.ima.AdEvent.Type.COMPLETE:
                            r.isLinear() && (clearInterval(f), t.options.onComplete.call(), P());
                            break;
                        case google.ima.AdEvent.Type.SKIPPED:
                            r.isLinear() && (t.options.onSkip.call(), P());
                            break;
                        case google.ima.AdEvent.Type.USER_CLOSE:
                            t.options.onClose.call(), P();
                            break;
                        case google.ima.AdEvent.Type.AD_ERROR:
                            t.options.onError.call(), P()
                    }
                }

                function M(e) {
                    t.options.onError.call(), t.options.onFinish.call(), console.info(e.getError()), i && i.destroy()
                }

                function _() {
                    l.removeEventListener("ended", N), l.pause()
                }

                function D() {
                    l.addEventListener("ended", N), l.play()
                }

                function P() {
                    e(window).off("orientationchange", b), h === !1 && (h = !0, t.options.onFinish.call())
                }
                var i, s, o, u, a, f, l, c = !1,
                    h = !1,
                    p = !1,
                    d = {
                        yahoo: {
                            "default": "yahoo_ingame_display",
                            hybrid: "yahoo_ingame_all_formats",
                            _pc: "yahoojp_ingame"
                        },
                        test: {
                            "default": "test_unit_yahoo_ingame_display",
                            hybrid: "test_yahoo_ingame_all_formats",
                            _pc: "yahoo_test_PC"
                        },
                        disable: {
                            "default": !1
                        }
                    },
                    v = Number((Math.random() + "").split(".")[1]),
                    m = !1,
                    g = !1,
                    y = new r;
                t.utils = t.utils || {}, t.options = {
                    width: "",
                    height: "",
                    adTagUrl: "",
                    adsWrapperID: "GADS_adpreroll",
                    mediaWrapperID: "GADS_adContainer",
                    contentElementID: "GADS_contentElement",
                    timerID: "GADS_ad_timer",
                    testing: !1,
                    i18n: {},
                    channelID: "default",
                    gameId: "",
                    gameSource: "",
                    channel_name: "disable",
                    channel_type: "default",
                    portal: null,
                    description_url: "[description_url]",
                    isPlayScreen: !1,
                    onLoaded: function() {},
                    onComplete: function() {},
                    onSkip: function() {},
                    onAdClick: function() {},
                    onClose: function() {},
                    onFinish: function() {},
                    onError: function() {}
                }, t.utils.extend = function() {
                    for (var e = 1; e < arguments.length; e++)
                        for (var t in arguments[e]) arguments[e].hasOwnProperty(t) && (arguments[0][t] = arguments[e][t]);
                    return arguments[0]
                };
                var b, N = function() {
                    s.contentComplete()
                };
                return {
                    init: T,
                    initRewardingVideoAd: x
                }
            }(window.GADS || {}), i
        }), define("text!templates/advertisement/dfp.html", [], function() {
            return '<div id="GADS_adpreroll">\r\n  <div id="GADS_contentContainer">\r\n    <video id="GADS_contentElement"></video>\r\n  </div>\r\n  <div id="GADS_adContainer"></div>\r\n</div>\r\n'
        }), define("text!templates/advertisement/portaladvertisement.html", [], function() {
            return '<iframe id="booster-advertisement-popup" name="booster-advertisement-popup" class="hide" src="<%- source %>/boosterbar.bbads/bbads?bm.gameid=<%- bmGameId %>&bm.channelid=<%- bmChannelId %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("text!templates/advertisement/play.html", [], function() {
            return '<div id="booster-play-ads">\r\n  <div class="booster-play-ads-wrap">\r\n    <% if (lang === \'en\') { %>\r\n    <div class="booster-play-ads-title">\r\n      You can continue playing your game after the following message.\r\n    </div>\r\n    <% } else { %>\r\n      <div class="booster-play-ads-title">\r\n        ゲームの続きをプレイするには、広告の表示が必要となります。\r\n      </div>\r\n    <% } %>\r\n  </div>\r\n</div>\r\n'
        }), define("utils/postmessage", [], function() {
            return {
                send: function(e) {
                    window.parent && window.parent.postMessage(JSON.stringify(e), "*")
                }
            }
        }), define("views/dfp", ["zepto", "underscore", "backbone", "models/gads", "text!templates/advertisement/dfp.html", "text!templates/advertisement/portaladvertisement.html", "text!templates/advertisement/play.html", "utils/url", "utils/debug.message", "utils/user.agent", "utils/postmessage"], function(e, t, n, r, i, s, o, u, a, f, l) {
            function c() {
                if (window.self !== window.top) {
                    var e = {};
                    e.type = "setGameStorage";
                    var t = {};
                    for (var n in localStorage) t[n] = localStorage[n];
                    p.setMessage("BoosterReady: save the data - ", e), e.data = t, window.parent.postMessage(JSON.stringify(e), "*")
                }
            }
            var h = new u,
                p = new a,
                d = n.View.extend({
                    portal: null,
                    type: "interstitial",
                    size: "100x100",
                    site: 0,
                    zone: 0,
                    interval: 6e4,
                    channelID: 0,
                    overlay: !0,
                    callback: new Function,
                    callbackReward: new Function,
                    startDate: 0,
                    initDate: 0,
                    isReward: !1,
                    isBoosterBarHidden: !1,
                    onLoaded: function() {},
                    onComplete: function() {},
                    onSkip: function() {},
                    onAdClick: function() {},
                    onClose: function() {},
                    onFinish: function() {},
                    onError: function() {},
                    initialize: function(e) {
                        p.setMessage("Dfp View Class initialize: ", e), e == undefined && (e = {}), e.type != undefined && (this.type = e.type), e.size != undefined && (this.size = e.size), e.site != undefined && (this.site = e.site), e.zone != undefined && (this.zone = e.zone), e.interval != undefined && (this.interval = e.interval), e.channelID != undefined && (this.channelID = e.channelID), e.overlay != undefined && (this.overlay = Boolean(e.overlay)), e.channel_name != undefined && (this.channel_name = e.channel_name), e.channel_type != undefined && (this.channel_type = e.channel_type), e.onLoaded !== undefined && (this.onLoaded = e.onLoaded), e.onComplete !== undefined && (this.onComplete = e.onComplete), e.onSkip !== undefined && (this.onSkip = e.onSkip), e.onAdClick !== undefined && (this.onAdClick = e.onAdClick), e.onClose !== undefined && (this.onClose = e.onClose), e.onFinish !== undefined && (this.onFinish = e.onFinish), e.onError !== undefined && (this.onError = e.onError), h.getURLParameter("channel_name") !== "null" && (this.channel_name = h.getURLParameter("channel_name")), this.initDate = Date.now(), this.mode = null, h.getURLParameter("bm.portal") && (this.portal = h.getURLParameter("bm.portal")), this.portal != "null" ? this.mode = "BUILTIN" : h.getURLParameter("bm.source") != "null" && h.getURLParameter("bm.gameid") != "null" ? this.mode = "PORTAL" : this.mode = "BUILTIN";
                        var t = h.getURLParameter("sdkAds");
                        if (t == 1 || t == "true") this.mode = "BUILTIN";
                        var n = this;
                        pm.bind("iframeClose", function(e) {
                            n._close()
                        }), pm.bind("callbackTimerCloseAd", function(e) {
                            window.onTimerPassed && window.onTimerPassed(), n._close()
                        }), pm.bind("callbackUserCloseAd", function(e) {
                            window.onAdSkip && window.onAdSkip(), n._close()
                        }), pm.bind("callbackUserClickAd", function(e) {
                            window.onAdClick && window.onAdClick()
                        });
                        var r = document.createElement("script");
                        r.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js", document.body.appendChild(r), r.onload = function() {
                            p.setMessage("Advertisement initialized")
                        }
                    },
                    close: function() {
                        this._close()
                    },
                    _close: function() {
                        var t = this;
                        setTimeout(function() {
                            t.mode === "PORTAL" && e("iframe#booster-advertisement-popup").remove(), t.mode === "BUILTIN" && (e("#GADS_adpreroll").remove(), e("#booster-play-ads").remove()), t.isReward ? t.callbackReward != undefined && t.callbackReward.call() : t.callback != undefined && t.callback.call(), t.isReward = !1, t.isBoosterBarHidden && (l.send({
                                type: "boosterbar",
                                action: "show"
                            }), t.isBoosterBarHidden = !1)
                        }, 1500)
                    },
                    render: function(n) {
                        n = n || {};
                        var r = h.buildProtocolRelativeURL(h.getURLParameter("bm.source")),
                            o = h.getURLParameter("bm.gameid"),
                            u = null;
                        this.mode === "PORTAL" ? (p.setMessage("Advertisement shown with bm.source & bm.gameid present in the url"), u = t.template(s, {
                            source: r,
                            bmGameId: o,
                            bmChannelId: this.channelID
                        })) : this.mode === "BUILTIN" && (p.setMessage("Advertisement will be should as BUILTIN mode"), u = t.template(i, {})), e("body").append(u), typeof n == "object" && n.isPlayScreen && e("#GADS_adpreroll").addClass("GADS_play")
                    },
                    _showAdvertising: function(t) {
                        // t = t || {}, c();
                        // if (t != undefined) {
                        //     this.callback = t.callback;
                        //     var n = t.startDelay || 0,
                        //         i = t.interval || this.interval;
                        //     this.interval = i
                        // }
                        // window.onAdDisplay && window.onAdDisplay(), this.render(t);
                        // if (this.mode === "BUILTIN") {
                            var s = this,
                                o = h.buildProtocolRelativeURL(h.getURLParameter("bm.source")),
                                u = h.getURLParameter("bm.gameid"),
                                a = this.buildGadObj();
                            t.isPlayScreen && (a.isPlayScreen = !0), a.gameId = window.__gameCode || "null", r.init(a)
                        // } else e("iframe#booster-advertisement-popup").removeClass("hide")
                    },
                    showRewardingVideoAd: function(t) {
                        // if (!this.isAdReady()) {
                        //     this._close();
                        //     return
                        // }
                        // c(), this.postData(), this.isReward = !0;
                        // if (t != undefined) { 
                        //     this.callback = t.callback;
                        //     var n = t.startDelay || 0,
                        //         i = t.interval || this.interval;
                        //     this.interval = i
                        // }
                        // window.onAdDisplay(), this.render(t);
                        // if (this.mode === "BUILTIN") {
                        //     var s = this,
                        //         o = h.buildProtocolRelativeURL(h.getURLParameter("bm.source")),
                        //         u = this.buildGadObj();
                        //     console.assert(t.unitName, "No unit name included, can't request video ads without one."), u.unitName = t.unitName, u.gameId = window.__gameCode || "null", r.initRewardingVideoAd(u)
                        // } else e("iframe#booster-advertisement-popup").removeClass("hide")
                    },
                    showAdvertising: function(e) {
                        this.showPlayScreen(e)
                    },
                    showPlayScreen: function(n) {
                        if (!this.isAdReady()) {
                            this._close();
                            return
                        }
                        this.isBoosterBarHidden || (l.send({
                            type: "boosterbar",
                            action: "hide"
                        }), this.isBoosterBarHidden = !0), n = n || {};
                        var r = new f,
                            i = this,
                            s = ["en", "ja"],
                            u = n.lang || window.navigator.userLanguage || window.navigator.language;
                        u = u.toLowerCase().split("-").shift(), u = s.indexOf(u) === -1 ? "en" : u, n.isPlayScreen = !0;
                        if (!r.isMobile() && !r.isIPad() && !r.isAndroid()) return this._showAdvertising(n);
                        e("#booster-play-ads").remove();
                        var a = t.template(o)({
                            lang: u
                        });
                        e("body").append(a), e("#booster-play-ads").show().on("click", function(t) {
                            t.stopPropagation(), e("#booster-play-ads").remove(), i._showAdvertising(n)
                        }).on("mousedown mouseup mousemove touchstart touchend touchmove", function(e) {
                            e.stopPropagation()
                        })
                    },
                    buildGadObj: function() {
                        var e = this,
                            t = {
                                i18n: {
                                    adTextTimer: ""
                                },
                                portal: this.portal,
                                channelID: this.channelID,
                                gameSource: h.getURLParameter("bm.source"),
                                onFinish: function() {
                                    console.log("Finish"), e.onFinish(), e._close()
                                },
                                onLoaded: function() {
                                    e.onLoaded(), console.log("Loaded")
                                },
                                onClose: function() {
                                    console.log("Closed"), e.onClose(), e._close()
                                },
                                onSkip: function() {
                                    console.log("Skip"), e.onSkip(), e._close()
                                },
                                onComplete: function() {
                                    console.log("Complete"), e.onComplete(), e._close()
                                },
                                onAdClick: function() {
                                    e.onAdClick(), console.log("Click")
                                },
                                onError: function() {
                                    e.onError(), console.error("Ad error"), e._close()
                                }
                            };
                        h.getURLParameter("bm.source") !== "null" ? t.description_url = h.getURLParameter("bm.source") : t.description_url = "[description_url]", this.channel_name && (t.channel_name = this.channel_name), this.channel_type && (t.channel_type = this.channel_type);
                        if (window.Booster.apiProps) {
                            var n = window.Booster.apiProps;
                            n.contextProperties && n.contextProperties["sdk.adKey"] && n.contextProperties["sdk.adUnit"] && n.gameProperties && n.gameProperties["sdk.adValue"] && (t.adTagUrl = "https://pubads.g.doubleclick.net/gampad/ads?sz=480x320|640x480|320x250&iu=/10947743/" + n.contextProperties["sdk.adUnit"] + "&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1" + "&url=[referrer_url]&description_url=[description_url]" + "&correlator=[timestamp]" + "&cust_params=" + n.contextProperties["sdk.adKey"] + "%3D" + n.gameProperties["sdk.adValue"])
                        }
                        return t
                    },
                    isAdReady: function() {
                        var e = Date.now(),
                            t = this.startDate < e;
                        return t && (this.startDate = e + this.interval), t
                    }
                });
            return d
        }), define("models/moregames.model", ["backbone", "utils/url", "utils/debug.message"], function(e, t, n) {
            var r = new n,
                i = e.Model.extend({
                    bmsource: (new t).getURLParameter("bm.source"),
                    utmsource: (new t).getURLParameter("utm_source"),
                    initialize: function(e) {
                        r.setMessage("Booster Moregames initialize: ", e), e = e || {}, e.bmsource !== void 0 && (this.bmsource = e.bmsource)
                    },
                    redirect: function() {
                        var e = new t,
                            n = this.bmsource;
                        window.onMoreGames && window.onMoreGames(), this.utmsource === "wordgames" ? window.top.location = e.buildProtocolRelativeURL("uno.wordgames.com") : n === "null" ? (n = "coolgames.com", window.top.location = e.buildProtocolRelativeURL(n)) : window.top.location = e.buildProtocolRelativeURL(n)
                    }
                });
            return i
        }), define("models/stateapi.model", ["backbone", "utils/debug.message"], function(e, t) {
            var n = new t,
                r = e.Model.extend({
                    _urls: {
                        test: "//savestate-test.api.boostermedia.com/",
                        stage: "//savestate-test.api.boostermedia.com/",
                        prod: "//savestate.api.boostermedia.com/"
                    },
                    _provider: "BM",
                    _apiRoot: "/api/v1/C1000/",
                    _apiEnd: "/state/",
                    _token: null,
                    _casToken: null,
                    environment: null,
                    _initialized: !1,
                    _gameId: null,
                    isInitialized: function() {
                        return this._initialized
                    },
                    initialize: function() {
                        n.setMessage("Booster StateApi initialize")
                    },
                    setup: function(e, t, n, r) {
                        this._gameId = t, this._provider = n || "BM", this.environment = r || "prod", this._token = e, this._initialized = !0
                    },
                    save: function(e, t, n, r) {
                        var i = window.btoa(JSON.stringify(e)),
                            s = JSON.stringify({
                                usersave: i
                            });
                        $.ajax({
                            type: "POST",
                            url: this.url() + "set/",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                values: s,
                                session: this._token,
                                casToken: this._casToken
                            }),
                            dataType: "json",
                            success: function(e) {
                                try {
                                    t.call(r, e)
                                } catch (i) {
                                    n.call(r, i)
                                }
                            },
                            error: function(e) {
                                n.call(r, e)
                            }
                        })
                    },
                    load: function(e, t, n) {
                        $.ajax({
                            type: "GET",
                            url: this.url(),
                            contentType: "application/json; charset=utf-8",
                            data: {
                                keys: "usersave",
                                session: this._token
                            },
                            dataType: "json",
                            success: function(r) {
                                try {
                                    this._casToken = r.casToken;
                                    if (r.payload) {
                                        var i = r.payload.values.usersave,
                                            s = window.atob(i);
                                        e.call(n, JSON.parse(s))
                                    } else e.call(n, null)
                                } catch (o) {
                                    t.call(n, o)
                                }
                            }.bind(this),
                            error: function(e) {
                                t.call(n, e)
                            }
                        })
                    },
                    checkValid: function(e, t) {
                        $.ajax({
                            type: "GET",
                            url: this.url() + "last/",
                            contentType: "application/json; charset=utf-8",
                            data: {
                                session: this._token
                            },
                            dataType: "json",
                            success: function(n) {
                                var r = this._casToken;
                                this._casToken = n.casToken, e.call(t, r === this._casToken)
                            }.bind(this),
                            error: function(n) {
                                console.error(n), e.call(t, !1)
                            }
                        })
                    },
                    url: function() {
                        return this._urls[this.environment] + this._apiRoot + this._provider + this._apiEnd + this._gameId + "/"
                    }
                }, {
                    singleton: null,
                    getInstance: function() {
                        return r.singleton = r.singleton || new r, r.singleton
                    }
                });
            return r
        }), define("text!templates/login.html", [], function() {
            return '<iframe id="booster-login-popup" name="booster-login-popup" class="hide" src="<%- source %>/sdk.login/login?bm.gameid=<%- bmGameId %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("text!templates/reconnect.html", [], function() {
            return '<iframe id="booster-reconnect-popup" name="booster-reconnect-popup" class="hide" src="<%- source %>/sdk.reconnect/reconnect?bm.gameid=<%- bmGameId %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("views/stateapi", ["zepto", "underscore", "backbone", "models/stateapi.model", "text!templates/login.html", "text!templates/reconnect.html", "utils/url", "utils/debug.message"], function(e, t, n, r, i, s, o, u) {
            var a = new u,
                f = n.View.extend({
                    _model: null,
                    _environment: null,
                    _readyCallback: null,
                    _popupClosedCallback: null,
                    _context: null,
                    _gameId: null,
                    _provider: null,
                    _availableProviders: ["BM"],
                    _gameId: (new o).getURLParameter("bm.gameid"),
                    _bmsource: (new o).getURLParameter("bm.source"),
                    _loginIsLoaded: !1,
                    initialize: function(t) {
                        t == undefined && (t = {}), t.environment != undefined && (this._environment = t.environment), t.readyCallback != undefined && (this._readyCallback = t.readyCallback), t.popupClosedCallback != undefined && (this._popupClosedCallback = t.popupClosedCallback), t.context != undefined && (this._context = t.context), t.gameCode || console.error("Game Code missing from state params"), t.gameId !== void 0 && (this._gameId = t.gameId), t.bmsource !== void 0 && (this._bmsource = t.bmsource), this._gameCode = t.gameCode, this._availableProviders.indexOf(t.provider) !== -1 && (this._provider = t.provider);
                        var n = new o;
                        this._render(this._gameId), pm.bind("receive-bmx-token", function(e) {
                            a.setMessage("StateApi: Got login token"), this._login(e)
                        }.bind(this)), pm.bind("close-login-iframe", function() {
                            a.setMessage("StateApi: Login frame closed"), this._popupClosedCallback.call(this._context), e("iframe#booster-login-popup").addClass("hide")
                        }.bind(this)), a.setMessage("StateApi: Initialized")
                    },
                    login: function() {
                        var t = this;
                        this._loginIsLoaded ? (e("iframe#booster-login-popup").removeClass("hide"), pm({
                            target: window.frames["booster-login-popup"],
                            type: "open-login-iframe"
                        }), this._loginIsLoaded = !1) : e("iframe#booster-login-popup").on("load", function() {
                            e("iframe#booster-login-popup").removeClass("hide"), pm({
                                target: window.frames["booster-login-popup"],
                                type: "open-login-iframe"
                            }), t._loginIsLoaded = !1
                        })
                    },
                    _login: function(e) {
                        try {
                            var t = e.token;
                            this._model = r.getInstance(), this._model.setup(t, this._gameCode, this._provider, this._environment), this._readyCallback.call(this._context), a.setMessage("StateApi: Login callback")
                        } catch (n) {
                            console.error("Failed to parse login token")
                        }
                    },
                    save: function(e, t, n, r) {
                        if (this._model) this._model.save(e, t, n, r), a.setMessage("StateApi: Save called");
                        else {
                            var i = "StateApi: Attempted to call save before login. Please wait for the login to be sent. Register your login callback as an init parameter";
                            console.error(i), n.call(r, i)
                        }
                    },
                    load: function(e, t, n) {
                        if (this._model) this._model.load(e, t, n), a.setMessage("StateApi: Load called");
                        else {
                            var r = "StateApi: Attempted to call load before login. Please wait for the login to be sent. Register your login callback as an init parameter";
                            console.error(r), t.call(n, r)
                        }
                    },
                    checkValid: function(e, t) {
                        this._model ? (a.setMessage("StateApi: CheckValid called"), this._model.checkValid(e, t)) : (console.error("StateApi: Attempted to call checkValid before login. Please wait for the login to be sent. Register your login callback as an init parameter"), e.call(t, !1))
                    },
                    _render: function(n) {
                        var r = new o,
                            u = this,
                            a = t.template(i, {
                                bmGameId: n,
                                source: r.buildProtocolRelativeURL(r.getURLParameter("bm.source"))
                            });
                        a = e(a), e(a).on("load", function() {
                            u._loginIsLoaded = !0
                        }), e("body").append(a);
                        var f = t.template(s, {
                            bmGameId: n,
                            source: r.buildProtocolRelativeURL(r.getURLParameter("bm.source"))
                        });
                        e("body").append(f)
                    }
                });
            return f
        }), define("utils/uuid", ["utils/class"], function(e) {
            var t = e.extend({
                initialize: function(e) {
                    e ? this.value = e : this.value = this.generate()
                },
                generate: function() {
                    var e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
                    return e = e.replace(/[xy]/g, function(e) {
                        var t = Math.random() * 16 | 0,
                            n = e === "x" ? t : t & 3 | 8;
                        return n.toString(16)
                    }), e
                }
            });
            return t
        }), define("utils/jwt", ["utils/class"], function(e) {
            var t = e.extend({
                initialize: function() {},
                decode: function(e) {
                    var t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
                    try {
                        return JSON.parse(window.atob(t))
                    } catch (n) {
                        return !1
                    }
                }
            });
            return t
        }), define("models/freemium.model", ["zepto", "backbone", "utils/uuid", "utils/jwt"], function(e, t, n, r) {
            var i = t.Model.extend({
                domain: "https://bmium.service.boostermedia.com",
                pricepoints: "/v1/pricepoints",
                providers: "/v1/paymentproviders",
                init: _.template("/v1/<%- provider %>/init"),
                status: "/v1/status",
                JWT: "",
                token: "",
                forward_url: "https://bmium.service.boostermedia.com/ywallet/thankyou",
                auth_return_url: "https://bmium.service.boostermedia.com/ywallet/do",
                saveToken: function(e) {
                    this.token = e
                },
                decodeToken: function(e, t) {
                    t = t || "access_token";
                    try {
                        return JSON.parse(window.atob(e))[t]
                    } catch (n) {
                        return e
                    }
                },
                initialize: function() {},
                fetchPricePoints: function(t, n) {
                    var r = this.domain + this.pricepoints,
                        i = this._validateStatusParams(["client_id"], t);
                    if (!i) return n(null);
                    e.ajax({
                        type: "POST",
                        url: r,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(t),
                        dataType: "json",
                        success: function(e, t) {
                            n(e)
                        }
                    })
                },
                fetchProviders: function(t, n) {
                    var r = this.domain + this.providers,
                        i = this._validateStatusParams(["pricepoint", "clientid"], t);
                    if (!i) return n(null);
                    e.ajax({
                        type: "POST",
                        url: r,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(t),
                        dataType: "json",
                        success: function(e, t) {
                            n(e)
                        }
                    })
                },
                initStatus: function(t, r) {
                    var i = this,
                        s = {};
                    t = t || {}, t.client_transaction_id = (new n).generate(), s = {
                        Authorization: this.decodeToken(this.token)
                    };
                    var o = this._validateStatusParams(["pricepoint", "item_amount", "item_description", "client_id", "provider", "client_transaction_id"], t);
                    if (!o) return r(null);
                    t.forward_url = this.forward_url, t.auth_return_url = this.auth_return_url;
                    var u = this.domain + this.init({
                            provider: t.provider
                        }),
                        a = JSON.parse(JSON.stringify(t));
                    delete a.provider, e.ajax({
                        type: "POST",
                        url: u,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(t),
                        dataType: "json",
                        headers: s,
                        success: function(e) {
                            try {
                                e.payload = JSON.parse(e.payload)
                            } catch (t) {
                                e.payload = e.payload || {}
                            }
                            e.payload.JWT && (i.JWT = e.payload.JWT);
                            var n = e.response || e;
                            try {
                                n = JSON.parse(e)
                            } catch (t) {}
                            r(n)
                        },
                        error: function(e, t) {
                            r(JSON.parse(e.response))
                        }
                    })
                },
                checkStatus: function(t) {
                    var n = {
                            Authorization: this.decodeToken(this.token)
                        },
                        i = this.domain + this.status,
                        s = this;
                    e.ajax({
                        type: "POST",
                        url: i,
                        data: this.JWT,
                        contentType: "text/plain",
                        headers: n,
                        success: function(e) {
                            var n = (new r).decode(e.payload);
                            t(n.status)
                        },
                        error: function(e, n) {
                            t(JSON.parse(e.response))
                        }
                    })
                },
                pollCheckStatus: function(e) {
                    var t = this,
                        n = setInterval(function() {
                            t.checkStatus(function(t) {
                                t === "PAID" ? (clearInterval(n), e(!0)) : t === "CANCELLED" && (clearInterval(n), e(!1))
                            })
                        }, 1500)
                },
                _validateStatusParams: function(t, n, r) {
                    var i = e.extend(!0, {}, n);
                    if (typeof i != "object") return !1;
                    var s = !0;
                    return t.forEach(function(e) {
                        if (!i[e]) return s = !1;
                        delete i[e]
                    }), r || Object.keys(i).length === 0, s
                }
            });
            return i
        }), define("text!templates/freemium/modal.html", [], function() {
            return '<div class="modal-freemium" id="modal-freemium">\r\n</div>\r\n'
        }), define("text!templates/freemium/login.html", [], function() {
            return '<iframe\r\n  id="booster-login-popup"\r\n  name="booster-login-popup"\r\n  scrolling="yes"\r\n  src="<%= source %>/sdk.freemium/freemium?bm.gameid=<%= bmGameId %>">\r\n</iframe>\r\n'
        }), define("text!templates/freemium/ywallet.html", [], function() {
            return '<iframe\r\n  id="booster-ywallet-popup"\r\n  name="booster-ywallet-popup"\r\n  scrolling="yes"\r\n  src="<%= source %>/sdk.ywallet/ywallet?bm.gameid=<%= bmGameId %>">\r\n</iframe>\r\n'
        }), define("views/freemium.frame", ["zepto", "backbone", "models/freemium.model", "text!templates/freemium/modal.html", "text!templates/freemium/login.html", "text!templates/freemium/ywallet.html", "utils/url", "utils/cookie"], function(e, t, n, r, i, s, o, u) {
            var a = t.View.extend({
                done: function() {},
                model: {},
                count_error: 0,
                initialize: function() {
                    this.model = new n
                },
                initPurchase: function(e, t, n) {
                    var r = this;
                    typeof t == "function" && (this.done = t), this.renderModal(), n ? this.count_error++ : this.count_error = 0;
                    if (this.count_error > 7) {
                        this.count_error = 0, r.closeModal(!1);
                        return
                    }
                    this.renderLogin(function() {
                        r.model.initStatus(e, function(t) {
                            t.payload = t.payload || {}, t.payload.redir_uri ? (r.renderYwallet(t.payload.redir_uri), r.model.pollCheckStatus(function() {
                                r.closeModal(!0)
                            })) : r.closeModal(null, function() {
                                r.initPurchase(e, null, !0)
                            })
                        })
                    }, n)
                },
                fetchProviders: function(e, t) {
                    this.model.fetchProviders(e, t)
                },
                fetchPricePoints: function(e, t) {
                    this.model.fetchPricePoints(e, t)
                },
                closeLogin: function() {
                    pm.unbind("receive-yahoo-at"), pm.unbind("close-freemium-iframe"), e("#booster-login-popup").remove()
                },
                closeYwallet: function() {
                    pm.unbind("close-popup"), e("#booster-ywallet-popup").remove()
                },
                closeModal: function(t, n) {
                    var r = this;
                    pm.unbind("receive-yahoo-at"), pm.unbind("close-freemium-iframe"), pm.unbind("close-popup"), window.frames["booster-ywallet-popup"] && setTimeout(function() {
                        pm({
                            target: window.frames["booster-ywallet-popup"],
                            type: "close-ywallet"
                        })
                    }.bind(this), 1e3), setTimeout(function() {
                        e("#modal-freemium").remove(), typeof t == "boolean" && r.done(t), typeof n == "function" && n()
                    }, 1500)
                },
                renderModal: function() {
                    var t = _.template(r)();
                    e("body").append(t)
                },
                renderYwallet: function(t) {
                    var n = new o,
                        r = "//" + encodeURIComponent(n.getURLParameter("bm.source")),
                        i = n.getURLParameter("bm.gameid"),
                        u = _.template(s, {
                            bmGameId: i,
                            source: r
                        }),
                        a = this;
                    e("#modal-freemium").append(u), e("#booster-ywallet-popup").on("load", function() {
                        pm.bind("close-popup", function() {
                            a.closeModal(!1)
                        }), pm({
                            target: window.frames["booster-ywallet-popup"],
                            type: "open-ywallet",
                            data: {
                                url: t
                            }
                        })
                    })
                },
                renderLogin: function(t, n) {
                    var r = new o,
                        s = "//" + encodeURIComponent(r.getURLParameter("bm.source")),
                        u = r.getURLParameter("bm.gameid"),
                        a = _.template(i, {
                            bmGameId: u,
                            source: s
                        }),
                        f = this;
                    e("#modal-freemium").append(a), e("#booster-login-popup").on("load", function() {
                        pm.bind("receive-yahoo-at", function(e) {
                            var n = e.token;
                            f.closeLogin(), n && (f.model.saveToken(n), t())
                        }), pm.bind("close-freemium-iframe", function() {
                            f.closeModal(!1)
                        }), n ? pm({
                            target: window.frames["booster-login-popup"],
                            type: "delete-and-open-freemium-iframe"
                        }) : pm({
                            target: window.frames["booster-login-popup"],
                            type: "open-freemium-iframe"
                        })
                    })
                }
            });
            return a
        }), define("utils/index", ["utils/class", "utils/url"], function(e, t) {
            var n = e.extend({
                url: new t
            });
            return n
        }), define("text!templates/start-popup.html", [], function() {
            return '<iframe id="booster-start-popup" class="loading" name="booster-start-popup" src="<%- source %>/sdk.startpopup/startpopup?bm.gameid=<%- bmgameid %><%= iframe %>" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>\r\n'
        }), define("views/start.popup", ["zepto", "underscore", "backbone", "postmessage", "utils/debug.message", "text!templates/start-popup.html", "utils/url"], function(e, t, n, r, i, s, o) {
            var u = new i,
                a = new o,
                f = n.View.extend({
                    bmsource: a.getURLParameter("bm.source"),
                    onOpen: function() {},
                    onClose: function() {},
                    bmGameId: a.getURLParameter("bm.gameid"),
                    gmo_iframe: window.name.indexOf("gmo_iframe") !== -1,
                    initialize: function(e) {
                        u.setMessage("Start Popup initialize: ", e), e.onOpen && (this.onOpen = e.onOpen), e.onClose && (this.onClose = e.onClose), e.bmGameId && (this.bmGameId = e.bmGameId), this.render()
                    },
                    render: function() {
                        var n = this,
                            r = t.template(s, {
                                bmgameid: this.bmGameId,
                                iframe: this.gmo_iframe ? "&iframe=true" : "",
                                source: a.buildProtocolRelativeURL(this.bmsource)
                            });
                        e("body").append(r), pm.bind("show-startpopup", function(t) {
                            e("#booster-start-popup").removeClass("loading"), n.onOpen()
                        }), pm.bind("close-startpopup", function(t) {
                            e("#booster-start-popup").remove(), n.onClose()
                        })
                    }
                });
            return f
        }), define("utils/booster.ready", ["utils/debug.message"], function(e) {
            function r(e) {
                var r = e.data;
                t.setMessage("BoosterReady: recive the data - ", r);
                if (r.name === "gameStorage") {
                    try {
                        var s = JSON.parse(r.data);
                        for (var o in s) window.localStorage[o] = s[o]
                    } catch (u) {
                        console.error(u)
                    }
                    n && (n = !1, window.Booster.ready.call(), setInterval(i, 6e4))
                }
            }

            function i() {
                if (window.self !== window.top) {
                    var e = {};
                    e.type = "setGameStorage";
                    var n = {};
                    for (var r in window.localStorage) n[r] = window.localStorage[r];
                    t.setMessage("BoosterReady: save the data - ", e), e.data = n, window.parent.postMessage(JSON.stringify(e), "*")
                }
            }

            function s() {
                if (window.self !== window.top) {
                    var e = {};
                    e.type = "getGameStorage", t.setMessage("BoosterReady: start loading the data - ", e), window.parent.postMessage(JSON.stringify(e), "*"), setTimeout(function() {
                        n && (t.setMessage("BoosterReady: timeout"), n = !1, window.Booster.ready.call())
                    }, 250)
                } else t.setMessage("BoosterReady: skip"), window.Booster.ready.call();
                window.addEventListener("message", r, !1)
            }
            var t = new e,
                n = !0;
            return s
        }), define("uno", ["zepto", "booster", "models/analytics", "views/booster.tab", "views/highscore.frame", "magnificpopup", "views/dfp", "models/moregames.model", "models/savestate.model", "views/stateapi", "views/freemium.frame", "utils/index", "views/start.popup", "utils/booster.ready"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, p) {
            function d(e) {
                window.Booster = window.Booster || {}, window.Booster.Init = t, window.Booster.Community = r, window.Booster.Score = i, window.Booster.Analytics = n, window.Booster.Moregames = u, window.Booster.Savestate = a, window.Booster.StateApi = f, window.Booster.Ad = o, window.Booster.Freemium = l, window.Booster.Util = c, window.Booster.StartPopup = h, window.Booster.apiProps = e, p()
            }
            return d
        }), define("partners/ameba/community", ["zepto"], function(e) {
            function n(e) {}
            var t = {
                onResultPopupEnd: function(e) {
                    e()
                },
                onRecommendPopupEnd: function(e) {
                    e()
                }
            };
            return n.prototype.submitScore = function(e) {
                var n = e.score,
                    r = e.callback;
                AGP.AGP_casualGame.showResultPopup({
                    score: n
                }, t, r)
            }, n.prototype.submitSessionScore = function(e) {
                var n = e.score,
                    r = e.callback;
                AGP.AGP_casualGame.showResultPopup({
                    score: n
                }, t, r)
            }, n
        }), define("partners/ameba/score", ["zepto"], function(e) {
            function n(e) {}
            var t = {
                onResultPopupEnd: function(e) {
                    e()
                },
                onRecommendPopupEnd: function(e) {
                    e()
                }
            };
            return n.prototype.scoreSubmit = function(e, n) {
                var r = n,
                    i = e.callback;
                AGP.AGP_casualGame.showResultPopup({
                    score: r
                }, t, i)
            }, n.prototype.submitSession = function(e) {
                var n = e.score,
                    r = e.callback;
                AGP.AGP_casualGame.showResultPopup({
                    score: n
                }, t, r)
            }, n
        }), define("text!templates/partners/ameba/moregames.html", [], function() {
            return '<div class="AGP_tools" data-agptype="casualGame_commonMenuIcon" data-icon-style="white" style="display: none; position: absolute; left: 12px; bottom: 74px;"></div>\r\n'
        }), define("partners/ameba/moregames", ["zepto", "underscore", "text!templates/partners/ameba/moregames.html"], function(e, t, n) {
            function r(e) {
                var r = t.template(n);
                $("body").append(r()), e.gameProperties && e.gameProperties["sdk.menuIconPosition"] && $(".AGP_tools").css("top", e.gameProperties["sdk.menuIconPosition"] + "%")
            }
            return r
        }), define("text!templates/partners/ameba/splash.html", [], function() {
            return '<div class="AGP_tools" data-agptype="casualGame_splashScreen" data-image="<%= url %>/images/logo_672x512.png" data-orientation="portrait"></div>\r\n'
        }), define("partners/ameba/splash", ["zepto", "underscore", "text!templates/partners/ameba/splash.html"], function(e, t, n) {
            function s() {
                var e = t.template(n),
                    r = String(i.src);
                r = r.replace("/js/booster-api.js", ""), $("body").prepend(e({
                    url: r
                }))
            }
            var r = document.getElementsByTagName("script"),
                i = r[0];
            return s
        }), define("utils/script.loader", ["utils/url"], function(e) {
            function t(e, t) {
                var n = document.createElement("script");
                n.type = "text/javascript", n.onerror = t, n.onload = t, n.src = e, document.getElementsByTagName("body")[0].appendChild(n)
            }

            function n(e, n) {
                var r = e.length;
                for (var i = 0; e.length > i; i++) t(e[i], function() {
                    r--, r === 0 && n()
                })
            }
            return n
        }), define("ameba", ["zepto", "booster", "models/analytics", "partners/ameba/community", "partners/ameba/score", "magnificpopup", "views/dfp", "partners/ameba/moregames", "partners/ameba/splash", "utils/index", "views/start.popup", "utils/booster.ready", "utils/script.loader"], function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
            function g(e) {
                u(e), a(), window.Booster = window.Booster || {}, window.Booster.Init = t, window.Booster.Community = r, window.Booster.Score = i, window.Booster.Analytics = n, window.Booster.Ad = o, window.Booster.Util = f, window.Booster.StartPopup = l, window.Booster.Moregames = function() {}, window.Booster.apiProps = e
            }

            function y(t) {
                var n = t.gameProperties["sdk.clientId"],
                    r = t.contextProperties["sdk.environment"] || "production";
                g(t);
                var i = t.gameProperties["sdk.gameId"];
                window.location.href.indexOf("&bm.splashDisabled=true") === -1 && history.replaceState(null, null, window.location.href + "&bm.splashDisabled=true");
                var s = "";
                $.ajax({
                    url: d[r] + i,
                    xhrFields: {
                        withCredentials: !0
                    },
                    success: function(e) {
                        s = e
                    },
                    complete: function(t, o) {
                        var u;
                        try {
                            s = JSON.parse(s) || {}, u = s.access_token
                        } catch (a) {}
                        h(p[r], function() {
                            window.AMB.authorize = function() {
                                $.ajax({
                                    type: "POST",
                                    xhrFields: {
                                        withCredentials: !0
                                    },
                                    contentType: "application/json",
                                    data: JSON.stringify({
                                        return_url: window.location.href
                                    }),
                                    url: v[r] + i,
                                    success: function(e) {
                                        window.location.href = e
                                    }
                                })
                            }, AGP.init({
                                contentType: "casualGame",
                                clientId: n,
                                token: u,
                                callback: function(e) {},
                                ready: function() {
                                    if (!AGP.os.ios && !AGP.os.android) return AGP.AGP_casualGame.gotoLandingPage();
                                    setTimeout(function() {
                                        e(".AGP_adgame_splash").hide(), e(".AGP_tools").show(), AMB.configure({
                                            token: u,
                                            clientId: n,
                                            storage: !0
                                        }), AMB.bootstrap(function(e) {
                                            if (e.unregistered) {
                                                AMB.register();
                                                return
                                            }
                                            AGP.AGP_casualGame.startPopup(function(e) {
                                                AGP.AGP_casualGame.checkpoint("start"), c(), window.Booster.onSplashFinishedEvent && window.Booster.onSplashFinishedEvent.call()
                                            })
                                        })
                                    }, 1500)
                                }
                            })
                        })
                    }
                })
            }
            var p = {
                    staging: ["//stat.sb-amebame.com/pub/sdk/js/all.js", "//stat.sb-amebame.com/pub/agp/js/AGP-3.0.js"],
                    production: ["//ssl-stat.amebame.com/pub/sdk/js/all.js", "//ssl-stat.amebame.com/pub/agp/js/AGP-3.0.min.js"]
                },
                d = {
                    staging: "//test.staging.ameba.uno.one/api/token/cyberagent/",
                    production: "//ameba.uno.one/api/token/cyberagent/"
                },
                v = {
                    staging: "//test.staging.ameba.uno.one/api/startflow/cyberagent/",
                    production: "//ameba.uno.one/api/startflow/cyberagent/"
                },
                m = {
                    staging: "https://id.staging.coolgames.com/v1/callback/cyberagent/cyberagent?client_name=",
                    production: "https://id.coolgames.com/v1/callback/cyberagent/cyberagent?client_name="
                };
            return y
        }), require.config({
            paths: {
                zepto: "../lib/zepto",
                underscore: "../lib/underscore",
                backbone: "../lib/backbone",
                postmessage: "../lib/postmessage",
                magnificpopup: "../lib/magnificpopup",
                adblock: "../lib/adblock",
                templates: "../templates"
            },
            shim: {
                magnificpopup: ["zepto"]
            }
        }), require(["zepto", "utils/sync.prop", "uno", "ameba"], function(e, t, n, r) {
            e(function(e) {
                new t(function(e) {
                    e.context === "cyberagent" ? r(e) : n(e)
                })
            })
        }), define("all", function() {})
})();