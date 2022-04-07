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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/numeric/numeric-1.2.6.js
var require_numeric_1_2_6 = __commonJS({
  "node_modules/numeric/numeric-1.2.6.js"(exports, module) {
    "use strict";
    var numeric = typeof exports === "undefined" ? function numeric4() {
    } : exports;
    if (typeof global !== "undefined") {
      global.numeric = numeric;
    }
    numeric.version = "1.2.6";
    numeric.bench = function bench(f, interval) {
      var t1, t2, n, i;
      if (typeof interval === "undefined") {
        interval = 15;
      }
      n = 0.5;
      t1 = new Date();
      while (1) {
        n *= 2;
        for (i = n; i > 3; i -= 4) {
          f();
          f();
          f();
          f();
        }
        while (i > 0) {
          f();
          i--;
        }
        t2 = new Date();
        if (t2 - t1 > interval)
          break;
      }
      for (i = n; i > 3; i -= 4) {
        f();
        f();
        f();
        f();
      }
      while (i > 0) {
        f();
        i--;
      }
      t2 = new Date();
      return 1e3 * (3 * n - 1) / (t2 - t1);
    };
    numeric._myIndexOf = function _myIndexOf(w) {
      var n = this.length, k2;
      for (k2 = 0; k2 < n; ++k2)
        if (this[k2] === w)
          return k2;
      return -1;
    };
    numeric.myIndexOf = Array.prototype.indexOf ? Array.prototype.indexOf : numeric._myIndexOf;
    numeric.Function = Function;
    numeric.precision = 4;
    numeric.largeArray = 50;
    numeric.prettyPrint = function prettyPrint(x) {
      function fmtnum(x2) {
        if (x2 === 0) {
          return "0";
        }
        if (isNaN(x2)) {
          return "NaN";
        }
        if (x2 < 0) {
          return "-" + fmtnum(-x2);
        }
        if (isFinite(x2)) {
          var scale = Math.floor(Math.log(x2) / Math.log(10));
          var normalized = x2 / Math.pow(10, scale);
          var basic = normalized.toPrecision(numeric.precision);
          if (parseFloat(basic) === 10) {
            scale++;
            normalized = 1;
            basic = normalized.toPrecision(numeric.precision);
          }
          return parseFloat(basic).toString() + "e" + scale.toString();
        }
        return "Infinity";
      }
      var ret = [];
      function foo(x2) {
        var k2;
        if (typeof x2 === "undefined") {
          ret.push(Array(numeric.precision + 8).join(" "));
          return false;
        }
        if (typeof x2 === "string") {
          ret.push('"' + x2 + '"');
          return false;
        }
        if (typeof x2 === "boolean") {
          ret.push(x2.toString());
          return false;
        }
        if (typeof x2 === "number") {
          var a = fmtnum(x2);
          var b = x2.toPrecision(numeric.precision);
          var c = parseFloat(x2.toString()).toString();
          var d = [a, b, c, parseFloat(b).toString(), parseFloat(c).toString()];
          for (k2 = 1; k2 < d.length; k2++) {
            if (d[k2].length < a.length)
              a = d[k2];
          }
          ret.push(Array(numeric.precision + 8 - a.length).join(" ") + a);
          return false;
        }
        if (x2 === null) {
          ret.push("null");
          return false;
        }
        if (typeof x2 === "function") {
          ret.push(x2.toString());
          var flag = false;
          for (k2 in x2) {
            if (x2.hasOwnProperty(k2)) {
              if (flag)
                ret.push(",\n");
              else
                ret.push("\n{");
              flag = true;
              ret.push(k2);
              ret.push(": \n");
              foo(x2[k2]);
            }
          }
          if (flag)
            ret.push("}\n");
          return true;
        }
        if (x2 instanceof Array) {
          if (x2.length > numeric.largeArray) {
            ret.push("...Large Array...");
            return true;
          }
          var flag = false;
          ret.push("[");
          for (k2 = 0; k2 < x2.length; k2++) {
            if (k2 > 0) {
              ret.push(",");
              if (flag)
                ret.push("\n ");
            }
            flag = foo(x2[k2]);
          }
          ret.push("]");
          return true;
        }
        ret.push("{");
        var flag = false;
        for (k2 in x2) {
          if (x2.hasOwnProperty(k2)) {
            if (flag)
              ret.push(",\n");
            flag = true;
            ret.push(k2);
            ret.push(": \n");
            foo(x2[k2]);
          }
        }
        ret.push("}");
        return true;
      }
      foo(x);
      return ret.join("");
    };
    numeric.parseDate = function parseDate(d) {
      function foo(d2) {
        if (typeof d2 === "string") {
          return Date.parse(d2.replace(/-/g, "/"));
        }
        if (!(d2 instanceof Array)) {
          throw new Error("parseDate: parameter must be arrays of strings");
        }
        var ret = [], k2;
        for (k2 = 0; k2 < d2.length; k2++) {
          ret[k2] = foo(d2[k2]);
        }
        return ret;
      }
      return foo(d);
    };
    numeric.parseFloat = function parseFloat_(d) {
      function foo(d2) {
        if (typeof d2 === "string") {
          return parseFloat(d2);
        }
        if (!(d2 instanceof Array)) {
          throw new Error("parseFloat: parameter must be arrays of strings");
        }
        var ret = [], k2;
        for (k2 = 0; k2 < d2.length; k2++) {
          ret[k2] = foo(d2[k2]);
        }
        return ret;
      }
      return foo(d);
    };
    numeric.parseCSV = function parseCSV(t) {
      var foo = t.split("\n");
      var j, k2;
      var ret = [];
      var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
      var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
      var stripper = function(n) {
        return n.substr(0, n.length - 1);
      };
      var count = 0;
      for (k2 = 0; k2 < foo.length; k2++) {
        var bar = (foo[k2] + ",").match(pat), baz;
        if (bar.length > 0) {
          ret[count] = [];
          for (j = 0; j < bar.length; j++) {
            baz = stripper(bar[j]);
            if (patnum.test(baz)) {
              ret[count][j] = parseFloat(baz);
            } else
              ret[count][j] = baz;
          }
          count++;
        }
      }
      return ret;
    };
    numeric.toCSV = function toCSV(A2) {
      var s = numeric.dim(A2);
      var i, j, m, n, row, ret;
      m = s[0];
      n = s[1];
      ret = [];
      for (i = 0; i < m; i++) {
        row = [];
        for (j = 0; j < m; j++) {
          row[j] = A2[i][j].toString();
        }
        ret[i] = row.join(", ");
      }
      return ret.join("\n") + "\n";
    };
    numeric.getURL = function getURL(url) {
      var client = new XMLHttpRequest();
      client.open("GET", url, false);
      client.send();
      return client;
    };
    numeric.imageURL = function imageURL(img) {
      function base64(A2) {
        var n = A2.length, i2, x, y, z, p, q, r, s;
        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var ret = "";
        for (i2 = 0; i2 < n; i2 += 3) {
          x = A2[i2];
          y = A2[i2 + 1];
          z = A2[i2 + 2];
          p = x >> 2;
          q = ((x & 3) << 4) + (y >> 4);
          r = ((y & 15) << 2) + (z >> 6);
          s = z & 63;
          if (i2 + 1 >= n) {
            r = s = 64;
          } else if (i2 + 2 >= n) {
            s = 64;
          }
          ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
        }
        return ret;
      }
      function crc32Array(a2, from, to) {
        if (typeof from === "undefined") {
          from = 0;
        }
        if (typeof to === "undefined") {
          to = a2.length;
        }
        var table = [
          0,
          1996959894,
          3993919788,
          2567524794,
          124634137,
          1886057615,
          3915621685,
          2657392035,
          249268274,
          2044508324,
          3772115230,
          2547177864,
          162941995,
          2125561021,
          3887607047,
          2428444049,
          498536548,
          1789927666,
          4089016648,
          2227061214,
          450548861,
          1843258603,
          4107580753,
          2211677639,
          325883990,
          1684777152,
          4251122042,
          2321926636,
          335633487,
          1661365465,
          4195302755,
          2366115317,
          997073096,
          1281953886,
          3579855332,
          2724688242,
          1006888145,
          1258607687,
          3524101629,
          2768942443,
          901097722,
          1119000684,
          3686517206,
          2898065728,
          853044451,
          1172266101,
          3705015759,
          2882616665,
          651767980,
          1373503546,
          3369554304,
          3218104598,
          565507253,
          1454621731,
          3485111705,
          3099436303,
          671266974,
          1594198024,
          3322730930,
          2970347812,
          795835527,
          1483230225,
          3244367275,
          3060149565,
          1994146192,
          31158534,
          2563907772,
          4023717930,
          1907459465,
          112637215,
          2680153253,
          3904427059,
          2013776290,
          251722036,
          2517215374,
          3775830040,
          2137656763,
          141376813,
          2439277719,
          3865271297,
          1802195444,
          476864866,
          2238001368,
          4066508878,
          1812370925,
          453092731,
          2181625025,
          4111451223,
          1706088902,
          314042704,
          2344532202,
          4240017532,
          1658658271,
          366619977,
          2362670323,
          4224994405,
          1303535960,
          984961486,
          2747007092,
          3569037538,
          1256170817,
          1037604311,
          2765210733,
          3554079995,
          1131014506,
          879679996,
          2909243462,
          3663771856,
          1141124467,
          855842277,
          2852801631,
          3708648649,
          1342533948,
          654459306,
          3188396048,
          3373015174,
          1466479909,
          544179635,
          3110523913,
          3462522015,
          1591671054,
          702138776,
          2966460450,
          3352799412,
          1504918807,
          783551873,
          3082640443,
          3233442989,
          3988292384,
          2596254646,
          62317068,
          1957810842,
          3939845945,
          2647816111,
          81470997,
          1943803523,
          3814918930,
          2489596804,
          225274430,
          2053790376,
          3826175755,
          2466906013,
          167816743,
          2097651377,
          4027552580,
          2265490386,
          503444072,
          1762050814,
          4150417245,
          2154129355,
          426522225,
          1852507879,
          4275313526,
          2312317920,
          282753626,
          1742555852,
          4189708143,
          2394877945,
          397917763,
          1622183637,
          3604390888,
          2714866558,
          953729732,
          1340076626,
          3518719985,
          2797360999,
          1068828381,
          1219638859,
          3624741850,
          2936675148,
          906185462,
          1090812512,
          3747672003,
          2825379669,
          829329135,
          1181335161,
          3412177804,
          3160834842,
          628085408,
          1382605366,
          3423369109,
          3138078467,
          570562233,
          1426400815,
          3317316542,
          2998733608,
          733239954,
          1555261956,
          3268935591,
          3050360625,
          752459403,
          1541320221,
          2607071920,
          3965973030,
          1969922972,
          40735498,
          2617837225,
          3943577151,
          1913087877,
          83908371,
          2512341634,
          3803740692,
          2075208622,
          213261112,
          2463272603,
          3855990285,
          2094854071,
          198958881,
          2262029012,
          4057260610,
          1759359992,
          534414190,
          2176718541,
          4139329115,
          1873836001,
          414664567,
          2282248934,
          4279200368,
          1711684554,
          285281116,
          2405801727,
          4167216745,
          1634467795,
          376229701,
          2685067896,
          3608007406,
          1308918612,
          956543938,
          2808555105,
          3495958263,
          1231636301,
          1047427035,
          2932959818,
          3654703836,
          1088359270,
          936918e3,
          2847714899,
          3736837829,
          1202900863,
          817233897,
          3183342108,
          3401237130,
          1404277552,
          615818150,
          3134207493,
          3453421203,
          1423857449,
          601450431,
          3009837614,
          3294710456,
          1567103746,
          711928724,
          3020668471,
          3272380065,
          1510334235,
          755167117
        ];
        var crc = -1, y = 0, n = a2.length, i2;
        for (i2 = from; i2 < to; i2++) {
          y = (crc ^ a2[i2]) & 255;
          crc = crc >>> 8 ^ table[y];
        }
        return crc ^ -1;
      }
      var h = img[0].length, w = img[0][0].length, s1, s2, next, k2, length, a, b, i, j, adler32, crc32;
      var stream = [
        137,
        80,
        78,
        71,
        13,
        10,
        26,
        10,
        0,
        0,
        0,
        13,
        73,
        72,
        68,
        82,
        w >> 24 & 255,
        w >> 16 & 255,
        w >> 8 & 255,
        w & 255,
        h >> 24 & 255,
        h >> 16 & 255,
        h >> 8 & 255,
        h & 255,
        8,
        2,
        0,
        0,
        0,
        -1,
        -2,
        -3,
        -4,
        -5,
        -6,
        -7,
        -8,
        73,
        68,
        65,
        84,
        8,
        29
      ];
      crc32 = crc32Array(stream, 12, 29);
      stream[29] = crc32 >> 24 & 255;
      stream[30] = crc32 >> 16 & 255;
      stream[31] = crc32 >> 8 & 255;
      stream[32] = crc32 & 255;
      s1 = 1;
      s2 = 0;
      for (i = 0; i < h; i++) {
        if (i < h - 1) {
          stream.push(0);
        } else {
          stream.push(1);
        }
        a = 3 * w + 1 + (i === 0) & 255;
        b = 3 * w + 1 + (i === 0) >> 8 & 255;
        stream.push(a);
        stream.push(b);
        stream.push(~a & 255);
        stream.push(~b & 255);
        if (i === 0)
          stream.push(0);
        for (j = 0; j < w; j++) {
          for (k2 = 0; k2 < 3; k2++) {
            a = img[k2][i][j];
            if (a > 255)
              a = 255;
            else if (a < 0)
              a = 0;
            else
              a = Math.round(a);
            s1 = (s1 + a) % 65521;
            s2 = (s2 + s1) % 65521;
            stream.push(a);
          }
        }
        stream.push(0);
      }
      adler32 = (s2 << 16) + s1;
      stream.push(adler32 >> 24 & 255);
      stream.push(adler32 >> 16 & 255);
      stream.push(adler32 >> 8 & 255);
      stream.push(adler32 & 255);
      length = stream.length - 41;
      stream[33] = length >> 24 & 255;
      stream[34] = length >> 16 & 255;
      stream[35] = length >> 8 & 255;
      stream[36] = length & 255;
      crc32 = crc32Array(stream, 37);
      stream.push(crc32 >> 24 & 255);
      stream.push(crc32 >> 16 & 255);
      stream.push(crc32 >> 8 & 255);
      stream.push(crc32 & 255);
      stream.push(0);
      stream.push(0);
      stream.push(0);
      stream.push(0);
      stream.push(73);
      stream.push(69);
      stream.push(78);
      stream.push(68);
      stream.push(174);
      stream.push(66);
      stream.push(96);
      stream.push(130);
      return "data:image/png;base64," + base64(stream);
    };
    numeric._dim = function _dim(x) {
      var ret = [];
      while (typeof x === "object") {
        ret.push(x.length);
        x = x[0];
      }
      return ret;
    };
    numeric.dim = function dim(x) {
      var y, z;
      if (typeof x === "object") {
        y = x[0];
        if (typeof y === "object") {
          z = y[0];
          if (typeof z === "object") {
            return numeric._dim(x);
          }
          return [x.length, y.length];
        }
        return [x.length];
      }
      return [];
    };
    numeric.mapreduce = function mapreduce(body, init) {
      return Function("x", "accum", "_s", "_k", 'if(typeof accum === "undefined") accum = ' + init + ';\nif(typeof x === "number") { var xi = x; ' + body + '; return accum; }\nif(typeof _s === "undefined") _s = numeric.dim(x);\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i,xi;\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) {\n        accum = arguments.callee(x[i],accum,_s,_k+1);\n    }    return accum;\n}\nfor(i=_n-1;i>=1;i-=2) { \n    xi = x[i];\n    ' + body + ";\n    xi = x[i-1];\n    " + body + ";\n}\nif(i === 0) {\n    xi = x[i];\n    " + body + "\n}\nreturn accum;");
    };
    numeric.mapreduce2 = function mapreduce2(body, setup) {
      return Function("x", "var n = x.length;\nvar i,xi;\n" + setup + ";\nfor(i=n-1;i!==-1;--i) { \n    xi = x[i];\n    " + body + ";\n}\nreturn accum;");
    };
    numeric.same = function same(x, y) {
      var i, n;
      if (!(x instanceof Array) || !(y instanceof Array)) {
        return false;
      }
      n = x.length;
      if (n !== y.length) {
        return false;
      }
      for (i = 0; i < n; i++) {
        if (x[i] === y[i]) {
          continue;
        }
        if (typeof x[i] === "object") {
          if (!same(x[i], y[i]))
            return false;
        } else {
          return false;
        }
      }
      return true;
    };
    numeric.rep = function rep(s, v, k2) {
      if (typeof k2 === "undefined") {
        k2 = 0;
      }
      var n = s[k2], ret = Array(n), i;
      if (k2 === s.length - 1) {
        for (i = n - 2; i >= 0; i -= 2) {
          ret[i + 1] = v;
          ret[i] = v;
        }
        if (i === -1) {
          ret[0] = v;
        }
        return ret;
      }
      for (i = n - 1; i >= 0; i--) {
        ret[i] = numeric.rep(s, v, k2 + 1);
      }
      return ret;
    };
    numeric.dotMMsmall = function dotMMsmall(x, y) {
      var i, j, k2, p, q, r, ret, foo, bar, woo, i0, k0, p0, r0;
      p = x.length;
      q = y.length;
      r = y[0].length;
      ret = Array(p);
      for (i = p - 1; i >= 0; i--) {
        foo = Array(r);
        bar = x[i];
        for (k2 = r - 1; k2 >= 0; k2--) {
          woo = bar[q - 1] * y[q - 1][k2];
          for (j = q - 2; j >= 1; j -= 2) {
            i0 = j - 1;
            woo += bar[j] * y[j][k2] + bar[i0] * y[i0][k2];
          }
          if (j === 0) {
            woo += bar[0] * y[0][k2];
          }
          foo[k2] = woo;
        }
        ret[i] = foo;
      }
      return ret;
    };
    numeric._getCol = function _getCol(A2, j, x) {
      var n = A2.length, i;
      for (i = n - 1; i > 0; --i) {
        x[i] = A2[i][j];
        --i;
        x[i] = A2[i][j];
      }
      if (i === 0)
        x[0] = A2[0][j];
    };
    numeric.dotMMbig = function dotMMbig(x, y) {
      var gc = numeric._getCol, p = y.length, v = Array(p);
      var m = x.length, n = y[0].length, A2 = new Array(m), xj;
      var VV = numeric.dotVV;
      var i, j, k2, z;
      --p;
      --m;
      for (i = m; i !== -1; --i)
        A2[i] = Array(n);
      --n;
      for (i = n; i !== -1; --i) {
        gc(y, i, v);
        for (j = m; j !== -1; --j) {
          z = 0;
          xj = x[j];
          A2[j][i] = VV(xj, v);
        }
      }
      return A2;
    };
    numeric.dotMV = function dotMV(x, y) {
      var p = x.length, q = y.length, i;
      var ret = Array(p), dotVV = numeric.dotVV;
      for (i = p - 1; i >= 0; i--) {
        ret[i] = dotVV(x[i], y);
      }
      return ret;
    };
    numeric.dotVM = function dotVM(x, y) {
      var i, j, k2, p, q, r, ret, foo, bar, woo, i0, k0, p0, r0, s1, s2, s3, baz, accum;
      p = x.length;
      q = y[0].length;
      ret = Array(q);
      for (k2 = q - 1; k2 >= 0; k2--) {
        woo = x[p - 1] * y[p - 1][k2];
        for (j = p - 2; j >= 1; j -= 2) {
          i0 = j - 1;
          woo += x[j] * y[j][k2] + x[i0] * y[i0][k2];
        }
        if (j === 0) {
          woo += x[0] * y[0][k2];
        }
        ret[k2] = woo;
      }
      return ret;
    };
    numeric.dotVV = function dotVV(x, y) {
      var i, n = x.length, i1, ret = x[n - 1] * y[n - 1];
      for (i = n - 2; i >= 1; i -= 2) {
        i1 = i - 1;
        ret += x[i] * y[i] + x[i1] * y[i1];
      }
      if (i === 0) {
        ret += x[0] * y[0];
      }
      return ret;
    };
    numeric.dot = function dot(x, y) {
      var d = numeric.dim;
      switch (d(x).length * 1e3 + d(y).length) {
        case 2002:
          if (y.length < 10)
            return numeric.dotMMsmall(x, y);
          else
            return numeric.dotMMbig(x, y);
        case 2001:
          return numeric.dotMV(x, y);
        case 1002:
          return numeric.dotVM(x, y);
        case 1001:
          return numeric.dotVV(x, y);
        case 1e3:
          return numeric.mulVS(x, y);
        case 1:
          return numeric.mulSV(x, y);
        case 0:
          return x * y;
        default:
          throw new Error("numeric.dot only works on vectors and matrices");
      }
    };
    numeric.diag = function diag(d) {
      var i, i1, j, n = d.length, A2 = Array(n), Ai;
      for (i = n - 1; i >= 0; i--) {
        Ai = Array(n);
        i1 = i + 2;
        for (j = n - 1; j >= i1; j -= 2) {
          Ai[j] = 0;
          Ai[j - 1] = 0;
        }
        if (j > i) {
          Ai[j] = 0;
        }
        Ai[i] = d[i];
        for (j = i - 1; j >= 1; j -= 2) {
          Ai[j] = 0;
          Ai[j - 1] = 0;
        }
        if (j === 0) {
          Ai[0] = 0;
        }
        A2[i] = Ai;
      }
      return A2;
    };
    numeric.getDiag = function(A2) {
      var n = Math.min(A2.length, A2[0].length), i, ret = Array(n);
      for (i = n - 1; i >= 1; --i) {
        ret[i] = A2[i][i];
        --i;
        ret[i] = A2[i][i];
      }
      if (i === 0) {
        ret[0] = A2[0][0];
      }
      return ret;
    };
    numeric.identity = function identity3(n) {
      return numeric.diag(numeric.rep([n], 1));
    };
    numeric.pointwise = function pointwise(params, body, setup) {
      if (typeof setup === "undefined") {
        setup = "";
      }
      var fun = [];
      var k2;
      var avec = /\[i\]$/, p, thevec = "";
      var haveret = false;
      for (k2 = 0; k2 < params.length; k2++) {
        if (avec.test(params[k2])) {
          p = params[k2].substring(0, params[k2].length - 3);
          thevec = p;
        } else {
          p = params[k2];
        }
        if (p === "ret")
          haveret = true;
        fun.push(p);
      }
      fun[params.length] = "_s";
      fun[params.length + 1] = "_k";
      fun[params.length + 2] = 'if(typeof _s === "undefined") _s = numeric.dim(' + thevec + ');\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i' + (haveret ? "" : ", ret = Array(_n)") + ";\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee(" + params.join(",") + ",_s,_k+1);\n    return ret;\n}\n" + setup + "\nfor(i=_n-1;i!==-1;--i) {\n    " + body + "\n}\nreturn ret;";
      return Function.apply(null, fun);
    };
    numeric.pointwise2 = function pointwise2(params, body, setup) {
      if (typeof setup === "undefined") {
        setup = "";
      }
      var fun = [];
      var k2;
      var avec = /\[i\]$/, p, thevec = "";
      var haveret = false;
      for (k2 = 0; k2 < params.length; k2++) {
        if (avec.test(params[k2])) {
          p = params[k2].substring(0, params[k2].length - 3);
          thevec = p;
        } else {
          p = params[k2];
        }
        if (p === "ret")
          haveret = true;
        fun.push(p);
      }
      fun[params.length] = "var _n = " + thevec + ".length;\nvar i" + (haveret ? "" : ", ret = Array(_n)") + ";\n" + setup + "\nfor(i=_n-1;i!==-1;--i) {\n" + body + "\n}\nreturn ret;";
      return Function.apply(null, fun);
    };
    numeric._biforeach = function _biforeach(x, y, s, k2, f) {
      if (k2 === s.length - 1) {
        f(x, y);
        return;
      }
      var i, n = s[k2];
      for (i = n - 1; i >= 0; i--) {
        _biforeach(typeof x === "object" ? x[i] : x, typeof y === "object" ? y[i] : y, s, k2 + 1, f);
      }
    };
    numeric._biforeach2 = function _biforeach2(x, y, s, k2, f) {
      if (k2 === s.length - 1) {
        return f(x, y);
      }
      var i, n = s[k2], ret = Array(n);
      for (i = n - 1; i >= 0; --i) {
        ret[i] = _biforeach2(typeof x === "object" ? x[i] : x, typeof y === "object" ? y[i] : y, s, k2 + 1, f);
      }
      return ret;
    };
    numeric._foreach = function _foreach(x, s, k2, f) {
      if (k2 === s.length - 1) {
        f(x);
        return;
      }
      var i, n = s[k2];
      for (i = n - 1; i >= 0; i--) {
        _foreach(x[i], s, k2 + 1, f);
      }
    };
    numeric._foreach2 = function _foreach2(x, s, k2, f) {
      if (k2 === s.length - 1) {
        return f(x);
      }
      var i, n = s[k2], ret = Array(n);
      for (i = n - 1; i >= 0; i--) {
        ret[i] = _foreach2(x[i], s, k2 + 1, f);
      }
      return ret;
    };
    numeric.ops2 = {
      add: "+",
      sub: "-",
      mul: "*",
      div: "/",
      mod: "%",
      and: "&&",
      or: "||",
      eq: "===",
      neq: "!==",
      lt: "<",
      gt: ">",
      leq: "<=",
      geq: ">=",
      band: "&",
      bor: "|",
      bxor: "^",
      lshift: "<<",
      rshift: ">>",
      rrshift: ">>>"
    };
    numeric.opseq = {
      addeq: "+=",
      subeq: "-=",
      muleq: "*=",
      diveq: "/=",
      modeq: "%=",
      lshifteq: "<<=",
      rshifteq: ">>=",
      rrshifteq: ">>>=",
      bandeq: "&=",
      boreq: "|=",
      bxoreq: "^="
    };
    numeric.mathfuns = [
      "abs",
      "acos",
      "asin",
      "atan",
      "ceil",
      "cos",
      "exp",
      "floor",
      "log",
      "round",
      "sin",
      "sqrt",
      "tan",
      "isNaN",
      "isFinite"
    ];
    numeric.mathfuns2 = ["atan2", "pow", "max", "min"];
    numeric.ops1 = {
      neg: "-",
      not: "!",
      bnot: "~",
      clone: ""
    };
    numeric.mapreducers = {
      any: ["if(xi) return true;", "var accum = false;"],
      all: ["if(!xi) return false;", "var accum = true;"],
      sum: ["accum += xi;", "var accum = 0;"],
      prod: ["accum *= xi;", "var accum = 1;"],
      norm2Squared: ["accum += xi*xi;", "var accum = 0;"],
      norminf: ["accum = max(accum,abs(xi));", "var accum = 0, max = Math.max, abs = Math.abs;"],
      norm1: ["accum += abs(xi)", "var accum = 0, abs = Math.abs;"],
      sup: ["accum = max(accum,xi);", "var accum = -Infinity, max = Math.max;"],
      inf: ["accum = min(accum,xi);", "var accum = Infinity, min = Math.min;"]
    };
    (function() {
      var i, o;
      for (i = 0; i < numeric.mathfuns2.length; ++i) {
        o = numeric.mathfuns2[i];
        numeric.ops2[o] = o;
      }
      for (i in numeric.ops2) {
        if (numeric.ops2.hasOwnProperty(i)) {
          o = numeric.ops2[i];
          var code, codeeq, setup = "";
          if (numeric.myIndexOf.call(numeric.mathfuns2, i) !== -1) {
            setup = "var " + o + " = Math." + o + ";\n";
            code = function(r, x, y) {
              return r + " = " + o + "(" + x + "," + y + ")";
            };
            codeeq = function(x, y) {
              return x + " = " + o + "(" + x + "," + y + ")";
            };
          } else {
            code = function(r, x, y) {
              return r + " = " + x + " " + o + " " + y;
            };
            if (numeric.opseq.hasOwnProperty(i + "eq")) {
              codeeq = function(x, y) {
                return x + " " + o + "= " + y;
              };
            } else {
              codeeq = function(x, y) {
                return x + " = " + x + " " + o + " " + y;
              };
            }
          }
          numeric[i + "VV"] = numeric.pointwise2(["x[i]", "y[i]"], code("ret[i]", "x[i]", "y[i]"), setup);
          numeric[i + "SV"] = numeric.pointwise2(["x", "y[i]"], code("ret[i]", "x", "y[i]"), setup);
          numeric[i + "VS"] = numeric.pointwise2(["x[i]", "y"], code("ret[i]", "x[i]", "y"), setup);
          numeric[i] = Function("var n = arguments.length, i, x = arguments[0], y;\nvar VV = numeric." + i + "VV, VS = numeric." + i + "VS, SV = numeric." + i + 'SV;\nvar dim = numeric.dim;\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof x === "object") {\n      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n  else ' + codeeq("x", "y") + "\n}\nreturn x;\n");
          numeric[o] = numeric[i];
          numeric[i + "eqV"] = numeric.pointwise2(["ret[i]", "x[i]"], codeeq("ret[i]", "x[i]"), setup);
          numeric[i + "eqS"] = numeric.pointwise2(["ret[i]", "x"], codeeq("ret[i]", "x"), setup);
          numeric[i + "eq"] = Function("var n = arguments.length, i, x = arguments[0], y;\nvar V = numeric." + i + "eqV, S = numeric." + i + 'eqS\nvar s = numeric.dim(x);\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n  else numeric._biforeach(x,y,s,0,S);\n}\nreturn x;\n');
        }
      }
      for (i = 0; i < numeric.mathfuns2.length; ++i) {
        o = numeric.mathfuns2[i];
        delete numeric.ops2[o];
      }
      for (i = 0; i < numeric.mathfuns.length; ++i) {
        o = numeric.mathfuns[i];
        numeric.ops1[o] = o;
      }
      for (i in numeric.ops1) {
        if (numeric.ops1.hasOwnProperty(i)) {
          setup = "";
          o = numeric.ops1[i];
          if (numeric.myIndexOf.call(numeric.mathfuns, i) !== -1) {
            if (Math.hasOwnProperty(o))
              setup = "var " + o + " = Math." + o + ";\n";
          }
          numeric[i + "eqV"] = numeric.pointwise2(["ret[i]"], "ret[i] = " + o + "(ret[i]);", setup);
          numeric[i + "eq"] = Function("x", 'if(typeof x !== "object") return ' + o + "x\nvar i;\nvar V = numeric." + i + "eqV;\nvar s = numeric.dim(x);\nnumeric._foreach(x,s,0,V);\nreturn x;\n");
          numeric[i + "V"] = numeric.pointwise2(["x[i]"], "ret[i] = " + o + "(x[i]);", setup);
          numeric[i] = Function("x", 'if(typeof x !== "object") return ' + o + "(x)\nvar i;\nvar V = numeric." + i + "V;\nvar s = numeric.dim(x);\nreturn numeric._foreach2(x,s,0,V);\n");
        }
      }
      for (i = 0; i < numeric.mathfuns.length; ++i) {
        o = numeric.mathfuns[i];
        delete numeric.ops1[o];
      }
      for (i in numeric.mapreducers) {
        if (numeric.mapreducers.hasOwnProperty(i)) {
          o = numeric.mapreducers[i];
          numeric[i + "V"] = numeric.mapreduce2(o[0], o[1]);
          numeric[i] = Function("x", "s", "k", o[1] + 'if(typeof x !== "object") {    xi = x;\n' + o[0] + ';\n    return accum;\n}if(typeof s === "undefined") s = numeric.dim(x);\nif(typeof k === "undefined") k = 0;\nif(k === s.length-1) return numeric.' + i + "V(x);\nvar xi;\nvar n = x.length, i;\nfor(i=n-1;i!==-1;--i) {\n   xi = arguments.callee(x[i]);\n" + o[0] + ";\n}\nreturn accum;\n");
        }
      }
    })();
    numeric.truncVV = numeric.pointwise(["x[i]", "y[i]"], "ret[i] = round(x[i]/y[i])*y[i];", "var round = Math.round;");
    numeric.truncVS = numeric.pointwise(["x[i]", "y"], "ret[i] = round(x[i]/y)*y;", "var round = Math.round;");
    numeric.truncSV = numeric.pointwise(["x", "y[i]"], "ret[i] = round(x/y[i])*y[i];", "var round = Math.round;");
    numeric.trunc = function trunc(x, y) {
      if (typeof x === "object") {
        if (typeof y === "object")
          return numeric.truncVV(x, y);
        return numeric.truncVS(x, y);
      }
      if (typeof y === "object")
        return numeric.truncSV(x, y);
      return Math.round(x / y) * y;
    };
    numeric.inv = function inv(x) {
      var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
      var A2 = numeric.clone(x), Ai, Aj;
      var I = numeric.identity(m), Ii, Ij;
      var i, j, k2, x;
      for (j = 0; j < n; ++j) {
        var i0 = -1;
        var v0 = -1;
        for (i = j; i !== m; ++i) {
          k2 = abs(A2[i][j]);
          if (k2 > v0) {
            i0 = i;
            v0 = k2;
          }
        }
        Aj = A2[i0];
        A2[i0] = A2[j];
        A2[j] = Aj;
        Ij = I[i0];
        I[i0] = I[j];
        I[j] = Ij;
        x = Aj[j];
        for (k2 = j; k2 !== n; ++k2)
          Aj[k2] /= x;
        for (k2 = n - 1; k2 !== -1; --k2)
          Ij[k2] /= x;
        for (i = m - 1; i !== -1; --i) {
          if (i !== j) {
            Ai = A2[i];
            Ii = I[i];
            x = Ai[j];
            for (k2 = j + 1; k2 !== n; ++k2)
              Ai[k2] -= Aj[k2] * x;
            for (k2 = n - 1; k2 > 0; --k2) {
              Ii[k2] -= Ij[k2] * x;
              --k2;
              Ii[k2] -= Ij[k2] * x;
            }
            if (k2 === 0)
              Ii[0] -= Ij[0] * x;
          }
        }
      }
      return I;
    };
    numeric.det = function det(x) {
      var s = numeric.dim(x);
      if (s.length !== 2 || s[0] !== s[1]) {
        throw new Error("numeric: det() only works on square matrices");
      }
      var n = s[0], ret = 1, i, j, k2, A2 = numeric.clone(x), Aj, Ai, alpha, temp, k1, k22, k3;
      for (j = 0; j < n - 1; j++) {
        k2 = j;
        for (i = j + 1; i < n; i++) {
          if (Math.abs(A2[i][j]) > Math.abs(A2[k2][j])) {
            k2 = i;
          }
        }
        if (k2 !== j) {
          temp = A2[k2];
          A2[k2] = A2[j];
          A2[j] = temp;
          ret *= -1;
        }
        Aj = A2[j];
        for (i = j + 1; i < n; i++) {
          Ai = A2[i];
          alpha = Ai[j] / Aj[j];
          for (k2 = j + 1; k2 < n - 1; k2 += 2) {
            k1 = k2 + 1;
            Ai[k2] -= Aj[k2] * alpha;
            Ai[k1] -= Aj[k1] * alpha;
          }
          if (k2 !== n) {
            Ai[k2] -= Aj[k2] * alpha;
          }
        }
        if (Aj[j] === 0) {
          return 0;
        }
        ret *= Aj[j];
      }
      return ret * A2[j][j];
    };
    numeric.transpose = function transpose(x) {
      var i, j, m = x.length, n = x[0].length, ret = Array(n), A0, A1, Bj;
      for (j = 0; j < n; j++)
        ret[j] = Array(m);
      for (i = m - 1; i >= 1; i -= 2) {
        A1 = x[i];
        A0 = x[i - 1];
        for (j = n - 1; j >= 1; --j) {
          Bj = ret[j];
          Bj[i] = A1[j];
          Bj[i - 1] = A0[j];
          --j;
          Bj = ret[j];
          Bj[i] = A1[j];
          Bj[i - 1] = A0[j];
        }
        if (j === 0) {
          Bj = ret[0];
          Bj[i] = A1[0];
          Bj[i - 1] = A0[0];
        }
      }
      if (i === 0) {
        A0 = x[0];
        for (j = n - 1; j >= 1; --j) {
          ret[j][0] = A0[j];
          --j;
          ret[j][0] = A0[j];
        }
        if (j === 0) {
          ret[0][0] = A0[0];
        }
      }
      return ret;
    };
    numeric.negtranspose = function negtranspose(x) {
      var i, j, m = x.length, n = x[0].length, ret = Array(n), A0, A1, Bj;
      for (j = 0; j < n; j++)
        ret[j] = Array(m);
      for (i = m - 1; i >= 1; i -= 2) {
        A1 = x[i];
        A0 = x[i - 1];
        for (j = n - 1; j >= 1; --j) {
          Bj = ret[j];
          Bj[i] = -A1[j];
          Bj[i - 1] = -A0[j];
          --j;
          Bj = ret[j];
          Bj[i] = -A1[j];
          Bj[i - 1] = -A0[j];
        }
        if (j === 0) {
          Bj = ret[0];
          Bj[i] = -A1[0];
          Bj[i - 1] = -A0[0];
        }
      }
      if (i === 0) {
        A0 = x[0];
        for (j = n - 1; j >= 1; --j) {
          ret[j][0] = -A0[j];
          --j;
          ret[j][0] = -A0[j];
        }
        if (j === 0) {
          ret[0][0] = -A0[0];
        }
      }
      return ret;
    };
    numeric._random = function _random(s, k2) {
      var i, n = s[k2], ret = Array(n), rnd;
      if (k2 === s.length - 1) {
        rnd = Math.random;
        for (i = n - 1; i >= 1; i -= 2) {
          ret[i] = rnd();
          ret[i - 1] = rnd();
        }
        if (i === 0) {
          ret[0] = rnd();
        }
        return ret;
      }
      for (i = n - 1; i >= 0; i--)
        ret[i] = _random(s, k2 + 1);
      return ret;
    };
    numeric.random = function random(s) {
      return numeric._random(s, 0);
    };
    numeric.norm2 = function norm2(x) {
      return Math.sqrt(numeric.norm2Squared(x));
    };
    numeric.linspace = function linspace(a, b, n) {
      if (typeof n === "undefined")
        n = Math.max(Math.round(b - a) + 1, 1);
      if (n < 2) {
        return n === 1 ? [a] : [];
      }
      var i, ret = Array(n);
      n--;
      for (i = n; i >= 0; i--) {
        ret[i] = (i * b + (n - i) * a) / n;
      }
      return ret;
    };
    numeric.getBlock = function getBlock(x, from, to) {
      var s = numeric.dim(x);
      function foo(x2, k2) {
        var i, a = from[k2], n = to[k2] - a, ret = Array(n);
        if (k2 === s.length - 1) {
          for (i = n; i >= 0; i--) {
            ret[i] = x2[i + a];
          }
          return ret;
        }
        for (i = n; i >= 0; i--) {
          ret[i] = foo(x2[i + a], k2 + 1);
        }
        return ret;
      }
      return foo(x, 0);
    };
    numeric.setBlock = function setBlock(x, from, to, B2) {
      var s = numeric.dim(x);
      function foo(x2, y, k2) {
        var i, a = from[k2], n = to[k2] - a;
        if (k2 === s.length - 1) {
          for (i = n; i >= 0; i--) {
            x2[i + a] = y[i];
          }
        }
        for (i = n; i >= 0; i--) {
          foo(x2[i + a], y[i], k2 + 1);
        }
      }
      foo(x, B2, 0);
      return x;
    };
    numeric.getRange = function getRange(A2, I, J) {
      var m = I.length, n = J.length;
      var i, j;
      var B2 = Array(m), Bi, AI;
      for (i = m - 1; i !== -1; --i) {
        B2[i] = Array(n);
        Bi = B2[i];
        AI = A2[I[i]];
        for (j = n - 1; j !== -1; --j)
          Bi[j] = AI[J[j]];
      }
      return B2;
    };
    numeric.blockMatrix = function blockMatrix(X) {
      var s = numeric.dim(X);
      if (s.length < 4)
        return numeric.blockMatrix([X]);
      var m = s[0], n = s[1], M, N, i, j, Xij;
      M = 0;
      N = 0;
      for (i = 0; i < m; ++i)
        M += X[i][0].length;
      for (j = 0; j < n; ++j)
        N += X[0][j][0].length;
      var Z = Array(M);
      for (i = 0; i < M; ++i)
        Z[i] = Array(N);
      var I = 0, J, ZI, k2, l, Xijk;
      for (i = 0; i < m; ++i) {
        J = N;
        for (j = n - 1; j !== -1; --j) {
          Xij = X[i][j];
          J -= Xij[0].length;
          for (k2 = Xij.length - 1; k2 !== -1; --k2) {
            Xijk = Xij[k2];
            ZI = Z[I + k2];
            for (l = Xijk.length - 1; l !== -1; --l)
              ZI[J + l] = Xijk[l];
          }
        }
        I += X[i][0].length;
      }
      return Z;
    };
    numeric.tensor = function tensor(x, y) {
      if (typeof x === "number" || typeof y === "number")
        return numeric.mul(x, y);
      var s1 = numeric.dim(x), s2 = numeric.dim(y);
      if (s1.length !== 1 || s2.length !== 1) {
        throw new Error("numeric: tensor product is only defined for vectors");
      }
      var m = s1[0], n = s2[0], A2 = Array(m), Ai, i, j, xi;
      for (i = m - 1; i >= 0; i--) {
        Ai = Array(n);
        xi = x[i];
        for (j = n - 1; j >= 3; --j) {
          Ai[j] = xi * y[j];
          --j;
          Ai[j] = xi * y[j];
          --j;
          Ai[j] = xi * y[j];
          --j;
          Ai[j] = xi * y[j];
        }
        while (j >= 0) {
          Ai[j] = xi * y[j];
          --j;
        }
        A2[i] = Ai;
      }
      return A2;
    };
    numeric.T = function T2(x, y) {
      this.x = x;
      this.y = y;
    };
    numeric.t = function t(x, y) {
      return new numeric.T(x, y);
    };
    numeric.Tbinop = function Tbinop(rr, rc, cr, cc, setup) {
      var io = numeric.indexOf;
      if (typeof setup !== "string") {
        var k2;
        setup = "";
        for (k2 in numeric) {
          if (numeric.hasOwnProperty(k2) && (rr.indexOf(k2) >= 0 || rc.indexOf(k2) >= 0 || cr.indexOf(k2) >= 0 || cc.indexOf(k2) >= 0) && k2.length > 1) {
            setup += "var " + k2 + " = numeric." + k2 + ";\n";
          }
        }
      }
      return Function(["y"], "var x = this;\nif(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n" + setup + "\nif(x.y) {  if(y.y) {    return new numeric.T(" + cc + ");\n  }\n  return new numeric.T(" + cr + ");\n}\nif(y.y) {\n  return new numeric.T(" + rc + ");\n}\nreturn new numeric.T(" + rr + ");\n");
    };
    numeric.T.prototype.add = numeric.Tbinop("add(x.x,y.x)", "add(x.x,y.x),y.y", "add(x.x,y.x),x.y", "add(x.x,y.x),add(x.y,y.y)");
    numeric.T.prototype.sub = numeric.Tbinop("sub(x.x,y.x)", "sub(x.x,y.x),neg(y.y)", "sub(x.x,y.x),x.y", "sub(x.x,y.x),sub(x.y,y.y)");
    numeric.T.prototype.mul = numeric.Tbinop("mul(x.x,y.x)", "mul(x.x,y.x),mul(x.x,y.y)", "mul(x.x,y.x),mul(x.y,y.x)", "sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))");
    numeric.T.prototype.reciprocal = function reciprocal() {
      var mul = numeric.mul, div = numeric.div;
      if (this.y) {
        var d = numeric.add(mul(this.x, this.x), mul(this.y, this.y));
        return new numeric.T(div(this.x, d), div(numeric.neg(this.y), d));
      }
      return new T(div(1, this.x));
    };
    numeric.T.prototype.div = function div(y) {
      if (!(y instanceof numeric.T))
        y = new numeric.T(y);
      if (y.y) {
        return this.mul(y.reciprocal());
      }
      var div2 = numeric.div;
      if (this.y) {
        return new numeric.T(div2(this.x, y.x), div2(this.y, y.x));
      }
      return new numeric.T(div2(this.x, y.x));
    };
    numeric.T.prototype.dot = numeric.Tbinop("dot(x.x,y.x)", "dot(x.x,y.x),dot(x.x,y.y)", "dot(x.x,y.x),dot(x.y,y.x)", "sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))");
    numeric.T.prototype.transpose = function transpose() {
      var t = numeric.transpose, x = this.x, y = this.y;
      if (y) {
        return new numeric.T(t(x), t(y));
      }
      return new numeric.T(t(x));
    };
    numeric.T.prototype.transjugate = function transjugate() {
      var t = numeric.transpose, x = this.x, y = this.y;
      if (y) {
        return new numeric.T(t(x), numeric.negtranspose(y));
      }
      return new numeric.T(t(x));
    };
    numeric.Tunop = function Tunop(r, c, s) {
      if (typeof s !== "string") {
        s = "";
      }
      return Function("var x = this;\n" + s + "\nif(x.y) {  " + c + ";\n}\n" + r + ";\n");
    };
    numeric.T.prototype.exp = numeric.Tunop("return new numeric.T(ex)", "return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))", "var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;");
    numeric.T.prototype.conj = numeric.Tunop("return new numeric.T(x.x);", "return new numeric.T(x.x,numeric.neg(x.y));");
    numeric.T.prototype.neg = numeric.Tunop("return new numeric.T(neg(x.x));", "return new numeric.T(neg(x.x),neg(x.y));", "var neg = numeric.neg;");
    numeric.T.prototype.sin = numeric.Tunop("return new numeric.T(numeric.sin(x.x))", "return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));");
    numeric.T.prototype.cos = numeric.Tunop("return new numeric.T(numeric.cos(x.x))", "return x.exp().add(x.neg().exp()).div(2);");
    numeric.T.prototype.abs = numeric.Tunop("return new numeric.T(numeric.abs(x.x));", "return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));", "var mul = numeric.mul;");
    numeric.T.prototype.log = numeric.Tunop("return new numeric.T(numeric.log(x.x));", "var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\nreturn new numeric.T(numeric.log(r.x),theta.x);");
    numeric.T.prototype.norm2 = numeric.Tunop("return numeric.norm2(x.x);", "var f = numeric.norm2Squared;\nreturn Math.sqrt(f(x.x)+f(x.y));");
    numeric.T.prototype.inv = function inv() {
      var A2 = this;
      if (typeof A2.y === "undefined") {
        return new numeric.T(numeric.inv(A2.x));
      }
      var n = A2.x.length, i, j, k2;
      var Rx = numeric.identity(n), Ry = numeric.rep([n, n], 0);
      var Ax = numeric.clone(A2.x), Ay = numeric.clone(A2.y);
      var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
      var i, j, k2, d, d1, ax, ay, bx, by, temp;
      for (i = 0; i < n; i++) {
        ax = Ax[i][i];
        ay = Ay[i][i];
        d = ax * ax + ay * ay;
        k2 = i;
        for (j = i + 1; j < n; j++) {
          ax = Ax[j][i];
          ay = Ay[j][i];
          d1 = ax * ax + ay * ay;
          if (d1 > d) {
            k2 = j;
            d = d1;
          }
        }
        if (k2 !== i) {
          temp = Ax[i];
          Ax[i] = Ax[k2];
          Ax[k2] = temp;
          temp = Ay[i];
          Ay[i] = Ay[k2];
          Ay[k2] = temp;
          temp = Rx[i];
          Rx[i] = Rx[k2];
          Rx[k2] = temp;
          temp = Ry[i];
          Ry[i] = Ry[k2];
          Ry[k2] = temp;
        }
        Aix = Ax[i];
        Aiy = Ay[i];
        Rix = Rx[i];
        Riy = Ry[i];
        ax = Aix[i];
        ay = Aiy[i];
        for (j = i + 1; j < n; j++) {
          bx = Aix[j];
          by = Aiy[j];
          Aix[j] = (bx * ax + by * ay) / d;
          Aiy[j] = (by * ax - bx * ay) / d;
        }
        for (j = 0; j < n; j++) {
          bx = Rix[j];
          by = Riy[j];
          Rix[j] = (bx * ax + by * ay) / d;
          Riy[j] = (by * ax - bx * ay) / d;
        }
        for (j = i + 1; j < n; j++) {
          Ajx = Ax[j];
          Ajy = Ay[j];
          Rjx = Rx[j];
          Rjy = Ry[j];
          ax = Ajx[i];
          ay = Ajy[i];
          for (k2 = i + 1; k2 < n; k2++) {
            bx = Aix[k2];
            by = Aiy[k2];
            Ajx[k2] -= bx * ax - by * ay;
            Ajy[k2] -= by * ax + bx * ay;
          }
          for (k2 = 0; k2 < n; k2++) {
            bx = Rix[k2];
            by = Riy[k2];
            Rjx[k2] -= bx * ax - by * ay;
            Rjy[k2] -= by * ax + bx * ay;
          }
        }
      }
      for (i = n - 1; i > 0; i--) {
        Rix = Rx[i];
        Riy = Ry[i];
        for (j = i - 1; j >= 0; j--) {
          Rjx = Rx[j];
          Rjy = Ry[j];
          ax = Ax[j][i];
          ay = Ay[j][i];
          for (k2 = n - 1; k2 >= 0; k2--) {
            bx = Rix[k2];
            by = Riy[k2];
            Rjx[k2] -= ax * bx - ay * by;
            Rjy[k2] -= ax * by + ay * bx;
          }
        }
      }
      return new numeric.T(Rx, Ry);
    };
    numeric.T.prototype.get = function get(i) {
      var x = this.x, y = this.y, k2 = 0, ik, n = i.length;
      if (y) {
        while (k2 < n) {
          ik = i[k2];
          x = x[ik];
          y = y[ik];
          k2++;
        }
        return new numeric.T(x, y);
      }
      while (k2 < n) {
        ik = i[k2];
        x = x[ik];
        k2++;
      }
      return new numeric.T(x);
    };
    numeric.T.prototype.set = function set(i, v) {
      var x = this.x, y = this.y, k2 = 0, ik, n = i.length, vx = v.x, vy = v.y;
      if (n === 0) {
        if (vy) {
          this.y = vy;
        } else if (y) {
          this.y = void 0;
        }
        this.x = x;
        return this;
      }
      if (vy) {
        if (y) {
        } else {
          y = numeric.rep(numeric.dim(x), 0);
          this.y = y;
        }
        while (k2 < n - 1) {
          ik = i[k2];
          x = x[ik];
          y = y[ik];
          k2++;
        }
        ik = i[k2];
        x[ik] = vx;
        y[ik] = vy;
        return this;
      }
      if (y) {
        while (k2 < n - 1) {
          ik = i[k2];
          x = x[ik];
          y = y[ik];
          k2++;
        }
        ik = i[k2];
        x[ik] = vx;
        if (vx instanceof Array)
          y[ik] = numeric.rep(numeric.dim(vx), 0);
        else
          y[ik] = 0;
        return this;
      }
      while (k2 < n - 1) {
        ik = i[k2];
        x = x[ik];
        k2++;
      }
      ik = i[k2];
      x[ik] = vx;
      return this;
    };
    numeric.T.prototype.getRows = function getRows(i0, i1) {
      var n = i1 - i0 + 1, j;
      var rx = Array(n), ry, x = this.x, y = this.y;
      for (j = i0; j <= i1; j++) {
        rx[j - i0] = x[j];
      }
      if (y) {
        ry = Array(n);
        for (j = i0; j <= i1; j++) {
          ry[j - i0] = y[j];
        }
        return new numeric.T(rx, ry);
      }
      return new numeric.T(rx);
    };
    numeric.T.prototype.setRows = function setRows(i0, i1, A2) {
      var j;
      var rx = this.x, ry = this.y, x = A2.x, y = A2.y;
      for (j = i0; j <= i1; j++) {
        rx[j] = x[j - i0];
      }
      if (y) {
        if (!ry) {
          ry = numeric.rep(numeric.dim(rx), 0);
          this.y = ry;
        }
        for (j = i0; j <= i1; j++) {
          ry[j] = y[j - i0];
        }
      } else if (ry) {
        for (j = i0; j <= i1; j++) {
          ry[j] = numeric.rep([x[j - i0].length], 0);
        }
      }
      return this;
    };
    numeric.T.prototype.getRow = function getRow(k2) {
      var x = this.x, y = this.y;
      if (y) {
        return new numeric.T(x[k2], y[k2]);
      }
      return new numeric.T(x[k2]);
    };
    numeric.T.prototype.setRow = function setRow(i, v) {
      var rx = this.x, ry = this.y, x = v.x, y = v.y;
      rx[i] = x;
      if (y) {
        if (!ry) {
          ry = numeric.rep(numeric.dim(rx), 0);
          this.y = ry;
        }
        ry[i] = y;
      } else if (ry) {
        ry = numeric.rep([x.length], 0);
      }
      return this;
    };
    numeric.T.prototype.getBlock = function getBlock(from, to) {
      var x = this.x, y = this.y, b = numeric.getBlock;
      if (y) {
        return new numeric.T(b(x, from, to), b(y, from, to));
      }
      return new numeric.T(b(x, from, to));
    };
    numeric.T.prototype.setBlock = function setBlock(from, to, A2) {
      if (!(A2 instanceof numeric.T))
        A2 = new numeric.T(A2);
      var x = this.x, y = this.y, b = numeric.setBlock, Ax = A2.x, Ay = A2.y;
      if (Ay) {
        if (!y) {
          this.y = numeric.rep(numeric.dim(this), 0);
          y = this.y;
        }
        b(x, from, to, Ax);
        b(y, from, to, Ay);
        return this;
      }
      b(x, from, to, Ax);
      if (y)
        b(y, from, to, numeric.rep(numeric.dim(Ax), 0));
    };
    numeric.T.rep = function rep(s, v) {
      var T2 = numeric.T;
      if (!(v instanceof T2))
        v = new T2(v);
      var x = v.x, y = v.y, r = numeric.rep;
      if (y)
        return new T2(r(s, x), r(s, y));
      return new T2(r(s, x));
    };
    numeric.T.diag = function diag(d) {
      if (!(d instanceof numeric.T))
        d = new numeric.T(d);
      var x = d.x, y = d.y, diag2 = numeric.diag;
      if (y)
        return new numeric.T(diag2(x), diag2(y));
      return new numeric.T(diag2(x));
    };
    numeric.T.eig = function eig() {
      if (this.y) {
        throw new Error("eig: not implemented for complex matrices.");
      }
      return numeric.eig(this.x);
    };
    numeric.T.identity = function identity3(n) {
      return new numeric.T(numeric.identity(n));
    };
    numeric.T.prototype.getDiag = function getDiag() {
      var n = numeric;
      var x = this.x, y = this.y;
      if (y) {
        return new n.T(n.getDiag(x), n.getDiag(y));
      }
      return new n.T(n.getDiag(x));
    };
    numeric.house = function house(x) {
      var v = numeric.clone(x);
      var s = x[0] >= 0 ? 1 : -1;
      var alpha = s * numeric.norm2(x);
      v[0] += alpha;
      var foo = numeric.norm2(v);
      if (foo === 0) {
        throw new Error("eig: internal error");
      }
      return numeric.div(v, foo);
    };
    numeric.toUpperHessenberg = function toUpperHessenberg(me) {
      var s = numeric.dim(me);
      if (s.length !== 2 || s[0] !== s[1]) {
        throw new Error("numeric: toUpperHessenberg() only works on square matrices");
      }
      var m = s[0], i, j, k2, x, v, A2 = numeric.clone(me), B2, C2, Ai, Ci, Q = numeric.identity(m), Qi;
      for (j = 0; j < m - 2; j++) {
        x = Array(m - j - 1);
        for (i = j + 1; i < m; i++) {
          x[i - j - 1] = A2[i][j];
        }
        if (numeric.norm2(x) > 0) {
          v = numeric.house(x);
          B2 = numeric.getBlock(A2, [j + 1, j], [m - 1, m - 1]);
          C2 = numeric.tensor(v, numeric.dot(v, B2));
          for (i = j + 1; i < m; i++) {
            Ai = A2[i];
            Ci = C2[i - j - 1];
            for (k2 = j; k2 < m; k2++)
              Ai[k2] -= 2 * Ci[k2 - j];
          }
          B2 = numeric.getBlock(A2, [0, j + 1], [m - 1, m - 1]);
          C2 = numeric.tensor(numeric.dot(B2, v), v);
          for (i = 0; i < m; i++) {
            Ai = A2[i];
            Ci = C2[i];
            for (k2 = j + 1; k2 < m; k2++)
              Ai[k2] -= 2 * Ci[k2 - j - 1];
          }
          B2 = Array(m - j - 1);
          for (i = j + 1; i < m; i++)
            B2[i - j - 1] = Q[i];
          C2 = numeric.tensor(v, numeric.dot(v, B2));
          for (i = j + 1; i < m; i++) {
            Qi = Q[i];
            Ci = C2[i - j - 1];
            for (k2 = 0; k2 < m; k2++)
              Qi[k2] -= 2 * Ci[k2];
          }
        }
      }
      return { H: A2, Q };
    };
    numeric.epsilon = 2220446049250313e-31;
    numeric.QRFrancis = function(H, maxiter) {
      if (typeof maxiter === "undefined") {
        maxiter = 1e4;
      }
      H = numeric.clone(H);
      var H0 = numeric.clone(H);
      var s = numeric.dim(H), m = s[0], x, v, a, b, c, d, det, tr, Hloc, Q = numeric.identity(m), Qi, Hi, B2, C2, Ci, i, j, k2, iter;
      if (m < 3) {
        return { Q, B: [[0, m - 1]] };
      }
      var epsilon = numeric.epsilon;
      for (iter = 0; iter < maxiter; iter++) {
        for (j = 0; j < m - 1; j++) {
          if (Math.abs(H[j + 1][j]) < epsilon * (Math.abs(H[j][j]) + Math.abs(H[j + 1][j + 1]))) {
            var QH1 = numeric.QRFrancis(numeric.getBlock(H, [0, 0], [j, j]), maxiter);
            var QH2 = numeric.QRFrancis(numeric.getBlock(H, [j + 1, j + 1], [m - 1, m - 1]), maxiter);
            B2 = Array(j + 1);
            for (i = 0; i <= j; i++) {
              B2[i] = Q[i];
            }
            C2 = numeric.dot(QH1.Q, B2);
            for (i = 0; i <= j; i++) {
              Q[i] = C2[i];
            }
            B2 = Array(m - j - 1);
            for (i = j + 1; i < m; i++) {
              B2[i - j - 1] = Q[i];
            }
            C2 = numeric.dot(QH2.Q, B2);
            for (i = j + 1; i < m; i++) {
              Q[i] = C2[i - j - 1];
            }
            return { Q, B: QH1.B.concat(numeric.add(QH2.B, j + 1)) };
          }
        }
        a = H[m - 2][m - 2];
        b = H[m - 2][m - 1];
        c = H[m - 1][m - 2];
        d = H[m - 1][m - 1];
        tr = a + d;
        det = a * d - b * c;
        Hloc = numeric.getBlock(H, [0, 0], [2, 2]);
        if (tr * tr >= 4 * det) {
          var s1, s2;
          s1 = 0.5 * (tr + Math.sqrt(tr * tr - 4 * det));
          s2 = 0.5 * (tr - Math.sqrt(tr * tr - 4 * det));
          Hloc = numeric.add(numeric.sub(numeric.dot(Hloc, Hloc), numeric.mul(Hloc, s1 + s2)), numeric.diag(numeric.rep([3], s1 * s2)));
        } else {
          Hloc = numeric.add(numeric.sub(numeric.dot(Hloc, Hloc), numeric.mul(Hloc, tr)), numeric.diag(numeric.rep([3], det)));
        }
        x = [Hloc[0][0], Hloc[1][0], Hloc[2][0]];
        v = numeric.house(x);
        B2 = [H[0], H[1], H[2]];
        C2 = numeric.tensor(v, numeric.dot(v, B2));
        for (i = 0; i < 3; i++) {
          Hi = H[i];
          Ci = C2[i];
          for (k2 = 0; k2 < m; k2++)
            Hi[k2] -= 2 * Ci[k2];
        }
        B2 = numeric.getBlock(H, [0, 0], [m - 1, 2]);
        C2 = numeric.tensor(numeric.dot(B2, v), v);
        for (i = 0; i < m; i++) {
          Hi = H[i];
          Ci = C2[i];
          for (k2 = 0; k2 < 3; k2++)
            Hi[k2] -= 2 * Ci[k2];
        }
        B2 = [Q[0], Q[1], Q[2]];
        C2 = numeric.tensor(v, numeric.dot(v, B2));
        for (i = 0; i < 3; i++) {
          Qi = Q[i];
          Ci = C2[i];
          for (k2 = 0; k2 < m; k2++)
            Qi[k2] -= 2 * Ci[k2];
        }
        var J;
        for (j = 0; j < m - 2; j++) {
          for (k2 = j; k2 <= j + 1; k2++) {
            if (Math.abs(H[k2 + 1][k2]) < epsilon * (Math.abs(H[k2][k2]) + Math.abs(H[k2 + 1][k2 + 1]))) {
              var QH1 = numeric.QRFrancis(numeric.getBlock(H, [0, 0], [k2, k2]), maxiter);
              var QH2 = numeric.QRFrancis(numeric.getBlock(H, [k2 + 1, k2 + 1], [m - 1, m - 1]), maxiter);
              B2 = Array(k2 + 1);
              for (i = 0; i <= k2; i++) {
                B2[i] = Q[i];
              }
              C2 = numeric.dot(QH1.Q, B2);
              for (i = 0; i <= k2; i++) {
                Q[i] = C2[i];
              }
              B2 = Array(m - k2 - 1);
              for (i = k2 + 1; i < m; i++) {
                B2[i - k2 - 1] = Q[i];
              }
              C2 = numeric.dot(QH2.Q, B2);
              for (i = k2 + 1; i < m; i++) {
                Q[i] = C2[i - k2 - 1];
              }
              return { Q, B: QH1.B.concat(numeric.add(QH2.B, k2 + 1)) };
            }
          }
          J = Math.min(m - 1, j + 3);
          x = Array(J - j);
          for (i = j + 1; i <= J; i++) {
            x[i - j - 1] = H[i][j];
          }
          v = numeric.house(x);
          B2 = numeric.getBlock(H, [j + 1, j], [J, m - 1]);
          C2 = numeric.tensor(v, numeric.dot(v, B2));
          for (i = j + 1; i <= J; i++) {
            Hi = H[i];
            Ci = C2[i - j - 1];
            for (k2 = j; k2 < m; k2++)
              Hi[k2] -= 2 * Ci[k2 - j];
          }
          B2 = numeric.getBlock(H, [0, j + 1], [m - 1, J]);
          C2 = numeric.tensor(numeric.dot(B2, v), v);
          for (i = 0; i < m; i++) {
            Hi = H[i];
            Ci = C2[i];
            for (k2 = j + 1; k2 <= J; k2++)
              Hi[k2] -= 2 * Ci[k2 - j - 1];
          }
          B2 = Array(J - j);
          for (i = j + 1; i <= J; i++)
            B2[i - j - 1] = Q[i];
          C2 = numeric.tensor(v, numeric.dot(v, B2));
          for (i = j + 1; i <= J; i++) {
            Qi = Q[i];
            Ci = C2[i - j - 1];
            for (k2 = 0; k2 < m; k2++)
              Qi[k2] -= 2 * Ci[k2];
          }
        }
      }
      throw new Error("numeric: eigenvalue iteration does not converge -- increase maxiter?");
    };
    numeric.eig = function eig(A2, maxiter) {
      var QH = numeric.toUpperHessenberg(A2);
      var QB = numeric.QRFrancis(QH.H, maxiter);
      var T2 = numeric.T;
      var n = A2.length, i, k2, flag = false, B2 = QB.B, H = numeric.dot(QB.Q, numeric.dot(QH.H, numeric.transpose(QB.Q)));
      var Q = new T2(numeric.dot(QB.Q, QH.Q)), Q0;
      var m = B2.length, j;
      var a, b, c, d, p1, p2, disc, x, y, p, q, n1, n2;
      var sqrt = Math.sqrt;
      for (k2 = 0; k2 < m; k2++) {
        i = B2[k2][0];
        if (i === B2[k2][1]) {
        } else {
          j = i + 1;
          a = H[i][i];
          b = H[i][j];
          c = H[j][i];
          d = H[j][j];
          if (b === 0 && c === 0)
            continue;
          p1 = -a - d;
          p2 = a * d - b * c;
          disc = p1 * p1 - 4 * p2;
          if (disc >= 0) {
            if (p1 < 0)
              x = -0.5 * (p1 - sqrt(disc));
            else
              x = -0.5 * (p1 + sqrt(disc));
            n1 = (a - x) * (a - x) + b * b;
            n2 = c * c + (d - x) * (d - x);
            if (n1 > n2) {
              n1 = sqrt(n1);
              p = (a - x) / n1;
              q = b / n1;
            } else {
              n2 = sqrt(n2);
              p = c / n2;
              q = (d - x) / n2;
            }
            Q0 = new T2([[q, -p], [p, q]]);
            Q.setRows(i, j, Q0.dot(Q.getRows(i, j)));
          } else {
            x = -0.5 * p1;
            y = 0.5 * sqrt(-disc);
            n1 = (a - x) * (a - x) + b * b;
            n2 = c * c + (d - x) * (d - x);
            if (n1 > n2) {
              n1 = sqrt(n1 + y * y);
              p = (a - x) / n1;
              q = b / n1;
              x = 0;
              y /= n1;
            } else {
              n2 = sqrt(n2 + y * y);
              p = c / n2;
              q = (d - x) / n2;
              x = y / n2;
              y = 0;
            }
            Q0 = new T2([[q, -p], [p, q]], [[x, y], [y, -x]]);
            Q.setRows(i, j, Q0.dot(Q.getRows(i, j)));
          }
        }
      }
      var R = Q.dot(A2).dot(Q.transjugate()), n = A2.length, E = numeric.T.identity(n);
      for (j = 0; j < n; j++) {
        if (j > 0) {
          for (k2 = j - 1; k2 >= 0; k2--) {
            var Rk = R.get([k2, k2]), Rj = R.get([j, j]);
            if (numeric.neq(Rk.x, Rj.x) || numeric.neq(Rk.y, Rj.y)) {
              x = R.getRow(k2).getBlock([k2], [j - 1]);
              y = E.getRow(j).getBlock([k2], [j - 1]);
              E.set([j, k2], R.get([k2, j]).neg().sub(x.dot(y)).div(Rk.sub(Rj)));
            } else {
              E.setRow(j, E.getRow(k2));
              continue;
            }
          }
        }
      }
      for (j = 0; j < n; j++) {
        x = E.getRow(j);
        E.setRow(j, x.div(x.norm2()));
      }
      E = E.transpose();
      E = Q.transjugate().dot(E);
      return { lambda: R.getDiag(), E };
    };
    numeric.ccsSparse = function ccsSparse(A2) {
      var m = A2.length, n, foo, i, j, counts = [];
      for (i = m - 1; i !== -1; --i) {
        foo = A2[i];
        for (j in foo) {
          j = parseInt(j);
          while (j >= counts.length)
            counts[counts.length] = 0;
          if (foo[j] !== 0)
            counts[j]++;
        }
      }
      var n = counts.length;
      var Ai = Array(n + 1);
      Ai[0] = 0;
      for (i = 0; i < n; ++i)
        Ai[i + 1] = Ai[i] + counts[i];
      var Aj = Array(Ai[n]), Av = Array(Ai[n]);
      for (i = m - 1; i !== -1; --i) {
        foo = A2[i];
        for (j in foo) {
          if (foo[j] !== 0) {
            counts[j]--;
            Aj[Ai[j] + counts[j]] = i;
            Av[Ai[j] + counts[j]] = foo[j];
          }
        }
      }
      return [Ai, Aj, Av];
    };
    numeric.ccsFull = function ccsFull(A2) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2], s = numeric.ccsDim(A2), m = s[0], n = s[1], i, j, j0, j1, k2;
      var B2 = numeric.rep([m, n], 0);
      for (i = 0; i < n; i++) {
        j0 = Ai[i];
        j1 = Ai[i + 1];
        for (j = j0; j < j1; ++j) {
          B2[Aj[j]][i] = Av[j];
        }
      }
      return B2;
    };
    numeric.ccsTSolve = function ccsTSolve(A2, b, x, bj, xj) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2], m = Ai.length - 1, max = Math.max, n = 0;
      if (typeof bj === "undefined")
        x = numeric.rep([m], 0);
      if (typeof bj === "undefined")
        bj = numeric.linspace(0, x.length - 1);
      if (typeof xj === "undefined")
        xj = [];
      function dfs(j2) {
        var k3;
        if (x[j2] !== 0)
          return;
        x[j2] = 1;
        for (k3 = Ai[j2]; k3 < Ai[j2 + 1]; ++k3)
          dfs(Aj[k3]);
        xj[n] = j2;
        ++n;
      }
      var i, j, j0, j1, k2, l, l0, l1, a;
      for (i = bj.length - 1; i !== -1; --i) {
        dfs(bj[i]);
      }
      xj.length = n;
      for (i = xj.length - 1; i !== -1; --i) {
        x[xj[i]] = 0;
      }
      for (i = bj.length - 1; i !== -1; --i) {
        j = bj[i];
        x[j] = b[j];
      }
      for (i = xj.length - 1; i !== -1; --i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = max(Ai[j + 1], j0);
        for (k2 = j0; k2 !== j1; ++k2) {
          if (Aj[k2] === j) {
            x[j] /= Av[k2];
            break;
          }
        }
        a = x[j];
        for (k2 = j0; k2 !== j1; ++k2) {
          l = Aj[k2];
          if (l !== j)
            x[l] -= a * Av[k2];
        }
      }
      return x;
    };
    numeric.ccsDFS = function ccsDFS(n) {
      this.k = Array(n);
      this.k1 = Array(n);
      this.j = Array(n);
    };
    numeric.ccsDFS.prototype.dfs = function dfs(J, Ai, Aj, x, xj, Pinv) {
      var m = 0, foo, n = xj.length;
      var k2 = this.k, k1 = this.k1, j = this.j, km, k11;
      if (x[J] !== 0)
        return;
      x[J] = 1;
      j[0] = J;
      k2[0] = km = Ai[J];
      k1[0] = k11 = Ai[J + 1];
      while (1) {
        if (km >= k11) {
          xj[n] = j[m];
          if (m === 0)
            return;
          ++n;
          --m;
          km = k2[m];
          k11 = k1[m];
        } else {
          foo = Pinv[Aj[km]];
          if (x[foo] === 0) {
            x[foo] = 1;
            k2[m] = km;
            ++m;
            j[m] = foo;
            km = Ai[foo];
            k1[m] = k11 = Ai[foo + 1];
          } else
            ++km;
        }
      }
    };
    numeric.ccsLPSolve = function ccsLPSolve(A2, B2, x, xj, I, Pinv, dfs) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2], m = Ai.length - 1, n = 0;
      var Bi = B2[0], Bj = B2[1], Bv = B2[2];
      var i, i0, i1, j, J, j0, j1, k2, l, l0, l1, a;
      i0 = Bi[I];
      i1 = Bi[I + 1];
      xj.length = 0;
      for (i = i0; i < i1; ++i) {
        dfs.dfs(Pinv[Bj[i]], Ai, Aj, x, xj, Pinv);
      }
      for (i = xj.length - 1; i !== -1; --i) {
        x[xj[i]] = 0;
      }
      for (i = i0; i !== i1; ++i) {
        j = Pinv[Bj[i]];
        x[j] = Bv[i];
      }
      for (i = xj.length - 1; i !== -1; --i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = Ai[j + 1];
        for (k2 = j0; k2 < j1; ++k2) {
          if (Pinv[Aj[k2]] === j) {
            x[j] /= Av[k2];
            break;
          }
        }
        a = x[j];
        for (k2 = j0; k2 < j1; ++k2) {
          l = Pinv[Aj[k2]];
          if (l !== j)
            x[l] -= a * Av[k2];
        }
      }
      return x;
    };
    numeric.ccsLUP1 = function ccsLUP1(A2, threshold) {
      var m = A2[0].length - 1;
      var L = [numeric.rep([m + 1], 0), [], []], U = [numeric.rep([m + 1], 0), [], []];
      var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
      var x = numeric.rep([m], 0), xj = numeric.rep([m], 0);
      var i, j, k2, j0, j1, a, e, c, d, K;
      var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
      var P = numeric.linspace(0, m - 1), Pinv = numeric.linspace(0, m - 1);
      var dfs = new numeric.ccsDFS(m);
      if (typeof threshold === "undefined") {
        threshold = 1;
      }
      for (i = 0; i < m; ++i) {
        sol(L, A2, x, xj, i, Pinv, dfs);
        a = -1;
        e = -1;
        for (j = xj.length - 1; j !== -1; --j) {
          k2 = xj[j];
          if (k2 <= i)
            continue;
          c = abs(x[k2]);
          if (c > a) {
            e = k2;
            a = c;
          }
        }
        if (abs(x[i]) < threshold * a) {
          j = P[i];
          a = P[e];
          P[i] = a;
          Pinv[a] = i;
          P[e] = j;
          Pinv[j] = e;
          a = x[i];
          x[i] = x[e];
          x[e] = a;
        }
        a = Li[i];
        e = Ui[i];
        d = x[i];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for (j = xj.length - 1; j !== -1; --j) {
          k2 = xj[j];
          c = x[k2];
          xj[j] = 0;
          x[k2] = 0;
          if (k2 <= i) {
            Uj[e] = k2;
            Uv[e] = c;
            ++e;
          } else {
            Lj[a] = P[k2];
            Lv[a] = c / d;
            ++a;
          }
        }
        Li[i + 1] = a;
        Ui[i + 1] = e;
      }
      for (j = Lj.length - 1; j !== -1; --j) {
        Lj[j] = Pinv[Lj[j]];
      }
      return { L, U, P, Pinv };
    };
    numeric.ccsDFS0 = function ccsDFS0(n) {
      this.k = Array(n);
      this.k1 = Array(n);
      this.j = Array(n);
    };
    numeric.ccsDFS0.prototype.dfs = function dfs(J, Ai, Aj, x, xj, Pinv, P) {
      var m = 0, foo, n = xj.length;
      var k2 = this.k, k1 = this.k1, j = this.j, km, k11;
      if (x[J] !== 0)
        return;
      x[J] = 1;
      j[0] = J;
      k2[0] = km = Ai[Pinv[J]];
      k1[0] = k11 = Ai[Pinv[J] + 1];
      while (1) {
        if (isNaN(km))
          throw new Error("Ow!");
        if (km >= k11) {
          xj[n] = Pinv[j[m]];
          if (m === 0)
            return;
          ++n;
          --m;
          km = k2[m];
          k11 = k1[m];
        } else {
          foo = Aj[km];
          if (x[foo] === 0) {
            x[foo] = 1;
            k2[m] = km;
            ++m;
            j[m] = foo;
            foo = Pinv[foo];
            km = Ai[foo];
            k1[m] = k11 = Ai[foo + 1];
          } else
            ++km;
        }
      }
    };
    numeric.ccsLPSolve0 = function ccsLPSolve0(A2, B2, y, xj, I, Pinv, P, dfs) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2], m = Ai.length - 1, n = 0;
      var Bi = B2[0], Bj = B2[1], Bv = B2[2];
      var i, i0, i1, j, J, j0, j1, k2, l, l0, l1, a;
      i0 = Bi[I];
      i1 = Bi[I + 1];
      xj.length = 0;
      for (i = i0; i < i1; ++i) {
        dfs.dfs(Bj[i], Ai, Aj, y, xj, Pinv, P);
      }
      for (i = xj.length - 1; i !== -1; --i) {
        j = xj[i];
        y[P[j]] = 0;
      }
      for (i = i0; i !== i1; ++i) {
        j = Bj[i];
        y[j] = Bv[i];
      }
      for (i = xj.length - 1; i !== -1; --i) {
        j = xj[i];
        l = P[j];
        j0 = Ai[j];
        j1 = Ai[j + 1];
        for (k2 = j0; k2 < j1; ++k2) {
          if (Aj[k2] === l) {
            y[l] /= Av[k2];
            break;
          }
        }
        a = y[l];
        for (k2 = j0; k2 < j1; ++k2)
          y[Aj[k2]] -= a * Av[k2];
        y[l] = a;
      }
    };
    numeric.ccsLUP0 = function ccsLUP0(A2, threshold) {
      var m = A2[0].length - 1;
      var L = [numeric.rep([m + 1], 0), [], []], U = [numeric.rep([m + 1], 0), [], []];
      var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
      var y = numeric.rep([m], 0), xj = numeric.rep([m], 0);
      var i, j, k2, j0, j1, a, e, c, d, K;
      var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
      var P = numeric.linspace(0, m - 1), Pinv = numeric.linspace(0, m - 1);
      var dfs = new numeric.ccsDFS0(m);
      if (typeof threshold === "undefined") {
        threshold = 1;
      }
      for (i = 0; i < m; ++i) {
        sol(L, A2, y, xj, i, Pinv, P, dfs);
        a = -1;
        e = -1;
        for (j = xj.length - 1; j !== -1; --j) {
          k2 = xj[j];
          if (k2 <= i)
            continue;
          c = abs(y[P[k2]]);
          if (c > a) {
            e = k2;
            a = c;
          }
        }
        if (abs(y[P[i]]) < threshold * a) {
          j = P[i];
          a = P[e];
          P[i] = a;
          Pinv[a] = i;
          P[e] = j;
          Pinv[j] = e;
        }
        a = Li[i];
        e = Ui[i];
        d = y[P[i]];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for (j = xj.length - 1; j !== -1; --j) {
          k2 = xj[j];
          c = y[P[k2]];
          xj[j] = 0;
          y[P[k2]] = 0;
          if (k2 <= i) {
            Uj[e] = k2;
            Uv[e] = c;
            ++e;
          } else {
            Lj[a] = P[k2];
            Lv[a] = c / d;
            ++a;
          }
        }
        Li[i + 1] = a;
        Ui[i + 1] = e;
      }
      for (j = Lj.length - 1; j !== -1; --j) {
        Lj[j] = Pinv[Lj[j]];
      }
      return { L, U, P, Pinv };
    };
    numeric.ccsLUP = numeric.ccsLUP0;
    numeric.ccsDim = function ccsDim(A2) {
      return [numeric.sup(A2[1]) + 1, A2[0].length - 1];
    };
    numeric.ccsGetBlock = function ccsGetBlock(A2, i, j) {
      var s = numeric.ccsDim(A2), m = s[0], n = s[1];
      if (typeof i === "undefined") {
        i = numeric.linspace(0, m - 1);
      } else if (typeof i === "number") {
        i = [i];
      }
      if (typeof j === "undefined") {
        j = numeric.linspace(0, n - 1);
      } else if (typeof j === "number") {
        j = [j];
      }
      var p, p0, p1, P = i.length, q, Q = j.length, r, jq, ip;
      var Bi = numeric.rep([n], 0), Bj = [], Bv = [], B2 = [Bi, Bj, Bv];
      var Ai = A2[0], Aj = A2[1], Av = A2[2];
      var x = numeric.rep([m], 0), count = 0, flags = numeric.rep([m], 0);
      for (q = 0; q < Q; ++q) {
        jq = j[q];
        var q0 = Ai[jq];
        var q1 = Ai[jq + 1];
        for (p = q0; p < q1; ++p) {
          r = Aj[p];
          flags[r] = 1;
          x[r] = Av[p];
        }
        for (p = 0; p < P; ++p) {
          ip = i[p];
          if (flags[ip]) {
            Bj[count] = p;
            Bv[count] = x[i[p]];
            ++count;
          }
        }
        for (p = q0; p < q1; ++p) {
          r = Aj[p];
          flags[r] = 0;
        }
        Bi[q + 1] = count;
      }
      return B2;
    };
    numeric.ccsDot = function ccsDot(A2, B2) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2];
      var Bi = B2[0], Bj = B2[1], Bv = B2[2];
      var sA = numeric.ccsDim(A2), sB = numeric.ccsDim(B2);
      var m = sA[0], n = sA[1], o = sB[1];
      var x = numeric.rep([m], 0), flags = numeric.rep([m], 0), xj = Array(m);
      var Ci = numeric.rep([o], 0), Cj = [], Cv = [], C2 = [Ci, Cj, Cv];
      var i, j, k2, j0, j1, i0, i1, l, p, a, b;
      for (k2 = 0; k2 !== o; ++k2) {
        j0 = Bi[k2];
        j1 = Bi[k2 + 1];
        p = 0;
        for (j = j0; j < j1; ++j) {
          a = Bj[j];
          b = Bv[j];
          i0 = Ai[a];
          i1 = Ai[a + 1];
          for (i = i0; i < i1; ++i) {
            l = Aj[i];
            if (flags[l] === 0) {
              xj[p] = l;
              flags[l] = 1;
              p = p + 1;
            }
            x[l] = x[l] + Av[i] * b;
          }
        }
        j0 = Ci[k2];
        j1 = j0 + p;
        Ci[k2 + 1] = j1;
        for (j = p - 1; j !== -1; --j) {
          b = j0 + j;
          i = xj[j];
          Cj[b] = i;
          Cv[b] = x[i];
          flags[i] = 0;
          x[i] = 0;
        }
        Ci[k2 + 1] = Ci[k2] + p;
      }
      return C2;
    };
    numeric.ccsLUPSolve = function ccsLUPSolve(LUP, B2) {
      var L = LUP.L, U = LUP.U, P = LUP.P;
      var Bi = B2[0];
      var flag = false;
      if (typeof Bi !== "object") {
        B2 = [[0, B2.length], numeric.linspace(0, B2.length - 1), B2];
        Bi = B2[0];
        flag = true;
      }
      var Bj = B2[1], Bv = B2[2];
      var n = L[0].length - 1, m = Bi.length - 1;
      var x = numeric.rep([n], 0), xj = Array(n);
      var b = numeric.rep([n], 0), bj = Array(n);
      var Xi = numeric.rep([m + 1], 0), Xj = [], Xv = [];
      var sol = numeric.ccsTSolve;
      var i, j, j0, j1, k2, J, N = 0;
      for (i = 0; i < m; ++i) {
        k2 = 0;
        j0 = Bi[i];
        j1 = Bi[i + 1];
        for (j = j0; j < j1; ++j) {
          J = LUP.Pinv[Bj[j]];
          bj[k2] = J;
          b[J] = Bv[j];
          ++k2;
        }
        bj.length = k2;
        sol(L, b, x, bj, xj);
        for (j = bj.length - 1; j !== -1; --j)
          b[bj[j]] = 0;
        sol(U, x, b, xj, bj);
        if (flag)
          return b;
        for (j = xj.length - 1; j !== -1; --j)
          x[xj[j]] = 0;
        for (j = bj.length - 1; j !== -1; --j) {
          J = bj[j];
          Xj[N] = J;
          Xv[N] = b[J];
          b[J] = 0;
          ++N;
        }
        Xi[i + 1] = N;
      }
      return [Xi, Xj, Xv];
    };
    numeric.ccsbinop = function ccsbinop(body, setup) {
      if (typeof setup === "undefined")
        setup = "";
      return Function("X", "Y", "var Xi = X[0], Xj = X[1], Xv = X[2];\nvar Yi = Y[0], Yj = Y[1], Yv = Y[2];\nvar n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\nvar Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\nvar x = numeric.rep([m],0),y = numeric.rep([m],0);\nvar xk,yk,zk;\nvar i,j,j0,j1,k,p=0;\n" + setup + "for(i=0;i<n;++i) {\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Xj[j];\n    x[k] = 1;\n    Zj[p] = k;\n    ++p;\n  }\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Yj[j];\n    y[k] = Yv[j];\n    if(x[k] === 0) {\n      Zj[p] = k;\n      ++p;\n    }\n  }\n  Zi[i+1] = p;\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n  j0 = Zi[i]; j1 = Zi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Zj[j];\n    xk = x[k];\n    yk = y[k];\n" + body + "\n    Zv[j] = zk;\n  }\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n}\nreturn [Zi,Zj,Zv];");
    };
    (function() {
      var k, A, B, C;
      for (k in numeric.ops2) {
        if (isFinite(eval("1" + numeric.ops2[k] + "0")))
          A = "[Y[0],Y[1],numeric." + k + "(X,Y[2])]";
        else
          A = "NaN";
        if (isFinite(eval("0" + numeric.ops2[k] + "1")))
          B = "[X[0],X[1],numeric." + k + "(X[2],Y)]";
        else
          B = "NaN";
        if (isFinite(eval("1" + numeric.ops2[k] + "0")) && isFinite(eval("0" + numeric.ops2[k] + "1")))
          C = "numeric.ccs" + k + "MM(X,Y)";
        else
          C = "NaN";
        numeric["ccs" + k + "MM"] = numeric.ccsbinop("zk = xk " + numeric.ops2[k] + "yk;");
        numeric["ccs" + k] = Function("X", "Y", 'if(typeof X === "number") return ' + A + ';\nif(typeof Y === "number") return ' + B + ";\nreturn " + C + ";\n");
      }
    })();
    numeric.ccsScatter = function ccsScatter(A2) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2];
      var n = numeric.sup(Aj) + 1, m = Ai.length;
      var Ri = numeric.rep([n], 0), Rj = Array(m), Rv = Array(m);
      var counts = numeric.rep([n], 0), i;
      for (i = 0; i < m; ++i)
        counts[Aj[i]]++;
      for (i = 0; i < n; ++i)
        Ri[i + 1] = Ri[i] + counts[i];
      var ptr = Ri.slice(0), k2, Aii;
      for (i = 0; i < m; ++i) {
        Aii = Aj[i];
        k2 = ptr[Aii];
        Rj[k2] = Ai[i];
        Rv[k2] = Av[i];
        ptr[Aii] = ptr[Aii] + 1;
      }
      return [Ri, Rj, Rv];
    };
    numeric.ccsGather = function ccsGather(A2) {
      var Ai = A2[0], Aj = A2[1], Av = A2[2];
      var n = Ai.length - 1, m = Aj.length;
      var Ri = Array(m), Rj = Array(m), Rv = Array(m);
      var i, j, j0, j1, p;
      p = 0;
      for (i = 0; i < n; ++i) {
        j0 = Ai[i];
        j1 = Ai[i + 1];
        for (j = j0; j !== j1; ++j) {
          Rj[p] = i;
          Ri[p] = Aj[j];
          Rv[p] = Av[j];
          ++p;
        }
      }
      return [Ri, Rj, Rv];
    };
    numeric.sdim = function dim(A2, ret, k2) {
      if (typeof ret === "undefined") {
        ret = [];
      }
      if (typeof A2 !== "object")
        return ret;
      if (typeof k2 === "undefined") {
        k2 = 0;
      }
      if (!(k2 in ret)) {
        ret[k2] = 0;
      }
      if (A2.length > ret[k2])
        ret[k2] = A2.length;
      var i;
      for (i in A2) {
        if (A2.hasOwnProperty(i))
          dim(A2[i], ret, k2 + 1);
      }
      return ret;
    };
    numeric.sclone = function clone(A2, k2, n) {
      if (typeof k2 === "undefined") {
        k2 = 0;
      }
      if (typeof n === "undefined") {
        n = numeric.sdim(A2).length;
      }
      var i, ret = Array(A2.length);
      if (k2 === n - 1) {
        for (i in A2) {
          if (A2.hasOwnProperty(i))
            ret[i] = A2[i];
        }
        return ret;
      }
      for (i in A2) {
        if (A2.hasOwnProperty(i))
          ret[i] = clone(A2[i], k2 + 1, n);
      }
      return ret;
    };
    numeric.sdiag = function diag(d) {
      var n = d.length, i, ret = Array(n), i1, i2, i3;
      for (i = n - 1; i >= 1; i -= 2) {
        i1 = i - 1;
        ret[i] = [];
        ret[i][i] = d[i];
        ret[i1] = [];
        ret[i1][i1] = d[i1];
      }
      if (i === 0) {
        ret[0] = [];
        ret[0][0] = d[i];
      }
      return ret;
    };
    numeric.sidentity = function identity3(n) {
      return numeric.sdiag(numeric.rep([n], 1));
    };
    numeric.stranspose = function transpose(A2) {
      var ret = [], n = A2.length, i, j, Ai;
      for (i in A2) {
        if (!A2.hasOwnProperty(i))
          continue;
        Ai = A2[i];
        for (j in Ai) {
          if (!Ai.hasOwnProperty(j))
            continue;
          if (typeof ret[j] !== "object") {
            ret[j] = [];
          }
          ret[j][i] = Ai[j];
        }
      }
      return ret;
    };
    numeric.sLUP = function LUP(A2, tol) {
      throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
    };
    numeric.sdotMM = function dotMM(A2, B2) {
      var p = A2.length, q = B2.length, BT = numeric.stranspose(B2), r = BT.length, Ai, BTk;
      var i, j, k2, accum;
      var ret = Array(p), reti;
      for (i = p - 1; i >= 0; i--) {
        reti = [];
        Ai = A2[i];
        for (k2 = r - 1; k2 >= 0; k2--) {
          accum = 0;
          BTk = BT[k2];
          for (j in Ai) {
            if (!Ai.hasOwnProperty(j))
              continue;
            if (j in BTk) {
              accum += Ai[j] * BTk[j];
            }
          }
          if (accum)
            reti[k2] = accum;
        }
        ret[i] = reti;
      }
      return ret;
    };
    numeric.sdotMV = function dotMV(A2, x) {
      var p = A2.length, Ai, i, j;
      var ret = Array(p), accum;
      for (i = p - 1; i >= 0; i--) {
        Ai = A2[i];
        accum = 0;
        for (j in Ai) {
          if (!Ai.hasOwnProperty(j))
            continue;
          if (x[j])
            accum += Ai[j] * x[j];
        }
        if (accum)
          ret[i] = accum;
      }
      return ret;
    };
    numeric.sdotVM = function dotMV(x, A2) {
      var i, j, Ai, alpha;
      var ret = [], accum;
      for (i in x) {
        if (!x.hasOwnProperty(i))
          continue;
        Ai = A2[i];
        alpha = x[i];
        for (j in Ai) {
          if (!Ai.hasOwnProperty(j))
            continue;
          if (!ret[j]) {
            ret[j] = 0;
          }
          ret[j] += alpha * Ai[j];
        }
      }
      return ret;
    };
    numeric.sdotVV = function dotVV(x, y) {
      var i, ret = 0;
      for (i in x) {
        if (x[i] && y[i])
          ret += x[i] * y[i];
      }
      return ret;
    };
    numeric.sdot = function dot(A2, B2) {
      var m = numeric.sdim(A2).length, n = numeric.sdim(B2).length;
      var k2 = m * 1e3 + n;
      switch (k2) {
        case 0:
          return A2 * B2;
        case 1001:
          return numeric.sdotVV(A2, B2);
        case 2001:
          return numeric.sdotMV(A2, B2);
        case 1002:
          return numeric.sdotVM(A2, B2);
        case 2002:
          return numeric.sdotMM(A2, B2);
        default:
          throw new Error("numeric.sdot not implemented for tensors of order " + m + " and " + n);
      }
    };
    numeric.sscatter = function scatter(V) {
      var n = V[0].length, Vij, i, j, m = V.length, A2 = [], Aj;
      for (i = n - 1; i >= 0; --i) {
        if (!V[m - 1][i])
          continue;
        Aj = A2;
        for (j = 0; j < m - 2; j++) {
          Vij = V[j][i];
          if (!Aj[Vij])
            Aj[Vij] = [];
          Aj = Aj[Vij];
        }
        Aj[V[j][i]] = V[j + 1][i];
      }
      return A2;
    };
    numeric.sgather = function gather(A2, ret, k2) {
      if (typeof ret === "undefined")
        ret = [];
      if (typeof k2 === "undefined")
        k2 = [];
      var n, i, Ai;
      n = k2.length;
      for (i in A2) {
        if (A2.hasOwnProperty(i)) {
          k2[n] = parseInt(i);
          Ai = A2[i];
          if (typeof Ai === "number") {
            if (Ai) {
              if (ret.length === 0) {
                for (i = n + 1; i >= 0; --i)
                  ret[i] = [];
              }
              for (i = n; i >= 0; --i)
                ret[i].push(k2[i]);
              ret[n + 1].push(Ai);
            }
          } else
            gather(Ai, ret, k2);
        }
      }
      if (k2.length > n)
        k2.pop();
      return ret;
    };
    numeric.cLU = function LU(A2) {
      var I = A2[0], J = A2[1], V = A2[2];
      var p = I.length, m = 0, i, j, k2, a, b, c;
      for (i = 0; i < p; i++)
        if (I[i] > m)
          m = I[i];
      m++;
      var L = Array(m), U = Array(m), left = numeric.rep([m], Infinity), right = numeric.rep([m], -Infinity);
      var Ui, Uj, alpha;
      for (k2 = 0; k2 < p; k2++) {
        i = I[k2];
        j = J[k2];
        if (j < left[i])
          left[i] = j;
        if (j > right[i])
          right[i] = j;
      }
      for (i = 0; i < m - 1; i++) {
        if (right[i] > right[i + 1])
          right[i + 1] = right[i];
      }
      for (i = m - 1; i >= 1; i--) {
        if (left[i] < left[i - 1])
          left[i - 1] = left[i];
      }
      var countL = 0, countU = 0;
      for (i = 0; i < m; i++) {
        U[i] = numeric.rep([right[i] - left[i] + 1], 0);
        L[i] = numeric.rep([i - left[i]], 0);
        countL += i - left[i] + 1;
        countU += right[i] - i + 1;
      }
      for (k2 = 0; k2 < p; k2++) {
        i = I[k2];
        U[i][J[k2] - left[i]] = V[k2];
      }
      for (i = 0; i < m - 1; i++) {
        a = i - left[i];
        Ui = U[i];
        for (j = i + 1; left[j] <= i && j < m; j++) {
          b = i - left[j];
          c = right[i] - i;
          Uj = U[j];
          alpha = Uj[b] / Ui[a];
          if (alpha) {
            for (k2 = 1; k2 <= c; k2++) {
              Uj[k2 + b] -= alpha * Ui[k2 + a];
            }
            L[j][i - left[j]] = alpha;
          }
        }
      }
      var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
      var p, q, foo;
      p = 0;
      q = 0;
      for (i = 0; i < m; i++) {
        a = left[i];
        b = right[i];
        foo = U[i];
        for (j = i; j <= b; j++) {
          if (foo[j - a]) {
            Ui[p] = i;
            Uj[p] = j;
            Uv[p] = foo[j - a];
            p++;
          }
        }
        foo = L[i];
        for (j = a; j < i; j++) {
          if (foo[j - a]) {
            Li[q] = i;
            Lj[q] = j;
            Lv[q] = foo[j - a];
            q++;
          }
        }
        Li[q] = i;
        Lj[q] = i;
        Lv[q] = 1;
        q++;
      }
      return { U: [Ui, Uj, Uv], L: [Li, Lj, Lv] };
    };
    numeric.cLUsolve = function LUsolve(lu, b) {
      var L = lu.L, U = lu.U, ret = numeric.clone(b);
      var Li = L[0], Lj = L[1], Lv = L[2];
      var Ui = U[0], Uj = U[1], Uv = U[2];
      var p = Ui.length, q = Li.length;
      var m = ret.length, i, j, k2;
      k2 = 0;
      for (i = 0; i < m; i++) {
        while (Lj[k2] < i) {
          ret[i] -= Lv[k2] * ret[Lj[k2]];
          k2++;
        }
        k2++;
      }
      k2 = p - 1;
      for (i = m - 1; i >= 0; i--) {
        while (Uj[k2] > i) {
          ret[i] -= Uv[k2] * ret[Uj[k2]];
          k2--;
        }
        ret[i] /= Uv[k2];
        k2--;
      }
      return ret;
    };
    numeric.cgrid = function grid(n, shape) {
      if (typeof n === "number")
        n = [n, n];
      var ret = numeric.rep(n, -1);
      var i, j, count;
      if (typeof shape !== "function") {
        switch (shape) {
          case "L":
            shape = function(i2, j2) {
              return i2 >= n[0] / 2 || j2 < n[1] / 2;
            };
            break;
          default:
            shape = function(i2, j2) {
              return true;
            };
            break;
        }
      }
      count = 0;
      for (i = 1; i < n[0] - 1; i++)
        for (j = 1; j < n[1] - 1; j++)
          if (shape(i, j)) {
            ret[i][j] = count;
            count++;
          }
      return ret;
    };
    numeric.cdelsq = function delsq(g) {
      var dir = [[-1, 0], [0, -1], [0, 1], [1, 0]];
      var s = numeric.dim(g), m = s[0], n = s[1], i, j, k2, p, q;
      var Li = [], Lj = [], Lv = [];
      for (i = 1; i < m - 1; i++)
        for (j = 1; j < n - 1; j++) {
          if (g[i][j] < 0)
            continue;
          for (k2 = 0; k2 < 4; k2++) {
            p = i + dir[k2][0];
            q = j + dir[k2][1];
            if (g[p][q] < 0)
              continue;
            Li.push(g[i][j]);
            Lj.push(g[p][q]);
            Lv.push(-1);
          }
          Li.push(g[i][j]);
          Lj.push(g[i][j]);
          Lv.push(4);
        }
      return [Li, Lj, Lv];
    };
    numeric.cdotMV = function dotMV(A2, x) {
      var ret, Ai = A2[0], Aj = A2[1], Av = A2[2], k2, p = Ai.length, N;
      N = 0;
      for (k2 = 0; k2 < p; k2++) {
        if (Ai[k2] > N)
          N = Ai[k2];
      }
      N++;
      ret = numeric.rep([N], 0);
      for (k2 = 0; k2 < p; k2++) {
        ret[Ai[k2]] += Av[k2] * x[Aj[k2]];
      }
      return ret;
    };
    numeric.Spline = function Spline(x, yl, yr, kl, kr) {
      this.x = x;
      this.yl = yl;
      this.yr = yr;
      this.kl = kl;
      this.kr = kr;
    };
    numeric.Spline.prototype._at = function _at(x1, p) {
      var x = this.x;
      var yl = this.yl;
      var yr = this.yr;
      var kl = this.kl;
      var kr = this.kr;
      var x1, a, b, t;
      var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
      a = sub(mul(kl[p], x[p + 1] - x[p]), sub(yr[p + 1], yl[p]));
      b = add(mul(kr[p + 1], x[p] - x[p + 1]), sub(yr[p + 1], yl[p]));
      t = (x1 - x[p]) / (x[p + 1] - x[p]);
      var s = t * (1 - t);
      return add(add(add(mul(1 - t, yl[p]), mul(t, yr[p + 1])), mul(a, s * (1 - t))), mul(b, s * t));
    };
    numeric.Spline.prototype.at = function at(x0) {
      if (typeof x0 === "number") {
        var x = this.x;
        var n = x.length;
        var p, q, mid, floor = Math.floor, a, b, t;
        p = 0;
        q = n - 1;
        while (q - p > 1) {
          mid = floor((p + q) / 2);
          if (x[mid] <= x0)
            p = mid;
          else
            q = mid;
        }
        return this._at(x0, p);
      }
      var n = x0.length, i, ret = Array(n);
      for (i = n - 1; i !== -1; --i)
        ret[i] = this.at(x0[i]);
      return ret;
    };
    numeric.Spline.prototype.diff = function diff() {
      var x = this.x;
      var yl = this.yl;
      var yr = this.yr;
      var kl = this.kl;
      var kr = this.kr;
      var n = yl.length;
      var i, dx, dy;
      var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
      var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
      for (i = n - 1; i !== -1; --i) {
        dx = x[i + 1] - x[i];
        dy = sub(yr[i + 1], yl[i]);
        pl[i] = div(add(mul(dy, 6), mul(kl[i], -4 * dx), mul(kr[i + 1], -2 * dx)), dx * dx);
        pr[i + 1] = div(add(mul(dy, -6), mul(kl[i], 2 * dx), mul(kr[i + 1], 4 * dx)), dx * dx);
      }
      return new numeric.Spline(x, zl, zr, pl, pr);
    };
    numeric.Spline.prototype.roots = function roots() {
      function sqr(x2) {
        return x2 * x2;
      }
      function heval(y02, y12, k02, k12, x2) {
        var A3 = k02 * 2 - (y12 - y02);
        var B3 = -k12 * 2 + (y12 - y02);
        var t2 = (x2 + 1) * 0.5;
        var s2 = t2 * (1 - t2);
        return (1 - t2) * y02 + t2 * y12 + A3 * s2 * (1 - t2) + B3 * s2 * t2;
      }
      var ret = [];
      var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
      if (typeof yl[0] === "number") {
        yl = [yl];
        yr = [yr];
        kl = [kl];
        kr = [kr];
      }
      var m = yl.length, n = x.length - 1, i, j, k2, y, s, t;
      var ai, bi, ci, di, ret = Array(m), ri, k0, k1, y0, y1, A2, B2, D, dx, cx, stops, z0, z1, zm, t0, t1, tm;
      var sqrt = Math.sqrt;
      for (i = 0; i !== m; ++i) {
        ai = yl[i];
        bi = yr[i];
        ci = kl[i];
        di = kr[i];
        ri = [];
        for (j = 0; j !== n; j++) {
          if (j > 0 && bi[j] * ai[j] < 0)
            ri.push(x[j]);
          dx = x[j + 1] - x[j];
          cx = x[j];
          y0 = ai[j];
          y1 = bi[j + 1];
          k0 = ci[j] / dx;
          k1 = di[j + 1] / dx;
          D = sqr(k0 - k1 + 3 * (y0 - y1)) + 12 * k1 * y0;
          A2 = k1 + 3 * y0 + 2 * k0 - 3 * y1;
          B2 = 3 * (k1 + k0 + 2 * (y0 - y1));
          if (D <= 0) {
            z0 = A2 / B2;
            if (z0 > x[j] && z0 < x[j + 1])
              stops = [x[j], z0, x[j + 1]];
            else
              stops = [x[j], x[j + 1]];
          } else {
            z0 = (A2 - sqrt(D)) / B2;
            z1 = (A2 + sqrt(D)) / B2;
            stops = [x[j]];
            if (z0 > x[j] && z0 < x[j + 1])
              stops.push(z0);
            if (z1 > x[j] && z1 < x[j + 1])
              stops.push(z1);
            stops.push(x[j + 1]);
          }
          t0 = stops[0];
          z0 = this._at(t0, j);
          for (k2 = 0; k2 < stops.length - 1; k2++) {
            t1 = stops[k2 + 1];
            z1 = this._at(t1, j);
            if (z0 === 0) {
              ri.push(t0);
              t0 = t1;
              z0 = z1;
              continue;
            }
            if (z1 === 0 || z0 * z1 > 0) {
              t0 = t1;
              z0 = z1;
              continue;
            }
            var side = 0;
            while (1) {
              tm = (z0 * t1 - z1 * t0) / (z0 - z1);
              if (tm <= t0 || tm >= t1) {
                break;
              }
              zm = this._at(tm, j);
              if (zm * z1 > 0) {
                t1 = tm;
                z1 = zm;
                if (side === -1)
                  z0 *= 0.5;
                side = -1;
              } else if (zm * z0 > 0) {
                t0 = tm;
                z0 = zm;
                if (side === 1)
                  z1 *= 0.5;
                side = 1;
              } else
                break;
            }
            ri.push(tm);
            t0 = stops[k2 + 1];
            z0 = this._at(t0, j);
          }
          if (z1 === 0)
            ri.push(t1);
        }
        ret[i] = ri;
      }
      if (typeof this.yl[0] === "number")
        return ret[0];
      return ret;
    };
    numeric.spline = function spline(x, y, k1, kn) {
      var n = x.length, b = [], dx = [], dy = [];
      var i;
      var sub = numeric.sub, mul = numeric.mul, add = numeric.add;
      for (i = n - 2; i >= 0; i--) {
        dx[i] = x[i + 1] - x[i];
        dy[i] = sub(y[i + 1], y[i]);
      }
      if (typeof k1 === "string" || typeof kn === "string") {
        k1 = kn = "periodic";
      }
      var T2 = [[], [], []];
      switch (typeof k1) {
        case "undefined":
          b[0] = mul(3 / (dx[0] * dx[0]), dy[0]);
          T2[0].push(0, 0);
          T2[1].push(0, 1);
          T2[2].push(2 / dx[0], 1 / dx[0]);
          break;
        case "string":
          b[0] = add(mul(3 / (dx[n - 2] * dx[n - 2]), dy[n - 2]), mul(3 / (dx[0] * dx[0]), dy[0]));
          T2[0].push(0, 0, 0);
          T2[1].push(n - 2, 0, 1);
          T2[2].push(1 / dx[n - 2], 2 / dx[n - 2] + 2 / dx[0], 1 / dx[0]);
          break;
        default:
          b[0] = k1;
          T2[0].push(0);
          T2[1].push(0);
          T2[2].push(1);
          break;
      }
      for (i = 1; i < n - 1; i++) {
        b[i] = add(mul(3 / (dx[i - 1] * dx[i - 1]), dy[i - 1]), mul(3 / (dx[i] * dx[i]), dy[i]));
        T2[0].push(i, i, i);
        T2[1].push(i - 1, i, i + 1);
        T2[2].push(1 / dx[i - 1], 2 / dx[i - 1] + 2 / dx[i], 1 / dx[i]);
      }
      switch (typeof kn) {
        case "undefined":
          b[n - 1] = mul(3 / (dx[n - 2] * dx[n - 2]), dy[n - 2]);
          T2[0].push(n - 1, n - 1);
          T2[1].push(n - 2, n - 1);
          T2[2].push(1 / dx[n - 2], 2 / dx[n - 2]);
          break;
        case "string":
          T2[1][T2[1].length - 1] = 0;
          break;
        default:
          b[n - 1] = kn;
          T2[0].push(n - 1);
          T2[1].push(n - 1);
          T2[2].push(1);
          break;
      }
      if (typeof b[0] !== "number")
        b = numeric.transpose(b);
      else
        b = [b];
      var k2 = Array(b.length);
      if (typeof k1 === "string") {
        for (i = k2.length - 1; i !== -1; --i) {
          k2[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T2)), b[i]);
          k2[i][n - 1] = k2[i][0];
        }
      } else {
        for (i = k2.length - 1; i !== -1; --i) {
          k2[i] = numeric.cLUsolve(numeric.cLU(T2), b[i]);
        }
      }
      if (typeof y[0] === "number")
        k2 = k2[0];
      else
        k2 = numeric.transpose(k2);
      return new numeric.Spline(x, y, y, k2, k2);
    };
    numeric.fftpow2 = function fftpow2(x, y) {
      var n = x.length;
      if (n === 1)
        return;
      var cos = Math.cos, sin = Math.sin, i, j;
      var xe = Array(n / 2), ye = Array(n / 2), xo = Array(n / 2), yo = Array(n / 2);
      j = n / 2;
      for (i = n - 1; i !== -1; --i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
      }
      fftpow2(xe, ye);
      fftpow2(xo, yo);
      j = n / 2;
      var t, k2 = -6.283185307179586 / n, ci, si;
      for (i = n - 1; i !== -1; --i) {
        --j;
        if (j === -1)
          j = n / 2 - 1;
        t = k2 * i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci * xo[j] - si * yo[j];
        y[i] = ye[j] + ci * yo[j] + si * xo[j];
      }
    };
    numeric._ifftpow2 = function _ifftpow2(x, y) {
      var n = x.length;
      if (n === 1)
        return;
      var cos = Math.cos, sin = Math.sin, i, j;
      var xe = Array(n / 2), ye = Array(n / 2), xo = Array(n / 2), yo = Array(n / 2);
      j = n / 2;
      for (i = n - 1; i !== -1; --i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
      }
      _ifftpow2(xe, ye);
      _ifftpow2(xo, yo);
      j = n / 2;
      var t, k2 = 6.283185307179586 / n, ci, si;
      for (i = n - 1; i !== -1; --i) {
        --j;
        if (j === -1)
          j = n / 2 - 1;
        t = k2 * i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci * xo[j] - si * yo[j];
        y[i] = ye[j] + ci * yo[j] + si * xo[j];
      }
    };
    numeric.ifftpow2 = function ifftpow2(x, y) {
      numeric._ifftpow2(x, y);
      numeric.diveq(x, x.length);
      numeric.diveq(y, y.length);
    };
    numeric.convpow2 = function convpow2(ax, ay, bx, by) {
      numeric.fftpow2(ax, ay);
      numeric.fftpow2(bx, by);
      var i, n = ax.length, axi, bxi, ayi, byi;
      for (i = n - 1; i !== -1; --i) {
        axi = ax[i];
        ayi = ay[i];
        bxi = bx[i];
        byi = by[i];
        ax[i] = axi * bxi - ayi * byi;
        ay[i] = axi * byi + ayi * bxi;
      }
      numeric.ifftpow2(ax, ay);
    };
    numeric.T.prototype.fft = function fft() {
      var x = this.x, y = this.y;
      var n = x.length, log = Math.log, log2 = log(2), p = Math.ceil(log(2 * n - 1) / log2), m = Math.pow(2, p);
      var cx = numeric.rep([m], 0), cy = numeric.rep([m], 0), cos = Math.cos, sin = Math.sin;
      var k2, c = -3.141592653589793 / n, t;
      var a = numeric.rep([m], 0), b = numeric.rep([m], 0), nhalf = Math.floor(n / 2);
      for (k2 = 0; k2 < n; k2++)
        a[k2] = x[k2];
      if (typeof y !== "undefined")
        for (k2 = 0; k2 < n; k2++)
          b[k2] = y[k2];
      cx[0] = 1;
      for (k2 = 1; k2 <= m / 2; k2++) {
        t = c * k2 * k2;
        cx[k2] = cos(t);
        cy[k2] = sin(t);
        cx[m - k2] = cos(t);
        cy[m - k2] = sin(t);
      }
      var X = new numeric.T(a, b), Y = new numeric.T(cx, cy);
      X = X.mul(Y);
      numeric.convpow2(X.x, X.y, numeric.clone(Y.x), numeric.neg(Y.y));
      X = X.mul(Y);
      X.x.length = n;
      X.y.length = n;
      return X;
    };
    numeric.T.prototype.ifft = function ifft() {
      var x = this.x, y = this.y;
      var n = x.length, log = Math.log, log2 = log(2), p = Math.ceil(log(2 * n - 1) / log2), m = Math.pow(2, p);
      var cx = numeric.rep([m], 0), cy = numeric.rep([m], 0), cos = Math.cos, sin = Math.sin;
      var k2, c = 3.141592653589793 / n, t;
      var a = numeric.rep([m], 0), b = numeric.rep([m], 0), nhalf = Math.floor(n / 2);
      for (k2 = 0; k2 < n; k2++)
        a[k2] = x[k2];
      if (typeof y !== "undefined")
        for (k2 = 0; k2 < n; k2++)
          b[k2] = y[k2];
      cx[0] = 1;
      for (k2 = 1; k2 <= m / 2; k2++) {
        t = c * k2 * k2;
        cx[k2] = cos(t);
        cy[k2] = sin(t);
        cx[m - k2] = cos(t);
        cy[m - k2] = sin(t);
      }
      var X = new numeric.T(a, b), Y = new numeric.T(cx, cy);
      X = X.mul(Y);
      numeric.convpow2(X.x, X.y, numeric.clone(Y.x), numeric.neg(Y.y));
      X = X.mul(Y);
      X.x.length = n;
      X.y.length = n;
      return X.div(n);
    };
    numeric.gradient = function gradient(f, x) {
      var n = x.length;
      var f0 = f(x);
      if (isNaN(f0))
        throw new Error("gradient: f(x) is a NaN!");
      var max = Math.max;
      var i, x0 = numeric.clone(x), f1, f2, J = Array(n);
      var div = numeric.div, sub = numeric.sub, errest, roundoff, max = Math.max, eps = 1e-3, abs = Math.abs, min = Math.min;
      var t0, t1, t2, it = 0, d1, d2, N;
      for (i = 0; i < n; i++) {
        var h = max(1e-6 * f0, 1e-8);
        while (1) {
          ++it;
          if (it > 20) {
            throw new Error("Numerical gradient fails");
          }
          x0[i] = x[i] + h;
          f1 = f(x0);
          x0[i] = x[i] - h;
          f2 = f(x0);
          x0[i] = x[i];
          if (isNaN(f1) || isNaN(f2)) {
            h /= 16;
            continue;
          }
          J[i] = (f1 - f2) / (2 * h);
          t0 = x[i] - h;
          t1 = x[i];
          t2 = x[i] + h;
          d1 = (f1 - f0) / h;
          d2 = (f0 - f2) / h;
          N = max(abs(J[i]), abs(f0), abs(f1), abs(f2), abs(t0), abs(t1), abs(t2), 1e-8);
          errest = min(max(abs(d1 - J[i]), abs(d2 - J[i]), abs(d1 - d2)) / N, h / N);
          if (errest > eps) {
            h /= 16;
          } else
            break;
        }
      }
      return J;
    };
    numeric.uncmin = function uncmin(f, x0, tol, gradient, maxit, callback, options) {
      var grad = numeric.gradient;
      if (typeof options === "undefined") {
        options = {};
      }
      if (typeof tol === "undefined") {
        tol = 1e-8;
      }
      if (typeof gradient === "undefined") {
        gradient = function(x) {
          return grad(f, x);
        };
      }
      if (typeof maxit === "undefined")
        maxit = 1e3;
      x0 = numeric.clone(x0);
      var n = x0.length;
      var f0 = f(x0), f1, df0;
      if (isNaN(f0))
        throw new Error("uncmin: f(x0) is a NaN!");
      var max = Math.max, norm2 = numeric.norm2;
      tol = max(tol, numeric.epsilon);
      var step, g0, g1, H1 = options.Hinv || numeric.identity(n);
      var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
      var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
      var it = 0, i, s, x1, y, Hy, Hs, ys, i0, t, nstep, t1, t2;
      var msg = "";
      g0 = gradient(x0);
      while (it < maxit) {
        if (typeof callback === "function") {
          if (callback(it, x0, f0, g0, H1)) {
            msg = "Callback returned true";
            break;
          }
        }
        if (!all(isfinite(g0))) {
          msg = "Gradient has Infinity or NaN";
          break;
        }
        step = neg(dot(H1, g0));
        if (!all(isfinite(step))) {
          msg = "Search direction has Infinity or NaN";
          break;
        }
        nstep = norm2(step);
        if (nstep < tol) {
          msg = "Newton step smaller than tol";
          break;
        }
        t = 1;
        df0 = dot(g0, step);
        x1 = x0;
        while (it < maxit) {
          if (t * nstep < tol) {
            break;
          }
          s = mul(step, t);
          x1 = add(x0, s);
          f1 = f(x1);
          if (f1 - f0 >= 0.1 * t * df0 || isNaN(f1)) {
            t *= 0.5;
            ++it;
            continue;
          }
          break;
        }
        if (t * nstep < tol) {
          msg = "Line search step size smaller than tol";
          break;
        }
        if (it === maxit) {
          msg = "maxit reached during line search";
          break;
        }
        g1 = gradient(x1);
        y = sub(g1, g0);
        ys = dot(y, s);
        Hy = dot(H1, y);
        H1 = sub(add(H1, mul((ys + dot(y, Hy)) / (ys * ys), ten(s, s))), div(add(ten(Hy, s), ten(s, Hy)), ys));
        x0 = x1;
        f0 = f1;
        g0 = g1;
        ++it;
      }
      return { solution: x0, f: f0, gradient: g0, invHessian: H1, iterations: it, message: msg };
    };
    numeric.Dopri = function Dopri(x, y, f, ymid, iterations, msg, events) {
      this.x = x;
      this.y = y;
      this.f = f;
      this.ymid = ymid;
      this.iterations = iterations;
      this.events = events;
      this.message = msg;
    };
    numeric.Dopri.prototype._at = function _at(xi, j) {
      function sqr(x) {
        return x * x;
      }
      var sol = this;
      var xs = sol.x;
      var ys = sol.y;
      var k1 = sol.f;
      var ymid = sol.ymid;
      var n = xs.length;
      var x0, x1, xh, y0, y1, yh, xi;
      var floor = Math.floor, h;
      var c = 0.5;
      var add = numeric.add, mul = numeric.mul, sub = numeric.sub, p, q, w;
      x0 = xs[j];
      x1 = xs[j + 1];
      y0 = ys[j];
      y1 = ys[j + 1];
      h = x1 - x0;
      xh = x0 + c * h;
      yh = ymid[j];
      p = sub(k1[j], mul(y0, 1 / (x0 - xh) + 2 / (x0 - x1)));
      q = sub(k1[j + 1], mul(y1, 1 / (x1 - xh) + 2 / (x1 - x0)));
      w = [
        sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
        sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
        sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
        (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
        (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0 - x1) / (x1 - xh)
      ];
      return add(add(add(add(mul(y0, w[0]), mul(yh, w[1])), mul(y1, w[2])), mul(p, w[3])), mul(q, w[4]));
    };
    numeric.Dopri.prototype.at = function at(x) {
      var i, j, k2, floor = Math.floor;
      if (typeof x !== "number") {
        var n = x.length, ret = Array(n);
        for (i = n - 1; i !== -1; --i) {
          ret[i] = this.at(x[i]);
        }
        return ret;
      }
      var x0 = this.x;
      i = 0;
      j = x0.length - 1;
      while (j - i > 1) {
        k2 = floor(0.5 * (i + j));
        if (x0[k2] <= x)
          i = k2;
        else
          j = k2;
      }
      return this._at(x, i);
    };
    numeric.dopri = function dopri(x0, x1, y0, f, tol, maxit, event) {
      if (typeof tol === "undefined") {
        tol = 1e-6;
      }
      if (typeof maxit === "undefined") {
        maxit = 1e3;
      }
      var xs = [x0], ys = [y0], k1 = [f(x0, y0)], k2, k3, k4, k5, k6, k7, ymid = [];
      var A2 = 1 / 5;
      var A3 = [3 / 40, 9 / 40];
      var A4 = [44 / 45, -56 / 15, 32 / 9];
      var A5 = [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729];
      var A6 = [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656];
      var b = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84];
      var bm = [
        0.5 * 6025192743 / 30085553152,
        0,
        0.5 * 51252292925 / 65400821598,
        0.5 * -2691868925 / 45128329728,
        0.5 * 187940372067 / 1594534317056,
        0.5 * -1776094331 / 19743644256,
        0.5 * 11237099 / 235043384
      ];
      var c = [1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];
      var e = [-71 / 57600, 0, 71 / 16695, -71 / 1920, 17253 / 339200, -22 / 525, 1 / 40];
      var i = 0, er, j;
      var h = (x1 - x0) / 10;
      var it = 0;
      var add = numeric.add, mul = numeric.mul, y1, erinf;
      var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf, pow = Math.pow;
      var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
      var e0, e1, ev;
      var ret = new numeric.Dopri(xs, ys, k1, ymid, -1, "");
      if (typeof event === "function")
        e0 = event(x0, y0);
      while (x0 < x1 && it < maxit) {
        ++it;
        if (x0 + h > x1)
          h = x1 - x0;
        k2 = f(x0 + c[0] * h, add(y0, mul(A2 * h, k1[i])));
        k3 = f(x0 + c[1] * h, add(add(y0, mul(A3[0] * h, k1[i])), mul(A3[1] * h, k2)));
        k4 = f(x0 + c[2] * h, add(add(add(y0, mul(A4[0] * h, k1[i])), mul(A4[1] * h, k2)), mul(A4[2] * h, k3)));
        k5 = f(x0 + c[3] * h, add(add(add(add(y0, mul(A5[0] * h, k1[i])), mul(A5[1] * h, k2)), mul(A5[2] * h, k3)), mul(A5[3] * h, k4)));
        k6 = f(x0 + c[4] * h, add(add(add(add(add(y0, mul(A6[0] * h, k1[i])), mul(A6[1] * h, k2)), mul(A6[2] * h, k3)), mul(A6[3] * h, k4)), mul(A6[4] * h, k5)));
        y1 = add(add(add(add(add(y0, mul(k1[i], h * b[0])), mul(k3, h * b[2])), mul(k4, h * b[3])), mul(k5, h * b[4])), mul(k6, h * b[5]));
        k7 = f(x0 + h, y1);
        er = add(add(add(add(add(mul(k1[i], h * e[0]), mul(k3, h * e[2])), mul(k4, h * e[3])), mul(k5, h * e[4])), mul(k6, h * e[5])), mul(k7, h * e[6]));
        if (typeof er === "number")
          erinf = abs(er);
        else
          erinf = norminf(er);
        if (erinf > tol) {
          h = 0.2 * h * pow(tol / erinf, 0.25);
          if (x0 + h === x0) {
            ret.msg = "Step size became too small";
            break;
          }
          continue;
        }
        ymid[i] = add(add(add(add(add(add(y0, mul(k1[i], h * bm[0])), mul(k3, h * bm[2])), mul(k4, h * bm[3])), mul(k5, h * bm[4])), mul(k6, h * bm[5])), mul(k7, h * bm[6]));
        ++i;
        xs[i] = x0 + h;
        ys[i] = y1;
        k1[i] = k7;
        if (typeof event === "function") {
          var yi, xl = x0, xr = x0 + 0.5 * h, xi;
          e1 = event(xr, ymid[i - 1]);
          ev = and(lt(e0, 0), lt(0, e1));
          if (!any(ev)) {
            xl = xr;
            xr = x0 + h;
            e0 = e1;
            e1 = event(xr, y1);
            ev = and(lt(e0, 0), lt(0, e1));
          }
          if (any(ev)) {
            var xc, yc, en, ei;
            var side = 0, sl = 1, sr = 1;
            while (1) {
              if (typeof e0 === "number")
                xi = (sr * e1 * xl - sl * e0 * xr) / (sr * e1 - sl * e0);
              else {
                xi = xr;
                for (j = e0.length - 1; j !== -1; --j) {
                  if (e0[j] < 0 && e1[j] > 0)
                    xi = min(xi, (sr * e1[j] * xl - sl * e0[j] * xr) / (sr * e1[j] - sl * e0[j]));
                }
              }
              if (xi <= xl || xi >= xr)
                break;
              yi = ret._at(xi, i - 1);
              ei = event(xi, yi);
              en = and(lt(e0, 0), lt(0, ei));
              if (any(en)) {
                xr = xi;
                e1 = ei;
                ev = en;
                sr = 1;
                if (side === -1)
                  sl *= 0.5;
                else
                  sl = 1;
                side = -1;
              } else {
                xl = xi;
                e0 = ei;
                sl = 1;
                if (side === 1)
                  sr *= 0.5;
                else
                  sr = 1;
                side = 1;
              }
            }
            y1 = ret._at(0.5 * (x0 + xi), i - 1);
            ret.f[i] = f(xi, yi);
            ret.x[i] = xi;
            ret.y[i] = yi;
            ret.ymid[i - 1] = y1;
            ret.events = ev;
            ret.iterations = it;
            return ret;
          }
        }
        x0 += h;
        y0 = y1;
        e0 = e1;
        h = min(0.8 * h * pow(tol / erinf, 0.25), 4 * h);
      }
      ret.iterations = it;
      return ret;
    };
    numeric.LU = function(A2, fast) {
      fast = fast || false;
      var abs = Math.abs;
      var i, j, k2, absAjk, Akk, Ak, Pk, Ai;
      var max;
      var n = A2.length, n1 = n - 1;
      var P = new Array(n);
      if (!fast)
        A2 = numeric.clone(A2);
      for (k2 = 0; k2 < n; ++k2) {
        Pk = k2;
        Ak = A2[k2];
        max = abs(Ak[k2]);
        for (j = k2 + 1; j < n; ++j) {
          absAjk = abs(A2[j][k2]);
          if (max < absAjk) {
            max = absAjk;
            Pk = j;
          }
        }
        P[k2] = Pk;
        if (Pk != k2) {
          A2[k2] = A2[Pk];
          A2[Pk] = Ak;
          Ak = A2[k2];
        }
        Akk = Ak[k2];
        for (i = k2 + 1; i < n; ++i) {
          A2[i][k2] /= Akk;
        }
        for (i = k2 + 1; i < n; ++i) {
          Ai = A2[i];
          for (j = k2 + 1; j < n1; ++j) {
            Ai[j] -= Ai[k2] * Ak[j];
            ++j;
            Ai[j] -= Ai[k2] * Ak[j];
          }
          if (j === n1)
            Ai[j] -= Ai[k2] * Ak[j];
        }
      }
      return {
        LU: A2,
        P
      };
    };
    numeric.LUsolve = function LUsolve(LUP, b) {
      var i, j;
      var LU = LUP.LU;
      var n = LU.length;
      var x = numeric.clone(b);
      var P = LUP.P;
      var Pi, LUi, LUii, tmp;
      for (i = n - 1; i !== -1; --i)
        x[i] = b[i];
      for (i = 0; i < n; ++i) {
        Pi = P[i];
        if (P[i] !== i) {
          tmp = x[i];
          x[i] = x[Pi];
          x[Pi] = tmp;
        }
        LUi = LU[i];
        for (j = 0; j < i; ++j) {
          x[i] -= x[j] * LUi[j];
        }
      }
      for (i = n - 1; i >= 0; --i) {
        LUi = LU[i];
        for (j = i + 1; j < n; ++j) {
          x[i] -= x[j] * LUi[j];
        }
        x[i] /= LUi[i];
      }
      return x;
    };
    numeric.solve = function solve(A2, b, fast) {
      return numeric.LUsolve(numeric.LU(A2, fast), b);
    };
    numeric.echelonize = function echelonize(A2) {
      var s = numeric.dim(A2), m = s[0], n = s[1];
      var I = numeric.identity(m);
      var P = Array(m);
      var i, j, k2, l, Ai, Ii, Z, a;
      var abs = Math.abs;
      var diveq = numeric.diveq;
      A2 = numeric.clone(A2);
      for (i = 0; i < m; ++i) {
        k2 = 0;
        Ai = A2[i];
        Ii = I[i];
        for (j = 1; j < n; ++j)
          if (abs(Ai[k2]) < abs(Ai[j]))
            k2 = j;
        P[i] = k2;
        diveq(Ii, Ai[k2]);
        diveq(Ai, Ai[k2]);
        for (j = 0; j < m; ++j)
          if (j !== i) {
            Z = A2[j];
            a = Z[k2];
            for (l = n - 1; l !== -1; --l)
              Z[l] -= Ai[l] * a;
            Z = I[j];
            for (l = m - 1; l !== -1; --l)
              Z[l] -= Ii[l] * a;
          }
      }
      return { I, A: A2, P };
    };
    numeric.__solveLP = function __solveLP(c, A2, b, tol, maxit, x, flag) {
      var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
      var m = c.length, n = b.length, y;
      var unbounded = false, cb, i0 = 0;
      var alpha = 1;
      var f0, df0, AT = numeric.transpose(A2), svd = numeric.svd, transpose = numeric.transpose, leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
      var muleq = numeric.muleq;
      var norm = numeric.norminf, any = numeric.any, min = Math.min;
      var all = numeric.all, gt = numeric.gt;
      var p = Array(m), A0 = Array(n), e = numeric.rep([n], 1), H;
      var solve = numeric.solve, z = sub(b, dot(A2, x)), count;
      var dotcc = dot(c, c);
      var g;
      for (count = i0; count < maxit; ++count) {
        var i, j, d;
        for (i = n - 1; i !== -1; --i)
          A0[i] = div(A2[i], z[i]);
        var A1 = transpose(A0);
        for (i = m - 1; i !== -1; --i)
          p[i] = sum(A1[i]);
        alpha = 0.25 * abs(dotcc / dot(c, p));
        var a1 = 100 * sqrt(dotcc / dot(p, p));
        if (!isFinite(alpha) || alpha > a1)
          alpha = a1;
        g = add(c, mul(alpha, p));
        H = dot(A1, A0);
        for (i = m - 1; i !== -1; --i)
          H[i][i] += 1;
        d = solve(H, div(g, alpha), true);
        var t0 = div(z, dot(A2, d));
        var t = 1;
        for (i = n - 1; i !== -1; --i)
          if (t0[i] < 0)
            t = min(t, -0.999 * t0[i]);
        y = sub(x, mul(d, t));
        z = sub(b, dot(A2, y));
        if (!all(gt(z, 0)))
          return { solution: x, message: "", iterations: count };
        x = y;
        if (alpha < tol)
          return { solution: y, message: "", iterations: count };
        if (flag) {
          var s = dot(c, g), Ag = dot(A2, g);
          unbounded = true;
          for (i = n - 1; i !== -1; --i)
            if (s * Ag[i] < 0) {
              unbounded = false;
              break;
            }
        } else {
          if (x[m - 1] >= 0)
            unbounded = false;
          else
            unbounded = true;
        }
        if (unbounded)
          return { solution: y, message: "Unbounded", iterations: count };
      }
      return { solution: x, message: "maximum iteration count exceeded", iterations: count };
    };
    numeric._solveLP = function _solveLP(c, A2, b, tol, maxit) {
      var m = c.length, n = b.length, y;
      var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
      var c0 = numeric.rep([m], 0).concat([1]);
      var J = numeric.rep([n, 1], -1);
      var A0 = numeric.blockMatrix([[A2, J]]);
      var b0 = b;
      var y = numeric.rep([m], 0).concat(Math.max(0, numeric.sup(numeric.neg(b))) + 1);
      var x0 = numeric.__solveLP(c0, A0, b0, tol, maxit, y, false);
      var x = numeric.clone(x0.solution);
      x.length = m;
      var foo = numeric.inf(sub(b, dot(A2, x)));
      if (foo < 0) {
        return { solution: NaN, message: "Infeasible", iterations: x0.iterations };
      }
      var ret = numeric.__solveLP(c, A2, b, tol, maxit - x0.iterations, x, true);
      ret.iterations += x0.iterations;
      return ret;
    };
    numeric.solveLP = function solveLP(c, A2, b, Aeq, beq, tol, maxit) {
      if (typeof maxit === "undefined")
        maxit = 1e3;
      if (typeof tol === "undefined")
        tol = numeric.epsilon;
      if (typeof Aeq === "undefined")
        return numeric._solveLP(c, A2, b, tol, maxit);
      var m = Aeq.length, n = Aeq[0].length, o = A2.length;
      var B2 = numeric.echelonize(Aeq);
      var flags = numeric.rep([n], 0);
      var P = B2.P;
      var Q = [];
      var i;
      for (i = P.length - 1; i !== -1; --i)
        flags[P[i]] = 1;
      for (i = n - 1; i !== -1; --i)
        if (flags[i] === 0)
          Q.push(i);
      var g = numeric.getRange;
      var I = numeric.linspace(0, m - 1), J = numeric.linspace(0, o - 1);
      var Aeq2 = g(Aeq, I, Q), A1 = g(A2, J, P), A22 = g(A2, J, Q), dot = numeric.dot, sub = numeric.sub;
      var A3 = dot(A1, B2.I);
      var A4 = sub(A22, dot(A3, Aeq2)), b4 = sub(b, dot(A3, beq));
      var c1 = Array(P.length), c2 = Array(Q.length);
      for (i = P.length - 1; i !== -1; --i)
        c1[i] = c[P[i]];
      for (i = Q.length - 1; i !== -1; --i)
        c2[i] = c[Q[i]];
      var c4 = sub(c2, dot(c1, dot(B2.I, Aeq2)));
      var S = numeric._solveLP(c4, A4, b4, tol, maxit);
      var x2 = S.solution;
      if (x2 !== x2)
        return S;
      var x1 = dot(B2.I, sub(beq, dot(Aeq2, x2)));
      var x = Array(c.length);
      for (i = P.length - 1; i !== -1; --i)
        x[P[i]] = x1[i];
      for (i = Q.length - 1; i !== -1; --i)
        x[Q[i]] = x2[i];
      return { solution: x, message: S.message, iterations: S.iterations };
    };
    numeric.MPStoLP = function MPStoLP(MPS) {
      if (MPS instanceof String) {
        MPS.split("\n");
      }
      var state = 0;
      var states = ["Initial state", "NAME", "ROWS", "COLUMNS", "RHS", "BOUNDS", "ENDATA"];
      var n = MPS.length;
      var i, j, z, N = 0, rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
      var name;
      var c = [], A2 = [], b = [];
      function err(e) {
        throw new Error("MPStoLP: " + e + "\nLine " + i + ": " + MPS[i] + "\nCurrent state: " + states[state] + "\n");
      }
      for (i = 0; i < n; ++i) {
        z = MPS[i];
        var w0 = z.match(/\S*/g);
        var w = [];
        for (j = 0; j < w0.length; ++j)
          if (w0[j] !== "")
            w.push(w0[j]);
        if (w.length === 0)
          continue;
        for (j = 0; j < states.length; ++j)
          if (z.substr(0, states[j].length) === states[j])
            break;
        if (j < states.length) {
          state = j;
          if (j === 1) {
            name = w[1];
          }
          if (j === 6)
            return { name, c, A: numeric.transpose(A2), b, rows, vars };
          continue;
        }
        switch (state) {
          case 0:
          case 1:
            err("Unexpected line");
          case 2:
            switch (w[0]) {
              case "N":
                if (N === 0)
                  N = w[1];
                else
                  err("Two or more N rows");
                break;
              case "L":
                rows[w[1]] = rl;
                sign[rl] = 1;
                b[rl] = 0;
                ++rl;
                break;
              case "G":
                rows[w[1]] = rl;
                sign[rl] = -1;
                b[rl] = 0;
                ++rl;
                break;
              case "E":
                rows[w[1]] = rl;
                sign[rl] = 0;
                b[rl] = 0;
                ++rl;
                break;
              default:
                err("Parse error " + numeric.prettyPrint(w));
            }
            break;
          case 3:
            if (!vars.hasOwnProperty(w[0])) {
              vars[w[0]] = nv;
              c[nv] = 0;
              A2[nv] = numeric.rep([rl], 0);
              ++nv;
            }
            var p = vars[w[0]];
            for (j = 1; j < w.length; j += 2) {
              if (w[j] === N) {
                c[p] = parseFloat(w[j + 1]);
                continue;
              }
              var q = rows[w[j]];
              A2[p][q] = (sign[q] < 0 ? -1 : 1) * parseFloat(w[j + 1]);
            }
            break;
          case 4:
            for (j = 1; j < w.length; j += 2)
              b[rows[w[j]]] = (sign[rows[w[j]]] < 0 ? -1 : 1) * parseFloat(w[j + 1]);
            break;
          case 5:
            break;
          case 6:
            err("Internal error");
        }
      }
      err("Reached end of file without ENDATA");
    };
    numeric.seedrandom = { pow: Math.pow, random: Math.random };
    (function(pool, math, width, chunks, significance, overflow, startdenom) {
      math["seedrandom"] = function seedrandom(seed, use_entropy) {
        var key = [];
        var arc4;
        seed = mixkey(flatten(use_entropy ? [seed, pool] : arguments.length ? seed : [new Date().getTime(), pool, window], 3), key);
        arc4 = new ARC4(key);
        mixkey(arc4.S, pool);
        math["random"] = function random() {
          var n = arc4.g(chunks);
          var d = startdenom;
          var x = 0;
          while (n < significance) {
            n = (n + x) * width;
            d *= width;
            x = arc4.g(1);
          }
          while (n >= overflow) {
            n /= 2;
            d /= 2;
            x >>>= 1;
          }
          return (n + x) / d;
        };
        return seed;
      };
      function ARC4(key) {
        var t, u, me = this, keylen = key.length;
        var i = 0, j = me.i = me.j = me.m = 0;
        me.S = [];
        me.c = [];
        if (!keylen) {
          key = [keylen++];
        }
        while (i < width) {
          me.S[i] = i++;
        }
        for (i = 0; i < width; i++) {
          t = me.S[i];
          j = lowbits(j + t + key[i % keylen]);
          u = me.S[j];
          me.S[i] = u;
          me.S[j] = t;
        }
        me.g = function getnext(count) {
          var s = me.S;
          var i2 = lowbits(me.i + 1);
          var t2 = s[i2];
          var j2 = lowbits(me.j + t2);
          var u2 = s[j2];
          s[i2] = u2;
          s[j2] = t2;
          var r = s[lowbits(t2 + u2)];
          while (--count) {
            i2 = lowbits(i2 + 1);
            t2 = s[i2];
            j2 = lowbits(j2 + t2);
            u2 = s[j2];
            s[i2] = u2;
            s[j2] = t2;
            r = r * width + s[lowbits(t2 + u2)];
          }
          me.i = i2;
          me.j = j2;
          return r;
        };
        me.g(width);
      }
      function flatten(obj, depth, result, prop, typ) {
        result = [];
        typ = typeof obj;
        if (depth && typ == "object") {
          for (prop in obj) {
            if (prop.indexOf("S") < 5) {
              try {
                result.push(flatten(obj[prop], depth - 1));
              } catch (e) {
              }
            }
          }
        }
        return result.length ? result : obj + (typ != "string" ? "\0" : "");
      }
      function mixkey(seed, key, smear, j) {
        seed += "";
        smear = 0;
        for (j = 0; j < seed.length; j++) {
          key[lowbits(j)] = lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
        }
        seed = "";
        for (j in key) {
          seed += String.fromCharCode(key[j]);
        }
        return seed;
      }
      function lowbits(n) {
        return n & width - 1;
      }
      startdenom = math.pow(width, chunks);
      significance = math.pow(2, significance);
      overflow = significance * 2;
      mixkey(math.random(), pool);
    })([], numeric.seedrandom, 256, 6, 52);
    (function(exports2) {
      function base0to1(A2) {
        if (typeof A2 !== "object") {
          return A2;
        }
        var ret = [], i, n = A2.length;
        for (i = 0; i < n; i++)
          ret[i + 1] = base0to1(A2[i]);
        return ret;
      }
      function base1to0(A2) {
        if (typeof A2 !== "object") {
          return A2;
        }
        var ret = [], i, n = A2.length;
        for (i = 1; i < n; i++)
          ret[i - 1] = base1to0(A2[i]);
        return ret;
      }
      function dpori(a, lda, n) {
        var i, j, k2, kp1, t;
        for (k2 = 1; k2 <= n; k2 = k2 + 1) {
          a[k2][k2] = 1 / a[k2][k2];
          t = -a[k2][k2];
          for (i = 1; i < k2; i = i + 1) {
            a[i][k2] = t * a[i][k2];
          }
          kp1 = k2 + 1;
          if (n < kp1) {
            break;
          }
          for (j = kp1; j <= n; j = j + 1) {
            t = a[k2][j];
            a[k2][j] = 0;
            for (i = 1; i <= k2; i = i + 1) {
              a[i][j] = a[i][j] + t * a[i][k2];
            }
          }
        }
      }
      function dposl(a, lda, n, b) {
        var i, k2, kb, t;
        for (k2 = 1; k2 <= n; k2 = k2 + 1) {
          t = 0;
          for (i = 1; i < k2; i = i + 1) {
            t = t + a[i][k2] * b[i];
          }
          b[k2] = (b[k2] - t) / a[k2][k2];
        }
        for (kb = 1; kb <= n; kb = kb + 1) {
          k2 = n + 1 - kb;
          b[k2] = b[k2] / a[k2][k2];
          t = -b[k2];
          for (i = 1; i < k2; i = i + 1) {
            b[i] = b[i] + t * a[i][k2];
          }
        }
      }
      function dpofa(a, lda, n, info) {
        var i, j, jm1, k2, t, s;
        for (j = 1; j <= n; j = j + 1) {
          info[1] = j;
          s = 0;
          jm1 = j - 1;
          if (jm1 < 1) {
            s = a[j][j] - s;
            if (s <= 0) {
              break;
            }
            a[j][j] = Math.sqrt(s);
          } else {
            for (k2 = 1; k2 <= jm1; k2 = k2 + 1) {
              t = a[k2][j];
              for (i = 1; i < k2; i = i + 1) {
                t = t - a[i][j] * a[i][k2];
              }
              t = t / a[k2][k2];
              a[k2][j] = t;
              s = s + t * t;
            }
            s = a[j][j] - s;
            if (s <= 0) {
              break;
            }
            a[j][j] = Math.sqrt(s);
          }
          info[1] = 0;
        }
      }
      function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat, bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {
        var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv, temp, sum, t1, tt, gc, gs, nu, t1inf, t2min, vsmall, tmpa, tmpb, go;
        r = Math.min(n, q);
        l = 2 * n + r * (r + 5) / 2 + 2 * q + 1;
        vsmall = 1e-60;
        do {
          vsmall = vsmall + vsmall;
          tmpa = 1 + 0.1 * vsmall;
          tmpb = 1 + 0.2 * vsmall;
        } while (tmpa <= 1 || tmpb <= 1);
        for (i = 1; i <= n; i = i + 1) {
          work[i] = dvec[i];
        }
        for (i = n + 1; i <= l; i = i + 1) {
          work[i] = 0;
        }
        for (i = 1; i <= q; i = i + 1) {
          iact[i] = 0;
        }
        info = [];
        if (ierr[1] === 0) {
          dpofa(dmat, fddmat, n, info);
          if (info[1] !== 0) {
            ierr[1] = 2;
            return;
          }
          dposl(dmat, fddmat, n, dvec);
          dpori(dmat, fddmat, n);
        } else {
          for (j = 1; j <= n; j = j + 1) {
            sol[j] = 0;
            for (i = 1; i <= j; i = i + 1) {
              sol[j] = sol[j] + dmat[i][j] * dvec[i];
            }
          }
          for (j = 1; j <= n; j = j + 1) {
            dvec[j] = 0;
            for (i = j; i <= n; i = i + 1) {
              dvec[j] = dvec[j] + dmat[j][i] * sol[i];
            }
          }
        }
        crval[1] = 0;
        for (j = 1; j <= n; j = j + 1) {
          sol[j] = dvec[j];
          crval[1] = crval[1] + work[j] * sol[j];
          work[j] = 0;
          for (i = j + 1; i <= n; i = i + 1) {
            dmat[i][j] = 0;
          }
        }
        crval[1] = -crval[1] / 2;
        ierr[1] = 0;
        iwzv = n;
        iwrv = iwzv + n;
        iwuv = iwrv + r;
        iwrm = iwuv + r + 1;
        iwsv = iwrm + r * (r + 1) / 2;
        iwnbv = iwsv + q;
        for (i = 1; i <= q; i = i + 1) {
          sum = 0;
          for (j = 1; j <= n; j = j + 1) {
            sum = sum + amat[j][i] * amat[j][i];
          }
          work[iwnbv + i] = Math.sqrt(sum);
        }
        nact = 0;
        iter[1] = 0;
        iter[2] = 0;
        function fn_goto_50() {
          iter[1] = iter[1] + 1;
          l = iwsv;
          for (i = 1; i <= q; i = i + 1) {
            l = l + 1;
            sum = -bvec[i];
            for (j = 1; j <= n; j = j + 1) {
              sum = sum + amat[j][i] * sol[j];
            }
            if (Math.abs(sum) < vsmall) {
              sum = 0;
            }
            if (i > meq) {
              work[l] = sum;
            } else {
              work[l] = -Math.abs(sum);
              if (sum > 0) {
                for (j = 1; j <= n; j = j + 1) {
                  amat[j][i] = -amat[j][i];
                }
                bvec[i] = -bvec[i];
              }
            }
          }
          for (i = 1; i <= nact; i = i + 1) {
            work[iwsv + iact[i]] = 0;
          }
          nvl = 0;
          temp = 0;
          for (i = 1; i <= q; i = i + 1) {
            if (work[iwsv + i] < temp * work[iwnbv + i]) {
              nvl = i;
              temp = work[iwsv + i] / work[iwnbv + i];
            }
          }
          if (nvl === 0) {
            return 999;
          }
          return 0;
        }
        function fn_goto_55() {
          for (i = 1; i <= n; i = i + 1) {
            sum = 0;
            for (j = 1; j <= n; j = j + 1) {
              sum = sum + dmat[j][i] * amat[j][nvl];
            }
            work[i] = sum;
          }
          l1 = iwzv;
          for (i = 1; i <= n; i = i + 1) {
            work[l1 + i] = 0;
          }
          for (j = nact + 1; j <= n; j = j + 1) {
            for (i = 1; i <= n; i = i + 1) {
              work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
            }
          }
          t1inf = true;
          for (i = nact; i >= 1; i = i - 1) {
            sum = work[i];
            l = iwrm + i * (i + 3) / 2;
            l1 = l - i;
            for (j = i + 1; j <= nact; j = j + 1) {
              sum = sum - work[l] * work[iwrv + j];
              l = l + j;
            }
            sum = sum / work[l1];
            work[iwrv + i] = sum;
            if (iact[i] < meq) {
              break;
            }
            if (sum < 0) {
              break;
            }
            t1inf = false;
            it1 = i;
          }
          if (!t1inf) {
            t1 = work[iwuv + it1] / work[iwrv + it1];
            for (i = 1; i <= nact; i = i + 1) {
              if (iact[i] < meq) {
                break;
              }
              if (work[iwrv + i] < 0) {
                break;
              }
              temp = work[iwuv + i] / work[iwrv + i];
              if (temp < t1) {
                t1 = temp;
                it1 = i;
              }
            }
          }
          sum = 0;
          for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
            sum = sum + work[i] * work[i];
          }
          if (Math.abs(sum) <= vsmall) {
            if (t1inf) {
              ierr[1] = 1;
              return 999;
            } else {
              for (i = 1; i <= nact; i = i + 1) {
                work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
              }
              work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
              return 700;
            }
          } else {
            sum = 0;
            for (i = 1; i <= n; i = i + 1) {
              sum = sum + work[iwzv + i] * amat[i][nvl];
            }
            tt = -work[iwsv + nvl] / sum;
            t2min = true;
            if (!t1inf) {
              if (t1 < tt) {
                tt = t1;
                t2min = false;
              }
            }
            for (i = 1; i <= n; i = i + 1) {
              sol[i] = sol[i] + tt * work[iwzv + i];
              if (Math.abs(sol[i]) < vsmall) {
                sol[i] = 0;
              }
            }
            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
            for (i = 1; i <= nact; i = i + 1) {
              work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;
            if (t2min) {
              nact = nact + 1;
              iact[nact] = nvl;
              l = iwrm + (nact - 1) * nact / 2 + 1;
              for (i = 1; i <= nact - 1; i = i + 1) {
                work[l] = work[i];
                l = l + 1;
              }
              if (nact === n) {
                work[l] = work[n];
              } else {
                for (i = n; i >= nact + 1; i = i - 1) {
                  if (work[i] === 0) {
                    break;
                  }
                  gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                  gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                  if (work[i - 1] >= 0) {
                    temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                  } else {
                    temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                  }
                  gc = work[i - 1] / temp;
                  gs = work[i] / temp;
                  if (gc === 1) {
                    break;
                  }
                  if (gc === 0) {
                    work[i - 1] = gs * temp;
                    for (j = 1; j <= n; j = j + 1) {
                      temp = dmat[j][i - 1];
                      dmat[j][i - 1] = dmat[j][i];
                      dmat[j][i] = temp;
                    }
                  } else {
                    work[i - 1] = temp;
                    nu = gs / (1 + gc);
                    for (j = 1; j <= n; j = j + 1) {
                      temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
                      dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
                      dmat[j][i - 1] = temp;
                    }
                  }
                }
                work[l] = work[nact];
              }
            } else {
              sum = -bvec[nvl];
              for (j = 1; j <= n; j = j + 1) {
                sum = sum + sol[j] * amat[j][nvl];
              }
              if (nvl > meq) {
                work[iwsv + nvl] = sum;
              } else {
                work[iwsv + nvl] = -Math.abs(sum);
                if (sum > 0) {
                  for (j = 1; j <= n; j = j + 1) {
                    amat[j][nvl] = -amat[j][nvl];
                  }
                  bvec[nvl] = -bvec[nvl];
                }
              }
              return 700;
            }
          }
          return 0;
        }
        function fn_goto_797() {
          l = iwrm + it1 * (it1 + 1) / 2 + 1;
          l1 = l + it1;
          if (work[l1] === 0) {
            return 798;
          }
          gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
          gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
          if (work[l1 - 1] >= 0) {
            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
          } else {
            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
          }
          gc = work[l1 - 1] / temp;
          gs = work[l1] / temp;
          if (gc === 1) {
            return 798;
          }
          if (gc === 0) {
            for (i = it1 + 1; i <= nact; i = i + 1) {
              temp = work[l1 - 1];
              work[l1 - 1] = work[l1];
              work[l1] = temp;
              l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
              temp = dmat[i][it1];
              dmat[i][it1] = dmat[i][it1 + 1];
              dmat[i][it1 + 1] = temp;
            }
          } else {
            nu = gs / (1 + gc);
            for (i = it1 + 1; i <= nact; i = i + 1) {
              temp = gc * work[l1 - 1] + gs * work[l1];
              work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
              work[l1 - 1] = temp;
              l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
              temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
              dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
              dmat[i][it1] = temp;
            }
          }
          return 0;
        }
        function fn_goto_798() {
          l1 = l - it1;
          for (i = 1; i <= it1; i = i + 1) {
            work[l1] = work[l];
            l = l + 1;
            l1 = l1 + 1;
          }
          work[iwuv + it1] = work[iwuv + it1 + 1];
          iact[it1] = iact[it1 + 1];
          it1 = it1 + 1;
          if (it1 < nact) {
            return 797;
          }
          return 0;
        }
        function fn_goto_799() {
          work[iwuv + nact] = work[iwuv + nact + 1];
          work[iwuv + nact + 1] = 0;
          iact[nact] = 0;
          nact = nact - 1;
          iter[2] = iter[2] + 1;
          return 0;
        }
        go = 0;
        while (true) {
          go = fn_goto_50();
          if (go === 999) {
            return;
          }
          while (true) {
            go = fn_goto_55();
            if (go === 0) {
              break;
            }
            if (go === 999) {
              return;
            }
            if (go === 700) {
              if (it1 === nact) {
                fn_goto_799();
              } else {
                while (true) {
                  fn_goto_797();
                  go = fn_goto_798();
                  if (go !== 797) {
                    break;
                  }
                }
                fn_goto_799();
              }
            }
          }
        }
      }
      function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
        Dmat = base0to1(Dmat);
        dvec = base0to1(dvec);
        Amat = base0to1(Amat);
        var i, n, q, nact, r, crval = [], iact = [], sol = [], work = [], iter = [], message;
        meq = meq || 0;
        factorized = factorized ? base0to1(factorized) : [void 0, 0];
        bvec = bvec ? base0to1(bvec) : [];
        n = Dmat.length - 1;
        q = Amat[1].length - 1;
        if (!bvec) {
          for (i = 1; i <= q; i = i + 1) {
            bvec[i] = 0;
          }
        }
        for (i = 1; i <= q; i = i + 1) {
          iact[i] = 0;
        }
        nact = 0;
        r = Math.min(n, q);
        for (i = 1; i <= n; i = i + 1) {
          sol[i] = 0;
        }
        crval[1] = 0;
        for (i = 1; i <= 2 * n + r * (r + 5) / 2 + 2 * q + 1; i = i + 1) {
          work[i] = 0;
        }
        for (i = 1; i <= 2; i = i + 1) {
          iter[i] = 0;
        }
        qpgen2(Dmat, dvec, n, n, sol, crval, Amat, bvec, n, q, meq, iact, nact, iter, work, factorized);
        message = "";
        if (factorized[1] === 1) {
          message = "constraints are inconsistent, no solution!";
        }
        if (factorized[1] === 2) {
          message = "matrix D in quadratic function is not positive definite!";
        }
        return {
          solution: base1to0(sol),
          value: base1to0(crval),
          unconstrained_solution: base1to0(dvec),
          iterations: base1to0(iter),
          iact: base1to0(iact),
          message
        };
      }
      exports2.solveQP = solveQP;
    })(numeric);
    numeric.svd = function svd(A2) {
      var temp;
      var prec = numeric.epsilon;
      var tolerance = 1e-64 / prec;
      var itmax = 50;
      var c = 0;
      var i = 0;
      var j = 0;
      var k2 = 0;
      var l = 0;
      var u = numeric.clone(A2);
      var m = u.length;
      var n = u[0].length;
      if (m < n)
        throw "Need more rows than columns";
      var e = new Array(n);
      var q = new Array(n);
      for (i = 0; i < n; i++)
        e[i] = q[i] = 0;
      var v = numeric.rep([n, n], 0);
      function pythag(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (a > b)
          return a * Math.sqrt(1 + b * b / a / a);
        else if (b == 0)
          return a;
        return b * Math.sqrt(1 + a * a / b / b);
      }
      var f = 0;
      var g = 0;
      var h = 0;
      var x = 0;
      var y = 0;
      var z = 0;
      var s = 0;
      for (i = 0; i < n; i++) {
        e[i] = g;
        s = 0;
        l = i + 1;
        for (j = i; j < m; j++)
          s += u[j][i] * u[j][i];
        if (s <= tolerance)
          g = 0;
        else {
          f = u[i][i];
          g = Math.sqrt(s);
          if (f >= 0)
            g = -g;
          h = f * g - s;
          u[i][i] = f - g;
          for (j = l; j < n; j++) {
            s = 0;
            for (k2 = i; k2 < m; k2++)
              s += u[k2][i] * u[k2][j];
            f = s / h;
            for (k2 = i; k2 < m; k2++)
              u[k2][j] += f * u[k2][i];
          }
        }
        q[i] = g;
        s = 0;
        for (j = l; j < n; j++)
          s = s + u[i][j] * u[i][j];
        if (s <= tolerance)
          g = 0;
        else {
          f = u[i][i + 1];
          g = Math.sqrt(s);
          if (f >= 0)
            g = -g;
          h = f * g - s;
          u[i][i + 1] = f - g;
          for (j = l; j < n; j++)
            e[j] = u[i][j] / h;
          for (j = l; j < m; j++) {
            s = 0;
            for (k2 = l; k2 < n; k2++)
              s += u[j][k2] * u[i][k2];
            for (k2 = l; k2 < n; k2++)
              u[j][k2] += s * e[k2];
          }
        }
        y = Math.abs(q[i]) + Math.abs(e[i]);
        if (y > x)
          x = y;
      }
      for (i = n - 1; i != -1; i += -1) {
        if (g != 0) {
          h = g * u[i][i + 1];
          for (j = l; j < n; j++)
            v[j][i] = u[i][j] / h;
          for (j = l; j < n; j++) {
            s = 0;
            for (k2 = l; k2 < n; k2++)
              s += u[i][k2] * v[k2][j];
            for (k2 = l; k2 < n; k2++)
              v[k2][j] += s * v[k2][i];
          }
        }
        for (j = l; j < n; j++) {
          v[i][j] = 0;
          v[j][i] = 0;
        }
        v[i][i] = 1;
        g = e[i];
        l = i;
      }
      for (i = n - 1; i != -1; i += -1) {
        l = i + 1;
        g = q[i];
        for (j = l; j < n; j++)
          u[i][j] = 0;
        if (g != 0) {
          h = u[i][i] * g;
          for (j = l; j < n; j++) {
            s = 0;
            for (k2 = l; k2 < m; k2++)
              s += u[k2][i] * u[k2][j];
            f = s / h;
            for (k2 = i; k2 < m; k2++)
              u[k2][j] += f * u[k2][i];
          }
          for (j = i; j < m; j++)
            u[j][i] = u[j][i] / g;
        } else
          for (j = i; j < m; j++)
            u[j][i] = 0;
        u[i][i] += 1;
      }
      prec = prec * x;
      for (k2 = n - 1; k2 != -1; k2 += -1) {
        for (var iteration = 0; iteration < itmax; iteration++) {
          var test_convergence = false;
          for (l = k2; l != -1; l += -1) {
            if (Math.abs(e[l]) <= prec) {
              test_convergence = true;
              break;
            }
            if (Math.abs(q[l - 1]) <= prec)
              break;
          }
          if (!test_convergence) {
            c = 0;
            s = 1;
            var l1 = l - 1;
            for (i = l; i < k2 + 1; i++) {
              f = s * e[i];
              e[i] = c * e[i];
              if (Math.abs(f) <= prec)
                break;
              g = q[i];
              h = pythag(f, g);
              q[i] = h;
              c = g / h;
              s = -f / h;
              for (j = 0; j < m; j++) {
                y = u[j][l1];
                z = u[j][i];
                u[j][l1] = y * c + z * s;
                u[j][i] = -y * s + z * c;
              }
            }
          }
          z = q[k2];
          if (l == k2) {
            if (z < 0) {
              q[k2] = -z;
              for (j = 0; j < n; j++)
                v[j][k2] = -v[j][k2];
            }
            break;
          }
          if (iteration >= itmax - 1)
            throw "Error: no convergence.";
          x = q[l];
          y = q[k2 - 1];
          g = e[k2 - 1];
          h = e[k2];
          f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
          g = pythag(f, 1);
          if (f < 0)
            f = ((x - z) * (x + z) + h * (y / (f - g) - h)) / x;
          else
            f = ((x - z) * (x + z) + h * (y / (f + g) - h)) / x;
          c = 1;
          s = 1;
          for (i = l + 1; i < k2 + 1; i++) {
            g = e[i];
            y = q[i];
            h = s * g;
            g = c * g;
            z = pythag(f, h);
            e[i - 1] = z;
            c = f / z;
            s = h / z;
            f = x * c + g * s;
            g = -x * s + g * c;
            h = y * s;
            y = y * c;
            for (j = 0; j < n; j++) {
              x = v[j][i - 1];
              z = v[j][i];
              v[j][i - 1] = x * c + z * s;
              v[j][i] = -x * s + z * c;
            }
            z = pythag(f, h);
            q[i - 1] = z;
            c = f / z;
            s = h / z;
            f = c * g + s * y;
            x = -s * g + c * y;
            for (j = 0; j < m; j++) {
              y = u[j][i - 1];
              z = u[j][i];
              u[j][i - 1] = y * c + z * s;
              u[j][i] = -y * s + z * c;
            }
          }
          e[l] = 0;
          e[k2] = f;
          q[k2] = x;
        }
      }
      for (i = 0; i < q.length; i++)
        if (q[i] < prec)
          q[i] = 0;
      for (i = 0; i < n; i++) {
        for (j = i - 1; j >= 0; j--) {
          if (q[j] < q[i]) {
            c = q[j];
            q[j] = q[i];
            q[i] = c;
            for (k2 = 0; k2 < u.length; k2++) {
              temp = u[k2][i];
              u[k2][i] = u[k2][j];
              u[k2][j] = temp;
            }
            for (k2 = 0; k2 < v.length; k2++) {
              temp = v[k2][i];
              v[k2][i] = v[k2][j];
              v[k2][j] = temp;
            }
            i = j;
          }
        }
      }
      return { U: u, S: q, V: v };
    };
  }
});

