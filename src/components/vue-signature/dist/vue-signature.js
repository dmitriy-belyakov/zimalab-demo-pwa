/* eslint-disable */
!(function(t, e) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define("vue-signature", [], e)
        : "object" == typeof exports
        ? (exports["vue-signature"] = e())
        : (t["vue-signature"] = e());
})("undefined" != typeof self ? self : this, function() {
    return (function(t) {
        function e(o) {
            if (n[o]) return n[o].exports;
            var i = (n[o] = { i: o, l: !1, exports: {} });
            return t[o].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
        }
        var n = {};
        return (
            (e.m = t),
            (e.c = n),
            (e.d = function(t, n, o) {
                e.o(t, n) ||
                    Object.defineProperty(t, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: o
                    });
            }),
            (e.n = function(t) {
                var n =
                    t && t.__esModule
                        ? function() {
                              return t.default;
                          }
                        : function() {
                              return t;
                          };
                return e.d(n, "a", n), n;
            }),
            (e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (e.p = "/dist/"),
            e((e.s = 1))
        );
    })([
        function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 });
            var o =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                        ? function(t) {
                              return typeof t;
                          }
                        : function(t) {
                              return t &&
                                  "function" == typeof Symbol &&
                                  t.constructor === Symbol &&
                                  t !== Symbol.prototype
                                  ? "symbol"
                                  : typeof t;
                          },
                i = n(9),
                r = (function(t) {
                    return t && t.__esModule ? t : { default: t };
                })(i);
            e.default = {
                name: "vueSignature",
                props: {
                    sigOption: {
                        type: Object,
                        default: function() {
                            return {
                                backgroundColor: "rgb(255,255,255)",
                                penColor: "rgb(0, 0, 0)"
                            };
                        }
                    },
                    w: { type: String, default: "100%" },
                    h: { type: String, default: "100%" },
                    clearOnResize: { type: Boolean, default: !1 },
                    waterMark: {
                        type: Object,
                        default: function() {
                            return {};
                        }
                    }
                },
                data: function() {
                    return {
                        sig: function() {},
                        option: {
                            backgroundColor: "rgb(255,255,255)",
                            penColor: "rgb(0, 0, 0)"
                        },
                        uid: "",
                        image: null
                    };
                },
                created: function() {
                    var t = this;
                    this.uid = "canvas" + t._uid;
                    var e = Object.keys(t.sigOption),
                        n = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (
                            var r, s = e[Symbol.iterator]();
                            !(n = (r = s.next()).done);
                            n = !0
                        ) {
                            var a = r.value;
                            t.option[a] = t.sigOption[a];
                        }
                    } catch (t) {
                        (o = !0), (i = t);
                    } finally {
                        try {
                            !n && s.return && s.return();
                        } finally {
                            if (o) throw i;
                        }
                    }
                },
                methods: {
                    draw: function() {
                        function t() {
                            var t;
                            e.isEmpty() || (t = e.save());
                            var o = Math.max(window.devicePixelRatio || 1, 1);
                            (n.width = n.offsetWidth * o),
                                (n.height = n.offsetHeight * o),
                                n.getContext("2d").scale(o, o),
                                e.clear(),
                                !e.clearOnResize &&
                                    void 0 !== t &&
                                    e.fromDataURL(t),
                                Object.keys(e.waterMark).length &&
                                    e.addWaterMark(e.waterMark);
                        }
                        var e = this,
                            n = document.getElementById(e.uid);
                        (e.sig = new r.default(n, e.option)),
                            window.addEventListener("resize", t),
                            t();
                    },
                    clear: function() {
                        this.sig.clear();
                    },
                    save: function(t) {
                        var e = this;
                        return t ? e.sig.toDataURL(t) : e.sig.toDataURL();
                    },
                    fromDataURL: function(t) {
                        this.sig.fromDataURL(t);
                    },
                    isEmpty: function() {
                        return this.sig.isEmpty();
                    },
                    undo: function() {
                        var t = this,
                            e = t.sig.toData();
                        e && (e.pop(), t.sig.fromData(e));
                    },
                    addWaterMark: function(t) {
                        var e = this;
                        if (
                            "[object Object]" !=
                            Object.prototype.toString.call(t)
                        )
                            throw new Error(
                                "Expected Object, got " +
                                    (void 0 === t ? "undefined" : o(t)) +
                                    "."
                            );
                        var n = document.getElementById(e.uid),
                            i = {
                                text: t.text || "",
                                x: t.x || 20,
                                y: t.y || 20,
                                sx: t.sx || 40,
                                sy: t.sy || 40
                            },
                            r = n.getContext("2d");
                        // (r.font = t.font || "20px sans-serif"),
                        //     (r.fillStyle = t.fillStyle || "#333"),
                        //     (r.strokeStyle = t.strokeStyle || "#333"),
                        //     "all" == t.style
                        //         ? (r.fillText(i.text, i.x, i.y),
                        //           r.strokeText(i.text, i.sx, i.sx))
                        //         : "stroke" == t.style
                        //         ? r.strokeText(i.text, i.sx, i.sx)
                        //         : r.fillText(i.text, i.x, i.y),
                        //     (e.sig._isEmpty = !1);
                        var img = new Image()
                        img.src = '../../static/img/icons/logo-snowflake-colors-256x256.png'
                        r.globalAlpha = 0.4;
                        for (var i = 20; i < n.width; i += 70)
                            for (var j = 20; j < n.height; j += 70)
                                r.drawImage(this.image, i, j, 30, 30)
                        r.globalAlpha = 1;
                    }
                },
                mounted: function() {
                    var t = this;
                    this.$nextTick(function() {
                        t.draw();
                    });
                    this.image = new Image()
                    this.image.src = '../../static/img/icons/logo-snowflake-colors-256x256.png'
                }
            };
        },
        function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 });
            var o = n(2),
                i = (function(t) {
                    return t && t.__esModule ? t : { default: t };
                })(o),
                r = {
                    install: function(t, e) {
                        t.component(i.default.name, i.default);
                    }
                };
            "undefined" != typeof window && window.Vue && window.Vue.use(r),
                (e.default = r);
        },
        function(t, e, n) {
            "use strict";
            function o(t) {
                n(3);
            }
            Object.defineProperty(e, "__esModule", { value: !0 });
            var i = n(0),
                r = n.n(i);
            for (var s in i)
                "default" !== s &&
                    (function(t) {
                        n.d(e, t, function() {
                            return i[t];
                        });
                    })(s);
            var a = n(10),
                u = n(8),
                h = o,
                c = u(r.a, a.a, !1, h, null, null);
            e.default = c.exports;
        },
        function(t, e, n) {
            var o = n(4);
            "string" == typeof o && (o = [[t.i, o, ""]]),
                o.locals && (t.exports = o.locals);
            n(6)("fc550858", o, !0);
        },
        function(t, e, n) {
            (e = t.exports = n(5)(void 0)),
                e.push([t.i, "canvas{width:100%;height:100%}", ""]);
        },
        function(t, e) {
            function n(t, e) {
                var n = t[1] || "",
                    i = t[3];
                if (!i) return n;
                if (e && "function" == typeof btoa) {
                    var r = o(i);
                    return [n]
                        .concat(
                            i.sources.map(function(t) {
                                return (
                                    "/*# sourceURL=" + i.sourceRoot + t + " */"
                                );
                            })
                        )
                        .concat([r])
                        .join("\n");
                }
                return [n].join("\n");
            }
            function o(t) {
                return (
                    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
                    btoa(unescape(encodeURIComponent(JSON.stringify(t)))) +
                    " */"
                );
            }
            t.exports = function(t) {
                var e = [];
                return (
                    (e.toString = function() {
                        return this.map(function(e) {
                            var o = n(e, t);
                            return e[2] ? "@media " + e[2] + "{" + o + "}" : o;
                        }).join("");
                    }),
                    (e.i = function(t, n) {
                        "string" == typeof t && (t = [[null, t, ""]]);
                        for (var o = {}, i = 0; i < this.length; i++) {
                            var r = this[i][0];
                            "number" == typeof r && (o[r] = !0);
                        }
                        for (i = 0; i < t.length; i++) {
                            var s = t[i];
                            ("number" == typeof s[0] && o[s[0]]) ||
                                (n && !s[2]
                                    ? (s[2] = n)
                                    : n &&
                                      (s[2] = "(" + s[2] + ") and (" + n + ")"),
                                e.push(s));
                        }
                    }),
                    e
                );
            };
        },
        function(t, e, n) {
            function o(t) {
                for (var e = 0; e < t.length; e++) {
                    var n = t[e],
                        o = c[n.id];
                    if (o) {
                        o.refs++;
                        for (var i = 0; i < o.parts.length; i++)
                            o.parts[i](n.parts[i]);
                        for (; i < n.parts.length; i++)
                            o.parts.push(r(n.parts[i]));
                        o.parts.length > n.parts.length &&
                            (o.parts.length = n.parts.length);
                    } else {
                        for (var s = [], i = 0; i < n.parts.length; i++)
                            s.push(r(n.parts[i]));
                        c[n.id] = { id: n.id, refs: 1, parts: s };
                    }
                }
            }
            function i() {
                var t = document.createElement("style");
                return (t.type = "text/css"), d.appendChild(t), t;
            }
            function r(t) {
                var e,
                    n,
                    o = document.querySelector(
                        'style[data-vue-ssr-id~="' + t.id + '"]'
                    );
                if (o) {
                    if (p) return v;
                    o.parentNode.removeChild(o);
                }
                if (y) {
                    var r = f++;
                    (o = l || (l = i())),
                        (e = s.bind(null, o, r, !1)),
                        (n = s.bind(null, o, r, !0));
                } else
                    (o = i()),
                        (e = a.bind(null, o)),
                        (n = function() {
                            o.parentNode.removeChild(o);
                        });
                return (
                    e(t),
                    function(o) {
                        if (o) {
                            if (
                                o.css === t.css &&
                                o.media === t.media &&
                                o.sourceMap === t.sourceMap
                            )
                                return;
                            e((t = o));
                        } else n();
                    }
                );
            }
            function s(t, e, n, o) {
                var i = n ? "" : o.css;
                if (t.styleSheet) t.styleSheet.cssText = _(e, i);
                else {
                    var r = document.createTextNode(i),
                        s = t.childNodes;
                    s[e] && t.removeChild(s[e]),
                        s.length ? t.insertBefore(r, s[e]) : t.appendChild(r);
                }
            }
            function a(t, e) {
                var n = e.css,
                    o = e.media,
                    i = e.sourceMap;
                if (
                    (o && t.setAttribute("media", o),
                    i &&
                        ((n += "\n/*# sourceURL=" + i.sources[0] + " */"),
                        (n +=
                            "\n/*# sourceMappingURL=data:application/json;base64," +
                            btoa(
                                unescape(encodeURIComponent(JSON.stringify(i)))
                            ) +
                            " */")),
                    t.styleSheet)
                )
                    t.styleSheet.cssText = n;
                else {
                    for (; t.firstChild; ) t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(n));
                }
            }
            var u = "undefined" != typeof document;
            if ("undefined" != typeof DEBUG && DEBUG && !u)
                throw new Error(
                    "vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
                );
            var h = n(7),
                c = {},
                d =
                    u &&
                    (document.head || document.getElementsByTagName("head")[0]),
                l = null,
                f = 0,
                p = !1,
                v = function() {},
                y =
                    "undefined" != typeof navigator &&
                    /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
            t.exports = function(t, e, n) {
                p = n;
                var i = h(t, e);
                return (
                    o(i),
                    function(e) {
                        for (var n = [], r = 0; r < i.length; r++) {
                            var s = i[r],
                                a = c[s.id];
                            a.refs--, n.push(a);
                        }
                        e ? ((i = h(t, e)), o(i)) : (i = []);
                        for (var r = 0; r < n.length; r++) {
                            var a = n[r];
                            if (0 === a.refs) {
                                for (var u = 0; u < a.parts.length; u++)
                                    a.parts[u]();
                                delete c[a.id];
                            }
                        }
                    }
                );
            };
            var _ = (function() {
                var t = [];
                return function(e, n) {
                    return (t[e] = n), t.filter(Boolean).join("\n");
                };
            })();
        },
        function(t, e) {
            t.exports = function(t, e) {
                for (var n = [], o = {}, i = 0; i < e.length; i++) {
                    var r = e[i],
                        s = r[0],
                        a = r[1],
                        u = r[2],
                        h = r[3],
                        c = { id: t + ":" + i, css: a, media: u, sourceMap: h };
                    o[s]
                        ? o[s].parts.push(c)
                        : n.push((o[s] = { id: s, parts: [c] }));
                }
                return n;
            };
        },
        function(t, e) {
            t.exports = function(t, e, n, o, i, r) {
                var s,
                    a = (t = t || {}),
                    u = typeof t.default;
                ("object" !== u && "function" !== u) ||
                    ((s = t), (a = t.default));
                var h = "function" == typeof a ? a.options : a;
                e &&
                    ((h.render = e.render),
                    (h.staticRenderFns = e.staticRenderFns),
                    (h._compiled = !0)),
                    n && (h.functional = !0),
                    i && (h._scopeId = i);
                var c;
                if (
                    (r
                        ? ((c = function(t) {
                              (t =
                                  t ||
                                  (this.$vnode && this.$vnode.ssrContext) ||
                                  (this.parent &&
                                      this.parent.$vnode &&
                                      this.parent.$vnode.ssrContext)),
                                  t ||
                                      "undefined" ==
                                          typeof __VUE_SSR_CONTEXT__ ||
                                      (t = __VUE_SSR_CONTEXT__),
                                  o && o.call(this, t),
                                  t &&
                                      t._registeredComponents &&
                                      t._registeredComponents.add(r);
                          }),
                          (h._ssrRegister = c))
                        : o && (c = o),
                    c)
                ) {
                    var d = h.functional,
                        l = d ? h.render : h.beforeCreate;
                    d
                        ? ((h._injectStyles = c),
                          (h.render = function(t, e) {
                              return c.call(e), l(t, e);
                          }))
                        : (h.beforeCreate = l ? [].concat(l, c) : [c]);
                }
                return { esModule: s, exports: a, options: h };
            };
        },
        function(t, e, n) {
            "use strict"
            /*!
             * Signature Pad v2.3.2
             * https://github.com/szimek/signature_pad
             *
             * Copyright 2017 Szymon Nowak
             * Released under the MIT license
             *
             * The main idea and some parts of the code (e.g. drawing variable width Bézier curve) are taken from:
             * http://corner.squareup.com/2012/07/smoother-signatures.html
             *
             * Implementation of interpolation using cubic Bézier curves is taken from:
             * http://benknowscode.wordpress.com/2012/09/14/path-interpolation-using-cubic-bezier-and-control-point-estimation-in-javascript
             *
             * Algorithm for approximated length of a Bézier curve is taken from:
             * http://www.lemoda.net/maths/bezier-length/index.html
             *
             */;
            function o(t, e, n) {
                (this.x = t),
                    (this.y = e),
                    (this.time = n || new Date().getTime());
            }
            function i(t, e, n, o) {
                (this.startPoint = t),
                    (this.control1 = e),
                    (this.control2 = n),
                    (this.endPoint = o);
            }
            function r(t, e, n) {
                var o,
                    i,
                    r,
                    s = null,
                    a = 0;
                n || (n = {});
                var u = function() {
                    (a = !1 === n.leading ? 0 : Date.now()),
                        (s = null),
                        (r = t.apply(o, i)),
                        s || (o = i = null);
                };
                return function() {
                    var h = Date.now();
                    a || !1 !== n.leading || (a = h);
                    var c = e - (h - a);
                    return (
                        (o = this),
                        (i = arguments),
                        c <= 0 || c > e
                            ? (s && (clearTimeout(s), (s = null)),
                              (a = h),
                              (r = t.apply(o, i)),
                              s || (o = i = null))
                            : s || !1 === n.trailing || (s = setTimeout(u, c)),
                        r
                    );
                };
            }
            function s(t, e) {
                var n = this,
                    o = e || {};
                (this.velocityFilterWeight = o.velocityFilterWeight || 0.7),
                    (this.minWidth = o.minWidth || 0.5),
                    (this.maxWidth = o.maxWidth || 2.5),
                    (this.throttle = "throttle" in o ? o.throttle : 16),
                    (this.minDistance = "minDistance" in o ? o.minDistance : 5),
                    this.throttle
                        ? (this._strokeMoveUpdate = r(
                              s.prototype._strokeUpdate,
                              this.throttle
                          ))
                        : (this._strokeMoveUpdate = s.prototype._strokeUpdate),
                    (this.dotSize =
                        o.dotSize ||
                        function() {
                            return (this.minWidth + this.maxWidth) / 2;
                        }),
                    (this.penColor = o.penColor || "black"),
                    (this.backgroundColor =
                        o.backgroundColor || "rgba(0,0,0,0)"),
                    (this.onBegin = o.onBegin),
                    (this.onEnd = o.onEnd),
                    (this._canvas = t),
                    (this._ctx = t.getContext("2d")),
                    this.clear(),
                    (this._handleMouseDown = function(t) {
                        1 === t.which &&
                            ((n._mouseButtonDown = !0), n._strokeBegin(t));
                    }),
                    (this._handleMouseMove = function(t) {
                        n._mouseButtonDown && n._strokeMoveUpdate(t);
                    }),
                    (this._handleMouseUp = function(t) {
                        1 === t.which &&
                            n._mouseButtonDown &&
                            ((n._mouseButtonDown = !1), n._strokeEnd(t));
                    }),
                    (this._handleTouchStart = function(t) {
                        if (1 === t.targetTouches.length) {
                            var e = t.changedTouches[0];
                            n._strokeBegin(e);
                        }
                    }),
                    (this._handleTouchMove = function(t) {
                        t.preventDefault();
                        var e = t.targetTouches[0];
                        n._strokeMoveUpdate(e);
                    }),
                    (this._handleTouchEnd = function(t) {
                        t.target === n._canvas &&
                            (t.preventDefault(), n._strokeEnd(t));
                    }),
                    this.on();
            }
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (o.prototype.velocityFrom = function(t) {
                    return this.time !== t.time
                        ? this.distanceTo(t) / (this.time - t.time)
                        : 1;
                }),
                (o.prototype.distanceTo = function(t) {
                    return Math.sqrt(
                        Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2)
                    );
                }),
                (o.prototype.equals = function(t) {
                    return (
                        this.x === t.x && this.y === t.y && this.time === t.time
                    );
                }),
                (i.prototype.length = function() {
                    for (
                        var t = 0, e = void 0, n = void 0, o = 0;
                        o <= 10;
                        o += 1
                    ) {
                        var i = o / 10,
                            r = this._point(
                                i,
                                this.startPoint.x,
                                this.control1.x,
                                this.control2.x,
                                this.endPoint.x
                            ),
                            s = this._point(
                                i,
                                this.startPoint.y,
                                this.control1.y,
                                this.control2.y,
                                this.endPoint.y
                            );
                        if (o > 0) {
                            var a = r - e,
                                u = s - n;
                            t += Math.sqrt(a * a + u * u);
                        }
                        (e = r), (n = s);
                    }
                    return t;
                }),
                (i.prototype._point = function(t, e, n, o, i) {
                    return (
                        e * (1 - t) * (1 - t) * (1 - t) +
                        3 * n * (1 - t) * (1 - t) * t +
                        3 * o * (1 - t) * t * t +
                        i * t * t * t
                    );
                }),
                (s.prototype.clear = function() {
                    var t = this._ctx,
                        e = this._canvas;
                    (t.fillStyle = this.backgroundColor),
                        t.clearRect(0, 0, e.width, e.height),
                        t.fillRect(0, 0, e.width, e.height),
                        (this._data = []),
                        this._reset(),
                        (this._isEmpty = !0);
                }),
                (s.prototype.fromDataURL = function(t) {
                    var e = this,
                        n =
                            arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : {},
                        o = new Image(),
                        i = n.ratio || window.devicePixelRatio || 1,
                        r = n.width || this._canvas.width / i,
                        s = n.height || this._canvas.height / i;
                    this._reset(),
                        (o.src = t),
                        (o.onload = function() {
                            e._ctx.drawImage(o, 0, 0, r, s);
                        }),
                        (this._isEmpty = !1);
                }),
                (s.prototype.toDataURL = function(t) {
                    var e;
                    switch (t) {
                        case "image/svg+xml":
                            return this._toSVG();
                        default:
                            for (
                                var n = arguments.length,
                                    o = Array(n > 1 ? n - 1 : 0),
                                    i = 1;
                                i < n;
                                i++
                            )
                                o[i - 1] = arguments[i];
                            return (e = this._canvas).toDataURL.apply(
                                e,
                                [t].concat(o)
                            );
                    }
                }),
                (s.prototype.on = function() {
                    this._handleMouseEvents(), this._handleTouchEvents();
                }),
                (s.prototype.off = function() {
                    this._canvas.removeEventListener(
                        "mousedown",
                        this._handleMouseDown
                    ),
                        this._canvas.removeEventListener(
                            "mousemove",
                            this._handleMouseMove
                        ),
                        document.removeEventListener(
                            "mouseup",
                            this._handleMouseUp
                        ),
                        this._canvas.removeEventListener(
                            "touchstart",
                            this._handleTouchStart
                        ),
                        this._canvas.removeEventListener(
                            "touchmove",
                            this._handleTouchMove
                        ),
                        this._canvas.removeEventListener(
                            "touchend",
                            this._handleTouchEnd
                        );
                }),
                (s.prototype.isEmpty = function() {
                    return this._isEmpty;
                }),
                (s.prototype._strokeBegin = function(t) {
                    this._data.push([]),
                        this._reset(),
                        this._strokeUpdate(t),
                        "function" == typeof this.onBegin && this.onBegin(t);
                }),
                (s.prototype._strokeUpdate = function(t) {
                    var e = t.clientX,
                        n = t.clientY,
                        o = this._createPoint(e, n),
                        i = this._data[this._data.length - 1],
                        r = i && i[i.length - 1],
                        s = r && o.distanceTo(r) < this.minDistance;
                    if (!r || !s) {
                        var a = this._addPoint(o),
                            u = a.curve,
                            h = a.widths;
                        u && h && this._drawCurve(u, h.start, h.end),
                            this._data[this._data.length - 1].push({
                                x: o.x,
                                y: o.y,
                                time: o.time,
                                color: this.penColor
                            });
                    }
                }),
                (s.prototype._strokeEnd = function(t) {
                    var e = this.points.length > 2,
                        n = this.points[0];
                    if ((!e && n && this._drawDot(n), n)) {
                        var o = this._data[this._data.length - 1],
                            i = o[o.length - 1];
                        n.equals(i) ||
                            o.push({
                                x: n.x,
                                y: n.y,
                                time: n.time,
                                color: this.penColor
                            });
                    }
                    "function" == typeof this.onEnd && this.onEnd(t);
                }),
                (s.prototype._handleMouseEvents = function() {
                    (this._mouseButtonDown = !1),
                        this._canvas.addEventListener(
                            "mousedown",
                            this._handleMouseDown
                        ),
                        this._canvas.addEventListener(
                            "mousemove",
                            this._handleMouseMove
                        ),
                        document.addEventListener(
                            "mouseup",
                            this._handleMouseUp
                        );
                }),
                (s.prototype._handleTouchEvents = function() {
                    (this._canvas.style.msTouchAction = "none"),
                        (this._canvas.style.touchAction = "none"),
                        this._canvas.addEventListener(
                            "touchstart",
                            this._handleTouchStart
                        ),
                        this._canvas.addEventListener(
                            "touchmove",
                            this._handleTouchMove
                        ),
                        this._canvas.addEventListener(
                            "touchend",
                            this._handleTouchEnd
                        );
                }),
                (s.prototype._reset = function() {
                    (this.points = []),
                        (this._lastVelocity = 0),
                        (this._lastWidth = (this.minWidth + this.maxWidth) / 2),
                        (this._ctx.fillStyle = this.penColor);
                }),
                (s.prototype._createPoint = function(t, e, n) {
                    var i = this._canvas.getBoundingClientRect();
                    return new o(
                        t - i.left,
                        e - i.top,
                        n || new Date().getTime()
                    );
                }),
                (s.prototype._addPoint = function(t) {
                    var e = this.points,
                        n = void 0;
                    if ((e.push(t), e.length > 2)) {
                        3 === e.length && e.unshift(e[0]),
                            (n = this._calculateCurveControlPoints(
                                e[0],
                                e[1],
                                e[2]
                            ));
                        var o = n.c2;
                        n = this._calculateCurveControlPoints(e[1], e[2], e[3]);
                        var r = n.c1,
                            s = new i(e[1], o, r, e[2]),
                            a = this._calculateCurveWidths(s);
                        return e.shift(), { curve: s, widths: a };
                    }
                    return {};
                }),
                (s.prototype._calculateCurveControlPoints = function(t, e, n) {
                    var i = t.x - e.x,
                        r = t.y - e.y,
                        s = e.x - n.x,
                        a = e.y - n.y,
                        u = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 },
                        h = { x: (e.x + n.x) / 2, y: (e.y + n.y) / 2 },
                        c = Math.sqrt(i * i + r * r),
                        d = Math.sqrt(s * s + a * a),
                        l = u.x - h.x,
                        f = u.y - h.y,
                        p = d / (c + d),
                        v = { x: h.x + l * p, y: h.y + f * p },
                        y = e.x - v.x,
                        _ = e.y - v.y;
                    return {
                        c1: new o(u.x + y, u.y + _),
                        c2: new o(h.x + y, h.y + _)
                    };
                }),
                (s.prototype._calculateCurveWidths = function(t) {
                    var e = t.startPoint,
                        n = t.endPoint,
                        o = { start: null, end: null },
                        i =
                            this.velocityFilterWeight * n.velocityFrom(e) +
                            (1 - this.velocityFilterWeight) *
                                this._lastVelocity,
                        r = this._strokeWidth(i);
                    return (
                        (o.start = this._lastWidth),
                        (o.end = r),
                        (this._lastVelocity = i),
                        (this._lastWidth = r),
                        o
                    );
                }),
                (s.prototype._strokeWidth = function(t) {
                    return Math.max(this.maxWidth / (t + 1), this.minWidth);
                }),
                (s.prototype._drawPoint = function(t, e, n) {
                    var o = this._ctx;
                    o.moveTo(t, e),
                        o.arc(t, e, n, 0, 2 * Math.PI, !1),
                        (this._isEmpty = !1);
                }),
                (s.prototype._drawCurve = function(t, e, n) {
                    var o = this._ctx,
                        i = n - e,
                        r = Math.floor(t.length());
                    o.beginPath();
                    for (var s = 0; s < r; s += 1) {
                        var a = s / r,
                            u = a * a,
                            h = u * a,
                            c = 1 - a,
                            d = c * c,
                            l = d * c,
                            f = l * t.startPoint.x;
                        (f += 3 * d * a * t.control1.x),
                            (f += 3 * c * u * t.control2.x),
                            (f += h * t.endPoint.x);
                        var p = l * t.startPoint.y;
                        (p += 3 * d * a * t.control1.y),
                            (p += 3 * c * u * t.control2.y),
                            (p += h * t.endPoint.y);
                        var v = e + h * i;
                        this._drawPoint(f, p, v);
                    }
                    o.closePath(), o.fill();
                }),
                (s.prototype._drawDot = function(t) {
                    var e = this._ctx,
                        n =
                            "function" == typeof this.dotSize
                                ? this.dotSize()
                                : this.dotSize;
                    e.beginPath(),
                        this._drawPoint(t.x, t.y, n),
                        e.closePath(),
                        e.fill();
                }),
                (s.prototype._fromData = function(t, e, n) {
                    for (var i = 0; i < t.length; i += 1) {
                        var r = t[i];
                        if (r.length > 1)
                            for (var s = 0; s < r.length; s += 1) {
                                var a = r[s],
                                    u = new o(a.x, a.y, a.time),
                                    h = a.color;
                                if (0 === s)
                                    (this.penColor = h),
                                        this._reset(),
                                        this._addPoint(u);
                                else if (s !== r.length - 1) {
                                    var c = this._addPoint(u),
                                        d = c.curve,
                                        l = c.widths;
                                    d && l && e(d, l, h);
                                }
                            }
                        else {
                            this._reset();
                            n(r[0]);
                        }
                    }
                }),
                (s.prototype._toSVG = function() {
                    var t = this,
                        e = this._data,
                        n = this._canvas,
                        o = Math.max(window.devicePixelRatio || 1, 1),
                        i = n.width / o,
                        r = n.height / o,
                        s = document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "svg"
                        );
                    s.setAttributeNS(null, "width", n.width),
                        s.setAttributeNS(null, "height", n.height),
                        this._fromData(
                            e,
                            function(t, e, n) {
                                var o = document.createElement("path");
                                if (
                                    !(
                                        isNaN(t.control1.x) ||
                                        isNaN(t.control1.y) ||
                                        isNaN(t.control2.x) ||
                                        isNaN(t.control2.y)
                                    )
                                ) {
                                    var i =
                                        "M " +
                                        t.startPoint.x.toFixed(3) +
                                        "," +
                                        t.startPoint.y.toFixed(3) +
                                        " C " +
                                        t.control1.x.toFixed(3) +
                                        "," +
                                        t.control1.y.toFixed(3) +
                                        " " +
                                        t.control2.x.toFixed(3) +
                                        "," +
                                        t.control2.y.toFixed(3) +
                                        " " +
                                        t.endPoint.x.toFixed(3) +
                                        "," +
                                        t.endPoint.y.toFixed(3);
                                    o.setAttribute("d", i),
                                        o.setAttribute(
                                            "stroke-width",
                                            (2.25 * e.end).toFixed(3)
                                        ),
                                        o.setAttribute("stroke", n),
                                        o.setAttribute("fill", "none"),
                                        o.setAttribute(
                                            "stroke-linecap",
                                            "round"
                                        ),
                                        s.appendChild(o);
                                }
                            },
                            function(e) {
                                var n = document.createElement("circle"),
                                    o =
                                        "function" == typeof t.dotSize
                                            ? t.dotSize()
                                            : t.dotSize;
                                n.setAttribute("r", o),
                                    n.setAttribute("cx", e.x),
                                    n.setAttribute("cy", e.y),
                                    n.setAttribute("fill", e.color),
                                    s.appendChild(n);
                            }
                        );
                    var a =
                            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' +
                            i +
                            " " +
                            r +
                            '" width="' +
                            i +
                            '" height="' +
                            r +
                            '">',
                        u = s.innerHTML;
                    if (void 0 === u) {
                        var h = document.createElement("dummy"),
                            c = s.childNodes;
                        h.innerHTML = "";
                        for (var d = 0; d < c.length; d += 1)
                            h.appendChild(c[d].cloneNode(!0));
                        u = h.innerHTML;
                    }
                    var l = a + u + "</svg>";
                    return "data:image/svg+xml;base64," + btoa(l);
                }),
                (s.prototype.fromData = function(t) {
                    var e = this;
                    this.clear(),
                        this._fromData(
                            t,
                            function(t, n) {
                                return e._drawCurve(t, n.start, n.end);
                            },
                            function(t) {
                                return e._drawDot(t);
                            }
                        ),
                        (this._data = t);
                }),
                (s.prototype.toData = function() {
                    return this._data;
                }),
                (e.default = s);
        },
        function(t, e, n) {
            "use strict";
            var o = function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("div", { style: { width: t.w, height: t.h } }, [
                        n("canvas", {
                            staticClass: "canvas",
                            attrs: { id: t.uid, "data-uid": t.uid }
                        })
                    ]);
                },
                i = [],
                r = { render: o, staticRenderFns: i };
            e.a = r;
        }
    ]);
});
//# sourceMappingURL=vue-signature.js.map
