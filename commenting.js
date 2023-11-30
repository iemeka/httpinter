( self[ "tmg.build" ] = self[ "tmg.build" ] || [] ).push( [ [ 406, 493, 625, 164, 2, 768, 378, 661, 380 ], {
    982: (e,t,r)=>{
        "use strict";
        function n(e) {
            this.message = e
        }
        r.d(t, {
            Z: ()=>a
        }),
        n.prototype = new Error,
        n.prototype.name = "InvalidCharacterError";
        var s = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(e) {
            var t = String(e).replace(/=+$/, "");
            if (t.length % 4 == 1)
                throw new n("'atob' failed: The string to be decoded is not correctly encoded.");
            for (var r, s, i = 0, o = 0, a = ""; s = t.charAt(o++); ~s && (r = i % 4 ? 64 * r + s : s,
            i++ % 4) ? a += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0)
                s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(s);
            return a
        }
        ;
        function i(e) {
            var t = e.replace(/-/g, "+").replace(/_/g, "/");
            switch (t.length % 4) {
            case 0:
                break;
            case 2:
                t += "==";
                break;
            case 3:
                t += "=";
                break;
            default:
                throw "Illegal base64url string!"
            }
            try {
                return function(e) {
                    return decodeURIComponent(s(e).replace(/(.)/g, (function(e, t) {
                        var r = t.charCodeAt(0).toString(16).toUpperCase();
                        return r.length < 2 && (r = "0" + r),
                        "%" + r
                    }
                    )))
                }(t)
            } catch (e) {
                return s(t)
            }
        }
        function o(e) {
            this.message = e
        }
        o.prototype = new Error,
        o.prototype.name = "InvalidTokenError";
        const a = function(e, t) {
            if ("string" != typeof e)
                throw new o("Invalid token specified");
            var r = !0 === (t = t || {}).header ? 0 : 1;
            try {
                return JSON.parse(i(e.split(".")[r]))
            } catch (e) {
                throw new o("Invalid token specified: " + e.message)
            }
        }
    }
    ,
    181: (e,t,r)=>{
        e.exports = function e(t, r, n) {
            function s(o, a) {
                if (!r[o]) {
                    if (!t[o]) {
                        if (i)
                            return i(o, !0);
                        var c = new Error("Cannot find module '" + o + "'");
                        throw c.code = "MODULE_NOT_FOUND",
                        c
                    }
                    var u = r[o] = {
                        exports: {}
                    };
                    t[o][0].call(u.exports, (function(e) {
                        return s(t[o][1][e] || e)
                    }
                    ), u, u.exports, e, t, r, n)
                }
                return r[o].exports
            }
            for (var i = void 0, o = 0; o < n.length; o++)
                s(n[o]);
            return s
        }({
            1: [function(e, t, r) {
                "use strict";
                var n = e("../src/store-engine")
                  , s = [e("../storages/localStorage"), e("../storages/sessionStorage"), e("../storages/cookieStorage"), e("../storages/memoryStorage")];
                t.exports = n.createStore(s, [])
            }
            , {
                "../src/store-engine": 2,
                "../storages/cookieStorage": 4,
                "../storages/localStorage": 5,
                "../storages/memoryStorage": 6,
                "../storages/sessionStorage": 7
            }],
            2: [function(e, t, r) {
                "use strict";
                function n(e, t, r) {
                    r || (r = ""),
                    e && !l(e) && (e = [e]),
                    t && !l(t) && (t = [t]);
                    var n = r ? "__storejs_" + r + "_" : ""
                      , s = r ? new RegExp("^" + n) : null;
                    if (!/^[a-zA-Z0-9_\-]*$/.test(r))
                        throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
                    var m = {
                        _namespacePrefix: n,
                        _namespaceRegexp: s,
                        _testStorage: function(e) {
                            try {
                                var t = "__storejs__test__";
                                e.write(t, t);
                                var r = e.read(t) === t;
                                return e.remove(t),
                                r
                            } catch (e) {
                                return !1
                            }
                        },
                        _assignPluginFnProp: function(e, t) {
                            var r = this[t];
                            this[t] = function() {
                                var t = i(arguments, 0)
                                  , n = this
                                  , s = [function() {
                                    if (r)
                                        return a(arguments, (function(e, r) {
                                            t[r] = e
                                        }
                                        )),
                                        r.apply(n, t)
                                }
                                ].concat(t);
                                return e.apply(n, s)
                            }
                        },
                        _serialize: function(e) {
                            return JSON.stringify(e)
                        },
                        _deserialize: function(e, t) {
                            if (!e)
                                return t;
                            var r = "";
                            try {
                                r = JSON.parse(e)
                            } catch (t) {
                                r = e
                            }
                            return void 0 !== r ? r : t
                        },
                        _addStorage: function(e) {
                            this.enabled || this._testStorage(e) && (this.storage = e,
                            this.enabled = !0)
                        },
                        _addPlugin: function(e) {
                            var t = this;
                            if (l(e))
                                a(e, (function(e) {
                                    t._addPlugin(e)
                                }
                                ));
                            else {
                                var r = o(this.plugins, (function(t) {
                                    return e === t
                                }
                                ));
                                if (!r) {
                                    if (this.plugins.push(e),
                                    !g(e))
                                        throw new Error("Plugins must be function values that return objects");
                                    var n = e.call(this);
                                    if (!d(n))
                                        throw new Error("Plugins must return an object of function properties");
                                    a(n, (function(r, n) {
                                        if (!g(r))
                                            throw new Error("Bad plugin property: " + n + " from plugin " + e.name + ". Plugins should only return functions.");
                                        t._assignPluginFnProp(r, n)
                                    }
                                    ))
                                }
                            }
                        },
                        addStorage: function(e) {
                            (function() {
                                var e = "undefined" == typeof console ? null : console;
                                e && (e.warn ? e.warn : e.log).apply(e, arguments)
                            }
                            )("store.addStorage(storage) is deprecated. Use createStore([storages])"),
                            this._addStorage(e)
                        }
                    }
                      , h = u(m, p, {
                        plugins: []
                    });
                    return h.raw = {},
                    a(h, (function(e, t) {
                        g(e) && (h.raw[t] = c(h, e))
                    }
                    )),
                    a(e, (function(e) {
                        h._addStorage(e)
                    }
                    )),
                    a(t, (function(e) {
                        h._addPlugin(e)
                    }
                    )),
                    h
                }
                var s = e("./util")
                  , i = s.slice
                  , o = s.pluck
                  , a = s.each
                  , c = s.bind
                  , u = s.create
                  , l = s.isList
                  , g = s.isFunction
                  , d = s.isObject;
                t.exports = {
                    createStore: n
                };
                var p = {
                    version: "2.0.12",
                    enabled: !1,
                    get: function(e, t) {
                        var r = this.storage.read(this._namespacePrefix + e);
                        return this._deserialize(r, t)
                    },
                    set: function(e, t) {
                        return void 0 === t ? this.remove(e) : (this.storage.write(this._namespacePrefix + e, this._serialize(t)),
                        t)
                    },
                    remove: function(e) {
                        this.storage.remove(this._namespacePrefix + e)
                    },
                    each: function(e) {
                        var t = this;
                        this.storage.each((function(r, n) {
                            e.call(t, t._deserialize(r), (n || "").replace(t._namespaceRegexp, ""))
                        }
                        ))
                    },
                    clearAll: function() {
                        this.storage.clearAll()
                    },
                    hasNamespace: function(e) {
                        return this._namespacePrefix == "__storejs_" + e + "_"
                    },
                    createStore: function() {
                        return n.apply(this, arguments)
                    },
                    addPlugin: function(e) {
                        this._addPlugin(e)
                    },
                    namespace: function(e) {
                        return n(this.storage, this.plugins, e)
                    }
                }
            }
            , {
                "./util": 3
            }],
            3: [function(e, t, n) {
                (function(e) {
                    "use strict";
                    function r(e, t) {
                        return Array.prototype.slice.call(e, t || 0)
                    }
                    function n(e, t) {
                        s(e, (function(e, r) {
                            return t(e, r),
                            !1
                        }
                        ))
                    }
                    function s(e, t) {
                        if (i(e)) {
                            for (var r = 0; r < e.length; r++)
                                if (t(e[r], r))
                                    return e[r]
                        } else
                            for (var n in e)
                                if (e.hasOwnProperty(n) && t(e[n], n))
                                    return e[n]
                    }
                    function i(e) {
                        return null != e && "function" != typeof e && "number" == typeof e.length
                    }
                    var o = Object.assign ? Object.assign : function(e, t, r, s) {
                        for (var i = 1; i < arguments.length; i++)
                            n(Object(arguments[i]), (function(t, r) {
                                e[r] = t
                            }
                            ));
                        return e
                    }
                      , a = function() {
                        if (Object.create)
                            return function(e, t, n, s) {
                                var i = r(arguments, 1);
                                return o.apply(this, [Object.create(e)].concat(i))
                            }
                            ;
                        var e = function() {};
                        return function(t, n, s, i) {
                            var a = r(arguments, 1);
                            return e.prototype = t,
                            o.apply(this, [new e].concat(a))
                        }
                    }()
                      , c = String.prototype.trim ? function(e) {
                        return String.prototype.trim.call(e)
                    }
                    : function(e) {
                        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                    }
                      , u = "undefined" != typeof window ? window : e;
                    t.exports = {
                        assign: o,
                        create: a,
                        trim: c,
                        bind: function(e, t) {
                            return function() {
                                return t.apply(e, Array.prototype.slice.call(arguments, 0))
                            }
                        },
                        slice: r,
                        each: n,
                        map: function(e, t) {
                            var r = i(e) ? [] : {};
                            return s(e, (function(e, n) {
                                return r[n] = t(e, n),
                                !1
                            }
                            )),
                            r
                        },
                        pluck: s,
                        isList: i,
                        isFunction: function(e) {
                            return e && "[object Function]" === {}.toString.call(e)
                        },
                        isObject: function(e) {
                            return e && "[object Object]" === {}.toString.call(e)
                        },
                        Global: u
                    }
                }
                ).call(this, void 0 !== r.g ? r.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {}],
            4: [function(e, t, r) {
                "use strict";
                function n(e) {
                    for (var t = u.cookie.split(/; ?/g), r = t.length - 1; r >= 0; r--)
                        if (c(t[r])) {
                            var n = t[r].split("=")
                              , s = unescape(n[0]);
                            e(unescape(n[1]), s)
                        }
                }
                function s(e) {
                    e && i(e) && (u.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/")
                }
                function i(e) {
                    return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(u.cookie)
                }
                var o = e("../src/util")
                  , a = o.Global
                  , c = o.trim;
                t.exports = {
                    name: "cookieStorage",
                    read: function(e) {
                        if (!e || !i(e))
                            return null;
                        var t = "(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
                        return unescape(u.cookie.replace(new RegExp(t), "$1"))
                    },
                    write: function(e, t) {
                        e && (u.cookie = escape(e) + "=" + escape(t) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/")
                    },
                    each: n,
                    remove: s,
                    clearAll: function() {
                        n((function(e, t) {
                            s(t)
                        }
                        ))
                    }
                };
                var u = a.document
            }
            , {
                "../src/util": 3
            }],
            5: [function(e, t, r) {
                "use strict";
                function n() {
                    return i.localStorage
                }
                function s(e) {
                    return n().getItem(e)
                }
                var i = e("../src/util").Global;
                t.exports = {
                    name: "localStorage",
                    read: s,
                    write: function(e, t) {
                        return n().setItem(e, t)
                    },
                    each: function(e) {
                        for (var t = n().length - 1; t >= 0; t--) {
                            var r = n().key(t);
                            e(s(r), r)
                        }
                    },
                    remove: function(e) {
                        return n().removeItem(e)
                    },
                    clearAll: function() {
                        return n().clear()
                    }
                }
            }
            , {
                "../src/util": 3
            }],
            6: [function(e, t, r) {
                "use strict";
                t.exports = {
                    name: "memoryStorage",
                    read: function(e) {
                        return n[e]
                    },
                    write: function(e, t) {
                        n[e] = t
                    },
                    each: function(e) {
                        for (var t in n)
                            n.hasOwnProperty(t) && e(n[t], t)
                    },
                    remove: function(e) {
                        delete n[e]
                    },
                    clearAll: function(e) {
                        n = {}
                    }
                };
                var n = {}
            }
            , {}],
            7: [function(e, t, r) {
                "use strict";
                function n() {
                    return i.sessionStorage
                }
                function s(e) {
                    return n().getItem(e)
                }
                var i = e("../src/util").Global;
                t.exports = {
                    name: "sessionStorage",
                    read: s,
                    write: function(e, t) {
                        return n().setItem(e, t)
                    },
                    each: function(e) {
                        for (var t = n().length - 1; t >= 0; t--) {
                            var r = n().key(t);
                            e(s(r), r)
                        }
                    },
                    remove: function(e) {
                        return n().removeItem(e)
                    },
                    clearAll: function() {
                        return n().clear()
                    }
                }
            }
            , {
                "../src/util": 3
            }]
        }, {}, [1])(1)
    }
    ,
    412: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>i
        });
        var n = r(982)
          , s = r(42);
        const i = class {
            static setLocalToken(e, t) {
                localStorage.setItem(e, t)
            }
            static setValidAppUser(e) {
                const t = (0,
                n.Z)(e);
                t.subscriptionType && t.exp && this.setLocalStorage("validAppUser", {
                    subscriptionType: t.subscriptionType,
                    subscriptionName: t.subscriptionName,
                    exp: t.exp
                }),
                t.subscriberId && "GATES_OPEN" !== t.subscriberId && (this.setLocalStorage("pid", t.subscriberId),
                "TMG" === t.subscriptionType && !1 === t.inAppPurchase && (this.setTmgPidCookie(t.subscriberId),
                this.setTmgP13NCookie(`{subscriptionType:'${t.subscriptionName}'}`),
                this.setTmgSessionCookie(t.exp)))
            }
            static getValidAppUser() {
                const e = localStorage.getItem("validAppUser");
                return e ? JSON.parse(e) : {}
            }
            static setTmgPidCookie(e) {
                s.Z.set("tmg_pid", e, {
                    expires: 1,
                    domain: ".telegraph.co.uk"
                })
            }
            static setTmgP13NCookie(e) {
                s.Z.set("tmg_p13n", e, {
                    expires: 1,
                    domain: ".telegraph.co.uk"
                })
            }
            static setTmgSessionCookie(e) {
                s.Z.set("tmg_session", e, {
                    expires: 1,
                    domain: ".telegraph.co.uk"
                })
            }
            static extendValidAppUserExpiry(e, t) {
                const r = Math.floor(e.setMinutes(e.getMinutes() + t) / 1e3)
                  , n = Object.assign(this.getValidAppUser(), {
                    exp: r,
                    isExtended: !0
                });
                this.setLocalStorage("validAppUser", n)
            }
            static setLocalStorage(e, t) {
                localStorage.setItem(e, JSON.stringify(t))
            }
        }
    }
    ,
    410: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>a
        });
        var n = r(453)
          , s = r(384)
          , i = r(436);
        class o {
            constructor() {
                this.params = {
                    local: "local",
                    qa: "qa",
                    ci: "ci",
                    staging: "staging",
                    prod: "prod"
                },
                this.currentEnv = this.determineEnvironment(),
                s.Z.create("tmg.environment"),
                tmg.environment = {
                    currentEnv: this.currentEnv,
                    getEnvironment: this.getEnvironment,
                    getList: this.getList,
                    getTld: this.getTld,
                    isCommentingTurnedOn: this.isCommentingTurnedOn,
                    isHttps: this.isHttps,
                    isLocal: this.isLocal,
                    isProd: this.isProd
                }
            }
            determineEnvironment() {
                const e = i.Z.getLocation().hostname.split(".");
                return e.some((e=>"local" === e || "127" === e || "localhost" === e)) ? this.getList().local : e.some((e=>/(^|-)ci[0-9]+(-app)?$/i.test(e))) ? this.getList().ci : e.some((e=>/(^|-)qa[0-9]+(-app)?$/i.test(e))) ? this.getList().qa : e.some((e=>/(^|-)staging(.*)$/i.test(e))) ? this.getList().staging : this.getList().prod
            }
            getList() {
                return this.params
            }
            getEnvironment() {
                return this.currentEnv
            }
            getTld() {
                return "telegraph.co.uk"
            }
            isCommentingTurnedOn() {
                let e = !1;
                try {
                    void 0 !== tmg.COMMENTING_STATUS && (e = !!tmg.COMMENTING_STATUS)
                } catch (e) {
                    console.log(e)
                }
                return e
            }
            isHttps() {
                return "https:" === i.Z.getLocation().protocol || this.isLocal()
            }
            isLocal() {
                return this.getEnvironment() === this.getList().local
            }
            isProd() {
                return this.getEnvironment() === this.getList().prod
            }
        }
        n.Z.subscribe({
            topic: "tmg.page.ready",
            func: new o,
            runIfAlreadyPublished: !0
        });
        const a = o
    }
    ,
    436: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>o
        });
        var n = r(384)
          , s = r(453);
        class i {
            constructor() {
                n.Z.create("tmg.page"),
                tmg.page = {
                    getMetaTag: this.getMetaTag,
                    getMetaContent: this.getMetaContent,
                    getPageType: this.getPageType,
                    getPageTitle: this.getPageTitle,
                    getChannel: this.getChannel,
                    getBusinessSegment: this.getBusinessSegment,
                    getCategory: this.getCategory,
                    getContentType: this.getContentType,
                    getArticleId: this.getArticleId,
                    getPublishDate: this.getPublishDate,
                    getKeywords: this.getKeywords,
                    getLocation: this.getLocation,
                    getLeadAssetLayout: this.getLeadAssetLayout,
                    isArticle: this.isArticle,
                    isSponsored: this.isSponsored,
                    isGallery: this.isGallery,
                    isGallery2: this.isGallery2,
                    isPremium: this.isPremium,
                    isApp: this.isApp.bind(this)
                }
            }
            getPageType() {
                return window.dataLayer && window.dataLayer.pageType
            }
            getPageTitle() {
                return document.title
            }
            getChannel() {
                return this.getMetaContent("tmgads.channel")
            }
            getCategory() {
                return this.getMetaContent("DCSext.Category")
            }
            getBusinessSegment() {
                return this.getMetaContent("tmgads.businessSegment")
            }
            getContentType() {
                return this.getMetaContent("DCSext.Content_Type")
            }
            getArticleId() {
                return this.getMetaContent("tmgads.articleid")
            }
            getPublishDate() {
                return this.getMetaContent("DCSext.articleFirstPublished")
            }
            getKeywords() {
                return this.getMetaContent("keywords").split(",").map((e=>e.trim()))
            }
            getLocation() {
                return document.location
            }
            getMetaContent(e, t="content") {
                const r = this.getMetaTag(e);
                let n = "generic";
                return r && r.getAttribute(t) && (n = r.getAttribute(t)),
                n
            }
            getMetaTag(e) {
                return document.querySelector(`meta[name='${e}']`)
            }
            isArticle() {
                let e = !1;
                return ["articleRenderer", "articleRenderer2", "longFormRenderer"].forEach((t=>{
                    this.getPageType() === t && (e = !0)
                }
                )),
                e
            }
            isGallery() {
                return "galleryRenderer" === this.getPageType()
            }
            isGallery2() {
                return "galleryRenderer2" === this.getPageType()
            }
            isSponsored() {
                return "sponsored" === this.getBusinessSegment()
            }
            isPremium() {
                return "true" === this.getMetaContent("tmg.premium.state")
            }
            isApp() {
                return "true" === this.getMetaContent("tmg.app")
            }
            isAuthor() {
                return document.documentElement.hasAttribute("data-is-author")
            }
            getLeadAssetLayout() {
                return this.isArticle() && document.querySelector("[data-lead-asset-layout]") ? document.querySelector("[data-lead-asset-layout]").dataset.leadAssetLayout : this.isArticle() ? "hidden" : void 0
            }
        }
        s.Z.subscribe({
            topic: "tmg.page.ready",
            func: new i,
            runIfAlreadyPublished: !0
        });
        const o = new i
    }
    ,
    453: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>i
        });
        var n = r(384);
        const s = new class {
            constructor() {
                this.topics = [],
                this.publishedTopics = [],
                this.UID = -1
            }
            subscribe({topic: e, func: t, runIfAlreadyPublished: r}) {
                if ("function" != typeof t)
                    return !1;
                if (r)
                    for (let r = 0; r < this.publishedTopics.length; r++)
                        this.publishedTopics[r] === e && t.call();
                const n = (this.UID += 1).toString();
                return this.topics.push({
                    token: n,
                    topic: e,
                    func: t
                }),
                n
            }
            unsubscribe({topic: e, token: t}) {
                for (let r = 0; r < this.topics.length; r++)
                    this.topics[r].token === t && this.topics[r].topic === e && this.topics.splice(r, 1)
            }
            publish({topic: e}) {
                this.publishedTopics.push(e);
                for (let t = 0; t < this.topics.length; t++)
                    this.topics[t].topic === e && this.topics[t].func.call()
            }
        }
        ;
        n.Z.create("tmg.pubsub"),
        window.tmg.pubsub = s;
        const i = s
    }
    ,
    177: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>g
        });
        var n = r(384)
          , s = r(453)
          , i = r(42)
          , o = r(987)
          , a = r(436)
          , c = r(951)
          , u = r(978);
        class l {
            constructor() {
                n.Z.create("tmg.dataLayerUtils"),
                window.dataLayer = window.dataLayer || {},
                this.cookieStatus = this.getCookies(),
                this.isPaymentRenderer = window.dataLayer.pageType && "paymentRenderer" === window.dataLayer.pageType,
                this.listenerEvents = ["click", "input"],
                this.initListeners("[data-layer-event]"),
                tmg.dataLayerUtils = {
                    cookieStatus: this.cookieStatus,
                    update: this.update,
                    isPaymentRenderer: this.isPaymentRenderer,
                    onRegistrationSuccess: this.onRegistrationSuccess,
                    onRegistrationUpdate: this.onRegistrationUpdate,
                    onSubscriptionConfirmation: this.onSubscriptionConfirmation,
                    updateSubscription: this.updateSubscription,
                    updateUserStatus: this.updateUserStatus,
                    checkCookie: this.checkCookie,
                    removeCookie: this.removeCookie,
                    addPropertyValue: this.addPropertyValue
                },
                this.update()
            }
            update() {
                this.cookieStatus.registrationSuccess.value ? (this.onRegistrationSuccess(),
                this.removeCookie(this.cookieStatus.registrationSuccess.name)) : this.cookieStatus.registrationUpdate.value ? (this.onRegistrationUpdate(),
                this.removeCookie(this.cookieStatus.registrationUpdate.name)) : this.cookieStatus.subscriptionConfirmation.value ? (this.onSubscriptionConfirmation(),
                this.removeCookie(this.cookieStatus.subscriptionConfirmation.name)) : this.isPaymentRenderer && this.updateSubscription(),
                this.updateUserStatus()
            }
            updateUserStatus() {
                o.Z.isLoggedIn() ? window.dataLayer.userStatus = o.Z.isSubscriber() ? "subscribed" : "registered" : window.dataLayer.userStatus = "anonymous"
            }
            onRegistrationSuccess() {
                const e = this.checkCookie(this.cookieStatus.registrationSuccess, "success_facebook")
                  , t = this.checkCookie(this.cookieStatus.registrationSuccess, "success_emailoffers-true");
                window.dataLayer.event = ["registrationComplete"],
                window.dataLayer.registration = {
                    registrationType: e ? "facebook" : "email",
                    emailOptIn: t ? "true" : "false"
                }
            }
            onRegistrationUpdate() {
                "1" !== this.cookieStatus.registrationUpdate.value ? (window.dataLayer.event = ["registrationUpdate", "newsletterSignup"],
                window.dataLayer.newsletterType = this.cookieStatus.registrationUpdate.value) : window.dataLayer.event = ["registrationUpdate"],
                window.dataLayer.registration = {
                    registrationType: "email"
                }
            }
            onSubscriptionConfirmation() {
                window.dataLayer.event = ["subscriptionConfirmation"],
                window.dataLayer.subscription = u.Z.tryParse(JSON.stringify(this.cookieStatus.subscriptionConfirmation.value))
            }
            updateSubscription() {
                window.dataLayer.event = ["subscriptionCheckout"],
                window.dataLayer.subscription = {
                    productID: c.Z.getQuerystringParam(a.Z.getLocation().search, "productId")
                }
            }
            checkCookie(e, t) {
                return !(!e || !t) && e.value === t
            }
            removeCookie(e=null) {
                e && i.Z.remove(e, {
                    domain: ".telegraph.co.uk"
                })
            }
            initListeners(e) {
                const t = document.querySelectorAll(e);
                t && t.forEach((e=>this.bindListeners(e)))
            }
            bindListeners(e) {
                this.listenerEvents.forEach((t=>{
                    e.addEventListener(t, (e=>{
                        this.addEvent(e.target.dataset.layerEvent)
                    }
                    ))
                }
                ))
            }
            addEvent(e) {
                window.dataLayer.event !== e && (window.dataLayer.event = e)
            }
            getCookies() {
                return {
                    registrationSuccess: {
                        name: "tmg_registration_success",
                        value: i.Z.get("tmg_registration_success")
                    },
                    registrationUpdate: {
                        name: "tmg_registration_update",
                        value: i.Z.get("tmg_registration_update")
                    },
                    subscriptionConfirmation: {
                        name: "tmg_subscription_confirmation",
                        value: i.Z.get("tmg_subscription_confirmation")
                    }
                }
            }
            static addPropertyValue(e, t) {
                e && t && (window.dataLayer[e] = t)
            }
        }
        s.Z.subscribe({
            topic: "tmg.page.ready",
            func: ()=>{
                new l
            }
            ,
            runIfAlreadyPublished: !0
        });
        const g = l
    }
    ,
    987: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>I
        });
        var n = r(42)
          , s = r(978)
          , i = r(384)
          , o = r(470)
          , a = r(436)
          , c = r(453);
        const u = {
            pId: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            readerType: "",
            subscriber: "",
            subButton: "",
            subscriptionType: "",
            subscriptionName: ""
        }
          , l = {
            viafouraRefresh: "VfRefresh",
            meterCount: "tmg_meter_count",
            personalisation: "tmg_p13n",
            publicId: "tmg_pid",
            registrationSuccess: "tmg_registration_success",
            rememberMe: "tmg_rem",
            session: "tmg_session",
            refreshTkn: "tmg_refresh",
            subscriptionConfirmation: "tmg_subscription_confirmation"
        }
          , g = "ACCESS_TOKEN"
          , d = "validAppUser"
          , p = "tmg.user.mytelegraph.token"
          , m = "tmg.user.mytelegraph.onboarded.status"
          , h = "logged-in--"
          , f = "is-subscriber--"
          , y = "app-tmg-subscriber--"
          , v = document.querySelector("html");
        let b = {};
        const w = (e,t)=>{
            if (t || (()=>{
                let e = document.querySelectorAll(`[class*="${h}"], [class*="${f}"], [class*="${y}"]`);
                e = Array.prototype.slice.call(e),
                e.forEach((e=>{
                    w(e, !0)
                }
                ))
            }
            )(),
            !e)
                return;
            let r = `\\b(?:${h}|${f}|${y}).+\\b`;
            return e.className = e.className.replace(new RegExp(r,"g"), ""),
            e.classList && (e.classList.add(`${h}${C()}`),
            e.classList.add(`${f}${T()}`),
            e.classList.add(`${y}${A()}`)),
            e.classList
        }
          , S = ()=>{
            let e = n.Z.get(l.personalisation);
            return s.Z.tryParse(e, u)
        }
          , C = ()=>!!n.Z.get(l.session)
          , T = ()=>"true" === b.subscriber
          , P = ()=>!!localStorage.getItem(g)
          , k = ()=>localStorage.getItem(d) || "{}"
          , A = ()=>{
            try {
                const e = k()
                  , t = P()
                  , r = "TMG" === JSON.parse(e).subscriptionType;
                return t && r
            } catch (e) {
                return !1
            }
        }
          , L = ()=>{
            try {
                const e = k()
                  , t = P()
                  , r = "All Digital Access" === JSON.parse(e).subscriptionName;
                return t && r
            } catch (e) {
                return !1
            }
        }
          , _ = ()=>(window.sessionStorage.removeItem("id_token"),
        window.sessionStorage.removeItem("access_token"),
        window.localStorage.removeItem(d),
        window.localStorage.removeItem(g),
        void 0 !== window.vf && window.vf.session.logout(),
        n.Z.remove(l.viafouraRefresh),
        n.Z.remove(l.session),
        E(),
        !0)
          , E = ()=>(b = S(),
        w(v),
        b)
          , Z = {
            applyStatusCssClasses: w,
            clearAllData: ()=>{
                _();
                for (let e in l)
                    n.Z.remove(l[e]);
                o.Z.remove("fyre-auth"),
                o.Z.remove("fyre-authentication-creds"),
                E()
            }
            ,
            getMeterCount: ()=>!1,
            getMyTelegraphToken: ()=>{
                const e = o.Z.storage.read(p);
                return "undefined" !== e && null !== e && e
            }
            ,
            getProfile: S,
            getSubscriberId: ()=>JSON.parse(localStorage.getItem("pid")) || "",
            getAccessToken: ()=>localStorage.getItem(g) || "",
            getPublicId: ()=>n.Z.get(l.publicId) || "",
            getSessionId: ()=>n.Z.get(l.session) || "",
            getRefreshToken: ()=>n.Z.get(l.refreshTkn) || "",
            isLoggedIn: C,
            isLoggedInApp: ()=>!!localStorage.getItem(d),
            isRegistered: ()=>!!b.pId,
            isSubscriber: T,
            isAdLite: ()=>!0 === L() || "true" === a.Z.getMetaContent("tmg.isAdLite"),
            canComment: ()=>C() && T(),
            canCommentInApp: ()=>A(),
            isAppTmgSubscriber: A,
            isAppTmgDigitalPlusSubscriber: L,
            isMyTelegraphOnboarded: ()=>!!o.Z.storage.read(m),
            login: ()=>(E(),
            !1),
            logout: _,
            setMyTelegraphToken: ({token: e})=>o.Z.storage.write(p, e),
            setMyTelegraphOnboarded: ({status: e})=>o.Z.storage.write(m, e),
            updateState: E
        };
        i.Z.create("tmg.user"),
        window.tmg.user = Z,
        b = E(),
        c.Z.publish({
            topic: "tmg.user.ready"
        });
        const I = Z
    }
    ,
    283: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>o
        });
        var n = r(384)
          , s = r(453);
        class i {
            constructor() {
                n.Z.create("tmg.utils"),
                tmg.utils = {
                    injectScript: this.injectScript,
                    getRandomInt: this.getRandomInteger
                }
            }
            injectScript(e, t=!0) {
                return new Promise(((r,n)=>{
                    if (e) {
                        const n = document.createElement("script");
                        n.setAttribute("src", e),
                        n.addEventListener("load", r, !1),
                        t && n.setAttribute("defer", "true"),
                        document.querySelector("head").appendChild(n)
                    } else
                        n(Error("No src supplied"))
                }
                ))
            }
            getRandomInteger(e, t) {
                if (!e || !t)
                    return;
                const r = Math.ceil(e)
                  , n = Math.floor(t);
                return Math.floor(Math.random() * (n - r) + r)
            }
            disableScrolling() {
                document.documentElement.style.overflow = "hidden"
            }
            enableScrolling() {
                document.documentElement.style.overflow = "auto"
            }
        }
        s.Z.subscribe({
            topic: "tmg.page.ready",
            func: new i,
            runIfAlreadyPublished: !0
        });
        const o = i
    }
    ,
    42: (e,t,r)=>{
        "use strict";
        function n() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var r = arguments[e];
                for (var n in r)
                    t[n] = r[n]
            }
            return t
        }
        r.d(t, {
            Z: ()=>s
        });
        const s = function e(t) {
            function r(e, s, i) {
                var o;
                if (arguments.length > 1) {
                    if ("number" == typeof (i = n({
                        path: "/"
                    }, r.defaults, i)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires),
                        i.expires = a
                    }
                    try {
                        o = JSON.stringify(s),
                        /^[\{\[]/.test(o) && (s = o)
                    } catch (e) {}
                    return s = (s = encodeURIComponent(String(s))).replace(/%(20|23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    e = (e = (e = encodeURIComponent(String(e))).replace(/%(20|23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape),
                    document.cookie = [e, "=", s, i.expires && "; expires=" + i.expires.toUTCString(), i.path && "; path=" + i.path, i.domain && "; domain=" + i.domain, i.secure ? "; secure" : ""].join("")
                }
                e || (o = {});
                for (var c = document.cookie ? document.cookie.split("; ") : [], u = /(%[0-9A-Z]{2})+/g, l = 0; l < c.length; l++) {
                    var g = c[l].split("=")
                      , d = g[0].replace(u, decodeURIComponent)
                      , p = g.slice(1).join("=");
                    '"' === p.charAt(0) && (p = p.slice(1, -1));
                    try {
                        if (p = t && t(p, d) || p.replace(u, decodeURIComponent),
                        this.json)
                            try {
                                p = JSON.parse(p)
                            } catch (e) {}
                        if (e === d) {
                            o = p;
                            break
                        }
                        e || (o[d] = p)
                    } catch (e) {}
                }
                return o
            }
            return r.get = r.set = r,
            r.getJSON = function() {
                return r.apply({
                    json: !0
                }, [].slice.call(arguments))
            }
            ,
            r.defaults = {},
            r.remove = function(e, t) {
                r(e, "", n(t, {
                    expires: -1
                }))
            }
            ,
            r.withConverter = e,
            r
        }()
    }
    ,
    978: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>g
        });
        var n = r(384);
        let s = {};
        const i = e=>{
            let t = {};
            return "string" == typeof e && (t = o(e.replace(/'/g, '"'))),
            t
        }
          , o = (e,t)=>{
            let r = t || {}
              , n = e
              , s = !1
              , i = ""
              , o = []
              , g = []
              , d = [];
            const p = /[{?,\s]\s*"([^"]|\\")+"\s*:(\s*"([^"]|\\")+"|(.+))\s*[},]/gi
              , m = /^\s*{?\s*'|'\s*}?\s*$/i;
            if (!e)
                return r;
            if ("[object Object]" === Object.prototype.toString.call(e))
                return e;
            if (s = c(n),
            s || (d = n.match(p) || [],
            d.forEach((e=>{
                if (e.includes('"label"')) {
                    const t = e.replace(/^\s*[{\s]|[,}]\s*$/gi, "").split(":")[1].replace(/\s*"([^]+|\\")"\s*$/gi, "$1")
                      , r = t.replace(/"/gi, '\\"')
                      , s = e.replace(t, r);
                    n = n.replace(e, s)
                }
            }
            )),
            i = n.replace(p, ""),
            o = i.split(/,(?=(?:[^",]*:[^",]*)|[^",]*$)/)),
            o.forEach((e=>{
                const t = e.replace(/^\s*{|}\s*$/gi, "");
                c(a(t)) || g.push(t)
            }
            )),
            g.forEach((e=>{
                let t = !1
                  , r = e;
                !0 === m.test(e) && (r = l(e),
                t = c(a(r))),
                t || !0 !== /[^"']\w+[^"']:/.test(r) || (r = u(r),
                t = c(a(r))),
                t && (n = n.replace(e, r))
            }
            )),
            s = c(n),
            s)
                r = c(n);
            else
                try {
                    JSON.parse(n)
                } catch (e) {
                    console.log("tmg.json.tryParse failed:", e)
                }
            return r
        }
          , a = e=>`{${e}}`
          , c = e=>{
            let t = !1;
            try {
                t = JSON.parse(e)
            } catch (e) {}
            return t
        }
          , u = e=>{
            let t = e;
            return t = t.replace(/^\s*(.*?):/, '"$1":'),
            t
        }
          , l = e=>{
            let t = e;
            return t = t.replace(/^\s*'([^']+|\\')':/, '"$1":'),
            t = t.replace(/:\s*('')\s*$/, ': ""'),
            t = t.replace(/:\s*'([^']+|\\')'\s*$/, ': "$1"'),
            t
        }
        ;
        s = {
            parseFromAem: i,
            tryParse: o,
            simpleTryParse: c
        },
        n.Z.create("tmg.json"),
        tmg.json = s;
        const g = s;
        tmg.parseAemJson = i
    }
    ,
    384: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>s
        }),
        window.tmg = window.tmg || {};
        const n = function(e) {
            try {
                let t = tmg
                  , r = e.split(".");
                return "tmg" === r[0] && (r = r.slice(1)),
                r.forEach((e=>{
                    void 0 === t[e] && (t[e] = {}),
                    t = t[e]
                }
                )),
                t
            } catch (t) {
                console.warn("couldn't create namespace:", e)
            }
        };
        window.tmg.createNamespace = n;
        const s = {
            create: n
        }
    }
    ,
    951: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>g
        });
        var n = r(384)
          , s = r(436);
        const i = new RegExp(/\?[^#]*|(?=#)|$/)
          , o = (()=>{
            const e = {};
            return t=>e[t] || (e[t] = new RegExp(`([?&;]${t}(?=[=&;#]|$))=?([^&;#]*)`))
        }
        )()
          , a = (e,t)=>{
            const r = o(t).exec(e);
            return r && decodeURIComponent(r[2])
        }
          , c = (e,t,r)=>{
            let n, c, u;
            return void 0 === e && (e = s.Z.getLocation().search),
            null === a(e, t) ? (n = `${t}=${encodeURIComponent(r)}`,
            c = i.exec(e)[0],
            u = e.replace(i, (c.length ? c + "&" : "?") + n)) : u = e.replace(o(t), `$1=${encodeURIComponent(r)}`),
            u
        }
          , u = (e,t)=>{
            let r = t;
            if (null !== a(t, e)) {
                let n, s = t.split("?")[0], i = (-1 !== t.indexOf("?") ? t.split("?")[1] : "").split("&");
                for (let t = i.length - 1; t >= 0; t -= 1)
                    n = i[t].split("=")[0],
                    n === e && i.splice(t, 1);
                return r = s + (i.length > 0 ? "?" : "") + i.join("&"),
                r
            }
            return r
        }
          , l = (e,t)=>{
            const r = "redirectTo";
            return null !== a(e, r) ? c(e, r, t) : e
        }
        ;
        n.Z.create("tmg.GET_PARAM"),
        tmg.getQuerystringParam = a,
        tmg.setQuerystringParam = c,
        tmg.removeQuerystringParam = u,
        tmg.updateRedirectParam = l,
        location.search.substr(1).split("&").forEach((e=>{
            const t = e.split("=");
            t.length > 1 ? tmg.GET_PARAM[t[0]] = decodeURIComponent(t[1]) : tmg.GET_PARAM[t[0]] = ""
        }
        ));
        const g = {
            matchParam: o,
            matchQuerystring: i,
            getQuerystringParam: a,
            removeQuerystringParam: u,
            setQuerystringParam: c,
            updateRedirectParam: l
        }
    }
    ,
    470: (e,t,r)=>{
        "use strict";
        r.d(t, {
            Z: ()=>i
        });
        var n = r(181)
          , s = r.n(n);
        r(384).Z.create("tmg.store"),
        tmg.store = s();
        const i = s()
    }
    ,
    666: (e,t,r)=>{
        "use strict";
        r.r({});
        var n = r(410)
          , s = r(436)
          , i = r(453)
          , o = r(177);
        var a = r(978)
          , c = r(982)
          , u = r(412)
          , l = r(987)
          , g = r(283);
        class d {
            constructor() {
                const e = document.querySelector("[data-comment-config]");
                this.config = !!e && a.Z.tryParse(e.dataset.commentConfig),
                this.isApp = s.Z && s.Z.isApp && s.Z.isApp(),
                this.bindEvents()
            }
            initCount() {
                this.config && (this.config.environment = new n.Z,
                new class {
                    constructor(e) {
                        this.config = e,
                        this.environmentId = this.config.convConfig.viafouraEnvironmentId,
                        this.commentCountElements = document.querySelectorAll('[data-js="comment-count"]')
                    }
                    initCounts() {
                        if (this.config) {
                            const e = this.config.convConfig.articleId
                              , t = this.getCommentCountUrl()
                              , r = localStorage.getItem(`tmg.commenting.count-${e}`);
                            r && (this.renderCommentCount(r),
                            this.showComment()),
                            this.getCommentCount(t, e).then((t=>{
                                t && (localStorage.setItem(`tmg.commenting.count-${e}`, t),
                                this.renderCommentCount(t),
                                this.showComment())
                            }
                            ))
                        }
                    }
                    getCommentCountUrl() {
                        return `https://livecomments.viafoura.co/v4/livecomments/${this.environmentId}/content-containers/comment-count-and-status/by-container-ids`
                    }
                    getCommentCount(e, t) {
                        return fetch(e, {
                            method: "POST",
                            headers: {
                                Accept: "application/json"
                            },
                            body: `["${t}"]`
                        }).then((e=>e.status >= 200 && e.status < 300 ? Promise.resolve(e) : Promise.reject(new Error(e.statusText)))).then((e=>e.json())).then((e=>this.checkValidResponse(e)), (e=>(console.log("error getting data from viafoura", e),
                        !1)))
                    }
                    checkValidResponse(e) {
                        return e[0] && e[0].commentCount ? e[0].commentCount : 0
                    }
                    renderCommentCount(e) {
                        const t = this.checkMaxCommentToDisplay(e)
                          , r = isNaN(+e) ? 0 : +e;
                        this.commentCountElements.forEach((e=>{
                            e.innerHTML = `${t}`
                        }
                        )),
                        o.Z.addPropertyValue("comments", r)
                    }
                    checkMaxCommentToDisplay(e) {
                        return e > 9999 ? "10k +" : e
                    }
                    showComment() {
                        document.querySelectorAll('[data-js="e-comment-count"]').forEach((e=>{
                            e.classList.remove("e-comment-count--hidden")
                        }
                        ))
                    }
                }
                (this.config).initCounts())
            }
            canUserPostComments(e) {
                return this.isApp ? Boolean(e && e.isAppTmgSubscriber && e.isAppTmgSubscriber()) : Boolean(e && e.canComment && e.canComment())
            }
            bindEvents() {
                document.querySelectorAll('[data-js="comment-load"]').forEach((e=>{
                    e.addEventListener("click", (()=>{
                        o.Z.addPropertyValue("event", [e.dataset.event]),
                        e.disabled = !0,
                        new class {
                            constructor(e, t) {
                                this.canUserPostComments = e,
                                this.isApp = t,
                                this.config = null,
                                this.utils = new g.Z,
                                this.initialize()
                            }
                            async initialize() {
                                if (this.isApp && !l.Z.getPublicId()) {
                                    const e = l.Z.getAccessToken();
                                    if (e) {
                                        const t = (0,
                                        c.Z)(e) || {};
                                        u.Z.setTmgPidCookie(t.subscriberId)
                                    }
                                }
                                const e = document.querySelector("[data-comment-config]")
                                  , t = this.validateConfig(e);
                                t && (this.config = {
                                    convConfig: t.convConfig,
                                    user: l.Z,
                                    loadLabelElem: document.querySelector("[data-label-loading]"),
                                    commentContainer: document.querySelector('[data-js="comment"]'),
                                    loadedStatus: !1
                                }),
                                this.loadLibrary()
                            }
                            loadLibrary() {
                                if (!this.config.loadedStatus) {
                                    const e = new g.Z;
                                    window.RUM.mark("js_load_viafoura_start"),
                                    e.injectScript("//cdn.viafoura.net/vf-v2.js").then((()=>{
                                        window.RUM.mark("js_load_viafoura_end"),
                                        this.updateButtonLoadingText(this.config.loadLabelElem),
                                        this.initComments()
                                    }
                                    ))
                                }
                            }
                            updateButtonLoadingText(e) {
                                e.innerHTML = e.dataset.labelLoading
                            }
                            validateConfig(e) {
                                return !!e && a.Z.tryParse(e.dataset.commentConfig)
                            }
                            initComments() {
                                window.vfQ = window.vfQ || [],
                                window.vfQ.push((()=>{
                                    window.vf.$subscribe("commenting", "loaded", (()=>{
                                        this.openComments()
                                    }
                                    )),
                                    window.vf.$subscribe("comment", "created", (()=>{
                                        const e = new CustomEvent("commentsEvent",{
                                            detail: {
                                                eventNum: tmg.page.isApp ? "event41" : "event248"
                                            }
                                        });
                                        window.dispatchEvent(e),
                                        o.Z.addPropertyValue("commentType", "comment"),
                                        o.Z.addPropertyValue("event", ["commented"])
                                    }
                                    )),
                                    window.vf.$subscribe("comment-reply", "posted", (()=>{
                                        const e = new CustomEvent("commentsEvent",{
                                            detail: {
                                                eventNum: tmg.page.isApp ? "event42" : "event249"
                                            }
                                        });
                                        window.dispatchEvent(e),
                                        o.Z.addPropertyValue("commentType", "reply"),
                                        o.Z.addPropertyValue("event", ["commented"])
                                    }
                                    ))
                                }
                                ))
                            }
                            openComments() {
                                this.config.commentContainer.classList.add("comment--is-open"),
                                this.config.loadedStatus = !0
                            }
                        }
                        (this.canUserPostComments,this.isApp)
                    }
                    ))
                }
                ))
            }
        }
        i.Z.subscribe({
            topic: "tmg.page.ready",
            func: ()=>{
                (new d).initCount()
            }
            ,
            runIfAlreadyPublished: !0
        })
    }
}, e=>{
    e(e.s = 666)
}
] );

console.log( "Yay!" );
