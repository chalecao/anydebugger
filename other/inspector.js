!function() {
    var a = "http://" + (location.hostname && location.hostname.length > 0 ? location.hostname : "localhost") + ":" + Ghostlab.config.frontendPort + "/jsdbg"
      , b = !1
      , c = []
      , d = function(d, g) {
        if ("prerender" !== document.visibilityState) {
            var h = function() {
                if (void 0 === Ghostlab.state.myId || Ghostlab.state.myId < 0)
                    return void (Ghostlab.Inspector.executionPaused ? window.setTimeout(h, 200) : c.push(d));
                if (!b)
                    return void c.push(d);
                void 0 === d.clientId && (d.clientId = Ghostlab.state.myId),
                void 0 === d.frameId && (d.frameId = Ghostlab.state.frameId);
                var i = !1
                  , j = void 0;
                !g && Ghostlab.ua.iOS && Ghostlab.ua.iOS >= 10.3 && (j = JSON.stringify(d),
                j.length >= 1e4 && (i = !0)),
                Ghostlab.Inspector.executionPaused || g || i ? Ghostlab.jQuery.ajax({
                    url: a,
                    method: "POST",
                    data: j || JSON.stringify(d),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    processData: !1,
                    async: i,
                    success: function(a) {
                        a.timeout ? h() : e(a, !1)
                    },
                    error: f
                }) : (d.event = "inspect",
                Ghostlab.state.socket.emit("event", d))
            };
            h()
        }
    }
      , e = function(a) {
        if (void 0 !== a.method) {
            var b = a.method.split(".")
              , c = b[0]
              , e = b[1]
              , f = Ghostlab.Inspector[c];
            if (f && f[e]) {
                var g = function(b) {
                    void 0 !== a.id && (b.id = a.id),
                    d(b)
                };
                try {
                    var h = f[e](a.params, g);
                    if (void 0 !== h || Ghostlab.Inspector.executionPaused) {
                        var i = null;
                        i = "object" == typeof h ? {
                            result: h
                        } : {},
                        g(i)
                    }
                } catch (a) {
                    a.stack && Ghostlab.log(a.stack),
                    g({
                        error: (a.message || "") + "\n" + (a.stack || ""),
                        result: {
                            result: null,
                            wasThrown: !0
                        }
                    })
                }
            }
        }
    }
      , f = function(a, b, c) {
        Ghostlab.log(c)
    };
    Ghostlab.jQuery.support.cors = !0,
    Ghostlab.Inspector = {
        init: function() {
            Ghostlab.options.alwaysReceiveEventNames.inspect || (Ghostlab.options.alwaysReceiveEventNames.inspect = !0);
            for (var a in Ghostlab.Inspector) {
                var b = Ghostlab.Inspector[a];
                "object" == typeof b && "function" == typeof b.init && b.init()
            }
            Ghostlab.state.socket && -1 !== Ghostlab.state.myId && 2 !== Ghostlab.state.reloadInspectorSent ? (Ghostlab.state.reloadInspectorSent = 2,
            Ghostlab.state.socket.emit("event", {
                event: "reload-inspector",
                clientId: Ghostlab.state.myId,
                frameId: Ghostlab.state.frameId
            }),
            setTimeout(Ghostlab.Overrides.Console.sendBufferedMessages, 500)) : Ghostlab.state.reloadInspectorSent = 1
        },
        sendEvent: function(a, b, c, e) {
            void 0 === b && (b = {}),
            b.method = a,
            b.blocking = !!c,
            d(b, e)
        },
        flushPendingEvents: function() {
            b = !0;
            for (var a = 0; a < c.length; a++)
                d(c[a], !1);
            c = []
        },
        getElementForNodeId: void 0,
        getPseudoForNodeId: void 0,
        getNodeId: void 0,
        elementBelongsToFrame: void 0,
        getExecutionContextId: void 0,
        executionPaused: !1
    },
    Ghostlab.Events.inspect = {
        receive: function(a) {
            e(a, !0)
        }
    }
}(),
function() {
    var a = !1
      , b = !1
      , c = "function" == typeof window.getComputedStyle
      , d = 1
      , e = {}
      , f = 0
      , g = null
      , h = []
      , i = []
      , j = null
      , k = null
      , l = {}
      , m = !1
      , n = function(a, b) {
        if (b in a)
            return b;
        var c = b.charAt(0).toUpperCase() + b.substr(1)
          , d = "webkit" + c;
        return d in a ? d : (d = "moz" + c)in a ? d : (d = "o" + c,
        d in a ? d : void 0)
    }
      , o = function(a, b) {
        if (b in a)
            return "" !== a[b];
        var c = b.charAt(0).toUpperCase() + b.substr(1)
          , d = "webkit" + c;
        if (d in a)
            return "" !== a[d];
        var e = "moz" + c;
        if (e in a)
            return "" !== a[e];
        var f = "o" + c;
        return f in a && "" !== a[f]
    }
      , p = function(a, b) {
        var c = a && n(a, b);
        if (!c)
            return [];
        var d = a[c];
        if (!d)
            return [];
        var e = d.replace(/\s*!important\s*/gi, "").split(/\s*,\s*/);
        if (!/TimingFunction$/.test(b))
            return e;
        for (var f = [], g = e.length, h = 0; h < g; h++) {
            var i = e[h];
            /^cubic-bezier/.test(i) ? (f.push(i + "," + e[h + 1] + "," + e[h + 2] + "," + e[h + 3]),
            h += 3) : f.push(i)
        }
        return f
    }
      , q = function(a, b, c) {
        var d = n(a, b);
        d && (a[d] = Ghostlab.jQuery.isArray(c) ? c.join(",") : c)
    }
      , r = function(a, b, c) {
        var d = p(a, c ? "animationName" : "transitionProperty");
        return Ghostlab.jQuery.inArray(b, d)
    }
      , s = function(a) {
        for (var b = [], d = [], f = [], g = [], h = [], i = [], j = [], k = [], l = c ? a.length : 0, m = 0; m < l; m++) {
            var n = e[a[m]];
            if (n) {
                var o = n.node
                  , q = Ghostlab.jQuery.inArray(o, b);
                if (q < 0) {
                    q = b.length;
                    var r = window.getComputedStyle(o, n.pseudo);
                    if (!r)
                        continue;
                    b.push(o),
                    d.push(n.pseudoStyle),
                    f.push(r),
                    g.push([]),
                    i.push([]),
                    k.push([]),
                    h.push(p(r, "animationName")),
                    j.push(p(r, "transitionProperty"))
                }
                g[q].push(a[m]),
                n.isAnimation ? i[q].push(Ghostlab.jQuery.inArray(n.name, h[q])) : k[q].push(Ghostlab.jQuery.inArray(n.name, j[q]))
            }
        }
        return {
            nodes: b,
            pseudoStyles: d,
            styles: f,
            animationIds: g,
            animationIndices: i,
            transitionIndices: k
        }
    }
      , t = function(a, b, c) {
        for (var d = a.length - 1; d >= 0; d--) {
            var e = a[d].rule.style;
            if (r(e, b, c) >= 0)
                return e
        }
    }
      , u = function(a) {
        for (var b = a.length, c = 0; c < b; c++) {
            var d = a[c];
            switch (d.type) {
            case 1:
                var e = d.style;
                (o(e, "animationName") || o(e, "transitionProperty")) && g.push(e);
                break;
            case 3:
                u(d.styleSheet.cssRules);
                break;
            case 4:
            case 12:
            case 13:
                u(d.cssRules)
            }
        }
    }
      , v = function(a) {
        return /ms\s*$/.test(a) ? parseFloat(a) : 1e3 * parseFloat(a)
    }
      , w = function(a) {
        var b = [];
        if (!a)
            return b;
        for (var c = a.length, d = 0; d < c; d++)
            b.push(v(Ghostlab.StringHelpers.trim(a[d])));
        return b
    }
      , x = function(a, b) {
        if (!a)
            return a;
        for (var c = a.length, d = 0; d < c; d++)
            a[d] = (void 0 === b ? a[d] : a[d] * b) + "ms";
        return a
    }
      , y = function(a, b) {
        var c = d / b;
        q(a, "animationDuration", x(w(p(a, "animationDuration")), c)),
        q(a, "animationDelay", x(w(p(a, "animationDelay")), c)),
        q(a, "transitionDuration", x(w(p(a, "transitionDuration")), c)),
        q(a, "transitionDelay", x(w(p(a, "transitionDelay")), c))
    }
      , z = function(a, b, c, d, f, g, h) {
        var i = f.length;
        if (0 !== i) {
            var j = a.parentNode;
            if (j) {
                for (var k = p(c, "animationDelay"), l = p(c, "animationIterationCount"), m = p(c, "animationDuration"), n = p(c, "animationDirection"), o = p(c, "animationFillMode"), r = p(c, "animationTimingFunction"), s = (new Date).getTime(), t = 0; t < i; t++) {
                    var u = f[t]
                      , v = e[d[t]];
                    v && (v.lastStartTime = s - h,
                    v.seekTime = h,
                    k[u] = g * (v.delay - h) + "ms",
                    l[u] = v.iterations,
                    m[u] = v.duration + "ms",
                    n[u] = v.direction,
                    o[u] = v.fill,
                    r[u] = v.easing)
                }
                var w = b || a.style;
                q(w, "animationDelay", k),
                q(w, "animationIterationCount", l),
                q(w, "animationDuration", m),
                q(w, "animationDirection", n),
                q(w, "animationFillMode", o),
                q(w, "animationTimingFunction", r),
                Ghostlab.state.domMutationIgnoreNodes.push(a);
                var x = a.nextSibling;
                j.removeChild(a),
                x ? j.insertBefore(a, x) : j.appendChild(a)
            }
        }
    }
      , A = function(a, b, c, d, f, g, h, i) {
        null !== k && clearTimeout(k),
        k = setTimeout(function() {
            if (k = null,
            lenIndices = g.length,
            0 !== lenIndices) {
                for (var j = {}, l = {}, m = b || a.style, n = !1, o = p(c, "transitionDuration"), r = p(c, "transitionDelay"), s = p(c, "transitionTimingFunction"), t = (new Date).getTime(), u = 0; u < lenIndices; u++) {
                    var v = g[u]
                      , w = d ? e[d[u]] : f[u];
                    w && (w.lastStartTime = t - i,
                    w.seekTime = i,
                    w.isPaused && (n = !0),
                    j[w.name] = w.startValue,
                    l[w.name] = w.endValue,
                    r[v] = w.isPaused ? 1e9 / w.duration * h * (w.delay - i) + "ms" : h * w.delay + "ms",
                    s[v] = w.easing)
                }
                Ghostlab.state.domMutationIgnoreNodes.push(a),
                q(m, "transitionDuration", "0s"),
                q(m, "transitionDelay", "0s");
                for (var x in j)
                    m[x] = j[x];
                setTimeout(function() {
                    var a = !1;
                    if (d)
                        for (var b = 0; b < lenIndices; b++)
                            if (e[d[b]].isPaused) {
                                a = !0;
                                break
                            }
                    n === a && (q(m, "transitionDuration", a ? o : ""),
                    q(m, "transitionDelay", a ? r : ""),
                    q(m, "transitionTimingFunction", a ? s : ""));
                    for (var c in l)
                        m[c] = l[c]
                }, 10)
            }
        }, 100)
    }
      , B = function() {
        j = null;
        var a = i.length;
        if (a > 1) {
            for (var b = 0, c = 0, d = 0; d < a; d++) {
                var e = i[d];
                b = Math.max(b, e.startTime),
                c = Math.max(c, e.currentTime)
            }
            for (var d = 0; d < a; d++) {
                var e = i[d];
                e.startTime = b,
                e.currentTime = c
            }
        }
        a > 0 && (Ghostlab.Inspector.sendEvent("Animation.animationCreatedAndStarted", {
            animations: i
        }),
        i.splice(0, a))
    }
      , C = function(a) {
        i.push(a),
        null !== j && (clearTimeout(j),
        j = null),
        j = setTimeout(B, 100)
    }
      , D = function(a) {
        for (var b = a.length, c = 0; c < b; c++)
            l[a[c]] = !0
    }
      , E = function(a, b, c) {
        if (m)
            return !0;
        for (var d in l)
            if (l[d]) {
                var f = e[d];
                if (f && f.node === a && f.name === b)
                    return c && (l[d] = !1),
                    !0
            }
        return !1
    }
      , F = function(a) {
        for (var b = "", c = a.length, d = 0; d < c; d++)
            b += "\n" + a[d].styleSheetId + "\n" + a[d].ruleId;
        return b
    }
      , G = function(a) {
        var b = a.target
          , c = a.animationName;
        if (!E(b, c, !0)) {
            var d = Ghostlab.jQuery.inArray(b, Ghostlab.state.domMutationIgnoreNodes);
            if (d >= 0)
                return void Ghostlab.state.domMutationIgnoreNodes.splice(d, 1);
            for (var g = void 0, h = -1, i = [void 0, "before", "after"], j = i.length, k = 0; k < j; k++)
                if ((g = window.getComputedStyle(b, i[k])) && !((h = r(g, c, !0)) < 0)) {
                    var l = String(f++)
                      , m = i[k]
                      , n = v(p(g, "animationDelay")[h]) || 0
                      , o = p(g, "animationIterationCount")[h] || ""
                      , q = v(p(g, "animationDuration")[h]) || 0
                      , s = p(g, "animationDirection")[h]
                      , u = p(g, "animationFillMode")[h]
                      , w = p(g, "animationTimingFunction")[h]
                      , x = Ghostlab.Inspector.CSS.getMatchingRules(b, m, !0, /animation$|animation-name$/, new RegExp(c.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")), !0, !0);
                    e[l] = {
                        node: b,
                        pseudo: m,
                        pseudoStyle: m ? t(x, c, !0) : void 0,
                        name: c,
                        delay: n,
                        iterations: o,
                        duration: q,
                        direction: s,
                        fill: u,
                        easing: w,
                        isAnimation: !0,
                        isPaused: !1
                    },
                    C({
                        id: l,
                        name: c,
                        pausedState: !1,
                        playState: "running",
                        playbackRate: 1,
                        startTime: (new Date).getTime(),
                        currentTime: a.elapsedTime,
                        source: {
                            delay: n,
                            endDelay: 0,
                            iterationStart: 0,
                            iterations: "infinite" === o.toLowerCase() ? null : parseInt(o, 10),
                            duration: q,
                            direction: s,
                            fill: u,
                            easing: w,
                            backendNodeId: Ghostlab.Inspector.getNodeId(Ghostlab.jQuery(b), m)
                        },
                        type: "CSSAnimation",
                        cssId: "CSSAnimation\n" + l + F(x)
                    })
                }
        }
    }
      , H = function(a, b, c) {
        var d = !1;
        for (var g in c)
            E(a, g, !1) ? c[g] = void 0 : d = !0;
        if (d) {
            var i = Ghostlab.jQuery.inArray(a, Ghostlab.state.domMutationIgnoreNodes);
            if (i >= 0)
                return void Ghostlab.state.domMutationIgnoreNodes.splice(i, 1);
            var j = window.getComputedStyle(a, b);
            if (j) {
                var k = []
                  , l = Ghostlab.Inspector.getNodeId(Ghostlab.jQuery(a), b)
                  , m = (new Date).getTime()
                  , n = [];
                for (var g in c)
                    n.push("^" + g.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$");
                var o = Ghostlab.Inspector.CSS.getMatchingRules(a, b, !0, new RegExp(n.join("|")), void 0, !0, !0)
                  , q = F(o);
                for (var g in c) {
                    var s = c[g];
                    if (void 0 !== s) {
                        var u = r(j, g, !1);
                        if (!(u < 0)) {
                            var w = String(f++);
                            h.push(w);
                            var x = v(p(j, "transitionDelay")[u]) || 0
                              , y = v(p(j, "transitionDuration")[u]) || 0
                              , z = p(j, "transitionTimingFunction")[u];
                            e[w] = {
                                node: a,
                                pseudo: b,
                                pseudoStyle: b ? t(o, g, !1) : void 0,
                                name: g,
                                delay: x,
                                duration: y,
                                easing: z,
                                isAnimation: !1,
                                isPaused: !1,
                                startValue: s,
                                endValue: void 0
                            },
                            k.push({
                                id: w,
                                name: g,
                                pausedState: !1,
                                playState: "running",
                                playbackRate: 1,
                                startTime: m,
                                currentTime: 0,
                                source: {
                                    delay: x,
                                    endDelay: 0,
                                    iterationStart: 0,
                                    iterations: 1,
                                    duration: y,
                                    direction: "normal",
                                    fill: "none",
                                    easing: z,
                                    backendNodeId: l
                                },
                                type: "CSSTransition",
                                cssId: "CSSTransition\n" + g + q
                            })
                        }
                    }
                }
                Ghostlab.Inspector.sendEvent("Animation.animationCreatedAndStarted", {
                    animations: k
                })
            }
        }
    }
      , I = function(a) {
        var b = a.target;
        if (E(b, a.propertyName, !0))
            if (a.pseudoElement) {
                var c = a.pseudoElement.replace(/^:+/, "").toLowerCase();
                for (var d in e)
                    if (d && d.node === b && d.pseudo === c && d.name === a.propertyName) {
                        d.pseudoStyle && (d.pseudoStyle[a.propertyName] = "");
                        break
                    }
            } else
                b.style[a.propertyName] = "";
        else {
            for (var f = void 0, g = h.length, i = 0; i < g; i++) {
                var d = e[h[i]];
                if (d && d.node === b && d.name === a.propertyName) {
                    f = d,
                    h[i],
                    h.splice(i, 1);
                    break
                }
            }
            if (f) {
                var j = getComputedStyle(b, f.pseudo);
                f.endValue = j[d.name]
            }
        }
    };
    Ghostlab.Inspector.Animation = {
        enable: function() {
            if (a = !0,
            null === g) {
                g = [];
                for (var d = document.styleSheets, e = d.length, f = 0; f < e; f++)
                    u(d[f].cssRules)
            }
            b || (c && Ghostlab.features.hasAddEventListener && (document.addEventListener("animationstart", G, !0),
            Ghostlab.EventHelpers.TransitionStart.listenForTransitionStart(H),
            document.addEventListener("transitionend", I, !0)),
            b = !0)
        },
        disable: function() {
            a = !1,
            b && (c && Ghostlab.features.hasAddEventListener && (document.removeEventListener("animationstart", G, !0),
            Ghostlab.EventHelpers.TransitionStart.removeCallback(H),
            document.removeEventListener("transitionend", I, !0)),
            b = !1)
        },
        getPlaybackRate: function() {
            return {
                playbackRate: d
            }
        },
        setPlaybackRate: function(a) {
            var b = a.playbackRate;
            b <= 1e-9 && (b = 1e-9),
            m = !0,
            setTimeout(function() {
                m = !1
            }, 500);
            for (var c = g.length, e = 0; e < c; e++)
                y(g[e], b);
            var f = Ghostlab.jQuery('[style*="transition" i], [style*="animation" i]');
            for (c = f.length,
            e = 0; e < c; e++)
                y(f[e].style, b);
            d = b
        },
        getCurrentTime: function(a) {
            var b = e[a.id];
            if (!b)
                return {
                    currentTime: 0
                };
            var c = (new Date).getTime() - b.lastStartTime;
            return {
                currentTime: c > b.delay + b.duration ? 0 : c
            }
        },
        setPaused: function(a) {
            if (a && a.animations && 0 !== a.animations.length) {
                var b = s(a.animations)
                  , c = b.nodes.length;
                if (0 !== c)
                    for (var f = a && a.paused, g = f ? "paused" : "running", h = 1 / d, i = (new Date).getTime(), j = 0; j < c; j++) {
                        var k = b.animationIndices[j]
                          , l = k.length;
                        if (l > 0) {
                            for (var m = p(b.styles[j], "animationPlayState"), n = 0; n < l; n++) {
                                m[k[n]] = g;
                                var o = e[b.animationIds[j][n]];
                                o && (o.seekTime = f ? o.lastStartTime ? i - o.lastStartTime : 0 : void 0)
                            }
                            q(b.pseudoStyles[j] || b.nodes[j].style, "animationPlayState", m)
                        }
                        if (k = b.transitionIndices[j],
                        (l = k.length) > 0) {
                            var r = b.nodes[j]
                              , t = b.pseudoStyles[j]
                              , u = b.styles[j]
                              , v = t || r.style
                              , w = f ? void 0 : getComputedStyle(r)
                              , x = f ? p(u, "transitionDuration") : ""
                              , y = f ? p(u, "transitionDelay") : ""
                              , z = 1 / 0
                              , B = 0
                              , C = f ? void 0 : []
                              , D = [];
                            for (n = 0; n < l; n++) {
                                var E = k[n];
                                f && (x[E] = "1000000s");
                                var F = e[b.animationIds[j][n]];
                                F && (F.isPaused = f,
                                f ? (y[E] = 1e9 / F.duration * h * F.delay + "ms",
                                F.seekTime = F.lastStartTime ? i - F.lastStartTime : 0) : (v[F.name] = F.endValue,
                                z = Math.min(z, F.seekTime || 0),
                                B = Math.max(B, F.duration + F.delay),
                                C.push(F.name),
                                D.push({
                                    node: r,
                                    pseudoStyle: t,
                                    name: F.name,
                                    delay: F.delay,
                                    duration: F.duration,
                                    easing: F.easing,
                                    isAnimation: !1,
                                    isPaused: !1,
                                    startValue: w[F.name],
                                    endValue: F.endValue
                                })))
                            }
                            if (!f && z < 1 / 0)
                                for (n = 0; n < l; n++) {
                                    var F = e[b.animationIds[j][n]];
                                    F && (z > D[n].delay && (D[n].duration -= z - D[n].delay),
                                    D[n].delay = Math.max(0, D[n].delay - z))
                                }
                            q(v, "transitionDuration", x),
                            q(v, "transitionDelay", y),
                            f || (q(v, "transitionTimingFunction", ""),
                            A(r, t, u, null, D, b.transitionIndices[j], h, 0),
                            setTimeout(function() {
                                for (var a = C.length, b = 0; b < a; b++)
                                    v[C[b]] = ""
                            }, B + 100))
                        }
                    }
            }
        },
        setTiming: function(a) {
            if (a && a.animationId) {
                var b = s([a.animationId]);
                if (0 !== b.nodes.length) {
                    var c = 1 / d
                      , f = c * (a && a.duration || 0) + "ms"
                      , g = c * (a && a.delay || 0) + "ms"
                      , h = b.pseudoStyle[0] || b.nodes[0].style
                      , i = b.styles[0]
                      , j = b.animationIndices[0]
                      , k = j.length;
                    if (k > 0) {
                        for (var l = p(i, "animationDuration"), m = p(i, "animationDelay"), n = 0; n < k; n++) {
                            var o = e[b.animationIds[n]]
                              , r = j[n];
                            o && (o.duration = a.duration,
                            o.delay = a.delay),
                            l[r] = f,
                            m[r] = g
                        }
                        q(h, "animationDuration", l),
                        q(h, "animationDelay", m)
                    }
                    if (j = b.transitionIndices[0],
                    (k = j.length) > 0) {
                        for (var t = p(i, "transitionDuration"), u = p(i, "transitionDelay"), n = 0; n < k; n++) {
                            var v = e[b.animationIds[n]]
                              , r = j[n];
                            v && (v.duration = a.duration,
                            v.delay = a.delay),
                            t[r] = f,
                            u[r] = g
                        }
                        q(h, "transitionDuration", t),
                        q(h, "transitionDelay", u)
                    }
                }
            }
        },
        seekAnimations: function(a) {
            if (a && a.animations && 0 !== a.animations.length) {
                var b = s(a.animations)
                  , c = b.nodes.length;
                if (0 !== c) {
                    D(a.animations);
                    for (var e = 1 / d, f = a && a.currentTime || 0, g = 0; g < c; g++) {
                        var h = b.nodes[g]
                          , i = b.pseudoStyles[g]
                          , j = b.styles[g]
                          , k = b.animationIds[g];
                        z(h, i, j, k, b.animationIndices[g], e, f),
                        A(h, i, j, k, null, b.transitionIndices[g], e, f)
                    }
                }
            }
        },
        releaseAnimations: function(a) {
            for (var b = a && a.animations, c = b && b.length || 0, d = 0; d < c; d++)
                e[b[d]] = void 0
        }
    }
}(),
function() {
    var a = !1
      , b = {}
      , c = function(f, g) {
        if (f && !(g > 5)) {
            if (!f.Ghostlab)
                return void setTimeout(function() {
                    c(f, (g || 0) + 1)
                }, 1e3);
            var h = f.Ghostlab.jQuery
              , i = h("html").attr("manifest");
            if (i) {
                var j = Ghostlab.unrewriteUrl(i)
                  , k = [{
                    url: Ghostlab.unrewriteUrl(f.location.href),
                    type: "Master "
                }, {
                    url: e(j),
                    type: "Manifest "
                }];
                Ghostlab.jQuery.ajax({
                    url: Ghostlab.rewriteUrl(i),
                    method: "GET",
                    dataType: "text"
                }).done(function(c) {
                    var g = d(c);
                    for (var h in g.fallback)
                        k.push({
                            url: e(g.fallback[h]),
                            type: "Fallback "
                        });
                    for (var i = g.cache.length, h = 0; h < i; h++)
                        k.push({
                            url: e(g.cache[h]),
                            type: "Explicit "
                        });
                    b[f.Ghostlab.state.frameId] = {
                        manifestURL: j,
                        resources: k
                    },
                    a && Ghostlab.Inspector.sendEvent("ApplicationCache.applicationCacheStatusUpdated", {
                        frameId: f.Ghostlab.state.frameId,
                        manifestURL: j,
                        status: 2
                    })
                }),
                h("iframe").each(function() {
                    c(this.contentWindow)
                })
            }
        }
    }
      , d = function(a) {
        var b = {
            cache: [],
            network: [],
            fallback: {},
            settings: [],
            tokens: [{
                type: "magic signature",
                value: "CACHE MANIFEST"
            }]
        }
          , c = a.split(/\r\n|\r|\n/)
          , d = c.shift()
          , e = "CACHE";
        if (0 !== d.indexOf("CACHE MANIFEST"))
            throw new Error("Invalid cache manifest header: " + d);
        if (d.length > "CACHE MANIFEST".length && " " !== d[14] && "\t" !== d[14])
            throw new Error("Invalid cache manifest header: " + d);
        for (var f, g, h, i = c.length, j = 0; j < i; j++)
            f = c[j].trim(),
            g = f.length,
            0 === g ? b.tokens.push({
                type: "newline"
            }) : 0 === f.indexOf("#") ? b.tokens.push({
                type: "comment",
                value: f.substring(1)
            }) : Ghostlab.jQuery.inArray(f, ["CACHE:", "FALLBACK:", "NETWORK:", "SETTINGS:"]) >= 0 ? (e = f.substring(0, g - 1),
            b.tokens.push({
                type: "mode",
                value: e
            })) : f.indexOf(":") === g - 1 ? (e = "unknown",
            b.tokens.push({
                type: "mode",
                value: e,
                raw: f
            })) : (h = f.split(/[ ]+/),
            b.tokens.push({
                type: "data",
                tokens: h
            }),
            "FALLBACK" === e ? b.fallback[h[0]] = h[1] : "unknown" !== e && b[e.toLowerCase()].push(f));
        return b
    }
      , e = function(a) {
        if (Ghostlab.StringHelpers.isAbsoluteUrl(a))
            return a;
        var b = Ghostlab.URLHelpers.parseUrl(Ghostlab.config.documentRoot);
        return b.protocol + "//" + b.host + Ghostlab.URLHelpers.getAbsolutePath(a)
    };
    Ghostlab.Inspector.ApplicationCache = {
        init: function() {
            Ghostlab.state.isMainFrame && c(window)
        },
        enable: function() {
            a = !0
        },
        getFramesWithManifests: function() {
            if (Ghostlab.state.isMainFrame) {
                var a = [];
                for (var c in b) {
                    var d = b[c];
                    a.push({
                        frameId: c,
                        manifestURL: d.manifestURL,
                        status: 4
                    })
                }
                return {
                    frameIds: a
                }
            }
        },
        getManifestForFrame: function() {
            if (Ghostlab.state.isMainFrame) {
                var a = b[params.frameId];
                return a ? {
                    manifestURL: a.manifestURL
                } : void 0
            }
        },
        getApplicationCacheForFrame: function(a) {
            if (Ghostlab.state.isMainFrame) {
                var c = b[a.frameId];
                return c ? {
                    applicationCache: c
                } : void 0
            }
        }
    }
}(),
function() {
    var a = /::?(?:first-line|first-letter|before|after|backdrop|selection|first-line-inherited|scrollbar|scrollbar-thumb|scrollbar-button|scrollbar-track|scrollbar-track-piece|scrollbar-corner|resizer|input-list-button)/gi
      , b = /^\s+|\s*;?\s*$/g
      , c = /^(?:\s*,)+|(?:,\s*)+$/g
      , d = {
        nopseudo: 0,
        "first-line": 1,
        "first-letter": 2,
        before: 3,
        after: 4,
        backdrop: 5,
        selection: 6,
        "first-line-inherited": 7,
        scrollbar: 8,
        "scrollbar-thumb": 9,
        "scrollbar-button": 10,
        "scrollbar-track": 11,
        "scrollbar-track-piece": 12,
        "scrollbar-corner": 13,
        resizer: 14,
        "input-list-button": 15
    }
      , e = ["nopseudo", "first-line", "first-letter", "before", "after", "backdrop", "selection", "first-line-inherited", "scrollbar", "scrollbar-thumb", "scrollbar-button", "scrollbar-track", "scrollbar-track-piece", "scrollbar-corner", "resizer", "input-list-button"]
      , f = "undefined" != typeof CSSImportRule
      , g = "undefined" != typeof CSSNameSpaceRule
      , h = Ghostlab.SessionStorage.get("cssInspectorEnabled") || !1
      , i = null
      , j = {}
      , l = {}
      , m = {}
      , n = {}
      , o = null
      , p = null
      , q = function(a) {
        var b = a.match(/url\s*\(\s*['"]?([^'"\s]*)\s*['"]?\s*\)/)
          , c = a.match(/url-prefix\s*\(\s*['"]?([^'"\s]*)\s*['"]?\s*\)/)
          , d = a.match(/domain\s*\(\s*['"]?([^'"\s]*)\s*['"]?\s*\)/)
          , e = a.match(/regexp\s*\(\s*['"]?([^'"\s]*)\s*['"]?\s*\)/);
        return {
            url: b && b[1] || "_",
            urlPrefix: c && c[1] || "_",
            domain: d && d[1] || "_",
            regexp: e && e[1] || "_"
        }
    }
      , r = function(a) {
        var b = a.match(/@import\s*(?:url\s*\()?\s*['"]?([^'") ]*)(?:['"]?\s*\))?\s*(.*?)[\s;]*$/i);
        return {
            url: b && b[1] || "_",
            media: b && b[2] || "_"
        }
    }
      , s = function(a) {
        var b = a.match(/@namespace\s+([^\s]+)\s+(?:url)?\s*\(?\s*['"]?([^'");]*)/);
        return {
            prefix: b && b[1] || "_",
            uri: b && b[2] || "_"
        }
    }
      , t = function(a) {
        if (!g)
            return null;
        var b = {};
        try {
            for (var c = a.cssRules.length, d = 0; d < c; d++) {
                var e = a.cssRules[d];
                if (10 === e.type) {
                    var f = s(e.cssText);
                    null !== f && (b[f.prefix] = f.uri)
                }
            }
        } catch (a) {}
        return b
    }
      , u = function(b) {
        var c = b.toLowerCase();
        if (!(c.indexOf(":after") < 0 && c.indexOf(":before") < 0))
            for (var d = b.split(","), e = d.length, f = 0; f < e; f++) {
                var g = Ghostlab.StringHelpers.trim(d[f])
                  , h = g.toLowerCase()
                  , i = h.indexOf(":after") >= 0
                  , j = h.indexOf(":before") >= 0;
                (i || j) && (n[g] = {
                    code: (j ? 1 : 0) + (i ? 2 : 0),
                    noPseudo: g.replace(a, "")
                })
            }
    }
      , v = function(a) {
        var b = a.toLowerCase();
        if (!(b.indexOf(":after") < 0 && b.indexOf(":before") < 0))
            for (var c = a.split(","), d = c.length, e = 0; e < d; e++)
                delete n[Ghostlab.StringHelpers.trim(c[e])]
    }
      , w = function(a) {
        var b = function(a) {
            i[A(a)] = {
                styleSheet: a,
                namespaces: t(a)
            },
            w(a)
        };
        try {
            if (a.cssRules)
                for (var c = a.cssRules, d = c.length, e = 0; e < d; e++) {
                    var f = c[e];
                    switch (f.type) {
                    case 1:
                        u(f.selectorText);
                        break;
                    case 3:
                        b(f.styleSheet);
                        break;
                    case 4:
                    case 12:
                    case 13:
                        w(f)
                    }
                }
            else {
                if (a.rules)
                    for (var c = a.rules, d = c.length, e = 0; e < d; e++)
                        u(c[e]);
                if (a.imports)
                    for (var g = a.imports, d = g.length, e = 0; e < d; e++)
                        b(g[e])
            }
        } catch (a) {}
    }
      , x = function(a) {
        var b = A(a);
        i[b] = {
            styleSheet: a,
            namespaces: t(a)
        },
        w(a)
    }
      , y = function() {
        if (!i) {
            var a = document.styleSheets;
            if (a) {
                i = {};
                for (var b = a.length, c = 0; c < b; c++) {
                    var d = a[c];
                    x(d)
                }
                Ghostlab.Inspector.sendEvent("CSS.inspectorStyleSheetsRequested")
            }
        }
    }
      , z = function(a) {
        if (!a || a.href)
            return null;
        for (var b = a.ownerNode.textContent, c = /0(?:px|%|r?em)/g, d = b.replace(/\s+/g, "").replace(c, "0").toLowerCase(), e = !1, f = "", g = a.cssRules.length, h = 0; h < g; h++) {
            var i = a.cssRules[h].cssText;
            f += i + "\n",
            !e && d.indexOf(i.replace(/\s+/g, "").replace(c, "0").toLowerCase()) < 0 && (e = !0)
        }
        return e ? f : b
    }
      , A = function(a) {
        var b = "string" == typeof a
          , c = !b && !a.href && a.ownerNode;
        if (c && a.ownerNode.__ghostlab_stylesheet_id)
            return a.ownerNode.__ghostlab_stylesheet_id;
        var d = b ? a : a.href || location.pathname
          , e = Ghostlab.getFullOrigUrl(d);
        if (c) {
            e += ":" + (Ghostlab.jQuery(a.ownerNode).attr("data-ghostlab-style-id") || Math.random().toString(36).substr(2, 8)),
            a.ownerNode.__ghostlab_stylesheet_id = e
        }
        return e
    }
      , B = function(a) {
        return "@" + a
    }
      , C = function(a) {
        return "@" === a.charAt(0)
    }
      , D = function(a) {
        return a.substr(1)
    }
      , E = function(a) {
        return C(a) ? Ghostlab.Inspector.getElementForNodeId(D(a)) : null
    }
      , F = function(a, b) {
        var c = [];
        if ("function" == typeof window.getComputedStyle) {
            var d = window.getComputedStyle(a, b ? b.toLowerCase() : null);
            if (!d)
                return c;
            for (var e = "function" == typeof d.getPropertyValue, f = d.length, g = 0; g < f; g++) {
                var h = d[g]
                  , i = e ? d.getPropertyValue(h) : d[h];
                c.push({
                    name: h,
                    value: i
                })
            }
        } else if (a.currentStyle) {
            var d = a.currentStyle
              , j = void 0;
            for (var k in d) {
                var i = d[k];
                if (i && "cssText" !== k) {
                    if (/(?:em|in|pt|%|px)$/.test(i)) {
                        var l = Ghostlab.UIHelpers.getPixelSize(a, d, k, j);
                        void 0 === j && (j = l.fontSize),
                        i = l.size + "px"
                    }
                    c.push({
                        name: Ghostlab.StringHelpers.camelCaseToHypenated(k),
                        value: i
                    })
                }
            }
        }
        return c
    }
      , G = function(a, b, c) {
        try {
            if (!a || !a.media || 0 === a.media.length)
                return null
        } catch (a) {
            return null
        }
        var d = "mediaRule";
        3 === a.type && (d = "importRule");
        var e = {
            text: a.media.mediaText,
            source: d,
            range: b ? {
                styleSheetId: c,
                ruleId: b
            } : {
                startLine: 0,
                startColumn: 0,
                endLine: 0,
                endColumn: 0
            },
            styleSheetId: c,
            mediaList: []
        };
        return a.parentStyleSheet && null !== a.parentStyleSheet.href && (e.sourceURL = a.parentStyleSheet.href),
        e
    }
      , H = function(a) {
        if ("string" != typeof a)
            return [];
        for (var b = a.split(","), c = b.length, d = 0; d < c; d++)
            b[d] = Ghostlab.StringHelpers.trim(b[d]);
        return b
    }
      , I = function(a, b, c) {
        return !b || !c || 0 !== a.length && a[0].namespaceURI === c[b]
    }
      , J = function(b, c, g, h, l) {
        var m = []
          , n = []
          , o = {}
          , p = {}
          , q = function(b, c, e, f, h, i, k, l, m, n) {
            if (k.length > 0) {
                for (var o = [], q = i.length, r = 0; r < q; r++) {
                    var s = i[r];
                    s.match(/\.__ghostlab-(?:active|focus|hover|visited)__/) || o.push({
                        text: s,
                        range: {
                            styleSheetId: b,
                            ruleId: f
                        }
                    })
                }
                var t = {
                    rule: {
                        styleSheetId: b,
                        ruleId: f,
                        selectorList: {
                            selectors: o,
                            text: h
                        },
                        origin: j[b] || "regular",
                        style: {
                            styleSheetId: b,
                            cssProperties: K(e.style)
                        },
                        media: l
                    },
                    matchingSelectors: k
                };
                if (c && (p[b] = !0),
                g || !a.test(h))
                    m.push(t);
                else if (n)
                    for (var u in d)
                        if (-1 !== h.indexOf(u)) {
                            var v = d[u];
                            n[v] || (n[v] = {
                                matches: []
                            }),
                            n[v].matches.push(t)
                        }
            }
        }
          , r = function(a, c, d, e, f, j) {
            for (var k = {}, p = a.length, s = 0; s < p; s++) {
                var t = a[s]
                  , u = Q(t)
                  , v = k[u] || 0;
                k[u] = v + 1,
                u += ":" + v;
                var w = c.concat(u);
                switch (t.type) {
                case 1:
                    var x = t.selectorText
                      , y = H(x);
                    if (q(e, f, t, w, x, y, N(b, g, y, j), d, m, h ? o : null),
                    l)
                        for (var z = b.parent(), B = 0; z[0] !== document; z = z.parent(),
                        B++)
                            q(e, f, t, w, x, y, N(z, "", y, j), d, n[B].matchedCSSRules);
                    break;
                case 4:
                    if (1 !== t.media.length || "print" !== t.media[0]) {
                        var C = G(t, w, e);
                        try {
                            r(t.cssRules, w, C ? [C].concat(d) : d, e, f, j)
                        } catch (a) {}
                    }
                    break;
                case 12:
                case 13:
                    try {
                        r(t.cssRules, w, d, e, f, j)
                    } catch (a) {}
                    break;
                case 3:
                    var D = A(t.styleSheet)
                      , E = i[D]
                      , C = G(t, w, e);
                    try {
                        r(t.styleSheet.cssRules, [], C ? [C] : [], D, !1, E && E.namespaces)
                    } catch (a) {}
                }
            }
        };
        if (l) {
            var s = b;
            g || (s = s.parent());
            for (var t = s[0].ownerDocument || document; s[0] !== t; s = s.parent()) {
                var u = L(s, Ghostlab.Inspector.getNodeId(s));
                n.push({
                    matchedCSSRules: [],
                    inlineStyle: u.cssProperties.length > 0 ? u : void 0
                })
            }
        }
        for (var v in i) {
            var w = i[v]
              , x = w.styleSheet;
            try {
                var y = x.cssRules || x.rules;
                if (y && (!x.parentStyleSheet || !f)) {
                    var B = G(x, null, null);
                    r(y, [], B ? [B] : [], v, !x.href, w.namespaces)
                }
            } catch (a) {}
        }
        var C = [];
        for (var D in p) {
            var x = i[D].styleSheet
              , E = z(x);
            if (null === E)
                delete p[k];
            else {
                var F = void 0
                  , I = void 0
                  , J = x && x.ownerNode;
                if (J) {
                    var O = Ghostlab.jQuery(J);
                    C.push(O),
                    F = Ghostlab.Inspector.getNodeId(O),
                    I = O.attr("data-ghostlab-line-offset"),
                    void 0 !== I && (I = parseInt(I, 10))
                }
                p[D] = {
                    source: E,
                    line: I,
                    nodeId: F
                }
            }
        }
        for (var P = C.length, R = 0; R < P; R++)
            Ghostlab.Inspector.DOM.pushNodePathToFrontend(C[R]);
        return {
            inlineStyle: L(b, c),
            attributesStyle: M(b),
            matchedCSSRules: m,
            pseudoElements: function(a) {
                var b = [];
                for (var c in a)
                    b.push({
                        pseudoType: e[c],
                        matches: a[c].matches
                    });
                return b
            }(o),
            inherited: n,
            docInlineStylesheetSources: p
        }
    }
      , K = function(a) {
        var b = []
          , c = "function" == typeof a.getPropertyValue
          , d = "function" == typeof a.getPropertyPriority;
        if (c)
            for (var e = a.length, f = 0; f < e; f++) {
                var g = a[f];
                b.push({
                    name: g,
                    value: c ? a.getPropertyValue(g) : a[g],
                    important: d ? "important" === a.getPropertyPriority(g) : null
                })
            }
        else
            for (var h in a) {
                var i = a[h];
                i && "cssText" !== h && b.push({
                    name: Ghostlab.StringHelpers.camelCaseToHypenated(h),
                    value: i,
                    important: !1
                })
            }
        return b
    }
      , L = function(a, b) {
        var c = a.data("__ghostlab-style__");
        return void 0 === c && (c = a.attr("style")),
        {
            styleSheetId: B(b),
            cssProperties: K(a[0].style),
            cssText: c
        }
    }
      , M = function(a) {
        for (var b = {
            cssProperties: [],
            shorthandEntries: []
        }, c = ["width", "border", "color", "height", "bgcolor", "align", "wrap", "size", "sizes", "shape", "seamless"], d = c.length, e = 0; e < d; e++) {
            var f = a.attr(c[e]);
            void 0 !== f && b.cssProperties.push({
                name: c[e],
                value: f
            })
        }
        return b.cssProperties.length > 0 ? b : void 0
    }
      , N = function(b, d, e, f) {
        for (var g = [], h = e.length, i = 0, j = 0; j < h; j++) {
            var k = e[j];
            if (!(d && k.toUpperCase().indexOf(d) < 0) && (k = k.replace(a, "").replace(c, ""))) {
                var l = ""
                  , m = k.indexOf("|");
                m >= 0 && (l = k.substr(0, m),
                k = k.substr(m + 1));
                try {
                    b.is(k) && I(b, l, f) ? (/\.__ghostlab-(?:active|focus|hover|visited)__/.test(k) || i++,
                    g.push(i - 1)) : i++
                } catch (a) {
                    i++
                }
            }
        }
        return g
    }
      , O = function(a) {
        Ghostlab.jQuery("html").append("<style></style>");
        var b = document.styleSheets
          , c = b[b.length - 1];
        return i || y(),
        i[a] = {
            styleSheet: c,
            namespaces: {}
        },
        j[a] = "inspector",
        c
    }
      , P = function(a, b) {
        if (!b)
            return !0;
        if (!a)
            return !1;
        var c = function(a) {
            return Ghostlab.StringHelpers.trim(a.replace(/\s+/g, " ").replace(/\s*:\s*/g, ":")).toLowerCase()
        }
          , d = function(a, b, c) {
            var d = a(b);
            if (!d)
                return !1;
            var e = a(c);
            if (!e)
                return !1;
            for (var f in d)
                if (d[f] !== e[f])
                    return !1;
            return !0
        }
          , e = a.type
          , f = c(b);
        return 1 === e ? c(a.selectorText).replace(/\s*([,>+~:=]|[~^$*|]=)\s*/g, "$1").replace(/::/g, ":") === f : 4 === e ? "@media " + c(a.media.mediaText) === f : 12 === e ? "@supports " + c(a.conditionText) === f : 13 === e ? !!Ghostlab.StringHelpers.startsWith(f, "@document") && d(q, c(a.conditionText), b) : 3 === e ? d(r, c(a.cssText), b) : 10 === e ? d(s, c(a.cssText), b) : 7 === e ? "@keyframes " + a.name.toLowerCase() === f : 8 === e && a.keyText.toLowerCase() === f
    }
      , Q = function(a) {
        var c = a.type;
        return 1 === c ? a.selectorText.toLowerCase() : 4 === c ? "@media " + a.media.mediaText.toLowerCase() : 12 === c ? "@supports " + a.conditionText.toLowerCase() : 13 === c ? "@document " + a.conditionText.toLowerCase() : 3 === c || 10 === c ? a.cssText.replace(b, "").toLowerCase() : 7 === c ? "@keyframes " + a.name.toLowerCase() : 8 === c ? a.keyText.toLowerCase() : ""
    }
      , R = function(a, b, c) {
        i || y();
        var d = i[a];
        if (!d)
            return null;
        var e = d.styleSheet;
        if (!e)
            return null;
        var f = a + "\n" + b.join("\n");
        if (!c) {
            var g = l[f];
            if (void 0 !== g)
                return g
        }
        var h = null
          , j = e
          , k = b.length;
        if (k < 1)
            return l[f] = null;
        for (var m = 0; m < k; m++) {
            var n = b[m]
              , o = n.lastIndexOf(":")
              , p = n.substr(0, o)
              , q = parseInt(n.substr(o + 1))
              , r = null;
            try {
                r = j.cssRules || j.rules
            } catch (a) {}
            if (!r)
                return l[f] = null;
            for (var s = r.length, t = 0, u = 0; u < s; u++) {
                var v = r[u];
                if (P(v, p)) {
                    if (t === q) {
                        c && c.push({
                            rule: j,
                            index: u
                        }),
                        j = v,
                        h = v;
                        break
                    }
                    t++
                }
            }
        }
        return l[f] = h
    }
      , S = function(a, b) {
        i || y();
        var c = i[a];
        if (!c)
            return null;
        var d = c.styleSheet;
        if (!d)
            return null;
        var e = m[b];
        if (void 0 !== e)
            return e;
        var f = null;
        try {
            f = d.cssRules || d.rules
        } catch (a) {}
        if (!f)
            return m[b] = null;
        for (var g = [], h = f.length, j = 0; j < h; j++) {
            var k = f[j];
            P(k, b) && g.push(k)
        }
        return m[b] = g
    };
    Ghostlab.Inspector.CSS = {
        init: function() {
            h && y(),
            Ghostlab.addMutationListener(function(a) {
                if (h && "childList" === a.type) {
                    for (var b = a.addedNodes.length, c = 0; c < b; c++) {
                        var d = a.addedNodes[c];
                        1 === d.nodeType && "style" === d.tagName.toLowerCase() && (i ? x(d.sheet) : y())
                    }
                    for (b = a.removedNodes.length,
                    c = 0; c < b; c++) {
                        var d = a.removedNodes[c];
                        1 === d.nodeType && "style" === d.tagName.toLowerCase() && d.__ghostlab_stylesheet_id && delete i[d.__ghostlab_stylesheet_id]
                    }
                }
            })
        },
        isEnabled: function() {
            return h
        },
        getPseudoElements: function(a) {
            var b = 0;
            i || y();
            for (var c in n) {
                var d = n[c];
                try {
                    if (!a.is(d.noPseudo))
                        continue
                } catch (a) {
                    continue
                }
                if (3 === (b |= d.code))
                    break
            }
            return b
        },
        replaceStyleSheet: function(a, b) {
            var c = A(a)
              , d = A(b)
              , e = Ghostlab.URLHelpers.getResourceUrl(b);
            i || y();
            var f = function() {
                for (var a in i)
                    if (a === c) {
                        delete i[a],
                        Ghostlab.Inspector.sendEvent("CSS.styleSheetRemoved", {
                            styleSheetId: c
                        });
                        break
                    }
                for (var b = document.styleSheets, f = b.length, g = 0; g < f; g++) {
                    var h = b[g];
                    if (A(h) === d) {
                        i[d] = {
                            styleSheet: h,
                            namespaces: t(h)
                        },
                        w(h),
                        Ghostlab.Inspector.sendEvent("CSS.styleSheetAdded", {
                            header: {
                                styleSheetId: d,
                                origin: "regular",
                                disabled: !1,
                                sourceURL: e,
                                hasSourceURL: !0,
                                title: "",
                                frameId: Ghostlab.state.frameId,
                                isInline: !1,
                                startLine: 0,
                                startColumn: 0
                            }
                        });
                        break
                    }
                }
            }
              , g = 0
              , h = function() {
                for (var a = document.styleSheets, b = a.length, c = 0; c < b; c++)
                    if (a[c].href === e)
                        return f();
                ++g < 10 && window.setTimeout(h, 100)
            };
            h()
        },
        enable: function() {
            return h = !0,
            Ghostlab.SessionStorage.set("cssInspectorEnabled", !0),
            y(),
            {}
        },
        disable: function() {
            return h = !1,
            Ghostlab.SessionStorage.set("cssInspectorEnabled", !1),
            {}
        },
        getMatchedStylesForNode: function(a) {
            if (Ghostlab.Inspector.elementBelongsToFrame(a.nodeId)) {
                var b = Ghostlab.Inspector.getElementForNodeId(a.nodeId);
                if (!b || 0 === b.length) {
                    var c = Ghostlab.Inspector.getParentNodeFromNodeId(a.nodeId);
                    return c && 0 !== c.length || (c = Ghostlab.jQuery("body")),
                    Ghostlab.Inspector.sendEvent("DOM.childNodeRemoved", {
                        parentNodeId: Ghostlab.Inspector.getNodeId(c),
                        nodeId: a.nodeId
                    }),
                    {
                        matchedCSSRules: [],
                        pseudoElements: [],
                        inherited: []
                    }
                }
                return J(b, a.nodeId, Ghostlab.Inspector.getPseudoForNodeId(a.nodeId), a.includePseudo || !0, a.includeInherited || !0)
            }
        },
        getInlineStylesForNode: function(a) {
            if (Ghostlab.Inspector.elementBelongsToFrame(a.nodeId)) {
                var b = a.nodeId
                  , c = Ghostlab.Inspector.getElementForNodeId(b)
                  , d = Ghostlab.Inspector.getPseudoForNodeId(b);
                return !c || 0 === c.length || d ? {} : (p !== b && o && o.removeData("__ghostlab-style__"),
                p = b,
                o = c,
                {
                    inlineStyle: L(c, a.nodeId),
                    attributesStyle: M(c)
                })
            }
        },
        getComputedStyleForNode: function(a) {
            if (Ghostlab.Inspector.elementBelongsToFrame(a.nodeId)) {
                var b = Ghostlab.Inspector.getElementForNodeId(a.nodeId);
                if (b && 0 !== b.length)
                    return {
                        computedStyle: F(b[0], Ghostlab.Inspector.getPseudoForNodeId(a.nodeId))
                    }
            }
        },
        getPlatformFontsForNode: function(a) {},
        setStyleSheetText: function(a) {},
        setRuleSelector: function(a) {
            i || y();
            var b = a.styleSheetId
              , c = i[b];
            if (c) {
                if (c.styleSheet) {
                    var d = [];
                    if (null !== R(a.styleSheetId, a.ruleId, d)) {
                        var e = d[d.length - 1]
                          , f = e.rule
                          , g = e.index;
                        if (f) {
                            "function" == typeof f.insertRule ? f.insertRule(a.selector + "{" + a.cssText + "}", g) : "function" == typeof f.addRule && f.addRule(a.selector, a.cssText, g);
                            try {
                                var h = f.cssRules || f.rules;
                                if (h) {
                                    var j = h[g];
                                    j && v(j.selectorText)
                                }
                            } catch (a) {}
                            "function" == typeof f.deleteRule ? f.deleteRule(g + 1) : "function" == typeof f.removeRule && f.removeRule(g + 1),
                            l = {},
                            m = {},
                            u(a.selector),
                            Ghostlab.Inspector.DOM.updateHighlight()
                        }
                    }
                }
            }
        },
        setKeyframeKey: function(a) {
            i || y();
            var b = a.styleSheetId
              , c = i[b];
            if (c) {
                if (c.styleSheet) {
                    var d = R(a.styleSheetId, a.ruleId);
                    d && 8 === d.type && (d.keyText = a.keyText)
                }
            }
        },
        setStyleTexts: function(a) {
            for (var b = [], c = !1, d = a.edits.length, e = 0; e < d; e++) {
                var f = a.edits[e]
                  , g = null
                  , h = f.styleSheetId
                  , i = f.ruleId;
                if (C(h)) {
                    var j = E(h);
                    j && j.length > 0 && (g = j[0].style,
                    j.attr("style", f.cssText),
                    j.attr("style") !== f.cssText && j.data("__ghostlab-style__", f.cssText),
                    Ghostlab.features.hasMutationObserver || Ghostlab.Inspector.DOM.sendAttributeModified(D(h), "style", f.cssText))
                } else {
                    var k = R(h, i);
                    if (k) {
                        g = k.style;
                        for (var l = "function" == typeof g.setProperty, m = f.cssProperties.length, n = 0; n < m; n++) {
                            var o = f.cssProperties[n];
                            if (l)
                                null === o.value ? g.removeProperty(o.name) : g.setProperty(o.name, o.value, o.important ? "important" : "");
                            else {
                                var p = !1
                                  , q = Ghostlab.jQuery.camelCase(o.name);
                                if (1 === i.length) {
                                    var r = i[0].lastIndexOf(":");
                                    if (r >= 0)
                                        for (var s = S(h, i[0].substr(0, r)), t = s.length, u = 0; u < t; u++) {
                                            var v = s[u].style;
                                            (v === g || v[q]) && (v[q] = o.value,
                                            p = !0)
                                        }
                                }
                                p || (g[q] = o.value)
                            }
                        }
                    }
                }
                b.push(g ? K(g) : []),
                c || (c = !!g)
            }
            return c && Ghostlab.Inspector.DOM.updateHighlight(),
            {
                cssProperties: b
            }
        },
        setMediaText: function(a) {
            i || y();
            var b = a.styleSheetId
              , c = i[b];
            if (c) {
                if (c.styleSheet) {
                    var d = R(a.styleSheetId, a.ruleId);
                    d && 4 === d.type && d.media && (d.media.mediaText = a.text)
                }
            }
        },
        createStyleSheet: function(a) {
            if (a.frameId === Ghostlab.state.frameId)
                return O(a.styleSheetId),
                {
                    styleSheetId: a.styleSheetId
                }
        },
        addRule: function(a) {
            i || y();
            var b = i[a.styleSheetId];
            if (b) {
                var c = b.styleSheet;
                if (c)
                    try {
                        var d = c.cssRules || c.rules
                          , e = d.length
                          , f = a.ruleText.search(/[^\\]{/)
                          , g = Ghostlab.StringHelpers.trim(f >= 0 ? a.ruleText.substr(0, f + 1) : a.ruleText);
                        "function" == typeof c.insertRule ? c.insertRule(a.ruleText, e) : "function" == typeof c.addRule && c.addRule(g, f >= 0 ? Ghostlab.StringHelpers.trim(a.ruleText.substr(f + 1)) : ""),
                        u(g);
                        var h = d[e];
                        return {
                            cssProperties: h ? K(h.style) : []
                        }
                    } catch (a) {}
            }
        },
        forcePseudoState: function(a) {
            if (Ghostlab.Inspector.elementBelongsToFrame(a.nodeId)) {
                var b = Ghostlab.Inspector.getElementForNodeId(a.nodeId);
                if (b && 0 !== b.length) {
                    b.removeClass("__ghostlab-active__"),
                    b.removeClass("__ghostlab-focus__"),
                    b.removeClass("__ghostlab-hover__"),
                    b.removeClass("__ghostlab-visited__");
                    for (var c = a.forcedPseudoClasses.length, d = 0; d < c; d++)
                        b.addClass("__ghostlab-" + a.forcedPseudoClasses[d] + "__")
                }
            }
        },
        setInspectorStyleSheets: function(a) {
            for (var b = a.styleSheets, c = b.length, d = 0; d < c; d++) {
                var e = b[d]
                  , f = e.rules
                  , g = f.length
                  , h = O(e.styleSheetId);
                if ("function" == typeof h.insertRule)
                    for (var i = 0; i < g; i++) {
                        var j = f[i];
                        h.insertRule(j.selectors + "{" + j.propertiesText + "}", i)
                    }
                else if ("function" == typeof h.addRule)
                    for (var i = 0; i < g; i++) {
                        var j = f[i];
                        h.addRule(j.selectors, j.propertiesText)
                    }
            }
        },
        getMatchingRules: function(b, d, e, f, g, h, j) {
            var k = Ghostlab.jQuery(b)
              , l = !1 !== e || !!h
              , m = [];
            d && (d = d.toUpperCase(),
            ":" !== d.charAt(0) ? d = ":" + d : "::" === d.substr(0, 2) && (d = d.substr(1)));
            var n = function(b, e) {
                if (!(!1 === l && m.length > 0))
                    for (var h = e.length, i = 0; i < h; i++) {
                        var o = e[i];
                        switch (o.type) {
                        case 1:
                            var p = o.selectorText;
                            if (!d || p.toUpperCase().indexOf(d) >= 0) {
                                var q = p.replace(a, "").replace(c, "");
                                if (q && k.is(q)) {
                                    var r = !1;
                                    if (f)
                                        for (var s = o.style, t = s.length, u = 0; u < t; u++) {
                                            var v = s[u];
                                            if (f.test(v) && (!g || g.test(s[v]))) {
                                                r = !0;
                                                break
                                            }
                                        }
                                    else
                                        r = !0;
                                    if (r && (j ? m.push({
                                        rule: o,
                                        ruleId: Q(o),
                                        styleSheetId: b
                                    }) : m.push(o),
                                    !l))
                                        return
                                }
                            }
                            break;
                        case 4:
                        case 12:
                        case 13:
                            n(b, o.cssRules)
                        }
                    }
            };
            i || y();
            for (var o in i) {
                var p = i[o].styleSheet;
                if (p && (n(o, p.cssRules || p.rules),
                !l && m.length > 0))
                    break
            }
            if (h) {
                var q = function(b) {
                    var d = SPECIFICITY.calculate(b.selectorText)
                      , e = d.length;
                    if (1 === e)
                        return d[0].specificityArray;
                    for (var f = [], g = 0; g < e; g++) {
                        var h = d[g].selector.replace(a, "").replace(c, "");
                        h && k.is(h) && f.push(d[g].specificityArray)
                    }
                    return f.sort(SPECIFICITY.compare),
                    f[f.length - 1]
                };
                m.sort(function(a, b) {
                    return void 0 === a.specificity && (a.specificity = q(j ? a.rule : a)),
                    void 0 === b.specificity && (b.specificity = q(j ? b.rule : b)),
                    SPECIFICITY.compare(a.specificity, b.specificity)
                })
            }
            var r = m.length;
            return !1 === e && r > 1 ? [m[r - 1]] : m
        },
        getUsedPseudoClasses: function(a) {
            a || (a = [":hover", ":focus", ":active", ":checked", ":in-range", ":out-of-range", ":invalid"]);
            for (var b = {}, c = [], d = a.length, e = 0, f = 0; f < d; f++) {
                var g = a[f];
                b[g] = !1,
                c.push(new RegExp(g.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")))
            }
            i || y();
            var h = function(f) {
                for (var g = f.length, i = 0; i < g; i++) {
                    var j = f[i];
                    if (e === d)
                        break;
                    switch (j.type) {
                    case 1:
                        for (var k = 0; k < d && (!b[a[k]] && c[k].test(j.selectorText) && (b[a[k]] = !0,
                        ++e),
                        e !== d); k++)
                            ;
                        break;
                    case 4:
                    case 12:
                    case 13:
                        h(j.cssRules)
                    }
                }
            };
            for (var j in i) {
                var k = i[j].styleSheet;
                k && h(k.cssRules || k.rules)
            }
            return b
        }
    }
}(),
function() {
    var a = Ghostlab.unrewriteUrl(location.protocol + "//" + location.host)
      , b = !1;
    Ghostlab.Inspector.Database = {
        init: function() {
            if (Ghostlab.state.isMainFrame) {
                var c = window.openDatabase;
                "function" == typeof c && (window.openDatabase = function(d, e) {
                    if (b) {
                        var f = Ghostlab.Overrides.WebSQL.getDatabaseEntryByName(d);
                        f && Ghostlab.Inspector.sendEvent("Database.addDatabase", {
                            database: {
                                id: f.id,
                                domain: a,
                                name: d,
                                version: f.version
                            }
                        })
                    }
                    return c.apply(this, arguments)
                }
                )
            }
        },
        enable: function() {
            b = !0;
            var c = Ghostlab.Overrides.WebSQL.getDatabases();
            for (var d in c) {
                var e = c[d];
                Ghostlab.Inspector.sendEvent("Database.addDatabase", {
                    database: {
                        id: d,
                        domain: a,
                        name: e.name,
                        version: e.version
                    }
                })
            }
        },
        disable: function() {},
        getDatabaseTableNames: function(a, b) {
            if (!Ghostlab.state.isMainFrame || "function" != typeof window.openDatabase)
                return {
                    tableNames: []
                };
            var c = Ghostlab.Overrides.WebSQL.getDatabaseEntryByID(a.databaseId);
            if (!c)
                return {
                    tableNames: []
                };
            var d = Ghostlab.Overrides.WebSQL.openDatabase(c.name, c.version, c.name, 0);
            if (!d)
                return {
                    tableNames: []
                };
            d.transaction(function(a) {
                a.executeSql('SELECT name FROM sqlite_master WHERE type="table"', [], function(a, c) {
                    for (var d = [], e = c.rows && c.rows.length || 0, f = 0; f < e; f++)
                        d.push(c.rows.item(f).name);
                    b({
                        result: {
                            tableNames: d
                        }
                    })
                }, function() {
                    b({
                        result: {
                            tableNames: []
                        }
                    })
                })
            })
        },
        executeSQL: function(a, b) {
            if (!Ghostlab.state.isMainFrame || "function" != typeof window.openDatabase)
                return !1;
            var c = a.query || ""
              , d = Ghostlab.Overrides.WebSQL.getDatabaseEntryByID(a.databaseId);
            if (!d)
                return !1;
            var e = Ghostlab.Overrides.WebSQL.openDatabase(d.name, d.version, d.name, 0);
            if (!e)
                return !1;
            e.transaction(function(a) {
                a.executeSql(c, [], function(a, c) {
                    var d = []
                      , e = []
                      , f = c.rows.length;
                    if (f > 0) {
                        var g = c.rows.item(0);
                        for (var h in g)
                            d.push(h);
                        for (var i = d.length, j = 0; j < f; j++)
                            for (var k = c.rows.item(j), l = 0; l < i; l++)
                                e.push(k[d[l]])
                    }
                    b({
                        result: {
                            columnNames: d,
                            values: e
                        }
                    })
                }, function(a, c) {
                    b({
                        result: {
                            sqlError: {
                                message: c.message,
                                code: c.code
                            }
                        }
                    })
                })
            })
        }
    }
}();
var __dbg__ = {};
!function() {
    var a = ""
      , b = 0
      , c = {}
      , d = []
      , e = []
      , f = 0
      , g = {}
      , h = !1
      , i = !1
      , j = !0
      , k = !1
      , l = function(a, b) {
        return a + ":" + b
    }
      , m = function(a) {
        if (k || !j)
            return !1;
        var b = g[a];
        if (void 0 === b)
            return !1;
        if ("boolean" == typeof b)
            return b;
        try {
            return o(b, e[0])
        } catch (a) {}
        return !1
    }
      , n = function(a) {
        for (var b = e.length, c = 0; c < b; c++)
            if (e[c].callFrameId === a)
                return e[c];
        return null
    }
      , o = function(a, b, c) {
        if (a && !/\s+/.test(a)) {
            if (!b)
                return Ghostlab.Inspector.Runtime.eval(a);
            var d = {}
              , e = {};
            if (b.scopeChain)
                for (var f = b.scopeChain.length - 1, g = f; g >= 0; g--) {
                    var h = Ghostlab.InspectionHelpers.getObjectById(b.scopeChain[g].object.objectId)
                      , i = g === f;
                    for (var j in h)
                        i && "function" == typeof h[j] && j in Window.prototype || (d[j] = h[j],
                        c && (e[j] = h[j]));
                    i && ("undefined" == typeof $ && (d.$ = Ghostlab.Inspector.Runtime.querySelector),
                    "undefined" == typeof $$ && (d.$$ = Ghostlab.Inspector.Runtime.querySelectorAll),
                    "undefined" == typeof $x && (d.$x = Ghostlab.Inspector.Runtime.executeXPath))
                }
            var k = new Function("scope","with(scope) { return (" + a + "); }")
              , l = k(d);
            if (c) {
                var m = "object" == typeof c;
                for (var j in d)
                    d[j] !== e[j] && (__dbg__.s(j, d[j]),
                    m && (c[j] = !0))
            }
            return l
        }
    }
      , p = function(b, c) {
        a = b,
        h = void 0 !== c && c,
        Ghostlab.Inspector.executionPaused = h,
        Ghostlab.Inspector.Page.hideOverlay()
    }
      , q = function(a) {
        return location.protocol + "//" + location.host + a.replace(/:\d+$/, "")
    };
    __dbg__.$ = function(d, f) {
        var g = !1;
        e.length > 0 && (e[0].location.lineNumber = f);
        var i = l(d, f);
        if (h || m(i) || "continueToLocation" === a && d === c.scriptId && lineNumber === c.lineNum || "stepOver" === a && e.length <= b || "stepInto" === a || "stepOut" === a && e.length < b) {
            __dbg__.changedVars = {},
            Ghostlab.Inspector.executionPaused = !0,
            Ghostlab.Inspector.sendEvent("Debugger.paused", {
                hitBreakpoints: [i],
                reason: "debugCommand",
                callFrames: e
            }, !0);
            var j = "";
            for (var k in __dbg__.changedVars)
                j += k + '=__dbg__.g("' + k + '");',
                g = !0;
            __dbg__._ = j,
            b = e.length
        }
        return g
    }
    ,
    __dbg__.$$ = function(a, b) {
        Ghostlab.Inspector.sendEvent("Debugger.paused", {
            reason: "debugCommand",
            callFrames: e
        }, !0)
    }
    ,
    __dbg__.push = function(a, b, c, d) {
        for (var g = [], h = 0; h < d.length; h++) {
            var i = "closure";
            if (0 === h)
                i = "local";
            else if (h === d.length - 1) {
                i = "global";
                for (var j in window)
                    "__dbg__" !== j && (d[h][j] = window[j])
            }
            g.push({
                type: i,
                object: Ghostlab.InspectionHelpers.getRemoteObject(d[h])
            })
        }
        var k = {
            callFrameId: (f++).toString(),
            functionName: c,
            location: {
                scriptId: a,
                lineNumber: b
            },
            scopeChain: g,
            this: Ghostlab.InspectionHelpers.getRemoteObject(this)
        };
        Ghostlab.Inspector.Profiler.enterFunction(k, arguments.callee.caller),
        e.splice(0, 0, k)
    }
    ,
    __dbg__.pop = function() {
        var a = e.splice(0, 1);
        Ghostlab.Inspector.Profiler.leaveFunction(a, arguments.callee.caller)
    }
    ,
    __dbg__.pushScope = function(a) {
        d.push(a)
    }
    ,
    __dbg__.popScope = function() {
        d.pop()
    }
    ,
    __dbg__.s = function(a, b, c) {
        if (e.length > 0)
            for (var f = e[0].scopeChain, g = f.length, h = 0; h < g; h++) {
                var i = Ghostlab.InspectionHelpers.getObjectById(f[h].object.objectId);
                if (void 0 !== i && a in i)
                    return i[a] = b,
                    c && "number" == typeof b ? b + c : b
            }
        for (var g = d.length, h = 0; h < g; h++)
            a in d[h] && (d[h][a] = b);
        return c && "number" == typeof b ? b + c : b
    }
    ,
    __dbg__.g = function(a) {
        if (e.length > 0)
            for (var b = e[0].scopeChain, c = b.length, f = 0; f < c; f++) {
                var g = Ghostlab.InspectionHelpers.getObjectById(b[f].object.objectId);
                if (void 0 !== g && a in g)
                    return g[a]
            }
        for (var c = d.length, f = 0; f < c; f++)
            if (a in d[f])
                return d[f][a]
    }
    ,
    __dbg__.e = function(a) {
        if (!a.__ghostlab_error_sent__) {
            a.__ghostlab_error_sent__ = !0;
            for (var b = [], c = e.length, d = 0, f = "", g = 0; g < c; g++) {
                var j = e[g];
                b.push({
                    functionName: j.functionName,
                    scriptId: j.location.scriptId,
                    url: q(j.location.scriptId),
                    lineNumber: j.location.lineNumber,
                    columnNumber: 0
                }),
                0 === g && (d = j.location.lineNumber,
                f = j.location.scriptId)
            }
            return Ghostlab.Inspector.sendEvent("Runtime.exceptionThrown", {
                timestamp: (new Date).getTime(),
                exceptionDetails: {
                    text: Ghostlab.InspectionHelpers.getErrorText(a),
                    lineNumber: d,
                    scriptId: f,
                    url: q(f),
                    stackTrace: {
                        callFrames: b
                    }
                }
            }),
            !!(i && !k && (h = !0,
            e.length > 0)) && __dbg__.$(e[0].location.scriptId, e[0].location.lineNumber)
        }
    }
    ,
    Ghostlab.Inspector.Debugger = {
        setBreakpointsActive: function(a) {
            j = a.active
        },
        setSkipAllPauses: function(a) {
            k = a.skip
        },
        setBreakpoint: function(a) {
            if (a.location) {
                var b = l(a.location.scriptId, a.location.lineNumber);
                return g[b] = !a.condition || a.condition,
                {
                    breakpointId: b,
                    actualLocation: a.location
                }
            }
        },
        removeBreakpoint: function(a) {
            delete g[a.breakpointId]
        },
        continueToLocation: function(a) {
            c.scriptId = a.location.scriptId,
            c.lineNum = a.location.lineNumber,
            p("continueToLocation")
        },
        stepOver: function(a) {
            p("stepOver")
        },
        stepInto: function(a) {
            p("stepInto")
        },
        stepOut: function(a) {
            p("stepOut")
        },
        pause: function(a) {
            p("pause", !0)
        },
        resume: function(a) {
            p("resume")
        },
        setPauseOnExceptions: function(a) {
            i = "none" !== a.state
        },
        evaluateOnCallFrame: function(a) {
            var b = n(a.callFrameId);
            if (b)
                try {
                    var c = {}
                      , d = {
                        result: Ghostlab.InspectionHelpers.getRemoteObject(o(a.expression, b, c), a.returnByValue, a.generatePreview)
                    };
                    for (var f in c)
                        __dbg__.changedVars[f] = !0;
                    return d
                } catch (c) {
                    for (var g = [], h = e.length, i = 0; i < h && (g.push(e[i]),
                    e[i].callFrameId !== a.callFrameId); i++)
                        ;
                    return {
                        result: Ghostlab.InspectionHelpers.getRemoteObject(c),
                        wasThrown: !0,
                        exceptionDetails: {
                            text: "Uncaught " + (c.toString ? c.toString() : "Error: " + c.message),
                            url: b.location.scriptId,
                            line: b.location.lineNumber,
                            column: 0,
                            stackTrace: {
                                callFrames: g
                            }
                        }
                    }
                }
        },
        setVariableValue: function(a) {
            if (void 0 !== a.callFrameId) {
                var b = n(a.callFrameId);
                if (b) {
                    for (var c = a.variableName, e = b.scopeChain, f = e.length, g = 0; g < f; g++) {
                        var h = Ghostlab.InspectionHelpers.getObjectById(e[g].object.objectId);
                        if (void 0 !== h && c in h)
                            return void (h[c] = Ghostlab.InspectionHelpers.getValueFromCallArgument(a.newValue))
                    }
                    f = d.length;
                    for (var g = 0; g < f; g++) {
                        var i = d[g];
                        c in i && (i[c] = Ghostlab.InspectionHelpers.getValueFromCallArgument(a.newValue))
                    }
                }
            }
        }
    },
    Ghostlab.Events.setbreakpoints = {
        receive: function(a) {
            for (var b = a.breakpoints, c = b.length, d = 0; d < c; d++)
                Ghostlab.Inspector.Debugger.setBreakpoint(b[d])
        }
    }
}(),
function() {
    var a = {
        "#DOCUMENT": "Dc",
        "#TEXT": "T",
        ":BEFORE": "Xb",
        ":AFTER": "Xa",
        "!DOCTYPE": "Xd",
        A: "A",
        ABBR: "Ab",
        ACRONYM: "Ac",
        ADDRESS: "Ad",
        APPLET: "Ap",
        AREA: "Ar",
        ARTICLE: "At",
        ASIDE: "As",
        AUDIO: "Au",
        B: "Bl",
        BASE: "Ba",
        BASEFONT: "Bf",
        BDI: "Bi",
        BDO: "Bo",
        BIG: "Bg",
        BLOCKQUOTE: "Bq",
        BODY: "B",
        BR: "Br",
        BUTTON: "Bu",
        CANVAS: "Ca",
        CAPTION: "Cp",
        CENTER: "Ce",
        CITE: "Ci",
        CODE: "Co",
        COL: "Cl",
        COLGROUP: "Cg",
        DATALIST: "Da",
        DD: "Dd",
        DEL: "De",
        DETAILS: "Ds",
        DFN: "Df",
        DIALOG: "Dl",
        DIR: "Di",
        DIV: "D",
        DL: "Dl",
        DT: "Dt",
        EM: "E",
        EMBED: "Em",
        FIELDSET: "Fs",
        FIGCAPTION: "Fc",
        FIGURE: "Fi",
        FONT: "Fo",
        FOOTER: "Ft",
        FORM: "F",
        FRAME: "Fr",
        FRAMESET: "Fe",
        H1: "Ha",
        H2: "Hb",
        H3: "Hc",
        H4: "Hd",
        H5: "He",
        H6: "Hf",
        HEAD: "Hx",
        HEADER: "H",
        HR: "Hr",
        HTML: "Ht",
        I: "I",
        IFRAME: "If",
        IMG: "Im",
        INPUT: "In",
        INS: "Is",
        KBD: "K",
        KEYGEN: "Kg",
        LABEL: "La",
        LEGEND: "Lg",
        LI: "L",
        LINK: "Lk",
        MAIN: "Ma",
        MAP: "Mp",
        MARK: "Mr",
        MENU: "Mn",
        MENUITEM: "Mi",
        META: "Me",
        METER: "Mt",
        NAV: "N",
        NOFRAMES: "Nf",
        NOSCRIPT: "Ns",
        OBJECT: "Ob",
        OL: "O",
        OPTGROUP: "Og",
        OPTION: "Op",
        OUTPUT: "Ou",
        P: "P",
        PARAM: "Pa",
        PRE: "Pr",
        PROGRESS: "Pg",
        Q: "Q",
        RP: "Rp",
        RT: "Rt",
        RUBY: "Ru",
        S: "St",
        SAMP: "Sa",
        SCRIPT: "Sc",
        SECTION: "Se",
        SELECT: "Sl",
        SMALL: "Sm",
        SOURCE: "Sr",
        SPAN: "S",
        STRIKE: "Sk",
        STRONG: "Sg",
        STYLE: "Sx",
        SUB: "Su",
        SUMMARY: "Sy",
        SUP: "Sp",
        TABLE: "Ta",
        TBODY: "Tb",
        TD: "Td",
        TEXTAREA: "Tx",
        TFOOT: "Tf",
        TH: "Th",
        THEAD: "Te",
        TIME: "Ti",
        TITLE: "Tl",
        TR: "Tr",
        TRACK: "Tk",
        TT: "Tt",
        U: "Ut",
        UL: "U",
        VAR: "Va",
        VIDEO: "V",
        WBR: "W"
    }
      , b = [":AFTER", ":BEFORE"]
      , c = {};
    for (var d in a)
        c[a[d]] = d;
    var e = new RegExp("(.*?)" + a["#TEXT"] + "(\\d*)$")
      , f = new RegExp("(?:" + Ghostlab.jQuery.map(b, function(b) {
        return a[b]
    }).join("|") + ")$")
      , g = Ghostlab.SessionStorage.get("domInspectorEnabled") || !1
      , h = !1
      , i = null
      , j = null
      , k = null
      , l = null
      , m = {}
      , n = 0
      , o = []
      , p = function(a, b) {
        var c = a[0];
        void 0 !== b && null !== b || (b = 1);
        var d = [];
        if (c.attributes)
            for (var e = c.attributes.length, f = 0; f < e; f++) {
                var g = c.attributes[f]
                  , h = g.name
                  , i = g.value;
                "data-ghostlab-node-id" === h || "data-ghostlab-style-id" === h || "__hasGhostlabEventHandler__" === h || "attachEvent" === h || "__isGhostlabAttachEventOverridden__" === h || /jQuery[\d]+/.test(h) || ("class" === h && null === (i = D(i)) || (d.push(h),
                d.push(i)))
            }
        var j = t(a)
          , k = null
          , l = 0;
        try {
            k = a.contents(),
            l = k.length
        } catch (a) {}
        var m = {
            nodeId: j,
            nodeType: c.nodeType,
            nodeName: c.nodeName,
            localName: c.localName,
            nodeValue: c.nodeValue || "",
            attributes: d,
            childNodeCount: l,
            pseudoElements: q(a, j)
        };
        if (c === document && (m.baseURL = location.href,
        m.xmlVersion = document.xmlVersion),
        0 !== b) {
            var n = r(a, b);
            m.children = n,
            m.childNodeCount = n.length
        } else
            1 === l && 3 === k[0].nodeType && (m.children = [p(k)]);
        return m
    }
      , q = function(b, c) {
        var d = function(b) {
            return {
                nodeId: c + a[":" + b.toUpperCase()],
                nodeType: 1,
                nodeName: "<pseudo>",
                localName: "<pseudo>",
                nodeValue: "",
                attributes: [],
                pseudoType: b,
                childNodeCount: 0
            }
        }
          , e = Ghostlab.Inspector.CSS.getPseudoElements(b)
          , f = [];
        return 1 & e && f.push(d("before")),
        2 & e && f.push(d("after")),
        f
    }
      , r = function(a, b) {
        void 0 !== b && null !== b || (b = 1);
        for (var c = [], d = a.contents(), e = d.length, f = 0; f < e; f++) {
            var g = d[f];
            Ghostlab.InspectionHelpers.isGhostlabDOMElement(g) || ("string" == typeof g.nodeName && "/" === g.nodeName.charAt(0) || Ghostlab.DOMHelpers.isEmptyTextNode(g) || c.push(p(Ghostlab.jQuery(g), b - 1)))
        }
        return c
    }
      , s = function(a) {
        if (a.ownerDocument)
            return a.ownerDocument;
        for (var b = a; ; b = b.parentNode) {
            if (!b)
                return null;
            if (9 === b.nodeType)
                return b
        }
        return null
    }
      , t = function(b, c) {
        if (!b || 0 === b.length)
            return null;
        var d = x()
          , e = d.Ghostlab.jQuery("html");
        if (b.is(e))
            return a.HTML;
        for (var f = b, g = ""; f.length > 0 && !f.is(e); ) {
            var h = f.attr("data-ghostlab-node-id");
            if (h) {
                if (g = h + g,
                f === b)
                    return g;
                break
            }
            var i = f[0]
              , j = f.attr("id");
            if (j && "string" == typeof j) {
                var k = s(i);
                if (!k)
                    return null;
                var l = k.defaultView;
                if (!l)
                    return null;
                var m = l.Ghostlab && l.Ghostlab.state.frameId || Ghostlab.getFrameId(l);
                g = (m ? "[" + m + "]" : "") + "{" + j.replace(/(\\|\})/g, "\\$1") + "}" + g;
                break
            }
            var n = 10 === i.nodeType
              , o = n ? "!DOCTYPE" : i.nodeName.toUpperCase().replace(/:/g, "\\:")
              , p = ""
              , q = f.parent();
            if (0 === q.length) {
                var l = i.defaultView;
                if ("#DOCUMENT" !== o || !l)
                    return null;
                var m = l.Ghostlab && l.Ghostlab.state.frameId || Ghostlab.getFrameId(l);
                if ("" === m)
                    return a["#DOCUMENT"];
                g = "[" + m + "]" + a[o];
                break
            }
            if (!n) {
                var r = "#TEXT" === o
                  , t = r ? q.contents() : q.children(o);
                (t.length > 1 || r) && (p = String(t.index(f)))
            }
            g = (a[o] || o[0] + o.substr(1).toLowerCase()) + p + g,
            f = q
        }
        return b.attr("data-ghostlab-node-id", g),
        c && (g += a[c.toUpperCase()]),
        g
    }
      , u = function(a) {
        if (!a)
            return null;
        for (var b = /[A-Z]/, c = a.length - 1, d = c; d >= 0; d--) {
            var e = a.charAt(d);
            if (b.test(e))
                return w(a.substr(0, d))
        }
        return null
    }
      , v = function(a, b) {
        var c = a ? y(a) : window;
        if (!c)
            return null;
        c.Ghostlab || (c = window);
        var d = c.Ghostlab.jQuery("[data-ghostlab-node-id=" + c.Ghostlab.DOMHelpers.escapeSelector(b) + "]");
        return d && d.length > 0 ? d : B(b).element
    }
      , w = function(a) {
        if (!a)
            return null;
        var b = null;
        if ("[" === a.charAt(0)) {
            var c = a.indexOf("]");
            b = a.substr(1, c - 1)
        }
        var d = a.match(e);
        return d ? ($elt = v(b, d[1]),
        $elt ? Ghostlab.jQuery($elt.contents()[parseInt(d[2], 10) || 0]) : null) : v(b, a.replace(f, ""))
    }
      , x = function() {
        for (var a = window; a != a.parent && a; )
            a = a.parent;
        return a
    }
      , y = function(a) {
        var b = x();
        if (!a)
            return b;
        for (var c = a.split("-"), d = c.length, e = 0; e < d; e++) {
            var f = b.Ghostlab.jQuery("iframe:eq(" + c[e] + ")");
            if (0 === f.length)
                return null;
            try {
                b = f[0].contentWindow
            } catch (a) {
                return null
            }
            if (!b)
                return null
        }
        return b
    }
      , z = function(a) {
        if ("[" !== a.charAt(0))
            return Ghostlab.state.isMainFrame;
        var b = a.indexOf("]");
        return Ghostlab.state.frameId === a.substr(1, b - 1)
    }
      , A = function(c) {
        for (var d = c.split(/(?=[A-Z])/), e = d[d.length - 1], f = b.length, g = 0; g < f; g++) {
            var h = b[g];
            if (e === a[h])
                return h
        }
        return ""
    }
      , B = function(b) {
        if (!b)
            return {};
        if (b === a["#DOCUMENT"])
            return {
                element: Ghostlab.$document
            };
        var d = Ghostlab.jQuery("html");
        if (b === a.HTML)
            return {
                element: d
            };
        var e = !1
          , f = 0
          , g = b.length
          , h = !1
          , i = !1
          , j = ""
          , k = ""
          , l = function() {
            if (j)
                switch (j) {
                case a["#DOCUMENT"]:
                    d.is("iframe") ? d = Ghostlab.jQuery(d[0].contentDocument) : d[0].document && (d = Ghostlab.jQuery(d[0].document));
                    break;
                case a["!DOCTYPE"]:
                    if (9 === d[0].nodeType)
                        d = Ghostlab.jQuery(d[0].doctype);
                    else {
                        var b = s(d[0]);
                        b && (d = Ghostlab.jQuery(b.doctype))
                    }
                    break;
                default:
                    if ("[" === j.charAt(0))
                        d = Ghostlab.jQuery(y(j.substr(1)));
                    else {
                        var e = "#" === j.charAt(0) ? j : " > " + (c[j] || j);
                        k && (e += ":eq(" + k + ")"),
                        d = d.find(e)
                    }
                }
            j = "",
            k = ""
        };
        for (idx = 0; idx < g; idx++) {
            var m = b.charAt(idx);
            if ("{" !== m || h)
                if ("[" !== m || i)
                    if (h)
                        "}" === m && idx >= 1 && "\\" !== b.charAt(idx - 1) ? h = !1 : (/[!"#$%&'\(\)\*\+,\.\/:;<=>\?@\[\]^`\{\|~]/.test(m) && (j += "\\"),
                        j += m);
                    else if (i)
                        "]" === m ? i = !1 : j += m;
                    else {
                        var n = /[A-Z]/.test(m)
                          , o = !n && /[a-z]/.test(m)
                          , p = !n && !o && /[0-9]/.test(m);
                        n ? (l(),
                        j = m) : o ? j += m : p && (k += m)
                    }
                else
                    i = !0,
                    l(),
                    j = "[";
            else
                h = !0,
                l(),
                j = "#"
        }
        return j === a["#TEXT"] ? (e = !0,
        f = k) : l(),
        e && (d = Ghostlab.jQuery(d.contents()[parseInt(f || 0, 10)])),
        {
            isTextNode: e,
            element: d
        }
    }
      , C = function(a, b, c, d) {
        var e = c || a[0].nodeName;
        if (!e)
            return a[0].nodeValue;
        e = e.toLowerCase();
        var f = "<" + e
          , g = a[0].attributes;
        if (g)
            for (var h = g.length, i = 0; i < h; i++)
                (d || "data-ghostlab-node-id" !== g[i].name) && (f += " " + g[i].name + '="' + g[i].value + '"');
        var j = b || "";
        return !d && j && (j = j.replace(/\s*data-ghostlab-node-id=['"]?[^'"]+['"]?/g, "")),
        f + ">" + j + "</" + e + ">"
    }
      , D = function(a) {
        var b = a
          , c = Ghostlab.StringHelpers.trim(a.replace(/\s*__ghostlab-(?:active|focus|hover|visited)__\s*/g, " "));
        return "" === c && "" !== b ? null : c
    }
      , E = function(a) {
        if (a) {
            var b = a.r.toString(16)
              , c = a.g.toString(16)
              , d = a.b.toString(16);
            return "#" + "00".substr(b.length) + b + "00".substr(c.length) + c + "00".substr(d.length) + d
        }
    }
      , F = function(a, b) {
        if (i && void 0 !== a && 0 !== a.length) {
            j = a,
            k = b;
            var c, d, e, f, g, h = a[0].nodeType;
            if (3 === h && (d = e = f = g = Ghostlab.UIHelpers.getTextNodeSize(a),
            c = {
                x: g.x,
                y: g.y,
                w: g.w,
                h: g.h,
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
            }),
            g || 7 === h || 10 === h || (void 0 !== a[0] && void 0 === a[0].tagName && (a = a.parent()),
            c = Ghostlab.UIHelpers.getElementSizes(a),
            d = {
                x: c.x - c.marginLeft,
                y: c.y - c.marginTop
            },
            e = {
                x: c.x,
                y: c.y
            },
            f = {
                x: e.x + c.borderLeft,
                y: e.y + c.borderTop,
                w: c.width + c.paddingLeft + c.paddingRight,
                h: c.height + c.paddingTop + c.paddingBottom
            },
            g = {
                x: f.x + c.paddingLeft,
                y: f.y + c.paddingTop,
                w: c.width,
                h: c.height
            },
            e.w = f.w + c.borderLeft + c.borderRight,
            e.h = f.h + c.borderTop + c.borderBottom,
            d.w = e.w + c.marginLeft + c.marginRight,
            d.h = e.h + c.marginTop + c.marginBottom),
            !g)
                return void i.hide();
            var l = Ghostlab.ua.msie8 ? "#ffffff" : "rgba(0, 0, 0, 0)"
              , m = Ghostlab.jQuery("body")
              , n = "relative" === m.css("position")
              , o = n ? m.offset() : {
                left: 0,
                top: 0
            };
            n && (o.left += parseInt(m.css("border-left-width") || 0, 10),
            o.top += parseInt(m.css("border-top-width") || 0, 10));
            var p = E(b && b.marginColor) || l;
            i.margin.css({
                left: d.x - o.left,
                top: d.y - o.top,
                width: d.w,
                height: d.h,
                "border-left": c.marginLeft + "px solid " + p,
                "border-top": c.marginTop + "px solid " + p,
                "border-right": c.marginRight + "px solid " + p,
                "border-bottom": c.marginBottom + "px solid " + p,
                opacity: Ghostlab.ua.msie8 ? b && b.marginColor ? .7 : 0 : .7
            });
            var q = E(b && b.borderColor) || l;
            i.border.css({
                width: e.w,
                height: e.h,
                "border-left": c.borderLeft + "px solid " + q,
                "border-top": c.borderTop + "px solid " + q,
                "border-right": c.borderRight + "px solid " + q,
                "border-bottom": c.borderBottom + "px solid " + q,
                opacity: Ghostlab.ua.msie8 ? b && b.borderColor ? .7 : 0 : 1
            });
            var r = E(b && b.paddingColor) || l;
            i.padding.css({
                width: f.w,
                height: f.h,
                "border-left": c.paddingLeft + "px solid " + r,
                "border-top": c.paddingTop + "px solid " + r,
                "border-right": c.paddingRight + "px solid " + r,
                "border-bottom": c.paddingBottom + "px solid " + r,
                opacity: Ghostlab.ua.msie8 ? b && b.paddingColor ? .7 : 0 : 1
            }),
            i.content.css({
                width: g.w,
                height: g.h,
                "background-color": E(b && b.contentColor) || l,
                opacity: Ghostlab.ua.msie8 ? b && b.contentColor ? .7 : 0 : 1
            }),
            i.show()
        }
    }
      , G = function(a, b) {
        for (var c = [], d = x(), e = d.Ghostlab.jQuery("html"), f = a; ; ) {
            var g = f.parent();
            if (void 0 === g || g[0] === d.document || g.is(e))
                break;
            if (0 === g.length) {
                var h = f[0];
                if ("#document" !== h.nodeName.toLowerCase())
                    break;
                var i = h.defaultView;
                if (!i || !i.Ghostlab)
                    break;
                var j = i.parent;
                if (!j || i == j || !j.Ghostlab)
                    break;
                var k = i.Ghostlab.state.frameId.lastIndexOf("-")
                  , l = parseInt(i.Ghostlab.state.frameId.substr(k + 1));
                if (g = j.Ghostlab.jQuery("iframe:eq(" + l + ")"),
                0 === g.length)
                    break
            }
            c.push(g),
            f = g
        }
        for (var m = [], n = c.length - 1; n >= 0; n--) {
            var f = c[n];
            if (!f.data("ghostlab-child-nodes-set")) {
                var p = t(f);
                null !== p && (m.push({
                    parentId: p,
                    nodes: r(f)
                }),
                f.data("ghostlab-child-nodes-set", !0),
                o.push(f[0]))
            }
        }
        var q = m.length;
        if (0 === q && b)
            b();
        else if (q > 0)
            for (var n = 0; n < q; n++)
                !function(a, c, d) {
                    setTimeout(function() {
                        Ghostlab.Inspector.sendEvent("DOM.setChildNodes", a),
                        d && b && b()
                    }, c)
                }(m[n], 100 * n, n === q - 1)
    }
      , H = function(a, b, c, d) {
        if (!(Ghostlab.features.hasMutationObserver || Ghostlab.jQuery.inArray($elt[0], Ghostlab.state.domMutationIgnoreNodes) >= 0)) {
            var e = null
              , f = 0;
            if (a) {
                var g = c || a.parent();
                e = t(g),
                f = a.length,
                null !== e && f > 1 && Ghostlab.Inspector.sendEvent("DOM.childNodeCountUpdated", {
                    nodeId: e,
                    childNodeCount: g.contents().length
                })
            }
            if (b) {
                var h = t(d || b.parent());
                if (null !== h)
                    for (var i = b.length, j = 0; j < i; j++) {
                        var k = t(Ghostlab.jQuery(b[j]));
                        null !== k && Ghostlab.Inspector.sendEvent("DOM.childNodeRemoved", {
                            parentNodeId: h,
                            nodeId: k
                        })
                    }
            }
            if (a)
                for (var l = a.prev(), j = 0; j < f; j++) {
                    var m = t(l);
                    l = Ghostlab.jQuery(a[j]),
                    Ghostlab.Inspector.sendEvent("DOM.childNodeInserted", {
                        parentNodeId: e,
                        previousNodeId: m,
                        node: p(l)
                    })
                }
        }
    }
      , I = function(a) {
        if (!(Ghostlab.features.hasMutationObserver || Ghostlab.jQuery.inArray(a[0], Ghostlab.state.domMutationIgnoreNodes) >= 0)) {
            var b = t(a);
            null !== b && Ghostlab.Inspector.sendEvent("DOM.characterDataModified", {
                nodeId: b,
                characterData: a.text()
            })
        }
    }
      , J = function(a, b, c) {
        "data-ghostlab-node-id" !== b && ("class" === b && null === (c = D(c)) || Ghostlab.Inspector.sendEvent("DOM.attributeModified", {
            nodeId: a,
            name: b,
            value: c
        }))
    }
      , K = function(a, b, c) {
        if (!(Ghostlab.features.hasMutationObserver || Ghostlab.jQuery.inArray(a[0], Ghostlab.state.domMutationIgnoreNodes) >= 0)) {
            var d = t(a);
            if (null !== d) {
                if (b)
                    for (var e = b.length, f = 0; f < e; f++)
                        J(d, b[f], a.attr(name));
                if (c)
                    for (var e = c.length, f = 0; f < e; f++)
                        Ghostlab.Inspector.sendEvent("DOM.attributeRemoved", {
                            nodeId: d,
                            name: c[f]
                        })
            }
        }
    }
      , L = function(a, b, c, d) {
        if (Ghostlab.state.isMainFrame) {
            var e = w(a);
            if (e && 0 !== e.length) {
                var f = w(b);
                if (f && 0 !== f.length) {
                    var g = c ? w(c) : null;
                    if (null === g || 0 !== g.length)
                        return d ? (e = e.clone(),
                        e.removeAttr("data-ghostlab-node-id")) : H(e, e, f, e.parent()),
                        null === g ? e.appendTo(f) : e.insertBefore(g),
                        d && H(e),
                        d ? t(e) : a
                }
            }
        }
    };
    Ghostlab.Inspector.getElementForNodeId = w,
    Ghostlab.Inspector.getPseudoForNodeId = A,
    Ghostlab.Inspector.getNodeId = t,
    Ghostlab.Inspector.elementBelongsToFrame = z,
    Ghostlab.Inspector.getParentNodeFromNodeId = u;
    var M = function(a) {
        var b = Ghostlab.jQuery(a.target || a.srcElement)
          , c = b.attr("id");
        b.length > 0 && "__ghostlab_highlighter_margin__" !== c && "__ghostlab_highlighter_border__" !== c && "__ghostlab_highlighter_padding__" !== c && "__ghostlab_highlighter_content__" !== c && F(b, l)
    }
      , N = function(a) {
        "function" == typeof a.preventDefault && a.preventDefault(),
        "function" == typeof a.stopImmediatePropagation && a.stopImmediatePropagation();
        var b = Ghostlab.jQuery(a.target || a.srcElement);
        return G(b, function() {
            var a = t(b);
            null !== a && Ghostlab.Inspector.sendEvent("DOM.inspectNodeRequested", {
                backendNodeId: a
            })
        }),
        Ghostlab.$document.off("mouseover", M),
        Ghostlab.Events.cancelinspect.receive(),
        Ghostlab.broadcastEvent({
            event: "cancelinspect"
        }),
        !1
    }
      , O = function() {
        Ghostlab.features.hasAddEventListener ? document.removeEventListener("click", N, !0) : Ghostlab.$document.off("click", N)
    };
    "undefined" != typeof HTMLElement && void 0 === HTMLElement.prototype.scrollIntoViewIfNeeded && (HTMLElement.prototype.scrollIntoViewIfNeeded = function() {
        Ghostlab.UIHelpers.scrollIntoView(Ghostlab.jQuery(this))
    }
    ),
    Ghostlab.Inspector.DOM = {
        $0: void 0,
        $1: void 0,
        $2: void 0,
        $3: void 0,
        $4: void 0,
        init: function() {
            if (!i) {
                var a = Ghostlab.jQuery('<div id="__ghostlab_highlighter_margin__" style="position: absolute; padding: 0; box-sizing: border-box; pointer-events: none; display: none; z-index: 9999999"><div id="__ghostlab_highlighter_border__" style="position: absolute; padding: 0; box-sizing: border-box; pointer-events: none;"><div id="__ghostlab_highlighter_padding__" style="position: absolute; padding: 0; box-sizing: border-box; pointer-events: none;"><div id="__ghostlab_highlighter_content__" style="position: absolute; padding: 0; box-sizing: border-box; pointer-events: none;"></div></div></div></div>');
                i = {
                    margin: a,
                    border: a.find("#__ghostlab_highlighter_border__"),
                    padding: a.find("#__ghostlab_highlighter_padding__"),
                    content: a.find("#__ghostlab_highlighter_content__"),
                    show: function() {
                        i.margin.show()
                    },
                    hide: function() {
                        i.margin.hide(),
                        j = null
                    }
                },
                Ghostlab.jQuery("body").append(a)
            }
            g && Ghostlab.addMutationListener(Ghostlab.Inspector.DOM.onDOMMutation)
        },
        enable: function() {
            g = !0,
            Ghostlab.SessionStorage.set("domInspectorEnabled", !0),
            Ghostlab.addMutationListener(Ghostlab.Inspector.DOM.onDOMMutation);
            for (var a = o.length, b = 0; b < a; b++)
                Ghostlab.jQuery.removeData(o[b], "ghostlab-child-nodes-set");
            return o = [],
            {}
        },
        disable: function() {
            return g = !1,
            Ghostlab.SessionStorage.set("domInspectorEnabled", !1),
            h = !1,
            {}
        },
        getDocument: function(a) {
            if (h = !0,
            Ghostlab.state.isMainFrame)
                return {
                    root: p(Ghostlab.$document, a && a.depth || 2)
                }
        },
        collectClassNamesFromSubtree: function(a) {
            if (Ghostlab.state.isMainFrame) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length) {
                    var c = {}
                      , d = function(a) {
                        var b = a.attr("class");
                        if (b)
                            for (var e = b.split(/\s+/), f = e.length, g = 0; g < f; g++)
                                c[e[g]] = !0;
                        for (var h = a.children(), f = h.length, g = 0; g < f; g++)
                            d(Ghostlab.jQuery(h[g]))
                    };
                    d(b);
                    var e;
                    if ("function" == typeof Object.keys)
                        e = Object.keys(c);
                    else {
                        e = [];
                        for (var f in c)
                            e.push(f)
                    }
                    return {
                        classNames: e
                    }
                }
            }
        },
        requestChildNodes: function(a) {
            if (Ghostlab.state.isMainFrame) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length)
                    return Ghostlab.Inspector.sendEvent("DOM.setChildNodes", {
                        parentId: a.nodeId,
                        nodes: r(b, a.depth || 1)
                    }),
                    b.data("ghostlab-child-nodes-set", !0),
                    o.push(b[0]),
                    {}
            }
        },
        querySelector: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                if (!b || 0 === b.length)
                    return {};
                var c = b.find(a.selector);
                if (!c || 0 === c.length)
                    return {};
                var d = t(c.first());
                return null === d ? {} : {
                    nodeId: d
                }
            }
        },
        querySelectorAll: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length) {
                    var c = b.find(a.selector);
                    if (c) {
                        for (var d = c.length, e = [], f = 0; f < d; f++) {
                            var g = t(Ghostlab.jQuery(c[f]));
                            null !== g && e.push(g)
                        }
                        return {
                            nodeIds: e
                        }
                    }
                }
            }
        },
        setNodeName: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length) {
                    var c = Ghostlab.jQuery(C(b, b.html(), a.name));
                    return c.insertAfter(b),
                    H(c, b),
                    b.remove(),
                    {
                        nodeId: t(c)
                    }
                }
            }
        },
        setNodeValue: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                b && 0 !== b.length && 1 === b.length && (Ghostlab.ua.msie8 ? b[0].innerText = a.value : b[0].textContent = a.value,
                I(b))
            }
        },
        removeNode: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                b && 0 !== b.length && (H(null, b),
                b.remove(),
                i && i.hide())
            }
        },
        setAttributeValue: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                b && 0 !== b.length && (b.attr(a.name, a.value),
                K(b, [a.name], null))
            }
        },
        setAttributesAsText: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length) {
                    var c = Ghostlab.jQuery.parseHTML("<div " + a.text + "></div>")[0]
                      , d = (c.attributes || 0) && c.attributes.length
                      , e = [];
                    a.name && b.removeAttr(a.name);
                    for (var f = 0; f < d; f++) {
                        var g = c.attributes[f];
                        b.attr(g.name, g.value),
                        e.push(g.name)
                    }
                    K(b, e, a.name ? Ghostlab.jQuery.inArray(a.name, e) >= 0 ? null : [a.name] : null)
                }
            }
        },
        removeAttribute: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                b && 0 !== b.length && (b.removeAttr(a.name),
                K(b, null, [a.name]))
            }
        },
        getOuterHTML: function(a) {
            if ((void 0 !== a.nodeId || Ghostlab.state.isMainFrame) && (void 0 === a.nodeId || z(a.nodeId))) {
                if (void 0 === a.nodeId) {
                    var b = ""
                      , c = document.doctype;
                    c && (b = "<!DOCTYPE " + c.name,
                    c.publicId ? b += ' PUBLIC "' + c.publicId + '"' : c.systemId && (b += " SYSTEM "),
                    c.systemId && (b += ' "' + c.systemId + '"'),
                    b += ">");
                    var d = i.margin.remove()
                      , e = document.documentElement.outerHTML;
                    return b += e || C(Ghostlab.jQuery("html"), document.documentElement.innerHTML, null, !0),
                    Ghostlab.jQuery("body").append(d),
                    i.margin = d,
                    i.border = d.find("#__ghostlab_highlighter_border__"),
                    i.padding = d.find("#__ghostlab_highlighter_padding__"),
                    i.content = d.find("#__ghostlab_highlighter_content__"),
                    {
                        outerHTML: b
                    }
                }
                var d = w(a.nodeId);
                if (d && 0 !== d.length) {
                    var e = d[0].outerHTML;
                    return e || (e = C(d, d.html())),
                    {
                        outerHTML: e
                    }
                }
            }
        },
        setOuterHTML: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length)
                    if (a.outerHTML) {
                        var c = Ghostlab.jQuery(a.outerHTML);
                        b.replaceWith(c),
                        H(c, b)
                    } else
                        b.remove()
            }
        },
        performSearch: function(a) {
            if (Ghostlab.state.isMainFrame) {
                var b = []
                  , c = function(a, d) {
                    if (!Ghostlab.InspectionHelpers.isGhostlabDOMElement(d)) {
                        var e = d[0];
                        if (3 === e.nodeType) {
                            var f = e.nodeValue;
                            f && f.toLowerCase().indexOf(a) >= 0 && b.push(d)
                        } else {
                            if (e.nodeName && ("<" + e.nodeName.toLowerCase() + ">").indexOf(a) >= 0)
                                b.push(d);
                            else if (e.attributes)
                                for (var g = e.attributes.length, h = 0; h < g; h++) {
                                    var i = e.attributes[h]
                                      , j = i.name;
                                    if ("data-ghostlab-node-id" !== j) {
                                        if (j && j.toLowerCase().indexOf(a) >= 0) {
                                            b.push(d);
                                            break
                                        }
                                        var k = i.value;
                                        if (k) {
                                            var l = k.toLowerCase()
                                              , f = "'" + l + "'";
                                            if (f.indexOf(a) >= 0) {
                                                b.push(d);
                                                break
                                            }
                                            if (f = '"' + l + '"',
                                            f.indexOf(a) >= 0) {
                                                b.push(d);
                                                break
                                            }
                                        }
                                    }
                                }
                            for (var m = d.contents(), g = m.length, h = 0; h < g; h++)
                                c(a.toLowerCase(), Ghostlab.jQuery(m[h]))
                        }
                    }
                };
                c(a.query, Ghostlab.jQuery("html"));
                var d = String(n);
                return m[d] = b,
                n++,
                {
                    searchId: d,
                    resultCount: b.length
                }
            }
        },
        getSearchResults: function(a) {
            if (Ghostlab.state.isMainFrame) {
                var b = m[a.searchId];
                if (!b)
                    return {
                        nodeIds: []
                    };
                for (var c = [], d = a.toIndex, e = a.fromIndex; e < d; e++) {
                    var f = b[e];
                    G(f);
                    var g = t(f);
                    null !== g && c.push(g)
                }
                return {
                    nodeIds: c
                }
            }
        },
        discardSearchResults: function(a) {
            delete m[a.searchId]
        },
        requestNode: function(a) {
            var b = Ghostlab.InspectionHelpers.getObjectById(a.objectId);
            if (b && b instanceof Element) {
                var c = Ghostlab.jQuery(b);
                return G(c),
                {
                    nodeId: t(c)
                }
            }
        },
        setInspectMode: function(a) {
            "searchForNode" === a.mode ? (Ghostlab.state.preventClickPropagation = !0,
            l = a.highlightConfig,
            Ghostlab.$document.on("mouseover", M),
            Ghostlab.features.hasAddEventListener ? document.addEventListener("click", N, !0) : Ghostlab.$document.on("click", N)) : (Ghostlab.state.preventClickPropagation = !1,
            Ghostlab.$document.off("mouseover", M),
            O())
        },
        highlightNode: function(a) {
            if (i) {
                var b = void 0;
                if (void 0 !== a.nodeId && z(a.nodeId))
                    b = w(a.nodeId);
                else if (void 0 !== a.objectId) {
                    var c = Ghostlab.InspectionHelpers.getObjectById(a.objectId);
                    c && c instanceof Element && (b = Ghostlab.jQuery(c))
                }
                b && 0 !== b.length && b[0] !== document ? F(b, a.highlightConfig) : i.hide()
            }
        },
        hideHighlight: function(a) {
            i && i.hide()
        },
        highlightFrame: function(a) {
            if (i && Ghostlab.state.frameId === a.frameId) {
                var b = {
                    marginColor: a.contentOutlineColor,
                    borderColor: a.contentColor,
                    paddingColor: a.contentColor,
                    contentColor: a.contentColor
                };
                F(Ghostlab.jQuery("html"), b)
            }
        },
        setInspectedNode: function(a) {
            var b = w(a.nodeId);
            b && b.length > 0 && (Ghostlab.Inspector.DOM.$4 = Ghostlab.Inspector.DOM.$3,
            Ghostlab.Inspector.DOM.$3 = Ghostlab.Inspector.DOM.$2,
            Ghostlab.Inspector.DOM.$2 = Ghostlab.Inspector.DOM.$1,
            Ghostlab.Inspector.DOM.$1 = Ghostlab.Inspector.DOM.$0,
            Ghostlab.Inspector.DOM.$0 = b[0])
        },
        resolveNode: function(a) {
            if (z(a.nodeId)) {
                var b = void 0
                  , c = w(a.nodeId);
                return c && c.length > 0 && (b = c[0]),
                {
                    object: Ghostlab.InspectionHelpers.getRemoteObject(b)
                }
            }
        },
        getAttributes: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                if (b && 0 !== b.length) {
                    var c = [];
                    if (b.length > 0) {
                        var d = b[0].attributes;
                        if (d)
                            for (var e = d.length, f = 0; f < e; f++) {
                                var g = d[f]
                                  , h = g.value;
                                "data-ghostlab-node-id" !== g.name && ("class" === g.name && null === (h = D(h)) || (c.push(g.name),
                                c.push(h)))
                            }
                    }
                    return {
                        attributes: c
                    }
                }
            }
        },
        copyTo: function(a) {
            return {
                nodeId: L(a.nodeId, a.targetNodeId, a.insertBeforeNodeId, !0)
            }
        },
        moveTo: function(a) {
            return {
                nodeId: L(a.nodeId, a.targetNodeId, a.insertBeforeNodeId, !1)
            }
        },
        focus: function(a) {
            if (z(a.nodeId)) {
                var b = w(a.nodeId);
                b && 0 !== b.length && 3 === b[0].nodeType && b.focus()
            }
        },
        getNodeForLocation: function(a) {
            if (Ghostlab.state.isMainFrame)
                return {
                    nodeId: t(Ghostlab.UIHelpers.elementFromPoint(a.x, a.y))
                }
        },
        updateHighlight: function() {
            null === j || null === k ? i.hide() : F(j, k)
        },
        onDOMMutation: function(a) {
            var b = a.target;
            if (g && h && !Ghostlab.InspectionHelpers.isGhostlabDOMElement(b) && "data-ghostlab-node-id" !== a.attributeName) {
                var c = Ghostlab.jQuery(a.target);
                switch (G(c),
                a.type) {
                case "attributes":
                    if (Ghostlab.jQuery.inArray(b, Ghostlab.state.domMutationIgnoreNodes) >= 0)
                        return;
                    var d = a.attributeName
                      , e = c.attr(d);
                    if (void 0 === e) {
                        var f = t(c);
                        null !== f && Ghostlab.Inspector.sendEvent("DOM.attributeRemoved", {
                            nodeId: f,
                            name: a.attributeName
                        })
                    } else {
                        var f = t(c);
                        null !== f && J(f, d, e)
                    }
                    Ghostlab.Inspector.CSS.isEnabled() && c.is("link") && "stylesheet" === c.attr("rel").toLowerCase() && "href" === d && Ghostlab.Inspector.CSS.replaceStyleSheet(a.oldValue, e);
                    break;
                case "characterData":
                    if (Ghostlab.jQuery.inArray(b, Ghostlab.state.domMutationIgnoreNodes) >= 0)
                        return;
                    var f = t(c);
                    null !== f && Ghostlab.Inspector.sendEvent("DOM.characterDataModified", {
                        nodeId: f,
                        characterData: c.text()
                    });
                    break;
                case "childList":
                    if (Ghostlab.state.domMutationIgnoreNodes.length > 0)
                        for (var i = b.childNodes, j = i && i.length || 0, k = 0; k < j; k++)
                            if (Ghostlab.jQuery.inArray(i[k], Ghostlab.state.domMutationIgnoreNodes) >= 0)
                                return;
                    var l = t(c);
                    if (null === l)
                        break;
                    Ghostlab.Inspector.sendEvent("DOM.childNodeCountUpdated", {
                        nodeId: l,
                        childNodeCount: c.contents().length
                    });
                    var m = a.addedNodes.length;
                    if (m > 0) {
                        for (var n = a.previousSibling; null !== n && (Ghostlab.DOMHelpers.isEmptyTextNode(n) || Ghostlab.InspectionHelpers.isGhostlabDOMElement(n)); )
                            n = n.previousSibling;
                        for (var o = null === n ? null : Ghostlab.jQuery(n), k = 0; k < m; k++) {
                            var q = a.addedNodes[k];
                            if (!Ghostlab.DOMHelpers.isEmptyTextNode(q) && !Ghostlab.InspectionHelpers.isGhostlabDOMElement(q)) {
                                var r = t(o);
                                o = Ghostlab.jQuery(q),
                                Ghostlab.Inspector.sendEvent("DOM.childNodeInserted", {
                                    parentNodeId: l,
                                    previousNodeId: r,
                                    node: p(o)
                                })
                            }
                        }
                    }
                    m = a.removedNodes.length;
                    for (var k = 0; k < m; k++) {
                        var f = t(Ghostlab.jQuery(a.removedNodes[k]));
                        null !== f && Ghostlab.Inspector.sendEvent("DOM.childNodeRemoved", {
                            parentNodeId: l,
                            nodeId: f
                        })
                    }
                }
            }
        },
        sendAttributeModified: J,
        pushNodePathToFrontend: G
    },
    Ghostlab.Events.cancelinspect = {
        receive: function(a) {
            a && a.clientId === Ghostlab.state.myId || (Ghostlab.$document.off("mouseover", M),
            O(),
            i.hide())
        }
    }
}(),
function() {
    var a = Ghostlab.URLHelpers.parseUrl(Ghostlab.unrewriteUrl(location.href))
      , b = a.protocol + "//" + a.host
      , c = function(a, c, d, e) {
        var f = e[0]
          , g = e[1]
          , h = d.getItem(f);
        a.apply(d, e),
        null === h ? Ghostlab.Inspector.sendEvent("DOMStorage.domStorageItemAdded", {
            storageId: {
                securityOrigin: b,
                isLocalStorage: c
            },
            key: f,
            newValue: g
        }) : Ghostlab.Inspector.sendEvent("DOMStorage.domStorageItemUpdated", {
            storageId: {
                securityOrigin: b,
                isLocalStorage: c
            },
            key: f,
            newValue: g,
            oldValue: h
        })
    }
      , d = function(a, c, d, e) {
        var f = e[0];
        a.apply(d, e),
        Ghostlab.Inspector.sendEvent("DOMStorage.domStorageItemRemoved", {
            storageId: {
                securityOrigin: b,
                isLocalStorage: c
            },
            key: f
        })
    };
    Ghostlab.Inspector.DOMStorage = {
        init: function() {
            if ("undefined" != typeof Storage) {
                var a = Storage.prototype.setItem
                  , b = Storage.prototype.removeItem;
                Storage.prototype.setItem = function() {
                    this === window.localStorage ? c(a, !0, this, arguments) : this === window.sessionStorage ? c(a, !1, this, arguments) : a.apply(this, arguments)
                }
                ,
                Storage.prototype.removeItem = function() {
                    this === window.localStorage ? d(b, !0, this, arguments) : this === window.sessionStorage ? d(b, !1, this, arguments) : b.apply(this, arguments)
                }
            }
        },
        clear: function(a) {
            if (a.storageId.securityOrigin === b) {
                var c = a.storageId.isLocalStorage ? window.localStorage : window.sessionStorage;
                if (c) {
                    var d = [];
                    try {
                        for (var e = c.length, f = 0; f < e; f++) {
                            var g = c.key(f);
                            !g || "__areion" !== g.substr(0, 8) && "__ghostlab" !== g.substr(0, 10) || d.push([g, c.getItem(g)])
                        }
                    } catch (a) {}
                    try {
                        c.clear()
                    } catch (a) {}
                    for (var h = d.length, f = 0; f < h; f++) {
                        var i = d[f];
                        try {
                            c.setItem(i[0], i[1])
                        } catch (a) {}
                    }
                }
            }
        },
        getDOMStorageItems: function(a) {
            if (Ghostlab.state.isMainFrame) {
                var c = [];
                if ("undefined" == typeof Storage || a.storageId.securityOrigin !== b)
                    return {
                        entries: c
                    };
                var d = a.storageId.isLocalStorage ? window.localStorage : window.sessionStorage;
                if (!d)
                    return {
                        entries: c
                    };
                try {
                    for (var e = d.length, f = 0; f < e; f++) {
                        var g = d.key(f);
                        g && "__areion" !== g.substr(0, 8) && "__ghostlab" !== g.substr(0, 10) && c.push([g, d.getItem(g)])
                    }
                } catch (a) {}
                return {
                    entries: c
                }
            }
        },
        setDOMStorageItem: function(a) {
            if (Ghostlab.state.isMainFrame && "undefined" != typeof Storage && a.storageId.securityOrigin === b) {
                var c = a.key;
                if ("__areion" !== c.substr(0, 8) && "__ghostlab" !== c.substr(0, 10)) {
                    var d = a.storageId.isLocalStorage ? window.localStorage : window.sessionStorage;
                    if (d)
                        try {
                            d.setItem(c, a.value)
                        } catch (a) {}
                }
            }
        },
        removeDOMStorageItem: function(a) {
            if (Ghostlab.state.isMainFrame && "undefined" != typeof Storage && a.storageId.securityOrigin === b) {
                var c = a.key;
                if ("__areion" !== c.substr(0, 8) && "__ghostlab" !== c.substr(0, 10)) {
                    var d = a.storageId.isLocalStorage ? window.localStorage : window.sessionStorage;
                    if (d)
                        try {
                            d.removeItem(c)
                        } catch (a) {}
                }
            }
        }
    }
}(),
function() {
    var a = Ghostlab.unrewriteUrl(location.protocol + "//" + location.host)
      , b = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB
      , c = window.IDBKeyRange || window.webkitIDBKeyRange
      , d = window.IDBTransaction || window.webkitIDBTransaction;
    d && (d.READ_WRITE = d.READ_WRITE || "readwrite",
    d.READ_ONLY = d.READ_ONLY || "readonly");
    var e = function(a) {
        return Ghostlab.jQuery.isArray(a) ? {
            type: "array",
            array: a
        } : "string" == typeof a ? {
            type: "string",
            string: a
        } : {
            type: "null"
        }
    };
    Ghostlab.Inspector.IndexedDB = {
        requestDatabaseNames: function(c, d) {
            if (Ghostlab.state.isMainFrame && void 0 !== b && c.securityOrigin === a) {
                if (void 0 === b.webkitGetDatabaseNames)
                    return {
                        databaseNames: Ghostlab.Overrides.IndexedDB.getDatabases()
                    };
                var e = b.webkitGetDatabaseNames();
                e.onsuccess = function(a) {
                    for (var b = [], c = a.target.result.length, e = 0; e < c; e++)
                        b.push(a.target.result[e]);
                    d({
                        result: {
                            databaseNames: b
                        }
                    })
                }
                ,
                e.onerror = function() {
                    d({
                        result: {
                            databaseNames: Object.keys(_databaseNames)
                        }
                    })
                }
            }
        },
        requestDatabase: function(c, f) {
            if (Ghostlab.state.isMainFrame && void 0 !== b && c.securityOrigin === a) {
                var g = Ghostlab.Overrides.IndexedDB.open(c.databaseName);
                g.onsuccess = function(a) {
                    for (var b = a.target.result, g = b && b.objectStoreNames && b.objectStoreNames.length || 0, h = {
                        name: c.databaseName,
                        version: String(b.version),
                        intVersion: b.version,
                        objectStores: []
                    }, i = 0; i < g; i++) {
                        for (var j = b.objectStoreNames[i], k = b.transaction(j, d.READ_ONLY), l = k.objectStore(j), m = [], n = l.indexNames.length, o = 0; o < n; o++) {
                            var p = l.index(l.indexNames[o]);
                            m.push({
                                name: p.name,
                                keyPath: e(p.keyPath),
                                unique: p.unique,
                                multiEntry: p.multiEntry
                            })
                        }
                        h.objectStores.push({
                            name: j,
                            indexes: m,
                            autoIncrement: l.autoIncrement,
                            keyPath: e(l.keyPath)
                        })
                    }
                    f({
                        result: {
                            databaseWithObjectStores: h
                        }
                    })
                }
                ,
                g.onerror = function() {
                    f({
                        result: {
                            databaseWithObjectStores: {
                                name: c.databaseName,
                                version: "",
                                objectStores: []
                            }
                        }
                    })
                }
            }
        },
        requestData: function(e, f) {
            if (Ghostlab.state.isMainFrame && void 0 !== b && e.securityOrigin === a) {
                var g = Ghostlab.Overrides.IndexedDB.open(e.databaseName);
                g.onsuccess = function(a) {
                    var b = []
                      , g = void 0;
                    if (void 0 !== e.keyRange) {
                        var h = "";
                        void 0 !== e.keyRange.lower.number ? h = e.keyRange.lower.number : void 0 !== e.keyRange.lower.string && (h = e.keyRange.lower.string),
                        g = c.lowerBound(h, e.keyRange.lowerOpen)
                    }
                    var i = a.target.result
                      , j = e.objectStoreName
                      , k = i.transaction(j, d.READ_ONLY)
                      , l = k.objectStore(j)
                      , m = 0
                      , n = e.indexName ? l.index(e.indexName).openCursor(g) : l.openCursor(g);
                    n.onsuccess = function(a) {
                        var c = a.target.result;
                        if (c) {
                            if (e.skipCount <= m && m < e.pageSize + e.skipCount) {
                                c.source;
                                b.push({
                                    key: Ghostlab.InspectionHelpers.getRemoteObject(c.key),
                                    primaryKey: Ghostlab.InspectionHelpers.getRemoteObject(c.primaryKey),
                                    value: Ghostlab.InspectionHelpers.getRemoteObject(c.value)
                                })
                            }
                            ++m,
                            m >= e.pageSize + e.skipCount + 1 ? f({
                                result: {
                                    objectStoreDataEntries: b,
                                    hasMore: !0
                                }
                            }) : c.continue()
                        } else
                            f({
                                result: {
                                    objectStoreDataEntries: b,
                                    hasMore: !1
                                }
                            })
                    }
                    ,
                    n.onerror = function() {
                        f({
                            result: {
                                objectStoreDataEntries: [],
                                hasMore: !1
                            }
                        })
                    }
                }
                ,
                g.onerror = function() {
                    f({
                        result: {
                            objectStoreDataEntries: [],
                            hasMore: !1
                        }
                    })
                }
            }
        },
        clearObjectStore: function(c, e) {
            if (Ghostlab.state.isMainFrame && void 0 !== b && c.securityOrigin === a) {
                var f = Ghostlab.Overrides.IndexedDB.open(c.databaseName);
                f.onsuccess = function(a) {
                    a.target.result.transaction(c.objectStoreName, d.READ_WRITE).objectStore(c.objectStoreName).clear(),
                    e && e({})
                }
                ,
                f.onerror = function(a) {
                    e && e({})
                }
            }
        },
        deleteDatabase: function(c) {
            if (Ghostlab.state.isMainFrame && void 0 !== b && c.securityOrigin === a)
                return b.deleteDatabase(c.databaseName),
                !0
        }
    }
}(),
function() {
    var a = Ghostlab.SessionStorage.get("networkInspectorEnabled") || !1
      , b = !0
      , c = 0
      , d = 0
      , e = 0
      , f = void 0 !== window.performance && "function" == typeof window.performance.getEntriesByType
      , g = {}
      , h = {
        parseUrl: function() {
            return {}
        },
        getServerUrl: function() {
            return ""
        }
    }
      , i = function(a) {
        if (a && f)
            for (var b = performance.getEntriesByType("resource"), c = b.length - 1; c >= 0; c--) {
                var d = b[c];
                if (Ghostlab.unrewriteUrl(d.name) === a)
                    return d
            }
    }
      , j = function(a, b) {
        if (!b)
            return !0;
        if (a.secure && "https:" !== b.protocol)
            return !1;
        if (a.domain) {
            var c = "." === a.domain.charAt(0) ? a.domain.substr(1) : a.domain;
            if (c !== b.hostname && !Ghostlab.StringHelpers.endsWith(b.hostname, "." + c))
                return !1
        } else if (a.originDomain && a.originDomain !== b.hostname)
            return !1;
        var d = b.pathname.lastIndexOf("/")
          , e = d >= 0 ? b.pathname.substr(0, d + 1) : "/"
          , f = a.path;
        return "/" !== f.charAt(f.length - 1) && (f += "/"),
        Ghostlab.StringHelpers.startsWith(e, f)
    }
      , k = function(a) {
        var b = Areion.unrewriteCookie(a);
        return {
            name: b.name,
            value: b.value,
            domain: b.domain || b.originDomain,
            path: b.path,
            expires: b.expires ? new Date(b.expires).getTime() / 1e3 : 0,
            size: b.name.length + b.value.length,
            httpOnly: b.httponly || !1,
            secure: b.secure || !1,
            session: !b.expires
        }
    }
      , l = function() {
        if ("function" == typeof window.WebSocket) {
            var a = window.WebSocket
              , b = window.WebSocket.prototype.send;
            window.WebSocket = function(b, c) {
                var d = new a(b,c)
                  , e = Math.random().toString(36).substr(2, 10);
                return d.__requestId = e,
                Ghostlab.Inspector.sendEvent("Network.webSocketCreated", {
                    requestId: e,
                    url: b,
                    initiator: {
                        type: "script"
                    }
                }),
                d.addEventListener("message", function(a) {
                    Ghostlab.Inspector.sendEvent("Network.webSocketFrameReceived", {
                        requestId: e,
                        timestamp: (new Date).getTime() / 1e3,
                        response: {
                            opcode: 1,
                            mask: !1,
                            payloadData: a.data
                        }
                    })
                }),
                d
            }
            ,
            a.prototype.send = function(a) {
                return this.__requestId && Ghostlab.Inspector.sendEvent("Network.webSocketFrameSent", {
                    requestId: this.__requestId,
                    timestamp: (new Date).getTime() / 1e3,
                    response: {
                        opcode: 1,
                        mask: !0,
                        payloadData: a
                    }
                }),
                b.apply(this, arguments)
            }
        }
    }
      , m = function() {
        if ("function" == typeof window.EventSource) {
            var b = window.EventSource;
            window.EventSource = function(e) {
                var f = new b(e)
                  , g = Ghostlab.URLHelpers.parseUrl(e);
                g = g ? g.href : e;
                var h = Math.random().toString(36).substr(2, 10)
                  , i = d
                  , j = c;
                ++d,
                ++c;
                var k = (new Date).getTime() / 1e3;
                return Ghostlab.Inspector.sendEvent("Network.requestWillBeSent", {
                    requestId: h,
                    frameId: Ghostlab.state.frameId,
                    loaderId: i,
                    documentURL: location.href,
                    request: {
                        url: g,
                        method: "GET",
                        headers: {
                            Accept: "text/event-stream",
                            "User-Agent": navigator.userAgent
                        },
                        mixedContentType: "none",
                        initialPriority: "High"
                    },
                    timestamp: k,
                    wallTime: k,
                    initiator: {
                        type: "script"
                    },
                    type: "Other"
                }),
                f.addEventListener("open", function(a) {
                    Ghostlab.Inspector.sendEvent("Network.responseReceived", {
                        requestId: h,
                        frameId: Ghostlab.state.frameId,
                        loaderId: i,
                        timestamp: (new Date).getTime() / 1e3,
                        type: "EventSource",
                        response: {
                            url: g,
                            status: 200,
                            statusText: "OK",
                            headers: {},
                            mimeType: "text/event-stream",
                            connectionReused: !1,
                            connectionId: j,
                            encodedDataLength: -1,
                            securityState: "neutral"
                        }
                    })
                }),
                f.addEventListener("message", function(b) {
                    if (a) {
                        var c = (new Date).getTime() / 1e3;
                        Ghostlab.Inspector.sendEvent("Network.dataReceived", {
                            requestId: h,
                            timestamp: c,
                            dataLength: b.data.length,
                            encodedDataLength: b.data.length
                        }),
                        Ghostlab.Inspector.sendEvent("Network.eventSourceMessageReceived", {
                            requestId: h,
                            timestamp: c,
                            eventName: "message",
                            eventId: "",
                            data: b.data
                        })
                    }
                }),
                f.addEventListener("error", function(a) {
                    Ghostlab.Inspector.sendEvent("Network.loadingFailed", {
                        requestId: h,
                        timestamp: (new Date).getTime() / 1e3,
                        type: "EventSource",
                        errorText: "",
                        canceled: !0
                    })
                }),
                f
            }
        }
    }
      , n = function(a) {
        var b = {
            "User-Agent": navigator.userAgent
        }
          , c = a && a.ghostlab && a.ghostlab.headers;
        if (!c)
            return b;
        for (var d in c)
            "x-ghostlab-raw-source" !== d && (b[d] = c[d].join(", "));
        return b
    }
      , o = function(a) {
        for (var b = a.getAllResponseHeaders().split("\n"), c = {}, d = 0, e = b.length; d < e; d++) {
            var f = b[d].indexOf(":")
              , g = b[d].substr(0, f)
              , h = Ghostlab.StringHelpers.trim(b[d].substr(f + 2, b[d].length));
            "" !== g && (c[g] = h)
        }
        return c
    }
      , p = function(a) {
        var b = a.target;
        if (b.ghostlab && b.ghostlab.requestURL)
            if (3 === b.readyState)
                void 0 === b.ghostlab.sendFinished && (b.ghostlab.sendFinished = (new Date).getTime());
            else if (4 === b.readyState) {
                var c = i(b.ghostlab && b.ghostlab.requestURL)
                  , d = c ? c.startTime : b.ghostlab.requestTime
                  , e = 0;
                if (c && (e = c.decodedBodySize),
                !e)
                    try {
                        e = parseInt(b.getResponseHeader("Content-Length"), 10)
                    } catch (a) {}
                Ghostlab.Inspector.sendEvent("Network.responseReceived", {
                    requestId: String(b.ghostlab.requestId),
                    frameId: Ghostlab.state.frameId,
                    loaderId: b.ghostlab.loaderId,
                    timestamp: b.ghostlab.requestTime / 1e3,
                    type: "XHR",
                    response: {
                        url: b.ghostlab.requestURL,
                        status: b.status,
                        statusText: b.statusText,
                        headers: o(b),
                        requestHeaders: n(b),
                        connectionReused: !1,
                        connectionId: b.ghostlab.connectionId,
                        encodedDataLength: -1,
                        fromDiskCache: !1,
                        fromServiceWorker: !1,
                        encodedDataLength: c && c.encodedBodySize || e,
                        timing: {
                            requestTime: b.ghostlab.requestTime / 1e3,
                            connectStart: (c ? c.connectStart : b.ghostlab.requestOpen) - d,
                            connectEnd: (c ? c.connectEnd : b.ghostlab.requestOpen) - d,
                            dnsStart: c ? c.domainLookupStart - d : -1,
                            dnsEnd: c ? c.domainLookupEnd - d : -1,
                            proxyStart: -1,
                            proxyEnd: -1,
                            sslStart: -1,
                            sslEnd: -1,
                            sendStart: (c ? c.requestStart : b.ghostlab.requestOpen) - d,
                            sendEnd: b.ghostlab.sendFinished - b.ghostlab.requestTime,
                            receiveHeadersEnd: (c ? c.responseStart : b.ghostlab.sendFinished) - d,
                            workerStart: -1,
                            workerReady: -1,
                            pushStart: 0,
                            pushEnd: 0
                        },
                        securityState: "neutral"
                    }
                });
                var f = (new Date).getTime() / 1e3;
                if (Ghostlab.Inspector.sendEvent("Network.dataReceived", {
                    requestId: String(b.ghostlab.requestId),
                    timestamp: f,
                    dataLength: e,
                    encodedDataLength: c && c.encodedBodySize || e
                }),
                Ghostlab.Inspector.sendEvent("Network.loadingFinished", {
                    requestId: b.ghostlab.requestId,
                    timestamp: f,
                    encodedDataLength: c && c.transferSize || e
                }),
                "text" === b.responseType || "" === b.responseType)
                    try {
                        g[b.ghostlab.requestId] = b.responseText
                    } catch (a) {}
            }
    }
      , q = function(a) {
        if (!a)
            return 0;
        if (window.TextEncoder)
            return new TextEncoder("utf8").encode(a).length;
        for (var b = a.length, c = b - 1; c >= 0; c--) {
            var d = str.charCodeAt(c);
            d > 127 && d <= 2047 ? a++ : d > 2047 && d <= 65535 && (a += 2),
            d >= 56320 && d <= 57343 && c--
        }
        return b
    }
      , r = function(a) {
        var b = a.constructor;
        if (!b)
            return null;
        if (b.name)
            return b.name;
        var c = b.toString().match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
        return c ? c[1] : null
    }
      , s = function(a, b, c, d) {
        return void 0 === c && (c = q(b)),
        null === c && !d || a.ghostlab.headers || (a.ghostlab.headers = {}),
        null !== c && (a.ghostlab.headers["Content-Length"] = [c]),
        d && (a.ghostlab.headers["Content-Type"] = ["application/x-www-form-urlencoded"]),
        b
    }
      , t = function(a, b) {
        if ("string" == typeof b)
            return s(a, b);
        if (window.Document && b instanceof Document)
            return s(a, b.documentElement && b.documentElement.outerHTML || void 0);
        if (window.FormData && b instanceof FormData) {
            var c = ""
              , d = b.entries && b.entries();
            if (!d)
                return;
            for (; ; ) {
                var e = d.next();
                if (!e || e.done)
                    break;
                e.value && e.value.length >= 2 && (c += e.value[0] + "=" + e.value[1] + "\n")
            }
            return s(a, c, null)
        }
        if (window.URLSearchParams && b instanceof URLSearchParams)
            return s(a, b.toString(), void 0, !0);
        if (window.Blob && b instanceof Blob)
            return s(a, void 0, b.size);
        var f = void 0
          , g = void 0
          , h = void 0
          , i = !1;
        if (window.ArrayBuffer && b instanceof ArrayBuffer ? g = new DataView(b) : window.Int8Array && b instanceof Int8Array || window.Uint8Array && b instanceof Uint8Array || window.Uint8ClampedArray && b instanceof Uint8ClampedArray || window.Int16Array && b instanceof Int16Array || window.Uint16Array && b instanceof Uint16Array || window.Int32Array && b instanceof Int32Array || window.Float32Array && b instanceof Float32Array || window.Float64Array && b instanceof Float64Array ? (b.byteLength > 128 ? (f = b.slice(0, 128 / b.BYTES_PER_ELEMENT),
        i = !0) : f = b,
        g = new DataView(f.buffer),
        h = r(b) || !0) : window.DataView && b instanceof DataView && (g = b),
        g) {
            var c = ""
              , j = g.byteLength
              , k = Math.min(j, 128);
            i = i || k < j;
            for (var l = 0; l < k; l++) {
                var m = g.getUint8(l);
                c += m <= 32 ? " " : String.fromCharCode(m)
            }
            return i && (c += "..."),
            f && (!0 === h ? c += "\n\n[" + f.toString() + (i ? "..." : "") + "]" : h && (c += "\n\n" + h + "(" + f.toString() + (i ? ",..." : "") + ")")),
            s(a, c, j)
        }
    };
    Ghostlab.Inspector.Network = {
        init: function() {
            l(),
            m()
        },
        enable: function() {
            a = !0,
            Ghostlab.SessionStorage.set("networkInspectorEnabled", !0)
        },
        disable: function() {
            a = !1,
            Ghostlab.SessionStorage.set("networkInspectorEnabled", !1)
        },
        getResponseBody: function(a) {
            var b = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/
              , c = g[a.requestId] || "";
            return delete g[a.requestId],
            {
                body: c,
                base64Encode: b.test(c)
            }
        },
        setMonitoringXHREnabled: function(a) {
            b = a.enabled
        },
        clearBrowserCookies: function(a) {
            Ghostlab.CookieHelpers.deleteAllCookies()
        },
        getCookies: function(a) {
            if (Ghostlab.state.isMainFrame) {
                for (var b = [], c = a && a.urls && a.urls.length || 0, d = 0; d < c; d++)
                    b.push(Ghostlab.URLHelpers.parseUrl(a.urls[d]));
                var e = Ghostlab.CookieHelpers.readCookies()
                  , f = [];
                for (var g in e)
                    if ("__areion" !== g.substr(0, 8) && "__ghostlab" !== g.substr(0, 10)) {
                        var h = {
                            name: g,
                            value: e[g],
                            domain: location.hostname,
                            path: "",
                            expires: 0
                        };
                        if (Areion.isProbablyRewrittenCookie(h)) {
                            var i = k(h);
                            if (0 === c)
                                f.push(i);
                            else
                                for (var d = 0; d < c; d++)
                                    if (j(i, b[d])) {
                                        f.push(i);
                                        break
                                    }
                        } else
                            f.push(h)
                    }
                return {
                    cookies: f
                }
            }
        },
        getAllCookies: function(a) {
            return Ghostlab.Inspector.Network.getCookies(a)
        },
        deleteCookie: function(a) {
            var b = Ghostlab.CookieHelpers.readCookies()
              , c = a.url ? Ghostlab.URLHelpers.parseUrl(a.url) : null;
            for (var d in b)
                if (Areion.isProbablyRewrittenCookie(d)) {
                    var e = Areion.unrewriteCookie({
                        name: d,
                        value: b[d]
                    });
                    if (e.name === a.cookieName && j(e, c)) {
                        Ghostlab.CookieHelpers.deleteCookie(d);
                        break
                    }
                } else if (d === a.cookieName) {
                    Ghostlab.CookieHelpers.deleteCookie(d);
                    break
                }
        },
        setCookie: function(a) {
            var b = Areion.rewriteCookie({
                name: a.name,
                value: a.value,
                path: a.path,
                expires: a.expirationDate ? new Date(a.expirationDate).toUTCString() : "",
                domain: a.domain,
                secure: a.secure || !1,
                httponly: a.httpOnly || !1
            }, Ghostlab.URLHelpers.parseUrl(Ghostlab.unrewriteUrl(location.href)), h)
              , c = b.name + "=" + encodeURIComponent(a.value);
            return b.expires && (c += "; expires=" + b.expires),
            document.cookie = c,
            {
                success: !0
            }
        },
        overrideXHRSend: function(f, g, h) {
            if (a && b) {
                g.ghostlab.connectionId = c,
                g.ghostlab.requestId = e,
                g.ghostlab.loaderId = d,
                g.ghostlab.requestTime = (new Date).getTime(),
                ++c,
                ++d,
                ++e;
                var i = (new Date).getTime() / 1e3;
                if (Ghostlab.Inspector.sendEvent("Network.requestWillBeSent", {
                    requestId: String(g.ghostlab.requestId),
                    frameId: Ghostlab.state.frameId,
                    loaderId: g.ghostlab.loaderId,
                    documentURL: location.href,
                    request: {
                        url: g.ghostlab.requestURL,
                        method: g.ghostlab.requestMethod,
                        headers: n(g),
                        postData: t(g, h[0]),
                        initialPriority: "High",
                        referrerPolicy: "no-referrer-when-downgrade"
                    },
                    timestamp: i,
                    wallTime: i,
                    initiator: {
                        type: "script"
                    }
                }),
                "function" == typeof g.addEventListener)
                    g.addEventListener("readystatechange", p);
                else {
                    var j = f.onreadystatechange || g.onreadystatechange;
                    g.onreadystatechange = function(a) {
                        null !== j && j.apply(this, arguments),
                        p({
                            target: a && a.target || g
                        })
                    }
                }
                try {
                    Areion.call(g, f, h)
                } catch (a) {
                    return f.send(h[0])
                }
            } else
                try {
                    Areion.call(g, f, h)
                } catch (a) {
                    return f.send(h[0])
                }
        }
    }
}(),
function() {
    var a = null
      , b = function(a) {
        var b = Ghostlab.URLHelpers.getExtension(a);
        return b ? "jpg" === b ? "image/jpeg" : "image/" + b.toLowerCase() : "image/jpeg"
    }
      , c = function(a) {
        var b = 1;
        if (a)
            for (var c = a.split("-"), d = c.length, e = 0; e < d; e++)
                b = 100 * b + parseInt(c[e], 10);
        return b
    }
      , d = function(a) {
        if (a && a.Ghostlab) {
            var b = a.Ghostlab
              , i = []
              , j = Ghostlab.URLHelpers.getAbsolutePath(a.location.pathname);
            i.push({
                url: Ghostlab.getFullOrigUrl(a.location.protocol + "//" + a.location.host + j),
                type: "Document",
                mimeType: "text/html"
            }),
            e(a, i),
            f(a, i),
            g(a, i),
            h(a, i),
            Ghostlab.Inspector.sendEvent("Runtime.executionContextCreated", {
                context: {
                    id: c(b.state.frameId),
                    origin: Ghostlab.URLHelpers.getOrigin(),
                    name: b.state.isMainFrame ? "<top frame>" : j,
                    auxData: {
                        isDefault: !0,
                        frameId: b.state.frameId
                    }
                }
            });
            var k = [];
            b.jQuery("iframe").each(function() {
                var a = d(this.contentWindow);
                a && k.push(a)
            }),
            Ghostlab.Inspector.flushPendingEvents();
            var l = Ghostlab.getFullOrigUrl(a.location.href)
              , m = Ghostlab.URLHelpers.parseUrl(l)
              , n = m.protocol + "//" + m.host;
            return {
                frame: {
                    id: b.state.frameId,
                    loaderId: b.state.myId,
                    name: b.state.isMainFrame ? void 0 : a.name,
                    url: l,
                    securityOrigin: n,
                    mimeType: "text/html"
                },
                childFrames: k,
                resources: i
            }
        }
    }
      , e = function(a, b) {
        if (a && a.Ghostlab) {
            var c = a.Ghostlab
              , d = c.jQuery;
            d("script[src]").each(function() {
                var a = d(this)
                  , c = a.attr("src")
                  , e = a.attr("type")
                  , f = a.attr("language");
                e && (e = e.toLowerCase()),
                f && (f = f.toLowerCase()),
                c.indexOf("/____ghostlab_") < 0 && ("text/javascript" === e || f && (f.indexOf("javascript") >= 0 || f.indexOf("jscript") >= 0) || void 0 === e && void 0 === f) && b.push({
                    url: Ghostlab.getFullOrigUrl(c),
                    type: "Script",
                    mimeType: "text/javascript",
                    failed: !1,
                    canceled: !1
                })
            })
        }
    }
      , f = function(a, c) {
        if (a && a.Ghostlab) {
            var d = a.Ghostlab
              , e = d.jQuery;
            e("link[rel*=stylesheet]").each(function() {
                var a = e(this);
                c.push({
                    url: Ghostlab.getFullOrigUrl(d.StringHelpers.trim(a.attr("href"))),
                    type: "Stylesheet",
                    mimeType: "text/css",
                    failed: !1,
                    canceled: !1,
                    title: a.attr("title") || ""
                })
            });
            for (var f = function(a) {
                var d = a && a.style && a.style["background-image"];
                if (d) {
                    var e = d.match(/url\s*\(\s*['"]?([^'"]*)['"]?\s*\)/i);
                    if (e && e[1]) {
                        var f = e[1];
                        c.push({
                            url: Ghostlab.getFullOrigUrl(f),
                            type: "Image",
                            mimeType: b(f),
                            failed: !1,
                            canceled: !1
                        })
                    }
                }
            }, g = function(a) {
                var b = function(a) {
                    c.push({
                        url: Ghostlab.getFullOrigUrl(a.href),
                        type: "Stylesheet",
                        mimeType: "text/css",
                        failed: !1,
                        canceled: !1,
                        title: ""
                    }),
                    g(a)
                };
                try {
                    if (a.cssRules)
                        for (var d = a.cssRules.length, e = 0; e < d; e++) {
                            var h = a.cssRules[e];
                            h.type === CSSRule.IMPORT_RULE ? b(h.styleSheet) : h.type === CSSRule.STYLE_RULE && f(h)
                        }
                    else if (a.imports) {
                        for (var d = a.imports.length, e = 0; e < d; e++)
                            b(a.imports[e]);
                        d = a.rules.length;
                        for (var e = 0; e < d; e++)
                            f(a.rules[e])
                    }
                } catch (a) {}
            }, h = a.document.styleSheets.length, i = 0; i < h; i++)
                g(a.document.styleSheets[i])
        }
    }
      , g = function(a, c) {
        if (a && a.Ghostlab) {
            var d = a.Ghostlab
              , e = d.jQuery
              , f = function(a, d) {
                if (a)
                    if (Ghostlab.StringHelpers.startsWith(a, "data:")) {
                        var e = a.match(/^data:([^,;]+)/);
                        c.push({
                            url: a,
                            type: "Image",
                            mimeType: e && e[1] || "image/jpeg",
                            failed: !1,
                            canceled: !1
                        })
                    } else {
                        var f = null;
                        if (d)
                            try {
                                f = d[0].mimeType
                            } catch (a) {}
                        f || (f = b(a)),
                        c.push({
                            url: Ghostlab.getFullOrigUrl(a),
                            type: "Image",
                            mimeType: f,
                            failed: !1,
                            canceled: !1
                        })
                    }
            };
            e("img").each(function() {
                var a = e(this);
                f(a.attr("src"), a)
            }),
            e("[style*=background]").each(function() {
                var a = this.style.backgroundImage;
                if (a) {
                    var b = a.match(/url\(['"]?(.*?)['"]?\)/i);
                    b && f(b[1])
                }
            })
        }
    }
      , h = function(a, b) {
        if (a && a.Ghostlab) {
            var c = a.Ghostlab
              , d = c.jQuery;
            d("audio, video").each(function() {
                var a = d(this)
                  , c = a.attr("src");
                if (c) {
                    var e = ""
                      , f = Ghostlab.URLHelpers.getExtension(c);
                    f && (e = a[0].tagName.toLowerCase() + "/" + f.toLowerCase()),
                    b.push({
                        url: Ghostlab.getFullOrigUrl(c),
                        type: "Media",
                        mimeType: e,
                        failed: !1,
                        canceled: !1
                    })
                }
                a.find("source").each(function() {
                    var a = d(this)
                      , c = a.attr("src");
                    c && b.push({
                        url: Ghostlab.getFullOrigUrl(c),
                        type: "Media",
                        mimeType: a.attr("type"),
                        failed: !1,
                        canceled: !1
                    })
                })
            })
        }
    };
    Ghostlab.Inspector.Page = {
        getResourceTree: function(a) {
            if (Ghostlab.state.isMainFrame)
                return {
                    frameTree: d(window)
                };
            Ghostlab.Inspector.flushPendingEvents()
        },
        searchInResource: function(a) {},
        setDocumentContent: function(a) {},
        configureOverlay: function(b) {
            if (!b.suspended || !b.message)
                return void (a && a.hide());
            var c = Ghostlab.UIHelpers.getScrollPos()
              , d = Ghostlab.UIHelpers.getWindowWidth()
              , e = Ghostlab.UIHelpers.getWindowHeight()
              , f = b && b.message || "";
            null === a ? (a = Ghostlab.jQuery('<div id="__ghostlab_debugger_overlay__">' + f + "</div>"),
            a.css({
                position: "absolute",
                left: c.x,
                top: c.y,
                width: d,
                height: e,
                color: "#000",
                "background-color": "rgba(0, 0, 0, 0.3)",
                "font-family": "sans-serif",
                "font-size": "10pt",
                "padding-top": "30px",
                "text-align": "center",
                "z-index": 99999
            }),
            Ghostlab.jQuery("body").append(a)) : (a.html(f),
            a.css({
                display: "block",
                left: c.x,
                top: c.y,
                width: d,
                height: e
            }))
        },
        getAppManifest: function(a) {
            var b = Ghostlab.jQuery('link[rel="manifest"]').attr("href") || "";
            return b && (b = Ghostlab.getFullOrigUrl(b)),
            {
                url: b
            }
        },
        getLayoutMetrics: function(a) {},
        hideOverlay: function() {
            a && a.hide()
        }
    },
    Ghostlab.Inspector.getExecutionContextId = c
}(),
function() {
    var a = !1
      , b = null
      , c = null
      , d = null
      , e = null
      , f = null
      , g = 4
      , h = 0
      , i = !1
      , j = ""
      , k = function(a) {
        return void 0 === a.__ghostlab_id__ && (a.__ghostlab_id__ = g++),
        a.__ghostlab_id__
    }
      , l = function() {
        e.push(3),
        f.push(1e3 * (new Date).getTime()),
        d.children[1].hitCount++
    };
    Ghostlab.Inspector.Profiler = {
        start: function() {
            Ghostlab.state.isMainFrame && !a && (a = !0,
            d = {
                functionName: "(root)",
                scriptId: "0",
                url: "",
                lineNumber: 0,
                columnNumber: 0,
                hitCount: 0,
                callUID: 0,
                children: [{
                    functionName: "(program)",
                    scriptId: "0",
                    url: "",
                    lineNumber: 0,
                    columnNumber: 0,
                    hitCount: 0,
                    callUID: 1,
                    children: [],
                    deoptReason: "",
                    id: 2
                }, {
                    functionName: "(idle)",
                    scriptId: "0",
                    url: "",
                    lineNumber: 0,
                    columnNumber: 0,
                    hitCount: 0,
                    callUID: 2,
                    children: [],
                    deoptReason: "",
                    id: 3
                }],
                deoptReason: "",
                id: 1
            },
            c = [d.children[0]],
            e = [],
            f = [],
            b = new Date,
            l())
        },
        stop: function() {
            if (a) {
                l(),
                a = !1;
                var g = {
                    profile: {
                        head: d,
                        samples: e,
                        timestamps: f,
                        startTime: 1e3 * b.getTime(),
                        endTime: 1e3 * (new Date).getTime()
                    }
                };
                return d = null,
                c = null,
                e = null,
                f = null,
                g
            }
        },
        isRunning: function() {
            return a
        },
        enterFunction: function(b, d) {
            if (a) {
                var g = k(d)
                  , h = null
                  , i = c.length - 1
                  , j = i < 0 ? null : c[i]
                  , l = j && j.children;
                if (l)
                    for (var m = l.length, n = 0; n < m; n++)
                        if (l[n].id === g) {
                            h = l[n];
                            break
                        }
                null === h ? (h = {
                    functionName: b.functionName,
                    scriptId: b.location.scriptId,
                    url: b.location.scriptId,
                    lineNumber: b.location.lineNumber,
                    columnNumber: 0,
                    hitCount: 1,
                    callUID: parseInt(b.callFrameId, 10),
                    children: [],
                    id: g
                },
                l && l.push(h)) : h.hitCount++,
                c.push(h),
                e.push(h.id),
                f.push(1e3 * (new Date).getTime())
            }
        },
        leaveFunction: function(b, d) {
            a && (c.pop(),
            1 === c.length && l())
        }
    },
    void 0 === window.console && (window.console = {});
    var m = console.profile;
    console.profileEnd;
    console.profile = function(a) {
        "function" == typeof m && m.apply(console, arguments),
        Ghostlab.Inspector.Profiler.isRunning() || (i = !0,
        h++,
        j = a || "Console Profile " + h,
        Ghostlab.Inspector.sendEvent("Profiler.consoleProfileStarted", {
            id: "console-profile-" + h,
            location: {},
            title: j
        }, !1, !0),
        Ghostlab.Inspector.Profiler.start())
    }
    ,
    console.profileEnd = function() {
        if ("function" == typeof m && m.apply(console, arguments),
        i) {
            var a = Ghostlab.Inspector.Profiler.stop();
            i = !1,
            Ghostlab.Inspector.sendEvent("Profiler.consoleProfileFinished", {
                id: "console-profile-" + h,
                location: {},
                profile: a.profile,
                title: j
            }, !1, !0)
        }
    }
}(),
Ghostlab.Inspector.Runtime = {
    evaluate: function(a) {
        if (Ghostlab.Inspector.getExecutionContextId(Ghostlab.state.frameId) === a.contextId)
            try {
                return {
                    result: Ghostlab.InspectionHelpers.getRemoteObject(Ghostlab.Inspector.Runtime.eval(a.expression), a.returnByValue, a.generatePreview)
                }
            } catch (a) {
                return {
                    result: Ghostlab.InspectionHelpers.getRemoteObject(a),
                    wasThrown: !0,
                    exceptionDetails: {
                        text: "Uncaught " + (a.toString ? a.toString() : "Error: " + a.message),
                        url: "",
                        line: 0,
                        column: 0,
                        stackTrace: {
                            callFrames: []
                        }
                    }
                }
            }
    },
    awaitPromise: function(a) {},
    callFunctionOn: function(a) {
        if (!a.functionDeclaration)
            return {
                result: Ghostlab.InspectionHelpers.getRemoteObject(void 0)
            };
        var b = Ghostlab.InspectionHelpers.getObjectById(a.objectId);
        if (b) {
            var c = void 0
              , d = a.functionDeclaration.match(/^\s*function[^(]+\(([^)]*)\)\s*\{([\s\S]+?)\}\s*$/);
            try {
                c = null !== d ? new Function(d[1],d[2]) : new Function(a.functionDeclaration)
            } catch (a) {
                return {
                    result: Ghostlab.InspectionHelpers.getRemoteObject(a)
                }
            }
            var e = [];
            if (a.arguments)
                for (var f = 0; f < a.arguments.length; f++)
                    void 0 !== a.arguments[f].objectId ? e.push(Ghostlab.InspectionHelpers.getObjectById(a.arguments[f].objectId)) : e.push(a.arguments[f].value);
            try {
                var g = c.apply(b, e);
                return {
                    result: Ghostlab.InspectionHelpers.getRemoteObject(g, a.returnByValue, a.generatePreview)
                }
            } catch (a) {
                return {
                    result: Ghostlab.InspectionHelpers.getRemoteObject(a),
                    wasThrown: !0,
                    exceptionDetails: {
                        text: "Uncaught " + (a.toString ? a.toString() : "Error: " + a.message),
                        url: "",
                        line: 0,
                        column: 0,
                        stackTrace: {
                            callFrames: []
                        }
                    }
                }
            }
        }
    },
    getProperties: function(a) {
        var b = Ghostlab.InspectionHelpers.getObjectById(a.objectId);
        if (b) {
            var c = []
              , d = 0
              , e = -1
              , f = !1;
            for (var g in b)
                if ((b !== window || "__dbg__" !== g) && (!a.ownProperties || "function" != typeof b.hasOwnProperty || b.hasOwnProperty(g))) {
                    var h = void 0;
                    try {
                        h = b[g]
                    } catch (a) {
                        continue
                    }
                    if (Ghostlab.InspectionHelpers.isGhostlabDOMElement(h))
                        d++;
                    else {
                        if (f = !1,
                        a.accessorPropertiesOnly)
                            if (void 0 !== Object.getOwnPropertyDescriptor) {
                                var i = Object.getOwnPropertyDescriptor(b, g);
                                (void 0 === i && "function" != typeof h || i && (void 0 !== i.get || void 0 !== i.set)) && (f = !0)
                            } else
                                f = !0;
                        else
                            f = !0;
                        f && ("length" === g && (e = c.length),
                        c.push({
                            name: g,
                            value: Ghostlab.InspectionHelpers.getRemoteObject(h)
                        }))
                    }
                }
            return e >= 0 && (c[e].value -= d),
            {
                result: c
            }
        }
    },
    releaseObject: function(a) {
        return Ghostlab.InspectionHelpers.releaseObject(a.objectId),
        !0
    },
    releaseObjectGroup: function(a) {
        return !0
    },
    eval: function(expression) {
        if (void 0 === $)
            var $ = Ghostlab.Inspector.Runtime.querySelector;
        if (void 0 === $$)
            var $$ = Ghostlab.Inspector.Runtime.querySelectorAll;
        if (void 0 === $x)
            var $x = Ghostlab.Inspector.Runtime.executeXPath;
        if (void 0 === $0)
            var $0 = Ghostlab.Inspector.DOM.$0;
        if (void 0 === $1)
            var $1 = Ghostlab.Inspector.DOM.$1;
        if (void 0 === $2)
            var $2 = Ghostlab.Inspector.DOM.$2;
        if (void 0 === $3)
            var $3 = Ghostlab.Inspector.DOM.$3;
        if (void 0 === $4)
            var $4 = Ghostlab.Inspector.DOM.$4;
        try {
            return eval(expression)
        } catch (err1) {
            try {
                return eval("(" + expression + ")")
            } catch (a) {
                throw err1
            }
        }
    },
    querySelector: function(a) {
        for (var b = Ghostlab.jQuery(a), c = b.length, d = 0; d < c; d++) {
            var e = b[d];
            if (!Ghostlab.InspectionHelpers.isGhostlabDOMElement(e))
                return e
        }
        return null
    },
    querySelectorAll: function(a) {
        for (var b = Ghostlab.jQuery(a), c = b.length, d = [], e = 0; e < c; e++) {
            var f = b[e];
            Ghostlab.InspectionHelpers.isGhostlabDOMElement(f) || d.push(f)
        }
        return d
    },
    executeXPath: function(a) {
        var b = Ghostlab.DOMHelpers.executeXPath(a);
        if (b instanceof Array) {
            for (var c = b.length, d = [], e = 0; e < c; e++) {
                var f = b[e];
                Ghostlab.InspectionHelpers.isGhostlabDOMElement(f) || d.push(f)
            }
            return d
        }
        return Ghostlab.InspectionHelpers.isGhostlabDOMElement(b) ? null : b
    }
},
function() {
    var a = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB
      , b = function(a) {
        var b = document.cookie.split(";")
          , c = b.length;
        if (0 !== c)
            for (var d = new RegExp(Ghostlab.unrewriteUrl(a).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$"), e = 0; e < c; e++) {
                var f = Ghostlab.StringHelpers.trim(b[e]);
                if ("__areion" !== f.substr(0, 8)) {
                    var g = f.split("=")
                      , h = {
                        name: g[0],
                        value: decodeURI(g[1])
                    };
                    if (Areion.isProbablyRewrittenCookie(h)) {
                        var i = Areion.unrewriteCookie(h);
                        if (i.domain && !d.test(i.domain) || i.originDomain && !d.test(i.originDomain))
                            continue
                    }
                    Ghostlab.CookieHelpers.deleteCookie(h.name)
                }
            }
    }
      , c = function(b) {
        var c = function(c) {
            var d = a.open(c);
            d.onsuccess = function(a) {
                for (var d = a.target.result, e = d && d.objectStoreNames && d.objectStoreNames.length || 0, f = 0, g = 0; g < e; g++)
                    Ghostlab.Inspector.IndexedDB.clearObjectStore({
                        securityOrigin: b,
                        databaseName: c,
                        objectStoreName: d.objectStoreNames[g]
                    }, function() {
                        ++f === e && Ghostlab.Inspector.IndexedDB.deleteDatabase({
                            databaseName: c
                        })
                    })
            }
            ,
            d.onerror = function() {
                Ghostlab.Inspector.IndexedDB.deleteDatabase({
                    databaseName: c
                })
            }
        };
        Ghostlab.Inspector.IndexedDB.requestDatabaseNames({
            securityOrigin: b
        }, function(a) {
            for (var b = a.result.databaseNames.length, d = 0; d < b; d++)
                c(a.result.databaseNames[d])
        })
    }
      , d = function() {
        var a = function(a, b) {
            a.transaction(function(a) {
                a.executeSql("DELETE FROM " + b)
            })
        }
          , b = Ghostlab.Overrides.WebSQL.getDatabases();
        for (var c in b)
            !function(b) {
                Ghostlab.Inspector.Database.getDatabaseTableNames({
                    databaseId: b.id
                }, function(c) {
                    var d = Ghostlab.Overrides.WebSQL.openDatabase(b.name, b.version, b.name, 0);
                    if (d)
                        for (var e = c.result.tableNames.length, f = 0; f < e; f++)
                            a(d, c.result.tableNames[f])
                })
            }(b[c])
    };
    Ghostlab.Inspector.Storage = {
        clearDataForOrigin: function(a) {
            var e = a.storageTypes
              , f = e.indexOf("all") >= 0;
            (f || e.indexOf("cookies") >= 0) && b(a.origin),
            (f || e.indexOf("indexeddb") >= 0) && c(a.origin),
            (f || e.indexOf("local_storage") >= 0) && (Ghostlab.Inspector.DOMStorage.clear({
                storageId: {
                    securityOrigin: a.origin,
                    isLocalStorage: !0
                }
            }),
            Ghostlab.Inspector.DOMStorage.clear({
                storageId: {
                    securityOrigin: a.origin,
                    isLocalStorage: !1
                }
            })),
            (f || e.indexOf("websql") >= 0) && d(a.origin)
        }
    }
}();
