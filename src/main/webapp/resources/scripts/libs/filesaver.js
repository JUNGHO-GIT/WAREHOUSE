var saveAs =
  saveAs ||
  (typeof navigator !== "undefined" &&
    navigator.msSaveOrOpenBlob &&
    navigator.msSaveOrOpenBlob.bind(navigator)) ||
  (function (e) {
    "use strict";
    if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
      return;
    }
    var t = e.document,
      n = function () {
        return e.URL || e.webkitURL || e;
      },
      r = e.URL || e.webkitURL || e,
      o = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
      i = !e.externalHost && "download" in o,
      a = function (n) {
        var r = t.createEvent("MouseEvents");
        r.initMouseEvent(
          "click",
          true,
          false,
          e,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null,
        );
        n.dispatchEvent(r);
      },
      f = e.webkitRequestFileSystem,
      s = e.requestFileSystem || f || e.mozRequestFileSystem,
      l = function (t) {
        (e.setImmediate || e.setTimeout)(function () {
          throw t;
        }, 0);
      },
      u = "application/octet-stream",
      c = 0,
      d = [],
      v = function () {
        var e = d.length;
        while (e--) {
          var t = d[e];
          if (typeof t === "string") {
            r.revokeObjectURL(t);
          }
          else {
            t.remove();
          }
        }
        d.length = 0;
      },
      w = function (e, t, n) {
        t = [].concat(t);
        var r = t.length;
        while (r--) {
          var o = e["on" + t[r]];
          if (typeof o === "function ") {
            try {
              o.call(e, n || e);
            }

            catch (e) {
              l(e);
            }
          }
        }
      },
      p = function (r, a) {
        var l = this,
          v = r.type,
          p = false,
          h,
          y,
          E = function () {
            var e = n().createObjectURL(r);
            d.push(e);
            return e;
          },
          m = function () {
            w(l, "writestart progress write writeend".split(" "));
          },
          g = function () {
            if (p || !h) {
              h = E(r);
            }
            if (y) {
              y.location.href = h;
            }
            else {
              window.open(h, "_blank");
            }
            l.readyState = l.DONE;
            m();
          },
          R = function (e) {
            return function () {
              if (l.readyState !== l.DONE) {
                return e.apply(this, arguments);
              }
            };
          },
          S = {create: true, exclusive: false},
          O;
        l.readyState = l.INIT;
        if (!a) {
          a = "download";
        }
        if (i) {
          h = E(r);
          t = e.document;
          o = t.createElementNS("http://www.w3.org/1999/xhtml", "a");
          o.href = h;
          o.download = a;
          var b = t.createEvent("MouseEvents");
          b.initMouseEvent(
            "click",
            true,
            false,
            e,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null,
          );
          o.dispatchEvent(b);
          l.readyState = l.DONE;
          m();
          return;
        }
        if (e.chrome && v && v !== u) {
          O = r.slice || r.webkitSlice;
          r = O.call(r, 0, r.size, u);
          p = true;
        }
        if (f && a !== "download") {
          a += ".download";
        }
        if (v === u || f) {
          y = e;
        }
        if (!s) {
          g();
          return;
        }
        c += r.size;
        s(
          e.TEMPORARY,
          c,
          R(function (e) {
            e.root.getDirectory(
              "saved",
              S,
              R(function (e) {
                var t = function () {
                  e.getFile(
                    a,
                    S,
                    R(function (e) {
                      e.createWriter(
                        R(function (t) {
                          t.onwriteend = function (t) {
                            y.location.href = e.toURL();
                            d.push(e);
                            l.readyState = l.DONE;
                            w(l, "writeend", t);
                          };
                          t.onerror = function () {
                            var e = t.error;
                            if (e.code !== e.ABORT_ERR) {
                              g();
                            }
                          };
                          "writestart progress write abort".split(" ").forEach(function (e) {
                            t["on" + e] = l["on" + e];
                          });
                          t.write(r);
                          l.abort = function () {
                            t.abort();
                            l.readyState = l.DONE;
                          };
                          l.readyState = l.WRITING;
                        }),
                        g,
                      );
                    }),
                    g,
                  );
                };
                e.getFile(
                  a,
                  {create: false},
                  R(function (e) {
                    e.remove();
                    t();
                  }),
                  R(function (e) {
                    if (e.code === e.NOT_FOUND_ERR) {
                      t();
                    }
                    else {
                      g();
                    }
                  }),
                );
              }),
              g,
            );
          }),
          g,
        );
      },
      h = p.prototype,
      y = function (e, t) {
        return new p(e, t);
      };
    h.abort = function () {
      var e = this;
      e.readyState = e.DONE;
      w(e, "abort");
    };
    h.readyState = h.INIT = 0;
    h.WRITING = 1;
    h.DONE = 2;
    h.error =
      h.onwritestart =
      h.onprogress =
      h.onwrite =
      h.onabort =
      h.onerror =
      h.onwriteend =
      null;
    e.addEventListener("unload", v, false);
    y.unload = function () {
      v();
      e.removeEventListener("unload", v, false);
    };
    return y;
  })(
    (typeof self !== "undefined" && self) ||
    (typeof window !== "undefined" && window) ||
    this.content,
  );
if (typeof module !== "undefined") module.exports = saveAs;
