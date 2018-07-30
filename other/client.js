!function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i)
                    return i(g, !0);
                if (f)
                    return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND",
                j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                return e(b[g][1][a] || a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
        e(d[g]);
    return e
}({
    1: [function(a, b, c) {
        "use strict";
        function d(a, b, c) {
            if (!(this instanceof d))
                return new d(a,b,c);
            var j, k, l, m, n = h.test(a), o = typeof b, p = this, q = 0;
            for ("object" !== o && "string" !== o && (c = b,
            b = null),
            c && "function" != typeof c && (c = g.parse),
            b = f(b); q < i.length; q++)
                k = i[q],
                j = k[0],
                m = k[1],
                j !== j ? p[m] = a : "string" == typeof j ? ~(l = a.indexOf(j)) && ("number" == typeof k[2] ? (p[m] = a.slice(0, l),
                a = a.slice(l + k[2])) : (p[m] = a.slice(l),
                a = a.slice(0, l))) : (l = j.exec(a)) && (p[m] = l[1],
                a = a.slice(0, a.length - l[0].length)),
                p[m] = p[m] || (k[3] || "port" === m && n ? b[m] || "" : ""),
                k[4] && (p[m] = p[m].toLowerCase());
            c && (p.query = c(p.query)),
            e(p.port, p.protocol) || (p.host = p.hostname,
            p.port = ""),
            p.username = p.password = "",
            p.auth && (k = p.auth.split(":"),
            p.username = k[0] || "",
            p.password = k[1] || ""),
            p.href = p.toString()
        }
        var e = a("requires-port")
          , f = a("./lolcation")
          , g = a("querystringify")
          , h = /^\/(?!\/)/
          , i = [["#", "hash"], ["?", "query"], ["//", "protocol", 2, 1, 1], ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/\:(\d+)$/, "port"], [NaN, "hostname", void 0, 1, 1]];
        d.prototype.set = function(a, b, c) {
            var d = this;
            return "query" === a ? ("string" == typeof b && b.length && (b = (c || g.parse)(b)),
            d[a] = b) : "port" === a ? (d[a] = b,
            e(b, d.protocol) ? b && (d.host = d.hostname + ":" + b) : (d.host = d.hostname,
            d[a] = "")) : "hostname" === a ? (d[a] = b,
            d.port && (b += ":" + d.port),
            d.host = b) : "host" === a ? (d[a] = b,
            /\:\d+/.test(b) && (b = b.split(":"),
            d.hostname = b[0],
            d.port = b[1])) : d[a] = b,
            d.href = d.toString(),
            d
        }
        ,
        d.prototype.toString = function(a) {
            a && "function" == typeof a || (a = g.stringify);
            var b, c = this, d = c.protocol + "//";
            return c.username && (d += c.username,
            c.password && (d += ":" + c.password),
            d += "@"),
            d += c.hostname,
            c.port && (d += ":" + c.port),
            d += c.pathname,
            b = "object" == typeof c.query ? a(c.query) : c.query,
            b && (d += "?" !== b.charAt(0) ? "?" + b : b),
            c.hash && (d += c.hash),
            d
        }
        ,
        d.qs = g,
        d.location = f,
        b.exports = d
    }
    , {
        "./lolcation": 2,
        querystringify: 3,
        "requires-port": 4
    }],
    2: [function(a, b, c) {
        (function(c) {
            "use strict";
            var d, e = {
                hash: 1,
                query: 1
            };
            b.exports = function(b) {
                b = b || c.location || {},
                d = d || a("./");
                var f, g = {}, h = typeof b;
                if ("blob:" === b.protocol)
                    g = new d(unescape(b.pathname),{});
                else if ("string" === h) {
                    g = new d(b,{});
                    for (f in e)
                        delete g[f]
                } else if ("object" === h)
                    for (f in b)
                        f in e || (g[f] = b[f]);
                return g
            }
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "./": 1
    }],
    3: [function(a, b, c) {
        "use strict";
        function d(a) {
            for (var b, c = /([^=?&]+)=([^&]*)/g, d = {}; b = c.exec(a); d[decodeURIComponent(b[1])] = decodeURIComponent(b[2]))
                ;
            return d
        }
        function e(a, b) {
            b = b || "";
            var c = [];
            "string" != typeof b && (b = "?");
            for (var d in a)
                f.call(a, d) && c.push(encodeURIComponent(d) + "=" + encodeURIComponent(a[d]));
            return c.length ? b + c.join("&") : ""
        }
        var f = Object.prototype.hasOwnProperty;
        c.stringify = e,
        c.parse = d
    }
    , {}],
    4: [function(a, b, c) {
        "use strict";
        b.exports = function(a, b) {
            if (b = b.split(":")[0],
            !(a = +a))
                return !1;
            switch (b) {
            case "http":
            case "ws":
                return 80 !== a;
            case "https":
            case "wss":
                return 443 !== a;
            case "ftp":
                return 21 !== a;
            case "gopher":
                return 70 !== a;
            case "file":
                return !1
            }
            return 0 !== a
        }
    }
    , {}],
    5: [function(a, b, c) {
        !function(a, c) {
            "object" == typeof b && "object" == typeof b.exports ? b.exports = a.document ? c(a, !0) : function(a) {
                if (!a.document)
                    throw new Error("jQuery requires a window with a document");
                return c(a)
            }
            : c(a)
        }("undefined" != typeof window ? window : this, function(a, b) {
            function c(a) {
                var b = !!a && "length"in a && a.length
                  , c = na.type(a);
                return "function" !== c && !na.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
            }
            function d(a, b, c) {
                if (na.isFunction(b))
                    return na.grep(a, function(a, d) {
                        return !!b.call(a, d, a) !== c
                    });
                if (b.nodeType)
                    return na.grep(a, function(a) {
                        return a === b !== c
                    });
                if ("string" == typeof b) {
                    if (xa.test(b))
                        return na.filter(b, a, c);
                    b = na.filter(b, a)
                }
                return na.grep(a, function(a) {
                    return na.inArray(a, b) > -1 !== c
                })
            }
            function e(a, b) {
                do {
                    a = a[b]
                } while (a && 1 !== a.nodeType);return a
            }
            function f(a) {
                var b = {};
                return na.each(a.match(Ca) || [], function(a, c) {
                    b[c] = !0
                }),
                b
            }
            function g() {
                da.addEventListener ? (da.removeEventListener("DOMContentLoaded", h),
                a.removeEventListener("load", h)) : (da.detachEvent("onreadystatechange", h),
                a.detachEvent("onload", h))
            }
            function h() {
                (da.addEventListener || "load" === a.event.type || "complete" === da.readyState) && (g(),
                na.ready())
            }
            function i(a, b, c) {
                if (void 0 === c && 1 === a.nodeType) {
                    var d = "data-" + b.replace(Ha, "-$1").toLowerCase();
                    if ("string" == typeof (c = a.getAttribute(d))) {
                        try {
                            c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : Ga.test(c) ? na.parseJSON(c) : c)
                        } catch (a) {}
                        na.data(a, b, c)
                    } else
                        c = void 0
                }
                return c
            }
            function j(a) {
                var b;
                for (b in a)
                    if (("data" !== b || !na.isEmptyObject(a[b])) && "toJSON" !== b)
                        return !1;
                return !0
            }
            function k(a, b, c, d) {
                if (Fa(a)) {
                    var e, f, g = na.expando, h = a.nodeType, i = h ? na.cache : a, j = h ? a[g] : a[g] && g;
                    if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b)
                        return j || (j = h ? a[g] = ca.pop() || na.guid++ : g),
                        i[j] || (i[j] = h ? {} : {
                            toJSON: na.noop
                        }),
                        "object" != typeof b && "function" != typeof b || (d ? i[j] = na.extend(i[j], b) : i[j].data = na.extend(i[j].data, b)),
                        f = i[j],
                        d || (f.data || (f.data = {}),
                        f = f.data),
                        void 0 !== c && (f[na.camelCase(b)] = c),
                        "string" == typeof b ? null == (e = f[b]) && (e = f[na.camelCase(b)]) : e = f,
                        e
                }
            }
            function l(a, b, c) {
                if (Fa(a)) {
                    var d, e, f = a.nodeType, g = f ? na.cache : a, h = f ? a[na.expando] : na.expando;
                    if (g[h]) {
                        if (b && (d = c ? g[h] : g[h].data)) {
                            na.isArray(b) ? b = b.concat(na.map(b, na.camelCase)) : b in d ? b = [b] : (b = na.camelCase(b),
                            b = b in d ? [b] : b.split(" ")),
                            e = b.length;
                            for (; e--; )
                                delete d[b[e]];
                            if (c ? !j(d) : !na.isEmptyObject(d))
                                return
                        }
                        (c || (delete g[h].data,
                        j(g[h]))) && (f ? na.cleanData([a], !0) : la.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0)
                    }
                }
            }
            function m(a, b, c, d) {
                var e, f = 1, g = 20, h = d ? function() {
                    return d.cur()
                }
                : function() {
                    return na.css(a, b, "")
                }
                , i = h(), j = c && c[3] || (na.cssNumber[b] ? "" : "px"), k = (na.cssNumber[b] || "px" !== j && +i) && Ja.exec(na.css(a, b));
                if (k && k[3] !== j) {
                    j = j || k[3],
                    c = c || [],
                    k = +i || 1;
                    do {
                        f = f || ".5",
                        k /= f,
                        na.style(a, b, k + j)
                    } while (f !== (f = h() / i) && 1 !== f && --g)
                }
                return c && (k = +k || +i || 0,
                e = c[1] ? k + (c[1] + 1) * c[2] : +c[2],
                d && (d.unit = j,
                d.start = k,
                d.end = e)),
                e
            }
            function n(a) {
                var b = Ra.split("|")
                  , c = a.createDocumentFragment();
                if (c.createElement)
                    for (; b.length; )
                        c.createElement(b.pop());
                return c
            }
            function o(a, b) {
                var c, d, e = 0, f = void 0 !== a.getElementsByTagName ? a.getElementsByTagName(b || "*") : void 0 !== a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
                if (!f)
                    for (f = [],
                    c = a.childNodes || a; null != (d = c[e]); e++)
                        !b || na.nodeName(d, b) ? f.push(d) : na.merge(f, o(d, b));
                return void 0 === b || b && na.nodeName(a, b) ? na.merge([a], f) : f
            }
            function p(a, b) {
                for (var c, d = 0; null != (c = a[d]); d++)
                    na._data(c, "globalEval", !b || na._data(b[d], "globalEval"))
            }
            function q(a) {
                Na.test(a.type) && (a.defaultChecked = a.checked)
            }
            function r(a, b, c, d, e) {
                for (var f, g, h, i, j, k, l, m = a.length, r = n(b), s = [], t = 0; m > t; t++)
                    if ((g = a[t]) || 0 === g)
                        if ("object" === na.type(g))
                            na.merge(s, g.nodeType ? [g] : g);
                        else if (Ta.test(g)) {
                            for (i = i || r.appendChild(b.createElement("div")),
                            j = (Oa.exec(g) || ["", ""])[1].toLowerCase(),
                            l = Sa[j] || Sa._default,
                            i.innerHTML = l[1] + na.htmlPrefilter(g) + l[2],
                            f = l[0]; f--; )
                                i = i.lastChild;
                            if (!la.leadingWhitespace && Qa.test(g) && s.push(b.createTextNode(Qa.exec(g)[0])),
                            !la.tbody)
                                for (g = "table" !== j || Ua.test(g) ? "<table>" !== l[1] || Ua.test(g) ? 0 : i : i.firstChild,
                                f = g && g.childNodes.length; f--; )
                                    na.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k);
                            for (na.merge(s, i.childNodes),
                            i.textContent = ""; i.firstChild; )
                                i.removeChild(i.firstChild);
                            i = r.lastChild
                        } else
                            s.push(b.createTextNode(g));
                for (i && r.removeChild(i),
                la.appendChecked || na.grep(o(s, "input"), q),
                t = 0; g = s[t++]; )
                    if (d && na.inArray(g, d) > -1)
                        e && e.push(g);
                    else if (h = na.contains(g.ownerDocument, g),
                    i = o(r.appendChild(g), "script"),
                    h && p(i),
                    c)
                        for (f = 0; g = i[f++]; )
                            Pa.test(g.type || "") && c.push(g);
                return i = null,
                r
            }
            function s() {
                return !0
            }
            function t() {
                return !1
            }
            function u() {
                try {
                    return da.activeElement
                } catch (a) {}
            }
            function v(a, b, c, d, e, f) {
                var g, h;
                if ("object" == typeof b) {
                    "string" != typeof c && (d = d || c,
                    c = void 0);
                    for (h in b)
                        v(a, h, c, d, b[h], f);
                    return a
                }
                if (null == d && null == e ? (e = c,
                d = c = void 0) : null == e && ("string" == typeof c ? (e = d,
                d = void 0) : (e = d,
                d = c,
                c = void 0)),
                !1 === e)
                    e = t;
                else if (!e)
                    return a;
                return 1 === f && (g = e,
                e = function(a) {
                    return na().off(a),
                    g.apply(this, arguments)
                }
                ,
                e.guid = g.guid || (g.guid = na.guid++)),
                a.each(function() {
                    na.event.add(this, b, e, d, c)
                })
            }
            function w(a, b) {
                return na.nodeName(a, "table") && na.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
            }
            function x(a) {
                return a.type = (null !== na.find.attr(a, "type")) + "/" + a.type,
                a
            }
            function y(a) {
                var b = db.exec(a.type);
                return b ? a.type = b[1] : a.removeAttribute("type"),
                a
            }
            function z(a, b) {
                if (1 === b.nodeType && na.hasData(a)) {
                    var c, d, e, f = na._data(a), g = na._data(b, f), h = f.events;
                    if (h) {
                        delete g.handle,
                        g.events = {};
                        for (c in h)
                            for (d = 0,
                            e = h[c].length; e > d; d++)
                                na.event.add(b, c, h[c][d])
                    }
                    g.data && (g.data = na.extend({}, g.data))
                }
            }
            function A(a, b) {
                var c, d, e;
                if (1 === b.nodeType) {
                    if (c = b.nodeName.toLowerCase(),
                    !la.noCloneEvent && b[na.expando]) {
                        e = na._data(b);
                        for (d in e.events)
                            na.removeEvent(b, d, e.handle);
                        b.removeAttribute(na.expando)
                    }
                    "script" === c && b.text !== a.text ? (x(b).text = a.text,
                    y(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML),
                    la.html5Clone && a.innerHTML && !na.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Na.test(a.type) ? (b.defaultChecked = b.checked = a.checked,
                    b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
                }
            }
            function B(a, b, c, d) {
                b = fa.apply([], b);
                var e, f, g, h, i, j, k = 0, l = a.length, m = l - 1, n = b[0], p = na.isFunction(n);
                if (p || l > 1 && "string" == typeof n && !la.checkClone && cb.test(n))
                    return a.each(function(e) {
                        var f = a.eq(e);
                        p && (b[0] = n.call(this, e, f.html())),
                        B(f, b, c, d)
                    });
                if (l && (j = r(b, a[0].ownerDocument, !1, a, d),
                e = j.firstChild,
                1 === j.childNodes.length && (j = e),
                e || d)) {
                    for (h = na.map(o(j, "script"), x),
                    g = h.length; l > k; k++)
                        f = j,
                        k !== m && (f = na.clone(f, !0, !0),
                        g && na.merge(h, o(f, "script"))),
                        c.call(a[k], f, k);
                    if (g)
                        for (i = h[h.length - 1].ownerDocument,
                        na.map(h, y),
                        k = 0; g > k; k++)
                            f = h[k],
                            Pa.test(f.type || "") && !na._data(f, "globalEval") && na.contains(i, f) && (f.src ? na._evalUrl && na._evalUrl(f.src) : na.globalEval((f.text || f.textContent || f.innerHTML || "").replace(eb, "")));
                    j = e = null
                }
                return a
            }
            function C(a, b, c) {
                for (var d, e = b ? na.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
                    c || 1 !== d.nodeType || na.cleanData(o(d)),
                    d.parentNode && (c && na.contains(d.ownerDocument, d) && p(o(d, "script")),
                    d.parentNode.removeChild(d));
                return a
            }
            function D(a, b) {
                var c = na(b.createElement(a)).appendTo(b.body)
                  , d = na.css(c[0], "display");
                return c.detach(),
                d
            }
            function E(a) {
                var b = da
                  , c = ib[a];
                return c || (c = D(a, b),
                "none" !== c && c || (hb = (hb || na("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),
                b = (hb[0].contentWindow || hb[0].contentDocument).document,
                b.write(),
                b.close(),
                c = D(a, b),
                hb.detach()),
                ib[a] = c),
                c
            }
            function F(a, b) {
                return {
                    get: function() {
                        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                    }
                }
            }
            function G(a) {
                if (a in xb)
                    return a;
                for (var b = a.charAt(0).toUpperCase() + a.slice(1), c = wb.length; c--; )
                    if ((a = wb[c] + b)in xb)
                        return a
            }
            function H(a, b) {
                for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
                    d = a[g],
                    d.style && (f[g] = na._data(d, "olddisplay"),
                    c = d.style.display,
                    b ? (f[g] || "none" !== c || (d.style.display = ""),
                    "" === d.style.display && La(d) && (f[g] = na._data(d, "olddisplay", E(d.nodeName)))) : (e = La(d),
                    (c && "none" !== c || !e) && na._data(d, "olddisplay", e ? c : na.css(d, "display"))));
                for (g = 0; h > g; g++)
                    d = a[g],
                    d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
                return a
            }
            function I(a, b, c) {
                var d = tb.exec(b);
                return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
            }
            function J(a, b, c, d, e) {
                for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
                    "margin" === c && (g += na.css(a, c + Ka[f], !0, e)),
                    d ? ("content" === c && (g -= na.css(a, "padding" + Ka[f], !0, e)),
                    "margin" !== c && (g -= na.css(a, "border" + Ka[f] + "Width", !0, e))) : (g += na.css(a, "padding" + Ka[f], !0, e),
                    "padding" !== c && (g += na.css(a, "border" + Ka[f] + "Width", !0, e)));
                return g
            }
            function K(a, b, c) {
                var d = !0
                  , e = "width" === b ? a.offsetWidth : a.offsetHeight
                  , f = nb(a)
                  , g = la.boxSizing && "border-box" === na.css(a, "boxSizing", !1, f);
                if (0 >= e || null == e) {
                    if (e = ob(a, b, f),
                    (0 > e || null == e) && (e = a.style[b]),
                    kb.test(e))
                        return e;
                    d = g && (la.boxSizingReliable() || e === a.style[b]),
                    e = parseFloat(e) || 0
                }
                return e + J(a, b, c || (g ? "border" : "content"), d, f) + "px"
            }
            function L(a, b, c, d, e) {
                return new L.prototype.init(a,b,c,d,e)
            }
            function M() {
                return a.setTimeout(function() {
                    yb = void 0
                }),
                yb = na.now()
            }
            function N(a, b) {
                var c, d = {
                    height: a
                }, e = 0;
                for (b = b ? 1 : 0; 4 > e; e += 2 - b)
                    c = Ka[e],
                    d["margin" + c] = d["padding" + c] = a;
                return b && (d.opacity = d.width = a),
                d
            }
            function O(a, b, c) {
                for (var d, e = (R.tweeners[b] || []).concat(R.tweeners["*"]), f = 0, g = e.length; g > f; f++)
                    if (d = e[f].call(c, b, a))
                        return d
            }
            function P(a, b, c) {
                var d, e, f, g, h, i, j, k = this, l = {}, m = a.style, n = a.nodeType && La(a), o = na._data(a, "fxshow");
                c.queue || (h = na._queueHooks(a, "fx"),
                null == h.unqueued && (h.unqueued = 0,
                i = h.empty.fire,
                h.empty.fire = function() {
                    h.unqueued || i()
                }
                ),
                h.unqueued++,
                k.always(function() {
                    k.always(function() {
                        h.unqueued--,
                        na.queue(a, "fx").length || h.empty.fire()
                    })
                })),
                1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY],
                j = na.css(a, "display"),
                "inline" === ("none" === j ? na._data(a, "olddisplay") || E(a.nodeName) : j) && "none" === na.css(a, "float") && (la.inlineBlockNeedsLayout && "inline" !== E(a.nodeName) ? m.zoom = 1 : m.display = "inline-block")),
                c.overflow && (m.overflow = "hidden",
                la.shrinkWrapBlocks() || k.always(function() {
                    m.overflow = c.overflow[0],
                    m.overflowX = c.overflow[1],
                    m.overflowY = c.overflow[2]
                }));
                for (d in b)
                    if (e = b[d],
                    Ab.exec(e)) {
                        if (delete b[d],
                        f = f || "toggle" === e,
                        e === (n ? "hide" : "show")) {
                            if ("show" !== e || !o || void 0 === o[d])
                                continue;
                            n = !0
                        }
                        l[d] = o && o[d] || na.style(a, d)
                    } else
                        j = void 0;
                if (na.isEmptyObject(l))
                    "inline" === ("none" === j ? E(a.nodeName) : j) && (m.display = j);
                else {
                    o ? "hidden"in o && (n = o.hidden) : o = na._data(a, "fxshow", {}),
                    f && (o.hidden = !n),
                    n ? na(a).show() : k.done(function() {
                        na(a).hide()
                    }),
                    k.done(function() {
                        var b;
                        na._removeData(a, "fxshow");
                        for (b in l)
                            na.style(a, b, l[b])
                    });
                    for (d in l)
                        g = O(n ? o[d] : 0, d, k),
                        d in o || (o[d] = g.start,
                        n && (g.end = g.start,
                        g.start = "width" === d || "height" === d ? 1 : 0))
                }
            }
            function Q(a, b) {
                var c, d, e, f, g;
                for (c in a)
                    if (d = na.camelCase(c),
                    e = b[d],
                    f = a[c],
                    na.isArray(f) && (e = f[1],
                    f = a[c] = f[0]),
                    c !== d && (a[d] = f,
                    delete a[c]),
                    (g = na.cssHooks[d]) && "expand"in g) {
                        f = g.expand(f),
                        delete a[d];
                        for (c in f)
                            c in a || (a[c] = f[c],
                            b[c] = e)
                    } else
                        b[d] = e
            }
            function R(a, b, c) {
                var d, e, f = 0, g = R.prefilters.length, h = na.Deferred().always(function() {
                    delete i.elem
                }), i = function() {
                    if (e)
                        return !1;
                    for (var b = yb || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                        j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]),
                    1 > f && i ? c : (h.resolveWith(a, [j]),
                    !1)
                }, j = h.promise({
                    elem: a,
                    props: na.extend({}, b),
                    opts: na.extend(!0, {
                        specialEasing: {},
                        easing: na.easing._default
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: yb || M(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) {
                        var d = na.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d),
                        d
                    },
                    stop: function(b) {
                        var c = 0
                          , d = b ? j.tweens.length : 0;
                        if (e)
                            return this;
                        for (e = !0; d > c; c++)
                            j.tweens[c].run(1);
                        return b ? (h.notifyWith(a, [j, 1, 0]),
                        h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]),
                        this
                    }
                }), k = j.props;
                for (Q(k, j.opts.specialEasing); g > f; f++)
                    if (d = R.prefilters[f].call(j, a, k, j.opts))
                        return na.isFunction(d.stop) && (na._queueHooks(j.elem, j.opts.queue).stop = na.proxy(d.stop, d)),
                        d;
                return na.map(k, O, j),
                na.isFunction(j.opts.start) && j.opts.start.call(a, j),
                na.fx.timer(na.extend(i, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })),
                j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
            }
            function S(a) {
                return na.attr(a, "class") || ""
            }
            function T(a) {
                return function(b, c) {
                    "string" != typeof b && (c = b,
                    b = "*");
                    var d, e = 0, f = b.toLowerCase().match(Ca) || [];
                    if (na.isFunction(c))
                        for (; d = f[e++]; )
                            "+" === d.charAt(0) ? (d = d.slice(1) || "*",
                            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                }
            }
            function U(a, b, c, d) {
                function e(h) {
                    var i;
                    return f[h] = !0,
                    na.each(a[h] || [], function(a, h) {
                        var j = h(b, c, d);
                        return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j),
                        e(j),
                        !1)
                    }),
                    i
                }
                var f = {}
                  , g = a === Zb;
                return e(b.dataTypes[0]) || !f["*"] && e("*")
            }
            function V(a, b) {
                var c, d, e = na.ajaxSettings.flatOptions || {};
                for (d in b)
                    void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
                return c && na.extend(!0, a, c),
                a
            }
            function W(a, b, c) {
                for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; )
                    i.shift(),
                    void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
                if (e)
                    for (g in h)
                        if (h[g] && h[g].test(e)) {
                            i.unshift(g);
                            break
                        }
                if (i[0]in c)
                    f = i[0];
                else {
                    for (g in c) {
                        if (!i[0] || a.converters[g + " " + i[0]]) {
                            f = g;
                            break
                        }
                        d || (d = g)
                    }
                    f = f || d
                }
                return f ? (f !== i[0] && i.unshift(f),
                c[f]) : void 0
            }
            function X(a, b, c, d) {
                var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
                if (k[1])
                    for (g in a.converters)
                        j[g.toLowerCase()] = a.converters[g];
                for (f = k.shift(); f; )
                    if (a.responseFields[f] && (c[a.responseFields[f]] = b),
                    !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
                    i = f,
                    f = k.shift())
                        if ("*" === f)
                            f = i;
                        else if ("*" !== i && i !== f) {
                            if (!(g = j[i + " " + f] || j["* " + f]))
                                for (e in j)
                                    if (h = e.split(" "),
                                    h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                        !0 === g ? g = j[e] : !0 !== j[e] && (f = h[0],
                                        k.unshift(h[1]));
                                        break
                                    }
                            if (!0 !== g)
                                if (g && a.throws)
                                    b = g(b);
                                else
                                    try {
                                        b = g(b)
                                    } catch (a) {
                                        return {
                                            state: "parsererror",
                                            error: g ? a : "No conversion from " + i + " to " + f
                                        }
                                    }
                        }
                return {
                    state: "success",
                    data: b
                }
            }
            function Y(a) {
                return a.style && a.style.display || na.css(a, "display")
            }
            function Z(a) {
                if (!na.contains(a.ownerDocument || da, a))
                    return !0;
                for (; a && 1 === a.nodeType; ) {
                    if ("none" === Y(a) || "hidden" === a.type)
                        return !0;
                    a = a.parentNode
                }
                return !1
            }
            function $(a, b, c, d) {
                var e;
                if (na.isArray(b))
                    na.each(b, function(b, e) {
                        c || cc.test(a) ? d(a, e) : $(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
                    });
                else if (c || "object" !== na.type(b))
                    d(a, b);
                else
                    for (e in b)
                        $(a + "[" + e + "]", b[e], c, d)
            }
            function _() {
                try {
                    return new a.XMLHttpRequest
                } catch (a) {}
            }
            function aa() {
                try {
                    return new a.ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {}
            }
            function ba(a) {
                return na.isWindow(a) ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow)
            }
            var ca = []
              , da = a.document
              , ea = ca.slice
              , fa = ca.concat
              , ga = ca.push
              , ha = ca.indexOf
              , ia = {}
              , ja = ia.toString
              , ka = ia.hasOwnProperty
              , la = {}
              , ma = "1.12.4"
              , na = function(a, b) {
                return new na.fn.init(a,b)
            }
              , oa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
              , pa = /^-ms-/
              , qa = /-([\da-z])/gi
              , ra = function(a, b) {
                return b.toUpperCase()
            };
            na.fn = na.prototype = {
                jquery: ma,
                constructor: na,
                selector: "",
                length: 0,
                toArray: function() {
                    return ea.call(this)
                },
                get: function(a) {
                    return null != a ? 0 > a ? this[a + this.length] : this[a] : ea.call(this)
                },
                pushStack: function(a) {
                    var b = na.merge(this.constructor(), a);
                    return b.prevObject = this,
                    b.context = this.context,
                    b
                },
                each: function(a) {
                    return na.each(this, a)
                },
                map: function(a) {
                    return this.pushStack(na.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                slice: function() {
                    return this.pushStack(ea.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(a) {
                    var b = this.length
                      , c = +a + (0 > a ? b : 0);
                    return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: ga,
                sort: ca.sort,
                splice: ca.splice
            },
            na.extend = na.fn.extend = function() {
                var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
                for ("boolean" == typeof g && (j = g,
                g = arguments[h] || {},
                h++),
                "object" == typeof g || na.isFunction(g) || (g = {}),
                h === i && (g = this,
                h--); i > h; h++)
                    if (null != (e = arguments[h]))
                        for (d in e)
                            a = g[d],
                            c = e[d],
                            g !== c && (j && c && (na.isPlainObject(c) || (b = na.isArray(c))) ? (b ? (b = !1,
                            f = a && na.isArray(a) ? a : []) : f = a && na.isPlainObject(a) ? a : {},
                            g[d] = na.extend(j, f, c)) : void 0 !== c && (g[d] = c));
                return g
            }
            ,
            na.extend({
                expando: "jQuery" + (ma + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(a) {
                    throw new Error(a)
                },
                noop: function() {},
                isFunction: function(a) {
                    return "function" === na.type(a)
                },
                isArray: Array.isArray || function(a) {
                    return "array" === na.type(a)
                }
                ,
                isWindow: function(a) {
                    return null != a && a == a.window
                },
                isNumeric: function(a) {
                    var b = a && a.toString();
                    return !na.isArray(a) && b - parseFloat(b) + 1 >= 0
                },
                isEmptyObject: function(a) {
                    var b;
                    for (b in a)
                        return !1;
                    return !0
                },
                isPlainObject: function(a) {
                    var b;
                    if (!a || "object" !== na.type(a) || a.nodeType || na.isWindow(a))
                        return !1;
                    try {
                        if (a.constructor && !ka.call(a, "constructor") && !ka.call(a.constructor.prototype, "isPrototypeOf"))
                            return !1
                    } catch (a) {
                        return !1
                    }
                    if (!la.ownFirst)
                        for (b in a)
                            return ka.call(a, b);
                    for (b in a)
                        ;
                    return void 0 === b || ka.call(a, b)
                },
                type: function(a) {
                    return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ia[ja.call(a)] || "object" : typeof a
                },
                globalEval: function(b) {
                    b && na.trim(b) && (a.execScript || function(b) {
                        a.eval.call(a, b)
                    }
                    )(b)
                },
                camelCase: function(a) {
                    return a.replace(pa, "ms-").replace(qa, ra)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                },
                each: function(a, b) {
                    var d, e = 0;
                    if (c(a))
                        for (d = a.length; d > e && !1 !== b.call(a[e], e, a[e]); e++)
                            ;
                    else
                        for (e in a)
                            if (!1 === b.call(a[e], e, a[e]))
                                break;
                    return a
                },
                trim: function(a) {
                    return null == a ? "" : (a + "").replace(oa, "")
                },
                makeArray: function(a, b) {
                    var d = b || [];
                    return null != a && (c(Object(a)) ? na.merge(d, "string" == typeof a ? [a] : a) : ga.call(d, a)),
                    d
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if (ha)
                            return ha.call(b, a, c);
                        for (d = b.length,
                        c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                            if (c in b && b[c] === a)
                                return c
                    }
                    return -1
                },
                merge: function(a, b) {
                    for (var c = +b.length, d = 0, e = a.length; c > d; )
                        a[e++] = b[d++];
                    if (c !== c)
                        for (; void 0 !== b[d]; )
                            a[e++] = b[d++];
                    return a.length = e,
                    a
                },
                grep: function(a, b, c) {
                    for (var d = [], e = 0, f = a.length, g = !c; f > e; e++)
                        !b(a[e], e) !== g && d.push(a[e]);
                    return d
                },
                map: function(a, b, d) {
                    var e, f, g = 0, h = [];
                    if (c(a))
                        for (e = a.length; e > g; g++)
                            null != (f = b(a[g], g, d)) && h.push(f);
                    else
                        for (g in a)
                            null != (f = b(a[g], g, d)) && h.push(f);
                    return fa.apply([], h)
                },
                guid: 1,
                proxy: function(a, b) {
                    var c, d, e;
                    return "string" == typeof b && (e = a[b],
                    b = a,
                    a = e),
                    na.isFunction(a) ? (c = ea.call(arguments, 2),
                    d = function() {
                        return a.apply(b || this, c.concat(ea.call(arguments)))
                    }
                    ,
                    d.guid = a.guid = a.guid || na.guid++,
                    d) : void 0
                },
                now: function() {
                    return +new Date
                },
                support: la
            }),
            "function" == typeof Symbol && (na.fn[Symbol.iterator] = ca[Symbol.iterator]),
            na.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
                ia["[object " + b + "]"] = b.toLowerCase()
            });
            var sa = function(a) {
                function b(a, b, c, d) {
                    var e, f, g, h, j, l, m, n, o = b && b.ownerDocument, p = b ? b.nodeType : 9;
                    if (c = c || [],
                    "string" != typeof a || !a || 1 !== p && 9 !== p && 11 !== p)
                        return c;
                    if (!d && ((b ? b.ownerDocument || b : M) !== E && D(b),
                    b = b || E,
                    G)) {
                        if (11 !== p && (l = pa.exec(a)))
                            if (e = l[1]) {
                                if (9 === p) {
                                    if (!(g = b.getElementById(e)))
                                        return c;
                                    if (g.id === e)
                                        return c.push(g),
                                        c
                                } else if (o && (g = o.getElementById(e)) && K(b, g) && g.id === e)
                                    return c.push(g),
                                    c
                            } else {
                                if (l[2])
                                    return Y.apply(c, b.getElementsByTagName(a)),
                                    c;
                                if ((e = l[3]) && t.getElementsByClassName && b.getElementsByClassName)
                                    return Y.apply(c, b.getElementsByClassName(e)),
                                    c
                            }
                        if (t.qsa && !R[a + " "] && (!H || !H.test(a))) {
                            if (1 !== p)
                                o = b,
                                n = a;
                            else if ("object" !== b.nodeName.toLowerCase()) {
                                for ((h = b.getAttribute("id")) ? h = h.replace(ra, "\\$&") : b.setAttribute("id", h = L),
                                m = x(a),
                                f = m.length,
                                j = ka.test(h) ? "#" + h : "[id='" + h + "']"; f--; )
                                    m[f] = j + " " + k(m[f]);
                                n = m.join(","),
                                o = qa.test(a) && i(b.parentNode) || b
                            }
                            if (n)
                                try {
                                    return Y.apply(c, o.querySelectorAll(n)),
                                    c
                                } catch (a) {} finally {
                                    h === L && b.removeAttribute("id")
                                }
                        }
                    }
                    return z(a.replace(fa, "$1"), b, c, d)
                }
                function c() {
                    function a(c, d) {
                        return b.push(c + " ") > u.cacheLength && delete a[b.shift()],
                        a[c + " "] = d
                    }
                    var b = [];
                    return a
                }
                function d(a) {
                    return a[L] = !0,
                    a
                }
                function e(a) {
                    var b = E.createElement("div");
                    try {
                        return !!a(b)
                    } catch (a) {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b),
                        b = null
                    }
                }
                function f(a, b) {
                    for (var c = a.split("|"), d = c.length; d--; )
                        u.attrHandle[c[d]] = b
                }
                function g(a, b) {
                    var c = b && a
                      , d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || T) - (~a.sourceIndex || T);
                    if (d)
                        return d;
                    if (c)
                        for (; c = c.nextSibling; )
                            if (c === b)
                                return -1;
                    return a ? 1 : -1
                }
                function h(a) {
                    return d(function(b) {
                        return b = +b,
                        d(function(c, d) {
                            for (var e, f = a([], c.length, b), g = f.length; g--; )
                                c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }
                function i(a) {
                    return a && void 0 !== a.getElementsByTagName && a
                }
                function j() {}
                function k(a) {
                    for (var b = 0, c = a.length, d = ""; c > b; b++)
                        d += a[b].value;
                    return d
                }
                function l(a, b, c) {
                    var d = b.dir
                      , e = c && "parentNode" === d
                      , f = O++;
                    return b.first ? function(b, c, f) {
                        for (; b = b[d]; )
                            if (1 === b.nodeType || e)
                                return a(b, c, f)
                    }
                    : function(b, c, g) {
                        var h, i, j, k = [N, f];
                        if (g) {
                            for (; b = b[d]; )
                                if ((1 === b.nodeType || e) && a(b, c, g))
                                    return !0
                        } else
                            for (; b = b[d]; )
                                if (1 === b.nodeType || e) {
                                    if (j = b[L] || (b[L] = {}),
                                    i = j[b.uniqueID] || (j[b.uniqueID] = {}),
                                    (h = i[d]) && h[0] === N && h[1] === f)
                                        return k[2] = h[2];
                                    if (i[d] = k,
                                    k[2] = a(b, c, g))
                                        return !0
                                }
                    }
                }
                function m(a) {
                    return a.length > 1 ? function(b, c, d) {
                        for (var e = a.length; e--; )
                            if (!a[e](b, c, d))
                                return !1;
                        return !0
                    }
                    : a[0]
                }
                function n(a, c, d) {
                    for (var e = 0, f = c.length; f > e; e++)
                        b(a, c[e], d);
                    return d
                }
                function o(a, b, c, d, e) {
                    for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                        (f = a[h]) && (c && !c(f, d, e) || (g.push(f),
                        j && b.push(h)));
                    return g
                }
                function p(a, b, c, e, f, g) {
                    return e && !e[L] && (e = p(e)),
                    f && !f[L] && (f = p(f, g)),
                    d(function(d, g, h, i) {
                        var j, k, l, m = [], p = [], q = g.length, r = d || n(b || "*", h.nodeType ? [h] : h, []), s = !a || !d && b ? r : o(r, m, a, h, i), t = c ? f || (d ? a : q || e) ? [] : g : s;
                        if (c && c(s, t, h, i),
                        e)
                            for (j = o(t, p),
                            e(j, [], h, i),
                            k = j.length; k--; )
                                (l = j[k]) && (t[p[k]] = !(s[p[k]] = l));
                        if (d) {
                            if (f || a) {
                                if (f) {
                                    for (j = [],
                                    k = t.length; k--; )
                                        (l = t[k]) && j.push(s[k] = l);
                                    f(null, t = [], j, i)
                                }
                                for (k = t.length; k--; )
                                    (l = t[k]) && (j = f ? $(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                            }
                        } else
                            t = o(t === g ? t.splice(q, t.length) : t),
                            f ? f(null, g, t, i) : Y.apply(g, t)
                    })
                }
                function q(a) {
                    for (var b, c, d, e = a.length, f = u.relative[a[0].type], g = f || u.relative[" "], h = f ? 1 : 0, i = l(function(a) {
                        return a === b
                    }, g, !0), j = l(function(a) {
                        return $(b, a) > -1
                    }, g, !0), n = [function(a, c, d) {
                        var e = !f && (d || c !== A) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                        return b = null,
                        e
                    }
                    ]; e > h; h++)
                        if (c = u.relative[a[h].type])
                            n = [l(m(n), c)];
                        else {
                            if (c = u.filter[a[h].type].apply(null, a[h].matches),
                            c[L]) {
                                for (d = ++h; e > d && !u.relative[a[d].type]; d++)
                                    ;
                                return p(h > 1 && m(n), h > 1 && k(a.slice(0, h - 1).concat({
                                    value: " " === a[h - 2].type ? "*" : ""
                                })).replace(fa, "$1"), c, d > h && q(a.slice(h, d)), e > d && q(a = a.slice(d)), e > d && k(a))
                            }
                            n.push(c)
                        }
                    return m(n)
                }
                function r(a, c) {
                    var e = c.length > 0
                      , f = a.length > 0
                      , g = function(d, g, h, i, j) {
                        var k, l, m, n = 0, p = "0", q = d && [], r = [], s = A, t = d || f && u.find.TAG("*", j), v = N += null == s ? 1 : Math.random() || .1, w = t.length;
                        for (j && (A = g === E || g || j); p !== w && null != (k = t[p]); p++) {
                            if (f && k) {
                                for (l = 0,
                                g || k.ownerDocument === E || (D(k),
                                h = !G); m = a[l++]; )
                                    if (m(k, g || E, h)) {
                                        i.push(k);
                                        break
                                    }
                                j && (N = v)
                            }
                            e && ((k = !m && k) && n--,
                            d && q.push(k))
                        }
                        if (n += p,
                        e && p !== n) {
                            for (l = 0; m = c[l++]; )
                                m(q, r, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; p--; )
                                        q[p] || r[p] || (r[p] = W.call(i));
                                r = o(r)
                            }
                            Y.apply(i, r),
                            j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (N = v,
                        A = s),
                        q
                    };
                    return e ? d(g) : g
                }
                var s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L = "sizzle" + 1 * new Date, M = a.document, N = 0, O = 0, P = c(), Q = c(), R = c(), S = function(a, b) {
                    return a === b && (C = !0),
                    0
                }, T = 1 << 31, U = {}.hasOwnProperty, V = [], W = V.pop, X = V.push, Y = V.push, Z = V.slice, $ = function(a, b) {
                    for (var c = 0, d = a.length; d > c; c++)
                        if (a[c] === b)
                            return c;
                    return -1
                }, _ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", aa = "[\\x20\\t\\r\\n\\f]", ba = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ca = "\\[" + aa + "*(" + ba + ")(?:" + aa + "*([*^$|!~]?=)" + aa + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ba + "))|)" + aa + "*\\]", da = ":(" + ba + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ca + ")*)|.*)\\)|)", ea = new RegExp(aa + "+","g"), fa = new RegExp("^" + aa + "+|((?:^|[^\\\\])(?:\\\\.)*)" + aa + "+$","g"), ga = new RegExp("^" + aa + "*," + aa + "*"), ha = new RegExp("^" + aa + "*([>+~]|" + aa + ")" + aa + "*"), ia = new RegExp("=" + aa + "*([^\\]'\"]*?)" + aa + "*\\]","g"), ja = new RegExp(da), ka = new RegExp("^" + ba + "$"), la = {
                    ID: new RegExp("^#(" + ba + ")"),
                    CLASS: new RegExp("^\\.(" + ba + ")"),
                    TAG: new RegExp("^(" + ba + "|[*])"),
                    ATTR: new RegExp("^" + ca),
                    PSEUDO: new RegExp("^" + da),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + aa + "*(even|odd|(([+-]|)(\\d*)n|)" + aa + "*(?:([+-]|)" + aa + "*(\\d+)|))" + aa + "*\\)|)","i"),
                    bool: new RegExp("^(?:" + _ + ")$","i"),
                    needsContext: new RegExp("^" + aa + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + aa + "*((?:-\\d)?\\d*)" + aa + "*\\)|)(?=[^-]|$)","i")
                }, ma = /^(?:input|select|textarea|button)$/i, na = /^h\d$/i, oa = /^[^{]+\{\s*\[native \w/, pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, qa = /[+~]/, ra = /'|\\/g, sa = new RegExp("\\\\([\\da-f]{1,6}" + aa + "?|(" + aa + ")|.)","ig"), ta = function(a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                }, ua = function() {
                    D()
                };
                try {
                    Y.apply(V = Z.call(M.childNodes), M.childNodes),
                    V[M.childNodes.length].nodeType
                } catch (a) {
                    Y = {
                        apply: V.length ? function(a, b) {
                            X.apply(a, Z.call(b))
                        }
                        : function(a, b) {
                            for (var c = a.length, d = 0; a[c++] = b[d++]; )
                                ;
                            a.length = c - 1
                        }
                    }
                }
                t = b.support = {},
                w = b.isXML = function(a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return !!b && "HTML" !== b.nodeName
                }
                ,
                D = b.setDocument = function(a) {
                    var b, c, d = a ? a.ownerDocument || a : M;
                    return d !== E && 9 === d.nodeType && d.documentElement ? (E = d,
                    F = E.documentElement,
                    G = !w(E),
                    (c = E.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", ua, !1) : c.attachEvent && c.attachEvent("onunload", ua)),
                    t.attributes = e(function(a) {
                        return a.className = "i",
                        !a.getAttribute("className")
                    }),
                    t.getElementsByTagName = e(function(a) {
                        return a.appendChild(E.createComment("")),
                        !a.getElementsByTagName("*").length
                    }),
                    t.getElementsByClassName = oa.test(E.getElementsByClassName),
                    t.getById = e(function(a) {
                        return F.appendChild(a).id = L,
                        !E.getElementsByName || !E.getElementsByName(L).length
                    }),
                    t.getById ? (u.find.ID = function(a, b) {
                        if (void 0 !== b.getElementById && G) {
                            var c = b.getElementById(a);
                            return c ? [c] : []
                        }
                    }
                    ,
                    u.filter.ID = function(a) {
                        var b = a.replace(sa, ta);
                        return function(a) {
                            return a.getAttribute("id") === b
                        }
                    }
                    ) : (delete u.find.ID,
                    u.filter.ID = function(a) {
                        var b = a.replace(sa, ta);
                        return function(a) {
                            var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                            return c && c.value === b
                        }
                    }
                    ),
                    u.find.TAG = t.getElementsByTagName ? function(a, b) {
                        return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : t.qsa ? b.querySelectorAll(a) : void 0
                    }
                    : function(a, b) {
                        var c, d = [], e = 0, f = b.getElementsByTagName(a);
                        if ("*" === a) {
                            for (; c = f[e++]; )
                                1 === c.nodeType && d.push(c);
                            return d
                        }
                        return f
                    }
                    ,
                    u.find.CLASS = t.getElementsByClassName && function(a, b) {
                        return void 0 !== b.getElementsByClassName && G ? b.getElementsByClassName(a) : void 0
                    }
                    ,
                    I = [],
                    H = [],
                    (t.qsa = oa.test(E.querySelectorAll)) && (e(function(a) {
                        F.appendChild(a).innerHTML = "<a id='" + L + "'></a><select id='" + L + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                        a.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + aa + "*(?:''|\"\")"),
                        a.querySelectorAll("[selected]").length || H.push("\\[" + aa + "*(?:value|" + _ + ")"),
                        a.querySelectorAll("[id~=" + L + "-]").length || H.push("~="),
                        a.querySelectorAll(":checked").length || H.push(":checked"),
                        a.querySelectorAll("a#" + L + "+*").length || H.push(".#.+[+~]")
                    }),
                    e(function(a) {
                        var b = E.createElement("input");
                        b.setAttribute("type", "hidden"),
                        a.appendChild(b).setAttribute("name", "D"),
                        a.querySelectorAll("[name=d]").length && H.push("name" + aa + "*[*^$|!~]?="),
                        a.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"),
                        a.querySelectorAll("*,:x"),
                        H.push(",.*:")
                    })),
                    (t.matchesSelector = oa.test(J = F.matches || F.webkitMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector || F.msMatchesSelector)) && e(function(a) {
                        t.disconnectedMatch = J.call(a, "div"),
                        J.call(a, "[s!='']:x"),
                        I.push("!=", da)
                    }),
                    H = H.length && new RegExp(H.join("|")),
                    I = I.length && new RegExp(I.join("|")),
                    b = oa.test(F.compareDocumentPosition),
                    K = b || oa.test(F.contains) ? function(a, b) {
                        var c = 9 === a.nodeType ? a.documentElement : a
                          , d = b && b.parentNode;
                        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                    }
                    : function(a, b) {
                        if (b)
                            for (; b = b.parentNode; )
                                if (b === a)
                                    return !0;
                        return !1
                    }
                    ,
                    S = b ? function(a, b) {
                        if (a === b)
                            return C = !0,
                            0;
                        var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        return c || (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                        1 & c || !t.sortDetached && b.compareDocumentPosition(a) === c ? a === E || a.ownerDocument === M && K(M, a) ? -1 : b === E || b.ownerDocument === M && K(M, b) ? 1 : B ? $(B, a) - $(B, b) : 0 : 4 & c ? -1 : 1)
                    }
                    : function(a, b) {
                        if (a === b)
                            return C = !0,
                            0;
                        var c, d = 0, e = a.parentNode, f = b.parentNode, h = [a], i = [b];
                        if (!e || !f)
                            return a === E ? -1 : b === E ? 1 : e ? -1 : f ? 1 : B ? $(B, a) - $(B, b) : 0;
                        if (e === f)
                            return g(a, b);
                        for (c = a; c = c.parentNode; )
                            h.unshift(c);
                        for (c = b; c = c.parentNode; )
                            i.unshift(c);
                        for (; h[d] === i[d]; )
                            d++;
                        return d ? g(h[d], i[d]) : h[d] === M ? -1 : i[d] === M ? 1 : 0
                    }
                    ,
                    E) : E
                }
                ,
                b.matches = function(a, c) {
                    return b(a, null, null, c)
                }
                ,
                b.matchesSelector = function(a, c) {
                    if ((a.ownerDocument || a) !== E && D(a),
                    c = c.replace(ia, "='$1']"),
                    t.matchesSelector && G && !R[c + " "] && (!I || !I.test(c)) && (!H || !H.test(c)))
                        try {
                            var d = J.call(a, c);
                            if (d || t.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                                return d
                        } catch (a) {}
                    return b(c, E, null, [a]).length > 0
                }
                ,
                b.contains = function(a, b) {
                    return (a.ownerDocument || a) !== E && D(a),
                    K(a, b)
                }
                ,
                b.attr = function(a, b) {
                    (a.ownerDocument || a) !== E && D(a);
                    var c = u.attrHandle[b.toLowerCase()]
                      , d = c && U.call(u.attrHandle, b.toLowerCase()) ? c(a, b, !G) : void 0;
                    return void 0 !== d ? d : t.attributes || !G ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }
                ,
                b.error = function(a) {
                    throw new Error("Syntax error, unrecognized expression: " + a)
                }
                ,
                b.uniqueSort = function(a) {
                    var b, c = [], d = 0, e = 0;
                    if (C = !t.detectDuplicates,
                    B = !t.sortStable && a.slice(0),
                    a.sort(S),
                    C) {
                        for (; b = a[e++]; )
                            b === a[e] && (d = c.push(e));
                        for (; d--; )
                            a.splice(c[d], 1)
                    }
                    return B = null,
                    a
                }
                ,
                v = b.getText = function(a) {
                    var b, c = "", d = 0, e = a.nodeType;
                    if (e) {
                        if (1 === e || 9 === e || 11 === e) {
                            if ("string" == typeof a.textContent)
                                return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling)
                                c += v(a)
                        } else if (3 === e || 4 === e)
                            return a.nodeValue
                    } else
                        for (; b = a[d++]; )
                            c += v(b);
                    return c
                }
                ,
                u = b.selectors = {
                    cacheLength: 50,
                    createPseudo: d,
                    match: la,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(a) {
                            return a[1] = a[1].replace(sa, ta),
                            a[3] = (a[3] || a[4] || a[5] || "").replace(sa, ta),
                            "~=" === a[2] && (a[3] = " " + a[3] + " "),
                            a.slice(0, 4)
                        },
                        CHILD: function(a) {
                            return a[1] = a[1].toLowerCase(),
                            "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]),
                            a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                            a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]),
                            a
                        },
                        PSEUDO: function(a) {
                            var b, c = !a[6] && a[2];
                            return la.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ja.test(c) && (b = x(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
                            a[2] = c.slice(0, b)),
                            a.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(a) {
                            var b = a.replace(sa, ta).toLowerCase();
                            return "*" === a ? function() {
                                return !0
                            }
                            : function(a) {
                                return a.nodeName && a.nodeName.toLowerCase() === b
                            }
                        },
                        CLASS: function(a) {
                            var b = P[a + " "];
                            return b || (b = new RegExp("(^|" + aa + ")" + a + "(" + aa + "|$)")) && P(a, function(a) {
                                return b.test("string" == typeof a.className && a.className || void 0 !== a.getAttribute && a.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(a, c, d) {
                            return function(e) {
                                var f = b.attr(e, a);
                                return null == f ? "!=" === c : !c || (f += "",
                                "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ea, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                            }
                        },
                        CHILD: function(a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3)
                              , g = "last" !== a.slice(-4)
                              , h = "of-type" === b;
                            return 1 === d && 0 === e ? function(a) {
                                return !!a.parentNode
                            }
                            : function(b, c, i) {
                                var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                                if (q) {
                                    if (f) {
                                        for (; p; ) {
                                            for (m = b; m = m[p]; )
                                                if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType)
                                                    return !1;
                                            o = p = "only" === a && !o && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (o = [g ? q.firstChild : q.lastChild],
                                    g && s) {
                                        for (m = q,
                                        l = m[L] || (m[L] = {}),
                                        k = l[m.uniqueID] || (l[m.uniqueID] = {}),
                                        j = k[a] || [],
                                        n = j[0] === N && j[1],
                                        t = n && j[2],
                                        m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop(); )
                                            if (1 === m.nodeType && ++t && m === b) {
                                                k[a] = [N, n, t];
                                                break
                                            }
                                    } else if (s && (m = b,
                                    l = m[L] || (m[L] = {}),
                                    k = l[m.uniqueID] || (l[m.uniqueID] = {}),
                                    j = k[a] || [],
                                    n = j[0] === N && j[1],
                                    t = n),
                                    !1 === t)
                                        for (; (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[L] || (m[L] = {}),
                                        k = l[m.uniqueID] || (l[m.uniqueID] = {}),
                                        k[a] = [N, t]),
                                        m !== b)); )
                                            ;
                                    return (t -= e) === d || t % d == 0 && t / d >= 0
                                }
                            }
                        },
                        PSEUDO: function(a, c) {
                            var e, f = u.pseudos[a] || u.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                            return f[L] ? f(c) : f.length > 1 ? (e = [a, a, "", c],
                            u.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                                for (var d, e = f(a, c), g = e.length; g--; )
                                    d = $(a, e[g]),
                                    a[d] = !(b[d] = e[g])
                            }) : function(a) {
                                return f(a, 0, e)
                            }
                            ) : f
                        }
                    },
                    pseudos: {
                        not: d(function(a) {
                            var b = []
                              , c = []
                              , e = y(a.replace(fa, "$1"));
                            return e[L] ? d(function(a, b, c, d) {
                                for (var f, g = e(a, null, d, []), h = a.length; h--; )
                                    (f = g[h]) && (a[h] = !(b[h] = f))
                            }) : function(a, d, f) {
                                return b[0] = a,
                                e(b, null, f, c),
                                b[0] = null,
                                !c.pop()
                            }
                        }),
                        has: d(function(a) {
                            return function(c) {
                                return b(a, c).length > 0
                            }
                        }),
                        contains: d(function(a) {
                            return a = a.replace(sa, ta),
                            function(b) {
                                return (b.textContent || b.innerText || v(b)).indexOf(a) > -1
                            }
                        }),
                        lang: d(function(a) {
                            return ka.test(a || "") || b.error("unsupported lang: " + a),
                            a = a.replace(sa, ta).toLowerCase(),
                            function(b) {
                                var c;
                                do {
                                    if (c = G ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                        return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                                } while ((b = b.parentNode) && 1 === b.nodeType);return !1
                            }
                        }),
                        target: function(b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id
                        },
                        root: function(a) {
                            return a === F
                        },
                        focus: function(a) {
                            return a === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                        },
                        enabled: function(a) {
                            return !1 === a.disabled
                        },
                        disabled: function(a) {
                            return !0 === a.disabled
                        },
                        checked: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && !!a.checked || "option" === b && !!a.selected
                        },
                        selected: function(a) {
                            return a.parentNode && a.parentNode.selectedIndex,
                            !0 === a.selected
                        },
                        empty: function(a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (a.nodeType < 6)
                                    return !1;
                            return !0
                        },
                        parent: function(a) {
                            return !u.pseudos.empty(a)
                        },
                        header: function(a) {
                            return na.test(a.nodeName)
                        },
                        input: function(a) {
                            return ma.test(a.nodeName)
                        },
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && "button" === a.type || "button" === b
                        },
                        text: function(a) {
                            var b;
                            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                        },
                        first: h(function() {
                            return [0]
                        }),
                        last: h(function(a, b) {
                            return [b - 1]
                        }),
                        eq: h(function(a, b, c) {
                            return [0 > c ? c + b : c]
                        }),
                        even: h(function(a, b) {
                            for (var c = 0; b > c; c += 2)
                                a.push(c);
                            return a
                        }),
                        odd: h(function(a, b) {
                            for (var c = 1; b > c; c += 2)
                                a.push(c);
                            return a
                        }),
                        lt: h(function(a, b, c) {
                            for (var d = 0 > c ? c + b : c; --d >= 0; )
                                a.push(d);
                            return a
                        }),
                        gt: h(function(a, b, c) {
                            for (var d = 0 > c ? c + b : c; ++d < b; )
                                a.push(d);
                            return a
                        })
                    }
                },
                u.pseudos.nth = u.pseudos.eq;
                for (s in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    u.pseudos[s] = function(a) {
                        return function(b) {
                            return "input" === b.nodeName.toLowerCase() && b.type === a
                        }
                    }(s);
                for (s in {
                    submit: !0,
                    reset: !0
                })
                    u.pseudos[s] = function(a) {
                        return function(b) {
                            var c = b.nodeName.toLowerCase();
                            return ("input" === c || "button" === c) && b.type === a
                        }
                    }(s);
                return j.prototype = u.filters = u.pseudos,
                u.setFilters = new j,
                x = b.tokenize = function(a, c) {
                    var d, e, f, g, h, i, j, k = Q[a + " "];
                    if (k)
                        return c ? 0 : k.slice(0);
                    for (h = a,
                    i = [],
                    j = u.preFilter; h; ) {
                        d && !(e = ga.exec(h)) || (e && (h = h.slice(e[0].length) || h),
                        i.push(f = [])),
                        d = !1,
                        (e = ha.exec(h)) && (d = e.shift(),
                        f.push({
                            value: d,
                            type: e[0].replace(fa, " ")
                        }),
                        h = h.slice(d.length));
                        for (g in u.filter)
                            !(e = la[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(),
                            f.push({
                                value: d,
                                type: g,
                                matches: e
                            }),
                            h = h.slice(d.length));
                        if (!d)
                            break
                    }
                    return c ? h.length : h ? b.error(a) : Q(a, i).slice(0)
                }
                ,
                y = b.compile = function(a, b) {
                    var c, d = [], e = [], f = R[a + " "];
                    if (!f) {
                        for (b || (b = x(a)),
                        c = b.length; c--; )
                            f = q(b[c]),
                            f[L] ? d.push(f) : e.push(f);
                        f = R(a, r(e, d)),
                        f.selector = a
                    }
                    return f
                }
                ,
                z = b.select = function(a, b, c, d) {
                    var e, f, g, h, j, l = "function" == typeof a && a, m = !d && x(a = l.selector || a);
                    if (c = c || [],
                    1 === m.length) {
                        if (f = m[0] = m[0].slice(0),
                        f.length > 2 && "ID" === (g = f[0]).type && t.getById && 9 === b.nodeType && G && u.relative[f[1].type]) {
                            if (!(b = (u.find.ID(g.matches[0].replace(sa, ta), b) || [])[0]))
                                return c;
                            l && (b = b.parentNode),
                            a = a.slice(f.shift().value.length)
                        }
                        for (e = la.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e],
                        !u.relative[h = g.type]); )
                            if ((j = u.find[h]) && (d = j(g.matches[0].replace(sa, ta), qa.test(f[0].type) && i(b.parentNode) || b))) {
                                if (f.splice(e, 1),
                                !(a = d.length && k(f)))
                                    return Y.apply(c, d),
                                    c;
                                break
                            }
                    }
                    return (l || y(a, m))(d, b, !G, c, !b || qa.test(a) && i(b.parentNode) || b),
                    c
                }
                ,
                t.sortStable = L.split("").sort(S).join("") === L,
                t.detectDuplicates = !!C,
                D(),
                t.sortDetached = e(function(a) {
                    return 1 & a.compareDocumentPosition(E.createElement("div"))
                }),
                e(function(a) {
                    return a.innerHTML = "<a href='#'></a>",
                    "#" === a.firstChild.getAttribute("href")
                }) || f("type|href|height|width", function(a, b, c) {
                    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                }),
                t.attributes && e(function(a) {
                    return a.innerHTML = "<input/>",
                    a.firstChild.setAttribute("value", ""),
                    "" === a.firstChild.getAttribute("value")
                }) || f("value", function(a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
                }),
                e(function(a) {
                    return null == a.getAttribute("disabled")
                }) || f(_, function(a, b, c) {
                    var d;
                    return c ? void 0 : !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }),
                b
            }(a);
            na.find = sa,
            na.expr = sa.selectors,
            na.expr[":"] = na.expr.pseudos,
            na.uniqueSort = na.unique = sa.uniqueSort,
            na.text = sa.getText,
            na.isXMLDoc = sa.isXML,
            na.contains = sa.contains;
            var ta = function(a, b, c) {
                for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType; )
                    if (1 === a.nodeType) {
                        if (e && na(a).is(c))
                            break;
                        d.push(a)
                    }
                return d
            }
              , ua = function(a, b) {
                for (var c = []; a; a = a.nextSibling)
                    1 === a.nodeType && a !== b && c.push(a);
                return c
            }
              , va = na.expr.match.needsContext
              , wa = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
              , xa = /^.[^:#\[\.,]*$/;
            na.filter = function(a, b, c) {
                var d = b[0];
                return c && (a = ":not(" + a + ")"),
                1 === b.length && 1 === d.nodeType ? na.find.matchesSelector(d, a) ? [d] : [] : na.find.matches(a, na.grep(b, function(a) {
                    return 1 === a.nodeType
                }))
            }
            ,
            na.fn.extend({
                find: function(a) {
                    var b, c = [], d = this, e = d.length;
                    if ("string" != typeof a)
                        return this.pushStack(na(a).filter(function() {
                            for (b = 0; e > b; b++)
                                if (na.contains(d[b], this))
                                    return !0
                        }));
                    for (b = 0; e > b; b++)
                        na.find(a, d[b], c);
                    return c = this.pushStack(e > 1 ? na.unique(c) : c),
                    c.selector = this.selector ? this.selector + " " + a : a,
                    c
                },
                filter: function(a) {
                    return this.pushStack(d(this, a || [], !1))
                },
                not: function(a) {
                    return this.pushStack(d(this, a || [], !0))
                },
                is: function(a) {
                    return !!d(this, "string" == typeof a && va.test(a) ? na(a) : a || [], !1).length
                }
            });
            var ya, za = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
            (na.fn.init = function(a, b, c) {
                var d, e;
                if (!a)
                    return this;
                if (c = c || ya,
                "string" == typeof a) {
                    if (!(d = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : za.exec(a)) || !d[1] && b)
                        return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                    if (d[1]) {
                        if (b = b instanceof na ? b[0] : b,
                        na.merge(this, na.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : da, !0)),
                        wa.test(d[1]) && na.isPlainObject(b))
                            for (d in b)
                                na.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                        return this
                    }
                    if ((e = da.getElementById(d[2])) && e.parentNode) {
                        if (e.id !== d[2])
                            return ya.find(a);
                        this.length = 1,
                        this[0] = e
                    }
                    return this.context = da,
                    this.selector = a,
                    this
                }
                return a.nodeType ? (this.context = this[0] = a,
                this.length = 1,
                this) : na.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(na) : (void 0 !== a.selector && (this.selector = a.selector,
                this.context = a.context),
                na.makeArray(a, this))
            }
            ).prototype = na.fn,
            ya = na(da);
            var Aa = /^(?:parents|prev(?:Until|All))/
              , Ba = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            na.fn.extend({
                has: function(a) {
                    var b, c = na(a, this), d = c.length;
                    return this.filter(function() {
                        for (b = 0; d > b; b++)
                            if (na.contains(this, c[b]))
                                return !0
                    })
                },
                closest: function(a, b) {
                    for (var c, d = 0, e = this.length, f = [], g = va.test(a) || "string" != typeof a ? na(a, b || this.context) : 0; e > d; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && na.find.matchesSelector(c, a))) {
                                f.push(c);
                                break
                            }
                    return this.pushStack(f.length > 1 ? na.uniqueSort(f) : f)
                },
                index: function(a) {
                    return a ? "string" == typeof a ? na.inArray(this[0], na(a)) : na.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(a, b) {
                    return this.pushStack(na.uniqueSort(na.merge(this.get(), na(a, b))))
                },
                addBack: function(a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }
            }),
            na.each({
                parent: function(a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null
                },
                parents: function(a) {
                    return ta(a, "parentNode")
                },
                parentsUntil: function(a, b, c) {
                    return ta(a, "parentNode", c)
                },
                next: function(a) {
                    return e(a, "nextSibling")
                },
                prev: function(a) {
                    return e(a, "previousSibling")
                },
                nextAll: function(a) {
                    return ta(a, "nextSibling")
                },
                prevAll: function(a) {
                    return ta(a, "previousSibling")
                },
                nextUntil: function(a, b, c) {
                    return ta(a, "nextSibling", c)
                },
                prevUntil: function(a, b, c) {
                    return ta(a, "previousSibling", c)
                },
                siblings: function(a) {
                    return ua((a.parentNode || {}).firstChild, a)
                },
                children: function(a) {
                    return ua(a.firstChild)
                },
                contents: function(a) {
                    return na.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : na.merge([], a.childNodes)
                }
            }, function(a, b) {
                na.fn[a] = function(c, d) {
                    var e = na.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c),
                    d && "string" == typeof d && (e = na.filter(d, e)),
                    this.length > 1 && (Ba[a] || (e = na.uniqueSort(e)),
                    Aa.test(a) && (e = e.reverse())),
                    this.pushStack(e)
                }
            });
            var Ca = /\S+/g;
            na.Callbacks = function(a) {
                a = "string" == typeof a ? f(a) : na.extend({}, a);
                var b, c, d, e, g = [], h = [], i = -1, j = function() {
                    for (e = a.once,
                    d = b = !0; h.length; i = -1)
                        for (c = h.shift(); ++i < g.length; )
                            !1 === g[i].apply(c[0], c[1]) && a.stopOnFalse && (i = g.length,
                            c = !1);
                    a.memory || (c = !1),
                    b = !1,
                    e && (g = c ? [] : "")
                }, k = {
                    add: function() {
                        return g && (c && !b && (i = g.length - 1,
                        h.push(c)),
                        function b(c) {
                            na.each(c, function(c, d) {
                                na.isFunction(d) ? a.unique && k.has(d) || g.push(d) : d && d.length && "string" !== na.type(d) && b(d)
                            })
                        }(arguments),
                        c && !b && j()),
                        this
                    },
                    remove: function() {
                        return na.each(arguments, function(a, b) {
                            for (var c; (c = na.inArray(b, g, c)) > -1; )
                                g.splice(c, 1),
                                i >= c && i--
                        }),
                        this
                    },
                    has: function(a) {
                        return a ? na.inArray(a, g) > -1 : g.length > 0
                    },
                    empty: function() {
                        return g && (g = []),
                        this
                    },
                    disable: function() {
                        return e = h = [],
                        g = c = "",
                        this
                    },
                    disabled: function() {
                        return !g
                    },
                    lock: function() {
                        return e = !0,
                        c || k.disable(),
                        this
                    },
                    locked: function() {
                        return !!e
                    },
                    fireWith: function(a, c) {
                        return e || (c = c || [],
                        c = [a, c.slice ? c.slice() : c],
                        h.push(c),
                        b || j()),
                        this
                    },
                    fire: function() {
                        return k.fireWith(this, arguments),
                        this
                    },
                    fired: function() {
                        return !!d
                    }
                };
                return k
            }
            ,
            na.extend({
                Deferred: function(a) {
                    var b = [["resolve", "done", na.Callbacks("once memory"), "resolved"], ["reject", "fail", na.Callbacks("once memory"), "rejected"], ["notify", "progress", na.Callbacks("memory")]]
                      , c = "pending"
                      , d = {
                        state: function() {
                            return c
                        },
                        always: function() {
                            return e.done(arguments).fail(arguments),
                            this
                        },
                        then: function() {
                            var a = arguments;
                            return na.Deferred(function(c) {
                                na.each(b, function(b, f) {
                                    var g = na.isFunction(a[b]) && a[b];
                                    e[f[1]](function() {
                                        var a = g && g.apply(this, arguments);
                                        a && na.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                    })
                                }),
                                a = null
                            }).promise()
                        },
                        promise: function(a) {
                            return null != a ? na.extend(a, d) : d
                        }
                    }
                      , e = {};
                    return d.pipe = d.then,
                    na.each(b, function(a, f) {
                        var g = f[2]
                          , h = f[3];
                        d[f[1]] = g.add,
                        h && g.add(function() {
                            c = h
                        }, b[1 ^ a][2].disable, b[2][2].lock),
                        e[f[0]] = function() {
                            return e[f[0] + "With"](this === e ? d : this, arguments),
                            this
                        }
                        ,
                        e[f[0] + "With"] = g.fireWith
                    }),
                    d.promise(e),
                    a && a.call(e, e),
                    e
                },
                when: function(a) {
                    var b, c, d, e = 0, f = ea.call(arguments), g = f.length, h = 1 !== g || a && na.isFunction(a.promise) ? g : 0, i = 1 === h ? a : na.Deferred(), j = function(a, c, d) {
                        return function(e) {
                            c[a] = this,
                            d[a] = arguments.length > 1 ? ea.call(arguments) : e,
                            d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                        }
                    };
                    if (g > 1)
                        for (b = new Array(g),
                        c = new Array(g),
                        d = new Array(g); g > e; e++)
                            f[e] && na.isFunction(f[e].promise) ? f[e].promise().progress(j(e, c, b)).done(j(e, d, f)).fail(i.reject) : --h;
                    return h || i.resolveWith(d, f),
                    i.promise()
                }
            });
            var Da;
            na.fn.ready = function(a) {
                return na.ready.promise().done(a),
                this
            }
            ,
            na.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? na.readyWait++ : na.ready(!0)
                },
                ready: function(a) {
                    (!0 === a ? --na.readyWait : na.isReady) || (na.isReady = !0,
                    !0 !== a && --na.readyWait > 0 || (Da.resolveWith(da, [na]),
                    na.fn.triggerHandler && (na(da).triggerHandler("ready"),
                    na(da).off("ready"))))
                }
            }),
            na.ready.promise = function(b) {
                if (!Da)
                    if (Da = na.Deferred(),
                    "complete" === da.readyState || "loading" !== da.readyState && !da.documentElement.doScroll)
                        a.setTimeout(na.ready);
                    else if (da.addEventListener)
                        da.addEventListener("DOMContentLoaded", h),
                        a.addEventListener("load", h);
                    else {
                        da.attachEvent("onreadystatechange", h),
                        a.attachEvent("onload", h);
                        var c = !1;
                        try {
                            c = null == a.frameElement && da.documentElement
                        } catch (a) {}
                        c && c.doScroll && function b() {
                            if (!na.isReady) {
                                try {
                                    c.doScroll("left")
                                } catch (c) {
                                    return a.setTimeout(b, 50)
                                }
                                g(),
                                na.ready()
                            }
                        }()
                    }
                return Da.promise(b)
            }
            ,
            na.ready.promise();
            var Ea;
            for (Ea in na(la))
                break;
            la.ownFirst = "0" === Ea,
            la.inlineBlockNeedsLayout = !1,
            na(function() {
                var a, b, c, d;
                (c = da.getElementsByTagName("body")[0]) && c.style && (b = da.createElement("div"),
                d = da.createElement("div"),
                d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                c.appendChild(d).appendChild(b),
                void 0 !== b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
                la.inlineBlockNeedsLayout = a = 3 === b.offsetWidth,
                a && (c.style.zoom = 1)),
                c.removeChild(d))
            }),
            function() {
                var a = da.createElement("div");
                la.deleteExpando = !0;
                try {
                    delete a.test
                } catch (a) {
                    la.deleteExpando = !1
                }
                a = null
            }();
            var Fa = function(a) {
                var b = na.noData[(a.nodeName + " ").toLowerCase()]
                  , c = +a.nodeType || 1;
                return (1 === c || 9 === c) && (!b || !0 !== b && a.getAttribute("classid") === b)
            }
              , Ga = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
              , Ha = /([A-Z])/g;
            na.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function(a) {
                    return !!(a = a.nodeType ? na.cache[a[na.expando]] : a[na.expando]) && !j(a)
                },
                data: function(a, b, c) {
                    return k(a, b, c)
                },
                removeData: function(a, b) {
                    return l(a, b)
                },
                _data: function(a, b, c) {
                    return k(a, b, c, !0)
                },
                _removeData: function(a, b) {
                    return l(a, b, !0)
                }
            }),
            na.fn.extend({
                data: function(a, b) {
                    var c, d, e, f = this[0], g = f && f.attributes;
                    if (void 0 === a) {
                        if (this.length && (e = na.data(f),
                        1 === f.nodeType && !na._data(f, "parsedAttrs"))) {
                            for (c = g.length; c--; )
                                g[c] && (d = g[c].name,
                                0 === d.indexOf("data-") && (d = na.camelCase(d.slice(5)),
                                i(f, d, e[d])));
                            na._data(f, "parsedAttrs", !0)
                        }
                        return e
                    }
                    return "object" == typeof a ? this.each(function() {
                        na.data(this, a)
                    }) : arguments.length > 1 ? this.each(function() {
                        na.data(this, a, b)
                    }) : f ? i(f, a, na.data(f, a)) : void 0
                },
                removeData: function(a) {
                    return this.each(function() {
                        na.removeData(this, a)
                    })
                }
            }),
            na.extend({
                queue: function(a, b, c) {
                    var d;
                    return a ? (b = (b || "fx") + "queue",
                    d = na._data(a, b),
                    c && (!d || na.isArray(c) ? d = na._data(a, b, na.makeArray(c)) : d.push(c)),
                    d || []) : void 0
                },
                dequeue: function(a, b) {
                    b = b || "fx";
                    var c = na.queue(a, b)
                      , d = c.length
                      , e = c.shift()
                      , f = na._queueHooks(a, b)
                      , g = function() {
                        na.dequeue(a, b)
                    };
                    "inprogress" === e && (e = c.shift(),
                    d--),
                    e && ("fx" === b && c.unshift("inprogress"),
                    delete f.stop,
                    e.call(a, g, f)),
                    !d && f && f.empty.fire()
                },
                _queueHooks: function(a, b) {
                    var c = b + "queueHooks";
                    return na._data(a, c) || na._data(a, c, {
                        empty: na.Callbacks("once memory").add(function() {
                            na._removeData(a, b + "queue"),
                            na._removeData(a, c)
                        })
                    })
                }
            }),
            na.fn.extend({
                queue: function(a, b) {
                    var c = 2;
                    return "string" != typeof a && (b = a,
                    a = "fx",
                    c--),
                    arguments.length < c ? na.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                        var c = na.queue(this, a, b);
                        na._queueHooks(this, a),
                        "fx" === a && "inprogress" !== c[0] && na.dequeue(this, a)
                    })
                },
                dequeue: function(a) {
                    return this.each(function() {
                        na.dequeue(this, a)
                    })
                },
                clearQueue: function(a) {
                    return this.queue(a || "fx", [])
                },
                promise: function(a, b) {
                    var c, d = 1, e = na.Deferred(), f = this, g = this.length, h = function() {
                        --d || e.resolveWith(f, [f])
                    };
                    for ("string" != typeof a && (b = a,
                    a = void 0),
                    a = a || "fx"; g--; )
                        (c = na._data(f[g], a + "queueHooks")) && c.empty && (d++,
                        c.empty.add(h));
                    return h(),
                    e.promise(b)
                }
            }),
            function() {
                var a;
                la.shrinkWrapBlocks = function() {
                    if (null != a)
                        return a;
                    a = !1;
                    var b, c, d;
                    return c = da.getElementsByTagName("body")[0],
                    c && c.style ? (b = da.createElement("div"),
                    d = da.createElement("div"),
                    d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    c.appendChild(d).appendChild(b),
                    void 0 !== b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    b.appendChild(da.createElement("div")).style.width = "5px",
                    a = 3 !== b.offsetWidth),
                    c.removeChild(d),
                    a) : void 0
                }
            }();
            var Ia = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
              , Ja = new RegExp("^(?:([+-])=|)(" + Ia + ")([a-z%]*)$","i")
              , Ka = ["Top", "Right", "Bottom", "Left"]
              , La = function(a, b) {
                return a = b || a,
                "none" === na.css(a, "display") || !na.contains(a.ownerDocument, a)
            }
              , Ma = function(a, b, c, d, e, f, g) {
                var h = 0
                  , i = a.length
                  , j = null == c;
                if ("object" === na.type(c)) {
                    e = !0;
                    for (h in c)
                        Ma(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0,
                na.isFunction(d) || (g = !0),
                j && (g ? (b.call(a, d),
                b = null) : (j = b,
                b = function(a, b, c) {
                    return j.call(na(a), c)
                }
                )),
                b))
                    for (; i > h; h++)
                        b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            }
              , Na = /^(?:checkbox|radio)$/i
              , Oa = /<([\w:-]+)/
              , Pa = /^$|\/(?:java|ecma)script/i
              , Qa = /^\s+/
              , Ra = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
            !function() {
                var a = da.createElement("div")
                  , b = da.createDocumentFragment()
                  , c = da.createElement("input");
                a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                la.leadingWhitespace = 3 === a.firstChild.nodeType,
                la.tbody = !a.getElementsByTagName("tbody").length,
                la.htmlSerialize = !!a.getElementsByTagName("link").length,
                la.html5Clone = "<:nav></:nav>" !== da.createElement("nav").cloneNode(!0).outerHTML,
                c.type = "checkbox",
                c.checked = !0,
                b.appendChild(c),
                la.appendChecked = c.checked,
                a.innerHTML = "<textarea>x</textarea>",
                la.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue,
                b.appendChild(a),
                c = da.createElement("input"),
                c.setAttribute("type", "radio"),
                c.setAttribute("checked", "checked"),
                c.setAttribute("name", "t"),
                a.appendChild(c),
                la.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
                la.noCloneEvent = !!a.addEventListener,
                a[na.expando] = 1,
                la.attributes = !a.getAttribute(na.expando)
            }();
            var Sa = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: la.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            };
            Sa.optgroup = Sa.option,
            Sa.tbody = Sa.tfoot = Sa.colgroup = Sa.caption = Sa.thead,
            Sa.th = Sa.td;
            var Ta = /<|&#?\w+;/
              , Ua = /<tbody/i;
            !function() {
                var b, c, d = da.createElement("div");
                for (b in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                })
                    c = "on" + b,
                    (la[b] = c in a) || (d.setAttribute(c, "t"),
                    la[b] = !1 === d.attributes[c].expando);
                d = null
            }();
            var Va = /^(?:input|select|textarea)$/i
              , Wa = /^key/
              , Xa = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
              , Ya = /^(?:focusinfocus|focusoutblur)$/
              , Za = /^([^.]*)(?:\.(.+)|)/;
            na.event = {
                global: {},
                add: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = na._data(a);
                    if (q) {
                        for (c.handler && (i = c,
                        c = i.handler,
                        e = i.selector),
                        c.guid || (c.guid = na.guid++),
                        (g = q.events) || (g = q.events = {}),
                        (k = q.handle) || (k = q.handle = function(a) {
                            return void 0 === na || a && na.event.triggered === a.type ? void 0 : na.event.dispatch.apply(k.elem, arguments)
                        }
                        ,
                        k.elem = a),
                        b = (b || "").match(Ca) || [""],
                        h = b.length; h--; )
                            f = Za.exec(b[h]) || [],
                            n = p = f[1],
                            o = (f[2] || "").split(".").sort(),
                            n && (j = na.event.special[n] || {},
                            n = (e ? j.delegateType : j.bindType) || n,
                            j = na.event.special[n] || {},
                            l = na.extend({
                                type: n,
                                origType: p,
                                data: d,
                                handler: c,
                                guid: c.guid,
                                selector: e,
                                needsContext: e && na.expr.match.needsContext.test(e),
                                namespace: o.join(".")
                            }, i),
                            (m = g[n]) || (m = g[n] = [],
                            m.delegateCount = 0,
                            j.setup && !1 !== j.setup.call(a, d, o, k) || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))),
                            j.add && (j.add.call(a, l),
                            l.handler.guid || (l.handler.guid = c.guid)),
                            e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                            na.event.global[n] = !0);
                        a = null
                    }
                },
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = na.hasData(a) && na._data(a);
                    if (q && (k = q.events)) {
                        for (b = (b || "").match(Ca) || [""],
                        j = b.length; j--; )
                            if (h = Za.exec(b[j]) || [],
                            n = p = h[1],
                            o = (h[2] || "").split(".").sort(),
                            n) {
                                for (l = na.event.special[n] || {},
                                n = (d ? l.delegateType : l.bindType) || n,
                                m = k[n] || [],
                                h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                i = f = m.length; f--; )
                                    g = m[f],
                                    !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1),
                                    g.selector && m.delegateCount--,
                                    l.remove && l.remove.call(a, g));
                                i && !m.length && (l.teardown && !1 !== l.teardown.call(a, o, q.handle) || na.removeEvent(a, n, q.handle),
                                delete k[n])
                            } else
                                for (n in k)
                                    na.event.remove(a, n + b[j], c, d, !0);
                        na.isEmptyObject(k) && (delete q.handle,
                        na._removeData(a, "events"))
                    }
                },
                trigger: function(b, c, d, e) {
                    var f, g, h, i, j, k, l, m = [d || da], n = ka.call(b, "type") ? b.type : b, o = ka.call(b, "namespace") ? b.namespace.split(".") : [];
                    if (h = k = d = d || da,
                    3 !== d.nodeType && 8 !== d.nodeType && !Ya.test(n + na.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."),
                    n = o.shift(),
                    o.sort()),
                    g = n.indexOf(":") < 0 && "on" + n,
                    b = b[na.expando] ? b : new na.Event(n,"object" == typeof b && b),
                    b.isTrigger = e ? 2 : 3,
                    b.namespace = o.join("."),
                    b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    b.result = void 0,
                    b.target || (b.target = d),
                    c = null == c ? [b] : na.makeArray(c, [b]),
                    j = na.event.special[n] || {},
                    e || !j.trigger || !1 !== j.trigger.apply(d, c))) {
                        if (!e && !j.noBubble && !na.isWindow(d)) {
                            for (i = j.delegateType || n,
                            Ya.test(i + n) || (h = h.parentNode); h; h = h.parentNode)
                                m.push(h),
                                k = h;
                            k === (d.ownerDocument || da) && m.push(k.defaultView || k.parentWindow || a)
                        }
                        for (l = 0; (h = m[l++]) && !b.isPropagationStopped(); )
                            b.type = l > 1 ? i : j.bindType || n,
                            f = (na._data(h, "events") || {})[b.type] && na._data(h, "handle"),
                            f && f.apply(h, c),
                            (f = g && h[g]) && f.apply && Fa(h) && (b.result = f.apply(h, c),
                            !1 === b.result && b.preventDefault());
                        if (b.type = n,
                        !e && !b.isDefaultPrevented() && (!j._default || !1 === j._default.apply(m.pop(), c)) && Fa(d) && g && d[n] && !na.isWindow(d)) {
                            k = d[g],
                            k && (d[g] = null),
                            na.event.triggered = n;
                            try {
                                d[n]()
                            } catch (a) {}
                            na.event.triggered = void 0,
                            k && (d[g] = k)
                        }
                        return b.result
                    }
                },
                dispatch: function(a) {
                    a = na.event.fix(a);
                    var b, c, d, e, f, g = [], h = ea.call(arguments), i = (na._data(this, "events") || {})[a.type] || [], j = na.event.special[a.type] || {};
                    if (h[0] = a,
                    a.delegateTarget = this,
                    !j.preDispatch || !1 !== j.preDispatch.call(this, a)) {
                        for (g = na.event.handlers.call(this, a, i),
                        b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
                            for (a.currentTarget = e.elem,
                            c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped(); )
                                a.rnamespace && !a.rnamespace.test(f.namespace) || (a.handleObj = f,
                                a.data = f.data,
                                void 0 !== (d = ((na.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h)) && !1 === (a.result = d) && (a.preventDefault(),
                                a.stopPropagation()));
                        return j.postDispatch && j.postDispatch.call(this, a),
                        a.result
                    }
                },
                handlers: function(a, b) {
                    var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
                    if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
                        for (; i != this; i = i.parentNode || this)
                            if (1 === i.nodeType && (!0 !== i.disabled || "click" !== a.type)) {
                                for (d = [],
                                c = 0; h > c; c++)
                                    f = b[c],
                                    e = f.selector + " ",
                                    void 0 === d[e] && (d[e] = f.needsContext ? na(e, this).index(i) > -1 : na.find(e, this, null, [i]).length),
                                    d[e] && d.push(f);
                                d.length && g.push({
                                    elem: i,
                                    handlers: d
                                })
                            }
                    return h < b.length && g.push({
                        elem: this,
                        handlers: b.slice(h)
                    }),
                    g
                },
                fix: function(a) {
                    if (a[na.expando])
                        return a;
                    var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
                    for (g || (this.fixHooks[e] = g = Xa.test(e) ? this.mouseHooks : Wa.test(e) ? this.keyHooks : {}),
                    d = g.props ? this.props.concat(g.props) : this.props,
                    a = new na.Event(f),
                    b = d.length; b--; )
                        c = d[b],
                        a[c] = f[c];
                    return a.target || (a.target = f.srcElement || da),
                    3 === a.target.nodeType && (a.target = a.target.parentNode),
                    a.metaKey = !!a.metaKey,
                    g.filter ? g.filter(a, f) : a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(a, b) {
                        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                        a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(a, b) {
                        var c, d, e, f = b.button, g = b.fromElement;
                        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || da,
                        e = d.documentElement,
                        c = d.body,
                        a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0),
                        a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)),
                        !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                        a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                        a
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== u() && this.focus)
                                try {
                                    return this.focus(),
                                    !1
                                } catch (a) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === u() && this.blur ? (this.blur(),
                            !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return na.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                            !1) : void 0
                        },
                        _default: function(a) {
                            return na.nodeName(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                },
                simulate: function(a, b, c) {
                    var d = na.extend(new na.Event, c, {
                        type: a,
                        isSimulated: !0
                    });
                    na.event.trigger(d, null, b),
                    d.isDefaultPrevented() && c.preventDefault()
                }
            },
            na.removeEvent = da.removeEventListener ? function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c)
            }
            : function(a, b, c) {
                var d = "on" + b;
                a.detachEvent && (void 0 === a[d] && (a[d] = null),
                a.detachEvent(d, c))
            }
            ,
            na.Event = function(a, b) {
                return this instanceof na.Event ? (a && a.type ? (this.originalEvent = a,
                this.type = a.type,
                this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? s : t) : this.type = a,
                b && na.extend(this, b),
                this.timeStamp = a && a.timeStamp || na.now(),
                void (this[na.expando] = !0)) : new na.Event(a,b)
            }
            ,
            na.Event.prototype = {
                constructor: na.Event,
                isDefaultPrevented: t,
                isPropagationStopped: t,
                isImmediatePropagationStopped: t,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = s,
                    a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = s,
                    a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(),
                    a.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = s,
                    a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
                    this.stopPropagation()
                }
            },
            na.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(a, b) {
                na.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, d = this, e = a.relatedTarget, f = a.handleObj;
                        return e && (e === d || na.contains(d, e)) || (a.type = f.origType,
                        c = f.handler.apply(this, arguments),
                        a.type = b),
                        c
                    }
                }
            }),
            la.submit || (na.event.special.submit = {
                setup: function() {
                    return !na.nodeName(this, "form") && void na.event.add(this, "click._submit keypress._submit", function(a) {
                        var b = a.target
                          , c = na.nodeName(b, "input") || na.nodeName(b, "button") ? na.prop(b, "form") : void 0;
                        c && !na._data(c, "submit") && (na.event.add(c, "submit._submit", function(a) {
                            a._submitBubble = !0
                        }),
                        na._data(c, "submit", !0))
                    })
                },
                postDispatch: function(a) {
                    a._submitBubble && (delete a._submitBubble,
                    this.parentNode && !a.isTrigger && na.event.simulate("submit", this.parentNode, a))
                },
                teardown: function() {
                    return !na.nodeName(this, "form") && void na.event.remove(this, "._submit")
                }
            }),
            la.change || (na.event.special.change = {
                setup: function() {
                    return Va.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (na.event.add(this, "propertychange._change", function(a) {
                        "checked" === a.originalEvent.propertyName && (this._justChanged = !0)
                    }),
                    na.event.add(this, "click._change", function(a) {
                        this._justChanged && !a.isTrigger && (this._justChanged = !1),
                        na.event.simulate("change", this, a)
                    })),
                    !1) : void na.event.add(this, "beforeactivate._change", function(a) {
                        var b = a.target;
                        Va.test(b.nodeName) && !na._data(b, "change") && (na.event.add(b, "change._change", function(a) {
                            !this.parentNode || a.isSimulated || a.isTrigger || na.event.simulate("change", this.parentNode, a)
                        }),
                        na._data(b, "change", !0))
                    })
                },
                handle: function(a) {
                    var b = a.target;
                    return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return na.event.remove(this, "._change"),
                    !Va.test(this.nodeName)
                }
            }),
            la.focusin || na.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, b) {
                var c = function(a) {
                    na.event.simulate(b, a.target, na.event.fix(a))
                };
                na.event.special[b] = {
                    setup: function() {
                        var d = this.ownerDocument || this
                          , e = na._data(d, b);
                        e || d.addEventListener(a, c, !0),
                        na._data(d, b, (e || 0) + 1)
                    },
                    teardown: function() {
                        var d = this.ownerDocument || this
                          , e = na._data(d, b) - 1;
                        e ? na._data(d, b, e) : (d.removeEventListener(a, c, !0),
                        na._removeData(d, b))
                    }
                }
            }),
            na.fn.extend({
                on: function(a, b, c, d) {
                    return v(this, a, b, c, d)
                },
                one: function(a, b, c, d) {
                    return v(this, a, b, c, d, 1)
                },
                off: function(a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj)
                        return d = a.handleObj,
                        na(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                        this;
                    if ("object" == typeof a) {
                        for (e in a)
                            this.off(e, b, a[e]);
                        return this
                    }
                    return !1 !== b && "function" != typeof b || (c = b,
                    b = void 0),
                    !1 === c && (c = t),
                    this.each(function() {
                        na.event.remove(this, a, c, b)
                    })
                },
                trigger: function(a, b) {
                    return this.each(function() {
                        na.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    var c = this[0];
                    return c ? na.event.trigger(a, b, c, !0) : void 0
                }
            });
            var $a = / jQuery\d+="(?:null|\d+)"/g
              , _a = new RegExp("<(?:" + Ra + ")[\\s/>]","i")
              , ab = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
              , bb = /<script|<style|<link/i
              , cb = /checked\s*(?:[^=]|=\s*.checked.)/i
              , db = /^true\/(.*)/
              , eb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
              , fb = n(da)
              , gb = fb.appendChild(da.createElement("div"));
            na.extend({
                htmlPrefilter: function(a) {
                    return a.replace(ab, "<$1></$2>")
                },
                clone: function(a, b, c) {
                    var d, e, f, g, h, i = na.contains(a.ownerDocument, a);
                    if (la.html5Clone || na.isXMLDoc(a) || !_a.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (gb.innerHTML = a.outerHTML,
                    gb.removeChild(f = gb.firstChild)),
                    !(la.noCloneEvent && la.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || na.isXMLDoc(a)))
                        for (d = o(f),
                        h = o(a),
                        g = 0; null != (e = h[g]); ++g)
                            d[g] && A(e, d[g]);
                    if (b)
                        if (c)
                            for (h = h || o(a),
                            d = d || o(f),
                            g = 0; null != (e = h[g]); g++)
                                z(e, d[g]);
                        else
                            z(a, f);
                    return d = o(f, "script"),
                    d.length > 0 && p(d, !i && o(a, "script")),
                    d = h = e = null,
                    f
                },
                cleanData: function(a, b) {
                    for (var c, d, e, f, g = 0, h = na.expando, i = na.cache, j = la.attributes, k = na.event.special; null != (c = a[g]); g++)
                        if ((b || Fa(c)) && (e = c[h],
                        f = e && i[e])) {
                            if (f.events)
                                for (d in f.events)
                                    k[d] ? na.event.remove(c, d) : na.removeEvent(c, d, f.handle);
                            i[e] && (delete i[e],
                            j || void 0 === c.removeAttribute ? c[h] = void 0 : c.removeAttribute(h),
                            ca.push(e))
                        }
                }
            }),
            na.fn.extend({
                domManip: B,
                detach: function(a) {
                    return C(this, a, !0)
                },
                remove: function(a) {
                    return C(this, a)
                },
                text: function(a) {
                    return Ma(this, function(a) {
                        return void 0 === a ? na.text(this) : this.empty().append((this[0] && this[0].ownerDocument || da).createTextNode(a))
                    }, null, a, arguments.length)
                },
                append: function() {
                    return B(this, arguments, function(a) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || w(this, a).appendChild(a)
                    })
                },
                prepend: function() {
                    return B(this, arguments, function(a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = w(this, a);
                            b.insertBefore(a, b.firstChild)
                        }
                    })
                },
                before: function() {
                    return B(this, arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this)
                    })
                },
                after: function() {
                    return B(this, arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var a, b = 0; null != (a = this[b]); b++) {
                        for (1 === a.nodeType && na.cleanData(o(a, !1)); a.firstChild; )
                            a.removeChild(a.firstChild);
                        a.options && na.nodeName(a, "select") && (a.options.length = 0)
                    }
                    return this
                },
                clone: function(a, b) {
                    return a = null != a && a,
                    b = null == b ? a : b,
                    this.map(function() {
                        return na.clone(this, a, b)
                    })
                },
                html: function(a) {
                    return Ma(this, function(a) {
                        var b = this[0] || {}
                          , c = 0
                          , d = this.length;
                        if (void 0 === a)
                            return 1 === b.nodeType ? b.innerHTML.replace($a, "") : void 0;
                        if ("string" == typeof a && !bb.test(a) && (la.htmlSerialize || !_a.test(a)) && (la.leadingWhitespace || !Qa.test(a)) && !Sa[(Oa.exec(a) || ["", ""])[1].toLowerCase()]) {
                            a = na.htmlPrefilter(a);
                            try {
                                for (; d > c; c++)
                                    b = this[c] || {},
                                    1 === b.nodeType && (na.cleanData(o(b, !1)),
                                    b.innerHTML = a);
                                b = 0
                            } catch (a) {}
                        }
                        b && this.empty().append(a)
                    }, null, a, arguments.length)
                },
                replaceWith: function() {
                    var a = [];
                    return B(this, arguments, function(b) {
                        var c = this.parentNode;
                        na.inArray(this, a) < 0 && (na.cleanData(o(this)),
                        c && c.replaceChild(b, this))
                    }, a)
                }
            }),
            na.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(a, b) {
                na.fn[a] = function(a) {
                    for (var c, d = 0, e = [], f = na(a), g = f.length - 1; g >= d; d++)
                        c = d === g ? this : this.clone(!0),
                        na(f[d])[b](c),
                        ga.apply(e, c.get());
                    return this.pushStack(e)
                }
            });
            var hb, ib = {
                HTML: "block",
                BODY: "block"
            }, jb = /^margin/, kb = new RegExp("^(" + Ia + ")(?!px)[a-z%]+$","i"), lb = function(a, b, c, d) {
                var e, f, g = {};
                for (f in b)
                    g[f] = a.style[f],
                    a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b)
                    a.style[f] = g[f];
                return e
            }, mb = da.documentElement;
            !function() {
                function b() {
                    var b, k, l = da.documentElement;
                    l.appendChild(i),
                    j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                    c = e = h = !1,
                    d = g = !0,
                    a.getComputedStyle && (k = a.getComputedStyle(j),
                    c = "1%" !== (k || {}).top,
                    h = "2px" === (k || {}).marginLeft,
                    e = "4px" === (k || {
                        width: "4px"
                    }).width,
                    j.style.marginRight = "50%",
                    d = "4px" === (k || {
                        marginRight: "4px"
                    }).marginRight,
                    b = j.appendChild(da.createElement("div")),
                    b.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                    b.style.marginRight = b.style.width = "0",
                    j.style.width = "1px",
                    g = !parseFloat((a.getComputedStyle(b) || {}).marginRight),
                    j.removeChild(b)),
                    j.style.display = "none",
                    f = 0 === j.getClientRects().length,
                    f && (j.style.display = "",
                    j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                    j.childNodes[0].style.borderCollapse = "separate",
                    b = j.getElementsByTagName("td"),
                    b[0].style.cssText = "margin:0;border:0;padding:0;display:none",
                    (f = 0 === b[0].offsetHeight) && (b[0].style.display = "",
                    b[1].style.display = "none",
                    f = 0 === b[0].offsetHeight)),
                    l.removeChild(i)
                }
                var c, d, e, f, g, h, i = da.createElement("div"), j = da.createElement("div");
                j.style && (j.style.cssText = "float:left;opacity:.5",
                la.opacity = "0.5" === j.style.opacity,
                la.cssFloat = !!j.style.cssFloat,
                j.style.backgroundClip = "content-box",
                j.cloneNode(!0).style.backgroundClip = "",
                la.clearCloneStyle = "content-box" === j.style.backgroundClip,
                i = da.createElement("div"),
                i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
                j.innerHTML = "",
                i.appendChild(j),
                la.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing,
                na.extend(la, {
                    reliableHiddenOffsets: function() {
                        return null == c && b(),
                        f
                    },
                    boxSizingReliable: function() {
                        return null == c && b(),
                        e
                    },
                    pixelMarginRight: function() {
                        return null == c && b(),
                        d
                    },
                    pixelPosition: function() {
                        return null == c && b(),
                        c
                    },
                    reliableMarginRight: function() {
                        return null == c && b(),
                        g
                    },
                    reliableMarginLeft: function() {
                        return null == c && b(),
                        h
                    }
                }))
            }();
            var nb, ob, pb = /^(top|right|bottom|left)$/;
            a.getComputedStyle ? (nb = function(b) {
                var c = b.ownerDocument.defaultView;
                return c && c.opener || (c = a),
                c.getComputedStyle(b)
            }
            ,
            ob = function(a, b, c) {
                var d, e, f, g, h = a.style;
                return c = c || nb(a),
                g = c ? c.getPropertyValue(b) || c[b] : void 0,
                "" !== g && void 0 !== g || na.contains(a.ownerDocument, a) || (g = na.style(a, b)),
                c && !la.pixelMarginRight() && kb.test(g) && jb.test(b) && (d = h.width,
                e = h.minWidth,
                f = h.maxWidth,
                h.minWidth = h.maxWidth = h.width = g,
                g = c.width,
                h.width = d,
                h.minWidth = e,
                h.maxWidth = f),
                void 0 === g ? g : g + ""
            }
            ) : mb.currentStyle && (nb = function(a) {
                return a.currentStyle
            }
            ,
            ob = function(a, b, c) {
                var d, e, f, g, h = a.style;
                return c = c || nb(a),
                g = c ? c[b] : void 0,
                null == g && h && h[b] && (g = h[b]),
                kb.test(g) && !pb.test(b) && (d = h.left,
                e = a.runtimeStyle,
                f = e && e.left,
                f && (e.left = a.currentStyle.left),
                h.left = "fontSize" === b ? "1em" : g,
                g = h.pixelLeft + "px",
                h.left = d,
                f && (e.left = f)),
                void 0 === g ? g : g + "" || "auto"
            }
            );
            var qb = /alpha\([^)]*\)/i
              , rb = /opacity\s*=\s*([^)]*)/i
              , sb = /^(none|table(?!-c[ea]).+)/
              , tb = new RegExp("^(" + Ia + ")(.*)$","i")
              , ub = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }
              , vb = {
                letterSpacing: "0",
                fontWeight: "400"
            }
              , wb = ["Webkit", "O", "Moz", "ms"]
              , xb = da.createElement("div").style;
            na.extend({
                cssHooks: {
                    opacity: {
                        get: function(a, b) {
                            if (b) {
                                var c = ob(a, "opacity");
                                return "" === c ? "1" : c
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    float: la.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(a, b, c, d) {
                    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                        var e, f, g, h = na.camelCase(b), i = a.style;
                        if (b = na.cssProps[h] || (na.cssProps[h] = G(h) || h),
                        g = na.cssHooks[b] || na.cssHooks[h],
                        void 0 === c)
                            return g && "get"in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                        if (f = typeof c,
                        "string" === f && (e = Ja.exec(c)) && e[1] && (c = m(a, b, e),
                        f = "number"),
                        null != c && c === c && ("number" === f && (c += e && e[3] || (na.cssNumber[h] ? "" : "px")),
                        la.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"),
                        !(g && "set"in g && void 0 === (c = g.set(a, c, d)))))
                            try {
                                i[b] = c
                            } catch (a) {}
                    }
                },
                css: function(a, b, c, d) {
                    var e, f, g, h = na.camelCase(b);
                    return b = na.cssProps[h] || (na.cssProps[h] = G(h) || h),
                    g = na.cssHooks[b] || na.cssHooks[h],
                    g && "get"in g && (f = g.get(a, !0, c)),
                    void 0 === f && (f = ob(a, b, d)),
                    "normal" === f && b in vb && (f = vb[b]),
                    "" === c || c ? (e = parseFloat(f),
                    !0 === c || isFinite(e) ? e || 0 : f) : f
                }
            }),
            na.each(["height", "width"], function(a, b) {
                na.cssHooks[b] = {
                    get: function(a, c, d) {
                        return c ? sb.test(na.css(a, "display")) && 0 === a.offsetWidth ? lb(a, ub, function() {
                            return K(a, b, d)
                        }) : K(a, b, d) : void 0
                    },
                    set: function(a, c, d) {
                        var e = d && nb(a);
                        return I(a, c, d ? J(a, b, d, la.boxSizing && "border-box" === na.css(a, "boxSizing", !1, e), e) : 0)
                    }
                }
            }),
            la.opacity || (na.cssHooks.opacity = {
                get: function(a, b) {
                    return rb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
                },
                set: function(a, b) {
                    var c = a.style
                      , d = a.currentStyle
                      , e = na.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : ""
                      , f = d && d.filter || c.filter || "";
                    c.zoom = 1,
                    (b >= 1 || "" === b) && "" === na.trim(f.replace(qb, "")) && c.removeAttribute && (c.removeAttribute("filter"),
                    "" === b || d && !d.filter) || (c.filter = qb.test(f) ? f.replace(qb, e) : f + " " + e)
                }
            }),
            na.cssHooks.marginRight = F(la.reliableMarginRight, function(a, b) {
                return b ? lb(a, {
                    display: "inline-block"
                }, ob, [a, "marginRight"]) : void 0
            }),
            na.cssHooks.marginLeft = F(la.reliableMarginLeft, function(a, b) {
                return b ? (parseFloat(ob(a, "marginLeft")) || (na.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - lb(a, {
                    marginLeft: 0
                }, function() {
                    return a.getBoundingClientRect().left
                }) : 0)) + "px" : void 0
            }),
            na.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(a, b) {
                na.cssHooks[a + b] = {
                    expand: function(c) {
                        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                            e[a + Ka[d] + b] = f[d] || f[d - 2] || f[0];
                        return e
                    }
                },
                jb.test(a) || (na.cssHooks[a + b].set = I)
            }),
            na.fn.extend({
                css: function(a, b) {
                    return Ma(this, function(a, b, c) {
                        var d, e, f = {}, g = 0;
                        if (na.isArray(b)) {
                            for (d = nb(a),
                            e = b.length; e > g; g++)
                                f[b[g]] = na.css(a, b[g], !1, d);
                            return f
                        }
                        return void 0 !== c ? na.style(a, b, c) : na.css(a, b)
                    }, a, b, arguments.length > 1)
                },
                show: function() {
                    return H(this, !0)
                },
                hide: function() {
                    return H(this)
                },
                toggle: function(a) {
                    return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                        La(this) ? na(this).show() : na(this).hide()
                    })
                }
            }),
            na.Tween = L,
            L.prototype = {
                constructor: L,
                init: function(a, b, c, d, e, f) {
                    this.elem = a,
                    this.prop = c,
                    this.easing = e || na.easing._default,
                    this.options = b,
                    this.start = this.now = this.cur(),
                    this.end = d,
                    this.unit = f || (na.cssNumber[c] ? "" : "px")
                },
                cur: function() {
                    var a = L.propHooks[this.prop];
                    return a && a.get ? a.get(this) : L.propHooks._default.get(this)
                },
                run: function(a) {
                    var b, c = L.propHooks[this.prop];
                    return this.options.duration ? this.pos = b = na.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a,
                    this.now = (this.end - this.start) * b + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    c && c.set ? c.set(this) : L.propHooks._default.set(this),
                    this
                }
            },
            L.prototype.init.prototype = L.prototype,
            L.propHooks = {
                _default: {
                    get: function(a) {
                        var b;
                        return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = na.css(a.elem, a.prop, ""),
                        b && "auto" !== b ? b : 0)
                    },
                    set: function(a) {
                        na.fx.step[a.prop] ? na.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[na.cssProps[a.prop]] && !na.cssHooks[a.prop] ? a.elem[a.prop] = a.now : na.style(a.elem, a.prop, a.now + a.unit)
                    }
                }
            },
            L.propHooks.scrollTop = L.propHooks.scrollLeft = {
                set: function(a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            },
            na.easing = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                },
                _default: "swing"
            },
            na.fx = L.prototype.init,
            na.fx.step = {};
            var yb, zb, Ab = /^(?:toggle|show|hide)$/, Bb = /queueHooks$/;
            na.Animation = na.extend(R, {
                tweeners: {
                    "*": [function(a, b) {
                        var c = this.createTween(a, b);
                        return m(c.elem, a, Ja.exec(b), c),
                        c
                    }
                    ]
                },
                tweener: function(a, b) {
                    na.isFunction(a) ? (b = a,
                    a = ["*"]) : a = a.match(Ca);
                    for (var c, d = 0, e = a.length; e > d; d++)
                        c = a[d],
                        R.tweeners[c] = R.tweeners[c] || [],
                        R.tweeners[c].unshift(b)
                },
                prefilters: [P],
                prefilter: function(a, b) {
                    b ? R.prefilters.unshift(a) : R.prefilters.push(a)
                }
            }),
            na.speed = function(a, b, c) {
                var d = a && "object" == typeof a ? na.extend({}, a) : {
                    complete: c || !c && b || na.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !na.isFunction(b) && b
                };
                return d.duration = na.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in na.fx.speeds ? na.fx.speeds[d.duration] : na.fx.speeds._default,
                null != d.queue && !0 !== d.queue || (d.queue = "fx"),
                d.old = d.complete,
                d.complete = function() {
                    na.isFunction(d.old) && d.old.call(this),
                    d.queue && na.dequeue(this, d.queue)
                }
                ,
                d
            }
            ,
            na.fn.extend({
                fadeTo: function(a, b, c, d) {
                    return this.filter(La).css("opacity", 0).show().end().animate({
                        opacity: b
                    }, a, c, d)
                },
                animate: function(a, b, c, d) {
                    var e = na.isEmptyObject(a)
                      , f = na.speed(b, c, d)
                      , g = function() {
                        var b = R(this, na.extend({}, a), f);
                        (e || na._data(this, "finish")) && b.stop(!0)
                    };
                    return g.finish = g,
                    e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, b, c) {
                    var d = function(a) {
                        var b = a.stop;
                        delete a.stop,
                        b(c)
                    };
                    return "string" != typeof a && (c = b,
                    b = a,
                    a = void 0),
                    b && !1 !== a && this.queue(a || "fx", []),
                    this.each(function() {
                        var b = !0
                          , e = null != a && a + "queueHooks"
                          , f = na.timers
                          , g = na._data(this);
                        if (e)
                            g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g)
                                g[e] && g[e].stop && Bb.test(e) && d(g[e]);
                        for (e = f.length; e--; )
                            f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c),
                            b = !1,
                            f.splice(e, 1));
                        !b && c || na.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return !1 !== a && (a = a || "fx"),
                    this.each(function() {
                        var b, c = na._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = na.timers, g = d ? d.length : 0;
                        for (c.finish = !0,
                        na.queue(this, a, []),
                        e && e.stop && e.stop.call(this, !0),
                        b = f.length; b--; )
                            f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
                            f.splice(b, 1));
                        for (b = 0; g > b; b++)
                            d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }),
            na.each(["toggle", "show", "hide"], function(a, b) {
                var c = na.fn[b];
                na.fn[b] = function(a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(N(b, !0), a, d, e)
                }
            }),
            na.each({
                slideDown: N("show"),
                slideUp: N("hide"),
                slideToggle: N("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(a, b) {
                na.fn[a] = function(a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }),
            na.timers = [],
            na.fx.tick = function() {
                var a, b = na.timers, c = 0;
                for (yb = na.now(); c < b.length; c++)
                    (a = b[c])() || b[c] !== a || b.splice(c--, 1);
                b.length || na.fx.stop(),
                yb = void 0
            }
            ,
            na.fx.timer = function(a) {
                na.timers.push(a),
                a() ? na.fx.start() : na.timers.pop()
            }
            ,
            na.fx.interval = 13,
            na.fx.start = function() {
                zb || (zb = a.setInterval(na.fx.tick, na.fx.interval))
            }
            ,
            na.fx.stop = function() {
                a.clearInterval(zb),
                zb = null
            }
            ,
            na.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            na.fn.delay = function(b, c) {
                return b = na.fx ? na.fx.speeds[b] || b : b,
                c = c || "fx",
                this.queue(c, function(c, d) {
                    var e = a.setTimeout(c, b);
                    d.stop = function() {
                        a.clearTimeout(e)
                    }
                })
            }
            ,
            function() {
                var a, b = da.createElement("input"), c = da.createElement("div"), d = da.createElement("select"), e = d.appendChild(da.createElement("option"));
                c = da.createElement("div"),
                c.setAttribute("className", "t"),
                c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                a = c.getElementsByTagName("a")[0],
                b.setAttribute("type", "checkbox"),
                c.appendChild(b),
                a = c.getElementsByTagName("a")[0],
                a.style.cssText = "top:1px",
                la.getSetAttribute = "t" !== c.className,
                la.style = /top/.test(a.getAttribute("style")),
                la.hrefNormalized = "/a" === a.getAttribute("href"),
                la.checkOn = !!b.value,
                la.optSelected = e.selected,
                la.enctype = !!da.createElement("form").enctype,
                d.disabled = !0,
                la.optDisabled = !e.disabled,
                b = da.createElement("input"),
                b.setAttribute("value", ""),
                la.input = "" === b.getAttribute("value"),
                b.value = "t",
                b.setAttribute("type", "radio"),
                la.radioValue = "t" === b.value
            }();
            var Cb = /\r/g
              , Db = /[\x20\t\r\n\f]+/g;
            na.fn.extend({
                val: function(a) {
                    var b, c, d, e = this[0];
                    return arguments.length ? (d = na.isFunction(a),
                    this.each(function(c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, na(this).val()) : a,
                        null == e ? e = "" : "number" == typeof e ? e += "" : na.isArray(e) && (e = na.map(e, function(a) {
                            return null == a ? "" : a + ""
                        })),
                        (b = na.valHooks[this.type] || na.valHooks[this.nodeName.toLowerCase()]) && "set"in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    })) : e ? (b = na.valHooks[e.type] || na.valHooks[e.nodeName.toLowerCase()],
                    b && "get"in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value,
                    "string" == typeof c ? c.replace(Cb, "") : null == c ? "" : c)) : void 0
                }
            }),
            na.extend({
                valHooks: {
                    option: {
                        get: function(a) {
                            var b = na.find.attr(a, "value");
                            return null != b ? b : na.trim(na.text(a)).replace(Db, " ")
                        }
                    },
                    select: {
                        get: function(a) {
                            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                                if (c = d[i],
                                (c.selected || i === e) && (la.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !na.nodeName(c.parentNode, "optgroup"))) {
                                    if (b = na(c).val(),
                                    f)
                                        return b;
                                    g.push(b)
                                }
                            return g
                        },
                        set: function(a, b) {
                            for (var c, d, e = a.options, f = na.makeArray(b), g = e.length; g--; )
                                if (d = e[g],
                                na.inArray(na.valHooks.option.get(d), f) > -1)
                                    try {
                                        d.selected = c = !0
                                    } catch (a) {
                                        d.scrollHeight
                                    }
                                else
                                    d.selected = !1;
                            return c || (a.selectedIndex = -1),
                            e
                        }
                    }
                }
            }),
            na.each(["radio", "checkbox"], function() {
                na.valHooks[this] = {
                    set: function(a, b) {
                        return na.isArray(b) ? a.checked = na.inArray(na(a).val(), b) > -1 : void 0
                    }
                },
                la.checkOn || (na.valHooks[this].get = function(a) {
                    return null === a.getAttribute("value") ? "on" : a.value
                }
                )
            });
            var Eb, Fb, Gb = na.expr.attrHandle, Hb = /^(?:checked|selected)$/i, Ib = la.getSetAttribute, Jb = la.input;
            na.fn.extend({
                attr: function(a, b) {
                    return Ma(this, na.attr, a, b, arguments.length > 1)
                },
                removeAttr: function(a) {
                    return this.each(function() {
                        na.removeAttr(this, a)
                    })
                }
            }),
            na.extend({
                attr: function(a, b, c) {
                    var d, e, f = a.nodeType;
                    if (3 !== f && 8 !== f && 2 !== f)
                        return void 0 === a.getAttribute ? na.prop(a, b, c) : (1 === f && na.isXMLDoc(a) || (b = b.toLowerCase(),
                        e = na.attrHooks[b] || (na.expr.match.bool.test(b) ? Fb : Eb)),
                        void 0 !== c ? null === c ? void na.removeAttr(a, b) : e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""),
                        c) : e && "get"in e && null !== (d = e.get(a, b)) ? d : (d = na.find.attr(a, b),
                        null == d ? void 0 : d))
                },
                attrHooks: {
                    type: {
                        set: function(a, b) {
                            if (!la.radioValue && "radio" === b && na.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b),
                                c && (a.value = c),
                                b
                            }
                        }
                    }
                },
                removeAttr: function(a, b) {
                    var c, d, e = 0, f = b && b.match(Ca);
                    if (f && 1 === a.nodeType)
                        for (; c = f[e++]; )
                            d = na.propFix[c] || c,
                            na.expr.match.bool.test(c) ? Jb && Ib || !Hb.test(c) ? a[d] = !1 : a[na.camelCase("default-" + c)] = a[d] = !1 : na.attr(a, c, ""),
                            a.removeAttribute(Ib ? c : d)
                }
            }),
            Fb = {
                set: function(a, b, c) {
                    return !1 === b ? na.removeAttr(a, c) : Jb && Ib || !Hb.test(c) ? a.setAttribute(!Ib && na.propFix[c] || c, c) : a[na.camelCase("default-" + c)] = a[c] = !0,
                    c
                }
            },
            na.each(na.expr.match.bool.source.match(/\w+/g), function(a, b) {
                var c = Gb[b] || na.find.attr;
                Jb && Ib || !Hb.test(b) ? Gb[b] = function(a, b, d) {
                    var e, f;
                    return d || (f = Gb[b],
                    Gb[b] = e,
                    e = null != c(a, b, d) ? b.toLowerCase() : null,
                    Gb[b] = f),
                    e
                }
                : Gb[b] = function(a, b, c) {
                    return c ? void 0 : a[na.camelCase("default-" + b)] ? b.toLowerCase() : null
                }
            }),
            Jb && Ib || (na.attrHooks.value = {
                set: function(a, b, c) {
                    return na.nodeName(a, "input") ? void (a.defaultValue = b) : Eb && Eb.set(a, b, c)
                }
            }),
            Ib || (Eb = {
                set: function(a, b, c) {
                    var d = a.getAttributeNode(c);
                    return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)),
                    d.value = b += "",
                    "value" === c || b === a.getAttribute(c) ? b : void 0
                }
            },
            Gb.id = Gb.name = Gb.coords = function(a, b, c) {
                var d;
                return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
            }
            ,
            na.valHooks.button = {
                get: function(a, b) {
                    var c = a.getAttributeNode(b);
                    return c && c.specified ? c.value : void 0
                },
                set: Eb.set
            },
            na.attrHooks.contenteditable = {
                set: function(a, b, c) {
                    Eb.set(a, "" !== b && b, c)
                }
            },
            na.each(["width", "height"], function(a, b) {
                na.attrHooks[b] = {
                    set: function(a, c) {
                        return "" === c ? (a.setAttribute(b, "auto"),
                        c) : void 0
                    }
                }
            })),
            la.style || (na.attrHooks.style = {
                get: function(a) {
                    return a.style.cssText || void 0
                },
                set: function(a, b) {
                    return a.style.cssText = b + ""
                }
            });
            var Kb = /^(?:input|select|textarea|button|object)$/i
              , Lb = /^(?:a|area)$/i;
            na.fn.extend({
                prop: function(a, b) {
                    return Ma(this, na.prop, a, b, arguments.length > 1)
                },
                removeProp: function(a) {
                    return a = na.propFix[a] || a,
                    this.each(function() {
                        try {
                            this[a] = void 0,
                            delete this[a]
                        } catch (a) {}
                    })
                }
            }),
            na.extend({
                prop: function(a, b, c) {
                    var d, e, f = a.nodeType;
                    if (3 !== f && 8 !== f && 2 !== f)
                        return 1 === f && na.isXMLDoc(a) || (b = na.propFix[b] || b,
                        e = na.propHooks[b]),
                        void 0 !== c ? e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get"in e && null !== (d = e.get(a, b)) ? d : a[b]
                },
                propHooks: {
                    tabIndex: {
                        get: function(a) {
                            var b = na.find.attr(a, "tabindex");
                            return b ? parseInt(b, 10) : Kb.test(a.nodeName) || Lb.test(a.nodeName) && a.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }),
            la.hrefNormalized || na.each(["href", "src"], function(a, b) {
                na.propHooks[b] = {
                    get: function(a) {
                        return a.getAttribute(b, 4)
                    }
                }
            }),
            la.optSelected || (na.propHooks.selected = {
                get: function(a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex,
                    b.parentNode && b.parentNode.selectedIndex),
                    null
                },
                set: function(a) {
                    var b = a.parentNode;
                    b && (b.selectedIndex,
                    b.parentNode && b.parentNode.selectedIndex)
                }
            }),
            na.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                na.propFix[this.toLowerCase()] = this
            }),
            la.enctype || (na.propFix.enctype = "encoding");
            var Mb = /[\t\r\n\f]/g;
            na.fn.extend({
                addClass: function(a) {
                    var b, c, d, e, f, g, h, i = 0;
                    if (na.isFunction(a))
                        return this.each(function(b) {
                            na(this).addClass(a.call(this, b, S(this)))
                        });
                    if ("string" == typeof a && a)
                        for (b = a.match(Ca) || []; c = this[i++]; )
                            if (e = S(c),
                            d = 1 === c.nodeType && (" " + e + " ").replace(Mb, " ")) {
                                for (g = 0; f = b[g++]; )
                                    d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                                h = na.trim(d),
                                e !== h && na.attr(c, "class", h)
                            }
                    return this
                },
                removeClass: function(a) {
                    var b, c, d, e, f, g, h, i = 0;
                    if (na.isFunction(a))
                        return this.each(function(b) {
                            na(this).removeClass(a.call(this, b, S(this)))
                        });
                    if (!arguments.length)
                        return this.attr("class", "");
                    if ("string" == typeof a && a)
                        for (b = a.match(Ca) || []; c = this[i++]; )
                            if (e = S(c),
                            d = 1 === c.nodeType && (" " + e + " ").replace(Mb, " ")) {
                                for (g = 0; f = b[g++]; )
                                    for (; d.indexOf(" " + f + " ") > -1; )
                                        d = d.replace(" " + f + " ", " ");
                                h = na.trim(d),
                                e !== h && na.attr(c, "class", h)
                            }
                    return this
                },
                toggleClass: function(a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : na.isFunction(a) ? this.each(function(c) {
                        na(this).toggleClass(a.call(this, c, S(this), b), b)
                    }) : this.each(function() {
                        var b, d, e, f;
                        if ("string" === c)
                            for (d = 0,
                            e = na(this),
                            f = a.match(Ca) || []; b = f[d++]; )
                                e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                        else
                            void 0 !== a && "boolean" !== c || (b = S(this),
                            b && na._data(this, "__className__", b),
                            na.attr(this, "class", b || !1 === a ? "" : na._data(this, "__className__") || ""))
                    })
                },
                hasClass: function(a) {
                    var b, c, d = 0;
                    for (b = " " + a + " "; c = this[d++]; )
                        if (1 === c.nodeType && (" " + S(c) + " ").replace(Mb, " ").indexOf(b) > -1)
                            return !0;
                    return !1
                }
            }),
            na.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
                na.fn[b] = function(a, c) {
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }
            }),
            na.fn.extend({
                hover: function(a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                }
            });
            var Nb = a.location
              , Ob = na.now()
              , Pb = /\?/
              , Qb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            na.parseJSON = function(b) {
                if (a.JSON && a.JSON.parse)
                    return a.JSON.parse(b + "");
                var c, d = null, e = na.trim(b + "");
                return e && !na.trim(e.replace(Qb, function(a, b, e, f) {
                    return c && b && (d = 0),
                    0 === d ? a : (c = e || b,
                    d += !f - !e,
                    "")
                })) ? Function("return " + e)() : na.error("Invalid JSON: " + b)
            }
            ,
            na.parseXML = function(b) {
                var c, d;
                if (!b || "string" != typeof b)
                    return null;
                try {
                    a.DOMParser ? (d = new a.DOMParser,
                    c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"),
                    c.async = "false",
                    c.loadXML(b))
                } catch (a) {
                    c = void 0
                }
                return c && c.documentElement && !c.getElementsByTagName("parsererror").length || na.error("Invalid XML: " + b),
                c
            }
            ;
            var Rb = /#.*$/
              , Sb = /([?&])_=[^&]*/
              , Tb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
              , Ub = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
              , Vb = /^(?:GET|HEAD)$/
              , Wb = /^\/\//
              , Xb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
              , Yb = {}
              , Zb = {}
              , $b = "*/".concat("*")
              , _b = Nb.href
              , ac = Xb.exec(_b.toLowerCase()) || [];
            na.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: _b,
                    type: "GET",
                    isLocal: Ub.test(ac[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": $b,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": na.parseJSON,
                        "text xml": na.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(a, b) {
                    return b ? V(V(a, na.ajaxSettings), b) : V(na.ajaxSettings, a)
                },
                ajaxPrefilter: T(Yb),
                ajaxTransport: T(Zb),
                ajax: function(b, c) {
                    function d(b, c, d, e) {
                        var f, l, s, t, v, x = c;
                        2 !== u && (u = 2,
                        i && a.clearTimeout(i),
                        k = void 0,
                        h = e || "",
                        w.readyState = b > 0 ? 4 : 0,
                        f = b >= 200 && 300 > b || 304 === b,
                        d && (t = W(m, w, d)),
                        t = X(m, t, w, f),
                        f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"),
                        v && (na.lastModified[g] = v),
                        (v = w.getResponseHeader("etag")) && (na.etag[g] = v)),
                        204 === b || "HEAD" === m.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = t.state,
                        l = t.data,
                        s = t.error,
                        f = !s)) : (s = x,
                        !b && x || (x = "error",
                        0 > b && (b = 0))),
                        w.status = b,
                        w.statusText = (c || x) + "",
                        f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]),
                        w.statusCode(r),
                        r = void 0,
                        j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]),
                        q.fireWith(n, [w, x]),
                        j && (o.trigger("ajaxComplete", [w, m]),
                        --na.active || na.event.trigger("ajaxStop")))
                    }
                    "object" == typeof b && (c = b,
                    b = void 0),
                    c = c || {};
                    var e, f, g, h, i, j, k, l, m = na.ajaxSetup({}, c), n = m.context || m, o = m.context && (n.nodeType || n.jquery) ? na(n) : na.event, p = na.Deferred(), q = na.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                        readyState: 0,
                        getResponseHeader: function(a) {
                            var b;
                            if (2 === u) {
                                if (!l)
                                    for (l = {}; b = Tb.exec(h); )
                                        l[b[1].toLowerCase()] = b[2];
                                b = l[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function() {
                            return 2 === u ? h : null
                        },
                        setRequestHeader: function(a, b) {
                            var c = a.toLowerCase();
                            return u || (a = t[c] = t[c] || a,
                            s[a] = b),
                            this
                        },
                        overrideMimeType: function(a) {
                            return u || (m.mimeType = a),
                            this
                        },
                        statusCode: function(a) {
                            var b;
                            if (a)
                                if (2 > u)
                                    for (b in a)
                                        r[b] = [r[b], a[b]];
                                else
                                    w.always(a[w.status]);
                            return this
                        },
                        abort: function(a) {
                            var b = a || v;
                            return k && k.abort(b),
                            d(0, b),
                            this
                        }
                    };
                    if (p.promise(w).complete = q.add,
                    w.success = w.done,
                    w.error = w.fail,
                    m.url = ((b || m.url || _b) + "").replace(Rb, "").replace(Wb, ac[1] + "//"),
                    m.type = c.method || c.type || m.method || m.type,
                    m.dataTypes = na.trim(m.dataType || "*").toLowerCase().match(Ca) || [""],
                    null == m.crossDomain && (e = Xb.exec(m.url.toLowerCase()),
                    m.crossDomain = !(!e || e[1] === ac[1] && e[2] === ac[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (ac[3] || ("http:" === ac[1] ? "80" : "443")))),
                    m.data && m.processData && "string" != typeof m.data && (m.data = na.param(m.data, m.traditional)),
                    U(Yb, m, c, w),
                    2 === u)
                        return w;
                    j = na.event && m.global,
                    j && 0 == na.active++ && na.event.trigger("ajaxStart"),
                    m.type = m.type.toUpperCase(),
                    m.hasContent = !Vb.test(m.type),
                    g = m.url,
                    m.hasContent || (m.data && (g = m.url += (Pb.test(g) ? "&" : "?") + m.data,
                    delete m.data),
                    !1 === m.cache && (m.url = Sb.test(g) ? g.replace(Sb, "$1_=" + Ob++) : g + (Pb.test(g) ? "&" : "?") + "_=" + Ob++)),
                    m.ifModified && (na.lastModified[g] && w.setRequestHeader("If-Modified-Since", na.lastModified[g]),
                    na.etag[g] && w.setRequestHeader("If-None-Match", na.etag[g])),
                    (m.data && m.hasContent && !1 !== m.contentType || c.contentType) && w.setRequestHeader("Content-Type", m.contentType),
                    w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + $b + "; q=0.01" : "") : m.accepts["*"]);
                    for (f in m.headers)
                        w.setRequestHeader(f, m.headers[f]);
                    if (m.beforeSend && (!1 === m.beforeSend.call(n, w, m) || 2 === u))
                        return w.abort();
                    v = "abort";
                    for (f in {
                        success: 1,
                        error: 1,
                        complete: 1
                    })
                        w[f](m[f]);
                    if (k = U(Zb, m, c, w)) {
                        if (w.readyState = 1,
                        j && o.trigger("ajaxSend", [w, m]),
                        2 === u)
                            return w;
                        m.async && m.timeout > 0 && (i = a.setTimeout(function() {
                            w.abort("timeout")
                        }, m.timeout));
                        try {
                            u = 1,
                            k.send(s, d)
                        } catch (a) {
                            if (!(2 > u))
                                throw a;
                            d(-1, a)
                        }
                    } else
                        d(-1, "No Transport");
                    return w
                },
                getJSON: function(a, b, c) {
                    return na.get(a, b, c, "json")
                },
                getScript: function(a, b) {
                    return na.get(a, void 0, b, "script")
                }
            }),
            na.each(["get", "post"], function(a, b) {
                na[b] = function(a, c, d, e) {
                    return na.isFunction(c) && (e = e || d,
                    d = c,
                    c = void 0),
                    na.ajax(na.extend({
                        url: a,
                        type: b,
                        dataType: e,
                        data: c,
                        success: d
                    }, na.isPlainObject(a) && a))
                }
            }),
            na._evalUrl = function(a) {
                return na.ajax({
                    url: a,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    throws: !0
                })
            }
            ,
            na.fn.extend({
                wrapAll: function(a) {
                    if (na.isFunction(a))
                        return this.each(function(b) {
                            na(this).wrapAll(a.call(this, b))
                        });
                    if (this[0]) {
                        var b = na(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]),
                        b.map(function() {
                            for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
                                a = a.firstChild;
                            return a
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(a) {
                    return na.isFunction(a) ? this.each(function(b) {
                        na(this).wrapInner(a.call(this, b))
                    }) : this.each(function() {
                        var b = na(this)
                          , c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function(a) {
                    var b = na.isFunction(a);
                    return this.each(function(c) {
                        na(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        na.nodeName(this, "body") || na(this).replaceWith(this.childNodes)
                    }).end()
                }
            }),
            na.expr.filters.hidden = function(a) {
                return la.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Z(a)
            }
            ,
            na.expr.filters.visible = function(a) {
                return !na.expr.filters.hidden(a)
            }
            ;
            var bc = /%20/g
              , cc = /\[\]$/
              , dc = /\r?\n/g
              , ec = /^(?:submit|button|image|reset|file)$/i
              , fc = /^(?:input|select|textarea|keygen)/i;
            na.param = function(a, b) {
                var c, d = [], e = function(a, b) {
                    b = na.isFunction(b) ? b() : null == b ? "" : b,
                    d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
                if (void 0 === b && (b = na.ajaxSettings && na.ajaxSettings.traditional),
                na.isArray(a) || a.jquery && !na.isPlainObject(a))
                    na.each(a, function() {
                        e(this.name, this.value)
                    });
                else
                    for (c in a)
                        $(c, a[c], b, e);
                return d.join("&").replace(bc, "+")
            }
            ,
            na.fn.extend({
                serialize: function() {
                    return na.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var a = na.prop(this, "elements");
                        return a ? na.makeArray(a) : this
                    }).filter(function() {
                        var a = this.type;
                        return this.name && !na(this).is(":disabled") && fc.test(this.nodeName) && !ec.test(a) && (this.checked || !Na.test(a))
                    }).map(function(a, b) {
                        var c = na(this).val();
                        return null == c ? null : na.isArray(c) ? na.map(c, function(a) {
                            return {
                                name: b.name,
                                value: a.replace(dc, "\r\n")
                            }
                        }) : {
                            name: b.name,
                            value: c.replace(dc, "\r\n")
                        }
                    }).get()
                }
            }),
            na.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
                return this.isLocal ? aa() : da.documentMode > 8 ? _() : /^(get|post|head|put|delete|options)$/i.test(this.type) && _() || aa()
            }
            : _;
            var gc = 0
              , hc = {}
              , ic = na.ajaxSettings.xhr();
            a.attachEvent && a.attachEvent("onunload", function() {
                for (var a in hc)
                    hc[a](void 0, !0)
            }),
            la.cors = !!ic && "withCredentials"in ic,
            (ic = la.ajax = !!ic) && na.ajaxTransport(function(b) {
                if (!b.crossDomain || la.cors) {
                    var c;
                    return {
                        send: function(d, e) {
                            var f, g = b.xhr(), h = ++gc;
                            if (g.open(b.type, b.url, b.async, b.username, b.password),
                            b.xhrFields)
                                for (f in b.xhrFields)
                                    g[f] = b.xhrFields[f];
                            b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType),
                            b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                            for (f in d)
                                void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
                            g.send(b.hasContent && b.data || null),
                            c = function(a, d) {
                                var f, i, j;
                                if (c && (d || 4 === g.readyState))
                                    if (delete hc[h],
                                    c = void 0,
                                    g.onreadystatechange = na.noop,
                                    d)
                                        4 !== g.readyState && g.abort();
                                    else {
                                        j = {},
                                        f = g.status,
                                        "string" == typeof g.responseText && (j.text = g.responseText);
                                        try {
                                            i = g.statusText
                                        } catch (a) {
                                            i = ""
                                        }
                                        f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404
                                    }
                                j && e(f, i, j, g.getAllResponseHeaders())
                            }
                            ,
                            b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = hc[h] = c : c()
                        },
                        abort: function() {
                            c && c(void 0, !0)
                        }
                    }
                }
            }),
            na.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(a) {
                        return na.globalEval(a),
                        a
                    }
                }
            }),
            na.ajaxPrefilter("script", function(a) {
                void 0 === a.cache && (a.cache = !1),
                a.crossDomain && (a.type = "GET",
                a.global = !1)
            }),
            na.ajaxTransport("script", function(a) {
                if (a.crossDomain) {
                    var b, c = da.head || na("head")[0] || da.documentElement;
                    return {
                        send: function(d, e) {
                            b = da.createElement("script"),
                            b.async = !0,
                            a.scriptCharset && (b.charset = a.scriptCharset),
                            b.src = a.url,
                            b.onload = b.onreadystatechange = function(a, c) {
                                (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null,
                                b.parentNode && b.parentNode.removeChild(b),
                                b = null,
                                c || e(200, "success"))
                            }
                            ,
                            c.insertBefore(b, c.firstChild)
                        },
                        abort: function() {
                            b && b.onload(void 0, !0)
                        }
                    }
                }
            });
            var jc = []
              , kc = /(=)\?(?=&|$)|\?\?/;
            na.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var a = jc.pop() || na.expando + "_" + Ob++;
                    return this[a] = !0,
                    a
                }
            }),
            na.ajaxPrefilter("json jsonp", function(b, c, d) {
                var e, f, g, h = !1 !== b.jsonp && (kc.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && kc.test(b.data) && "data");
                return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = na.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                h ? b[h] = b[h].replace(kc, "$1" + e) : !1 !== b.jsonp && (b.url += (Pb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                b.converters["script json"] = function() {
                    return g || na.error(e + " was not called"),
                    g[0]
                }
                ,
                b.dataTypes[0] = "json",
                f = a[e],
                a[e] = function() {
                    g = arguments
                }
                ,
                d.always(function() {
                    void 0 === f ? na(a).removeProp(e) : a[e] = f,
                    b[e] && (b.jsonpCallback = c.jsonpCallback,
                    jc.push(e)),
                    g && na.isFunction(f) && f(g[0]),
                    g = f = void 0
                }),
                "script") : void 0
            }),
            na.parseHTML = function(a, b, c) {
                if (!a || "string" != typeof a)
                    return null;
                "boolean" == typeof b && (c = b,
                b = !1),
                b = b || da;
                var d = wa.exec(a)
                  , e = !c && [];
                return d ? [b.createElement(d[1])] : (d = r([a], b, e),
                e && e.length && na(e).remove(),
                na.merge([], d.childNodes))
            }
            ;
            var lc = na.fn.load;
            na.fn.load = function(a, b, c) {
                if ("string" != typeof a && lc)
                    return lc.apply(this, arguments);
                var d, e, f, g = this, h = a.indexOf(" ");
                return h > -1 && (d = na.trim(a.slice(h, a.length)),
                a = a.slice(0, h)),
                na.isFunction(b) ? (c = b,
                b = void 0) : b && "object" == typeof b && (e = "POST"),
                g.length > 0 && na.ajax({
                    url: a,
                    type: e || "GET",
                    dataType: "html",
                    data: b
                }).done(function(a) {
                    f = arguments,
                    g.html(d ? na("<div>").append(na.parseHTML(a)).find(d) : a)
                }).always(c && function(a, b) {
                    g.each(function() {
                        c.apply(this, f || [a.responseText, b, a])
                    })
                }
                ),
                this
            }
            ,
            na.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
                na.fn[b] = function(a) {
                    return this.on(b, a)
                }
            }),
            na.expr.filters.animated = function(a) {
                return na.grep(na.timers, function(b) {
                    return a === b.elem
                }).length
            }
            ,
            na.offset = {
                setOffset: function(a, b, c) {
                    var d, e, f, g, h, i, j, k = na.css(a, "position"), l = na(a), m = {};
                    "static" === k && (a.style.position = "relative"),
                    h = l.offset(),
                    f = na.css(a, "top"),
                    i = na.css(a, "left"),
                    j = ("absolute" === k || "fixed" === k) && na.inArray("auto", [f, i]) > -1,
                    j ? (d = l.position(),
                    g = d.top,
                    e = d.left) : (g = parseFloat(f) || 0,
                    e = parseFloat(i) || 0),
                    na.isFunction(b) && (b = b.call(a, c, na.extend({}, h))),
                    null != b.top && (m.top = b.top - h.top + g),
                    null != b.left && (m.left = b.left - h.left + e),
                    "using"in b ? b.using.call(a, m) : l.css(m)
                }
            },
            na.fn.extend({
                offset: function(a) {
                    if (arguments.length)
                        return void 0 === a ? this : this.each(function(b) {
                            na.offset.setOffset(this, a, b)
                        });
                    var b, c, d = {
                        top: 0,
                        left: 0
                    }, e = this[0], f = e && e.ownerDocument;
                    return f ? (b = f.documentElement,
                    na.contains(b, e) ? (void 0 !== e.getBoundingClientRect && (d = e.getBoundingClientRect()),
                    c = ba(f),
                    {
                        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                    }) : d) : void 0
                },
                position: function() {
                    if (this[0]) {
                        var a, b, c = {
                            top: 0,
                            left: 0
                        }, d = this[0];
                        return "fixed" === na.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(),
                        b = this.offset(),
                        na.nodeName(a[0], "html") || (c = a.offset()),
                        c.top += na.css(a[0], "borderTopWidth", !0),
                        c.left += na.css(a[0], "borderLeftWidth", !0)),
                        {
                            top: b.top - c.top - na.css(d, "marginTop", !0),
                            left: b.left - c.left - na.css(d, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var a = this.offsetParent; a && !na.nodeName(a, "html") && "static" === na.css(a, "position"); )
                            a = a.offsetParent;
                        return a || mb
                    })
                }
            }),
            na.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(a, b) {
                var c = /Y/.test(b);
                na.fn[a] = function(d) {
                    return Ma(this, function(a, d, e) {
                        var f = ba(a);
                        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? na(f).scrollLeft() : e, c ? e : na(f).scrollTop()) : a[d] = e)
                    }, a, d, arguments.length, null)
                }
            }),
            na.each(["top", "left"], function(a, b) {
                na.cssHooks[b] = F(la.pixelPosition, function(a, c) {
                    return c ? (c = ob(a, b),
                    kb.test(c) ? na(a).position()[b] + "px" : c) : void 0
                })
            }),
            na.each({
                Height: "height",
                Width: "width"
            }, function(a, b) {
                na.each({
                    padding: "inner" + a,
                    content: b,
                    "": "outer" + a
                }, function(c, d) {
                    na.fn[d] = function(d, e) {
                        var f = arguments.length && (c || "boolean" != typeof d)
                          , g = c || (!0 === d || !0 === e ? "margin" : "border");
                        return Ma(this, function(b, c, d) {
                            var e;
                            return na.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement,
                            Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? na.css(b, c, g) : na.style(b, c, d, g)
                        }, b, f ? d : void 0, f, null)
                    }
                })
            }),
            na.fn.extend({
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                }
            }),
            na.fn.size = function() {
                return this.length
            }
            ,
            na.fn.andSelf = na.fn.addBack,
            "function" == typeof define && define.amd && define("jquery", [], function() {
                return na
            });
            var mc = a.jQuery
              , nc = a.$;
            return na.noConflict = function(b) {
                return a.$ === na && (a.$ = nc),
                b && a.jQuery === na && (a.jQuery = mc),
                na
            }
            ,
            b || (a.jQuery = a.$ = na),
            na
        })
    }
    , {}],
    6: [function(a, b, c) {
        (function(b) {
            "use strict";
            function c(a) {
                for (var b = s.length, c = 0; c < b; c++)
                    if (s[c].wnd === a)
                        return;
                s.unshift({
                    wnd: a,
                    injectCount: 0
                }),
                r || e()
            }
            function d() {
                var a = s.length;
                if (a > 0 && !t)
                    t = setInterval(d, 500);
                else {
                    0 === a && t && (clearInterval(t),
                    t = 0);
                    for (var c = b.Areion.jQuery("script[id^=areion]"), e = c.length, f = a - 1; f >= 0; f--) {
                        var g = s[f]
                          , h = void 0 === g.wnd.src ? g.wnd : g.wnd.contentWindow;
                        if (h && h.frameElement && !h.Areion) {
                            for (var i = 0; i < e; i++) {
                                var j = c[i]
                                  , k = j.sourceCode || j.textContent;
                                k && "function" == typeof h.eval && h.eval(k)
                            }
                            h.Areion && h.Areion.jQuery && h.Areion.jQuery.ready(!1)
                        }
                        g.injectCount >= o ? s.splice(f, 1) : ++g.injectCount
                    }
                }
            }
            function e() {
                r = !0;
                for (var a = b.Areion.jQuery("script[id^=areion]"), c = a.length, e = 0, f = 0, g = [], h = 0; h < c; h++) {
                    var i = a[h];
                    i.src && void 0 !== !i.sourceCode && g.push(i)
                }
                e = g.length,
                f >= e && d();
                for (var h = 0; h < e; h++)
                    !function(a) {
                        b.Areion.jQuery.ajax({
                            url: a.src,
                            method: "GET",
                            dataType: "text"
                        }).always(function(b) {
                            a.sourceCode = "string" == typeof b ? b : "",
                            ++f >= e && d()
                        })
                    }(g[h])
            }
            var f = a("./methods")
              , g = a("./overrides")
              , h = a("../common/rewritehtml")
              , i = a("../common/rewritecss")
              , j = a("../common/rewritecookies")
              , k = a("./urlrewriter")
              , l = a("./urlutil")
              , m = a("../common/stringutil")
              , n = a("./observedom")
              , o = 5
              , p = !1
              , q = []
              , r = !1
              , s = []
              , t = null;
            b.Areion || (b.Areion = {
                config: {},
                startScript: void 0,
                endScript: void 0,
                get: void 0,
                set: void 0,
                call: void 0,
                processHTML: void 0,
                processCSS: void 0,
                processJS: void 0,
                injectScripts: void 0,
                gatherTopLevelVariables: void 0,
                unrewriteJS: void 0,
                documentWrite: void 0,
                documentClose: void 0,
                isNoRewriteUrl: void 0,
                rewriteUrl: void 0,
                rewriteReplaceUrl: void 0,
                unrewriteUrl: void 0,
                isProbablyRewrittenCookie: void 0,
                rewriteCookie: void 0,
                unrewriteCookie: void 0,
                noRewriteUrls: void 0,
                htmlProcessors: void 0,
                cssProcessors: void 0,
                startObservingDOM: void 0,
                addMutationListener: void 0,
                removeMutationListener: void 0,
                jQuery: void 0,
                StringUtil: void 0,
                UrlUtil: void 0,
                _parseCache: {
                    code: void 0,
                    ast: void 0,
                    locations: void 0
                }
            }),
            b.Areion.config || (b.Areion.config = {}),
            b.Areion.jQuery = a("./lib/jquery"),
            b.Areion._parseCache || (b.Areion._parseCache = {
                code: void 0,
                ast: void 0,
                locations: void 0
            }),
            b.Areion.htmlProcessors = [h.rewriteBaseHref, h.rewriteHTMLInlineStyles, h.rewriteHTMLInlineStylesAddForcePseudoStateCSSClasses, h.createPartitionedHTMLRewriter([h.rewriteHTMLDocumentRoot, h.rewriteHTMLSources, h.rewriteHTMLHrefs, h.rewriteHTMLInlineStyleAttributes, h.rewriteHTMLAddCharsetToSrc, h.rewriteHTMLRemoveLinkTarget, h.rewriteHTMLResourceIntegrity, h.rewriteHTMLFormActions, h.rewriteHTMLRefreshMeta, h.removeHTMLContentSecurityPolicyMeta, h.rewriteHTMLCookieMeta, h.rewriteHTMLIframeSandbox, h.rewriteHTMLAddRandomQueryParamToSource, h.rewriteHTMLAddRandomQueryParamToLinkHrefs, h.rewriteHTMLIframeSrcDoc])],
            b.Areion.cssProcessors = [i.rewriteCSSUrls, i.rewriteCSSAddRandomQueryParamToUrls, i.rewriteUrlAttributeSelectors, i.addForcePseudoStateCSSClasses],
            b.Areion.startScript = function() {
                p = !0,
                q = []
            }
            ,
            b.Areion.endScript = function() {
                p = !1;
                for (var a = q.length, c = 0; c < a; c++) {
                    var d = q[c];
                    d.html && d.doc.write(b.Areion.processHTML(d.html, d.doc !== document))
                }
            }
            ,
            b.Areion.processHTML = function(a, c) {
                if (void 0 === c && (c = !1),
                !a || "string" != typeof a)
                    return a;
                for (var d = a, e = b.Areion.htmlProcessors.length, f = {
                    url: void 0,
                    method: void 0,
                    headers: void 0,
                    originalRequest: void 0,
                    rewriteJavaScriptAddAreionDefinition: c
                }, g = 0; g < e; g++)
                    d = b.Areion.htmlProcessors[g](d, k, f);
                return d
            }
            ,
            b.Areion.processCSS = function(a) {
                if (!a || "string" != typeof a)
                    return a;
                for (var c = a, d = b.Areion.cssProcessors.length, e = 0; e < d; e++)
                    c = b.Areion.cssProcessors[e](c, k);
                return c
            }
            ,
            b.Areion.processJS = function(a, b, c) {
                return void 0 === b && (b = !0),
                void 0 === c && (c = !1),
                a
            }
            ,
            b.Areion.injectScripts = c,
            b.Areion.gatherTopLevelVariables = function(a) {
                return {}
            }
            ,
            b.Areion.unrewriteJS = function(a) {
                return a
            }
            ,
            b.Areion.documentWrite = function(a) {
                if (p) {
                    for (var c = !1, d = q.length, e = 0; e < d; e++) {
                        var f = q[e];
                        if (f.doc === this || document) {
                            f.html += a,
                            c = !0;
                            break
                        }
                    }
                    c || q.push({
                        doc: this || document,
                        html: a
                    })
                } else
                    (this || document).write(b.Areion.processHTML(a, !0))
            }
            ,
            b.Areion.documentClose = function() {
                var a = q.length;
                if (0 !== a)
                    for (var c = 0; c < a; c++) {
                        var d = q[c];
                        if (d.doc === this || document) {
                            if (d.html) {
                                var e = d.doc !== document;
                                d.doc.write(b.Areion.processHTML(d.html, e)),
                                e && b.Areion.injectScripts(d.doc.defaultView)
                            }
                            d.doc.close(),
                            d.html = "";
                            break
                        }
                    }
                else
                    "function" == typeof this.close && this.close()
            }
            ,
            b.Areion.isNoRewriteUrl = k.isNoRewriteUrl,
            b.Areion.rewriteUrl = k.rewriteUrl,
            b.Areion.rewriteReplaceUrl = k.rewriteReplaceUrl,
            b.Areion.unrewriteUrl = k.unrewriteUrl,
            b.Areion.isProbablyRewrittenCookie = j.isProbablyRewritten,
            b.Areion.rewriteCookie = j.rewriteCookie,
            b.Areion.unrewriteCookie = j.unrewriteCookie,
            b.Areion.startObservingDOM = n.start,
            b.Areion.StringUtil = m,
            b.Areion.UrlUtil = l,
            f.init(b.Areion, [g, k]),
            n.start()
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../common/rewritecookies": 13,
        "../common/rewritecss": 14,
        "../common/rewritehtml": 15,
        "../common/stringutil": 16,
        "./lib/jquery": 5,
        "./methods": 7,
        "./observedom": 8,
        "./overrides": 9,
        "./urlrewriter": 10,
        "./urlutil": 11
    }],
    7: [function(a, b, c) {
        "use strict";
        function d(a, b) {
            var c = navigator.userAgent.indexOf("MSIE 8.0") >= 0
              , d = function(a) {
                if (a)
                    for (var b = self.__$globrinfo.length, c = 0; c < b; c++) {
                        var d = self.__$globrinfo[c];
                        if (d.fnx === a)
                            return d.rinfo
                    }
            }
              , h = function(a) {
                var b = !1;
                try {
                    b = void 0 !== a.call
                } catch (a) {}
                return b
            };
            if (a.get = function(a, b) {
                if (null === a || void 0 === a)
                    throw "Can't read property " + b + " of " + a;
                var c = a.__$rinfo
                  , d = c && c[b] && c[b].get;
                return d ? d(a[b], a) : a[b]
            }
            ,
            a.set = function(a, b, c) {
                if (null === a || void 0 === a)
                    throw "Can't write property " + b + " of " + a;
                var d = a.__$rinfo
                  , e = d && d[b] && d[b].set
                  , f = e ? e(c, a) : {
                    value: c,
                    assign: !0,
                    assignTo: b
                };
                if (!1 !== f.assign)
                    try {
                        a[f.assignTo || b] = f.value
                    } catch (a) {}
                return f.value
            }
            ,
            a.call = function(a, b, f, g) {
                if (void 0 === a && "string" == typeof b && window[b] && (b = window[b]),
                void 0 === a && "function" != typeof b && (!c || "object" != typeof b))
                    throw typeof b + " is not a function";
                f || (f = []);
                var i = void 0;
                if (a instanceof e && "apply" === b ? (i = a,
                a = f[0],
                f = f[1]) : a instanceof e && "call" === b ? (i = a,
                a = f[0],
                f.shift()) : i = "function" == typeof b || c && "object" == typeof b ? b : a[b],
                "function" != typeof i && (!c || "object" != typeof i))
                    throw typeof i + " is not a function";
                var j = i.__$rinfo;
                !j && self.__$globrinfo && (j = d(i));
                var k = !1;
                if (j && (j.func ? i = j.func : void 0 === a && void 0 !== g && j.isEval && (k = !0),
                j.obj && (a = j.obj),
                j.args))
                    for (var l = Math.max(j.args.length, f.length), m = 0; m < l; m++) {
                        var n = j.args[m];
                        "function" == typeof n ? f[m] = n(f[m], f, a, g) : void 0 !== n && (f[m] = n)
                    }
                var o = void 0;
                if (k)
                    try {
                        o = g(f[0])
                    } catch (a) {
                        try {
                            o = i(f[0], f[1])
                        } catch (b) {
                            throw a
                        }
                    }
                else if (!c || a !== window && void 0 !== a)
                    if (c && !h(i)) {
                        var p = void 0;
                        for (var q in a)
                            if (i === a[q]) {
                                p = q;
                                break
                            }
                        if (void 0 !== p)
                            switch (f && f.length || 0) {
                            case 0:
                            case 1:
                                o = a[p](f[0]);
                                break;
                            case 2:
                                o = a[p](f[0], f[1]);
                                break;
                            case 3:
                                o = a[p](f[0], f[1], f[2]);
                                break;
                            case 4:
                                o = a[p](f[0], f[1], f[2], f[3]);
                                break;
                            case 5:
                                o = a[p](f[0], f[1], f[2], f[3], f[4]);
                                break;
                            case 6:
                                o = a[p](f[0], f[1], f[2], f[3], f[4], f[5]);
                                break;
                            case 7:
                                o = a[p](f[0], f[1], f[2], f[3], f[4], f[5], f[6]);
                                break;
                            case 8:
                                o = a[p](f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7])
                            }
                    } else
                        switch (f && f.length || 0) {
                        case 0:
                            o = i.call(a);
                            break;
                        case 1:
                            o = i.call(a, f[0]);
                            break;
                        case 2:
                            o = i.call(a, f[0], f[1]);
                            break;
                        case 3:
                            o = i.call(a, f[0], f[1], f[2]);
                            break;
                        case 4:
                            o = i.call(a, f[0], f[1], f[2], f[3]);
                            break;
                        case 5:
                            o = i.call(a, f[0], f[1], f[2], f[3], f[4]);
                            break;
                        case 6:
                            o = i.call(a, f[0], f[1], f[2], f[3], f[4], f[5]);
                            break;
                        case 7:
                            o = i.call(a, f[0], f[1], f[2], f[3], f[4], f[5], f[6]);
                            break;
                        case 8:
                            o = i.call(a, f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7]);
                            break;
                        default:
                            o = i.apply(a, f)
                        }
                else
                    switch (f && f.length || 0) {
                    case 0:
                    case 1:
                        o = i(f[0]);
                        break;
                    case 2:
                        o = i(f[0], f[1]);
                        break;
                    case 3:
                        o = i(f[0], f[1], f[2]);
                        break;
                    case 4:
                        o = i(f[0], f[1], f[2], f[3]);
                        break;
                    case 5:
                        o = i(f[0], f[1], f[2], f[3], f[4]);
                        break;
                    case 6:
                        o = i(f[0], f[1], f[2], f[3], f[4], f[5]);
                        break;
                    case 7:
                        o = i(f[0], f[1], f[2], f[3], f[4], f[5], f[6]);
                        break;
                    case 8:
                        o = i(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7]);
                        break;
                    default:
                        i.apply && (o = i.apply(a, f))
                    }
                return j && void 0 !== j.ret ? "function" == typeof j.ret ? j.ret(o, f, a, g) : j.ret : o
            }
            ,
            a.processJS && (Function = function() {
                var b = arguments.length - 1
                  , c = Array.prototype.slice.call(arguments, 0, b);
                return c.push(a.processJS(arguments[b])),
                e.apply(this, c)
            }
            ,
            Function.prototype = e.prototype,
            g && (e.prototype.toString = function() {
                var b = g.apply(this, arguments);
                try {
                    return a.unrewriteJS(b)
                } catch (c) {
                    try {
                        return a.unrewriteJS("(" + b + ")")
                    } catch (a) {}
                }
                return b
            }
            )),
            f && (e.prototype.bind = function() {
                var a = f.apply(this, arguments);
                return a.__$rinfo = this.__$rinfo,
                a
            }
            ),
            b)
                for (var i = b.length, j = 0; j < i; j++)
                    b[j].setup(a)
        }
        var e = Function
          , f = Function.prototype.bind
          , g = Function.prototype.toString;
        c.init = d
    }
    , {}],
    8: [function(a, b, c) {
        "use strict";
        function d() {
            var a = function(a, b) {
                var c = Areion.jQuery(a)
                  , d = c.attr(b)
                  , e = n.rewriteUrl(d);
                e !== d && c.attr(b, e)
            };
            Areion.jQuery("a[href]").each(function(b, c) {
                return a(c, "href")
            }),
            Areion.jQuery("form[action]").each(function(b, c) {
                return a(c, "action")
            }),
            Areion.jQuery("iframe[src]").each(function(b, c) {
                return a(c, "src")
            }),
            Areion.jQuery("a[target]").each(function(a, b) {
                Areion.config.removeLinkTargets && (b.target = "")
            })
        }
        function e(a, b) {
            var c = a[b];
            if ("string" == typeof c) {
                var d = n.rewriteUrl(m.appendSlashIfNoPath(c));
                d !== c && (a[b] = d)
            }
        }
        function f(a, b) {
            var c = a[b];
            if (c) {
                for (var d = !1, e = "", f = c.split(","), g = f.length, h = 0; h < g; h++) {
                    var i = m.trim(f[h]).split(/\s+/)
                      , j = n.rewriteUrl(i[0]);
                    j !== i[0] && (d = !0),
                    i[0] = j,
                    "" !== e && (e += ", "),
                    e += i.join(" ")
                }
                d && (a[b] = e)
            }
        }
        function g(a, b) {
            "" !== a[b] && (a[b] = "")
        }
        function h(a) {
            if (a.tagName) {
                switch (a.tagName.toLowerCase()) {
                case "a":
                    e(a, "href"),
                    Areion.config.removeLinkTargets && g(a, "target");
                    break;
                case "link":
                case "area":
                    e(a, "href");
                    break;
                case "base":
                    e(a, "href"),
                    l();
                    break;
                case "img":
                    e(a, "src"),
                    f(a, "srcset");
                    break;
                case "audio":
                case "embed":
                case "iframe":
                case "script":
                case "source":
                    e(a, "src");
                    break;
                case "form":
                    e(a, "action")
                }
                for (var b = a.childNodes, c = b && b.length || 0, d = 0; d < c; d++) {
                    var i = b[d];
                    1 === i.nodeType && h(i)
                }
            }
        }
        function i(a) {
            for (var b = o.length, c = 0; c < b; c++)
                if (o[c].target === a)
                    return;
            var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            if (d) {
                var e = new d(function(a) {
                    for (var b = a.length, c = p.length, d = 0; d < b; d++) {
                        var e = a[d]
                          , f = e.type;
                        if ("childList" === f)
                            for (var g = e.addedNodes.length, i = 0; i < g; i++)
                                h(e.addedNodes[i]);
                        else if ("attributes" === f) {
                            var j = e.attributeName;
                            "src" !== j && "srcset" !== j && "href" !== j && "action" !== j || h(e.target)
                        }
                        for (var i = 0; i < c; i++)
                            p[i](e)
                    }
                }
                );
                e.observe(a, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0,
                    attributeOldValue: !0
                }),
                o.push({
                    target: a,
                    observer: e
                })
            }
        }
        function j() {
            for (var a = o.length, b = 0; b < a; b++)
                o[b].observer.disconnect();
            o = []
        }
        function k() {
            (Areion.config.observeDOM || 0 !== p.length) && (i(document.head),
            Areion.jQuery(document).ready(function() {
                q = !0,
                document.getElementById("__areion-errorpage__") || (d(),
                r && (l(),
                r = !1),
                i(document.body))
            }),
            Areion.jQuery(window).on("beforeunload", function() {
                j()
            }))
        }
        function l() {
            r = !0,
            q && (Areion.jQuery("a[href], link[href], area[href], img[srcset], [src], form[action]").each(function() {
                switch (this.tagName.toLowerCase()) {
                case "a":
                case "link":
                case "area":
                    e(this, "href");
                    break;
                case "img":
                    e(this, "src"),
                    f(this, "srcset");
                    break;
                case "audio":
                case "embed":
                case "iframe":
                case "script":
                case "source":
                    e(this, "src");
                    break;
                case "form":
                    e(this, "action")
                }
            }),
            Areion.jQuery("style").each(function() {
                var a = Areion.jQuery(this);
                a.text(Areion.processCSS(a.text()))
            }))
        }
        var m = a("../common/stringutil")
          , n = a("./urlrewriter")
          , o = []
          , p = []
          , q = !1
          , r = !1;
        Areion.addMutationListener = function(a) {
            Areion.jQuery.inArray(a, p) >= 0 || (p.push(a),
            0 === o.length && k())
        }
        ,
        Areion.removeMutationListener = function(a) {
            var b = Areion.jQuery.inArray(a, p);
            b >= 0 && p.splice(b, 1)
        }
        ,
        c.start = k,
        c.checkUrlsAfterBaseChange = l
    }
    , {
        "../common/stringutil": 16,
        "./urlrewriter": 10
    }],
    9: [function(a, b, c) {
        "use strict";
        function d(a) {
            var b = function(a, b, c) {
                var d = a[b];
                if (void 0 !== d) {
                    var e = d.prototype.__$rinfo;
                    d.prototype.__$rinfo = {
                        ctorName: b
                    };
                    for (var f in e)
                        d.prototype.__$rinfo[f] = e[f];
                    for (var f in c)
                        d.prototype.__$rinfo[f] = c[f]
                }
            }
              , c = function(a, b, c) {
                if (b) {
                    try {
                        b.__$rinfo = c
                    } catch (a) {}
                    b.__$rinfo || (a.__$globrinfo || (a.__$globrinfo = []),
                    a.__$globrinfo.push({
                        fnx: b,
                        rinfo: c
                    }))
                }
            }
              , d = function(a) {
                if (!a.text)
                    return !1;
                var b = a.type;
                return b && (b = b.split(";")[0]),
                "" === b || "text/javascript" === b.substr(0, 15) || "text/ecmascript" === b || "text/jscript" === b || "text/livescript" === b || "text/x-ecmascript" === b || "text/x-javascript" === b || "application/ecmascript" === b || "application/javascript" === b || "application/x-ecmascript" === b || "application/x-javascript" === b
            }
              , l = {
                args: [function(b) {
                    var c = (b.tagName || "").toUpperCase();
                    if ("SCRIPT" === c && d(b)) {
                        var e = b.text;
                        e && (b.text = a.processJS(e))
                    } else if ("STYLE" === c) {
                        var f = b.styleSheet;
                        if (f && f.cssText)
                            f.cssText = a.processCSS(f.cssText);
                        else {
                            var g = b.textContent;
                            g ? b.textContent = a.processCSS(g) : (g = b.innerText,
                            b.innerText = a.processCSS(g))
                        }
                    }
                    return b
                }
                ],
                ret: function(b) {
                    if (!b)
                        return b;
                    if ("IFRAME" === (b.tagName || "").toUpperCase() && b.contentWindow && (!a.config.overrideOptions || !a.config.overrideOptions.iframeIgnoreInjectSelector || !a.jQuery(b).is(a.config.overrideOptions.iframeIgnoreInjectSelector))) {
                        var c;
                        try {
                            c = b.contentWindow
                        } catch (a) {}
                        if (!c)
                            return b;
                        try {
                            F(c)
                        } catch (a) {}
                        var d = b.src;
                        d && "data:" !== d.substr(0, 5) || a.injectScripts(c)
                    }
                    return b
                }
            }
              , m = function(b, c, d) {
                if (!c)
                    return c;
                var e = b.split(":");
                if (b = k.camelCase(e[e.length - 1].toLowerCase()),
                "on" === b.substr(0, 2))
                    return a.processJS(c, !1);
                if ("style" === b)
                    return a.processCSS(c);
                if (/^\s*javascript:/i.test(c))
                    return "javascript:" + a.processJS(c.substr(c.indexOf(":") + 1));
                "codebase" === b && (b = "codeBase");
                var f = d.__$rinfo
                  , g = f && f[b] && f[b].set
                  , h = void 0;
                if (g) {
                    var i = g(c, d);
                    i && (h = i.value)
                }
                return void 0 === h ? c : h
            }
              , n = function(a, b, c) {
                if (!b || "string" != typeof a || !c)
                    return b;
                "codebase" === (a = k.camelCase(a.toLowerCase())) && (a = "codeBase");
                var d = c.__$rinfo
                  , e = d && d[a] && d[a].get;
                return e ? e(b, c) : b
            }
              , o = function(a) {
                return a ? h.rewriteSrcSet(a, g, null, !0) : a
            }
              , p = function(a) {
                return i.rewriteUrlAttributeSelectors(a, g, null)
            }
              , q = function(a, b) {
                var c = g.parseUrl(g.unrewriteUrl(a.location.href));
                return {
                    __areion_orig_data: b,
                    __areion_origin: c.protocol + "//" + c.host
                }
            }
              , r = {
                get: function(a) {
                    return g.unrewriteUrl(a)
                }
            }
              , s = {
                set: function(a) {
                    return {
                        value: g.rewriteUrl(a)
                    }
                }
            }
              , t = function(a) {
                return "string" == typeof a ? g.rewriteUrl(a) : a
            }
              , u = {
                get: function(a) {
                    return g.unrewriteUrl(a)
                },
                set: function(a) {
                    return {
                        value: g.rewriteUrl(a)
                    }
                }
            }
              , v = function(a, b) {
                return b ? a.indexOf("____charset=") < 0 ? a + (a.indexOf("?") >= 0 ? "&" : "?") + "____charset=" + b : a.replace(/____charset=[a-zA-Z0-9-]+/, "____charset=" + b) : a.replace(/____charset=[a-zA-Z0-9-]+/, "")
            }
              , w = {
                get: function(a) {
                    var b = g.unrewriteUrl(a);
                    return "string" == typeof b && (b = k.removeCharsetFromQueryParams(b)),
                    b
                },
                set: function(a, b) {
                    var c = g.rewriteUrl(a);
                    if (b.charset)
                        c = v(c, b.charset);
                    else {
                        var d = "link" === b.tagName.toUpperCase() ? b.href : b.src
                          , e = d && d.match(/[?&]____charset=([a-zA-Z0-9-]+)/);
                        e ? c = v(c, e[1]) : c.replace(/____charset=[a-zA-Z0-9-]+/, "")
                    }
                    return {
                        value: c
                    }
                }
            }
              , x = {
                set: function(b) {
                    return {
                        value: a.processCSS(b)
                    }
                }
            }
              , y = {
                set: function(b) {
                    return {
                        value: a.processHTML(b)
                    }
                }
            }
              , z = {
                get: function(a, b) {
                    return n(b.name, a, b.ownerElement)
                },
                set: function(a, b) {
                    return {
                        value: m(b.name, a, b.ownerElement)
                    }
                }
            }
              , A = {
                set: function(a) {
                    return {
                        value: o(a)
                    }
                }
            }
              , B = {
                set: function(a, b) {
                    var c = "LINK" === b.tagName.toUpperCase() ? "href" : "src";
                    return b[c] = v(g.rewriteUrl(b[c]), a),
                    {
                        value: ""
                    }
                }
            }
              , C = function(a) {
                return k.isAbsoluteUrl(a) ? g.rewriteUrl(a) : a
            }
              , D = function(b, c) {
                void 0 === c && (c = {
                    protocol: !0,
                    host: !0,
                    hostname: !0,
                    port: !0,
                    pathname: !0,
                    origin: !1,
                    hash: !0
                });
                for (var d in c)
                    !function(c, d) {
                        b.__$rinfo[c] = {
                            get: function(a, b) {
                                return g.unrewriteUrl(b.href, c)
                            },
                            set: void 0
                        },
                        d && (b.__$rinfo[c].set = "hash" === c ? function(a, b) {
                            return {
                                value: g.replaceHash(b, a)
                            }
                        }
                        : function(b, d) {
                            return {
                                value: g.rewriteReplaceUrl(d, a.config.documentRoot, b, c),
                                assignTo: "href"
                            }
                        }
                        )
                    }(d, c[d])
            }
              , E = function(a, b) {
                var c = e.parseCookie(a);
                return !c || f.isProbablyRewritten(c) ? a : e.cookieToString(f.rewriteCookie(c, j.parseUrl(b), g))
            }
              , F = function(d) {
                d.__areionOverridesInstalled = !0,
                void 0 === d.Node && (d.Node = d.Element),
                void 0 === d.HTMLDocument && (d.HTMLDocument = document.constructor),
                b(d, "Window", {
                    location: s
                });
                var k = d.location.constructor === d.Object ? d.location : d.location.constructor.prototype;
                k.__$rinfo = {
                    href: u
                },
                D(k),
                b(d, "HTMLDocument", {
                    URL: r,
                    referrer: r,
                    documentURI: r,
                    domain: {
                        get: function(a, b) {
                            return void 0 !== b.__areion_domain ? b.__areion_domain : g.unrewriteUrl(d.location.href, "host")
                        },
                        set: function(a, b) {
                            return b.__areion_domain = a,
                            {
                                value: d.location.host
                            }
                        }
                    },
                    cookie: {
                        get: function(a, b) {
                            for (var c = {}, h = a.split(";"), i = h.length, k = 0; k < i; k++) {
                                var l = e.parseCookie(h[k]);
                                l && (c[l.name] = [l])
                            }
                            var m = f.filterAndUnrewriteCookies(c, j.parseUrl(g.unrewriteUrl(d.location.href)))
                              , n = ""
                              , o = !0;
                            for (var p in m)
                                o ? o = !1 : n += "; ",
                                n += p + "=" + m[p][0].value;
                            return n
                        },
                        set: function(a, b) {
                            var c = e.parseCookie(a);
                            return {
                                value: c ? e.cookieToString(f.rewriteCookie(c, j.parseUrl(g.unrewriteUrl(d.location.href)), g)) : a
                            }
                        }
                    }
                }),
                b(d, "Node", {
                    baseURI: r
                }),
                b(d, "Element", {
                    innerHTML: y,
                    outerHTML: y,
                    className: {
                        get: function(a) {
                            return "string" == typeof a ? i.removePseudoStateCSSClasses(a, g) : (d.SVGAnimatedString && a instanceof d.SVGAnimatedString && (a.baseVal = i.removePseudoStateCSSClasses(a.baseVal, g)),
                            a)
                        }
                    }
                }),
                b(d, "Attr", {
                    value: z,
                    nodeValue: z,
                    textContent: z
                }),
                b(d, "DOMTokenList", {
                    length: {
                        get: function(a, b) {
                            for (var c = a, d = c, e = 0; e < c; e++)
                                i.isPseudoStateCSSClass(b.item(e), g) && --d;
                            return d
                        }
                    }
                }),
                b(d, "HTMLElement", {
                    style: x
                }),
                b(d, "HTMLAnchorElement", {
                    href: {
                        get: function(a) {
                            return g.unrewriteUrl(a)
                        },
                        set: function(b) {
                            return /^javascript:/i.test(b) ? {
                                value: "javascript:" + a.processJS(b.substr(11))
                            } : {
                                value: g.rewriteUrl(b)
                            }
                        }
                    },
                    target: {
                        set: function(a) {
                            return {
                                value: g.isRemoveLinkTargets() ? "" : a
                            }
                        }
                    }
                }),
                D(d.HTMLAnchorElement.prototype),
                b(d, "HTMLAppletElement", {
                    code: u,
                    codeBase: u
                }),
                b(d, "HTMLAreaElement", {
                    href: u
                }),
                b(d, "HTMLAudioElement", {
                    src: u
                }),
                b(d, "HTMLBaseElement", {
                    href: {
                        get: function(a) {
                            return g.unrewriteUrl(a)
                        },
                        set: function(a) {
                            var b = g.rewriteUrl(a);
                            return b && "/" !== b.charAt(b.length - 1) && (b += "/"),
                            {
                                value: b
                            }
                        }
                    }
                }),
                b(d, "HTMLEmbedElement", {
                    src: u
                }),
                b(d, "HTMLFormElement", {
                    action: u
                }),
                b(d, "HTMLHtmlElement", {
                    manifest: u
                }),
                b(d, "HTMLIFrameElement", {
                    src: u,
                    srcdoc: {
                        set: function(b, c) {
                            try {
                                a.config.overrideOptions && a.config.overrideOptions.iframeIgnoreInjectSelector && a.jQuery(c).is(a.config.overrideOptions.iframeIgnoreInjectSelector) || a.injectScripts(c)
                            } catch (a) {
                                console.error(a)
                            }
                            return {
                                value: a.processHTML(b)
                            }
                        }
                    },
                    sandbox: {
                        set: function(a) {
                            return Array.isArray(a) && (a = a[0]),
                            {
                                value: h.addIframeFlags(a)
                            }
                        }
                    },
                    contentWindow: {
                        get: function(a) {
                            return a && !a.__areionOverridesInstalled && F(a),
                            a
                        }
                    },
                    contentDocument: {
                        get: function(a) {
                            return a && a.defaultView && !a.defaultView.__areionOverridesInstalled && F(a.defaultView),
                            a
                        }
                    }
                }),
                b(d, "HTMLImageElement", {
                    src: u,
                    srcset: A
                }),
                b(d, "HTMLInputElement", {
                    src: u
                }),
                b(d, "HTMLLinkElement", {
                    href: w,
                    charset: B
                }),
                b(d, "HTMLMediaElement", {
                    currentSrc: u,
                    src: u
                }),
                b(d, "HTMLMetaElement", {
                    httpEquiv: {
                        set: function(a, b) {
                            if (a)
                                switch (a.toLowerCase()) {
                                case "content-security-policy":
                                    b.content = "default-src *";
                                    break;
                                case "refresh":
                                    b.content = b.content.replace(/url=(.*)$/, function(a, b) {
                                        return "url=" + g.rewriteUrl(b)
                                    });
                                    break;
                                case "set-cookie":
                                    b.content = E(b.content, g.unrewriteUrl(d.location.href))
                                }
                            return {
                                value: a
                            }
                        }
                    },
                    content: {
                        get: function(a, b) {
                            switch (b.httpEquiv.toLowerCase()) {
                            case "refresh":
                                return a.replace(/url=(.*)$/, function(a, b) {
                                    return "url=" + g.unrewriteUrl(b)
                                });
                            case "set-cookie":
                                var c = e.parseCookie(a);
                                return c ? e.cookieToString(f.unrewriteCookie(c)) : a
                            }
                            return a
                        },
                        set: function(a, b) {
                            switch (b.httpEquiv.toLowerCase()) {
                            case "content-security-policy":
                                return {
                                    value: "default-src *"
                                };
                            case "refresh":
                                return {
                                    value: a.replace(/url=(.*)$/, function(a, b) {
                                        return "url=" + g.rewriteUrl(b)
                                    })
                                };
                            case "set-cookie":
                                return {
                                    value: E(a, g.unrewriteUrl(d.location.href))
                                }
                            }
                            return {
                                value: a
                            }
                        }
                    }
                }),
                b(d, "HTMLObjectElement", {
                    archive: u,
                    codeBase: u,
                    data: u
                }),
                b(d, "HTMLScriptElement", {
                    src: w,
                    charset: B
                }),
                b(d, "HTMLSourceElement", {
                    src: u,
                    srcset: A
                }),
                b(d, "HTMLTrackElement", {
                    src: u
                }),
                b(d, "HTMLVideoElement", {
                    poster: u,
                    src: u
                }),
                b(d, "SVGUseElement", {
                    href: {
                        get: function(a) {
                            return g.isUrlRewritten(a) ? g.unrewriteUrl(a) : a
                        },
                        set: function(a) {
                            return a && "#" !== a.charAt(0) ? {
                                value: g.rewriteUrl(a)
                            } : {
                                value: a
                            }
                        }
                    }
                }),
                b(d, "CSSStyleSheet", {
                    href: u
                }),
                b(d, "CSSStyleDeclaration", {
                    cssText: x,
                    background: x,
                    backgroundImage: x,
                    borderImage: x,
                    webkitBorderImage: x,
                    mozBorderImage: x,
                    oBorderImage: x,
                    borderImageSource: x,
                    clipPath: x,
                    content: x,
                    cursor: x,
                    filter: x,
                    listStyle: x,
                    listStyleImage: x,
                    mask: x,
                    webkitMask: x,
                    shapeOutside: x,
                    symbols: x
                }),
                b(d, "Event", {
                    oldURL: r,
                    newURL: r,
                    url: r,
                    origin: {
                        get: function(a, b) {
                            return b && b.data && b.data.__areion_origin ? b.data.__areion_origin : g.unrewriteUrl(a)
                        }
                    },
                    data: {
                        get: function(a) {
                            return a && "object" == typeof a && "__areion_orig_data"in a ? a.__areion_orig_data : a
                        }
                    }
                }),
                b(d, "XMLHttpRequest", {
                    responseURL: r
                }),
                b(d, "Notification", {
                    icon: s
                }),
                b(d, "Request", {
                    url: r,
                    referrer: r
                }),
                b(d, "SharedWorker", {
                    url: r
                }),
                b(d, "WebSocket", {
                    url: r
                }),
                b(d, "PerformanceEntry", {
                    name: r
                }),
                b(d, "Error", {
                    sourceURL: r,
                    stack: {
                        get: function(a, b) {
                            return a.replace(/(^\s*at\s+)(.*?)(:\d+:\d+$)/gim, function(a, b, c, d) {
                                return b + g.unrewriteUrl(c) + d
                            })
                        }
                    }
                }),
                c(d, d.open, {
                    args: [g.rewriteUrl]
                }),
                c(d, d.openDialog, {
                    args: [g.rewriteUrl]
                });
                for (var o = d, v = null, G = 0; o != v && o && (!d.__$globrinfo && o.postMessage.__$rinfo || (o.postMessage !== o.postMessage && (o.postMessage = o.postMessage),
                c(d, o.postMessage, {
                    args: [function(a) {
                        return q(d, a)
                    }
                    , "*"]
                })),
                v = o,
                o = o.parent,
                !(G > 10)); )
                    ++G;
                if (c(d, d.fetch, {
                    args: [t]
                }),
                c(d, d.location.assign, {
                    args: [g.rewriteUrl]
                }),
                c(d, d.location.replace, {
                    args: [g.rewriteUrl]
                }),
                c(d, (d.location.constructor === d.Object ? d.location : d.location.constructor.prototype).toString, {
                    ret: function(a, b, c) {
                        return c instanceof d.location.constructor ? g.unrewriteUrl(a) : a
                    }
                }),
                c(d, d.HTMLDocument.prototype.write, {
                    func: a.documentWrite
                }),
                c(d, d.HTMLDocument.prototype.writeln, {
                    func: a.documentWrite
                }),
                c(d, d.HTMLDocument.prototype.close, {
                    func: a.documentClose
                }),
                c(d, d.HTMLDocument.prototype.execCommand, {
                    args: [void 0, void 0, function(b, c) {
                        return !a.config.proxyAllResources || "createLink" !== c[0] && "insertImage" !== c[0] ? b : g.rewriteUrl(b)
                    }
                    ]
                }),
                c(d, d.history.constructor.prototype.replaceState, {
                    args: [void 0, void 0, C]
                }),
                c(d, d.history.constructor.prototype.pushState, {
                    args: [void 0, void 0, C]
                }),
                c(d, d.navigator.constructor.prototype.sendBeacon, {
                    args: [g.rewriteUrl]
                }),
                c(d, d.navigator.constructor.prototype.registerProtocolHandler, {
                    args: [void 0, g.rewriteUrl]
                }),
                void 0 !== d.XMLHttpRequest && c(d, d.XMLHttpRequest.prototype.open, {
                    args: [void 0, g.rewriteUrl]
                }),
                c(d, d.Element.prototype.getAttribute, {
                    ret: function(a, b, c) {
                        return n(b[0], a, c)
                    }
                }),
                c(d, d.Element.prototype.setAttributeNS, {
                    ret: function(a, b, c) {
                        return n(b[1], a, c)
                    }
                }),
                c(d, d.Element.prototype.setAttribute, {
                    args: [void 0, function(a, b, c) {
                        return m(b[0], a, c)
                    }
                    ]
                }),
                c(d, d.Element.prototype.setAttributeNS, {
                    args: [void 0, void 0, function(a, b, c) {
                        return m(b[1], a, c)
                    }
                    ]
                }),
                c(d, d.Element.prototype.insertAdjacentHTML, {
                    args: [void 0, a.processHTML]
                }),
                c(d, d.Element.prototype.querySelector, {
                    args: [p]
                }),
                c(d, d.Element.prototype.querySelectorAll, {
                    args: [p]
                }),
                c(d, d.Node.prototype.appendChild, l),
                c(d, d.Node.prototype.replaceChild, l),
                c(d, d.Node.prototype.insertBefore, l),
                c(d, d.HTMLDocument.prototype.querySelector, {
                    args: [p]
                }),
                c(d, d.HTMLDocument.prototype.querySelectorAll, {
                    args: [p]
                }),
                c(d, d.CSSStyleSheet.prototype.insertRule, {
                    args: [a.processCSS]
                }),
                c(d, d.CSSStyleSheet.prototype.addRule, {
                    args: [void 0, a.processCSS]
                }),
                c(d, d.CSSStyleDeclaration.prototype.setProperty, {
                    args: [void 0, a.processCSS]
                }),
                void 0 !== d.DOMTokenList && c(d, d.DOMTokenList.prototype.item, {
                    ret: function(a, b, c) {
                        for (var d = c.length, e = b[0], f = 0, h = 0; h < d; h++) {
                            var j = c.item(h);
                            if (!i.isPseudoStateCSSClass(j, g)) {
                                if (f === e)
                                    return j;
                                ++f
                            }
                        }
                    }
                }),
                void 0 !== d.Request) {
                    var H = d.Request;
                    d.Request = function(a, b) {
                        return new H("string" == typeof a ? g.rewriteUrl(a) : a,b)
                    }
                    ,
                    d.Request.prototype = H.prototype
                }
                if (void 0 !== d.Worker) {
                    var I = d.Worker;
                    d.Worker = function(a) {
                        return new I(g.rewriteUrl(a))
                    }
                    ,
                    d.Worker.prototype = I.prototype
                }
                if (void 0 !== d.SharedWorker) {
                    var J = d.SharedWorker;
                    d.SharedWorker = function(a, b) {
                        return new J(g.rewriteUrl(a),b)
                    }
                    ,
                    d.SharedWorker.prototype = J.prototype
                }
            };
            F(window)
        }
        var e = a("../common/cookieparser")
          , f = a("../common/rewritecookies")
          , g = a("./urlrewriter")
          , h = a("../common/rewritehtml")
          , i = a("../common/rewritecss")
          , j = a("./urlutil")
          , k = a("../common/stringutil");
        c.setup = d
    }
    , {
        "../common/cookieparser": 12,
        "../common/rewritecookies": 13,
        "../common/rewritecss": 14,
        "../common/rewritehtml": 15,
        "../common/stringutil": 16,
        "./urlrewriter": 10,
        "./urlutil": 11
    }],
    10: [function(a, b, c) {
        (function(b) {
            "use strict";
            function d(a) {
                a.noRewriteUrls = ["https://localhost:0/"];
                for (var b = a.config.servicePorts.length, c = 0; c < b; c++) {
                    var d = a.config.servicePorts[c];
                    a.noRewriteUrls.push("http://localhost:" + d + "/"),
                    a.noRewriteUrls.push("https://localhost:" + d + "/"),
                    a.noRewriteUrls.push("http://127.0.0.1:" + d + "/"),
                    a.noRewriteUrls.push("https://127.0.0.1:" + d + "/"),
                    a.noRewriteUrls.push("http://" + location.hostname + ":" + d + "/"),
                    a.noRewriteUrls.push("https://" + location.hostname + ":" + d + "/"),
                    a.config.commHost && (a.noRewriteUrls.push("http://" + a.config.commHost + ":" + d + "/"),
                    a.noRewriteUrls.push("https://" + a.config.commHost + ":" + d + "/"))
                }
                80 === a.config.commPort ? a.noRewriteUrls.push("http://" + a.config.commHost) : 443 === a.config.commPort && a.noRewriteUrls.push("https://" + a.config.commHost)
            }
            function e(a) {
                "string" != typeof a && (a = String(a));
                for (var b = Areion.noRewriteUrls.length, c = 0; c < b; c++) {
                    var d = Areion.noRewriteUrls[c];
                    if (a.substr(0, d.length) === d)
                        return !0
                }
                for (b = Areion.config.internalUrlPaths.length,
                c = 0; c < b; c++)
                    if (E.startsWith(a, Areion.config.internalUrlPaths[c]))
                        return !0;
                return !1
            }
            function f() {
                return Areion.config.proxyAllResources
            }
            function g() {
                return Areion.config.addRandomQueryParameter
            }
            function h() {
                return Areion.config.removeLinkTargets
            }
            function i(a) {
                return !0
            }
            function j(a) {
                return F.matchesRandomQueryParamFileExtensions(a, Areion.config.randomQueryParameterFileExtensions)
            }
            function k() {
                return Areion.config.rewriteComputedProperties
            }
            function l() {
                return Areion.config.clientRewriteAtRuntime
            }
            function m() {
                return Areion.config.clientRewriteSupportEvalVarDecls
            }
            function n() {
                return Areion.config.addCustomCSSPropertiesForPseudos
            }
            function o() {
                return location.protocol + "//" + location.host
            }
            function p() {
                return A(location.href)
            }
            function q(a) {
                var b = a.indexOf("#orig:");
                if (b < 0)
                    return null;
                var c = a.substr(b + 6)
                  , d = c.search(/[#?]/);
                d >= 0 && (c = c.substr(0, d));
                var e = a.indexOf("#");
                if (e >= 0 && e < b || a.indexOf("?") >= 0) {
                    var f = D.parseUrl(a)
                      , g = f.hash;
                    g && (g = g.replace("#orig:" + c, "")),
                    f.search && (c += f.search),
                    g && (c += g)
                }
                return c
            }
            function r(a) {
                return a.replace(/#orig:.*?(?=$|[#?])/, "")
            }
            function s(a) {
                return E.startsWith(a, location.protocol + "//" + location.host)
            }
            function t(a) {
                if (!a)
                    return "";
                "string" != typeof a && (a = a.toString()),
                a = E.trim(a);
                var b = q(a) || a;
                if (e(b))
                    return b;
                var c = b
                  , d = "//" === b.substr(0, 2)
                  , f = E.getUrlHost(b)
                  , g = !1;
                if (!E.isAbsoluteUrl(b) || E.getUrlProtocol(b) === location.protocol && f === location.host) {
                    if (d && f !== location.host) {
                        var h = void 0;
                        h = "/http://" === location.pathname.substr(0, 8) ? "/http:" : "/https://" === location.pathname.substr(0, 9) ? "/https:" : "/" + E.getUrlProtocol(Areion.config.documentRoot),
                        c = location.protocol + "//" + location.host + h + b
                    } else if ("/" === b.charAt(0))
                        if ("/http://" === location.pathname.substr(0, 8) || "/https://" === location.pathname.substr(0, 9)) {
                            var i = D.parseUrl(location.pathname.substr(1));
                            c = location.protocol + "//" + location.host + "/" + i.protocol + "//" + i.host + b
                        } else {
                            var k = Areion.jQuery("base");
                            if (k.length > 0) {
                                var l = k.attr("href");
                                if (l) {
                                    var m = l.indexOf("/", 8);
                                    if (m > 0)
                                        if ("/http://" === l.substr(m, 8) || "/https://" === l.substr(m, 9)) {
                                            var n = l.indexOf("/", m + 9);
                                            n > 0 && (l = l.substr(0, n))
                                        } else
                                            l = l.substr(0, m);
                                    c = l + b,
                                    g = !0
                                }
                            }
                        }
                } else
                    c = location.protocol + "//" + location.host + "/" + b;
                if (!0 === Areion.config.addRandomQueryParameter && j(a) && (c = F.addRnd(a)),
                g) {
                    var o = D.parseUrl(b);
                    o && o.pathname && (c += "#orig:" + o.pathname)
                }
                return c
            }
            function u(a, b, c, d) {
                var e = b;
                "/http://" === a.pathname.substr(0, 8) || "/https://" === a.pathname.substr(0, 9) ? e = a.pathname.substr(1) : e += a.pathname;
                var f = D.parseUrl(e + a.search + a.hash);
                return "hash" === d && c && "#" !== c.charAt(0) && (c = "#" + c),
                f[d] = c,
                t(D.urlToString(f))
            }
            function v(a, b) {
                if (!a || !a.hash)
                    return b;
                var c = a.hash.indexOf("#orig:");
                if (c < 0)
                    return b;
                var d = 0 === c ? a.hash : a.hash.substr(c);
                return c = d.substr(1).search(/[#?]/),
                c >= 0 && (d = d.substr(0, c + 1)),
                b + d
            }
            function w(a) {
                if (!a || "/" === a.charAt(a.length - 1))
                    return a;
                var b = a.lastIndexOf("/");
                return b < 0 ? "/" : a.substring(0, b + 1)
            }
            function x() {
                return {
                    href: I.href,
                    protocol: I.protocol,
                    hostname: I.hostname,
                    port: I.port,
                    host: I.host,
                    pathname: I.pathname,
                    search: I.search,
                    hash: I.hash
                }
            }
            function y(a) {
                var b = null
                  , c = location.pathname;
                if (E.startsWith(c, "/http://") || E.startsWith(c, "/https://") ? b = D.parseUrl(c.substr(1)) : (b = x(),
                b.pathname = c),
                b.pathname && (b.pathname = w(b.pathname)),
                a) {
                    var d = Areion.jQuery("base");
                    if (d.length > 0) {
                        var e = D.parseUrl(A(d.attr("href"), void 0, !1));
                        if (e.host && (b.host = e.host,
                        e.protocol && (b.protocol = e.protocol)),
                        e.pathname) {
                            var f = w(e.pathname);
                            b.pathname = b.pathname && "/" !== b.pathname ? b.pathname + f : f
                        }
                    }
                }
                return b
            }
            function z(a, b) {
                return "/" === a.charAt(0) ? a.length > 1 && "/" === a.charAt(1) ? (b.protocol || "") + a : b.protocol && b.host ? b.protocol + "//" + b.host + a : a : (b.protocol && b.host ? b.protocol + "//" + b.host : "") + w(b.pathname) + a
            }
            function A(a, b, c) {
                if (void 0 === c && (c = !0),
                !a || "string" != typeof a || /[ "<>{}|\\^~\[\]`]/.test(a))
                    return a;
                var d = a;
                if (!/^[a-zA-Z]+:|^#/.test(a) || /^https?:/.test(a)) {
                    if (!(d = q(a))) {
                        var e = o()
                          , f = e.length;
                        if (d = a,
                        a.substr(0, f) === e) {
                            var g = a.substr(f, 8);
                            d = "/http://" === g || "/https://" === a.substr(f, 9) ? a.substr(f + 1) : "/http:/" === a.substr(f, 7) ? "http://" + a.substr(f + 7) : "/https:/" === g ? "https://" + a.substr(f + 8) : H ? I.protocol + "//" + I.host + a.substr(f) : a.substr(f)
                        }
                    }
                    E.isAbsoluteUrl(d) || (d = z(d, y(c))),
                    d = E.removeCharsetFromQueryParams(d)
                }
                return b && "href" !== b ? D.parseUrl(d)[b] : d
            }
            function B(a) {
                if ("function" == typeof b.atob)
                    return b.atob(a);
                a = String(a).replace(/[\t\n\f\r ]/g, "");
                var c = a.length;
                if (c % 4 == 0 && (a = a.replace(/==?$/, ""),
                c = a.length),
                c % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(a))
                    throw new Error("Invalid character: the string to be decoded is not correctly encoded.");
                for (var d, e, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", g = 0, h = "", i = -1; ++i < c; )
                    e = f.indexOf(a.charAt(i)),
                    d = g % 4 ? 64 * d + e : e,
                    g++ % 4 && (h += String.fromCharCode(255 & d >> (-2 * g & 6)));
                return h
            }
            function C(a) {
                if ("function" == typeof b.btoa)
                    return b.btoa(a);
                if (/[^\0-\xff]/.test(a))
                    throw new Error("The string to be encoded contains characters outside of the Latin1 range.");
                for (var c, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = a.length % 3, f = "", g = -1, h = a.length - e; ++g < h; )
                    c = (a.charCodeAt(g) << 16) + (a.charCodeAt(++g) << 8) + a.charCodeAt(++g),
                    f += d.charAt(c >> 18 & 63) + d.charAt(c >> 12 & 63) + d.charAt(c >> 6 & 63) + d.charAt(63 & c);
                return 2 === e ? (c = (a.charCodeAt(g) << 8) + a.charCodeAt(++g),
                f += d.charAt(c >> 10) + d.charAt(c >> 4 & 63) + d.charAt(c << 2 & 63) + "=") : 1 === e && (c = a.charCodeAt(g),
                f += d.charAt(c >> 2) + d.charAt(c << 4 & 63) + "=="),
                f
            }
            var D = a("./urlutil")
              , E = a("../common/stringutil")
              , F = a("../common/urlrewriter");
            c.setup = d,
            c.isNoRewriteUrl = e,
            c.isProxyAllResources = f,
            c.isAddRandomQueryParam = g,
            c.isRemoveLinkTargets = h,
            c.isRewriteJavaScript = i,
            c.matchesRandomQueryParamFileExtensions = j,
            c.rewriteComputedProperties = k,
            c.clientRewriteAtRuntime = l,
            c.clientRewriteSupportEvalVarDecls = m,
            c.addCustomCSSPropertiesForPseudos = n,
            c.appname = Areion.config.appname,
            c.documentRoot = {
                url: D.parseUrl(Areion.config.documentRoot),
                isHTTP: E.isAbsoluteUrl(Areion.config.documentRoot)
            };
            var G = F.createDocRootRegExps(c.documentRoot.url);
            c.docRootRegexp = G.regex,
            c.docRootAttributeRegexp = G.attrRegex,
            c.addRnd = F.addRnd,
            c.getServerUrl = o,
            c.getCurrentUrl = p,
            c.removeOrigHash = r,
            c.isUrlRewritten = s,
            c.rewriteUrl = t,
            c.rewriteReplaceUrl = u,
            c.replaceHash = v;
            var H = /^https?:\/\//i.test(Areion.config.documentRoot)
              , I = H ? D.parseUrl(Areion.config.documentRoot) : {
                href: Areion.config.documentRoot,
                protocol: null,
                hostname: null,
                port: null,
                host: null,
                pathname: Areion.config.documentRoot,
                search: null,
                hash: null
            };
            c.unrewriteUrl = A,
            c.processHTML = function(a, b, c) {
                return Areion.processHTML(a)
            }
            ,
            c.parseUrl = D.parseUrl,
            c.urlToString = D.urlToString,
            c.atob = B,
            c.btoa = C
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../common/stringutil": 16,
        "../common/urlrewriter": 17,
        "./urlutil": 11
    }],
    11: [function(a, b, c) {
        (function(b) {
            "use strict";
            function d(a) {
                if ("string" != typeof a)
                    return a;
                if ("undefined" == typeof document)
                    return new q(a);
                r || (r = document.createElement("a")),
                r.href = a;
                var b = r.protocol
                  , c = r.hostname
                  , d = r.port
                  , e = r.pathname;
                return ("http:" === b && "80" === d || "https:" === b && "443" === d) && (d = ""),
                !(b || a && "/" === a.charAt(0)) || e && "/" === e.charAt(0) || (e = "/" + e),
                {
                    href: a,
                    protocol: b,
                    hostname: c,
                    port: d,
                    host: c + (d ? ":" + d : ""),
                    pathname: e,
                    search: r.search,
                    hash: r.hash
                }
            }
            function e(a) {
                if (!a)
                    return "";
                var b = "";
                return a.protocol && (b += a.protocol),
                b += "//",
                void 0 !== a.hostname ? (b += a.hostname,
                void 0 !== a.port && "" !== a.port && (b += ":" + a.port)) : void 0 !== a.host && (b += a.host),
                a.pathname && (b += a.pathname),
                a.search && (b += a.search),
                a.hash && (b += a.hash),
                b
            }
            function f() {
                return location.origin || location.protocol + "//" + location.host
            }
            function g(a, b) {
                var c = f()
                  , d = a.substr(0, c.length) === c
                  , e = d ? a.substr(c.length) : a;
                if ("/" === e.substr(0, 1) || "http:" === e.substr(0, 5) || "https:" === e.substr(0, 6))
                    return e;
                void 0 === b && (b = location.pathname);
                var g = "";
                "/http://" === b.substr(0, 8) ? g = "/http://" : "/https://" === b.substr(0, 9) && (g = "/https://");
                var h = b.substr(g.length)
                  , i = h.split("/");
                i.splice.apply(i, [i.length - 1, 1].concat(e.split("/")));
                for (var j = [], k = 0; k < i.length; k++)
                    ".." === i[k] ? j.pop() : "" === i[k] && 0 !== k || "." === i[k] || j.push(i[k]);
                return g + j.join("/")
            }
            function h(a) {
                var b = a.substr(0, 8);
                return "/http://" === b || "/https://" === a.substr(0, 9) ? d(a.substr(1)).pathname : "/http:/" === a.substr(0, 7) ? d("http://" + a.substr(7)) : "/https:/" === b ? d("https://" + a.substr(8)) : a
            }
            function i(a) {
                var b = f()
                  , c = p.removeOrigHash(a);
                return o.startsWith(c, b) && (c = c.substr(b.length)),
                g(c)
            }
            function j(a) {
                if (!a)
                    return null;
                var b = a.indexOf("?");
                b >= 0 && (a = a.substr(0, b));
                var c = a.lastIndexOf(".");
                return c < 0 ? null : a.substr(c + 1)
            }
            function k(a) {
                var b = a.lastIndexOf("/");
                return b <= 0 ? "/" : a.substr(0, b)
            }
            function l(a, b) {
                for (var c = 0, d = a.length - 1; d >= 0; d--) {
                    var e = a[d];
                    "." === e || "" === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1),
                    c++) : c && (a.splice(d, 1),
                    c--)
                }
                if (b)
                    for (; c--; c)
                        a.unshift("..");
                return a
            }
            function m() {
                for (var a = [], b = 0; b < arguments.length; b++)
                    a[b - 0] = arguments[b];
                for (var c = "", d = !1, e = h(location.pathname), f = arguments.length - 1; f >= -1 && !d; f--) {
                    var g = f >= 0 ? arguments[f] : k(e);
                    if ("string" != typeof g)
                        throw new TypeError("Arguments to path.resolve must be strings");
                    g && (c = g + "/" + c,
                    d = "/" === g.charAt(0))
                }
                return c = l(c.split("/"), !d).join("/"),
                (d ? "/" : "") + c || "."
            }
            function n(a) {
                var c = document.baseURI;
                if (!c) {
                    var e = b.Areion.jQuery("base");
                    c = e.length > 0 ? g(e.attr("href")) : location.href
                }
                var f = d(c)
                  , h = g(p.removeOrigHash(a), f.pathname);
                return "/" === h.charAt(0) ? location.protocol + "//" + location.host + h : location.protocol + "//" + location.host + "/" + h
            }
            var o = a("../common/stringutil")
              , p = a("./urlrewriter")
              , q = a("url-parse")
              , r = null;
            c.parseUrl = d,
            c.urlToString = e,
            c.getOrigin = f,
            c.getAbsolutePath = g,
            c.getActualPathName = h,
            c.getPathName = i,
            c.getExtension = j,
            c.dirname = k,
            c.normalizeArray = l,
            c.resolve = m,
            c.getResourceUrl = n
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "../common/stringutil": 16,
        "./urlrewriter": 10,
        "url-parse": 1
    }],
    12: [function(a, b, c) {
        "use strict";
        function d(a) {
            var b = {}
              , c = a.match(/\s*([^;=]+)=([^;]*)/);
            return c ? (b.name = c[1],
            b.value = c[2],
            b.name ? (c = a.match(/;\s*path=([^;]*)/i),
            c && (b.path = c[1]),
            c = a.match(/;\s*expires=([^;]*)/i),
            c && (b.expires = c[1]),
            c = a.match(/;\s*max-age=([^;]*)/i),
            c && (b.maxage = c[1]),
            c = a.match(/;\s*domain=([^;]*)/i),
            c && (b.domain = c[1]),
            c = a.match(/;\s*secure/i),
            c && (b.secure = !0),
            c = a.match(/;\s*httponly/i),
            c && (b.httponly = !0),
            b) : null) : null
        }
        function e(a) {
            if (!a)
                return "";
            var b = a.name + "=" + a.value;
            return a.path && (b += "; path=" + a.path),
            a.expires && (b += "; expires=" + a.expires),
            a.maxage && (b += "; max-age=" + a.maxage),
            a.domain && (b += "; domain=" + a.domain),
            a.secure && (b += "; secure"),
            a.httponly && (b += "; httponly"),
            b
        }
        c.parseCookie = d,
        c.cookieToString = e
    }
    , {}],
    13: [function(a, b, c) {
        "use strict";
        function d(a) {
            return a ? a.replace(/([\\|])/g, "\\$1") : a
        }
        function e(a) {
            return a ? a.replace(/\\([\\|])/g, "$1") : a
        }
        function f(a, b, c, e) {
            if (void 0 === e && (e = null),
            !a)
                return a;
            var f = a.path;
            if (!f) {
                var g = b.pathname.lastIndexOf("/");
                f = g > 0 ? b.pathname.substr(0, g) : "/"
            }
            return {
                name: d(a.name) + "|" + d(f) + "|" + d(a.domain || "") + "|" + (a.secure ? "1|" : "0|") + d(b.hostname),
                value: (a.value || "").replace(/[\u0001-\u001f]/g, ""),
                path: "/",
                domain: c.parseUrl(c.getServerUrl(e)).hostname,
                expires: a.expires,
                secure: !1,
                httponly: !1
            }
        }
        function g(a) {
            for (var b = 0, c = a.length - 1; c >= 0; c--,
            b++)
                if ("\\" !== a.charAt(c))
                    return b;
            return a.length
        }
        function h(a) {
            if (!a || !a.name)
                return a;
            var b = a.name.split("|")
              , c = b.length;
            if (c < 5)
                return a;
            for (var d = [], f = 0; f < c; f++)
                if (0 === f)
                    d.push(b[f]);
                else {
                    var h = b[f - 1];
                    h.length,
                    g(h) % 2 == 1 ? d[d.length - 1] += "|" + b[f] : d.push(b[f])
                }
            return 5 !== d.length ? a : {
                name: e(d[0] || ""),
                value: a.value,
                path: e(d[1] || "") || "/",
                expires: a.expires,
                domain: e(d[2] || "") || void 0,
                secure: "1" === d[3],
                httponly: a.httponly,
                originDomain: e(d[4] || "")
            }
        }
        function i(a) {
            if (!a)
                return !1;
            for (var b = "string" == typeof a ? a : a.name, c = b.length, d = 0, e = 0, f = 0; f < c; f++) {
                var g = b.charAt(f);
                "\\" === g ? ++d : ("|" === g && d % 2 == 0 && ++e,
                d = 0)
            }
            return 4 === e
        }
        function j(a, b, c, d) {
            void 0 === d && (d = null);
            var e = {};
            for (var g in a)
                for (var h = a[g], i = h.length, j = 0; j < i; j++) {
                    var k = h[j];
                    void 0 === k.name && (k.name = g);
                    var l = f(k, b, c, d);
                    e[l.name] = [l]
                }
            return e
        }
        function k(a) {
            var b = {};
            for (var c in a) {
                var d = a[c][0];
                void 0 === d.name && (d.name = c);
                var e = h(d);
                b[e.name] || (b[e.name] = []),
                b[e.name].push(e)
            }
            return b
        }
        function l(a, b) {
            if (void 0 === a.originDomain)
                return !0;
            if (a.secure && "https:" !== b.protocol)
                return !1;
            if (a.domain) {
                var c = "." === a.domain.charAt(0) ? a.domain.substr(1) : a.domain;
                if (c !== b.hostname && !n.endsWith(b.hostname, "." + c))
                    return !1
            } else if (a.originDomain !== b.hostname)
                return !1;
            var d = b.pathname.lastIndexOf("/")
              , e = d >= 0 ? b.pathname.substr(0, d + 1) : "/"
              , f = a.path;
            return "/" !== f.charAt(f.length - 1) && (f += "/"),
            n.startsWith(e, f)
        }
        function m(a, b) {
            var c = {};
            for (var d in a)
                for (var e = a[d], f = e.length, g = 0; g < f; g++) {
                    void 0 === e[g].name && (e[g].name = d);
                    var i = h(e[g]);
                    l(i, b) && (c[i.name] || (c[i.name] = []),
                    c[i.name].push(i))
                }
            return c
        }
        var n = a("./stringutil");
        c.escapeCookieValue = d,
        c.unescapeCookieValue = e,
        c.rewriteCookie = f,
        c.unrewriteCookie = h,
        c.isProbablyRewritten = i,
        c.rewriteCookies = j,
        c.unrewriteCookies = k,
        c.matchesPathAndDomain = l,
        c.filterAndUnrewriteCookies = m
    }
    , {
        "./stringutil": 16
    }],
    14: [function(a, b, c) {
        "use strict";
        function d(a, b, c) {
            for (var d = [e, f, g], h = d.length, i = 0; i < h; i++)
                a = d[i](a, b, c);
            return a
        }
        function e(a, b, c) {
            a = a.replace(/(@import\s+)(?:(['"])\s*([\s\S]*?)(['"])|(url\s*\(\s*['"]?)\s*([\s\S]*?)(['"]?\s*\)))/gi, function(a, d, e, f, g, h, i, j) {
                var k = b.rewriteUrl(f || i, c, !0);
                return null === k ? a : d + (e || h) + k + (g || j)
            });
            var d = b.isProxyAllResources();
            return a.replace(/url\s*\(\s*(['"]?)\s*((?:https?:)?\/[\s\S]*?)(['"]?)\s*\)/gi, function(a, e, f, g) {
                var h = b.rewriteUrl(f, c, d);
                return null === h ? a : "url(" + e + h + g + ")"
            })
        }
        function f(a, b, c) {
            return b.isAddRandomQueryParam() ? a.replace(/url\s*\((['"]?)\s*([\s\S]*?)(['"]?)\)/gi, function(a, c, d, e) {
                return "data:" !== d.substr(0, 5) && b.matchesRandomQueryParamFileExtensions(d) ? "url(" + c + b.addRnd(d) + e + ")" : a
            }) : a
        }
        function g(a, b, c) {
            return j(a, "(\\[\\s*(?:href|src)\\s*[~^$*]?=\\s*)(['\"]?)\\s*(https?:\\/\\/[^'\"\\]]*)(['\"]?)\\s*\\]", "ig", function(a, d, e, f, g) {
                var h = b.rewriteUrl(f, c, !0)
                  , i = h.length - 1;
                return "/" !== f.charAt(f.length - 1) && "/" === h.charAt(i) && (h = h.substr(0, i)),
                d + (e || '"') + h + (g || '"') + "]"
            })
        }
        function h(a, b, c) {
            var d = /(?:\/\*(?:\s*\r?\n(?:\/\/)?)?(?:[#@]\s+sourceMappingURL=([^\s'"]*))\s*\*\/|\/\/(?:[#@]\s+sourceMappingURL=([^\s'"]*)))\s*$/g;
            return a.replace(d, function(a, d, e) {
                var f = d || e
                  , g = a.substr(0, 2)
                  , h = "/*" === g ? "*/" : "";
                if ("//" !== g && "/*" !== g)
                    return a;
                var i = b.rewriteUrl(f, c, !0, !1);
                return null === i ? a : g + "# sourceMappingURL=" + i + h
            })
        }
        function i(a) {
            var b = a.charAt(0);
            return "'" === b || '"' === b || !!/:not\(/i.test(a) || "/" === b && "*" === a.charAt(1)
        }
        function j(a, b, c, d, e, f) {
            if (void 0 === e && (e = null),
            void 0 === f && (f = null),
            !a)
                return a;
            for (var g, h, j, k = new RegExp(b,c), l = new RegExp(b,c), m = a.length, p = null, q = 0, r = [], s = 0, t = function(a) {
                for (var b = 0; b < s; b++) {
                    var c = r[b];
                    if (c.start <= a && a < c.end)
                        return !0
                }
                return !1
            }, u = "", v = 0, w = 0, x = 0, y = "", z = {}; null !== (h = l.exec(a)); )
                if (!(h.index < x)) {
                    if (null === p) {
                        p = n.partitionText(o, a),
                        q = p.length,
                        v = 0;
                        for (var A = 0; A < q; A++)
                            g = p[A],
                            i(g) && r.push({
                                start: v,
                                end: v + g.length
                            }),
                            v += g.length;
                        s = r.length
                    }
                    if (!t(h.index)) {
                        for (v = h.index; v > x && ("," !== (j = a.charAt(v - 1)) && "{" !== j && "}" !== j || t(v - 1)); v--)
                            ;
                        for (w = h.index; w < m && ("," !== (j = a.charAt(w)) && "{" !== j && "}" !== j || t(w)); w++)
                            ;
                        var B = a.substring(v, w);
                        if (u += a.substring(x, w) + "," + B.replace(k, d).trim(),
                        e && f) {
                            var C = B.match(e);
                            if (C) {
                                var D = a.substr(w).search(k);
                                v = w;
                                for (var E = null, F = w; F < m; F++) {
                                    if ("{" === (j = a.charAt(F)) && "\\" !== E && !t(F)) {
                                        ++F;
                                        break
                                    }
                                    E = j
                                }
                                for (var G = C.length, A = 0; A < G; A++) {
                                    var H = C[A].substr(1);
                                    z[H] || (y += f.replace(/\$1/, H)),
                                    z[H] = !0
                                }
                                (D < 0 || F < D + w && !t(D + w)) && (w = F,
                                u += a.substring(v, w) + y,
                                y = "",
                                z = {})
                            }
                        }
                        x = w
                    }
                }
            return u += a.substr(x)
        }
        function k(a, b, c) {
            var d = b.appname.toLowerCase()
              , e = b.addCustomCSSPropertiesForPseudos && b.addCustomCSSPropertiesForPseudos();
            return j(a, ":(active|focus|hover|visited)", "ig", ".__" + d + "-$1__", e ? new RegExp(":(?:" + e.join("|") + ")","ig") : null, "--" + d + "-has-$1:true;")
        }
        function l(a, b) {
            if (!a)
                return a;
            var c = b.appname.toLowerCase();
            return n.trim(a.replace(new RegExp("\\b__" + c + "-(?:active|focus|hover|visited)__\\b","g"), ""))
        }
        function m(a, b) {
            for (var c = b.appname.toLowerCase(), d = ["active", "focus", "hover", "visited"], e = d.length, f = 0; f < e; f++)
                if (a === "__" + c + "-" + d[f] + "__")
                    return !0;
            return !1
        }
        var n = a("./stringutil")
          , o = [{
            start: "/*",
            end: "*/"
        }, {
            start: "'",
            end: "'",
            escape: "\\"
        }, {
            start: '"',
            end: '"',
            escape: "\\"
        }, {
            start: /:not\(/i,
            startLength: 5,
            end: ")"
        }];
        c.rewriteCSS = d,
        c.rewriteCSSUrls = e,
        c.rewriteCSSAddRandomQueryParamToUrls = f,
        c.rewriteUrlAttributeSelectors = g,
        c.rewriteSourceMappings = h,
        c.addRewrittenSelectors = j,
        c.addForcePseudoStateCSSClasses = k,
        c.removePseudoStateCSSClasses = l,
        c.isPseudoStateCSSClass = m
    }
    , {
        "./stringutil": 16
    }],
    15: [function(a, b, c) {
        "use strict";
        function d(a) {
            return a.replace(/&#(x?)([0-9a-f]+);/gi, function(a, b, c) {
                return String.fromCharCode(parseInt(c, b ? 16 : 10))
            }).replace(/&amp;/g, "&").replace(/&quot;/g, '"')
        }
        function e(a) {
            return a.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/\n/g, "&#13;")
        }
        function f(a) {
            var b, c, d = [], e = a.split(","), f = e.length;
            for (b = 0; b < f; b++)
                c = e[b].trim().split(/\s+/),
                d.push({
                    url: c[0],
                    width: c[1],
                    pixelDensity: c[2]
                });
            return d
        }
        function g(a) {
            for (var b, c = "", d = a.length, e = 0; e < d; e++)
                b = a[e],
                "" != c && (c += ", "),
                c += b.url,
                b.width && (c += " " + b.width,
                b.pixelDensity && (c += " " + b.pixelDensity));
            return c
        }
        function h(a) {
            return function(b, c, d) {
                return "string" != typeof b ? b : b.replace(/(^|<\/script>|<\/style>)([\s\S]*?)(<script[^>]*>|<style[^>]*>|$)/gi, function(b, e, f, g) {
                    for (var h = f + g, i = a.length, j = 0; j < i; j++)
                        h = a[j](h, c, d);
                    return e + h
                })
            }
        }
        function i(a, b, c) {
            return "string" != typeof a ? a : a.replace(b.docRootAttributeRegexp, "$1=$2" + b.getServerUrl(c) + "/$3$4$5")
        }
        function j(a, b, c, d) {
            for (var e = f(a), h = e.length, i = !1, j = 0; j < h; j++) {
                var k = b.rewriteUrl(e[j].url, c, d);
                k && (e[j].url = k,
                i = !0)
            }
            return i ? g(e) : a
        }
        function k(a, b, c) {
            var e = b.isProxyAllResources();
            return a = a.replace(/<(\w+)(\ssrc|\s[^>]*?['"\s]src)\s*=\s*(['"])\s*((?:https?(?::|&#58;|&#x3a;))?(?:\/|&#47;|&#x2f;)[\s\S]*?)(['"])/gi, function(a, f, g, h, i, j) {
                var k = e;
                if (!k) {
                    var l = f.toUpperCase();
                    "SCRIPT" !== l && "IFRAME" !== l || (k = !0)
                }
                var m = b.rewriteUrl(d(i), c, k);
                return null === m ? a : "<" + f + g + "=" + h + m + j
            }),
            a = a.replace(/<(img|source)(\ssrcset|\s[\s\S]*?['"\s]srcset)\s*=\s*(['"])\s*((?:https?(?::|&#58;|&#x3a;))?(?:\/|&#47;|&#x2f;)[\s\S]*?)(['"])/gi, function(a, f, g, h, i, k) {
                return "<" + f + g + "=" + h + j(d(i), b, c, e) + k
            })
        }
        function l(a, b, c) {
            for (var e, f = /<iframe[^>]+src\s*=\s*['"]?data:/gi, g = /\w+\/[\w.+\-]+/, h = 0, i = ""; null !== (e = f.exec(a)); ) {
                var j = I.extractAttributeValue(a, "src", e.index);
                if (j) {
                    var k = j.value
                      , l = k.indexOf(",");
                    if (!(l < 0)) {
                        var m = k.substr(0, l + 1)
                          , n = m.match(g)
                          , o = n && n[0] || "text/html"
                          , p = k.substr(l + 1)
                          , q = !1;
                        m.indexOf("base64") >= 0 && (p = b.atob(p),
                        q = !0);
                        var r = b.processHTML(d(p), o, c);
                        i += a.substring(h, j.index) + m + (q ? b.btoa(r) : encodeURIComponent(r)),
                        h = j.index + k.length
                    }
                }
            }
            return i + a.substr(h)
        }
        function m(a, b, c) {
            for (var f, g = /<iframe[^>]+srcdoc\s*=/gi, h = 0, i = ""; null !== (f = g.exec(a)); ) {
                var j = I.extractAttributeValue(a, "srcdoc", f.index);
                j && (i += a.substring(h, j.index) + e(b.processHTML(d(j.value), "text/html", c)),
                h = j.index + j.value.length)
            }
            return i + a.substr(h)
        }
        function n(a, b, c) {
            var e = !1;
            return a.replace(/(^|<\/script>|-->)([\s\S]*?)(<script[^>]*>|<!--|$)/gi, function(a, f, g, h) {
                return e ? a : f + g.replace(/(<base(?:\s|\s[\s\S]*?[\s'"]))href=(['"])\s*([^>]*>)/i, function(a, f, g, h) {
                    if (e)
                        return a;
                    var i = g ? h.indexOf(g) : h.search(/[\s>]/);
                    if (i < 0)
                        return a;
                    if (e = !0,
                    0 === i)
                        return a;
                    var j = I.appendSlashIfNoPath(d(h.substr(0, i)))
                      , k = b.rewriteUrl(j, c, !0, !1);
                    return c && (c.htmlBaseUrl = b.parseUrl(j)),
                    null === k ? a : f + "href=" + g + k + h.substr(i)
                }) + h
            })
        }
        function o(a, b, c) {
            return a.replace(/((<a|<area|<link)(?:\s|\s[\s\S]*?[\s'"]))href=(['"])\s*((?:https?(?::|&#58;|&#x3a;))?(?:\/|&#47;|&#x2f;)[\s\S]*?)(['"])([\s\S]*?>)/gi, function(a, e, f, g, h, i, j) {
                var k = b.rewriteUrl(d(h), c, !0);
                return null === k ? a : e + "href=" + g + k + i + j
            })
        }
        function p(a, b, c) {
            return b.isRemoveLinkTargets() ? a.replace(/(<a(?:\s|\s[^>]*?['"\s]))target\s*=\s*['"]?\s*[^'">\s]*['"]?/gi, "$1") : a
        }
        function q(a, b, c) {
            return a.replace(/(<(?:link|script)(?:\s|\s[^>]*?['"\s]))charset\s*=\s*['"]?\s*[^'"\s>]*['"]?/gi, "$1")
        }
        function r(a, b, c) {
            if (!a)
                return a;
            var e = "link" === b ? "href" : "src";
            return a.replace(new RegExp(e + "\\s*=\\s*(['\"]?)\\s*([^'\"\\s>]*)(['\"]?)","ig"), function(a, b, f, g) {
                return e + "=" + (b || "") + d(f) + (f.indexOf("?") >= 0 ? "&" : "?") + "____charset=" + c + (g || "")
            })
        }
        function s(a, b, c) {
            return a.replace(/<(link|script)(\s|\s+[^>]*?['"\s])charset\s*=\s*['"]?\s*([^'"\s>]*)['"]?([^>]*)/gi, function(a, b, c, d, e) {
                return "<" + b + r(c, b, d) + r(e, b, d)
            })
        }
        function t(a, b, c) {
            return a.replace(/(<(?:link|script)(?:\s|\s[^>]*?['"\s]))integrity\s*=(?:'[^']*'|"[^"]*")/gi, "$1")
        }
        function u(a, b, c) {
            return a.replace(/((?:<form(?:\s|\s+[^>]*?['"\s])action)|(?:(?:<button|<input)(?:\s|\s+[^>]*?['"\s])formaction))=(['"])\s*((?:https?(?::|&#58;|&#x3a;))?(?:\/|&#47;|&#x2f;)[\s\S]*?)(['"])/gi, function(a, e, f, g, h) {
                var i = b.rewriteUrl(d(g), c, !0);
                return null === i ? a : e + "=" + f + i + h
            })
        }
        function v(a, b, c) {
            return a.replace(/<meta(?:\s|\s+[^>]*?['"\s])http-equiv\s*=\s*['"]?refresh['"]?[^>]*?>/gi, function(a) {
                return a.replace(/(content\s*=\s*['"]?[\s\S]+?;\s*)((?:https?:)?\/[^'">]*)(['"]?)/, function(a, e, f, g) {
                    var h = b.rewriteUrl(d(f), c, !0, !1);
                    return null === h ? a : e + h + (g || "")
                })
            })
        }
        function w(a, b, c) {
            return a.replace(/<meta(?:\s|\s+[^>]*?['"\s])http-equiv\s*=\s*['"]?content-security-policy['"]?[\s\S]*?>/gi, "")
        }
        function x(a, b, c) {
            var e = c && c.url ? {
                pathname: c.url.pathname,
                hostname: c.url.hostname || b.documentRoot.url.hostname
            } : b.parseUrl(b.getCurrentUrl());
            return a.replace(/<meta(?:\s|\s+[^>]*?['"\s])http-equiv\s*=\s*['"]?set-cookie['"]?[^>]*?>/gi, function(a) {
                return a.replace(/(content\s*=\s*['"]?)([^'">]*)(['"]?)/, function(a, f, g, h) {
                    var i = H.parseCookie(d(g));
                    return f + (i ? H.cookieToString(G.rewriteCookie(i, e, b, c)) : g) + h
                })
            })
        }
        function y(a) {
            return a = (a || "").toLowerCase(),
            a.indexOf("allow-scripts") < 0 && (a += " allow-scripts"),
            a.indexOf("allow-same-origin") < 0 && (a += " allow-same-origin"),
            a
        }
        function z(a, b, c) {
            return a.replace(/(<iframe(?:\s|\s[^>]*?['"\s]))(?:(sandbox\s*=\s*['"])([^'"]*)(['"])|(sandbox\s*=\s*)([^\s>]*))/gi, function(a, b, c, e, f, g, h) {
                return c ? b + c + y(d(e)) + (f || "") : b + g + '"' + y(d(h)) + '"'
            })
        }
        function A(a, b, c) {
            return "string" != typeof a ? a : a.replace(/(<style[\s\S]*?>)([\s\S]*?)(<\/style>)/gi, function(a, d, e, f) {
                return e ? d + F.rewriteCSS(e, b, c) + f : a
            })
        }
        function B(a, b, c) {
            return "string" != typeof a ? a : a.replace(/(<style[\s\S]*?>)([\s\S]*?)(<\/style>)/gi, function(a, d, e, f) {
                return e ? d + F.addForcePseudoStateCSSClasses(e, b, c) + f : a
            })
        }
        function C(a, b, c) {
            return a.replace(/(<[^>]+\s+style\s*=\s*)(['"]?)\s*([^>]*>)/gi, function(a, e, f, g) {
                var h = 0;
                if (f)
                    h = g.indexOf(f);
                else {
                    if (/^\\?(?:&quot;|&apos;)/.test(g))
                        return a;
                    h = g.search(/[\s>]/)
                }
                return h <= 0 ? a : e + f + F.rewriteCSSAddRandomQueryParamToUrls(F.rewriteCSSUrls(d(g.substr(0, h)), b, c), b, c) + g.substr(h)
            })
        }
        function D(a, b, c) {
            return b.isAddRandomQueryParam() ? a.replace(/(src|srcset)\s*=\s*(['"])\s*([\s\S]*?)(['"])/gi, function(a, c, e, h, i) {
                if (h = d(h),
                "srcset" === c.toLowerCase()) {
                    for (var j = f(h), k = j.length, l = !1, m = 0; m < k; m++) {
                        var n = j[m].url;
                        "data:" !== n.substr(0, 5) && b.matchesRandomQueryParamFileExtensions(n) && (j[m].url = b.addRnd(n),
                        l = !0)
                    }
                    return l ? c + "=" + e + g(j) + i : a
                }
                return "data:" !== h.substr(0, 5) && b.matchesRandomQueryParamFileExtensions(h) ? c + "=" + e + b.addRnd(h) + i : a
            }) : a
        }
        function E(a, b, c) {
            return b.isAddRandomQueryParam() ? a.replace(/(<link(?:\s|\s[^>]*?['"\s]))href=(['"])\s*([\s\S]*?)(['"])([\s\S]*?>)/gi, function(a, c, e, f, g, h) {
                return f = d(f),
                "data:" !== f.substr(0, 5) && b.matchesRandomQueryParamFileExtensions(f) ? c + "href=" + e + b.addRnd(f) + g + h : a
            }) : a
        }
        var F = a("./rewritecss")
          , G = a("./rewritecookies")
          , H = a("./cookieparser")
          , I = a("./stringutil");
        c.createPartitionedHTMLRewriter = h,
        c.rewriteHTMLDocumentRoot = i,
        c.rewriteSrcSet = j,
        c.rewriteHTMLSources = k,
        c.rewriteHTMLIframeDataURLSources = l,
        c.rewriteHTMLIframeSrcDoc = m,
        c.rewriteBaseHref = n,
        c.rewriteHTMLHrefs = o,
        c.rewriteHTMLRemoveLinkTarget = p,
        c.rewriteHTMLRemoveCharsetAttributes = q,
        c.rewriteHTMLAddCharsetToSrc = s,
        c.rewriteHTMLResourceIntegrity = t,
        c.rewriteHTMLFormActions = u,
        c.rewriteHTMLRefreshMeta = v,
        c.removeHTMLContentSecurityPolicyMeta = w,
        c.rewriteHTMLCookieMeta = x,
        c.addIframeFlags = y,
        c.rewriteHTMLIframeSandbox = z,
        c.rewriteHTMLInlineStyles = A,
        c.rewriteHTMLInlineStylesAddForcePseudoStateCSSClasses = B,
        c.rewriteHTMLInlineStyleAttributes = C,
        c.rewriteHTMLAddRandomQueryParamToSource = D,
        c.rewriteHTMLAddRandomQueryParamToLinkHrefs = E
    }
    , {
        "./cookieparser": 12,
        "./rewritecookies": 13,
        "./rewritecss": 14,
        "./stringutil": 16
    }],
    16: [function(a, b, c) {
        "use strict";
        function d(a) {
            return "string" != typeof a ? a : String.prototype.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
        }
        function e(a, b) {
            return d(a) === d(b)
        }
        function f(a, b) {
            return "string" == typeof a && ("function" == typeof a.startsWith ? a.startsWith(b) : !(b.length > a.length) && a.substr(0, b.length) === b)
        }
        function g(a, b) {
            return "string" == typeof a && ("function" == typeof a.endsWith ? a.endsWith(b) : !(b.length > a.length) && a.substr(-b.length) === b)
        }
        function h(a) {
            return a.replace(/-(\w)/g, function(a, b) {
                return b.toUpperCase()
            })
        }
        function i(a) {
            return new RegExp("^" + a.replace(/\./g, "\\.").replace(/\?/g, ".").replace(/\*/g, ".*?") + "$")
        }
        function j() {
            return Math.random().toString(36).substr(2)
        }
        function k(a) {
            return a.replace(/[A-Z]/g, function(a) {
                return "-" + a.toLowerCase()
            })
        }
        function l(a) {
            for (var b = [], c = a.length, d = 0; d < c; d++) {
                var e = a[d];
                "\r" !== e && "\n" !== e || b.push(d + 1),
                d < c - 1 && "\r" === e && "\n" === a[d + 1] && (b[b.length - 1]++,
                d++)
            }
            return b
        }
        function m(a, b) {
            for (var c = b.length - 1; c >= 0; c--)
                if (a >= b[c])
                    return c + 1;
            return 0
        }
        function n(a, b) {
            for (var c = b.length - 1; c >= 0; c--) {
                var d = b[c];
                if (a >= d)
                    return a - d
            }
            return a
        }
        function o(a, b, c) {
            return 0 === a ? b : a > c.length ? -1 : c[a - 1] + b
        }
        function p(a, b) {
            for (var c, d, e, f, g, h, i, j, k, l = [], m = b.length, n = a.length, o = [], p = new Array(n), q = 0, r = 0; ; ) {
                for (h = 0; h < n; h++)
                    if (d = a[h],
                    void 0 !== o[h] && o[h] >= q)
                        p[h] = o[h];
                    else {
                        for (k = q; ; ) {
                            if ("string" === (c = typeof d.start))
                                e = b.indexOf(d.start, k);
                            else {
                                if ("object" !== c)
                                    throw new Error("token.start must be either a string or a regular expression");
                                e = b.substr(k).search(d.start),
                                e >= 0 && (e += k)
                            }
                            if (-1 === e) {
                                e = m;
                                break
                            }
                            if (!d.before)
                                break;
                            if (e === k || /^\s+$/.test(b.substring(k, e))) {
                                for (f = "",
                                i = l.length - 1; i >= 0; i--)
                                    if ("//" !== (g = l[i].substr(0, 2)) && "/*" !== g) {
                                        f = l[i];
                                        break
                                    }
                            } else
                                f = b.substring(r, e);
                            if ("" === f || d.before.test(f))
                                break;
                            k = e + (d.startLength || d.start.length)
                        }
                        o[h] = p[h] = e
                    }
                if ((j = Math.min.apply(null, p)) === m) {
                    q < m && l.push(b.substr(q));
                    break
                }
                for (d = null,
                h = 0; h < n; h++)
                    if (p[h] === j) {
                        d = a[h];
                        break
                    }
                if (null === d)
                    break;
                if (l.push(b.substring(r, j)),
                k = j + (d.startLength || d.start.length),
                Number.isNaN(k))
                    throw new Error("offset could not be computed; if you are using a regular expression for the start token, please provide a startLength.");
                for (; ; ) {
                    if ("string" === (c = typeof d.end))
                        r = b.indexOf(d.end, k);
                    else {
                        if ("object" !== c)
                            throw new Error("token.end must be either a string or a regular expression");
                        r = b.substr(k).search(d.end),
                        r >= 0 && (r += k)
                    }
                    if (-1 === r || !d.escape || b[r - 1] !== d.escape || b[r - 2] === d.escape)
                        break;
                    k = r + d.escape.length
                }
                if (-1 === r) {
                    j < m && l.push(b.substr(j));
                    break
                }
                if (r += d.endLength || d.end.length,
                Number.isNaN(r))
                    throw new Error("posEnd could not be computed; if you are using a regular expression for the end token, please provide an endLength.");
                l.push(b.substring(j, r)),
                q = r
            }
            return l
        }
        function q(a) {
            return a.replace(/([?&])?____charset=[a-zA-Z0-9-]+(&?)/, function(b, c, d, e) {
                return 0 === e ? "" : "?" === c ? a.length > e + b.length ? "?" : "" : d || ""
            })
        }
        function r(a) {
            return "string" == typeof a && (f(a, "http://") || f(a, "https://") || f(a, "file://"))
        }
        function s(a) {
            if (!a || "string" != typeof a)
                return "";
            var b = a.indexOf("://");
            return b < 0 ? "" : a.substr(0, b + 1)
        }
        function t(a) {
            if (!a || "string" != typeof a)
                return "";
            var b = a.indexOf("://");
            b < 0 && "//" !== a.substr(0, 2) && (b = -3);
            var c = a.indexOf("@", b)
              , d = Math.max(b + 3, c + 1)
              , e = a.indexOf(":", d)
              , f = a.indexOf("/", d)
              , g = e < 0 ? f : f < 0 ? e : Math.min(e, f);
            g < 0 && (g = a.length);
            var h = c < 0 || c >= g ? b + 3 : Math.max(c + 1, b + 3);
            return a.substring(h, g)
        }
        function u(a) {
            return r(a) && a.indexOf("/", 8) < 0 ? a + "/" : a
        }
        function v(a) {
            return "text/html" === a || "application/xhtml+xml" === a
        }
        function w(a) {
            return /(application\/((x-)?ecma|(x-)?java)script)|(text\/)(javascript(1\.[0-5])?|((x-)?ecma|x-java|js|live)script)/.test(a)
        }
        function x(a) {
            return f(a, "text/") || v(a) || w(a) || "application/json" === a
        }
        function y(a) {
            var b = /type=['"](.*?)['"]/.exec(a);
            return !(null !== b && b[1] && !w(b[1].toLowerCase())) && (null === (b = /language=['"](.*?)['"]/.exec(a)) || !b[1] || "javascript" === b[1].toLowerCase())
        }
        function z(a, b, c) {
            var d = a.indexOf(b, c);
            if (d < 0)
                return null;
            for (var e, f = a.length, g = -1, h = d + b.length; h < f; h++) {
                var i = a.charAt(h);
                if (g < 0 && ("'" === i || '"' === i))
                    g = h + 1,
                    e = i;
                else if (g >= 0 && i === e)
                    return {
                        index: g,
                        value: a.substring(g, h)
                    }
            }
            return {
                index: g,
                value: a.substr(g)
            }
        }
        c.trim = d,
        c.equalsTrimmed = e,
        c.startsWith = f,
        c.endsWith = g,
        c.camelCase = h,
        c.getRegexForWildcard = i,
        c.getRandomString = j,
        c.camelCaseToHypenated = k,
        c.getLineStartIndices = l,
        c.getLineNumberFromPosition = m,
        c.getColumnNumberFromPosition = n,
        c.getIndexFromLineColumn = o,
        c.partitionText = p,
        c.removeCharsetFromQueryParams = q,
        c.isAbsoluteUrl = r,
        c.getUrlProtocol = s,
        c.getUrlHost = t,
        c.appendSlashIfNoPath = u,
        c.isHTMLType = v,
        c.isJavaScriptType = w,
        c.isTextType = x,
        c.isScriptJavaScript = y,
        c.extractAttributeValue = z
    }
    , {}],
    17: [function(a, b, c) {
        "use strict";
        function d(a) {
            var b = "_rnd=" + (Math.random() + "").substr(2)
              , c = a.indexOf("#");
            if (c >= 0) {
                var d = "?"
                  , e = a.indexOf("?");
                return e >= 0 && e < c && (d = "&"),
                a.substr(0, c) + d + b + a.substr(c)
            }
            var d = "?";
            return a.indexOf("?") >= 0 && (d = "&"),
            a + d + b
        }
        function e(a, b) {
            if ("string" != typeof a || !b)
                return !1;
            if (a.indexOf("_rnd=") >= 0)
                return !1;
            var c = a.indexOf("?")
              , d = c < 0 ? a : a.substr(0, c)
              , e = d.indexOf("#");
            e >= 0 && (d = d.substr(0, e));
            var f = d.lastIndexOf(".");
            if (f < 0)
                return !1;
            var h = d.substr(f).toLowerCase()
              , i = b.toLowerCase().indexOf(h);
            if (i < 0)
                return !1;
            var j = 0 === i ? "," : b[i - 1]
              , k = i + h.length >= b.length ? "," : b[i + h.length];
            return g.test(j) && g.test(k)
        }
        function f(a) {
            return a ? {
                regex: new RegExp("^" + a.protocol + "//" + a.host + "(?:/|$)","ig"),
                attrRegex: new RegExp("(action|background|cite|classid|codebase|data|formaction|href|icon|longdesc|manifest|poster|profile|src|usemap)\\s*=\\s*(['\"])" + a.protocol + "//" + a.host + "(?:(['\"])|/(.*?)(['\"]))","ig")
            } : {
                regex: /^$/,
                attrRegex: /^$/
            }
        }
        var g = /[\s,]/;
        c.addRnd = d,
        c.matchesRandomQueryParamFileExtensions = e,
        c.createDocRootRegExps = f
    }
    , {}]
}, {}, [6]),
function(a) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = a();
    else if ("function" == typeof define && define.amd)
        define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        b.io = a()
    }
}(function() {
    var a;
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)
                        return i(g, !0);
                    if (f)
                        return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND",
                    j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c || a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
            e(d[g]);
        return e
    }({
        1: [function(a, b, c) {
            b.exports = a("./lib/")
        }
        , {
            "./lib/": 2
        }],
        2: [function(a, b, c) {
            b.exports = a("./socket"),
            b.exports.parser = a("engine.io-parser")
        }
        , {
            "./socket": 3,
            "engine.io-parser": 19
        }],
        3: [function(a, b, c) {
            (function(c) {
                function d(a, b) {
                    if (!(this instanceof d))
                        return new d(a,b);
                    b = b || {},
                    a && "object" == typeof a && (b = a,
                    a = null),
                    a ? (a = k(a),
                    b.hostname = a.host,
                    b.secure = "https" == a.protocol || "wss" == a.protocol,
                    b.port = a.port,
                    a.query && (b.query = a.query)) : b.host && (b.hostname = k(b.host).host),
                    this.secure = null != b.secure ? b.secure : c.location && "https:" == location.protocol,
                    b.hostname && !b.port && (b.port = this.secure ? "443" : "80"),
                    this.agent = b.agent || !1,
                    this.hostname = b.hostname || (c.location ? location.hostname : "localhost"),
                    this.port = b.port || (c.location && location.port ? location.port : this.secure ? 443 : 80),
                    this.query = b.query || {},
                    "string" == typeof this.query && (this.query = m.decode(this.query)),
                    this.upgrade = !1 !== b.upgrade,
                    this.path = (b.path || "/engine.io").replace(/\/$/, "") + "/",
                    this.forceJSONP = !!b.forceJSONP,
                    this.jsonp = !1 !== b.jsonp,
                    this.forceBase64 = !!b.forceBase64,
                    this.enablesXDR = !!b.enablesXDR,
                    this.timestampParam = b.timestampParam || "t",
                    this.timestampRequests = b.timestampRequests,
                    this.transports = b.transports || ["polling", "websocket"],
                    this.readyState = "",
                    this.writeBuffer = [],
                    this.policyPort = b.policyPort || 843,
                    this.rememberUpgrade = b.rememberUpgrade || !1,
                    this.binaryType = null,
                    this.onlyBinaryUpgrades = b.onlyBinaryUpgrades,
                    this.perMessageDeflate = !1 !== b.perMessageDeflate && (b.perMessageDeflate || {}),
                    !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
                    this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
                    this.pfx = b.pfx || null,
                    this.key = b.key || null,
                    this.passphrase = b.passphrase || null,
                    this.cert = b.cert || null,
                    this.ca = b.ca || null,
                    this.ciphers = b.ciphers || null,
                    this.rejectUnauthorized = void 0 === b.rejectUnauthorized ? null : b.rejectUnauthorized;
                    var e = "object" == typeof c && c;
                    e.global === e && b.extraHeaders && Object.keys(b.extraHeaders).length > 0 && (this.extraHeaders = b.extraHeaders),
                    this.open()
                }
                function e(a) {
                    var b = {};
                    for (var c in a)
                        a.hasOwnProperty(c) && (b[c] = a[c]);
                    return b
                }
                var f = a("./transports")
                  , g = a("component-emitter")
                  , h = a("debug")("engine.io-client:socket")
                  , i = a("indexof")
                  , j = a("engine.io-parser")
                  , k = a("parseuri")
                  , l = a("parsejson")
                  , m = a("parseqs");
                b.exports = d,
                d.priorWebsocketSuccess = !1,
                g(d.prototype),
                d.protocol = j.protocol,
                d.Socket = d,
                d.Transport = a("./transport"),
                d.transports = a("./transports"),
                d.parser = a("engine.io-parser"),
                d.prototype.createTransport = function(a) {
                    //transport something ------------------------
                    h('creating transport "%s"', a);
                    var b = e(this.query);
                    return b.EIO = j.protocol,
                    b.transport = a,
                    this.id && (b.sid = this.id),
                    new f[a]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: b,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized,
                        perMessageDeflate: this.perMessageDeflate,
                        extraHeaders: this.extraHeaders
                    })
                }
                ,
                d.prototype.open = function() {
                    var a;
                    if (this.rememberUpgrade && d.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket"))
                        a = "websocket";
                    else {
                        if (0 === this.transports.length) {
                            var b = this;
                            return void setTimeout(function() {
                                b.emit("error", "No transports available")
                            }, 0)
                        }
                        a = this.transports[0]
                    }
                    this.readyState = "opening";
                    try {
                        a = this.createTransport(a)
                    } catch (a) {
                        return this.transports.shift(),
                        void this.open()
                    }
                    a.open(),
                    this.setTransport(a)
                }
                ,
                d.prototype.setTransport = function(a) {
                    h("setting transport %s", a.name);
                    var b = this;
                    this.transport && (h("clearing existing transport %s", this.transport.name),
                    this.transport.removeAllListeners()),
                    this.transport = a,
                    a.on("drain", function() {
                        b.onDrain()
                    }).on("packet", function(a) {
                        b.onPacket(a)
                    }).on("error", function(a) {
                        b.onError(a)
                    }).on("close", function() {
                        b.onClose("transport close")
                    })
                }
                ,
                d.prototype.probe = function(a) {
                    function b() {
                        if (m.onlyBinaryUpgrades) {
                            var b = !this.supportsBinary && m.transport.supportsBinary;
                            l = l || b
                        }
                        l || (h('probe transport "%s" opened', a),
                        k.send([{
                            type: "ping",
                            data: "probe"
                        }]),
                        k.once("packet", function(b) {
                            if (!l)
                                if ("pong" == b.type && "probe" == b.data) {
                                    if (h('probe transport "%s" pong', a),
                                    m.upgrading = !0,
                                    m.emit("upgrading", k),
                                    !k)
                                        return;
                                    d.priorWebsocketSuccess = "websocket" == k.name,
                                    h('pausing current transport "%s"', m.transport.name),
                                    m.transport.pause(function() {
                                        l || "closed" != m.readyState && (h("changing transport and sending upgrade packet"),
                                        j(),
                                        m.setTransport(k),
                                        k.send([{
                                            type: "upgrade"
                                        }]),
                                        m.emit("upgrade", k),
                                        k = null,
                                        m.upgrading = !1,
                                        m.flush())
                                    })
                                } else {
                                    h('probe transport "%s" failed', a);
                                    var c = new Error("probe error");
                                    c.transport = k.name,
                                    m.emit("upgradeError", c)
                                }
                        }))
                    }
                    function c() {
                        l || (l = !0,
                        j(),
                        k.close(),
                        k = null)
                    }
                    function e(b) {
                        var d = new Error("probe error: " + b);
                        d.transport = k.name,
                        c(),
                        h('probe transport "%s" failed because of error: %s', a, b),
                        m.emit("upgradeError", d)
                    }
                    function f() {
                        e("transport closed")
                    }
                    function g() {
                        e("socket closed")
                    }
                    function i(a) {
                        k && a.name != k.name && (h('"%s" works - aborting "%s"', a.name, k.name),
                        c())
                    }
                    function j() {
                        k.removeListener("open", b),
                        k.removeListener("error", e),
                        k.removeListener("close", f),
                        m.removeListener("close", g),
                        m.removeListener("upgrading", i)
                    }
                    h('probing transport "%s"', a);
                    var k = this.createTransport(a, {
                        probe: 1
                    })
                      , l = !1
                      , m = this;
                    d.priorWebsocketSuccess = !1,
                    k.once("open", b),
                    k.once("error", e),
                    k.once("close", f),
                    this.once("close", g),
                    this.once("upgrading", i),
                    k.open()
                }
                ,
                d.prototype.onOpen = function() {
                    if (h("socket open"),
                    this.readyState = "open",
                    d.priorWebsocketSuccess = "websocket" == this.transport.name,
                    this.emit("open"),
                    this.flush(),
                    "open" == this.readyState && this.upgrade && this.transport.pause) {
                        h("starting upgrade probes");
                        for (var a = 0, b = this.upgrades.length; a < b; a++)
                            this.probe(this.upgrades[a])
                    }
                }
                ,
                d.prototype.onPacket = function(a) {
                    if ("opening" == this.readyState || "open" == this.readyState)
                        switch (h('socket receive: type "%s", data "%s"', a.type, a.data),
                        this.emit("packet", a),
                        this.emit("heartbeat"),
                        a.type) {
                        case "open":
                            this.onHandshake(l(a.data));
                            break;
                        case "pong":
                            this.setPing(),
                            this.emit("pong");
                            break;
                        case "error":
                            var b = new Error("server error");
                            b.code = a.data,
                            this.onError(b);
                            break;
                        case "message":
                            this.emit("data", a.data),
                            this.emit("message", a.data)
                        }
                    else
                        h('packet received with socket readyState "%s"', this.readyState)
                }
                ,
                d.prototype.onHandshake = function(a) {
                    this.emit("handshake", a),
                    this.id = a.sid,
                    this.transport.query.sid = a.sid,
                    this.upgrades = this.filterUpgrades(a.upgrades),
                    this.pingInterval = a.pingInterval,
                    this.pingTimeout = a.pingTimeout,
                    this.onOpen(),
                    "closed" != this.readyState && (this.setPing(),
                    this.removeListener("heartbeat", this.onHeartbeat),
                    this.on("heartbeat", this.onHeartbeat))
                }
                ,
                d.prototype.onHeartbeat = function(a) {
                    clearTimeout(this.pingTimeoutTimer);
                    var b = this;
                    b.pingTimeoutTimer = setTimeout(function() {
                        "closed" != b.readyState && b.onClose("ping timeout")
                    }, a || b.pingInterval + b.pingTimeout)
                }
                ,
                d.prototype.setPing = function() {
                    var a = this;
                    clearTimeout(a.pingIntervalTimer),
                    a.pingIntervalTimer = setTimeout(function() {
                        h("writing ping packet - expecting pong within %sms", a.pingTimeout),
                        a.ping(),
                        a.onHeartbeat(a.pingTimeout)
                    }, a.pingInterval)
                }
                ,
                d.prototype.ping = function() {
                    var a = this;
                    this.sendPacket("ping", function() {
                        a.emit("ping")
                    })
                }
                ,
                d.prototype.onDrain = function() {
                    this.writeBuffer.splice(0, this.prevBufferLen),
                    this.prevBufferLen = 0,
                    0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                }
                ,
                d.prototype.flush = function() {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (h("flushing %d packets in socket", this.writeBuffer.length),
                    this.transport.send(this.writeBuffer),
                    this.prevBufferLen = this.writeBuffer.length,
                    this.emit("flush"))
                }
                ,
                d.prototype.write = d.prototype.send = function(a, b, c) {
                    return this.sendPacket("message", a, b, c),
                    this
                }
                ,
                d.prototype.sendPacket = function(a, b, c, d) {
                    if ("function" == typeof b && (d = b,
                    b = void 0),
                    "function" == typeof c && (d = c,
                    c = null),
                    "closing" != this.readyState && "closed" != this.readyState) {
                        c = c || {},
                        c.compress = !1 !== c.compress;
                        var e = {
                            type: a,
                            data: b,
                            options: c
                        };
                        this.emit("packetCreate", e),
                        this.writeBuffer.push(e),
                        d && this.once("flush", d),
                        this.flush()
                    }
                }
                ,
                d.prototype.close = function() {
                    function a() {
                        d.onClose("forced close"),
                        h("socket closing - telling transport to close"),
                        d.transport.close()
                    }
                    function b() {
                        d.removeListener("upgrade", b),
                        d.removeListener("upgradeError", b),
                        a()
                    }
                    function c() {
                        d.once("upgrade", b),
                        d.once("upgradeError", b)
                    }
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var d = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? c() : a()
                        }) : this.upgrading ? c() : a()
                    }
                    return this
                }
                ,
                d.prototype.onError = function(a) {
                    h("socket error %j", a),
                    d.priorWebsocketSuccess = !1,
                    this.emit("error", a),
                    this.onClose("transport error", a)
                }
                ,
                d.prototype.onClose = function(a, b) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        h('socket close with reason: "%s"', a);
                        var c = this;
                        clearTimeout(this.pingIntervalTimer),
                        clearTimeout(this.pingTimeoutTimer),
                        this.transport.removeAllListeners("close"),
                        this.transport.close(),
                        this.transport.removeAllListeners(),
                        this.readyState = "closed",
                        this.id = null,
                        this.emit("close", a, b),
                        c.writeBuffer = [],
                        c.prevBufferLen = 0
                    }
                }
                ,
                d.prototype.filterUpgrades = function(a) {
                    for (var b = [], c = 0, d = a.length; c < d; c++)
                        ~i(this.transports, a[c]) && b.push(a[c]);
                    return b
                }
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "./transport": 4,
            "./transports": 5,
            "component-emitter": 15,
            debug: 17,
            "engine.io-parser": 19,
            indexof: 23,
            parsejson: 26,
            parseqs: 27,
            parseuri: 28
        }],
        4: [function(a, b, c) {
            function d(a) {
                this.path = a.path,
                this.hostname = a.hostname,
                this.port = a.port,
                this.secure = a.secure,
                this.query = a.query,
                this.timestampParam = a.timestampParam,
                this.timestampRequests = a.timestampRequests,
                this.readyState = "",
                this.agent = a.agent || !1,
                this.socket = a.socket,
                this.enablesXDR = a.enablesXDR,
                this.pfx = a.pfx,
                this.key = a.key,
                this.passphrase = a.passphrase,
                this.cert = a.cert,
                this.ca = a.ca,
                this.ciphers = a.ciphers,
                this.rejectUnauthorized = a.rejectUnauthorized,
                this.extraHeaders = a.extraHeaders
            }
            var e = a("engine.io-parser")
              , f = a("component-emitter");
            b.exports = d,
            f(d.prototype),
            d.prototype.onError = function(a, b) {
                var c = new Error(a);
                return c.type = "TransportError",
                c.description = b,
                this.emit("error", c),
                this
            }
            ,
            d.prototype.open = function() {
                return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening",
                this.doOpen()),
                this
            }
            ,
            d.prototype.close = function() {
                return "opening" != this.readyState && "open" != this.readyState || (this.doClose(),
                this.onClose()),
                this
            }
            ,
            d.prototype.send = function(a) {
                if ("open" != this.readyState)
                    throw new Error("Transport not open");
                this.write(a)
            }
            ,
            d.prototype.onOpen = function() {
                this.readyState = "open",
                this.writable = !0,
                this.emit("open")
            }
            ,
            d.prototype.onData = function(a) {
                var b = e.decodePacket(a, this.socket.binaryType);
                this.onPacket(b)
            }
            ,
            d.prototype.onPacket = function(a) {
                this.emit("packet", a)
            }
            ,
            d.prototype.onClose = function() {
                this.readyState = "closed",
                this.emit("close")
            }
        }
        , {
            "component-emitter": 15,
            "engine.io-parser": 19
        }],
        5: [function(a, b, c) {
            (function(b) {
                function d(a) {
                    var c = !1
                      , d = !1
                      , h = !1 !== a.jsonp;
                    if (b.location) {
                        var i = "https:" == location.protocol
                          , j = location.port;
                        j || (j = i ? 443 : 80),
                        c = a.hostname != location.hostname || j != a.port,
                        d = a.secure != i
                    }
                    if (a.xdomain = c,
                    a.xscheme = d,
                    "open"in new e(a) && !a.forceJSONP)
                        return new f(a);
                    if (!h)
                        throw new Error("JSONP disabled");
                    return new g(a)
                }
                var e = a("xmlhttprequest-ssl")
                  , f = a("./polling-xhr")
                  , g = a("./polling-jsonp")
                  , h = a("./websocket");
                c.polling = d,
                c.websocket = h
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "./polling-jsonp": 6,
            "./polling-xhr": 7,
            "./websocket": 9,
            "xmlhttprequest-ssl": 10
        }],
        6: [function(a, b, c) {
            (function(c) {
                function d() {}
                function e(a) {
                    f.call(this, a),
                    this.query = this.query || {},
                    h || (c.___eio || (c.___eio = []),
                    h = c.___eio),
                    this.index = h.length;
                    var b = this;
                    h.push(function(a) {
                        b.onData(a)
                    }),
                    this.query.j = this.index,
                    c.document && c.addEventListener && c.addEventListener("beforeunload", function() {
                        b.script && (b.script.onerror = d)
                    }, !1)
                }
                var f = a("./polling")
                  , g = a("component-inherit");
                b.exports = e;
                var h, i = /\n/g, j = /\\n/g;
                g(e, f),
                e.prototype.supportsBinary = !1,
                e.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script),
                    this.script = null),
                    this.form && (this.form.parentNode.removeChild(this.form),
                    this.form = null,
                    this.iframe = null),
                    f.prototype.doClose.call(this)
                }
                ,
                e.prototype.doPoll = function() {
                    var a = this
                      , b = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script),
                    this.script = null),
                    b.async = !0,
                    b.src = this.uri(),
                    b.onerror = function(b) {
                        a.onError("jsonp poll error", b)
                    }
                    ;
                    var c = document.getElementsByTagName("script")[0];
                    c ? c.parentNode.insertBefore(b, c) : (document.head || document.body).appendChild(b),
                    this.script = b,
                    "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                        var a = document.createElement("iframe");
                        document.body.appendChild(a),
                        document.body.removeChild(a)
                    }, 100)
                }
                ,
                e.prototype.doWrite = function(a, b) {
                    function c() {
                        d(),
                        b()
                    }
                    function d() {
                        if (e.iframe)
                            try {
                                e.form.removeChild(e.iframe)
                            } catch (a) {
                                e.onError("jsonp polling iframe removal error", a)
                            }
                        try {
                            var a = '<iframe src="javascript:0" name="' + e.iframeId + '">';
                            f = document.createElement(a)
                        } catch (a) {
                            f = document.createElement("iframe"),
                            f.name = e.iframeId,
                            f.src = "javascript:0"
                        }
                        f.id = e.iframeId,
                        e.form.appendChild(f),
                        e.iframe = f
                    }
                    var e = this;
                    if (!this.form) {
                        var f, g = document.createElement("form"), h = document.createElement("textarea"), k = this.iframeId = "eio_iframe_" + this.index;
                        g.className = "socketio",
                        g.style.position = "absolute",
                        g.style.top = "-1000px",
                        g.style.left = "-1000px",
                        g.target = k,
                        g.method = "POST",
                        g.setAttribute("accept-charset", "utf-8"),
                        h.name = "d",
                        g.appendChild(h),
                        document.body.appendChild(g),
                        this.form = g,
                        this.area = h
                    }
                    this.form.action = this.uri(),
                    d(),
                    a = a.replace(j, "\\\n"),
                    this.area.value = a.replace(i, "\\n");
                    try {
                        this.form.submit()
                    } catch (a) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" == e.iframe.readyState && c()
                    }
                    : this.iframe.onload = c
                }
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "./polling": 8,
            "component-inherit": 16
        }],
        7: [function(a, b, c) {
            (function(c) {
                function d() {}
                function e(a) {
                    if (i.call(this, a),
                    c.location) {
                        var b = "https:" == location.protocol
                          , d = location.port;
                        d || (d = b ? 443 : 80),
                        this.xd = a.hostname != c.location.hostname || d != a.port,
                        this.xs = a.secure != b
                    } else
                        this.extraHeaders = a.extraHeaders
                }
                function f(a) {
                    this.method = a.method || "GET",
                    this.uri = a.uri,
                    this.xd = !!a.xd,
                    this.xs = !!a.xs,
                    this.async = !1 !== a.async,
                    this.data = void 0 != a.data ? a.data : null,
                    this.agent = a.agent,
                    this.isBinary = a.isBinary,
                    this.supportsBinary = a.supportsBinary,
                    this.enablesXDR = a.enablesXDR,
                    this.pfx = a.pfx,
                    this.key = a.key,
                    this.passphrase = a.passphrase,
                    this.cert = a.cert,
                    this.ca = a.ca,
                    this.ciphers = a.ciphers,
                    this.rejectUnauthorized = a.rejectUnauthorized,
                    this.extraHeaders = a.extraHeaders,
                    this.create()
                }
                function g() {
                    for (var a in f.requests)
                        f.requests.hasOwnProperty(a) && f.requests[a].abort()
                }
                var h = a("xmlhttprequest-ssl")
                  , i = a("./polling")
                  , j = a("component-emitter")
                  , k = a("component-inherit")
                  , l = a("debug")("engine.io-client:polling-xhr");
                b.exports = e,
                b.exports.Request = f,
                k(e, i),
                e.prototype.supportsBinary = !0,
                e.prototype.request = function(a) {
                    return a = a || {},
                    a.uri = this.uri(),
                    a.xd = this.xd,
                    a.xs = this.xs,
                    a.agent = this.agent || !1,
                    a.supportsBinary = this.supportsBinary,
                    a.enablesXDR = this.enablesXDR,
                    a.pfx = this.pfx,
                    a.key = this.key,
                    a.passphrase = this.passphrase,
                    a.cert = this.cert,
                    a.ca = this.ca,
                    a.ciphers = this.ciphers,
                    a.rejectUnauthorized = this.rejectUnauthorized,
                    a.extraHeaders = this.extraHeaders,
                    new f(a)
                }
                ,
                e.prototype.doWrite = function(a, b) {
                    var c = "string" != typeof a && void 0 !== a
                      , d = this.request({
                        method: "POST",
                        data: a,
                        isBinary: c
                    })
                      , e = this;
                    d.on("success", b),
                    d.on("error", function(a) {
                        e.onError("xhr post error", a)
                    }),
                    this.sendXhr = d
                }
                ,
                e.prototype.doPoll = function() {
                    l("xhr poll");
                    var a = this.request()
                      , b = this;
                    a.on("data", function(a) {
                        b.onData(a)
                    }),
                    a.on("error", function(a) {
                        b.onError("xhr poll error", a)
                    }),
                    this.pollXhr = a
                }
                ,
                j(f.prototype),
                f.prototype.create = function() {
                    var a = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    a.pfx = this.pfx,
                    a.key = this.key,
                    a.passphrase = this.passphrase,
                    a.cert = this.cert,
                    a.ca = this.ca,
                    a.ciphers = this.ciphers,
                    a.rejectUnauthorized = this.rejectUnauthorized;
                    var b = this.xhr = new h(a)
                      , d = this;
                    try {
                        l("xhr open %s: %s", this.method, this.uri),
                        b.open(this.method, this.uri, this.async);
                        try {
                            if (this.extraHeaders) {
                                b.setDisableHeaderCheck(!0);
                                for (var e in this.extraHeaders)
                                    this.extraHeaders.hasOwnProperty(e) && b.setRequestHeader(e, this.extraHeaders[e])
                            }
                        } catch (a) {}
                        if (this.supportsBinary && (b.responseType = "arraybuffer"),
                        "POST" == this.method)
                            try {
                                this.isBinary ? b.setRequestHeader("Content-type", "application/octet-stream") : b.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                            } catch (a) {}
                        "withCredentials"in b && (b.withCredentials = !0),
                        this.hasXDR() ? (b.onload = function() {
                            d.onLoad()
                        }
                        ,
                        b.onerror = function() {
                            d.onError(b.responseText)
                        }
                        ) : b.onreadystatechange = function() {
                            4 == b.readyState && (200 == b.status || 1223 == b.status ? d.onLoad() : setTimeout(function() {
                                d.onError(b.status)
                            }, 0))
                        }
                        ,
                        l("xhr data %s", this.data),
                        b.send(this.data)
                    } catch (a) {
                        return void setTimeout(function() {
                            d.onError(a)
                        }, 0)
                    }
                    c.document && (this.index = f.requestsCount++,
                    f.requests[this.index] = this)
                }
                ,
                f.prototype.onSuccess = function() {
                    this.emit("success"),
                    this.cleanup()
                }
                ,
                f.prototype.onData = function(a) {
                    this.emit("data", a),
                    this.onSuccess()
                }
                ,
                f.prototype.onError = function(a) {
                    this.emit("error", a),
                    this.cleanup(!0)
                }
                ,
                f.prototype.cleanup = function(a) {
                    if (void 0 !== this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = d : this.xhr.onreadystatechange = d,
                        a)
                            try {
                                this.xhr.abort()
                            } catch (a) {}
                        c.document && delete f.requests[this.index],
                        this.xhr = null
                    }
                }
                ,
                f.prototype.onLoad = function() {
                    var a;
                    try {
                        var b;
                        try {
                            b = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (a) {}
                        if ("application/octet-stream" === b)
                            a = this.xhr.response;
                        else if (this.supportsBinary)
                            try {
                                a = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                            } catch (b) {
                                for (var c = new Uint8Array(this.xhr.response), d = [], e = 0, f = c.length; e < f; e++)
                                    d.push(c[e]);
                                a = String.fromCharCode.apply(null, d)
                            }
                        else
                            a = this.xhr.responseText
                    } catch (a) {
                        this.onError(a)
                    }
                    null != a && this.onData(a)
                }
                ,
                f.prototype.hasXDR = function() {
                    return void 0 !== c.XDomainRequest && !this.xs && this.enablesXDR
                }
                ,
                f.prototype.abort = function() {
                    this.cleanup()
                }
                ,
                c.document && (f.requestsCount = 0,
                f.requests = {},
                c.attachEvent ? c.attachEvent("onunload", g) : c.addEventListener && c.addEventListener("beforeunload", g, !1))
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "./polling": 8,
            "component-emitter": 15,
            "component-inherit": 16,
            debug: 17,
            "xmlhttprequest-ssl": 10
        }],
        8: [function(a, b, c) {
            function d(a) {
                var b = a && a.forceBase64;
                k && !b || (this.supportsBinary = !1),
                e.call(this, a)
            }
            var e = a("../transport")
              , f = a("parseqs")
              , g = a("engine.io-parser")
              , h = a("component-inherit")
              , i = a("yeast")
              , j = a("debug")("engine.io-client:polling");
            b.exports = d;
            var k = function() {
                return null != new (a("xmlhttprequest-ssl"))({
                    xdomain: !1
                }).responseType
            }();
            h(d, e),
            d.prototype.name = "polling",
            d.prototype.doOpen = function() {
                this.poll()
            }
            ,
            d.prototype.pause = function(a) {
                function b() {
                    j("paused"),
                    c.readyState = "paused",
                    a()
                }
                var c = this;
                if (this.readyState = "pausing",
                this.polling || !this.writable) {
                    var d = 0;
                    this.polling && (j("we are currently polling - waiting to pause"),
                    d++,
                    this.once("pollComplete", function() {
                        j("pre-pause polling complete"),
                        --d || b()
                    })),
                    this.writable || (j("we are currently writing - waiting to pause"),
                    d++,
                    this.once("drain", function() {
                        j("pre-pause writing complete"),
                        --d || b()
                    }))
                } else
                    b()
            }
            ,
            d.prototype.poll = function() {
                j("polling"),
                this.polling = !0,
                this.doPoll(),
                this.emit("poll")
            }
            ,
            d.prototype.onData = function(a) {
                var b = this;
                j("polling got data %s", a);
                var c = function(a, c, d) {
                    if ("opening" == b.readyState && b.onOpen(),
                    "close" == a.type)
                        return b.onClose(),
                        !1;
                    b.onPacket(a)
                };
                g.decodePayload(a, this.socket.binaryType, c),
                "closed" != this.readyState && (this.polling = !1,
                this.emit("pollComplete"),
                "open" == this.readyState ? this.poll() : j('ignoring poll - transport state "%s"', this.readyState))
            }
            ,
            d.prototype.doClose = function() {
                function a() {
                    j("writing close packet"),
                    b.write([{
                        type: "close"
                    }])
                }
                var b = this;
                "open" == this.readyState ? (j("transport open - closing"),
                a()) : (j("transport not open - deferring close"),
                this.once("open", a))
            }
            ,
            d.prototype.write = function(a) {
                var b = this;
                this.writable = !1;
                var c = function() {
                    b.writable = !0,
                    b.emit("drain")
                }
                  , b = this;
                g.encodePayload(a, this.supportsBinary, function(a) {
                    b.doWrite(a, c)
                })
            }
            ,
            d.prototype.uri = function() {
                var a = this.query || {}
                  , b = this.secure ? "https" : "http"
                  , c = "";
                return !1 !== this.timestampRequests && (a[this.timestampParam] = i()),
                this.supportsBinary || a.sid || (a.b64 = 1),
                a = f.encode(a),
                this.port && ("https" == b && 443 != this.port || "http" == b && 80 != this.port) && (c = ":" + this.port),
                a.length && (a = "?" + a),
                b + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
            }
        }
        , {
            "../transport": 4,
            "component-inherit": 16,
            debug: 17,
            "engine.io-parser": 19,
            parseqs: 27,
            "xmlhttprequest-ssl": 10,
            yeast: 30
        }],
        9: [function(a, b, c) {
            (function(c) {
                function d(a) {
                    a && a.forceBase64 && (this.supportsBinary = !1),
                    this.perMessageDeflate = a.perMessageDeflate,
                    e.call(this, a)
                }
                var e = a("../transport")
                  , f = a("engine.io-parser")
                  , g = a("parseqs")
                  , h = a("component-inherit")
                  , i = a("yeast")
                  , j = a("debug")("engine.io-client:websocket")
                  , k = c.WebSocket || c.MozWebSocket
                  , l = k;
                if (!l && "undefined" == typeof window)
                    try {
                        l = a("ws")
                    } catch (a) {}
                b.exports = d,
                h(d, e),
                d.prototype.name = "websocket",
                d.prototype.supportsBinary = !0,
                d.prototype.doOpen = function() {
                    if (this.check()) {
                        var a = this.uri()
                          , b = {
                            agent: this.agent,
                            perMessageDeflate: this.perMessageDeflate
                        };
                        b.pfx = this.pfx,
                        b.key = this.key,
                        b.passphrase = this.passphrase,
                        b.cert = this.cert,
                        b.ca = this.ca,
                        b.ciphers = this.ciphers,
                        b.rejectUnauthorized = this.rejectUnauthorized,
                        this.extraHeaders && (b.headers = this.extraHeaders),
                        this.ws = k ? new l(a) : new l(a,void 0,b),
                        void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                        this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                        this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer",
                        this.addEventListeners()
                    }
                }
                ,
                d.prototype.addEventListeners = function() {
                    var a = this;
                    this.ws.onopen = function() {
                        a.onOpen()
                    }
                    ,
                    this.ws.onclose = function() {
                        a.onClose()
                    }
                    ,
                    this.ws.onmessage = function(b) {
                        a.onData(b.data)
                    }
                    ,
                    this.ws.onerror = function(b) {
                        a.onError("websocket error", b)
                    }
                }
                ,
                "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (d.prototype.onData = function(a) {
                    var b = this;
                    setTimeout(function() {
                        e.prototype.onData.call(b, a)
                    }, 0)
                }
                ),
                d.prototype.write = function(a) {
                    function b() {
                        d.emit("flush"),
                        setTimeout(function() {
                            d.writable = !0,
                            d.emit("drain")
                        }, 0)
                    }
                    var d = this;
                    this.writable = !1;
                    for (var e = a.length, g = 0, h = e; g < h; g++)
                        !function(a) {
                            f.encodePacket(a, d.supportsBinary, function(f) {
                                if (!k) {
                                    var g = {};
                                    if (a.options && (g.compress = a.options.compress),
                                    d.perMessageDeflate) {
                                        ("string" == typeof f ? c.Buffer.byteLength(f) : f.length) < d.perMessageDeflate.threshold && (g.compress = !1)
                                    }
                                }
                                try {
                                    k ? d.ws.send(f) : d.ws.send(f, g)
                                } catch (a) {
                                    j("websocket closed before onclose event")
                                }
                                --e || b()
                            })
                        }(a[g])
                }
                ,
                d.prototype.onClose = function() {
                    e.prototype.onClose.call(this)
                }
                ,
                d.prototype.doClose = function() {
                    void 0 !== this.ws && this.ws.close()
                }
                ,
                d.prototype.uri = function() {
                    var a = this.query || {}
                      , b = this.secure ? "wss" : "ws"
                      , c = "";
                    return this.port && ("wss" == b && 443 != this.port || "ws" == b && 80 != this.port) && (c = ":" + this.port),
                    this.timestampRequests && (a[this.timestampParam] = i()),
                    this.supportsBinary || (a.b64 = 1),
                    a = g.encode(a),
                    a.length && (a = "?" + a),
                    b + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
                }
                ,
                d.prototype.check = function() {
                    return !(!l || "__initialize"in l && this.name === d.prototype.name)
                }
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "../transport": 4,
            "component-inherit": 16,
            debug: 17,
            "engine.io-parser": 19,
            parseqs: 27,
            ws: void 0,
            yeast: 30
        }],
        10: [function(a, b, c) {
            var d = a("has-cors");
            b.exports = function(a) {
                var b = a.xdomain
                  , c = a.xscheme
                  , e = a.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!b || d))
                        return new XMLHttpRequest
                } catch (a) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !c && e)
                        return new XDomainRequest
                } catch (a) {}
                if (!b)
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (a) {}
            }
        }
        , {
            "has-cors": 22
        }],
        11: [function(a, b, c) {
            function d(a, b, c) {
                function d(a, e) {
                    if (d.count <= 0)
                        throw new Error("after called too many times");
                    --d.count,
                    a ? (f = !0,
                    b(a),
                    b = c) : 0 !== d.count || f || b(null, e)
                }
                var f = !1;
                return c = c || e,
                d.count = a,
                0 === a ? b() : d
            }
            function e() {}
            b.exports = d
        }
        , {}],
        12: [function(a, b, c) {
            b.exports = function(a, b, c) {
                var d = a.byteLength;
                if (b = b || 0,
                c = c || d,
                a.slice)
                    return a.slice(b, c);
                if (b < 0 && (b += d),
                c < 0 && (c += d),
                c > d && (c = d),
                b >= d || b >= c || 0 === d)
                    return new ArrayBuffer(0);
                for (var e = new Uint8Array(a), f = new Uint8Array(c - b), g = b, h = 0; g < c; g++,
                h++)
                    f[h] = e[g];
                return f.buffer
            }
        }
        , {}],
        13: [function(a, b, c) {
            !function(a) {
                "use strict";
                c.encode = function(b) {
                    var c, d = new Uint8Array(b), e = d.length, f = "";
                    for (c = 0; c < e; c += 3)
                        f += a[d[c] >> 2],
                        f += a[(3 & d[c]) << 4 | d[c + 1] >> 4],
                        f += a[(15 & d[c + 1]) << 2 | d[c + 2] >> 6],
                        f += a[63 & d[c + 2]];
                    return e % 3 == 2 ? f = f.substring(0, f.length - 1) + "=" : e % 3 == 1 && (f = f.substring(0, f.length - 2) + "=="),
                    f
                }
                ,
                c.decode = function(b) {
                    var c, d, e, f, g, h = .75 * b.length, i = b.length, j = 0;
                    "=" === b[b.length - 1] && (h--,
                    "=" === b[b.length - 2] && h--);
                    var k = new ArrayBuffer(h)
                      , l = new Uint8Array(k);
                    for (c = 0; c < i; c += 4)
                        d = a.indexOf(b[c]),
                        e = a.indexOf(b[c + 1]),
                        f = a.indexOf(b[c + 2]),
                        g = a.indexOf(b[c + 3]),
                        l[j++] = d << 2 | e >> 4,
                        l[j++] = (15 & e) << 4 | f >> 2,
                        l[j++] = (3 & f) << 6 | 63 & g;
                    return k
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }
        , {}],
        14: [function(a, b, c) {
            (function(a) {
                function c(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b];
                        if (c.buffer instanceof ArrayBuffer) {
                            var d = c.buffer;
                            if (c.byteLength !== d.byteLength) {
                                var e = new Uint8Array(c.byteLength);
                                e.set(new Uint8Array(d,c.byteOffset,c.byteLength)),
                                d = e.buffer
                            }
                            a[b] = d
                        }
                    }
                }
                function d(a, b) {
                    b = b || {};
                    var d = new f;
                    c(a);
                    for (var e = 0; e < a.length; e++)
                        d.append(a[e]);
                    return b.type ? d.getBlob(b.type) : d.getBlob()
                }
                function e(a, b) {
                    return c(a),
                    new Blob(a,b || {})
                }
                var f = a.BlobBuilder || a.WebKitBlobBuilder || a.MSBlobBuilder || a.MozBlobBuilder
                  , g = function() {
                    try {
                        return 2 === new Blob(["hi"]).size
                    } catch (a) {
                        return !1
                    }
                }()
                  , h = g && function() {
                    try {
                        return 2 === new Blob([new Uint8Array([1, 2])]).size
                    } catch (a) {
                        return !1
                    }
                }()
                  , i = f && f.prototype.append && f.prototype.getBlob;
                b.exports = function() {
                    return g ? h ? a.Blob : e : i ? d : void 0
                }()
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {}],
        15: [function(a, b, c) {
            function d(a) {
                if (a)
                    return e(a)
            }
            function e(a) {
                for (var b in d.prototype)
                    a[b] = d.prototype[b];
                return a
            }
            b.exports = d,
            d.prototype.on = d.prototype.addEventListener = function(a, b) {
                return this._callbacks = this._callbacks || {},
                (this._callbacks[a] = this._callbacks[a] || []).push(b),
                this
            }
            ,
            d.prototype.once = function(a, b) {
                function c() {
                    d.off(a, c),
                    b.apply(this, arguments)
                }
                var d = this;
                return this._callbacks = this._callbacks || {},
                c.fn = b,
                this.on(a, c),
                this
            }
            ,
            d.prototype.off = d.prototype.removeListener = d.prototype.removeAllListeners = d.prototype.removeEventListener = function(a, b) {
                if (this._callbacks = this._callbacks || {},
                0 == arguments.length)
                    return this._callbacks = {},
                    this;
                var c = this._callbacks[a];
                if (!c)
                    return this;
                if (1 == arguments.length)
                    return delete this._callbacks[a],
                    this;
                for (var d, e = 0; e < c.length; e++)
                    if ((d = c[e]) === b || d.fn === b) {
                        c.splice(e, 1);
                        break
                    }
                return this
            }
            ,
            d.prototype.emit = function(a) {
                this._callbacks = this._callbacks || {};
                var b = [].slice.call(arguments, 1)
                  , c = this._callbacks[a];
                if (c) {
                    c = c.slice(0);
                    for (var d = 0, e = c.length; d < e; ++d)
                        c[d].apply(this, b)
                }
                return this
            }
            ,
            d.prototype.listeners = function(a) {
                return this._callbacks = this._callbacks || {},
                this._callbacks[a] || []
            }
            ,
            d.prototype.hasListeners = function(a) {
                return !!this.listeners(a).length
            }
        }
        , {}],
        16: [function(a, b, c) {
            b.exports = function(a, b) {
                var c = function() {};
                c.prototype = b.prototype,
                a.prototype = new c,
                a.prototype.constructor = a
            }
        }
        , {}],
        17: [function(a, b, c) {
            function d() {
                return "WebkitAppearance"in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }
            function e() {
                var a = arguments
                  , b = this.useColors;
                if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + c.humanize(this.diff),
                !b)
                    return a;
                var d = "color: " + this.color;
                a = [a[0], d, "color: inherit"].concat(Array.prototype.slice.call(a, 1));
                var e = 0
                  , f = 0;
                return a[0].replace(/%[a-z%]/g, function(a) {
                    "%%" !== a && (e++,
                    "%c" === a && (f = e))
                }),
                a.splice(f, 0, d),
                a
            }
            function f() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }
            function g(a) {
                try {
                    null == a ? c.storage.removeItem("debug") : c.storage.debug = a
                } catch (a) {}
            }
            function h() {
                var a;
                try {
                    a = c.storage.debug
                } catch (a) {}
                return a
            }
            c = b.exports = a("./debug"),
            c.log = f,
            c.formatArgs = e,
            c.save = g,
            c.load = h,
            c.useColors = d,
            c.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
                try {
                    return window.localStorage
                } catch (a) {}
            }(),
            c.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
            c.formatters.j = function(a) {
                return JSON.stringify(a)
            }
            ,
            c.enable(h())
        }
        , {
            "./debug": 18
        }],
        18: [function(a, b, c) {
            function d() {
                return c.colors[k++ % c.colors.length]
            }
            function e(a) {
                function b() {}
                function e() {
                    var a = e
                      , b = +new Date
                      , f = b - (j || b);
                    a.diff = f,
                    a.prev = j,
                    a.curr = b,
                    j = b,
                    null == a.useColors && (a.useColors = c.useColors()),
                    null == a.color && a.useColors && (a.color = d());
                    var g = Array.prototype.slice.call(arguments);
                    g[0] = c.coerce(g[0]),
                    "string" != typeof g[0] && (g = ["%o"].concat(g));
                    var h = 0;
                    g[0] = g[0].replace(/%([a-z%])/g, function(b, d) {
                        if ("%%" === b)
                            return b;
                        h++;
                        var e = c.formatters[d];
                        if ("function" == typeof e) {
                            var f = g[h];
                            b = e.call(a, f),
                            g.splice(h, 1),
                            h--
                        }
                        return b
                    }),
                    "function" == typeof c.formatArgs && (g = c.formatArgs.apply(a, g)),
                    (e.log || c.log || console.log.bind(console)).apply(a, g)
                }
                b.enabled = !1,
                e.enabled = !0;
                var f = c.enabled(a) ? e : b;
                return f.namespace = a,
                f
            }
            function f(a) {
                c.save(a);
                for (var b = (a || "").split(/[\s,]+/), d = b.length, e = 0; e < d; e++)
                    b[e] && (a = b[e].replace(/\*/g, ".*?"),
                    "-" === a[0] ? c.skips.push(new RegExp("^" + a.substr(1) + "$")) : c.names.push(new RegExp("^" + a + "$")))
            }
            function g() {
                c.enable("")
            }
            function h(a) {
                var b, d;
                for (b = 0,
                d = c.skips.length; b < d; b++)
                    if (c.skips[b].test(a))
                        return !1;
                for (b = 0,
                d = c.names.length; b < d; b++)
                    if (c.names[b].test(a))
                        return !0;
                return !1
            }
            function i(a) {
                return a instanceof Error ? a.stack || a.message : a
            }
            c = b.exports = e,
            c.coerce = i,
            c.disable = g,
            c.enable = f,
            c.enabled = h,
            c.humanize = a("ms"),
            c.names = [],
            c.skips = [],
            c.formatters = {};
            var j, k = 0
        }
        , {
            ms: 25
        }],
        19: [function(a, b, c) {
            (function(b) {
                function d(a, b) {
                    return b("b" + c.packets[a.type] + a.data.data)
                }
                function e(a, b, d) {
                    if (!b)
                        return c.encodeBase64Packet(a, d);
                    var e = a.data
                      , f = new Uint8Array(e)
                      , g = new Uint8Array(1 + e.byteLength);
                    g[0] = r[a.type];
                    for (var h = 0; h < f.length; h++)
                        g[h + 1] = f[h];
                    return d(g.buffer)
                }
                function f(a, b, d) {
                    if (!b)
                        return c.encodeBase64Packet(a, d);
                    var e = new FileReader;
                    return e.onload = function() {
                        a.data = e.result,
                        c.encodePacket(a, b, !0, d)
                    }
                    ,
                    e.readAsArrayBuffer(a.data)
                }
                function g(a, b, d) {
                    if (!b)
                        return c.encodeBase64Packet(a, d);
                    if (q)
                        return f(a, b, d);
                    var e = new Uint8Array(1);
                    return e[0] = r[a.type],
                    d(new u([e.buffer, a.data]))
                }
                function h(a, b, c) {
                    for (var d = new Array(a.length), e = m(a.length, c), f = 0; f < a.length; f++)
                        !function(a, c, e) {
                            b(c, function(b, c) {
                                d[a] = c,
                                e(b, d)
                            })
                        }(f, a[f], e)
                }
                var i = a("./keys")
                  , j = a("has-binary")
                  , k = a("arraybuffer.slice")
                  , l = a("base64-arraybuffer")
                  , m = a("after")
                  , n = a("utf8")
                  , o = navigator.userAgent.match(/Android/i)
                  , p = /PhantomJS/i.test(navigator.userAgent)
                  , q = o || p;
                c.protocol = 3;
                var r = c.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                }
                  , s = i(r)
                  , t = {
                    type: "error",
                    data: "parser error"
                }
                  , u = a("blob");
                c.encodePacket = function(a, c, f, h) {
                    "function" == typeof c && (h = c,
                    c = !1),
                    "function" == typeof f && (h = f,
                    f = null);
                    var i = void 0 === a.data ? void 0 : a.data.buffer || a.data;
                    if (b.ArrayBuffer && i instanceof ArrayBuffer)
                        return e(a, c, h);
                    if (u && i instanceof b.Blob)
                        return g(a, c, h);
                    if (i && i.base64)
                        return d(a, h);
                    var j = r[a.type];
                    return void 0 !== a.data && (j += f ? n.encode(String(a.data)) : String(a.data)),
                    h("" + j)
                }
                ,
                c.encodeBase64Packet = function(a, d) {
                    var e = "b" + c.packets[a.type];
                    if (u && a.data instanceof b.Blob) {
                        var f = new FileReader;
                        return f.onload = function() {
                            var a = f.result.split(",")[1];
                            d(e + a)
                        }
                        ,
                        f.readAsDataURL(a.data)
                    }
                    var g;
                    try {
                        g = String.fromCharCode.apply(null, new Uint8Array(a.data))
                    } catch (b) {
                        for (var h = new Uint8Array(a.data), i = new Array(h.length), j = 0; j < h.length; j++)
                            i[j] = h[j];
                        g = String.fromCharCode.apply(null, i)
                    }
                    return e += b.btoa(g),
                    d(e)
                }
                ,
                c.decodePacket = function(a, b, d) {
                    if ("string" == typeof a || void 0 === a) {
                        if ("b" == a.charAt(0))
                            return c.decodeBase64Packet(a.substr(1), b);
                        if (d)
                            try {
                                a = n.decode(a)
                            } catch (a) {
                                return t
                            }
                        var e = a.charAt(0);
                        return Number(e) == e && s[e] ? a.length > 1 ? {
                            type: s[e],
                            data: a.substring(1)
                        } : {
                            type: s[e]
                        } : t
                    }
                    var f = new Uint8Array(a)
                      , e = f[0]
                      , g = k(a, 1);
                    return u && "blob" === b && (g = new u([g])),
                    {
                        type: s[e],
                        data: g
                    }
                }
                ,
                c.decodeBase64Packet = function(a, c) {
                    var d = s[a.charAt(0)];
                    if (!b.ArrayBuffer)
                        return {
                            type: d,
                            data: {
                                base64: !0,
                                data: a.substr(1)
                            }
                        };
                    var e = l.decode(a.substr(1));
                    return "blob" === c && u && (e = new u([e])),
                    {
                        type: d,
                        data: e
                    }
                }
                ,
                c.encodePayload = function(a, b, d) {
                    function e(a) {
                        return a.length + ":" + a
                    }
                    function f(a, d) {
                        c.encodePacket(a, !!g && b, !0, function(a) {
                            d(null, e(a))
                        })
                    }
                    "function" == typeof b && (d = b,
                    b = null);
                    var g = j(a);
                    return b && g ? u && !q ? c.encodePayloadAsBlob(a, d) : c.encodePayloadAsArrayBuffer(a, d) : a.length ? void h(a, f, function(a, b) {
                        return d(b.join(""))
                    }) : d("0:")
                }
                ,
                c.decodePayload = function(a, b, d) {
                    if ("string" != typeof a)
                        return c.decodePayloadAsBinary(a, b, d);
                    "function" == typeof b && (d = b,
                    b = null);
                    var e;
                    if ("" == a)
                        return d(t, 0, 1);
                    for (var f, g, h = "", i = 0, j = a.length; i < j; i++) {
                        var k = a.charAt(i);
                        if (":" != k)
                            h += k;
                        else {
                            if ("" == h || h != (f = Number(h)))
                                return d(t, 0, 1);
                            if (g = a.substr(i + 1, f),
                            h != g.length)
                                return d(t, 0, 1);
                            if (g.length) {
                                if (e = c.decodePacket(g, b, !0),
                                t.type == e.type && t.data == e.data)
                                    return d(t, 0, 1);
                                if (!1 === d(e, i + f, j))
                                    return
                            }
                            i += f,
                            h = ""
                        }
                    }
                    return "" != h ? d(t, 0, 1) : void 0
                }
                ,
                c.encodePayloadAsArrayBuffer = function(a, b) {
                    function d(a, b) {
                        c.encodePacket(a, !0, !0, function(a) {
                            return b(null, a)
                        })
                    }
                    if (!a.length)
                        return b(new ArrayBuffer(0));
                    h(a, d, function(a, c) {
                        var d = c.reduce(function(a, b) {
                            var c;
                            return c = "string" == typeof b ? b.length : b.byteLength,
                            a + c.toString().length + c + 2
                        }, 0)
                          , e = new Uint8Array(d)
                          , f = 0;
                        return c.forEach(function(a) {
                            var b = "string" == typeof a
                              , c = a;
                            if (b) {
                                for (var d = new Uint8Array(a.length), g = 0; g < a.length; g++)
                                    d[g] = a.charCodeAt(g);
                                c = d.buffer
                            }
                            e[f++] = b ? 0 : 1;
                            for (var h = c.byteLength.toString(), g = 0; g < h.length; g++)
                                e[f++] = parseInt(h[g]);
                            e[f++] = 255;
                            for (var d = new Uint8Array(c), g = 0; g < d.length; g++)
                                e[f++] = d[g]
                        }),
                        b(e.buffer)
                    })
                }
                ,
                c.encodePayloadAsBlob = function(a, b) {
                    function d(a, b) {
                        c.encodePacket(a, !0, !0, function(a) {
                            var c = new Uint8Array(1);
                            if (c[0] = 1,
                            "string" == typeof a) {
                                for (var d = new Uint8Array(a.length), e = 0; e < a.length; e++)
                                    d[e] = a.charCodeAt(e);
                                a = d.buffer,
                                c[0] = 0
                            }
                            for (var f = a instanceof ArrayBuffer ? a.byteLength : a.size, g = f.toString(), h = new Uint8Array(g.length + 1), e = 0; e < g.length; e++)
                                h[e] = parseInt(g[e]);
                            if (h[g.length] = 255,
                            u) {
                                var i = new u([c.buffer, h.buffer, a]);
                                b(null, i)
                            }
                        })
                    }
                    h(a, d, function(a, c) {
                        return b(new u(c))
                    })
                }
                ,
                c.decodePayloadAsBinary = function(a, b, d) {
                    "function" == typeof b && (d = b,
                    b = null);
                    for (var e = a, f = [], g = !1; e.byteLength > 0; ) {
                        for (var h = new Uint8Array(e), i = 0 === h[0], j = "", l = 1; 255 != h[l]; l++) {
                            if (j.length > 310) {
                                g = !0;
                                break
                            }
                            j += h[l]
                        }
                        if (g)
                            return d(t, 0, 1);
                        e = k(e, 2 + j.length),
                        j = parseInt(j);
                        var m = k(e, 0, j);
                        if (i)
                            try {
                                m = String.fromCharCode.apply(null, new Uint8Array(m))
                            } catch (a) {
                                var n = new Uint8Array(m);
                                m = "";
                                for (var l = 0; l < n.length; l++)
                                    m += String.fromCharCode(n[l])
                            }
                        f.push(m),
                        e = k(e, j)
                    }
                    var o = f.length;
                    f.forEach(function(a, e) {
                        d(c.decodePacket(a, b, !0), e, o)
                    })
                }
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "./keys": 20,
            after: 11,
            "arraybuffer.slice": 12,
            "base64-arraybuffer": 13,
            blob: 14,
            "has-binary": 21,
            utf8: 29
        }],
        20: [function(a, b, c) {
            b.exports = Object.keys || function(a) {
                var b = []
                  , c = Object.prototype.hasOwnProperty;
                for (var d in a)
                    c.call(a, d) && b.push(d);
                return b
            }
        }
        , {}],
        21: [function(a, b, c) {
            (function(c) {
                function d(a) {
                    function b(a) {
                        if (!a)
                            return !1;
                        if (c.Buffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File)
                            return !0;
                        if (e(a)) {
                            for (var d = 0; d < a.length; d++)
                                if (b(a[d]))
                                    return !0
                        } else if (a && "object" == typeof a) {
                            a.toJSON && (a = a.toJSON());
                            for (var f in a)
                                if (Object.prototype.hasOwnProperty.call(a, f) && b(a[f]))
                                    return !0
                        }
                        return !1
                    }
                    return b(a)
                }
                var e = a("isarray");
                b.exports = d
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            isarray: 24
        }],
        22: [function(a, b, c) {
            try {
                b.exports = "undefined" != typeof XMLHttpRequest && "withCredentials"in new XMLHttpRequest
            } catch (a) {
                b.exports = !1
            }
        }
        , {}],
        23: [function(a, b, c) {
            var d = [].indexOf;
            b.exports = function(a, b) {
                if (d)
                    return a.indexOf(b);
                for (var c = 0; c < a.length; ++c)
                    if (a[c] === b)
                        return c;
                return -1
            }
        }
        , {}],
        24: [function(a, b, c) {
            b.exports = Array.isArray || function(a) {
                return "[object Array]" == Object.prototype.toString.call(a)
            }
        }
        , {}],
        25: [function(a, b, c) {
            function d(a) {
                if (a = "" + a,
                !(a.length > 1e4)) {
                    var b = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a);
                    if (b) {
                        var c = parseFloat(b[1]);
                        switch ((b[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return c * l;
                        case "days":
                        case "day":
                        case "d":
                            return c * k;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return c * j;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return c * i;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return c * h;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return c
                        }
                    }
                }
            }
            function e(a) {
                return a >= k ? Math.round(a / k) + "d" : a >= j ? Math.round(a / j) + "h" : a >= i ? Math.round(a / i) + "m" : a >= h ? Math.round(a / h) + "s" : a + "ms"
            }
            function f(a) {
                return g(a, k, "day") || g(a, j, "hour") || g(a, i, "minute") || g(a, h, "second") || a + " ms"
            }
            function g(a, b, c) {
                if (!(a < b))
                    return a < 1.5 * b ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
            }
            var h = 1e3
              , i = 60 * h
              , j = 60 * i
              , k = 24 * j
              , l = 365.25 * k;
            b.exports = function(a, b) {
                return b = b || {},
                "string" == typeof a ? d(a) : b.long ? f(a) : e(a)
            }
        }
        , {}],
        26: [function(a, b, c) {
            (function(a) {
                var c = /^[\],:{}\s]*$/
                  , d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g
                  , e = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
                  , f = /(?:^|:|,)(?:\s*\[)+/g
                  , g = /^\s+/
                  , h = /\s+$/;
                b.exports = function(b) {
                    return "string" == typeof b && b ? (b = b.replace(g, "").replace(h, ""),
                    a.JSON && JSON.parse ? JSON.parse(b) : c.test(b.replace(d, "@").replace(e, "]").replace(f, "")) ? new Function("return " + b)() : void 0) : null
                }
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {}],
        27: [function(a, b, c) {
            c.encode = function(a) {
                var b = "";
                for (var c in a)
                    a.hasOwnProperty(c) && (b.length && (b += "&"),
                    b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b
            }
            ,
            c.decode = function(a) {
                for (var b = {}, c = a.split("&"), d = 0, e = c.length; d < e; d++) {
                    var f = c[d].split("=");
                    b[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
                }
                return b
            }
        }
        , {}],
        28: [function(a, b, c) {
            var d = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
              , e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            b.exports = function(a) {
                var b = a
                  , c = a.indexOf("[")
                  , f = a.indexOf("]");
                -1 != c && -1 != f && (a = a.substring(0, c) + a.substring(c, f).replace(/:/g, ";") + a.substring(f, a.length));
                for (var g = d.exec(a || ""), h = {}, i = 14; i--; )
                    h[e[i]] = g[i] || "";
                return -1 != c && -1 != f && (h.source = b,
                h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":"),
                h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
                h.ipv6uri = !0),
                h
            }
        }
        , {}],
        29: [function(b, c, d) {
            (function(b) {
                !function(e) {
                    function f(a) {
                        for (var b, c, d = [], e = 0, f = a.length; e < f; )
                            b = a.charCodeAt(e++),
                            b >= 55296 && b <= 56319 && e < f ? (c = a.charCodeAt(e++),
                            56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b),
                            e--)) : d.push(b);
                        return d
                    }
                    function g(a) {
                        for (var b, c = a.length, d = -1, e = ""; ++d < c; )
                            b = a[d],
                            b > 65535 && (b -= 65536,
                            e += u(b >>> 10 & 1023 | 55296),
                            b = 56320 | 1023 & b),
                            e += u(b);
                        return e
                    }
                    function h(a) {
                        if (a >= 55296 && a <= 57343)
                            throw Error("Lone surrogate U+" + a.toString(16).toUpperCase() + " is not a scalar value")
                    }
                    function i(a, b) {
                        return u(a >> b & 63 | 128)
                    }
                    function j(a) {
                        if (0 == (4294967168 & a))
                            return u(a);
                        var b = "";
                        return 0 == (4294965248 & a) ? b = u(a >> 6 & 31 | 192) : 0 == (4294901760 & a) ? (h(a),
                        b = u(a >> 12 & 15 | 224),
                        b += i(a, 6)) : 0 == (4292870144 & a) && (b = u(a >> 18 & 7 | 240),
                        b += i(a, 12),
                        b += i(a, 6)),
                        b += u(63 & a | 128)
                    }
                    function k(a) {
                        for (var b, c = f(a), d = c.length, e = -1, g = ""; ++e < d; )
                            b = c[e],
                            g += j(b);
                        return g
                    }
                    function l() {
                        if (t >= s)
                            throw Error("Invalid byte index");
                        var a = 255 & r[t];
                        if (t++,
                        128 == (192 & a))
                            return 63 & a;
                        throw Error("Invalid continuation byte")
                    }
                    function m() {
                        var a, b, c, d, e;
                        if (t > s)
                            throw Error("Invalid byte index");
                        if (t == s)
                            return !1;
                        if (a = 255 & r[t],
                        t++,
                        0 == (128 & a))
                            return a;
                        if (192 == (224 & a)) {
                            var b = l();
                            if ((e = (31 & a) << 6 | b) >= 128)
                                return e;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & a)) {
                            if (b = l(),
                            c = l(),
                            (e = (15 & a) << 12 | b << 6 | c) >= 2048)
                                return h(e),
                                e;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & a) && (b = l(),
                        c = l(),
                        d = l(),
                        (e = (15 & a) << 18 | b << 12 | c << 6 | d) >= 65536 && e <= 1114111))
                            return e;
                        throw Error("Invalid UTF-8 detected")
                    }
                    function n(a) {
                        r = f(a),
                        s = r.length,
                        t = 0;
                        for (var b, c = []; !1 !== (b = m()); )
                            c.push(b);
                        return g(c)
                    }
                    var o = "object" == typeof d && d
                      , p = "object" == typeof c && c && c.exports == o && c
                      , q = "object" == typeof b && b;
                    q.global !== q && q.window !== q || (e = q);
                    var r, s, t, u = String.fromCharCode, v = {
                        version: "2.0.0",
                        encode: k,
                        decode: n
                    };
                    if ("function" == typeof a && "object" == typeof a.amd && a.amd)
                        a(function() {
                            return v
                        });
                    else if (o && !o.nodeType)
                        if (p)
                            p.exports = v;
                        else {
                            var w = {}
                              , x = w.hasOwnProperty;
                            for (var y in v)
                                x.call(v, y) && (o[y] = v[y])
                        }
                    else
                        e.utf8 = v
                }(this)
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {}],
        30: [function(a, b, c) {
            "use strict";
            function d(a) {
                var b = "";
                do {
                    b = h[a % i] + b,
                    a = Math.floor(a / i)
                } while (a > 0);return b
            }
            function e(a) {
                var b = 0;
                for (l = 0; l < a.length; l++)
                    b = b * i + j[a.charAt(l)];
                return b
            }
            function f() {
                var a = d(+new Date);
                return a !== g ? (k = 0,
                g = a) : a + "." + d(k++)
            }
            for (var g, h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), i = 64, j = {}, k = 0, l = 0; l < i; l++)
                j[h[l]] = l;
            f.encode = d,
            f.decode = e,
            b.exports = f
        }
        , {}],
        31: [function(a, b, c) {
            function d(a, b) {
                "object" == typeof a && (b = a,
                a = void 0),
                b = b || {};
                var c, d = e(a), f = d.source, j = d.id, k = d.path, l = i[j] && k in i[j].nsps, m = b.forceNew || b["force new connection"] || !1 === b.multiplex || l;
                return m ? (h("ignoring socket cache for %s", f),
                c = g(f, b)) : (i[j] || (h("new io instance for %s", f),
                i[j] = g(f, b)),
                c = i[j]),
                c.socket(d.path)
            }
            var e = a("./url")
              , f = a("socket.io-parser")
              , g = a("./manager")
              , h = a("debug")("socket.io-client");
            b.exports = c = d;
            var i = c.managers = {};
            c.protocol = f.protocol,
            c.connect = d,
            c.Manager = a("./manager"),
            c.Socket = a("./socket")
        }
        , {
            "./manager": 32,
            "./socket": 34,
            "./url": 35,
            debug: 39,
            "socket.io-parser": 47
        }],
        32: [function(a, b, c) {
            function d(a, b) {
                if (!(this instanceof d))
                    return new d(a,b);
                a && "object" == typeof a && (b = a,
                a = void 0),
                b = b || {},
                b.path = b.path || "/socket.io",
                this.nsps = {},
                this.subs = [],
                this.opts = b,
                this.reconnection(!1 !== b.reconnection),
                this.reconnectionAttempts(b.reconnectionAttempts || 1 / 0),
                this.reconnectionDelay(b.reconnectionDelay || 1e3),
                this.reconnectionDelayMax(b.reconnectionDelayMax || 5e3),
                this.randomizationFactor(b.randomizationFactor || .5),
                this.backoff = new m({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }),
                this.timeout(null == b.timeout ? 2e4 : b.timeout),
                this.readyState = "closed",
                this.uri = a,
                this.connecting = [],
                this.lastPing = null,
                this.encoding = !1,
                this.packetBuffer = [],
                this.encoder = new h.Encoder,
                this.decoder = new h.Decoder,
                this.autoConnect = !1 !== b.autoConnect,
                this.autoConnect && this.open()
            }
            var e = a("engine.io-client")
              , f = a("./socket")
              , g = a("component-emitter")
              , h = a("socket.io-parser")
              , i = a("./on")
              , j = a("component-bind")
              , k = a("debug")("socket.io-client:manager")
              , l = a("indexof")
              , m = a("backo2")
              , n = Object.prototype.hasOwnProperty;
            b.exports = d,
            d.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var a in this.nsps)
                    n.call(this.nsps, a) && this.nsps[a].emit.apply(this.nsps[a], arguments)
            }
            ,
            d.prototype.updateSocketIds = function() {
                for (var a in this.nsps)
                    n.call(this.nsps, a) && (this.nsps[a].id = this.engine.id)
            }
            ,
            g(d.prototype),
            d.prototype.reconnection = function(a) {
                return arguments.length ? (this._reconnection = !!a,
                this) : this._reconnection
            }
            ,
            d.prototype.reconnectionAttempts = function(a) {
                return arguments.length ? (this._reconnectionAttempts = a,
                this) : this._reconnectionAttempts
            }
            ,
            d.prototype.reconnectionDelay = function(a) {
                return arguments.length ? (this._reconnectionDelay = a,
                this.backoff && this.backoff.setMin(a),
                this) : this._reconnectionDelay
            }
            ,
            d.prototype.randomizationFactor = function(a) {
                return arguments.length ? (this._randomizationFactor = a,
                this.backoff && this.backoff.setJitter(a),
                this) : this._randomizationFactor
            }
            ,
            d.prototype.reconnectionDelayMax = function(a) {
                return arguments.length ? (this._reconnectionDelayMax = a,
                this.backoff && this.backoff.setMax(a),
                this) : this._reconnectionDelayMax
            }
            ,
            d.prototype.timeout = function(a) {
                return arguments.length ? (this._timeout = a,
                this) : this._timeout
            }
            ,
            d.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }
            ,
            d.prototype.open = d.prototype.connect = function(a) {
                if (k("readyState %s", this.readyState),
                ~this.readyState.indexOf("open"))
                    return this;
                k("opening %s", this.uri),
                this.engine = e(this.uri, this.opts);
                var b = this.engine
                  , c = this;
                this.readyState = "opening",
                this.skipReconnect = !1;
                var d = i(b, "open", function() {
                    c.onopen(),
                    a && a()
                })
                  , f = i(b, "error", function(b) {
                    if (k("connect_error"),
                    c.cleanup(),
                    c.readyState = "closed",
                    c.emitAll("connect_error", b),
                    a) {
                        var d = new Error("Connection error");
                        d.data = b,
                        a(d)
                    } else
                        c.maybeReconnectOnOpen()
                });
                if (!1 !== this._timeout) {
                    var g = this._timeout;
                    k("connect attempt will timeout after %d", g);
                    var h = setTimeout(function() {
                        k("connect attempt timed out after %d", g),
                        d.destroy(),
                        b.close(),
                        b.emit("error", "timeout"),
                        c.emitAll("connect_timeout", g)
                    }, g);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(h)
                        }
                    })
                }
                return this.subs.push(d),
                this.subs.push(f),
                this
            }
            ,
            d.prototype.onopen = function() {
                k("open"),
                this.cleanup(),
                this.readyState = "open",
                this.emit("open");
                var a = this.engine;
                this.subs.push(i(a, "data", j(this, "ondata"))),
                this.subs.push(i(a, "ping", j(this, "onping"))),
                this.subs.push(i(a, "pong", j(this, "onpong"))),
                this.subs.push(i(a, "error", j(this, "onerror"))),
                this.subs.push(i(a, "close", j(this, "onclose"))),
                this.subs.push(i(this.decoder, "decoded", j(this, "ondecoded")))
            }
            ,
            d.prototype.onping = function() {
                this.lastPing = new Date,
                this.emitAll("ping")
            }
            ,
            d.prototype.onpong = function() {
                this.emitAll("pong", new Date - this.lastPing)
            }
            ,
            d.prototype.ondata = function(a) {
                this.decoder.add(a)
            }
            ,
            d.prototype.ondecoded = function(a) {
                this.emit("packet", a)
            }
            ,
            d.prototype.onerror = function(a) {
                k("error", a),
                this.emitAll("error", a)
            }
            ,
            d.prototype.socket = function(a) {
                function b() {
                    ~l(d.connecting, c) || d.connecting.push(c)
                }
                var c = this.nsps[a];
                if (!c) {
                    c = new f(this,a),
                    this.nsps[a] = c;
                    var d = this;
                    c.on("connecting", b),
                    c.on("connect", function() {
                        c.id = d.engine.id
                    }),
                    this.autoConnect && b()
                }
                return c
            }
            ,
            d.prototype.destroy = function(a) {
                var b = l(this.connecting, a);
                ~b && this.connecting.splice(b, 1),
                this.connecting.length || this.close()
            }
            ,
            d.prototype.packet = function(a) {
                k("writing packet %j", a);
                var b = this;
                b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0,
                this.encoder.encode(a, function(c) {
                    for (var d = 0; d < c.length; d++)
                        b.engine.write(c[d], a.options);
                    b.encoding = !1,
                    b.processPacketQueue()
                }))
            }
            ,
            d.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var a = this.packetBuffer.shift();
                    this.packet(a)
                }
            }
            ,
            d.prototype.cleanup = function() {
                k("cleanup");
                for (var a; a = this.subs.shift(); )
                    a.destroy();
                this.packetBuffer = [],
                this.encoding = !1,
                this.lastPing = null,
                this.decoder.destroy()
            }
            ,
            d.prototype.close = d.prototype.disconnect = function() {
                k("disconnect"),
                this.skipReconnect = !0,
                this.reconnecting = !1,
                "opening" == this.readyState && this.cleanup(),
                this.backoff.reset(),
                this.readyState = "closed",
                this.engine && this.engine.close()
            }
            ,
            d.prototype.onclose = function(a) {
                k("onclose"),
                this.cleanup(),
                this.backoff.reset(),
                this.readyState = "closed",
                this.emit("close", a),
                this._reconnection && !this.skipReconnect && this.reconnect()
            }
            ,
            d.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect)
                    return this;
                var a = this;
                if (this.backoff.attempts >= this._reconnectionAttempts)
                    k("reconnect failed"),
                    this.backoff.reset(),
                    this.emitAll("reconnect_failed"),
                    this.reconnecting = !1;
                else {
                    var b = this.backoff.duration();
                    k("will wait %dms before reconnect attempt", b),
                    this.reconnecting = !0;
                    var c = setTimeout(function() {
                        a.skipReconnect || (k("attempting reconnect"),
                        a.emitAll("reconnect_attempt", a.backoff.attempts),
                        a.emitAll("reconnecting", a.backoff.attempts),
                        a.skipReconnect || a.open(function(b) {
                            b ? (k("reconnect attempt error"),
                            a.reconnecting = !1,
                            a.reconnect(),
                            a.emitAll("reconnect_error", b.data)) : (k("reconnect success"),
                            a.onreconnect())
                        }))
                    }, b);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(c)
                        }
                    })
                }
            }
            ,
            d.prototype.onreconnect = function() {
                var a = this.backoff.attempts;
                this.reconnecting = !1,
                this.backoff.reset(),
                this.updateSocketIds(),
                this.emitAll("reconnect", a)
            }
        }
        , {
            "./on": 33,
            "./socket": 34,
            backo2: 36,
            "component-bind": 37,
            "component-emitter": 38,
            debug: 39,
            "engine.io-client": 1,
            indexof: 42,
            "socket.io-parser": 47
        }],
        33: [function(a, b, c) {
            function d(a, b, c) {
                return a.on(b, c),
                {
                    destroy: function() {
                        a.removeListener(b, c)
                    }
                }
            }
            b.exports = d
        }
        , {}],
        34: [function(a, b, c) {
            function d(a, b) {
                this.io = a,
                this.nsp = b,
                this.json = this,
                this.ids = 0,
                this.acks = {},
                this.receiveBuffer = [],
                this.sendBuffer = [],
                this.connected = !1,
                this.disconnected = !0,
                this.io.autoConnect && this.open()
            }
            var e = a("socket.io-parser")
              , f = a("component-emitter")
              , g = a("to-array")
              , h = a("./on")
              , i = a("component-bind")
              , j = a("debug")("socket.io-client:socket")
              , k = a("has-binary");
            b.exports = d;
            var l = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                connecting: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1,
                ping: 1,
                pong: 1
            }
              , m = f.prototype.emit;
            f(d.prototype),
            d.prototype.subEvents = function() {
                if (!this.subs) {
                    var a = this.io;
                    this.subs = [h(a, "open", i(this, "onopen")), h(a, "packet", i(this, "onpacket")), h(a, "close", i(this, "onclose"))]
                }
            }
            ,
            d.prototype.open = d.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(),
                this.io.open(),
                "open" == this.io.readyState && this.onopen(),
                this.emit("connecting"),
                this)
            }
            ,
            d.prototype.send = function() {
                var a = g(arguments);
                return a.unshift("message"),
                this.emit.apply(this, a),
                this
            }
            ,
            d.prototype.emit = function(a) {
                if (l.hasOwnProperty(a))
                    return m.apply(this, arguments),
                    this;
                var b = g(arguments)
                  , c = e.EVENT;
                k(b) && (c = e.BINARY_EVENT);
                var d = {
                    type: c,
                    data: b
                };
                return d.options = {},
                d.options.compress = !this.flags || !1 !== this.flags.compress,
                "function" == typeof b[b.length - 1] && (j("emitting packet with ack id %d", this.ids),
                this.acks[this.ids] = b.pop(),
                d.id = this.ids++),
                this.connected ? this.packet(d) : this.sendBuffer.push(d),
                delete this.flags,
                this
            }
            ,
            d.prototype.packet = function(a) {
                a.nsp = this.nsp,
                this.io.packet(a)
            }
            ,
            d.prototype.onopen = function() {
                j("transport is open - connecting"),
                "/" != this.nsp && this.packet({
                    type: e.CONNECT
                })
            }
            ,
            d.prototype.onclose = function(a) {
                j("close (%s)", a),
                this.connected = !1,
                this.disconnected = !0,
                delete this.id,
                this.emit("disconnect", a)
            }
            ,
            d.prototype.onpacket = function(a) {
                if (a.nsp == this.nsp)
                    switch (a.type) {
                    case e.CONNECT:
                        this.onconnect();
                        break;
                    case e.EVENT:
                    case e.BINARY_EVENT:
                        this.onevent(a);
                        break;
                    case e.ACK:
                    case e.BINARY_ACK:
                        this.onack(a);
                        break;
                    case e.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case e.ERROR:
                        this.emit("error", a.data)
                    }
            }
            ,
            d.prototype.onevent = function(a) {
                var b = a.data || [];
                j("emitting event %j", b),
                null != a.id && (j("attaching ack callback to event"),
                b.push(this.ack(a.id))),
                this.connected ? m.apply(this, b) : this.receiveBuffer.push(b)
            }
            ,
            d.prototype.ack = function(a) {
                var b = this
                  , c = !1;
                return function() {
                    if (!c) {
                        c = !0;
                        var d = g(arguments);
                        j("sending ack %j", d);
                        var f = k(d) ? e.BINARY_ACK : e.ACK;
                        b.packet({
                            type: f,
                            id: a,
                            data: d
                        })
                    }
                }
            }
            ,
            d.prototype.onack = function(a) {
                var b = this.acks[a.id];
                "function" == typeof b ? (j("calling ack %s with %j", a.id, a.data),
                b.apply(this, a.data),
                delete this.acks[a.id]) : j("bad ack %s", a.id)
            }
            ,
            d.prototype.onconnect = function() {
                this.connected = !0,
                this.disconnected = !1,
                this.emit("connect"),
                this.emitBuffered()
            }
            ,
            d.prototype.emitBuffered = function() {
                var a;
                for (a = 0; a < this.receiveBuffer.length; a++)
                    m.apply(this, this.receiveBuffer[a]);
                for (this.receiveBuffer = [],
                a = 0; a < this.sendBuffer.length; a++)
                    this.packet(this.sendBuffer[a]);
                this.sendBuffer = []
            }
            ,
            d.prototype.ondisconnect = function() {
                j("server disconnect (%s)", this.nsp),
                this.destroy(),
                this.onclose("io server disconnect")
            }
            ,
            d.prototype.destroy = function() {
                if (this.subs) {
                    for (var a = 0; a < this.subs.length; a++)
                        this.subs[a].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }
            ,
            d.prototype.close = d.prototype.disconnect = function() {
                return this.connected && (j("performing disconnect (%s)", this.nsp),
                this.packet({
                    type: e.DISCONNECT
                })),
                this.destroy(),
                this.connected && this.onclose("io client disconnect"),
                this
            }
            ,
            d.prototype.compress = function(a) {
                return this.flags = this.flags || {},
                this.flags.compress = a,
                this
            }
        }
        , {
            "./on": 33,
            "component-bind": 37,
            "component-emitter": 38,
            debug: 39,
            "has-binary": 41,
            "socket.io-parser": 47,
            "to-array": 51
        }],
        35: [function(a, b, c) {
            (function(c) {
                function d(a, b) {
                    var d = a
                      , b = b || c.location;
                    null == a && (a = b.protocol + "//" + b.host),
                    "string" == typeof a && ("/" == a.charAt(0) && (a = "/" == a.charAt(1) ? b.protocol + a : b.host + a),
                    /^(https?|wss?):\/\//.test(a) || (f("protocol-less url %s", a),
                    a = void 0 !== b ? b.protocol + "//" + a : "https://" + a),
                    f("parse %s", a),
                    d = e(a)),
                    d.port || (/^(http|ws)$/.test(d.protocol) ? d.port = "80" : /^(http|ws)s$/.test(d.protocol) && (d.port = "443")),
                    d.path = d.path || "/";
                    var g = -1 !== d.host.indexOf(":")
                      , h = g ? "[" + d.host + "]" : d.host;
                    return d.id = d.protocol + "://" + h + ":" + d.port,
                    d.href = d.protocol + "://" + h + (b && b.port == d.port ? "" : ":" + d.port),
                    d
                }
                var e = a("parseuri")
                  , f = a("debug")("socket.io-client:url");
                b.exports = d
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            debug: 39,
            parseuri: 45
        }],
        36: [function(a, b, c) {
            function d(a) {
                a = a || {},
                this.ms = a.min || 100,
                this.max = a.max || 1e4,
                this.factor = a.factor || 2,
                this.jitter = a.jitter > 0 && a.jitter <= 1 ? a.jitter : 0,
                this.attempts = 0
            }
            b.exports = d,
            d.prototype.duration = function() {
                var a = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var b = Math.random()
                      , c = Math.floor(b * this.jitter * a);
                    a = 0 == (1 & Math.floor(10 * b)) ? a - c : a + c
                }
                return 0 | Math.min(a, this.max)
            }
            ,
            d.prototype.reset = function() {
                this.attempts = 0
            }
            ,
            d.prototype.setMin = function(a) {
                this.ms = a
            }
            ,
            d.prototype.setMax = function(a) {
                this.max = a
            }
            ,
            d.prototype.setJitter = function(a) {
                this.jitter = a
            }
        }
        , {}],
        37: [function(a, b, c) {
            var d = [].slice;
            b.exports = function(a, b) {
                if ("string" == typeof b && (b = a[b]),
                "function" != typeof b)
                    throw new Error("bind() requires a function");
                var c = d.call(arguments, 2);
                return function() {
                    return b.apply(a, c.concat(d.call(arguments)))
                }
            }
        }
        , {}],
        38: [function(a, b, c) {
            function d(a) {
                if (a)
                    return e(a)
            }
            function e(a) {
                for (var b in d.prototype)
                    a[b] = d.prototype[b];
                return a
            }
            b.exports = d,
            d.prototype.on = d.prototype.addEventListener = function(a, b) {
                return this._callbacks = this._callbacks || {},
                (this._callbacks["$" + a] = this._callbacks["$" + a] || []).push(b),
                this
            }
            ,
            d.prototype.once = function(a, b) {
                function c() {
                    this.off(a, c),
                    b.apply(this, arguments)
                }
                return c.fn = b,
                this.on(a, c),
                this
            }
            ,
            d.prototype.off = d.prototype.removeListener = d.prototype.removeAllListeners = d.prototype.removeEventListener = function(a, b) {
                if (this._callbacks = this._callbacks || {},
                0 == arguments.length)
                    return this._callbacks = {},
                    this;
                var c = this._callbacks["$" + a];
                if (!c)
                    return this;
                if (1 == arguments.length)
                    return delete this._callbacks["$" + a],
                    this;
                for (var d, e = 0; e < c.length; e++)
                    if ((d = c[e]) === b || d.fn === b) {
                        c.splice(e, 1);
                        break
                    }
                return this
            }
            ,
            d.prototype.emit = function(a) {
                this._callbacks = this._callbacks || {};
                var b = [].slice.call(arguments, 1)
                  , c = this._callbacks["$" + a];
                if (c) {
                    c = c.slice(0);
                    for (var d = 0, e = c.length; d < e; ++d)
                        c[d].apply(this, b)
                }
                return this
            }
            ,
            d.prototype.listeners = function(a) {
                return this._callbacks = this._callbacks || {},
                this._callbacks["$" + a] || []
            }
            ,
            d.prototype.hasListeners = function(a) {
                return !!this.listeners(a).length
            }
        }
        , {}],
        39: [function(a, b, c) {
            arguments[4][17][0].apply(c, arguments)
        }
        , {
            "./debug": 40,
            dup: 17
        }],
        40: [function(a, b, c) {
            arguments[4][18][0].apply(c, arguments)
        }
        , {
            dup: 18,
            ms: 44
        }],
        41: [function(a, b, c) {
            (function(c) {
                function d(a) {
                    function b(a) {
                        if (!a)
                            return !1;
                        if (c.Buffer && c.Buffer.isBuffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File)
                            return !0;
                        if (e(a)) {
                            for (var d = 0; d < a.length; d++)
                                if (b(a[d]))
                                    return !0
                        } else if (a && "object" == typeof a) {
                            a.toJSON && "function" == typeof a.toJSON && (a = a.toJSON());
                            for (var f in a)
                                if (Object.prototype.hasOwnProperty.call(a, f) && b(a[f]))
                                    return !0
                        }
                        return !1
                    }
                    return b(a)
                }
                var e = a("isarray");
                b.exports = d
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            isarray: 43
        }],
        42: [function(a, b, c) {
            arguments[4][23][0].apply(c, arguments)
        }
        , {
            dup: 23
        }],
        43: [function(a, b, c) {
            arguments[4][24][0].apply(c, arguments)
        }
        , {
            dup: 24
        }],
        44: [function(a, b, c) {
            arguments[4][25][0].apply(c, arguments)
        }
        , {
            dup: 25
        }],
        45: [function(a, b, c) {
            arguments[4][28][0].apply(c, arguments)
        }
        , {
            dup: 28
        }],
        46: [function(a, b, c) {
            (function(b) {
                var d = a("isarray")
                  , e = a("./is-buffer");
                c.deconstructPacket = function(a) {
                    function b(a) {
                        if (!a)
                            return a;
                        if (e(a)) {
                            var f = {
                                _placeholder: !0,
                                num: c.length
                            };
                            return c.push(a),
                            f
                        }
                        if (d(a)) {
                            for (var g = new Array(a.length), h = 0; h < a.length; h++)
                                g[h] = b(a[h]);
                            return g
                        }
                        if ("object" == typeof a && !(a instanceof Date)) {
                            var g = {};
                            for (var i in a)
                                g[i] = b(a[i]);
                            return g
                        }
                        return a
                    }
                    var c = []
                      , f = a.data
                      , g = a;
                    return g.data = b(f),
                    g.attachments = c.length,
                    {
                        packet: g,
                        buffers: c
                    }
                }
                ,
                c.reconstructPacket = function(a, b) {
                    function c(a) {
                        if (a && a._placeholder) {
                            return b[a.num]
                        }
                        if (d(a)) {
                            for (var e = 0; e < a.length; e++)
                                a[e] = c(a[e]);
                            return a
                        }
                        if (a && "object" == typeof a) {
                            for (var f in a)
                                a[f] = c(a[f]);
                            return a
                        }
                        return a
                    }
                    return a.data = c(a.data),
                    a.attachments = void 0,
                    a
                }
                ,
                c.removeBlobs = function(a, c) {
                    function f(a, i, j) {
                        if (!a)
                            return a;
                        if (b.Blob && a instanceof Blob || b.File && a instanceof File) {
                            g++;
                            var k = new FileReader;
                            k.onload = function() {
                                j ? j[i] = this.result : h = this.result,
                                --g || c(h)
                            }
                            ,
                            k.readAsArrayBuffer(a)
                        } else if (d(a))
                            for (var l = 0; l < a.length; l++)
                                f(a[l], l, a);
                        else if (a && "object" == typeof a && !e(a))
                            for (var m in a)
                                f(a[m], m, a)
                    }
                    var g = 0
                      , h = a;
                    f(h),
                    g || c(h)
                }
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {
            "./is-buffer": 48,
            isarray: 43
        }],
        47: [function(a, b, c) {
            function d() {}
            function e(a) {
                var b = ""
                  , d = !1;
                return b += a.type,
                c.BINARY_EVENT != a.type && c.BINARY_ACK != a.type || (b += a.attachments,
                b += "-"),
                a.nsp && "/" != a.nsp && (d = !0,
                b += a.nsp),
                null != a.id && (d && (b += ",",
                d = !1),
                b += a.id),
                null != a.data && (d && (b += ","),
                b += l.stringify(a.data)),
                k("encoded %j as %s", a, b),
                b
            }
            function f(a, b) {
                function c(a) {
                    var c = n.deconstructPacket(a)
                      , d = e(c.packet)
                      , f = c.buffers;
                    f.unshift(d),
                    b(f)
                }
                n.removeBlobs(a, c)
            }
            function g() {
                this.reconstructor = null
            }
            function h(a) {
                var b = {}
                  , d = 0;
                if (b.type = Number(a.charAt(0)),
                null == c.types[b.type])
                    return j();
                if (c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type) {
                    for (var e = ""; "-" != a.charAt(++d) && (e += a.charAt(d),
                    d != a.length); )
                        ;
                    if (e != Number(e) || "-" != a.charAt(d))
                        throw new Error("Illegal attachments");
                    b.attachments = Number(e)
                }
                if ("/" == a.charAt(d + 1))
                    for (b.nsp = ""; ++d; ) {
                        var f = a.charAt(d);
                        if ("," == f)
                            break;
                        if (b.nsp += f,
                        d == a.length)
                            break
                    }
                else
                    b.nsp = "/";
                var g = a.charAt(d + 1);
                if ("" !== g && Number(g) == g) {
                    for (b.id = ""; ++d; ) {
                        var f = a.charAt(d);
                        if (null == f || Number(f) != f) {
                            --d;
                            break
                        }
                        if (b.id += a.charAt(d),
                        d == a.length)
                            break
                    }
                    b.id = Number(b.id)
                }
                if (a.charAt(++d))
                    try {
                        b.data = l.parse(a.substr(d))
                    } catch (a) {
                        return j()
                    }
                return k("decoded %s as %j", a, b),
                b
            }
            function i(a) {
                this.reconPack = a,
                this.buffers = []
            }
            function j(a) {
                return {
                    type: c.ERROR,
                    data: "parser error"
                }
            }
            var k = a("debug")("socket.io-parser")
              , l = a("json3")
              , m = (a("isarray"),
            a("component-emitter"))
              , n = a("./binary")
              , o = a("./is-buffer");
            c.protocol = 4,
            c.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"],
            c.CONNECT = 0,
            c.DISCONNECT = 1,
            c.EVENT = 2,
            c.ACK = 3,
            c.ERROR = 4,
            c.BINARY_EVENT = 5,
            c.BINARY_ACK = 6,
            c.Encoder = d,
            c.Decoder = g,
            d.prototype.encode = function(a, b) {
                if (k("encoding packet %j", a),
                c.BINARY_EVENT == a.type || c.BINARY_ACK == a.type)
                    f(a, b);
                else {
                    b([e(a)])
                }
            }
            ,
            m(g.prototype),
            g.prototype.add = function(a) {
                var b;
                if ("string" == typeof a)
                    b = h(a),
                    c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type ? (this.reconstructor = new i(b),
                    0 === this.reconstructor.reconPack.attachments && this.emit("decoded", b)) : this.emit("decoded", b);
                else {
                    if (!o(a) && !a.base64)
                        throw new Error("Unknown type: " + a);
                    if (!this.reconstructor)
                        throw new Error("got binary data when not reconstructing a packet");
                    (b = this.reconstructor.takeBinaryData(a)) && (this.reconstructor = null,
                    this.emit("decoded", b))
                }
            }
            ,
            g.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }
            ,
            i.prototype.takeBinaryData = function(a) {
                if (this.buffers.push(a),
                this.buffers.length == this.reconPack.attachments) {
                    var b = n.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(),
                    b
                }
                return null
            }
            ,
            i.prototype.finishedReconstruction = function() {
                this.reconPack = null,
                this.buffers = []
            }
        }
        , {
            "./binary": 46,
            "./is-buffer": 48,
            "component-emitter": 49,
            debug: 39,
            isarray: 43,
            json3: 50
        }],
        48: [function(a, b, c) {
            (function(a) {
                function c(b) {
                    return a.Buffer && a.Buffer.isBuffer(b) || a.ArrayBuffer && b instanceof ArrayBuffer
                }
                b.exports = c
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {}],
        49: [function(a, b, c) {
            arguments[4][15][0].apply(c, arguments)
        }
        , {
            dup: 15
        }],
        50: [function(b, c, d) {
            (function(b) {
                (function() {
                    function e(a, b) {
                        function c(a) {
                            if (c[a] !== q)
                                return c[a];
                            var e;
                            if ("bug-string-char-index" == a)
                                e = "a" != "a"[0];
                            else if ("json" == a)
                                e = c("json-stringify") && c("json-parse");
                            else {
                                var g, h = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                                if ("json-stringify" == a) {
                                    var i = b.stringify
                                      , k = "function" == typeof i && t;
                                    if (k) {
                                        (g = function() {
                                            return 1
                                        }
                                        ).toJSON = g;
                                        try {
                                            k = "0" === i(0) && "0" === i(new d) && '""' == i(new f) && i(s) === q && i(q) === q && i() === q && "1" === i(g) && "[1]" == i([g]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({
                                                a: [g, !0, !1, null, "\0\b\n\f\r\t"]
                                            }) == h && "1" === i(null, g) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == i(new j(-1))
                                        } catch (a) {
                                            k = !1
                                        }
                                    }
                                    e = k
                                }
                                if ("json-parse" == a) {
                                    var l = b.parse;
                                    if ("function" == typeof l)
                                        try {
                                            if (0 === l("0") && !l(!1)) {
                                                g = l(h);
                                                var m = 5 == g.a.length && 1 === g.a[0];
                                                if (m) {
                                                    try {
                                                        m = !l('"\t"')
                                                    } catch (a) {}
                                                    if (m)
                                                        try {
                                                            m = 1 !== l("01")
                                                        } catch (a) {}
                                                    if (m)
                                                        try {
                                                            m = 1 !== l("1.")
                                                        } catch (a) {}
                                                }
                                            }
                                        } catch (a) {
                                            m = !1
                                        }
                                    e = m
                                }
                            }
                            return c[a] = !!e
                        }
                        a || (a = i.Object()),
                        b || (b = i.Object());
                        var d = a.Number || i.Number
                          , f = a.String || i.String
                          , h = a.Object || i.Object
                          , j = a.Date || i.Date
                          , k = a.SyntaxError || i.SyntaxError
                          , l = a.TypeError || i.TypeError
                          , m = a.Math || i.Math
                          , n = a.JSON || i.JSON;
                        "object" == typeof n && n && (b.stringify = n.stringify,
                        b.parse = n.parse);
                        var o, p, q, r = h.prototype, s = r.toString, t = new j(-0xc782b5b800cec);
                        try {
                            t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
                        } catch (a) {}
                        if (!c("json")) {
                            var u = c("bug-string-char-index");
                            if (!t)
                                var v = m.floor
                                  , w = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
                                  , x = function(a, b) {
                                    return w[b] + 365 * (a - 1970) + v((a - 1969 + (b = +(b > 1))) / 4) - v((a - 1901 + b) / 100) + v((a - 1601 + b) / 400)
                                };
                            if ((o = r.hasOwnProperty) || (o = function(a) {
                                var b, c = {};
                                return (c.__proto__ = null,
                                c.__proto__ = {
                                    toString: 1
                                },
                                c).toString != s ? o = function(a) {
                                    var b = this.__proto__
                                      , c = a in (this.__proto__ = null,
                                    this);
                                    return this.__proto__ = b,
                                    c
                                }
                                : (b = c.constructor,
                                o = function(a) {
                                    var c = (this.constructor || b).prototype;
                                    return a in this && !(a in c && this[a] === c[a])
                                }
                                ),
                                c = null,
                                o.call(this, a)
                            }
                            ),
                            p = function(a, b) {
                                var c, d, e, f = 0;
                                (c = function() {
                                    this.valueOf = 0
                                }
                                ).prototype.valueOf = 0,
                                d = new c;
                                for (e in d)
                                    o.call(d, e) && f++;
                                return c = d = null,
                                f ? p = 2 == f ? function(a, b) {
                                    var c, d = {}, e = "[object Function]" == s.call(a);
                                    for (c in a)
                                        e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
                                }
                                : function(a, b) {
                                    var c, d, e = "[object Function]" == s.call(a);
                                    for (c in a)
                                        e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
                                    (d || o.call(a, c = "constructor")) && b(c)
                                }
                                : (d = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"],
                                p = function(a, b) {
                                    var c, e, f = "[object Function]" == s.call(a), h = !f && "function" != typeof a.constructor && g[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
                                    for (c in a)
                                        f && "prototype" == c || !h.call(a, c) || b(c);
                                    for (e = d.length; c = d[--e]; h.call(a, c) && b(c))
                                        ;
                                }
                                ),
                                p(a, b)
                            }
                            ,
                            !c("json-stringify")) {
                                var y = {
                                    92: "\\\\",
                                    34: '\\"',
                                    8: "\\b",
                                    12: "\\f",
                                    10: "\\n",
                                    13: "\\r",
                                    9: "\\t"
                                }
                                  , z = function(a, b) {
                                    return ("000000" + (b || 0)).slice(-a)
                                }
                                  , A = function(a) {
                                    for (var b = '"', c = 0, d = a.length, e = !u || d > 10, f = e && (u ? a.split("") : a); c < d; c++) {
                                        var g = a.charCodeAt(c);
                                        switch (g) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            b += y[g];
                                            break;
                                        default:
                                            if (g < 32) {
                                                b += "\\u00" + z(2, g.toString(16));
                                                break
                                            }
                                            b += e ? f[c] : a.charAt(c)
                                        }
                                    }
                                    return b + '"'
                                }
                                  , B = function(a, b, c, d, e, f, g) {
                                    var h, i, j, k, m, n, r, t, u, w, y, C, D, E, F, G;
                                    try {
                                        h = b[a]
                                    } catch (a) {}
                                    if ("object" == typeof h && h)
                                        if ("[object Date]" != (i = s.call(h)) || o.call(h, "toJSON"))
                                            "function" == typeof h.toJSON && ("[object Number]" != i && "[object String]" != i && "[object Array]" != i || o.call(h, "toJSON")) && (h = h.toJSON(a));
                                        else if (h > -1 / 0 && h < 1 / 0) {
                                            if (x) {
                                                for (m = v(h / 864e5),
                                                j = v(m / 365.2425) + 1970 - 1; x(j + 1, 0) <= m; j++)
                                                    ;
                                                for (k = v((m - x(j, 0)) / 30.42); x(j, k + 1) <= m; k++)
                                                    ;
                                                m = 1 + m - x(j, k),
                                                n = (h % 864e5 + 864e5) % 864e5,
                                                r = v(n / 36e5) % 24,
                                                t = v(n / 6e4) % 60,
                                                u = v(n / 1e3) % 60,
                                                w = n % 1e3
                                            } else
                                                j = h.getUTCFullYear(),
                                                k = h.getUTCMonth(),
                                                m = h.getUTCDate(),
                                                r = h.getUTCHours(),
                                                t = h.getUTCMinutes(),
                                                u = h.getUTCSeconds(),
                                                w = h.getUTCMilliseconds();
                                            h = (j <= 0 || j >= 1e4 ? (j < 0 ? "-" : "+") + z(6, j < 0 ? -j : j) : z(4, j)) + "-" + z(2, k + 1) + "-" + z(2, m) + "T" + z(2, r) + ":" + z(2, t) + ":" + z(2, u) + "." + z(3, w) + "Z"
                                        } else
                                            h = null;
                                    if (c && (h = c.call(b, a, h)),
                                    null === h)
                                        return "null";
                                    if ("[object Boolean]" == (i = s.call(h)))
                                        return "" + h;
                                    if ("[object Number]" == i)
                                        return h > -1 / 0 && h < 1 / 0 ? "" + h : "null";
                                    if ("[object String]" == i)
                                        return A("" + h);
                                    if ("object" == typeof h) {
                                        for (E = g.length; E--; )
                                            if (g[E] === h)
                                                throw l();
                                        if (g.push(h),
                                        y = [],
                                        F = f,
                                        f += e,
                                        "[object Array]" == i) {
                                            for (D = 0,
                                            E = h.length; D < E; D++)
                                                C = B(D, h, c, d, e, f, g),
                                                y.push(C === q ? "null" : C);
                                            G = y.length ? e ? "[\n" + f + y.join(",\n" + f) + "\n" + F + "]" : "[" + y.join(",") + "]" : "[]"
                                        } else
                                            p(d || h, function(a) {
                                                var b = B(a, h, c, d, e, f, g);
                                                b !== q && y.push(A(a) + ":" + (e ? " " : "") + b)
                                            }),
                                            G = y.length ? e ? "{\n" + f + y.join(",\n" + f) + "\n" + F + "}" : "{" + y.join(",") + "}" : "{}";
                                        return g.pop(),
                                        G
                                    }
                                };
                                b.stringify = function(a, b, c) {
                                    var d, e, f, h;
                                    if (g[typeof b] && b)
                                        if ("[object Function]" == (h = s.call(b)))
                                            e = b;
                                        else if ("[object Array]" == h) {
                                            f = {};
                                            for (var i, j = 0, k = b.length; j < k; i = b[j++],
                                            ("[object String]" == (h = s.call(i)) || "[object Number]" == h) && (f[i] = 1))
                                                ;
                                        }
                                    if (c)
                                        if ("[object Number]" == (h = s.call(c))) {
                                            if ((c -= c % 1) > 0)
                                                for (d = "",
                                                c > 10 && (c = 10); d.length < c; d += " ")
                                                    ;
                                        } else
                                            "[object String]" == h && (d = c.length <= 10 ? c : c.slice(0, 10));
                                    return B("", (i = {},
                                    i[""] = a,
                                    i), e, f, d, "", [])
                                }
                            }
                            if (!c("json-parse")) {
                                var C, D, E = f.fromCharCode, F = {
                                    92: "\\",
                                    34: '"',
                                    47: "/",
                                    98: "\b",
                                    116: "\t",
                                    110: "\n",
                                    102: "\f",
                                    114: "\r"
                                }, G = function() {
                                    throw C = D = null,
                                    k()
                                }, H = function() {
                                    for (var a, b, c, d, e, f = D, g = f.length; C < g; )
                                        switch (e = f.charCodeAt(C)) {
                                        case 9:
                                        case 10:
                                        case 13:
                                        case 32:
                                            C++;
                                            break;
                                        case 123:
                                        case 125:
                                        case 91:
                                        case 93:
                                        case 58:
                                        case 44:
                                            return a = u ? f.charAt(C) : f[C],
                                            C++,
                                            a;
                                        case 34:
                                            for (a = "@",
                                            C++; C < g; )
                                                if ((e = f.charCodeAt(C)) < 32)
                                                    G();
                                                else if (92 == e)
                                                    switch (e = f.charCodeAt(++C)) {
                                                    case 92:
                                                    case 34:
                                                    case 47:
                                                    case 98:
                                                    case 116:
                                                    case 110:
                                                    case 102:
                                                    case 114:
                                                        a += F[e],
                                                        C++;
                                                        break;
                                                    case 117:
                                                        for (b = ++C,
                                                        c = C + 4; C < c; C++)
                                                            (e = f.charCodeAt(C)) >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70 || G();
                                                        a += E("0x" + f.slice(b, C));
                                                        break;
                                                    default:
                                                        G()
                                                    }
                                                else {
                                                    if (34 == e)
                                                        break;
                                                    for (e = f.charCodeAt(C),
                                                    b = C; e >= 32 && 92 != e && 34 != e; )
                                                        e = f.charCodeAt(++C);
                                                    a += f.slice(b, C)
                                                }
                                            if (34 == f.charCodeAt(C))
                                                return C++,
                                                a;
                                            G();
                                        default:
                                            if (b = C,
                                            45 == e && (d = !0,
                                            e = f.charCodeAt(++C)),
                                            e >= 48 && e <= 57) {
                                                for (48 == e && (e = f.charCodeAt(C + 1)) >= 48 && e <= 57 && G(),
                                                d = !1; C < g && (e = f.charCodeAt(C)) >= 48 && e <= 57; C++)
                                                    ;
                                                if (46 == f.charCodeAt(C)) {
                                                    for (c = ++C; c < g && (e = f.charCodeAt(c)) >= 48 && e <= 57; c++)
                                                        ;
                                                    c == C && G(),
                                                    C = c
                                                }
                                                if (101 == (e = f.charCodeAt(C)) || 69 == e) {
                                                    for (e = f.charCodeAt(++C),
                                                    43 != e && 45 != e || C++,
                                                    c = C; c < g && (e = f.charCodeAt(c)) >= 48 && e <= 57; c++)
                                                        ;
                                                    c == C && G(),
                                                    C = c
                                                }
                                                return +f.slice(b, C)
                                            }
                                            if (d && G(),
                                            "true" == f.slice(C, C + 4))
                                                return C += 4,
                                                !0;
                                            if ("false" == f.slice(C, C + 5))
                                                return C += 5,
                                                !1;
                                            if ("null" == f.slice(C, C + 4))
                                                return C += 4,
                                                null;
                                            G()
                                        }
                                    return "$"
                                }, I = function(a) {
                                    var b, c;
                                    if ("$" == a && G(),
                                    "string" == typeof a) {
                                        if ("@" == (u ? a.charAt(0) : a[0]))
                                            return a.slice(1);
                                        if ("[" == a) {
                                            for (b = []; "]" != (a = H()); c || (c = !0))
                                                c && ("," == a ? "]" == (a = H()) && G() : G()),
                                                "," == a && G(),
                                                b.push(I(a));
                                            return b
                                        }
                                        if ("{" == a) {
                                            for (b = {}; "}" != (a = H()); c || (c = !0))
                                                c && ("," == a ? "}" == (a = H()) && G() : G()),
                                                "," != a && "string" == typeof a && "@" == (u ? a.charAt(0) : a[0]) && ":" == H() || G(),
                                                b[a.slice(1)] = I(H());
                                            return b
                                        }
                                        G()
                                    }
                                    return a
                                }, J = function(a, b, c) {
                                    var d = K(a, b, c);
                                    d === q ? delete a[b] : a[b] = d
                                }, K = function(a, b, c) {
                                    var d, e = a[b];
                                    if ("object" == typeof e && e)
                                        if ("[object Array]" == s.call(e))
                                            for (d = e.length; d--; )
                                                J(e, d, c);
                                        else
                                            p(e, function(a) {
                                                J(e, a, c)
                                            });
                                    return c.call(a, b, e)
                                };
                                b.parse = function(a, b) {
                                    var c, d;
                                    return C = 0,
                                    D = "" + a,
                                    c = I(H()),
                                    "$" != H() && G(),
                                    C = D = null,
                                    b && "[object Function]" == s.call(b) ? K((d = {},
                                    d[""] = c,
                                    d), "", b) : c
                                }
                            }
                        }
                        return b.runInContext = e,
                        b
                    }
                    var f = "function" == typeof a && a.amd
                      , g = {
                        function: !0,
                        object: !0
                    }
                      , h = g[typeof d] && d && !d.nodeType && d
                      , i = g[typeof window] && window || this
                      , j = h && g[typeof c] && c && !c.nodeType && "object" == typeof b && b;
                    if (!j || j.global !== j && j.window !== j && j.self !== j || (i = j),
                    h && !f)
                        e(i, h);
                    else {
                        var k = i.JSON
                          , l = i.JSON3
                          , m = !1
                          , n = e(i, i.JSON3 = {
                            noConflict: function() {
                                return m || (m = !0,
                                i.JSON = k,
                                i.JSON3 = l,
                                k = l = null),
                                n
                            }
                        });
                        i.JSON = {
                            parse: n.parse,
                            stringify: n.stringify
                        }
                    }
                    f && a(function() {
                        return n
                    })
                }
                ).call(this)
            }
            ).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }
        , {}],
        51: [function(a, b, c) {
            function d(a, b) {
                var c = [];
                b = b || 0;
                for (var d = b || 0; d < a.length; d++)
                    c[d - b] = a[d];
                return c
            }
            b.exports = d
        }
        , {}]
    }, {}, [31])(31)
}),
"object" != typeof JSON && (JSON = {}),
function() {
    "use strict";
    function f(a) {
        return a < 10 ? "0" + a : a
    }
    function quote(a) {
        return escapable.lastIndex = 0,
        escapable.test(a) ? '"' + a.replace(escapable, function(a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g, h = gap, i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)),
        "function" == typeof rep && (i = rep.call(b, a, i)),
        typeof i) {
        case "string":
            return quote(i);
        case "number":
            return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
            return String(i);
        case "object":
            if (!i)
                return "null";
            if (gap += indent,
            g = [],
            "[object Array]" === Object.prototype.toString.apply(i)) {
                for (f = i.length,
                c = 0; c < f; c += 1)
                    g[c] = str(c, i) || "null";
                return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]",
                gap = h,
                e
            }
            if (rep && "object" == typeof rep)
                for (f = rep.length,
                c = 0; c < f; c += 1)
                    "string" == typeof rep[c] && (d = rep[c],
                    (e = str(d, i)) && g.push(quote(d) + (gap ? ": " : ":") + e));
            else
                for (d in i)
                    Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i)) && g.push(quote(d) + (gap ? ": " : ":") + e);
            return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}",
            gap = h,
            e
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    }
    );
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(a, b, c) {
        var d;
        if (gap = "",
        indent = "",
        "number" == typeof c)
            for (d = 0; d < c; d += 1)
                indent += " ";
        else
            "string" == typeof c && (indent = c);
        if (rep = b,
        b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length))
            throw new Error("JSON.stringify");
        return str("", {
            "": a
        })
    }
    ),
    "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e)
                for (c in e)
                    Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c),
                    void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        if (text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })),
        /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"),
            "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
        throw new SyntaxError("JSON.parse")
    }
    )
}(),
function(a) {
    var b = {
        vertical: {
            x: !1,
            y: !0
        },
        horizontal: {
            x: !0,
            y: !1
        },
        both: {
            x: !0,
            y: !0
        },
        x: {
            x: !0,
            y: !1
        },
        y: {
            x: !1,
            y: !0
        }
    }
      , c = {
        duration: "fast",
        direction: "both"
    }
      , d = /^(?:html)$/i
      , e = function(b, c) {
        c = c || (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(b, null) : b.currentStyle);
        var d = !(!document.defaultView || !document.defaultView.getComputedStyle)
          , e = {
            top: parseFloat(d ? c.borderTopWidth : a.css(b, "borderTopWidth")) || 0,
            left: parseFloat(d ? c.borderLeftWidth : a.css(b, "borderLeftWidth")) || 0,
            bottom: parseFloat(d ? c.borderBottomWidth : a.css(b, "borderBottomWidth")) || 0,
            right: parseFloat(d ? c.borderRightWidth : a.css(b, "borderRightWidth")) || 0
        };
        return {
            top: e.top,
            left: e.left,
            bottom: e.bottom,
            right: e.right,
            vertical: e.top + e.bottom,
            horizontal: e.left + e.right
        }
    }
      , f = function(b) {
        var c = a(window)
          , f = d.test(b[0].nodeName);
        return {
            border: f ? {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            } : e(b[0]),
            scroll: {
                top: (f ? c : b).scrollTop(),
                left: (f ? c : b).scrollLeft()
            },
            scrollbar: {
                right: f ? 0 : b.innerWidth() - b[0].clientWidth,
                bottom: f ? 0 : b.innerHeight() - b[0].clientHeight
            },
            rect: function() {
                var a = b[0].getBoundingClientRect();
                return {
                    top: f ? 0 : a.top,
                    left: f ? 0 : a.left,
                    bottom: f ? b[0].clientHeight : a.bottom,
                    right: f ? b[0].clientWidth : a.right
                }
            }()
        }
    };
    a.fn.extend({
        scrollintoview: function(e) {
            e = a.extend({}, c, e),
            e.direction = b["string" == typeof e.direction && e.direction.toLowerCase()] || b.both;
            var g = "";
            !0 === e.direction.x && (g = "horizontal"),
            !0 === e.direction.y && (g = g ? "both" : "vertical");
            var h = this.eq(0)
              , i = h.closest(":scrollable(" + g + ")");
            if (i.length > 0) {
                i = i.eq(0);
                var j = {
                    e: f(h),
                    s: f(i)
                }
                  , k = {
                    top: j.e.rect.top - (j.s.rect.top + j.s.border.top),
                    bottom: j.s.rect.bottom - j.s.border.bottom - j.s.scrollbar.bottom - j.e.rect.bottom,
                    left: j.e.rect.left - (j.s.rect.left + j.s.border.left),
                    right: j.s.rect.right - j.s.border.right - j.s.scrollbar.right - j.e.rect.right
                }
                  , l = {};
                !0 === e.direction.y && (k.top < 0 ? l.scrollTop = j.s.scroll.top + k.top : k.top > 0 && k.bottom < 0 && (l.scrollTop = j.s.scroll.top + Math.min(k.top, -k.bottom))),
                !0 === e.direction.x && (k.left < 0 ? l.scrollLeft = j.s.scroll.left + k.left : k.left > 0 && k.right < 0 && (l.scrollLeft = j.s.scroll.left + Math.min(k.left, -k.right))),
                a.isEmptyObject(l) ? a.isFunction(e.complete) && e.complete.call(i[0]) : (d.test(i[0].nodeName) && (i = a("html,body")),
                i.animate(l, e.duration).eq(0).queue(function(b) {
                    a.isFunction(e.complete) && e.complete.call(i[0]),
                    b()
                }))
            }
            return this
        }
    });
    var g = {
        auto: !0,
        scroll: !0,
        visible: !1,
        hidden: !1
    };
    a.extend(a.expr[":"], {
        scrollable: function(a, c, e, f) {
            var h = b["string" == typeof e[3] && e[3].toLowerCase()] || b.both
              , i = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(a, null) : a.currentStyle
              , j = {
                x: g[i.overflowX.toLowerCase()] || !1,
                y: g[i.overflowY.toLowerCase()] || !1,
                isRoot: d.test(a.nodeName)
            };
            if (!j.x && !j.y && !j.isRoot)
                return !1;
            var k = {
                height: {
                    scroll: a.scrollHeight,
                    client: a.clientHeight
                },
                width: {
                    scroll: a.scrollWidth,
                    client: a.clientWidth
                },
                scrollableX: function() {
                    return (j.x || j.isRoot) && this.width.scroll > this.width.client
                },
                scrollableY: function() {
                    return (j.y || j.isRoot) && this.height.scroll > this.height.client
                }
            };
            return h.y && k.scrollableY() || h.x && k.scrollableX()
        }
    })
}(Areion.jQuery),


function(a, b, c) {
    function d(a, b, c) {
        if (a.addEventListener)
            return void a.addEventListener(b, c, !1);
        a.attachEvent("on" + b, c)
    }
    function e(a) {
        if ("keypress" == a.type) {
            var b = String.fromCharCode(a.which);
            return a.shiftKey || (b = b.toLowerCase()),
            b
        }
        return z[a.which] ? z[a.which] : A[a.which] ? A[a.which] : String.fromCharCode(a.which).toLowerCase()
    }
    function f(a, b) {
        return a.sort().join(",") === b.sort().join(",")
    }
    function g(a) {
        a = a || {};
        var b, c = !1;
        for (b in F)
            a[b] ? c = !0 : F[b] = 0;
        c || (I = !1)
    }
    function h(a, b, c, d, e, g) {
        var h, i, j = [], k = c.type;
        if (!D[a])
            return [];
        for ("keyup" == k && o(a) && (b = [a]),
        h = 0; h < D[a].length; ++h)
            if (i = D[a][h],
            (d || !i.seq || F[i.seq] == i.level) && k == i.action && ("keypress" == k && !c.metaKey && !c.ctrlKey || f(b, i.modifiers))) {
                var l = !d && i.combo == e
                  , m = d && i.seq == d && i.level == g;
                (l || m) && D[a].splice(h, 1),
                j.push(i)
            }
        return j
    }
    function i(a) {
        var b = [];
        return a.shiftKey && b.push("shift"),
        a.altKey && b.push("alt"),
        a.ctrlKey && b.push("ctrl"),
        a.metaKey && b.push("meta"),
        b
    }
    function j(a) {
        if (a.preventDefault)
            return void a.preventDefault();
        a.returnValue = !1
    }
    function k(a) {
        if (a.stopPropagation)
            return void a.stopPropagation();
        a.cancelBubble = !0
    }
    function l(a, b, c, d) {
        !1 === a(b, c) && (j(b),
        k(b))
    }
    function m(a, b, c) {
        var d, e = h(a, b, c), f = {}, i = 0, j = !1;
        for (d = 0; d < e.length; ++d)
            e[d].seq && (i = Math.max(i, e[d].level));
        for (d = 0; d < e.length; ++d)
            if (e[d].seq) {
                if (e[d].level != i)
                    continue;
                j = !0,
                f[e[d].seq] = 1,
                l(e[d].callback, c, e[d].combo, e[d].seq)
            } else
                j || l(e[d].callback, c, e[d].combo);
        var k = "keypress" == c.type && H;
        c.type != I || o(a) || k || g(f),
        H = j && "keydown" == c.type
    }
    function n(a) {
        "number" != typeof a.which && (a.which = a.keyCode);
        var b = e(a);
        if (b)
            return "keyup" == a.type && G === b ? void (G = !1) : void K.handleKey(b, i(a), a)
    }
    function o(a) {
        return "shift" == a || "ctrl" == a || "alt" == a || "meta" == a
    }
    function p() {
        clearTimeout(y),
        y = setTimeout(g, 1e3)
    }
    function q() {
        if (!x) {
            x = {};
            for (var a in z)
                a > 95 && a < 112 || z.hasOwnProperty(a) && (x[z[a]] = a)
        }
        return x
    }
    function r(a, b, c) {
        return c || (c = q()[a] ? "keydown" : "keypress"),
        "keypress" == c && b.length && (c = "keydown"),
        c
    }
    function s(a, b, c, d) {
        function f(b) {
            l(c, b, a),
            "keyup" !== d && (G = e(b)),
            setTimeout(g, 10)
        }
        F[a] = 0;
        for (var h = 0; h < b.length; ++h) {
            var i = h + 1 === b.length
              , j = i ? f : function(b) {
                return function() {
                    I = b,
                    ++F[a],
                    p()
                }
            }(d || u(b[h + 1]).action);
            v(b[h], j, d, a, h)
        }
    }
    function t(a) {
        return "+" === a ? ["+"] : a.split("+")
    }
    function u(a, b) {
        var c, d, e, f = [];
        for (c = t(a),
        e = 0; e < c.length; ++e)
            d = c[e],
            C[d] && (d = C[d]),
            b && "keypress" != b && B[d] && (d = B[d],
            f.push("shift")),
            o(d) && f.push(d);
        return b = r(d, f, b),
        {
            key: d,
            modifiers: f,
            action: b
        }
    }
    function v(a, b, c, d, e) {
        E[a + ":" + c] = b,
        a = a.replace(/\s+/g, " ");
        var f, g = a.split(" ");
        if (g.length > 1)
            return void s(a, g, b, c);
        f = u(a, c),
        D[f.key] = D[f.key] || [],
        h(f.key, f.modifiers, {
            type: f.action
        }, d, a, e),
        D[f.key][d ? "unshift" : "push"]({
            callback: b,
            modifiers: f.modifiers,
            action: f.action,
            seq: d,
            level: e,
            combo: a
        })
    }
    function w(a, b, c) {
        for (var d = 0; d < a.length; ++d)
            v(a[d], b, c)
    }
    for (var x, y, z = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "ins",
        46: "del",
        91: "meta",
        93: "meta",
        224: "meta"
    }, A = {
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    }, B = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        $: "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        _: "-",
        "+": "=",
        ":": ";",
        '"': "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    }, C = {
        option: "alt",
        command: "meta",
        return: "enter",
        escape: "esc",
        mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
    }, D = {}, E = {}, F = {}, G = !1, H = !1, I = !1, J = 1; J < 20; ++J)
        z[111 + J] = "f" + J;
    for (J = 0; J <= 9; ++J)
        z[J + 96] = J;
    d(b, "keypress", n),
    d(b, "keydown", n),
    d(b, "keyup", n);
    var K = {
        bind: function(a, b, c) {
            return a = a instanceof Array ? a : [a],
            w(a, b, c),
            this
        },
        unbind: function(a, b) {
            return K.bind(a, function() {}, b)
        },
        trigger: function(a, b) {
            return E[a + ":" + b] && E[a + ":" + b]({}, a),
            this
        },
        reset: function() {
            return D = {},
            E = {},
            this
        },
        stopCallback: function(a, b) {
            return !((" " + b.className + " ").indexOf(" mousetrap ") > -1) && ("INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.isContentEditable)
        },
        handleKey: m
    };
    a.Mousetrap = K,
    "function" == typeof define && define.amd && define(K)
}(window, document);



var SPECIFICITY = function() {
    var a, b, c;
    return a = function(a) {
        var c, d, e, f, g = [];
        for (c = a.split(","),
        e = 0,
        f = c.length; e < f; e += 1)
            d = c[e],
            d.length > 0 && g.push(b(d));
        return g
    }
    ,
    b = function(a) {
        var b, c = a, d = {
            a: 0,
            b: 0,
            c: 0
        }, e = [], f = /(\[[^\]]+\])/g, g = /(#[^\s\+>~\.\[:]+)/g, h = /(\.[^\s\+>~\.\[:]+)/g, i = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, j = /(:[\w-]+\([^\)]*\))/gi, k = /(:[^\s\+>~\.\[:]+)/g, l = /([^\s\+>~\.\[:]+)/g;
        return b = function(b, f) {
            var g, h, i, j, k, l;
            if (b.test(c))
                for (g = c.match(b),
                h = 0,
                i = g.length; h < i; h += 1)
                    d[f] += 1,
                    j = g[h],
                    k = c.indexOf(j),
                    l = j.length,
                    e.push({
                        selector: a.substr(k, l),
                        type: f,
                        index: k,
                        length: l
                    }),
                    c = c.replace(j, Array(l + 1).join(" "))
        }
        ,
        function() {
            var a = function(a) {
                var b, d, e, f;
                if (a.test(c))
                    for (b = c.match(a),
                    d = 0,
                    e = b.length; d < e; d += 1)
                        f = b[d],
                        c = c.replace(f, Array(f.length + 1).join("A"))
            }
              , b = /\\[0-9A-Fa-f]{6}\s?/g
              , d = /\\[0-9A-Fa-f]{1,5}\s/g
              , e = /\\./g;
            a(b),
            a(d),
            a(e)
        }(),
        function() {
            var a = /:not\(([^\)]*)\)/g;
            a.test(c) && (c = c.replace(a, "     $1 "))
        }(),
        function() {
            var a, b, d, e, f = /{[^]*/gm;
            if (f.test(c))
                for (a = c.match(f),
                b = 0,
                d = a.length; b < d; b += 1)
                    e = a[b],
                    c = c.replace(e, Array(e.length + 1).join(" "))
        }(),
        b(f, "b"),
        b(g, "a"),
        b(h, "b"),
        b(i, "c"),
        b(j, "b"),
        b(k, "b"),
        c = c.replace(/[\*\s\+>~]/g, " "),
        c = c.replace(/[#\.]/g, " "),
        b(l, "c"),
        e.sort(function(a, b) {
            return a.index - b.index
        }),
        {
            selector: a,
            specificity: "0," + d.a.toString() + "," + d.b.toString() + "," + d.c.toString(),
            specificityArray: [0, d.a, d.b, d.c],
            parts: e
        }
    }
    ,
    c = function(a, c) {
        var d, e, f;
        if ("string" == typeof a) {
            if (-1 !== a.indexOf(","))
                throw "Invalid CSS selector";
            d = b(a).specificityArray
        } else {
            if (!Array.isArray(a))
                throw "Invalid CSS selector or specificity array";
            if (4 !== a.filter(function(a) {
                return "number" == typeof a
            }).length)
                throw "Invalid specificity array";
            d = a
        }
        if ("string" == typeof c) {
            if (-1 !== c.indexOf(","))
                throw "Invalid CSS selector";
            e = b(c).specificityArray
        } else {
            if (!Array.isArray(c))
                throw "Invalid CSS selector or specificity array";
            if (4 !== c.filter(function(a) {
                return "number" == typeof a
            }).length)
                throw "Invalid specificity array";
            e = c
        }
        for (f = 0; f < 4; f += 1) {
            if (d[f] < e[f])
                return -1;
            if (d[f] > e[f])
                return 1
        }
        return 0
    }
    ,
    {
        calculate: a,
        compare: c
    }
}()

var Ghostlab = {
    options: {
        findElementScanRange: 100,
        findElementMajorScanStride: 10,
        findElementMinorScanStride: 50,
        inspectorScriptURL: "____ghostlab_inspector____.js?v=3.1.1",
        html2canvasScriptURL: "____ghostlab_html2canvas____.js?v=3.1.1",
        alwaysReceiveEventNames: {
            config: !0,
            identify: !0,
            takeScreenshot: !0,
            openWindows: !0,
            moveWindows: !0,
            closeWindows: !0,
            assignWindowName: !0,
            updateWindowBounds: !0,
            setDeviceName: !0
        }
    },
    config: Areion.config,
    Constants: {
        FAST_EVENT_DELAY: 50,
        EVENT_RESET_TIMEOUT: 1e3,
        FORM_SUBMIT_DELAY: 100
    },
    state: {
        myId: -1,
        myIndex: -1,
        frameId: null,
        socket: null,
        isMainFrame: !1,
        scrollStart: {},
        isScrolling: !1,
        didScroll: !0,
        isClicking: !1,
        isReplacingValue: !1,
        isSendingKeyScrollingEvent: !1,
        mousedownSelector: "",
        focusSelector: "",
        lastClickedElement: null,
        touchStart: {
            x: -1,
            y: -1
        },
        emulatedTouchStartPos: {
            x: -1,
            y: -1
        },
        resizeTimeout: !1,
        lastEventTime: 0,
        preventClickPropagation: !1,
        handlersOverridden: !1,
        domMutationIgnoreNodes: [],
        screenXOffset: 0,
        screenYOffset: 0,
        preventResizeHandling: !1,
        reloadInspectorSent: 0,
        quickFillData: [],
        originalPrototypeMethods: void 0,
        usedEvents: {}
    },
    ua: {
        msie: !1,
        msie8: !1,
        msie9: !1,
        opera: !1,
        android: 0,
        iOS: void 0
    },
    features: {
        hasAddEventListener: "function" == typeof document.addEventListener,
        hasMutationObserver: !!(window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver),
        isMobile: /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
        hasTouch: "ontouchstart"in window,
        hasOnlyTouch: !1,
        hasCSSEscape: "undefined" != typeof CSS && "function" == typeof CSS.escape,
        cssEscape: "undefined" != typeof CSS && CSS.escape
    },
    Events: {},
    BuiltInEvents: {},
    DOMEvents: {},
    Overrides: {},
    UndispatchableEventListeners: {
        touchmove: []
    },
    EventHelpers: {},
    jQuery: Areion.jQuery,
    isNoRewriteUrl: Areion.isNoRewriteUrl,
    rewriteUrl: Areion.rewriteUrl,
    rewriteReplaceUrl: Areion.rewriteReplaceUrl,
    unrewriteUrl: Areion.unrewriteUrl,
    getFullOrigUrl: function(a) {
        if (Ghostlab.StringHelpers.startsWith(a, "data:"))
            return a;
        var b = Ghostlab.unrewriteUrl(Ghostlab.URLHelpers.getResourceUrl(a));
        return b.length > 1 && "/" === b.charAt(0) ? b.substr(1) : b
    },
    startObservingDOM: Areion.startObservingDOM,
    addMutationListener: Areion.addMutationListener,
    removeMutationListener: Areion.removeMutationListener,
    StringHelpers: Areion.StringUtil,
    URLHelpers: Areion.UrlUtil
};

if (function() {
    var a = {
        broadcastEvents: !0,
        receiveEvents: !0,
        inspectorEnabled: !1,
        scrollFocusIntoView: !0,
        scrollMode: "element",
        scrollModeElement: "vcenter",
        quickFillShortcuts: [],
        quickFillJavascriptCodes: [],
        quickFillData: [],
        formFillTriggerKey: "",
        formFillSelectors: [],
        formFillJavascriptCodes: [],
        overrideOptions: {
            iframeIgnoreInjectSelector: ".html2canvas-container"
        }
    };
    for (var b in a)
        void 0 === Ghostlab.config[b] && (Ghostlab.config[b] = a[b])
}(),
/**
 * Converters
 */
Ghostlab.Converters = {
    toAbsolute: function(a, b, c) {
        if (void 0 === b && void 0 === c)
            return {
                x: void 0,
                y: void 0
            };
        try {
            var d = a.offset() || {
                left: 0,
                top: 0
            };
            return {
                x: void 0 === b || void 0 === d ? void 0 : Math.floor(d.left + a.width() * b),
                y: void 0 === c || void 0 === d ? void 0 : Math.floor(d.top + a.height() * c)
            }
        } catch (a) {
            return {
                x: 1,
                y: 1
            }
        }
    },
    toRelative: function(a, b, c) {
        if (void 0 === b && void 0 === c)
            return {
                x: void 0,
                y: void 0
            };
        try {
            var d = typeof a.width
              , e = typeof a.height
              , f = ("function" === d ? a.width() : "number" === d ? a.width : void 0) || Ghostlab.UIHelpers.getWindowWidth()
              , g = ("function" === e ? a.height() : "number" === e ? a.height : void 0) || Ghostlab.UIHelpers.getWindowHeight()
              , h = 0
              , i = 0;
            if ("function" == typeof a.offset) {
                var j = a.offset();
                h = j.left,
                i = j.top
            } else
                h = a.left || 0,
                i = a.top || 0;
            return {
                x: void 0 === b ? void 0 : (b - h) / f,
                y: void 0 === c ? void 0 : (c - i) / g
            }
        } catch (a) {
            return {
                x: .5,
                y: .5
            }
        }
    },
    toTouchesArray: function(a, b) {
        for (var c = [], d = b.length, e = 0; e < d; e++) {
            var f = b[e]
              , g = this.toRelative(a, f.pageX, f.pageY);
            c.push({
                identifier: f.identifier,
                x: g.x,
                y: g.y,
                target: Ghostlab.DOMHelpers.buildSelector(Ghostlab.jQuery(f.target))
            })
        }
        return c
    },
    toTouchList: function(a, b) {
        function c(a, b, c, d) {
            this.identifier = b,
            this.target = a,
            this.clientX = c,
            this.clientY = d,
            this.screenX = 0,
            this.screenY = 0,
            this.pageX = c,
            this.pageY = d
        }
        for (var d = "function" == typeof document.createTouch, e = [], f = b.length, g = 0; g < f; g++) {
            var h = b[g]
              , i = this.toAbsolute(a, h.x, h.y);
            e.push(d ? document.createTouch(window, Ghostlab.jQuery(h.target)[0], h.identifier, i.x, i.y, 0, 0) : new c(Ghostlab.jQuery(h.target)[0],h.identifier,i.x,i.y))
        }
        return "function" == typeof document.createTouchList ? document.createTouchList.apply(document, e) : e
    },
    touchToMouseEvent: function(a) {
        return {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[a]
    },
    mouseToTouchEvent: function(a) {
        return {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        }[a]
    }
},
/**
 * CookieHelpers
 */
Ghostlab.CookieHelpers = {
    createCookie: function(a, b, c) {
        var d = "";
        if (!c) {
            var e = new Date;
            e.setTime(e.getTime() + 864e5),
            d = "; expires=" + e.toGMTString()
        }
        document.cookie = a + "=" + b + d + "; path=/"
    },
    readCookie: function(a) {
        for (var b = document.cookie.split(";"), c = b.length, d = 0; d < c; d++) {
            var e = Ghostlab.StringHelpers.trim(b[d]);
            if (0 == e.indexOf(a + "="))
                return e.substring(a.length + 1, e.length)
        }
        return null
    },
    readCookies: function() {
        for (var a = document.cookie.split(";"), b = a.length, c = {}, d = 0; d < b; d++) {
            var e = a[d].split("=");
            c[Ghostlab.StringHelpers.trim(e[0])] = decodeURI(Ghostlab.StringHelpers.trim(e[1]))
        }
        return c
    },
    deleteCookie: function(a) {
        "__areion" !== a.substr(0, 8) && "__ghostlab" !== a.substr(0, 10) && (document.cookie = a + "=;expires=Thu, 01-Jan-70 00:00:00 GMT;")
    },
    deleteAllCookies: function() {
        for (var a = document.cookie.split(";"), b = a.length, c = 0; c < b; c++) {
            var d = a[c]
              , e = d.indexOf("=")
              , f = e > -1 ? d.substr(0, e) : d;
            "__areion" !== f.substr(0, 8) && "__ghostlab" !== f.substr(0, 10) && (document.cookie = f + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT")
        }
    }
},

/**
 * DOMHelpers
 */
function() {
    var a = null;
    "function" == typeof document.createNSResolver && (a = document.createNSResolver(document.documentElement)),
    Ghostlab.DOMHelpers = {
        buildSelector: function(a) {
            if (a[0] === document)
                return "document";
            if (a[0] === window)
                return "window";
            var b = a.closest("#__ghostlab_multiedit__ [data-ghostlab-selector]");
            if (b.length > 0)
                return b.attr("data-ghostlab-selector");
            for (var c = "", d = null, e = a; !e.is("html"); e = d) {
                var f = e.attr("id");
                if (f && !Ghostlab.DOMHelpers.isProbablyAutoGeneratedID(f)) {
                    var g = Ghostlab.DOMHelpers.escapeSelector(f)
                      , h = Ghostlab.jQuery("[id=" + g + "]")
                      , i = h.length;
                    if (1 === i)
                        return "#" + g + c;
                    if (i > 1)
                        return "[id=" + g + "]:eq(" + h.index(e) + ")" + c
                }
                var j = e.prop("nodeName");
                if (void 0 === j)
                    return c;
                if (j = Ghostlab.DOMHelpers.escapeSelector(j.toLowerCase()),
                !(d = e.parent()) || 0 === d.length)
                    return c;
                var k = d.children(j);
                k.length > 1 && (j += ":eq(" + k.index(e) + ")"),
                c = " > " + j + c
            }
            return "html" + c
        },
        isProbablyAutoGeneratedID: function(a) {
            return /\d|^pika-/g.test(a)
        },
        escapeSelector: function(a) {
            return "string" != typeof a ? a : Ghostlab.features.hasCSSEscape ? Ghostlab.features.cssEscape(a) : a.replace(/([!"#$%&'\(\)\*\+,\.\/:;<=>\?@\[\\\]^`\{\|\}~])/g, "\\$1")
        },
        fromSelector: function(a) {
            return a && "document" !== a ? "window" === a ? Ghostlab.$window : Ghostlab.jQuery(a) : Ghostlab.$document
        },
        isFormElement: function(a) {
            return a.is("input") || a.is("button") || a.is("textarea") || a.is("select")
        },
        isSelectableFormElement: function(a) {
            if (a.is("select"))
                return !0;
            if (a.is("option"))
                return !0;
            if (a.is("input")) {
                var b = a.attr("type");
                return "checkbox" === b || "radio" === b
            }
            return !1
        },
        isEmptyTextNode: function(a) {
            return 3 === a.nodeType && "" === Ghostlab.StringHelpers.trim(a.nodeValue)
        },
        createNSResolver: function(a) {
            return "function" != typeof document.createNSResolver ? null : document.createNSResolver(null === a.ownerDocument ? a.documentElement : a.ownerDocument.documentElement)
        },
        executeXPath: function(b) {
            if ("function" != typeof document.evaluate)
                return null;
            try {
                var c = document.evaluate(b, document, a, XPathResult.ANY_TYPE, null);
                switch (c.resultType) {
                case XPathResult.NUMBER_TYPE:
                    return c.numberValue;
                case XPathResult.STRING_TYPE:
                    return c.stringValue;
                case XPathResult.BOOLEAN_TYPE:
                    return c.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    for (var d = [], e = null; e = c.iterateNext(); )
                        d.push(e);
                    return d;
                default:
                    return null
                }
            } catch (a) {
                return null
            }
        }
    }
}(),
/**
 * InspectionHelpers
 */
function() {
    var a = [];
    Ghostlab.InspectionHelpers = {
        isGhostlabDOMElement: function(a) {
            if (!a)
                return !1;
            var b = void 0
              , c = !1;
            if (a.jquery)
                b = a[0],
                c = !0;
            else
                try {
                    var d = a.ownerDocument && a.ownerDocument.defaultView;
                    ("undefined" != typeof Node && a instanceof Node || d && a instanceof d.Node) && (b = a)
                } catch (a) {
                    return !1
                }
            if (!b)
                return !1;
            if (b.id && "__ghostlab_" === b.id.substr(0, 11))
                return !0;
            if ("SCRIPT" === b.tagName && b.src) {
                return "/____ghostlab" === (c ? a : Ghostlab.jQuery(a)).attr("src").substr(0, 13)
            }
            return !1
        },
        isJSONObject: function(a, b) {
            if (void 0 !== b && b > 10)
                return !1;
            if ("function" == typeof a)
                return !1;
            if ("object" != typeof a)
                return !0;
            if (a instanceof Date || a instanceof RegExp)
                return !1;
            if (a instanceof Array)
                for (var c = 0; c < a.length; c++)
                    if (!Ghostlab.InspectionHelpers.isJSONObject(a[c], (b || 0) + 1))
                        return !1;
            for (var d in a)
                if (!Ghostlab.InspectionHelpers.isJSONObject(a[d], (b || 0) + 1))
                    return !1;
            return !0
        },
        isArrayLike: function(a) {
            try {
                if ("object" != typeof a)
                    return !1;
                if ("function" == typeof a.splice)
                    return isFinite(a.length);
                var b = Object.prototype.toString.call(a);
                if ("[object Array]" === b || "[object Arguments]" === b || "[object HTMLCollection]" === b || "[object NodeList]" === b || "[object DOMTokenList]" === b)
                    return isFinite(a.length)
            } catch (a) {}
            return !1
        },
        getObjectClassName: function(a) {
            if (!a.constructor)
                return "Object";
            if (void 0 !== a.constructor.name)
                return a.constructor.name;
            var b = a.constructor.toString().match(/^function\s+([a-zA-Z0-9_]+)/);
            return b ? b[1] : "Object"
        },
        getObjectSubtype: function(a, b) {
            if ("object" == typeof a)
                return Ghostlab.InspectionHelpers.isArrayLike(a) ? "array" : a instanceof Array || a instanceof Date || a instanceof RegExp ? (void 0 === b && (b = Ghostlab.InspectionHelpers.getObjectClassName(a)),
                b.toLowerCase()) : "undefined" != typeof Node && a instanceof Node ? "node" : void 0
        },
        getObjectDescription: function(a, b) {
            if (b)
                return b;
            var c = typeof a;
            if ("object" === c) {
                if (null === a)
                    return "null";
                if ("undefined" != typeof Node && a instanceof Node)
                    return Ghostlab.InspectionHelpers.getNodeDescription(a);
                if (Ghostlab.InspectionHelpers.isArrayLike(a)) {
                    for (var d = a.length, e = d, f = 0; f < e; f++)
                        Ghostlab.InspectionHelpers.isGhostlabDOMElement(a[f]) && d--;
                    return (b || Ghostlab.InspectionHelpers.getObjectClassName(a) || "Array") + "[" + d + "]"
                }
                return a instanceof Date || a instanceof RegExp ? String(a) : "Object"
            }
            return "function" === c ? a.toString() : "string" === c ? a : "undefined" === c ? "undefined" : function(a) {
                return a.length > 100 ? a.substr(0, 100) + "…" : a
            }(String(a))
        },
        getNodeDescription: function(a) {
            var b = (a.tagName || "").toLowerCase();
            a.id && (b += "#" + a.id);
            var c = Ghostlab.jQuery(a).attr("class");
            return c && (b += "." + c.replace(/\s+/, ".")),
            b
        },
        getObjectPreview: function(a) {
            if ("object" == typeof a) {
                var b = {
                    lossless: !0,
                    overflow: !1,
                    properties: []
                };
                if (Ghostlab.InspectionHelpers.isArrayLike(a)) {
                    b.lossless = !1,
                    b.overflow = !0;
                    for (var c = Math.min(a.length, 10), d = 0; d < c; d++) {
                        var e = a[d];
                        Ghostlab.InspectionHelpers.isGhostlabDOMElement(e) || b.properties.push({
                            name: String(d),
                            type: typeof e,
                            subtype: Ghostlab.InspectionHelpers.getObjectSubtype(e),
                            value: Ghostlab.InspectionHelpers.getObjectDescription(e)
                        })
                    }
                } else {
                    var d = 0;
                    for (var f in a) {
                        var e = a[f]
                          , g = typeof e;
                        if ("object" !== g && "function" !== g || e instanceof Date || e instanceof RegExp) {
                            if (!Ghostlab.InspectionHelpers.isGhostlabDOMElement(e)) {
                                if (d > 5) {
                                    b.lossless = !1,
                                    b.overflow = !0;
                                    break
                                }
                                b.properties.push({
                                    name: f,
                                    type: g,
                                    subtype: Ghostlab.InspectionHelpers.getObjectSubtype(e),
                                    value: Ghostlab.InspectionHelpers.getObjectDescription(e)
                                }),
                                d++
                            }
                        } else
                            b.lossless = !1
                    }
                }
                return b
            }
        },
        getRemoteObject: function(b, c, d) {
            var e = typeof b
              , f = {
                type: e
            };
            if ("object" === e || "function" === e)
                if (null === b)
                    f.className = "null",
                    f.value = null;
                else if ("undefined" != typeof Error && b instanceof Error)
                    f.objectId = "ERROR",
                    f.className = "Error",
                    f.description = b.message || "";
                else {
                    for (var g = -1, h = a.length, i = 0; i < h; i++) {
                        var j = a[i];
                        if (j && j.object === b) {
                            g = i;
                            break
                        }
                    }
                    if (g >= 0) {
                        var k = a[g].remoteObject;
                        if (d && void 0 === k.preview) {
                            var l = Ghostlab.InspectionHelpers.getObjectPreview(b);
                            l && (k.preview = l)
                        }
                        return k
                    }
                    if (f.className = Ghostlab.InspectionHelpers.getObjectClassName(b),
                    f.subtype = Ghostlab.InspectionHelpers.getObjectSubtype(b, f.className),
                    f.objectId = a.length.toString(),
                    c && Ghostlab.InspectionHelpers.isJSONObject(b) && (f.value = b),
                    f.description = Ghostlab.InspectionHelpers.getObjectDescription(b, f.className),
                    d) {
                        var l = Ghostlab.InspectionHelpers.getObjectPreview(b);
                        l && (f.preview = l)
                    }
                    a.push({
                        object: b,
                        remoteObject: f
                    })
                }
            else
                f.value = b,
                f.description = Ghostlab.InspectionHelpers.getObjectDescription(b),
                b === 1 / 0 ? f.unserializableValue = "Infinity" : b === -1 / 0 ? f.unserializableValue = "-Infinity" : "number" == typeof b && isNaN(b) ? f.unserializableValue = "NaN" : 1 / b == -1 / 0 && (f.unserializableValue = "-0");
            return f
        },
        getObjectById: function(b) {
            var c = a[b];
            return c && c.object
        },
        getValueFromRemoteObject: function(a) {
            if ("object" === a.type || "function" === a.type)
                return Ghostlab.InspectionHelpers.getObjectById(a.objectId);
            if ("undefined" !== a.type)
                return a.value
        },
        getValueFromCallArgument: function(a) {
            if (a.remoteObject)
                return Ghostlab.InspectionHelpers.getValueFromRemoteObject(a.remoteObject)
        },
        releaseObject: function(b) {
            delete a[b]
        },
        getErrorText: function(a) {
            var b = "Uncaught ";
            return a ? "function" == typeof a.toString ? b += a.toString() : b += "Error: " + a.message : b += "Error",
            b
        }
    }
}(),

"undefined" != typeof exports)
    for (var f in Ghostlab.InspectionHelpers)
        exports[f] = Ghostlab.InspectionHelpers[f];

/**
 * MathHelpers
 */
Ghostlab.MathHelpers = {
    sgn: function(a) {
        return a > 0 ? 1 : a < 0 ? -1 : 0
    }
},

/**
 * MultiEdit
 */
function() {
    var a = null
      , b = null
      , c = null
      , d = 0
      , e = -1
      , f = -1
      , g = 0
      , h = function(a) {
        if (Ghostlab.jQuery(a).closest("#__ghostlab_multiedit__").length > 0)
            return null;
        var b = a.tagName;
        if ("LABEL" === b)
            return a.control || null;
        if ("SELECT" === b || "TEXTAREA" === b)
            return a;
        if ("INPUT" === b) {
            var c = a.type;
            return c ? (c = c.toLowerCase(),
            "button" !== c && "submit" !== c && "reset" !== c ? a : null) : a
        }
        return null
    }
      , i = function(a) {
        if (!a)
            return null;
        if (3 === a.nodeType)
            return a.textContent;
        var b = a.tagName;
        return "INPUT" !== b && "SELECT" !== b && "TEXTAREA" !== b ? a.textContent : null
    }
      , j = function(a, b) {
        b || (b = a.attr("name"));
        var c = a.closest("form")
          , d = 'input[type="radio"][name="' + Ghostlab.DOMHelpers.escapeSelector(b) + '"]';
        return 0 === c.length ? Ghostlab.jQuery(d) : c.find(d)
    }
      , k = function(b, c) {
        for (var d = Ghostlab.jQuery('<div style="display:table; table-layout:fixed; padding:0; margin:0"></div>'), e = Ghostlab.jQuery('<div style="display:table-row; padding:0; margin:0"><div style="display:table-cell"></div></div>'), f = [], g = b.length, h = 0; h < g; h++) {
            var j = b[h]
              , k = j.labels
              , l = k && k.length > 0 ? k[0].textContent : i(j.nextSibling) || i(j.previousSibling);
            e.append("<div style=\"display:table-cell; padding:2px 4px; margin:0; font:400 12px 'Helvetica Neue',Arial,sans-serif; color:#000\">" + (l || "") + "</div>"),
            f.push(Ghostlab.DOMHelpers.buildSelector(Ghostlab.jQuery(j)))
        }
        for (var m, n = c.length, o = 0; o < n; o++) {
            for (var p = c[o], q = p.clientId === Ghostlab.state.myId, r = p.clientId === Ghostlab.state.myId ? "#54b6da" : "#555", s = Ghostlab.jQuery('<form style="display:table-row"><form><div style="display:table-cell; padding:2px 4px; margin:0; vertical-align:middle; font:400 14px \'Helvetica Neue\',Arial,sans-serif; color:' + r + "; margin:5px 0 0\"><b style=\"font:700 14px 'Helvetica Neue',Arial,sans-serif; color:" + r + ';">' + p.title + "</b><br>(" + p.os + ")</div></form>"), h = 0; h < g; h++) {
                var t = Ghostlab.jQuery('<div style="display:table-cell; padding:2px 4px; margin:0; vertical-align:middle"></div>')
                  , u = Ghostlab.jQuery(b[h]).clone();
                u.attr("data-ghostlab-selector", f[h]),
                u.attr("data-ghostlab-2cid", p.clientId),
                q || u.prop("checked", !1),
                t.append(u),
                s.append(t)
            }
            q ? m = s : d.append(s)
        }
        d.prepend(m),
        d.prepend(e),
        a.$container.append(d)
    }
      , l = function(b, c) {
        for (var d, e = b.is(":checkbox"), f = {
            position: "relative",
            display: e ? "inline" : "inline-block",
            visibility: "visible",
            left: 0,
            top: 0,
            width: e ? "auto" : "100%",
            height: e ? "auto" : b.is("textarea") ? "60px" : "21px",
            "min-width": "auto",
            "max-width": "auto",
            "min-height": "auto",
            "max-height": "auto",
            padding: "2px 6px",
            margin: e ? "0 6px 0 0" : 0,
            font: '400 13px "Helvetica Neue",Arial,sans-serif',
            "text-align": "left",
            color: "#000",
            "background-color": "#f7f7f7",
            border: e ? "none" : "1px solid #d9d9d9",
            "border-radius": 0,
            "box-sizing": "border-box",
            "box-shadow": "none",
            opacity: 1
        }, g = c.length, h = 0; h < g; h++) {
            var i = c[h]
              , j = i.clientId === Ghostlab.state.myId
              , k = j ? "#54b6da" : "#555"
              , l = Ghostlab.jQuery('<div style="margin:0; padding:0"></div>')
              , m = Ghostlab.jQuery("<label style=\"font:400 14px 'Helvetica Neue',Arial,sans-serif; color:" + k + "; margin:5px 0 0; display: " + (e ? "inline" : "inline-block; width:100%") + '"><b style="font:700 14px \'Helvetica Neue\',Arial,sans-serif;">' + i.title + "</b> (" + i.os + ")</label>");
            l.append(m);
            var n = b.clone();
            n.css(f),
            n.attr("data-ghostlab-2cid", i.clientId),
            j || (e ? n.prop("checked", !1) : n.val("")),
            e ? m.prepend(n) : l.append(n),
            j ? d = l : a.$container.append(l)
        }
        a.$container.prepend(d)
    }
      , m = function() {
        var b = Ghostlab.jQuery('<div id="__ghostlab_multiedit__" style="opacity: 0; transition: opacity 0.4s ease; position:absolute; display:none; min-width:180px; padding:0; margin:0; box-sizing:border-box; background-color:#000; border:none; border-radius:2px; z-index:9999999; box-shadow:0 2px 10px rgba(0,0,0,0.5)"><img style="position:absolute; left:3px; top:4px; width:16px; height:16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QjJENkMyREY4MjkxMUU2QTMzQkY0QThBQUI1QUEwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QjJENkMyRUY4MjkxMUU2QTMzQkY0QThBQUI1QUEwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRCMkQ2QzJCRjgyOTExRTZBMzNCRjRBOEFBQjVBQTA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRCMkQ2QzJDRjgyOTExRTZBMzNCRjRBOEFBQjVBQTA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0fcqjAAAAnZJREFUeNp0U0tPE1EU/u7MdFoFLC1F3qXBIokJ7DQaWfkK6QZ3+gNMTIwQ2erOjYmJ/0BWrmRniHsXxhCFRIliBCqliEo7ZTrQx3TmPrxTitJWzs3JzD1zznfP9507RAiBYyzkAiPMpnogoCXlfvu/WR5AgyuCsbuCs9ViseTsZHPsVya3ZRj5J5lMprUxnzR1wPlMbq/0bGV7l2QME3apKGMM8d4Iot2dL3p6IndklnOY3gBQiX9czS68NViH4tchqAsja8Gy9mHs/MbE2QgS42M329vbXx1WKEcPt216+c3Cp47Uz12M9odAXQWqdhLjl0bhBIKYX1hBsVieOFqj1elB/JGBNgWzz2exszyGZPI7KAg+9PXh9btlTCcuQNf9HceKmM2ZD4ycJR4+eixUPSK5+QT0AYGh6+L2zFPxdS0l1jfSL4/W1HXAKdVUTcfU9D1cu3EVn798g8NkffwMzsVjYJSiwupY1wNA0VqZRHVcF/3RKMKdXRDechkKhRI0TYWmE+1YAAXkNKtNxXUpynZFTpVD9RJVtdqy3Ie96XnsG6dAHOaOcMb/BQjq3j0wRlk0n88Hm8ZoWXZMfhyjkufBAc3GJDilbCBrmuebAAqFwiRjIsIFr11IDl6jw73FD+IOpb7dfOn+0tKS768GqVQqsFd2bylQ9vw+kldVrQ2CBwWj+xzCUQUJQf4hEsWkbqWFUfXiqWAoJkvXqlc5MZ3wj/ddmUwl18OLi++LsaF4d4+0H+m0aVqmPTw80iX7qGxubKR7Bwe1znC3tbW5Nj83N2dVAQipyuWJ3SL9RI0aqXXoPd0qkwPlbellLyZr+R8BBgA3EG19SSRzKAAAAABJRU5ErkJggg=="><h1 style="font:bold 14px/20px \'Helvetica Neue\',Arial,sans-serif; color:#fff; padding:3px 0 4px 22px; margin:0; white-space:nowrap">Remote fill</h1><button id="__ghostlab_multiedit_close__" style="position:absolute; width:10px; height:10px; right:10px; top:9px; padding:0; margin:0; border:none; cursor:pointer; background-color:transparent; background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRUJEMkYwOEY4NDkxMUU2OENGNTgwODEwNzcxNUI4NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRUJEMkYwOUY4NDkxMUU2OENGNTgwODEwNzcxNUI4NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNFQkQyRjA2Rjg0OTExRTY4Q0Y1ODA4MTA3NzE1Qjg3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNFQkQyRjA3Rjg0OTExRTY4Q0Y1ODA4MTA3NzE1Qjg3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YEMI/QAAAJZJREFUeNpi+P///3UgPgzEAkDMgIbZgHgFED8AcY7+h4CDaIqZgHg1VO4aA1TyEJJiXqhCmKKLQKwI0y0IVQQCu4F4MZR9AaQIpAbZPXxAvOs/AoAUScPkmRgQ4DMQv0TifwLiD3AeFodfgoYCigdBipjRHA6yjhPNg0IghSvRHY7FgwdBAg+g1sljCXCQ4v1A/AQgwADorDoT54dehQAAAABJRU5ErkJggg==\')"></button><div id="__ghostlab_multiedit_container__" style="padding:10px; margin:0; background-color:#fff"></div></div>');
        b.on("focus mouseenter", "input, select, textarea", function(a) {
            var b = Ghostlab.jQuery(a.target)
              , c = b.attr("data-ghostlab-2cid");
            c && Ghostlab.broadcastEvent({
                event: "identify",
                identifyClientId: c
            })
        }),
        a = {
            $elt: b,
            $btnClose: b.find("#__ghostlab_multiedit_close__"),
            $container: b.find("#__ghostlab_multiedit_container__"),
            show: function(b, d) {
                c = document.activeElement,
                a.$elt.attr("data-ghostlab-selector", Ghostlab.DOMHelpers.buildSelector(b)),
                a.$container.empty();
                var e = 1 / 0
                  , f = 0
                  , g = "auto"
                  , h = b.offset()
                  , i = b[0].getBoundingClientRect()
                  , m = b.attr("name");
                if (m && b.is(":radio")) {
                    for (var n = j(b, m), o = n.length, p = 0; p < o; p++) {
                        var q = Ghostlab.jQuery(n[p])
                          , r = q.offset();
                        e = Math.min(e, r.left),
                        f = Math.max(f, r.top + q.outerHeight())
                    }
                    a.$container.removeAttr("data-ghostlab-selector"),
                    k(n, d)
                } else
                    e = h.left,
                    f = h.top + b.outerHeight(),
                    b.is(":checkbox") || (g = b.outerWidth() + "px"),
                    a.$container.attr("data-ghostlab-selector", Ghostlab.DOMHelpers.buildSelector(b)),
                    l(b, d);
                i.top > .5 * Ghostlab.$window.innerHeight() && (f = h.top - a.$elt.outerHeight()),
                a.$elt.css({
                    display: "block",
                    left: e,
                    top: f,
                    width: g,
                    opacity: 1
                }),
                Ghostlab.MultiEdit.isOpen = !0,
                Ghostlab.features.hasAddEventListener ? (document.addEventListener("click", a.hide, !0),
                document.addEventListener("keydown", a.hide, !0)) : (Ghostlab.$document.on("click", a.hide),
                Ghostlab.$document.on("keydown", a.hide)),
                a.$container.find("input:first-of-type, select:first-of-type, textarea:first-of-type").eq(0).focus()
            },
            hide: function(b) {
                if (b)
                    switch (b.type) {
                    case "click":
                        if (b.originalEvent && b.originalEvent.__isGhostlabSimulatedEvent__ || b.__isGhostlabSimulatedEvent__ || b.target !== a.$btnClose[0] && Ghostlab.jQuery(b.target).closest(a.$elt).length > 0)
                            return;
                        Ghostlab.jQuery(c).focus();
                        break;
                    case "keydown":
                        if (27 === b.keyCode)
                            Ghostlab.jQuery(c).focus();
                        else {
                            if (9 !== b.keyCode)
                                return;
                            var d = Ghostlab.jQuery(b.target);
                            if (0 === d.closest("#__ghostlab_multiedit__").length)
                                return;
                            d.is(":radio") && (d = d.closest("form"));
                            var e = a.$container.find("> * > :not(label)");
                            if ((!b.shiftKey || e[0] !== d[0]) && (b.shiftKey || e[e.length - 1] !== d[0]))
                                return;
                            Ghostlab.jQuery(c).focus()
                        }
                        break;
                    default:
                        return
                    }
                Ghostlab.features.hasAddEventListener ? (document.removeEventListener("click", a.hide, !0),
                document.removeEventListener("keydown", a.hide, !0)) : (Ghostlab.$document.off("click", a.hide),
                Ghostlab.$document.off("keydown", a.hide)),
                a.$elt.css({
                    display: "none",
                    opacity: 0
                }),
                Ghostlab.MultiEdit.isOpen = !1
            }
        },
        Ghostlab.jQuery("body").append(b)
    };
    !function(a) {
        var b = function(b) {
            if (3 === b.detail)
                a(b);
            else if (!b.detail) {
                var c = (new Date).getTime();
                e === b.clientX && f === b.clientY && c - g < 400 ? 3 === ++d && a(b) : d = 1,
                e = b.clientX,
                f = b.clientY,
                g = c
            }
        };
        Ghostlab.features.hasAddEventListener ? document.addEventListener("click", b, !0) : Ghostlab.$document.on("click", b)
    }(function(a) {
        Ghostlab.MultiEdit.open(a.target)
    }),
    Ghostlab.MultiEdit = {
        open: function(a) {
            var c = !!b;
            (b = h(a)) && (c || Ghostlab.broadcastEvent({
                event: "get-clients",
                formElementSelector: Ghostlab.DOMHelpers.buildSelector(Ghostlab.jQuery(b))
            }))
        },
        isOpen: !1
    },
    Ghostlab.Events.clients = {
        receive: function(c) {
            !b || !c.clients || c.clients.length <= 1 || (a || m(),
            a.show(Ghostlab.jQuery(b), c.clients),
            b = null)
        }
    },
    Ghostlab.Events["get-form-element-value"] = {
        receive: function(a) {
            var b = Ghostlab.DOMHelpers.fromSelector(a.selector);
            if (0 !== b.length) {
                var c = void 0
                  , d = void 0;
                if (b.is(":radio")) {
                    var e = j(b)
                      , f = e.filter(":checked");
                    if (f.length > 0) {
                        var g = f[0].hasAttribute("value");
                        g && (c = f.attr("value")),
                        g && "on" !== c || (c = void 0,
                        d = e.index(f))
                    }
                } else
                    c = b.is(":checkbox") ? b.prop("checked") : b.val();
                void 0 === c && void 0 === d || Ghostlab.broadcastEvent({
                    event: "get-form-element-value",
                    targetClientId: a.targetClientId,
                    value: c,
                    index: d
                })
            }
        }
    },
    Ghostlab.Events["set-form-element-value"] = {
        receive: function(b) {
            var c = a.$container.find("[data-ghostlab-2cid=" + b.sourceClientId + "]");
            if (0 !== c.length)
                if (c.is(":radio")) {
                    var d = j(c)
                      , e = void 0;
                    void 0 !== b.value ? e = d.filter("[value=" + b.value + "]") : void 0 !== b.index && (e = d.eq(b.index)),
                    e && e.length > 0 && (d.prop("checked", !1),
                    e.prop("checked", !0))
                } else
                    c.is(":checkbox") ? c.prop("checked", b.value) : c.val(b.value)
        }
    }
}(),

/**
 * RequestHelpers
 */
Ghostlab.RequestHelpers = {
    buildQueryStringUrl: function(a, b) {
        var c = [];
        if (b)
            for (var d in b)
                c.push(encodeURIComponent(d + "=" + b[d]));
        return c.length > 0 ? a + "?" + c.join("&") : a
    }
},
/**
 * sessionStorage
 */
function() {
    var a = !!window.sessionStorage && "function" == typeof sessionStorage.getItem && "function" == typeof sessionStorage.setItem;
    if (a)
        try {
            sessionStorage.setItem("____session_storage_test____", 123),
            sessionStorage.removeItem("____session_storage_test____")
        } catch (b) {
            a = !1
        }
    Ghostlab.SessionStorage = {
        getStringFor: function(a) {
            return "//" + JSON.stringify(a)
        },
        get: function(b) {
            var c = "";
            if (a)
                c = sessionStorage.getItem("__ghostlab__");
            else {
                var d = window.name.indexOf("//");
                if (d < 0)
                    return null;
                c = window.name.substr(d + 2)
            }
            var e = null;
            try {
                e = null === c ? {} : Ghostlab.jQuery.parseJSON(c)
            } catch (c) {
                return a ? sessionStorage.setItem("__ghostlab__", "") : window.name = window.name.substr(0, d),
                b ? void 0 : {}
            }
            if (b) {
                if (!e)
                    return;
                return e[b]
            }
            return e
        },
        set: function(b, c) {
            var d = Ghostlab.SessionStorage.get()
              , e = "";
            if (a || (null === d ? (d = {},
            e = window.name) : e = window.name.substr(0, window.name.indexOf("//"))),
            "object" == typeof b)
                for (var f in b)
                    d[f] = b[f];
            else
                d[b] = c;
            a ? sessionStorage.setItem("__ghostlab__", JSON.stringify(d)) : window.name = e + Ghostlab.SessionStorage.getStringFor(d)
        }
    }
}(),

/**
 * SpecialStrings
 */
Ghostlab.SpecialStrings = {
    quickFills: {},
    formFills: {},
    parseOptions: function() {
        Ghostlab.SpecialStrings.parseQuickFillOptions(),
        Ghostlab.SpecialStrings.parseFormFillOptions(),
        Ghostlab.SpecialStrings.setFormFillTriggerKey(),
        Ghostlab.state.quickFillData = Ghostlab.config.quickFillData
    },
    parseQuickFillOptions: function() {
        Ghostlab.SpecialStrings.parseFillOptions(Ghostlab.config.quickFillShortcuts, Ghostlab.config.quickFillJavascriptCodes, "quickFills")
    },
    parseFormFillOptions: function() {
        Ghostlab.SpecialStrings.parseFillOptions(Ghostlab.config.formFillSelectors, Ghostlab.config.formFillJavascriptCodes, "formFills")
    },
    parseFillOptions: function(triggers, codes, dest) {
        if (triggers || codes) {
            Ghostlab.SpecialStrings[dest] = {};
            for (var len = triggers.length, i = 0; i < len; i++) {
                var fnx = void 0;
                try {
                    fnx = eval("(" + codes[i] + ")")
                } catch (a) {
                    var err = dest + " shortcut " + triggers[i] + " disabled due to JavaScript error";
                    fnx = function() {
                        return err
                    }
                }
                "function" == typeof fnx && (Ghostlab.SpecialStrings[dest][triggers[i]] = fnx)
            }
        }
    },
    setFormFillTriggerKey: function() {
        Mousetrap.reset(),
        Ghostlab.config.formFillTriggerKey && Mousetrap.bind(Ghostlab.config.formFillTriggerKey.toLowerCase(), function(a) {
            Ghostlab.SpecialStrings.fillForm(Ghostlab.jQuery(a.target || a.srcElement))
        }),
        Ghostlab.config.multiEditTriggerKey && Mousetrap.bind(Ghostlab.config.multiEditTriggerKey.toLowerCase(), function(a) {
            a.__isGhostlabSimulatedEvent__ || Ghostlab.MultiEdit.open(a.target || a.srcElement)
        })
    },
    replaceVal: function(a, b) {
        var c = void 0 === b ? a.val() : b
          , d = void 0;
        d = /^\$\d+$/.test(c) ? function() {
            return Ghostlab.state.quickFillData && Ghostlab.state.quickFillData[parseInt(c.substr(1), 10)] || "(No QuickFill data defined)"
        }
        : Ghostlab.SpecialStrings.quickFills[c];
        var e = void 0;
        if (d ? (Ghostlab.state.isReplacingValue = !0,
        e = String(d(a))) : void 0 !== b && (Ghostlab.state.isReplacingValue = !0,
        e = b),
        void 0 !== e) {
            var f = a.attr("contenteditable");
            "" === f || f && "true" === f.toLowerCase() ? a.html(e) : (a.val(e),
            Ghostlab.UIHelpers.simulateInput(a))
        }
    },
    fillForm: function(a) {
        var b = !1
          , c = {}
          , d = {}
          , e = a.closest("form, body");
        for (var f in Ghostlab.SpecialStrings.formFills) {
            var g = Ghostlab.SpecialStrings.formFills[f];
            e.find(f).each(function() {
                var e = Ghostlab.jQuery(this);
                Ghostlab.state.isReplacingValue = !0,
                e.is(":checkbox") ? (b = !0,
                e.prop("checked", g(a))) : e.is(":radio") ? (c[e.attr("name")] = !0,
                e.prop("checked", g(a))) : (e.is("select") && (d[Ghostlab.DOMHelpers.buildSelector(e)] = !0),
                e.val(g(a)),
                Ghostlab.UIHelpers.simulateInput(a))
            })
        }
        b || e.find("input[type=checkbox]").each(function() {
            Ghostlab.jQuery(this).prop("checked", Math.random() > .5)
        });
        var h = {};
        e.find("input[type=radio]").each(function() {
            !0 !== c[i] && (h[Ghostlab.jQuery(this).attr("name")] = !0)
        });
        for (var i in h) {
            var j = e.find("input[type=radio][name=" + Ghostlab.DOMHelpers.escapeSelector(i) + "]");
            Ghostlab.jQuery(j[j.length * Math.random() | 0]).prop("checked", !0)
        }
        e.find("select").each(function() {
            var a = Ghostlab.jQuery(this);
            if (!0 !== d[Ghostlab.DOMHelpers.buildSelector(a)]) {
                var b = a.find("option");
                a.val(Ghostlab.jQuery(b[b.length * Math.random() | 0]).val())
            }
        })
    },
    setQuickFillData: function() {
        if (Ghostlab.config.quickFillData && Ghostlab.jQuery.isArray(Ghostlab.config.quickFillData)) {
            var a = Ghostlab.config.quickFillData.length;
            a > 0 && Ghostlab.jQuery.isArray(Ghostlab.config.quickFillData[0]) ? Ghostlab.state.quickFillData = Ghostlab.config.quickFillData[Ghostlab.state.myIndex % a] : Ghostlab.state.quickFillData = Ghostlab.config.quickFillData
        } else
            Ghostlab.state.quickFillData = []
    }
},
/**
 * TransitionStart
 */
function() {
    var a = {
        "-moz-outline-radius": !0,
        "-moz-outline-radius-bottomleft": !0,
        "-moz-outline-radius-bottomright": !0,
        "-moz-outline-radius-topleft": !0,
        "-moz-outline-radius-topright": !0,
        "-webkit-text-fill-color": !0,
        "-webkit-text-stroke": !0,
        "-webkit-text-stroke-color": !0,
        "-webkit-touch-callout": !0,
        "backdrop-filter": !0,
        "-webkit-backdrop-filter": !0,
        "background-color": !0,
        "background-position": !0,
        "background-size": !0,
        "-moz-background-size": !0,
        "-webkit-background-size": !0,
        "-o-background-size": !0,
        "border-bottom-color": !0,
        "border-bottom-left-radius": !0,
        "-moz-border-bottom-left-radius": !0,
        "-webkit-border-bottom-left-radius": !0,
        "border-bottom-right-radius": !0,
        "-moz-border-bottom-right-radius": !0,
        "-webkit-border-bottom-right-radius": !0,
        "border-bottom-width": !0,
        "border-left-color": !0,
        "border-left-width": !0,
        "border-right-color": !0,
        "border-right-width": !0,
        "border-top-color": !0,
        "border-top-left-radius": !0,
        "-moz-border-top-left-radius": !0,
        "-webkit-border-top-left-radius": !0,
        "border-top-right-radius": !0,
        "-moz-border-top-right-radius": !0,
        "-webkit-border-top-right-radius": !0,
        "border-top-width": !0,
        bottom: !0,
        "box-shadow": !0,
        "-moz-box-shadow": !0,
        "-webkit-box-shadow": !0,
        "caret-color": !0,
        clip: !0,
        "clip-path": !0,
        "-webkit-clip-path": !0,
        color: !0,
        "column-count": !0,
        "-moz-column-count": !0,
        "-webkit-column-count": !0,
        "column-gap": !0,
        "-moz-column-gap": !0,
        "-webkit-column-gap": !0,
        "column-rule-color": !0,
        "-moz-column-rule-color": !0,
        "-webkit-column-rule-color": !0,
        "column-rule-width": !0,
        "-moz-column-rule-width": !0,
        "-webkit-column-rule-width": !0,
        "column-width": !0,
        "-moz-column-width": !0,
        "-webkit-column-width": !0,
        filter: !0,
        "-webkit-filter": !0,
        "-ms-filter": !0,
        "flex-basis": !0,
        "-webkit-flex-basis": !0,
        "flex-grow": !0,
        "-webkit-flex-grow": !0,
        "flex-shrink": !0,
        "-webkit-flex-shrink": !0,
        "font-size": !0,
        "font-size-adjust": !0,
        "font-stretch": !0,
        "font-weight": !0,
        "grid-column-gap": !0,
        "-webkit-grid-column-gap": !0,
        "grid-row-gap": !0,
        "-webkit-grid-row-gap": !0,
        "-ms-grid-row-gap": !0,
        height: !0,
        left: !0,
        "letter-spacing": !0,
        "line-height": !0,
        "margin-bottom": !0,
        "margin-left": !0,
        "margin-right": !0,
        "margin-top": !0,
        "mask-position": !0,
        "-webkit-mask-position": !0,
        "mask-size": !0,
        "max-height": !0,
        "max-width": !0,
        "min-height": !0,
        "min-width": !0,
        "motion-offset": !0,
        "motion-rotation": !0,
        "object-position": !0,
        "-o-object-position": !0,
        "offset-distance": !0,
        "offset-rotation": !0,
        "offset-rotate": !0,
        opacity: !0,
        order: !0,
        "-webkit-order": !0,
        "-ms-order": !0,
        "outline-color": !0,
        "outline-offset": !0,
        "outline-width": !0,
        "padding-bottom": !0,
        "padding-left": !0,
        "padding-right": !0,
        "padding-top": !0,
        "perspective-origin": !0,
        "-moz-perspective-origin": !0,
        "-webkit-perspective-origin": !0,
        right: !0,
        "scroll-snap-coordinate": !0,
        "scroll-snap-destination": !0,
        "shape-image-threshold": !0,
        "-webkit-shape-image-threshold": !0,
        "shape-margin": !0,
        "-webkit-shape-margin": !0,
        "shape-outside": !0,
        "-webkit-shape-outside": !0,
        "tab-size": !0,
        "-moz-tab-size": !0,
        "text-decoration-color": !0,
        "-moz-text-decoration-color": !0,
        "-webkit-text-decoration-color": !0,
        "text-emphasis-color": !0,
        "-webkit-text-emphasis-color": !0,
        "text-indent": !0,
        "text-shadow": !0,
        top: !0,
        transform: !0,
        "-moz-transform": !0,
        "-webkit-transform": !0,
        "-ms-transform": !0,
        "-o-transform": !0,
        "transform-origin": !0,
        "-moz-transform-origin": !0,
        "-webkit-transform-origin": !0,
        "-ms-transform-origin": !0,
        "-o-transform-origin": !0,
        "vertical-align": !0,
        visibility: !0,
        width: !0,
        "word-spacing": !0,
        "z-index": !0
    }
      , b = {
        margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"],
        padding: ["padding-top", "padding-right", "padding-bottom", "padding-left"],
        outline: ["outline-width", "outline-offset", "outline-color"],
        border: ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color"],
        "border-width": ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"],
        "border-color": ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"],
        "border-top": ["border-top-width", "border-top-color"],
        "border-right": ["border-right-width", "border-right-color"],
        "border-bottom": ["border-bottom-width", "border-bottom-color"],
        "border-left": ["border-left-width", "border-left-color"],
        font: ["font-weight", "font-size", "line-height"],
        background: ["background-color", "background-position", "background-size", "-moz-background-size", "-webkit-background-size"],
        "border-radius": ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"],
        "-moz-border-radius:": ["-moz-border-top-left-radius", "-moz-border-top-right-radius", "-moz-border-bottom-right-radius", "-moz-border-bottom-left-radius"],
        "-webkit-border-radius": ["-webkit-border-top-left-radius", "-webkit-border-top-right-radius", "-webkit-border-bottom-right-radius", "-webkit-border-bottom-left-radius"],
        "column-rule": ["column-rule-width", "column-rule-style", "column-rule-color"],
        "-moz-column-rule": ["-moz-column-rule-width", "-moz-column-rule-color"],
        "-webkit-column-rule": ["-webkit-column-rule-width", "-webkit-column-rule-color"],
        columns: ["column-width", "column-count"],
        "-moz-columns": ["-moz-column-width", "-moz-column-count"],
        "-webkit-columns": ["-webkit-column-width", "-webkit-column-count"]
    }
      , c = void 0
      , d = {}
      , e = []
      , f = function(a) {
        return /ms\s*$/.test(a) ? parseFloat(a) : 1e3 * parseFloat(a)
    }
      , g = function(a, b, c) {
        for (var d = e.length, f = 0; f < d; f++)
            e[f](a, b, c)
    }
      , h = function(c, d, e) {
        if ("all" === d)
            for (var f in a)
                f in e && (c[f] = e[f]);
        else {
            var g = b[d];
            if (g)
                for (var h = g.length, i = 0; i < h; i++) {
                    var f = g[i];
                    c[f] = e[f]
                }
            else
                a[d] && d in e && (c[d] = e[d])
        }
    }
      , i = function(a, b, c, d) {
        return function() {
            c = getComputedStyle(a, b);
            var e = void 0;
            for (var f in d) {
                var h = d[f];
                h !== c[f] && (e || (e = {}),
                e[f] = h)
            }
            e && g(a, b, e)
        }
    }
      , j = function(a, b) {
        if (b in a)
            return a[b];
        var c = b.charAt(0).toUpperCase() + b.substr(1)
          , d = "webkit" + c;
        if (d in a)
            return a[d];
        var e = "moz" + c;
        if (e in a)
            return a[e];
        var f = "o" + c;
        return f in a ? a[f] : void 0
    }
      , k = function(a) {
        a instanceof Element && setTimeout(function() {
            for (var b = [void 0, "before", "after"], c = b.length, d = 0; d < c; d++) {
                var e = b[d]
                  , g = getComputedStyle(a, e)
                  , k = j(g, "transitionProperty")
                  , l = j(g, "transitionDelay");
                if (k && l && "0s" !== j(g, "transitionDuration")) {
                    for (var m = k.split(/\s*,\s/), n = l.split(/\s*,\s/), o = m.length, p = {}, q = 0; q < o; q++) {
                        var r = f(n[q]);
                        p[r] || (p[r] = {}),
                        h(p[r], m[q], g)
                    }
                    for (var s in p)
                        setTimeout(i(a, e, g, p[s]), parseFloat(s) + 100)
                }
            }
        }, 0)
    }
      , l = function(a) {
        if (a)
            for (var b = a.childNodes, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                k(e),
                l(e)
            }
    }
      , m = function(a) {
        var b = !1
          , c = Ghostlab.jQuery('<div style="color:#fff; transition:color 10ms linear;"></div>');
        Ghostlab.jQuery(document.body).append(c),
        c.on("transitionstart", function() {
            b = !0
        }),
        setTimeout(function() {
            c.off("transitionstart"),
            c.remove(),
            a(b)
        }, 100),
        setTimeout(function() {
            c.css("color", "#000")
        }, 0)
    }
      , n = function(a, b) {
        d[a] = b,
        document.addEventListener(a, b, !0)
    }
      , o = function() {
        "function" == typeof document.addEventListener && m(function(a) {
            if (a)
                n("transitionstart", function(a) {
                    for (var b = a.target, c = a.pseudoElement, d = getComputedStyle(b), e = d.transitionProperty.split(/\s*,\s/), f = e.length, i = {}, j = 0; j < f; j++)
                        h(i, e[j], d);
                    g(a.target, c && c.replace(/^:+/, "").toLowerCase() || void 0, i)
                });
            else {
                Ghostlab.addMutationListener(c = function(a) {
                    for (var b = a.length, c = 0; c < b; c++) {
                        var d = a[c];
                        switch (d.type) {
                        case "attributes":
                            k(d.target);
                            break;
                        case "childList":
                            l(d.target.parentElement)
                        }
                    }
                }
                );
                var b = function(a) {
                    k(a.target)
                }
                  , d = Ghostlab.Inspector ? Ghostlab.Inspector.CSS.getUsedPseudoClasses() : void 0;
                d && !d[":hover"] || (n("mouseenter", b),
                n("mouseleave", b)),
                d && !d[":focus"] || (n("focus", b),
                n("blur", b)),
                d && !d[":active"] || (n("activate", b),
                n("deactivate", b),
                n("DOMActivate", b)),
                d && !d[":checked"] || n("changed", b),
                (!d || d[":in-range"] || d[":out-of-range"] || d[":invalid"]) && n("input", b)
            }
        })
    }
      , p = function() {
        c && (Ghostlab.removeMutationListener(c),
        c = void 0);
        for (var a in d)
            document.removeEventListener(a, d[a], !0);
        d = {}
    };
    Ghostlab.EventHelpers.TransitionStart = {
        listenForTransitionStart: function(a) {
            0 === e.length && o(),
            e.push(a)
        },
        removeCallback: function(a) {
            var b = Ghostlab.jQuery.inArray(a, e);
            b < 0 || (e.splice(b, 1),
            0 === e.length && p())
        }
    }
}(),
/**
 * UIHelpers
 */
function() {
    var a = !1
      , b = !0;
    Ghostlab.UIHelpers = {
        getWindowWidth: function() {
            return window.innerWidth || Ghostlab.$window.width()
        },
        getWindowHeight: function() {
            return window.innerHeight || Ghostlab.$window.height()
        },
        getScrollPos: function(a) {
            return a || (a = Ghostlab.$window),
            {
                x: a.scrollLeft(),
                y: a.scrollTop()
            }
        },
        scrollIntoView: function(a) {
            Ghostlab.state.isScrolling = !0,
            a.scrollintoview(),
            window.setTimeout(function() {
                Ghostlab.state.isScrolling = !1
            }, 500)
        },
        elementFromPoint: function(c, d) {
            if (!document.elementFromPoint)
                return null;
            if (!a) {
                var e = 0;
                (e = Ghostlab.$document.scrollTop()) > 0 ? b = null == document.elementFromPoint(0, e + Ghostlab.UIHelpers.getWindowHeight() - 1) : (e = Ghostlab.$document.scrollLeft()) > 0 && (b = null == document.elementFromPoint(e + Ghostlab.UIHelpers.getWindowWidth() - 1, 0)),
                a = e > 0
            }
            return b || (c += Ghostlab.$document.scrollLeft(),
            d += Ghostlab.$document.scrollTop()),
            Ghostlab.jQuery(document.elementFromPoint(c, d))
        },
        getPixelSize: function(a, b, c, d) {
            var e = b[c] || "0"
              , f = parseFloat(e) || 0;
            if (0 === f)
                return {
                    size: 0,
                    fontSize: d
                };
            var g = e.replace(/^[\d.]*/, "")
              , h = function() {
                return void 0 !== d && null !== d ? d : "fontSize" !== c ? Ghostlab.UIHelpers.getPixelSize(a, b, "fontSize").size : "%" !== g && "em" !== g || !a.parentElement ? 16 : Ghostlab.UIHelpers.getPixelSize(a.parentElement, a.parentElement.currentStyle, "fontSize").size
            };
            switch (g) {
            case "em":
                var i = h()
                  , j = f * i;
                return {
                    size: j,
                    fontSize: "fontSize" === c ? j : i
                };
            case "in":
                var j = 96 * f;
                return {
                    size: j,
                    fontSize: "fontSize" === c ? j : d
                };
            case "pt":
                var j = 96 * f / 72;
                return {
                    size: j,
                    fontSize: "fontSize" === c ? j : d
                };
            case "%":
                var i = d
                  , k = 0;
                k = "fontSize" === c ? i = h() : /width/i.test(c) ? a.clientWidth : a.clientHeight;
                var j = f / 100 * k;
                return {
                    size: j,
                    fontSize: "fontSize" === c ? j : i
                };
            default:
                return {
                    size: f,
                    fontSize: "fontSize" === c ? f : d
                }
            }
        },
        getElementSizes: function(a) {
            var b = void 0;
            if (0 === a.length || a.is("base,basefont,head,link,meta,script,style,title") || "#document" === a[0].tagName)
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    borderLeft: 0,
                    borderTop: 0,
                    borderRight: 0,
                    borderBottom: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0
                };
            if (window.getComputedStyle) {
                var c = window.getComputedStyle(a[0]);
                b = function(a) {
                    var b = c && c[a] || void 0;
                    return void 0 === b || null === b ? 0 : parseInt(b, 10)
                }
            } else if (a[0].currentStyle)
                var d = a[0]
                  , c = d.currentStyle
                  , e = void 0
                  , b = function(a) {
                    var b = Ghostlab.UIHelpers.getPixelSize(d, c, a, e);
                    return void 0 === e && (e = b.fontSize),
                    b.size
                };
            else
                console.error("getSize cannot be defined"),
                b = function() {
                    return 0
                }
                ;
            var f = a.offset() || {
                left: 0,
                top: 0
            };
            return {
                x: f.left || 0,
                y: f.top || 0,
                width: a.width(),
                height: a.height(),
                marginLeft: b("marginLeft"),
                marginTop: b("marginTop"),
                marginRight: b("marginRight"),
                marginBottom: b("marginBottom"),
                borderLeft: b("borderLeftWidth"),
                borderTop: b("borderTopWidth"),
                borderRight: b("borderRightWidth"),
                borderBottom: b("borderBottomWidth"),
                paddingLeft: b("paddingLeft"),
                paddingTop: b("paddingTop"),
                paddingRight: b("paddingRight"),
                paddingBottom: b("paddingBottom")
            }
        },
        getTextNodeSize: function(a) {
            if ("function" != typeof document.createRange)
                return null;
            var b = document.createRange();
            b.selectNodeContents(a[0]);
            for (var c = b.getClientRects(), d = 1 / 0, e = -1 / 0, f = 1 / 0, g = -1 / 0, h = c.length, i = 0; i < h; i++) {
                var j = c[i];
                d = Math.min(d, j.left),
                e = Math.max(e, j.right),
                f = Math.min(f, j.top),
                g = Math.max(g, j.bottom)
            }
            return {
                x: d,
                y: f,
                w: e - d,
                h: g - f
            }
        },
        isElementFixed: function(a) {
            for (var b = a; !b.is("html"); b = b.parent())
                if ("fixed" === b.css("position"))
                    return !0;
            return !1
        },
        findElement: function(a, b, c, d) {
            return "y" !== d && (d || "top" !== c && "vcenter" !== c && "bottom" !== c && 0 !== c && 1 !== c && 2 !== c) ? "x" !== d && (d || "left" !== c && "hcenter" !== c && "right" !== c && 3 !== c && 4 !== c && 5 !== c) ? void 0 : Ghostlab.UIHelpers.findElementVertical(a, b, c) : Ghostlab.UIHelpers.findElementHorizontal(a, b, c)
        },
        findElementHorizontal: function(a, b, c) {
            var d = a[0] === document
              , e = d ? {
                left: 0,
                top: 0
            } : a.offset()
              , f = d ? Ghostlab.UIHelpers.getWindowWidth() : a.width()
              , g = d ? Ghostlab.UIHelpers.getWindowHeight() : a.height()
              , h = 0
              , i = 0
              , j = 0;
            switch (c) {
            case "top":
            case "left":
            case 0:
            case 3:
                h = e.top + 5,
                i = e.top + b.y;
                break;
            case "vcenter":
            case "hcenter":
            case 1:
            case 4:
                h = e.top + .5 * (g - Ghostlab.options.findElementScanRange),
                i = e.top + b.y + .5 * g,
                j = .5;
                break;
            case "bottom":
            case "right":
            case 2:
            case 5:
                h = e.top + g - Ghostlab.options.findElementScanRange - 5,
                i = e.top + b.y + g,
                j = 1;
                break;
            default:
                return null
            }
            d || (h -= Ghostlab.$window.scrollTop());
            for (var k = null, l = null, m = null, n = null, o = [], p = 1e4, q = d ? 0 : Ghostlab.$window.scrollLeft(), r = h; r < h + Ghostlab.options.findElementScanRange; r += Ghostlab.options.findElementMajorScanStride) {
                for (var s = e.left + f - q, t = e.left - q; t < s; t += Ghostlab.options.findElementMinorScanStride) {
                    var u = Ghostlab.UIHelpers.elementFromPoint(t, r);
                    if (!(null == u || 0 == u.length || Ghostlab.jQuery.inArray(u[0], o) >= 0 || Ghostlab.UIHelpers.isElementFixed(u))) {
                        o.push(u[0]);
                        var v = Math.abs(u.offset().top - i)
                          , w = u.height();
                        if (v <= 20) {
                            w < 300 ? k = u : l = u;
                            break
                        }
                        v < p && (w < 300 ? m = u : n = u,
                        p = v)
                    }
                }
                if (null !== k)
                    break
            }
            if (null === k && (k = m),
            null === k && (k = l),
            null === k && (k = n),
            null === k)
                return null;
            var x = k[0] === a[0]
              , y = x ? void 0 : k.offset();
            return {
                element: k,
                offset: {
                    left: x ? 0 : y.left - e.left + j * (k.width() - f),
                    top: x ? b.y : y.top + (d ? 0 : b.y) + j * k.height() - i
                }
            }
        },
        findElementVertical: function(a, b, c) {
            var d = a[0] === document
              , e = d ? {
                left: 0,
                top: 0
            } : a.offset()
              , f = d ? Ghostlab.UIHelpers.getWindowWidth() : a.width()
              , g = d ? Ghostlab.UIHelpers.getWindowHeight() : a.height()
              , h = 0
              , i = 0
              , j = 0;
            switch (c) {
            case "left":
            case "top":
            case 3:
            case 0:
                h = e.left + 5,
                i = e.left + b.x;
                break;
            case "hcenter":
            case "vcenter":
            case 4:
            case 1:
                h = e.left + .5 * (f - Ghostlab.options.findElementScanRange),
                i = e.left + b.x + .5 * f,
                j = .5;
                break;
            case "right":
            case "bottom":
            case 5:
            case 2:
                h = e.left + f - Ghostlab.options.findElementScanRange - 5,
                i = e.left + b.x + f,
                j = 1;
                break;
            default:
                return null
            }
            d || (h -= Ghostlab.$window.scrollLeft());
            for (var k = null, l = null, m = null, n = null, o = [], p = 1e4, q = d ? 0 : Ghostlab.$window.scrollTop(), r = h; r < h + Ghostlab.options.findElementScanRange; r += Ghostlab.options.findElementMajorScanStride) {
                for (var s = e.top + g - q, t = e.top - q; t < s; t += Ghostlab.options.findElementMinorScanStride) {
                    var u = Ghostlab.UIHelpers.elementFromPoint(r, t);
                    if (!(null == u || 0 == u.length || Ghostlab.jQuery.inArray(u[0], o) >= 0)) {
                        o.push(u[0]);
                        var v = Math.abs(u.offset().left - i)
                          , w = u.height();
                        if (v <= 20) {
                            w < 300 ? k = u : l = u;
                            break
                        }
                        v < p && (w < 300 ? m = u : n = u,
                        p = v)
                    }
                }
                if (null != k)
                    break
            }
            if (null === k && (k = m),
            null === k && (k = l),
            null === k && (k = n),
            null === k)
                return null;
            var x = k[0] === a[0]
              , y = x ? void 0 : k.offset();
            return {
                element: k,
                offset: {
                    left: x ? b.x : y.left + (d ? 0 : b.x) + j * k.width() - i,
                    top: x ? 0 : y.top - e.top + j * (k.height() - g)
                }
            }
        },
        resizeWindow: function(a, b) {
            var c = 0
              , d = 0;
            window.outerWidth && (c = window.outerWidth - Ghostlab.UIHelpers.getWindowWidth(),
            d = window.outerHeight - Ghostlab.UIHelpers.getWindowHeight()),
            window.resizeTo(a + c, b + d)
        },
        emitResize: function(a) {
            Ghostlab.broadcastEvent({
                event: "resize",
                x: window.screenX || 0,
                y: window.screenY || 0,
                width: Ghostlab.UIHelpers.getWindowWidth(),
                height: Ghostlab.UIHelpers.getWindowHeight(),
                sendDeviceListChange: a
            })
        },
        throttle: function(a, b, c, d) {
            var e = null
              , f = null
              , g = null;
            return void 0 === b && (b = 500),
            void 0 === c && (c = !0),
            c ? function() {
                null !== e && clearTimeout(e);
                var c = this
                  , d = Array.prototype.slice.call(arguments);
                e = setTimeout(function() {
                    e = null,
                    a.apply(c, d)
                }, b)
            }
            : function() {
                var c = (new Date).getTime();
                if (null === f || c - f >= b) {
                    var e = Array.prototype.slice.call(arguments);
                    a.apply(this, e),
                    f = c
                }
                if (d) {
                    window.clearTimeout(g);
                    var e = Array.prototype.slice.call(arguments)
                      , h = this;
                    g = window.setTimeout(function() {
                        a.apply(h, e)
                    }, b)
                }
            }
        },
        isSimulatedEvent: function(a) {
            return null !== a && (void 0 !== a.originalEvent ? !!a.originalEvent.__isGhostlabSimulatedEvent__ || !1 === a.originalEvent.isTrusted : !!a.__isGhostlabSimulatedEvent__ || !1 === a.isTrusted)
        },
        getScrollXY: function(a) {
            var b = a.documentElement
              , c = a.body;
            return {
                x: (b && b.scrollLeft || c && c.scrollLeft || 0) - (b && b.clientLeft || c && c.clientLeft || 0),
                y: (b && b.scrollTop || c && c.scrollTop || 0) - (b && b.clientTop || c && c.clientTop || 0)
            }
        },
        createMouseEvent: function(a, b, c) {
            var d = null
              , e = b && b.relatedTarget && b.relatedTarget.ownerDocument || document
              , f = b && b.x
              , g = b && b.y
              , h = this.getScrollXY(e);
            if (b = Ghostlab.jQuery.extend({
                bubbles: !0,
                cancelable: "mousemove" !== a,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: void 0 === f ? 1 : f - h.x,
                clientY: void 0 === g ? 1 : g - h.y,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                button: 0,
                relatedTarget: void 0
            }, b),
            document.createEvent ? (d = document.createEvent("MouseEvents"),
            d.initMouseEvent(a, b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget || document.body && document.body.parentNode),
            0 === d.pageX && 0 === d.pageY && Object.defineProperty && (Object.defineProperty(d, "pageX", {
                get: function() {
                    return f
                }
            }),
            Object.defineProperty(d, "pageY", {
                get: function() {
                    return g
                }
            }))) : document.createEventObject && (d = document.createEventObject(),
            Ghostlab.jQuery.extend(d, b),
            d.button = {
                0: 1,
                1: 4,
                2: 2
            }[d.button] || d.button),
            c)
                for (var i in c)
                    d[i] = c[i];
            return d
        },
        createWheelEvent: function(a, b) {
            var c = null;
            b && b.relatedTarget && b.relatedTarget.ownerDocument || document;
            if (b = Ghostlab.jQuery.extend({
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: 1,
                clientY: 1,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                button: 0,
                relatedTarget: void 0,
                modifiers: "",
                deltaX: 0,
                deltaY: 0,
                deltaZ: 0,
                deltaMode: 0
            }, b),
            "undefined" != typeof WheelEvent)
                try {
                    c = new WheelEvent("wheel",b)
                } catch (a) {}
            if (null === c && document.createEvent) {
                try {
                    c = document.createEvent("WheelEvent")
                } catch (a) {
                    c = document.createEvent("MouseEvents")
                }
                "function" == typeof c.initWheelEvent ? c.initWheelEvent(a, b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.button, b.relatedTarget || document.body && document.body.parentNode, b.modifiers, b.deltaX, b.deltaY, b.deltaZ, b.deltaMode) : (c.initMouseEvent(a, b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget || document.body && document.body.parentNode),
                Object.defineProperty && (Object.defineProperty(c, "deltaX", {
                    get: function() {
                        return b.deltaX
                    }
                }),
                Object.defineProperty(c, "deltaY", {
                    get: function() {
                        return b.deltaY
                    }
                }),
                Object.defineProperty(c, "deltaZ", {
                    get: function() {
                        return b.deltaZ
                    }
                }),
                Object.defineProperty(c, "deltaMode", {
                    get: function() {
                        return b.deltaMode
                    }
                })))
            }
            return c
        },
        createPointerEvent: function(a, b) {
            var c = null;
            if ("function" == typeof window.PointerEvent) {
                var d = b && b.relatedTarget && b.relatedTarget.ownerDocument || document
                  , e = b && b.x
                  , f = b && b.y
                  , g = this.getScrollXY(d);
                c = new PointerEvent(a,{
                    view: window,
                    detail: 0,
                    screenX: 0,
                    screenY: 0,
                    clientX: void 0 === e ? 1 : e - g.x,
                    clientY: void 0 === f ? 1 : f - g.y,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    button: 0,
                    relatedTarget: void 0
                })
            }
            return null === c && (c = Ghostlab.UIHelpers.createMouseEvent(a, b)),
            c
        },
        createTouchEvent: function(a, b) {
            var c = null
              , d = b.relatedTarget && b.relatedTarget.ownerDocument || document
              , e = b.x || b.touches[0] && b.touches[0].pageX
              , f = b.y || b.touches[0] && b.touches[0].pageY
              , g = this.getScrollXY(d);
            if (b = Ghostlab.jQuery.extend({
                bubbles: !0,
                cancelable: "touchcancel" !== a,
                view: window,
                detail: 1,
                screenX: 0,
                screenY: 0,
                clientX: void 0 === e ? 1 : e - g.x,
                clientY: void 0 === f ? 1 : f - g.y,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                touches: b.touches,
                targetTouches: b.targetTouches,
                changedTouches: b.changedTouches,
                scale: 1,
                rotation: 0,
                relatedTarget: void 0
            }, b),
            document.createEvent)
                if (Ghostlab.ua.android && Ghostlab.ua.android < 4)
                    c = document.createEvent("MouseEvents"),
                    c.initMouseEvent(a, b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, 0, b.relatedTarget || document.body && document.body.parentNode),
                    c.touches = b.touches,
                    c.targetTouches = b.targetTouches,
                    c.customEvent.changedTouches = b.changedTouches;
                else
                    try {
                        c = document.createEvent("TouchEvent"),
                        c.initTouchEvent(a, b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.touches, b.targetTouches, b.changedTouches, b.scale, b.rotation),
                        c.type !== a && c.initTouchEvent(b.touches, b.targetTouches, b.changedTouches, a, b.view, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey),
                        c.touches || (Object.defineProperty(c, "touches", {
                            get: function() {
                                return b.touches
                            }
                        }),
                        Object.defineProperty(c, "targetTouches", {
                            get: function() {
                                return b.targetTouches
                            }
                        }),
                        Object.defineProperty(c, "changedTouches", {
                            get: function() {
                                return b.changedTouches
                            }
                        }))
                    } catch (a) {
                        c = null
                    }
            return null === c && (c = Ghostlab.UIHelpers.createMouseEvent(Ghostlab.Converters.touchToMouseEvent(a), b)),
            c
        },
        createKeyEvent: function(a, b) {
            var c = null;
            if (b = Ghostlab.jQuery.extend({
                bubbles: !0,
                cancelable: !0,
                view: window,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                keyCode: 0,
                charCode: void 0
            }, b),
            document.createEvent)
                try {
                    c = document.createEvent("KeyEvents"),
                    c.initKeyEvent(a, b.bubbles, b.cancelable, b.view, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.keyCode, b.charCode)
                } catch (d) {
                    c = document.createEvent("Events"),
                    c.initEvent(a, b.bubbles, b.cancelable),
                    Ghostlab.jQuery.extend(c, {
                        view: b.view,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey,
                        metaKey: b.metaKey,
                        keyCode: b.keyCode,
                        charCode: b.charCode
                    })
                }
            else
                document.createEventObject && (c = document.createEventObject(),
                Ghostlab.jQuery.extend(c, b));
            return (Ghostlab.ua.msie || Ghostlab.ua.opera) && (c.keyCode = b.charCode > 0 ? b.charCode : b.keyCode,
            c.charCode = void 0),
            c
        },
        createHTMLEvent: function(a) {
            var b = null;
            return document.createEvent ? (b = document.createEvent("HTMLEvents"),
            b.initEvent(a, !0, !0)) : document.createEventObject && (b = document.createEventObject(),
            Ghostlab.jQuery.extend(b, {
                bubbles: !0,
                cancelable: !1,
                view: window,
                detail: 0,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                relatedTarget: void 0,
                data: ""
            })),
            b
        },
        dispatchEvent: function(a, b, c) {
            if (a && c) {
                c.__isGhostlabSimulatedEvent__ = !0,
                c.simulated = !0;
                try {
                    void 0 !== a.dispatchEvent ? a.dispatchEvent(c) : void 0 !== a.fireEvent && a.fireEvent("on" + b, c)
                } catch (a) {}
            }
        },
        simulateMouseEvent: function(a, b, c, d, e) {
            if (Ghostlab.ua.msie8 && b.is("a")) {
                if (b.attr("href"))
                    return void ("click" === a && (document.location.href = b.attr("href")))
            }
            var f = Ghostlab.Converters.mouseToTouchEvent(a);
            if (f && Ghostlab.features.hasOnlyTouch) {
                var g = [{
                    identifier: 0,
                    x: c || 0,
                    y: d || 0,
                    target: b
                }]
                  , h = "touchend" === f ? [] : g;
                return Ghostlab.UIHelpers.simulateTouchEvent(f, b, h, h, g)
            }
            var i = void 0;
            return void 0 !== c && void 0 !== d && (i = Ghostlab.Converters.toAbsolute(b, c, d)),
            Ghostlab.UIHelpers.dispatchEvent(b[0], a, Ghostlab.UIHelpers.createMouseEvent(a, i, e)),
            i
        },
        simulateClick: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("click", a, b, c)
        },
        simulateMouseDown: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mousedown", a, b, c)
        },
        simulateMouseUp: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mouseup", a, b, c)
        },
        simulateMouseMove: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mousemove", a, b, c)
        },
        simulateMouseOver: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mouseover", a, b, c)
        },
        simulateMouseOut: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mouseout", a, b, c)
        },
        simulateMouseEnter: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mouseenter", a, b, c)
        },
        simulateMouseLeave: function(a, b, c) {
            Ghostlab.UIHelpers.simulateMouseEvent("mouseleave", a, b, c)
        },
        simulateWheel: function(a, b, c, d, e, f, g) {
            var h = void 0;
            void 0 !== b && void 0 !== c && (h = Ghostlab.Converters.toAbsolute(a, b, c)),
            Ghostlab.UIHelpers.dispatchEvent(a[0], "wheel", Ghostlab.UIHelpers.createWheelEvent("wheel", {
                clientX: h && h.x,
                clientY: h && h.y,
                deltaX: d,
                deltaY: e,
                deltaZ: f,
                deltaMode: g
            }))
        },
        simulatePointerEvent: function(a, b, c, d) {
            var e = void 0;
            void 0 !== c && void 0 !== d && (e = Ghostlab.Converters.toAbsolute(b, c, d)),
            Ghostlab.UIHelpers.dispatchEvent(b[0], a, Ghostlab.UIHelpers.createPointerEvent(a, e))
        },
        simulatePointerDown: function(a, b, c) {
            Ghostlab.UIHelpers.simulatePointerEvent("pointerdown", a, b, c)
        },
        simulatePointerUp: function(a, b, c) {
            Ghostlab.UIHelpers.simulatePointerEvent("pointerup", a, b, c)
        },
        simulatePointerMove: function(a, b, c) {
            Ghostlab.UIHelpers.simulatePointerEvent("pointermove", a, b, c)
        },
        simulateTouchEvent: function(a, b, c, d, e) {
            var f = void 0;
            if (void 0 !== document.ontouchend) {
                var g = Ghostlab.UIHelpers.createTouchEvent(a, {
                    touches: Ghostlab.Converters.toTouchList(b, c),
                    targetTouches: Ghostlab.Converters.toTouchList(b, d),
                    changedTouches: Ghostlab.Converters.toTouchList(b, e)
                })
                  , h = Ghostlab.UndispatchableEventListeners[a];
                if (h)
                    for (var i = h.length > 0, j = 0; j < i; j++)
                        h[j].call(b[0], g);
                else
                    Ghostlab.UIHelpers.dispatchEvent(b[0], a, g)
            } else {
                var k = Ghostlab.Converters.touchToMouseEvent(a);
                if (void 0 !== k) {
                    var l = "mousedown" === k ? c[0] : e[0]
                      , m = l.target ? Ghostlab.jQuery(l.target) : b;
                    if (f = Ghostlab.UIHelpers.simulateMouseEvent(k, m, l && l.x, l && l.y),
                    l) {
                        f || (f = Ghostlab.Converters.toAbsolute(m, l.x, l.y));
                        var n = Ghostlab.UIHelpers.getScrollPos();
                        "mousedown" === k ? (Ghostlab.state.emulatedTouchStartPos.x = f.x - n.x,
                        Ghostlab.state.emulatedTouchStartPos.y = f.y - n.y) : "mouseup" === k && Ghostlab.state.emulatedTouchStartPos.x === f.x - n.x && Ghostlab.state.emulatedTouchStartPos.y === f.y - n.y && Ghostlab.UIHelpers.simulateClick(m, l.x, l.y)
                    }
                }
            }
            return f
        },
        simulateDragEvent: function(a, b, c, d) {
            Ghostlab.UIHelpers.dispatchEvent(b[0], a, Ghostlab.UIHelpers.createHTMLEvent(a))
        },
        simulateKeyEvent: function(a, b, c) {
            Ghostlab.UIHelpers.dispatchEvent(b[0], a, Ghostlab.UIHelpers.createKeyEvent(a, c))
        },
        simulateKeyDown: function(a, b) {
            Ghostlab.UIHelpers.simulateKeyEvent("keydown", a, b)
        },
        simulateKeyUp: function(a, b) {
            Ghostlab.UIHelpers.simulateKeyEvent("keyup", a, b)
        },
        simulateChange: function(a) {
            Ghostlab.UIHelpers.dispatchEvent(a[0], "change", Ghostlab.UIHelpers.createHTMLEvent("change"))
        },
        simulateInput: function(a) {
            Ghostlab.UIHelpers.dispatchEvent(a[0], "input", Ghostlab.UIHelpers.createHTMLEvent("input"))
        },
        simulateFocus: function(a) {
            Ghostlab.UIHelpers.dispatchEvent(a[0], "focus", Ghostlab.UIHelpers.createHTMLEvent("focus"))
        },
        simulateBlur: function(a) {
            Ghostlab.UIHelpers.dispatchEvent(a[0], "blur", Ghostlab.UIHelpers.createHTMLEvent("blur"))
        }
    }
}(),

/**
 * BlockingBoxes
 */
function() {
    var a = window.alert
      , b = window.confirm
      , c = window.prompt
      , d = function(a, b, c) {
        var d, e = 0, f = function() {
            Ghostlab.jQuery.ajax({
                url: Ghostlab.RequestHelpers.buildQueryStringUrl("/____blockingprompt____", {
                    clientId: Ghostlab.state.myId,
                    message: c
                }),
                async: !1,
                success: function(b) {
                    "____timeout____" === b ? (++e,
                    e < 6 ? f() : d = a(c)) : "____master____" === b ? (d = a(c),
                    Ghostlab.jQuery.ajax({
                        url: Ghostlab.RequestHelpers.buildQueryStringUrl("/____blockingprompt_end____", {
                            clientId: Ghostlab.state.myId,
                            message: c,
                            returnValue: d
                        }),
                        async: !1
                    })) : d = b
                },
                error: function(b) {
                    d = a(c)
                }
            })
        }, g = document.title;
        return document.title += " [Ghostlab waiting for response to " + b + "]",
        f(),
        document.title = g,
        d
    }
      , e = function() {
        Ghostlab.config.rewriteBlockingBoxes ? (window.confirm = function(a) {
            return d(b, "confirm", a)
        }
        ,
        window.alert = function(b) {
            return d(a, "alert", b)
        }
        ,
        window.prompt = function(a) {
            return d(c, "prompt", a)
        }
        ) : (window.alert = a,
        window.confirm = b,
        window.prompt = c)
    };
    Ghostlab.Overrides.BlockingBoxes = {
        init: e
    }
}(),

/**
 * getContext
 */
function() {
    var a = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(b, c) {
        return /^webgl/i.test(b) && (c ? "object" == typeof c && (c.preserveDrawingBuffer = !0) : c = {
            preserveDrawingBuffer: !0
        }),
        a.call(this, b, c)
    }
}(),

/**
 * console 拦截
 */
function() {
    var a = ["log", "debug", "info", "warn", "error"]
      , b = {}
      , c = []
      , d = function(a) {
        b[a] = console[a],
        console[a] = function() {
            try {
                var d = b[a];
                if (d && (d.apply ? d.apply(console, arguments) : d(Array.prototype.slice.apply(arguments).join(" "))),
                !c && !Ghostlab.Inspector)
                    return;
                for (var e = [], f = "", g = arguments.length, h = 0; h < g; h++) {
                    var i = arguments[h];
                    h > 0 && (f += " "),
                    f += null === i ? "null" : void 0 === i ? "undefined" : i.toString(),
                    e.push(Ghostlab.InspectionHelpers.getRemoteObject(i, !0))
                }
                var j = {
                    entry: {
                        source: "javascript",
                        level: a,
                        text: f,
                        parameters: e,
                        timestamp: (new Date).getTime()
                    }
                };
                c ? c.push({
                    method: "Log.entryAdded",
                    data: j
                }) : Ghostlab.Inspector && Ghostlab.Inspector.sendEvent("Log.entryAdded", j, !1, !0)
            } catch (a) {}
        }
    }
      , e = function() {
        window.onerror = function(a, b, d) {
            a && !a.__ghostlab_error_sent__ && setTimeout(function() {
                if (!a.__ghostlab_error_sent__) {
                    a.__ghostlab_error_sent__ = !0;
                    var e = {
                        timestamp: (new Date).getTime(),
                        exceptionDetails: {
                            text: Ghostlab.InspectionHelpers.getErrorText(a),
                            lineNumber: d,
                            url: b
                        }
                    };
                    c ? c.push({
                        method: "Runtime.exceptionThrown",
                        data: e
                    }) : Ghostlab.Inspector && Ghostlab.Inspector.sendEvent("Runtime.exceptionThrown", e)
                }
            }, 100)
        }
    }
      , f = function() {
        Ghostlab.$window.on("error", function(a) {
            var b = a.originalEvent.error;
            b && !b.__ghostlab_error_sent__ && setTimeout(function() {
                if (!b.__ghostlab_error_sent__) {
                    b.__ghostlab_error_sent__ = !0;
                    var a = {
                        timestamp: (new Date).getTime(),
                        exceptionDetails: {
                            text: Ghostlab.InspectionHelpers.getErrorText(b),
                            stack: b && b.stack
                        }
                    };
                    c ? c.push({
                        method: "Runtime.exceptionThrown",
                        data: a
                    }) : Ghostlab.Inspector && Ghostlab.Inspector.sendEvent("Runtime.exceptionThrown", a)
                }
            }, 100)
        })
    };
    Ghostlab.Overrides.Console = {
        init: function() {
            void 0 === window.console && (window.console = {});
            for (var g = 0; g < a.length; g++)
                d(a[g]);
            Ghostlab.log = function() {
                var a = b.log;
                a && (a.apply ? a.apply(console, arguments) : a(Array.prototype.slice.apply(arguments).join(" ")))
            }
            ,
            setTimeout(function() {
                c = null
            }, 5e3),
            Ghostlab.ua.msie9 ? e() : f()
        },
        sendBufferedMessages: function() {
            if (c && Ghostlab.Inspector) {
                for (var a = c.length, b = 0; b < a; b++) {
                    var d = c[b];
                    Ghostlab.Inspector.sendEvent(d.method, d.data, !1, !0)
                }
                c = null
            }
        }
    }
}(),
/**
 * WebSQL
 */
function() {
    var a = window.openDatabase
      , b = 0
      , c = {}
      , d = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB
      , e = d && d.open
      , f = {}
      , g = function(a) {
        for (var b in c)
            if (c[b].name === a)
                return !0;
        return !1
    };
    Ghostlab.Overrides.WebSQL = {
        init: function() {
            "function" == typeof a && (window.openDatabase = function(d, e) {
                if (arguments.length > 0 && !g(d)) {
                    var f = String(b);
                    c[f] = {
                        id: f,
                        name: d,
                        version: e
                    },
                    b++
                }
                return a.apply(this, arguments)
            }
            )
        },
        openDatabase: function() {
            return a.apply(window, arguments)
        },
        getDatabases: function() {
            return c
        },
        getDatabaseEntryByName: function(a) {
            for (var b in c)
                if (c[b].name === a)
                    return c[b];
            return null
        },
        getDatabaseEntryByID: function(a) {
            return c[a]
        }
    },
    Ghostlab.Overrides.IndexedDB = {
        init: function() {
            d && (d.open = function(a) {
                return f[a] = !0,
                e.apply(this, arguments)
            }
            )
        },
        getDatabases: function() {
            return Object.keys(f)
        },
        open: function(a) {
            return e.call(d, a)
        }
    }
}(),
/**
 * 重新dom相关事件
 */
Ghostlab.Overrides.Event = {
    afterInit: function() {   
        Ghostlab.Overrides.Event.overrideAddEventListener(),
        Ghostlab.Overrides.Event.overrideCreateElement(),
        Ghostlab.Overrides.Event.overrideDOMManipulationMethods(),
        Ghostlab.Overrides.Event.overrideClick()
    },
    overrideAddEventListener: function() {
        var a = "undefined" != typeof EventTarget ? EventTarget : "undefined" != typeof Node ? Node : void 0;
        if (void 0 !== a) {
            var b = a.prototype.addEventListener;
            if (void 0 !== b) {
                a.prototype.addEventListener = function(a, c, d) {
                    Ghostlab.state.usedEvents[a] = !0,
                    Ghostlab.UndispatchableEventListeners[a] && Ghostlab.UndispatchableEventListeners[a].push(c);
                    var e = Ghostlab.DOMEvents[a];
                    void 0 !== e && Ghostlab.Overrides.Event.addGhostlabEventListener(this, a),
                    void 0 !== e && e.eventRewriter ? b.call(this, a, function(a) {
                        c.call(this, e.eventRewriter(a))
                    }, d) : b.apply(this, arguments)
                }
                ;
                var c = a.prototype.removeEventListener;
                a.prototype.removeEventListener = function(a, b, d) {
                    if (Ghostlab.UndispatchableEventListeners[a]) {
                        var e = Ghostlab.UndispatchableEventListeners[a].indexOf(b);
                        e >= 0 && Ghostlab.UndispatchableEventListeners[a].splice(e, 1)
                    }
                    c.apply(this, arguments)
                }
            }
        }
    },
    overrideCreateElement: function() {
        var a = function(a) {
            return function() {
                var b = a.apply(document, arguments);
                return "style" === b.tagName.toLowerCase() && (b.__isCreatedDynamically__ = !0),
                "undefined" == typeof Node && (setTimeout(function() {
                    Ghostlab.Overrides.Event.overrideOnHandlers(b)
                }, 100),
                Ghostlab.Overrides.Event.overrideAttachEvent(b)),
                b
            }
        }
          , b = document.createElement;
        "function" == typeof b && (document.createElement = a(b));
        var c = document.createElementNS;
        "function" == typeof c && (document.createElementNS = a(c))
    },
    overrideDOMManipulationMethods: function() {
        if ("undefined" != typeof Node && Node.prototype) {
            var a = function(a) {
                var b = Node.prototype[a];
                void 0 !== b && (Node.prototype[a] = function(a) {
                    var c = Ghostlab.jQuery(a)
                      , d = null;
                    return "undefined" != typeof DocumentFragment && a instanceof DocumentFragment ? (d = Ghostlab.jQuery(),
                    c.children().each(function() {
                        var a = Ghostlab.jQuery(this);
                        d = d.add(a).add(a.find("*"))
                    })) : d = c.add(c.find("*")),
                    null != d && Ghostlab.Overrides.Event.overrideAllOnAndAttachHandlers(d),
                    Areion.call(this, b, arguments)
                }
                )
            };
            a("appendChild"),
            a("insertBefore"),
            a("replaceChild")
        }
    },
    addGhostlabEventListener: function(a, b) {
        if (void 0 === a.__hasGhostlabEventHandler__ || !a.__hasGhostlabEventHandler__[b]) {
            var c = Ghostlab.DOMEvents[b];
            void 0 !== c && c.addTo(Ghostlab.jQuery(a))
        }
    },
    overrideAllOnAndAttachHandlers: function(a) {
        void 0 !== a && null !== a || (a = Ghostlab.jQuery("*")),
        a.each(function() {
            Ghostlab.Overrides.Event.overrideOnHandlers(this),
            Ghostlab.Overrides.Event.overrideAttachEvent(this)
        })
    },
    overrideOnHandlers: function(a) {
        for (var b in Ghostlab.DOMEvents) {
            a["on" + b] && Ghostlab.Overrides.Event.addGhostlabEventListener(a, b)
        }
    },
    overrideAttachEvent: function(a) {
        if (void 0 !== document.attachEvent && !a.__isGhostlabAttachEventOverridden__) {
            var b = a.attachEvent;
            void 0 !== b && (a.attachEvent = function(c, d) {
                var e = c.substr(2);
                void 0 !== Ghostlab.DOMEvents[e] && Ghostlab.Overrides.Event.addGhostlabEventListener(a, e),
                b.apply(a, arguments)
            }
            ,
            a.__isGhostlabAttachEventOverridden__ = !0)
        }
    },
    overrideClick: function() {
        if ("undefined" != typeof HTMLElement) {
            var a = HTMLElement.prototype.click;
            HTMLElement.prototype.click = function() {
                var b = this;
                this.__ghostlab_click_tid__ && clearTimeout(this.__ghostlab_click_tid__),
                this.__ghostlab_click_tid__ = setTimeout(function() {
                    b.__ghostlab_click_tid__ = void 0
                }, 100),
                a.call(this)
            }
        }
    }
},

/**
 * dom event重写
 */
Ghostlab.DOMEvent = function(a, b, c, d) {
    this.eventName = a,
    this.handler = b ? function(a) {
        (a.originalEvent && !a.originalEvent.__hasGhostlabHandledEvent__ || void 0 === a.originalEvent && !a.__hasGhostlabHandledEvent__) && !1 !== b.apply(this, arguments) && (a.originalEvent ? a.originalEvent.__hasGhostlabHandledEvent__ = !0 : a.__hasGhostlabHandledEvent__ = !0),
        Ghostlab.state.lastEventTime = (new Date).getTime()
    }
    : null,
    this.elements = [],
    this.isAlwaysActive = !!c,
    this.useCapture = !!d
}
,
Ghostlab.DOMEvent.prototype.eventRewriter = null,
Ghostlab.DOMEvent.prototype.addTo = function(a, b, c) {
    var d = this;
    this.handler && (b || (b = null),
    a.each(function() {
        if (void 0 === this.__hasGhostlabEventHandler__ && (this.__hasGhostlabEventHandler__ = {}),
        !this.__hasGhostlabEventHandler__[d.eventName]) {
            this.__hasGhostlabEventHandler__[d.eventName] = !0;
            var a = Ghostlab.jQuery(this)
              , e = d.handler
              , f = {
                $elt: a,
                selector: b
            };
            c && (f.handler = e = function(a) {
                return d.handler.call(this, a, c)
            }
            ),
            d.elements.push(f),
            (Ghostlab.config.broadcastEvents || this.isAlwaysActive) && (d.useCapture && Ghostlab.features.hasAddEventListener ? this.addEventListener(d.eventName, e, !0) : a.on(d.eventName, b, e))
        }
    }))
}
,
Ghostlab.DOMEvent.prototype.enable = function(a) {
    if (!this.isAlwaysActive) {
        var b = this.handler;
        if (b) {
            var c = this.elements.length
              , d = this.eventName;
            if (this.useCapture && !Ghostlab.ua.msie8)
                if (a)
                    for (var e = 0; e < c; e++)
                        this.elements[e].$elt[0].addEventListener(d, this.elements[e].handler || b, !0);
                else
                    for (var e = 0; e < c; e++)
                        this.elements[e].$elt[0].removeEventListener(d, this.elements[e].handler || b, !0);
            else if (a)
                for (var e = 0; e < c; e++) {
                    var f = this.elements[e];
                    f.$elt.on(d, f.selector, this.elements[e].handler || b)
                }
            else
                for (var e = 0; e < c; e++) {
                    var f = this.elements[e];
                    f.$elt.off(d, f.selector, this.elements[e].handler || b)
                }
        }
    }
},

/**
 * Overrides XHR
 */
function() {
    var a = function() {
        if ("function" == typeof XMLHttpRequest || "object" == typeof XMLHttpRequest) {
            var a = XMLHttpRequest.prototype.open
              , b = XMLHttpRequest.prototype.send
              , c = XMLHttpRequest.prototype.setRequestHeader;
            XMLHttpRequest.prototype.send = function() {
                if (this.ghostlab && !this.ghostlab.ignore && Ghostlab.Inspector) {
                    var a = this.ghostlab.requestMethod;
                    "GET" !== a && "POST" !== a || "arraybuffer" === this.responseType || this.setRequestHeader("x-ghostlab-raw-source", "true"),
                    Ghostlab.Inspector.Network.overrideXHRSend(b, this, arguments)
                } else
                    Areion.call(this, b, arguments)
            }
            ,
            XMLHttpRequest.prototype.open = function(b, c) {
                this.ghostlab || (this.ghostlab = {}),
                Ghostlab.isNoRewriteUrl(c) ? this.ghostlab.ignore = !0 : (this.ghostlab.requestOpen = (new Date).getTime(),
                this.ghostlab.requestMethod = b || "GET",
                this.ghostlab.requestURL = Ghostlab.unrewriteUrl(c)),
                Areion.call(this, a, arguments)
            }
            ,
            XMLHttpRequest.prototype.setRequestHeader = function(a, b) {
                c.apply(this, arguments),
                Ghostlab.Inspector && (this.ghostlab || (this.ghostlab = {}),
                this.ghostlab.headers || (this.ghostlab.headers = {}),
                this.ghostlab.headers[a] ? this.ghostlab.headers[a].push(b) : this.ghostlab.headers[a] = [b])
            }
        }
    }
      , b = function() {
        if ("undefined" != typeof ActiveXObject) {
            var a = ActiveXObject;
            ActiveXObject = function(b) {
                var c, d = new a(b);
                return -1 !== b.toLowerCase().indexOf("xmlhttp") ? (c = {
                    originalAx: d,
                    onTimeout: null,
                    constructor: null,
                    response: null,
                    responseType: null,
                    responseXML: null,
                    timeout: 0,
                    withCredentials: null,
                    responseText: "",
                    responseXml: null,
                    readyState: 0,
                    status: 0,
                    statusText: 0,
                    onReadyStateChange: null,
                    onreadystatechange: null
                },
                c._onReadyStateChange = function() {
                    c.readyState = d.readyState;
                    try {
                        c.responseText = d.responseText || void 0
                    } catch (a) {}
                    try {
                        c.responseXml = d.responseXml
                    } catch (a) {}
                    try {
                        c.responseBody = d.responseBody
                    } catch (a) {}
                    try {
                        c.responseXML = d.responseXML
                    } catch (a) {}
                    try {
                        c.status = d.status
                    } catch (a) {}
                    try {
                        c.statusText = d.statusText
                    } catch (a) {}
                    try {
                        c.responseType = d.responseType
                    } catch (a) {}
                    try {
                        c.timeout = d.timeout
                    } catch (a) {}
                    try {
                        c.withCredentials = d.withCredentials
                    } catch (a) {}
                    c.onreadystatechange = c.onReadyStateChange || c.onreadystatechange,
                    c.onreadystatechange && c.onreadystatechange()
                }
                ,
                c.open = function(a, b, c, e, f) {
                    return c = !1 !== c,
                    d.onreadystatechange = this._onReadyStateChange,
                    this.ghostlab = {
                        requestOpen: (new Date).getTime(),
                        requestMethod: a || "",
                        requestURL: b
                    },
                    b = Ghostlab.rewriteUrl(b),
                    d.open(a, b, c, e, f)
                }
                ,
                c.Open = c.open,
                c.send = function(a) {
                    return Ghostlab.Inspector ? Ghostlab.Inspector.Network.overrideXHRSend(d, c, arguments) : d.send(a)
                }
                ,
                c.Send = c.send,
                c.setRequestHeader = function(a, b) {
                    return d.setRequestHeader(a, b)
                }
                ,
                c.setrequestheader = c.setRequestHeader,
                c.removeEventListener = function(a, b, c) {
                    return d.removeEventListener(a, b, c)
                }
                ,
                c.removeeventlistener = c.removeEventListener,
                c.overrideMimeType = function(a) {
                    return d.overrideMimeType(a)
                }
                ,
                c.overridemimetype = c.overrideMimeType,
                c.getResponseHeader = function(a) {
                    return d.getResponseHeader(a)
                }
                ,
                c.getresponseheader = c.getResponseHeader,
                c.getAllResponseHeaders = function() {
                    return d.getAllResponseHeaders()
                }
                ,
                c.getallresponseheaders = c.getAllResponseHeaders,
                c.dispatchEvent = function(a, b) {
                    return d.dispatchEvent(a, b)
                }
                ,
                c.dispatchevent = c.dispatchEvent,
                c.addEventListener = function(a, b, c) {
                    return d.addEventListener(a, b, c)
                }
                ,
                c.addeventlistener = c.addEventListener,
                c.abort = function() {
                    return d.abort()
                }
                ,
                c.Abort = c.abort) : c = d,
                c
            }
        }
    };
    Ghostlab.Overrides.XHR = {
        init: function() {
            a(),
            b()
        }
    }
}(),

/**
 * DOMEvents change
 */
function() {
    var a = !1;
    Ghostlab.DOMEvents.change = new Ghostlab.DOMEvent("change",function(b) {
        if (!Ghostlab.UIHelpers.isSimulatedEvent(b) && void 0 === b.target.__ghostlab_click_tid__) {
            var c = Ghostlab.jQuery(b.target)
              , d = c.is(":checkbox") || c.is(":radio");
            if (!d || !Ghostlab.SessionStorage.get("click") || Ghostlab.state.lastClickedElement !== b.target) {
                var e = c.is("select") || d;
                a || !e && Ghostlab.state.isReplacingValue || (Ghostlab.broadcastEvent({
                    event: "change",
                    selector: Ghostlab.DOMHelpers.buildSelector(c),
                    value: c.val(),
                    checked: c.prop("checked"),
                    toClientId: c.attr("data-ghostlab-2cid") || void 0
                }, c),
                e || Ghostlab.SpecialStrings.replaceVal(c)),
                Ghostlab.state.isReplacingValue = !1,
                a = !1
            }
        }
    }
    ,!0),
    Ghostlab.Events.change = {
        init: function() {
            Ghostlab.DOMEvents.change.addTo(Ghostlab.$document)
        },
        receive: function(b) {
            if (b.selector && b.frameId === Ghostlab.state.frameId && b.clientId !== Ghostlab.state.myId) {
                var c = Ghostlab.jQuery(b.selector);
                if (c.is(":checkbox") && b.toClientId)
                    return a = !0,
                    c.prop("checked", !b.checked),
                    Ghostlab.UIHelpers.simulateClick(c),
                    void setTimeout(function() {
                        a = !1
                    }, Ghostlab.Constants.EVENT_RESET_TIMEOUT);
                void 0 !== b.value && Ghostlab.SpecialStrings.replaceVal(c, b.value),
                void 0 !== b.checked && c.prop("checked", b.checked),
                Ghostlab.UIHelpers.simulateChange(c),
                Ghostlab.state.isReplacingValue = !1
            }
        }
    }
}(),

Ghostlab.DOMEvents.input = new Ghostlab.DOMEvent("input",function(a) {
    if (!Ghostlab.UIHelpers.isSimulatedEvent(a)) {
        var b = Ghostlab.jQuery(a.target)
          , c = b.attr("contenteditable")
          , d = "" === c || c && "true" === c.toLowerCase();
        Ghostlab.broadcastEvent({
            event: "input",
            selector: Ghostlab.DOMHelpers.buildSelector(b),
            value: d ? b.html() : b.val(),
            toClientId: b.attr("data-ghostlab-2cid") || void 0
        }, b)
    }
}),

Ghostlab.Events.input = {
    init: function() {
        Ghostlab.DOMEvents.input.addTo(Ghostlab.$document)
    },
    receive: function(a) {
        if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
            var b = Ghostlab.jQuery(a.selector);
            void 0 !== a.value && Ghostlab.SpecialStrings.replaceVal(b, a.value),
            Ghostlab.UIHelpers.simulateInput(b),
            Ghostlab.state.isReplacingValue = !1
        }
    }
},

/**
 * click 事件
 */
function() {
    var a = null
      , b = {}
      , c = {
        mouse: {
            element: null,
            hierarchy: [],
            stableElementDimensions: null,
            stableElementSelector: void 0,
            stableMeasureCount: 0
        },
        pointer: {
            element: null,
            hierarchy: [],
            stableElementDimensions: null,
            stableElementSelector: void 0,
            stableMeasureCount: 0
        }
    }, 
    d = Ghostlab.UIHelpers.throttle(function(b) {
        if (null !== a) {
            var d = c["mousemove" === b.type ? "mouse" : "pointer"];
            if (d) {
                if (d.stableMeasureCount >= 5) {
                    var e = d.hierarchy.length;
                    d.stableElementSelector = void 0;
                    for (var f = 0; f < e; f++) {
                        var g = d.hierarchy[f]
                          , h = g.$element.offset();
                        if (g.left === h.left && g.top === h.top) {
                            d.stableElementDimensions = g,
                            d.stableElementSelector = Ghostlab.DOMHelpers.buildSelector(g.$element);
                            break
                        }
                    }
                } else
                    ++d.stableMeasureCount;
                var i = Ghostlab.jQuery(b.target)
                  , j = Ghostlab.Converters.toRelative(i[0] === d.element && d.stableElementDimensions ? d.stableElementDimensions : i.parent(), b.pageX, b.pageY);
                Ghostlab.broadcastEvent({
                    event: b.type,
                    selector: a,
                    relativeSelector: d.stableElementSelector,
                    x: j.x,
                    y: j.y
                }, i)
            }
        }
    }, 
    Ghostlab.Constants.FAST_EVENT_DELAY, !1)
      , e = function(e) {
        var f = e.type;
        "click" === f && (Ghostlab.state.lastClickedElement = e.target);
        var g = Ghostlab.UIHelpers.isSimulatedEvent(e);
        if (g && void 0 !== e.__ghostlab_is_checked__) {
            var h = Ghostlab.jQuery(e.target);
            h.is(":checkbox") && h.prop("checked", e.__ghostlab_is_checked__)
        }
        if (!(g || b[f] || "click" === f && void 0 !== e.target.__ghostlab_click_tid__)) {
            var i = Ghostlab.jQuery(e.target)
              , j = i.is("select")
              , k = i.is("option")
              , l = i.attr("data-ghostlab-2cid");
            if (!(Ghostlab.state.preventClickPropagation || "click" !== f && Ghostlab.DOMHelpers.isSelectableFormElement(i) || "click" === f && (j || k)) && l !== Ghostlab.state.myId && (!l || i.is(":radio")) && 3 !== e.which) {
                Ghostlab.SessionStorage.set("click", !0),
                window.setTimeout(function() {
                    Ghostlab.SessionStorage.set("click", !1)
                }, Ghostlab.Constants.EVENT_RESET_TIMEOUT);
                var m = Ghostlab.DOMHelpers.buildSelector(i);
                if ("mousedown" === f)
                    Ghostlab.state.mousedownSelector = m;
                else if (!Ghostlab.StringHelpers.startsWith(m, "html") && !Ghostlab.StringHelpers.startsWith(m, "#")) {
                    var n = Ghostlab.StringHelpers.trim(m)
                      , o = n.indexOf(">");
                    0 === o && (o = n.indexOf(">", 1)),
                    o >= 0 && (n = Ghostlab.StringHelpers.trim(n.substr(o + 1))),
                    Ghostlab.StringHelpers.endsWith(Ghostlab.state.mousedownSelector, n) ? m = Ghostlab.state.mousedownSelector : Ghostlab.StringHelpers.endsWith(Ghostlab.state.focusSelector, n) && (m = Ghostlab.state.focusSelector)
                }
                if (a = m,
                "mousedown" === f || "pointerdown" === f) {
                    var p = "mousedown" === f ? "mousemove" : "pointermove";
                    if (Ghostlab.state.usedEvents[p]) {
                        var q = c["mousedown" === f ? "mouse" : "pointer"];
                        q.element = i[0];
                        for (var h = i; !h.is("html"); h = h.parent()) {
                            var r = h.offset();
                            q.hierarchy.push({
                                $element: h,
                                left: r.left,
                                top: r.top,
                                width: h.width(),
                                height: h.height()
                            })
                        }
                        i.on(p, d)
                    }
                } else if ("mouseup" === f || "pointerup" === f) {
                    var p = "mouseup" === f ? "mousemove" : "pointermove";
                    if (Ghostlab.state.usedEvents[p]) {
                        var q = c["mouseup" === f ? "mouse" : "pointer"];
                        q.element = null,
                        q.hierarchy = [],
                        q.stableElementDimensions = null,
                        q.stableElementSelector = void 0,
                        q.stableMeasureCount = 0,
                        i.off(p, d)
                    }
                }
                if (null !== Ghostlab.state.socket) {
                    var s = Ghostlab.Converters.toRelative(i, e.pageX, e.pageY)
                      , t = void 0;
                    "click" === f && i.is(":checkbox") && (t = i.prop("checked")),
                    Ghostlab.broadcastEvent({
                        event: f,
                        selector: m,
                        x: s.x,
                        y: s.y,
                        checked: t,
                        toClientId: l
                    }, i)
                }
            }
        }
    };
    Ghostlab.DOMEvents.mousedown = new Ghostlab.DOMEvent("mousedown",e,!1,!0),
    Ghostlab.DOMEvents.mouseup = new Ghostlab.DOMEvent("mouseup",e,!1,!0),
    Ghostlab.DOMEvents.click = new Ghostlab.DOMEvent("click",e,!1,!0),
    Ghostlab.DOMEvents.dblclick = new Ghostlab.DOMEvent("dblclick",e,!1,!0),
    Ghostlab.DOMEvents.pointerdown = new Ghostlab.DOMEvent("pointerdown",e,!1,!0),
    Ghostlab.DOMEvents.pointerup = new Ghostlab.DOMEvent("pointerup",e,!1,!0);
    var f = function(a, c) {
        if (c.selector && c.frameId === Ghostlab.state.frameId && c.clientId !== Ghostlab.state.myId && !b[a]) {
            Ghostlab.SessionStorage.set("click", !0),
            "mousemove" !== a && (b[a] = !0);
            var d = Ghostlab.jQuery(c.selector);
            Ghostlab.UIHelpers.simulateMouseEvent(a, d, c.x, c.y, void 0 !== c.checked && d.is(":checkbox") ? {
                __ghostlab_is_checked__: c.checked
            } : void 0),
            window.setTimeout(function() {
                Ghostlab.SessionStorage.set("click", !1)
            }, Ghostlab.Constants.EVENT_RESET_TIMEOUT),
            window.setTimeout(function() {
                b[a] = !1
            }, Ghostlab.Constants.FAST_EVENT_DELAY)
        }
    }, 
    g = function(a, c) {
        if (c.selector && c.frameId === Ghostlab.state.frameId && c.clientId !== Ghostlab.state.myId && !b[a]) {
            "pointermove" !== a && (b[a] = !0);
            var d = Ghostlab.jQuery(c.selector);
            Ghostlab.UIHelpers.simulatePointerEvent(a, d, c.x, c.y)
        }
    };
    Ghostlab.Events.click = {
        init: function() {
            Ghostlab.DOMEvents.click.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (f("click", a),
            Ghostlab.config.highlightClickLocation) {
                var b = Ghostlab.jQuery(a.selector);
                if (b.is(":visible")) {
                    var c = Ghostlab.Converters.toAbsolute(b, a.x, a.y)
                      , d = Ghostlab.jQuery('<div style="position: absolute;left:' + (c.x - 50) + "px;top:" + (c.y - 50) + 'px;width:100px;height:100px;padding:50px;background-color:transparent;opacity:1;box-sizing:border-box;transition:all 1s ease;pointer-events:none;"><div style="background-color:red;width:100%;height:100%;border-radius:50%;"></div></div>');
                    Ghostlab.jQuery("body").append(d),
                    window.setTimeout(function() {
                        d.css({
                            padding: 0,
                            opacity: 0
                        })
                    }, 10),
                    window.setTimeout(function() {
                        d.remove()
                    }, 1e3)
                }
            }
        }
    },
    Ghostlab.Events.dblclick = {
        init: function() {
            Ghostlab.DOMEvents.dblclick.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dblclick", a)
        }
    },
    Ghostlab.Events.mousedown = {
        init: function() {
            Ghostlab.DOMEvents.mousedown.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("mousedown", a)
        }
    },
    Ghostlab.Events.mouseup = {
        init: function() {
            Ghostlab.DOMEvents.mouseup.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("mouseup", a)
        }
    },
    Ghostlab.Events.mousemove = {
        init: function() {},
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var b = a.relativeSelector ? Ghostlab.jQuery(a.relativeSelector) : Ghostlab.jQuery(a.selector).parent();
                Ghostlab.UIHelpers.simulateMouseMove(b, a.x, a.y)
            }
        }
    },
    Ghostlab.Events.pointerdown = {
        init: function() {
            Ghostlab.DOMEvents.pointerdown.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            g("pointerdown", a)
        }
    },
    Ghostlab.Events.pointerup = {
        init: function() {
            Ghostlab.DOMEvents.pointerup.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            g("pointerup", a)
        }
    },
    Ghostlab.Events.pointermove = {
        init: function() {},
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var b = a.relativeSelector ? Ghostlab.jQuery(a.relativeSelector) : Ghostlab.jQuery(a.selector).parent();
                Ghostlab.UIHelpers.simulateMouseMove(b, a.x, a.y),
                Ghostlab.UIHelpers.simulatePointerMove(b, a.x, a.y)
            }
        }
    }
}(),
/**
 * drag 事件
 */
function() {
    var a = null
      , b = null
      , c = null
      , d = null
      , e = function(e) {
        var f = e.type;
        if (!Ghostlab.UIHelpers.isSimulatedEvent(e)) {
            var g, h = Ghostlab.jQuery(e.target);
            if ("drag" === f ? (a !== e.target && (a = e.target,
            b = Ghostlab.DOMHelpers.buildSelector(h)),
            g = b) : "dragover" === f ? (c !== e.target && (c = e.target,
            d = Ghostlab.DOMHelpers.buildSelector(h)),
            g = d) : g = Ghostlab.DOMHelpers.buildSelector(h),
            null !== Ghostlab.state.socket) {
                var i = Ghostlab.Converters.toRelative(h, e.pageX, e.pageY);
                Ghostlab.broadcastEvent({
                    event: f,
                    selector: g,
                    x: i.x,
                    y: i.y
                }, h)
            }
        }
    };
    Ghostlab.DOMEvents.drag = new Ghostlab.DOMEvent("drag",e),
    Ghostlab.DOMEvents.dragend = new Ghostlab.DOMEvent("dragend",e),
    Ghostlab.DOMEvents.dragenter = new Ghostlab.DOMEvent("dragenter",e),
    Ghostlab.DOMEvents.dragexit = new Ghostlab.DOMEvent("dragexit",e),
    Ghostlab.DOMEvents.dragleave = new Ghostlab.DOMEvent("dragleave",e),
    Ghostlab.DOMEvents.dragover = new Ghostlab.DOMEvent("dragover",e),
    Ghostlab.DOMEvents.dragstart = new Ghostlab.DOMEvent("dragstart",e),
    Ghostlab.DOMEvents.drop = new Ghostlab.DOMEvent("drop",e);
    var f = function(a, b) {
        if (b.selector && b.frameId === Ghostlab.state.frameId && b.clientId !== Ghostlab.state.myId) {
            var c = Ghostlab.jQuery(b.selector);
            Ghostlab.UIHelpers.simulateDragEvent(a, c, b.x, b.y)
        }
    };
    Ghostlab.Events.drag = {
        init: function() {
            Ghostlab.DOMEvents.drag.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("drag", a)
        }
    },
    Ghostlab.Events.dragend = {
        init: function() {
            Ghostlab.DOMEvents.dragend.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dragend", a)
        }
    },
    Ghostlab.Events.dragenter = {
        init: function() {
            Ghostlab.DOMEvents.dragenter.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dragenter", a)
        }
    },
    Ghostlab.Events.dragexit = {
        init: function() {
            Ghostlab.DOMEvents.dragexit.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dragexit", a)
        }
    },
    Ghostlab.Events.dragleave = {
        init: function() {
            Ghostlab.DOMEvents.dragleave.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dragleave", a)
        }
    },
    Ghostlab.Events.dragover = {
        init: function() {
            Ghostlab.DOMEvents.dragover.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dragover", a)
        }
    },
    Ghostlab.Events.dragstart = {
        init: function() {
            Ghostlab.DOMEvents.dragstart.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("dragstart", a)
        }
    },
    Ghostlab.Events.drop = {
        init: function() {
            Ghostlab.DOMEvents.drop.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            f("drop", a)
        }
    }
}(),
Ghostlab.DOMEvents.focus = new Ghostlab.DOMEvent("focus",function(a) {
    var b = Ghostlab.jQuery(a.target);
    if (0 !== b.length && !Ghostlab.InspectionHelpers.isGhostlabDOMElement(b) && !b.attr("data-ghostlab-2cid")) {
        var c = Ghostlab.DOMHelpers.buildSelector(b);
        Ghostlab.state.focusSelector = c,
        Ghostlab.broadcastEvent({
            event: "focus",
            selector: c
        }, b)
    }
}
,!1,!0),
Ghostlab.Events.focus = {
    init: function() {
        Ghostlab.DOMEvents.focus.addTo(Ghostlab.$document, "a,input,textarea,button,select")
    },
    receive: function(a) {
        if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId && !Ghostlab.MultiEdit.isOpen) {
            var b = Ghostlab.jQuery(a.selector);
            b.blur(),
            b.focus(),
            Ghostlab.UIHelpers.simulateFocus(b),
            Ghostlab.config.scrollFocusIntoView && Ghostlab.DOMHelpers.isFormElement(b) && Ghostlab.UIHelpers.scrollIntoView(b)
        }
    }
},
Ghostlab.DOMEvents.blur = new Ghostlab.DOMEvent("blur",function(a) {
    if (document.hasFocus()) {
        var b = Ghostlab.jQuery(a.target);
        0 === b.length || Ghostlab.InspectionHelpers.isGhostlabDOMElement(b) || b.attr("data-ghostlab-2cid") || Ghostlab.broadcastEvent({
            event: "blur",
            selector: Ghostlab.DOMHelpers.buildSelector(b)
        }, b)
    }
}
,!1,!0),
Ghostlab.Events.blur = {
    init: function() {
        Ghostlab.DOMEvents.blur.addTo(Ghostlab.$document, "a,input,textarea,button,select")
    },
    receive: function(a) {
        if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
            var b = Ghostlab.jQuery(a.selector);
            b.blur(),
            Ghostlab.UIHelpers.simulateBlur(b)
        }
    }
},
/**
 * mouseover hover
 */
function() {
    var a = function(a, b) {
        if (!Ghostlab.UIHelpers.isSimulatedEvent(a)) {
            var c = Ghostlab.jQuery(a.target);
            switch (a.type) {
            case "mouseenter":
                c.addClass("__ghostlab-hover__");
                break;
            case "mouseleave":
                c.removeClass("__ghostlab-hover__")
            }
            if (null !== Ghostlab.state.socket) {
                var d = Ghostlab.Converters.toRelative(c, a.pageX, a.pageY);
                Ghostlab.broadcastEvent({
                    event: a.type,
                    selector: Ghostlab.DOMHelpers.buildSelector(c),
                    x: d.x,
                    y: d.y
                }, c)
            }
        }
    };
    Ghostlab.DOMEvents.mouseover = new Ghostlab.DOMEvent("mouseover",a,!1,!0),
    Ghostlab.DOMEvents.mouseout = new Ghostlab.DOMEvent("mouseout",a,!1,!0),
    Ghostlab.DOMEvents.mouseenter = new Ghostlab.DOMEvent("mouseenter",a,!1,!0),
    Ghostlab.DOMEvents.mouseleave = new Ghostlab.DOMEvent("mouseleave",a,!1,!0),
    Ghostlab.Events.mouseover = {
        init: function() {
            Ghostlab.DOMEvents.mouseover.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var b = Ghostlab.jQuery(a.selector);
                Ghostlab.UIHelpers.simulateMouseOver(b)
            }
        }
    },
    Ghostlab.Events.mouseout = {
        init: function() {
            Ghostlab.DOMEvents.mouseout.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var b = Ghostlab.jQuery(a.selector);
                Ghostlab.UIHelpers.simulateMouseMove(b, a.x, a.y),
                Ghostlab.UIHelpers.simulateMouseOut(b)
            }
        }
    },
    Ghostlab.Events.mouseenter = {
        init: function() {
            Ghostlab.DOMEvents.mouseenter.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var b = Ghostlab.jQuery(a.selector);
                Ghostlab.UIHelpers.simulateMouseEnter(b),
                Ghostlab.UIHelpers.simulateMouseMove(b, a.x, a.y),
                b.addClass("__ghostlab-hover__")
            }
        }
    },
    Ghostlab.Events.mouseleave = {
        init: function() {
            Ghostlab.DOMEvents.mouseleave.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var b = Ghostlab.jQuery(a.selector);
                b.removeClass("__ghostlab-hover__"),
                Ghostlab.UIHelpers.simulateMouseLeave(b)
            }
        }
    }
}(),

function() {
    var a = null
      , b = null;
    Ghostlab.Events.identify = {
        receive: function(c) {
            if (c.identifyClientId === Ghostlab.state.myId && (a && window.clearTimeout(a),
            a = window.setTimeout(function() {
                b && b.remove(),
                b = null,
                a = null
            }, 1e3),
            !b)) {
                var d = Ghostlab.UIHelpers.getWindowHeight();
                b = Ghostlab.jQuery('<div id="__ghostlab_highlighter_identify__" style="position: fixed;-webkit-backface-visibility: hidden;left:0;top:0;width:' + Ghostlab.UIHelpers.getWindowWidth() + "px;height:" + d + "px;background-color: rgb(0, 0, 0);background-color: rgba(0, 0, 0, 0.3);color: #ffffff;font-size: 80pt;font-family: Arial, Helvetica, sans-serif;line-height:" + d + 'px;text-align: center;z-index: 999999;">#' + Ghostlab.state.myId + "</div>"),
                Ghostlab.jQuery("body").append(b)
            }
        }
    }
}(),
/**
 * keydown keyup
 */
function() {
    var a = function(a) {
        if (!Ghostlab.UIHelpers.isSimulatedEvent(a)) {
            var b = Ghostlab.jQuery(a.target)
              , c = null;
            "keyup" === a.type && (b.is("input") || b.is("textarea")) && (c = b.val());
            var d = null;
            35 === a.keyCode || (a.metaKey || a.ctrlKey) && 40 === a.keyCode ? d = "bottom" : (36 === a.keyCode || (a.metaKey || a.ctrlKey) && 38 === a.keyCode) && (d = "top"),
            null !== d && (Ghostlab.state.isSendingKeyScrollingEvent = !0,
            window.setTimeout(function() {
                Ghostlab.state.isSendingKeyScrollingEvent = !1
            }, Ghostlab.Constants.EVENT_RESET_TIMEOUT)),
            Ghostlab.broadcastEvent({
                event: a.type,
                selector: Ghostlab.DOMHelpers.buildSelector(b),
                keys: {
                    ctrlKey: a.ctrlKey,
                    altKey: a.altKey,
                    shiftKey: a.shiftKey,
                    metaKey: a.metaKey,
                    keyCode: a.keyCode,
                    charCode: a.charCode
                },
                value: c,
                scrollDest: d,
                toClientId: b.attr("data-ghostlab-2cid") || void 0
            }, b)
        }
    };
    Ghostlab.DOMEvents.keydown = new Ghostlab.DOMEvent("keydown",a),
    Ghostlab.DOMEvents.keyup = new Ghostlab.DOMEvent("keyup",a);
    var b = function(a) {
        return !(9 === a || 27 === a || 16 <= a && a <= 20 || 144 === a || 33 <= a && a <= 40 || 45 === a)
    };
    Ghostlab.Events.keydown = {
        init: function() {
            Ghostlab.DOMEvents.keydown.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId && (Ghostlab.UIHelpers.simulateKeyDown(Ghostlab.jQuery(a.selector), a.keys),
            35 === a.keys.keyCode || 36 === a.keys.keyCode)) {
                var b = 0;
                "bottom" === a.scrollDest && (b = Ghostlab.$document.height()),
                Ghostlab.jQuery("body").animate({
                    scrollTop: b
                }, 20)
            }
        }
    },
    Ghostlab.Events.keyup = {
        init: function() {
            Ghostlab.DOMEvents.keyup.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            if (a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId) {
                var c = Ghostlab.jQuery(a.selector);
                Ghostlab.UIHelpers.simulateKeyUp(c, a.keys),
                void 0 !== a.value && null !== a.value && (c.is("input") || c.is("textarea")) && b(a.keys.keyCode) && c.val(a.value)
            }
        }
    }
}(),
/**
 * 
 */
function() {
    var a = !1
      , b = function() {
        var a, b = !1;
        try {
            if (window.localStorage) {
                window.localStorage.setItem("____local_storage_test____", 123),
                window.localStorage.removeItem("____local_storage_test____");
                var a = window.localStorage.getItem("__ghostlab_customDeviceName")
            } else
                b = !0
        } catch (a) {
            b = !0
        }
        b && (a = Ghostlab.CookieHelpers.readCookie("__ghostlab_customDeviceName"));
        try {
            return (a ? JSON.parse(a) : {})[Ghostlab.state.myId] || void 0
        } catch (a) {}
    };
    Ghostlab.BuiltInEvents.login = {
        receive: function(c) {
            var d = Ghostlab.SessionStorage.get("clientId");
            void 0 === d ? (Ghostlab.state.myId = c,Ghostlab.SessionStorage.set("clientId", c)) : Ghostlab.state.myId = d,

            Ghostlab.CookieHelpers.createCookie("__areion_clientId", Ghostlab.state.myId);
            var e = Ghostlab.SessionStorage.get("syncedPageLoad")
              , f = Ghostlab.SessionStorage.get("click");
            Ghostlab.SessionStorage.set({
                syncedPageLoad: !1,
                click: !1
            }),
            Ghostlab.state.socket.emit("login", {
                clientId: Ghostlab.state.myId,
                frameId: Ghostlab.state.frameId,
                isMainFrame: Ghostlab.state.isMainFrame,
                customName: b(),
                href: location.href,
                isPageLoad: !a && !1 === e && !0 !== f && Ghostlab.config.broadcastEvents && "POST" !== Ghostlab.config.requestMethod && Ghostlab.state.isMainFrame,
                updateHrefIfNeeded: a,
                screenResolution: {
                    width: screen.width,
                    height: screen.height
                },
                windowBounds: {
                    x: window.screenX || 0,
                    y: window.screenY || 0,
                    width: Ghostlab.UIHelpers.getWindowWidth(),
                    height: Ghostlab.UIHelpers.getWindowHeight()
                },
                windowName: Ghostlab.SessionStorage.get("name")
            }),
            a = !1,
            Ghostlab.jQuery.ajax({
                url: "/____clientindex____?" + Ghostlab.state.myId,
                method: "GET",
                dataType: "json"
            }).done(function(a) {
                Ghostlab.state.myIndex = a,
                Ghostlab.SpecialStrings.setQuickFillData()
            }),
            1 === Ghostlab.state.reloadInspectorSent && (Ghostlab.state.reloadInspectorSent = 2,
            Ghostlab.state.socket.emit("event", {
                event: "reload-inspector",
                clientId: Ghostlab.state.myId,
                frameId: Ghostlab.state.frameId
            }),
            setTimeout(Ghostlab.Overrides.Console.sendBufferedMessages, 500))
        }
    },
    Ghostlab.BuiltInEvents.reconnect = {
        receive: function(b) {
            a = !0
        }
    },
    Ghostlab.Events.config = {
        receive: function(a) {
            for (var b = !1, c = !1, d = Ghostlab.config.broadcastEvents, e = a.options.length, f = 0; f < e; f++) {
                var g = a.options[f].name;
                switch (Ghostlab.config[g] = a.options[f].value,
                g) {
                case "quickFillShortcuts":
                case "quickFillJavascriptCodes":
                    b = !0;
                    break;
                case "formFillSelectors":
                case "formFillJavascriptCodes":
                    c = !0;
                    break;
                case "quickFillData":
                    Ghostlab.SpecialStrings.setQuickFillData();
                    break;
                case "rewriteBlockingBoxes":
                    Ghostlab.Overrides.BlockingBoxes.init();
                    break;
                case "broadcastEvents":
                    var h = Ghostlab.config.broadcastEvents;
                    if (d !== h) {
                        Ghostlab.overrideHandlers();
                        for (var i in Ghostlab.DOMEvents)
                            Ghostlab.DOMEvents[i].enable(h)
                    }
                    Ghostlab.SessionStorage.set("broadcastEvents", h);
                    break;
                case "receiveEvents":
                    Ghostlab.SessionStorage.set("receiveEvents", Ghostlab.config.receiveEvents);
                    break;
                case "formFillTriggerKey":
                    Ghostlab.SpecialStrings.setFormFillTriggerKey();
                    break;
                case "inspectorEnabled":
                    Ghostlab.config.inspectorEnabled && Ghostlab.enableInspector();
                    break;
                case "observeDOM":
                    Ghostlab.config.observeDOM && Ghostlab.startObservingDOM()
                }
            }
            b && Ghostlab.SpecialStrings.parseQuickFillOptions(),
            c && Ghostlab.SpecialStrings.parseFormFillOptions()
        }
    },
    Ghostlab.Events.setDeviceName = {
        receive: function(a) {
            var b = !1;
            try {
                if (window.localStorage) {
                    var c = window.localStorage.getItem("__ghostlab_customDeviceName");
                    try {
                        names = c ? JSON.parse(c) : {}
                    } catch (a) {
                        names = {}
                    }
                    names[Ghostlab.state.myId] = a.name,
                    window.localStorage.setItem("__ghostlab_customDeviceName", JSON.stringify(names))
                } else
                    b = !0
            } catch (a) {
                b = !0
            }
            if (b) {
                var c = Ghostlab.CookieHelpers.readCookie("__ghostlab_customDeviceName");
                try {
                    names = c ? JSON.parse(c) : {}
                } catch (a) {
                    names = {}
                }
                names[Ghostlab.state.myId] = a.name,
                Ghostlab.CookieHelpers.createCookie("__ghostlab_customDeviceName", JSON.stringify(names), !1)
            }
        }
    },
    Ghostlab.BuiltInEvents.latency = {
        receive: function(a) {
            Ghostlab.state.socket.emit("latency")
        }
    }
}(),
/**
 * navigateTo
 */
Ghostlab.Events.navigateTo = {
    receive: function(a) {
        if (a.isDocumentRootChange && Ghostlab.CookieHelpers.deleteAllCookies(),
        void 0 === a.url) {
            if (void 0 !== a.restoreScroll && !0 === a.restoreScroll) {
                var b = Ghostlab.UIHelpers.getScrollPos();
                Ghostlab.CookieHelpers.createCookie("__areion_scrollPos", '{"x":' + b.x + ',"y":' + b.y + "}")
            }
            window.location.reload(!0)
        } else
            (Ghostlab.state.myId !== a.clientId || a.force) && Ghostlab.state.isMainFrame && (Ghostlab.SessionStorage.set("syncedPageLoad", !0),
            window.location.href = a.url)
    }
},

Ghostlab.Events.translateUrl = {
    receive: function() {
        Ghostlab.state.socket.emit("translateUrl", {
            clientId: Ghostlab.state.myId,
            url: location.href
        })
    }
},
/**
 * reloadFiles
 */
function() {
    var a = Ghostlab.config.documentRoot;
    "/" !== a[a.length - 1] && (a += "/");
    var b = Ghostlab.StringHelpers.isAbsoluteUrl(a)
      , c = "/";
    b && (c = Ghostlab.URLHelpers.parseUrl(a).pathname,
    "/" !== c[c.length - 1] && (c += "/")),
    Ghostlab.Events.reloadFiles = {
        receive: function(a) {
            var b = a.files
              , c = a.token
              , d = {}
              , e = {}
              , f = !1
              , g = {}
              , h = null
              , i = []
              , j = 0
              , k = function() {
                for (var a = b.length, c = 0; c < a; c++)
                    if (!d[b[c]])
                        return !1;
                return !0
            }
              , l = function() {
                Ghostlab.SessionStorage.set("click", !0),
                window.setTimeout(function() {
                    Ghostlab.SessionStorage.set("click", !1)
                }, 1e3),
                Ghostlab.Events.navigateTo.receive(a)
            }
              , m = function(a) {
                var b = void 0 === a ? -1 : Ghostlab.jQuery.inArray(a, i);
                b >= 0 && i.splice(b, 1),
                0 === i.length && (k() ? f ? u() : window.setTimeout(function() {
                    Ghostlab.jQuery("body").hide().show()
                }, 50) : l())
            }
              , n = function(a, b) {
                return void 0 === b && (b = a.indexOf("?")),
                a.indexOf("_rnd=") >= 0 ? a.replace(/_rnd=\d+/, "_rnd=" + c) : a + (b < 0 ? "?" : "&") + "_rnd=" + c
            }
              , o = function(a) {
                if (!a)
                    return null;
                for (var c = a.indexOf("?"), e = c < 0 ? a : a.substr(0, c), f = e.lastIndexOf("/"), g = f >= 0 ? e.substring(f + 1) : e, h = b.length, i = 0; i < h; i++) {
                    var j = b[i]
                      , k = j.lastIndexOf("/");
                    if (g === (k >= 0 ? j.substring(k + 1) : j))
                        return d[j] = !0,
                        n(a, c)
                }
                return null
            }
              , p = function(a) {
                return /url\s*\(/i.test(a) ? a.replace(/url\s*\(\s*['"]?([^'")]*)['"]?\s*\)/g, function(a, b) {
                    var c = o(b);
                    return c ? 'url("' + c + '")' : a
                }) : null
            }
              , q = function(a) {
                for (var b = Ghostlab.jQuery("[style*=" + a + "]"), c = b.length, d = 0; d < c; d++) {
                    var e = Ghostlab.jQuery(b[d])
                      , f = e.attr("style")
                      , g = p(f);
                    null !== g && g !== f && e.attr("style", g)
                }
            }
              , r = function(a) {
                var b = "function" == typeof a.getPropertyValue
                  , c = "function" == typeof a.getPropertyPriority
                  , d = "function" == typeof a.setProperty;
                if (b && d)
                    for (var e = a.length, f = 0; f < e; f++) {
                        var g = a[f]
                          , h = a[g]
                          , i = p(h);
                        null !== i && i !== h && a.setProperty(g, i, c ? a.getPropertyPriority(g) : "")
                    }
                else
                    for (var j in a) {
                        var h = a[j];
                        if (h && "cssText" !== j) {
                            var i = p(h);
                            null !== i && i !== h && (a[j] = i)
                        }
                    }
            }
              , s = function(a, b) {
                try {
                    var c = a.cssRules;
                    if (c)
                        for (var d = c.length, e = 0; e < d; e++) {
                            var f = c[e];
                            switch (f.type) {
                            case CSSRule.STYLE_RULE:
                                r(f.style);
                                break;
                            case CSSRule.IMPORT_RULE:
                                b.push({
                                    rule: f,
                                    parentRule: a,
                                    idx: e
                                });
                                break;
                            case CSSRule.MEDIA_RULE:
                            case 12:
                            case 13:
                                s(f, b)
                            }
                        }
                    else {
                        if (!(c = a.rules))
                            return;
                        for (var d = c.length, e = 0; e < d; e++)
                            r(c[e].style);
                        var g = a.imports;
                        for (d = g.length,
                        e = 0; e < d; e++)
                            b.push({
                                styleSheet: g[e],
                                parentRule: a
                            })
                    }
                } catch (a) {
                    console.error(a.stack)
                }
            }
              , t = function(a) {
                var b = [];
                s(a, b);
                for (var c = b.length, d = 0; d < c; d++) {
                    var g = b[d];
                    if (g.rule && "function" == typeof g.parentRule.insertRule) {
                        var h = g.rule.cssText
                          , k = ""
                          , l = ""
                          , n = h.replace(/(@import\s+(?:url\s*\()['"]?)([^'")]+)/g, function(a, b, c) {
                            return k = c,
                            l = o(c),
                            l ? b + l : a
                        });
                        n !== h ? (g.parentRule.insertRule(n, g.idx),
                        g.parentRule.deleteRule(g.idx + 1),
                        function(a) {
                            i.push(a),
                            window.setTimeout(function() {
                                var b = g.parentRule.cssRules;
                                b && t(b[g.idx]),
                                Ghostlab.Inspector && Ghostlab.Inspector.CSS.isEnabled() && Ghostlab.Inspector.CSS.replaceStyleSheet(k, l),
                                m(a)
                            }, 250)
                        }(j++)) : t(g.rule.styleSheet)
                    } else if (g.styleSheet) {
                        var p = g.styleSheet
                          , q = p.href;
                        if (null !== o(q)) {
                            for (var a = p, r = a.parentStyleSheet; null !== r; )
                                a = r,
                                r = a.parentStyleSheet;
                            a && (e[Ghostlab.URLHelpers.getResourceUrl(a.href)] = !0,
                            f = !0)
                        } else
                            t(p)
                    }
                }
            }
              , u = function() {
                for (var a = h || Ghostlab.jQuery("link[rel=stylesheet][href]"), b = a.length, c = 0; c < b; c++) {
                    var d = Ghostlab.jQuery(a[c])
                      , f = Ghostlab.StringHelpers.trim(d.attr("href"))
                      , i = Ghostlab.URLHelpers.getResourceUrl(f);
                    e[i] && void 0 === g[i] && d.attr("href", n(f))
                }
            };
            !function() {
                for (var a = document.images.length, b = 0; b < a; b++) {
                    var c = document.images[b]
                      , d = o(c.src);
                    d && (c.src = d)
                }
            }(),
            q("background"),
            q("border"),
            function() {
                var a = []
                  , b = []
                  , c = Ghostlab.jQuery("link[rel=stylesheet][href]");
                h = c;
                for (var d = c.length, e = 0; e < d; e++) {
                    var f = Ghostlab.jQuery(c[e])
                      , k = Ghostlab.StringHelpers.trim(f.attr("href"))
                      , n = o(k);
                    if (n) {
                        f.attr("href", n),
                        b.push(Ghostlab.URLHelpers.getResourceUrl(k));
                        var p = Ghostlab.URLHelpers.getResourceUrl(n);
                        a.push(p),
                        g[p] = !0
                    }
                }
                var q = document.styleSheets;
                for (d = q.length,
                e = 0; e < d; e++) {
                    var r = q[e];
                    r && (Ghostlab.jQuery.inArray(r.href, b) < 0 && t(r))
                }
                if (a.length > 0) {
                    var s = j++
                      , u = []
                      , v = 0
                      , w = function() {
                        for (var b = document.styleSheets, c = b.length, d = 0; d < c; d++) {
                            var e = b[d];
                            if (e) {
                                var f = Ghostlab.jQuery.inArray(e.href, a);
                                f >= 0 && (u.push(e),
                                a.splice(f, 1))
                            }
                        }
                        if (0 === a.length) {
                            for (c = u.length,
                            d = 0; d < c; d++)
                                t(u[d]);
                            m(s)
                        } else
                            ++v < 10 ? window.setTimeout(w, 100) : l()
                    };
                    i.push(s),
                    w()
                }
            }(),
            m()
        }
    }
}(),
/**
 * takeScreenshot
 */
function() {
    var a = {
        background: "#ffffff",
        type: "view",
        letterRendering: !0,
        proxy: "areion",
        backgroundColor: "#ffffff",
        foreignObjectRendering: !0,
        scale: 1
    }, 
    b = function(a) {
        if ("undefined" != typeof html2canvas)
            a();
        else {
            var b = document.createElement("script");
            b.src = location.protocol + "//" + location.host + "/" + Ghostlab.options.html2canvasScriptURL,
            b.onload = a;
            var c = document.head;
            if (!c) {
                var d = document.getElementsByTagName("head");
                c = d && d.length > 0 ? d[0] : document.body
            }
            c && c.appendChild(b)
        }
    }, 
    c = function() {
        var b = Ghostlab.saveCurrentPrototypeMethods();
        Ghostlab.restorePrototypeMethods(Ghostlab.state.originalPrototypeMethods),
        html2canvas(Ghostlab.jQuery("html")[0], a).then(function(c) {
            if (a.cancel)
                return void Ghostlab.restorePrototypeMethods(b);
            var d;
            try {
                d = c.toDataURL("image/jpeg", .96)
            } catch (a) {
                return console.error(a),
                Ghostlab.broadcastEvent({
                    event: "screenshot-data",
                    error: {
                        code: "ENODATA",
                        message: a.message
                    }
                }, void 0, !0),
                void Ghostlab.restorePrototypeMethods(b)
            }
            var e = d.indexOf(",");
            if (e >= 0)
                if (Ghostlab.ua.iOS && Ghostlab.ua.iOS >= 10.3)
                    for (var f = Math.ceil((d.length - e - 1) / 1e4), g = Math.random().toString(36).substr(2, 8), h = 0; h < f; h++)
                        !function(a, b) {
                            setTimeout(function() {
                                Ghostlab.broadcastEvent({
                                    event: "screenshot-data",
                                    width: c.width,
                                    height: c.height,
                                    image: a,
                                    seq: b,
                                    total: f,
                                    id: g
                                }, void 0, !0)
                            }, 250 * b)
                        }(d.substr(1e4 * h + e + 1, 1e4), h);
                else
                    Ghostlab.broadcastEvent({
                        event: "screenshot-data",
                        width: c.width,
                        height: c.height,
                        image: d.substr(e + 1)
                    }, void 0, !0);
            else
                Ghostlab.broadcastEvent({
                    event: "screenshot-data",
                    error: {
                        code: "ENODATA",
                        message: "The screenshot data couldn't be extracted"
                    }
                }, void 0, !0);
            Ghostlab.restorePrototypeMethods(b)
        }, function(a) {
            Ghostlab.broadcastEvent({
                event: "screenshot-data",
                error: {
                    code: "ENODATA",
                    message: a.toString()
                }
            }, void 0, !0),
            Ghostlab.restorePrototypeMethods(b)
        })
    };
    Ghostlab.Events.takeScreenshot = {
        receive: function() {
            Ghostlab.state.isMainFrame && (a.cancel = !1,
            "undefined" == typeof html2canvas ? b(c) : c())
        }
    },
    Ghostlab.Events.cancelScreenshot = {
        receive: function() {
            a.cancel = !0
        }
    }
}(),
/**
 * scroll
 */
function() {
    var a = Ghostlab.UIHelpers.throttle(function() {
        Ghostlab.state.isScrolling = !1
    }, Ghostlab.Constants.EVENT_RESET_TIMEOUT, !0)
    ,b = Ghostlab.UIHelpers.throttle(function(a) {
        if (!Ghostlab.state.isScrolling && !Ghostlab.state.isSendingKeyScrollingEvent) {
            var b = Ghostlab.jQuery(a.target)
              , c = Ghostlab.DOMHelpers.buildSelector(b)
              , d = a.target === document
              , e = void 0
              , f = void 0
              , g = void 0;
            d ? (e = Ghostlab.UIHelpers.getScrollPos(),
            f = Ghostlab.$document.height(),
            g = Ghostlab.UIHelpers.getWindowHeight()) : (e = Ghostlab.UIHelpers.getScrollPos(b),
            g = b.height(),
            f = b.prop("scrollHeight") || g);
            var h = Ghostlab.state.scrollStart[c]
              , i = 0
              , j = 0;
            if (h && (i = h.x,
            j = h.y),
            e.x === i && (e.y <= 0 || e.y + g >= f))
                return void Ghostlab.broadcastEvent({
                    event: "scroll",
                    selector: c,
                    scrollDest: e.y <= 0 ? "top" : "bottom"
                });
            var k = void 0
              , l = void 0
              , m = void 0
              , n = void 0
              , o = void 0
              , p = void 0;
            if (Ghostlab.state.didScroll = e.x !== i || e.y !== j,
            Ghostlab.state.didScroll) {
                switch (k = e.x - i,
                l = e.y - j,
                Ghostlab.config.scrollMode) {
                case "offset":
                case 1:
                    if (0 === k && 0 === l)
                        return;
                    break;
                case "element":
                case 0:
                    var q = Math.abs(k)
                      , r = Math.abs(l);
                    Math.min(q / r, r / q) < .1 && (p = q > r ? "x" : "y");
                    var s = Ghostlab.UIHelpers.findElement(b, e, Ghostlab.config.scrollModeElement, p);
                    if (null !== s) {
                        for (var t = s.element; t; t = t.parent())
                            if ((n = "x" === p ? t.width() : t.height()) > 0) {
                                m = Ghostlab.DOMHelpers.buildSelector(t);
                                break
                            }
                        m ? o = ("x" === p ? s.offset.left : s.offset.top) / n : (m = Ghostlab.DOMHelpers.buildSelector(s.element),
                        o = 0)
                    }
                    break;
                case "doc-relative":
                case 2:
                    var u = d ? Ghostlab.UIHelpers.getWindowWidth() : b.width()
                      , v = d ? Ghostlab.$document.width() : b.prop("scrollWidth") || u;
                    k = e.x / (v - u),
                    l = e.y / (f - g)
                }
                Ghostlab.broadcastEvent({
                    event: "scroll",
                    selector: c,
                    scrollDir: p,
                    scrollXOffset: k,
                    scrollYOffset: l,
                    referenceEltSelector: m,
                    eltSize: n,
                    scrollReferenceEltOffset: o
                })
            }
            Ghostlab.state.scrollStart[c] = e
        }
    }, 
    Ghostlab.Constants.FAST_EVENT_DELAY, !1, !0);
    Ghostlab.DOMEvents.scroll = new Ghostlab.DOMEvent("scroll",b,!1,!0),
    Ghostlab.Events.scroll = {
        init: function() {
            Ghostlab.ua.msie8 ? Ghostlab.DOMEvents.scroll.addTo(Ghostlab.$window) : Ghostlab.DOMEvents.scroll.addTo(Ghostlab.$document),
            Ghostlab.state.scrollStart.document = Ghostlab.UIHelpers.getScrollPos()
        },
        receive: function(b) {
            if (b.frameId === Ghostlab.state.frameId && b.clientId !== Ghostlab.state.myId) {
                Ghostlab.state.isScrolling = !0,
                a();
                var c = Ghostlab.DOMHelpers.fromSelector(b.selector)
                  , d = c[0] === document
                  , e = "x" === b.scrollDir
                  , f = e ? "x" : "y"
                  , g = e ? "left" : "top"
                  , h = e ? "width" : "height";
                if (b.scrollDest) {
                    var i = 0;
                    return "bottom" === b.scrollDest && (i = Ghostlab.$document.height()),
                    void (d ? Ghostlab.jQuery("html,body") : c).scrollTop(i)
                }
                if (b.referenceEltSelector) {
                    var j = Ghostlab.DOMHelpers.fromSelector(b.referenceEltSelector);
                    if (j.length > 0) {
                        var k = Ghostlab.UIHelpers.getScrollPos(d ? null : c)
                          , l = j[h]() || b.eltSize
                          , m = ("number" == typeof b.scrollReferenceEltOffset ? b.scrollReferenceEltOffset : 0) * l
                          , n = 0;
                        if (j.is(":visible"))
                            if (d || j[0] !== c[0]) {
                                var o, p = Ghostlab.config.scrollModeElement;
                                try {
                                    o = j.offset()[g] - (d ? 0 : c.offset()[g])
                                } catch (a) {
                                    return
                                }
                                var q = d ? Ghostlab.$window[h]() : c[h]()
                                  , r = 0;
                                "vcenter" === p || "hcenter" === p || 1 === p || 4 === p ? r = .5 : "bottom" !== p && "right" !== p && 2 !== p && 5 !== p || (r = 1),
                                n = o + (d ? 0 : k[f]) - m + r * (l - q)
                            } else
                                n = m;
                        else
                            n = k[f] + m;
                        var s = n - k[f];
                        return void ((Ghostlab.MathHelpers.sgn(b[e ? "scrollXOffset" : "scrollYOffset"]) === Ghostlab.MathHelpers.sgn(s) || Math.abs(s) > 500) && (d ? Ghostlab.jQuery("html,body") : c)[e ? "scrollLeft" : "scrollTop"](n))
                    }
                }
                if ("doc-relative" !== Ghostlab.config.scrollMode && 2 !== Ghostlab.config.scrollMode)
                    d ? window.scrollBy(b.scrollXOffset, b.scrollYOffset) : (k = Ghostlab.UIHelpers.getScrollPos(c),
                    c.scrollLeft(k.x + b.scrollXOffset),
                    c.scrollTop(k.y + b.scrollYOffset));
                else if (d) {
                    var t = Ghostlab.jQuery("html,body");
                    t.scrollLeft(b.scrollXOffset * (Ghostlab.$document.width() - Ghostlab.UIHelpers.getWindowWidth())),
                    t.scrollTop(b.scrollYOffset * (Ghostlab.$document.height() - Ghostlab.UIHelpers.getWindowHeight()))
                } else {
                    var u = c.width()
                      , v = c.height()
                      , w = c.prop("scrollWidth") || u
                      , x = c.prop("scrollHeight") || v;
                    c.scrollLeft(b.scrollXOffset * (w - u)),
                    c.scrollTop(b.scrollYOffset * (x - v))
                }
            }
        }
    }
}(),
/**
 * touchstart
 */
function() {
    var a = function(a) {
        if (!Ghostlab.UIHelpers.isSimulatedEvent(a)) {
            "touchstart" === a.type ? Ghostlab.state.touchStart = {
                x: a.originalEvent.touches[0].clientX,
                y: a.originalEvent.touches[0].clientY
            } : "touchmove" === a.type && (Ghostlab.state.didScroll || Ghostlab.broadcastEvent({
                event: "scroll",
                xOffset: 100 * Ghostlab.MathHelpers.sgn(Ghostlab.state.touchStart.x - a.originalEvent.touches[0].clientX),
                yOffset: 100 * Ghostlab.MathHelpers.sgn(Ghostlab.state.touchStart.y - a.originalEvent.touches[0].clientY)
            }));
            var b = Ghostlab.jQuery(a.currentTarget);
            Ghostlab.broadcastEvent({
                event: a.type,
                selector: Ghostlab.DOMHelpers.buildSelector(b),
                touches: a.originalEvent && Ghostlab.Converters.toTouchesArray(b, a.originalEvent.touches),
                targetTouches: a.originalEvent && Ghostlab.Converters.toTouchesArray(b, a.originalEvent.targetTouches),
                changedTouches: a.originalEvent && Ghostlab.Converters.toTouchesArray(b, a.originalEvent.changedTouches)
            }, b)
        }
    };
    Ghostlab.DOMEvents.touchstart = new Ghostlab.DOMEvent("touchstart",a),
    Ghostlab.DOMEvents.touchend = new Ghostlab.DOMEvent("touchend",a),
    Ghostlab.DOMEvents.touchmove = new Ghostlab.DOMEvent("touchmove",Ghostlab.UIHelpers.throttle(a, Ghostlab.Constants.FAST_EVENT_DELAY, !1));
    var b = function(a, b) {
        if (b.selector && b.frameId === Ghostlab.state.frameId && b.clientId !== Ghostlab.state.myId) {
            var c = Ghostlab.jQuery(b.selector);
            Ghostlab.UIHelpers.simulateTouchEvent(a, c, b.touches, b.targetTouches, b.changedTouches)
        }
    };
    Ghostlab.Events.touchstart = {
        init: function() {
            Ghostlab.DOMEvents.touchstart.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            b("touchstart", a)
        }
    },
    Ghostlab.Events.touchend = {
        init: function() {
            Ghostlab.DOMEvents.touchend.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            b("touchend", a)
        }
    },
    Ghostlab.Events.touchmove = {
        init: function() {
            Ghostlab.DOMEvents.touchmove.addTo(Ghostlab.$document)
        },
        receive: function(a) {
            b("touchmove", a)
        }
    }
}(),
/**
 * wheel
 */
function() {
    var a = function(a) {
        if (!Ghostlab.UIHelpers.isSimulatedEvent(a)) {
            var b = Ghostlab.jQuery(a.target)
              , c = a.originalEvent
              , d = Ghostlab.Converters.toRelative(b.parent(), a.clientX, a.clientY);
            Ghostlab.broadcastEvent({
                event: "wheel",
                selector: Ghostlab.DOMHelpers.buildSelector(b),
                clientX: d.x,
                clientY: d.y,
                deltaX: c.deltaX,
                deltaY: c.deltaY,
                deltaZ: c.deltaZ,
                deltaMode: c.deltaMode
            }, b)
        }
    };
    Ghostlab.DOMEvents.wheel = new Ghostlab.DOMEvent("wheel",a),
    Ghostlab.DOMEvents.mousewheel = new Ghostlab.DOMEvent("mousewheel",a),
    Ghostlab.Events.wheel = {
        receive: function(a) {
            a.selector && a.frameId === Ghostlab.state.frameId && a.clientId !== Ghostlab.state.myId && Ghostlab.UIHelpers.simulateWheel(Ghostlab.jQuery(a.selector), a.clientX, a.clientY, a.deltaX, a.deltaY, a.deltaZ, a.deltaMode)
        }
    }
}(),
/**
 * openWindows
 */
Ghostlab.Events.openWindows = {
    receive: function(a) {
        var b = location.href.split("#")[0]
          , c = a.windows.length
          , d = window.chrome ? 366 : 0
          , e = Ghostlab.CookieHelpers.readCookie("__areion_clientId")
          , f = Ghostlab.SessionStorage.get("clientId");
        Ghostlab.CookieHelpers.deleteCookie("__areion_clientId"),
        Ghostlab.SessionStorage.set("clientId", void 0);
        var g = function() {
            window.stop(),
            window.setTimeout(function() {
                Ghostlab.jQuery("html").html('<head><title>Ghostlab Workspace</title></head><body style="font: 14px \'Helvetica Neue\',Helvetica,Arial,sans-serif; background-color: #fafafa;"><div style="padding: 80px; padding: 5rem; max-width: 50%;"><h1 style="font-size: 39px; line-height: 1.4; font-weight: normal; font-style: normal; color: #48484a; margin-top: 3px; margin-bottom: 8px; text-transform: none;">Oops.<small style="font-size: 50%; color: #949494; line-height: 0;">&nbsp;Ghostlab Workspace</small></h1><p style="font-family: inherit; font-weight: normal; font-size: 16px; line-height: 1.6; margin-bottom: 17px;">For the Workspace feature to work, you must enable popups for this domain (' + location.hostname + ").</p></div></body>")
            }, 1e3)
        }
          , h = function(i) {
            var j = "left=" + a.windows[i].x + ",top=" + a.windows[i].y + ",width=" + a.windows[i].width + ",height=" + a.windows[i].height + ",location=0,menubar=yes,resizable=yes,scrollbars=yes,status=yes"
              , k = a.windows[i].name
              , l = window.open(b, k, j);
            0 !== i || l && !l.closed && void 0 !== l.closed ? i === c - 1 ? (Ghostlab.CookieHelpers.createCookie("__areion_clientId", e, !0),
            Ghostlab.SessionStorage.set("clientId", f),
            a.onSuccess && a.onSuccess()) : window.setTimeout(h, d, i + 1) : g()
        };
        h(0)
    }
},
Ghostlab.Events.moveWindows = {
    receive: function(a) {
        if (!Ghostlab.state.preventResizeHandling)
            for (var b = a.windows.length, c = 0; c < b; c++)
                if (a.windows[c].name === Ghostlab.SessionStorage.get("workspaceName")) {
                    window.moveTo(a.windows[c].x - Ghostlab.state.screenXOffset, a.windows[c].y - Ghostlab.state.screenYOffset),
                    Ghostlab.UIHelpers.resizeWindow(a.windows[c].width, a.windows[c].height);
                    break
                }
    }
},
Ghostlab.Events.closeWindows = {
    receive: function(a) {
        for (var b = a.windows.length, c = 0; c < b; c++)
            if (a.windows[c].name === Ghostlab.SessionStorage.get("workspaceName")) {
                window.close();
                break
            }
    }
},
Ghostlab.Events.assignWindowName = {
    receive: function(a) {
        Ghostlab.SessionStorage.set("name", a.name)
    }
},
Ghostlab.Events.updateWindowBounds = {
    receive: function(a) {
        Ghostlab.UIHelpers.emitResize(!1)
    }
},
Ghostlab.Events.resize = {
    init: function() {
        Ghostlab.$window.resize(Ghostlab.UIHelpers.throttle(function() {
            Ghostlab.state.preventResizeHandling || (Ghostlab.UIHelpers.emitResize(!0),
            Ghostlab.state.didJustResizeTimeout && window.clearTimeout(Ghostlab.state.didJustResizeTimeout),
            Ghostlab.state.didJustResize = !0,
            Ghostlab.state.didJustResizeTimeout = setTimeout(function() {
                Ghostlab.state.didJustResize = !1
            }, 3e3))
        }, 100, !0))
    }
},
Ghostlab.Events.movedTo = {
    init: function() {
        if (window.name && 0 === window.name.indexOf("window-")) {
            var a = window.screenX
              , b = window.screenY;
            Ghostlab.state.preventResizeHandling = !0,
            window.moveTo(a, b),
            Ghostlab.state.screenXOffset = window.screenX - a,
            Ghostlab.state.screenYOffset = window.screenY - b,
            0 === Ghostlab.state.screenXOffset && 0 === Ghostlab.state.screenYOffset || window.moveTo(a - Ghostlab.state.screenXOffset, b - Ghostlab.state.screenYOffset),
            window.setTimeout(function() {
                Ghostlab.state.preventResizeHandling = !1
            }, 800);
            var c = {
                x: window.screenX,
                y: window.screenY
            };
            setInterval(function() {
                if (!Ghostlab.state.didJustResize) {
                    window.screenX,
                    window.screenY;
                    window.screenX === c.x && window.screenY === c.y || (c.x = window.screenX,
                    c.y = window.screenY,
                    Ghostlab.UIHelpers.emitResize(!0))
                }
            }, 667)
        }
    }
},
/**
 * start , find =====================================================
 */
Ghostlab.start = function() {
    Ghostlab.$document = Ghostlab.jQuery(document),
    Ghostlab.$window = Ghostlab.jQuery(window),
    Ghostlab.state.isMainFrame = Ghostlab.isMainFrame(),
    // 从SessionStorage获取参数覆盖Ghostlab.config
    Ghostlab.overwriteOptions(),
    // 拿到useragent，挂在Ghostlab.ua
    Ghostlab.sniffUserAgent(),
    // 删除cookie，设置__areion_lastDocRoot
    Ghostlab.resetCookies();
    /**
     * Ghostlab.Overrides = {
     *      BlockingBoxes, Console, Event, IndexedDB, WebSQL, XHR 
     * }
     * 调用各自的init方法
     */
    for (var a in Ghostlab.Overrides)
        "function" == typeof Ghostlab.Overrides[a].init && Ghostlab.Overrides[a].init();
    /**
     * 
     */
    var b = Ghostlab.state.isMainFrame ? location.hash.indexOf("__ghostlab:") : -1;
    !Ghostlab.ua.msie8 && !Ghostlab.ua.msie9 && b < 0 && Ghostlab.connect(),

    Ghostlab.init(),
    Ghostlab.$document.ready(Ghostlab.ready),
    Ghostlab.initWorkspace(b),
    Ghostlab.SpecialStrings.parseOptions();
    var c = window.name
      , d = c.indexOf("//");
    d >= 0 && (c = c.substr(0, d)),
    Ghostlab.SessionStorage.set("name", c),
    Ghostlab.state.isMainFrame && Ghostlab.SessionStorage.set("workspaceName", c)
},
/**
 * sniffUserAgent
 */
Ghostlab.sniffUserAgent = function() {
    var a = navigator.userAgent;
    if (Ghostlab.ua.msie = a.indexOf("MSIE") >= 0,
    Ghostlab.ua.msie8 = a.indexOf("MSIE 8.0") >= 0,
    Ghostlab.ua.msie9 = a.indexOf("MSIE 9.0") >= 0,
    Ghostlab.ua.opera = "[object Opera]" === {}.toString.call(window.opera),
    / Android/.test(a)) {
        var b = a.match(/Android ([^\s]*);/);
        b && b[1] && (Ghostlab.ua.android = function(a) {
            var b = 0;
            return parseFloat(a.replace(/\./g, function() {
                return 1 == b++ ? "" : "."
            }))
        }(b[1]))
    }
    Ghostlab.ua.iOS = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || void 0,
    /Silk/.test(a) && (Ghostlab.ua.android || (Ghostlab.ua.android = 2.34)),
    Ghostlab.features.hasOnlyTouch = Ghostlab.features.hasTouch && Ghostlab.features.isMobile
},
/**
 * 从SessionStorage获取参数覆盖Ghostlab.config
 */
Ghostlab.overwriteOptions = function() {
    for (var a in Ghostlab.config) {
        var b = Ghostlab.SessionStorage.get(a);
        void 0 !== b && (Ghostlab.config[a] = b)
    }
},
/**
 * 删除cookie，设置__areion_lastDocRoot
 */
Ghostlab.resetCookies = function() {
    if (window.localStorage)
        try {
            var a = window.localStorage.getItem("__areion_lastDocRoot");
            a && a !== Ghostlab.config.documentRoot && Ghostlab.CookieHelpers.deleteAllCookies(),
            a && a === Ghostlab.config.documentRoot || window.localStorage.setItem("__areion_lastDocRoot", Ghostlab.config.documentRoot)
        } catch (a) {}
},
/**
 * 发请求, 建立socket链接
 */
Ghostlab.connect = function() {
    var a = location.protocol;
    if ("http:" === a || "https:" === a) {
        Ghostlab.state.frameId = Ghostlab.getFrameId(),
        Ghostlab.CookieHelpers.createCookie("__areion_frameId", Ghostlab.state.frameId);
        var b = a + "//";
        Ghostlab.config.commHost ? b += Ghostlab.config.commHost : b += location.hostname && location.hostname.length > 0 ? location.hostname : "localhost",
        Ghostlab.config.commPort ? b += ":" + Ghostlab.config.commPort : b = a + "//" + location.host,
        //该处会初始化 transport
        Ghostlab.state.socket = io(b),
        Ghostlab.state.socket.io.timeout = 1e12,
        Ghostlab.state.socket.io.reconnectionDelay = function() {
            return 1e3
        }
        ,
        Ghostlab.state.socket.io.reconnectionDelayMax = function() {
            return 1e3
        }
        ,
        Ghostlab.state.socket.on("event", function(a) {
            if (Ghostlab.config.receiveEvents || Ghostlab.options.alwaysReceiveEventNames && Ghostlab.options.alwaysReceiveEventNames[a.event]) {
                var b = Ghostlab.Events[a.event];
                b && b.receive && b.receive(a)
            }
        });
        /**
         * 初始化BuiltInEvents
         * Ghostlab.BuiltInEvents = {
         *      latency, login, reconnect
         * }
         */
        for (var c in Ghostlab.BuiltInEvents)
            Ghostlab.BuiltInEvents[c].receive && Ghostlab.state.socket.on(c, Ghostlab.BuiltInEvents[c].receive)
    }
},
function() {
    var _ignoreEvents = {}
      , registerIgnoreEvent = function(a) {
        return function(b) {
            void 0 === _ignoreEvents[a] ? _ignoreEvents[a] = [b] : _ignoreEvents[a].push(b)
        }
    };
    Ghostlab.ignoreEvent = function(a, b) {
        if (void 0 === _ignoreEvents[a])
            return !1;
        for (var c = _ignoreEvents[a].length, d = 0; d < c; d++) {
            var e = _ignoreEvents[a][d];
            if ("string" == typeof e) {
                if (b.is(e))
                    return !0
            } else if ("function" == typeof e && e(b))
                return !0
        }
        return !1
    },
    Ghostlab.saveCurrentPrototypeMethods = function() {
        var a = {
            Array: ["filter", "map"]
        }
          , b = {};
        for (var c in a) {
            var d = a[c]
              , e = d.length;
            b[c] = {};
            for (var f = 0; f < e; f++)
                b[c][d[f]] = window[c].prototype[d[f]]
        }
        return b
    },
    Ghostlab.restorePrototypeMethods = function(a) {
        for (var b in a)
            for (var c in a[b])
                window[b].prototype[c] = a[b][c]
    },
    Ghostlab.init = function() {
        Ghostlab.state.originalPrototypeMethods = Ghostlab.saveCurrentPrototypeMethods();
        for (var a in Ghostlab.Events)
            Ghostlab.Events[a].init && Ghostlab.Events[a].init(),
            Ghostlab.Events[a].ignore = registerIgnoreEvent(a);
        for (var b in Ghostlab.Overrides)
            "function" == typeof Ghostlab.Overrides[b].afterInit && Ghostlab.Overrides[b].afterInit();
        Ghostlab.$window.on("beforeunload", function() {
            Ghostlab.state.socket.emit("unload", {
                href: Ghostlab.URLHelpers.getAbsolutePath(location.pathname)
            }),
            Ghostlab.state.socket.socket && Ghostlab.state.socket.socket.transport && Ghostlab.state.socket.socket.transport.name && "websocket" === Ghostlab.state.socket.socket.transport.name || Ghostlab.state.socket.emit("disconnect"),
            Ghostlab.CookieHelpers.createCookie("__areion_clientId", Ghostlab.state.myId)
        })
    }
    ,
    Ghostlab.ready = function() {
        Ghostlab.Inspector && Ghostlab.Inspector.init(),
        Ghostlab.config.inspectorEnabled && Ghostlab.enableInspector();
        var posJson = Ghostlab.CookieHelpers.readCookie("__areion_scrollPos");
        if (posJson) {
            var pos = eval("(" + posJson + ")");
            void 0 !== pos.x && void 0 !== pos.y && (Ghostlab.state.isScrolling = !0,
            window.scrollTo(pos.x, pos.y),
            window.setTimeout(function() {
                Ghostlab.state.isScrolling = !1
            }, 500)),
            Ghostlab.CookieHelpers.createCookie("__areion_scrollPos", "")
        }
    }
}(),

Ghostlab.broadcastEvent = function(a, b, c) {
    if ((c || Ghostlab.config.broadcastEvents && null !== Ghostlab.state.socket) && (void 0 === b || !Ghostlab.ignoreEvent(a.event, b)))
        if (a.frameId = Ghostlab.state.frameId,
        a.toClientId && a.toClientId === Ghostlab.state.myId) {
            var d = Ghostlab.Events[a.event];
            d && d.receive && (a.clientId = void 0,
            d.receive(a))
        } else
            a.clientId = Ghostlab.state.myId,
            Ghostlab.state.socket.emit("event", a)
},

Ghostlab.initWorkspace = function(a) {
    var b = function() {
        location.href = "about:blank",
        window.opener = "x",
        window.close()
    };
    if (!(a < 0)) {
        var c = location.hash.substr(a + "__ghostlab:".length);
        if (!c)
            return void b();
        var d = c.split(",");
        if (0 === d.length)
            return void b();
        for (var e = [], f = d.length, g = 0; g < f; g += 5)
            e.push({
                x: d[g],
                y: d[g + 1],
                width: d[g + 2],
                height: d[g + 3],
                name: d[g + 4]
            });
        Ghostlab.Events.openWindows.receive({
            windows: e,
            onSuccess: b
        })
    }
},

Ghostlab.enableInspector = function() {
    if (!Ghostlab.Inspector && Ghostlab.options.inspectorScriptURL) {
        var a = document.createElement("script");
        a.src = location.protocol + "//" + location.host + "/" + Ghostlab.options.inspectorScriptURL,
        a.onload = function() {
            Ghostlab.Inspector.init()
        }
        ;
        var b = document.head;
        if (!b) {
            var c = document.getElementsByTagName("head");
            b = c && c.length > 0 ? c[0] : document.body
        }
        b && b.appendChild(a)
    }
},

Ghostlab.getFrameId = function(a) {
    var b = "";
    for (a || (a = window); a != a.parent && a; ) {
        for (var c = a.parent.frames.length, d = 0; d < c; d++)
            if (a.parent.frames[d] == a) {
                b += d + "-";
                break
            }
        a = a.parent
    }
    return b = b.substr(0, b.length - 1)
},

Ghostlab.isMainFrame = function() {
    if (parent == window)
        return !0;
    try {
        if (parent.location.host !== location.host && (!window.frameElement || window.frameElement.src))
            return !0
    } catch (a) {
        return !0
    }
    return !1
},

Ghostlab.overrideHandlers = function() {
    if (!Ghostlab.state.handlersOverridden) {
        Ghostlab.state.handlersOverridden = !0;
        var a = Ghostlab.jQuery("*")
          , b = 0
          , c = function() {
            for (var d = Math.min(b + 50, a.length), e = b; e < d; e++) {
                var f = a[e];
                Ghostlab.Overrides.Event.overrideOnHandlers(f),
                Ghostlab.Overrides.Event.overrideAttachEvent(f)
            }
            (b = d) < a.length && window.setTimeout(c, 10)
        };
        c()
    }
},

Ghostlab.start();

try {
    ($ in window) && void 0 === window.$ && delete window.$
} catch (a) {}