// node_modules/spherical-harmonic-transform/src/index.js
var require_src = __commonJS({
  "node_modules/spherical-harmonic-transform/src/index.js"(exports2, module2) {
    var numeric4 = require_numeric_1_2_6();
    var forwardSHT = function(N, data, CART_OR_SPH, DIRECT_OR_PINV) {
      var Ndirs = data.length, Nsh = (N + 1) * (N + 1);
      var invY_N;
      var mag = [,];
      if (Nsh > Ndirs) {
        console.log("The SHT degree is too high for the number of data points");
      }
      if (CART_OR_SPH == 0)
        data = convertCart2Sph(data);
      for (var i = 0; i < data.length; i++) {
        mag[i] = data[i][2];
      }
      Y_N = computeRealSH(N, data);
      if (DIRECT_OR_PINV == 0) {
        invY_N = numeric4.mul(1 / Ndirs, Y_N);
      } else {
        invY_N = pinv_direct(numeric4.transpose(Y_N));
      }
      var coeffs = numeric4.dotMV(invY_N, mag);
      return coeffs;
    };
    var inverseSHT = function(coeffs, aziElev) {
      var aziElevR = aziElev;
      var N = Math.sqrt(coeffs.length) - 1;
      var Y_N2 = computeRealSH(N, aziElev);
      var data = numeric4.dotVM(coeffs, Y_N2);
      for (var i = 0; i < aziElev.length; i++) {
        aziElevR[i][2] = data[i];
      }
      return aziElevR;
    };
    var print2Darray = function(array2D) {
      for (var q = 0; q < array2D.length; q++)
        console.log(array2D[q]);
    };
    var convertCart2Sph = function(xyz, OMIT_MAG) {
      var azi, elev, r;
      var aziElevR = new Array(xyz.length);
      for (var i = 0; i < xyz.length; i++) {
        azi = Math.atan2(xyz[i][1], xyz[i][0]);
        elev = Math.atan2(xyz[i][2], Math.sqrt(xyz[i][0] * xyz[i][0] + xyz[i][1] * xyz[i][1]));
        if (OMIT_MAG == 1) {
          aziElevR[i] = [azi, elev];
        } else {
          r = Math.sqrt(xyz[i][0] * xyz[i][0] + xyz[i][1] * xyz[i][1] + xyz[i][2] * xyz[i][2]);
          aziElevR[i] = [azi, elev, r];
        }
      }
      return aziElevR;
    };
    var convertSph2Cart = function(aziElevR) {
      var x, y, z;
      var xyz = new Array(aziElevR.length);
      for (var i = 0; i < aziElevR.length; i++) {
        x = Math.cos(aziElevR[i][0]) * Math.cos(aziElevR[i][1]);
        y = Math.sin(aziElevR[i][0]) * Math.cos(aziElevR[i][1]);
        z = Math.sin(aziElevR[i][1]);
        if (aziElevR[0].length == 2)
          xyz[i] = [x, y, z];
        else if (aziElevR[0].length == 3)
          xyz[i] = [aziElevR[i][2] * x, aziElevR[i][2] * y, aziElevR[i][2] * z];
      }
      return xyz;
    };
    var computeRealSH = function(N, data) {
      var azi = new Array(data.length);
      var elev = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        azi[i] = data[i][0];
        elev[i] = data[i][1];
      }
      var factorials = new Array(2 * N + 1);
      var Ndirs = azi.length;
      var Nsh = (N + 1) * (N + 1);
      var leg_n_minus1 = 0;
      var leg_n_minus2 = 0;
      var leg_n;
      var sinel = numeric4.sin(elev);
      var index_n = 0;
      var Y_N2 = new Array(Nsh);
      var Nn0, Nnm;
      var cosmazi, sinmazi;
      for (var i = 0; i < 2 * N + 1; i++)
        factorials[i] = factorial(i);
      for (var n = 0; n < N + 1; n++) {
        if (n == 0) {
          var temp0 = new Array(azi.length);
          temp0.fill(1);
          Y_N2[n] = temp0;
          index_n = 1;
        } else {
          leg_n = recurseLegendrePoly(n, sinel, leg_n_minus1, leg_n_minus2);
          Nn0 = Math.sqrt(2 * n + 1);
          for (var m = 0; m < n + 1; m++) {
            if (m == 0)
              Y_N2[index_n + n] = numeric4.mul(Nn0, leg_n[m]);
            else {
              Nnm = Nn0 * Math.sqrt(2 * factorials[n - m] / factorials[n + m]);
              cosmazi = numeric4.cos(numeric4.mul(m, azi));
              sinmazi = numeric4.sin(numeric4.mul(m, azi));
              Y_N2[index_n + n - m] = numeric4.mul(Nnm, numeric4.mul(leg_n[m], sinmazi));
              Y_N2[index_n + n + m] = numeric4.mul(Nnm, numeric4.mul(leg_n[m], cosmazi));
            }
          }
          index_n = index_n + 2 * n + 1;
        }
        leg_n_minus2 = leg_n_minus1;
        leg_n_minus1 = leg_n;
      }
      return Y_N2;
    };
    var factorial = function(n) {
      if (n === 0)
        return 1;
      return n * factorial(n - 1);
    };
    var recurseLegendrePoly = function(n, x, Pnm_minus1, Pnm_minus2) {
      var Pnm = new Array(n + 1);
      switch (n) {
        case 1:
          var x2 = numeric4.mul(x, x);
          var P10 = x;
          var P11 = numeric4.sqrt(numeric4.sub(1, x2));
          Pnm[0] = P10;
          Pnm[1] = P11;
          break;
        case 2:
          var x2 = numeric4.mul(x, x);
          var P20 = numeric4.mul(3, x2);
          P20 = numeric4.sub(P20, 1);
          P20 = numeric4.div(P20, 2);
          var P21 = numeric4.sub(1, x2);
          P21 = numeric4.sqrt(P21);
          P21 = numeric4.mul(3, P21);
          P21 = numeric4.mul(P21, x);
          var P22 = numeric4.sub(1, x2);
          P22 = numeric4.mul(3, P22);
          Pnm[0] = P20;
          Pnm[1] = P21;
          Pnm[2] = P22;
          break;
        default:
          var x2 = numeric4.mul(x, x);
          var one_min_x2 = numeric4.sub(1, x2);
          var k2 = 2 * n - 1;
          var dfact_k = 1;
          if (k2 % 2 == 0) {
            for (var kk = 1; kk < k2 / 2 + 1; kk++)
              dfact_k = dfact_k * 2 * kk;
          } else {
            for (var kk = 1; kk < (k2 + 1) / 2 + 1; kk++)
              dfact_k = dfact_k * (2 * kk - 1);
          }
          Pnm[n] = numeric4.mul(dfact_k, numeric4.pow(one_min_x2, n / 2));
          Pnm[n - 1] = numeric4.mul(2 * n - 1, numeric4.mul(x, Pnm_minus1[n - 1]));
          for (var m = 0; m < n - 1; m++) {
            var temp1 = numeric4.mul(2 * n - 1, numeric4.mul(x, Pnm_minus1[m]));
            var temp2 = numeric4.mul(n + m - 1, Pnm_minus2[m]);
            Pnm[m] = numeric4.div(numeric4.sub(temp1, temp2), n - m);
          }
      }
      return Pnm;
    };
    var pinv_svd = function(A2) {
      var z = numeric4.svd(A2), foo = z.S[0];
      var U2 = z.U, S = z.S, V2 = z.V;
      var m = A2.length, n = A2[0].length, tol = Math.max(m, n) * numeric4.epsilon * foo, M = S.length;
      var Sinv = new Array(M);
      for (var i = M - 1; i !== -1; i--) {
        if (S[i] > tol)
          Sinv[i] = 1 / S[i];
        else
          Sinv[i] = 0;
      }
      return numeric4.dot(numeric4.dot(V2, numeric4.diag(Sinv)), numeric4.transpose(U2));
    };
    var pinv_direct = function(A2) {
      var AT = numeric4.transpose(A2);
      return numeric4.dot(numeric4.inv(numeric4.dot(AT, A2)), AT);
    };
    var getSHrotMtx2 = function(Rxyz, L) {
      var Nsh = (L + 1) * (L + 1);
      var R = numeric4.rep([Nsh, Nsh], 0);
      R[0][0] = 1;
      var R_1 = numeric4.rep([3, 3], 0);
      R_1[0][0] = Rxyz[1][1];
      R_1[0][1] = Rxyz[1][2];
      R_1[0][2] = Rxyz[1][0];
      R_1[1][0] = Rxyz[2][1];
      R_1[1][1] = Rxyz[2][2];
      R_1[1][2] = Rxyz[2][0];
      R_1[2][0] = Rxyz[0][1];
      R_1[2][1] = Rxyz[0][2];
      R_1[2][2] = Rxyz[0][0];
      R = numeric4.setBlock(R, [1, 1], [3, 3], R_1);
      var R_lm1 = R_1;
      var band_idx = 3;
      for (var l = 2; l < L + 1; l++) {
        var R_l = numeric4.rep([2 * l + 1, 2 * l + 1], 0);
        for (var m = -l; m < l + 1; m++) {
          for (var n = -l; n < l + 1; n++) {
            var d, denom, u, v, w;
            if (m == 0)
              d = 1;
            else
              d = 0;
            if (Math.abs(n) == l)
              denom = 2 * l * (2 * l - 1);
            else
              denom = l * l - n * n;
            u = Math.sqrt((l * l - m * m) / denom);
            v = Math.sqrt((1 + d) * (l + Math.abs(m) - 1) * (l + Math.abs(m)) / denom) * (1 - 2 * d) * 0.5;
            w = Math.sqrt((l - Math.abs(m) - 1) * (l - Math.abs(m)) / denom) * (1 - d) * -0.5;
            if (u != 0)
              u = u * U(l, m, n, R_1, R_lm1);
            if (v != 0)
              v = v * V(l, m, n, R_1, R_lm1);
            if (w != 0)
              w = w * W(l, m, n, R_1, R_lm1);
            R_l[m + l][n + l] = u + v + w;
          }
        }
        R = numeric4.setBlock(R, [band_idx + 1, band_idx + 1], [band_idx + 2 * l + 1, band_idx + 2 * l + 1], R_l);
        R_lm1 = R_l;
        band_idx = band_idx + 2 * l + 1;
      }
      return R;
    };
    function U(l, m, n, R_1, R_lm1) {
      return P(0, l, m, n, R_1, R_lm1);
    }
    function V(l, m, n, R_1, R_lm1) {
      var p0, p1, ret, d;
      if (m == 0) {
        p0 = P(1, l, 1, n, R_1, R_lm1);
        p1 = P(-1, l, -1, n, R_1, R_lm1);
        ret = p0 + p1;
      } else if (m > 0) {
        if (m == 1)
          d = 1;
        else
          d = 0;
        p0 = P(1, l, m - 1, n, R_1, R_lm1);
        p1 = P(-1, l, -m + 1, n, R_1, R_lm1);
        ret = p0 * Math.sqrt(1 + d) - p1 * (1 - d);
      } else {
        if (m == -1)
          d = 1;
        else
          d = 0;
        p0 = P(1, l, m + 1, n, R_1, R_lm1);
        p1 = P(-1, l, -m - 1, n, R_1, R_lm1);
        ret = p0 * (1 - d) + p1 * Math.sqrt(1 + d);
      }
      return ret;
    }
    function W(l, m, n, R_1, R_lm1) {
      var p0, p1, ret;
      if (m == 0) {
        console.error("should not be called");
      } else {
        if (m > 0) {
          p0 = P(1, l, m + 1, n, R_1, R_lm1);
          p1 = P(-1, l, -m - 1, n, R_1, R_lm1);
          ret = p0 + p1;
        } else {
          p0 = P(1, l, m - 1, n, R_1, R_lm1);
          p1 = P(-1, l, -m + 1, n, R_1, R_lm1);
          ret = p0 - p1;
        }
      }
      return ret;
    }
    function P(i, l, a, b, R_1, R_lm1) {
      var ri1, rim1, ri0, ret;
      ri1 = R_1[i + 1][1 + 1];
      rim1 = R_1[i + 1][-1 + 1];
      ri0 = R_1[i + 1][0 + 1];
      if (b == -l) {
        ret = ri1 * R_lm1[a + l - 1][0] + rim1 * R_lm1[a + l - 1][2 * l - 2];
      } else {
        if (b == l)
          ret = ri1 * R_lm1[a + l - 1][2 * l - 2] - rim1 * R_lm1[a + l - 1][0];
        else
          ret = ri0 * R_lm1[a + l - 1][b + l - 1];
      }
      return ret;
    }
    var yawPitchRoll2Rzyx2 = function(yaw, pitch, roll) {
      var Rx, Ry, Rz;
      if (roll == 0)
        Rx = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      else
        Rx = [[1, 0, 0], [0, Math.cos(roll), Math.sin(roll)], [0, -Math.sin(roll), Math.cos(roll)]];
      if (pitch == 0)
        Ry = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      else
        Ry = [[Math.cos(pitch), 0, -Math.sin(pitch)], [0, 1, 0], [Math.sin(pitch), 0, Math.cos(pitch)]];
      if (yaw == 0)
        Rz = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      else
        Rz = [[Math.cos(yaw), Math.sin(yaw), 0], [-Math.sin(yaw), Math.cos(yaw), 0], [0, 0, 1]];
      var R = numeric4.dotMMsmall(Ry, Rz);
      R = numeric4.dotMMsmall(Rx, R);
      return R;
    };
    module2.exports.forwardSHT = forwardSHT;
    module2.exports.inverseSHT = inverseSHT;
    module2.exports.print2Darray = print2Darray;
    module2.exports.convertCart2Sph = convertCart2Sph;
    module2.exports.convertSph2Cart = convertSph2Cart;
    module2.exports.computeRealSH = computeRealSH;
    module2.exports.factorial = factorial;
    module2.exports.recurseLegendrePoly = recurseLegendrePoly;
    module2.exports.pinv_svd = pinv_svd;
    module2.exports.pinv_direct = pinv_direct;
    module2.exports.getSHrotMtx = getSHrotMtx2;
    module2.exports.yawPitchRoll2Rzyx = yawPitchRoll2Rzyx2;
  }
});

