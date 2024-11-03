!function() {
    "use strict";
    var a = window.location
      , r = window.document
      , t = r.currentScript
      , o = t.getAttribute("data-api") || new URL(t.src).origin + "/api/event"
      , l = t.getAttribute("data-domain");
    function s(t, e) {
        t && console.warn("Ignoring Event: " + t),
        e && e.callback && e.callback()
    }
    function e(t, e) {
        if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) || "file:" === a.protocol)
            return s("localhost", e);
        if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible)
            return s(null, e);
        try {
            if ("true" === window.localStorage.plausible_ignore)
                return s("localStorage flag", e)
        } catch (t) {}
        var n = {}
          , i = (n.n = t,
        n.u = a.href,
        n.d = l,
        n.r = r.referrer || null,
        e && e.meta && (n.m = JSON.stringify(e.meta)),
        e && e.props && (n.p = e.props),
        n.h = 1,
        new XMLHttpRequest);
        i.open("POST", o, !0),
        i.setRequestHeader("Content-Type", "text/plain"),
        i.send(JSON.stringify(n)),
        i.onreadystatechange = function() {
            4 === i.readyState && e && e.callback && e.callback({
                status: i.status
            })
        }
    }
    var n = window.plausible && window.plausible.q || [];
    window.plausible = e;
    for (var i, c = 0; c < n.length; c++)
        e.apply(this, n[c]);
    function w() {
        i = a.pathname,
        e("pageview")
    }
    window.addEventListener("hashchange", function() {
        w()
    }),
    "prerender" === r.visibilityState ? r.addEventListener("visibilitychange", function() {
        i || "visible" !== r.visibilityState || w()
    }) : w()
}();
