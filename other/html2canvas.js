!function(a, b) {
    a.ES6Promise = function() {
        "use strict";
        function b(a) {
            return "function" == typeof a || "object" == typeof a && null !== a
        }
        function c(a) {
            return "function" == typeof a
        }
        function d(a) {
            R = a
        }
        function e(a) {
            S = a
        }
        function f() {
            return void 0 !== Q ? function() {
                Q(h)
            }
            : g()
        }
        function g() {
            var a = setTimeout;
            return function() {
                return a(h, 1)
            }
        }
        function h() {
            for (var a = 0; a < P; a += 2) {
                (0,
                Y[a])(Y[a + 1]),
                Y[a] = void 0,
                Y[a + 1] = void 0
            }
            P = 0
        }
        function i(a, b) {
            var c = arguments
              , d = this
              , e = new this.constructor(k);
            void 0 === e[$] && D(e);
            var f = d._state;
            return f ? function() {
                var a = c[f - 1];
                S(function() {
                    return A(f, e, a, d._result)
                })
            }() : w(d, e, a, b),
            e
        }
        function j(a) {
            var b = this;
            if (a && "object" == typeof a && a.constructor === b)
                return a;
            var c = new b(k);
            return s(c, a),
            c
        }
        function k() {}
        function l() {
            return new TypeError("You cannot resolve a promise with itself")
        }
        function m() {
            return new TypeError("A promises callback cannot return that same promise.")
        }
        function n(a) {
            try {
                return a.then
            } catch (a) {
                return ca.error = a,
                ca
            }
        }
        function o(a, b, c, d) {
            try {
                a.call(b, c, d)
            } catch (a) {
                return a
            }
        }
        function p(a, b, c) {
            S(function(a) {
                var d = !1
                  , e = o(c, b, function(c) {
                    d || (d = !0,
                    b !== c ? s(a, c) : u(a, c))
                }, function(b) {
                    d || (d = !0,
                    v(a, b))
                }, "Settle: " + (a._label || " unknown promise"));
                !d && e && (d = !0,
                v(a, e))
            }, a)
        }
        function q(a, b) {
            b._state === aa ? u(a, b._result) : b._state === ba ? v(a, b._result) : w(b, void 0, function(b) {
                return s(a, b)
            }, function(b) {
                return v(a, b)
            })
        }
        function r(a, b, d) {
            b.constructor === a.constructor && d === i && b.constructor.resolve === j ? q(a, b) : d === ca ? v(a, ca.error) : void 0 === d ? u(a, b) : c(d) ? p(a, b, d) : u(a, b)
        }
        function s(a, c) {
            a === c ? v(a, l()) : b(c) ? r(a, c, n(c)) : u(a, c)
        }
        function t(a) {
            a._onerror && a._onerror(a._result),
            x(a)
        }
        function u(a, b) {
            a._state === _ && (a._result = b,
            a._state = aa,
            0 !== a._subscribers.length && S(x, a))
        }
        function v(a, b) {
            a._state === _ && (a._state = ba,
            a._result = b,
            S(t, a))
        }
        function w(a, b, c, d) {
            var e = a._subscribers
              , f = e.length;
            a._onerror = null,
            e[f] = b,
            e[f + aa] = c,
            e[f + ba] = d,
            0 === f && a._state && S(x, a)
        }
        function x(a) {
            var b = a._subscribers
              , c = a._state;
            if (0 !== b.length) {
                for (var d = void 0, e = void 0, f = a._result, g = 0; g < b.length; g += 3)
                    d = b[g],
                    e = b[g + c],
                    d ? A(c, d, e, f) : e(f);
                a._subscribers.length = 0
            }
        }
        function y() {
            this.error = null
        }
        function z(a, b) {
            try {
                return a(b)
            } catch (a) {
                return da.error = a,
                da
            }
        }
        function A(a, b, d, e) {
            var f = c(d)
              , g = void 0
              , h = void 0
              , i = void 0
              , j = void 0;
            if (f) {
                if (g = z(d, e),
                g === da ? (j = !0,
                h = g.error,
                g = null) : i = !0,
                b === g)
                    return void v(b, m())
            } else
                g = e,
                i = !0;
            b._state !== _ || (f && i ? s(b, g) : j ? v(b, h) : a === aa ? u(b, g) : a === ba && v(b, g))
        }
        function B(a, b) {
            try {
                b(function(b) {
                    s(a, b)
                }, function(b) {
                    v(a, b)
                })
            } catch (b) {
                v(a, b)
            }
        }
        function C() {
            return ea++
        }
        function D(a) {
            a[$] = ea++,
            a._state = void 0,
            a._result = void 0,
            a._subscribers = []
        }
        function E(a, b) {
            this._instanceConstructor = a,
            this.promise = new a(k),
            this.promise[$] || D(this.promise),
            O(b) ? (this._input = b,
            this.length = b.length,
            this._remaining = b.length,
            this._result = new Array(this.length),
            0 === this.length ? u(this.promise, this._result) : (this.length = this.length || 0,
            this._enumerate(),
            0 === this._remaining && u(this.promise, this._result))) : v(this.promise, F())
        }
        function F() {
            return new Error("Array Methods must be provided an Array")
        }
        function G(a) {
            return new E(this,a).promise
        }
        function H(a) {
            var b = this;
            return new b(O(a) ? function(c, d) {
                for (var e = a.length, f = 0; f < e; f++)
                    b.resolve(a[f]).then(c, d)
            }
            : function(a, b) {
                return b(new TypeError("You must pass an array to race."))
            }
            )
        }
        function I(a) {
            var b = this
              , c = new b(k);
            return v(c, a),
            c
        }
        function J() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
        }
        function K() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
        }
        function L(a) {
            this[$] = C(),
            this._result = this._state = void 0,
            this._subscribers = [],
            k !== a && ("function" != typeof a && J(),
            this instanceof L ? B(this, a) : K())
        }
        function M() {
            var b = void 0;
            if ("undefined" != typeof a)
                b = a;
            else if ("undefined" != typeof self)
                b = self;
            else
                try {
                    b = Function("return this")()
                } catch (a) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
            var c = b.Promise;
            if (c) {
                var d = null;
                try {
                    d = Object.prototype.toString.call(c.resolve())
                } catch (a) {}
                if ("[object Promise]" === d && !c.cast)
                    return
            }
            b.Promise = L
        }
        var N = void 0;
        N = Array.isArray ? Array.isArray : function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
        ;
        var O = N
          , P = 0
          , Q = void 0
          , R = void 0
          , S = function(a, b) {
            Y[P] = a,
            Y[P + 1] = b,
            2 === (P += 2) && (R ? R(h) : Z())
        }
          , T = "undefined" != typeof window ? window : void 0
          , U = T || {}
          , V = U.MutationObserver || U.WebKitMutationObserver
          , W = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process)
          , X = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
          , Y = new Array(1e3)
          , Z = void 0;
        Z = W ? function() {
            return function() {
                return process.nextTick(h)
            }
        }() : V ? function() {
            var a = 0
              , b = new V(h)
              , c = document.createTextNode("");
            return b.observe(c, {
                characterData: !0
            }),
            function() {
                c.data = a = ++a % 2
            }
        }() : X ? function() {
            var a = new MessageChannel;
            return a.port1.onmessage = h,
            function() {
                return a.port2.postMessage(0)
            }
        }() : void 0 === T && "function" == typeof require ? function() {
            try {
                var a = require
                  , b = a("vertx");
                return Q = b.runOnLoop || b.runOnContext,
                f()
            } catch (a) {
                return g()
            }
        }() : g();
        var $ = Math.random().toString(36).substring(16)
          , _ = void 0
          , aa = 1
          , ba = 2
          , ca = new y
          , da = new y
          , ea = 0;
        return E.prototype._enumerate = function() {
            for (var a = this.length, b = this._input, c = 0; this._state === _ && c < a; c++)
                this._eachEntry(b[c], c)
        }
        ,
        E.prototype._eachEntry = function(a, b) {
            var c = this._instanceConstructor
              , d = c.resolve;
            if (d === j) {
                var e = n(a);
                if (e === i && a._state !== _)
                    this._settledAt(a._state, b, a._result);
                else if ("function" != typeof e)
                    this._remaining--,
                    this._result[b] = a;
                else if (c === L) {
                    var f = new c(k);
                    r(f, a, e),
                    this._willSettleAt(f, b)
                } else
                    this._willSettleAt(new c(function(b) {
                        return b(a)
                    }
                    ), b)
            } else
                this._willSettleAt(d(a), b)
        }
        ,
        E.prototype._settledAt = function(a, b, c) {
            var d = this.promise;
            d._state === _ && (this._remaining--,
            a === ba ? v(d, c) : this._result[b] = c),
            0 === this._remaining && u(d, this._result)
        }
        ,
        E.prototype._willSettleAt = function(a, b) {
            var c = this;
            w(a, void 0, function(a) {
                return c._settledAt(aa, b, a)
            }, function(a) {
                return c._settledAt(ba, b, a)
            })
        }
        ,
        L.all = G,
        L.race = H,
        L.resolve = j,
        L.reject = I,
        L._setScheduler = d,
        L._setAsap = e,
        L._asap = S,
        L.prototype = {
            constructor: L,
            then: i,
            catch: function(a) {
                return this.then(null, a)
            }
        },
        L.polyfill = M,
        L.Promise = L,
        L
    }()
}(this),
ES6Promise.polyfill(),
function(a) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = a();
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        b.html2canvas = a()
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
            function d(a, b) {
                if (--a < 0)
                    return null;
                for (var c = b.length, d = 1, e = 0; ; d++) {
                    var f = (e + 1) * c;
                    if (a < f)
                        break;
                    e = f
                }
                a -= e;
                for (var g = "", h = 0; h < d; h++)
                    g = b.charAt(a % c) + g,
                    a = Math.floor(a / c);
                return g
            }
            b.exports.toAlphabetic = d;
            var e = {
                LOWER_LATIN: "abcdefghijklmnopqrstuvwxyz",
                UPPER_LATIN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                LOWER_GREEK: "αβγδεζηθικλμνξοπρστυφχψω",
                UPPER_GREEK: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ",
                HIRAGANA: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん",
                HIRAGANA_IROHA: "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす",
                KATAKANA: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",
                KATAKANA_IROHA: "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス"
            };
            b.exports.ALPHABET = e,
            b.exports.toLowerLatin = function(a) {
                return d(a, e.LOWER_LATIN)
            }
            ,
            b.exports.toUpperLatin = function(a) {
                return d(a, e.UPPER_LATIN)
            }
            ,
            b.exports.toLowerGreek = function(a) {
                return d(a, e.LOWER_GREEK)
            }
            ,
            b.exports.toUpperGreek = function(a) {
                return d(a, e.UPPER_GREEK)
            }
            ,
            b.exports.toHiragana = function(a) {
                return d(a, e.HIRAGANA)
            }
            ,
            b.exports.toHiraganaIroha = function(a) {
                return d(a, e.HIRAGANA_IROHA)
            }
            ,
            b.exports.toKatakana = function(a) {
                return d(a, e.KATAKANA)
            }
            ,
            b.exports.toKatakanaIroha = function(a) {
                return d(a, e.KATAKANA_IROHA)
            }
        }
        , {}],
        2: [function(a, b, c) {
            function d(a, b, c, d, e, f, g, h) {
                if (a <= 0 && !d)
                    return null;
                var i = Math.abs(Math.floor(a));
                if (0 === i)
                    return b.charAt(0);
                for (var j = "", k = c.length, l = 0, l = 0; i > 0 && l <= k; l++) {
                    var m = i % 10;
                    0 === m && h && "" !== j ? j = b.charAt(m) + j : m > 1 || 1 === m && 0 === l || 1 === m && 1 === l && e || 1 === m && 1 === l && f && a > 100 || 1 === m && l > 1 && g ? j = b.charAt(m) + (l > 0 ? c.charAt(l - 1) : "") + j : 1 === m && l > 0 && (j = c.charAt(l - 1) + j),
                    i = Math.floor(i / 10)
                }
                return (a < 0 ? d : "") + j
            }
            b.exports.toCJK = d;
            var e = {
                CJK_IDEOGRAPHIC: {
                    DIGITS: "零一二三四五六七八九",
                    MULTIPLIERS: "十百千萬",
                    NEGATIVE: "負"
                },
                TRAD_CHINESE_INFORMAL: {
                    DIGITS: "零一二三四五六七八九",
                    MULTIPLIERS: "十百千萬",
                    NEGATIVE: "負"
                },
                TRAD_CHINESE_FORMAL: {
                    DIGITS: "零壹貳參肆伍陸柒捌玖",
                    MULTIPLIERS: "拾佰仟萬",
                    NEGATIVE: "負"
                },
                SIMP_CHINESE_INFORMAL: {
                    DIGITS: "零一二三四五六七八九",
                    MULTIPLIERS: "十百千萬",
                    NEGATIVE: "负"
                },
                SIMP_CHINESE_FORMAL: {
                    DIGITS: "零壹贰叁肆伍陆柒捌玖",
                    MULTIPLIERS: "拾佰仟萬",
                    NEGATIVE: "负"
                },
                JAPANESE_INFORMAL: {
                    DIGITS: "〇一二三四五六七八九",
                    MULTIPLIERS: "十百千万",
                    NEGATIVE: "マイナス"
                },
                JAPANESE_FORMAL: {
                    DIGITS: "零壱弐参四伍六七八九",
                    MULTIPLIERS: "拾百千万",
                    NEGATIVE: "マイナス"
                },
                KOREAN_HANGUL: {
                    DIGITS: "영일이삼사오육칠팔구",
                    MULTIPLIERS: "십백천만",
                    NEGATIVE: "마이너스"
                },
                KOREAN_HANJA_INFORMAL: {
                    DIGITS: "零一二三四五六七八九",
                    MULTIPLIERS: "十百千萬",
                    NEGATIVE: "마이너스"
                },
                KOREAN_HANJA_FORMAL: {
                    DIGITS: "零壹貳參四五六七八九",
                    MULTIPLIERS: "拾百千",
                    NEGATIVE: "마이너스"
                }
            };
            b.exports.NUMERAL = e,
            b.exports.toCJKIdeographic = function(a) {
                return d(a, e.CJK_IDEOGRAPHIC.DIGITS, e.CJK_IDEOGRAPHIC.MULTIPLIERS, e.CJK_IDEOGRAPHIC.NEGATIVE, !1, !0, !0, !0)
            }
            ,
            b.exports.toTraditionalChineseInformal = function(a) {
                return d(a, e.TRAD_CHINESE_INFORMAL.DIGITS, e.TRAD_CHINESE_INFORMAL.MULTIPLIERS, e.TRAD_CHINESE_INFORMAL.NEGATIVE, !1, !0, !0, !0)
            }
            ,
            b.exports.toTraditionalChineseFormal = function(a) {
                return d(a, e.TRAD_CHINESE_FORMAL.DIGITS, e.TRAD_CHINESE_FORMAL.MULTIPLIERS, e.TRAD_CHINESE_FORMAL.NEGATIVE, !0, !0, !0, !0)
            }
            ,
            b.exports.toSimplifiedChineseInformal = function(a) {
                return d(a, e.SIMP_CHINESE_INFORMAL.DIGITS, e.SIMP_CHINESE_INFORMAL.MULTIPLIERS, e.SIMP_CHINESE_INFORMAL.NEGATIVE, !1, !0, !0, !0)
            }
            ,
            b.exports.toSimplifiedChineseFormal = function(a) {
                return d(a, e.SIMP_CHINESE_FORMAL.DIGITS, e.SIMP_CHINESE_FORMAL.MULTIPLIERS, e.SIMP_CHINESE_FORMAL.NEGATIVE, !0, !0, !0, !0)
            }
            ,
            b.exports.toJapaneseInformal = function(a) {
                return d(a, e.JAPANESE_INFORMAL.DIGITS, e.JAPANESE_INFORMAL.MULTIPLIERS, e.JAPANESE_INFORMAL.NEGATIVE, !1, !1, !1, !1)
            }
            ,
            b.exports.toJapaneseFormal = function(a) {
                return d(a, e.JAPANESE_FORMAL.DIGITS, e.JAPANESE_FORMAL.MULTIPLIERS, e.JAPANESE_FORMAL.NEGATIVE, !0, !0, !0, !1)
            }
            ,
            b.exports.toKoreanHangul = function(a) {
                return d(a, e.KOREAN_HANGUL.DIGITS, e.KOREAN_HANGUL.MULTIPLIERS, e.KOREAN_HANGUL.NEGATIVE, !0, !0, !0, !1)
            }
            ,
            b.exports.toKoreanHanjaInformal = function(a) {
                return d(a, e.KOREAN_HANJA_INFORMAL.DIGITS, e.KOREAN_HANJA_INFORMAL.MULTIPLIERS, e.KOREAN_HANJA_INFORMAL.NEGATIVE, !1, !1, !1, !1)
            }
            ,
            b.exports.toKoreanHanjaFormal = function(a) {
                return d(a, e.KOREAN_HANJA_FORMAL.DIGITS, e.KOREAN_HANJA_FORMAL.MULTIPLIERS, e.KOREAN_HANJA_FORMAL.NEGATIVE, !0, !0, !0, !1)
            }
        }
        , {}],
        3: [function(a, b, c) {
            function d(a, b) {
                if (a <= 0)
                    return null;
                var c = "";
                for (var d in b) {
                    var e = b[d]
                      , f = Math.floor(a / e);
                    a -= f * e;
                    for (var g = 0; g < f; g++)
                        c += d
                }
                return c
            }
            b.exports.toLetterSystem = d;
            var e = {
                ROMAN_UPPER: {
                    M: 1e3,
                    CM: 900,
                    D: 500,
                    CD: 400,
                    C: 100,
                    XC: 90,
                    L: 50,
                    XL: 40,
                    X: 10,
                    IX: 9,
                    V: 5,
                    IV: 4,
                    I: 1
                },
                ROMAN_LOWER: {
                    m: 1e3,
                    cm: 900,
                    d: 500,
                    cd: 400,
                    c: 100,
                    xc: 90,
                    l: 50,
                    xl: 40,
                    x: 10,
                    ix: 9,
                    v: 5,
                    iv: 4,
                    i: 1
                },
                HEBREW: {
                    "א׳א׳": 1e6,
                    "א׳ק": 1e5,
                    "א׳י": 1e4,
                    "ט׳": 9e3,
                    "ח׳": 8e3,
                    "ז׳": 7e3,
                    "ו׳": 6e3,
                    "ה׳": 5e3,
                    "ד׳": 4e3,
                    "ג׳": 3e3,
                    "ב׳": 2e3,
                    "א׳": 1e3,
                    "ת": 400,
                    "ש": 300,
                    "ר": 200,
                    "ק": 100,
                    "צ": 90,
                    "פ": 80,
                    "ע": 70,
                    "ס": 60,
                    "נ": 50,
                    "מ‎": 40,
                    "ל": 30,
                    "כ": 20,
                    "טז": 16,
                    "טו": 15,
                    "י": 10,
                    "ט": 9,
                    "ח‎": 8,
                    "ז": 7,
                    "ו": 6,
                    "ה": 5,
                    "ד": 4,
                    "ג": 3,
                    "ב": 2,
                    "א": 1
                },
                GEORGIAN: {
                    "ჵ": 1e4,
                    "ჰ": 9e3,
                    "ჯ": 8e3,
                    "ჴ": 7e3,
                    "ხ": 6e3,
                    "ჭ": 5e3,
                    "წ": 4e3,
                    "ძ": 3e3,
                    "ც": 2e3,
                    "ჩ": 1e3,
                    "შ": 900,
                    "ყ": 800,
                    "ღ": 700,
                    "ქ": 600,
                    "ფ": 500,
                    "ჳ": 400,
                    "ტ": 300,
                    "ს": 200,
                    "რ": 100,
                    "ჟ": 90,
                    "პ": 80,
                    "ო": 70,
                    "ჲ": 60,
                    "ნ": 50,
                    "მ": 40,
                    "ლ": 30,
                    "კ": 20,
                    "ი": 10,
                    "თ": 9,
                    "ჱ": 8,
                    "ზ": 7,
                    "ვ": 6,
                    "ე": 5,
                    "დ": 4,
                    "გ": 3,
                    "ბ": 2,
                    "ა": 1
                },
                ARMENIAN_UPPER: {
                    "Ք": 9e3,
                    "Փ": 8e3,
                    "Ւ": 7e3,
                    "Ց": 6e3,
                    "Ր": 5e3,
                    "Տ": 4e3,
                    "Վ": 3e3,
                    "Ս": 2e3,
                    "Ռ": 1e3,
                    "Ջ": 900,
                    "Պ": 800,
                    "Չ": 700,
                    "Ո": 600,
                    "Շ": 500,
                    "Ն": 400,
                    "Յ": 300,
                    "Մ": 200,
                    "Ճ": 100,
                    "Ղ": 90,
                    "Ձ": 80,
                    "Հ": 70,
                    "Կ": 60,
                    "Ծ": 50,
                    "Խ": 40,
                    "Լ": 30,
                    "Ի": 20,
                    "Ժ": 10,
                    "Թ": 9,
                    "Ը": 8,
                    "Է": 7,
                    "Զ": 6,
                    "Ե": 5,
                    "Դ": 4,
                    "Գ": 3,
                    "Բ": 2,
                    "Ա": 1
                },
                ARMENIAN_LOWER: {
                    "ք": 9e3,
                    "փ": 8e3,
                    "ւ": 7e3,
                    "ց": 6e3,
                    "ր": 5e3,
                    "տ": 4e3,
                    "վ": 3e3,
                    "ս": 2e3,
                    "ռ": 1e3,
                    "ջ": 900,
                    "պ": 800,
                    "չ": 700,
                    "ո": 600,
                    "շ": 500,
                    "ն": 400,
                    "յ": 300,
                    "մ": 200,
                    "ճ": 100,
                    "ղ": 90,
                    "ձ": 80,
                    "հ": 70,
                    "կ": 60,
                    "ծ": 50,
                    "խ": 40,
                    "լ": 30,
                    "ի": 20,
                    "ժ": 10,
                    "թ": 9,
                    "ը": 8,
                    "է": 7,
                    "զ": 6,
                    "ե": 5,
                    "դ": 4,
                    "գ": 3,
                    "բ": 2,
                    "ա": 1
                }
            };
            b.exports.LETTER_SYSTEM = e,
            b.exports.toUpperRoman = function(a) {
                return d(a, e.ROMAN_UPPER)
            }
            ,
            b.exports.toLowerRoman = function(a) {
                return d(a, e.ROMAN_LOWER)
            }
            ,
            b.exports.toHebrew = function(a) {
                return d(a, e.HEBREW)
            }
            ,
            b.exports.toGeorgian = function(a) {
                return d(a, e.GEORGIAN)
            }
            ,
            b.exports.toUpperArmenian = function(a) {
                return d(a, e.ARMENIAN_UPPER)
            }
            ,
            b.exports.toLowerArmenian = function(a) {
                return d(a, e.ARMENIAN_LOWER)
            }
        }
        , {}],
        4: [function(a, b, c) {
            function d(a, b, c, d) {
                if (!1 === c && a < 0)
                    return null;
                d || (d = "-");
                var e = "";
                if (a < 0 && (e = d),
                -1 < a && a < 1)
                    return e + b.charAt(0);
                var f = ""
                  , g = b.length;
                for (a = Math.abs(a); a; )
                    f = b.charAt(a % g) + f,
                    a = Math.floor(a / g);
                return e + f
            }
            function e(a, b) {
                if (a <= 0)
                    return null;
                for (var c = "", d = b.length; a; ) {
                    var e = a % d;
                    c = b.charAt(0 === e ? d - 1 : e - 1) + c,
                    a = Math.floor(a / d) - (0 === e ? 1 : 0)
                }
                return c
            }
            b.exports.toPlaceValue = d;
            var f = {
                ARABIC_INDIC: "٠١٢٣٤٥٦٧٨٩",
                BENGALI: "০১২৩৪৫৬৭৮৯",
                CJK_DECIMAL: "〇一二三四五六七八九",
                CJK_EARTHLY_BRANCH: "子丑寅卯辰巳午未申酉戌亥",
                CJK_HEAVENLY_STEM: "甲乙丙丁戊己庚辛壬癸",
                DEVANAGARI: "०१२३४५६७८९",
                GUJARATI: "૦૧૨૩૪૫૬૭૮૯",
                GURMUKHI: "੦੧੨੩੪੫੬੭੮੯",
                KANNADA: "೦೧೨೩೪೫೬೭೮೯",
                KHMER: "០១២៣៤៥៦៧៨៩",
                LAO: "໐໑໒໓໔໕໖໗໘໙",
                MALAYALAM: "൦൧൨൩൪൫൬൭൮൯",
                MONGILIAN: "᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙",
                MYANMAR: "၀၁၂၃၄၅၆၇၈၉",
                ORIYA: "୦୧୨୩୪୫୬୭୮୯",
                PERSIAN: "۰۱۲۳۴۵۶۷۸۹",
                TAMIL: "௦௧௨௩௪௫௬௭௮௯",
                TELUGU: "౦౧౨౩౪౫౬౭౮౯",
                THAI: "๐๑๒๓๔๕๖๗๘๙",
                TIBETAN: "༠༡༢༣༤༥༦༧༨༩"
            };
            b.exports.DIGITS = f,
            b.exports.toArabicIndic = function(a) {
                return d(a, f.ARABIC_INDIC)
            }
            ,
            b.exports.toBengali = function(a) {
                return d(a, f.BENGALI)
            }
            ,
            b.exports.toCJKDecimal = function(a) {
                return d(a, f.CJK_DECIMAL, !1)
            }
            ,
            b.exports.toCJKEarthlyBranch = function(a) {
                return e(a, f.CJK_EARTHLY_BRANCH)
            }
            ,
            b.exports.toCJKHeavenlyStem = function(a) {
                return e(a, f.CJK_HEAVENLY_STEM)
            }
            ,
            b.exports.toDevanagari = function(a) {
                return d(a, f.DEVANAGARI)
            }
            ,
            b.exports.toGujarati = function(a) {
                return d(a, f.GUJARATI)
            }
            ,
            b.exports.toGurmukhi = function(a) {
                return d(a, f.GURMUKHI)
            }
            ,
            b.exports.toKannada = function(a) {
                return d(a, f.KANNADA)
            }
            ,
            b.exports.toKhmer = function(a) {
                return d(a, f.KHMER)
            }
            ,
            b.exports.toLao = function(a) {
                return d(a, f.LAO)
            }
            ,
            b.exports.toMalayalam = function(a) {
                return d(a, f.MALAYALAM)
            }
            ,
            b.exports.toMongolian = function(a) {
                return d(a, f.MONGILIAN)
            }
            ,
            b.exports.toMyanmar = function(a) {
                return d(a, f.MYANMAR)
            }
            ,
            b.exports.toOriya = function(a) {
                return d(a, f.ORIYA)
            }
            ,
            b.exports.toPersian = function(a) {
                return d(a, f.PERSIAN)
            }
            ,
            b.exports.toTamil = function(a) {
                return d(a, f.TAMIL)
            }
            ,
            b.exports.toTelugu = function(a) {
                return d(a, f.TELUGU)
            }
            ,
            b.exports.toThai = function(a) {
                return d(a, f.THAI)
            }
            ,
            b.exports.toTibetan = function(a) {
                return d(a, f.TIBETAN)
            }
        }
        , {}],
        5: [function(a, b, c) {
            b.exports.toEthiopic = function(a) {
                if (a <= 0)
                    return null;
                var b = "፩፪፫፬፭፮፯፰፱"
                  , c = "፲፳፴፵፶፷፸፹፺"
                  , d = ""
                  , e = "";
                a = Math.floor(a);
                for (var f = 0; a > 0; f++) {
                    var g = a % 10
                      , h = Math.floor(a / 10) % 10;
                    1 === g && 0 === h && f > 0 || 0 === g && 0 === h && f > 1 ? d = e + d : (g > 0 || h > 0) && (d = (h > 0 ? c.charAt(h - 1) : "") + (g > 0 ? b.charAt(g - 1) : "") + e + d),
                    a = Math.floor(a / 100),
                    e = f % 2 ? "፼" : "፻"
                }
                return d
            }
        }
        , {}],
        6: [function(a, b, c) {
            function d(a, b) {
                return void 0 === b && (b = "."),
                null === a ? a : a + b
            }
            function e(a, b, c) {
                switch (typeof b) {
                case "function":
                    return c ? d(b(a)) : b(a);
                case "object":
                    return c ? d(b.function(a), b.dot) : b.function(a);
                case "string":
                    return b
                }
            }
            var f = a("./converters/alpha")
              , g = a("./converters/letter")
              , h = a("./converters/placevalue")
              , i = a("./converters/cjk")
              , j = a("./converters/special")
              , k = {
                none: "",
                disc: "•",
                circle: "◦",
                square: "￭",
                decimal: Math.floor,
                "cjk-decimal": {
                    function: h.toCJKDecimal,
                    dot: "、"
                },
                "decimal-leading-zero": function(a) {
                    return a = Math.floor(a),
                    0 <= a && a < 10 ? "0" + a : -10 < a && a < 0 ? "-0" + Math.abs(a) : a
                },
                "lower-roman": g.toLowerRoman,
                "upper-roman": g.toUpperRoman,
                "lower-greek": f.toLowerGreek,
                "lower-alpha": f.toLowerLatin,
                "upper-alpha": f.toUpperLatin,
                "arabic-indic": h.toArabicIndic,
                armenian: g.toUpperArmenian,
                bengali: h.toBengali,
                cambodian: h.toKhmer,
                "cjk-earthly-branch": {
                    function: h.toCJKEarthlyBranch,
                    dot: "、"
                },
                "cjk-heavenly-stem": {
                    function: h.toCJKHeavenlyStem,
                    dot: "、"
                },
                "cjk-ideographic": {
                    function: i.toCJKIdeographic,
                    dot: "、"
                },
                devanagari: h.toDevanagari,
                "ethiopic-numeric": {
                    function: j.toEthiopic,
                    dot: ""
                },
                georgian: g.toGeorgian,
                gujarati: h.toGujarati,
                gurmukhi: h.toGurmukhi,
                hebrew: g.toHebrew,
                hiragana: f.toHiragana,
                "hiragana-iroha": f.toHiraganaIroha,
                "japanese-formal": {
                    function: i.toJapaneseFormal,
                    dot: "、"
                },
                "japanese-informal": {
                    function: i.toJapaneseInformal,
                    dot: "、"
                },
                kannada: h.toKannada,
                katakana: f.toKatakana,
                "katakana-iroha": f.toKatakanaIroha,
                khmer: h.toKhmer,
                "korean-hangul-formal": {
                    function: i.toKoreanHangul,
                    dot: "、"
                },
                "korean-hanja-formal": {
                    function: i.toKoreanHanjaFormal,
                    dot: "、"
                },
                "korean-hanja-informal": {
                    function: i.toKoreanHanjaInformal,
                    dot: "、"
                },
                lao: h.toLao,
                "lower-armenian": g.toLowerArmenian,
                malayalam: h.toMalayalam,
                mongolian: h.toMongolian,
                myanmar: h.toMyanmar,
                oriya: h.toOriya,
                persian: h.toPersian,
                "simp-chinese-formal": {
                    function: i.toSimplifiedChineseFormal,
                    dot: "、"
                },
                "simp-chinese-informal": {
                    function: i.toSimplifiedChineseInformal,
                    dot: "、"
                },
                tamil: h.toTamil,
                telugu: h.toTelugu,
                thai: h.toThai,
                tibetan: h.toTibetan,
                "trad-chinese-formal": {
                    function: i.toTraditionalChineseFormal,
                    dot: "、"
                },
                "trad-chinese-informal": {
                    function: i.toTraditionalChineseInformal,
                    dot: "、"
                },
                "upper-armenian": g.toUpperArmenian
            };
            k["lower-latin"] = k["lower-alpha"],
            k["upper-latin"] = k["upper-alpha"],
            k["-moz-arabic-indic"] = k["arabic-indic"],
            k["-moz-bengali"] = k.bengali,
            k["-moz-cjk-earthly-branch"] = k["cjk-earthly-branch"],
            k["-moz-cjk-heavenly-stem"] = k["cjk-heavenly-stem"],
            k["-moz-devanagari"] = k.devanagari,
            k["-moz-gujarati"] = k.gujarati,
            k["-moz-gurmukhi"] = k.gurmukhi,
            k["-moz-kannada"] = k.kannada,
            k["-moz-khmer"] = k.khmer,
            k["-moz-lao"] = k.lao,
            k["-moz-malayalam"] = k.malayalam,
            k["-moz-myanmar"] = k.myanmar,
            k["-moz-oriya"] = k.oriya,
            k["-moz-persian"] = k.persian,
            k["-moz-tamil"] = k.tamil,
            k["-moz-telugu"] = k.telugu,
            k["-moz-thai"] = k.thai;
            var l = k.decimal;
            b.exports.format = function(a, b, c) {
                void 0 === c && (c = !0);
                var d = e(a, b in k ? k[b] : l, c);
                return null === d || void 0 === d ? e(a, l, c) : d
            }
            ,
            "undefined" != typeof window && (window.ListStyleTypeFormatter = {
                format: b.exports.format
            })
        }
        , {
            "./converters/alpha": 1,
            "./converters/cjk": 2,
            "./converters/letter": 3,
            "./converters/placevalue": 4,
            "./converters/special": 5
        }],
        7: [function(b, c, d) {
            (function(b) {
                !function(e) {
                    function f(a) {
                        throw new RangeError(I[a])
                    }
                    function g(a, b) {
                        for (var c = a.length, d = []; c--; )
                            d[c] = b(a[c]);
                        return d
                    }
                    function h(a, b) {
                        var c = a.split("@")
                          , d = "";
                        return c.length > 1 && (d = c[0] + "@",
                        a = c[1]),
                        a = a.replace(H, "."),
                        d + g(a.split("."), b).join(".")
                    }
                    function i(a) {
                        for (var b, c, d = [], e = 0, f = a.length; e < f; )
                            b = a.charCodeAt(e++),
                            b >= 55296 && b <= 56319 && e < f ? (c = a.charCodeAt(e++),
                            56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b),
                            e--)) : d.push(b);
                        return d
                    }
                    function j(a) {
                        return g(a, function(a) {
                            var b = "";
                            return a > 65535 && (a -= 65536,
                            b += L(a >>> 10 & 1023 | 55296),
                            a = 56320 | 1023 & a),
                            b += L(a)
                        }).join("")
                    }
                    function k(a) {
                        return a - 48 < 10 ? a - 22 : a - 65 < 26 ? a - 65 : a - 97 < 26 ? a - 97 : x
                    }
                    function l(a, b) {
                        return a + 22 + 75 * (a < 26) - ((0 != b) << 5)
                    }
                    function m(a, b, c) {
                        var d = 0;
                        for (a = c ? K(a / B) : a >> 1,
                        a += K(a / b); a > J * z >> 1; d += x)
                            a = K(a / J);
                        return K(d + (J + 1) * a / (a + A))
                    }
                    function n(a) {
                        var b, c, d, e, g, h, i, l, n, o, p = [], q = a.length, r = 0, s = D, t = C;
                        for (c = a.lastIndexOf(E),
                        c < 0 && (c = 0),
                        d = 0; d < c; ++d)
                            a.charCodeAt(d) >= 128 && f("not-basic"),
                            p.push(a.charCodeAt(d));
                        for (e = c > 0 ? c + 1 : 0; e < q; ) {
                            for (g = r,
                            h = 1,
                            i = x; e >= q && f("invalid-input"),
                            l = k(a.charCodeAt(e++)),
                            (l >= x || l > K((w - r) / h)) && f("overflow"),
                            r += l * h,
                            n = i <= t ? y : i >= t + z ? z : i - t,
                            !(l < n); i += x)
                                o = x - n,
                                h > K(w / o) && f("overflow"),
                                h *= o;
                            b = p.length + 1,
                            t = m(r - g, b, 0 == g),
                            K(r / b) > w - s && f("overflow"),
                            s += K(r / b),
                            r %= b,
                            p.splice(r++, 0, s)
                        }
                        return j(p)
                    }
                    function o(a) {
                        var b, c, d, e, g, h, j, k, n, o, p, q, r, s, t, u = [];
                        for (a = i(a),
                        q = a.length,
                        b = D,
                        c = 0,
                        g = C,
                        h = 0; h < q; ++h)
                            (p = a[h]) < 128 && u.push(L(p));
                        for (d = e = u.length,
                        e && u.push(E); d < q; ) {
                            for (j = w,
                            h = 0; h < q; ++h)
                                (p = a[h]) >= b && p < j && (j = p);
                            for (r = d + 1,
                            j - b > K((w - c) / r) && f("overflow"),
                            c += (j - b) * r,
                            b = j,
                            h = 0; h < q; ++h)
                                if (p = a[h],
                                p < b && ++c > w && f("overflow"),
                                p == b) {
                                    for (k = c,
                                    n = x; o = n <= g ? y : n >= g + z ? z : n - g,
                                    !(k < o); n += x)
                                        t = k - o,
                                        s = x - o,
                                        u.push(L(l(o + t % s, 0))),
                                        k = K(t / s);
                                    u.push(L(l(k, 0))),
                                    g = m(c, r, d == e),
                                    c = 0,
                                    ++d
                                }
                            ++c,
                            ++b
                        }
                        return u.join("")
                    }
                    function p(a) {
                        return h(a, function(a) {
                            return F.test(a) ? n(a.slice(4).toLowerCase()) : a
                        })
                    }
                    function q(a) {
                        return h(a, function(a) {
                            return G.test(a) ? "xn--" + o(a) : a
                        })
                    }
                    var r = "object" == typeof d && d && !d.nodeType && d
                      , s = "object" == typeof c && c && !c.nodeType && c
                      , t = "object" == typeof b && b;
                    t.global !== t && t.window !== t && t.self !== t || (e = t);
                    var u, v, w = 2147483647, x = 36, y = 1, z = 26, A = 38, B = 700, C = 72, D = 128, E = "-", F = /^xn--/, G = /[^\x20-\x7E]/, H = /[\x2E\u3002\uFF0E\uFF61]/g, I = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    }, J = x - y, K = Math.floor, L = String.fromCharCode;
                    if (u = {
                        version: "1.4.1",
                        ucs2: {
                            decode: i,
                            encode: j
                        },
                        decode: n,
                        encode: o,
                        toASCII: q,
                        toUnicode: p
                    },
                    "function" == typeof a && "object" == typeof a.amd && a.amd)
                        a("punycode", function() {
                            return u
                        });
                    else if (r && s)
                        if (c.exports == r)
                            s.exports = u;
                        else
                            for (v in u)
                                u.hasOwnProperty(v) && (r[v] = u[v]);
                    else
                        e.punycode = u
                }(this)
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}],
        8: [function(a, b, c) {
            function d(a, b) {
                var c = this;
                this.src = a,
                this.image = new Image,
                this.tainted = null,
                this.promise = new Promise(function(b, d) {
                    c.image.onload = b,
                    c.image.onerror = d,
                    c.image.src = Areion.rewriteUrl(a),
                    !0 === c.image.complete && b(c.image)
                }
                )
            }
            b.exports = d
        }
        , {}],
        9: [function(a, b, c) {
            function d(a) {
                var b = a.args[0];
                this.src = b.currentSrc || b.src,
                this.videoIndex = a.videoIndex,
                b.videoIndex = a.videoIndex,
                this.image = b,
                b.src = Areion.rewriteUrl(this.src),
                this.promise = new Promise(function(c, d) {
                    b.muted = !0;
                    var e = document.getElementsByTagName("video");
                    if (0 !== e.length && e[a.videoIndex]) {
                        var f = e[a.videoIndex];
                        if (f.currentTime && (b.currentTime = f.currentTime),
                        b.paused) {
                            var g = b.play();
                            g ? g.then(c, d) : c()
                        } else
                            c()
                    } else
                        c()
                }
                )
            }
            b.exports = d
        }
        , {}],
        10: [function(a, b, c) {
            function d(a, b, c) {
                !a.defaultView || b === a.defaultView.pageXOffset && c === a.defaultView.pageYOffset || a.defaultView.scrollTo(b, c)
            }
            function e(a, b) {
                try {
                    if (b) {
                        b.width = a.width,
                        b.height = a.height;
                        var c = a.getContext("2d");
                        c ? b.getContext("2d").putImageData(c.getImageData(0, 0, a.width, a.height), 0, 0) : b.getContext("2d").drawImage(a, 0, 0)
                    }
                } catch (b) {
                    h("Unable to copy canvas content from", a, b)
                }
            }
            function f(a, b) {
                for (var c = 3 === a.nodeType ? document.createTextNode(a.nodeValue) : a.cloneNode(!1), d = a.firstChild; d; )
                    !0 !== b && 1 === d.nodeType && "SCRIPT" === d.nodeName || c.appendChild(f(d, b)),
                    d = d.nextSibling;
                return 1 === a.nodeType && (c._scrollTop = a.scrollTop,
                c._scrollLeft = a.scrollLeft,
                "CANVAS" === a.nodeName ? e(a, c) : "TEXTAREA" !== a.nodeName && "SELECT" !== a.nodeName || (c.value = a.value)),
                c
            }
            function g(a) {
                if (1 === a.nodeType) {
                    a.scrollTop = a._scrollTop,
                    a.scrollLeft = a._scrollLeft;
                    for (var b = a.firstChild; b; )
                        g(b),
                        b = b.nextSibling
                }
            }
            var h = a("./log");
            b.exports = function(a, b, c, e, h, i, j) {
                var k = f(a.documentElement, h.javascriptEnabled)
                  , l = b.createElement("iframe");
                return l.className = "html2canvas-container",
                l.style.visibility = "hidden",
                l.style.position = "fixed",
                l.style.left = "-10000px",
                l.style.top = "0px",
                l.style.border = "0",
                l.style.padding = "0",
                l.style.width = c + "px",
                l.style.height = e + "px",
                l.width = c,
                l.height = e,
                l.scrolling = "no",
                b.body.appendChild(l),
                new Promise(function(b) {
                    var c = l.contentWindow.document;
                    l.contentWindow.onload = l.onload = function() {
                        var a = setInterval(function() {
                            if (c.body.childNodes.length > 0) {
                                g(c.documentElement),
                                clearInterval(a);
                                var d = c.documentElement;
                                d && !d.style.height && (d.style.height = "100%"),
                                "view" === h.type && (l.contentWindow.scrollTo(i, j),
                                !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || l.contentWindow.scrollY === j && l.contentWindow.scrollX === i || (c.documentElement.style.top = -j + "px",
                                c.documentElement.style.left = -i + "px",
                                c.documentElement.style.position = "absolute")),
                                b(l)
                            }
                        }, 50)
                    }
                    ,
                    c.open(),
                    c.write("<!DOCTYPE html><html></html>"),
                    d(a, i, j),
                    c.replaceChild(c.adoptNode(k), c.documentElement),
                    c.close()
                }
                )
            }
        }
        , {
            "./log": 21
        }],
        11: [function(a, b, c) {
            function d(a) {
                this.r = 0,
                this.g = 0,
                this.b = 0,
                this.a = null;
                this.fromArray(a) || this.namedColor(a) || this.rgb(a) || this.rgba(a) || this.hsl(a) || this.hsla(a) || this.hex6(a) || this.hex3(a)
            }
            d.prototype.darken = function(a) {
                var b = 1 - a;
                return new d([Math.round(this.r * b), Math.round(this.g * b), Math.round(this.b * b), this.a])
            }
            ,
            d.prototype.isTransparent = function() {
                return 0 === this.a
            }
            ,
            d.prototype.isBlack = function() {
                return 0 === this.r && 0 === this.g && 0 === this.b
            }
            ,
            d.prototype.fromArray = function(a) {
                return Array.isArray(a) && (this.r = Math.min(a[0], 255),
                this.g = Math.min(a[1], 255),
                this.b = Math.min(a[2], 255),
                a.length > 3 && (this.a = a[3])),
                Array.isArray(a)
            }
            ;
            var e = /^#([a-f0-9]{3})$/i;
            d.prototype.hex3 = function(a) {
                var b = null;
                return null !== (b = a.match(e)) && (this.r = parseInt(b[1][0] + b[1][0], 16),
                this.g = parseInt(b[1][1] + b[1][1], 16),
                this.b = parseInt(b[1][2] + b[1][2], 16)),
                null !== b
            }
            ;
            var f = /^#([a-f0-9]{6})$/i;
            d.prototype.hex6 = function(a) {
                var b = null;
                return null !== (b = a.match(f)) && (this.r = parseInt(b[1].substring(0, 2), 16),
                this.g = parseInt(b[1].substring(2, 4), 16),
                this.b = parseInt(b[1].substring(4, 6), 16)),
                null !== b
            }
            ;
            var g = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
            d.prototype.rgb = function(a) {
                var b = null;
                return null !== (b = a.match(g)) && (this.r = Number(b[1]),
                this.g = Number(b[2]),
                this.b = Number(b[3])),
                null !== b
            }
            ;
            var h = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
            d.prototype.rgba = function(a) {
                var b = null;
                return null !== (b = a.match(h)) && (this.r = Number(b[1]),
                this.g = Number(b[2]),
                this.b = Number(b[3]),
                this.a = Number(b[4])),
                null !== b
            }
            ;
            var i = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
            d.prototype.hsl = function(a) {
                var b = null;
                if (null !== (b = a.match(i))) {
                    var c = d.hsl2rgb(Number(b[1]), Number(b[2]), Number(b[3]));
                    this.r = c.r,
                    this.g = c.g,
                    this.b = c.b
                }
                return null !== b
            }
            ;
            var j = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d?\.?\d+)\s*\)$/;
            d.prototype.hsla = function(a) {
                var b = null;
                if (null !== (b = a.match(j))) {
                    var c = d.hsl2rgb(Number(b[1]), Number(b[2]), Number(b[3]));
                    this.r = c.r,
                    this.g = c.g,
                    this.b = c.b,
                    this.a = Number(b[4])
                }
                return null !== b
            }
            ,
            d.prototype.toString = function() {
                return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
            }
            ,
            d.prototype.namedColor = function(a) {
                a = a.toLowerCase();
                var b = k[a];
                if (b)
                    this.r = b[0],
                    this.g = b[1],
                    this.b = b[2];
                else if ("transparent" === a)
                    return this.r = this.g = this.b = this.a = 0,
                    !0;
                return !!b
            }
            ,
            d.hsl2rgb = function(a, b, c) {
                var d, e, f;
                isFinite(a) || (a = 0),
                isFinite(b) || (b = 0),
                isFinite(c) || (c = 0),
                a /= 60,
                a < 0 && (a = 6 - -a % 6),
                a %= 6,
                b = Math.max(0, Math.min(1, b / 100)),
                c = Math.max(0, Math.min(1, c / 100));
                var g = (1 - Math.abs(2 * c - 1)) * b
                  , h = g * (1 - Math.abs(a % 2 - 1));
                a < 1 ? (d = g,
                e = h,
                f = 0) : a < 2 ? (d = h,
                e = g,
                f = 0) : a < 3 ? (d = 0,
                e = g,
                f = h) : a < 4 ? (d = 0,
                e = h,
                f = g) : a < 5 ? (d = h,
                e = 0,
                f = g) : (d = g,
                e = 0,
                f = h);
                var i = c - g / 2;
                return d = Math.round(255 * (d + i)),
                e = Math.round(255 * (e + i)),
                f = Math.round(255 * (f + i)),
                {
                    r: d,
                    g: e,
                    b: f
                }
            }
            ,
            d.prototype.isColor = !0;
            var k = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            };
            b.exports = d
        }
        , {}],
        12: [function(b, c, d) {
            function e(a, b) {
                var c = x++;
                if (b = b || {},
                b.logging && (r.options.logging = !0,
                r.options.start = Date.now()),
                b.async = void 0 === b.async || b.async,
                b.allowTaint = void 0 !== b.allowTaint && b.allowTaint,
                b.removeContainer = void 0 === b.removeContainer || b.removeContainer,
                b.javascriptEnabled = void 0 !== b.javascriptEnabled && b.javascriptEnabled,
                b.imageTimeout = void 0 === b.imageTimeout ? 1e4 : b.imageTimeout,
                b.renderer = "function" == typeof b.renderer ? b.renderer : n,
                b.strict = !!b.strict,
                "string" == typeof a) {
                    if ("string" != typeof b.proxy)
                        return Promise.reject("Proxy must be used when rendering url");
                    var d = null != b.width ? b.width : window.innerWidth
                      , e = null != b.height ? b.height : window.innerHeight;
                    return u(l(a), b.proxy, document, d, e, b).then(function(a) {
                        return g(a.contentWindow.document.documentElement, a, b, d, e)
                    })
                }
                var h = (void 0 === a ? [document.documentElement] : a.length ? a : [a])[0];
                return h.setAttribute(w + c, c),
                f(h.ownerDocument, b, h.ownerDocument.defaultView.innerWidth, h.ownerDocument.defaultView.innerHeight, c).then(function(a) {
                    return "function" == typeof b.onrendered && (r("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"),
                    b.onrendered(a)),
                    a
                })
            }
            function f(a, b, c, d, e) {
                return t(a, a, c, d, b, a.defaultView.pageXOffset, a.defaultView.pageYOffset).then(function(f) {
                    r("Document cloned");
                    var h = w + e
                      , i = "[" + h + "='" + e + "']";
                    a.querySelector(i).removeAttribute(h);
                    var j = f.contentWindow
                      , k = j.document.querySelector(i);
                    return ("function" == typeof b.onclone ? Promise.resolve(b.onclone(j.document)) : Promise.resolve(!0)).then(function() {
                        return g(k, f, b, c, d)
                    })
                })
            }
            function g(a, b, c, d, e) {
                var f = b.contentWindow
                  , g = new m(f.document)
                  , l = new o(c,g)
                  , n = "view" === c.type ? d : j(f.document)
                  , q = "view" === c.type ? e : k(f.document)
                  , s = new c.renderer(n,q,l,c,document);
                return new p(a,s,g,l,c).ready.then(function() {
                    r("Finished rendering");
                    var d, e = v(a);
                    return d = "view" === c.type ? i(s.canvas, {
                        width: s.canvas.width,
                        height: s.canvas.height,
                        top: 0,
                        left: 0,
                        x: 0,
                        y: 0
                    }) : a === f.document.body || a === f.document.documentElement || null != c.canvas ? s.canvas : i(s.canvas, {
                        width: null != c.width ? c.width : e.width,
                        height: null != c.height ? c.height : e.height,
                        top: e.top,
                        left: e.left,
                        x: 0,
                        y: 0
                    }),
                    h(b, c),
                    d
                })
            }
            function h(a, b) {
                b.removeContainer && (a.parentNode.removeChild(a),
                r("Cleaned up container"))
            }
            function i(a, b) {
                var c = document.createElement("canvas")
                  , d = Math.min(a.width - 1, Math.max(0, b.left))
                  , e = Math.min(a.width, Math.max(1, b.left + b.width))
                  , f = Math.min(a.height - 1, Math.max(0, b.top))
                  , g = Math.min(a.height, Math.max(1, b.top + b.height));
                c.width = b.width,
                c.height = b.height;
                var h = e - d
                  , i = g - f;
                return r("Cropping canvas at:", "left:", b.left, "top:", b.top, "width:", h, "height:", i),
                r("Resulting crop with width", b.width, "and height", b.height, "with x", d, "and y", f),
                c.getContext("2d").drawImage(a, d, f, h, i, b.x, b.y, h, i),
                c
            }
            function j(a) {
                return Math.max(Math.max(a.body.scrollWidth, a.documentElement.scrollWidth), Math.max(a.body.offsetWidth, a.documentElement.offsetWidth), Math.max(a.body.clientWidth, a.documentElement.clientWidth))
            }
            function k(a) {
                return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
            }
            function l(a) {
                var b = document.createElement("a");
                return b.href = a,
                b.href = b.href,
                b
            }
            var m = b("./support")
              , n = b("./renderers/canvas")
              , o = b("./imageloader")
              , p = b("./nodeparser")
              , q = b("./nodecontainer")
              , r = b("./log")
              , s = b("./utils")
              , t = b("./clone")
              , u = b("./proxy").loadUrlDocument
              , v = s.getBounds
              , w = "data-html2canvas-node"
              , x = 0;
            e.CanvasRenderer = n,
            e.NodeContainer = q,
            e.log = r,
            e.utils = s;
            var y = "undefined" == typeof document || "function" != typeof Object.create || "function" != typeof document.createElement("canvas").getContext ? function() {
                return Promise.reject("No canvas support")
            }
            : e;
            c.exports = y,
            "function" == typeof a && a.amd && a("html2canvas", [], function() {
                return y
            })
        }
        , {
            "./clone": 10,
            "./imageloader": 19,
            "./log": 21,
            "./nodecontainer": 22,
            "./nodeparser": 23,
            "./proxy": 24,
            "./renderers/canvas": 28,
            "./support": 32,
            "./utils": 36
        }],
        13: [function(a, b, c) {
            function d(a) {
                if (this.src = a,
                e("DummyImageContainer for", a),
                !this.promise || !this.image) {
                    e("Initiating DummyImageContainer"),
                    d.prototype.image = new Image;
                    var b = this.image;
                    d.prototype.promise = new Promise(function(a, c) {
                        b.onload = a,
                        b.onerror = c,
                        b.src = f(),
                        !0 === b.complete && a(b)
                    }
                    )
                }
            }
            var e = a("./log")
              , f = a("./utils").smallImage;
            b.exports = d
        }
        , {
            "./log": 21,
            "./utils": 36
        }],
        14: [function(a, b, c) {
            function d(a, b) {
                var c, d, f = document.createElement("div"), g = document.createElement("img"), h = document.createElement("span");
                f.style.visibility = "hidden",
                f.style.fontFamily = a,
                f.style.fontSize = b,
                f.style.margin = 0,
                f.style.padding = 0,
                document.body.appendChild(f),
                g.src = e(),
                g.width = 1,
                g.height = 1,
                g.style.margin = 0,
                g.style.padding = 0,
                g.style.verticalAlign = "baseline",
                h.style.fontFamily = a,
                h.style.fontSize = b,
                h.style.margin = 0,
                h.style.padding = 0,
                h.appendChild(document.createTextNode("Hidden Text")),
                f.appendChild(h),
                f.appendChild(g),
                c = g.offsetTop - h.offsetTop + 1,
                f.removeChild(h),
                f.appendChild(document.createTextNode("Hidden Text")),
                f.style.lineHeight = "normal",
                g.style.verticalAlign = "super",
                d = g.offsetTop - f.offsetTop + 1,
                document.body.removeChild(f),
                this.baseline = c,
                this.lineWidth = 1,
                this.middle = d
            }
            var e = a("./utils").smallImage;
            b.exports = d
        }
        , {
            "./utils": 36
        }],
        15: [function(a, b, c) {
            function d() {
                this.data = {}
            }
            var e = a("./font");
            d.prototype.getMetrics = function(a, b) {
                return void 0 === this.data[a + "-" + b] && (this.data[a + "-" + b] = new e(a,b)),
                this.data[a + "-" + b]
            }
            ,
            b.exports = d
        }
        , {
            "./font": 14
        }],
        16: [function(a, b, c) {
            function d(b, c, d) {
                this.image = null,
                this.src = b;
                var e = this
                  , g = f(b);
                this.promise = (c ? new Promise(function(a) {
                    "about:blank" === b.contentWindow.document.URL || null == b.contentWindow.document.documentElement ? b.contentWindow.onload = b.onload = function() {
                        a(b)
                    }
                    : a(b)
                }
                ) : this.proxyLoad(d.proxy, g, d)).then(function(b) {
                    return a("./core")(b.contentWindow.document.documentElement, {
                        type: "view",
                        width: b.width,
                        height: b.height,
                        proxy: d.proxy,
                        javascriptEnabled: d.javascriptEnabled,
                        removeContainer: d.removeContainer,
                        allowTaint: d.allowTaint,
                        imageTimeout: d.imageTimeout / 2
                    })
                }).then(function(a) {
                    return e.image = a
                })
            }
            var e = a("./utils")
              , f = e.getBounds
              , g = a("./proxy").loadUrlDocument;
            d.prototype.proxyLoad = function(a, b, c) {
                var d = this.src;
                return g(d.src, a, d.ownerDocument, b.width, b.height, c)
            }
            ,
            b.exports = d
        }
        , {
            "./core": 12,
            "./proxy": 24,
            "./utils": 36
        }],
        17: [function(a, b, c) {
            function d(a) {
                this.src = a.value,
                this.colorStops = [],
                this.type = null,
                this.promise = Promise.resolve(!0)
            }
            var e = a("./color");
            d.prototype.parseColorStops = function(a, b) {
                this.colorStops = a.map(function(a) {
                    var b = a.match(d.REGEXP_COLORSTOP);
                    if (!b)
                        return {
                            color: "transparent",
                            stop: null
                        };
                    var c = +b[2]
                      , f = 0 === c ? "%" : b[3];
                    return {
                        color: "transparent" === b[1] ? b[1] : new e(b[1]),
                        stop: "%" === f ? c / 100 : null
                    }
                });
                for (var c = 0; c < this.colorStops.length; ++c) {
                    var f = this.colorStops[c];
                    if ("transparent" === f.color) {
                        var g = null
                          , h = null
                          , i = null;
                        if (c > 0 && (g = this.colorStops[c - 1].color),
                        c + 1 < this.colorStops.length && (h = this.colorStops[c + 1].color),
                        i = g || h,
                        f.color = new e([i.r, i.g, i.b, 0]),
                        g && h && "transparent" !== h) {
                            var j = {
                                color: new e([h.r, h.g, h.b, 0]),
                                stop: f.stop
                            };
                            this.colorStops.splice(c + 1, 0, j)
                        }
                    }
                }
                null === this.colorStops[0].stop && (this.colorStops[0].stop = 0),
                null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1),
                this.colorStops.forEach(function(a, b) {
                    null === a.stop && this.colorStops.slice(b).some(function(c, d) {
                        return null !== c.stop && (a.stop = (c.stop - this.colorStops[b - 1].stop) / (d + 1) + this.colorStops[b - 1].stop,
                        !0)
                    }, this)
                }, this)
            }
            ,
            d.TYPES = {
                LINEAR: 1,
                RADIAL: 2,
                REPEATING_LINEAR: 3,
                REPEATING_RADIAL: 4
            },
            d.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|hsla?\(\s*\d{1,3},\s*[\d\.]+%,\s*[\d\.]+%(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d+(?:\.\d+)?)(%|px)?)?(?:\s|$)/i,
            b.exports = d
        }
        , {
            "./color": 11
        }],
        18: [function(a, b, c) {
            function d(a, b) {
                this.src = a,
                this.image = new Image;
                var c = this;
                this.tainted = null,
                this.promise = new Promise(function(d, e) {
                    c.image.onload = d,
                    c.image.onerror = e,
                    b && (c.image.crossOrigin = "anonymous"),
                    c.image.src = a,
                    !0 === c.image.complete && d(c.image)
                }
                )
            }
            b.exports = d
        }
        , {}],
        19: [function(a, b, c) {
            function d(a, b) {
                this.link = null,
                this.options = a,
                this.support = b,
                this.origin = this.getOrigin(window.location.href)
            }
            var e = a("./log")
              , f = a("./imagecontainer")
              , g = a("./videocontainer")
              , h = a("./dummyimagecontainer")
              , i = a("./areion_proxyimagecontainer")
              , j = a("./areion_proxyvideocontainer")
              , k = a("./framecontainer")
              , l = a("./svgcontainer")
              , m = a("./svgnodecontainer")
              , n = a("./lineargradientcontainer")
              , o = a("./radialgradientcontainer")
              , p = a("./repeatinglineargradientcontainer")
              , q = a("./repeatingradialgradientcontainer")
              , r = a("./webkitgradientcontainer")
              , s = a("./utils").bind;
            d.prototype.findImages = function(a) {
                var b = []
                  , c = 0;
                return a.reduce(function(a, b) {
                    switch (b.node.nodeName) {
                    case "IMG":
                        return a.concat([{
                            args: [b.node.currentSrc || b.node.src],
                            method: "url"
                        }]);
                    case "VIDEO":
                        return a.concat([{
                            args: [b.node],
                            videoIndex: c++,
                            method: "VIDEO"
                        }]);
                    case "svg":
                    case "IFRAME":
                        return a.concat([{
                            args: [b.node],
                            method: b.node.nodeName
                        }])
                    }
                    return a
                }, []).forEach(this.addImage(b, this.loadImage), this),
                b
            }
            ,
            d.prototype.findBackgroundImage = function(a, b) {
                b.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(a, this.loadImage, b), this);
                var c = b.parseListStyleImage();
                return c && this.addImage(a, this.loadImage, b).call(this, c),
                a
            }
            ,
            d.prototype.addImage = function(a, b, c) {
                return function(d) {
                    d.args.forEach(function(f) {
                        this.imageExists(a, f) || (a.splice(0, 0, b.call(this, d, c)),
                        e("Added image #" + a.length, "string" == typeof f ? f.substring(0, 100) : f))
                    }, this)
                }
            }
            ,
            d.prototype.hasImageBackground = function(a) {
                return "none" !== a.method
            }
            ,
            d.prototype.loadImage = function(a, b) {
                if (!this.options.cancel) {
                    if ("url" === a.method) {
                        var c = a.args[0];
                        return !this.isSVG(c) || this.support.svg || this.options.allowTaint ? c.match(/data:image\/.*;base64,/i) ? new f(c.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""),!1) : this.isSameOrigin(c) || !0 === this.options.allowTaint || this.isSVG(c) ? new f(c,!1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new f(c,!0) : this.options.proxy ? new i(c,this.options.proxy) : new h(c) : new l(c)
                    }
                    if ("linear-gradient" === a.method)
                        return new n(a);
                    if ("radial-gradient" === a.method)
                        return new o(a,b);
                    if ("repeating-linear-gradient" === a.method)
                        return new p(a);
                    if ("repeating-radial-gradient" === a.method)
                        return new q(a,b);
                    if ("gradient" === a.method)
                        return new r(a);
                    if ("svg" === a.method)
                        return new m(a.args[0],this.support.svg);
                    if ("IFRAME" === a.method)
                        return new k(a.args[0],this.isSameOrigin(a.args[0].src),this.options);
                    if ("VIDEO" === a.method) {
                        var d = a.args[0].currentSrc || a.args[0].src;
                        return this.isSameOrigin(d) || !0 === this.options.allowTaint ? new g(a) : new j(a)
                    }
                    return new h(a)
                }
            }
            ,
            d.prototype.isSVG = function(a) {
                return /\.svg(?:$|\?|#)/i.test(a) || l.prototype.isInline(a)
            }
            ,
            d.prototype.imageExists = function(a, b) {
                return a.some(function(a) {
                    return a.src === b
                })
            }
            ,
            d.prototype.isSameOrigin = function(a) {
                return this.getOrigin(a) === this.origin
            }
            ,
            d.prototype.getOrigin = function(a) {
                var b = this.link || (this.link = document.createElement("a"));
                return b.href = a,
                b.href = b.href,
                b.protocol + b.hostname + b.port
            }
            ,
            d.prototype.getPromise = function(a) {
                return this.timeout(a, this.options.imageTimeout).catch(function() {
                    return new h(a.src).promise.then(function(b) {
                        a.image = b
                    })
                })
            }
            ,
            d.prototype.get = function(a) {
                var b = null;
                return this.images.some(function(c) {
                    return (b = c).src === a
                }) ? b : null
            }
            ,
            d.prototype.getVideo = function(a) {
                var b = null;
                return this.images.some(function(c) {
                    return (b = c).videoIndex === a
                }) ? b : null
            }
            ,
            d.prototype.fetch = function(a) {
                return this.images = a.reduce(s(this.findBackgroundImage, this), this.findImages(a)),
                this.images.forEach(function(a, b) {
                    a.promise.then(function() {
                        e("Succesfully loaded image #" + (b + 1), a)
                    }, function(c) {
                        e("Failed loading image #" + (b + 1), a, c)
                    })
                }),
                this.ready = Promise.all(this.images.map(this.getPromise, this)),
                e("Finished searching images"),
                this
            }
            ,
            d.prototype.timeout = function(a, b) {
                var c, d = Promise.race([a.promise, new Promise(function(d, f) {
                    c = setTimeout(function() {
                        e("Timed out loading image", a),
                        f(a)
                    }, b)
                }
                )]).then(function(a) {
                    return clearTimeout(c),
                    a
                });
                return d.catch(function() {
                    clearTimeout(c)
                }),
                d
            }
            ,
            b.exports = d
        }
        , {
            "./areion_proxyimagecontainer": 8,
            "./areion_proxyvideocontainer": 9,
            "./dummyimagecontainer": 13,
            "./framecontainer": 16,
            "./imagecontainer": 18,
            "./lineargradientcontainer": 20,
            "./log": 21,
            "./radialgradientcontainer": 26,
            "./repeatinglineargradientcontainer": 29,
            "./repeatingradialgradientcontainer": 30,
            "./svgcontainer": 33,
            "./svgnodecontainer": 34,
            "./utils": 36,
            "./videocontainer": 37,
            "./webkitgradientcontainer": 38
        }],
        20: [function(a, b, c) {
            function d(a) {
                if (e.apply(this, arguments),
                this.type = e.TYPES.LINEAR,
                this.angle = Math.PI,
                d.REGEXP_DIRECTION.test(a.args[0]) || !e.REGEXP_COLORSTOP.test(a.args[0])) {
                    if (d.REGEXP_ANGLE.test(a.args[0]))
                        this.angle = parseFloat(a.args[0]) / 180 * Math.PI,
                        a.prefix && (this.angle -= .5 * Math.PI);
                    else {
                        var b = a.args[0].split(/\s+/)
                          , c = !1;
                        "to" === b[0] && (c = !0,
                        b.shift());
                        for (var f = 0, g = b.length, h = 0; h < g; h++)
                            f += d.ANGLES[b[h]] || 0;
                        this.angle = f / g + (c ? Math.PI : 0)
                    }
                    this.parseColorStops(a.args.slice(1))
                } else
                    this.parseColorStops(a.args)
            }
            var e = a("./gradientcontainer");
            a("./color");
            d.prototype = Object.create(e.prototype),
            d.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|\d*(?:\.\d+)?deg)(?:\s|$)/i,
            d.REGEXP_ANGLE = /^\d*(?:\.\d+)?deg\s*$/i,
            d.ANGLES = {
                bottom: 0,
                left: .5 * Math.PI,
                top: Math.PI,
                right: 1.5 * Math.PI
            },
            b.exports = d
        }
        , {
            "./color": 11,
            "./gradientcontainer": 17
        }],
        21: [function(a, b, c) {
            var d = function() {
                d.options.logging && window.console && window.console.log && Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - d.options.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
            };
            d.options = {
                logging: !1
            },
            b.exports = d
        }
        , {}],
        22: [function(a, b, c) {
            function d(a, b) {
                this.node = a,
                this.parent = b,
                this.stack = null,
                this.bounds = null,
                this.borders = null,
                this.clip = [],
                this.backgroundClip = [],
                this.canvasBorder = [],
                this.offsetBounds = null,
                this.visible = null,
                this.computedStyles = null,
                this.colors = {},
                this.styles = {},
                this.backgroundImages = null,
                this.listStyleImage = void 0,
                this.transformData = null,
                this.transformMatrix = null,
                this.isPseudoElement = !1,
                this.opacity = null
            }
            function e(a) {
                var b = a.options[a.selectedIndex || 0];
                return b ? b.text || "" : ""
            }
            function f(a) {
                if (a && "matrix" === a[1])
                    return a[2].split(",").map(function(a) {
                        return parseFloat(a.trim())
                    });
                if (a && "matrix3d" === a[1]) {
                    var b = a[2].split(",").map(function(a) {
                        return parseFloat(a.trim())
                    });
                    return [b[0], b[1], b[4], b[5], b[12], b[13]]
                }
            }
            function g(a) {
                return -1 !== a.toString().indexOf("%")
            }
            function h(a) {
                return a.replace("px", "")
            }
            function i(a) {
                return parseFloat(a)
            }
            var j = a("./color")
              , k = a("./utils")
              , l = k.getBounds
              , m = k.parseBackgrounds
              , n = k.offsetBounds;
            d.prototype.cloneTo = function(a) {
                a.visible = this.visible,
                a.borders = this.borders,
                a.bounds = this.bounds,
                a.clip = this.clip,
                a.backgroundClip = this.backgroundClip,
                a.canvasBorder = this.canvasBorder,
                a.computedStyles = this.computedStyles,
                a.styles = this.styles,
                a.backgroundImages = this.backgroundImages,
                a.opacity = this.opacity
            }
            ,
            d.prototype.getOpacity = function() {
                if (null == this.opacity) {
                    for (var a = parseFloat(this.css("opacity")), b = this; isNaN(a); ) {
                        if (!(b = b.parent)) {
                            a = 1;
                            break
                        }
                        a = parseFloat(b.css("opacity"))
                    }
                    this.opacity = a
                }
                return this.opacity
            }
            ,
            d.prototype.assignStack = function(a) {
                this.stack = a,
                a.children.push(this)
            }
            ,
            d.prototype.isElementVisible = function() {
                return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && ("visible" === this.css("overflow") || 0 !== this.cssInt("width") && 0 !== this.cssInt("height")) && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
            }
            ,
            d.prototype.css = function(a, b) {
                if (b) {
                    var c = this.computedStyle(null)[a];
                    if (c)
                        return c
                }
                return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)),
                this.styles[a] || (this.styles[a] = this.computedStyles[a])
            }
            ,
            d.prototype.prefixedCss = function(a, b) {
                var c = ["webkit", "moz", "ms", "o"]
                  , d = this.css(a, b);
                return void 0 === d && c.some(function(c) {
                    return void 0 !== (d = this.css(c + a.substr(0, 1).toUpperCase() + a.substr(1), b))
                }, this),
                void 0 === d ? null : d
            }
            ,
            d.prototype.computedStyle = function(a) {
                return this.node.ownerDocument.defaultView.getComputedStyle(this.node, a)
            }
            ,
            d.prototype.cssInt = function(a) {
                var b = parseInt(this.css(a), 10);
                return isNaN(b) ? 0 : b
            }
            ,
            d.prototype.color = function(a) {
                return this.colors[a] || (this.colors[a] = new j(this.css(a)))
            }
            ,
            d.prototype.cssFloat = function(a) {
                var b = parseFloat(this.css(a));
                return isNaN(b) ? 0 : b
            }
            ,
            d.prototype.fontWeight = function() {
                var a = this.css("fontWeight");
                switch (parseInt(a, 10)) {
                case 401:
                    a = "bold";
                    break;
                case 400:
                    a = "normal"
                }
                return a
            }
            ,
            d.prototype.parseClip = function() {
                var a = this.css("clip").match(this.CLIP);
                return a ? {
                    top: parseInt(a[1], 10),
                    right: parseInt(a[2], 10),
                    bottom: parseInt(a[3], 10),
                    left: parseInt(a[4], 10)
                } : null
            }
            ,
            d.prototype.parseBackgroundImages = function() {
                return this.backgroundImages || (this.backgroundImages = m(this.css("backgroundImage")))
            }
            ,
            d.prototype.parseListStyleImage = function() {
                if (void 0 === this.listStyleImage) {
                    var a = m(this.css("listStyleImage"));
                    a && a.length > 0 ? this.listStyleImage = a[0] : this.listStyleImage = null
                }
                return this.listStyleImage
            }
            ,
            d.prototype.parseBackgroundSize = function(a, b, c) {
                var d = (this.css("backgroundSize") || "").split(",");
                d = d[c || 0] || d[0] || "auto",
                d = d.trim().split(" "),
                1 === d.length && d.push("auto");
                var e, f;
                if (g(d[0]))
                    e = a.width * parseFloat(d[0]) / 100;
                else {
                    if (/contain|cover/.test(d[0])) {
                        var h = a.width / a.height
                          , i = b.width / b.height;
                        return h < i ^ "contain" === d[0] ? {
                            width: a.height * i,
                            height: a.height
                        } : {
                            width: a.width,
                            height: a.width / i
                        }
                    }
                    e = parseInt(d[0], 10)
                }
                return f = "auto" === d[0] && "auto" === d[1] ? b.height : "auto" === d[1] ? e / b.width * b.height : g(d[1]) ? a.height * parseFloat(d[1]) / 100 : parseInt(d[1], 10),
                "auto" === d[0] && (e = f / b.height * b.width),
                {
                    width: e,
                    height: f
                }
            }
            ,
            d.prototype.parseBackgroundPosition = function(a, b, c, d) {
                var e, f = this.css("backgroundPositionX"), h = this.css("backgroundPosition");
                if (void 0 === f) {
                    var i = h.split(/\s+/);
                    1 === i.length ? (f = i[0],
                    "top" === f || "bottom" === f ? (e = f,
                    f = "50%") : e = "50%") : (f = i[0],
                    e = i[1])
                } else
                    e = this.css("backgroundPositionY");
                var j, k;
                return j = "left" === f ? 0 : "center" === f ? .5 * (a.width - (d || b).width) : "right" === f ? a.width - (d || b).width : g(f) ? (a.width - (d || b).width) * (parseFloat(f) / 100) : 0 === h.indexOf("right") ? a.width - (d || b).width - parseInt(f, 10) : parseInt(f, 10),
                k = "auto" === e ? j / b.width * b.height : "top" === e ? 0 : "center" === e ? .5 * (a.height - (d || b).height) : "bottom" === e ? a.height - (d || b).height : g(e) ? (a.height - (d || b).height) * parseFloat(e) / 100 : -1 !== h.indexOf("bottom") ? a.height - (d || b).height - parseInt(e, 10) : parseInt(e, 10),
                "auto" === f && (j = k / b.height * b.width),
                {
                    left: j,
                    top: k
                }
            }
            ,
            d.prototype.parseBackgroundOrigin = function(a, b, c) {
                var d = this.cssInt("borderLeftWidth")
                  , e = this.cssInt("borderRightWidth")
                  , f = this.cssInt("borderTopWidth")
                  , g = this.cssInt("borderBottomWidth")
                  , h = c ? d : 0
                  , i = c ? f : 0;
                switch (this.css("backgroundOrigin")) {
                case "content-box":
                    var j = this.cssInt("paddingLeft")
                      , k = this.cssInt("paddingRight")
                      , l = this.cssInt("paddingTop")
                      , m = this.cssInt("paddingBottom");
                    return {
                        left: a.left + j + h,
                        top: a.top + l + i,
                        right: a.right - k,
                        bottom: a.bottom - m,
                        width: a.width - j - k - d - e,
                        height: a.height - l - m - f - g
                    };
                case "padding-box":
                    return {
                        left: a.left + h,
                        top: a.top + i,
                        right: a.right,
                        bottom: a.bottom,
                        width: a.width - d - e,
                        height: a.height - f - g
                    };
                case "border-box":
                    return {
                        left: a.left - d + h,
                        top: a.top - f + i,
                        right: a.right + e,
                        bottom: a.bounds + g,
                        width: a.width,
                        height: a.height
                    }
                }
            }
            ,
            d.prototype.parseBackgroundRepeat = function(a) {
                return this.css("backgroundRepeat")
            }
            ,
            d.prototype.parseTextShadows = function() {
                var a = this.css("textShadow")
                  , b = [];
                if (a && "none" !== a)
                    for (var c = a.match(this.TEXT_SHADOW_PROPERTY), d = 0; c && d < c.length; d++) {
                        var e = c[d].match(this.TEXT_SHADOW_VALUES);
                        b.push({
                            color: new j(e[0]),
                            offsetX: e[1] ? parseFloat(e[1].replace("px", "")) : 0,
                            offsetY: e[2] ? parseFloat(e[2].replace("px", "")) : 0,
                            blur: e[3] ? parseFloat(e[3].replace("px", "")) : 0
                        })
                    }
                return b
            }
            ,
            d.prototype.parseTransform = function() {
                if (!this.transformData)
                    if (this.hasTransform()) {
                        var a = this.parseBounds()
                          , b = this.prefixedCss("transformOrigin", !0).split(" ").map(h).map(i);
                        b[0] += a.left,
                        b[1] += a.top,
                        this.transformData = {
                            origin: b,
                            matrix: this.parseTransformMatrix()
                        }
                    } else
                        this.transformData = {
                            origin: [0, 0],
                            matrix: [1, 0, 0, 1, 0, 0]
                        };
                return this.transformData
            }
            ,
            d.prototype.parseTransformMatrix = function() {
                if (!this.transformMatrix) {
                    var a = this.prefixedCss("transform")
                      , b = a ? f(a.match(this.MATRIX_PROPERTY)) : null;
                    this.transformMatrix = b || [1, 0, 0, 1, 0, 0]
                }
                return this.transformMatrix
            }
            ,
            d.prototype.inverseTransform = function() {
                for (var a = this.parseTransform(), b = [], c = 0; c < a.origin.length; c++)
                    b.push(-a.origin[c]);
                return {
                    origin: b,
                    matrix: k.matrixInverse(a.matrix)
                }
            }
            ,
            d.prototype.parseBounds = function() {
                return this.bounds || (this.bounds = this.hasTransform() ? n(this.node) : l(this.node))
            }
            ,
            d.prototype.hasTransform = function() {
                return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
            }
            ,
            d.prototype.getValue = function() {
                var a = this.node.value || "";
                return "SELECT" === this.node.tagName ? a = e(this.node) : "password" === this.node.type && (a = Array(a.length + 1).join("•")),
                0 === a.length ? this.node.placeholder || "" : a
            }
            ,
            d.prototype.isPlaceholderShown = function() {
                return "SELECT" !== this.node.tagName && !this.node.value && !!this.node.placeholder
            }
            ,
            d.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/,
            d.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,
            d.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g,
            d.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/,
            b.exports = d
        }
        , {
            "./color": 11,
            "./utils": 36
        }],
        23: [function(a, b, c) {
            function d(a, b, c, d, e) {
                P("Starting NodeParser"),
                this.renderer = b,
                this.options = e,
                this.range = null,
                this.support = c,
                this.renderQueue = [],
                this.stack = new W(!0,1,a.ownerDocument,null);
                var f = new R(a,null);
                if (e.background && b.rectangle(0, 0, b.width, b.height, new V(e.background)),
                a === a.ownerDocument.documentElement) {
                    var g = new R(f.color("backgroundColor").isTransparent() ? a.ownerDocument.body : a.ownerDocument.documentElement,null);
                    b.rectangle(0, 0, b.width, b.height, g.color("backgroundColor"))
                }
                f.visibile = f.isElementVisible(),
                this.createPseudoHideStyles(a.ownerDocument),
                this.disableAnimations(a.ownerDocument),
                this.counters = {},
                this.quoteDepth = 0,
                this.resolvePseudoContent(a);
                var h = window.innerWidth || document.documentElement.clientWidth
                  , i = window.innerHeight || document.documentElement.clientHeight
                  , j = [f].concat(this.getChildren(f));
                j.forEach(function(a) {
                    var b = a.isElementVisible();
                    if (b && "view" === e.type) {
                        var c = a.node.getBoundingClientRect && a.node.getBoundingClientRect();
                        if (c && (b = c.left <= h && c.right >= 0 && c.top <= i && c.bottom >= 0),
                        b)
                            for (var d = a.parent; d && !d.visible; )
                                d.visible = !0,
                                d = d.parent
                    }
                    a.visible = b
                }),
                this.nodes = L(j.filter(function(a) {
                    return a.visible
                }).map(this.getPseudoElements, this).map(this.applyInlineStylesToSvg, this)),
                this.fontMetrics = new U,
                P("Fetched nodes, total:", this.nodes.length),
                P("Calculate overflow clips"),
                this.calculateOverflowClips(),
                P("Start fetching images"),
                this.images = d.fetch(this.nodes.filter(E)),
                this.ready = this.images.ready.then(Z(function() {
                    return P("Images loaded, starting parsing"),
                    P("Creating stacking contexts"),
                    this.createStackingContexts(),
                    P("Sorting stacking contexts"),
                    this.sortStackingContexts(this.stack),
                    this.parse(this.stack),
                    P("Render queue created with " + this.renderQueue.length + " items"),
                    new Promise(Z(function(a) {
                        e.async ? "function" == typeof e.async ? e.async.call(this, this.renderQueue, a) : this.renderQueue.length > 0 ? (this.renderIndex = 0,
                        this.asyncRenderer(this.renderQueue, a)) : a() : (this.renderQueue.forEach(this.paint, this),
                        a())
                    }, this))
                }, this))
            }
            function e(a) {
                return a.parent && a.parent.clip.length
            }
            function f(a) {
                var b = a.css("position");
                if ("fixed" === b)
                    return null;
                if ("absolute" !== b)
                    return a.parent && a.parent.clip;
                for (var c = a.parent; c; c = c.parent)
                    if ("static" !== c.css("position"))
                        return c.clip;
                return null
            }
            function g(a) {
                if ("use" !== a.nodeName && "symbol" !== a.nodeName)
                    for (var b = getComputedStyle(a), c = b.length - 1; c >= 0; c--) {
                        var d = h(b.item(c));
                        a.style[d] = b[d]
                    }
                for (var e = a.childNodes, f = e.length, i = 0; i < f; i++) {
                    var j = e[i];
                    1 === j.nodeType && g(j)
                }
            }
            function h(a) {
                return a.replace(/(\-[a-z])/g, function(a) {
                    return a.toUpperCase().replace("-", "")
                })
            }
            function i() {}
            function j(a, b, c, d) {
                var e = {
                    top: b.top + a[0].width / 2,
                    right: b.right - a[1].width / 2,
                    bottom: b.bottom - a[2].width / 2,
                    left: b.left + a[3].width / 2
                };
                return a.map(function(f, g) {
                    if (f.width > 0) {
                        var h = b.left
                          , i = b.top
                          , j = b.width
                          , k = b.height - a[2].width;
                        switch (g) {
                        case 0:
                            k = a[0].width,
                            f.args = n({
                                c1: [h, i],
                                c2: [h + j, i],
                                c3: [h + j - a[1].width, i + k],
                                c4: [h + a[3].width, i + k]
                            }, d[0], d[1], c.topLeftOuter, c.topLeftInner, c.topRightOuter, c.topRightInner),
                            f.pathArgs = o({
                                c1: [e.left, e.top],
                                c2: [e.right, e.top]
                            }, d[0], d[1], c.topLeft, c.topRight);
                            break;
                        case 1:
                            h = b.left + b.width - a[1].width,
                            j = a[1].width,
                            f.args = n({
                                c1: [h + j, i],
                                c2: [h + j, i + k + a[2].width],
                                c3: [h, i + k],
                                c4: [h, i + a[0].width]
                            }, d[1], d[2], c.topRightOuter, c.topRightInner, c.bottomRightOuter, c.bottomRightInner),
                            f.pathArgs = o({
                                c1: [e.right, e.top],
                                c2: [e.right, e.bottom]
                            }, d[1], d[2], c.topRight, c.bottomRight);
                            break;
                        case 2:
                            i = i + b.height - a[2].width,
                            k = a[2].width,
                            f.args = n({
                                c1: [h + j, i + k],
                                c2: [h, i + k],
                                c3: [h + a[3].width, i],
                                c4: [h + j - a[3].width, i]
                            }, d[2], d[3], c.bottomRightOuter, c.bottomRightInner, c.bottomLeftOuter, c.bottomLeftInner),
                            f.pathArgs = o({
                                c1: [e.right, e.bottom],
                                c2: [e.left, e.bottom]
                            }, d[2], d[3], c.bottomRight, c.bottomLeft);
                            break;
                        case 3:
                            j = a[3].width,
                            f.args = n({
                                c1: [h, i + k + a[2].width],
                                c2: [h, i],
                                c3: [h + j, i + a[0].width],
                                c4: [h + j, i + k]
                            }, d[3], d[0], c.bottomLeftOuter, c.bottomLeftInner, c.topLeftOuter, c.topLeftInner),
                            f.pathArgs = o({
                                c1: [e.left, e.bottom],
                                c2: [e.left, e.top]
                            }, d[3], d[0], c.bottomLeft, c.topLeft)
                        }
                    }
                    return f
                })
            }
            function k(a, b, c, d) {
                var e = (Math.sqrt(2) - 1) / 3 * 4
                  , f = c * e
                  , g = d * e
                  , h = a + c
                  , i = b + d;
                return {
                    topLeft: m({
                        x: a,
                        y: i
                    }, {
                        x: a,
                        y: i - g
                    }, {
                        x: h - f,
                        y: b
                    }, {
                        x: h,
                        y: b
                    }),
                    topRight: m({
                        x: a,
                        y: b
                    }, {
                        x: a + f,
                        y: b
                    }, {
                        x: h,
                        y: i - g
                    }, {
                        x: h,
                        y: i
                    }),
                    bottomRight: m({
                        x: h,
                        y: b
                    }, {
                        x: h,
                        y: b + g
                    }, {
                        x: a + f,
                        y: i
                    }, {
                        x: a,
                        y: i
                    }),
                    bottomLeft: m({
                        x: h,
                        y: i
                    }, {
                        x: h - f,
                        y: i
                    }, {
                        x: a,
                        y: b + g
                    }, {
                        x: a,
                        y: b
                    })
                }
            }
            function l(a, b, c) {
                for (var d = a.left, e = a.top, f = a.width, g = a.height, h = Math.min(1, f / (b[0][0] + b[1][0]), g / (b[1][void 0 === b[1][1] ? 0 : 1] + b[2][void 0 === b[2][1] ? 0 : 1]), f / (b[2][0] + b[3][0]), g / (b[3][void 0 === b[3][1] ? 0 : 1] + b[0][void 0 === b[0][1] ? 0 : 1])), i = [], j = [], l = 0; l < 4; l++)
                    if (void 0 === b[0][1]) {
                        var m = h * b[l][0];
                        i.push(m),
                        j.push(m)
                    } else
                        i.push(h * b[l][0]),
                        j.push(h * b[l][1]);
                var n = f - i[1]
                  , o = g - j[2]
                  , p = f - i[2]
                  , q = g - j[3];
                return {
                    topLeft: k(d + c[3].width / 2, e + c[0].width / 2, Math.max(0, i[0] - c[3].width / 2), Math.max(0, j[0] - c[0].width / 2)).topLeft.subdivide(.5),
                    topRight: k(d + Math.min(n, f + c[3].width / 2), e + c[0].width / 2, n > f + c[3].width / 2 ? 0 : i[1] - c[3].width / 2, j[1] - c[0].width / 2).topRight.subdivide(.5),
                    bottomRight: k(d + Math.min(p, f - c[3].width / 2), e + Math.min(o, g + c[0].width / 2), Math.max(0, i[2] - c[1].width / 2), j[2] - c[2].width / 2).bottomRight.subdivide(.5),
                    bottomLeft: k(d + c[3].width / 2, e + q, Math.max(0, i[3] - c[3].width / 2), j[3] - c[2].width / 2).bottomLeft.subdivide(.5),
                    topLeftOuter: k(d, e, i[0], j[0]).topLeft.subdivide(.5),
                    topLeftInner: k(d + c[3].width, e + c[0].width, Math.max(0, i[0] - c[3].width), Math.max(0, j[0] - c[0].width)).topLeft.subdivide(.5),
                    topRightOuter: k(d + n, e, i[1], j[1]).topRight.subdivide(.5),
                    topRightInner: k(d + Math.min(n, f + c[3].width), e + c[0].width, n > f + c[3].width ? 0 : i[1] - c[3].width, j[1] - c[0].width).topRight.subdivide(.5),
                    bottomRightOuter: k(d + p, e + o, i[2], j[2]).bottomRight.subdivide(.5),
                    bottomRightInner: k(d + Math.min(p, f - c[3].width), e + Math.min(o, g + c[0].width), Math.max(0, i[2] - c[1].width), j[2] - c[2].width).bottomRight.subdivide(.5),
                    bottomLeftOuter: k(d, e + q, i[3], j[3]).bottomLeft.subdivide(.5),
                    bottomLeftInner: k(d + c[3].width, e + q, Math.max(0, i[3] - c[3].width), j[3] - c[2].width).bottomLeft.subdivide(.5)
                }
            }
            function m(a, b, c, d) {
                var e = function(a, b, c) {
                    return {
                        x: a.x + (b.x - a.x) * c,
                        y: a.y + (b.y - a.y) * c
                    }
                };
                return {
                    start: a,
                    startControl: b,
                    endControl: c,
                    end: d,
                    subdivide: function(f) {
                        var g = e(a, b, f)
                          , h = e(b, c, f)
                          , i = e(c, d, f)
                          , j = e(g, h, f)
                          , k = e(h, i, f)
                          , l = e(j, k, f);
                        return [m(a, g, j, l), m(l, k, i, d)]
                    },
                    curveTo: function(a) {
                        a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y])
                    },
                    curveToReversed: function(d) {
                        d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y])
                    }
                }
            }
            function n(a, b, c, d, e, f, g) {
                var h = [];
                return b[0] > 0 || b[1] > 0 ? (h.push(["line", d[1].start.x, d[1].start.y]),
                d[1].curveTo(h)) : h.push(["line", a.c1[0], a.c1[1]]),
                c[0] > 0 || c[1] > 0 ? (h.push(["line", f[0].start.x, f[0].start.y]),
                f[0].curveTo(h),
                h.push(["line", g[0].end.x, g[0].end.y]),
                g[0].curveToReversed(h)) : (h.push(["line", a.c2[0], a.c2[1]]),
                h.push(["line", a.c3[0], a.c3[1]])),
                b[0] > 0 || b[1] > 0 ? (h.push(["line", e[1].end.x, e[1].end.y]),
                e[1].curveToReversed(h)) : h.push(["line", a.c4[0], a.c4[1]]),
                h
            }
            function o(a, b, c, d, e) {
                var f = [];
                return b[0] > 0 || b[1] > 0 ? (f.push(["line", d[1].start.x, d[1].start.y]),
                d[1].curveTo(f)) : f.push(["line", a.c1[0], a.c1[1]]),
                c[0] > 0 || c[1] > 0 ? (f.push(["line", e[0].start.x, e[0].start.y]),
                e[0].curveTo(f)) : f.push(["line", a.c2[0], a.c2[1]]),
                f
            }
            function p(a, b, c, d, e, f, g) {
                b[0] > 0 || b[1] > 0 ? (a.push(["line", d[0].start.x, d[0].start.y]),
                d[0].curveTo(a),
                d[1].curveTo(a)) : a.push(["line", f, g]),
                (c[0] > 0 || c[1] > 0) && a.push(["line", e[0].start.x, e[0].start.y])
            }
            function q(a) {
                return a.cssInt("zIndex") < 0
            }
            function r(a) {
                return a.cssInt("zIndex") > 0
            }
            function s(a) {
                return 0 === a.cssInt("zIndex")
            }
            function t(a) {
                return -1 !== ["inline", "inline-block", "inline-table"].indexOf(a.css("display"))
            }
            function u(a) {
                return a instanceof W
            }
            function v(a) {
                return a.node.data.trim().length > 0
            }
            function w(a) {
                return /^(normal|none|0px)$/.test(a.parent.css("letterSpacing"))
            }
            function x(a) {
                return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(b) {
                    var c = a.css("border" + b + "Radius")
                      , d = c.split(" ");
                    switch (d.length) {
                    case 0:
                        return [0];
                    case 1:
                        var e = parseFloat(d[0]);
                        return "string" == typeof d[0] && "%" === d[0].charAt(d[0].length - 1) ? [e / 100 * a.bounds.width, e / 100 * a.bounds.height] : [e];
                    default:
                        return ["string" == typeof d[0] && "%" === d[0].charAt(d[0].length - 1) ? parseFloat(d[0]) / 100 * a.bounds.width : parseFloat(d[0]), "string" == typeof d[1] && "%" === d[1].charAt(d[1].length - 1) ? parseFloat(d[1]) / 100 * a.bounds.height : parseFloat(d[1])]
                    }
                })
            }
            function y(a) {
                return a.nodeType === Node.TEXT_NODE || a.nodeType === Node.ELEMENT_NODE
            }
            function z(a, b) {
                var c = a.css("position")
                  , d = -1 !== ["absolute", "relative", "fixed"].indexOf(c);
                return b ? d : "auto" !== (d ? a.css("zIndex") : "auto")
            }
            function A(a) {
                return "static" !== a.css("position")
            }
            function B(a) {
                return "none" !== a.css("float")
            }
            function C(a) {
                return -1 !== ["inline-block", "inline-table"].indexOf(a.css("display"))
            }
            function D(a) {
                var b = this;
                return function() {
                    return !a.apply(b, arguments)
                }
            }
            function E(a) {
                return a.node.nodeType === Node.ELEMENT_NODE
            }
            function F(a) {
                return !0 === a.isPseudoElement
            }
            function G(a) {
                return a.node.nodeType === Node.TEXT_NODE
            }
            function H(a) {
                return function(b, c) {
                    return b.cssInt("zIndex") + a.indexOf(b) / a.length - (c.cssInt("zIndex") + a.indexOf(c) / a.length)
                }
            }
            function I(a) {
                return a.getOpacity() < 1
            }
            function J(a) {
                return a.width
            }
            function K(a) {
                return a.node.nodeType !== Node.ELEMENT_NODE || -1 === ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(a.node.nodeName)
            }
            function L(a) {
                return [].concat.apply([], a)
            }
            function M(a) {
                for (var b, c = [], d = 0, e = !1; a.length; )
                    N(a[d]) === e ? (b = a.splice(0, d),
                    b.length && c.push(Q.ucs2.encode(b)),
                    e = !e,
                    d = 0) : d++,
                    d >= a.length && (b = a.splice(0, d),
                    b.length && c.push(Q.ucs2.encode(b)));
                return c
            }
            function N(a) {
                return -1 !== [32, 13, 10, 9, 45].indexOf(a)
            }
            function O(a) {
                return /[^\u0000-\u00ff]/.test(a)
            }
            var P = a("./log")
              , Q = a("punycode")
              , R = a("./nodecontainer")
              , S = a("./textcontainer")
              , T = a("./pseudoelementcontainer")
              , U = a("./fontmetrics")
              , V = a("./color")
              , W = a("./stackingcontext")
              , X = a("./utils")
              , Y = a("liststyletype-formatter")
              , Z = X.bind
              , $ = X.getBounds
              , _ = X.parseBackgrounds
              , aa = X.offsetBounds
              , ba = X.getMatchingRules;
            d.prototype.calculateOverflowClips = function() {
                this.nodes.forEach(function(a) {
                    if (E(a)) {
                        F(a) && a.appendToDOM(),
                        a.borders = this.parseBorders(a);
                        var b = "hidden" === a.css("overflow") || "scroll" === a.css("overflow") ? [a.borders.clip] : []
                          , c = a.parseClip();
                        c && -1 !== ["absolute", "fixed"].indexOf(a.css("position")) && b.push([["rect", a.bounds.left + c.left, a.bounds.top + c.top, c.right - c.left, c.bottom - c.top]]);
                        var d, g, h, i, j, k, l, m, n = a.hasTransform();
                        if (n) {
                            var o = a.inverseTransform()
                              , p = o.matrix;
                            d = p[0],
                            g = p[2],
                            h = p[4],
                            i = p[1],
                            j = p[3],
                            k = p[5],
                            l = o.origin[0],
                            m = o.origin[1];
                            var q = a && a.parent && a.parent.canvasBorder || [0, 0, this.renderer.width, this.renderer.height];
                            a.canvasBorder = [d * (q[0] + l) + g * (q[1] + m) + h - l, i * (q[0] + l) + j * (q[1] + m) + k - m, d * (q[2] + l) + g * (q[3] + m) + h - l, i * (q[2] + l) + j * (q[3] + m) + k - m]
                        } else
                            a.canvasBorder = [0, 0, this.renderer.width, this.renderer.height];
                        var r = f(a);
                        if (r)
                            if (n) {
                                var s = r.length;
                                a.clip = [];
                                for (var t = 0; t < s; t++) {
                                    for (var u = r[t], v = u.length, w = [], x = 0; x < v; x++) {
                                        for (var y = u[x], z = [y[0]], A = y.length, B = 1; B < A; B += 2)
                                            z.push(d * (y[B] + l) + g * (y[B + 1] + m) + h - l, i * (y[B] + l) + j * (y[B + 1] + m) + k - m);
                                        w.push(z)
                                    }
                                    a.clip.push(w)
                                }
                                Array.prototype.push.apply(a.clip, b)
                            } else
                                a.clip = r.concat(b);
                        else
                            a.clip = b;
                        a.backgroundClip = "hidden" !== a.css("overflow") ? a.clip.concat([a.borders.clip]) : a.clip,
                        F(a) && a.cleanDOM()
                    } else
                        G(a) && (a.clip = e(a) ? a.parent.clip : []);
                    F(a) || (a.bounds = null)
                }, this)
            }
            ,
            d.prototype.asyncRenderer = function(a, b, c) {
                c = c || Date.now(),
                this.paint(a[this.renderIndex++]),
                a.length === this.renderIndex ? b() : c + 20 > Date.now() ? this.asyncRenderer(a, b, c) : setTimeout(Z(function() {
                    this.asyncRenderer(a, b)
                }, this), 0)
            }
            ,
            d.prototype.createPseudoHideStyles = function(a) {
                this.createStyles(a, "." + T.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + T.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
            }
            ,
            d.prototype.disableAnimations = function(a) {
                this.createStyles(a, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
            }
            ,
            d.prototype.createStyles = function(a, b) {
                var c = a.createElement("style");
                c.innerHTML = b,
                a.body.appendChild(c)
            }
            ,
            d.prototype.getPseudoElements = function(a) {
                var b = [[a]];
                if (a.node.nodeType === Node.ELEMENT_NODE) {
                    var c = this.getPseudoElement(a, ":before")
                      , d = this.getPseudoElement(a, ":after");
                    c && b.push(c),
                    d && b.push(d)
                }
                return L(b)
            }
            ,
            d.prototype.applyInlineStylesToSvg = function(a) {
                var b = a[0].node;
                return 1 === b.nodeType && "svg" === b.tagName && g(b),
                a
            }
            ,
            d.prototype.resolvePseudoContent = function(a) {
                var b, c = getComputedStyle(a), d = c.counterReset, e = [];
                if (d && "none" !== d) {
                    var f = d.split(/\s*,\s*/)
                      , g = f.length;
                    for (b = 0; b < g; b++) {
                        var h = f[b].split(/\s+/);
                        e.push(h[0]);
                        var i = this.counters[h[0]];
                        i || (i = this.counters[h[0]] = []),
                        i.push(parseInt(h[1] || 0, 10))
                    }
                }
                a._contentBefore = this.resolvePseudoContentInternal(a, getComputedStyle(a, ":before"));
                var j = a.childNodes
                  , k = j.length;
                for (b = 0; b < k; b++) {
                    1 === j[b].nodeType && this.resolvePseudoContent(j[b])
                }
                a._contentAfter = this.resolvePseudoContentInternal(a, getComputedStyle(a, ":after"));
                var l = e.length;
                for (b = 0; b < l; b++)
                    this.counters[e[b]].pop()
            }
            ,
            d.prototype.getQuote = function(a, b) {
                var c = a.quotes ? a.quotes.split(/\s+/) : ["'\"'", "'\"'"]
                  , d = 2 * this.quoteDepth;
                return d >= c.length && (d = c.length - 2),
                b || ++d,
                c[d].replace(/^["']|["']$/g, "")
            }
            ,
            d.prototype.resolvePseudoContentInternal = function(a, b) {
                if (!b || !b.content || "none" === b.content || "-moz-alt-content" === b.content || "none" === b.display)
                    return null;
                var c = d.parsePseudoContent(b.content)
                  , e = c.length
                  , f = []
                  , g = ""
                  , h = b.counterIncrement;
                if (h && "none" !== h) {
                    var i = h.split(/\s+/)
                      , j = this.counters[i[0]];
                    j && (j[j.length - 1] += void 0 === i[1] ? 1 : parseInt(i[1], 10))
                }
                for (var k = 0; k < e; k++) {
                    var l = c[k];
                    switch (l.type) {
                    case "string":
                        g += l.value;
                        break;
                    case "attr":
                        break;
                    case "counter":
                        var m = this.counters[l.name];
                        m && (g += this.formatCounterValue([m[m.length - 1]], "", l.format));
                        break;
                    case "counters":
                        var n = this.counters[l.name];
                        n && (g += this.formatCounterValue(n, l.glue, l.format));
                        break;
                    case "open-quote":
                        g += this.getQuote(b, !0),
                        ++this.quoteDepth;
                        break;
                    case "close-quote":
                        --this.quoteDepth,
                        g += this.getQuote(b, !1);
                        break;
                    case "url":
                        g && (f.push({
                            type: "string",
                            value: g
                        }),
                        g = ""),
                        f.push({
                            type: "image",
                            url: l.href
                        })
                    }
                }
                return g && f.push({
                    type: "string",
                    value: g
                }),
                f
            }
            ,
            d.prototype.formatCounterValue = function(a, b, c) {
                for (var d = "", e = a.length, f = 0; f < e; f++)
                    f > 0 && (d += b),
                    d += Y.format(a[f], c, !1);
                return d
            }
            ;
            var ca = {};
            d.parsePseudoContent = function(a) {
                if (ca[a])
                    return ca[a];
                for (var b = [], c = a.length, d = !1, e = !1, f = !1, g = "", h = "", i = [], j = 0; j < c; j++) {
                    var k = a.charAt(j);
                    switch (k) {
                    case "'":
                    case '"':
                        e ? g += k : (d = !d,
                        f || d || (b.push({
                            type: "string",
                            value: g
                        }),
                        g = ""));
                        break;
                    case "\\":
                        e ? (g += k,
                        e = !1) : e = !0;
                        break;
                    case "(":
                        d ? g += k : (f = !0,
                        h = g,
                        g = "",
                        i = []);
                        break;
                    case ")":
                        if (d)
                            g += k;
                        else if (f) {
                            switch (g && i.push(g),
                            h) {
                            case "attr":
                                i.length > 0 && b.push({
                                    type: "attr",
                                    attr: i[0]
                                });
                                break;
                            case "counter":
                                if (i.length > 0) {
                                    var l = {
                                        type: "counter",
                                        name: i[0]
                                    };
                                    i.length > 1 && (l.format = i[1]),
                                    b.push(l)
                                }
                                break;
                            case "counters":
                                if (i.length > 0) {
                                    var m = {
                                        type: "counters",
                                        name: i[0]
                                    };
                                    i.length > 1 && (m.glue = i[1]),
                                    i.length > 2 && (m.format = i[2]),
                                    b.push(m)
                                }
                                break;
                            case "url":
                                i.length > 0 && b.push({
                                    type: "url",
                                    href: i[0]
                                })
                            }
                            f = !1,
                            g = ""
                        }
                        break;
                    case ",":
                        d ? g += k : f && (i.push(g),
                        g = "");
                        break;
                    case " ":
                    case "\t":
                        d ? g += k : g && (b.push({
                            type: g
                        }),
                        g = "");
                        break;
                    default:
                        g += k
                    }
                    "\\" !== k && (e = !1)
                }
                return g && b.push({
                    type: g
                }),
                ca[a] = b,
                b
            }
            ,
            d.prototype.getPseudoElement = function(a, b) {
                var c = a.computedStyle(b);
                if (!c || !c.content || "none" === c.content || "-moz-alt-content" === c.content || "none" === c.display || "hidden" === c.visibility)
                    return null;
                for (var d = ":before" === b ? a.node._contentBefore : a.node._contentAfter, e = d.length, f = document.createElement("html2canvaspseudoelement"), g = new T(f,a,b), i = c.length - 1; i >= 0; i--) {
                    var j = h(c.item(i));
                    "content" !== j && (f.style[j] = c[j])
                }
                f.className = T.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + T.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
                for (var k = [g], l = 0; l < e; l++) {
                    var m = d[l];
                    if ("image" === m.type) {
                        var n = document.createElement("img");
                        n.src = _("url(" + m.url + ")")[0].args[0],
                        n.style.opacity = "1",
                        f.appendChild(n),
                        k.push(new R(n,g))
                    } else {
                        var o = document.createTextNode(m.value);
                        f.appendChild(o),
                        k.push(new S(o,g))
                    }
                }
                return k
            }
            ,
            d.prototype.getChildren = function(a) {
                return L([].filter.call(a.node.childNodes, y).map(function(b) {
                    var c = [b.nodeType === Node.TEXT_NODE ? new S(b,a) : new R(b,a)].filter(K);
                    return b.nodeType === Node.ELEMENT_NODE && c.length && "TEXTAREA" !== b.tagName ? c[0].isElementVisible() ? c.concat(this.getChildren(c[0])) : [] : c
                }, this))
            }
            ,
            d.prototype.newStackingContext = function(a, b) {
                var c = new W(b,a.getOpacity(),a.node,a.parent)
                  , d = c.opacity;
                a.cloneTo(c),
                c.opacity = d,
                (b ? c.getParentStack(this) : c.parent.stack).contexts.push(c),
                a.stack = c
            }
            ,
            d.prototype.createStackingContexts = function() {
                this.nodes.forEach(function(a) {
                    E(a) && (this.isRootElement(a) || I(a) || z(a, a.parent && a.parent.hasChildWithOwnStacking) || this.isBodyWithTransparentRoot(a) || a.hasTransform()) ? (this.newStackingContext(a, !0),
                    a.parent && (a.parent.hasChildWithOwnStacking = !0)) : E(a) && (A(a) && s(a) || C(a) || B(a)) ? this.newStackingContext(a, !1) : a.assignStack(a.parent.stack)
                }, this)
            }
            ,
            d.prototype.isBodyWithTransparentRoot = function(a) {
                return "BODY" === a.node.nodeName && a.parent.color("backgroundColor").isTransparent()
            }
            ,
            d.prototype.isRootElement = function(a) {
                return null === a.parent
            }
            ,
            d.prototype.sortStackingContexts = function(a) {
                a.contexts.sort(H(a.contexts.slice(0))),
                a.contexts.forEach(this.sortStackingContexts, this)
            }
            ,
            d.prototype.parseTextBounds = function(a) {
                return function(b, c, d) {
                    if ("none" !== a.parent.css("textDecoration").substr(0, 4) || 0 !== b.trim().length) {
                        if (this.support.rangeBounds && !a.parent.hasTransform()) {
                            var e = d.slice(0, c).join("").length;
                            return this.getRangeBounds(a.node, e, b.length)
                        }
                        if (a.node && "string" == typeof a.node.data) {
                            var f = a.node.splitText(b.length)
                              , g = this.getWrapperBounds(a.node, a.parent.hasTransform());
                            return a.node = f,
                            g
                        }
                    } else
                        this.support.rangeBounds && !a.parent.hasTransform() || (a.node = a.node.splitText(b.length));
                    return {}
                }
            }
            ,
            d.prototype.getWrapperBounds = function(a, b) {
                var c = a.ownerDocument.createElement("html2canvaswrapper")
                  , d = a.parentNode
                  , e = a.cloneNode(!0);
                c.appendChild(a.cloneNode(!0)),
                d.replaceChild(c, a);
                var f = b ? aa(c) : $(c);
                return d.replaceChild(e, c),
                f
            }
            ,
            d.prototype.getRangeBounds = function(a, b, c) {
                var d = this.range || (this.range = a.ownerDocument.createRange());
                return d.setStart(a, b),
                d.setEnd(a, b + c),
                d.getBoundingClientRect()
            }
            ,
            d.prototype.parse = function(a) {
                var b = a.contexts.filter(q)
                  , c = a.children.filter(E)
                  , d = c.filter(D(B))
                  , e = d.filter(D(A)).filter(D(t))
                  , f = c.filter(D(A)).filter(B)
                  , g = d.filter(D(A)).filter(t)
                  , h = a.contexts.concat(d.filter(A)).filter(s)
                  , j = a.children.filter(G).filter(v)
                  , k = a.contexts.filter(r);
                b.concat(e).concat(f).concat(g).concat(h).concat(j).concat(k).forEach(function(a) {
                    this.renderQueue.push(a),
                    u(a) && (this.parse(a),
                    this.renderQueue.push(new i))
                }, this)
            }
            ,
            d.prototype.paint = function(a) {
                if (!this.options.canceled)
                    try {
                        var b = a.parent && F(a.parent);
                        b && a.parent.appendToDOM(),
                        a instanceof i ? this.renderer.ctx.restore() : G(a) ? this.paintText(a) : this.paintNode(a),
                        b && a.parent.cleanDOM()
                    } catch (a) {
                        if (P(a),
                        this.options.strict)
                            throw a
                    }
            }
            ,
            d.prototype.paintNode = function(a) {
                u(a) && (this.renderer.setOpacity(a.opacity),
                this.renderer.ctx.save(),
                a.hasTransform() && this.renderer.setTransform(a.parseTransform()));
                var b = a.css("mixBlendMode");
                b && this.renderer.setMixBlendMode(b);
                var c = a.css("filter");
                c && this.renderer.setFilter(c),
                "INPUT" === a.node.nodeName && "checkbox" === a.node.type ? this.paintCheckbox(a) : "INPUT" === a.node.nodeName && "radio" === a.node.type ? this.paintRadio(a) : this.paintElement(a)
            }
            ,
            d.prototype.paintElement = function(a) {
                var b = a.parseBounds();
                this.renderer.clip(a.backgroundClip, function() {
                    this.renderer.renderBackground(a, b, a.borders.borders.map(J))
                }, this, a),
                this.renderer.mask(a.backgroundClip, function() {
                    this.renderer.renderShadows(a, a.borders.clip, null, !1)
                }, this, a);
                var c = a.backgroundClip;
                if ("LI" === a.node.nodeName) {
                    var d = this.getParentOfType(a, ["OL", "UL"]);
                    c = "visible" !== d.css("overflow") ? d.backgroundClip : null
                } else
                    "IMG" === a.node.nodeName && F(a.parent) && (c = null);
                this.renderer.clip(c, function() {
                    switch (a.node.nodeName) {
                    case "svg":
                    case "IFRAME":
                        var c = this.images.get(a.node);
                        c ? this.renderer.renderImage(a, b, a.borders, c) : P("Error loading <" + a.node.nodeName + ">", a.node);
                        break;
                    case "IMG":
                        var d = this.images.get(a.node.currentSrc || a.node.src);
                        d ? this.renderer.renderImage(a, b, a.borders, d) : P("Error loading <img>", a.node.currentSrc || a.node.src);
                        break;
                    case "VIDEO":
                        var e = this.images.getVideo(a.node.videoIndex);
                        e ? this.renderer.renderImage(a, b, a.borders, e) : P("Error loading <video>", a.node.src);
                        break;
                    case "CANVAS":
                        this.renderer.renderImage(a, b, a.borders, {
                            image: a.node
                        });
                        break;
                    case "LI":
                        this.paintListItem(a);
                        break;
                    case "SELECT":
                    case "INPUT":
                    case "TEXTAREA":
                        this.paintFormValue(a)
                    }
                    this.renderer.renderShadows(a, a.backgroundClip, a.borders, !0)
                }, this, a),
                this.renderer.clip(a.clip, function() {
                    this.renderer.renderBorders(a.borders.borders)
                }, this, a)
            }
            ,
            d.prototype.paintCheckbox = function(a) {
                var b = a.parseBounds()
                  , c = Math.min(b.width, b.height)
                  , d = {
                    width: c - 1,
                    height: c - 1,
                    top: b.top,
                    left: b.left
                }
                  , e = [3, 3]
                  , f = [e, e, e, e]
                  , g = [1, 1, 1, 1].map(function(a) {
                    return {
                        color: new V("#A5A5A5"),
                        width: a
                    }
                })
                  , h = l(d, f, g);
                this.renderer.clip(a.backgroundClip, function() {
                    this.renderer.rectangle(d.left + 1, d.top + 1, d.width - 2, d.height - 2, new V("#DEDEDE")),
                    this.renderer.renderBorders(j(g, d, h, f)),
                    a.node.checked && (this.renderer.font(new V("#424242"), "normal", "normal", "bold", c - 3 + "px", "arial"),
                    this.renderer.text("✔", d.left + c / 6, d.top + c - 1))
                }, this, a)
            }
            ,
            d.prototype.paintRadio = function(a) {
                var b = a.parseBounds()
                  , c = Math.min(b.width, b.height) - 2;
                this.renderer.clip(a.backgroundClip, function() {
                    this.renderer.circleStroke(b.left + 1, b.top + 1, c, new V("#DEDEDE"), 1, new V("#A5A5A5")),
                    a.node.checked && this.renderer.circle(Math.ceil(b.left + c / 4) + 1, Math.ceil(b.top + c / 4) + 1, Math.floor(c / 2), new V("#424242"))
                }, this, a)
            }
            ;
            var da = function(a, b, c) {
                if (!c)
                    return a.css(b);
                for (var d = c.length - 1; d >= 0; d--) {
                    var e = c[d].style[b];
                    if (e)
                        return e
                }
                return a.css(b)
            };
            d.prototype.paintIntrinsicTextNode = function(a, b, c, d) {
                var e = !!c && a.isPlaceholderShown();
                if (b.length > 0) {
                    for (var f = a.node.ownerDocument, g = f.createElement("html2canvaswrapper"), h = ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"], i = h.length, j = e ? ba(a.node, /::placeholder|::-webkit-input-placeholder|::?-moz-placeholder|:-ms-input-placeholder/) : null, k = 0; k < i; k++) {
                        var l = h[k];
                        try {
                            g.style[l] = da(a, l, j)
                        } catch (a) {
                            P("html2canvas: Parse: Exception caught in renderFormValue: " + a.message)
                        }
                    }
                    var m = a.parseBounds();
                    if (g.style.position = "fixed",
                    g.style.top = m.top + "px",
                    d) {
                        g.style.left = "auto";
                        var n = window.innerWidth || f.documentElement.clientWidth;
                        g.style.right = n - m.left + 4 + "px",
                        g.style.textAlign = "right"
                    } else
                        g.style.left = m.left + "px";
                    g.textContent = b,
                    "normal" === g.style.lineHeight && (g.style.lineHeight = a.computedStyles.height),
                    f.body.appendChild(g),
                    this.paintText(new S(g.firstChild,new R(g,a))),
                    f.body.removeChild(g)
                }
            }
            ,
            d.prototype.paintFormValue = function(a) {
                a.getValue();
                this.paintIntrinsicTextNode(a, a.getValue(), !0, !1)
            }
            ,
            d.prototype.getParentOfType = function(a, b) {
                for (var c = a.parent; b.indexOf(c.node.tagName) < 0; )
                    if (!(c = c.parent))
                        return null;
                return c
            }
            ,
            d.prototype.getParentNodeOfType = function(a, b) {
                for (var c = a.parentNode; b.indexOf(c.tagName) < 0; )
                    if (!(c = c.parentNode))
                        return null;
                return c
            }
            ,
            d.prototype.paintListItem = function(a) {
                var b = "outside" === a.css("listStylePosition");
                if (a.listStyleImage && "none" !== a.listStyleImage.method)
                    this.renderer.renderListStyleImage(a, a.parseBounds(), b);
                else {
                    var c = ["OL", "UL"]
                      , d = this.getParentOfType(a, c);
                    if (d) {
                        var e = 1
                          , f = d && d.node.getAttribute("start");
                        null !== f && (e = parseInt(f, 10));
                        for (var g = d.node.querySelectorAll("li"), h = g.length, i = 0; i < h; i++) {
                            var j = g[i];
                            if (a.node === j)
                                break;
                            this.getParentNodeOfType(j, c) === d.node && ++e
                        }
                        this.paintIntrinsicTextNode(a, Y.format(e, a.css("listStyleType")), !1, b)
                    }
                }
            }
            ,
            d.prototype.paintText = function(a) {
                a.applyTextTransform();
                var b = Q.ucs2.decode(a.node.data)
                  , c = (!this.options.letterRendering || w(a)) && !O(a.node.data)
                  , d = c ? M(b) : b.map(function(a) {
                    return Q.ucs2.encode([a])
                });
                c || (a.parent.node.style.fontVariantLigatures = "none");
                var e = a.parent.fontWeight()
                  , f = a.parent.css("fontSize")
                  , g = a.parent.css("fontFamily")
                  , h = a.parent.parseTextShadows();
                this.renderer.font(a.parent.color("color"), a.parent.css("fontStyle"), a.parent.css("fontVariant"), e, f, g),
                h.length ? this.renderer.fontShadow(h[0].color, h[0].offsetX, h[0].offsetY, h[0].blur) : this.renderer.clearShadow(),
                this.renderer.clip(a.parent.clip, function() {
                    d.map(this.parseTextBounds(a), this).forEach(function(b, c) {
                        b && (this.renderer.text(d[c], b.left, b.bottom),
                        this.renderTextDecoration(a.parent, b, this.fontMetrics.getMetrics(g, f)))
                    }, this)
                }, this, a.parent)
            }
            ,
            d.prototype.renderTextDecoration = function(a, b, c) {
                switch (a.css("textDecoration").split(" ")[0]) {
                case "underline":
                    this.renderer.rectangle(b.left, Math.round(b.top + c.baseline + c.lineWidth), b.width, 1, a.color("color"));
                    break;
                case "overline":
                    this.renderer.rectangle(b.left, Math.round(b.top), b.width, 1, a.color("color"));
                    break;
                case "line-through":
                    this.renderer.rectangle(b.left, Math.ceil(b.top + c.middle + c.lineWidth), b.width, 1, a.color("color"))
                }
            }
            ;
            var ea = {
                inset: [["darken", .6], ["darken", .1], ["darken", .1], ["darken", .6]]
            };
            d.prototype.parseBorders = function(a) {
                var b = a.parseBounds()
                  , c = x(a)
                  , d = ["Top", "Right", "Bottom", "Left"].map(function(b, c) {
                    var d = a.css("border" + b + "Style")
                      , e = a.color("border" + b + "Color");
                    "inset" === d && e.isBlack() && (e = new V([255, 255, 255, e.a]));
                    var f = ea[d] ? ea[d][c] : null;
                    return {
                        width: a.cssInt("border" + b + "Width"),
                        color: f ? e[f[0]](f[1]) : e,
                        style: d,
                        pathArgs: null,
                        args: null
                    }
                })
                  , e = l(b, c, d);
                return {
                    clip: this.parseBackgroundClip(a, e, d, c, b),
                    borders: j(d, b, e, c)
                }
            }
            ,
            d.prototype.parseBackgroundClip = function(a, b, c, d, e) {
                var f = a.css("backgroundClip")
                  , g = [];
                switch (f) {
                case "content-box":
                case "padding-box":
                    p(g, d[0], d[1], b.topLeftInner, b.topRightInner, e.left + c[3].width, e.top + c[0].width),
                    p(g, d[1], d[2], b.topRightInner, b.bottomRightInner, e.left + e.width - c[1].width, e.top + c[0].width),
                    p(g, d[2], d[3], b.bottomRightInner, b.bottomLeftInner, e.left + e.width - c[1].width, e.top + e.height - c[2].width),
                    p(g, d[3], d[0], b.bottomLeftInner, b.topLeftInner, e.left + c[3].width, e.top + e.height - c[2].width);
                    break;
                default:
                    p(g, d[0], d[1], b.topLeftOuter, b.topRightOuter, e.left, e.top),
                    p(g, d[1], d[2], b.topRightOuter, b.bottomRightOuter, e.left + e.width, e.top),
                    p(g, d[2], d[3], b.bottomRightOuter, b.bottomLeftOuter, e.left + e.width, e.top + e.height),
                    p(g, d[3], d[0], b.bottomLeftOuter, b.topLeftOuter, e.left, e.top + e.height)
                }
                return g
            }
            ,
            b.exports = d
        }
        , {
            "./color": 11,
            "./fontmetrics": 15,
            "./log": 21,
            "./nodecontainer": 22,
            "./pseudoelementcontainer": 25,
            "./stackingcontext": 31,
            "./textcontainer": 35,
            "./utils": 36,
            "liststyletype-formatter": 6,
            punycode: 7
        }],
        24: [function(a, b, c) {
            function d(a, b, c) {
                var d = "withCredentials"in new XMLHttpRequest;
                if (!b)
                    return Promise.reject("No proxy configured");
                var e = g(d)
                  , i = h(b, a, e);
                return d ? k(i) : f(c, i, e).then(function(a) {
                    return o(a.content)
                })
            }
            function e(a, b, c) {
                var d = "crossOrigin"in new Image
                  , e = g(d)
                  , i = h(b, a, e);
                return d ? Promise.resolve(i) : f(c, i, e).then(function(a) {
                    return "data:" + a.type + ";base64," + a.content
                })
            }
            function f(a, b, c) {
                return new Promise(function(d, e) {
                    var f = a.createElement("script")
                      , g = function() {
                        delete window.html2canvas.proxy[c],
                        a.body.removeChild(f)
                    };
                    window.html2canvas.proxy[c] = function(a) {
                        g(),
                        d(a)
                    }
                    ,
                    f.src = b,
                    f.onerror = function(a) {
                        g(),
                        e(a)
                    }
                    ,
                    a.body.appendChild(f)
                }
                )
            }
            function g(a) {
                return a ? "" : "html2canvas_" + Date.now() + "_" + ++p + "_" + Math.round(1e5 * Math.random())
            }
            function h(a, b, c) {
                return a + "?url=" + encodeURIComponent(b) + (c.length ? "&callback=html2canvas.proxy." + c : "")
            }
            function i(a) {
                return function(b) {
                    var c, d = new DOMParser;
                    try {
                        c = d.parseFromString(b, "text/html")
                    } catch (a) {
                        m("DOMParser not supported, falling back to createHTMLDocument"),
                        c = document.implementation.createHTMLDocument("");
                        try {
                            c.open(),
                            c.write(b),
                            c.close()
                        } catch (a) {
                            m("createHTMLDocument write not supported, falling back to document.body.innerHTML"),
                            c.body.innerHTML = b
                        }
                    }
                    var e = c.querySelector("base");
                    if (!e || !e.href.host) {
                        var f = c.createElement("base");
                        f.href = a,
                        c.head.insertBefore(f, c.head.firstChild)
                    }
                    return c
                }
            }
            function j(a, b, c, e, f, g) {
                return new d(a,b,window.document).then(i(a)).then(function(a) {
                    return n(a, c, e, f, g, 0, 0)
                })
            }
            var k = a("./xhr")
              , l = a("./utils")
              , m = a("./log")
              , n = a("./clone")
              , o = l.decode64
              , p = 0;
            c.Proxy = d,
            c.ProxyURL = e,
            c.loadUrlDocument = j
        }
        , {
            "./clone": 10,
            "./log": 21,
            "./utils": 36,
            "./xhr": 39
        }],
        25: [function(a, b, c) {
            function d(a, b, c) {
                e.call(this, a, b),
                this.isPseudoElement = !0,
                this.before = ":before" === c
            }
            var e = a("./nodecontainer");
            d.prototype.cloneTo = function(a) {
                d.prototype.cloneTo.call(this, a),
                a.isPseudoElement = !0,
                a.before = this.before
            }
            ,
            d.prototype = Object.create(e.prototype),
            d.prototype.appendToDOM = function() {
                this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node),
                this.parent.node.className += " " + this.getHideClass()
            }
            ,
            d.prototype.cleanDOM = function() {
                this.node.parentNode.removeChild(this.node),
                this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
            }
            ,
            d.prototype.getHideClass = function() {
                return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
            }
            ,
            d.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before",
            d.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after",
            b.exports = d
        }
        , {
            "./nodecontainer": 22
        }],
        26: [function(a, b, c) {
            function d(a, b) {
                e.apply(this, arguments),
                this.type = e.TYPES.RADIAL;
                var c, f, g = b && b.node, h = function(a) {
                    if (!a)
                        return 16;
                    var b = getComputedStyle(a);
                    if (!b)
                        return 16;
                    var c = b.fontSize.match(/([\d.]+)(px|r?em|%)/i);
                    if (!c)
                        return 16;
                    var d = parseFloat(c[1]);
                    switch (c[2]) {
                    case "px":
                        return d;
                    case "em":
                        return d * h(a.parentElement);
                    case "rem":
                        return d * h((a.ownerDocument || document).body);
                    case "%":
                        return .01 * d * h(a.parentElement)
                    }
                    return 16
                }, i = function(a, b) {
                    var d = parseFloat(a);
                    switch (b) {
                    case "px":
                        return d;
                    case "em":
                        return f || (f = h(g)),
                        d * f;
                    case "rem":
                        return c || (c = h((g && g.ownerDocument || document).body)),
                        d * c;
                    case "%":
                        return .01 * d
                    }
                }, j = a.args[0].match(d.REGEXP_SHAPEDEF);
                j ? (this.isCircle = "circle" === j[1] || void 0 !== j[3] && void 0 === j[5],
                this.radius = {
                    descriptor: j[2] || "farthest-corner"
                },
                void 0 !== j[3] && (this.radius.x = {
                    value: i(j[3], j[4]),
                    isRelative: "%" === j[4]
                }),
                void 0 !== j[5] && (this.radius.y = {
                    value: i(j[5], j[6]),
                    isRelative: "%" === j[6]
                }),
                this.position = {},
                void 0 !== j[7] && (this.position.x = {
                    value: i(j[7], j[8]),
                    isRelative: "%" === j[8]
                }),
                void 0 !== j[9] && (this.position.y = {
                    value: i(j[9], j[10]),
                    isRelative: "%" === j[10]
                }),
                this.parseColorStops(a.args.splice(1))) : (this.isCircle = !1,
                this.radius = {
                    descriptor: "farthest-corner"
                },
                this.position = {},
                this.parseColorStops(a.args)),
                void 0 === this.position.x && (this.position.x = {
                    value: .5,
                    isRelative: !0
                }),
                void 0 === this.position.y && (this.position.y = {
                    value: .5,
                    isRelative: !0
                })
            }
            var e = a("./gradientcontainer");
            a("./color");
            d.prototype = Object.create(e.prototype),
            d.REGEXP_SHAPEDEF = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*([\d.]+)(px|r?em|%)\s+([\d.]+)(px|r?em|%))?(?:\s|$)/i,
            b.exports = d
        }
        , {
            "./color": 11,
            "./gradientcontainer": 17
        }],
        27: [function(a, b, c) {
            function d(a, b, c, d, e) {
                this.width = a,
                this.height = b,
                this.images = c,
                this.options = d,
                this.document = e
            }
            function e(a, b) {
                return Math.sqrt(a * a + b * b)
            }
            function f(a, b, c, d) {
                for (var f = [[a.left, a.top], [a.left, a.bottom], [a.right, a.top], [a.right, a.bottom]], g = d ? 1 / 0 : -1 / 0, h = -1, i = 0; i < f.length; i++) {
                    var j = e(b - f[i][0], c - f[i][1]);
                    (d ? j < g : j > g) && (g = j,
                    h = i)
                }
                return f[h]
            }
            var g = a("./log")
              , h = a("./lineargradientcontainer")
              , i = a("./radialgradientcontainer");
            a("./repeatinglineargradientcontainer"),
            a("./repeatingradialgradientcontainer");
            d.prototype.renderImage = function(a, b, c, d) {
                var e = a.cssInt("paddingLeft")
                  , f = a.cssInt("paddingTop")
                  , g = a.cssInt("paddingRight")
                  , h = a.cssInt("paddingBottom")
                  , i = c.borders
                  , j = b.width - (i[1].width + i[3].width + e + g)
                  , k = b.height - (i[0].width + i[2].width + f + h);
                this.drawImage(d, 0, 0, d.image.videoWidth || d.image.width || j, d.image.videoHeight || d.image.height || k, b.left + e + i[3].width, b.top + f + i[0].width, j, k)
            }
            ,
            d.prototype.renderBackground = function(a, b, c) {
                b.height > 0 && b.width > 0 && (this.renderBackgroundColor(a, b),
                this.renderBackgroundImage(a, b, c))
            }
            ,
            d.prototype.renderBackgroundColor = function(a, b) {
                var c = a.color("backgroundColor");
                c.isTransparent() || this.rectangle(b.left, b.top, b.width, b.height, c)
            }
            ,
            d.prototype.renderShadows = function(a, b, c, d) {
                var e = a.css("boxShadow");
                if (e && "none" !== e && /(?:^|\s+)inset(?:$|\s+)/i.test(e) === d) {
                    var f = e.split(/,(?![^(]*\))/);
                    this.shadow(b, f, a, d, c && c.borders)
                }
            }
            ,
            d.prototype.renderBorders = function(a) {
                a.forEach(this.renderBorder, this)
            }
            ,
            d.prototype.renderBorder = function(a) {
                if (!a.color.isTransparent() && null !== a.args)
                    if ("dashed" === a.style || "dotted" === a.style) {
                        var b = "dashed" === a.style ? 3 : a.width;
                        this.ctx.setLineDash([b]),
                        this.path(a.pathArgs),
                        this.ctx.strokeStyle = a.color,
                        this.ctx.lineWidth = a.width,
                        this.ctx.stroke()
                    } else
                        this.drawShape(a.args, a.color)
            }
            ,
            d.prototype.renderBackgroundImage = function(a, b, c) {
                a.parseBackgroundImages().reverse().forEach(function(d, e, f) {
                    switch (d.method) {
                    case "url":
                        var h = this.images.get(d.args[0]);
                        h ? this.renderBackgroundRepeating(a, b, h, f.length - (e + 1), c) : g("Error loading background-image", d.args[0]);
                        break;
                    case "linear-gradient":
                    case "radial-gradient":
                    case "repeating-linear-gradient":
                    case "repeating-radial-gradient":
                    case "gradient":
                        var i = this.images.get(d.value);
                        if (i) {
                            var j, k, l = a.parseBackgroundOrigin(b, e, !0), m = a.parseBackgroundSize(l, l, e), n = a.css("backgroundSize");
                            if (/^auto/i.test(n) && /auto$/i.test(n) && "content-box" !== a.css("backgroundOrigin") || "no-repeat" === a.css("backgroundRepeat")) {
                                var o = a.parseBackgroundPosition(l, l, e, m)
                                  , p = l.left + o.left
                                  , q = l.top + o.top;
                                j = {
                                    left: p,
                                    top: q,
                                    right: p + m.width,
                                    bottom: q + m.height,
                                    width: m.width,
                                    height: m.height
                                },
                                k = this.createGradient(a, i, j),
                                k ? this.renderGradient(k, j) : g("Error creating gradient", d.args[0])
                            } else if (j = {
                                left: 0,
                                top: 0,
                                right: m.width,
                                bottom: m.height,
                                width: m.width,
                                height: m.height
                            },
                            k = this.createGradient(i, j)) {
                                var r = {};
                                for (var s in this.options)
                                    r[s] = this.options[s];
                                r.canvas = void 0;
                                var t = new this.options.renderer(m.width,m.height,null,r,this.document);
                                t.renderGradient(k, j),
                                this.renderBackgroundRepeating(a, b, t.getImageContainer(), e, c)
                            } else
                                g("Error creating gradient", d.args[0])
                        } else
                            g("Error loading background-image", d.args[0]);
                        break;
                    case "none":
                        break;
                    default:
                        g("Unknown background-image type", d.args[0])
                    }
                }, this)
            }
            ,
            d.prototype.renderListStyleImage = function(a, b, c) {
                if (a.listStyleImage)
                    switch (a.listStyleImage.method) {
                    case "url":
                        var d = this.images.get(a.listStyleImage.args[0]);
                        if (d) {
                            var e = d.image && (d.image.naturalWidth || d.image.width)
                              , f = d.image && (d.image.naturalHeight || d.image.height);
                            this.renderImage(a, {
                                left: c ? b.left - e - 7 : b.left,
                                top: b.top,
                                right: c ? b.left - 7 : b.left + e,
                                bottom: b.bottom,
                                width: e,
                                height: f
                            }, a.borders, d)
                        } else
                            g("Error loading background-image", a.listStyleImage.args[0]);
                        break;
                    case "linear-gradient":
                    case "radial-gradient":
                    case "repeating-linear-gradient":
                    case "repeating-radial-gradient":
                    case "gradient":
                        var h = this.images.get(a.listStyleImage.value);
                        if (h) {
                            var i = .5 * parseInt(a.css("fontSize"), 10)
                              , j = {
                                left: c ? b.left - i - 7 : b.left,
                                top: b.bottom - 1.5 * i,
                                right: c ? b.left - 7 : b.left + i,
                                bottom: b.bottom - .5 * i,
                                width: i,
                                height: i
                            }
                              , k = this.createGradient(a, h, j);
                            k ? this.renderGradient(k, j) : g("Error creating gradient", a.listStyleImage.args[0])
                        } else
                            g("Error loading background-image", a.listStyleImage.args[0]);
                        break;
                    case "none":
                        break;
                    default:
                        g("Unknown background-image type", a.listStyleImage.args[0])
                    }
            }
            ,
            d.prototype.renderBackgroundRepeating = function(a, b, c, d, e) {
                var f = a.parseBackgroundOrigin(b, d)
                  , g = a.parseBackgroundSize(f, c.image, d)
                  , h = a.parseBackgroundPosition(f, c.image, d, g);
                switch (a.parseBackgroundRepeat(d)) {
                case "repeat-x":
                case "repeat no-repeat":
                    this.backgroundRepeatShape(c, h, g, f, f.left + e[3], f.top + h.top + e[0], 99999, g.height, e);
                    break;
                case "repeat-y":
                case "no-repeat repeat":
                    this.backgroundRepeatShape(c, h, g, f, f.left + h.left + e[3], f.top + e[0], g.width, 99999, e);
                    break;
                case "no-repeat":
                    this.backgroundRepeatShape(c, h, g, f, f.left + h.left + e[3], f.top + h.top + e[0], g.width, g.height, e);
                    break;
                default:
                    this.renderBackgroundRepeat(c, h, g, {
                        top: f.top,
                        left: f.left
                    }, e[3], e[0])
                }
            }
            ,
            d.prototype.createGradient = function(a, b, c) {
                if (b instanceof h)
                    return this.createLinearGradient(b, c);
                if (b instanceof i)
                    return this.createRadialGradient(a, b, c)
            }
            ,
            d.prototype.createLinearGradient = function(a, b) {
                var c = a.angle % (2 * Math.PI);
                c < 0 && (c += 2 * Math.PI);
                var d, e, f, g, h, i = Math.sqrt(b.width * b.width + b.height * b.height), j = Math.atan2(b.height, b.width);
                return c < .5 * Math.PI ? (d = i * Math.sin(c + j),
                e = b.left,
                f = b.bottom,
                g = b.left + d * Math.sin(c),
                h = b.bottom - d * Math.cos(c)) : c < Math.PI ? (d = i * Math.sin(c - j),
                e = b.left,
                f = b.top,
                g = b.left + d * Math.sin(c),
                h = b.top - d * Math.cos(c)) : c < 1.5 * Math.PI ? (d = i * Math.sin(c + j),
                e = b.right,
                f = b.top,
                g = b.right - d * Math.sin(c),
                h = b.top + d * Math.cos(c)) : (d = i * Math.sin(c - j),
                e = b.right,
                f = b.bottom,
                g = b.right - d * Math.sin(c),
                h = b.bottom + d * Math.cos(c)),
                {
                    type: a.type,
                    x0: e,
                    y0: f,
                    x1: g,
                    y1: h,
                    colorStops: a.colorStops
                }
            }
            ,
            d.prototype.createRadialGradient = function(a, b, c) {
                var d, g, h, i, j = null, k = b.position.x.value;
                b.position.x.isRelative && (k *= c.width);
                var l = b.position.y.value;
                switch (b.position.y.isRelative && (l *= c.height),
                k += c.left,
                l += c.top,
                b.radius.descriptor) {
                case "closest-side":
                    b.isCircle ? d = g = Math.min(Math.abs(k - c.left), Math.abs(k - c.right), Math.abs(l - c.top), Math.abs(l - c.bottom)) : (d = Math.min(Math.abs(k - c.left), Math.abs(k - c.right)),
                    g = Math.min(Math.abs(l - c.top), Math.abs(l - c.bottom)));
                    break;
                case "closest-corner":
                    b.isCircle ? d = g = Math.min(e(k - c.left, l - c.top), e(k - c.left, l - c.bottom), e(k - c.right, l - c.top), e(k - c.right, l - c.bottom)) : (h = Math.min(Math.abs(l - c.top), Math.abs(l - c.bottom)) / Math.min(Math.abs(k - c.left), Math.abs(k - c.right)),
                    i = f(c, k, l, !0),
                    d = Math.sqrt((i[0] - k) * (i[0] - k) + (i[1] - l) * (i[1] - l) / (h * h)),
                    g = h * d);
                    break;
                case "farthest-side":
                    b.isCircle ? d = g = Math.max(Math.abs(k - c.left), Math.abs(k - c.right), Math.abs(l - c.top), Math.abs(l - c.bottom)) : (d = Math.max(Math.abs(k - c.left), Math.abs(k - c.right)),
                    g = Math.max(Math.abs(l - c.top), Math.abs(l - c.bottom)));
                    break;
                case "farthest-corner":
                    b.isCircle ? d = g = Math.max(e(k - c.left, l - c.top), e(k - c.left, l - c.bottom), e(k - c.right, l - c.top), e(k - c.right, l - c.bottom)) : (h = Math.max(Math.abs(l - c.top), Math.abs(l - c.bottom)) / Math.max(Math.abs(k - c.left), Math.abs(k - c.right)),
                    i = f(c, k, l, !1),
                    d = Math.sqrt((i[0] - k) * (i[0] - k) + (i[1] - l) * (i[1] - l) / (h * h)),
                    g = h * d);
                    break;
                default:
                    d = b.radius.x && b.radius.x.value || 0,
                    g = b.radius.y && b.radius.y.value || d,
                    b.radius.isRelative && (d *= c.width,
                    g *= c.height)
                }
                if (d !== g) {
                    var m = c.left + .5 * c.width
                      , n = c.top + .5 * c.height
                      , o = g / d;
                    j = {
                        matrix: [1, 0, 0, o, 0, 0],
                        origin: [m, n]
                    };
                    var p = 1 / o;
                    c.top = p * (c.top - n) + n,
                    c.height *= p
                }
                return {
                    type: b.type,
                    transform: j,
                    cx: k,
                    cy: l,
                    r: d,
                    colorStops: b.colorStops
                }
            }
            ,
            b.exports = d
        }
        , {
            "./lineargradientcontainer": 20,
            "./log": 21,
            "./radialgradientcontainer": 26,
            "./repeatinglineargradientcontainer": 29,
            "./repeatingradialgradientcontainer": 30
        }],
        28: [function(a, b, c) {
            function d(a, b) {
                f.apply(this, arguments),
                this.canvas = this.options.canvas || this.document.createElement("canvas"),
                this.options.canvas || (this.canvas.width = a,
                this.canvas.height = b),
                this.ctx = this.canvas.getContext("2d"),
                this.taintCtx = this.document.createElement("canvas").getContext("2d"),
                this.ctx.textBaseline = "bottom",
                this.variables = {},
                i("Initialized CanvasRenderer with size", a, "x", b)
            }
            function e(a) {
                return a.length > 0
            }
            var f = a("../renderer")
              , g = a("../gradientcontainer")
              , h = a("../utils")
              , i = a("../log");
            d.prototype = Object.create(f.prototype),
            d.prototype.getImageContainer = function() {
                return {
                    image: this.canvas
                }
            }
            ,
            d.prototype.setFillStyle = function(a) {
                return this.ctx.fillStyle = "object" == typeof a && a.isColor ? a.toString() : a,
                this.ctx
            }
            ,
            d.prototype.rectangle = function(a, b, c, d, e) {
                this.setFillStyle(e).fillRect(a, b, c, d)
            }
            ,
            d.prototype.circle = function(a, b, c, d) {
                this.setFillStyle(d),
                this.ctx.beginPath(),
                this.ctx.arc(a + c / 2, b + c / 2, c / 2, 0, 2 * Math.PI, !0),
                this.ctx.closePath(),
                this.ctx.fill()
            }
            ,
            d.prototype.circleStroke = function(a, b, c, d, e, f) {
                this.circle(a, b, c, d),
                this.ctx.strokeStyle = f.toString(),
                this.ctx.stroke()
            }
            ,
            d.prototype.shadow = function(a, b, c, d, e) {
                for (var f, g = this.ctx, i = d ? this.createMaskShapes(a, c) : a, j = d ? i[0] : null, k = !!d && (e && (e[0].width > 0 || e[1].width > 0 || e[2].width > 0 || e[3].width > 0)), l = [], m = !0, n = b.length - 1; n >= 0; n--)
                    f = h.parseShadow(b[n]),
                    l.push(f),
                    null !== f.inset !== d || f.spread || k || (m && (g.save(),
                    this.shape(i),
                    this.setFillStyle("#ffffff"),
                    m = !1),
                    g.shadowOffsetX = f.x,
                    g.shadowOffsetY = f.y,
                    g.shadowColor = f.color,
                    g.shadowBlur = f.blur,
                    g.fill());
                for (m || g.restore(),
                n = 0; n < l.length; n++) {
                    f = l[n];
                    var o = f.spread || 0;
                    if (null !== f.inset === d && o || k) {
                        g.save();
                        var p = h.getShapeBounds(a)
                          , q = p.width;
                        d && e && (p.top += e[0].width,
                        p.right -= e[1].width,
                        p.bottom -= e[2].width,
                        p.left += e[3].width,
                        p.width = p.right - p.left,
                        p.height = p.bottom - p.top);
                        var r = p.left + .5 * p.width
                          , s = p.top + .5 * p.height
                          , t = (p.width + (d ? -2 : 2) * o) / q;
                        if (g.translate(r, s),
                        g.transform(t, 0, 0, t, f.x, f.y),
                        g.translate(-r, -s),
                        d) {
                            var u = 1 / t;
                            i[0] = ["rect", u * (j[1] - r) - f.x + r, u * (j[2] - s) - f.y + s, u * j[3], u * j[4]]
                        }
                        f.blur ? g.filter = "blur(" + .3 * f.blur + "px)" : (g.shadowOffsetX = 0,
                        g.shadowOffsetY = 0,
                        g.shadowColor = f.color,
                        g.shadowBlur = f.blur),
                        this.shape(i),
                        this.setFillStyle(f.color),
                        g.fill(),
                        g.restore()
                    }
                }
            }
            ,
            d.prototype.drawShape = function(a, b) {
                this.shape(a),
                this.setFillStyle(b).fill()
            }
            ,
            d.prototype.taints = function(a) {
                if (null === a.tainted) {
                    this.taintCtx.drawImage(a.image, 0, 0);
                    try {
                        this.taintCtx.getImageData(0, 0, 1, 1),
                        a.tainted = !1
                    } catch (b) {
                        this.taintCtx = document.createElement("canvas").getContext("2d"),
                        a.tainted = !0
                    }
                }
                return a.tainted
            }
            ,
            d.prototype.drawImage = function(a, b, c, d, e, f, g, h, i) {
                this.taints(a) && !this.options.allowTaint || this.ctx.drawImage(a.image, b, c, d, e, f, g, h, i)
            }
            ,
            d.prototype.clip = function(a, b, c, d) {
                a ? (this.ctx.save(),
                a.filter(e).forEach(function(a) {
                    try {
                        this.shape(a).clip()
                    } catch (a) {
                        console.log("Exception clipping shape: ", a)
                    }
                }, this),
                b.call(c),
                this.ctx.restore()) : b.call(c)
            }
            ,
            d.prototype.createMaskShapes = function(a, b) {
                var c = a[a.length - 1];
                return [b.canvasBorder ? ["rect", Math.max(b.canvasBorder[0], b.canvasBorder[2]), Math.min(b.canvasBorder[1], b.canvasBorder[3]), -Math.abs(b.canvasBorder[0] - b.canvasBorder[2]), Math.abs(b.canvasBorder[1] - b.canvasBorder[3])] : ["rect", this.canvas.width, 0, -this.canvas.width, this.canvas.height]].concat(c).concat([c[0]])
            }
            ,
            d.prototype.mask = function(a, b, c, d) {
                var e = a[a.length - 1]
                  , f = a;
                e && e.length && (f = a.slice(0, -1),
                f.push(this.createMaskShapes(a, d))),
                this.clip(f, b, c, d)
            }
            ,
            d.prototype.shape = function(a) {
                return this.ctx.beginPath(),
                a.forEach(function(a, b) {
                    "rect" === a[0] ? this.ctx.rect.apply(this.ctx, a.slice(1)) : this.ctx[0 === b ? "moveTo" : a[0] + "To"].apply(this.ctx, a.slice(1))
                }, this),
                this.ctx.closePath(),
                this.ctx
            }
            ,
            d.prototype.path = function(a) {
                return this.ctx.beginPath(),
                a.forEach(function(a, b) {
                    "rect" === a[0] ? this.ctx.rect.apply(this.ctx, a.slice(1)) : this.ctx[0 === b ? "moveTo" : a[0] + "To"].apply(this.ctx, a.slice(1))
                }, this),
                this.ctx
            }
            ,
            d.prototype.font = function(a, b, c, d, e, f) {
                c = /^(normal|small-caps)$/i.test(c) ? c : "",
                this.setFillStyle(a).font = b + " " + c + " " + d + " " + e + " " + f
            }
            ,
            d.prototype.fontShadow = function(a, b, c, d) {
                this.setVariable("shadowColor", a.toString()).setVariable("shadowOffsetX", b).setVariable("shadowOffsetY", c).setVariable("shadowBlur", d)
            }
            ,
            d.prototype.renderTextShadow = function(a, b, c) {
                for (var d = 0; d < c.length; d++)
                    this.fontShadow(c[d].color, c[d].offsetX, c[d].offsetY, c[d].blur),
                    this.text(a, b.left, b.bottom)
            }
            ,
            d.prototype.clearShadow = function() {
                this.setVariable("shadowColor", "rgba(0,0,0,0)")
            }
            ,
            d.prototype.setOpacity = function(a) {
                this.ctx.globalAlpha = a
            }
            ,
            d.prototype.setMixBlendMode = function(a) {
                this.ctx.globalCompositeOperation = a
            }
            ,
            d.prototype.setFilter = function(a) {
                this.ctx.filter = a
            }
            ,
            d.prototype.setTransform = function(a) {
                this.ctx.translate(a.origin[0], a.origin[1]),
                this.ctx.transform.apply(this.ctx, a.matrix),
                this.ctx.translate(-a.origin[0], -a.origin[1])
            }
            ,
            d.prototype.setVariable = function(a, b) {
                return this.variables[a] !== b && (this.variables[a] = this.ctx[a] = b),
                this
            }
            ,
            d.prototype.text = function(a, b, c) {
                this.ctx.fillText(a, b, c)
            }
            ,
            d.prototype.backgroundRepeatShape = function(a, b, c, d, e, f, g, h, i) {
                if (!this.taints(a) || this.options.allowTaint) {
                    var j = [["line", Math.round(e), Math.round(f)], ["line", Math.round(e + g), Math.round(f)], ["line", Math.round(e + g), Math.round(h + f)], ["line", Math.round(e), Math.round(h + f)]];
                    this.clip([j], function() {
                        this.renderBackgroundRepeat(a, b, c, d, i[3], i[0])
                    }, this)
                }
            }
            ,
            d.prototype.renderBackgroundRepeat = function(a, b, c, d, e, f) {
                if (!this.taints(a) || this.options.allowTaint) {
                    var g = Math.round(d.left + b.left + e)
                      , h = Math.round(d.top + b.top + f);
                    this.setFillStyle(this.ctx.createPattern(this.resizeImage(a, c), "repeat")),
                    this.ctx.translate(g, h),
                    this.ctx.fill(),
                    this.ctx.translate(-g, -h)
                }
            }
            ,
            d.prototype.renderGradient = function(a, b) {
                var c;
                switch (a.type) {
                case g.TYPES.LINEAR:
                    c = this.ctx.createLinearGradient(a.x0, a.y0, a.x1, a.y1);
                    break;
                case g.TYPES.RADIAL:
                    a.transform && (this.ctx.save(),
                    this.setTransform(a.transform)),
                    c = this.ctx.createRadialGradient(a.cx, a.cy, 0, a.cx, a.cy, a.r);
                    break;
                case g.TYPES.REPEATING_LINEAR:
                case g.TYPES.REPEATING_RADIAL:
                }
                c && (a.colorStops.forEach(function(a) {
                    c.addColorStop(a.stop, a.color.toString())
                }),
                this.rectangle(b.left, b.top, b.width, b.height, c)),
                a.transform && this.ctx.restore()
            }
            ,
            d.prototype.resizeImage = function(a, b) {
                var c = a.image;
                if (c.width === b.width && c.height === b.height)
                    return c;
                var d, e = document.createElement("canvas");
                return e.width = b.width,
                e.height = b.height,
                d = e.getContext("2d"),
                d.drawImage(c, 0, 0, c.width, c.height, 0, 0, b.width, b.height),
                e
            }
            ,
            b.exports = d
        }
        , {
            "../gradientcontainer": 17,
            "../log": 21,
            "../renderer": 27,
            "../utils": 36
        }],
        29: [function(a, b, c) {
            function d(a) {
                f.apply(this, arguments),
                this.type = e.TYPES.REPEATING_LINEAR
            }
            var e = a("./gradientcontainer")
              , f = a("./lineargradientcontainer");
            d.prototype = Object.create(f.prototype),
            b.exports = d
        }
        , {
            "./gradientcontainer": 17,
            "./lineargradientcontainer": 20
        }],
        30: [function(a, b, c) {
            function d(a) {
                f.apply(this, arguments),
                this.type = e.TYPES.REPEATING_RADIAL
            }
            var e = a("./gradientcontainer")
              , f = a("./radialgradientcontainer");
            d.prototype = Object.create(f.prototype),
            b.exports = d
        }
        , {
            "./gradientcontainer": 17,
            "./radialgradientcontainer": 26
        }],
        31: [function(a, b, c) {
            function d(a, b, c, d) {
                e.call(this, c, d),
                this.ownStacking = a,
                this.contexts = [],
                this.children = [],
                this.opacity = (this.parent ? this.parent.stack.opacity : 1) * b
            }
            var e = a("./nodecontainer");
            d.prototype = Object.create(e.prototype),
            d.prototype.getParentStack = function(a) {
                var b = this.parent ? this.parent.stack : null;
                return b ? b.ownStacking ? b : b.getParentStack(a) : a.stack
            }
            ,
            b.exports = d
        }
        , {
            "./nodecontainer": 22
        }],
        32: [function(a, b, c) {
            function d(a) {
                this.rangeBounds = this.testRangeBounds(a),
                this.cors = this.testCORS()
            }
            d.prototype.testRangeBounds = function(a) {
                var b, c, d, e, f = !1;
                return a.createRange && (b = a.createRange(),
                b.getBoundingClientRect && (c = a.createElement("boundtest"),
                c.style.height = "123px",
                c.style.display = "block",
                a.body.appendChild(c),
                b.selectNode(c),
                d = b.getBoundingClientRect(),
                e = d.height,
                123 === e && (f = !0),
                a.body.removeChild(c))),
                f
            }
            ,
            d.prototype.testCORS = function() {
                return void 0 !== (new Image).crossOrigin
            }
            ,
            d.prototype.testSVG = function() {
                var a = new Image
                  , b = document.createElement("canvas")
                  , c = b.getContext("2d");
                a.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                try {
                    c.drawImage(a, 0, 0),
                    b.toDataURL()
                } catch (a) {
                    return !1
                }
                return !0
            }
            ,
            b.exports = d
        }
        , {}],
        33: [function(a, b, c) {
            function d(a) {
                this.src = a,
                this.image = null;
                var b = this;
                this.promise = this.hasFabric().then(function() {
                    return b.isInline(a) ? Promise.resolve(b.inlineFormatting(a)) : e(a)
                }).then(function(a) {
                    return new Promise(function(c) {
                        window.html2canvas.svg.fabric.loadSVGFromString(a, b.createCanvas.call(b, c))
                    }
                    )
                })
            }
            var e = a("./xhr")
              , f = a("./utils").decode64;
            d.prototype.hasFabric = function() {
                return window.html2canvas.svg && window.html2canvas.svg.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
            }
            ,
            d.prototype.inlineFormatting = function(a) {
                return /^data:image\/svg\+xml;base64,/.test(a) ? this.decode64(this.removeContentType(a)) : this.removeContentType(a)
            }
            ,
            d.prototype.removeContentType = function(a) {
                return /^data:image\/svg\+xml(;base64)?,/.test(a) ? a.replace(/^data:image\/svg\+xml(;base64)?,/, "") : decodeURIComponent(a.replace(/^data:image\/svg\+xml.+,/, ""))
            }
            ,
            d.prototype.isInline = function(a) {
                return /^data:image\/svg\+xml/i.test(a)
            }
            ,
            d.prototype.createCanvas = function(a) {
                var b = this;
                return function(c, d) {
                    var e = document.createElement("canvas")
                      , f = new window.html2canvas.svg.fabric.StaticCanvas(e);
                    b.image = f.lowerCanvasEl;
                    var g, h = window.html2canvas.svg.fabric.util.groupSVGElements(c, d);
                    b.src.getBoundingClientRect && (g = b.src.getBoundingClientRect(),
                    h.set({
                        scaleX: g.width / d.width,
                        scaleY: g.height / d.height
                    })),
                    f.setWidth(g ? g.width : d.width).setHeight(g ? g.height : d.height).add(h).renderAll(),
                    a(f.lowerCanvasEl)
                }
            }
            ,
            d.prototype.decode64 = function(a) {
                return "function" == typeof window.atob ? window.atob(a) : f(a)
            }
            ,
            b.exports = d
        }
        , {
            "./utils": 36,
            "./xhr": 39
        }],
        34: [function(a, b, c) {
            function d(a, b) {
                this.src = a,
                this.image = null;
                var c = this;
                this.promise = b ? new Promise(function(b, d) {
                    c.image = new Image,
                    c.image.onload = b,
                    c.image.onerror = d,
                    c.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(a),
                    !0 === c.image.complete && b(c.image)
                }
                ) : this.hasFabric().then(function() {
                    return new Promise(function(b) {
                        window.html2canvas.svg.fabric.parseSVGDocument(a, c.createCanvas.call(c, b))
                    }
                    )
                })
            }
            var e = a("./svgcontainer");
            d.prototype = Object.create(e.prototype),
            b.exports = d
        }
        , {
            "./svgcontainer": 33
        }],
        35: [function(a, b, c) {
            function d(a, b) {
                f.call(this, a, b)
            }
            function e(a, b, c) {
                if (a.length > 0)
                    return b + c.toUpperCase()
            }
            var f = a("./nodecontainer");
            d.prototype = Object.create(f.prototype),
            d.prototype.applyTextTransform = function() {
                this.node.data = this.transform(this.parent.css("textTransform"))
            }
            ,
            d.prototype.transform = function(a) {
                var b = this.node.data;
                switch (a) {
                case "lowercase":
                    return b.toLowerCase();
                case "capitalize":
                    return b.replace(/(^|\s|:|-|\(|\))([a-z])/g, e);
                case "uppercase":
                    return b.toUpperCase();
                default:
                    return b
                }
            }
            ,
            b.exports = d
        }
        , {
            "./nodecontainer": 22
        }],
        36: [function(a, b, c) {
            function d(a) {
                var b = a.length;
                if (1 === b && "rect" === a[0][0])
                    return {
                        left: a[0][1],
                        top: a[0][2],
                        right: a[0][1] + a[0][3],
                        bottom: a[0][2] + a[0][4],
                        width: a[0][3],
                        height: a[0][4]
                    };
                for (var c = 1 / 0, e = 1 / 0, f = -1 / 0, g = -1 / 0, h = 0; h < b; h++) {
                    var i = a[h]
                      , j = i[i.length - 2]
                      , k = i[i.length - 1];
                    if ("number" == typeof j)
                        c = Math.min(c, j),
                        e = Math.min(e, k),
                        f = Math.max(f, j),
                        g = Math.max(g, k);
                    else {
                        var l = d(i);
                        c = Math.min(c, l.left),
                        e = Math.min(e, l.top),
                        f = Math.max(f, l.right),
                        g = Math.max(g, l.bottom)
                    }
                }
                return {
                    left: c,
                    top: e,
                    right: f,
                    bottom: g,
                    width: f - c,
                    height: g - e
                }
            }
            c.smallImage = function() {
                return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            }
            ,
            c.bind = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            }
            ,
            c.decode64 = function(a) {
                var b, c, d, e, f, g, h, i, j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", k = a.length, l = "";
                for (b = 0; b < k; b += 4)
                    c = j.indexOf(a[b]),
                    d = j.indexOf(a[b + 1]),
                    e = j.indexOf(a[b + 2]),
                    f = j.indexOf(a[b + 3]),
                    g = c << 2 | d >> 4,
                    h = (15 & d) << 4 | e >> 2,
                    i = (3 & e) << 6 | f,
                    l += 64 === e ? String.fromCharCode(g) : 64 === f || -1 === f ? String.fromCharCode(g, h) : String.fromCharCode(g, h, i);
                return l
            }
            ,
            c.getBounds = function(a) {
                if (a.getBoundingClientRect) {
                    var b = a.getBoundingClientRect()
                      , c = null == a.offsetWidth ? b.width : a.offsetWidth;
                    return {
                        top: b.top,
                        bottom: b.bottom || b.top + b.height,
                        right: b.left + c,
                        left: b.left,
                        width: c,
                        height: null == a.offsetHeight ? b.height : a.offsetHeight
                    }
                }
                return {}
            }
            ,
            c.offsetBounds = function(a) {
                var b = a.offsetParent ? c.offsetBounds(a.offsetParent) : {
                    top: 0,
                    left: 0
                };
                return {
                    top: a.offsetTop + b.top,
                    bottom: a.offsetTop + a.offsetHeight + b.top,
                    right: a.offsetLeft + b.left + a.offsetWidth,
                    left: a.offsetLeft + b.left,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            }
            ,
            c.parseBackgrounds = function(a) {
                var b, c, d, e, f, g, h, i = " \r\n\t", j = [], k = 0, l = 0, m = function() {
                    b && ('"' === c.substr(0, 1) && (c = c.substr(1, c.length - 2)),
                    c && h.push(c),
                    "-" === b.substr(0, 1) && (e = b.indexOf("-", 1) + 1) > 0 && (d = b.substr(0, e),
                    b = b.substr(e)),
                    j.push({
                        prefix: d,
                        method: b.toLowerCase(),
                        value: f,
                        args: h,
                        image: null
                    })),
                    h = [],
                    b = d = c = f = ""
                };
                return h = [],
                b = d = c = f = "",
                a.split("").forEach(function(a) {
                    if (!(0 === k && i.indexOf(a) > -1)) {
                        switch (a) {
                        case '"':
                            g ? g === a && (g = null) : g = a;
                            break;
                        case "(":
                            if (g)
                                break;
                            if (0 === k)
                                return k = 1,
                                void (f += a);
                            l++;
                            break;
                        case ")":
                            if (g)
                                break;
                            if (1 === k) {
                                if (0 === l)
                                    return k = 0,
                                    f += a,
                                    void m();
                                l--
                            }
                            break;
                        case ",":
                            if (g)
                                break;
                            if (0 === k)
                                return void m();
                            if (1 === k && 0 === l && !b.match(/^url$/i))
                                return h.push(c),
                                c = "",
                                void (f += a)
                        }
                        f += a,
                        0 === k ? b += a : c += a
                    }
                }),
                m(),
                j
            }
            ,
            c.parseShadow = function(a) {
                var b = {
                    color: /^(#|rgb|hsl|(?!(inset|initial|inherit))[^\d\-\.]+)/i,
                    inset: /^inset/i,
                    px: /px$/i
                }
                  , c = ["x", "y", "blur", "spread"]
                  , d = a.split(/ (?![^(]*\))/)
                  , e = {};
                for (var f in b)
                    e[f] = d.filter(b[f].test.bind(b[f])),
                    e[f] = 0 === e[f].length ? null : 1 === e[f].length ? e[f][0] : e[f];
                for (var g = 0; g < e.px.length; g++)
                    e[c[g]] = parseInt(e.px[g]);
                return e
            }
            ,
            c.matrixInverse = function(a) {
                var b = a[0]
                  , c = a[2]
                  , d = a[4]
                  , e = a[1]
                  , f = a[3]
                  , g = a[5]
                  , h = 1 / (b * f - c * e);
                return [f * h, -e * h, -c * h, b * h, (c * g - d * f) * h, (d * e - b * g) * h]
            }
            ,
            c.getShapeBounds = d;
            var e = /::?(?:after|before|first-line|first-letter)/;
            c.getMatchingRules = function(a, b) {
                for (var c = [], d = function(e) {
                    if (e)
                        for (var f = e.length, g = 0; g < f; g++) {
                            var h = e[g];
                            switch (h.type) {
                            case 1:
                                try {
                                    !a.matches(h.selectorText.replace(/::?[a-zA-Z\-]+/g, "")) || b && !b.test(h.selectorText) || c.push(h)
                                } catch (a) {}
                                break;
                            case 3:
                                d(h.styleSheet.cssRules);
                                break;
                            case 4:
                            case 12:
                            case 13:
                                d(h.cssRules)
                            }
                        }
                }, f = a.ownerDocument.styleSheets.length, g = 0; g < f; g++)
                    try {
                        var h = a.ownerDocument.styleSheets[g];
                        h && h.cssRules && d(h.cssRules)
                    } catch (a) {}
                var i = function(b) {
                    var c = SPECIFICITY.calculate(b.selectorText)
                      , d = c.length;
                    if (1 === d)
                        return c[0].specificityArray;
                    for (var f = [], g = 0; g < d; g++)
                        a.matches(c[g].selector.replace(e, "")) && f.push(c[g].specificityArray);
                    return f.sort(SPECIFICITY.compare),
                    f[f.length - 1]
                };
                return c.sort(function(a, b) {
                    return void 0 === a.specificity && (a.specificity = i(a)),
                    void 0 === b.specificity && (b.specificity = i(b)),
                    SPECIFICITY.compare(a.specificity, b.specificity)
                }),
                c
            }
        }
        , {}],
        37: [function(a, b, c) {
            function d(a) {
                this.src = a.args[0].src,
                this.videoIndex = a.videoIndex,
                a.args[0].videoIndex = a.videoIndex,
                this.image = a.args[0],
                this.promise = new Promise(function(b, c) {
                    a.args[0].muted = !0;
                    var d = document.getElementsByTagName("video");
                    if (0 !== d.length && d[a.videoIndex]) {
                        var e = d[a.videoIndex];
                        if (e.currentTime && (a.args[0].currentTime = e.currentTime),
                        a.args[0].paused) {
                            var f = a.args[0].play();
                            f ? f.then(b, c) : b()
                        } else
                            b()
                    } else
                        b()
                }
                )
            }
            b.exports = d
        }
        , {}],
        38: [function(a, b, c) {
            function d(a) {
                e.apply(this, arguments),
                this.type = "linear" === a.args[0] ? e.TYPES.LINEAR : e.TYPES.RADIAL
            }
            var e = a("./gradientcontainer");
            d.prototype = Object.create(e.prototype),
            b.exports = d
        }
        , {
            "./gradientcontainer": 17
        }],
        39: [function(a, b, c) {
            function d(a) {
                return new Promise(function(b, c) {
                    var d = new XMLHttpRequest;
                    d.open("GET", a),
                    d.onload = function() {
                        200 === d.status ? b(d.responseText) : c(new Error(d.statusText))
                    }
                    ,
                    d.onerror = function() {
                        c(new Error("Network Error"))
                    }
                    ,
                    d.send()
                }
                )
            }
            b.exports = d
        }
        , {}]
    }, {}, [12])(12)
}),
window.html2canvas.svg = {
    fabric: function() {
        var a = a || {
            version: "1.7.7"
        };
        return "undefined" != typeof exports && (exports.fabric = a),
        "undefined" != typeof document && "undefined" != typeof window ? (a.document = document,
        a.window = window,
        window.fabric = a) : (a.document = require("jsdom").jsdom(decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E")),
        a.document.createWindow ? a.window = a.document.createWindow() : a.window = a.document.parentWindow),
        a.isTouchSupported = "ontouchstart"in a.document.documentElement,
        a.isLikelyNode = "undefined" != typeof Buffer && "undefined" == typeof window,
        a.SHARED_ATTRIBUTES = ["display", "transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id"],
        a.DPI = 96,
        a.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",
        a.fontPaths = {},
        a.iMatrix = [1, 0, 0, 1, 0, 0],
        a.charWidthsCache = {},
        a.devicePixelRatio = a.window.devicePixelRatio || a.window.webkitDevicePixelRatio || a.window.mozDevicePixelRatio || 1,
        function() {
            function b(b, c) {
                if (this.__eventListeners[b]) {
                    var d = this.__eventListeners[b];
                    c ? d[d.indexOf(c)] = !1 : a.util.array.fill(d, !1)
                }
            }
            function c(a, b) {
                if (this.__eventListeners || (this.__eventListeners = {}),
                1 === arguments.length)
                    for (var c in a)
                        this.on(c, a[c]);
                else
                    this.__eventListeners[a] || (this.__eventListeners[a] = []),
                    this.__eventListeners[a].push(b);
                return this
            }
            function d(a, c) {
                if (this.__eventListeners) {
                    if (0 === arguments.length)
                        for (a in this.__eventListeners)
                            b.call(this, a);
                    else if (1 === arguments.length && "object" == typeof arguments[0])
                        for (var d in a)
                            b.call(this, d, a[d]);
                    else
                        b.call(this, a, c);
                    return this
                }
            }
            function e(a, b) {
                if (this.__eventListeners) {
                    var c = this.__eventListeners[a];
                    if (c) {
                        for (var d = 0, e = c.length; d < e; d++)
                            c[d] && c[d].call(this, b || {});
                        return this.__eventListeners[a] = c.filter(function(a) {
                            return !1 !== a
                        }),
                        this
                    }
                }
            }
            a.Observable = {
                observe: c,
                stopObserving: d,
                fire: e,
                on: c,
                off: d,
                trigger: e
            }
        }(),
        a.Collection = {
            _objects: [],
            add: function() {
                if (this._objects.push.apply(this._objects, arguments),
                this._onObjectAdded)
                    for (var a = 0, b = arguments.length; a < b; a++)
                        this._onObjectAdded(arguments[a]);
                return this.renderOnAddRemove && this.renderAll(),
                this
            },
            insertAt: function(a, b, c) {
                var d = this.getObjects();
                return c ? d[b] = a : d.splice(b, 0, a),
                this._onObjectAdded && this._onObjectAdded(a),
                this.renderOnAddRemove && this.renderAll(),
                this
            },
            remove: function() {
                for (var a, b = this.getObjects(), c = !1, d = 0, e = arguments.length; d < e; d++)
                    -1 !== (a = b.indexOf(arguments[d])) && (c = !0,
                    b.splice(a, 1),
                    this._onObjectRemoved && this._onObjectRemoved(arguments[d]));
                return this.renderOnAddRemove && c && this.renderAll(),
                this
            },
            forEachObject: function(a, b) {
                for (var c = this.getObjects(), d = 0, e = c.length; d < e; d++)
                    a.call(b, c[d], d, c);
                return this
            },
            getObjects: function(a) {
                return void 0 === a ? this._objects : this._objects.filter(function(b) {
                    return b.type === a
                })
            },
            item: function(a) {
                return this.getObjects()[a]
            },
            isEmpty: function() {
                return 0 === this.getObjects().length
            },
            size: function() {
                return this.getObjects().length
            },
            contains: function(a) {
                return this.getObjects().indexOf(a) > -1
            },
            complexity: function() {
                return this.getObjects().reduce(function(a, b) {
                    return a += b.complexity ? b.complexity() : 0
                }, 0)
            }
        },
        a.CommonMethods = {
            _setOptions: function(a) {
                for (var b in a)
                    this.set(b, a[b])
            },
            _initGradient: function(b, c) {
                !b || !b.colorStops || b instanceof a.Gradient || this.set(c, new a.Gradient(b))
            },
            _initPattern: function(b, c, d) {
                !b || !b.source || b instanceof a.Pattern ? d && d() : this.set(c, new a.Pattern(b,d))
            },
            _initClipping: function(b) {
                if (b.clipTo && "string" == typeof b.clipTo) {
                    var c = a.util.getFunctionBody(b.clipTo);
                    void 0 !== c && (this.clipTo = new Function("ctx",c))
                }
            },
            _setObject: function(a) {
                for (var b in a)
                    this._set(b, a[b])
            },
            set: function(a, b) {
                return "object" == typeof a ? this._setObject(a) : "function" == typeof b && "clipTo" !== a ? this._set(a, b(this.get(a))) : this._set(a, b),
                this
            },
            _set: function(a, b) {
                this[a] = b
            },
            toggle: function(a) {
                var b = this.get(a);
                return "boolean" == typeof b && this.set(a, !b),
                this
            },
            get: function(a) {
                return this[a]
            }
        },
        function(b) {
            var c = Math.sqrt
              , d = Math.atan2
              , e = Math.pow
              , f = Math.abs
              , g = Math.PI / 180;
            a.util = {
                removeFromArray: function(a, b) {
                    var c = a.indexOf(b);
                    return -1 !== c && a.splice(c, 1),
                    a
                },
                getRandomInt: function(a, b) {
                    return Math.floor(Math.random() * (b - a + 1)) + a
                },
                degreesToRadians: function(a) {
                    return a * g
                },
                radiansToDegrees: function(a) {
                    return a / g
                },
                rotatePoint: function(b, c, d) {
                    b.subtractEquals(c);
                    var e = a.util.rotateVector(b, d);
                    return new a.Point(e.x,e.y).addEquals(c)
                },
                rotateVector: function(a, b) {
                    var c = Math.sin(b)
                      , d = Math.cos(b);
                    return {
                        x: a.x * d - a.y * c,
                        y: a.x * c + a.y * d
                    }
                },
                transformPoint: function(b, c, d) {
                    return d ? new a.Point(c[0] * b.x + c[2] * b.y,c[1] * b.x + c[3] * b.y) : new a.Point(c[0] * b.x + c[2] * b.y + c[4],c[1] * b.x + c[3] * b.y + c[5])
                },
                makeBoundingBoxFromPoints: function(b) {
                    var c = [b[0].x, b[1].x, b[2].x, b[3].x]
                      , d = a.util.array.min(c)
                      , e = a.util.array.max(c)
                      , f = Math.abs(d - e)
                      , g = [b[0].y, b[1].y, b[2].y, b[3].y]
                      , h = a.util.array.min(g)
                      , i = a.util.array.max(g);
                    return {
                        left: d,
                        top: h,
                        width: f,
                        height: Math.abs(h - i)
                    }
                },
                invertTransform: function(b) {
                    var c = 1 / (b[0] * b[3] - b[1] * b[2])
                      , d = [c * b[3], -c * b[1], -c * b[2], c * b[0]]
                      , e = a.util.transformPoint({
                        x: b[4],
                        y: b[5]
                    }, d, !0);
                    return d[4] = -e.x,
                    d[5] = -e.y,
                    d
                },
                toFixed: function(a, b) {
                    return parseFloat(Number(a).toFixed(b))
                },
                parseUnit: function(b, c) {
                    var d = /\D{0,2}$/.exec(b)
                      , e = parseFloat(b);
                    switch (c || (c = a.Text.DEFAULT_SVG_FONT_SIZE),
                    d[0]) {
                    case "mm":
                        return e * a.DPI / 25.4;
                    case "cm":
                        return e * a.DPI / 2.54;
                    case "in":
                        return e * a.DPI;
                    case "pt":
                        return e * a.DPI / 72;
                    case "pc":
                        return e * a.DPI / 72 * 12;
                    case "em":
                        return e * c;
                    default:
                        return e
                    }
                },
                falseFunction: function() {
                    return !1
                },
                getKlass: function(b, c) {
                    return b = a.util.string.camelize(b.charAt(0).toUpperCase() + b.slice(1)),
                    a.util.resolveNamespace(c)[b]
                },
                resolveNamespace: function(c) {
                    if (!c)
                        return a;
                    var d, e = c.split("."), f = e.length, g = b || a.window;
                    for (d = 0; d < f; ++d)
                        g = g[e[d]];
                    return g
                },
                loadImage: function(b, c, d, e) {
                    if (!b)
                        return void (c && c.call(d, b));
                    var f = a.util.createImage();
                    f.onload = function() {
                        c && c.call(d, f),
                        f = f.onload = f.onerror = null
                    }
                    ,
                    f.onerror = function() {
                        a.log("Error loading " + f.src),
                        c && c.call(d, null, !0),
                        f = f.onload = f.onerror = null
                    }
                    ,
                    0 !== b.indexOf("data") && e && (f.crossOrigin = e),
                    f.src = b
                },
                enlivenObjects: function(b, c, d, e) {
                    function f() {
                        ++h === i && c && c(g)
                    }
                    b = b || [];
                    var g = []
                      , h = 0
                      , i = b.length;
                    if (!i)
                        return void (c && c(g));
                    b.forEach(function(b, c) {
                        if (!b || !b.type)
                            return void f();
                        a.util.getKlass(b.type, d).fromObject(b, function(a, d) {
                            d || (g[c] = a),
                            e && e(b, a, d),
                            f()
                        }, !0)
                    })
                },
                enlivenPatterns: function(b, c) {
                    function d() {
                        ++f === g && c && c(e)
                    }
                    b = b || [];
                    var e = []
                      , f = 0
                      , g = b.length;
                    if (!g)
                        return void (c && c(e));
                    b.forEach(function(b, c) {
                        b && b.source ? new a.Pattern(b,function(a) {
                            e[c] = a,
                            d()
                        }
                        ) : (e[c] = b,
                        d())
                    })
                },
                groupSVGElements: function(b, c, d) {
                    var e;
                    return e = new a.PathGroup(b,c),
                    void 0 !== d && e.setSourcePath(d),
                    e
                },
                populateWithProperties: function(a, b, c) {
                    if (c && "[object Array]" === Object.prototype.toString.call(c))
                        for (var d = 0, e = c.length; d < e; d++)
                            c[d]in a && (b[c[d]] = a[c[d]])
                },
                drawDashedLine: function(a, b, e, f, g, h) {
                    var i = f - b
                      , j = g - e
                      , k = c(i * i + j * j)
                      , l = d(j, i)
                      , m = h.length
                      , n = 0
                      , o = !0;
                    for (a.save(),
                    a.translate(b, e),
                    a.moveTo(0, 0),
                    a.rotate(l),
                    b = 0; k > b; )
                        b += h[n++ % m],
                        b > k && (b = k),
                        a[o ? "lineTo" : "moveTo"](b, 0),
                        o = !o;
                    a.restore()
                },
                createCanvasElement: function(b) {
                    return b || (b = a.document.createElement("canvas")),
                    b.getContext || "undefined" == typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(b),
                    b
                },
                createImage: function() {
                    return a.isLikelyNode ? new (require("canvas").Image) : a.document.createElement("img")
                },
                createAccessors: function(a) {
                    var b, c, d, e, f, g = a.prototype;
                    for (b = g.stateProperties.length; b--; )
                        c = g.stateProperties[b],
                        d = c.charAt(0).toUpperCase() + c.slice(1),
                        e = "set" + d,
                        f = "get" + d,
                        g[f] || (g[f] = function(a) {
                            return new Function('return this.get("' + a + '")')
                        }(c)),
                        g[e] || (g[e] = function(a) {
                            return new Function("value",'return this.set("' + a + '", value)')
                        }(c))
                },
                clipContext: function(a, b) {
                    b.save(),
                    b.beginPath(),
                    a.clipTo(b),
                    b.clip()
                },
                multiplyTransformMatrices: function(a, b, c) {
                    return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], c ? 0 : a[0] * b[4] + a[2] * b[5] + a[4], c ? 0 : a[1] * b[4] + a[3] * b[5] + a[5]]
                },
                qrDecompose: function(a) {
                    var b = d(a[1], a[0])
                      , f = e(a[0], 2) + e(a[1], 2)
                      , h = c(f)
                      , i = (a[0] * a[3] - a[2] * a[1]) / h
                      , j = d(a[0] * a[2] + a[1] * a[3], f);
                    return {
                        angle: b / g,
                        scaleX: h,
                        scaleY: i,
                        skewX: j / g,
                        skewY: 0,
                        translateX: a[4],
                        translateY: a[5]
                    }
                },
                customTransformMatrix: function(b, c, d) {
                    var e = [1, 0, f(Math.tan(d * g)), 1]
                      , h = [f(b), 0, 0, f(c)];
                    return a.util.multiplyTransformMatrices(h, e, !0)
                },
                resetObjectTransform: function(a) {
                    a.scaleX = 1,
                    a.scaleY = 1,
                    a.skewX = 0,
                    a.skewY = 0,
                    a.flipX = !1,
                    a.flipY = !1,
                    a.setAngle(0)
                },
                getFunctionBody: function(a) {
                    return (String(a).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
                },
                isTransparent: function(a, b, c, d) {
                    d > 0 && (b > d ? b -= d : b = 0,
                    c > d ? c -= d : c = 0);
                    var e, f, g = !0, h = a.getImageData(b, c, 2 * d || 1, 2 * d || 1), i = h.data.length;
                    for (e = 3; e < i && (f = h.data[e],
                    !1 !== (g = f <= 0)); e += 4)
                        ;
                    return h = null,
                    g
                },
                parsePreserveAspectRatioAttribute: function(a) {
                    var b, c = "meet", d = "Mid", e = "Mid", f = a.split(" ");
                    return f && f.length && (c = f.pop(),
                    "meet" !== c && "slice" !== c ? (b = c,
                    c = "meet") : f.length && (b = f.pop())),
                    d = "none" !== b ? b.slice(1, 4) : "none",
                    e = "none" !== b ? b.slice(5, 8) : "none",
                    {
                        meetOrSlice: c,
                        alignX: d,
                        alignY: e
                    }
                },
                clearFabricFontCache: function(b) {
                    b ? a.charWidthsCache[b] && delete a.charWidthsCache[b] : a.charWidthsCache = {}
                }
            }
        }("undefined" != typeof exports ? exports : this),
        function() {
            function b(a, b, e, g, h, j, k) {
                var l = i.call(arguments);
                if (f[l])
                    return f[l];
                var m = Math.PI
                  , n = k * m / 180
                  , o = Math.sin(n)
                  , p = Math.cos(n)
                  , q = 0
                  , r = 0;
                e = Math.abs(e),
                g = Math.abs(g);
                var s = -p * a * .5 - o * b * .5
                  , t = -p * b * .5 + o * a * .5
                  , u = e * e
                  , v = g * g
                  , w = t * t
                  , x = s * s
                  , y = u * v - u * w - v * x
                  , z = 0;
                if (y < 0) {
                    var A = Math.sqrt(1 - y / (u * v));
                    e *= A,
                    g *= A
                } else
                    z = (h === j ? -1 : 1) * Math.sqrt(y / (u * w + v * x));
                var B = z * e * t / g
                  , C = -z * g * s / e
                  , D = p * B - o * C + .5 * a
                  , E = o * B + p * C + .5 * b
                  , F = d(1, 0, (s - B) / e, (t - C) / g)
                  , G = d((s - B) / e, (t - C) / g, (-s - B) / e, (-t - C) / g);
                0 === j && G > 0 ? G -= 2 * m : 1 === j && G < 0 && (G += 2 * m);
                for (var H = Math.ceil(Math.abs(G / m * 2)), I = [], J = G / H, K = 8 / 3 * Math.sin(J / 4) * Math.sin(J / 4) / Math.sin(J / 2), L = F + J, M = 0; M < H; M++)
                    I[M] = c(F, L, p, o, e, g, D, E, K, q, r),
                    q = I[M][4],
                    r = I[M][5],
                    F = L,
                    L += J;
                return f[l] = I,
                I
            }
            function c(a, b, c, d, e, f, h, j, k, l, m) {
                var n = i.call(arguments);
                if (g[n])
                    return g[n];
                var o = Math.cos(a)
                  , p = Math.sin(a)
                  , q = Math.cos(b)
                  , r = Math.sin(b)
                  , s = c * e * q - d * f * r + h
                  , t = d * e * q + c * f * r + j
                  , u = l + k * (-c * e * p - d * f * o)
                  , v = m + k * (-d * e * p + c * f * o)
                  , w = s + k * (c * e * r + d * f * q)
                  , x = t + k * (d * e * r - c * f * q);
                return g[n] = [u, v, w, x, s, t],
                g[n]
            }
            function d(a, b, c, d) {
                var e = Math.atan2(b, a)
                  , f = Math.atan2(d, c);
                return f >= e ? f - e : 2 * Math.PI - (e - f)
            }
            function e(a, b, c, d, e, f, g, j) {
                var k = i.call(arguments);
                if (h[k])
                    return h[k];
                var l, m, n, o, p, q, r, s, t = Math.sqrt, u = Math.min, v = Math.max, w = Math.abs, x = [], y = [[], []];
                m = 6 * a - 12 * c + 6 * e,
                l = -3 * a + 9 * c - 9 * e + 3 * g,
                n = 3 * c - 3 * a;
                for (var z = 0; z < 2; ++z)
                    if (z > 0 && (m = 6 * b - 12 * d + 6 * f,
                    l = -3 * b + 9 * d - 9 * f + 3 * j,
                    n = 3 * d - 3 * b),
                    w(l) < 1e-12) {
                        if (w(m) < 1e-12)
                            continue;
                        0 < (o = -n / m) && o < 1 && x.push(o)
                    } else
                        (r = m * m - 4 * n * l) < 0 || (s = t(r),
                        p = (-m + s) / (2 * l),
                        0 < p && p < 1 && x.push(p),
                        0 < (q = (-m - s) / (2 * l)) && q < 1 && x.push(q));
                for (var A, B, C, D = x.length, E = D; D--; )
                    o = x[D],
                    C = 1 - o,
                    A = C * C * C * a + 3 * C * C * o * c + 3 * C * o * o * e + o * o * o * g,
                    y[0][D] = A,
                    B = C * C * C * b + 3 * C * C * o * d + 3 * C * o * o * f + o * o * o * j,
                    y[1][D] = B;
                y[0][E] = a,
                y[1][E] = b,
                y[0][E + 1] = g,
                y[1][E + 1] = j;
                var F = [{
                    x: u.apply(null, y[0]),
                    y: u.apply(null, y[1])
                }, {
                    x: v.apply(null, y[0]),
                    y: v.apply(null, y[1])
                }];
                return h[k] = F,
                F
            }
            var f = {}
              , g = {}
              , h = {}
              , i = Array.prototype.join;
            a.util.drawArc = function(a, c, d, e) {
                for (var f = e[0], g = e[1], h = e[2], i = e[3], j = e[4], k = e[5], l = e[6], m = [[], [], [], []], n = b(k - c, l - d, f, g, i, j, h), o = 0, p = n.length; o < p; o++)
                    m[o][0] = n[o][0] + c,
                    m[o][1] = n[o][1] + d,
                    m[o][2] = n[o][2] + c,
                    m[o][3] = n[o][3] + d,
                    m[o][4] = n[o][4] + c,
                    m[o][5] = n[o][5] + d,
                    a.bezierCurveTo.apply(a, m[o])
            }
            ,
            a.util.getBoundsOfArc = function(a, c, d, f, g, h, i, j, k) {
                for (var l, m = 0, n = 0, o = [], p = b(j - a, k - c, d, f, h, i, g), q = 0, r = p.length; q < r; q++)
                    l = e(m, n, p[q][0], p[q][1], p[q][2], p[q][3], p[q][4], p[q][5]),
                    o.push({
                        x: l[0].x + a,
                        y: l[0].y + c
                    }),
                    o.push({
                        x: l[1].x + a,
                        y: l[1].y + c
                    }),
                    m = p[q][4],
                    n = p[q][5];
                return o
            }
            ,
            a.util.getBoundsOfCurve = e
        }(),
        function() {
            function b(a, b) {
                for (var c = g.call(arguments, 2), d = [], e = 0, f = a.length; e < f; e++)
                    d[e] = c.length ? a[e][b].apply(a[e], c) : a[e][b].call(a[e]);
                return d
            }
            function c(a, b) {
                return f(a, b, function(a, b) {
                    return a >= b
                })
            }
            function d(a, b) {
                return f(a, b, function(a, b) {
                    return a < b
                })
            }
            function e(a, b) {
                for (var c = a.length; c--; )
                    a[c] = b;
                return a
            }
            function f(a, b, c) {
                if (a && 0 !== a.length) {
                    var d = a.length - 1
                      , e = b ? a[d][b] : a[d];
                    if (b)
                        for (; d--; )
                            c(a[d][b], e) && (e = a[d][b]);
                    else
                        for (; d--; )
                            c(a[d], e) && (e = a[d]);
                    return e
                }
            }
            var g = Array.prototype.slice;
            Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
                if (void 0 === this || null === this)
                    throw new TypeError;
                var b = Object(this)
                  , c = b.length >>> 0;
                if (0 === c)
                    return -1;
                var d = 0;
                if (arguments.length > 0 && (d = Number(arguments[1]),
                d !== d ? d = 0 : 0 !== d && d !== Number.POSITIVE_INFINITY && d !== Number.NEGATIVE_INFINITY && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))),
                d >= c)
                    return -1;
                for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); e < c; e++)
                    if (e in b && b[e] === a)
                        return e;
                return -1
            }
            ),
            Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
                for (var c = 0, d = this.length >>> 0; c < d; c++)
                    c in this && a.call(b, this[c], c, this)
            }
            ),
            Array.prototype.map || (Array.prototype.map = function(a, b) {
                for (var c = [], d = 0, e = this.length >>> 0; d < e; d++)
                    d in this && (c[d] = a.call(b, this[d], d, this));
                return c
            }
            ),
            Array.prototype.every || (Array.prototype.every = function(a, b) {
                for (var c = 0, d = this.length >>> 0; c < d; c++)
                    if (c in this && !a.call(b, this[c], c, this))
                        return !1;
                return !0
            }
            ),
            Array.prototype.some || (Array.prototype.some = function(a, b) {
                for (var c = 0, d = this.length >>> 0; c < d; c++)
                    if (c in this && a.call(b, this[c], c, this))
                        return !0;
                return !1
            }
            ),
            Array.prototype.filter || (Array.prototype.filter = function(a, b) {
                for (var c, d = [], e = 0, f = this.length >>> 0; e < f; e++)
                    e in this && (c = this[e],
                    a.call(b, c, e, this) && d.push(c));
                return d
            }
            ),
            Array.prototype.reduce || (Array.prototype.reduce = function(a) {
                var b, c = this.length >>> 0, d = 0;
                if (arguments.length > 1)
                    b = arguments[1];
                else
                    for (; ; ) {
                        if (d in this) {
                            b = this[d++];
                            break
                        }
                        if (++d >= c)
                            throw new TypeError
                    }
                for (; d < c; d++)
                    d in this && (b = a.call(null, b, this[d], d, this));
                return b
            }
            ),
            a.util.array = {
                fill: e,
                invoke: b,
                min: d,
                max: c
            }
        }(),
        function() {
            function b(c, d, e) {
                if (e)
                    if (!a.isLikelyNode && d instanceof Element)
                        c = d;
                    else if (d instanceof Array) {
                        c = [];
                        for (var f = 0, g = d.length; f < g; f++)
                            c[f] = b({}, d[f], e)
                    } else if (d && "object" == typeof d)
                        for (var h in d)
                            d.hasOwnProperty(h) && (c[h] = b({}, d[h], e));
                    else
                        c = d;
                else
                    for (var h in d)
                        c[h] = d[h];
                return c
            }
            function c(a, c) {
                return b({}, a, c)
            }
            a.util.object = {
                extend: b,
                clone: c
            }
        }(),
        function() {
            function b(a) {
                return a.replace(/-+(.)?/g, function(a, b) {
                    return b ? b.toUpperCase() : ""
                })
            }
            function c(a, b) {
                return a.charAt(0).toUpperCase() + (b ? a.slice(1) : a.slice(1).toLowerCase())
            }
            function d(a) {
                return a.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            String.prototype.trim || (String.prototype.trim = function() {
                return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
            }
            ),
            a.util.string = {
                camelize: b,
                capitalize: c,
                escapeXml: d
            }
        }(),
        function() {
            var a = Array.prototype.slice
              , b = Function.prototype.apply
              , c = function() {};
            Function.prototype.bind || (Function.prototype.bind = function(d) {
                var e, f = this, g = a.call(arguments, 1);
                return e = g.length ? function() {
                    return b.call(f, this instanceof c ? this : d, g.concat(a.call(arguments)))
                }
                : function() {
                    return b.call(f, this instanceof c ? this : d, arguments)
                }
                ,
                c.prototype = this.prototype,
                e.prototype = new c,
                e
            }
            )
        }(),
        function() {
            function b() {}
            function c(a) {
                var b = this.constructor.superclass.prototype[a];
                return arguments.length > 1 ? b.apply(this, e.call(arguments, 1)) : b.call(this)
            }
            function d() {
                function a() {
                    this.initialize.apply(this, arguments)
                }
                var d = null
                  , g = e.call(arguments, 0);
                "function" == typeof g[0] && (d = g.shift()),
                a.superclass = d,
                a.subclasses = [],
                d && (b.prototype = d.prototype,
                a.prototype = new b,
                d.subclasses.push(a));
                for (var i = 0, j = g.length; i < j; i++)
                    h(a, g[i], d);
                return a.prototype.initialize || (a.prototype.initialize = f),
                a.prototype.constructor = a,
                a.prototype.callSuper = c,
                a
            }
            var e = Array.prototype.slice
              , f = function() {}
              , g = function() {
                for (var a in {
                    toString: 1
                })
                    if ("toString" === a)
                        return !1;
                return !0
            }()
              , h = function(a, b, c) {
                for (var d in b)
                    d in a.prototype && "function" == typeof a.prototype[d] && (b[d] + "").indexOf("callSuper") > -1 ? a.prototype[d] = function(a) {
                        return function() {
                            var d = this.constructor.superclass;
                            this.constructor.superclass = c;
                            var e = b[a].apply(this, arguments);
                            if (this.constructor.superclass = d,
                            "initialize" !== a)
                                return e
                        }
                    }(d) : a.prototype[d] = b[d],
                    g && (b.toString !== Object.prototype.toString && (a.prototype.toString = b.toString),
                    b.valueOf !== Object.prototype.valueOf && (a.prototype.valueOf = b.valueOf))
            };
            a.util.createClass = d
        }(),
        function() {
            function b(a) {
                var b, c, d = Array.prototype.slice.call(arguments, 1), e = d.length;
                for (c = 0; c < e; c++)
                    if (b = typeof a[d[c]],
                    !/^(?:function|object|unknown)$/.test(b))
                        return !1;
                return !0
            }
            function c(a, b) {
                return {
                    handler: b,
                    wrappedHandler: d(a, b)
                }
            }
            function d(b, c) {
                return function(d) {
                    c.call(h(b), d || a.window.event)
                }
            }
            function e(b, c) {
                return function(d) {
                    if (q[b] && q[b][c])
                        for (var e = q[b][c], f = 0, g = e.length; f < g; f++)
                            e[f].call(this, d || a.window.event)
                }
            }
            function f(b) {
                b || (b = a.window.event);
                var c = b.target || (typeof b.srcElement !== j ? b.srcElement : null)
                  , d = a.util.getScrollLeftTop(c);
                return {
                    x: r(b) + d.left,
                    y: s(b) + d.top
                }
            }
            function g(a, b, c) {
                var d = "touchend" === a.type ? "changedTouches" : "touches";
                return a[d] && a[d][0] ? a[d][0][b] - (a[d][0][b] - a[d][0][c]) || a[c] : a[c]
            }
            var h, i, j = "unknown", k = function() {
                var a = 0;
                return function(b) {
                    return b.__uniqueID || (b.__uniqueID = "uniqueID__" + a++)
                }
            }();
            !function() {
                var a = {};
                h = function(b) {
                    return a[b]
                }
                ,
                i = function(b, c) {
                    a[b] = c
                }
            }();
            var l, m, n = b(a.document.documentElement, "addEventListener", "removeEventListener") && b(a.window, "addEventListener", "removeEventListener"), o = b(a.document.documentElement, "attachEvent", "detachEvent") && b(a.window, "attachEvent", "detachEvent"), p = {}, q = {};
            n ? (l = function(a, b, c, d) {
                a.addEventListener(b, c, !o && d)
            }
            ,
            m = function(a, b, c, d) {
                a.removeEventListener(b, c, !o && d)
            }
            ) : o ? (l = function(a, b, d) {
                var e = k(a);
                i(e, a),
                p[e] || (p[e] = {}),
                p[e][b] || (p[e][b] = []);
                var f = c(e, d);
                p[e][b].push(f),
                a.attachEvent("on" + b, f.wrappedHandler)
            }
            ,
            m = function(a, b, c) {
                var d, e = k(a);
                if (p[e] && p[e][b])
                    for (var f = 0, g = p[e][b].length; f < g; f++)
                        (d = p[e][b][f]) && d.handler === c && (a.detachEvent("on" + b, d.wrappedHandler),
                        p[e][b][f] = null)
            }
            ) : (l = function(a, b, c) {
                var d = k(a);
                if (q[d] || (q[d] = {}),
                !q[d][b]) {
                    q[d][b] = [];
                    var f = a["on" + b];
                    f && q[d][b].push(f),
                    a["on" + b] = e(d, b)
                }
                q[d][b].push(c)
            }
            ,
            m = function(a, b, c) {
                var d = k(a);
                if (q[d] && q[d][b])
                    for (var e = q[d][b], f = 0, g = e.length; f < g; f++)
                        e[f] === c && e.splice(f, 1)
            }
            ),
            a.util.addListener = l,
            a.util.removeListener = m;
            var r = function(a) {
                return typeof a.clientX !== j ? a.clientX : 0
            }
              , s = function(a) {
                return typeof a.clientY !== j ? a.clientY : 0
            };
            a.isTouchSupported && (r = function(a) {
                return g(a, "pageX", "clientX")
            }
            ,
            s = function(a) {
                return g(a, "pageY", "clientY")
            }
            ),
            a.util.getPointer = f,
            a.util.object.extend(a.util, a.Observable)
        }(),
        function() {
            function b(a, b) {
                var c = a.style;
                if (!c)
                    return a;
                if ("string" == typeof b)
                    return a.style.cssText += ";" + b,
                    b.indexOf("opacity") > -1 ? g(a, b.match(/opacity:\s*(\d?\.?\d*)/)[1]) : a;
                for (var d in b)
                    if ("opacity" === d)
                        g(a, b[d]);
                    else {
                        var e = "float" === d || "cssFloat" === d ? void 0 === c.styleFloat ? "cssFloat" : "styleFloat" : d;
                        c[e] = b[d]
                    }
                return a
            }
            var c = a.document.createElement("div")
              , d = "string" == typeof c.style.opacity
              , e = "string" == typeof c.style.filter
              , f = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/
              , g = function(a) {
                return a
            };
            d ? g = function(a, b) {
                return a.style.opacity = b,
                a
            }
            : e && (g = function(a, b) {
                var c = a.style;
                return a.currentStyle && !a.currentStyle.hasLayout && (c.zoom = 1),
                f.test(c.filter) ? (b = b >= .9999 ? "" : "alpha(opacity=" + 100 * b + ")",
                c.filter = c.filter.replace(f, b)) : c.filter += " alpha(opacity=" + 100 * b + ")",
                a
            }
            ),
            a.util.setStyle = b
        }(),
        function() {
            function b(b) {
                return "string" == typeof b ? a.document.getElementById(b) : b
            }
            function c(b, c) {
                var d = a.document.createElement(b);
                for (var e in c)
                    "class" === e ? d.className = c[e] : "for" === e ? d.htmlFor = c[e] : d.setAttribute(e, c[e]);
                return d
            }
            function d(a, b) {
                a && -1 === (" " + a.className + " ").indexOf(" " + b + " ") && (a.className += (a.className ? " " : "") + b)
            }
            function e(a, b, d) {
                return "string" == typeof b && (b = c(b, d)),
                a.parentNode && a.parentNode.replaceChild(b, a),
                b.appendChild(a),
                b
            }
            function f(b) {
                for (var c = 0, d = 0, e = a.document.documentElement, f = a.document.body || {
                    scrollLeft: 0,
                    scrollTop: 0
                }; b && (b.parentNode || b.host) && (b = b.parentNode || b.host,
                b === a.document ? (c = f.scrollLeft || e.scrollLeft || 0,
                d = f.scrollTop || e.scrollTop || 0) : (c += b.scrollLeft || 0,
                d += b.scrollTop || 0),
                1 !== b.nodeType || "fixed" !== a.util.getElementStyle(b, "position")); )
                    ;
                return {
                    left: c,
                    top: d
                }
            }
            function g(a) {
                var b, c, d = a && a.ownerDocument, e = {
                    left: 0,
                    top: 0
                }, g = {
                    left: 0,
                    top: 0
                }, h = {
                    borderLeftWidth: "left",
                    borderTopWidth: "top",
                    paddingLeft: "left",
                    paddingTop: "top"
                };
                if (!d)
                    return g;
                for (var i in h)
                    g[h[i]] += parseInt(k(a, i), 10) || 0;
                return b = d.documentElement,
                void 0 !== a.getBoundingClientRect && (e = a.getBoundingClientRect()),
                c = f(a),
                {
                    left: e.left + c.left - (b.clientLeft || 0) + g.left,
                    top: e.top + c.top - (b.clientTop || 0) + g.top
                }
            }
            var h, i = Array.prototype.slice, j = function(a) {
                return i.call(a, 0)
            };
            try {
                h = j(a.document.childNodes)instanceof Array
            } catch (a) {}
            h || (j = function(a) {
                for (var b = new Array(a.length), c = a.length; c--; )
                    b[c] = a[c];
                return b
            }
            );
            var k;
            k = a.document.defaultView && a.document.defaultView.getComputedStyle ? function(b, c) {
                var d = a.document.defaultView.getComputedStyle(b, null);
                return d ? d[c] : void 0
            }
            : function(a, b) {
                var c = a.style[b];
                return !c && a.currentStyle && (c = a.currentStyle[b]),
                c
            }
            ,
            function() {
                function b(b) {
                    return void 0 !== b.onselectstart && (b.onselectstart = a.util.falseFunction),
                    e ? b.style[e] = "none" : "string" == typeof b.unselectable && (b.unselectable = "on"),
                    b
                }
                function c(a) {
                    return void 0 !== a.onselectstart && (a.onselectstart = null),
                    e ? a.style[e] = "" : "string" == typeof a.unselectable && (a.unselectable = ""),
                    a
                }
                var d = a.document.documentElement.style
                  , e = "userSelect"in d ? "userSelect" : "MozUserSelect"in d ? "MozUserSelect" : "WebkitUserSelect"in d ? "WebkitUserSelect" : "KhtmlUserSelect"in d ? "KhtmlUserSelect" : "";
                a.util.makeElementUnselectable = b,
                a.util.makeElementSelectable = c
            }(),
            function() {
                function b(b, c) {
                    var d = a.document.getElementsByTagName("head")[0]
                      , e = a.document.createElement("script")
                      , f = !0;
                    e.onload = e.onreadystatechange = function(b) {
                        if (f) {
                            if ("string" == typeof this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)
                                return;
                            f = !1,
                            c(b || a.window.event),
                            e = e.onload = e.onreadystatechange = null
                        }
                    }
                    ,
                    e.src = b,
                    d.appendChild(e)
                }
                a.util.getScript = b
            }(),
            a.util.getById = b,
            a.util.toArray = j,
            a.util.makeElement = c,
            a.util.addClass = d,
            a.util.wrapElement = e,
            a.util.getScrollLeftTop = f,
            a.util.getElementOffset = g,
            a.util.getElementStyle = k
        }(),
        function() {
            function b(a, b) {
                return a + (/\?/.test(a) ? "&" : "?") + b
            }
            function c() {}
            function d(a, d) {
                d || (d = {});
                var f = d.method ? d.method.toUpperCase() : "GET"
                  , g = d.onComplete || function() {}
                  , h = e()
                  , i = d.body || d.parameters;
                return h.onreadystatechange = function() {
                    4 === h.readyState && (g(h),
                    h.onreadystatechange = c)
                }
                ,
                "GET" === f && (i = null,
                "string" == typeof d.parameters && (a = b(a, d.parameters))),
                h.open(f, a, !0),
                "POST" !== f && "PUT" !== f || h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                h.send(i),
                h
            }
            var e = function() {
                for (var a = [function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                }
                , function() {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                }
                , function() {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                }
                , function() {
                    return new XMLHttpRequest
                }
                ], b = a.length; b--; )
                    try {
                        if (a[b]())
                            return a[b]
                    } catch (a) {}
            }();
            a.util.request = d
        }(),
        a.log = function() {}
        ,
        a.warn = function() {}
        ,
        "undefined" != typeof console && ["log", "warn"].forEach(function(b) {
            void 0 !== console[b] && "function" == typeof console[b].apply && (a[b] = function() {
                return console[b].apply(console, arguments)
            }
            )
        }),
        function(a) {
            "use strict";
            function b(a) {
                return a in z ? z[a] : a
            }
            function c(a, b, c, d) {
                var e, f = "[object Array]" === Object.prototype.toString.call(b);
                return "fill" !== a && "stroke" !== a || "none" !== b ? "strokeDashArray" === a ? b = "none" === b ? null : b.replace(/,/g, " ").split(/\s+/).map(function(a) {
                    return parseFloat(a)
                }) : "transformMatrix" === a ? b = c && c.transformMatrix ? u(c.transformMatrix, p.parseTransformAttribute(b)) : p.parseTransformAttribute(b) : "visible" === a ? (b = "none" !== b && "hidden" !== b,
                c && !1 === c.visible && (b = !1)) : "opacity" === a ? (b = parseFloat(b),
                c && void 0 !== c.opacity && (b *= c.opacity)) : "originX" === a ? b = "start" === b ? "left" : "end" === b ? "right" : "center" : e = f ? b.map(t) : t(b, d) : b = "",
                !f && isNaN(e) ? b : e
            }
            function d(a) {
                for (var b in A)
                    if (void 0 !== a[A[b]] && "" !== a[b]) {
                        if (void 0 === a[b]) {
                            if (!p.Object.prototype[b])
                                continue;
                            a[b] = p.Object.prototype[b]
                        }
                        if (0 !== a[b].indexOf("url(")) {
                            var c = new p.Color(a[b]);
                            a[b] = c.setAlpha(s(c.getAlpha() * a[A[b]], 2)).toRgba()
                        }
                    }
                return a
            }
            function e(a, b) {
                for (var c, d, e = [], f = 0; f < b.length; f++)
                    c = b[f],
                    d = a.getElementsByTagName(c),
                    e = e.concat(Array.prototype.slice.call(d));
                return e
            }
            function f(a, b) {
                var c, d;
                a.replace(/;\s*$/, "").split(";").forEach(function(a) {
                    var e = a.split(":");
                    c = e[0].trim().toLowerCase(),
                    d = e[1].trim(),
                    b[c] = d
                })
            }
            function g(a, b) {
                var c, d;
                for (var e in a)
                    void 0 !== a[e] && (c = e.toLowerCase(),
                    d = a[e],
                    b[c] = d)
            }
            function h(a, b) {
                var c = {};
                for (var d in p.cssRules[b])
                    if (i(a, d.split(" ")))
                        for (var e in p.cssRules[b][d])
                            c[e] = p.cssRules[b][d][e];
                return c
            }
            function i(a, b) {
                var c, d = !0;
                return c = k(a, b.pop()),
                c && b.length && (d = j(a, b)),
                c && d && 0 === b.length
            }
            function j(a, b) {
                for (var c, d = !0; a.parentNode && 1 === a.parentNode.nodeType && b.length; )
                    d && (c = b.pop()),
                    a = a.parentNode,
                    d = k(a, c);
                return 0 === b.length
            }
            function k(a, b) {
                var c, d = a.nodeName, e = a.getAttribute("class"), f = a.getAttribute("id");
                if (c = new RegExp("^" + d,"i"),
                b = b.replace(c, ""),
                f && b.length && (c = new RegExp("#" + f + "(?![a-zA-Z\\-]+)","i"),
                b = b.replace(c, "")),
                e && b.length) {
                    e = e.split(" ");
                    for (var g = e.length; g--; )
                        c = new RegExp("\\." + e[g] + "(?![a-zA-Z\\-]+)","i"),
                        b = b.replace(c, "")
                }
                return 0 === b.length
            }
            function l(a, b) {
                var c;
                if (a.getElementById && (c = a.getElementById(b)),
                c)
                    return c;
                var d, e, f = a.getElementsByTagName("*");
                for (e = 0; e < f.length; e++)
                    if (d = f[e],
                    b === d.getAttribute("id"))
                        return d
            }
            function m(a) {
                for (var b = e(a, ["use", "svg:use"]), c = 0; b.length && c < b.length; ) {
                    var d, f, g, h, i, j = b[c], k = j.getAttribute("xlink:href").substr(1), m = j.getAttribute("x") || 0, o = j.getAttribute("y") || 0, p = l(a, k) || l(document, k), q = p ? p.cloneNode(!0) : null, r = q ? (q.getAttribute("transform") || "") + " translate(" + m + ", " + o + ")" : "", s = b.length;
                    if (null !== q) {
                        if (n(q),
                        /^svg$/i.test(q.nodeName)) {
                            var t = q.ownerDocument.createElement("g");
                            for (g = 0,
                            h = q.attributes,
                            i = h.length; g < i; g++)
                                f = h.item(g),
                                t.setAttribute(f.nodeName, f.nodeValue);
                            for (; q.firstChild; )
                                t.appendChild(q.firstChild);
                            q = t
                        }
                        for (g = 0,
                        h = j.attributes,
                        i = h.length; g < i; g++)
                            f = h.item(g),
                            "x" !== f.nodeName && "y" !== f.nodeName && "xlink:href" !== f.nodeName && ("transform" === f.nodeName ? r = f.nodeValue + " " + r : q.setAttribute(f.nodeName, f.nodeValue));
                        q.setAttribute("transform", r),
                        q.setAttribute("instantiated_by_use", "1"),
                        q.removeAttribute("id"),
                        d = j.parentNode,
                        d.replaceChild(q, j),
                        b.length === s && c++
                    } else
                        b.length === s && c++
                }
            }
            function n(a) {
                var b, c, d, e, f = a.getAttribute("viewBox"), g = 1, h = 1, i = 0, j = 0, k = a.getAttribute("width"), l = a.getAttribute("height"), m = a.getAttribute("x") || 0, n = a.getAttribute("y") || 0, o = a.getAttribute("preserveAspectRatio") || "", q = !f || !w.test(a.nodeName) || !(f = f.match(B)), r = !k || !l || "100%" === k || "100%" === l, s = q && r, u = {}, v = "";
                if (u.width = 0,
                u.height = 0,
                u.toBeParsed = s,
                s)
                    return u;
                if (q)
                    return u.width = t(k),
                    u.height = t(l),
                    u;
                if (i = -parseFloat(f[1]),
                j = -parseFloat(f[2]),
                b = parseFloat(f[3]),
                c = parseFloat(f[4]),
                r ? (u.width = b,
                u.height = c) : (u.width = t(k),
                u.height = t(l),
                g = u.width / b,
                h = u.height / c),
                o = p.util.parsePreserveAspectRatioAttribute(o),
                "none" !== o.alignX && (h = g = g > h ? h : g),
                1 === g && 1 === h && 0 === i && 0 === j && 0 === m && 0 === n)
                    return u;
                if ((m || n) && (v = " translate(" + t(m) + " " + t(n) + ") "),
                d = v + " matrix(" + g + " 0 0 " + h + " " + i * g + " " + j * h + ") ",
                "svg" === a.nodeName) {
                    for (e = a.ownerDocument.createElement("g"); a.firstChild; )
                        e.appendChild(a.firstChild);
                    a.appendChild(e)
                } else
                    e = a,
                    d = e.getAttribute("transform") + d;
                return e.setAttribute("transform", d),
                u
            }
            function o(a, b) {
                for (; a && (a = a.parentNode); )
                    if (a.nodeName && b.test(a.nodeName.replace("svg:", "")) && !a.getAttribute("instantiated_by_use"))
                        return !0;
                return !1
            }
            var p = a.fabric || (a.fabric = {})
              , q = p.util.object.extend
              , r = p.util.object.clone
              , s = p.util.toFixed
              , t = p.util.parseUnit
              , u = p.util.multiplyTransformMatrices
              , v = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/i
              , w = /^(symbol|image|marker|pattern|view|svg)$/i
              , x = /^(?:pattern|defs|symbol|metadata|clipPath|mask)$/i
              , y = /^(symbol|g|a|svg)$/i
              , z = {
                cx: "left",
                x: "left",
                r: "radius",
                cy: "top",
                y: "top",
                display: "visible",
                visibility: "visible",
                transform: "transformMatrix",
                "fill-opacity": "fillOpacity",
                "fill-rule": "fillRule",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                "font-style": "fontStyle",
                "font-weight": "fontWeight",
                "stroke-dasharray": "strokeDashArray",
                "stroke-linecap": "strokeLineCap",
                "stroke-linejoin": "strokeLineJoin",
                "stroke-miterlimit": "strokeMiterLimit",
                "stroke-opacity": "strokeOpacity",
                "stroke-width": "strokeWidth",
                "text-decoration": "textDecoration",
                "text-anchor": "originX",
                opacity: "opacity"
            }
              , A = {
                stroke: "strokeOpacity",
                fill: "fillOpacity"
            };
            p.cssRules = {},
            p.gradientDefs = {},
            p.parseTransformAttribute = function() {
                function a(a, b) {
                    var c = Math.cos(b[0])
                      , d = Math.sin(b[0])
                      , e = 0
                      , f = 0;
                    3 === b.length && (e = b[1],
                    f = b[2]),
                    a[0] = c,
                    a[1] = d,
                    a[2] = -d,
                    a[3] = c,
                    a[4] = e - (c * e - d * f),
                    a[5] = f - (d * e + c * f)
                }
                function b(a, b) {
                    var c = b[0]
                      , d = 2 === b.length ? b[1] : b[0];
                    a[0] = c,
                    a[3] = d
                }
                function c(a, b, c) {
                    a[c] = Math.tan(p.util.degreesToRadians(b[0]))
                }
                function d(a, b) {
                    a[4] = b[0],
                    2 === b.length && (a[5] = b[1])
                }
                var e = [1, 0, 0, 1, 0, 0]
                  , f = p.reNum
                  , g = "(?:\\s+,?\\s*|,\\s*)"
                  , h = "(?:(skewX)\\s*\\(\\s*(" + f + ")\\s*\\))"
                  , i = "(?:(skewY)\\s*\\(\\s*(" + f + ")\\s*\\))"
                  , j = "(?:(rotate)\\s*\\(\\s*(" + f + ")(?:" + g + "(" + f + ")" + g + "(" + f + "))?\\s*\\))"
                  , k = "(?:(scale)\\s*\\(\\s*(" + f + ")(?:" + g + "(" + f + "))?\\s*\\))"
                  , l = "(?:(translate)\\s*\\(\\s*(" + f + ")(?:" + g + "(" + f + "))?\\s*\\))"
                  , m = "(?:(matrix)\\s*\\(\\s*(" + f + ")" + g + "(" + f + ")" + g + "(" + f + ")" + g + "(" + f + ")" + g + "(" + f + ")" + g + "(" + f + ")\\s*\\))"
                  , n = "(?:" + m + "|" + l + "|" + k + "|" + j + "|" + h + "|" + i + ")"
                  , o = "(?:" + n + "(?:" + g + "*" + n + ")*)"
                  , q = "^\\s*(?:" + o + "?)\\s*$"
                  , r = new RegExp(q)
                  , s = new RegExp(n,"g");
                return function(f) {
                    var g = e.concat()
                      , h = [];
                    if (!f || f && !r.test(f))
                        return g;
                    f.replace(s, function(f) {
                        var i = new RegExp(n).exec(f).filter(function(a) {
                            return !!a
                        })
                          , j = i[1]
                          , k = i.slice(2).map(parseFloat);
                        switch (j) {
                        case "translate":
                            d(g, k);
                            break;
                        case "rotate":
                            k[0] = p.util.degreesToRadians(k[0]),
                            a(g, k);
                            break;
                        case "scale":
                            b(g, k);
                            break;
                        case "skewX":
                            c(g, k, 2);
                            break;
                        case "skewY":
                            c(g, k, 1);
                            break;
                        case "matrix":
                            g = k
                        }
                        h.push(g.concat()),
                        g = e.concat()
                    });
                    for (var i = h[0]; h.length > 1; )
                        h.shift(),
                        i = p.util.multiplyTransformMatrices(i, h[0]);
                    return i
                }
            }();
            var B = new RegExp("^\\s*(" + p.reNum + "+)\\s*,?\\s*(" + p.reNum + "+)\\s*,?\\s*(" + p.reNum + "+)\\s*,?\\s*(" + p.reNum + "+)\\s*$");
            p.parseSVGDocument = function(a, b, c) {
                if (a) {
                    m(a);
                    var d = p.Object.__uid++
                      , e = n(a)
                      , f = p.util.toArray(a.getElementsByTagName("*"));
                    if (e.svgUid = d,
                    0 === f.length && p.isLikelyNode) {
                        f = a.selectNodes('//*[name(.)!="svg"]');
                        for (var g = [], h = 0, i = f.length; h < i; h++)
                            g[h] = f[h];
                        f = g
                    }
                    var j = f.filter(function(a) {
                        return n(a),
                        v.test(a.nodeName.replace("svg:", "")) && !o(a, x)
                    });
                    if (!j || j && !j.length)
                        return void (b && b([], {}));
                    p.gradientDefs[d] = p.getGradientDefs(a),
                    p.cssRules[d] = p.getCSSRules(a),
                    p.parseElements(j, function(a) {
                        b && b(a, e)
                    }, r(e), c)
                }
            }
            ;
            var C = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + p.reNum + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + p.reNum + "))?\\s+(.*)");
            q(p, {
                parseFontDeclaration: function(a, b) {
                    var c = a.match(C);
                    if (c) {
                        var d = c[1]
                          , e = c[3]
                          , f = c[4]
                          , g = c[5]
                          , h = c[6];
                        d && (b.fontStyle = d),
                        e && (b.fontWeight = isNaN(parseFloat(e)) ? e : parseFloat(e)),
                        f && (b.fontSize = t(f)),
                        h && (b.fontFamily = h),
                        g && (b.lineHeight = "normal" === g ? 1 : g)
                    }
                },
                getGradientDefs: function(a) {
                    var b, c, d, f = ["linearGradient", "radialGradient", "svg:linearGradient", "svg:radialGradient"], g = e(a, f), h = 0, i = {}, j = {};
                    for (h = g.length; h--; )
                        b = g[h],
                        d = b.getAttribute("xlink:href"),
                        c = b.getAttribute("id"),
                        d && (j[c] = d.substr(1)),
                        i[c] = b;
                    for (c in j) {
                        var k = i[j[c]].cloneNode(!0);
                        for (b = i[c]; k.firstChild; )
                            b.appendChild(k.firstChild)
                    }
                    return i
                },
                parseAttributes: function(a, e, f) {
                    if (a) {
                        var g, i, j = {};
                        void 0 === f && (f = a.getAttribute("svgUid")),
                        a.parentNode && y.test(a.parentNode.nodeName) && (j = p.parseAttributes(a.parentNode, e, f)),
                        i = j && j.fontSize || a.getAttribute("font-size") || p.Text.DEFAULT_SVG_FONT_SIZE;
                        var k = e.reduce(function(b, c) {
                            return g = a.getAttribute(c),
                            g && (b[c] = g),
                            b
                        }, {});
                        k = q(k, q(h(a, f), p.parseStyleAttribute(a)));
                        var l, m, n = {};
                        for (var o in k)
                            l = b(o),
                            m = c(l, k[o], j, i),
                            n[l] = m;
                        n && n.font && p.parseFontDeclaration(n.font, n);
                        var r = q(j, n);
                        return y.test(a.nodeName) ? r : d(r)
                    }
                },
                parseElements: function(a, b, c, d) {
                    new p.ElementsParser(a,b,c,d).parse()
                },
                parseStyleAttribute: function(a) {
                    var b = {}
                      , c = a.getAttribute("style");
                    return c ? ("string" == typeof c ? f(c, b) : g(c, b),
                    b) : b
                },
                parsePointsAttribute: function(a) {
                    if (!a)
                        return null;
                    a = a.replace(/,/g, " ").trim(),
                    a = a.split(/\s+/);
                    var b, c, d = [];
                    for (b = 0,
                    c = a.length; b < c; b += 2)
                        d.push({
                            x: parseFloat(a[b]),
                            y: parseFloat(a[b + 1])
                        });
                    return d
                },
                getCSSRules: function(a) {
                    for (var b, c = a.getElementsByTagName("style"), d = {}, e = 0, f = c.length; e < f; e++) {
                        var g = c[e].textContent || c[e].text;
                        g = g.replace(/\/\*[\s\S]*?\*\//g, ""),
                        "" !== g.trim() && (b = g.match(/[^{]*\{[\s\S]*?\}/g),
                        b = b.map(function(a) {
                            return a.trim()
                        }),
                        b.forEach(function(a) {
                            for (var b = a.match(/([\s\S]*?)\s*\{([^}]*)\}/), c = {}, e = b[2].trim(), f = e.replace(/;$/, "").split(/\s*;\s*/), g = 0, h = f.length; g < h; g++) {
                                var i = f[g].split(/\s*:\s*/)
                                  , j = i[0]
                                  , k = i[1];
                                c[j] = k
                            }
                            a = b[1],
                            a.split(",").forEach(function(a) {
                                "" !== (a = a.replace(/^svg/i, "").trim()) && (d[a] ? p.util.object.extend(d[a], c) : d[a] = p.util.object.clone(c))
                            })
                        }))
                    }
                    return d
                },
                loadSVGFromURL: function(a, b, c) {
                    function d(a) {
                        var d = a.responseXML;
                        d && !d.documentElement && p.window.ActiveXObject && a.responseText && (d = new ActiveXObject("Microsoft.XMLDOM"),
                        d.async = "false",
                        d.loadXML(a.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ""))),
                        d && d.documentElement || b && b(null),
                        p.parseSVGDocument(d.documentElement, function(a, c) {
                            b && b(a, c)
                        }, c)
                    }
                    a = a.replace(/^\n\s*/, "").trim(),
                    new p.util.request(a,{
                        method: "get",
                        onComplete: d
                    })
                },
                loadSVGFromString: function(a, b, c) {
                    a = a.trim();
                    var d;
                    if ("undefined" != typeof DOMParser) {
                        var e = new DOMParser;
                        e && e.parseFromString && (d = e.parseFromString(a, "text/xml"))
                    } else
                        p.window.ActiveXObject && (d = new ActiveXObject("Microsoft.XMLDOM"),
                        d.async = "false",
                        d.loadXML(a.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
                    p.parseSVGDocument(d.documentElement, function(a, c) {
                        b(a, c)
                    }, c)
                }
            })
        }("undefined" != typeof exports ? exports : this),
        a.ElementsParser = function(a, b, c, d) {
            this.elements = a,
            this.callback = b,
            this.options = c,
            this.reviver = d,
            this.svgUid = c && c.svgUid || 0
        }
        ,
        a.ElementsParser.prototype.parse = function() {
            this.instances = new Array(this.elements.length),
            this.numElements = this.elements.length,
            this.createObjects()
        }
        ,
        a.ElementsParser.prototype.createObjects = function() {
            for (var a = 0, b = this.elements.length; a < b; a++)
                this.elements[a].setAttribute("svgUid", this.svgUid),
                function(a, b) {
                    setTimeout(function() {
                        a.createObject(a.elements[b], b)
                    }, 0)
                }(this, a)
        }
        ,
        a.ElementsParser.prototype.createObject = function(b, c) {
            var d = a[a.util.string.capitalize(b.tagName.replace("svg:", ""))];
            if (d && d.fromElement)
                try {
                    this._createObject(d, b, c)
                } catch (b) {
                    a.log(b)
                }
            else
                this.checkIfDone()
        }
        ,
        a.ElementsParser.prototype._createObject = function(a, b, c) {
            if (a.async)
                a.fromElement(b, this.createCallback(c, b), this.options);
            else {
                var d = a.fromElement(b, this.options);
                this.resolveGradient(d, "fill"),
                this.resolveGradient(d, "stroke"),
                this.reviver && this.reviver(b, d),
                this.instances[c] = d,
                this.checkIfDone()
            }
        }
        ,
        a.ElementsParser.prototype.createCallback = function(a, b) {
            var c = this;
            return function(d) {
                c.resolveGradient(d, "fill"),
                c.resolveGradient(d, "stroke"),
                c.reviver && c.reviver(b, d),
                c.instances[a] = d,
                c.checkIfDone()
            }
        }
        ,
        a.ElementsParser.prototype.resolveGradient = function(b, c) {
            var d = b.get(c);
            if (/^url\(/.test(d)) {
                var e = d.slice(5, d.length - 1);
                a.gradientDefs[this.svgUid][e] && b.set(c, a.Gradient.fromElement(a.gradientDefs[this.svgUid][e], b))
            }
        }
        ,
        a.ElementsParser.prototype.checkIfDone = function() {
            0 == --this.numElements && (this.instances = this.instances.filter(function(a) {
                return null != a
            }),
            this.callback(this.instances))
        }
        ,
        function(a) {
            "use strict";
            function b(a, b) {
                this.x = a,
                this.y = b
            }
            var c = a.fabric || (a.fabric = {});
            if (c.Point)
                return void c.warn("fabric.Point is already defined");
            c.Point = b,
            b.prototype = {
                type: "point",
                constructor: b,
                add: function(a) {
                    return new b(this.x + a.x,this.y + a.y)
                },
                addEquals: function(a) {
                    return this.x += a.x,
                    this.y += a.y,
                    this
                },
                scalarAdd: function(a) {
                    return new b(this.x + a,this.y + a)
                },
                scalarAddEquals: function(a) {
                    return this.x += a,
                    this.y += a,
                    this
                },
                subtract: function(a) {
                    return new b(this.x - a.x,this.y - a.y)
                },
                subtractEquals: function(a) {
                    return this.x -= a.x,
                    this.y -= a.y,
                    this
                },
                scalarSubtract: function(a) {
                    return new b(this.x - a,this.y - a)
                },
                scalarSubtractEquals: function(a) {
                    return this.x -= a,
                    this.y -= a,
                    this
                },
                multiply: function(a) {
                    return new b(this.x * a,this.y * a)
                },
                multiplyEquals: function(a) {
                    return this.x *= a,
                    this.y *= a,
                    this
                },
                divide: function(a) {
                    return new b(this.x / a,this.y / a)
                },
                divideEquals: function(a) {
                    return this.x /= a,
                    this.y /= a,
                    this
                },
                eq: function(a) {
                    return this.x === a.x && this.y === a.y
                },
                lt: function(a) {
                    return this.x < a.x && this.y < a.y
                },
                lte: function(a) {
                    return this.x <= a.x && this.y <= a.y
                },
                gt: function(a) {
                    return this.x > a.x && this.y > a.y
                },
                gte: function(a) {
                    return this.x >= a.x && this.y >= a.y
                },
                lerp: function(a, c) {
                    return void 0 === c && (c = .5),
                    c = Math.max(Math.min(1, c), 0),
                    new b(this.x + (a.x - this.x) * c,this.y + (a.y - this.y) * c)
                },
                distanceFrom: function(a) {
                    var b = this.x - a.x
                      , c = this.y - a.y;
                    return Math.sqrt(b * b + c * c)
                },
                midPointFrom: function(a) {
                    return this.lerp(a)
                },
                min: function(a) {
                    return new b(Math.min(this.x, a.x),Math.min(this.y, a.y))
                },
                max: function(a) {
                    return new b(Math.max(this.x, a.x),Math.max(this.y, a.y))
                },
                toString: function() {
                    return this.x + "," + this.y
                },
                setXY: function(a, b) {
                    return this.x = a,
                    this.y = b,
                    this
                },
                setX: function(a) {
                    return this.x = a,
                    this
                },
                setY: function(a) {
                    return this.y = a,
                    this
                },
                setFromPoint: function(a) {
                    return this.x = a.x,
                    this.y = a.y,
                    this
                },
                swap: function(a) {
                    var b = this.x
                      , c = this.y;
                    this.x = a.x,
                    this.y = a.y,
                    a.x = b,
                    a.y = c
                },
                clone: function() {
                    return new b(this.x,this.y)
                }
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            function b(a) {
                this.status = a,
                this.points = []
            }
            var c = a.fabric || (a.fabric = {});
            if (c.Intersection)
                return void c.warn("fabric.Intersection is already defined");
            c.Intersection = b,
            c.Intersection.prototype = {
                constructor: b,
                appendPoint: function(a) {
                    return this.points.push(a),
                    this
                },
                appendPoints: function(a) {
                    return this.points = this.points.concat(a),
                    this
                }
            },
            c.Intersection.intersectLineLine = function(a, d, e, f) {
                var g, h = (f.x - e.x) * (a.y - e.y) - (f.y - e.y) * (a.x - e.x), i = (d.x - a.x) * (a.y - e.y) - (d.y - a.y) * (a.x - e.x), j = (f.y - e.y) * (d.x - a.x) - (f.x - e.x) * (d.y - a.y);
                if (0 !== j) {
                    var k = h / j
                      , l = i / j;
                    0 <= k && k <= 1 && 0 <= l && l <= 1 ? (g = new b("Intersection"),
                    g.appendPoint(new c.Point(a.x + k * (d.x - a.x),a.y + k * (d.y - a.y)))) : g = new b
                } else
                    g = new b(0 === h || 0 === i ? "Coincident" : "Parallel");
                return g
            }
            ,
            c.Intersection.intersectLinePolygon = function(a, c, d) {
                for (var e, f, g, h = new b, i = d.length, j = 0; j < i; j++)
                    e = d[j],
                    f = d[(j + 1) % i],
                    g = b.intersectLineLine(a, c, e, f),
                    h.appendPoints(g.points);
                return h.points.length > 0 && (h.status = "Intersection"),
                h
            }
            ,
            c.Intersection.intersectPolygonPolygon = function(a, c) {
                for (var d = new b, e = a.length, f = 0; f < e; f++) {
                    var g = a[f]
                      , h = a[(f + 1) % e]
                      , i = b.intersectLinePolygon(g, h, c);
                    d.appendPoints(i.points)
                }
                return d.points.length > 0 && (d.status = "Intersection"),
                d
            }
            ,
            c.Intersection.intersectPolygonRectangle = function(a, d, e) {
                var f = d.min(e)
                  , g = d.max(e)
                  , h = new c.Point(g.x,f.y)
                  , i = new c.Point(f.x,g.y)
                  , j = b.intersectLinePolygon(f, h, a)
                  , k = b.intersectLinePolygon(h, g, a)
                  , l = b.intersectLinePolygon(g, i, a)
                  , m = b.intersectLinePolygon(i, f, a)
                  , n = new b;
                return n.appendPoints(j.points),
                n.appendPoints(k.points),
                n.appendPoints(l.points),
                n.appendPoints(m.points),
                n.points.length > 0 && (n.status = "Intersection"),
                n
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            function b(a) {
                a ? this._tryParsingColor(a) : this.setSource([0, 0, 0, 1])
            }
            function c(a, b, c) {
                return c < 0 && (c += 1),
                c > 1 && (c -= 1),
                c < 1 / 6 ? a + 6 * (b - a) * c : c < .5 ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
            }
            var d = a.fabric || (a.fabric = {});
            if (d.Color)
                return void d.warn("fabric.Color is already defined.");
            d.Color = b,
            d.Color.prototype = {
                _tryParsingColor: function(a) {
                    var c;
                    a in b.colorNameMap && (a = b.colorNameMap[a]),
                    "transparent" === a && (c = [255, 255, 255, 0]),
                    c || (c = b.sourceFromHex(a)),
                    c || (c = b.sourceFromRgb(a)),
                    c || (c = b.sourceFromHsl(a)),
                    c || (c = [0, 0, 0, 1]),
                    c && this.setSource(c)
                },
                _rgbToHsl: function(a, b, c) {
                    a /= 255,
                    b /= 255,
                    c /= 255;
                    var e, f, g, h = d.util.array.max([a, b, c]), i = d.util.array.min([a, b, c]);
                    if (g = (h + i) / 2,
                    h === i)
                        e = f = 0;
                    else {
                        var j = h - i;
                        switch (f = g > .5 ? j / (2 - h - i) : j / (h + i),
                        h) {
                        case a:
                            e = (b - c) / j + (b < c ? 6 : 0);
                            break;
                        case b:
                            e = (c - a) / j + 2;
                            break;
                        case c:
                            e = (a - b) / j + 4
                        }
                        e /= 6
                    }
                    return [Math.round(360 * e), Math.round(100 * f), Math.round(100 * g)]
                },
                getSource: function() {
                    return this._source
                },
                setSource: function(a) {
                    this._source = a
                },
                toRgb: function() {
                    var a = this.getSource();
                    return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")"
                },
                toRgba: function() {
                    var a = this.getSource();
                    return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + ")"
                },
                toHsl: function() {
                    var a = this.getSource()
                      , b = this._rgbToHsl(a[0], a[1], a[2]);
                    return "hsl(" + b[0] + "," + b[1] + "%," + b[2] + "%)"
                },
                toHsla: function() {
                    var a = this.getSource()
                      , b = this._rgbToHsl(a[0], a[1], a[2]);
                    return "hsla(" + b[0] + "," + b[1] + "%," + b[2] + "%," + a[3] + ")"
                },
                toHex: function() {
                    var a, b, c, d = this.getSource();
                    return a = d[0].toString(16),
                    a = 1 === a.length ? "0" + a : a,
                    b = d[1].toString(16),
                    b = 1 === b.length ? "0" + b : b,
                    c = d[2].toString(16),
                    c = 1 === c.length ? "0" + c : c,
                    a.toUpperCase() + b.toUpperCase() + c.toUpperCase()
                },
                toHexa: function() {
                    var a, b = this.getSource();
                    return a = 255 * b[3],
                    a = a.toString(16),
                    a = 1 === a.length ? "0" + a : a,
                    this.toHex() + a.toUpperCase()
                },
                getAlpha: function() {
                    return this.getSource()[3]
                },
                setAlpha: function(a) {
                    var b = this.getSource();
                    return b[3] = a,
                    this.setSource(b),
                    this
                },
                toGrayscale: function() {
                    var a = this.getSource()
                      , b = parseInt((.3 * a[0] + .59 * a[1] + .11 * a[2]).toFixed(0), 10)
                      , c = a[3];
                    return this.setSource([b, b, b, c]),
                    this
                },
                toBlackWhite: function(a) {
                    var b = this.getSource()
                      , c = (.3 * b[0] + .59 * b[1] + .11 * b[2]).toFixed(0)
                      , d = b[3];
                    return a = a || 127,
                    c = Number(c) < Number(a) ? 0 : 255,
                    this.setSource([c, c, c, d]),
                    this
                },
                overlayWith: function(a) {
                    a instanceof b || (a = new b(a));
                    for (var c = [], d = this.getAlpha(), e = this.getSource(), f = a.getSource(), g = 0; g < 3; g++)
                        c.push(Math.round(.5 * e[g] + .5 * f[g]));
                    return c[3] = d,
                    this.setSource(c),
                    this
                }
            },
            d.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,
            d.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,
            d.Color.reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,
            d.Color.colorNameMap = {
                aqua: "#00FFFF",
                black: "#000000",
                blue: "#0000FF",
                fuchsia: "#FF00FF",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                lime: "#00FF00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                orange: "#FFA500",
                purple: "#800080",
                red: "#FF0000",
                silver: "#C0C0C0",
                teal: "#008080",
                white: "#FFFFFF",
                yellow: "#FFFF00"
            },
            d.Color.fromRgb = function(a) {
                return b.fromSource(b.sourceFromRgb(a))
            }
            ,
            d.Color.sourceFromRgb = function(a) {
                var c = a.match(b.reRGBa);
                if (c) {
                    var d = parseInt(c[1], 10) / (/%$/.test(c[1]) ? 100 : 1) * (/%$/.test(c[1]) ? 255 : 1)
                      , e = parseInt(c[2], 10) / (/%$/.test(c[2]) ? 100 : 1) * (/%$/.test(c[2]) ? 255 : 1)
                      , f = parseInt(c[3], 10) / (/%$/.test(c[3]) ? 100 : 1) * (/%$/.test(c[3]) ? 255 : 1);
                    return [parseInt(d, 10), parseInt(e, 10), parseInt(f, 10), c[4] ? parseFloat(c[4]) : 1]
                }
            }
            ,
            d.Color.fromRgba = b.fromRgb,
            d.Color.fromHsl = function(a) {
                return b.fromSource(b.sourceFromHsl(a))
            }
            ,
            d.Color.sourceFromHsl = function(a) {
                var d = a.match(b.reHSLa);
                if (d) {
                    var e, f, g, h = (parseFloat(d[1]) % 360 + 360) % 360 / 360, i = parseFloat(d[2]) / (/%$/.test(d[2]) ? 100 : 1), j = parseFloat(d[3]) / (/%$/.test(d[3]) ? 100 : 1);
                    if (0 === i)
                        e = f = g = j;
                    else {
                        var k = j <= .5 ? j * (i + 1) : j + i - j * i
                          , l = 2 * j - k;
                        e = c(l, k, h + 1 / 3),
                        f = c(l, k, h),
                        g = c(l, k, h - 1 / 3)
                    }
                    return [Math.round(255 * e), Math.round(255 * f), Math.round(255 * g), d[4] ? parseFloat(d[4]) : 1]
                }
            }
            ,
            d.Color.fromHsla = b.fromHsl,
            d.Color.fromHex = function(a) {
                return b.fromSource(b.sourceFromHex(a))
            }
            ,
            d.Color.sourceFromHex = function(a) {
                if (a.match(b.reHex)) {
                    var c = a.slice(a.indexOf("#") + 1)
                      , d = 3 === c.length || 4 === c.length
                      , e = 8 === c.length || 4 === c.length
                      , f = d ? c.charAt(0) + c.charAt(0) : c.substring(0, 2)
                      , g = d ? c.charAt(1) + c.charAt(1) : c.substring(2, 4)
                      , h = d ? c.charAt(2) + c.charAt(2) : c.substring(4, 6)
                      , i = e ? d ? c.charAt(3) + c.charAt(3) : c.substring(6, 8) : "FF";
                    return [parseInt(f, 16), parseInt(g, 16), parseInt(h, 16), parseFloat((parseInt(i, 16) / 255).toFixed(2))]
                }
            }
            ,
            d.Color.fromSource = function(a) {
                var c = new b;
                return c.setSource(a),
                c
            }
        }("undefined" != typeof exports ? exports : this),
        function() {
            function b(b) {
                var c, d, e, f = b.getAttribute("style"), g = b.getAttribute("offset") || 0;
                if (g = parseFloat(g) / (/%$/.test(g) ? 100 : 1),
                g = g < 0 ? 0 : g > 1 ? 1 : g,
                f) {
                    var h = f.split(/\s*;\s*/);
                    "" === h[h.length - 1] && h.pop();
                    for (var i = h.length; i--; ) {
                        var j = h[i].split(/\s*:\s*/)
                          , k = j[0].trim()
                          , l = j[1].trim();
                        "stop-color" === k ? c = l : "stop-opacity" === k && (e = l)
                    }
                }
                return c || (c = b.getAttribute("stop-color") || "rgb(0,0,0)"),
                e || (e = b.getAttribute("stop-opacity")),
                c = new a.Color(c),
                d = c.getAlpha(),
                e = isNaN(parseFloat(e)) ? 1 : parseFloat(e),
                e *= d,
                {
                    offset: g,
                    color: c.toRgb(),
                    opacity: e
                }
            }
            function c(a) {
                return {
                    x1: a.getAttribute("x1") || 0,
                    y1: a.getAttribute("y1") || 0,
                    x2: a.getAttribute("x2") || "100%",
                    y2: a.getAttribute("y2") || 0
                }
            }
            function d(a) {
                return {
                    x1: a.getAttribute("fx") || a.getAttribute("cx") || "50%",
                    y1: a.getAttribute("fy") || a.getAttribute("cy") || "50%",
                    r1: 0,
                    x2: a.getAttribute("cx") || "50%",
                    y2: a.getAttribute("cy") || "50%",
                    r2: a.getAttribute("r") || "50%"
                }
            }
            function e(a, b, c) {
                var d, e = 0, f = 1, g = "";
                for (var h in b)
                    "Infinity" === b[h] ? b[h] = 1 : "-Infinity" === b[h] && (b[h] = 0),
                    d = parseFloat(b[h], 10),
                    f = "string" == typeof b[h] && /^\d+%$/.test(b[h]) ? .01 : 1,
                    "x1" === h || "x2" === h || "r2" === h ? (f *= "objectBoundingBox" === c ? a.width : 1,
                    e = "objectBoundingBox" === c ? a.left || 0 : 0) : "y1" !== h && "y2" !== h || (f *= "objectBoundingBox" === c ? a.height : 1,
                    e = "objectBoundingBox" === c ? a.top || 0 : 0),
                    b[h] = d * f + e;
                if ("ellipse" === a.type && null !== b.r2 && "objectBoundingBox" === c && a.rx !== a.ry) {
                    var i = a.ry / a.rx;
                    g = " scale(1, " + i + ")",
                    b.y1 && (b.y1 /= i),
                    b.y2 && (b.y2 /= i)
                }
                return g
            }
            a.Gradient = a.util.createClass({
                offsetX: 0,
                offsetY: 0,
                initialize: function(b) {
                    b || (b = {});
                    var c = {};
                    this.id = a.Object.__uid++,
                    this.type = b.type || "linear",
                    c = {
                        x1: b.coords.x1 || 0,
                        y1: b.coords.y1 || 0,
                        x2: b.coords.x2 || 0,
                        y2: b.coords.y2 || 0
                    },
                    "radial" === this.type && (c.r1 = b.coords.r1 || 0,
                    c.r2 = b.coords.r2 || 0),
                    this.coords = c,
                    this.colorStops = b.colorStops.slice(),
                    b.gradientTransform && (this.gradientTransform = b.gradientTransform),
                    this.offsetX = b.offsetX || this.offsetX,
                    this.offsetY = b.offsetY || this.offsetY
                },
                addColorStop: function(b) {
                    for (var c in b) {
                        var d = new a.Color(b[c]);
                        this.colorStops.push({
                            offset: c,
                            color: d.toRgb(),
                            opacity: d.getAlpha()
                        })
                    }
                    return this
                },
                toObject: function(b) {
                    var c = {
                        type: this.type,
                        coords: this.coords,
                        colorStops: this.colorStops,
                        offsetX: this.offsetX,
                        offsetY: this.offsetY,
                        gradientTransform: this.gradientTransform ? this.gradientTransform.concat() : this.gradientTransform
                    };
                    return a.util.populateWithProperties(this, c, b),
                    c
                },
                toSVG: function(b) {
                    var c, d, e = a.util.object.clone(this.coords);
                    if (this.colorStops.sort(function(a, b) {
                        return a.offset - b.offset
                    }),
                    !b.group || "path-group" !== b.group.type)
                        for (var f in e)
                            "x1" === f || "x2" === f || "r2" === f ? e[f] += this.offsetX - b.width / 2 : "y1" !== f && "y2" !== f || (e[f] += this.offsetY - b.height / 2);
                    d = 'id="SVGID_' + this.id + '" gradientUnits="userSpaceOnUse"',
                    this.gradientTransform && (d += ' gradientTransform="matrix(' + this.gradientTransform.join(" ") + ')" '),
                    "linear" === this.type ? c = ["<linearGradient ", d, ' x1="', e.x1, '" y1="', e.y1, '" x2="', e.x2, '" y2="', e.y2, '">\n'] : "radial" === this.type && (c = ["<radialGradient ", d, ' cx="', e.x2, '" cy="', e.y2, '" r="', e.r2, '" fx="', e.x1, '" fy="', e.y1, '">\n']);
                    for (var g = 0; g < this.colorStops.length; g++)
                        c.push("<stop ", 'offset="', 100 * this.colorStops[g].offset + "%", '" style="stop-color:', this.colorStops[g].color, null !== this.colorStops[g].opacity ? ";stop-opacity: " + this.colorStops[g].opacity : ";", '"/>\n');
                    return c.push("linear" === this.type ? "</linearGradient>\n" : "</radialGradient>\n"),
                    c.join("")
                },
                toLive: function(b, c) {
                    var d, e, f = a.util.object.clone(this.coords);
                    if (this.type) {
                        if (c.group && "path-group" === c.group.type)
                            for (e in f)
                                "x1" === e || "x2" === e ? f[e] += -this.offsetX + c.width / 2 : "y1" !== e && "y2" !== e || (f[e] += -this.offsetY + c.height / 2);
                        "linear" === this.type ? d = b.createLinearGradient(f.x1, f.y1, f.x2, f.y2) : "radial" === this.type && (d = b.createRadialGradient(f.x1, f.y1, f.r1, f.x2, f.y2, f.r2));
                        for (var g = 0, h = this.colorStops.length; g < h; g++) {
                            var i = this.colorStops[g].color
                              , j = this.colorStops[g].opacity
                              , k = this.colorStops[g].offset;
                            void 0 !== j && (i = new a.Color(i).setAlpha(j).toRgba()),
                            d.addColorStop(parseFloat(k), i)
                        }
                        return d
                    }
                }
            }),
            a.util.object.extend(a.Gradient, {
                fromElement: function(f, g) {
                    var h, i, j, k = f.getElementsByTagName("stop"), l = f.getAttribute("gradientUnits") || "objectBoundingBox", m = f.getAttribute("gradientTransform"), n = [];
                    h = "linearGradient" === f.nodeName || "LINEARGRADIENT" === f.nodeName ? "linear" : "radial",
                    "linear" === h ? i = c(f) : "radial" === h && (i = d(f));
                    for (var o = k.length; o--; )
                        n.push(b(k[o]));
                    j = e(g, i, l);
                    var p = new a.Gradient({
                        type: h,
                        coords: i,
                        colorStops: n,
                        offsetX: -g.left,
                        offsetY: -g.top
                    });
                    return (m || "" !== j) && (p.gradientTransform = a.parseTransformAttribute((m || "") + j)),
                    p
                },
                forObject: function(b, c) {
                    return c || (c = {}),
                    e(b, c.coords, "userSpaceOnUse"),
                    new a.Gradient(c)
                }
            })
        }(),
        function() {
            "use strict";
            if (a.StaticCanvas)
                return void a.warn("fabric.StaticCanvas is already defined.");
            var b = a.util.object.extend
              , c = a.util.getElementOffset
              , d = a.util.removeFromArray
              , e = a.util.toFixed
              , f = a.util.transformPoint
              , g = a.util.invertTransform
              , h = new Error("Could not initialize `canvas` element");
            a.StaticCanvas = a.util.createClass(a.CommonMethods, {
                initialize: function(a, b) {
                    b || (b = {}),
                    this._initStatic(a, b)
                },
                backgroundColor: "",
                backgroundImage: null,
                overlayColor: "",
                overlayImage: null,
                includeDefaultValues: !0,
                stateful: !1,
                renderOnAddRemove: !0,
                clipTo: null,
                controlsAboveOverlay: !1,
                allowTouchScrolling: !1,
                imageSmoothingEnabled: !0,
                viewportTransform: a.iMatrix.concat(),
                backgroundVpt: !0,
                overlayVpt: !0,
                onBeforeScaleRotate: function() {},
                enableRetinaScaling: !0,
                vptCoords: {},
                _initStatic: function(b, c) {
                    var d = a.StaticCanvas.prototype.renderAll.bind(this);
                    this._objects = [],
                    this._createLowerCanvas(b),
                    this._initOptions(c),
                    this._setImageSmoothing(),
                    this.interactive || this._initRetinaScaling(),
                    c.overlayImage && this.setOverlayImage(c.overlayImage, d),
                    c.backgroundImage && this.setBackgroundImage(c.backgroundImage, d),
                    c.backgroundColor && this.setBackgroundColor(c.backgroundColor, d),
                    c.overlayColor && this.setOverlayColor(c.overlayColor, d),
                    this.calcOffset()
                },
                _isRetinaScaling: function() {
                    return 1 !== a.devicePixelRatio && this.enableRetinaScaling
                },
                getRetinaScaling: function() {
                    return this._isRetinaScaling() ? a.devicePixelRatio : 1
                },
                _initRetinaScaling: function() {
                    this._isRetinaScaling() && (this.lowerCanvasEl.setAttribute("width", this.width * a.devicePixelRatio),
                    this.lowerCanvasEl.setAttribute("height", this.height * a.devicePixelRatio),
                    this.contextContainer.scale(a.devicePixelRatio, a.devicePixelRatio))
                },
                calcOffset: function() {
                    return this._offset = c(this.lowerCanvasEl),
                    this
                },
                setOverlayImage: function(a, b, c) {
                    return this.__setBgOverlayImage("overlayImage", a, b, c)
                },
                setBackgroundImage: function(a, b, c) {
                    return this.__setBgOverlayImage("backgroundImage", a, b, c)
                },
                setOverlayColor: function(a, b) {
                    return this.__setBgOverlayColor("overlayColor", a, b)
                },
                setBackgroundColor: function(a, b) {
                    return this.__setBgOverlayColor("backgroundColor", a, b)
                },
                _setImageSmoothing: function() {
                    var a = this.getContext();
                    a.imageSmoothingEnabled = a.imageSmoothingEnabled || a.webkitImageSmoothingEnabled || a.mozImageSmoothingEnabled || a.msImageSmoothingEnabled || a.oImageSmoothingEnabled,
                    a.imageSmoothingEnabled = this.imageSmoothingEnabled
                },
                __setBgOverlayImage: function(b, c, d, e) {
                    return "string" == typeof c ? a.util.loadImage(c, function(c) {
                        c && (this[b] = new a.Image(c,e)),
                        d && d(c)
                    }, this, e && e.crossOrigin) : (e && c.setOptions(e),
                    this[b] = c,
                    d && d(c)),
                    this
                },
                __setBgOverlayColor: function(a, b, c) {
                    return this[a] = b,
                    this._initGradient(b, a),
                    this._initPattern(b, a, c),
                    this
                },
                _createCanvasElement: function(b) {
                    var c = a.util.createCanvasElement(b);
                    if (c.style || (c.style = {}),
                    !c)
                        throw h;
                    if (void 0 === c.getContext)
                        throw h;
                    return c
                },
                _initOptions: function(a) {
                    this._setOptions(a),
                    this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0,
                    this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0,
                    this.lowerCanvasEl.style && (this.lowerCanvasEl.width = this.width,
                    this.lowerCanvasEl.height = this.height,
                    this.lowerCanvasEl.style.width = this.width + "px",
                    this.lowerCanvasEl.style.height = this.height + "px",
                    this.viewportTransform = this.viewportTransform.slice())
                },
                _createLowerCanvas: function(b) {
                    this.lowerCanvasEl = a.util.getById(b) || this._createCanvasElement(b),
                    a.util.addClass(this.lowerCanvasEl, "lower-canvas"),
                    this.interactive && this._applyCanvasStyle(this.lowerCanvasEl),
                    this.contextContainer = this.lowerCanvasEl.getContext("2d")
                },
                getWidth: function() {
                    return this.width
                },
                getHeight: function() {
                    return this.height
                },
                setWidth: function(a, b) {
                    return this.setDimensions({
                        width: a
                    }, b)
                },
                setHeight: function(a, b) {
                    return this.setDimensions({
                        height: a
                    }, b)
                },
                setDimensions: function(a, b) {
                    var c;
                    b = b || {};
                    for (var d in a)
                        c = a[d],
                        b.cssOnly || (this._setBackstoreDimension(d, a[d]),
                        c += "px"),
                        b.backstoreOnly || this._setCssDimension(d, c);
                    return this._initRetinaScaling(),
                    this._setImageSmoothing(),
                    this.calcOffset(),
                    b.cssOnly || this.renderAll(),
                    this
                },
                _setBackstoreDimension: function(a, b) {
                    return this.lowerCanvasEl[a] = b,
                    this.upperCanvasEl && (this.upperCanvasEl[a] = b),
                    this.cacheCanvasEl && (this.cacheCanvasEl[a] = b),
                    this[a] = b,
                    this
                },
                _setCssDimension: function(a, b) {
                    return this.lowerCanvasEl.style[a] = b,
                    this.upperCanvasEl && (this.upperCanvasEl.style[a] = b),
                    this.wrapperEl && (this.wrapperEl.style[a] = b),
                    this
                },
                getZoom: function() {
                    return this.viewportTransform[0]
                },
                setViewportTransform: function(a) {
                    var b, c = this._activeGroup;
                    this.viewportTransform = a;
                    for (var d = 0, e = this._objects.length; d < e; d++)
                        b = this._objects[d],
                        b.group || b.setCoords(!1, !0);
                    return c && c.setCoords(!1, !0),
                    this.calcViewportBoundaries(),
                    this.renderAll(),
                    this
                },
                zoomToPoint: function(a, b) {
                    var c = a
                      , d = this.viewportTransform.slice(0);
                    a = f(a, g(this.viewportTransform)),
                    d[0] = b,
                    d[3] = b;
                    var e = f(a, d);
                    return d[4] += c.x - e.x,
                    d[5] += c.y - e.y,
                    this.setViewportTransform(d)
                },
                setZoom: function(b) {
                    return this.zoomToPoint(new a.Point(0,0), b),
                    this
                },
                absolutePan: function(a) {
                    var b = this.viewportTransform.slice(0);
                    return b[4] = -a.x,
                    b[5] = -a.y,
                    this.setViewportTransform(b)
                },
                relativePan: function(b) {
                    return this.absolutePan(new a.Point(-b.x - this.viewportTransform[4],-b.y - this.viewportTransform[5]))
                },
                getElement: function() {
                    return this.lowerCanvasEl
                },
                _onObjectAdded: function(a) {
                    this.stateful && a.setupState(),
                    a._set("canvas", this),
                    a.setCoords(),
                    this.fire("object:added", {
                        target: a
                    }),
                    a.fire("added")
                },
                _onObjectRemoved: function(a) {
                    this.fire("object:removed", {
                        target: a
                    }),
                    a.fire("removed"),
                    delete a.canvas
                },
                clearContext: function(a) {
                    return a.clearRect(0, 0, this.width, this.height),
                    this
                },
                getContext: function() {
                    return this.contextContainer
                },
                clear: function() {
                    return this._objects.length = 0,
                    this.backgroundImage = null,
                    this.overlayImage = null,
                    this.backgroundColor = "",
                    this.overlayColor = "",
                    this._hasITextHandlers && (this.off("mouse:up", this._mouseUpITextHandler),
                    this._iTextInstances = null,
                    this._hasITextHandlers = !1),
                    this.clearContext(this.contextContainer),
                    this.fire("canvas:cleared"),
                    this.renderAll(),
                    this
                },
                renderAll: function() {
                    var a = this.contextContainer;
                    return this.renderCanvas(a, this._objects),
                    this
                },
                calcViewportBoundaries: function() {
                    var b = {}
                      , c = this.getWidth()
                      , d = this.getHeight()
                      , e = g(this.viewportTransform);
                    return b.tl = f({
                        x: 0,
                        y: 0
                    }, e),
                    b.br = f({
                        x: c,
                        y: d
                    }, e),
                    b.tr = new a.Point(b.br.x,b.tl.y),
                    b.bl = new a.Point(b.tl.x,b.br.y),
                    this.vptCoords = b,
                    b
                },
                renderCanvas: function(b, c) {
                    this.calcViewportBoundaries(),
                    this.clearContext(b),
                    this.fire("before:render"),
                    this.clipTo && a.util.clipContext(this, b),
                    this._renderBackground(b),
                    b.save(),
                    b.transform.apply(b, this.viewportTransform),
                    this._renderObjects(b, c),
                    b.restore(),
                    !this.controlsAboveOverlay && this.interactive && this.drawControls(b),
                    this.clipTo && b.restore(),
                    this._renderOverlay(b),
                    this.controlsAboveOverlay && this.interactive && this.drawControls(b),
                    this.fire("after:render")
                },
                _renderObjects: function(a, b) {
                    for (var c = 0, d = b.length; c < d; ++c)
                        b[c] && b[c].render(a)
                },
                _renderBackgroundOrOverlay: function(a, b) {
                    var c = this[b + "Color"];
                    c && (a.fillStyle = c.toLive ? c.toLive(a, this) : c,
                    a.fillRect(c.offsetX || 0, c.offsetY || 0, this.width, this.height)),
                    (c = this[b + "Image"]) && (this[b + "Vpt"] && (a.save(),
                    a.transform.apply(a, this.viewportTransform)),
                    c.render(a),
                    this[b + "Vpt"] && a.restore())
                },
                _renderBackground: function(a) {
                    this._renderBackgroundOrOverlay(a, "background")
                },
                _renderOverlay: function(a) {
                    this._renderBackgroundOrOverlay(a, "overlay")
                },
                getCenter: function() {
                    return {
                        top: this.getHeight() / 2,
                        left: this.getWidth() / 2
                    }
                },
                centerObjectH: function(b) {
                    return this._centerObject(b, new a.Point(this.getCenter().left,b.getCenterPoint().y))
                },
                centerObjectV: function(b) {
                    return this._centerObject(b, new a.Point(b.getCenterPoint().x,this.getCenter().top))
                },
                centerObject: function(b) {
                    var c = this.getCenter();
                    return this._centerObject(b, new a.Point(c.left,c.top))
                },
                viewportCenterObject: function(a) {
                    var b = this.getVpCenter();
                    return this._centerObject(a, b)
                },
                viewportCenterObjectH: function(b) {
                    var c = this.getVpCenter();
                    return this._centerObject(b, new a.Point(c.x,b.getCenterPoint().y)),
                    this
                },
                viewportCenterObjectV: function(b) {
                    var c = this.getVpCenter();
                    return this._centerObject(b, new a.Point(b.getCenterPoint().x,c.y))
                },
                getVpCenter: function() {
                    var a = this.getCenter()
                      , b = g(this.viewportTransform);
                    return f({
                        x: a.left,
                        y: a.top
                    }, b)
                },
                _centerObject: function(a, b) {
                    return a.setPositionByOrigin(b, "center", "center"),
                    this.renderAll(),
                    this
                },
                toDatalessJSON: function(a) {
                    return this.toDatalessObject(a)
                },
                toObject: function(a) {
                    return this._toObjectMethod("toObject", a)
                },
                toDatalessObject: function(a) {
                    return this._toObjectMethod("toDatalessObject", a)
                },
                _toObjectMethod: function(c, d) {
                    var e = {
                        objects: this._toObjects(c, d)
                    };
                    return b(e, this.__serializeBgOverlay(c, d)),
                    a.util.populateWithProperties(this, e, d),
                    e
                },
                _toObjects: function(a, b) {
                    return this.getObjects().filter(function(a) {
                        return !a.excludeFromExport
                    }).map(function(c) {
                        return this._toObject(c, a, b)
                    }, this)
                },
                _toObject: function(a, b, c) {
                    var d;
                    this.includeDefaultValues || (d = a.includeDefaultValues,
                    a.includeDefaultValues = !1);
                    var e = a[b](c);
                    return this.includeDefaultValues || (a.includeDefaultValues = d),
                    e
                },
                __serializeBgOverlay: function(a, b) {
                    var c = {};
                    return this.backgroundColor && (c.background = this.backgroundColor.toObject ? this.backgroundColor.toObject(b) : this.backgroundColor),
                    this.overlayColor && (c.overlay = this.overlayColor.toObject ? this.overlayColor.toObject(b) : this.overlayColor),
                    this.backgroundImage && (c.backgroundImage = this._toObject(this.backgroundImage, a, b)),
                    this.overlayImage && (c.overlayImage = this._toObject(this.overlayImage, a, b)),
                    c
                },
                svgViewportTransformation: !0,
                toSVG: function(a, b) {
                    a || (a = {});
                    var c = [];
                    return this._setSVGPreamble(c, a),
                    this._setSVGHeader(c, a),
                    this._setSVGBgOverlayColor(c, "backgroundColor"),
                    this._setSVGBgOverlayImage(c, "backgroundImage", b),
                    this._setSVGObjects(c, b),
                    this._setSVGBgOverlayColor(c, "overlayColor"),
                    this._setSVGBgOverlayImage(c, "overlayImage", b),
                    c.push("</svg>"),
                    c.join("")
                },
                _setSVGPreamble: function(a, b) {
                    b.suppressPreamble || a.push('<?xml version="1.0" encoding="', b.encoding || "UTF-8", '" standalone="no" ?>\n', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')
                },
                _setSVGHeader: function(b, c) {
                    var d, f = c.width || this.width, g = c.height || this.height, h = 'viewBox="0 0 ' + this.width + " " + this.height + '" ', i = a.Object.NUM_FRACTION_DIGITS;
                    c.viewBox ? h = 'viewBox="' + c.viewBox.x + " " + c.viewBox.y + " " + c.viewBox.width + " " + c.viewBox.height + '" ' : this.svgViewportTransformation && (d = this.viewportTransform,
                    h = 'viewBox="' + e(-d[4] / d[0], i) + " " + e(-d[5] / d[3], i) + " " + e(this.width / d[0], i) + " " + e(this.height / d[3], i) + '" '),
                    b.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', f, '" ', 'height="', g, '" ', h, 'xml:space="preserve">\n', "<desc>Created with Fabric.js ", a.version, "</desc>\n", "<defs>\n", this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), "</defs>\n")
                },
                createSVGRefElementsMarkup: function() {
                    var a = this;
                    return ["backgroundColor", "overlayColor"].map(function(b) {
                        var c = a[b];
                        if (c && c.toLive)
                            return c.toSVG(a, !1)
                    }).join("")
                },
                createSVGFontFacesMarkup: function() {
                    for (var b, c, d, e, f, g, h, i = "", j = {}, k = a.fontPaths, l = this.getObjects(), m = 0, n = l.length; m < n; m++)
                        if (b = l[m],
                        c = b.fontFamily,
                        -1 !== b.type.indexOf("text") && !j[c] && k[c] && (j[c] = !0,
                        b.styles)) {
                            d = b.styles;
                            for (f in d) {
                                e = d[f];
                                for (h in e)
                                    g = e[h],
                                    c = g.fontFamily,
                                    !j[c] && k[c] && (j[c] = !0)
                            }
                        }
                    for (var o in j)
                        i += ["\t\t@font-face {\n", "\t\t\tfont-family: '", o, "';\n", "\t\t\tsrc: url('", k[o], "');\n", "\t\t}\n"].join("");
                    return i && (i = ['\t<style type="text/css">', "<![CDATA[\n", i, "]]>", "</style>\n"].join("")),
                    i
                },
                _setSVGObjects: function(a, b) {
                    for (var c, d = 0, e = this.getObjects(), f = e.length; d < f; d++)
                        c = e[d],
                        c.excludeFromExport || this._setSVGObject(a, c, b)
                },
                _setSVGObject: function(a, b, c) {
                    a.push(b.toSVG(c))
                },
                _setSVGBgOverlayImage: function(a, b, c) {
                    this[b] && this[b].toSVG && a.push(this[b].toSVG(c))
                },
                _setSVGBgOverlayColor: function(a, b) {
                    var c = this[b];
                    if (c)
                        if (c.toLive) {
                            var d = c.repeat;
                            a.push('<rect transform="translate(', this.width / 2, ",", this.height / 2, ')"', ' x="', c.offsetX - this.width / 2, '" y="', c.offsetY - this.height / 2, '" ', 'width="', "repeat-y" === d || "no-repeat" === d ? c.source.width : this.width, '" height="', "repeat-x" === d || "no-repeat" === d ? c.source.height : this.height, '" fill="url(#SVGID_' + c.id + ')"', "></rect>\n")
                        } else
                            a.push('<rect x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" fill="', this[b], '"', "></rect>\n")
                },
                sendToBack: function(a) {
                    if (!a)
                        return this;
                    var b, c, e, f = this._activeGroup;
                    if (a === f)
                        for (e = f._objects,
                        b = e.length; b--; )
                            c = e[b],
                            d(this._objects, c),
                            this._objects.unshift(c);
                    else
                        d(this._objects, a),
                        this._objects.unshift(a);
                    return this.renderAll && this.renderAll()
                },
                bringToFront: function(a) {
                    if (!a)
                        return this;
                    var b, c, e, f = this._activeGroup;
                    if (a === f)
                        for (e = f._objects,
                        b = 0; b < e.length; b++)
                            c = e[b],
                            d(this._objects, c),
                            this._objects.push(c);
                    else
                        d(this._objects, a),
                        this._objects.push(a);
                    return this.renderAll && this.renderAll()
                },
                sendBackwards: function(a, b) {
                    if (!a)
                        return this;
                    var c, e, f, g, h, i = this._activeGroup;
                    if (a === i)
                        for (h = i._objects,
                        c = 0; c < h.length; c++)
                            e = h[c],
                            0 !== (f = this._objects.indexOf(e)) && (g = f - 1,
                            d(this._objects, e),
                            this._objects.splice(g, 0, e));
                    else
                        0 !== (f = this._objects.indexOf(a)) && (g = this._findNewLowerIndex(a, f, b),
                        d(this._objects, a),
                        this._objects.splice(g, 0, a));
                    return this.renderAll && this.renderAll(),
                    this
                },
                _findNewLowerIndex: function(a, b, c) {
                    var d;
                    if (c) {
                        d = b;
                        for (var e = b - 1; e >= 0; --e) {
                            if (a.intersectsWithObject(this._objects[e]) || a.isContainedWithinObject(this._objects[e]) || this._objects[e].isContainedWithinObject(a)) {
                                d = e;
                                break
                            }
                        }
                    } else
                        d = b - 1;
                    return d
                },
                bringForward: function(a, b) {
                    if (!a)
                        return this;
                    var c, e, f, g, h, i = this._activeGroup;
                    if (a === i)
                        for (h = i._objects,
                        c = h.length; c--; )
                            e = h[c],
                            (f = this._objects.indexOf(e)) !== this._objects.length - 1 && (g = f + 1,
                            d(this._objects, e),
                            this._objects.splice(g, 0, e));
                    else
                        (f = this._objects.indexOf(a)) !== this._objects.length - 1 && (g = this._findNewUpperIndex(a, f, b),
                        d(this._objects, a),
                        this._objects.splice(g, 0, a));
                    return this.renderAll && this.renderAll(),
                    this
                },
                _findNewUpperIndex: function(a, b, c) {
                    var d;
                    if (c) {
                        d = b;
                        for (var e = b + 1; e < this._objects.length; ++e) {
                            if (a.intersectsWithObject(this._objects[e]) || a.isContainedWithinObject(this._objects[e]) || this._objects[e].isContainedWithinObject(a)) {
                                d = e;
                                break
                            }
                        }
                    } else
                        d = b + 1;
                    return d
                },
                moveTo: function(a, b) {
                    return d(this._objects, a),
                    this._objects.splice(b, 0, a),
                    this.renderAll && this.renderAll()
                },
                dispose: function() {
                    return this.clear(),
                    this
                },
                toString: function() {
                    return "#<fabric.Canvas (" + this.complexity() + "): { objects: " + this.getObjects().length + " }>"
                }
            }),
            b(a.StaticCanvas.prototype, a.Observable),
            b(a.StaticCanvas.prototype, a.Collection),
            b(a.StaticCanvas.prototype, a.DataURLExporter),
            b(a.StaticCanvas, {
                EMPTY_JSON: '{"objects": [], "background": "white"}',
                supports: function(b) {
                    var c = a.util.createCanvasElement();
                    if (!c || !c.getContext)
                        return null;
                    var d = c.getContext("2d");
                    if (!d)
                        return null;
                    switch (b) {
                    case "getImageData":
                        return void 0 !== d.getImageData;
                    case "setLineDash":
                        return void 0 !== d.setLineDash;
                    case "toDataURL":
                        return void 0 !== c.toDataURL;
                    case "toDataURLWithQuality":
                        try {
                            return c.toDataURL("image/jpeg", 0),
                            !0
                        } catch (a) {}
                        return !1;
                    default:
                        return null
                    }
                }
            }),
            a.StaticCanvas.prototype.toJSON = a.StaticCanvas.prototype.toObject
        }(),
        function() {
            var b = a.util.getPointer
              , c = a.util.degreesToRadians
              , d = a.util.radiansToDegrees
              , e = Math.atan2
              , f = Math.abs
              , g = a.StaticCanvas.supports("setLineDash");
            a.Canvas = a.util.createClass(a.StaticCanvas, {
                initialize: function(a, b) {
                    b || (b = {}),
                    this._initStatic(a, b),
                    this._initInteractive(),
                    this._createCacheCanvas()
                },
                uniScaleTransform: !1,
                uniScaleKey: "shiftKey",
                centeredScaling: !1,
                centeredRotation: !1,
                centeredKey: "altKey",
                altActionKey: "shiftKey",
                interactive: !0,
                selection: !0,
                selectionKey: "shiftKey",
                altSelectionKey: null,
                selectionColor: "rgba(100, 100, 255, 0.3)",
                selectionDashArray: [],
                selectionBorderColor: "rgba(255, 255, 255, 0.3)",
                selectionLineWidth: 1,
                hoverCursor: "move",
                moveCursor: "move",
                defaultCursor: "default",
                freeDrawingCursor: "crosshair",
                rotationCursor: "crosshair",
                containerClass: "canvas-container",
                perPixelTargetFind: !1,
                targetFindTolerance: 0,
                skipTargetFind: !1,
                isDrawingMode: !1,
                preserveObjectStacking: !1,
                snapAngle: 0,
                snapThreshold: null,
                stopContextMenu: !1,
                fireRightClick: !1,
                _initInteractive: function() {
                    this._currentTransform = null,
                    this._groupSelector = null,
                    this._initWrapperElement(),
                    this._createUpperCanvas(),
                    this._initEventListeners(),
                    this._initRetinaScaling(),
                    this.freeDrawingBrush = a.PencilBrush && new a.PencilBrush(this),
                    this.calcOffset()
                },
                _chooseObjectsToRender: function() {
                    var a, b = this.getActiveGroup(), c = this.getActiveObject(), d = [], e = [];
                    if (!b && !c || this.preserveObjectStacking)
                        d = this._objects;
                    else {
                        for (var f = 0, g = this._objects.length; f < g; f++)
                            a = this._objects[f],
                            b && b.contains(a) || a === c ? e.push(a) : d.push(a);
                        b && (b._set("_objects", e),
                        d.push(b)),
                        c && d.push(c)
                    }
                    return d
                },
                renderAll: function() {
                    !this.contextTopDirty || this._groupSelector || this.isDrawingMode || (this.clearContext(this.contextTop),
                    this.contextTopDirty = !1);
                    var a = this.contextContainer;
                    return this.renderCanvas(a, this._chooseObjectsToRender()),
                    this
                },
                renderTop: function() {
                    var a = this.contextTop;
                    return this.clearContext(a),
                    this.selection && this._groupSelector && this._drawSelection(a),
                    this.fire("after:render"),
                    this.contextTopDirty = !0,
                    this
                },
                _resetCurrentTransform: function() {
                    var a = this._currentTransform;
                    a.target.set({
                        scaleX: a.original.scaleX,
                        scaleY: a.original.scaleY,
                        skewX: a.original.skewX,
                        skewY: a.original.skewY,
                        left: a.original.left,
                        top: a.original.top
                    }),
                    this._shouldCenterTransform(a.target) ? "rotate" === a.action ? this._setOriginToCenter(a.target) : ("center" !== a.originX && ("right" === a.originX ? a.mouseXSign = -1 : a.mouseXSign = 1),
                    "center" !== a.originY && ("bottom" === a.originY ? a.mouseYSign = -1 : a.mouseYSign = 1),
                    a.originX = "center",
                    a.originY = "center") : (a.originX = a.original.originX,
                    a.originY = a.original.originY)
                },
                containsPoint: function(a, b, c) {
                    var d, e = c || this.getPointer(a, !0);
                    return d = b.group && b.group === this.getActiveGroup() ? this._normalizePointer(b.group, e) : {
                        x: e.x,
                        y: e.y
                    },
                    b.containsPoint(d) || b._findTargetCorner(e)
                },
                _normalizePointer: function(b, c) {
                    var d = b.calcTransformMatrix()
                      , e = a.util.invertTransform(d)
                      , f = this.restorePointerVpt(c);
                    return a.util.transformPoint(f, e)
                },
                isTargetTransparent: function(b, c, d) {
                    var e = b.hasBorders
                      , f = b.transparentCorners
                      , g = this.contextCache
                      , h = b.selectionBackgroundColor;
                    b.hasBorders = b.transparentCorners = !1,
                    b.selectionBackgroundColor = "",
                    g.save(),
                    g.transform.apply(g, this.viewportTransform),
                    b.render(g),
                    g.restore(),
                    b.active && b._renderControls(g),
                    b.hasBorders = e,
                    b.transparentCorners = f,
                    b.selectionBackgroundColor = h;
                    var i = a.util.isTransparent(g, c, d, this.targetFindTolerance);
                    return this.clearContext(g),
                    i
                },
                _shouldClearSelection: function(a, b) {
                    var c = this.getActiveGroup()
                      , d = this.getActiveObject();
                    return !b || b && c && !c.contains(b) && c !== b && !a[this.selectionKey] || b && !b.evented || b && !b.selectable && d && d !== b
                },
                _shouldCenterTransform: function(a) {
                    if (a) {
                        var b, c = this._currentTransform;
                        return "scale" === c.action || "scaleX" === c.action || "scaleY" === c.action ? b = this.centeredScaling || a.centeredScaling : "rotate" === c.action && (b = this.centeredRotation || a.centeredRotation),
                        b ? !c.altKey : c.altKey
                    }
                },
                _getOriginFromCorner: function(a, b) {
                    var c = {
                        x: a.originX,
                        y: a.originY
                    };
                    return "ml" === b || "tl" === b || "bl" === b ? c.x = "right" : "mr" !== b && "tr" !== b && "br" !== b || (c.x = "left"),
                    "tl" === b || "mt" === b || "tr" === b ? c.y = "bottom" : "bl" !== b && "mb" !== b && "br" !== b || (c.y = "top"),
                    c
                },
                _getActionFromCorner: function(a, b, c) {
                    if (!b)
                        return "drag";
                    switch (b) {
                    case "mtr":
                        return "rotate";
                    case "ml":
                    case "mr":
                        return c[this.altActionKey] ? "skewY" : "scaleX";
                    case "mt":
                    case "mb":
                        return c[this.altActionKey] ? "skewX" : "scaleY";
                    default:
                        return "scale"
                    }
                },
                _setupCurrentTransform: function(a, b) {
                    if (b) {
                        var d = this.getPointer(a)
                          , e = b._findTargetCorner(this.getPointer(a, !0))
                          , f = this._getActionFromCorner(b, e, a)
                          , g = this._getOriginFromCorner(b, e);
                        this._currentTransform = {
                            target: b,
                            action: f,
                            corner: e,
                            scaleX: b.scaleX,
                            scaleY: b.scaleY,
                            skewX: b.skewX,
                            skewY: b.skewY,
                            offsetX: d.x - b.left,
                            offsetY: d.y - b.top,
                            originX: g.x,
                            originY: g.y,
                            ex: d.x,
                            ey: d.y,
                            lastX: d.x,
                            lastY: d.y,
                            left: b.left,
                            top: b.top,
                            theta: c(b.angle),
                            width: b.width * b.scaleX,
                            mouseXSign: 1,
                            mouseYSign: 1,
                            shiftKey: a.shiftKey,
                            altKey: a[this.centeredKey]
                        },
                        this._currentTransform.original = {
                            left: b.left,
                            top: b.top,
                            scaleX: b.scaleX,
                            scaleY: b.scaleY,
                            skewX: b.skewX,
                            skewY: b.skewY,
                            originX: g.x,
                            originY: g.y
                        },
                        this._resetCurrentTransform()
                    }
                },
                _translateObject: function(a, b) {
                    var c = this._currentTransform
                      , d = c.target
                      , e = a - c.offsetX
                      , f = b - c.offsetY
                      , g = !d.get("lockMovementX") && d.left !== e
                      , h = !d.get("lockMovementY") && d.top !== f;
                    return g && d.set("left", e),
                    h && d.set("top", f),
                    g || h
                },
                _changeSkewTransformOrigin: function(a, b, c) {
                    var d = "originX"
                      , e = {
                        0: "center"
                    }
                      , f = b.target.skewX
                      , g = "left"
                      , h = "right"
                      , i = "mt" === b.corner || "ml" === b.corner ? 1 : -1
                      , j = 1;
                    a = a > 0 ? 1 : -1,
                    "y" === c && (f = b.target.skewY,
                    g = "top",
                    h = "bottom",
                    d = "originY"),
                    e[-1] = g,
                    e[1] = h,
                    b.target.flipX && (j *= -1),
                    b.target.flipY && (j *= -1),
                    0 === f ? (b.skewSign = -i * a * j,
                    b[d] = e[-a]) : (f = f > 0 ? 1 : -1,
                    b.skewSign = f,
                    b[d] = e[f * i * j])
                },
                _skewObject: function(b, c, d) {
                    var e = this._currentTransform
                      , f = e.target
                      , g = !1
                      , h = f.get("lockSkewingX")
                      , i = f.get("lockSkewingY");
                    if (h && "x" === d || i && "y" === d)
                        return !1;
                    var j, k, l = f.getCenterPoint(), m = f.toLocalPoint(new a.Point(b,c), "center", "center")[d], n = f.toLocalPoint(new a.Point(e.lastX,e.lastY), "center", "center")[d], o = f._getTransformedDimensions();
                    return this._changeSkewTransformOrigin(m - n, e, d),
                    j = f.toLocalPoint(new a.Point(b,c), e.originX, e.originY)[d],
                    k = f.translateToOriginPoint(l, e.originX, e.originY),
                    g = this._setObjectSkew(j, e, d, o),
                    e.lastX = b,
                    e.lastY = c,
                    f.setPositionByOrigin(k, e.originX, e.originY),
                    g
                },
                _setObjectSkew: function(b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o = c.target, p = !1, q = c.skewSign;
                    return "x" === d ? (i = "y",
                    j = "Y",
                    k = "X",
                    m = 0,
                    n = o.skewY) : (i = "x",
                    j = "X",
                    k = "Y",
                    m = o.skewX,
                    n = 0),
                    h = o._getTransformedDimensions(m, n),
                    l = 2 * Math.abs(b) - h[d],
                    l <= 2 ? f = 0 : (f = q * Math.atan(l / o["scale" + k] / (h[i] / o["scale" + j])),
                    f = a.util.radiansToDegrees(f)),
                    p = o["skew" + k] !== f,
                    o.set("skew" + k, f),
                    0 !== o["skew" + j] && (g = o._getTransformedDimensions(),
                    f = e[i] / g[i] * o["scale" + j],
                    o.set("scale" + j, f)),
                    p
                },
                _scaleObject: function(b, c, d) {
                    var e = this._currentTransform
                      , f = e.target
                      , g = f.get("lockScalingX")
                      , h = f.get("lockScalingY")
                      , i = f.get("lockScalingFlip");
                    if (g && h)
                        return !1;
                    var j = f.translateToOriginPoint(f.getCenterPoint(), e.originX, e.originY)
                      , k = f.toLocalPoint(new a.Point(b,c), e.originX, e.originY)
                      , l = f._getTransformedDimensions()
                      , m = !1;
                    return this._setLocalMouse(k, e),
                    m = this._setObjectScale(k, e, g, h, d, i, l),
                    f.setPositionByOrigin(j, e.originX, e.originY),
                    m
                },
                _setObjectScale: function(a, b, c, d, e, f, g) {
                    var h, i, j, k, l = b.target, m = !1, n = !1, o = !1;
                    return j = a.x * l.scaleX / g.x,
                    k = a.y * l.scaleY / g.y,
                    h = l.scaleX !== j,
                    i = l.scaleY !== k,
                    f && j <= 0 && j < l.scaleX && (m = !0),
                    f && k <= 0 && k < l.scaleY && (n = !0),
                    "equally" !== e || c || d ? e ? "x" !== e || l.get("lockUniScaling") ? "y" !== e || l.get("lockUniScaling") || n || d || l.set("scaleY", k) && (o = o || i) : m || c || l.set("scaleX", j) && (o = o || h) : (m || c || l.set("scaleX", j) && (o = o || h),
                    n || d || l.set("scaleY", k) && (o = o || i)) : m || n || (o = this._scaleObjectEqually(a, l, b, g)),
                    b.newScaleX = j,
                    b.newScaleY = k,
                    m || n || this._flipObject(b, e),
                    o
                },
                _scaleObjectEqually: function(a, b, c, d) {
                    var e, f = a.y + a.x, g = d.y * c.original.scaleY / b.scaleY + d.x * c.original.scaleX / b.scaleX;
                    return c.newScaleX = c.original.scaleX * f / g,
                    c.newScaleY = c.original.scaleY * f / g,
                    e = c.newScaleX !== b.scaleX || c.newScaleY !== b.scaleY,
                    b.set("scaleX", c.newScaleX),
                    b.set("scaleY", c.newScaleY),
                    e
                },
                _flipObject: function(a, b) {
                    a.newScaleX < 0 && "y" !== b && ("left" === a.originX ? a.originX = "right" : "right" === a.originX && (a.originX = "left")),
                    a.newScaleY < 0 && "x" !== b && ("top" === a.originY ? a.originY = "bottom" : "bottom" === a.originY && (a.originY = "top"))
                },
                _setLocalMouse: function(a, b) {
                    var c = b.target
                      , d = this.getZoom()
                      , e = c.padding / d;
                    "right" === b.originX ? a.x *= -1 : "center" === b.originX && (a.x *= 2 * b.mouseXSign,
                    a.x < 0 && (b.mouseXSign = -b.mouseXSign)),
                    "bottom" === b.originY ? a.y *= -1 : "center" === b.originY && (a.y *= 2 * b.mouseYSign,
                    a.y < 0 && (b.mouseYSign = -b.mouseYSign)),
                    f(a.x) > e ? a.x < 0 ? a.x += e : a.x -= e : a.x = 0,
                    f(a.y) > e ? a.y < 0 ? a.y += e : a.y -= e : a.y = 0
                },
                _rotateObject: function(a, b) {
                    var c = this._currentTransform;
                    if (c.target.get("lockRotation"))
                        return !1;
                    var f = e(c.ey - c.top, c.ex - c.left)
                      , g = e(b - c.top, a - c.left)
                      , h = d(g - f + c.theta)
                      , i = !0;
                    if (h < 0 && (h = 360 + h),
                    h %= 360,
                    c.target.snapAngle > 0) {
                        var j = c.target.snapAngle
                          , k = c.target.snapThreshold || j
                          , l = Math.ceil(h / j) * j
                          , m = Math.floor(h / j) * j;
                        Math.abs(h - m) < k ? h = m : Math.abs(h - l) < k && (h = l),
                        c.target.angle === h && (i = !1)
                    }
                    return c.target.angle = h,
                    i
                },
                setCursor: function(a) {
                    this.upperCanvasEl.style.cursor = a
                },
                _resetObjectTransform: function(a) {
                    a.scaleX = 1,
                    a.scaleY = 1,
                    a.skewX = 0,
                    a.skewY = 0,
                    a.setAngle(0)
                },
                _drawSelection: function(b) {
                    var c = this._groupSelector
                      , d = c.left
                      , e = c.top
                      , h = f(d)
                      , i = f(e);
                    if (this.selectionColor && (b.fillStyle = this.selectionColor,
                    b.fillRect(c.ex - (d > 0 ? 0 : -d), c.ey - (e > 0 ? 0 : -e), h, i)),
                    this.selectionLineWidth && this.selectionBorderColor)
                        if (b.lineWidth = this.selectionLineWidth,
                        b.strokeStyle = this.selectionBorderColor,
                        this.selectionDashArray.length > 1 && !g) {
                            var j = c.ex + .5 - (d > 0 ? 0 : h)
                              , k = c.ey + .5 - (e > 0 ? 0 : i);
                            b.beginPath(),
                            a.util.drawDashedLine(b, j, k, j + h, k, this.selectionDashArray),
                            a.util.drawDashedLine(b, j, k + i - 1, j + h, k + i - 1, this.selectionDashArray),
                            a.util.drawDashedLine(b, j, k, j, k + i, this.selectionDashArray),
                            a.util.drawDashedLine(b, j + h - 1, k, j + h - 1, k + i, this.selectionDashArray),
                            b.closePath(),
                            b.stroke()
                        } else
                            a.Object.prototype._setLineDash.call(this, b, this.selectionDashArray),
                            b.strokeRect(c.ex + .5 - (d > 0 ? 0 : h), c.ey + .5 - (e > 0 ? 0 : i), h, i)
                },
                findTarget: function(a, b) {
                    if (!this.skipTargetFind) {
                        var c, d = this.getPointer(a, !0), e = this.getActiveGroup(), f = this.getActiveObject();
                        if (e && !b && e === this._searchPossibleTargets([e], d))
                            return this._fireOverOutEvents(e, a),
                            e;
                        if (f && f._findTargetCorner(d))
                            return this._fireOverOutEvents(f, a),
                            f;
                        if (f && f === this._searchPossibleTargets([f], d)) {
                            if (!this.preserveObjectStacking)
                                return this._fireOverOutEvents(f, a),
                                f;
                            c = f
                        }
                        this.targets = [];
                        var g = this._searchPossibleTargets(this._objects, d);
                        return a[this.altSelectionKey] && g && c && g !== c && (g = c),
                        this._fireOverOutEvents(g, a),
                        g
                    }
                },
                _fireOverOutEvents: function(a, b) {
                    a ? this._hoveredTarget !== a && (this._hoveredTarget && (this.fire("mouse:out", {
                        target: this._hoveredTarget,
                        e: b
                    }),
                    this._hoveredTarget.fire("mouseout")),
                    this.fire("mouse:over", {
                        target: a,
                        e: b
                    }),
                    a.fire("mouseover"),
                    this._hoveredTarget = a) : this._hoveredTarget && (this.fire("mouse:out", {
                        target: this._hoveredTarget,
                        e: b
                    }),
                    this._hoveredTarget.fire("mouseout"),
                    this._hoveredTarget = null)
                },
                _checkTarget: function(a, b) {
                    if (b && b.visible && b.evented && this.containsPoint(null, b, a)) {
                        if (!this.perPixelTargetFind && !b.perPixelTargetFind || b.isEditing)
                            return !0;
                        if (!this.isTargetTransparent(b, a.x, a.y))
                            return !0
                    }
                },
                _searchPossibleTargets: function(a, b) {
                    for (var c, d, e, f = a.length; f--; )
                        if (this._checkTarget(b, a[f])) {
                            c = a[f],
                            "group" === c.type && c.subTargetCheck && (d = this._normalizePointer(c, b),
                            (e = this._searchPossibleTargets(c._objects, d)) && this.targets.push(e));
                            break
                        }
                    return c
                },
                restorePointerVpt: function(b) {
                    return a.util.transformPoint(b, a.util.invertTransform(this.viewportTransform))
                },
                getPointer: function(a, c, d) {
                    d || (d = this.upperCanvasEl);
                    var e, f = b(a), g = d.getBoundingClientRect(), h = g.width || 0, i = g.height || 0;
                    return h && i || ("top"in g && "bottom"in g && (i = Math.abs(g.top - g.bottom)),
                    "right"in g && "left"in g && (h = Math.abs(g.right - g.left))),
                    this.calcOffset(),
                    f.x = f.x - this._offset.left,
                    f.y = f.y - this._offset.top,
                    c || (f = this.restorePointerVpt(f)),
                    e = 0 === h || 0 === i ? {
                        width: 1,
                        height: 1
                    } : {
                        width: d.width / h,
                        height: d.height / i
                    },
                    {
                        x: f.x * e.width,
                        y: f.y * e.height
                    }
                },
                _createUpperCanvas: function() {
                    var b = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, "");
                    this.upperCanvasEl = this._createCanvasElement(),
                    a.util.addClass(this.upperCanvasEl, "upper-canvas " + b),
                    this.wrapperEl.appendChild(this.upperCanvasEl),
                    this._copyCanvasStyle(this.lowerCanvasEl, this.upperCanvasEl),
                    this._applyCanvasStyle(this.upperCanvasEl),
                    this.contextTop = this.upperCanvasEl.getContext("2d")
                },
                _createCacheCanvas: function() {
                    this.cacheCanvasEl = this._createCanvasElement(),
                    this.cacheCanvasEl.setAttribute("width", this.width),
                    this.cacheCanvasEl.setAttribute("height", this.height),
                    this.contextCache = this.cacheCanvasEl.getContext("2d")
                },
                _initWrapperElement: function() {
                    this.wrapperEl = a.util.wrapElement(this.lowerCanvasEl, "div", {
                        class: this.containerClass
                    }),
                    a.util.setStyle(this.wrapperEl, {
                        width: this.getWidth() + "px",
                        height: this.getHeight() + "px",
                        position: "relative"
                    }),
                    a.util.makeElementUnselectable(this.wrapperEl)
                },
                _applyCanvasStyle: function(b) {
                    var c = this.getWidth() || b.width
                      , d = this.getHeight() || b.height;
                    a.util.setStyle(b, {
                        position: "absolute",
                        width: c + "px",
                        height: d + "px",
                        left: 0,
                        top: 0,
                        "touch-action": "none"
                    }),
                    b.width = c,
                    b.height = d,
                    a.util.makeElementUnselectable(b)
                },
                _copyCanvasStyle: function(a, b) {
                    b.style.cssText = a.style.cssText
                },
                getSelectionContext: function() {
                    return this.contextTop
                },
                getSelectionElement: function() {
                    return this.upperCanvasEl
                },
                _setActiveObject: function(a) {
                    var b = this._activeObject;
                    b && (b.set("active", !1),
                    a !== b && b.onDeselect && "function" == typeof b.onDeselect && b.onDeselect()),
                    this._activeObject = a,
                    a.set("active", !0)
                },
                setActiveObject: function(a, b) {
                    var c = this.getActiveObject();
                    return c && c !== a && c.fire("deselected", {
                        e: b
                    }),
                    this._setActiveObject(a),
                    this.renderAll(),
                    this.fire("object:selected", {
                        target: a,
                        e: b
                    }),
                    a.fire("selected", {
                        e: b
                    }),
                    this
                },
                getActiveObject: function() {
                    return this._activeObject
                },
                _onObjectRemoved: function(a) {
                    this.getActiveObject() === a && (this.fire("before:selection:cleared", {
                        target: a
                    }),
                    this._discardActiveObject(),
                    this.fire("selection:cleared", {
                        target: a
                    }),
                    a.fire("deselected")),
                    this._hoveredTarget === a && (this._hoveredTarget = null),
                    this.callSuper("_onObjectRemoved", a)
                },
                _discardActiveObject: function() {
                    var a = this._activeObject;
                    a && (a.set("active", !1),
                    a.onDeselect && "function" == typeof a.onDeselect && a.onDeselect()),
                    this._activeObject = null
                },
                discardActiveObject: function(a) {
                    var b = this._activeObject;
                    return b && (this.fire("before:selection:cleared", {
                        target: b,
                        e: a
                    }),
                    this._discardActiveObject(),
                    this.fire("selection:cleared", {
                        e: a
                    }),
                    b.fire("deselected", {
                        e: a
                    })),
                    this
                },
                _setActiveGroup: function(a) {
                    this._activeGroup = a,
                    a && a.set("active", !0)
                },
                setActiveGroup: function(a, b) {
                    return this._setActiveGroup(a),
                    a && (this.fire("object:selected", {
                        target: a,
                        e: b
                    }),
                    a.fire("selected", {
                        e: b
                    })),
                    this
                },
                getActiveGroup: function() {
                    return this._activeGroup
                },
                _discardActiveGroup: function() {
                    var a = this.getActiveGroup();
                    a && a.destroy(),
                    this.setActiveGroup(null)
                },
                discardActiveGroup: function(a) {
                    var b = this.getActiveGroup();
                    return b && (this.fire("before:selection:cleared", {
                        e: a,
                        target: b
                    }),
                    this._discardActiveGroup(),
                    this.fire("selection:cleared", {
                        e: a
                    })),
                    this
                },
                deactivateAll: function() {
                    for (var a, b = this.getObjects(), c = 0, d = b.length; c < d; c++)
                        (a = b[c]) && a.set("active", !1);
                    return this._discardActiveGroup(),
                    this._discardActiveObject(),
                    this
                },
                deactivateAllWithDispatch: function(a) {
                    return this.discardActiveGroup(a),
                    this.discardActiveObject(a),
                    this.deactivateAll(),
                    this
                },
                dispose: function() {
                    this.callSuper("dispose");
                    var a = this.wrapperEl;
                    return this.removeListeners(),
                    a.removeChild(this.upperCanvasEl),
                    a.removeChild(this.lowerCanvasEl),
                    delete this.upperCanvasEl,
                    a.parentNode && a.parentNode.replaceChild(this.lowerCanvasEl, this.wrapperEl),
                    delete this.wrapperEl,
                    this
                },
                clear: function() {
                    return this.discardActiveGroup(),
                    this.discardActiveObject(),
                    this.clearContext(this.contextTop),
                    this.callSuper("clear")
                },
                drawControls: function(a) {
                    var b = this.getActiveGroup();
                    b ? b._renderControls(a) : this._drawObjectsControls(a)
                },
                _drawObjectsControls: function(a) {
                    for (var b = 0, c = this._objects.length; b < c; ++b)
                        this._objects[b] && this._objects[b].active && this._objects[b]._renderControls(a)
                },
                _toObject: function(a, b, c) {
                    var d = this._realizeGroupTransformOnObject(a)
                      , e = this.callSuper("_toObject", a, b, c);
                    return this._unwindGroupTransformOnObject(a, d),
                    e
                },
                _realizeGroupTransformOnObject: function(a) {
                    var b = ["angle", "flipX", "flipY", "height", "left", "scaleX", "scaleY", "top", "width"];
                    if (a.group && a.group === this.getActiveGroup()) {
                        var c = {};
                        return b.forEach(function(b) {
                            c[b] = a[b]
                        }),
                        this.getActiveGroup().realizeTransform(a),
                        c
                    }
                    return null
                },
                _unwindGroupTransformOnObject: function(a, b) {
                    b && a.set(b)
                },
                _setSVGObject: function(a, b, c) {
                    var d;
                    d = this._realizeGroupTransformOnObject(b),
                    this.callSuper("_setSVGObject", a, b, c),
                    this._unwindGroupTransformOnObject(b, d)
                }
            });
            for (var h in a.StaticCanvas)
                "prototype" !== h && (a.Canvas[h] = a.StaticCanvas[h]);
            a.isTouchSupported && (a.Canvas.prototype._setCursorFromEvent = function() {}
            ),
            a.Element = a.Canvas
        }(),
        function() {
            var b = {
                mt: 0,
                tr: 1,
                mr: 2,
                br: 3,
                mb: 4,
                bl: 5,
                ml: 6,
                tl: 7
            }
              , c = a.util.addListener
              , d = a.util.removeListener;
            a.util.object.extend(a.Canvas.prototype, {
                cursorMap: ["n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize"],
                _initEventListeners: function() {
                    this._bindEvents(),
                    c(a.window, "resize", this._onResize),
                    c(this.upperCanvasEl, "mousedown", this._onMouseDown),
                    c(this.upperCanvasEl, "mousemove", this._onMouseMove),
                    c(this.upperCanvasEl, "mouseout", this._onMouseOut),
                    c(this.upperCanvasEl, "mouseenter", this._onMouseEnter),
                    c(this.upperCanvasEl, "wheel", this._onMouseWheel),
                    c(this.upperCanvasEl, "contextmenu", this._onContextMenu),
                    c(this.upperCanvasEl, "touchstart", this._onMouseDown, {
                        passive: !1
                    }),
                    c(this.upperCanvasEl, "touchmove", this._onMouseMove, {
                        passive: !1
                    }),
                    "undefined" != typeof eventjs && "add"in eventjs && (eventjs.add(this.upperCanvasEl, "gesture", this._onGesture),
                    eventjs.add(this.upperCanvasEl, "drag", this._onDrag),
                    eventjs.add(this.upperCanvasEl, "orientation", this._onOrientationChange),
                    eventjs.add(this.upperCanvasEl, "shake", this._onShake),
                    eventjs.add(this.upperCanvasEl, "longpress", this._onLongPress))
                },
                _bindEvents: function() {
                    this._onMouseDown = this._onMouseDown.bind(this),
                    this._onMouseMove = this._onMouseMove.bind(this),
                    this._onMouseUp = this._onMouseUp.bind(this),
                    this._onResize = this._onResize.bind(this),
                    this._onGesture = this._onGesture.bind(this),
                    this._onDrag = this._onDrag.bind(this),
                    this._onShake = this._onShake.bind(this),
                    this._onLongPress = this._onLongPress.bind(this),
                    this._onOrientationChange = this._onOrientationChange.bind(this),
                    this._onMouseWheel = this._onMouseWheel.bind(this),
                    this._onMouseOut = this._onMouseOut.bind(this),
                    this._onMouseEnter = this._onMouseEnter.bind(this),
                    this._onContextMenu = this._onContextMenu.bind(this)
                },
                removeListeners: function() {
                    d(a.window, "resize", this._onResize),
                    d(this.upperCanvasEl, "mousedown", this._onMouseDown),
                    d(this.upperCanvasEl, "mousemove", this._onMouseMove),
                    d(this.upperCanvasEl, "mouseout", this._onMouseOut),
                    d(this.upperCanvasEl, "mouseenter", this._onMouseEnter),
                    d(this.upperCanvasEl, "wheel", this._onMouseWheel),
                    d(this.upperCanvasEl, "contextmenu", this._onContextMenu),
                    d(this.upperCanvasEl, "touchstart", this._onMouseDown),
                    d(this.upperCanvasEl, "touchmove", this._onMouseMove),
                    "undefined" != typeof eventjs && "remove"in eventjs && (eventjs.remove(this.upperCanvasEl, "gesture", this._onGesture),
                    eventjs.remove(this.upperCanvasEl, "drag", this._onDrag),
                    eventjs.remove(this.upperCanvasEl, "orientation", this._onOrientationChange),
                    eventjs.remove(this.upperCanvasEl, "shake", this._onShake),
                    eventjs.remove(this.upperCanvasEl, "longpress", this._onLongPress))
                },
                _onGesture: function(a, b) {
                    this.__onTransformGesture && this.__onTransformGesture(a, b)
                },
                _onDrag: function(a, b) {
                    this.__onDrag && this.__onDrag(a, b)
                },
                _onMouseWheel: function(a) {
                    this.__onMouseWheel(a)
                },
                _onMouseOut: function(a) {
                    var b = this._hoveredTarget;
                    this.fire("mouse:out", {
                        target: b,
                        e: a
                    }),
                    this._hoveredTarget = null,
                    b && b.fire("mouseout", {
                        e: a
                    })
                },
                _onMouseEnter: function(a) {
                    this.findTarget(a) || (this.fire("mouse:over", {
                        target: null,
                        e: a
                    }),
                    this._hoveredTarget = null)
                },
                _onOrientationChange: function(a, b) {
                    this.__onOrientationChange && this.__onOrientationChange(a, b)
                },
                _onShake: function(a, b) {
                    this.__onShake && this.__onShake(a, b)
                },
                _onLongPress: function(a, b) {
                    this.__onLongPress && this.__onLongPress(a, b)
                },
                _onContextMenu: function(a) {
                    return this.stopContextMenu && (a.stopPropagation(),
                    a.preventDefault()),
                    !1
                },
                _onMouseDown: function(b) {
                    this.__onMouseDown(b),
                    c(a.document, "touchend", this._onMouseUp, {
                        passive: !1
                    }),
                    c(a.document, "touchmove", this._onMouseMove, {
                        passive: !1
                    }),
                    d(this.upperCanvasEl, "mousemove", this._onMouseMove),
                    d(this.upperCanvasEl, "touchmove", this._onMouseMove),
                    "touchstart" === b.type ? d(this.upperCanvasEl, "mousedown", this._onMouseDown) : (c(a.document, "mouseup", this._onMouseUp),
                    c(a.document, "mousemove", this._onMouseMove))
                },
                _onMouseUp: function(b) {
                    if (this.__onMouseUp(b),
                    d(a.document, "mouseup", this._onMouseUp),
                    d(a.document, "touchend", this._onMouseUp),
                    d(a.document, "mousemove", this._onMouseMove),
                    d(a.document, "touchmove", this._onMouseMove),
                    c(this.upperCanvasEl, "mousemove", this._onMouseMove),
                    c(this.upperCanvasEl, "touchmove", this._onMouseMove, {
                        passive: !1
                    }),
                    "touchend" === b.type) {
                        var e = this;
                        setTimeout(function() {
                            c(e.upperCanvasEl, "mousedown", e._onMouseDown)
                        }, 400)
                    }
                },
                _onMouseMove: function(a) {
                    !this.allowTouchScrolling && a.preventDefault && a.preventDefault(),
                    this.__onMouseMove(a)
                },
                _onResize: function() {
                    this.calcOffset()
                },
                _shouldRender: function(a, b) {
                    var c = this.getActiveGroup() || this.getActiveObject();
                    return (!c || !c.isEditing || a !== c) && !!(a && (a.isMoving || a !== c) || !a && c || !a && !c && !this._groupSelector || b && this._previousPointer && this.selection && (b.x !== this._previousPointer.x || b.y !== this._previousPointer.y))
                },
                __onMouseUp: function(a) {
                    var b, c = !0, d = this._currentTransform, e = this._groupSelector, f = !e || 0 === e.left && 0 === e.top;
                    if (this.isDrawingMode && this._isCurrentlyDrawing)
                        return void this._onMouseUpInDrawingMode(a);
                    d && (this._finalizeCurrentTransform(),
                    c = !d.actionPerformed),
                    b = c ? this.findTarget(a, !0) : d.target;
                    var g = this._shouldRender(b, this.getPointer(a));
                    b || !f ? this._maybeGroupObjects(a) : (this._groupSelector = null,
                    this._currentTransform = null),
                    b && (b.isMoving = !1),
                    this._handleCursorAndEvent(a, b, "up"),
                    b && (b.__corner = 0),
                    g && this.renderAll()
                },
                _handleCursorAndEvent: function(a, b, c) {
                    this._setCursorFromEvent(a, b),
                    this._handleEvent(a, c, b || null)
                },
                _handleEvent: function(a, b, c) {
                    var d = void 0 === c ? this.findTarget(a) : c
                      , e = this.targets || []
                      , f = {
                        e: a,
                        target: d,
                        subTargets: e
                    };
                    this.fire("mouse:" + b, f),
                    d && d.fire("mouse" + b, f);
                    for (var g = 0; g < e.length; g++)
                        e[g].fire("mouse" + b, f)
                },
                _finalizeCurrentTransform: function() {
                    var a = this._currentTransform
                      , b = a.target;
                    b._scaling && (b._scaling = !1),
                    b.setCoords(),
                    this._restoreOriginXY(b),
                    (a.actionPerformed || this.stateful && b.hasStateChanged()) && (this.fire("object:modified", {
                        target: b
                    }),
                    b.fire("modified"))
                },
                _restoreOriginXY: function(a) {
                    if (this._previousOriginX && this._previousOriginY) {
                        var b = a.translateToOriginPoint(a.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                        a.originX = this._previousOriginX,
                        a.originY = this._previousOriginY,
                        a.left = b.x,
                        a.top = b.y,
                        this._previousOriginX = null,
                        this._previousOriginY = null
                    }
                },
                _onMouseDownInDrawingMode: function(b) {
                    this._isCurrentlyDrawing = !0,
                    this.discardActiveObject(b).renderAll(),
                    this.clipTo && a.util.clipContext(this, this.contextTop);
                    var c = this.getPointer(b);
                    this.freeDrawingBrush.onMouseDown(c),
                    this._handleEvent(b, "down")
                },
                _onMouseMoveInDrawingMode: function(a) {
                    if (this._isCurrentlyDrawing) {
                        var b = this.getPointer(a);
                        this.freeDrawingBrush.onMouseMove(b)
                    }
                    this.setCursor(this.freeDrawingCursor),
                    this._handleEvent(a, "move")
                },
                _onMouseUpInDrawingMode: function(a) {
                    this._isCurrentlyDrawing = !1,
                    this.clipTo && this.contextTop.restore(),
                    this.freeDrawingBrush.onMouseUp(),
                    this._handleEvent(a, "up")
                },
                __onMouseDown: function(a) {
                    var b = this.findTarget(a);
                    if ("which"in a ? 3 === a.which : 2 === a.button)
                        return void (this.fireRightClick && this._handleEvent(a, "down", b || null));
                    if (this.isDrawingMode)
                        return void this._onMouseDownInDrawingMode(a);
                    if (!this._currentTransform) {
                        var c = this.getPointer(a, !0);
                        this._previousPointer = c;
                        var d = this._shouldRender(b, c)
                          , e = this._shouldGroup(a, b);
                        if (this._shouldClearSelection(a, b) ? this._clearSelection(a, b, c) : e && (this._handleGrouping(a, b),
                        b = this.getActiveGroup()),
                        b) {
                            !b.selectable || !b.__corner && e || (this._beforeTransform(a, b),
                            this._setupCurrentTransform(a, b));
                            var f = this.getActiveObject();
                            b !== this.getActiveGroup() && b !== f && (this.deactivateAll(),
                            b.selectable && (f && f.fire("deselected", {
                                e: a
                            }),
                            this.setActiveObject(b, a)))
                        }
                        this._handleEvent(a, "down", b || null),
                        d && this.renderAll()
                    }
                },
                _beforeTransform: function(a, b) {
                    this.stateful && b.saveState(),
                    b._findTargetCorner(this.getPointer(a)) && this.onBeforeScaleRotate(b)
                },
                _clearSelection: function(a, b, c) {
                    this.deactivateAllWithDispatch(a),
                    b && b.selectable ? this.setActiveObject(b, a) : this.selection && (this._groupSelector = {
                        ex: c.x,
                        ey: c.y,
                        top: 0,
                        left: 0
                    })
                },
                _setOriginToCenter: function(a) {
                    this._previousOriginX = this._currentTransform.target.originX,
                    this._previousOriginY = this._currentTransform.target.originY;
                    var b = a.getCenterPoint();
                    a.originX = "center",
                    a.originY = "center",
                    a.left = b.x,
                    a.top = b.y,
                    this._currentTransform.left = a.left,
                    this._currentTransform.top = a.top
                },
                _setCenterToOrigin: function(a) {
                    var b = a.translateToOriginPoint(a.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                    a.originX = this._previousOriginX,
                    a.originY = this._previousOriginY,
                    a.left = b.x,
                    a.top = b.y,
                    this._previousOriginX = null,
                    this._previousOriginY = null
                },
                __onMouseMove: function(a) {
                    var b, c;
                    if (this.isDrawingMode)
                        return void this._onMouseMoveInDrawingMode(a);
                    if (!(void 0 !== a.touches && a.touches.length > 1)) {
                        var d = this._groupSelector;
                        d ? (c = this.getPointer(a, !0),
                        d.left = c.x - d.ex,
                        d.top = c.y - d.ey,
                        this.renderTop()) : this._currentTransform ? this._transformObject(a) : (b = this.findTarget(a),
                        this._setCursorFromEvent(a, b)),
                        this._handleEvent(a, "move", b || null)
                    }
                },
                __onMouseWheel: function(a) {
                    this._handleEvent(a, "wheel")
                },
                _transformObject: function(a) {
                    var b = this.getPointer(a)
                      , c = this._currentTransform;
                    c.reset = !1,
                    c.target.isMoving = !0,
                    c.shiftKey = a.shiftKey,
                    c.altKey = a[this.centeredKey],
                    this._beforeScaleTransform(a, c),
                    this._performTransformAction(a, c, b),
                    c.actionPerformed && this.renderAll()
                },
                _performTransformAction: function(a, b, c) {
                    var d = c.x
                      , e = c.y
                      , f = b.target
                      , g = b.action
                      , h = !1;
                    "rotate" === g ? (h = this._rotateObject(d, e)) && this._fire("rotating", f, a) : "scale" === g ? (h = this._onScale(a, b, d, e)) && this._fire("scaling", f, a) : "scaleX" === g ? (h = this._scaleObject(d, e, "x")) && this._fire("scaling", f, a) : "scaleY" === g ? (h = this._scaleObject(d, e, "y")) && this._fire("scaling", f, a) : "skewX" === g ? (h = this._skewObject(d, e, "x")) && this._fire("skewing", f, a) : "skewY" === g ? (h = this._skewObject(d, e, "y")) && this._fire("skewing", f, a) : (h = this._translateObject(d, e)) && (this._fire("moving", f, a),
                    this.setCursor(f.moveCursor || this.moveCursor)),
                    b.actionPerformed = b.actionPerformed || h
                },
                _fire: function(a, b, c) {
                    this.fire("object:" + a, {
                        target: b,
                        e: c
                    }),
                    b.fire(a, {
                        e: c
                    })
                },
                _beforeScaleTransform: function(a, b) {
                    if ("scale" === b.action || "scaleX" === b.action || "scaleY" === b.action) {
                        var c = this._shouldCenterTransform(b.target);
                        (c && ("center" !== b.originX || "center" !== b.originY) || !c && "center" === b.originX && "center" === b.originY) && (this._resetCurrentTransform(),
                        b.reset = !0)
                    }
                },
                _onScale: function(a, b, c, d) {
                    return !a[this.uniScaleKey] && !this.uniScaleTransform || b.target.get("lockUniScaling") ? (b.reset || "scale" !== b.currentAction || this._resetCurrentTransform(),
                    b.currentAction = "scaleEqually",
                    this._scaleObject(c, d, "equally")) : (b.currentAction = "scale",
                    this._scaleObject(c, d))
                },
                _setCursorFromEvent: function(a, b) {
                    if (!b || !b.selectable)
                        return this.setCursor(this.defaultCursor),
                        !1;
                    var c = b.hoverCursor || this.hoverCursor
                      , d = this.getActiveGroup()
                      , e = b._findTargetCorner && (!d || !d.contains(b)) && b._findTargetCorner(this.getPointer(a, !0));
                    return e ? this._setCornerCursor(e, b, a) : this.setCursor(c),
                    !0
                },
                _setCornerCursor: function(a, c, d) {
                    if (a in b)
                        this.setCursor(this._getRotatedCornerCursor(a, c, d));
                    else {
                        if ("mtr" !== a || !c.hasRotatingPoint)
                            return this.setCursor(this.defaultCursor),
                            !1;
                        this.setCursor(this.rotationCursor)
                    }
                },
                _getRotatedCornerCursor: function(a, c, d) {
                    var e = Math.round(c.getAngle() % 360 / 45);
                    return e < 0 && (e += 8),
                    e += b[a],
                    d[this.altActionKey] && b[a] % 2 == 0 && (e += 2),
                    e %= 8,
                    this.cursorMap[e]
                }
            })
        }(),
        function() {
            var b = Math.min
              , c = Math.max;
            a.util.object.extend(a.Canvas.prototype, {
                _shouldGroup: function(a, b) {
                    var c = this.getActiveObject();
                    return a[this.selectionKey] && b && b.selectable && (this.getActiveGroup() || c && c !== b) && this.selection
                },
                _handleGrouping: function(a, b) {
                    var c = this.getActiveGroup();
                    (b !== c || (b = this.findTarget(a, !0))) && (c ? this._updateActiveGroup(b, a) : this._createActiveGroup(b, a),
                    this._activeGroup && this._activeGroup.saveCoords())
                },
                _updateActiveGroup: function(a, b) {
                    var c = this.getActiveGroup();
                    if (c.contains(a)) {
                        if (c.removeWithUpdate(a),
                        a.set("active", !1),
                        1 === c.size())
                            return this.discardActiveGroup(b),
                            void this.setActiveObject(c.item(0))
                    } else
                        c.addWithUpdate(a);
                    this.fire("selection:created", {
                        target: c,
                        e: b
                    }),
                    c.set("active", !0)
                },
                _createActiveGroup: function(a, b) {
                    if (this._activeObject && a !== this._activeObject) {
                        var c = this._createGroup(a);
                        c.addWithUpdate(),
                        this.setActiveGroup(c),
                        this._activeObject = null,
                        this.fire("selection:created", {
                            target: c,
                            e: b
                        })
                    }
                    a.set("active", !0)
                },
                _createGroup: function(b) {
                    var c = this.getObjects()
                      , d = c.indexOf(this._activeObject) < c.indexOf(b)
                      , e = d ? [this._activeObject, b] : [b, this._activeObject];
                    return this._activeObject.isEditing && this._activeObject.exitEditing(),
                    new a.Group(e,{
                        canvas: this
                    })
                },
                _groupSelectedObjects: function(b) {
                    var c = this._collectObjects();
                    1 === c.length ? this.setActiveObject(c[0], b) : c.length > 1 && (c = new a.Group(c.reverse(),{
                        canvas: this
                    }),
                    c.addWithUpdate(),
                    this.setActiveGroup(c, b),
                    c.saveCoords(),
                    this.fire("selection:created", {
                        target: c
                    }),
                    this.renderAll())
                },
                _collectObjects: function() {
                    for (var d, e = [], f = this._groupSelector.ex, g = this._groupSelector.ey, h = f + this._groupSelector.left, i = g + this._groupSelector.top, j = new a.Point(b(f, h),b(g, i)), k = new a.Point(c(f, h),c(g, i)), l = f === h && g === i, m = this._objects.length; m-- && !((d = this._objects[m]) && d.selectable && d.visible && (d.intersectsWithRect(j, k) || d.isContainedWithinRect(j, k) || d.containsPoint(j) || d.containsPoint(k)) && (d.set("active", !0),
                    e.push(d),
                    l)); )
                        ;
                    return e
                },
                _maybeGroupObjects: function(a) {
                    this.selection && this._groupSelector && this._groupSelectedObjects(a);
                    var b = this.getActiveGroup();
                    b && (b.setObjectsCoords().setCoords(),
                    b.isMoving = !1,
                    this.setCursor(this.defaultCursor)),
                    this._groupSelector = null,
                    this._currentTransform = null
                }
            })
        }(),
        function() {
            var b = a.StaticCanvas.supports("toDataURLWithQuality");
            a.util.object.extend(a.StaticCanvas.prototype, {
                toDataURL: function(a) {
                    a || (a = {});
                    var b = a.format || "png"
                      , c = a.quality || 1
                      , d = a.multiplier || 1
                      , e = {
                        left: a.left || 0,
                        top: a.top || 0,
                        width: a.width || 0,
                        height: a.height || 0
                    };
                    return this.__toDataURLWithMultiplier(b, c, e, d)
                },
                __toDataURLWithMultiplier: function(a, b, c, d) {
                    var e = this.getWidth()
                      , f = this.getHeight()
                      , g = (c.width || this.getWidth()) * d
                      , h = (c.height || this.getHeight()) * d
                      , i = this.getZoom()
                      , j = i * d
                      , k = this.viewportTransform
                      , l = (k[4] - c.left) * d
                      , m = (k[5] - c.top) * d
                      , n = [j, 0, 0, j, l, m]
                      , o = this.interactive;
                    this.viewportTransform = n,
                    this.interactive && (this.interactive = !1),
                    e !== g || f !== h ? this.setDimensions({
                        width: g,
                        height: h
                    }) : this.renderAll();
                    var p = this.__toDataURL(a, b, c);
                    return o && (this.interactive = o),
                    this.viewportTransform = k,
                    this.setDimensions({
                        width: e,
                        height: f
                    }),
                    p
                },
                __toDataURL: function(a, c) {
                    var d = this.contextContainer.canvas;
                    return "jpg" === a && (a = "jpeg"),
                    b ? d.toDataURL("image/" + a, c) : d.toDataURL("image/" + a)
                },
                toDataURLWithMultiplier: function(a, b, c) {
                    return this.toDataURL({
                        format: a,
                        multiplier: b,
                        quality: c
                    })
                }
            })
        }(),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.object.extend
              , d = b.util.object.clone
              , e = b.util.toFixed
              , f = b.util.string.capitalize
              , g = b.util.degreesToRadians
              , h = b.StaticCanvas.supports("setLineDash")
              , i = !b.isLikelyNode;
            b.Object || (b.Object = b.util.createClass(b.CommonMethods, {
                type: "object",
                originX: "left",
                originY: "top",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                scaleX: 1,
                scaleY: 1,
                flipX: !1,
                flipY: !1,
                opacity: 1,
                angle: 0,
                skewX: 0,
                skewY: 0,
                cornerSize: 13,
                transparentCorners: !0,
                hoverCursor: null,
                moveCursor: null,
                padding: 0,
                borderColor: "rgba(102,153,255,0.75)",
                borderDashArray: null,
                cornerColor: "rgba(102,153,255,0.5)",
                cornerStrokeColor: null,
                cornerStyle: "rect",
                cornerDashArray: null,
                centeredScaling: !1,
                centeredRotation: !0,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                backgroundColor: "",
                selectionBackgroundColor: "",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 10,
                shadow: null,
                borderOpacityWhenMoving: .4,
                borderScaleFactor: 1,
                transformMatrix: null,
                minScaleLimit: .01,
                selectable: !0,
                evented: !0,
                visible: !0,
                hasControls: !0,
                hasBorders: !0,
                hasRotatingPoint: !0,
                rotatingPointOffset: 40,
                perPixelTargetFind: !1,
                includeDefaultValues: !0,
                clipTo: null,
                lockMovementX: !1,
                lockMovementY: !1,
                lockRotation: !1,
                lockScalingX: !1,
                lockScalingY: !1,
                lockUniScaling: !1,
                lockSkewingX: !1,
                lockSkewingY: !1,
                lockScalingFlip: !1,
                excludeFromExport: !1,
                objectCaching: i,
                statefullCache: !1,
                noScaleCache: !0,
                dirty: !1,
                needsItsOwnCache: !1,
                stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor skewX skewY".split(" "),
                cacheProperties: "fill stroke strokeWidth strokeDashArray width height stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit fillRule backgroundColor".split(" "),
                initialize: function(a) {
                    a = a || {},
                    a && this.setOptions(a),
                    this.objectCaching && (this._createCacheCanvas(),
                    this.setupState({
                        propertySet: "cacheProperties"
                    }))
                },
                _createCacheCanvas: function() {
                    this._cacheCanvas = b.document.createElement("canvas"),
                    this._cacheContext = this._cacheCanvas.getContext("2d"),
                    this._updateCacheCanvas()
                },
                _getCacheCanvasDimensions: function() {
                    var a = this.canvas && this.canvas.getZoom() || 1
                      , c = this.getObjectScaling()
                      , d = this._getNonTransformedDimensions()
                      , e = this.canvas && this.canvas._isRetinaScaling() ? b.devicePixelRatio : 1
                      , f = c.scaleX * a * e
                      , g = c.scaleY * a * e;
                    return {
                        width: d.x * f + 2,
                        height: d.y * g + 2,
                        zoomX: f,
                        zoomY: g
                    }
                },
                _updateCacheCanvas: function() {
                    if (this.noScaleCache && this.canvas && this.canvas._currentTransform) {
                        if ("scale" === this.canvas._currentTransform.action.slice(0, 5))
                            return !1
                    }
                    var a = this._getCacheCanvasDimensions()
                      , b = a.width
                      , c = a.height
                      , d = a.zoomX
                      , e = a.zoomY;
                    return (b !== this.cacheWidth || c !== this.cacheHeight) && (this._cacheCanvas.width = Math.ceil(b),
                    this._cacheCanvas.height = Math.ceil(c),
                    this._cacheContext.translate(b / 2, c / 2),
                    this._cacheContext.scale(d, e),
                    this.cacheWidth = b,
                    this.cacheHeight = c,
                    this.zoomX = d,
                    this.zoomY = e,
                    !0)
                },
                setOptions: function(a) {
                    this._setOptions(a),
                    this._initGradient(a.fill, "fill"),
                    this._initGradient(a.stroke, "stroke"),
                    this._initClipping(a),
                    this._initPattern(a.fill, "fill"),
                    this._initPattern(a.stroke, "stroke")
                },
                transform: function(a, b) {
                    this.group && !this.group._transformDone && this.group === this.canvas._activeGroup && this.group.transform(a);
                    var c = b ? this._getLeftTopCoords() : this.getCenterPoint();
                    a.translate(c.x, c.y),
                    this.angle && a.rotate(g(this.angle)),
                    a.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1)),
                    this.skewX && a.transform(1, 0, Math.tan(g(this.skewX)), 1, 0, 0),
                    this.skewY && a.transform(1, Math.tan(g(this.skewY)), 0, 1, 0, 0)
                },
                toObject: function(a) {
                    var c = b.Object.NUM_FRACTION_DIGITS
                      , d = {
                        type: this.type,
                        originX: this.originX,
                        originY: this.originY,
                        left: e(this.left, c),
                        top: e(this.top, c),
                        width: e(this.width, c),
                        height: e(this.height, c),
                        fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                        stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
                        strokeWidth: e(this.strokeWidth, c),
                        strokeDashArray: this.strokeDashArray ? this.strokeDashArray.concat() : this.strokeDashArray,
                        strokeLineCap: this.strokeLineCap,
                        strokeLineJoin: this.strokeLineJoin,
                        strokeMiterLimit: e(this.strokeMiterLimit, c),
                        scaleX: e(this.scaleX, c),
                        scaleY: e(this.scaleY, c),
                        angle: e(this.getAngle(), c),
                        flipX: this.flipX,
                        flipY: this.flipY,
                        opacity: e(this.opacity, c),
                        shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
                        visible: this.visible,
                        clipTo: this.clipTo && String(this.clipTo),
                        backgroundColor: this.backgroundColor,
                        fillRule: this.fillRule,
                        globalCompositeOperation: this.globalCompositeOperation,
                        transformMatrix: this.transformMatrix ? this.transformMatrix.concat() : null,
                        skewX: e(this.skewX, c),
                        skewY: e(this.skewY, c)
                    };
                    return b.util.populateWithProperties(this, d, a),
                    this.includeDefaultValues || (d = this._removeDefaultValues(d)),
                    d
                },
                toDatalessObject: function(a) {
                    return this.toObject(a)
                },
                _removeDefaultValues: function(a) {
                    var c = b.util.getKlass(a.type).prototype;
                    return c.stateProperties.forEach(function(b) {
                        a[b] === c[b] && delete a[b],
                        "[object Array]" === Object.prototype.toString.call(a[b]) && "[object Array]" === Object.prototype.toString.call(c[b]) && 0 === a[b].length && 0 === c[b].length && delete a[b]
                    }),
                    a
                },
                toString: function() {
                    return "#<fabric." + f(this.type) + ">"
                },
                getObjectScaling: function() {
                    var a = this.scaleX
                      , b = this.scaleY;
                    if (this.group) {
                        var c = this.group.getObjectScaling();
                        a *= c.scaleX,
                        b *= c.scaleY
                    }
                    return {
                        scaleX: a,
                        scaleY: b
                    }
                },
                _set: function(a, c) {
                    return ("scaleX" === a || "scaleY" === a) && (c = this._constrainScale(c)),
                    "scaleX" === a && c < 0 ? (this.flipX = !this.flipX,
                    c *= -1) : "scaleY" === a && c < 0 ? (this.flipY = !this.flipY,
                    c *= -1) : "shadow" !== a || !c || c instanceof b.Shadow ? "dirty" === a && this.group && this.group.set("dirty", c) : c = new b.Shadow(c),
                    this[a] = c,
                    this.cacheProperties.indexOf(a) > -1 && (this.group && this.group.set("dirty", !0),
                    this.dirty = !0),
                    "width" !== a && "height" !== a || (this.minScaleLimit = Math.min(.1, 1 / Math.max(this.width, this.height))),
                    this
                },
                setOnGroup: function() {},
                setSourcePath: function(a) {
                    return this.sourcePath = a,
                    this
                },
                getViewportTransform: function() {
                    return this.canvas && this.canvas.viewportTransform ? this.canvas.viewportTransform : b.iMatrix.concat()
                },
                render: function(a, c) {
                    0 === this.width && 0 === this.height || !this.visible || (a.save(),
                    this._setupCompositeOperation(a),
                    this.drawSelectionBackground(a),
                    c || this.transform(a),
                    this._setOpacity(a),
                    this._setShadow(a),
                    this.transformMatrix && a.transform.apply(a, this.transformMatrix),
                    this.clipTo && b.util.clipContext(this, a),
                    !this.objectCaching || this.group && !this.needsItsOwnCache ? (this.drawObject(a, c),
                    c && this.objectCaching && this.statefullCache && this.saveState({
                        propertySet: "cacheProperties"
                    })) : (this._cacheCanvas || this._createCacheCanvas(),
                    this.isCacheDirty(c) && (this.statefullCache && this.saveState({
                        propertySet: "cacheProperties"
                    }),
                    this.drawObject(this._cacheContext, c),
                    this.dirty = !1),
                    this.drawCacheOnCanvas(a)),
                    this.clipTo && a.restore(),
                    a.restore())
                },
                drawObject: function(a, b) {
                    this._renderBackground(a),
                    this._setStrokeStyles(a),
                    this._setFillStyles(a),
                    this._render(a, b)
                },
                drawCacheOnCanvas: function(a) {
                    a.scale(1 / this.zoomX, 1 / this.zoomY),
                    a.drawImage(this._cacheCanvas, -this.cacheWidth / 2, -this.cacheHeight / 2)
                },
                isCacheDirty: function(a) {
                    if (!a && this._updateCacheCanvas())
                        return !0;
                    if (this.dirty || this.statefullCache && this.hasStateChanged("cacheProperties")) {
                        if (!a) {
                            var b = this.cacheWidth / this.zoomX
                              , c = this.cacheHeight / this.zoomY;
                            this._cacheContext.clearRect(-b / 2, -c / 2, b, c)
                        }
                        return !0
                    }
                    return !1
                },
                _renderBackground: function(a) {
                    if (this.backgroundColor) {
                        var b = this._getNonTransformedDimensions();
                        a.fillStyle = this.backgroundColor,
                        a.fillRect(-b.x / 2, -b.y / 2, b.x, b.y),
                        this._removeShadow(a)
                    }
                },
                _setOpacity: function(a) {
                    a.globalAlpha *= this.opacity
                },
                _setStrokeStyles: function(a) {
                    this.stroke && (a.lineWidth = this.strokeWidth,
                    a.lineCap = this.strokeLineCap,
                    a.lineJoin = this.strokeLineJoin,
                    a.miterLimit = this.strokeMiterLimit,
                    a.strokeStyle = this.stroke.toLive ? this.stroke.toLive(a, this) : this.stroke)
                },
                _setFillStyles: function(a) {
                    this.fill && (a.fillStyle = this.fill.toLive ? this.fill.toLive(a, this) : this.fill)
                },
                _setLineDash: function(a, b, c) {
                    b && (1 & b.length && b.push.apply(b, b),
                    h ? a.setLineDash(b) : c && c(a))
                },
                _renderControls: function(a, c) {
                    if (!(!this.active || c || this.group && this.group !== this.canvas.getActiveGroup())) {
                        var d, e = this.getViewportTransform(), f = this.calcTransformMatrix();
                        f = b.util.multiplyTransformMatrices(e, f),
                        d = b.util.qrDecompose(f),
                        a.save(),
                        a.translate(d.translateX, d.translateY),
                        a.lineWidth = 1 * this.borderScaleFactor,
                        this.group || (a.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1),
                        this.group && this.group === this.canvas.getActiveGroup() ? (a.rotate(g(d.angle)),
                        this.drawBordersInGroup(a, d)) : (a.rotate(g(this.angle)),
                        this.drawBorders(a)),
                        this.drawControls(a),
                        a.restore()
                    }
                },
                _setShadow: function(a) {
                    if (this.shadow) {
                        var c = this.canvas && this.canvas.viewportTransform[0] || 1
                          , d = this.canvas && this.canvas.viewportTransform[3] || 1
                          , e = this.getObjectScaling();
                        this.canvas && this.canvas._isRetinaScaling() && (c *= b.devicePixelRatio,
                        d *= b.devicePixelRatio),
                        a.shadowColor = this.shadow.color,
                        a.shadowBlur = this.shadow.blur * (c + d) * (e.scaleX + e.scaleY) / 4,
                        a.shadowOffsetX = this.shadow.offsetX * c * e.scaleX,
                        a.shadowOffsetY = this.shadow.offsetY * d * e.scaleY
                    }
                },
                _removeShadow: function(a) {
                    this.shadow && (a.shadowColor = "",
                    a.shadowBlur = a.shadowOffsetX = a.shadowOffsetY = 0)
                },
                _applyPatternGradientTransform: function(a, b) {
                    if (b.toLive) {
                        var c = b.gradientTransform || b.patternTransform;
                        c && a.transform.apply(a, c);
                        var d = -this.width / 2 + b.offsetX || 0
                          , e = -this.height / 2 + b.offsetY || 0;
                        a.translate(d, e)
                    }
                },
                _renderFill: function(a) {
                    this.fill && (a.save(),
                    this._applyPatternGradientTransform(a, this.fill),
                    "evenodd" === this.fillRule ? a.fill("evenodd") : a.fill(),
                    a.restore())
                },
                _renderStroke: function(a) {
                    this.stroke && 0 !== this.strokeWidth && (this.shadow && !this.shadow.affectStroke && this._removeShadow(a),
                    a.save(),
                    this._setLineDash(a, this.strokeDashArray, this._renderDashedStroke),
                    this._applyPatternGradientTransform(a, this.stroke),
                    a.stroke(),
                    a.restore())
                },
                clone: function(a, c) {
                    return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(c), a) : new b.Object(this.toObject(c))
                },
                cloneAsImage: function(a, c) {
                    var d = this.toDataURL(c);
                    return b.util.loadImage(d, function(c) {
                        a && a(new b.Image(c))
                    }),
                    this
                },
                toDataURL: function(a) {
                    a || (a = {});
                    var c = b.util.createCanvasElement()
                      , d = this.getBoundingRect();
                    c.width = d.width,
                    c.height = d.height,
                    b.util.wrapElement(c, "div");
                    var e = new b.StaticCanvas(c,{
                        enableRetinaScaling: a.enableRetinaScaling
                    });
                    "jpg" === a.format && (a.format = "jpeg"),
                    "jpeg" === a.format && (e.backgroundColor = "#fff");
                    var f = {
                        active: this.get("active"),
                        left: this.getLeft(),
                        top: this.getTop()
                    };
                    this.set("active", !1),
                    this.setPositionByOrigin(new b.Point(e.getWidth() / 2,e.getHeight() / 2), "center", "center");
                    var g = this.canvas;
                    e.add(this);
                    var h = e.toDataURL(a);
                    return this.set(f).setCoords(),
                    this.canvas = g,
                    e.dispose(),
                    e = null,
                    h
                },
                isType: function(a) {
                    return this.type === a
                },
                complexity: function() {
                    return 1
                },
                toJSON: function(a) {
                    return this.toObject(a)
                },
                setGradient: function(a, c) {
                    c || (c = {});
                    var d = {
                        colorStops: []
                    };
                    return d.type = c.type || (c.r1 || c.r2 ? "radial" : "linear"),
                    d.coords = {
                        x1: c.x1,
                        y1: c.y1,
                        x2: c.x2,
                        y2: c.y2
                    },
                    (c.r1 || c.r2) && (d.coords.r1 = c.r1,
                    d.coords.r2 = c.r2),
                    d.gradientTransform = c.gradientTransform,
                    b.Gradient.prototype.addColorStop.call(d, c.colorStops),
                    this.set(a, b.Gradient.forObject(this, d))
                },
                setPatternFill: function(a) {
                    return this.set("fill", new b.Pattern(a))
                },
                setShadow: function(a) {
                    return this.set("shadow", a ? new b.Shadow(a) : null)
                },
                setColor: function(a) {
                    return this.set("fill", a),
                    this
                },
                setAngle: function(a) {
                    var b = ("center" !== this.originX || "center" !== this.originY) && this.centeredRotation;
                    return b && this._setOriginToCenter(),
                    this.set("angle", a),
                    b && this._resetOrigin(),
                    this
                },
                centerH: function() {
                    return this.canvas && this.canvas.centerObjectH(this),
                    this
                },
                viewportCenterH: function() {
                    return this.canvas && this.canvas.viewportCenterObjectH(this),
                    this
                },
                centerV: function() {
                    return this.canvas && this.canvas.centerObjectV(this),
                    this
                },
                viewportCenterV: function() {
                    return this.canvas && this.canvas.viewportCenterObjectV(this),
                    this
                },
                center: function() {
                    return this.canvas && this.canvas.centerObject(this),
                    this
                },
                viewportCenter: function() {
                    return this.canvas && this.canvas.viewportCenterObject(this),
                    this
                },
                remove: function() {
                    return this.canvas && this.canvas.remove(this),
                    this
                },
                getLocalPointer: function(a, c) {
                    c = c || this.canvas.getPointer(a);
                    var d = new b.Point(c.x,c.y)
                      , e = this._getLeftTopCoords();
                    return this.angle && (d = b.util.rotatePoint(d, e, g(-this.angle))),
                    {
                        x: d.x - e.x,
                        y: d.y - e.y
                    }
                },
                _setupCompositeOperation: function(a) {
                    this.globalCompositeOperation && (a.globalCompositeOperation = this.globalCompositeOperation)
                }
            }),
            b.util.createAccessors(b.Object),
            b.Object.prototype.rotate = b.Object.prototype.setAngle,
            c(b.Object.prototype, b.Observable),
            b.Object.NUM_FRACTION_DIGITS = 2,
            b.Object._fromObject = function(a, c, e, f, g) {
                var h = b[a];
                if (c = d(c, !0),
                !f) {
                    var i = g ? new h(c[g],c) : new h(c);
                    return e && e(i),
                    i
                }
                b.util.enlivenPatterns([c.fill, c.stroke], function(a) {
                    void 0 !== a[0] && (c.fill = a[0]),
                    void 0 !== a[1] && (c.stroke = a[1]);
                    var b = g ? new h(c[g],c) : new h(c);
                    e && e(b)
                })
            }
            ,
            b.Object.__uid = 0)
        }("undefined" != typeof exports ? exports : this),
        function() {
            var b = a.util.degreesToRadians
              , c = {
                left: -.5,
                center: 0,
                right: .5
            }
              , d = {
                top: -.5,
                center: 0,
                bottom: .5
            };
            a.util.object.extend(a.Object.prototype, {
                translateToGivenOrigin: function(b, e, f, g, h) {
                    var i, j, k, l = b.x, m = b.y;
                    return "string" == typeof e ? e = c[e] : e -= .5,
                    "string" == typeof g ? g = c[g] : g -= .5,
                    i = g - e,
                    "string" == typeof f ? f = d[f] : f -= .5,
                    "string" == typeof h ? h = d[h] : h -= .5,
                    j = h - f,
                    (i || j) && (k = this._getTransformedDimensions(),
                    l = b.x + i * k.x,
                    m = b.y + j * k.y),
                    new a.Point(l,m)
                },
                translateToCenterPoint: function(c, d, e) {
                    var f = this.translateToGivenOrigin(c, d, e, "center", "center");
                    return this.angle ? a.util.rotatePoint(f, c, b(this.angle)) : f
                },
                translateToOriginPoint: function(c, d, e) {
                    var f = this.translateToGivenOrigin(c, "center", "center", d, e);
                    return this.angle ? a.util.rotatePoint(f, c, b(this.angle)) : f
                },
                getCenterPoint: function() {
                    var b = new a.Point(this.left,this.top);
                    return this.translateToCenterPoint(b, this.originX, this.originY)
                },
                getPointByOrigin: function(a, b) {
                    var c = this.getCenterPoint();
                    return this.translateToOriginPoint(c, a, b)
                },
                toLocalPoint: function(c, d, e) {
                    var f, g, h = this.getCenterPoint();
                    return f = void 0 !== d && void 0 !== e ? this.translateToGivenOrigin(h, "center", "center", d, e) : new a.Point(this.left,this.top),
                    g = new a.Point(c.x,c.y),
                    this.angle && (g = a.util.rotatePoint(g, h, -b(this.angle))),
                    g.subtractEquals(f)
                },
                setPositionByOrigin: function(a, b, c) {
                    var d = this.translateToCenterPoint(a, b, c)
                      , e = this.translateToOriginPoint(d, this.originX, this.originY);
                    this.set("left", e.x),
                    this.set("top", e.y)
                },
                adjustPosition: function(a) {
                    var d, e, f = b(this.angle), g = this.getWidth(), h = Math.cos(f) * g, i = Math.sin(f) * g;
                    d = "string" == typeof this.originX ? c[this.originX] : this.originX - .5,
                    e = "string" == typeof a ? c[a] : a - .5,
                    this.left += h * (e - d),
                    this.top += i * (e - d),
                    this.setCoords(),
                    this.originX = a
                },
                _setOriginToCenter: function() {
                    this._originalOriginX = this.originX,
                    this._originalOriginY = this.originY;
                    var a = this.getCenterPoint();
                    this.originX = "center",
                    this.originY = "center",
                    this.left = a.x,
                    this.top = a.y
                },
                _resetOrigin: function() {
                    var a = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
                    this.originX = this._originalOriginX,
                    this.originY = this._originalOriginY,
                    this.left = a.x,
                    this.top = a.y,
                    this._originalOriginX = null,
                    this._originalOriginY = null
                },
                _getLeftTopCoords: function() {
                    return this.translateToOriginPoint(this.getCenterPoint(), "left", "top")
                }
            })
        }(),
        function() {
            function b(b) {
                return [new a.Point(b.tl.x,b.tl.y), new a.Point(b.tr.x,b.tr.y), new a.Point(b.br.x,b.br.y), new a.Point(b.bl.x,b.bl.y)]
            }
            var c = a.util.degreesToRadians
              , d = a.util.multiplyTransformMatrices;
            a.util.object.extend(a.Object.prototype, {
                oCoords: null,
                aCoords: null,
                getCoords: function(a, c) {
                    this.oCoords || this.setCoords();
                    var d = a ? this.aCoords : this.oCoords;
                    return b(c ? this.calcCoords(a) : d)
                },
                intersectsWithRect: function(b, c, d, e) {
                    var f = this.getCoords(d, e);
                    return "Intersection" === a.Intersection.intersectPolygonRectangle(f, b, c).status
                },
                intersectsWithObject: function(b, c, d) {
                    return "Intersection" === a.Intersection.intersectPolygonPolygon(this.getCoords(c, d), b.getCoords(c, d)).status || b.isContainedWithinObject(this, c, d) || this.isContainedWithinObject(b, c, d)
                },
                isContainedWithinObject: function(a, b, c) {
                    for (var d = this.getCoords(b, c), e = 0, f = a._getImageLines(c ? a.calcCoords(b) : b ? a.aCoords : a.oCoords); e < 4; e++)
                        if (!a.containsPoint(d[e], f))
                            return !1;
                    return !0
                },
                isContainedWithinRect: function(a, b, c, d) {
                    var e = this.getBoundingRect(c, d);
                    return e.left >= a.x && e.left + e.width <= b.x && e.top >= a.y && e.top + e.height <= b.y
                },
                containsPoint: function(a, b, c, d) {
                    var b = b || this._getImageLines(d ? this.calcCoords(c) : c ? this.aCoords : this.oCoords)
                      , e = this._findCrossPoints(a, b);
                    return 0 !== e && e % 2 == 1
                },
                isOnScreen: function(a) {
                    if (!this.canvas)
                        return !1;
                    for (var b, c = this.canvas.vptCoords.tl, d = this.canvas.vptCoords.br, e = this.getCoords(!0, a), f = 0; f < 4; f++)
                        if (b = e[f],
                        b.x <= d.x && b.x >= c.x && b.y <= d.y && b.y >= c.y)
                            return !0;
                    return !1
                },
                _getImageLines: function(a) {
                    return {
                        topline: {
                            o: a.tl,
                            d: a.tr
                        },
                        rightline: {
                            o: a.tr,
                            d: a.br
                        },
                        bottomline: {
                            o: a.br,
                            d: a.bl
                        },
                        leftline: {
                            o: a.bl,
                            d: a.tl
                        }
                    }
                },
                _findCrossPoints: function(a, b) {
                    var c, d, e, f, g, h, i = 0;
                    for (var j in b)
                        if (h = b[j],
                        !(h.o.y < a.y && h.d.y < a.y || h.o.y >= a.y && h.d.y >= a.y || (h.o.x === h.d.x && h.o.x >= a.x ? g = h.o.x : (c = 0,
                        d = (h.d.y - h.o.y) / (h.d.x - h.o.x),
                        e = a.y - c * a.x,
                        f = h.o.y - d * h.o.x,
                        g = -(e - f) / (c - d)),
                        g >= a.x && (i += 1),
                        2 !== i)))
                            break;
                    return i
                },
                getBoundingRectWidth: function() {
                    return this.getBoundingRect().width
                },
                getBoundingRectHeight: function() {
                    return this.getBoundingRect().height
                },
                getBoundingRect: function(b, c) {
                    var d = this.getCoords(b, c);
                    return a.util.makeBoundingBoxFromPoints(d)
                },
                getWidth: function() {
                    return this._getTransformedDimensions().x
                },
                getHeight: function() {
                    return this._getTransformedDimensions().y
                },
                _constrainScale: function(a) {
                    return Math.abs(a) < this.minScaleLimit ? a < 0 ? -this.minScaleLimit : this.minScaleLimit : a
                },
                scale: function(a) {
                    return a = this._constrainScale(a),
                    a < 0 && (this.flipX = !this.flipX,
                    this.flipY = !this.flipY,
                    a *= -1),
                    this.scaleX = a,
                    this.scaleY = a,
                    this.setCoords()
                },
                scaleToWidth: function(a) {
                    var b = this.getBoundingRect().width / this.getWidth();
                    return this.scale(a / this.width / b)
                },
                scaleToHeight: function(a) {
                    var b = this.getBoundingRect().height / this.getHeight();
                    return this.scale(a / this.height / b)
                },
                calcCoords: function(b) {
                    var d = c(this.angle)
                      , e = this.getViewportTransform()
                      , f = b ? this._getTransformedDimensions() : this._calculateCurrentDimensions()
                      , g = f.x
                      , h = f.y
                      , i = Math.sin(d)
                      , j = Math.cos(d)
                      , k = g > 0 ? Math.atan(h / g) : 0
                      , l = g / Math.cos(k) / 2
                      , m = Math.cos(k + d) * l
                      , n = Math.sin(k + d) * l
                      , o = this.getCenterPoint()
                      , p = b ? o : a.util.transformPoint(o, e)
                      , q = new a.Point(p.x - m,p.y - n)
                      , r = new a.Point(q.x + g * j,q.y + g * i)
                      , s = new a.Point(q.x - h * i,q.y + h * j)
                      , t = new a.Point(p.x + m,p.y + n);
                    if (!b)
                        var u = new a.Point((q.x + s.x) / 2,(q.y + s.y) / 2)
                          , v = new a.Point((r.x + q.x) / 2,(r.y + q.y) / 2)
                          , w = new a.Point((t.x + r.x) / 2,(t.y + r.y) / 2)
                          , x = new a.Point((t.x + s.x) / 2,(t.y + s.y) / 2)
                          , y = new a.Point(v.x + i * this.rotatingPointOffset,v.y - j * this.rotatingPointOffset);
                    var p = {
                        tl: q,
                        tr: r,
                        br: t,
                        bl: s
                    };
                    return b || (p.ml = u,
                    p.mt = v,
                    p.mr = w,
                    p.mb = x,
                    p.mtr = y),
                    p
                },
                setCoords: function(a, b) {
                    return this.oCoords = this.calcCoords(a),
                    b || (this.aCoords = this.calcCoords(!0)),
                    a || this._setCornerCoords && this._setCornerCoords(),
                    this
                },
                _calcRotateMatrix: function() {
                    if (this.angle) {
                        var b = c(this.angle)
                          , d = Math.cos(b)
                          , e = Math.sin(b);
                        return [d, e, -e, d, 0, 0]
                    }
                    return a.iMatrix.concat()
                },
                calcTransformMatrix: function(b) {
                    var c = this.getCenterPoint()
                      , e = [1, 0, 0, 1, c.x, c.y]
                      , f = this._calcRotateMatrix()
                      , g = this._calcDimensionsTransformMatrix(this.skewX, this.skewY, !0)
                      , h = this.group && !b ? this.group.calcTransformMatrix() : a.iMatrix.concat();
                    return h = d(h, e),
                    h = d(h, f),
                    h = d(h, g)
                },
                _calcDimensionsTransformMatrix: function(a, b, e) {
                    var f = [1, 0, Math.tan(c(a)), 1]
                      , g = [1, Math.tan(c(b)), 0, 1]
                      , h = this.scaleX * (e && this.flipX ? -1 : 1)
                      , i = this.scaleY * (e && this.flipY ? -1 : 1)
                      , j = [h, 0, 0, i]
                      , k = d(j, f, !0);
                    return d(k, g, !0)
                },
                _getNonTransformedDimensions: function() {
                    var a = this.strokeWidth;
                    return {
                        x: this.width + a,
                        y: this.height + a
                    }
                },
                _getTransformedDimensions: function(b, c) {
                    void 0 === b && (b = this.skewX),
                    void 0 === c && (c = this.skewY);
                    var d, e, f = this._getNonTransformedDimensions(), g = f.x / 2, h = f.y / 2, i = [{
                        x: -g,
                        y: -h
                    }, {
                        x: g,
                        y: -h
                    }, {
                        x: -g,
                        y: h
                    }, {
                        x: g,
                        y: h
                    }], j = this._calcDimensionsTransformMatrix(b, c, !1);
                    for (d = 0; d < i.length; d++)
                        i[d] = a.util.transformPoint(i[d], j);
                    return e = a.util.makeBoundingBoxFromPoints(i),
                    {
                        x: e.width,
                        y: e.height
                    }
                },
                _calculateCurrentDimensions: function() {
                    var b = this.getViewportTransform()
                      , c = this._getTransformedDimensions();
                    return a.util.transformPoint(c, b, !0).scalarAdd(2 * this.padding)
                }
            })
        }(),
        a.util.object.extend(a.Object.prototype, {
            sendToBack: function() {
                return this.group ? a.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this),
                this
            },
            bringToFront: function() {
                return this.group ? a.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this),
                this
            },
            sendBackwards: function(b) {
                return this.group ? a.StaticCanvas.prototype.sendBackwards.call(this.group, this, b) : this.canvas.sendBackwards(this, b),
                this
            },
            bringForward: function(b) {
                return this.group ? a.StaticCanvas.prototype.bringForward.call(this.group, this, b) : this.canvas.bringForward(this, b),
                this
            },
            moveTo: function(b) {
                return this.group ? a.StaticCanvas.prototype.moveTo.call(this.group, this, b) : this.canvas.moveTo(this, b),
                this
            }
        }),
        function() {
            function b(b, c) {
                if (c) {
                    if (c.toLive)
                        return b + ": url(#SVGID_" + c.id + "); ";
                    var d = new a.Color(c)
                      , e = b + ": " + d.toRgb() + "; "
                      , f = d.getAlpha();
                    return 1 !== f && (e += b + "-opacity: " + f.toString() + "; "),
                    e
                }
                return b + ": none; "
            }
            a.util.object.extend(a.Object.prototype, {
                getSvgStyles: function(a) {
                    var c = this.fillRule
                      , d = this.strokeWidth ? this.strokeWidth : "0"
                      , e = this.strokeDashArray ? this.strokeDashArray.join(" ") : "none"
                      , f = this.strokeLineCap ? this.strokeLineCap : "butt"
                      , g = this.strokeLineJoin ? this.strokeLineJoin : "miter"
                      , h = this.strokeMiterLimit ? this.strokeMiterLimit : "4"
                      , i = void 0 !== this.opacity ? this.opacity : "1"
                      , j = this.visible ? "" : " visibility: hidden;"
                      , k = a ? "" : this.getSvgFilter()
                      , l = b("fill", this.fill);
                    return [b("stroke", this.stroke), "stroke-width: ", d, "; ", "stroke-dasharray: ", e, "; ", "stroke-linecap: ", f, "; ", "stroke-linejoin: ", g, "; ", "stroke-miterlimit: ", h, "; ", l, "fill-rule: ", c, "; ", "opacity: ", i, ";", k, j].join("")
                },
                getSvgFilter: function() {
                    return this.shadow ? "filter: url(#SVGID_" + this.shadow.id + ");" : ""
                },
                getSvgId: function() {
                    return this.id ? 'id="' + this.id + '" ' : ""
                },
                getSvgTransform: function() {
                    if (this.group && "path-group" === this.group.type)
                        return "";
                    var b = a.util.toFixed
                      , c = this.getAngle()
                      , d = this.getSkewX() % 360
                      , e = this.getSkewY() % 360
                      , f = this.getCenterPoint()
                      , g = a.Object.NUM_FRACTION_DIGITS
                      , h = "path-group" === this.type ? "" : "translate(" + b(f.x, g) + " " + b(f.y, g) + ")"
                      , i = 0 !== c ? " rotate(" + b(c, g) + ")" : ""
                      , j = 1 === this.scaleX && 1 === this.scaleY ? "" : " scale(" + b(this.scaleX, g) + " " + b(this.scaleY, g) + ")"
                      , k = 0 !== d ? " skewX(" + b(d, g) + ")" : ""
                      , l = 0 !== e ? " skewY(" + b(e, g) + ")" : ""
                      , m = "path-group" === this.type ? this.width : 0
                      , n = this.flipX ? " matrix(-1 0 0 1 " + m + " 0) " : ""
                      , o = "path-group" === this.type ? this.height : 0;
                    return [h, i, j, n, this.flipY ? " matrix(1 0 0 -1 0 " + o + ")" : "", k, l].join("")
                },
                getSvgTransformMatrix: function() {
                    return this.transformMatrix ? " matrix(" + this.transformMatrix.join(" ") + ") " : ""
                },
                _createBaseSVGMarkup: function() {
                    var a = [];
                    return this.fill && this.fill.toLive && a.push(this.fill.toSVG(this, !1)),
                    this.stroke && this.stroke.toLive && a.push(this.stroke.toSVG(this, !1)),
                    this.shadow && a.push(this.shadow.toSVG(this)),
                    a
                }
            })
        }(),
        function() {
            function b(a, b, c) {
                var e = {};
                c.forEach(function(b) {
                    e[b] = a[b]
                }),
                d(a[b], e, !0)
            }
            function c(b, d, e) {
                if (!a.isLikelyNode && b instanceof Element)
                    return b === d;
                if (b instanceof Array) {
                    if (b.length !== d.length)
                        return !1;
                    for (var f = 0, g = b.length; f < g; f++)
                        if (b[f] !== d[f])
                            return !1;
                    return !0
                }
                if (b && "object" == typeof b) {
                    if (!e && Object.keys(b).length !== Object.keys(d).length)
                        return !1;
                    for (var h in b)
                        if (!c(b[h], d[h]))
                            return !1;
                    return !0
                }
                return b === d
            }
            var d = a.util.object.extend;
            a.util.object.extend(a.Object.prototype, {
                hasStateChanged: function(a) {
                    return a = a || "stateProperties",
                    a = "_" + a,
                    !c(this[a], this, !0)
                },
                saveState: function(a) {
                    var c = a && a.propertySet || "stateProperties"
                      , d = "_" + c;
                    return this[d] ? (b(this, d, this[c]),
                    a && a.stateProperties && b(this, d, a.stateProperties),
                    this) : this.setupState(a)
                },
                setupState: function(a) {
                    a = a || {};
                    var b = a.propertySet || "stateProperties";
                    return a.propertySet = b,
                    this["_" + b] = {},
                    this.saveState(a),
                    this
                }
            })
        }(),
        function() {
            var b = a.util.degreesToRadians
              , c = function() {
                return "undefined" != typeof G_vmlCanvasManager
            };
            a.util.object.extend(a.Object.prototype, {
                _controlsVisibility: null,
                _findTargetCorner: function(a) {
                    if (!this.hasControls || !this.active)
                        return !1;
                    var b, c, d = a.x, e = a.y;
                    this.__corner = 0;
                    for (var f in this.oCoords)
                        if (this.isControlVisible(f) && ("mtr" !== f || this.hasRotatingPoint) && (!this.get("lockUniScaling") || "mt" !== f && "mr" !== f && "mb" !== f && "ml" !== f) && (c = this._getImageLines(this.oCoords[f].corner),
                        0 !== (b = this._findCrossPoints({
                            x: d,
                            y: e
                        }, c)) && b % 2 == 1))
                            return this.__corner = f,
                            f;
                    return !1
                },
                _setCornerCoords: function() {
                    var a, c, d = this.oCoords, e = b(45 - this.angle), f = .707106 * this.cornerSize, g = f * Math.cos(e), h = f * Math.sin(e);
                    for (var i in d)
                        a = d[i].x,
                        c = d[i].y,
                        d[i].corner = {
                            tl: {
                                x: a - h,
                                y: c - g
                            },
                            tr: {
                                x: a + g,
                                y: c - h
                            },
                            bl: {
                                x: a - g,
                                y: c + h
                            },
                            br: {
                                x: a + h,
                                y: c + g
                            }
                        }
                },
                drawSelectionBackground: function(a) {
                    if (!this.selectionBackgroundColor || this.group || !this.active)
                        return this;
                    a.save();
                    var c = this.getCenterPoint()
                      , d = this._calculateCurrentDimensions()
                      , e = this.canvas.viewportTransform;
                    return a.translate(c.x, c.y),
                    a.scale(1 / e[0], 1 / e[3]),
                    a.rotate(b(this.angle)),
                    a.fillStyle = this.selectionBackgroundColor,
                    a.fillRect(-d.x / 2, -d.y / 2, d.x, d.y),
                    a.restore(),
                    this
                },
                drawBorders: function(a) {
                    if (!this.hasBorders)
                        return this;
                    var b = this._calculateCurrentDimensions()
                      , c = 1 / this.borderScaleFactor
                      , d = b.x + c
                      , e = b.y + c;
                    if (a.save(),
                    a.strokeStyle = this.borderColor,
                    this._setLineDash(a, this.borderDashArray, null),
                    a.strokeRect(-d / 2, -e / 2, d, e),
                    this.hasRotatingPoint && this.isControlVisible("mtr") && !this.get("lockRotation") && this.hasControls) {
                        var f = -e / 2;
                        a.beginPath(),
                        a.moveTo(0, f),
                        a.lineTo(0, f - this.rotatingPointOffset),
                        a.closePath(),
                        a.stroke()
                    }
                    return a.restore(),
                    this
                },
                drawBordersInGroup: function(b, c) {
                    if (!this.hasBorders)
                        return this;
                    var d = this._getNonTransformedDimensions()
                      , e = a.util.customTransformMatrix(c.scaleX, c.scaleY, c.skewX)
                      , f = a.util.transformPoint(d, e)
                      , g = 1 / this.borderScaleFactor
                      , h = f.x + g
                      , i = f.y + g;
                    return b.save(),
                    this._setLineDash(b, this.borderDashArray, null),
                    b.strokeStyle = this.borderColor,
                    b.strokeRect(-h / 2, -i / 2, h, i),
                    b.restore(),
                    this
                },
                drawControls: function(a) {
                    if (!this.hasControls)
                        return this;
                    var b = this._calculateCurrentDimensions()
                      , c = b.x
                      , d = b.y
                      , e = this.cornerSize
                      , f = -(c + e) / 2
                      , g = -(d + e) / 2
                      , h = this.transparentCorners ? "stroke" : "fill";
                    return a.save(),
                    a.strokeStyle = a.fillStyle = this.cornerColor,
                    this.transparentCorners || (a.strokeStyle = this.cornerStrokeColor),
                    this._setLineDash(a, this.cornerDashArray, null),
                    this._drawControl("tl", a, h, f, g),
                    this._drawControl("tr", a, h, f + c, g),
                    this._drawControl("bl", a, h, f, g + d),
                    this._drawControl("br", a, h, f + c, g + d),
                    this.get("lockUniScaling") || (this._drawControl("mt", a, h, f + c / 2, g),
                    this._drawControl("mb", a, h, f + c / 2, g + d),
                    this._drawControl("mr", a, h, f + c, g + d / 2),
                    this._drawControl("ml", a, h, f, g + d / 2)),
                    this.hasRotatingPoint && this._drawControl("mtr", a, h, f + c / 2, g - this.rotatingPointOffset),
                    a.restore(),
                    this
                },
                _drawControl: function(a, b, d, e, f) {
                    if (this.isControlVisible(a)) {
                        var g = this.cornerSize
                          , h = !this.transparentCorners && this.cornerStrokeColor;
                        switch (this.cornerStyle) {
                        case "circle":
                            b.beginPath(),
                            b.arc(e + g / 2, f + g / 2, g / 2, 0, 2 * Math.PI, !1),
                            b[d](),
                            h && b.stroke();
                            break;
                        default:
                            c() || this.transparentCorners || b.clearRect(e, f, g, g),
                            b[d + "Rect"](e, f, g, g),
                            h && b.strokeRect(e, f, g, g)
                        }
                    }
                },
                isControlVisible: function(a) {
                    return this._getControlsVisibility()[a]
                },
                setControlVisible: function(a, b) {
                    return this._getControlsVisibility()[a] = b,
                    this
                },
                setControlsVisibility: function(a) {
                    a || (a = {});
                    for (var b in a)
                        this.setControlVisible(b, a[b]);
                    return this
                },
                _getControlsVisibility: function() {
                    return this._controlsVisibility || (this._controlsVisibility = {
                        tl: !0,
                        tr: !0,
                        br: !0,
                        bl: !0,
                        ml: !0,
                        mt: !0,
                        mr: !0,
                        mb: !0,
                        mtr: !0
                    }),
                    this._controlsVisibility
                }
            })
        }(),
        function(a) {
            "use strict";
            function b(a, b) {
                var c = a.origin
                  , d = a.axis1
                  , e = a.axis2
                  , f = a.dimension
                  , g = b.nearest
                  , h = b.center
                  , i = b.farthest;
                return function() {
                    switch (this.get(c)) {
                    case g:
                        return Math.min(this.get(d), this.get(e));
                    case h:
                        return Math.min(this.get(d), this.get(e)) + .5 * this.get(f);
                    case i:
                        return Math.max(this.get(d), this.get(e))
                    }
                }
            }
            var c = a.fabric || (a.fabric = {})
              , d = c.util.object.extend
              , e = c.util.object.clone
              , f = {
                x1: 1,
                x2: 1,
                y1: 1,
                y2: 1
            }
              , g = c.StaticCanvas.supports("setLineDash");
            if (c.Line)
                return void c.warn("fabric.Line is already defined");
            var h = c.Object.prototype.cacheProperties.concat();
            h.push("x1", "x2", "y1", "y2"),
            c.Line = c.util.createClass(c.Object, {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                cacheProperties: h,
                initialize: function(a, b) {
                    a || (a = [0, 0, 0, 0]),
                    this.callSuper("initialize", b),
                    this.set("x1", a[0]),
                    this.set("y1", a[1]),
                    this.set("x2", a[2]),
                    this.set("y2", a[3]),
                    this._setWidthHeight(b)
                },
                _setWidthHeight: function(a) {
                    a || (a = {}),
                    this.width = Math.abs(this.x2 - this.x1),
                    this.height = Math.abs(this.y2 - this.y1),
                    this.left = "left"in a ? a.left : this._getLeftToOriginX(),
                    this.top = "top"in a ? a.top : this._getTopToOriginY()
                },
                _set: function(a, b) {
                    return this.callSuper("_set", a, b),
                    void 0 !== f[a] && this._setWidthHeight(),
                    this
                },
                _getLeftToOriginX: b({
                    origin: "originX",
                    axis1: "x1",
                    axis2: "x2",
                    dimension: "width"
                }, {
                    nearest: "left",
                    center: "center",
                    farthest: "right"
                }),
                _getTopToOriginY: b({
                    origin: "originY",
                    axis1: "y1",
                    axis2: "y2",
                    dimension: "height"
                }, {
                    nearest: "top",
                    center: "center",
                    farthest: "bottom"
                }),
                _render: function(a, b) {
                    if (a.beginPath(),
                    b) {
                        var c = this.getCenterPoint()
                          , d = this.strokeWidth / 2;
                        a.translate(c.x - ("butt" === this.strokeLineCap && 0 === this.height ? 0 : d), c.y - ("butt" === this.strokeLineCap && 0 === this.width ? 0 : d))
                    }
                    if (!this.strokeDashArray || this.strokeDashArray && g) {
                        var e = this.calcLinePoints();
                        a.moveTo(e.x1, e.y1),
                        a.lineTo(e.x2, e.y2)
                    }
                    a.lineWidth = this.strokeWidth;
                    var f = a.strokeStyle;
                    a.strokeStyle = this.stroke || a.fillStyle,
                    this.stroke && this._renderStroke(a),
                    a.strokeStyle = f
                },
                _renderDashedStroke: function(a) {
                    var b = this.calcLinePoints();
                    a.beginPath(),
                    c.util.drawDashedLine(a, b.x1, b.y1, b.x2, b.y2, this.strokeDashArray),
                    a.closePath()
                },
                toObject: function(a) {
                    return d(this.callSuper("toObject", a), this.calcLinePoints())
                },
                _getNonTransformedDimensions: function() {
                    var a = this.callSuper("_getNonTransformedDimensions");
                    return "butt" === this.strokeLineCap && (0 === this.width && (a.y -= this.strokeWidth),
                    0 === this.height && (a.x -= this.strokeWidth)),
                    a
                },
                calcLinePoints: function() {
                    var a = this.x1 <= this.x2 ? -1 : 1
                      , b = this.y1 <= this.y2 ? -1 : 1
                      , c = a * this.width * .5
                      , d = b * this.height * .5;
                    return {
                        x1: c,
                        x2: a * this.width * -.5,
                        y1: d,
                        y2: b * this.height * -.5
                    }
                },
                toSVG: function(a) {
                    var b = this._createBaseSVGMarkup()
                      , c = {
                        x1: this.x1,
                        x2: this.x2,
                        y1: this.y1,
                        y2: this.y2
                    };
                    return this.group && "path-group" === this.group.type || (c = this.calcLinePoints()),
                    b.push("<line ", this.getSvgId(), 'x1="', c.x1, '" y1="', c.y1, '" x2="', c.x2, '" y2="', c.y2, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'),
                    a ? a(b.join("")) : b.join("")
                }
            }),
            c.Line.ATTRIBUTE_NAMES = c.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")),
            c.Line.fromElement = function(a, b) {
                b = b || {};
                var e = c.parseAttributes(a, c.Line.ATTRIBUTE_NAMES)
                  , f = [e.x1 || 0, e.y1 || 0, e.x2 || 0, e.y2 || 0];
                return b.originX = "left",
                b.originY = "top",
                new c.Line(f,d(e, b))
            }
            ,
            c.Line.fromObject = function(a, b, d) {
                function f(a) {
                    delete a.points,
                    b && b(a)
                }
                var g = e(a, !0);
                g.points = [a.x1, a.y1, a.x2, a.y2];
                var h = c.Object._fromObject("Line", g, f, d, "points");
                return h && delete h.points,
                h
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            function b(a) {
                return "radius"in a && a.radius >= 0
            }
            var c = a.fabric || (a.fabric = {})
              , d = Math.PI
              , e = c.util.object.extend;
            if (c.Circle)
                return void c.warn("fabric.Circle is already defined.");
            var f = c.Object.prototype.cacheProperties.concat();
            f.push("radius"),
            c.Circle = c.util.createClass(c.Object, {
                type: "circle",
                radius: 0,
                startAngle: 0,
                endAngle: 2 * d,
                cacheProperties: f,
                initialize: function(a) {
                    this.callSuper("initialize", a),
                    this.set("radius", a && a.radius || 0)
                },
                _set: function(a, b) {
                    return this.callSuper("_set", a, b),
                    "radius" === a && this.setRadius(b),
                    this
                },
                toObject: function(a) {
                    return this.callSuper("toObject", ["radius", "startAngle", "endAngle"].concat(a))
                },
                toSVG: function(a) {
                    var b = this._createBaseSVGMarkup()
                      , c = 0
                      , e = 0
                      , f = (this.endAngle - this.startAngle) % (2 * d);
                    if (0 === f)
                        this.group && "path-group" === this.group.type && (c = this.left + this.radius,
                        e = this.top + this.radius),
                        b.push("<circle ", this.getSvgId(), 'cx="' + c + '" cy="' + e + '" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n');
                    else {
                        var g = Math.cos(this.startAngle) * this.radius
                          , h = Math.sin(this.startAngle) * this.radius
                          , i = Math.cos(this.endAngle) * this.radius
                          , j = Math.sin(this.endAngle) * this.radius
                          , k = f > d ? "1" : "0";
                        b.push('<path d="M ' + g + " " + h, " A " + this.radius + " " + this.radius, " 0 ", +k + " 1", " " + i + " " + j, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n')
                    }
                    return a ? a(b.join("")) : b.join("")
                },
                _render: function(a, b) {
                    a.beginPath(),
                    a.arc(b ? this.left + this.radius : 0, b ? this.top + this.radius : 0, this.radius, this.startAngle, this.endAngle, !1),
                    this._renderFill(a),
                    this._renderStroke(a)
                },
                getRadiusX: function() {
                    return this.get("radius") * this.get("scaleX")
                },
                getRadiusY: function() {
                    return this.get("radius") * this.get("scaleY")
                },
                setRadius: function(a) {
                    return this.radius = a,
                    this.set("width", 2 * a).set("height", 2 * a)
                }
            }),
            c.Circle.ATTRIBUTE_NAMES = c.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")),
            c.Circle.fromElement = function(a, d) {
                d || (d = {});
                var f = c.parseAttributes(a, c.Circle.ATTRIBUTE_NAMES);
                if (!b(f))
                    throw new Error("value of `r` attribute is required and can not be negative");
                f.left = f.left || 0,
                f.top = f.top || 0;
                var g = new c.Circle(e(f, d));
                return g.left -= g.radius,
                g.top -= g.radius,
                g
            }
            ,
            c.Circle.fromObject = function(a, b, d) {
                return c.Object._fromObject("Circle", a, b, d)
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {});
            if (b.Triangle)
                return void b.warn("fabric.Triangle is already defined");
            b.Triangle = b.util.createClass(b.Object, {
                type: "triangle",
                initialize: function(a) {
                    this.callSuper("initialize", a),
                    this.set("width", a && a.width || 100).set("height", a && a.height || 100)
                },
                _render: function(a) {
                    var b = this.width / 2
                      , c = this.height / 2;
                    a.beginPath(),
                    a.moveTo(-b, c),
                    a.lineTo(0, -c),
                    a.lineTo(b, c),
                    a.closePath(),
                    this._renderFill(a),
                    this._renderStroke(a)
                },
                _renderDashedStroke: function(a) {
                    var c = this.width / 2
                      , d = this.height / 2;
                    a.beginPath(),
                    b.util.drawDashedLine(a, -c, d, 0, -d, this.strokeDashArray),
                    b.util.drawDashedLine(a, 0, -d, c, d, this.strokeDashArray),
                    b.util.drawDashedLine(a, c, d, -c, d, this.strokeDashArray),
                    a.closePath()
                },
                toSVG: function(a) {
                    var b = this._createBaseSVGMarkup()
                      , c = this.width / 2
                      , d = this.height / 2
                      , e = [-c + " " + d, "0 " + -d, c + " " + d].join(",");
                    return b.push("<polygon ", this.getSvgId(), 'points="', e, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'),
                    a ? a(b.join("")) : b.join("")
                }
            }),
            b.Triangle.fromObject = function(a, c, d) {
                return b.Object._fromObject("Triangle", a, c, d)
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = 2 * Math.PI
              , d = b.util.object.extend;
            if (b.Ellipse)
                return void b.warn("fabric.Ellipse is already defined.");
            var e = b.Object.prototype.cacheProperties.concat();
            e.push("rx", "ry"),
            b.Ellipse = b.util.createClass(b.Object, {
                type: "ellipse",
                rx: 0,
                ry: 0,
                cacheProperties: e,
                initialize: function(a) {
                    this.callSuper("initialize", a),
                    this.set("rx", a && a.rx || 0),
                    this.set("ry", a && a.ry || 0)
                },
                _set: function(a, b) {
                    switch (this.callSuper("_set", a, b),
                    a) {
                    case "rx":
                        this.rx = b,
                        this.set("width", 2 * b);
                        break;
                    case "ry":
                        this.ry = b,
                        this.set("height", 2 * b)
                    }
                    return this
                },
                getRx: function() {
                    return this.get("rx") * this.get("scaleX")
                },
                getRy: function() {
                    return this.get("ry") * this.get("scaleY")
                },
                toObject: function(a) {
                    return this.callSuper("toObject", ["rx", "ry"].concat(a))
                },
                toSVG: function(a) {
                    var b = this._createBaseSVGMarkup()
                      , c = 0
                      , d = 0;
                    return this.group && "path-group" === this.group.type && (c = this.left + this.rx,
                    d = this.top + this.ry),
                    b.push("<ellipse ", this.getSvgId(), 'cx="', c, '" cy="', d, '" ', 'rx="', this.rx, '" ry="', this.ry, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'),
                    a ? a(b.join("")) : b.join("")
                },
                _render: function(a, b) {
                    a.beginPath(),
                    a.save(),
                    a.transform(1, 0, 0, this.ry / this.rx, 0, 0),
                    a.arc(b ? this.left + this.rx : 0, b ? (this.top + this.ry) * this.rx / this.ry : 0, this.rx, 0, c, !1),
                    a.restore(),
                    this._renderFill(a),
                    this._renderStroke(a)
                }
            }),
            b.Ellipse.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")),
            b.Ellipse.fromElement = function(a, c) {
                c || (c = {});
                var e = b.parseAttributes(a, b.Ellipse.ATTRIBUTE_NAMES);
                e.left = e.left || 0,
                e.top = e.top || 0;
                var f = new b.Ellipse(d(e, c));
                return f.top -= f.ry,
                f.left -= f.rx,
                f
            }
            ,
            b.Ellipse.fromObject = function(a, c, d) {
                return b.Object._fromObject("Ellipse", a, c, d)
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.object.extend;
            if (b.Rect)
                return void b.warn("fabric.Rect is already defined");
            var d = b.Object.prototype.stateProperties.concat();
            d.push("rx", "ry"),
            b.Rect = b.util.createClass(b.Object, {
                stateProperties: d,
                type: "rect",
                rx: 0,
                ry: 0,
                strokeDashArray: null,
                initialize: function(a) {
                    this.callSuper("initialize", a),
                    this._initRxRy()
                },
                _initRxRy: function() {
                    this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
                },
                _render: function(a, b) {
                    if (1 === this.width && 1 === this.height)
                        return void a.fillRect(-.5, -.5, 1, 1);
                    var c = this.rx ? Math.min(this.rx, this.width / 2) : 0
                      , d = this.ry ? Math.min(this.ry, this.height / 2) : 0
                      , e = this.width
                      , f = this.height
                      , g = b ? this.left : -this.width / 2
                      , h = b ? this.top : -this.height / 2
                      , i = 0 !== c || 0 !== d
                      , j = .4477152502;
                    a.beginPath(),
                    a.moveTo(g + c, h),
                    a.lineTo(g + e - c, h),
                    i && a.bezierCurveTo(g + e - j * c, h, g + e, h + j * d, g + e, h + d),
                    a.lineTo(g + e, h + f - d),
                    i && a.bezierCurveTo(g + e, h + f - j * d, g + e - j * c, h + f, g + e - c, h + f),
                    a.lineTo(g + c, h + f),
                    i && a.bezierCurveTo(g + j * c, h + f, g, h + f - j * d, g, h + f - d),
                    a.lineTo(g, h + d),
                    i && a.bezierCurveTo(g, h + j * d, g + j * c, h, g + c, h),
                    a.closePath(),
                    this._renderFill(a),
                    this._renderStroke(a)
                },
                _renderDashedStroke: function(a) {
                    var c = -this.width / 2
                      , d = -this.height / 2
                      , e = this.width
                      , f = this.height;
                    a.beginPath(),
                    b.util.drawDashedLine(a, c, d, c + e, d, this.strokeDashArray),
                    b.util.drawDashedLine(a, c + e, d, c + e, d + f, this.strokeDashArray),
                    b.util.drawDashedLine(a, c + e, d + f, c, d + f, this.strokeDashArray),
                    b.util.drawDashedLine(a, c, d + f, c, d, this.strokeDashArray),
                    a.closePath()
                },
                toObject: function(a) {
                    return this.callSuper("toObject", ["rx", "ry"].concat(a))
                },
                toSVG: function(a) {
                    var b = this._createBaseSVGMarkup()
                      , c = this.left
                      , d = this.top;
                    return this.group && "path-group" === this.group.type || (c = -this.width / 2,
                    d = -this.height / 2),
                    b.push("<rect ", this.getSvgId(), 'x="', c, '" y="', d, '" rx="', this.get("rx"), '" ry="', this.get("ry"), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'),
                    a ? a(b.join("")) : b.join("")
                }
            }),
            b.Rect.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")),
            b.Rect.fromElement = function(a, d) {
                if (!a)
                    return null;
                d = d || {};
                var e = b.parseAttributes(a, b.Rect.ATTRIBUTE_NAMES);
                e.left = e.left || 0,
                e.top = e.top || 0;
                var f = new b.Rect(c(d ? b.util.object.clone(d) : {}, e));
                return f.visible = f.visible && f.width > 0 && f.height > 0,
                f
            }
            ,
            b.Rect.fromObject = function(a, c, d) {
                return b.Object._fromObject("Rect", a, c, d)
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.object.extend
              , d = b.util.array.min
              , e = b.util.array.max
              , f = b.util.toFixed;
            if (b.Polyline)
                return void b.warn("fabric.Polyline is already defined");
            var g = b.Object.prototype.cacheProperties.concat();
            g.push("points"),
            b.Polyline = b.util.createClass(b.Object, {
                type: "polyline",
                points: null,
                minX: 0,
                minY: 0,
                cacheProperties: g,
                initialize: function(a, b) {
                    b = b || {},
                    this.points = a || [],
                    this.callSuper("initialize", b),
                    this._calcDimensions(),
                    "top"in b || (this.top = this.minY),
                    "left"in b || (this.left = this.minX),
                    this.pathOffset = {
                        x: this.minX + this.width / 2,
                        y: this.minY + this.height / 2
                    }
                },
                _calcDimensions: function() {
                    var a = this.points
                      , b = d(a, "x")
                      , c = d(a, "y")
                      , f = e(a, "x")
                      , g = e(a, "y");
                    this.width = f - b || 0,
                    this.height = g - c || 0,
                    this.minX = b || 0,
                    this.minY = c || 0
                },
                toObject: function(a) {
                    return c(this.callSuper("toObject", a), {
                        points: this.points.concat()
                    })
                },
                toSVG: function(a) {
                    for (var b, c = [], d = this._createBaseSVGMarkup(), e = 0, g = this.points.length; e < g; e++)
                        c.push(f(this.points[e].x, 2), ",", f(this.points[e].y, 2), " ");
                    return this.group && "path-group" === this.group.type || (b = " translate(" + -this.pathOffset.x + ", " + -this.pathOffset.y + ") "),
                    d.push("<", this.type, " ", this.getSvgId(), 'points="', c.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), b, " ", this.getSvgTransformMatrix(), '"/>\n'),
                    a ? a(d.join("")) : d.join("")
                },
                commonRender: function(a, b) {
                    var c, d = this.points.length, e = b ? 0 : this.pathOffset.x, f = b ? 0 : this.pathOffset.y;
                    if (!d || isNaN(this.points[d - 1].y))
                        return !1;
                    a.beginPath(),
                    a.moveTo(this.points[0].x - e, this.points[0].y - f);
                    for (var g = 0; g < d; g++)
                        c = this.points[g],
                        a.lineTo(c.x - e, c.y - f);
                    return !0
                },
                _render: function(a, b) {
                    this.commonRender(a, b) && (this._renderFill(a),
                    this._renderStroke(a))
                },
                _renderDashedStroke: function(a) {
                    var c, d;
                    a.beginPath();
                    for (var e = 0, f = this.points.length; e < f; e++)
                        c = this.points[e],
                        d = this.points[e + 1] || c,
                        b.util.drawDashedLine(a, c.x, c.y, d.x, d.y, this.strokeDashArray)
                },
                complexity: function() {
                    return this.get("points").length
                }
            }),
            b.Polyline.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(),
            b.Polyline.fromElement = function(a, c) {
                if (!a)
                    return null;
                c || (c = {});
                var d = b.parsePointsAttribute(a.getAttribute("points"))
                  , e = b.parseAttributes(a, b.Polyline.ATTRIBUTE_NAMES);
                return new b.Polyline(d,b.util.object.extend(e, c))
            }
            ,
            b.Polyline.fromObject = function(a, c, d) {
                return b.Object._fromObject("Polyline", a, c, d, "points")
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.object.extend;
            if (b.Polygon)
                return void b.warn("fabric.Polygon is already defined");
            b.Polygon = b.util.createClass(b.Polyline, {
                type: "polygon",
                _render: function(a, b) {
                    this.commonRender(a, b) && (a.closePath(),
                    this._renderFill(a),
                    this._renderStroke(a))
                },
                _renderDashedStroke: function(a) {
                    this.callSuper("_renderDashedStroke", a),
                    a.closePath()
                }
            }),
            b.Polygon.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(),
            b.Polygon.fromElement = function(a, d) {
                if (!a)
                    return null;
                d || (d = {});
                var e = b.parsePointsAttribute(a.getAttribute("points"))
                  , f = b.parseAttributes(a, b.Polygon.ATTRIBUTE_NAMES);
                return new b.Polygon(e,c(f, d))
            }
            ,
            b.Polygon.fromObject = function(a, c, d) {
                return b.Object._fromObject("Polygon", a, c, d, "points")
            }
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.array.min
              , d = b.util.array.max
              , e = b.util.object.extend
              , f = Object.prototype.toString
              , g = b.util.drawArc
              , h = {
                m: 2,
                l: 2,
                h: 1,
                v: 1,
                c: 6,
                s: 4,
                q: 4,
                t: 2,
                a: 7
            }
              , i = {
                m: "l",
                M: "L"
            };
            if (b.Path)
                return void b.warn("fabric.Path is already defined");
            var j = b.Object.prototype.cacheProperties.concat();
            j.push("path"),
            b.Path = b.util.createClass(b.Object, {
                type: "path",
                path: null,
                minX: 0,
                minY: 0,
                cacheProperties: j,
                initialize: function(a, b) {
                    b = b || {},
                    b && this.setOptions(b),
                    a || (a = []);
                    var c = "[object Array]" === f.call(a);
                    this.path = c ? a : a.match && a.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi),
                    this.path && (c || (this.path = this._parsePath()),
                    this._setPositionDimensions(b),
                    b.sourcePath && this.setSourcePath(b.sourcePath),
                    this.objectCaching && (this._createCacheCanvas(),
                    this.setupState({
                        propertySet: "cacheProperties"
                    })))
                },
                _setPositionDimensions: function(a) {
                    var b = this._parseDimensions();
                    this.minX = b.left,
                    this.minY = b.top,
                    this.width = b.width,
                    this.height = b.height,
                    void 0 === a.left && (this.left = b.left + ("center" === this.originX ? this.width / 2 : "right" === this.originX ? this.width : 0)),
                    void 0 === a.top && (this.top = b.top + ("center" === this.originY ? this.height / 2 : "bottom" === this.originY ? this.height : 0)),
                    this.pathOffset = this.pathOffset || {
                        x: this.minX + this.width / 2,
                        y: this.minY + this.height / 2
                    }
                },
                _renderPathCommands: function(a) {
                    var b, c, d, e = null, f = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = -this.pathOffset.x, n = -this.pathOffset.y;
                    this.group && "path-group" === this.group.type && (m = 0,
                    n = 0),
                    a.beginPath();
                    for (var o = 0, p = this.path.length; o < p; ++o) {
                        switch (b = this.path[o],
                        b[0]) {
                        case "l":
                            i += b[1],
                            j += b[2],
                            a.lineTo(i + m, j + n);
                            break;
                        case "L":
                            i = b[1],
                            j = b[2],
                            a.lineTo(i + m, j + n);
                            break;
                        case "h":
                            i += b[1],
                            a.lineTo(i + m, j + n);
                            break;
                        case "H":
                            i = b[1],
                            a.lineTo(i + m, j + n);
                            break;
                        case "v":
                            j += b[1],
                            a.lineTo(i + m, j + n);
                            break;
                        case "V":
                            j = b[1],
                            a.lineTo(i + m, j + n);
                            break;
                        case "m":
                            i += b[1],
                            j += b[2],
                            f = i,
                            h = j,
                            a.moveTo(i + m, j + n);
                            break;
                        case "M":
                            i = b[1],
                            j = b[2],
                            f = i,
                            h = j,
                            a.moveTo(i + m, j + n);
                            break;
                        case "c":
                            c = i + b[5],
                            d = j + b[6],
                            k = i + b[3],
                            l = j + b[4],
                            a.bezierCurveTo(i + b[1] + m, j + b[2] + n, k + m, l + n, c + m, d + n),
                            i = c,
                            j = d;
                            break;
                        case "C":
                            i = b[5],
                            j = b[6],
                            k = b[3],
                            l = b[4],
                            a.bezierCurveTo(b[1] + m, b[2] + n, k + m, l + n, i + m, j + n);
                            break;
                        case "s":
                            c = i + b[3],
                            d = j + b[4],
                            null === e[0].match(/[CcSs]/) ? (k = i,
                            l = j) : (k = 2 * i - k,
                            l = 2 * j - l),
                            a.bezierCurveTo(k + m, l + n, i + b[1] + m, j + b[2] + n, c + m, d + n),
                            k = i + b[1],
                            l = j + b[2],
                            i = c,
                            j = d;
                            break;
                        case "S":
                            c = b[3],
                            d = b[4],
                            null === e[0].match(/[CcSs]/) ? (k = i,
                            l = j) : (k = 2 * i - k,
                            l = 2 * j - l),
                            a.bezierCurveTo(k + m, l + n, b[1] + m, b[2] + n, c + m, d + n),
                            i = c,
                            j = d,
                            k = b[1],
                            l = b[2];
                            break;
                        case "q":
                            c = i + b[3],
                            d = j + b[4],
                            k = i + b[1],
                            l = j + b[2],
                            a.quadraticCurveTo(k + m, l + n, c + m, d + n),
                            i = c,
                            j = d;
                            break;
                        case "Q":
                            c = b[3],
                            d = b[4],
                            a.quadraticCurveTo(b[1] + m, b[2] + n, c + m, d + n),
                            i = c,
                            j = d,
                            k = b[1],
                            l = b[2];
                            break;
                        case "t":
                            c = i + b[1],
                            d = j + b[2],
                            null === e[0].match(/[QqTt]/) ? (k = i,
                            l = j) : (k = 2 * i - k,
                            l = 2 * j - l),
                            a.quadraticCurveTo(k + m, l + n, c + m, d + n),
                            i = c,
                            j = d;
                            break;
                        case "T":
                            c = b[1],
                            d = b[2],
                            null === e[0].match(/[QqTt]/) ? (k = i,
                            l = j) : (k = 2 * i - k,
                            l = 2 * j - l),
                            a.quadraticCurveTo(k + m, l + n, c + m, d + n),
                            i = c,
                            j = d;
                            break;
                        case "a":
                            g(a, i + m, j + n, [b[1], b[2], b[3], b[4], b[5], b[6] + i + m, b[7] + j + n]),
                            i += b[6],
                            j += b[7];
                            break;
                        case "A":
                            g(a, i + m, j + n, [b[1], b[2], b[3], b[4], b[5], b[6] + m, b[7] + n]),
                            i = b[6],
                            j = b[7];
                            break;
                        case "z":
                        case "Z":
                            i = f,
                            j = h,
                            a.closePath()
                        }
                        e = b
                    }
                },
                _render: function(a) {
                    this._renderPathCommands(a),
                    this._renderFill(a),
                    this._renderStroke(a)
                },
                toString: function() {
                    return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
                },
                toObject: function(a) {
                    return e(this.callSuper("toObject", ["sourcePath", "pathOffset"].concat(a)), {
                        path: this.path.map(function(a) {
                            return a.slice()
                        }),
                        top: this.top,
                        left: this.left
                    })
                },
                toDatalessObject: function(a) {
                    var b = this.toObject(a);
                    return this.sourcePath && (b.path = this.sourcePath),
                    delete b.sourcePath,
                    b
                },
                toSVG: function(a) {
                    for (var b = [], c = this._createBaseSVGMarkup(), d = "", e = 0, f = this.path.length; e < f; e++)
                        b.push(this.path[e].join(" "));
                    var g = b.join(" ");
                    return this.group && "path-group" === this.group.type || (d = " translate(" + -this.pathOffset.x + ", " + -this.pathOffset.y + ") "),
                    c.push("<path ", this.getSvgId(), 'd="', g, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), d, this.getSvgTransformMatrix(), '" stroke-linecap="round" ', "/>\n"),
                    a ? a(c.join("")) : c.join("")
                },
                complexity: function() {
                    return this.path.length
                },
                _parsePath: function() {
                    for (var a, b, c, d, e, f = [], g = [], j = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, k = 0, l = this.path.length; k < l; k++) {
                        for (a = this.path[k],
                        d = a.slice(1).trim(),
                        g.length = 0; c = j.exec(d); )
                            g.push(c[0]);
                        e = [a.charAt(0)];
                        for (var m = 0, n = g.length; m < n; m++)
                            b = parseFloat(g[m]),
                            isNaN(b) || e.push(b);
                        var o = e[0]
                          , p = h[o.toLowerCase()]
                          , q = i[o] || o;
                        if (e.length - 1 > p)
                            for (var r = 1, s = e.length; r < s; r += p)
                                f.push([o].concat(e.slice(r, r + p))),
                                o = q;
                        else
                            f.push(e)
                    }
                    return f
                },
                _parseDimensions: function() {
                    for (var a, e, f, g, h = [], i = [], j = null, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = this.path.length; q < r; ++q) {
                        switch (a = this.path[q],
                        a[0]) {
                        case "l":
                            m += a[1],
                            n += a[2],
                            g = [];
                            break;
                        case "L":
                            m = a[1],
                            n = a[2],
                            g = [];
                            break;
                        case "h":
                            m += a[1],
                            g = [];
                            break;
                        case "H":
                            m = a[1],
                            g = [];
                            break;
                        case "v":
                            n += a[1],
                            g = [];
                            break;
                        case "V":
                            n = a[1],
                            g = [];
                            break;
                        case "m":
                            m += a[1],
                            n += a[2],
                            k = m,
                            l = n,
                            g = [];
                            break;
                        case "M":
                            m = a[1],
                            n = a[2],
                            k = m,
                            l = n,
                            g = [];
                            break;
                        case "c":
                            e = m + a[5],
                            f = n + a[6],
                            o = m + a[3],
                            p = n + a[4],
                            g = b.util.getBoundsOfCurve(m, n, m + a[1], n + a[2], o, p, e, f),
                            m = e,
                            n = f;
                            break;
                        case "C":
                            m = a[5],
                            n = a[6],
                            o = a[3],
                            p = a[4],
                            g = b.util.getBoundsOfCurve(m, n, a[1], a[2], o, p, m, n);
                            break;
                        case "s":
                            e = m + a[3],
                            f = n + a[4],
                            null === j[0].match(/[CcSs]/) ? (o = m,
                            p = n) : (o = 2 * m - o,
                            p = 2 * n - p),
                            g = b.util.getBoundsOfCurve(m, n, o, p, m + a[1], n + a[2], e, f),
                            o = m + a[1],
                            p = n + a[2],
                            m = e,
                            n = f;
                            break;
                        case "S":
                            e = a[3],
                            f = a[4],
                            null === j[0].match(/[CcSs]/) ? (o = m,
                            p = n) : (o = 2 * m - o,
                            p = 2 * n - p),
                            g = b.util.getBoundsOfCurve(m, n, o, p, a[1], a[2], e, f),
                            m = e,
                            n = f,
                            o = a[1],
                            p = a[2];
                            break;
                        case "q":
                            e = m + a[3],
                            f = n + a[4],
                            o = m + a[1],
                            p = n + a[2],
                            g = b.util.getBoundsOfCurve(m, n, o, p, o, p, e, f),
                            m = e,
                            n = f;
                            break;
                        case "Q":
                            o = a[1],
                            p = a[2],
                            g = b.util.getBoundsOfCurve(m, n, o, p, o, p, a[3], a[4]),
                            m = a[3],
                            n = a[4];
                            break;
                        case "t":
                            e = m + a[1],
                            f = n + a[2],
                            null === j[0].match(/[QqTt]/) ? (o = m,
                            p = n) : (o = 2 * m - o,
                            p = 2 * n - p),
                            g = b.util.getBoundsOfCurve(m, n, o, p, o, p, e, f),
                            m = e,
                            n = f;
                            break;
                        case "T":
                            e = a[1],
                            f = a[2],
                            null === j[0].match(/[QqTt]/) ? (o = m,
                            p = n) : (o = 2 * m - o,
                            p = 2 * n - p),
                            g = b.util.getBoundsOfCurve(m, n, o, p, o, p, e, f),
                            m = e,
                            n = f;
                            break;
                        case "a":
                            g = b.util.getBoundsOfArc(m, n, a[1], a[2], a[3], a[4], a[5], a[6] + m, a[7] + n),
                            m += a[6],
                            n += a[7];
                            break;
                        case "A":
                            g = b.util.getBoundsOfArc(m, n, a[1], a[2], a[3], a[4], a[5], a[6], a[7]),
                            m = a[6],
                            n = a[7];
                            break;
                        case "z":
                        case "Z":
                            m = k,
                            n = l
                        }
                        j = a,
                        g.forEach(function(a) {
                            h.push(a.x),
                            i.push(a.y)
                        }),
                        h.push(m),
                        i.push(n)
                    }
                    var s = c(h) || 0
                      , t = c(i) || 0;
                    return {
                        left: s,
                        top: t,
                        width: (d(h) || 0) - s,
                        height: (d(i) || 0) - t
                    }
                }
            }),
            b.Path.fromObject = function(a, c, d) {
                var e;
                if ("string" != typeof a.path)
                    return b.Object._fromObject("Path", a, c, d, "path");
                b.loadSVGFromURL(a.path, function(d) {
                    var f = a.path;
                    e = d[0],
                    delete a.path,
                    b.util.object.extend(e, a),
                    e.setSourcePath(f),
                    c && c(e)
                })
            }
            ,
            b.Path.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(["d"]),
            b.Path.fromElement = function(a, c, d) {
                var f = b.parseAttributes(a, b.Path.ATTRIBUTE_NAMES);
                c && c(new b.Path(f.d,e(f, d)))
            }
            ,
            b.Path.async = !0
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.object.extend;
            if (b.PathGroup)
                return void b.warn("fabric.PathGroup is already defined");
            b.PathGroup = b.util.createClass(b.Object, {
                type: "path-group",
                fill: "",
                initialize: function(a, b) {
                    b = b || {},
                    this.paths = a || [];
                    for (var c = this.paths.length; c--; )
                        this.paths[c].group = this;
                    b.toBeParsed && (this.parseDimensionsFromPaths(b),
                    delete b.toBeParsed),
                    this.setOptions(b),
                    this.setCoords(),
                    b.sourcePath && this.setSourcePath(b.sourcePath),
                    this.objectCaching && (this._createCacheCanvas(),
                    this.setupState({
                        propertySet: "cacheProperties"
                    }))
                },
                parseDimensionsFromPaths: function(a) {
                    for (var c, d, e, f, g, h, i = [], j = [], k = this.paths.length; k--; ) {
                        e = this.paths[k],
                        f = e.height + e.strokeWidth,
                        g = e.width + e.strokeWidth,
                        c = [{
                            x: e.left,
                            y: e.top
                        }, {
                            x: e.left + g,
                            y: e.top
                        }, {
                            x: e.left,
                            y: e.top + f
                        }, {
                            x: e.left + g,
                            y: e.top + f
                        }],
                        h = this.paths[k].transformMatrix;
                        for (var l = 0; l < c.length; l++)
                            d = c[l],
                            h && (d = b.util.transformPoint(d, h, !1)),
                            i.push(d.x),
                            j.push(d.y)
                    }
                    a.width = Math.max.apply(null, i),
                    a.height = Math.max.apply(null, j)
                },
                drawObject: function(a) {
                    a.save(),
                    a.translate(-this.width / 2, -this.height / 2);
                    for (var b = 0, c = this.paths.length; b < c; ++b)
                        this.paths[b].render(a, !0);
                    a.restore()
                },
                isCacheDirty: function() {
                    if (this.callSuper("isCacheDirty"))
                        return !0;
                    if (!this.statefullCache)
                        return !1;
                    for (var a = 0, b = this.paths.length; a < b; a++)
                        if (this.paths[a].isCacheDirty(!0)) {
                            var c = this._getNonTransformedDimensions();
                            return this._cacheContext.clearRect(-c.x / 2, -c.y / 2, c.x, c.y),
                            !0
                        }
                    return !1
                },
                _set: function(a, b) {
                    if ("fill" === a && b && this.isSameColor())
                        for (var c = this.paths.length; c--; )
                            this.paths[c]._set(a, b);
                    return this.callSuper("_set", a, b)
                },
                toObject: function(a) {
                    var b = this.paths.map(function(b) {
                        var c = b.includeDefaultValues;
                        b.includeDefaultValues = b.group.includeDefaultValues;
                        var d = b.toObject(a);
                        return b.includeDefaultValues = c,
                        d
                    });
                    return c(this.callSuper("toObject", ["sourcePath"].concat(a)), {
                        paths: b
                    })
                },
                toDatalessObject: function(a) {
                    var b = this.toObject(a);
                    return this.sourcePath && (b.paths = this.sourcePath),
                    b
                },
                toSVG: function(a) {
                    var b = this.getObjects()
                      , c = this.getPointByOrigin("left", "top")
                      , d = "translate(" + c.x + " " + c.y + ")"
                      , e = this._createBaseSVGMarkup();
                    e.push("<g ", this.getSvgId(), 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransformMatrix(), d, this.getSvgTransform(), '" ', ">\n");
                    for (var f = 0, g = b.length; f < g; f++)
                        e.push("\t", b[f].toSVG(a));
                    return e.push("</g>\n"),
                    a ? a(e.join("")) : e.join("")
                },
                toString: function() {
                    return "#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>"
                },
                isSameColor: function() {
                    var a = this.getObjects()[0].get("fill") || "";
                    return "string" == typeof a && (a = a.toLowerCase(),
                    this.getObjects().every(function(b) {
                        var c = b.get("fill") || "";
                        return "string" == typeof c && c.toLowerCase() === a
                    }))
                },
                complexity: function() {
                    return this.paths.reduce(function(a, b) {
                        return a + (b && b.complexity ? b.complexity() : 0)
                    }, 0)
                },
                getObjects: function() {
                    return this.paths
                }
            }),
            b.PathGroup.fromObject = function(a, c) {
                var d = a.paths;
                delete a.paths,
                "string" == typeof d ? b.loadSVGFromURL(d, function(e) {
                    var f = d
                      , g = b.util.groupSVGElements(e, a, f);
                    a.paths = d,
                    c(g)
                }) : b.util.enlivenObjects(d, function(e) {
                    var f = new b.PathGroup(e,a);
                    a.paths = d,
                    c(f)
                })
            }
            ,
            b.PathGroup.async = !0
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.object.extend
              , d = b.util.array.min
              , e = b.util.array.max;
            if (!b.Group) {
                var f = {
                    lockMovementX: !0,
                    lockMovementY: !0,
                    lockRotation: !0,
                    lockScalingX: !0,
                    lockScalingY: !0,
                    lockUniScaling: !0
                };
                b.Group = b.util.createClass(b.Object, b.Collection, {
                    type: "group",
                    strokeWidth: 0,
                    subTargetCheck: !1,
                    initialize: function(a, b, c) {
                        b = b || {},
                        this._objects = [],
                        c && this.callSuper("initialize", b),
                        this._objects = a || [];
                        for (var d = this._objects.length; d--; )
                            this._objects[d].group = this;
                        this.originalState = {},
                        b.originX && (this.originX = b.originX),
                        b.originY && (this.originY = b.originY),
                        c ? this._updateObjectsCoords(!0) : (this._calcBounds(),
                        this._updateObjectsCoords(),
                        this.callSuper("initialize", b)),
                        this.setCoords(),
                        this.saveCoords()
                    },
                    _updateObjectsCoords: function(a) {
                        for (var b = this.getCenterPoint(), c = this._objects.length; c--; )
                            this._updateObjectCoords(this._objects[c], b, a)
                    },
                    _updateObjectCoords: function(a, b, c) {
                        if (a.__origHasControls = a.hasControls,
                        a.hasControls = !1,
                        !c) {
                            var d = a.getLeft()
                              , e = a.getTop();
                            a.set({
                                left: d - b.x,
                                top: e - b.y
                            }),
                            a.setCoords(!0, !0)
                        }
                    },
                    toString: function() {
                        return "#<fabric.Group: (" + this.complexity() + ")>"
                    },
                    addWithUpdate: function(a) {
                        return this._restoreObjectsState(),
                        b.util.resetObjectTransform(this),
                        a && (this._objects.push(a),
                        a.group = this,
                        a._set("canvas", this.canvas)),
                        this.forEachObject(this._setObjectActive, this),
                        this._calcBounds(),
                        this._updateObjectsCoords(),
                        this.dirty = !0,
                        this
                    },
                    _setObjectActive: function(a) {
                        a.set("active", !0),
                        a.group = this
                    },
                    removeWithUpdate: function(a) {
                        return this._restoreObjectsState(),
                        b.util.resetObjectTransform(this),
                        this.forEachObject(this._setObjectActive, this),
                        this.remove(a),
                        this._calcBounds(),
                        this._updateObjectsCoords(),
                        this.dirty = !0,
                        this
                    },
                    _onObjectAdded: function(a) {
                        this.dirty = !0,
                        a.group = this,
                        a._set("canvas", this.canvas)
                    },
                    _onObjectRemoved: function(a) {
                        this.dirty = !0,
                        delete a.group,
                        a.set("active", !1)
                    },
                    delegatedProperties: {
                        fill: !0,
                        stroke: !0,
                        strokeWidth: !0,
                        fontFamily: !0,
                        fontWeight: !0,
                        fontSize: !0,
                        fontStyle: !0,
                        lineHeight: !0,
                        textDecoration: !0,
                        textAlign: !0,
                        backgroundColor: !0
                    },
                    _set: function(a, b) {
                        var c = this._objects.length;
                        if (this.delegatedProperties[a] || "canvas" === a)
                            for (; c--; )
                                this._objects[c].set(a, b);
                        else
                            for (; c--; )
                                this._objects[c].setOnGroup(a, b);
                        this.callSuper("_set", a, b)
                    },
                    toObject: function(a) {
                        var b = this.getObjects().map(function(b) {
                            var c = b.includeDefaultValues;
                            b.includeDefaultValues = b.group.includeDefaultValues;
                            var d = b.toObject(a);
                            return b.includeDefaultValues = c,
                            d
                        });
                        return c(this.callSuper("toObject", a), {
                            objects: b
                        })
                    },
                    render: function(a) {
                        this._transformDone = !0,
                        this.callSuper("render", a),
                        this._transformDone = !1
                    },
                    drawObject: function(a) {
                        for (var b = 0, c = this._objects.length; b < c; b++)
                            this._renderObject(this._objects[b], a)
                    },
                    isCacheDirty: function() {
                        if (this.callSuper("isCacheDirty"))
                            return !0;
                        if (!this.statefullCache)
                            return !1;
                        for (var a = 0, b = this._objects.length; a < b; a++)
                            if (this._objects[a].isCacheDirty(!0)) {
                                var c = this._getNonTransformedDimensions();
                                return this._cacheContext.clearRect(-c.x / 2, -c.y / 2, c.x, c.y),
                                !0
                            }
                        return !1
                    },
                    _renderControls: function(a, b) {
                        a.save(),
                        a.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1,
                        this.callSuper("_renderControls", a, b);
                        for (var c = 0, d = this._objects.length; c < d; c++)
                            this._objects[c]._renderControls(a);
                        a.restore()
                    },
                    _renderObject: function(a, b) {
                        if (a.visible) {
                            var c = a.hasRotatingPoint;
                            a.hasRotatingPoint = !1,
                            a.render(b),
                            a.hasRotatingPoint = c
                        }
                    },
                    _restoreObjectsState: function() {
                        return this._objects.forEach(this._restoreObjectState, this),
                        this
                    },
                    realizeTransform: function(a) {
                        var c = a.calcTransformMatrix()
                          , d = b.util.qrDecompose(c)
                          , e = new b.Point(d.translateX,d.translateY);
                        return a.flipX = !1,
                        a.flipY = !1,
                        a.set("scaleX", d.scaleX),
                        a.set("scaleY", d.scaleY),
                        a.skewX = d.skewX,
                        a.skewY = d.skewY,
                        a.angle = d.angle,
                        a.setPositionByOrigin(e, "center", "center"),
                        a
                    },
                    _restoreObjectState: function(a) {
                        return this.realizeTransform(a),
                        a.setCoords(),
                        a.hasControls = a.__origHasControls,
                        delete a.__origHasControls,
                        a.set("active", !1),
                        delete a.group,
                        this
                    },
                    destroy: function() {
                        return this._restoreObjectsState()
                    },
                    saveCoords: function() {
                        return this._originalLeft = this.get("left"),
                        this._originalTop = this.get("top"),
                        this
                    },
                    hasMoved: function() {
                        return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top")
                    },
                    setObjectsCoords: function() {
                        return this.forEachObject(function(a) {
                            a.setCoords(!0, !0)
                        }),
                        this
                    },
                    _calcBounds: function(a) {
                        for (var b, c, d, e = [], f = [], g = ["tr", "br", "bl", "tl"], h = 0, i = this._objects.length, j = g.length; h < i; ++h)
                            for (b = this._objects[h],
                            b.setCoords(!0),
                            d = 0; d < j; d++)
                                c = g[d],
                                e.push(b.oCoords[c].x),
                                f.push(b.oCoords[c].y);
                        this.set(this._getBounds(e, f, a))
                    },
                    _getBounds: function(a, c, f) {
                        var g = new b.Point(d(a),d(c))
                          , h = new b.Point(e(a),e(c))
                          , i = {
                            width: h.x - g.x || 0,
                            height: h.y - g.y || 0
                        };
                        return f || (i.left = g.x || 0,
                        i.top = g.y || 0,
                        "center" === this.originX && (i.left += i.width / 2),
                        "right" === this.originX && (i.left += i.width),
                        "center" === this.originY && (i.top += i.height / 2),
                        "bottom" === this.originY && (i.top += i.height)),
                        i
                    },
                    toSVG: function(a) {
                        var b = this._createBaseSVGMarkup();
                        b.push("<g ", this.getSvgId(), 'transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '" style="', this.getSvgFilter(), '">\n');
                        for (var c = 0, d = this._objects.length; c < d; c++)
                            b.push("\t", this._objects[c].toSVG(a));
                        return b.push("</g>\n"),
                        a ? a(b.join("")) : b.join("")
                    },
                    get: function(a) {
                        if (a in f) {
                            if (this[a])
                                return this[a];
                            for (var b = 0, c = this._objects.length; b < c; b++)
                                if (this._objects[b][a])
                                    return !0;
                            return !1
                        }
                        return a in this.delegatedProperties ? this._objects[0] && this._objects[0].get(a) : this[a]
                    }
                }),
                b.Group.fromObject = function(a, c) {
                    b.util.enlivenObjects(a.objects, function(d) {
                        delete a.objects,
                        c && c(new b.Group(d,a,!0))
                    })
                }
                ,
                b.Group.async = !0
            }
        }("undefined" != typeof exports ? exports : this),
        function(b) {
            "use strict";
            var c = a.util.object.extend;
            if (b.fabric || (b.fabric = {}),
            b.fabric.Image)
                return void a.warn("fabric.Image is already defined.");
            var d = a.Object.prototype.stateProperties.concat();
            d.push("alignX", "alignY", "meetOrSlice"),
            a.Image = a.util.createClass(a.Object, {
                type: "image",
                crossOrigin: "",
                alignX: "none",
                alignY: "none",
                meetOrSlice: "meet",
                strokeWidth: 0,
                _lastScaleX: 1,
                _lastScaleY: 1,
                minimumScaleTrigger: .5,
                stateProperties: d,
                objectCaching: !1,
                initialize: function(a, b, c) {
                    b || (b = {}),
                    this.filters = [],
                    this.resizeFilters = [],
                    this.callSuper("initialize", b),
                    this._initElement(a, b, c)
                },
                getElement: function() {
                    return this._element
                },
                setElement: function(a, b, c) {
                    var d, e;
                    return this._element = a,
                    this._originalElement = a,
                    this._initConfig(c),
                    0 === this.resizeFilters.length ? d = b : (e = this,
                    d = function() {
                        e.applyFilters(b, e.resizeFilters, e._filteredEl || e._originalElement, !0)
                    }
                    ),
                    0 !== this.filters.length ? this.applyFilters(d) : d && d(this),
                    this
                },
                setCrossOrigin: function(a) {
                    return this.crossOrigin = a,
                    this._element.crossOrigin = a,
                    this
                },
                getOriginalSize: function() {
                    var a = this.getElement();
                    return {
                        width: a.width,
                        height: a.height
                    }
                },
                _stroke: function(a) {
                    if (this.stroke && 0 !== this.strokeWidth) {
                        var b = this.width / 2
                          , c = this.height / 2;
                        a.beginPath(),
                        a.moveTo(-b, -c),
                        a.lineTo(b, -c),
                        a.lineTo(b, c),
                        a.lineTo(-b, c),
                        a.lineTo(-b, -c),
                        a.closePath()
                    }
                },
                _renderDashedStroke: function(b) {
                    var c = -this.width / 2
                      , d = -this.height / 2
                      , e = this.width
                      , f = this.height;
                    b.save(),
                    this._setStrokeStyles(b),
                    b.beginPath(),
                    a.util.drawDashedLine(b, c, d, c + e, d, this.strokeDashArray),
                    a.util.drawDashedLine(b, c + e, d, c + e, d + f, this.strokeDashArray),
                    a.util.drawDashedLine(b, c + e, d + f, c, d + f, this.strokeDashArray),
                    a.util.drawDashedLine(b, c, d + f, c, d, this.strokeDashArray),
                    b.closePath(),
                    b.restore()
                },
                toObject: function(a) {
                    var b = []
                      , d = []
                      , e = 1
                      , f = 1;
                    this.filters.forEach(function(a) {
                        a && ("Resize" === a.type && (e *= a.scaleX,
                        f *= a.scaleY),
                        b.push(a.toObject()))
                    }),
                    this.resizeFilters.forEach(function(a) {
                        a && d.push(a.toObject())
                    });
                    var g = c(this.callSuper("toObject", ["crossOrigin", "alignX", "alignY", "meetOrSlice"].concat(a)), {
                        src: this.getSrc(),
                        filters: b,
                        resizeFilters: d
                    });
                    return g.width /= e,
                    g.height /= f,
                    g
                },
                toSVG: function(a) {
                    var b = this._createBaseSVGMarkup()
                      , c = -this.width / 2
                      , d = -this.height / 2
                      , e = "none";
                    if (this.group && "path-group" === this.group.type && (c = this.left,
                    d = this.top),
                    "none" !== this.alignX && "none" !== this.alignY && (e = "x" + this.alignX + "Y" + this.alignY + " " + this.meetOrSlice),
                    b.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', "<image ", this.getSvgId(), 'xlink:href="', this.getSvgSrc(!0), '" x="', c, '" y="', d, '" style="', this.getSvgStyles(), '" width="', this.width, '" height="', this.height, '" preserveAspectRatio="', e, '"', "></image>\n"),
                    this.stroke || this.strokeDashArray) {
                        var f = this.fill;
                        this.fill = null,
                        b.push("<rect ", 'x="', c, '" y="', d, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n'),
                        this.fill = f
                    }
                    return b.push("</g>\n"),
                    a ? a(b.join("")) : b.join("")
                },
                getSrc: function(b) {
                    var c = b ? this._element : this._originalElement;
                    return c ? a.isLikelyNode ? c._src : c.src : this.src || ""
                },
                setSrc: function(b, c, d) {
                    a.util.loadImage(b, function(a) {
                        return this.setElement(a, c, d)
                    }, this, d && d.crossOrigin)
                },
                toString: function() {
                    return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
                },
                applyFilters: function(b, c, d, e) {
                    if (c = c || this.filters,
                    d = d || this._originalElement) {
                        var f, g, h = a.util.createImage(), i = this.canvas ? this.canvas.getRetinaScaling() : a.devicePixelRatio, j = this.minimumScaleTrigger / i, k = this;
                        if (0 === c.length)
                            return this._element = d,
                            b && b(this),
                            d;
                        var l = a.util.createCanvasElement();
                        return l.width = d.width,
                        l.height = d.height,
                        l.getContext("2d").drawImage(d, 0, 0, d.width, d.height),
                        c.forEach(function(a) {
                            a && (e ? (f = k.scaleX < j ? k.scaleX : 1,
                            g = k.scaleY < j ? k.scaleY : 1,
                            f * i < 1 && (f *= i),
                            g * i < 1 && (g *= i)) : (f = a.scaleX,
                            g = a.scaleY),
                            a.applyTo(l, f, g),
                            e || "Resize" !== a.type || (k.width *= a.scaleX,
                            k.height *= a.scaleY))
                        }),
                        h.width = l.width,
                        h.height = l.height,
                        a.isLikelyNode ? (h.src = l.toBuffer(void 0, a.Image.pngCompression),
                        k._element = h,
                        !e && (k._filteredEl = h),
                        b && b(k)) : (h.onload = function() {
                            k._element = h,
                            !e && (k._filteredEl = h),
                            b && b(k),
                            h.onload = l = null
                        }
                        ,
                        h.src = l.toDataURL("image/png")),
                        l
                    }
                },
                _render: function(a, b) {
                    var c, d, e, f = this._findMargins();
                    c = b ? this.left : -this.width / 2,
                    d = b ? this.top : -this.height / 2,
                    "slice" === this.meetOrSlice && (a.beginPath(),
                    a.rect(c, d, this.width, this.height),
                    a.clip()),
                    !1 === this.isMoving && this.resizeFilters.length && this._needsResize() ? (this._lastScaleX = this.scaleX,
                    this._lastScaleY = this.scaleY,
                    e = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, !0)) : e = this._element,
                    e && a.drawImage(e, c + f.marginX, d + f.marginY, f.width, f.height),
                    this._stroke(a),
                    this._renderStroke(a)
                },
                _needsResize: function() {
                    return this.scaleX !== this._lastScaleX || this.scaleY !== this._lastScaleY
                },
                _findMargins: function() {
                    var a, b, c = this.width, d = this.height, e = 0, f = 0;
                    return "none" === this.alignX && "none" === this.alignY || (a = [this.width / this._element.width, this.height / this._element.height],
                    b = "meet" === this.meetOrSlice ? Math.min.apply(null, a) : Math.max.apply(null, a),
                    c = this._element.width * b,
                    d = this._element.height * b,
                    "Mid" === this.alignX && (e = (this.width - c) / 2),
                    "Max" === this.alignX && (e = this.width - c),
                    "Mid" === this.alignY && (f = (this.height - d) / 2),
                    "Max" === this.alignY && (f = this.height - d)),
                    {
                        width: c,
                        height: d,
                        marginX: e,
                        marginY: f
                    }
                },
                _resetWidthHeight: function() {
                    var a = this.getElement();
                    this.set("width", a.width),
                    this.set("height", a.height)
                },
                _initElement: function(b, c, d) {
                    this.setElement(a.util.getById(b), d, c),
                    a.util.addClass(this.getElement(), a.Image.CSS_CANVAS)
                },
                _initConfig: function(a) {
                    a || (a = {}),
                    this.setOptions(a),
                    this._setWidthHeight(a),
                    this._element && this.crossOrigin && (this._element.crossOrigin = this.crossOrigin)
                },
                _initFilters: function(b, c) {
                    b && b.length ? a.util.enlivenObjects(b, function(a) {
                        c && c(a)
                    }, "fabric.Image.filters") : c && c()
                },
                _setWidthHeight: function(a) {
                    this.width = "width"in a ? a.width : this.getElement() ? this.getElement().width || 0 : 0,
                    this.height = "height"in a ? a.height : this.getElement() ? this.getElement().height || 0 : 0
                }
            }),
            a.Image.CSS_CANVAS = "canvas-img",
            a.Image.prototype.getSvgSrc = a.Image.prototype.getSrc,
            a.Image.fromObject = function(b, c) {
                a.util.loadImage(b.src, function(d, e) {
                    if (e)
                        return void (c && c(null, e));
                    a.Image.prototype._initFilters.call(b, b.filters, function(e) {
                        b.filters = e || [],
                        a.Image.prototype._initFilters.call(b, b.resizeFilters, function(e) {
                            return b.resizeFilters = e || [],
                            new a.Image(d,b,c)
                        })
                    })
                }, null, b.crossOrigin)
            }
            ,
            a.Image.fromURL = function(b, c, d) {
                a.util.loadImage(b, function(b) {
                    c && c(new a.Image(b,d))
                }, null, d && d.crossOrigin)
            }
            ,
            a.Image.ATTRIBUTE_NAMES = a.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href".split(" ")),
            a.Image.fromElement = function(b, d, e) {
                var f, g = a.parseAttributes(b, a.Image.ATTRIBUTE_NAMES);
                g.preserveAspectRatio && (f = a.util.parsePreserveAspectRatioAttribute(g.preserveAspectRatio),
                c(g, f)),
                a.Image.fromURL(g["xlink:href"], d, c(e ? a.util.object.clone(e) : {}, g))
            }
            ,
            a.Image.async = !0,
            a.Image.pngCompression = 1
        }("undefined" != typeof exports ? exports : this),
        function(a) {
            "use strict";
            var b = a.fabric || (a.fabric = {})
              , c = b.util.toFixed
              , d = b.Object.NUM_FRACTION_DIGITS;
            if (b.Text)
                return void b.warn("fabric.Text is already defined");
            var e = b.Object.prototype.stateProperties.concat();
            e.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "charSpacing");
            var f = b.Object.prototype.cacheProperties.concat();
            f.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "charSpacing", "styles"),
            b.Text = b.util.createClass(b.Object, {
                _dimensionAffectingProps: ["fontSize", "fontWeight", "fontFamily", "fontStyle", "lineHeight", "text", "charSpacing", "textAlign"],
                _reNewline: /\r?\n/,
                _reSpacesAndTabs: /[ \t\r]+/g,
                type: "text",
                fontSize: 40,
                fontWeight: "normal",
                fontFamily: "Times New Roman",
                textDecoration: "",
                textAlign: "left",
                fontStyle: "",
                lineHeight: 1.16,
                textBackgroundColor: "",
                stateProperties: e,
                cacheProperties: f,
                stroke: null,
                shadow: null,
                _fontSizeFraction: .25,
                _fontSizeMult: 1.13,
                charSpacing: 0,
                initialize: function(a, b) {
                    b = b || {},
                    this.text = a,
                    this.__skipDimension = !0,
                    this.callSuper("initialize", b),
                    this.__skipDimension = !1,
                    this._initDimensions(),
                    this.setCoords(),
                    this.setupState({
                        propertySet: "_dimensionAffectingProps"
                    })
                },
                _initDimensions: function(a) {
                    this.__skipDimension || (a || (a = b.util.createCanvasElement().getContext("2d"),
                    this._setTextStyles(a)),
                    this._textLines = this._splitTextIntoLines(),
                    this._clearCache(),
                    this.width = this._getTextWidth(a) || this.cursorWidth || 2,
                    this.height = this._getTextHeight(a))
                },
                toString: function() {
                    return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
                },
                _getCacheCanvasDimensions: function() {
                    var a = this.callSuper("_getCacheCanvasDimensions")
                      , b = 2 * this.fontSize;
                    return a.width += b * a.zoomX,
                    a.height += b * a.zoomY,
                    a
                },
                _render: function(a) {
                    this._setTextStyles(a),
                    this.group && "path-group" === this.group.type && a.translate(this.left, this.top),
                    this._renderTextLinesBackground(a),
                    this._renderText(a),
                    this._renderTextDecoration(a)
                },
                _renderText: function(a) {
                    this._renderTextFill(a),
                    this._renderTextStroke(a)
                },
                _setTextStyles: function(a) {
                    a.textBaseline = "alphabetic",
                    a.font = this._getFontDeclaration()
                },
                _getTextHeight: function() {
                    return this._getHeightOfSingleLine() + (this._textLines.length - 1) * this._getHeightOfLine()
                },
                _getTextWidth: function(a) {
                    for (var b = this._getLineWidth(a, 0), c = 1, d = this._textLines.length; c < d; c++) {
                        var e = this._getLineWidth(a, c);
                        e > b && (b = e)
                    }
                    return b
                },
                _renderChars: function(a, b, c, d, e) {
                    var f, g, h = a.slice(0, -4);
                    if (this[h].toLive) {
                        var i = -this.width / 2 + this[h].offsetX || 0
                          , j = -this.height / 2 + this[h].offsetY || 0;
                        b.save(),
                        b.translate(i, j),
                        d -= i,
                        e -= j
                    }
                    if (0 !== this.charSpacing) {
                        var k = this._getWidthOfCharSpacing();
                        c = c.split("");
                        for (var l = 0, m = c.length; l < m; l++)
                            f = c[l],
                            g = b.measureText(f).width + k,
                            b[a](f, d, e),
                            d += g > 0 ? g : 0
                    } else
                        b[a](c, d, e);
                    this[h].toLive && b.restore()
                },
                _renderTextLine: function(a, b, c, d, e, f) {
                    e -= this.fontSize * this._fontSizeFraction;
                    var g = this._getLineWidth(b, f);
                    if ("justify" !== this.textAlign || this.width < g)
                        return void this._renderChars(a, b, c, d, e, f);
                    for (var h, i = c.split(/\s+/), j = 0, k = this._getWidthOfWords(b, i.join(" "), f, 0), l = this.width - k, m = i.length - 1, n = m > 0 ? l / m : 0, o = 0, p = 0, q = i.length; p < q; p++) {
                        for (; " " === c[j] && j < c.length; )
                            j++;
                        h = i[p],
                        this._renderChars(a, b, h, d + o, e, f, j),
                        o += this._getWidthOfWords(b, h, f, j) + n,
                        j += h.length
                    }
                },
                _getWidthOfWords: function(a, b) {
                    var c, d, e = a.measureText(b).width;
                    return 0 !== this.charSpacing && (c = b.split("").length,
                    d = c * this._getWidthOfCharSpacing(),
                    e += d),
                    e > 0 ? e : 0
                },
                _getLeftOffset: function() {
                    return -this.width / 2
                },
                _getTopOffset: function() {
                    return -this.height / 2
                },
                isEmptyStyles: function() {
                    return !0
                },
                _renderTextCommon: function(a, b) {
                    for (var c = 0, d = this._getLeftOffset(), e = this._getTopOffset(), f = 0, g = this._textLines.length; f < g; f++) {
                        var h = this._getHeightOfLine(a, f)
                          , i = h / this.lineHeight
                          , j = this._getLineWidth(a, f)
                          , k = this._getLineLeftOffset(j);
                        this._renderTextLine(b, a, this._textLines[f], d + k, e + c + i, f),
                        c += h
                    }
                },
                _renderTextFill: function(a) {
                    !this.fill && this.isEmptyStyles() || this._renderTextCommon(a, "fillText")
                },
                _renderTextStroke: function(a) {
                    (this.stroke && 0 !== this.strokeWidth || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(a),
                    a.save(),
                    this._setLineDash(a, this.strokeDashArray),
                    a.beginPath(),
                    this._renderTextCommon(a, "strokeText"),
                    a.closePath(),
                    a.restore())
                },
                _getHeightOfLine: function() {
                    return this._getHeightOfSingleLine() * this.lineHeight
                },
                _getHeightOfSingleLine: function() {
                    return this.fontSize * this._fontSizeMult
                },
                _renderTextLinesBackground: function(a) {
                    if (this.textBackgroundColor) {
                        var b, c, d, e = 0, f = a.fillStyle;
                        a.fillStyle = this.textBackgroundColor;
                        for (var g = 0, h = this._textLines.length; g < h; g++)
                            b = this._getHeightOfLine(a, g),
                            c = this._getLineWidth(a, g),
                            c > 0 && (d = this._getLineLeftOffset(c),
                            a.fillRect(this._getLeftOffset() + d, this._getTopOffset() + e, c, b / this.lineHeight)),
                            e += b;
                        a.fillStyle = f,
                        this._removeShadow(a)
                    }
                },
                _getLineLeftOffset: function(a) {
                    return "center" === this.textAlign ? (this.width - a) / 2 : "right" === this.textAlign ? this.width - a : 0
                },
                _clearCache: function() {
                    this.__lineWidths = [],
                    this.__lineHeights = []
                },
                _shouldClearDimensionCache: function() {
                    var a = this._forceClearCache;
                    return a || (a = this.hasStateChanged("_dimensionAffectingProps")),
                    a && (this.saveState({
                        propertySet: "_dimensionAffectingProps"
                    }),
                    this.dirty = !0),
                    a
                },
                _getLineWidth: function(a, b) {
                    if (this.__lineWidths[b])
                        return -1 === this.__lineWidths[b] ? this.width : this.__lineWidths[b];
                    var c, d, e = this._textLines[b];
                    return c = "" === e ? 0 : this._measureLine(a, b),
                    this.__lineWidths[b] = c,
                    c && "justify" === this.textAlign && (d = e.split(/\s+/),
                    d.length > 1 && (this.__lineWidths[b] = -1)),
                    c
                },
                _getWidthOfCharSpacing: function() {
                    return 0 !== this.charSpacing ? this.fontSize * this.charSpacing / 1e3 : 0
                },
                _measureLine: function(a, b) {
                    var c, d, e = this._textLines[b], f = a.measureText(e).width, g = 0;
                    return 0 !== this.charSpacing && (c = e.split("").length,
                    g = (c - 1) * this._getWidthOfCharSpacing()),
                    d = f + g,
                    d > 0 ? d : 0
                },
                _renderTextDecoration: function(a) {
                    if (this.textDecoration) {
                        var b = this.height / 2
                          , c = this
                          , d = [];
                        this.textDecoration.indexOf("underline") > -1 && d.push(.85),
                        this.textDecoration.indexOf("line-through") > -1 && d.push(.43),
                        this.textDecoration.indexOf("overline") > -1 && d.push(-.12),
                        d.length > 0 && function(d) {
                            var e, f, g, h, i, j, k, l = 0;
                            for (e = 0,
                            f = c._textLines.length; e < f; e++) {
                                for (i = c._getLineWidth(a, e),
                                j = c._getLineLeftOffset(i),
                                k = c._getHeightOfLine(a, e),
                                g = 0,
                                h = d.length; g < h; g++)
                                    a.fillRect(c._getLeftOffset() + j, l + (c._fontSizeMult - 1 + d[g]) * c.fontSize - b, i, c.fontSize / 15);
                                l += k
                            }
                        }(d)
                    }
                },
                _getFontDeclaration: function() {
                    return [b.isLikelyNode ? this.fontWeight : this.fontStyle, b.isLikelyNode ? this.fontStyle : this.fontWeight, this.fontSize + "px", b.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily].join(" ")
                },
                render: function(a, b) {
                    this.visible && (this._shouldClearDimensionCache() && (this._setTextStyles(a),
                    this._initDimensions(a)),
                    this.callSuper("render", a, b))
                },
                _splitTextIntoLines: function() {
                    return this.text.split(this._reNewline)
                },
                toObject: function(a) {
                    var b = ["text", "fontSize", "fontWeight", "fontFamily", "fontStyle", "lineHeight", "textDecoration", "textAlign", "textBackgroundColor", "charSpacing"].concat(a);
                    return this.callSuper("toObject", b)
                },
                toSVG: function(a) {
                    this.ctx || (this.ctx = b.util.createCanvasElement().getContext("2d"));
                    var c = this._createBaseSVGMarkup()
                      , d = this._getSVGLeftTopOffsets(this.ctx)
                      , e = this._getSVGTextAndBg(d.textTop, d.textLeft);
                    return this._wrapSVGTextAndBg(c, e),
                    a ? a(c.join("")) : c.join("")
                },
                _getSVGLeftTopOffsets: function(a) {
                    var b = this._getHeightOfLine(a, 0);
                    return {
                        textLeft: -this.width / 2 + (this.group && "path-group" === this.group.type ? this.left : 0),
                        textTop: 0 + (this.group && "path-group" === this.group.type ? -this.top : 0),
                        lineTop: b
                    }
                },
                _wrapSVGTextAndBg: function(a, b) {
                    var c = this.getSvgFilter()
                      , d = "" === c ? "" : ' style="' + c + '"';
                    a.push("\t<g ", this.getSvgId(), 'transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"', d, ">\n", b.textBgRects.join(""), "\t\t<text ", this.fontFamily ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" ' : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", this.textDecoration ? 'text-decoration="' + this.textDecoration + '" ' : "", 'style="', this.getSvgStyles(!0), '" >\n', b.textSpans.join(""), "\t\t</text>\n", "\t</g>\n")
                },
                _getSVGTextAndBg: function(a, b) {
                    var c = []
                      , d = []
                      , e = 0;
                    this._setSVGBg(d);
                    for (var f = 0, g = this._textLines.length; f < g; f++)
                        this.textBackgroundColor && this._setSVGTextLineBg(d, f, b, a, e),
                        this._setSVGTextLineText(f, c, e, b, a, d),
                        e += this._getHeightOfLine(this.ctx, f);
                    return {
                        textSpans: c,
                        textBgRects: d
                    }
                },
                _setSVGTextLineText: function(a, e, f, g, h) {
                    var i = this.fontSize * (this._fontSizeMult - this._fontSizeFraction) - h + f - this.height / 2;
                    if ("justify" === this.textAlign)
                        return void this._setSVGTextLineJustifed(a, e, i, g);
                    e.push('\t\t\t<tspan x="', c(g + this._getLineLeftOffset(this._getLineWidth(this.ctx, a)), d), '" ', 'y="', c(i, d), '" ', this._getFillAttributes(this.fill), ">", b.util.string.escapeXml(this._textLines[a]), "</tspan>\n")
                },
                _setSVGTextLineJustifed: function(a, e, f, g) {
                    var h = b.util.createCanvasElement().getContext("2d");
                    this._setTextStyles(h);
                    var i, j, k = this._textLines[a], l = k.split(/\s+/), m = this._getWidthOfWords(h, l.join("")), n = this.width - m, o = l.length - 1, p = o > 0 ? n / o : 0, q = this._getFillAttributes(this.fill);
                    for (g += this._getLineLeftOffset(this._getLineWidth(h, a)),
                    a = 0,
                    j = l.length; a < j; a++)
                        i = l[a],
                        e.push('\t\t\t<tspan x="', c(g, d), '" ', 'y="', c(f, d), '" ', q, ">", b.util.string.escapeXml(i), "</tspan>\n"),
                        g += this._getWidthOfWords(h, i) + p
                },
                _setSVGTextLineBg: function(a, b, e, f, g) {
                    a.push("\t\t<rect ", this._getFillAttributes(this.textBackgroundColor), ' x="', c(e + this._getLineLeftOffset(this._getLineWidth(this.ctx, b)), d), '" y="', c(g - this.height / 2, d), '" width="', c(this._getLineWidth(this.ctx, b), d), '" height="', c(this._getHeightOfLine(this.ctx, b) / this.lineHeight, d), '"></rect>\n')
                },
                _setSVGBg: function(a) {
                    this.backgroundColor && a.push("\t\t<rect ", this._getFillAttributes(this.backgroundColor), ' x="', c(-this.width / 2, d), '" y="', c(-this.height / 2, d), '" width="', c(this.width, d), '" height="', c(this.height, d), '"></rect>\n')
                },
                _getFillAttributes: function(a) {
                    var c = a && "string" == typeof a ? new b.Color(a) : "";
                    return c && c.getSource() && 1 !== c.getAlpha() ? 'opacity="' + c.getAlpha() + '" fill="' + c.setAlpha(1).toRgb() + '"' : 'fill="' + a + '"'
                },
                _set: function(a, b) {
                    this.callSuper("_set", a, b),
                    this._dimensionAffectingProps.indexOf(a) > -1 && (this._initDimensions(),
                    this.setCoords())
                },
                complexity: function() {
                    return 1
                }
            }),
            b.Text.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")),
            b.Text.DEFAULT_SVG_FONT_SIZE = 16,
            b.Text.fromElement = function(a, c) {
                if (!a)
                    return null;
                var d = b.parseAttributes(a, b.Text.ATTRIBUTE_NAMES);
                c = b.util.object.extend(c ? b.util.object.clone(c) : {}, d),
                c.top = c.top || 0,
                c.left = c.left || 0,
                "dx"in d && (c.left += d.dx),
                "dy"in d && (c.top += d.dy),
                "fontSize"in c || (c.fontSize = b.Text.DEFAULT_SVG_FONT_SIZE),
                c.originX || (c.originX = "left");
                var e = "";
                "textContent"in a ? e = a.textContent : "firstChild"in a && null !== a.firstChild && "data"in a.firstChild && null !== a.firstChild.data && (e = a.firstChild.data),
                e = e.replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " ");
                var f = new b.Text(e,c)
                  , g = f.getHeight() / f.height
                  , h = (f.height + f.strokeWidth) * f.lineHeight - f.height
                  , i = h * g
                  , j = f.getHeight() + i
                  , k = 0;
                return "left" === f.originX && (k = f.getWidth() / 2),
                "right" === f.originX && (k = -f.getWidth() / 2),
                f.set({
                    left: f.getLeft() + k,
                    top: f.getTop() - j / 2 + f.fontSize * (.18 + f._fontSizeFraction) / f.lineHeight
                }),
                f
            }
            ,
            b.Text.fromObject = function(a, c, d) {
                return b.Object._fromObject("Text", a, c, d, "text")
            }
            ,
            b.util.createAccessors(b.Text)
        }("undefined" != typeof exports ? exports : this),
        a
    }()
};
