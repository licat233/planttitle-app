"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/_plugin-vue_export-helper.js
  var import_vue = __toESM(require_vue());
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/pages/news/index.js
  var import_vue2 = __toESM(require_vue());
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dayjs_minExports = {};
  var dayjs_min = {
    get exports() {
      return dayjs_minExports;
    },
    set exports(v) {
      dayjs_minExports = v;
    }
  };
  (function(module, exports) {
    !function(t, e) {
      module.exports = e();
    }(commonjsGlobal, function() {
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = function(t2) {
        return t2 instanceof b;
      }, S = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, w = function(t2, e2) {
        if (p(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new b(n2);
      }, O = v;
      O.l = S, O.i = p, O.w = function(t2, e2) {
        return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var b = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return /* @__PURE__ */ new Date(NaN);
            if (O.u(e2))
              return /* @__PURE__ */ new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = w(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return w(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < w(t2);
        }, m2.$g = function(t2, e2, n2) {
          return O.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!O.u(e2) || e2, f2 = O.p(t2), l2 = function(t3, e3) {
            var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = O.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = O.p(f2), y2 = function(t2) {
            var e2 = w(l2);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c)
            return this.set(c, this.$M + r2);
          if ($2 === h)
            return this.set(h, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return O.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return O.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return O.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return O.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return O.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return O.s(e2.$s, 2, "0");
                case "SSS":
                  return O.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = O.p(d2), m3 = w(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return O.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : O.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = S(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), _ = b.prototype;
      return w.prototype = _, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        _[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e2) {
        return t2.$i || (t2(e2, b, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = D[g], w.Ls = D, w.p = {}, w;
    });
  })(dayjs_min);
  function friendlyDate(timestamp) {
    let formats = {
      "year": "%n% \u5E74\u524D",
      "month": "%n% \u6708\u524D",
      "day": "%n% \u5929\u524D",
      "hour": "%n% \u5C0F\u65F6\u524D",
      "minute": "%n% \u5206\u949F\u524D",
      "second": "%n% \u79D2\u524D"
    };
    let now = Date.now();
    let seconds = Math.floor((now - timestamp) / 1e3);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);
    let diffType = "";
    let diffValue = 0;
    if (years > 0) {
      diffType = "year";
      diffValue = years;
    } else {
      if (months > 0) {
        diffType = "month";
        diffValue = months;
      } else {
        if (days > 0) {
          diffType = "day";
          diffValue = days;
        } else {
          if (hours > 0) {
            diffType = "hour";
            diffValue = hours;
          } else {
            if (minutes > 0) {
              diffType = "minute";
              diffValue = minutes;
            } else {
              diffType = "second";
              diffValue = seconds === 0 ? seconds = 1 : seconds;
            }
          }
        }
      }
    }
    return formats[diffType].replace("%n%", diffValue);
  }
  var _style_0$4 = { "view": { "": { "flexDirection": "column" } }, "flex-row": { "": { "flexDirection": "row" } }, "flex-col": { "": { "flexDirection": "column" } }, "list-cell": { "": { "paddingTop": 0, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15 } }, "uni-list-cell-hover": { "": { "backgroundColor": "#eeeeee" } }, "media-item": { "": { "position": "relative", "flex": 1, "flexDirection": "column", "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15 } }, "media-item-line": { "": { "position": "absolute", "left": 15, "right": 15, "bottom": 0, "height": 1, "backgroundColor": "#ebebeb" } }, "media-image-right": { "": { "flexDirection": "row" } }, "media-image-left": { "": { "flexDirection": "row-reverse" } }, "media-title": { "": { "flex": 1, "lines": 3, "textOverflow": "ellipsis", "fontSize": 15, "color": "#555555" } }, "media-title2": { "": { "flex": 1, "marginTop": 3, "lineHeight": 20 } }, "image-section": { "": { "marginTop": 10, "flexDirection": "row", "justifyContent": "space-between" } }, "image-section-right": { "": { "marginTop": 0, "marginLeft": 5, "width": 112, "height": 73 } }, "image-section-left": { "": { "marginTop": 0, "marginRight": 5, "width": 112, "height": 73 } }, "image-list1": { "": { "height": 240 } }, "image-list2": { "": { "width": 112, "height": 73 } }, "image-list3": { "": { "width": 112, "height": 73 } }, "media-info": { "": { "flexDirection": "row", "alignItems": "center" } }, "info-text": { "": { "marginRight": 10, "color": "#999999", "fontSize": 12 } }, "media-foot": { "": { "marginTop": 12, "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "close-view": { "": { "position": "relative", "alignItems": "center", "flexDirection": "row", "width": 20, "height": 15, "lineHeight": 15, "borderWidth": "1rpx", "borderStyle": "solid", "borderColor": "#aaaaaa", "borderRadius": 4, "justifyContent": "center", "textAlign": "center" } }, "close-l": { "": { "position": "absolute", "width": 9, "height": 1, "backgroundColor": "#aaaaaa" } }, "close-h": { "": { "transform": "rotate(45deg)" } }, "close-v": { "": { "transform": "rotate(-45deg)" } } };
  var _sfc_main$4 = {
    props: {
      newsItem: {
        type: Object,
        default: function(e) {
          return {};
        }
      }
    },
    methods: {
      click() {
        this.$emit("click");
      },
      close(e) {
        e.stopPropagation();
        this.$emit("close");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
      class: "media-item view",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args)),
      renderWhole: true
    }, [
      (0, import_vue2.createElementVNode)(
        "view",
        {
          class: "view",
          style: (0, import_vue2.normalizeStyle)({ flexDirection: $props.newsItem.article_type === 1 || $props.newsItem.article_type === 2 ? $props.newsItem.article_type === 2 ? "row" : "row-reverse" : "column" })
        },
        [
          (0, import_vue2.createElementVNode)(
            "u-text",
            {
              class: (0, import_vue2.normalizeClass)(["media-title", { "media-title2": $props.newsItem.article_type === 1 || $props.newsItem.article_type === 2 }])
            },
            (0, import_vue2.toDisplayString)($props.newsItem.title),
            3
            /* TEXT, CLASS */
          ),
          $props.newsItem.image_list || $props.newsItem.image_url ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "view",
            {
              key: 0,
              class: (0, import_vue2.normalizeClass)(["image-section flex-row", { "image-section-right": $props.newsItem.article_type === 2, "image-section-left": $props.newsItem.article_type === 1 }])
            },
            [
              $props.newsItem.image_url ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("u-image", {
                key: 0,
                fadeShow: false,
                class: (0, import_vue2.normalizeClass)(["image-list1", { "image-list2": $props.newsItem.article_type === 1 || $props.newsItem.article_type === 2 }]),
                src: $props.newsItem.image_url
              }, null, 10, ["src"])) : (0, import_vue2.createCommentVNode)("v-if", true),
              $props.newsItem.image_list ? ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
                import_vue2.Fragment,
                { key: 1 },
                (0, import_vue2.renderList)($props.newsItem.image_list, (source, i) => {
                  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("u-image", {
                    fadeShow: false,
                    class: "image-list3",
                    src: source.url,
                    key: i
                  }, null, 8, ["src"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (0, import_vue2.createCommentVNode)("v-if", true)
            ],
            2
            /* CLASS */
          )) : (0, import_vue2.createCommentVNode)("v-if", true)
        ],
        4
        /* STYLE */
      ),
      (0, import_vue2.createElementVNode)("view", { class: "media-foot flex-row" }, [
        (0, import_vue2.createElementVNode)("view", { class: "media-info flex-row" }, [
          (0, import_vue2.createElementVNode)(
            "u-text",
            { class: "info-text" },
            (0, import_vue2.toDisplayString)($props.newsItem.source),
            1
            /* TEXT */
          ),
          (0, import_vue2.createElementVNode)(
            "u-text",
            { class: "info-text" },
            (0, import_vue2.toDisplayString)($props.newsItem.comment_count || 0) + "\u6761\u8BC4\u8BBA",
            1
            /* TEXT */
          ),
          (0, import_vue2.createElementVNode)(
            "u-text",
            { class: "info-text" },
            (0, import_vue2.toDisplayString)($props.newsItem.datetime),
            1
            /* TEXT */
          )
        ]),
        (0, import_vue2.createElementVNode)("view", {
          class: "close-view",
          onClick: _cache[0] || (_cache[0] = (0, import_vue2.withModifiers)((...args) => $options.close && $options.close(...args), ["stop"]))
        }, [
          (0, import_vue2.createElementVNode)("view", { class: "close-l close-h" }),
          (0, import_vue2.createElementVNode)("view", { class: "close-l close-v" })
        ])
      ]),
      (0, import_vue2.createElementVNode)("view", {
        class: "media-item-line",
        style: { "position": "absolute" }
      })
    ]);
  }
  var newsItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["styles", [_style_0$4]], ["__file", "/Users/licat/Desktop/project/planttitle-app/pages/news/news-item.nvue"]]);
  var _style_0$3 = { "uni-load-more": { "": { "flexDirection": "row", "height": 40, "alignItems": "center", "justifyContent": "center" } }, "uni-load-more__text": { "": { "fontSize": 15 } }, "uni-load-more__img": { "": { "width": 24, "height": 24, "marginRight": 8 } }, "uni-load-more__img--nvue": { "": { "color": "#666666" } }, "uni-load-more__img--android": { "": { "width": 24, "height": 24, "transform": "rotate(0deg)" } }, "uni-load-more__img--ios": { "": { "width": 24, "height": 24, "transform": "rotate(0deg)" } } };
  var platform = uni.getSystemInfoSync().platform;
  var _sfc_main$3 = {
    name: "UniLoadMore",
    props: {
      status: {
        // 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
            contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
            contentnomore: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86"
          };
        }
      }
    },
    data() {
      return {
        platform
      };
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
      renderWhole: true
    }, [
      $props.status === "loading" && $props.showIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "loading-indicator",
        {
          key: 0,
          style: (0, import_vue2.normalizeStyle)({ color: $props.color }),
          animating: true,
          class: "uni-load-more__img uni-load-more__img--nvue"
        },
        null,
        4
        /* STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)(
        "u-text",
        {
          class: "uni-load-more__text",
          style: (0, import_vue2.normalizeStyle)({ color: $props.color })
        },
        (0, import_vue2.toDisplayString)($props.status === "more" ? $props.contentText.contentdown : $props.status === "loading" ? $props.contentText.contentrefresh : $props.contentText.contentnomore),
        5
        /* TEXT, STYLE */
      )
    ]);
  }
  var uniLoadMore = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["styles", [_style_0$3]], ["__file", "/Users/licat/Desktop/project/planttitle-app/components/uni-load-more.vue"]]);
  var _style_0$2 = { "a-i-c": { "": { "alignItems": "center" } }, "j-c-c": { "": { "justifyContent": "center" } }, "t-a-c": { "": { "textAlign": "center" } }, "nodata": { "": { "flex": 1, "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "paddingTop": 30, "paddingRight": 30, "paddingBottom": 30, "paddingLeft": 30, "backgroundColor": "#f8f8f8" } }, "nodata-content": { "": { "transform": "translateY(-50px)" } }, "text-view": { "": { "marginBottom": 40 } }, "title": { "": { "color": "#999999", "fontSize": 18 } }, "opera-view": { "": { "flexDirection": "column", "alignItems": "center", "justifyContent": "center" } }, "btn": { "": { "paddingTop": 5, "paddingRight": 10, "paddingBottom": 5, "paddingLeft": 10, "width": 128, "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "textAlign": "center" } }, "btn-text": { "": { "color": "#999999", "fontSize": 15 } }, "btn-default": { "": { "borderColor": "#999999", "borderStyle": "solid", "borderWidth": 1, "borderRadius": 3 } } };
  var _sfc_main$2 = {
    name: "nodata",
    data() {
      return {
        textTypes: {
          none: "\u6682\u65E0\u7F51\u7EDC"
        },
        isConnected: false,
        networkType: "none"
      };
    },
    mounted() {
      this.isIOS = uni.getSystemInfoSync().platform === "ios";
      uni.onNetworkStatusChange((res) => {
        this.isConnected = res.isConnected;
        this.networkType = res.networkType;
      });
      uni.getNetworkType({
        success: (res) => {
          this.networkType = res.networkType;
        }
      });
    },
    methods: {
      retry() {
        this.$emit("retry");
      },
      openSettings() {
        return __async(this, null, function* () {
          if (this.networkType == "none") {
            this.openSystemSettings();
            return;
          }
        });
      },
      openAppSettings() {
        this.gotoAppSetting();
      },
      openSystemSettings() {
        if (this.isIOS) {
          this.gotoiOSSetting();
        } else {
          this.gotoAndroidSetting();
        }
      },
      network() {
        let result = null;
        let cellularData = plus.ios.newObject("CTCellularData");
        let state = cellularData.plusGetAttribute("restrictedState");
        if (state == 0) {
          result = null;
          formatAppLog("log", "at components/nodata.nvue:70", "StateUnknown");
        } else if (state == 2) {
          result = 1;
          formatAppLog("log", "at components/nodata.nvue:73", "\u5DF2\u7ECF\u5F00\u542F\u4E86\u4E92\u8054\u7F51\u6743\u9650:NotRestricted");
        } else if (state == 1) {
          result = 2;
          formatAppLog("log", "at components/nodata.nvue:76", "Restricted");
        }
        plus.ios.deleteObject(cellularData);
        return result;
      },
      gotoAppSetting() {
        if (this.isIOS) {
          let UIApplication = plus.ios.import("UIApplication");
          let application2 = UIApplication.sharedApplication();
          let NSURL2 = plus.ios.import("NSURL");
          let setting2 = NSURL2.URLWithString("app-settings:");
          application2.openURL(setting2);
          plus.ios.deleteObject(setting2);
          plus.ios.deleteObject(NSURL2);
          plus.ios.deleteObject(application2);
        } else {
          let Intent = plus.android.importClass("android.content.Intent");
          let Settings = plus.android.importClass("android.provider.Settings");
          let Uri = plus.android.importClass("android.net.Uri");
          let mainActivity = plus.android.runtimeMainActivity();
          let intent = new Intent();
          intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
          let uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
          intent.setData(uri);
          mainActivity.startActivity(intent);
        }
      },
      gotoiOSSetting() {
        let UIApplication = plus.ios.import("UIApplication");
        let application2 = UIApplication.sharedApplication();
        let NSURL2 = plus.ios.import("NSURL");
        let setting2 = NSURL2.URLWithString("App-prefs:root=General");
        application2.openURL(setting2);
        plus.ios.deleteObject(setting2);
        plus.ios.deleteObject(NSURL2);
        plus.ios.deleteObject(application2);
      },
      gotoAndroidSetting() {
        let Intent = plus.android.importClass("android.content.Intent");
        let Settings = plus.android.importClass("android.provider.Settings");
        let mainActivity = plus.android.runtimeMainActivity();
        let intent = new Intent(Settings.ACTION_SETTINGS);
        mainActivity.startActivity(intent);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
      class: "nodata",
      renderWhole: true
    }, [
      (0, import_vue2.createElementVNode)("view", { class: "nodata-content" }, [
        (0, import_vue2.createElementVNode)("view", { class: "text-view a-i-c j-c-c t-a-c" }, [
          (0, import_vue2.createElementVNode)(
            "u-text",
            { class: "title" },
            (0, import_vue2.toDisplayString)($data.textTypes[$data.networkType]),
            1
            /* TEXT */
          )
        ]),
        (0, import_vue2.createElementVNode)("view", { class: "icon-view" }),
        (0, import_vue2.createElementVNode)("view", { class: "opera-view" }, [
          $data.networkType != "none" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
            key: 0,
            class: "btn btn-default",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.retry && $options.retry(...args))
          }, [
            (0, import_vue2.createElementVNode)("u-text", { class: "btn-text" }, "\u91CD\u8BD5")
          ])) : (0, import_vue2.createCommentVNode)("v-if", true),
          $data.networkType == "none" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
            key: 1,
            class: "btn btn-default",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.openSettings && $options.openSettings(...args))
          }, [
            (0, import_vue2.createElementVNode)("u-text", { class: "btn-text" }, "\u8BBE\u7F6E")
          ])) : (0, import_vue2.createCommentVNode)("v-if", true)
        ])
      ])
    ]);
  }
  var noData = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["styles", [_style_0$2]], ["__file", "/Users/licat/Desktop/project/planttitle-app/components/nodata.nvue"]]);
  var _style_0$1 = { "no-data": { "": { "flex": 1, "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0, "zIndex": 10 } }, "page-news": { "": { "flex": 1, "flexDirection": "column", "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 } }, "listview": { "": { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0, "flexDirection": "column" } }, "refresh": { "": { "justifyContent": "center" } }, "refresh-view": { "": { "width": "750rpx", "height": 64, "flexDirection": "row", "flexWrap": "nowrap", "alignItems": "center", "justifyContent": "center" } }, "refresh-icon": { "": { "width": 32, "height": 32, "transitionDuration": 500, "transitionProperty": "transform", "transform": "rotate(0deg)", "transformOrigin": "15px 15px" } }, "refresh-icon-active": { "": { "transform": "rotate(180deg)" } }, "loading-icon": { "": { "width": 28, "height": 28, "marginRight": 5, "color": "#808080" } }, "loading-text": { "": { "marginLeft": 2, "fontSize": 16, "color": "#999999" } }, "loading-more": { "": { "alignItems": "center", "justifyContent": "center", "paddingTop": 14, "paddingBottom": 14, "textAlign": "center" } }, "loading-more-text": { "": { "fontSize": "28rpx", "color": "#999999" } }, "@TRANSITION": { "refresh-icon": { "duration": 500, "property": "transform" } } };
  var _sfc_main$1 = {
    components: {
      uniLoadMore,
      noData,
      newsItem
    },
    props: {
      nid: {
        type: [Number, String],
        default: ""
      }
    },
    data() {
      return {
        dataList: [],
        navigateFlag: false,
        pulling: false,
        refreshing: false,
        refreshFlag: false,
        refreshText: "",
        isLoading: false,
        loadingText: "\u52A0\u8F09\u4E2D...",
        isNoData: false,
        pulling: false,
        angle: 0,
        loadingMoreText: {
          contentdown: "",
          contentrefresh: "",
          contentnomore: ""
        },
        refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
        aditem: {
          id: this.newGuid() + "-1",
          newsid: -1,
          article_type: 1,
          datetime: friendlyDate(new Date("2023-09-23 09:41:04".replace(/\-/g, "/")).getTime()),
          title: "\u6211\u6210\u529F\u64FA\u812B\u6BDB\u56CA\u89D2\u5316\u75C7\u5566\uFF01\u5076\u7136\u767C\u73FE\u7D55\u5999\u65B9\u6CD5\uFF0C\u89AA\u6E2C\u6709\u6548\u7684\u65B9\u6CD5\u5206\u4EAB\u7D66\u4F60\u5011",
          image_url: "https://img.alicdn.com/imgextra/i2/917298378/O1CN01j635bC2BlAwDppuwX_!!917298378.jpg",
          source: "\u808C\u819A\u8B77\u7406",
          comment_count: "999+",
          post_id: "-1"
        }
      };
    },
    created() {
      this.pullTimer = null;
      this.requestParams = {
        columnId: this.nid,
        minId: 0,
        pageSize: 10,
        column: "id,post_id,title,author_name,cover,published_at,comments_count"
      };
      this._isWidescreen = false;
    },
    methods: {
      loadData(refresh) {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        this.isNoData = false;
        this.requestParams.time = (/* @__PURE__ */ new Date()).getTime() + "";
        uni.request({
          // url: this.$host + 'api/news',
          url: "https://unidemo.dcloud.net.cn/api/news",
          data: this.requestParams,
          success: (result) => {
            const data = result.data;
            this.isNoData = data.length <= 0;
            const data_list = data.map((news) => {
              return {
                id: this.newGuid() + news.id,
                newsid: news.id,
                article_type: 1,
                datetime: friendlyDate(new Date(news.published_at.replace(/\-/g, "/")).getTime()),
                title: news.title,
                image_url: news.cover,
                source: news.author_name,
                comment_count: news.comments_count,
                post_id: news.post_id
              };
            });
            if (refresh) {
              this.dataList = data_list;
              this.requestParams.minId = 0;
            } else {
              this.dataList = this.dataList.concat(data_list);
              this.requestParams.minId = data[data.length - 1].id;
            }
            if (this.dataList.length > 0 && this._isWidescreen && this.dataList.length <= 10) {
              this.goDetail(this.dataList[0]);
            }
          },
          fail: (err) => {
            if (this.dataList.length == 0) {
              this.isNoData = true;
            }
          },
          complete: (e) => {
            this.isLoading = false;
            if (refresh) {
              this.refreshing = false;
              this.refreshFlag = false;
              this.refreshText = "\u5DF2\u5237\u65B0";
              if (this.pullTimer) {
                clearTimeout(this.pullTimer);
              }
              this.pullTimer = setTimeout(() => {
                this.pulling = false;
              }, 1e3);
            }
          }
        });
      },
      loadMore(e) {
        this.loadData();
      },
      clear() {
        this.dataList.length = 0;
        this.requestParams.minId = 0;
      },
      goDetail(item) {
        if (this._isWidescreen) {
          uni.$emit("updateDetail", {
            detail: encodeURIComponent(JSON.stringify(item))
          });
          return;
        }
        uni.navigateTo({
          url: "./detail?query=" + encodeURIComponent(JSON.stringify(item)),
          fail: (res) => {
            formatAppLog("log", "at pages/news/news-page.nvue:194", res.errMsg);
          }
        });
      },
      closeItem(index2) {
        if (index2 < 0) {
          return;
        }
        uni.showModal({
          content: "\u4E0D\u611F\u5174\u8DA3\uFF1F",
          success: (res) => {
            if (res.confirm) {
              this.dataList.splice(index2, 1);
            }
          }
        });
      },
      refreshData() {
        if (this.isLoading) {
          return;
        }
        this.pulling = true;
        this.refreshing = true;
        this.refreshText = "\u6B63\u5728\u5237\u65B0...";
        this.loadData(true);
      },
      onrefresh(e) {
        this.refreshData();
        this.$refs.list.resetLoadmore();
      },
      onpullingdown(e) {
        if (this.refreshing) {
          return;
        }
        this.pulling = false;
        if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
          this.refreshFlag = true;
          this.refreshText = "\u91CB\u653E\u7ACB\u5373\u5237\u65B0";
        } else {
          this.refreshFlag = false;
          this.refreshText = "\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0";
        }
      },
      newGuid() {
        let s4 = function() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        };
        return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_news_item = (0, import_vue2.resolveComponent)("news-item");
    const _component_no_data = (0, import_vue2.resolveComponent)("no-data");
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
      class: "page-news",
      renderWhole: true
    }, [
      (0, import_vue2.createElementVNode)("list", { class: "listview" }, [
        (0, import_vue2.createElementVNode)("refresh", {
          display: $data.refreshing,
          onRefresh: _cache[0] || (_cache[0] = (...args) => $options.onrefresh && $options.onrefresh(...args)),
          onPullingdown: _cache[1] || (_cache[1] = (...args) => $options.onpullingdown && $options.onpullingdown(...args))
        }, null, 40, ["display"]),
        ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          null,
          (0, import_vue2.renderList)($data.dataList, (item, index2) => {
            return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("cell", {
              key: item.id
            }, [
              (index2 + 1) % 9 === 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_news_item, {
                key: 0,
                newsItem: $data.aditem,
                onClose: _cache[2] || (_cache[2] = ($event) => $options.closeItem(-1)),
                onClick: _cache[3] || (_cache[3] = ($event) => $options.goDetail($data.aditem))
              }, null, 8, ["newsItem"])) : (0, import_vue2.createCommentVNode)("v-if", true),
              (0, import_vue2.createVNode)(_component_news_item, {
                newsItem: item,
                onClose: ($event) => $options.closeItem(index2),
                onClick: ($event) => $options.goDetail(item)
              }, null, 8, ["newsItem", "onClose", "onClick"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        $data.isLoading || $data.dataList.length > 4 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("cell", { key: 0 }, [
          (0, import_vue2.createElementVNode)("view", { class: "loading-more" }, [
            (0, import_vue2.createElementVNode)(
              "u-text",
              { class: "loading-more-text" },
              (0, import_vue2.toDisplayString)($data.loadingText),
              1
              /* TEXT */
            )
          ])
        ])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ]),
      $data.isNoData ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_no_data, {
        key: 0,
        class: "no-data",
        onRetry: $options.loadMore
      }, null, 8, ["onRetry"])) : (0, import_vue2.createCommentVNode)("v-if", true)
    ]);
  }
  var newsPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]], ["__file", "/Users/licat/Desktop/project/planttitle-app/pages/news/news-page.nvue"]]);
  var _style_0 = { "tabs": { "": { "flex": 1, "flexDirection": "column", "overflow": "hidden", "backgroundColor": "#ffffff" } }, "tab-bar": { "": { "width": "750rpx", "height": 42, "flexDirection": "row" } }, "scroll-view-indicator": { "": { "position": "relative", "height": 2, "backgroundColor": "rgba(0,0,0,0)" } }, "scroll-view-underline": { "": { "position": "absolute", "top": 0, "bottom": 0, "width": 0, "backgroundColor": "#007AFF" } }, "scroll-view-animation": { "": { "transitionDuration": 200, "transitionProperty": "left" } }, "tab-bar-line": { "": { "height": 1, "backgroundColor": "#cccccc" } }, "tab-box": { "": { "flex": 1 } }, "uni-tab-item": { "": { "flexWrap": "nowrap", "paddingLeft": 20, "paddingRight": 20 } }, "uni-tab-item-title": { "": { "color": "#555555", "fontSize": 15, "height": 40, "lineHeight": 40, "flexWrap": "nowrap" } }, "uni-tab-item-title-active": { "": { "color": "#007AFF" } }, "swiper-item": { "": { "flex": 1, "flexDirection": "column" } }, "page-item": { "": { "flex": 1, "flexDirection": "row", "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 } }, "@TRANSITION": { "scroll-view-animation": { "duration": 200, "property": "left" } } };
  var dom = weex.requireModule("dom");
  var MAX_CACHE_DATA = 100;
  var MAX_CACHE_PAGE = 3;
  var TAB_PRELOAD_OFFSET = 1;
  var _sfc_main = {
    components: {
      newsPage
    },
    data() {
      return {
        tabList: [{
          id: "tab02",
          name: "\u63A8\u85A6",
          newsid: 23
        }, {
          id: "tab01",
          name: "\u6700\u65B0",
          newsid: 0
        }, {
          id: "tab03",
          name: "\u795B\u6591",
          newsid: 223
        }, {
          id: "tab04",
          name: "\u7F8E\u767D",
          newsid: 221
        }, {
          id: "tab05",
          name: "\u795B\u75D8",
          newsid: 225
        }, {
          id: "tab06",
          name: "\u6297\u8001",
          newsid: 208
        }],
        tabIndex: 0,
        cacheTab: [],
        scrollInto: "",
        navigateFlag: false,
        indicatorLineLeft: 0,
        indicatorLineWidth: 0,
        isTap: false
      };
    },
    onReady() {
      this._lastTabIndex = 0;
      this.swiperWidth = 0;
      this.tabbarWidth = 0;
      this.tabListSize = {};
      this._touchTabIndex = 0;
      this.pageList = [];
      for (let i = 0; i < this.tabList.length; i++) {
        let item = this.$refs["page" + i];
        if (Array.isArray(item)) {
          this.pageList.push(item[0]);
        } else {
          this.pageList.push(item);
        }
      }
      this.switchTab(this.tabIndex);
      this.selectorQuery();
    },
    methods: {
      onTabItemTap(e) {
        let newsPageData = localStorage.getItem("news-page");
        try {
          let newsPage2 = JSON.parse(newsPageData);
          formatAppLog("log", "at pages/news/index.nvue:110", newsPage2);
        } catch (err) {
          formatAppLog("log", "at pages/news/index.nvue:112", err);
          return;
        }
        formatAppLog("log", "at pages/news/index.nvue:116", e);
      },
      ontabtap(e) {
        let index2 = e.target.dataset.current || e.currentTarget.dataset.current;
        this.isTap = true;
        let currentSize = this.tabListSize[index2];
        this.updateIndicator(currentSize.left, currentSize.width);
        this._touchTabIndex = index2;
        this.switchTab(index2);
      },
      onswiperchange(e) {
      },
      onswiperscroll(e) {
        if (this.isTap) {
          return;
        }
        let offsetX = e.detail.dx;
        let preloadIndex = this._lastTabIndex;
        if (offsetX > TAB_PRELOAD_OFFSET) {
          preloadIndex++;
        } else if (offsetX < -TAB_PRELOAD_OFFSET) {
          preloadIndex--;
        }
        if (preloadIndex === this._lastTabIndex || preloadIndex < 0 || preloadIndex > this.pageList.length - 1) {
          return;
        }
        if (this.pageList[preloadIndex].dataList.length === 0) {
          this.loadTabData(preloadIndex);
        }
        let percentage = Math.abs(this.swiperWidth / offsetX);
        let currentSize = this.tabListSize[this._lastTabIndex];
        let preloadSize = this.tabListSize[preloadIndex];
        let lineL = currentSize.left + (preloadSize.left - currentSize.left) / percentage;
        let lineW = currentSize.width + (preloadSize.width - currentSize.width) / percentage;
        this.updateIndicator(lineL, lineW);
      },
      animationfinish(e) {
        let index2 = e.detail.current;
        if (this._touchTabIndex === index2) {
          this.isTap = false;
        }
        this._lastTabIndex = index2;
        this.switchTab(index2);
        this.updateIndicator(this.tabListSize[index2].left, this.tabListSize[index2].width);
      },
      selectorQuery() {
        dom.getComponentRect(this.$refs.tabbar1, (res) => {
          this.tabbarWidth = res.size.width;
        });
        dom.getComponentRect(this.$refs["swiper1"], (res) => {
          this.swiperWidth = res.size.width;
        });
        let queryTabSize = uni.createSelectorQuery().in(this);
        for (let i = 0; i < this.tabList.length; i++) {
          queryTabSize.select("#" + this.tabList[i].id).boundingClientRect();
        }
        queryTabSize.exec((rects) => {
          rects.forEach((rect) => {
            this.tabListSize[rect.dataset.id] = rect;
          });
          this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
          this.switchTab(this.tabIndex);
        });
      },
      getElementSize(dom2, ref, id) {
        dom2.getComponentRect(ref, (res) => {
          this.tabListSize[id] = res.size;
        });
      },
      updateIndicator(left, width) {
        this.indicatorLineLeft = left;
        this.indicatorLineWidth = width;
      },
      switchTab(index2) {
        if (this.pageList[index2].dataList.length === 0) {
          this.loadTabData(index2);
        }
        if (this.tabIndex === index2) {
          return;
        }
        if (this.pageList[this.tabIndex].dataList.length > MAX_CACHE_DATA) {
          let isExist = this.cacheTab.indexOf(this.tabIndex);
          if (isExist < 0) {
            this.cacheTab.push(this.tabIndex);
          }
        }
        this.tabIndex = index2;
        this.scrollTabTo(index2);
        if (this.cacheTab.length > MAX_CACHE_PAGE) {
          let cacheIndex = this.cacheTab[0];
          this.clearTabData(cacheIndex);
          this.cacheTab.splice(0, 1);
        }
      },
      scrollTabTo(index2) {
        const el = this.$refs["tabitem" + index2][0];
        let offset = 0;
        if (index2 > 0) {
          offset = this.tabbarWidth / 2 - this.tabListSize[index2].width / 2;
          if (this.tabListSize[index2].right < this.tabbarWidth / 2) {
            offset = this.tabListSize[0].width;
          }
        }
        dom.scrollToElement(el, {
          offset: -offset
        });
      },
      loadTabData(index2) {
        this.pageList[index2].loadData();
      },
      clearTabData(index2) {
        this.pageList[index2].clear();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_newsPage = (0, import_vue2.resolveComponent)("newsPage");
    const _component_swiper_item = (0, import_vue2.resolveComponent)("swiper-item");
    const _component_swiper = (0, import_vue2.resolveComponent)("swiper");
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      (0, import_vue2.createElementVNode)("view", { class: "tabs" }, [
        (0, import_vue2.createElementVNode)("scroll-view", {
          ref: "tabbar1",
          id: "tab-bar",
          class: "tab-bar",
          scroll: false,
          scrollX: true,
          showScrollbar: false,
          scrollIntoView: $data.scrollInto
        }, [
          (0, import_vue2.createElementVNode)("view", { style: { "flex-direction": "column" } }, [
            (0, import_vue2.createElementVNode)("view", { style: { "flex-direction": "row" } }, [
              ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
                import_vue2.Fragment,
                null,
                (0, import_vue2.renderList)($data.tabList, (tab, index2) => {
                  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    class: "uni-tab-item",
                    key: tab.id,
                    id: tab.id,
                    ref_for: true,
                    ref: "tabitem" + index2,
                    "data-id": index2,
                    "data-current": index2,
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.ontabtap && $options.ontabtap(...args))
                  }, [
                    (0, import_vue2.createElementVNode)(
                      "u-text",
                      {
                        class: (0, import_vue2.normalizeClass)(["uni-tab-item-title", $data.tabIndex == index2 ? "uni-tab-item-title-active" : ""])
                      },
                      (0, import_vue2.toDisplayString)(tab.name),
                      3
                      /* TEXT, CLASS */
                    )
                  ], 8, ["id", "data-id", "data-current"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            (0, import_vue2.createElementVNode)("view", { class: "scroll-view-indicator" }, [
              (0, import_vue2.createElementVNode)(
                "view",
                {
                  ref: "underline",
                  class: (0, import_vue2.normalizeClass)(["scroll-view-underline", $data.isTap ? "scroll-view-animation" : ""]),
                  style: (0, import_vue2.normalizeStyle)({ left: $data.indicatorLineLeft + "px", width: $data.indicatorLineWidth + "px" })
                },
                null,
                6
                /* CLASS, STYLE */
              )
            ])
          ])
        ], 8, ["scrollIntoView"]),
        (0, import_vue2.createElementVNode)("view", { class: "tab-bar-line" }),
        (0, import_vue2.createVNode)(_component_swiper, {
          class: "tab-box",
          ref: "swiper1",
          current: $data.tabIndex,
          duration: 300,
          onChange: $options.onswiperchange,
          onTransition: $options.onswiperscroll,
          onAnimationfinish: $options.animationfinish,
          onOnAnimationEnd: $options.animationfinish
        }, {
          default: (0, import_vue2.withCtx)(() => [
            ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
              import_vue2.Fragment,
              null,
              (0, import_vue2.renderList)($data.tabList, (page, index2) => {
                return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(
                  _component_swiper_item,
                  {
                    class: "swiper-item",
                    key: index2
                  },
                  {
                    default: (0, import_vue2.withCtx)(() => [
                      (0, import_vue2.createVNode)(_component_newsPage, {
                        class: "page-item",
                        nid: page.newsid,
                        ref_for: true,
                        ref: "page" + index2
                      }, null, 8, ["nid"])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["current", "onChange", "onTransition", "onAnimationfinish", "onOnAnimationEnd"])
      ])
    ]);
  }
  var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "/Users/licat/Desktop/project/planttitle-app/pages/news/index.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/news/index";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    index.mpType = "page";
    const app = Vue.createPageApp(index, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...index.styles || []]));
    app.mount("#root");
  }
})();