// node_modules/hoast360/dependencies/HoastRotator.js
var jshlib = __toESM(require_src());
var numeric2 = __toESM(require_numeric_1_2_6());
var HOASTRotator = class {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = (order + 1) * (order + 1);
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.rotMtx = numeric2.identity(this.nCh);
    this.rotMtxNodes = new Array(this.order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    for (var n = 1; n <= this.order; n++) {
      var gains_n = new Array(2 * n + 1);
      for (var i = 0; i < 2 * n + 1; i++) {
        gains_n[i] = new Array(2 * n + 1);
        for (var j = 0; j < 2 * n + 1; j++) {
          gains_n[i][j] = this.ctx.createGain();
          if (i == j)
            gains_n[i][j].gain.value = 1;
          else
            gains_n[i][j].gain.value = 0;
        }
      }
      this.rotMtxNodes[n - 1] = gains_n;
    }
    this.in.connect(this.out, 0, 0);
    var band_idx = 1;
    for (n = 1; n <= this.order; n++) {
      for (i = 0; i < 2 * n + 1; i++) {
        for (j = 0; j < 2 * n + 1; j++) {
          this.in.connect(this.rotMtxNodes[n - 1][i][j], band_idx + j, 0);
          this.rotMtxNodes[n - 1][i][j].connect(this.out, 0, band_idx + i);
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }
  updateRotMtx() {
    var yaw = this.yaw * Math.PI / 180;
    var pitch = this.pitch * Math.PI / 180;
    var roll = this.roll * Math.PI / 180;
    this.rotMtx = jshlib.getSHrotMtx(jshlib.yawPitchRoll2Rzyx(yaw, pitch, roll), this.order);
    var band_idx = 1;
    for (let n = 1; n < this.order + 1; n++) {
      for (let i = 0; i < 2 * n + 1; i++) {
        for (let j = 0; j < 2 * n + 1; j++) {
          this.rotMtxNodes[n - 1][i][j].gain.value = this.rotMtx[band_idx + i][band_idx + j];
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }
  updateRotationFromCamera(matrix4) {
    this.rotMtx = jshlib.getSHrotMtx([
      [matrix4[10], matrix4[8], matrix4[9]],
      [matrix4[2], matrix4[0], matrix4[1]],
      [matrix4[6], matrix4[4], matrix4[5]]
    ], this.order);
    var band_idx = 1;
    for (let n = 1; n < this.order + 1; n++) {
      for (let i = 0; i < 2 * n + 1; i++) {
        for (let j = 0; j < 2 * n + 1; j++) {
          this.rotMtxNodes[n - 1][i][j].gain.value = this.rotMtx[band_idx + i][band_idx + j];
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }
};

// node_modules/hoast360/dependencies/MatrixMultiplier.js
var numeric3 = __toESM(require_numeric_1_2_6());
var MatrixMultiplier = class {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = (order + 1) * (order + 1);
    this.mtx = numeric3.identity(this.nCh);
    this.bypassed = false;
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gain = new Array(this.nCh);
    for (var row = 0; row < this.nCh; row++) {
      this.gain[row] = new Array(this.nCh);
      for (var col = 0; col < this.nCh; col++) {
        this.gain[row][col] = this.ctx.createGain();
        this.gain[row][col].gain.value = this.mtx[row][col];
        this.in.connect(this.gain[row][col], col, 0);
        this.gain[row][col].connect(this.out, 0, row);
      }
    }
  }
  updateMtx(mtx) {
    if (this.bypassed)
      return;
    this.mtx = mtx;
    for (var row = 0; row < this.nCh; row++) {
      for (var col = 0; col < this.nCh; col++) {
        this.gain[row][col].gain.value = this.mtx[row][col];
      }
    }
  }
  bypass(shouldBeActive) {
    if (shouldBeActive) {
      this.updateMtx(numeric3.identity(this.nCh));
      this.bypassed = true;
    } else {
      this.bypassed = false;
    }
  }
  printGainMtx() {
    console.log(this);
  }
};

// node_modules/hoast360/dependencies/HoastBinauralDecoder.js
var HOASTBinDecoder = class {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = (order + 1) * (order + 1);
    this.decFilters = new Array(this.nCh);
    this.decFilterNodes = new Array(this.nCh);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(2);
    this.out.channelCountMode = "explicit";
    this.out.channelCount = 1;
    this.gainMid = this.ctx.createGain();
    this.gainSide = this.ctx.createGain();
    this.invertSide = this.ctx.createGain();
    this.gainMid.gain.value = 1;
    this.gainSide.gain.value = 1;
    this.invertSide.gain.value = -1;
    for (let i = 0; i < this.nCh; i++) {
      this.decFilterNodes[i] = this.ctx.createConvolver();
      this.decFilterNodes[i].normalize = false;
    }
    this.resetFilters();
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.decFilterNodes[i], i, 0);
      var n = Math.floor(Math.sqrt(i));
      var m = i - n * n - n;
      if (m >= 0)
        this.decFilterNodes[i].connect(this.gainMid);
      else
        this.decFilterNodes[i].connect(this.gainSide);
    }
    this.gainMid.connect(this.out, 0, 0);
    this.gainSide.connect(this.out, 0, 0);
    this.gainMid.connect(this.out, 0, 1);
    this.gainSide.connect(this.invertSide, 0, 0);
    this.invertSide.connect(this.out, 0, 1);
    this.initialized = true;
  }
  updateFilters(foaBuffer, hoaBuffer) {
    for (let i = 0; i < 4; ++i) {
      this.decFilters[i] = this.ctx.createBuffer(1, foaBuffer.length, foaBuffer.sampleRate);
      this.decFilters[i].getChannelData(0).set(foaBuffer.getChannelData(i));
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
    for (let i = 4; i < this.nCh; ++i) {
      this.decFilters[i] = this.ctx.createBuffer(1, hoaBuffer.length, hoaBuffer.sampleRate);
      this.decFilters[i].getChannelData(0).set(hoaBuffer.getChannelData(i - 4));
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
  resetFilters() {
    var cardGains = new Array(this.nCh);
    cardGains.fill(0);
    cardGains[0] = 0.5;
    cardGains[1] = 0.5 / Math.sqrt(3);
    for (var i = 0; i < this.nCh; i++) {
      this.decFilters[i] = this.ctx.createBuffer(1, 64, this.ctx.sampleRate);
      for (var j = 0; j < 64; j++) {
        this.decFilters[i].getChannelData(0)[j] = 0;
      }
      this.decFilters[i].getChannelData(0)[0] = cardGains[i];
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
};

// node_modules/hoast360/dependencies/HoastLoader.js
var HOASTloader = class {
  constructor(context, order, url, callback) {
    this.context = context;
    this.order = order;
    this.nCh = (order + 1) * (order + 1);
    this.buffers = new Array();
    this.loadCount = 0;
    this.loaded = false;
    this.onLoad = callback;
    var fileExt = url.slice(url.length - 3, url.length);
    this.fileExt = fileExt;
    var fileBaseName = url.slice(0, url.length - 4);
    switch (this.order) {
      case 1:
        this.nChGroups = 1;
        this.urls = new Array(this.nChGroups);
        this.urls[0] = fileBaseName + "_01-04ch." + fileExt;
        break;
      case 2:
        this.nChGroups = 2;
        this.urls = new Array(this.nChGroups);
        this.urls[0] = fileBaseName + "_01-04ch." + fileExt;
        this.urls[1] = fileBaseName + "_05-09ch." + fileExt;
        break;
      case 3:
        this.nChGroups = 3;
        this.urls = new Array(this.nChGroups);
        this.urls[0] = fileBaseName + "_01-04ch." + fileExt;
        this.urls[1] = fileBaseName + "_05-12ch." + fileExt;
        this.urls[2] = fileBaseName + "_13-16ch." + fileExt;
        break;
      case 4:
        this.nChGroups = 4;
        this.urls = new Array(this.nChGroups);
        this.urls[0] = fileBaseName + "_01-04ch." + fileExt;
        this.urls[1] = fileBaseName + "_05-12ch." + fileExt;
        this.urls[2] = fileBaseName + "_13-20ch." + fileExt;
        this.urls[3] = fileBaseName + "_21-25ch." + fileExt;
        break;
      default:
        console.error("HOASTloader: unsupported Ambisonics order!");
        break;
    }
  }
  loadBuffers(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var scope = this;
    request.onload = function() {
      scope.context.decodeAudioData(request.response, function(buffer) {
        if (!buffer) {
          alert("error decoding file data: " + url);
          return;
        }
        scope.buffers[index] = buffer;
        scope.loadCount++;
        if (scope.loadCount == scope.nChGroups) {
          scope.loaded = true;
          scope.concatBuffers();
          console.log("HOASTloader: all buffers loaded and concatenated");
          scope.onLoad(scope.foaBuffer, scope.hoaBuffer);
        }
      }, function(error) {
        alert("Browser cannot decode audio data:  " + url + "\n\nError: " + error + "\n\n(If you re using Safari and get a null error, this is most likely due to Apple's shady plan going on to stop the .ogg format from easing web developer's life :)");
      });
    };
    request.onerror = function() {
      alert("HOASTloader: XHR error");
    };
    request.send();
  }
  load() {
    for (var i = 0; i < this.nChGroups; ++i)
      this.loadBuffers(this.urls[i], i);
  }
  concatBuffers() {
    if (!this.loaded)
      return;
    var nCh = this.nCh;
    var nChGroups = this.nChGroups;
    this.foaBuffer = this.buffers[0];
    if (this.order === 1)
      return;
    var hoalength = 0;
    for (let i2 = 1; i2 < this.nChGroups; ++i2)
      hoalength = Math.max(hoalength, this.buffers[i2].length);
    var srate = this.buffers[1].sampleRate;
    this.hoaBuffer = this.context.createBuffer(nCh - 4, hoalength, srate);
    for (var i = 1; i < nChGroups; i++) {
      for (var j = 0; j < this.buffers[i].numberOfChannels; j++) {
        this.hoaBuffer.getChannelData((i - 1) * 8 + j).set(this.buffers[i].getChannelData(0));
      }
    }
  }
};

// js/hoast360-player-es6.js
window.initHOAST360 = async (audioContext, audioElement) => {
  return new Promise((resolve, reject) => {
    console.log("Init HOAST360");
    const order = 2;
    const numCh = 9;
    const rotator = new HOASTRotator(audioContext, order);
    console.log(rotator);
    const multiplier = new MatrixMultiplier(audioContext, 4);
    console.log(multiplier);
    decoder = new HOASTBinDecoder(audioContext, order);
    console.log(decoder);
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 1.5;
    const source = audioContext.createMediaElementSource(audioElement);
    source.channelCount = numCh;
    source.connect(rotator.in);
    rotator.out.connect(decoder.in);
    decoder.out.connect(masterGain);
    masterGain.connect(audioContext.destination);
    const setOrientation = (yaw, pitch, roll) => {
      rotator.yaw = yaw;
      rotator.pitch = pitch;
      rotator.roll = roll;
      rotator.updateRotMtx();
    };
    const loader_filters = new HOASTloader(audioContext, order, "resources/hoast_o2.wav", (foaBuffer, hoaBuffer) => {
      console.log("Filters loaded");
      resolve({
        setOrientation
      });
    });
    loader_filters.load();
  });
};
