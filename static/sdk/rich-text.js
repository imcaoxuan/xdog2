;/*!node_modules/froala-editor/js/froala_editor.min.js*/
amis.define('6068935', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.FroalaEditor = t()
    }(this, function () {
        "use strict";

        function M(e) {
            return (M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function (e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (t.matches(e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; 0 <= --n && t.item(n) !== this;) ;
            return -1 < n
        }), Array.isArray || (Array.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function (e, t) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(e), r = 1; r < arguments.length; r++) {
                    var o = arguments[r];
                    if (null != o) for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
                }
                return n
            }, writable: !0, configurable: !0
        }), function () {
            var a = /^\s*:scope/gi, s = /,\s*:scope/gi, l = document.createElement("div");

            function e(e, t) {
                var i = e[t];
                e[t] = function (e) {
                    var t, n = !1, r = !1;
                    if (e && (e.match(a) || e.match(s))) {
                        this.parentNode || (l.appendChild(this), r = !0);
                        var o = this.parentNode;
                        return this.id || (this.id = "rootedQuerySelector_id_".concat((new Date).getTime()), n = !0), t = i.call(o, e.replace(a, "#".concat(this.id)).replace(s, ",#".concat(this.id))), n && (this.id = ""), r && l.removeChild(this), t
                    }
                    return i.call(this, e)
                }
            }

            try {
                l.querySelectorAll(":scope *")
            } catch (t) {
                e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll")
            }
        }();

        function V(e, t, n) {
            if ("string" != typeof e) return new V.Bootstrap(e, t, n);
            var r = document.querySelectorAll(e);
            t && t.iframe_document && (r = t.iframe_document.querySelectorAll(e));
            for (var o = [], i = 0; i < r.length; i++) {
                var a = r[i]["data-froala.editor"];
                a ? o.push(a) : o.push(new V.Bootstrap(r[i], t, n))
            }
            return 1 == o.length ? o[0] : o
        }

        V.RegisterPlugins = function (e) {
            for (var t = 0; t < e.length; t++) e[t].call(V)
        }, Object.assign(V, {
            DEFAULTS: {initOnClick: !1, pluginsEnabled: null},
            MODULES: {},
            PLUGINS: {},
            VERSION: "3.1.0",
            INSTANCES: [],
            OPTS_MAPPING: {},
            SHARED: {},
            ID: 0
        }), V.MODULES.node = function (a) {
            var n = a.$;

            function s(e) {
                return e && "IFRAME" !== e.tagName ? Array.prototype.slice.call(e.childNodes || []) : []
            }

            function l(e) {
                return !!e && (e.nodeType === Node.ELEMENT_NODE && 0 <= V.BLOCK_TAGS.indexOf(e.tagName.toLowerCase()))
            }

            function c(e) {
                var t = {}, n = e.attributes;
                if (n) for (var r = 0; r < n.length; r++) {
                    var o = n[r];
                    t[o.nodeName] = o.value
                }
                return t
            }

            function t(e) {
                for (var t = "", n = c(e), r = Object.keys(n).sort(), o = 0; o < r.length; o++) {
                    var i = r[o], a = n[i];
                    a.indexOf("'") < 0 && 0 <= a.indexOf('"') ? t += " ".concat(i, "='").concat(a, "'") : (0 <= a.indexOf('"') && 0 <= a.indexOf("'") && (a = a.replace(/"/g, "&quot;")), t += " ".concat(i, '="').concat(a, '"'))
                }
                return t
            }

            function r(e) {
                return e === a.el
            }

            return {
                isBlock: l, isEmpty: function d(e, t) {
                    if (!e) return !0;
                    if (e.querySelector("table")) return !1;
                    var n = s(e);
                    1 === n.length && l(n[0]) && (n = s(n[0]));
                    for (var r = !1, o = 0; o < n.length; o++) {
                        var i = n[o];
                        if (!(t && a.node.hasClass(i, "fr-marker") || i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length)) {
                            if ("BR" !== i.tagName && 0 < (i.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1;
                            if (r) return !1;
                            "BR" === i.tagName && (r = !0)
                        }
                    }
                    return !(e.querySelectorAll(V.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector("".concat(a.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || 1 < e.querySelectorAll(V.BLOCK_TAGS.join(",")).length || e.querySelector("".concat(a.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")))
                }, blockParent: function o(e) {
                    for (; e && e.parentNode !== a.el && (!e.parentNode || !a.node.hasClass(e.parentNode, "fr-inner"));) if (l(e = e.parentNode)) return e;
                    return null
                }, deepestParent: function i(e, t, n) {
                    if (void 0 === t && (t = []), void 0 === n && (n = !0), t.push(a.el), 0 <= t.indexOf(e.parentNode) || e.parentNode && a.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= V.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n) return null;
                    for (; t.indexOf(e.parentNode) < 0 && e.parentNode && !a.node.hasClass(e.parentNode, "fr-inner") && (V.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n) && (!l(e) || l(e.parentNode)) && (!l(e) || !l(e.parentNode) || !n);) e = e.parentNode;
                    return e
                }, rawAttributes: c, attributes: t, clearAttributes: function f(e) {
                    for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
                        var r = t[n];
                        e.removeAttribute(r.nodeName)
                    }
                }, openTagString: function p(e) {
                    return "<".concat(e.tagName.toLowerCase()).concat(t(e), ">")
                }, closeTagString: function u(e) {
                    return "</".concat(e.tagName.toLowerCase(), ">")
                }, isFirstSibling: function h(e, t) {
                    void 0 === t && (t = !0);
                    for (var n = e.previousSibling; n && t && a.node.hasClass(n, "fr-marker");) n = n.previousSibling;
                    return !n || n.nodeType === Node.TEXT_NODE && "" === n.textContent && h(n)
                }, isLastSibling: function g(e, t) {
                    void 0 === t && (t = !0);
                    for (var n = e.nextSibling; n && t && a.node.hasClass(n, "fr-marker");) n = n.nextSibling;
                    return !n || n.nodeType === Node.TEXT_NODE && "" === n.textContent && g(n)
                }, isList: function m(e) {
                    return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName)
                }, isLink: function v(e) {
                    return !!e && e.nodeType === Node.ELEMENT_NODE && "a" === e.tagName.toLowerCase()
                }, isElement: r, contents: s, isVoid: function b(e) {
                    return e && e.nodeType === Node.ELEMENT_NODE && 0 <= V.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase())
                }, hasFocus: function E(e) {
                    return e === a.doc.activeElement && (!a.doc.hasFocus || a.doc.hasFocus()) && Boolean(r(e) || e.type || e.href || ~e.tabIndex)
                }, isEditable: function S(e) {
                    return (!e.getAttribute || "false" !== e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0
                }, isDeletable: function T(e) {
                    return e && e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable")
                }, hasClass: function y(e, t) {
                    return e instanceof n && (e = e.get(0)), e && e.classList && e.classList.contains(t)
                }, filter: function C(e) {
                    return a.browser.msie ? e : {acceptNode: e}
                }
            }
        }, Object.assign(V.DEFAULTS, {
            htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
            htmlRemoveTags: ["script", "style"],
            htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
            htmlAllowedStyleProps: [".*"],
            htmlAllowComments: !0,
            htmlUntouched: !1,
            fullPage: !1
        }), V.HTML5Map = {B: "STRONG", I: "EM", STRIKE: "S"}, V.MODULES.clean = function (f) {
            var d, p, u, h, g = f.$;

            function o(e) {
                if (e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
                var t, n = f.node.contents(e), r = [];
                for (t = 0; t < n.length; t++) n[t].nodeType !== Node.ELEMENT_NODE || f.node.isVoid(n[t]) ? n[t].nodeType === Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length !== n[t].textContent.length && o(n[t]);
                if (e.nodeType === Node.ELEMENT_NODE && !f.node.isVoid(e) && (e.normalize(), n = f.node.contents(e), r = e.querySelectorAll(".fr-marker"), n.length - r.length == 0)) {
                    for (t = 0; t < n.length; t++) if (n[t].nodeType === Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                    for (t = 0; t < r.length; t++) e.parentNode.insertBefore(r[t].cloneNode(!0), e);
                    return e.parentNode.removeChild(e), !1
                }
            }

            function s(e, t) {
                if (e.nodeType === Node.COMMENT_NODE) return "\x3c!--".concat(e.nodeValue, "--\x3e");
                if (e.nodeType === Node.TEXT_NODE) return t ? e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
                if (e.nodeType !== Node.ELEMENT_NODE) return e.outerHTML;
                if (e.nodeType === Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;
                if (e.nodeType === Node.ELEMENT_NODE && "svg" === e.tagName) {
                    var n = document.createElement("div"), r = e.cloneNode(!0);
                    return n.appendChild(r), n.innerHTML
                }
                if ("IFRAME" === e.tagName) return e.outerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                var o = e.childNodes;
                if (0 === o.length) return e.outerHTML;
                for (var i = "", a = 0; a < o.length; a++) "PRE" === e.tagName && (t = !0), i += s(o[a], t);
                return f.node.openTagString(e) + i + f.node.closeTagString(e)
            }

            var l = [];

            function m(e) {
                var t = e.replace(/;;/gi, ";");
                return ";" !== (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t
            }

            function c(e) {
                var t;
                for (t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
                    var n = t.match(u), r = null;
                    "style" === t && f.opts.htmlAllowedStyleProps.length && (r = e[t].match(h)), n && r ? e[t] = m(r.join(";")) : n && ("style" !== t || r) || delete e[t]
                }
                for (var o = "", i = Object.keys(e).sort(), a = 0; a < i.length; a++) e[t = i[a]].indexOf('"') < 0 ? o += " ".concat(t, '="').concat(e[t], '"') : o += " ".concat(t, "='").concat(e[t], "'");
                return o
            }

            function v(e, t) {
                var n, r = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
                g(r).append(e);
                var o = "";
                if (r) {
                    var i = f.node.contents(r);
                    for (n = 0; n < i.length; n++) t(i[n]);
                    for (i = f.node.contents(r), n = 0; n < i.length; n++) o += s(i[n])
                }
                return o
            }

            function b(e, t, n) {
                var r = e = function i(e) {
                    return l = [], e = (e = (e = (e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function (e) {
                        return l.push(e), "[FROALA.EDITOR.SCRIPT ".concat(l.length - 1, "]")
                    })).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function (e) {
                        return l.push(e), "[FROALA.EDITOR.NOSCRIPT ".concat(l.length - 1, "]")
                    })).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="')).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="')
                }(e), o = null;
                return f.opts.fullPage && (r = f.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (o = f.html.extractNode(e, "head") || "")), r = v(r, t), o && (o = v(o, t)), function a(e) {
                    return e = (e = (e = e.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function (e, t) {
                        return 0 <= f.opts.htmlRemoveTags.indexOf("script") ? "" : l[parseInt(t, 10)]
                    })).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function (e, t) {
                        return 0 <= f.opts.htmlRemoveTags.indexOf("noscript") ? "" : l[parseInt(t, 10)].replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                    })).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
                }(function s(e, t, n) {
                    if (f.opts.fullPage) {
                        var r = f.html.extractDoctype(n), o = c(f.html.extractNodeAttrs(n, "html"));
                        t = null === t ? f.html.extractNode(n, "head") || "<title></title>" : t;
                        var i = c(f.html.extractNodeAttrs(n, "head")), a = c(f.html.extractNodeAttrs(n, "body"));
                        return "".concat(r, "<html").concat(o, "><head").concat(i, ">").concat(t, "</head><body").concat(a, ">").concat(e, "</body></html>")
                    }
                    return e
                }(r, o, e))
            }

            function E(e) {
                var t = f.doc.createElement("DIV");
                return t.innerText = e, t.textContent
            }

            function S(e) {
                for (var t = f.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && S(t[n]);
                !function c(a) {
                    if ("SPAN" === a.tagName && 0 <= (a.getAttribute("class") || "").indexOf("fr-marker")) return !1;
                    if ("PRE" === a.tagName && function l(e) {
                        var t = e.innerHTML;
                        0 <= t.indexOf("\n") && (e.innerHTML = t.replace(/\n/g, "<br>"))
                    }(a), a.nodeType === Node.ELEMENT_NODE && (a.getAttribute("data-fr-src") && 0 !== a.getAttribute("data-fr-src").indexOf("blob:") && a.setAttribute("data-fr-src", f.helpers.sanitizeURL(E(a.getAttribute("data-fr-src")))), a.getAttribute("href") && a.setAttribute("href", f.helpers.sanitizeURL(E(a.getAttribute("href")))), a.getAttribute("src") && a.setAttribute("src", f.helpers.sanitizeURL(E(a.getAttribute("src")))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(a.tagName) && (a.innerHTML = a.innerHTML.trim())), !f.opts.pasteAllowLocalImages && a.nodeType === Node.ELEMENT_NODE && "IMG" === a.tagName && a.getAttribute("data-fr-src") && 0 === a.getAttribute("data-fr-src").indexOf("file://")) return a.parentNode.removeChild(a), !1;
                    if (a.nodeType === Node.ELEMENT_NODE && V.HTML5Map[a.tagName] && "" === f.node.attributes(a)) {
                        var e = V.HTML5Map[a.tagName], t = "<".concat(e, ">").concat(a.innerHTML, "</").concat(e, ">");
                        a.insertAdjacentHTML("beforebegin", t), (a = a.previousSibling).parentNode.removeChild(a.nextSibling)
                    }
                    if (f.opts.htmlAllowComments || a.nodeType !== Node.COMMENT_NODE) if (a.tagName && a.tagName.match(p)) "STYLE" == a.tagName && f.helpers.isMac() && function () {
                        for (var e, n = a.innerHTML.trim(), r = [], t = /{([^}]+)}/g; e = t.exec(n);) r.push(e[1]);
                        for (var o = function o(t) {
                            var e = n.substring(0, n.indexOf("{")).trim();
                            a.parentNode.querySelectorAll(e).forEach(function (e) {
                                e.removeAttribute("class"), e.setAttribute("style", r[t])
                            }), n = n.substring(n.indexOf("}") + 1)
                        }, i = 0; -1 != n.indexOf("{"); i++) o(i)
                    }(), a.parentNode.removeChild(a); else if (a.tagName && !a.tagName.match(d)) "svg" === a.tagName ? a.parentNode.removeChild(a) : f.browser.safari && "path" === a.tagName && a.parentNode && "svg" === a.parentNode.tagName || (a.outerHTML = a.innerHTML); else {
                        var n = a.attributes;
                        if (n) for (var r = n.length - 1; 0 <= r; r--) {
                            var o = n[r], i = o.nodeName.match(u), s = null;
                            "style" === o.nodeName && f.opts.htmlAllowedStyleProps.length && (s = o.value.match(h)), i && s ? o.value = m(s.join(";")) : i && ("style" !== o.nodeName || s) || a.removeAttribute(o.nodeName)
                        }
                    } else 0 !== a.data.indexOf("[FROALA.EDITOR") && a.parentNode.removeChild(a)
                }(e)
            }

            return {
                _init: function e() {
                    f.opts.fullPage && g.merge(f.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"])
                }, html: function T(e, t, n, r) {
                    void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = !1);
                    var o, i = g.merge([], f.opts.htmlAllowedTags);
                    for (o = 0; o < t.length; o++) 0 <= i.indexOf(t[o]) && i.splice(i.indexOf(t[o]), 1);
                    var a = g.merge([], f.opts.htmlAllowedAttrs);
                    for (o = 0; o < n.length; o++) 0 <= a.indexOf(n[o]) && a.splice(a.indexOf(n[o]), 1);
                    return a.push("data-fr-.*"), a.push("fr-.*"), d = new RegExp("^".concat(i.join("$|^"), "$"), "gi"), u = new RegExp("^".concat(a.join("$|^"), "$"), "gi"), p = new RegExp("^".concat(f.opts.htmlRemoveTags.join("$|^"), "$"), "gi"), h = f.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)".concat(f.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)"), ":.+?(?=(;)|$))"), "gi") : null, e = b(e, S, !0)
                }, toHTML5: function r() {
                    var e = f.el.querySelectorAll(Object.keys(V.HTML5Map).join(","));
                    if (e.length) {
                        var t = !1;
                        f.el.querySelector(".fr-marker") || (f.selection.save(), t = !0);
                        for (var n = 0; n < e.length; n++) "" === f.node.attributes(e[n]) && g(e[n]).replaceWith("<".concat(V.HTML5Map[e[n].tagName], ">").concat(e[n].innerHTML, "</").concat(V.HTML5Map[e[n].tagName], ">"));
                        t && f.selection.restore()
                    }
                }, tables: function t() {
                    !function s() {
                        for (var e = f.el.querySelectorAll("tr"), t = 0; t < e.length; t++) {
                            for (var n = e[t].children, r = !0, o = 0; o < n.length; o++) if ("TH" !== n[o].tagName) {
                                r = !1;
                                break
                            }
                            if (!1 !== r && 0 !== n.length) {
                                for (var i = e[t]; i && "TABLE" !== i.tagName && "THEAD" !== i.tagName;) i = i.parentNode;
                                var a = i;
                                "THEAD" !== a.tagName && (a = f.doc.createElement("THEAD"), i.insertBefore(a, i.firstChild)), a.appendChild(e[t])
                            }
                        }
                    }()
                }, lists: function y() {
                    !function s() {
                        var e, t = [];
                        do {
                            if (t.length) {
                                var n = t[0], r = f.doc.createElement("ul");
                                n.parentNode.insertBefore(r, n);
                                do {
                                    var o = n;
                                    n = n.nextSibling, r.appendChild(o)
                                } while (n && "LI" === n.tagName)
                            }
                            t = [];
                            for (var i = f.el.querySelectorAll("li"), a = 0; a < i.length; a++) e = i[a], f.node.isList(e.parentNode) || t.push(i[a])
                        } while (0 < t.length)
                    }(), function i() {
                        for (var e = f.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (f.node.isList(n.previousSibling) && f.node.openTagString(n) === f.node.openTagString(n.previousSibling)) {
                                for (var r = f.node.contents(n), o = 0; o < r.length; o++) n.previousSibling.appendChild(r[o]);
                                n.parentNode.removeChild(n)
                            }
                        }
                    }(), function a() {
                        for (var e = f.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++) for (var n = f.node.contents(e[t]), r = null, o = n.length - 1; 0 <= o; o--) "LI" !== n[o].tagName && "UL" != n[o].tagName && "OL" != n[o].tagName ? (r || (r = g(f.doc.createElement("LI"))).insertBefore(n[o]), r.prepend(n[o])) : r = null
                    }(), function l() {
                        var e, t, n;
                        do {
                            t = !1;
                            var r = f.el.querySelectorAll("li:empty");
                            for (e = 0; e < r.length; e++) r[e].parentNode.removeChild(r[e]);
                            var o = f.el.querySelectorAll("ul, ol");
                            for (e = 0; e < o.length; e++) (n = o[e]).querySelector("LI") || (t = !0, n.parentNode.removeChild(n))
                        } while (!0 === t)
                    }(), function o() {
                        for (var e = f.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
                            var n = e[t], r = n.previousSibling;
                            r && ("LI" === r.tagName ? r.appendChild(n) : g(n).wrap("<li></li>"))
                        }
                    }(), function c() {
                        for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (n.nextSibling) {
                                var r = n.nextSibling, o = g(f.doc.createElement("LI"));
                                g(n.parentNode).after(o.get(0));
                                do {
                                    var i = r;
                                    r = r.nextSibling, o.append(i)
                                } while (r)
                            }
                        }
                    }(), function d() {
                        for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (f.node.isFirstSibling(n)) g(n).before("<br/>"); else if (n.previousSibling && "BR" === n.previousSibling.tagName) {
                                for (var r = n.previousSibling.previousSibling; r && f.node.hasClass(r, "fr-marker");) r = r.previousSibling;
                                r && "BR" !== r.tagName && g(n.previousSibling).remove()
                            }
                        }
                    }(), function n() {
                        for (var e = f.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) g(e[t]).remove()
                    }()
                }, invisibleSpaces: function n(e) {
                    return e.replace(/\u200b/g, "").length === e.length ? e : f.clean.exec(e, o)
                }, exec: b
            }
        }, V.XS = 0, V.SM = 1, V.MD = 2, V.LG = 3;
        V.LinkRegExCommon = "[".concat("a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_\\.", "]{1,}"), V.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;\\/~+#-\\'*-_{}]*)|())", V.LinkRegExTLD = "((".concat(V.LinkRegExCommon, ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))"), V.LinkRegExHTTP = "((ftp|http|https):\\/\\/".concat(V.LinkRegExCommon, ")"), V.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@".concat(V.LinkRegExCommon, ")"), V.LinkRegExWWW = "(www\\.".concat(V.LinkRegExCommon, "\\.[a-z0-9-]{2,24})"), V.LinkRegEx = "(".concat(V.LinkRegExTLD, "|").concat(V.LinkRegExHTTP, "|").concat(V.LinkRegExWWW, "|").concat(V.LinkRegExAuth, ")").concat(V.LinkRegExEnd), V.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], V.MAIL_REGEX = /.+@.+\..+/i, V.MODULES.helpers = function (i) {
            var a, s = i.$;

            function e() {
                var e = {}, t = function i() {
                    var e, t = -1;
                    return "Microsoft Internet Explorer" === navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), t
                }();
                if (0 < t) e.msie = !0; else {
                    var n = navigator.userAgent.toLowerCase(),
                        r = /(edge)[ /]([\w.]+)/.exec(n) || /(chrome)[ /]([\w.]+)/.exec(n) || /(webkit)[ /]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || n.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [],
                        o = r[1] || "";
                    r[2];
                    r[1] && (e[o] = !0), e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0)
                }
                return e.msie && (e.version = t), e
            }

            function t() {
                return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !o()
            }

            function n() {
                return /(Android)/g.test(navigator.userAgent) && !o()
            }

            function r() {
                return /(Blackberry)/g.test(navigator.userAgent)
            }

            function o() {
                return /(Windows Phone)/gi.test(navigator.userAgent)
            }

            var l = null;
            return {
                _init: function c() {
                    i.browser = e()
                }, isIOS: t, isMac: function d() {
                    return null === l && (l = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l
                }, isAndroid: n, isBlackberry: r, isWindowsPhone: o, isMobile: function f() {
                    return n() || t() || r()
                }, isEmail: function p(e) {
                    return !/^(https?:|ftps?:|)\/\//i.test(e) && V.MAIL_REGEX.test(e)
                }, requestAnimationFrame: function u() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
                        window.setTimeout(e, 1e3 / 60)
                    }
                }, getPX: function h(e) {
                    return parseInt(e, 10) || 0
                }, screenSize: function g() {
                    try {
                        var e = s(".fr-box").width();
                        if (e < 768) return V.XS;
                        if (768 <= e && e < 992) return V.SM;
                        if (992 <= e && e < 1200) return V.MD;
                        if (1200 <= e) return V.LG
                    } catch (t) {
                        return V.LG
                    }
                }, isTouch: function m() {
                    return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch
                }, sanitizeURL: function v(e) {
                    return /^(https?:|ftps?:|)\/\//i.test(e) ? e : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) ? e : new RegExp("^(".concat(V.LinkProtocols.join("|"), "):"), "i").test(e) ? e : e = encodeURIComponent(e).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/%3A(\d)/gi, ":$1").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}")
                }, isArray: function b(e) {
                    return e && !Object.prototype.propertyIsEnumerable.call(e, "length") && "object" === M(e) && "number" == typeof e.length
                }, RGBToHex: function E(e) {
                    function t(e) {
                        return "0".concat(parseInt(e, 10).toString(16)).slice(-2)
                    }

                    try {
                        return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : (e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), "#".concat(t(e[1])).concat(t(e[2])).concat(t(e[3])).toUpperCase()) : ""
                    } catch (n) {
                        return null
                    }
                }, HEXtoRGB: function S(e) {
                    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, r) {
                        return t + t + n + n + r + r
                    });
                    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                    return t ? "rgb(".concat(parseInt(t[1], 16), ", ").concat(parseInt(t[2], 16), ", ").concat(parseInt(t[3], 16), ")") : ""
                }, isURL: function T(e) {
                    return !!/^(https?:|ftps?:|)\/\//i.test(e) && (e = String(e).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^".concat(V.LinkRegExHTTP).concat(V.LinkRegExEnd, "$"), "gi").test(e))
                }, getAlignment: function y(e) {
                    e.css || (e = s(e));
                    var t = (e.css("text-align") || "").replace(/-(.*)-/g, "");
                    if (["left", "right", "justify", "center"].indexOf(t) < 0) {
                        if (!a) {
                            var n = s('<div dir="'.concat("rtl" === i.opts.direction ? "rtl" : "auto", '" style="text-align: ').concat(i.$el.css("text-align"), '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>'));
                            s("body").first().append(n);
                            var r = n.find("#s1").get(0).getBoundingClientRect().left,
                                o = n.find("#s2").get(0).getBoundingClientRect().left;
                            n.remove(), a = r < o ? "left" : "right"
                        }
                        t = a
                    }
                    return t
                }, scrollTop: function C() {
                    return i.o_win.pageYOffset ? i.o_win.pageYOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollTop ? i.o_doc.documentElement.scrollTop : i.o_doc.body.scrollTop ? i.o_doc.body.scrollTop : 0
                }, scrollLeft: function N() {
                    return i.o_win.pageXOffset ? i.o_win.pageXOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollLeft ? i.o_doc.documentElement.scrollLeft : i.o_doc.body.scrollLeft ? i.o_doc.body.scrollLeft : 0
                }, isInViewPort: function A(e) {
                    var t = e.getBoundingClientRect();
                    return 0 <= (t = {
                        top: Math.round(t.top),
                        bottom: Math.round(t.bottom)
                    }).top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight)
                }
            }
        }, V.MODULES.events = function (l) {
            var e, i = l.$, a = {};

            function s(e, t, n) {
                m(e, t, n)
            }

            function c(e) {
                if (void 0 === e && (e = !0), !l.$wp) return !1;
                if (l.helpers.isIOS() && l.$win.get(0).focus(), l.core.hasFocus()) return !1;
                if (!l.core.hasFocus() && e) {
                    var t = l.$win.scrollTop();
                    if (l.browser.msie && l.$box && l.$box.css("position", "fixed"), l.browser.msie && l.$wp && l.$wp.css("overflow", "visible"), l.browser.msie && l.$sc && l.$sc.css("position", "fixed"), p(), l.el.focus(), l.events.trigger("focus"), f(), l.browser.msie && l.$sc && l.$sc.css("position", ""), l.browser.msie && l.$box && l.$box.css("position", ""), l.browser.msie && l.$wp && l.$wp.css("overflow", "auto"), t !== l.$win.scrollTop() && l.$win.scrollTop(t), !l.selection.info(l.el).atStart) return !1
                }
                if (!l.core.hasFocus() || 0 < l.$el.find(".fr-marker").length) return !1;
                if (l.selection.info(l.el).atStart && l.selection.isCollapsed() && null !== l.html.defaultTag()) {
                    var n = l.markers.insert();
                    if (n && !l.node.blockParent(n)) {
                        i(n).remove();
                        var r = l.$el.find(l.html.blockTagsQuery()).get(0);
                        r && (i(r).prepend(V.MARKERS), l.selection.restore())
                    } else n && i(n).remove()
                }
            }

            var d = !1;

            function f() {
                e = !0
            }

            function p() {
                e = !1
            }

            function u() {
                return e
            }

            function h(e, t, n) {
                var r, o = e.split(" ");
                if (1 < o.length) {
                    for (var i = 0; i < o.length; i++) h(o[i], t, n);
                    return !0
                }
                void 0 === n && (n = !1), r = 0 !== e.indexOf("shared.") ? (a[e] = a[e] || [], a[e]) : (l.shared._events[e] = l.shared._events[e] || [], l.shared._events[e]), n ? r.unshift(t) : r.push(t)
            }

            var g = [];

            function m(e, t, n, r, o) {
                "function" == typeof n && (o = r, r = n, n = !1);
                var i = o ? l.shared.$_events : g, a = o ? l.sid : l.id,
                    s = "".concat(t.trim().split(" ").join(".ed".concat(a, " ")), ".ed").concat(a);
                n ? e.on(s, n, r) : e.on(s, r), i.push([e, s])
            }

            function t(e) {
                for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1])
            }

            function v(e, t, n) {
                if (!l.edit.isDisabled() || n) {
                    var r, o;
                    if (0 !== e.indexOf("shared.")) r = a[e]; else {
                        if (0 < l.shared.count) return !1;
                        r = l.shared._events[e]
                    }
                    if (r) for (var i = 0; i < r.length; i++) if (!1 === (o = r[i].apply(l, t))) return !1;
                    return (!l.opts.events || !l.opts.events[e] || !1 !== (o = l.opts.events[e].apply(l, t))) && o
                }
            }

            function b() {
                for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && delete a[e]
            }

            function E() {
                for (var e in l.shared._events) Object.prototype.hasOwnProperty.call(l.shared._events, e) && delete l.shared._events[e]
            }

            return {
                _init: function S() {
                    l.shared.$_events = l.shared.$_events || [], l.shared._events = {}, function e() {
                        l.helpers.isMobile() ? (l._mousedown = "touchstart", l._mouseup = "touchend", l._move = "touchmove", l._mousemove = "touchmove") : (l._mousedown = "mousedown", l._mouseup = "mouseup", l._move = "", l._mousemove = "mousemove")
                    }(), function t() {
                        s(l.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function (e) {
                            v(e.type, [e])
                        }), h("mousedown", function () {
                            for (var e = 0; e < V.INSTANCES.length; e++) V.INSTANCES[e] !== l && V.INSTANCES[e].popups && V.INSTANCES[e].popups.areVisible() && V.INSTANCES[e].$el.find(".fr-marker").remove()
                        })
                    }(), function n() {
                        s(l.$win, l._mousedown, function (e) {
                            v("window.mousedown", [e]), f()
                        }), s(l.$win, l._mouseup, function (e) {
                            v("window.mouseup", [e])
                        }), s(l.$win, "cut copy keydown keyup touchmove touchend", function (e) {
                            v("window.".concat(e.type), [e])
                        })
                    }(), function r() {
                        s(l.$doc, "dragend drop", function (e) {
                            v("document.".concat(e.type), [e])
                        })
                    }(), function o() {
                        s(l.$el, "keydown keypress keyup input", function (e) {
                            v(e.type, [e])
                        })
                    }(), function i() {
                        s(l.$el, "focus", function (e) {
                            u() && (c(!1), !1 === d && v(e.type, [e]))
                        }), s(l.$el, "blur", function (e) {
                            u() && !0 === d && (v(e.type, [e]), f())
                        }), m(l.$el, "mousedown", '[contenteditable="true"]', function () {
                            p(), l.$el.blur()
                        }), h("focus", function () {
                            d = !0
                        }), h("blur", function () {
                            d = !1
                        })
                    }(), f(), function a() {
                        s(l.$el, "cut copy paste beforepaste", function (e) {
                            v(e.type, [e])
                        })
                    }(), h("destroy", b), h("shared.destroy", E)
                }, on: h, trigger: v, bindClick: function r(e, t, n) {
                    m(e, l._mousedown, t, function (e) {
                        l.edit.isDisabled() || function n(e) {
                            var t = i(e.currentTarget);
                            return l.edit.isDisabled() || l.node.hasClass(t.get(0), "fr-disabled") ? (e.preventDefault(), !1) : "mousedown" === e.type && 1 !== e.which || (l.helpers.isMobile() || e.preventDefault(), (l.helpers.isAndroid() || l.helpers.isWindowsPhone()) && 0 === t.parents(".fr-dropdown-menu").length && (e.preventDefault(), e.stopPropagation()), t.addClass("fr-selected"), void l.events.trigger("commands.mousedown", [t]))
                        }(e)
                    }, !0), m(e, "".concat(l._mouseup, " ").concat(l._move), t, function (e) {
                        l.edit.isDisabled() || function o(e, t) {
                            var n = i(e.currentTarget);
                            if (l.edit.isDisabled() || l.node.hasClass(n.get(0), "fr-disabled")) return e.preventDefault(), !1;
                            if ("mouseup" === e.type && 1 !== e.which) return !0;
                            if (l.button.getButtons(".fr-selected", !0).get(0) == n.get(0) && !l.node.hasClass(n.get(0), "fr-selected")) return !0;
                            if ("touchmove" !== e.type) {
                                if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !l.node.hasClass(n.get(0), "fr-selected")) return l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), !1;
                                if (l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), n.data("dragging") || n.attr("disabled")) return n.removeData("dragging"), !1;
                                var r = n.data("timeout");
                                r && (clearTimeout(r), n.removeData("timeout")), t.apply(l, [e])
                            } else n.data("timeout") || n.data("timeout", setTimeout(function () {
                                n.data("dragging", !0)
                            }, 100))
                        }(e, n)
                    }, !0), m(e, "mousedown click mouseup", t, function (e) {
                        l.edit.isDisabled() || e.stopPropagation()
                    }, !0), h("window.mouseup", function () {
                        l.edit.isDisabled() || (e.find(t).removeClass("fr-selected"), f())
                    }), m(e, "mouseover", t, function () {
                        i(this).hasClass("fr-options") && i(this).prev(".fr-btn").addClass("fr-btn-hover"), i(this).next(".fr-btn").hasClass("fr-options") && i(this).next(".fr-btn").addClass("fr-btn-hover")
                    }), m(e, "mouseout", t, function () {
                        i(this).hasClass("fr-options") && i(this).prev(".fr-btn").removeClass("fr-btn-hover"), i(this).next(".fr-btn").hasClass("fr-options") && i(this).next(".fr-btn").removeClass("fr-btn-hover")
                    })
                }, disableBlur: p, enableBlur: f, blurActive: u, focus: c, chainTrigger: function T(e, t, n) {
                    if (!l.edit.isDisabled() || n) {
                        var r, o;
                        if (0 !== e.indexOf("shared.")) r = a[e]; else {
                            if (0 < l.shared.count) return !1;
                            r = l.shared._events[e]
                        }
                        if (r) for (var i = 0; i < r.length; i++) void 0 !== (o = r[i].apply(l, [t])) && (t = o);
                        return l.opts.events && l.opts.events[e] && void 0 !== (o = l.opts.events[e].apply(l, [t])) && (t = o), t
                    }
                }, $on: m, $off: function n() {
                    t(g), g = [], 0 === l.shared.count && (t(l.shared.$_events), l.shared.$_events = [])
                }
            }
        }, Object.assign(V.DEFAULTS, {indentMargin: 20}), V.COMMANDS = {
            bold: {
                title: "Bold", toggle: !0, refresh: function (e) {
                    var t = this.format.is("strong");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            italic: {
                title: "Italic", toggle: !0, refresh: function (e) {
                    var t = this.format.is("em");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            underline: {
                title: "Underline", toggle: !0, refresh: function (e) {
                    var t = this.format.is("u");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            strikeThrough: {
                title: "Strikethrough", toggle: !0, refresh: function (e) {
                    var t = this.format.is("s");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            subscript: {
                title: "Subscript", toggle: !0, refresh: function (e) {
                    var t = this.format.is("sub");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            superscript: {
                title: "Superscript", toggle: !0, refresh: function (e) {
                    var t = this.format.is("sup");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            outdent: {title: "Decrease Indent"},
            indent: {title: "Increase Indent"},
            undo: {title: "Undo", undo: !1, forcedRefresh: !0, disabled: !0},
            redo: {title: "Redo", undo: !1, forcedRefresh: !0, disabled: !0},
            insertHR: {title: "Insert Horizontal Line"},
            clearFormatting: {title: "Clear Formatting"},
            selectAll: {title: "Select All", undo: !1},
            moreText: {title: "More Text", undo: !1},
            moreParagraph: {title: "More Paragraph", undo: !1},
            moreRich: {title: "More Rich", undo: !1},
            moreMisc: {title: "More Misc", undo: !1}
        }, V.RegisterCommand = function (e, t) {
            V.COMMANDS[e] = t
        }, V.MODULES.commands = function (a) {
            var s = a.$;

            function o(e) {
                return a.html.defaultTag() && (e = "<".concat(a.html.defaultTag(), ">").concat(e, "</").concat(a.html.defaultTag(), ">")), e
            }

            var i = {
                bold: function () {
                    e("bold", "strong")
                }, subscript: function () {
                    a.format.is("sup") && a.format.remove("sup"), e("subscript", "sub")
                }, superscript: function () {
                    a.format.is("sub") && a.format.remove("sub"), e("superscript", "sup")
                }, italic: function () {
                    e("italic", "em")
                }, strikeThrough: function () {
                    e("strikeThrough", "s")
                }, underline: function () {
                    e("underline", "u")
                }, undo: function () {
                    a.undo.run()
                }, redo: function () {
                    a.undo.redo()
                }, indent: function () {
                    r(1)
                }, outdent: function () {
                    r(-1)
                }, show: function () {
                    a.opts.toolbarInline && a.toolbar.showInline(null, !0)
                }, insertHR: function () {
                    a.selection.remove();
                    var e = "";
                    a.core.isEmpty() && (e = o(e = "<br>")), a.html.insert('<hr id="fr-just" class="fr-just">'.concat(e));
                    var t, n = a.$el.find("hr#fr-just").length ? a.$el.find("hr#fr-just") : a.$el.find(".fr-just");
                    if (n.removeAttr("id"), n.removeAttr("class"), 0 === n.next().length) {
                        var r = a.html.defaultTag();
                        r ? n.after(s(a.doc.createElement(r)).append("<br>").get(0)) : n.after("<br>")
                    }
                    n.prev().is("hr") ? t = a.selection.setAfter(n.get(0), !1) : n.next().is("hr") ? t = a.selection.setBefore(n.get(0), !1) : a.selection.setAfter(n.get(0), !1) || a.selection.setBefore(n.get(0), !1), t || void 0 === t || (e = o(e = "".concat(V.MARKERS, "<br>")), n.after(e)), a.selection.restore()
                }, clearFormatting: function () {
                    a.format.remove()
                }, selectAll: function () {
                    a.doc.execCommand("selectAll", !1, !1)
                }, moreText: function (e) {
                    t(e)
                }, moreParagraph: function (e) {
                    t(e)
                }, moreRich: function (e) {
                    t(e)
                }, moreMisc: function (e) {
                    t(e)
                }
            };

            function t(e) {
                !function n(e) {
                    var t = a.$tb.find('.fr-more-toolbar[data-name="'.concat(e.attr("data-group-name"), '"]'));
                    a.$tb.find(".fr-open").not(e).removeClass("fr-open"), e.toggleClass("fr-open"), a.$tb.find(".fr-more-toolbar").removeClass("fr-overflow-visible"), a.$tb.find(".fr-expanded").not(t).length ? (a.$tb.find(".fr-expanded").toggleClass("fr-expanded"), t.toggleClass("fr-expanded")) : (t.toggleClass("fr-expanded"), a.$box.toggleClass("fr-toolbar-open"), a.$tb.toggleClass("fr-toolbar-open"))
                }(a.$tb.find("[data-cmd=".concat(e, "]"))), a.toolbar.setMoreToolbarsHeight()
            }

            function n(e, t) {
                if (!1 !== a.events.trigger("commands.before", s.merge([e], t || []))) {
                    var n = V.COMMANDS[e] && V.COMMANDS[e].callback || i[e], r = !0, o = !1;
                    V.COMMANDS[e] && ("undefined" != typeof V.COMMANDS[e].focus && (r = V.COMMANDS[e].focus), "undefined" != typeof V.COMMANDS[e].accessibilityFocus && (o = V.COMMANDS[e].accessibilityFocus)), (!a.core.hasFocus() && r && !a.popups.areVisible() || !a.core.hasFocus() && o && a.accessibility.hasFocus()) && a.events.focus(!0), V.COMMANDS[e] && !1 !== V.COMMANDS[e].undo && (a.$el.find(".fr-marker").length && (a.events.disableBlur(), a.selection.restore()), a.undo.saveStep()), n && n.apply(a, s.merge([e], t || [])), a.events.trigger("commands.after", s.merge([e], t || [])), V.COMMANDS[e] && !1 !== V.COMMANDS[e].undo && a.undo.saveStep()
                }
            }

            function e(e, t) {
                a.format.toggle(t)
            }

            function r(e) {
                a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();
                for (var t = a.selection.blocks(), n = 0; n < t.length; n++) if ("LI" !== t[n].tagName || "LI" !== t[n].parentNode.tagName) {
                    var r = s(t[n]);
                    "LI" != t[n].tagName && "LI" == t[n].parentNode.tagName && (r = s(t[n].parentNode));
                    var o = "rtl" === a.opts.direction || "rtl" === r.css("direction") ? "margin-right" : "margin-left",
                        i = a.helpers.getPX(r.css(o));
                    if (r.width() < 2 * a.opts.indentMargin && 0 < e) continue;
                    r.css(o, Math.max(i + e * a.opts.indentMargin, 0) || ""), r.removeClass("fr-temp-div")
                }
                a.selection.save(), a.html.unwrap(), a.selection.restore()
            }

            function l(e) {
                return function () {
                    n(e)
                }
            }

            var c = {};
            for (var d in i) Object.prototype.hasOwnProperty.call(i, d) && (c[d] = l(d));
            return Object.assign(c, {
                exec: n, _init: function f() {
                    a.events.on("keydown", function (e) {
                        var t = a.selection.element();
                        if (t && "HR" === t.tagName && !a.keys.isArrow(e.which)) return e.preventDefault(), !1
                    }), a.events.on("keyup", function (e) {
                        var t = a.selection.element();
                        if (t && "HR" === t.tagName) if (e.which === V.KEYCODE.ARROW_LEFT || e.which === V.KEYCODE.ARROW_UP) {
                            if (t.previousSibling) return a.node.isBlock(t.previousSibling) ? a.selection.setAtEnd(t.previousSibling) : s(t).before(V.MARKERS), a.selection.restore(), !1
                        } else if ((e.which === V.KEYCODE.ARROW_RIGHT || e.which === V.KEYCODE.ARROW_DOWN) && t.nextSibling) return a.node.isBlock(t.nextSibling) ? a.selection.setAtStart(t.nextSibling) : s(t).after(V.MARKERS), a.selection.restore(), !1
                    }), a.events.on("mousedown", function (e) {
                        if (e.target && "HR" === e.target.tagName) return e.preventDefault(), e.stopPropagation(), !1
                    }), a.events.on("mouseup", function () {
                        var e = a.selection.element();
                        e === a.selection.endElement() && e && "HR" === e.tagName && (e.nextSibling && (a.node.isBlock(e.nextSibling) ? a.selection.setAtStart(e.nextSibling) : s(e).after(V.MARKERS)), a.selection.restore())
                    })
                }
            })
        }, V.MODULES.cursorLists = function (g) {
            var m = g.$;

            function v(e) {
                for (var t = e; "LI" !== t.tagName;) t = t.parentNode;
                return t
            }

            function b(e) {
                for (var t = e; !g.node.isList(t);) t = t.parentNode;
                return t
            }

            return {
                _startEnter: function E(e) {
                    var t, n = v(e), r = n.nextSibling, o = n.previousSibling, i = g.html.defaultTag();
                    if (g.node.isEmpty(n, !0) && r) {
                        for (var a = "", s = "", l = e.parentNode; !g.node.isList(l) && l.parentNode && ("LI" !== l.parentNode.tagName || l.parentNode === n);) a = g.node.openTagString(l) + a, s += g.node.closeTagString(l), l = l.parentNode;
                        a = g.node.openTagString(l) + a, s += g.node.closeTagString(l);
                        var c = "";
                        for (c = l.parentNode && "LI" === l.parentNode.tagName ? "".concat(s, "<li>").concat(V.MARKERS, "<br>").concat(a) : i ? "".concat(s, "<").concat(i, ">").concat(V.MARKERS, "<br></").concat(i, ">").concat(a) : "".concat(s + V.MARKERS, "<br>").concat(a); ["UL", "OL"].indexOf(l.tagName) < 0 || l.parentNode && "LI" === l.parentNode.tagName;) l = l.parentNode;
                        m(n).replaceWith('<span id="fr-break"></span>');
                        var d = g.node.openTagString(l) + m(l).html() + g.node.closeTagString(l);
                        d = d.replace(/<span id="fr-break"><\/span>/g, c), m(l).replaceWith(d), g.$el.find("li:empty").remove()
                    } else if (o && r || !g.node.isEmpty(n, !0)) {
                        for (var f = "<br>", p = e.parentNode; p && "LI" !== p.tagName;) f = g.node.openTagString(p) + f + g.node.closeTagString(p), p = p.parentNode;
                        m(n).before("<li>".concat(f, "</li>")), m(e).remove()
                    } else if (o) {
                        t = b(n);
                        for (var u = "".concat(V.MARKERS, "<br>"), h = e.parentNode; h && "LI" !== h.tagName;) u = g.node.openTagString(h) + u + g.node.closeTagString(h), h = h.parentNode;
                        t.parentNode && "LI" === t.parentNode.tagName ? m(t.parentNode).after("<li>".concat(u, "</li>")) : i ? m(t).after("<".concat(i, ">").concat(u, "</").concat(i, ">")) : m(t).after(u), m(n).remove()
                    } else (t = b(n)).parentNode && "LI" === t.parentNode.tagName ? r ? m(t.parentNode).before("".concat(g.node.openTagString(n) + V.MARKERS, "<br></li>")) : m(t.parentNode).after("".concat(g.node.openTagString(n) + V.MARKERS, "<br></li>")) : i ? m(t).before("<".concat(i, ">").concat(V.MARKERS, "<br></").concat(i, ">")) : m(t).before("".concat(V.MARKERS, "<br>")), m(n).remove()
                }, _middleEnter: function c(e) {
                    for (var t = v(e), n = "", r = e, o = "", i = "", a = !1; r !== t;) {
                        var s = "A" === (r = r.parentNode).tagName && g.cursor.isAtEnd(e, r) ? "fr-to-remove" : "";
                        a || r == t || g.node.isBlock(r) || (a = !0, o += V.INVISIBLE_SPACE), o = g.node.openTagString(m(r).clone().addClass(s).get(0)) + o, i = g.node.closeTagString(r) + i
                    }
                    n = i + n + o + V.MARKERS + (g.opts.keepFormatOnDelete ? V.INVISIBLE_SPACE : ""), m(e).replaceWith('<span id="fr-break"></span>');
                    var l = g.node.openTagString(t) + m(t).html() + g.node.closeTagString(t);
                    l = l.replace(/<span id="fr-break"><\/span>/g, n), m(t).replaceWith(l)
                }, _endEnter: function l(e) {
                    for (var t = v(e), n = V.MARKERS, r = "", o = e, i = !1; o !== t;) if (!(o = o.parentNode).classList.contains("fr-img-space-wrap") && !o.classList.contains("fr-img-space-wrap2")) {
                        var a = "A" === o.tagName && g.cursor.isAtEnd(e, o) ? "fr-to-remove" : "";
                        i || o === t || g.node.isBlock(o) || (i = !0, r += V.INVISIBLE_SPACE), r = g.node.openTagString(m(o).clone().addClass(a).get(0)) + r, n += g.node.closeTagString(o)
                    }
                    var s = r + n;
                    m(e).remove(), m(t).after(s)
                }, _backspace: function d(e) {
                    var t = v(e), n = t.previousSibling;
                    if (n) {
                        n = m(n).find(g.html.blockTagsQuery()).get(-1) || n, m(e).replaceWith(V.MARKERS);
                        var r = g.node.contents(n);
                        r.length && "BR" === r[r.length - 1].tagName && m(r[r.length - 1]).remove(), m(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                            this.parentNode === t && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                        });
                        for (var o, i = g.node.contents(t)[0]; i && !g.node.isList(i);) o = i.nextSibling, m(n).append(i), i = o;
                        for (n = t.previousSibling; i;) o = i.nextSibling, m(n).append(i), i = o;
                        1 < (r = g.node.contents(n)).length && "BR" === r[r.length - 1].tagName && m(r[r.length - 1]).remove(), m(t).remove()
                    } else {
                        var a = b(t);
                        if (m(e).replaceWith(V.MARKERS), a.parentNode && "LI" === a.parentNode.tagName) {
                            var s = a.previousSibling;
                            g.node.isBlock(s) ? (m(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                                this.parentNode === t && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                            }), m(s).append(m(t).html())) : m(a).before(m(t).html())
                        } else {
                            var l = g.html.defaultTag();
                            l && 0 === m(t).find(g.html.blockTagsQuery()).length ? m(a).before("<".concat(l, ">").concat(m(t).html(), "</").concat(l, ">")) : m(a).before(m(t).html())
                        }
                        m(t).remove(), g.html.wrap(), 0 === m(a).find("li").length && m(a).remove()
                    }
                }, _del: function f(e) {
                    var t, n = v(e), r = n.nextSibling;
                    if (r) {
                        (t = g.node.contents(r)).length && "BR" === t[0].tagName && m(t[0]).remove(), m(r).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                            this.parentNode === r && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                        });
                        for (var o, i = e, a = g.node.contents(r)[0]; a && !g.node.isList(a);) o = a.nextSibling, m(i).after(a), i = a, a = o;
                        for (; a;) o = a.nextSibling, m(n).append(a), a = o;
                        m(e).replaceWith(V.MARKERS), m(r).remove()
                    } else {
                        for (var s = n; !s.nextSibling && s !== g.el;) s = s.parentNode;
                        if (s === g.el) return !1;
                        if (s = s.nextSibling, g.node.isBlock(s)) V.NO_DELETE_TAGS.indexOf(s.tagName) < 0 && (m(e).replaceWith(V.MARKERS), (t = g.node.contents(n)).length && "BR" === t[t.length - 1].tagName && m(t[t.length - 1]).remove(), m(n).append(m(s).html()), m(s).remove()); else for ((t = g.node.contents(n)).length && "BR" === t[t.length - 1].tagName && m(t[t.length - 1]).remove(), m(e).replaceWith(V.MARKERS); s && !g.node.isBlock(s) && "BR" !== s.tagName;) m(n).append(m(s)), s = s.nextSibling
                    }
                }
            }
        }, V.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], V.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], V.MODULES.cursor = function (u) {
            var h = u.$;

            function i(e) {
                return !!e && (!!u.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? i(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && i(e.parentNode)))
            }

            function a(e) {
                return !!e && (!!u.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? a(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !u.node.hasClass(e.parentNode, "fr-inner")) || a(e.parentNode))))
            }

            function g(e, t) {
                return !!e && (e !== u.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? g(e.previousSibling, t) : !e.previousSibling && (e.parentNode === t || g(e.parentNode, t))))
            }

            function m(e, t) {
                return !!e && (e !== u.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? m(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode === t || m(e.parentNode, t))))
            }

            function c(e) {
                return 0 < h(e).parentsUntil(u.$el, "LI").length && 0 === h(e).parentsUntil("LI", "TABLE").length
            }

            function d(e, t) {
                var n = new RegExp("".concat(t ? "^" : "", "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})").concat(t ? "" : "$"), "i"),
                    r = e.match(n);
                return r ? r[0].length : 1
            }

            function f(e) {
                for (var t, n = e; !n.previousSibling;) if (n = n.parentNode, u.node.isElement(n)) return !1;
                if (n = n.previousSibling, !u.node.isBlock(n) && u.node.isEditable(n)) {
                    for (t = u.node.contents(n); n.nodeType !== Node.TEXT_NODE && !u.node.isDeletable(n) && t.length && u.node.isEditable(n);) n = t[t.length - 1], t = u.node.contents(n);
                    if (n.nodeType === Node.TEXT_NODE) {
                        var r = n.textContent, o = r.length;
                        if (r.length && "\n" === r[r.length - 1]) return n.textContent = r.substring(0, o - 2), 0 === n.textContent.length && n.parentNode.removeChild(n), f(e);
                        if (u.opts.tabSpaces && r.length >= u.opts.tabSpaces) 0 === r.substr(r.length - u.opts.tabSpaces, r.length - 1).replace(/ /g, "").replace(new RegExp(V.UNICODE_NBSP, "g"), "").length && (o = r.length - u.opts.tabSpaces + 1);
                        n.textContent = r.substring(0, o - d(r)), u.opts.htmlUntouched && !e.nextSibling && n.textContent.length && " " === n.textContent[n.textContent.length - 1] && (n.textContent = n.textContent.substring(0, n.textContent.length - 1) + V.UNICODE_NBSP);
                        var i = r.length !== n.textContent.length;
                        if (0 === n.textContent.length) if (i && u.opts.keepFormatOnDelete) h(n).after(V.INVISIBLE_SPACE + V.MARKERS); else if (0 !== r.length && u.node.isBlock(n.parentNode)) h(n).after(V.MARKERS); else if ((2 != n.parentNode.childNodes.length || n.parentNode != e.parentNode) && 1 != n.parentNode.childNodes.length || u.node.isBlock(n.parentNode) || u.node.isElement(n.parentNode) || !u.node.isDeletable(n.parentNode)) {
                            for (; !u.node.isElement(n.parentNode) && u.node.isEmpty(n.parentNode) && V.NO_DELETE_TAGS.indexOf(n.parentNode.tagName) < 0;) {
                                var a = n;
                                n = n.parentNode, a.parentNode.removeChild(a)
                            }
                            h(n).after(V.MARKERS), u.node.isElement(n.parentNode) && !e.nextSibling && n.previousSibling && "BR" === n.previousSibling.tagName && h(e).after("<br>"), n.parentNode.removeChild(n)
                        } else h(n.parentNode).after(V.MARKERS), h(n.parentNode).remove(); else h(n).after(V.MARKERS)
                    } else u.node.isDeletable(n) ? (h(n).after(V.MARKERS), h(n).remove()) : e.nextSibling && "BR" === e.nextSibling.tagName && u.node.isVoid(n) && "BR" !== n.tagName ? (h(e.nextSibling).remove(), h(e).replaceWith(V.MARKERS)) : !1 !== u.events.trigger("node.remove", [h(n)]) && (h(n).after(V.MARKERS), h(n).remove())
                } else if (V.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n))) if (u.node.isDeletable(n)) h(e).replaceWith(V.MARKERS), h(n).remove(); else if (u.node.isEmpty(n) && !u.node.isList(n)) h(n).remove(), h(e).replaceWith(V.MARKERS); else {
                    for (u.node.isList(n) && (n = h(n).find("li").last().get(0)), (t = u.node.contents(n)) && "BR" === t[t.length - 1].tagName && h(t[t.length - 1]).remove(), t = u.node.contents(n); t && u.node.isBlock(t[t.length - 1]);) n = t[t.length - 1], t = u.node.contents(n);
                    h(n).append(V.MARKERS);
                    for (var s = e; !s.previousSibling;) s = s.parentNode;
                    for (; s && "BR" !== s.tagName && !u.node.isBlock(s);) {
                        var l = s;
                        s = s.nextSibling, h(n).append(l)
                    }
                    s && "BR" === s.tagName && h(s).remove(), h(e).remove()
                } else e.nextSibling && "BR" === e.nextSibling.tagName && h(e.nextSibling).remove();
                return !0
            }

            function s(e) {
                var t = 0 < h(e).parentsUntil(u.$el, "BLOCKQUOTE").length, n = u.node.deepestParent(e, [], !t);
                if (n && "BLOCKQUOTE" === n.tagName) {
                    var r = u.node.deepestParent(e, [h(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                    r && r.nextSibling && (n = r)
                }
                if (null !== n) {
                    var o, i = n.nextSibling;
                    if (u.node.isBlock(n) && (u.node.isEditable(n) || u.node.isDeletable(n)) && i && V.NO_DELETE_TAGS.indexOf(i.tagName) < 0) if (u.node.isDeletable(i)) h(i).remove(), h(e).replaceWith(V.MARKERS); else if (u.node.isBlock(i) && u.node.isEditable(i)) if (u.node.isList(i)) if (u.node.isEmpty(n, !0)) h(n).remove(), h(i).find("li").first().prepend(V.MARKERS); else {
                        var a = h(i).find("li").first();
                        "BLOCKQUOTE" === n.tagName && (o = u.node.contents(n)).length && u.node.isBlock(o[o.length - 1]) && (n = o[o.length - 1]), 0 === a.find("ul, ol").length && (h(e).replaceWith(V.MARKERS), a.find(u.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                            this.parentNode === a.get(0) && h(this).replaceWith(h(this).html() + (u.node.isEmpty(this) ? "" : "<br>"))
                        }), h(n).append(u.node.contents(a.get(0))), a.remove(), 0 === h(i).find("li").length && h(i).remove())
                    } else {
                        if ((o = u.node.contents(i)).length && "BR" === o[0].tagName && h(o[0]).remove(), "BLOCKQUOTE" !== i.tagName && "BLOCKQUOTE" === n.tagName) for (o = u.node.contents(n); o.length && u.node.isBlock(o[o.length - 1]);) n = o[o.length - 1], o = u.node.contents(n); else if ("BLOCKQUOTE" === i.tagName && "BLOCKQUOTE" !== n.tagName) for (o = u.node.contents(i); o.length && u.node.isBlock(o[0]);) i = o[0], o = u.node.contents(i);
                        h(e).replaceWith(V.MARKERS), h(n).append(i.innerHTML), h(i).remove()
                    } else {
                        for (h(e).replaceWith(V.MARKERS); i && "BR" !== i.tagName && !u.node.isBlock(i) && u.node.isEditable(i);) {
                            var s = i;
                            i = i.nextSibling, h(n).append(s)
                        }
                        i && "BR" === i.tagName && u.node.isEditable(i) && h(i).remove()
                    }
                }
            }

            function n(e) {
                for (var t, n = e; !n.nextSibling;) if (n = n.parentNode, u.node.isElement(n)) return !1;
                if ("BR" === (n = n.nextSibling).tagName && u.node.isEditable(n)) if (n.nextSibling) {
                    if (u.node.isBlock(n.nextSibling) && u.node.isEditable(n.nextSibling)) {
                        if (!(V.NO_DELETE_TAGS.indexOf(n.nextSibling.tagName) < 0)) return void h(n).remove();
                        n = n.nextSibling, h(n.previousSibling).remove()
                    }
                } else if (i(n)) {
                    if (c(e)) u.cursorLists._del(e); else u.node.deepestParent(n) && ((!u.node.isEmpty(u.node.blockParent(n)) || (u.node.blockParent(n).nextSibling && V.NO_DELETE_TAGS.indexOf(u.node.blockParent(n).nextSibling.tagName)) < 0) && h(n).remove(), s(e));
                    return
                }
                if (!u.node.isBlock(n) && u.node.isEditable(n)) {
                    for (t = u.node.contents(n); n.nodeType !== Node.TEXT_NODE && t.length && !u.node.isDeletable(n) && u.node.isEditable(n);) n = t[0], t = u.node.contents(n);
                    n.nodeType === Node.TEXT_NODE ? (h(n).before(V.MARKERS), n.textContent.length && (n.textContent = n.textContent.substring(d(n.textContent, !0), n.textContent.length))) : u.node.isDeletable(n) ? (h(n).before(V.MARKERS), h(n).remove()) : !1 !== u.events.trigger("node.remove", [h(n)]) && (h(n).before(V.MARKERS), h(n).remove()), h(e).remove()
                } else if (V.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n))) if (u.node.isDeletable(n)) h(e).replaceWith(V.MARKERS), h(n).remove(); else if (u.node.isList(n)) e.previousSibling ? (h(n).find("li").first().prepend(e), u.cursorLists._backspace(e)) : (h(n).find("li").first().prepend(V.MARKERS), h(e).remove()); else if ((t = u.node.contents(n)) && "BR" === t[0].tagName && h(t[0]).remove(), t && "BLOCKQUOTE" === n.tagName) {
                    var r = t[0];
                    for (h(e).before(V.MARKERS); r && "BR" !== r.tagName;) {
                        var o = r;
                        r = r.nextSibling, h(e).before(o)
                    }
                    r && "BR" === r.tagName && h(r).remove()
                } else h(e).after(h(n).html()).after(V.MARKERS), h(n).remove()
            }

            function p() {
                for (var e = u.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t])
            }

            function l(e, t, n) {
                var r, o = u.node.deepestParent(e, [], !n);
                if (o && "BLOCKQUOTE" === o.tagName) return m(e, o) ? (r = u.html.defaultTag(), t ? h(e).replaceWith("<br>" + V.MARKERS) : r ? h(o).after("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : h(o).after("".concat(V.MARKERS, "<br>")), h(e).remove()) : v(e, t, n), !1;
                if (null === o) (r = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? h(e).replaceWith("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : !e.previousSibling || h(e.previousSibling).is("br") || e.nextSibling ? h(e).replaceWith("<br>".concat(V.MARKERS)) : h(e).replaceWith("<br>".concat(V.MARKERS, "<br>")); else {
                    var i = e, a = "";
                    "PRE" != o.tagName || e.nextSibling || (t = !0), u.node.isBlock(o) && !t || (a = "<br/>");
                    var s, l = "", c = "", d = "", f = "";
                    (r = u.html.defaultTag()) && u.node.isBlock(o) && (d = "<".concat(r, ">"), f = "</".concat(r, ">"), o.tagName === r.toUpperCase() && (d = u.node.openTagString(h(o).clone().removeAttr("id").get(0))));
                    do {
                        if (i = i.parentNode, !t || i !== o || t && !u.node.isBlock(o)) if (l += u.node.closeTagString(i), i === o && u.node.isBlock(o)) c = d + c; else {
                            var p = ("A" === i.tagName || u.node.hasClass(i, "fa")) && m(e, i) ? "fr-to-remove" : "";
                            c = u.node.openTagString(h(i).clone().addClass(p).get(0)) + c
                        }
                    } while (i !== o);
                    a = l + a + c + (e.parentNode === o && u.node.isBlock(o) ? "" : V.INVISIBLE_SPACE) + V.MARKERS, u.node.isBlock(o) && !h(o).find("*").last().is("br") && h(o).append("<br/>"), h(e).after('<span id="fr-break"></span>'), h(e).remove(), o.nextSibling && !u.node.isBlock(o.nextSibling) || u.node.isBlock(o) || h(o).after("<br>"), s = (s = !t && u.node.isBlock(o) ? u.node.openTagString(o) + h(o).html() + f : u.node.openTagString(o) + h(o).html() + u.node.closeTagString(o)).replace(/<span id="fr-break"><\/span>/g, a), h(o).replaceWith(s)
                }
            }

            function v(e, t, n) {
                var r = u.node.deepestParent(e, [], !n);
                if (null === r) u.html.defaultTag() && e.parentNode === u.el ? h(e).replaceWith("<".concat(u.html.defaultTag(), ">").concat(V.MARKERS, "<br></").concat(u.html.defaultTag(), ">")) : (e.nextSibling && !u.node.isBlock(e.nextSibling) || h(e).after("<br>"), h(e).replaceWith("<br>".concat(V.MARKERS))); else if (e.previousSibling && "IMG" == e.previousSibling.tagName || e.nextSibling && "IMG" == e.nextSibling.tagName) h(e).replaceWith("<" + u.html.defaultTag() + ">" + V.MARKERS + "<br></" + u.html.defaultTag() + ">"); else {
                    var o = e, i = "";
                    "PRE" === r.tagName && (t = !0), u.node.isBlock(r) && !t || (i = "<br>");
                    var a = "", s = "";
                    do {
                        var l = o;
                        if (o = o.parentNode, "BLOCKQUOTE" === r.tagName && u.node.isEmpty(l) && !u.node.hasClass(l, "fr-marker") && h(l).contains(e) && h(l).after(e), "BLOCKQUOTE" !== r.tagName || !m(e, o) && !g(e, o)) if (!t || o !== r || t && !u.node.isBlock(r)) {
                            a += u.node.closeTagString(o);
                            var c = "A" == o.tagName && m(e, o) || u.node.hasClass(o, "fa") ? "fr-to-remove" : "";
                            s = u.node.openTagString(h(o).clone().addClass(c).removeAttr("id").get(0)) + s
                        } else "BLOCKQUOTE" == r.tagName && t && (s = a = "")
                    } while (o !== r);
                    var d = r === e.parentNode && u.node.isBlock(r) || e.nextSibling;
                    if ("BLOCKQUOTE" === r.tagName) if (e.previousSibling && u.node.isBlock(e.previousSibling) && e.nextSibling && "BR" === e.nextSibling.tagName && (h(e.nextSibling).after(e), e.nextSibling && "BR" === e.nextSibling.tagName && h(e.nextSibling).remove()), t) i = a + i + V.MARKERS + s; else {
                        var f = u.html.defaultTag();
                        i = "".concat(a + i + (f ? "<".concat(f, ">") : "") + V.MARKERS, "<br>").concat(f ? "</".concat(f, ">") : "").concat(s)
                    } else i = a + i + s + (d ? "" : V.INVISIBLE_SPACE) + V.MARKERS;
                    h(e).replaceWith('<span id="fr-break"></span>');
                    var p = u.node.openTagString(r) + h(r).html() + u.node.closeTagString(r);
                    p = p.replace(/<span id="fr-break"><\/span>/g, i), h(r).replaceWith(p)
                }
            }

            return {
                enter: function b(e) {
                    var t = u.markers.insert();
                    if (!t) return !0;
                    for (var n = t.parentNode; n && !u.node.isElement(n);) {
                        if ("false" === n.getAttribute("contenteditable")) return h(t).replaceWith(V.MARKERS), u.selection.restore(), !1;
                        if ("true" === n.getAttribute("contenteditable")) break;
                        n = n.parentNode
                    }
                    u.el.normalize();
                    var r = !1;
                    0 < h(t).parentsUntil(u.$el, "BLOCKQUOTE").length && (r = !0), h(t).parentsUntil(u.$el, "TD, TH").length && (r = !1), i(t) ? !c(t) || e || r ? l(t, e, r) : u.cursorLists._endEnter(t) : a(t) ? !c(t) || e || r ? function s(e, t, n) {
                        var r, o = u.node.deepestParent(e, [], !n);
                        if (o && "TABLE" === o.tagName) return h(o).find("td, th").first().prepend(e), s(e, t, n);
                        if (o && "BLOCKQUOTE" === o.tagName) if (g(e, o)) {
                            if (!t) return (r = u.html.defaultTag()) ? h(o).before("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : h(o).before("".concat(V.MARKERS, "<br>")), h(e).remove(), !1
                        } else m(e, o) ? l(e, t, !0) : v(e, t, !0);
                        if (null === o) (r = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? h(e).replaceWith("<".concat(r, ">").concat(V.MARKERS, "<br></").concat(r, ">")) : h(e).replaceWith("<br>".concat(V.MARKERS)); else {
                            if (u.node.isBlock(o)) if ("PRE" === o.tagName && (t = !0), t) h(e).remove(), h(o).prepend("<br>".concat(V.MARKERS)); else if (e.nextSibling && "IMG" == e.nextSibling.tagName || e.nextSibling && e.nextSibling.nextElementSibling && "IMG" == e.nextSibling.nextElementSibling) h(e).replaceWith("<" + u.html.defaultTag() + ">" + V.MARKERS + "<br></" + u.html.defaultTag() + ">"); else {
                                if (u.node.isEmpty(o, !0)) return l(e, t, n);
                                if (u.opts.keepFormatOnDelete) {
                                    for (var i = e, a = V.INVISIBLE_SPACE; i !== o && !u.node.isElement(i);) i = i.parentNode, a = u.node.openTagString(i) + a + u.node.closeTagString(i);
                                    h(o).before(a)
                                } else h(o).before("".concat(u.node.openTagString(h(o).clone().removeAttr("id").get(0)), "<br>").concat(u.node.closeTagString(o)))
                            } else h(o).before("<br>");
                            h(e).remove()
                        }
                    }(t, e, r) : u.cursorLists._startEnter(t) : !c(t) || e || r ? v(t, e, r) : u.cursorLists._middleEnter(t), function o() {
                        u.$el.find(".fr-to-remove").each(function () {
                            for (var e = u.node.contents(this), t = 0; t < e.length; t++) e[t].nodeType === Node.TEXT_NODE && (e[t].textContent = e[t].textContent.replace(/\u200B/g, ""));
                            h(this).replaceWith(this.innerHTML)
                        })
                    }(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore()
                }, backspace: function E() {
                    var e = !1, t = u.markers.insert();
                    if (!t) return !0;
                    for (var n = t.parentNode; n && !u.node.isElement(n);) {
                        if ("false" === n.getAttribute("contenteditable")) return h(t).replaceWith(V.MARKERS), u.selection.restore(), !1;
                        if (n.innerText.length && "true" === n.getAttribute("contenteditable")) break;
                        n = n.parentNode
                    }
                    u.el.normalize();
                    var r = t.previousSibling;
                    if (r) {
                        var o = r.textContent;
                        o && o.length && 8203 === o.charCodeAt(o.length - 1) && (1 === o.length ? h(r).remove() : r.textContent = r.textContent.substr(0, o.length - d(o)))
                    }
                    return i(t) ? c(t) && g(t, h(t).parents("li").first().get(0)) ? u.cursorLists._backspace(t) : e = f(t) : a(t) ? c(t) && g(t, h(t).parents("li").first().get(0)) ? u.cursorLists._backspace(t) : function l(e) {
                        for (var t = 0 < h(e).parentsUntil(u.$el, "BLOCKQUOTE").length, n = u.node.deepestParent(e, [], !t), r = n; n && !n.previousSibling && "BLOCKQUOTE" !== n.tagName && n.parentElement !== u.el && !u.node.hasClass(n.parentElement, "fr-inner") && V.SIMPLE_ENTER_TAGS.indexOf(n.parentElement.tagName) < 0;) n = n.parentElement;
                        if (n && "BLOCKQUOTE" === n.tagName) {
                            var o = u.node.deepestParent(e, [h(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                            o && o.previousSibling && (r = n = o)
                        }
                        if (null !== n) {
                            var i, a = n.previousSibling;
                            if (u.node.isBlock(n) && u.node.isEditable(n)) if (a && V.NO_DELETE_TAGS.indexOf(a.tagName) < 0) {
                                if (u.node.isDeletable(a)) h(a).remove(), h(e).replaceWith(V.MARKERS); else if (u.node.isEditable(a)) if (u.node.isBlock(a)) if (u.node.isEmpty(a) && !u.node.isList(a)) h(a).remove(), h(e).after(u.opts.keepFormatOnDelete ? V.INVISIBLE_SPACE : ""); else {
                                    if (u.node.isList(a) && (a = h(a).find("li").last().get(0)), (i = u.node.contents(a)).length && "BR" === i[i.length - 1].tagName && h(i[i.length - 1]).remove(), "BLOCKQUOTE" === a.tagName && "BLOCKQUOTE" !== n.tagName) for (i = u.node.contents(a); i.length && u.node.isBlock(i[i.length - 1]);) a = i[i.length - 1], i = u.node.contents(a); else if ("BLOCKQUOTE" !== a.tagName && "BLOCKQUOTE" === r.tagName) for (i = u.node.contents(r); i.length && u.node.isBlock(i[0]);) r = i[0], i = u.node.contents(r);
                                    if (u.node.isEmpty(n)) h(e).remove(), u.selection.setAtEnd(a, !0); else {
                                        h(e).replaceWith(V.MARKERS);
                                        var s = a.childNodes;
                                        u.node.isBlock(s[s.length - 1]) ? h(s[s.length - 1]).append(r.innerHTML) : h(a).append(r.innerHTML)
                                    }
                                    h(r).remove(), u.node.isEmpty(n) && h(n).remove()
                                } else h(e).replaceWith(V.MARKERS), "BLOCKQUOTE" === n.tagName && a.nodeType === Node.ELEMENT_NODE ? h(a).remove() : (h(a).after(u.node.isEmpty(n) ? "" : h(n).html()), h(n).remove(), "BR" === a.tagName && h(a).remove())
                            } else a || (n && "BLOCKQUOTE" === n.tagName && 0 === h(n).text().replace(/\u200B/g, "").length ? h(n).remove() : u.node.isEmpty(n) && n.parentNode && u.node.isEditable(n.parentNode) && n.parentNode != u.el && h(n.parentNode).remove())
                        }
                    }(t) : e = f(t), h(t).remove(), p(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore(), e
                }, del: function r() {
                    var e = u.markers.insert();
                    if (!e) return !1;
                    if (u.el.normalize(), i(e)) if (c(e)) if (0 === h(e).parents("li").first().find("ul, ol").length) u.cursorLists._del(e); else {
                        var t = h(e).parents("li").first().find("ul, ol").first().find("li").first();
                        (t = t.find(u.html.blockTagsQuery()).get(-1) || t).prepend(e), u.cursorLists._backspace(e)
                    } else s(e); else a(e), n(e);
                    h(e).remove(), p(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists()), u.spaces.normalizeAroundCursor(), u.selection.restore()
                }, isAtEnd: m, isAtStart: g
            }
        }, V.MODULES.data = function (f) {
            function p(e) {
                return e
            }

            function c(e) {
                for (var t = e.toString(), n = 0, r = 0; r < t.length; r++) n += parseInt(t.charAt(r), 10);
                return 10 < n ? n % 9 + 1 : n
            }

            function d(e, t, n) {
                for (var r = Math.abs(n); 0 < r--;) e -= t;
                return n < 0 && (e += 123), e
            }

            function u(e) {
                return e && "block" !== e.css("display") ? (e.remove(), !0) : e && 0 === f.helpers.getPX(e.css("height")) ? (e.remove(), !0) : !(!e || "absolute" !== e.css("position") && "fixed" !== e.css("position") || (e.remove(), 0))
            }

            function h(e) {
                return e && 0 === f.$box.find(e).length
            }

            function g() {
                if (10 < e && (f[p(M("0ppecjvc=="))](), setTimeout(function () {
                    S.FE = null
                }, 10)), !f.$box) return !1;
                f.$wp.prepend(M(p(M(N)))), b = f.$wp.find("> div").first(), E = b.find("> a"), "rtl" === f.opts.direction && b.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++
            }

            function m(e) {
                for (var t = [M("9qqG-7amjlwq=="), M("KA3B3C2A6D1D5H5H1A3=="), M("3B9B3B5F3C4G3E3=="), M("QzbzvxyB2yA-9m=="), M("ji1kacwmgG5bc=="), M("nmA-13aogi1A3c1jd=="), M("BA9ggq=="), M("emznbjbH3fij=="), M("tkC-22d1qC-13sD1wzF-7=="), M("tA3jjf=="), M("1D1brkm==")], n = 0; n < t.length; n++) if (String.prototype.endsWith || (String.prototype.endsWith = function (e, t) {
                    return (void 0 === t || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
                }), e.endsWith(t[n])) return !0;
                return !1
            }

            function v() {
                var e = M(p(n)), t = M(p("tzgatD-13eD1dtdrvmF3c1nrC-7saQcdav==")).split(".");
                return window.parent.document.querySelector(e) && window[t[1]][t[2]]
            }

            var b, E, S = f.$,
                T = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2FC1A3NB2IF1HE1TH4WB8eB-11zVG2F3I3yYB5ZG4CB2DA15CC5AD3F1A1KG1oLA10B1A6wQF1H3vgale2C4F4XA2qc2A5D5B3pepmriKB3OE1HD1fUC10pjD-11E-11TB4YJ3bC-16zE-11yc1B2CE2BC3jhjKC1pdA-21OA6C1D5B-8vF4QA11pD6sqf1C3lldA-16BD4A2H3qoEA7bB-16rmNH5H1F1vSB7RE2A3TH4YC5A5b1A4d1B3whepyAC3AA2zknC3mbgf1SC4WH4PD8TC5ZB2C3H3jb2A5ZA2EF2aoFC5qqHC4B1H1zeGA7UA5RF4TA29TA6ZC4d1C3hyWA10A3rBB2E3decorationRD3QC10UD3E6E6ZD2F3F3fme2E5uxxrEC9C3E4fB-11azhHB1LD7D6VF4VVTPC6b1C4TYG3qzDD6B3B3AH4I2H2kxbHE1JD1yihfd1QD6WB1D4mhrc1B5rvFG3A14A7cDA2OC1AA1JB5zC-16KA6WB4C-8wvlTB5A5lkZB2C2C7zynBD2D2bI-7C-21d1HE2cubyvPC8A6VB3aroxxZE4C4F4e1I2BE1WjdifH1H4A14NA1GB1YG-10tWA3A14A9sVA2C5XH2A29b2A6gsleGG2jaED2D-13fhE1OA8NjwytyTD4e1sc1D-16ZC3B5C-9e1C2FB6EFF5B2C2JH4E1C2tdLE5A3UG4G-7b2D3B4fA-9oh1G3kqvB4AG3ibnjcAC6D2B1cDA9KC2QA6bRC4VA30RB8hYB2A4A-8h1A21A2B2==",
                y = "7D4YH4fkhHB3pqDC3H2E1fkMD1IB1NF1D3QD9wB5rxqlh1A8c2B4ZA3FD2AA6FB5EB3jJG4D2J-7aC-21GB6PC5RE4TC11QD6XC4XE3XH3mlvnqjbaOA2OC2BE6A1fmI-7ujwbc1G5f1F3e1C11mXF4owBG3E1yD1E4F1D2D-8B-8C-7yC-22HD1MF5UE4cWA3D8D6a1B2C3H3a3I3sZA4B3A2akfwEB3xHD5D1F1wIC11pA-16xdxtVI2C9A6YC4a1A2F3B2GA6B4C3lsjyJB1eMA1D-11MF5PE4ja1D3D7byrf1C3e1C7D-16lwqAF3H2A1B-21wNE1MA1OG1HB2A-16tSE5UD4RB3icRA4F-10wtwzBB3E1C3CC2DA8LA2LA1EB1kdH-8uVB7decorg1J2B7B6qjrqGI2J1C6ijehIB1hkemC-13hqkrH4H-7QD6XF5XF3HLNAC3CB2aD2CD2KB10B4ycg1A-8KA4H4B11jVB5TC4yqpB-21pd1E4pedzGB6MD5B3ncB-7MA4LD2JB6PD5uH-8TB9C7YD5XD2E3I3jmiDB3zeimhLD8E2F2JC1H-9ivkPC5lG-10SB1D3H3A-21rc1A3d1E3fsdqwfGA2KA1OrC-22LA6D1B4afUB16SC7AitC-8qYA11fsxcajGA15avjNE2A-9h1hDB16B9tPC1C5F5UC1G3B8d2A5d1D4RnHJ3C3JB5D3ucMG1yzD-17hafjC-8VD3yWC6e1YD2H3ZE2C8C5oBA3H3D2vFA4WzJC4C2i1A-65fNB8afWA1H4A26mvkC-13ZB3E3h1A21BC4eFB2GD2AA5ghqND2A2B2==",
                n = "MekC-11nB-8tIzpD7pewxvzC6mD-16xerg1==", C = "AA15A8B6C4B5A2E2B3B1A7==",
                N = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2EE1MA2ND1KD1IE4cA-21pSD2D5ve1G3h1A8b1E5ZC3CD2FA16mC5OC5E1hpnG1NA10B1D7hkUD4I-7b2C3C5nXD2E3F3whidEC2EH3GI2mJE2E2bxci1WA10VC7pllSG2F3A7xd1A4ZC3DB2aaeGA2DE4H2E1j1ywD-13FD1A3VE4WA3D8C6wuc1A2hf1B5B7vnrrjA1B9ic1mpbD1oMB1iSB7rWC4RI4G-7upB6jd1A2F3H2EA4FD3kDF4A2moc1anJD1TD4VI4b2C7oeQF4c1E3XC7ZA3C3G3uDB2wGB6D1JC4D1JD4C1hTE6QC5pH4pD3C-22D7c1A3textAA4gdlB2mpozkmhNC1mrxA3yWA5edhg1I2H3B7ozgmvAI3I2B5GD1LD2RSNH1KA1XA5SB4PA3sA9tlmC-9tnf1G3nd1coBH4I2I2JC3C-16LE6A1tnUA3vbwQB1G3f1A20a3A8a1C6pxAB2eniuE1F3kH2lnjB2hB-16XA5PF1G4zwtYA5B-11mzTG2B9pHB3BE2hGH3B3B2cMD5C1F1wzPA8E7VG5H5vD3H-7C8tyvsVF2I1G2A5fE3bg1mgajoyxMA4fhuzSD8aQB2B4g1A20ukb1A4B3F3GG2CujjanIC1ObiB11SD1C5pWC1D4YB8YE5FE-11jXE2F-7jB4CC2G-10uLH4E1C2tA-13yjUH5d1H1A7sWD5E4hmjF-7pykafoGA16hDD4joyD-8OA33B3C2tC7cRE4SA31a1B8d1e2A4F4g1A2A22CC5zwlAC2C1A12==",
                A = function () {
                    for (var e = 0, t = document.domain, n = t.split("."), r = "_gd".concat((new Date).getTime()); e < n.length - 1 && -1 === document.cookie.indexOf("".concat(r, "=").concat(r));) t = n.slice(-1 - ++e).join("."), document.cookie = "".concat(r, "=").concat(r, ";domain=").concat(t, ";");
                    return document.cookie = "".concat(r, "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=").concat(t, ";"), (t || "").replace(/(^\.*)|(\.*$)/g, "")
                }(), M = p(function O(e) {
                    if (!e) return e;
                    for (var t = "", n = p("charCodeAt"), r = p("fromCharCode"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), i = 1; i < e.length - 2; i++) {
                        for (var a = c(++o), s = e[n](i), l = ""; /[0-9-]/.test(e[i + 1]);) l += e[++i];
                        s = d(s, a, l = parseInt(l, 10) || 0), s ^= o - 1 & 31, t += String[r](s)
                    }
                    return t
                }), e = 0;
            return {
                _init: function x() {
                    var e = f.opts.key || [""],
                        t = M(p("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                    "string" == typeof e && (e = [e]);
                    for (var n, r, o, i = !(f.ul = !0), a = 0, s = 0; s < e.length; s++) {
                        var l = (r = e[s], 4 === (o = (M(r) || "").split("|")).length && "V3" === o[0] ? [o[1], o[3], o[2]] : [null, null, ""]),
                            c = l[2];
                        if (c === M(p(M("LGnD1KNZf1CPBYCAZB-8F3UDSLLSG1VFf1A3C2=="))) || 0 <= c.indexOf(A, c.length - A.length) || m(A) || v()) {
                            if (null !== (n = l[1]) && !(0 == n.indexOf("TRIAL") ? (n = new Date(n.replace(/TRIAL/, "")), new Date(n) < new Date && (T = y, 1)) : new Date(n) < new Date(M(C))) || !(0 < (A || "").length) || m(A) || v()) {
                                f.ul = !1;
                                break
                            }
                            i = !0, N = T, a = l[0] || -1
                        }
                    }
                    var d = new Image;
                    !0 === f.ul && (g(), d.src = i ? "".concat(p(M(t)), "e=").concat(a) : "".concat(p(M(t)), "u")), !0 === f.ul && (f.events.on("contentChanged", function () {
                        (function e() {
                            return u(b) || u(E) || h(b) || h(E)
                        })() && g()
                    }), f.events.on("html.get", function (e) {
                        return e + M("qD2H-9G3ioD-17qA1tE1B-8qI3A4hA-13C-11E2C1njfldD1E6pg1C-8sC3hfbkcD2G3stC-22gqgB3G2B-7vtoA4nweeD1A31A15B9uC-16A1F5dkykdc1B8dE-11bA3F2D3A9gd1E7F2tlI-8H-7vtxB2A5B2C3B2F2B5A6ldbyC4iqC-22D-17E-13mA3D2dywiB3oxlvfC1H4C2TjqbzlnI3ntB4E3qA2zaqsC6D3pmnkoE3C6D5wvuE3bwifdhB6hch1E4xibD-17dmrC1rG-7pntnF6nB-8F1D2A11C8plrkmF2F3MC-16bocqA2WwA-21ayeA1C4d1isC-22rD-13D6DfjpjtC2E6hB2G2G4A-7D2==")
                    })), f.events.on("html.set", function () {
                        var e = f.el.querySelector('[data-f-id="pbf"]');
                        e && S(e).remove()
                    }), f.events.on("destroy", function () {
                        b && b.length && b.remove()
                    }, !0)
                }
            }
        }, V.MODULES.edit = function (t) {
            function e() {
                if (t.browser.mozilla) try {
                    t.doc.execCommand("enableObjectResizing", !1, "false"), t.doc.execCommand("enableInlineTableEditing", !1, "false")
                } catch (e) {
                }
                if (t.browser.msie) try {
                    t.doc.body.addEventListener("mscontrolselect", function (e) {
                        return e.srcElement.focus(), !1
                    })
                } catch (e) {
                }
            }

            var n = !1;

            function r() {
                return n
            }

            return {
                _init: function o() {
                    t.events.on("focus", function () {
                        r() ? t.edit.off() : t.edit.on()
                    })
                }, on: function i() {
                    t.$wp ? (t.$el.attr("contenteditable", !0), t.$el.removeClass("fr-disabled").attr("aria-disabled", !1), e()) : t.$el.is("a") && t.$el.attr("contenteditable", !0), t.events.trigger("edit.on", [], !0), n = !1
                }, off: function a() {
                    t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", !1), t.$el.addClass("fr-disabled").attr("aria-disabled", !0)) : t.$el.is("a") && t.$el.attr("contenteditable", !1), t.events.trigger("edit.off"), t.events.enableBlur(), n = !0
                }, disableDesign: e, isDisabled: r
            }
        }, V.MODULES.format = function (b) {
            var E = b.$;

            function f(e, t) {
                var n = "<".concat(e);
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n += " ".concat(r, '="').concat(t[r], '"'));
                return n += ">"
            }

            function S(e, t) {
                var n = e;
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n += "id" === r ? "#".concat(t[r]) : "class" === r ? ".".concat(t[r]) : "[".concat(r, '="').concat(t[r], '"]'));
                return n
            }

            function T(e, t) {
                return !(!e || e.nodeType !== Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
            }

            function m(e, t, n) {
                if (e) {
                    for (; e.nodeType === Node.COMMENT_NODE;) e = e.nextSibling;
                    if (e) {
                        if (b.node.isBlock(e) && "HR" !== e.tagName) return b.node.hasClass(e.firstChild, "fr-marker") ? m(e.firstChild.nextSibling, t, n) : m(e.firstChild, t, n), !1;
                        var r = E(b.doc.createElement(t));
                        r.attr(n), r.insertBefore(e);
                        for (var o = e; o && !E(o).is(".fr-marker") && 0 === E(o).find(".fr-marker").length && "UL" !== o.tagName && "OL" !== o.tagName;) {
                            var i = o;
                            if (b.node.isBlock(o) && "HR" !== e.tagName) return m(o.firstChild, t, n), !1;
                            o = o.nextSibling, r.append(i)
                        }
                        if (o) {
                            if (E(o).find(".fr-marker").length || "UL" === o.tagName || "OL" === o.tagName) m(o.firstChild, t, n); else if (b.browser.mozilla && b.node.hasClass(o, "fr-marker")) {
                                var a, s = b.selection.blocks(), l = s.length;
                                for (a = 0; a < l; a++) s[a] != o.parentNode && s[a].childNodes.length && s[a].childNodes[0] != o.parentNode && (o = s[a].childNodes[1] || s[a].childNodes[0], (r = E(f(t, n)).insertBefore(o)).append(o))
                            }
                        } else {
                            for (var c = r.get(0).parentNode; c && !c.nextSibling && !b.node.isElement(c);) c = c.parentNode;
                            if (c) {
                                var d = c.nextSibling;
                                d && (b.node.isBlock(d) ? "HR" === d.tagName ? m(d.nextSibling, t, n) : m(d.firstChild, t, n) : m(d, t, n))
                            }
                        }
                        r.is(":empty") && r.remove()
                    }
                }
            }

            function n(e, t) {
                var n;
                if (void 0 === t && (t = {}), t.style && delete t.style, b.selection.isCollapsed()) {
                    b.markers.insert(), b.$el.find(".fr-marker").replaceWith(f(e, t) + V.INVISIBLE_SPACE + V.MARKERS + function a(e) {
                        return "</".concat(e, ">")
                    }(e)), b.selection.restore()
                } else {
                    var r;
                    b.selection.save(), m(b.$el.find('.fr-marker[data-type="true"]').length && b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, e, t);
                    do {
                        for (r = b.$el.find("".concat(S(e, t), " > ").concat(S(e, t))), n = 0; n < r.length; n++) r[n].outerHTML = r[n].innerHTML
                    } while (r.length);
                    b.el.normalize();
                    var o = b.el.querySelectorAll(".fr-marker");
                    for (n = 0; n < o.length; n++) {
                        var i = E(o[n]);
                        !0 === i.data("type") ? T(i.get(0).nextSibling, S(e, t)) && i.next().prepend(i) : T(i.get(0).previousSibling, S(e, t)) && i.prev().append(i)
                    }
                    b.selection.restore()
                }
            }

            function y(e, t, n, r) {
                if (!r) {
                    var o = !1;
                    if (!0 === e.data("type")) for (; b.node.isFirstSibling(e.get(0)) && !e.parent().is(b.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().before(e), o = !0; else if (!1 === e.data("type")) for (; b.node.isLastSibling(e.get(0)) && !e.parent().is(b.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().after(e), o = !0;
                    if (o) return !0
                }
                if (e.parents(t).length || void 0 === t) {
                    var i, a = "", s = "", l = e.parent();
                    if (l.is(b.$el) || b.node.isBlock(l.get(0))) return !1;
                    for (; !(b.node.isBlock(l.parent().get(0)) || void 0 !== t && T(l.get(0), S(t, n)));) a += b.node.closeTagString(l.get(0)), s = b.node.openTagString(l.get(0)) + s, l = l.parent();
                    var c = e.get(0).outerHTML;
                    return e.replaceWith('<span id="mark"></span>'), i = l.html().replace(/<span id="mark"><\/span>/, a + b.node.closeTagString(l.get(0)) + s + c + a + b.node.openTagString(l.get(0)) + s), l.replaceWith(b.node.openTagString(l.get(0)) + i + b.node.closeTagString(l.get(0))), !0
                }
                return !1
            }

            function r(e, t) {
                void 0 === t && (t = {}), t.style && delete t.style;
                var n = b.selection.isCollapsed();
                b.selection.save();
                for (var r = !0; r;) {
                    r = !1;
                    for (var o = b.$el.find(".fr-marker"), i = 0; i < o.length; i++) {
                        var a = E(o[i]), s = null;
                        if (a.attr("data-cloned") || n || (s = a.clone().removeClass("fr-marker").addClass("fr-clone"), a.data("type") && "true" === a.data("type").toString() ? a.attr("data-cloned", !0).after(s) : a.attr("data-cloned", !0).before(s)), y(a, e, t, n)) {
                            r = !0;
                            break
                        }
                    }
                }
                !function m(e, t, n, r) {
                    for (var o = b.node.contents(e.get(0)), i = 0; i < o.length; i++) {
                        var a = o[i];
                        if (a.innerHTML && 8203 == a.innerHTML.charCodeAt() && a.tagName.toLocaleLowerCase() == n && (a.outerHTML = a.innerHTML), b.node.hasClass(a, "fr-marker")) t = (t + 1) % 2; else if (t) if (0 < E(a).find(".fr-marker").length) t = m(E(a), t, n, r); else {
                            for (var s = E(a).find(n || "*:not(br)"), l = s.length - 1; 0 <= l; l--) {
                                var c = s[l];
                                b.node.isBlock(c) || b.node.isVoid(c) || void 0 !== n && !T(c, S(n, r)) ? b.node.isBlock(c) && void 0 === n && "TABLE" !== a.tagName && b.node.clearAttributes(c) : b.node.hasClass(c, "fr-clone") || (c.outerHTML = c.innerHTML)
                            }
                            void 0 === n && a.nodeType === Node.ELEMENT_NODE && !b.node.isVoid(a) || T(a, S(n, r)) ? b.node.isBlock(a) || b.node.hasClass(a, "fr-clone") || (a.outerHTML = a.innerHTML) : void 0 === n && a.nodeType === Node.ELEMENT_NODE && b.node.isBlock(a) && "TABLE" !== a.tagName && b.node.clearAttributes(a)
                        } else 0 < E(a).find(".fr-marker").length && (t = m(E(a), t, n, r))
                    }
                    return t
                }(b.$el, 0, e, t), n || (b.$el.find(".fr-marker").remove(), b.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), n && b.$el.find(".fr-marker").before(V.INVISIBLE_SPACE).after(V.INVISIBLE_SPACE), b.html.cleanEmptyTags(), b.el.normalize(), b.selection.restore();
                var l = b.win.getSelection() && b.win.getSelection().anchorNode;
                if (l) {
                    var c = b.node.blockParent(l), d = !!l.textContent.replace(/\u200B/g, "").length,
                        f = b.win.getSelection().getRangeAt(0), p = f.startOffset, u = f.endOffset;
                    b.selection.text().replace(/\u200B/g, "").length || function v(e, t) {
                        if (e && t) {
                            if (e.isSameNode(t) ? e.textContent = e.textContent.replace(/\u200B(?=.*\u200B)/g, "") : e.nodeType === Node.TEXT_NODE && (e.textContent = e.textContent.replace(/\u200B/g, "")), !e.childNodes.length) return !1;
                            Array.isArray(e.childNodes) && e.childNodes.forEach(function (e) {
                                v(e, t)
                            })
                        }
                    }(c, l);
                    var h = b.win.getSelection().getRangeAt(0);
                    if (l.nodeType === Node.TEXT_NODE && (!d || !b.selection.text().length && p === u)) {
                        var g = l.textContent.search(/\u200B/g) + 1;
                        h.setStart(l, g), h.setEnd(l, g)
                    }
                }
            }

            function t(e, t) {
                var n, r, o, i, a, s = null;
                if (b.selection.isCollapsed()) {
                    b.markers.insert();
                    var l = (r = b.$el.find(".fr-marker")).parent();
                    if (b.node.openTagString(l.get(0)) === '<span style="'.concat(e, ": ").concat(l.css(e), ';">')) {
                        if (b.node.isEmpty(l.get(0))) s = E(b.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t, ";")).html("".concat(V.INVISIBLE_SPACE).concat(V.MARKERS)), l.replaceWith(s); else {
                            var c = {};
                            c["style*"] = "".concat(e, ":"), y(r, "span", c, !0), r = b.$el.find(".fr-marker"), t ? (s = E(b.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t, ";")).html("".concat(V.INVISIBLE_SPACE).concat(V.MARKERS)), r.replaceWith(s)) : r.replaceWith(V.INVISIBLE_SPACE + V.MARKERS)
                        }
                        b.html.cleanEmptyTags()
                    } else b.node.isEmpty(l.get(0)) && l.is("span") ? (r.replaceWith(V.MARKERS), l.css(e, t)) : (s = E('<span style="'.concat(e, ": ").concat(t, ';">').concat(V.INVISIBLE_SPACE).concat(V.MARKERS, "</span>")), r.replaceWith(s));
                    s && v(s, e, t)
                } else {
                    if (b.selection.save(), null === t || "color" === e && 0 < b.$el.find(".fr-marker").parents("u, a").length) {
                        var d = b.$el.find(".fr-marker");
                        for (n = 0; n < d.length; n++) if (!0 === (r = E(d[n])).data("type") || "true" === r.data("type")) for (; b.node.isFirstSibling(r.get(0)) && !r.parent().is(b.$el) && !b.node.isElement(r.parent().get(0)) && !b.node.isBlock(r.parent().get(0));) r.parent().before(r); else for (; b.node.isLastSibling(r.get(0)) && !r.parent().is(b.$el) && !b.node.isElement(r.parent().get(0)) && !b.node.isBlock(r.parent().get(0));) r.parent().after(r)
                    }
                    for (var f = b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling; f.firstChild;) f = f.firstChild;
                    var p = {"class": "fr-unprocessed"};
                    for (t && (p.style = "".concat(e, ": ").concat(t, ";")), m(f, "span", p), b.$el.find(".fr-marker + .fr-unprocessed").each(function () {
                        E(this).prepend(E(this).prev())
                    }), b.$el.find(".fr-unprocessed + .fr-marker").each(function () {
                        E(this).prev().append(E(this))
                    }), (t || "").match(/\dem$/) && b.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < b.$el.find("span.fr-unprocessed").length;) {
                        if ((s = b.$el.find("span.fr-unprocessed").first().removeClass("fr-unprocessed")).parent().get(0).normalize(), s.parent().is("span") && 1 === s.parent().get(0).childNodes.length) {
                            s.parent().css(e, t);
                            var u = s;
                            s = s.parent(), u.replaceWith(u.html())
                        }
                        var h = s.find("span");
                        for (n = h.length - 1; 0 <= n; n--) o = h[n], i = e, a = void 0, (a = E(o)).css(i, ""), "" === a.attr("style") && a.replaceWith(a.html());
                        v(s, e, t)
                    }
                }
                !function g() {
                    var e;
                    for (; 0 < b.$el.find(".fr-split:empty").length;) b.$el.find(".fr-split:empty").remove();
                    b.$el.find(".fr-split").removeClass("fr-split"), b.$el.find('[style=""]').removeAttr("style"), b.$el.find('[class=""]').removeAttr("class"), b.html.cleanEmptyTags();
                    for (var t = b.$el.find("span"), n = t.length - 1; 0 <= n; n--) {
                        var r = t[n];
                        r.attributes && 0 !== r.attributes.length || E(r).replaceWith(r.innerHTML)
                    }
                    b.el.normalize();
                    var o = b.$el.find("span[style] + span[style]");
                    for (e = 0; e < o.length; e++) {
                        var i = E(o[e]), a = E(o[e]).prev();
                        i.get(0).previousSibling === a.get(0) && b.node.openTagString(i.get(0)) === b.node.openTagString(a.get(0)) && (i.prepend(a.html()), a.remove())
                    }
                    b.$el.find("span[style] span[style]").each(function () {
                        if (0 <= E(this).attr("style").indexOf("font-size")) {
                            var e = E(this).parents("span[style]");
                            0 <= e.attr("style").indexOf("background-color") && (E(this).attr("style", "".concat(E(this).attr("style"), ";").concat(e.attr("style"))), y(E(this), "span[style]", {}, !1))
                        }
                    }), b.el.normalize(), b.selection.restore()
                }()
            }

            function v(e, t, n) {
                var r, o, i, a = e.parentsUntil(b.$el, "span[style]"), s = [];
                for (r = a.length - 1; 0 <= r; r--) o = a[r], i = t, 0 === E(o).attr("style").indexOf("".concat(i, ":")) || 0 <= E(o).attr("style").indexOf(";".concat(i, ":")) || 0 <= E(o).attr("style").indexOf("; ".concat(i, ":")) || s.push(a[r]);
                if ((a = a.not(s)).length) {
                    for (var l = "", c = "", d = "", f = "", p = e.get(0); p = p.parentNode, E(p).addClass("fr-split"), l += b.node.closeTagString(p), c = b.node.openTagString(E(p).clone().addClass("fr-split").get(0)) + c, a.get(0) !== p && (d += b.node.closeTagString(p), f = b.node.openTagString(E(p).clone().addClass("fr-split").get(0)) + f), a.get(0) !== p;) ;
                    var u = "".concat(l + b.node.openTagString(E(a.get(0)).clone().css(t, n || "").get(0)) + f + e.css(t, "").get(0).outerHTML + d, "</span>").concat(c);
                    e.replaceWith('<span id="fr-break"></span>');
                    var h = a.get(0).outerHTML;
                    E(a.get(0)).replaceWith(h.replace(/<span id="fr-break"><\/span>/g, function () {
                        return u
                    }))
                }
            }

            function o(e, t) {
                void 0 === t && (t = {}), t.style && delete t.style;
                var n = b.selection.ranges(0), r = n.startContainer;
                if (r.nodeType === Node.ELEMENT_NODE && 0 < r.childNodes.length && r.childNodes[n.startOffset] && (r = r.childNodes[n.startOffset]), !n.collapsed && r.nodeType === Node.TEXT_NODE && n.startOffset === (r.textContent || "").length) {
                    for (; !b.node.isBlock(r.parentNode) && !r.nextSibling;) r = r.parentNode;
                    r.nextSibling && (r = r.nextSibling)
                }
                for (var o = r; o && o.nodeType === Node.ELEMENT_NODE && !T(o, S(e, t));) o = o.firstChild;
                if (o && o.nodeType === Node.ELEMENT_NODE && T(o, S(e, t))) return !0;
                var i = r;
                for (i && i.nodeType !== Node.ELEMENT_NODE && (i = i.parentNode); i && i.nodeType === Node.ELEMENT_NODE && i !== b.el && !T(i, S(e, t));) i = i.parentNode;
                return !(!i || i.nodeType !== Node.ELEMENT_NODE || i === b.el || !T(i, S(e, t)))
            }

            return {
                is: o, toggle: function i(e, t) {
                    o(e, t) ? r(e, t) : n(e, t)
                }, apply: n, remove: r, applyStyle: t, removeStyle: function a(e) {
                    t(e, null)
                }
            }
        }, V.MODULES.spaces = function (c) {
            function r(e, t) {
                var n = e.previousSibling, r = e.nextSibling, o = e.textContent, i = e.parentNode,
                    a = [V.ENTER_P, V.ENTER_DIV, V.ENTER_BR];
                if (!c.html.isPreformatted(i)) {
                    t && (o = o.replace(/[\f\n\r\t\v ]{2,}/g, " "), r && "BR" !== r.tagName && !c.node.isBlock(r) || !(c.node.isBlock(i) || c.node.isLink(i) && !i.nextSibling || c.node.isElement(i)) || (o = o.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !c.node.isBlock(n) || !(c.node.isBlock(i) || c.node.isLink(i) && !i.previousSibling || c.node.isElement(i)) || (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), (c.node.isBlock(r) || c.node.isBlock(n)) && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " === o && (n && c.node.isVoid(n) || r && c.node.isVoid(r)) && !(n && r && c.node.isVoid(n) || r && n && c.node.isVoid(r)) && (o = "")), (!n && c.node.isBlock(r) || !r && c.node.isBlock(n)) && c.node.isBlock(i) && i !== c.el && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), t || (o = o.replace(new RegExp(V.UNICODE_NBSP, "g"), " "));
                    for (var s = "", l = 0; l < o.length; l++) 32 != o.charCodeAt(l) || 0 !== l && 32 != s.charCodeAt(l - 1) || (c.opts.enter !== V.ENTER_BR && c.opts.enter !== V.ENTER_DIV || !(n && "BR" === n.tagName || r && "BR" === r.tagName)) && (n && r && c.node.isVoid(n) || n && r && c.node.isVoid(r)) ? s += o[l] : s += V.UNICODE_NBSP;
                    (!r || r && c.node.isBlock(r) || r && r.nodeType === Node.ELEMENT_NODE && c.win.getComputedStyle(r) && "block" === c.win.getComputedStyle(r).display) && (!c.node.isVoid(n) || n && -1 !== ["P", "DIV", "BR"].indexOf(n.tagName) && -1 !== a.indexOf(c.opts.enter)) && (s = s.replace(/ $/, V.UNICODE_NBSP)), !n || c.node.isVoid(n) || c.node.isBlock(n) || 1 !== (s = s.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== s.charCodeAt(0) || !r || c.node.isVoid(r) || c.node.isBlock(r) || c.node.hasClass(n, "fr-marker") && c.node.hasClass(r, "fr-marker") || (s = " "), t || (s = s.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), e.textContent !== s && (e.textContent = s)
                }
            }

            function l(e, t) {
                if (void 0 !== e && e || (e = c.el), void 0 === t && (t = !1), !e.getAttribute || "false" !== e.getAttribute("contenteditable")) if (e.nodeType === Node.TEXT_NODE) r(e, t); else if (e.nodeType === Node.ELEMENT_NODE) for (var n = c.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, c.node.filter(function (e) {
                    for (var t = e.parentNode; t && t !== c.el;) {
                        if ("STYLE" === t.tagName || "IFRAME" === t.tagName) return !1;
                        if ("PRE" === t.tagName) return !1;
                        t = t.parentNode
                    }
                    return null !== e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !c.node.hasClass(e.parentNode, "fr-marker")
                }), !1); n.nextNode();) r(n.currentNode, t)
            }

            return {
                normalize: l, normalizeAroundCursor: function d() {
                    for (var e = [], t = c.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
                        for (var r = null, o = c.node.blockParent(t[n]), i = (r = o || t[n]).nextSibling, a = r.previousSibling; i && "BR" === i.tagName;) i = i.nextSibling;
                        for (; a && "BR" === a.tagName;) a = a.previousSibling;
                        r && e.indexOf(r) < 0 && e.push(r), a && e.indexOf(a) < 0 && e.push(a), i && e.indexOf(i) < 0 && e.push(i)
                    }
                    for (var s = 0; s < e.length; s++) l(e[s])
                }
            }
        }, V.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'.concat(V.INVISIBLE_SPACE = "&#8203;", "</span>"), V.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'.concat(V.INVISIBLE_SPACE, "</span>"), V.MARKERS = V.START_MARKER + V.END_MARKER, V.MODULES.markers = function (d) {
            var f = d.$;

            function l() {
                if (!d.$wp) return null;
                try {
                    var e = d.selection.ranges(0), t = e.commonAncestorContainer;
                    if (t !== d.el && !d.$el.contains(t)) return null;
                    var n = e.cloneRange(), r = e.cloneRange();
                    n.collapse(!0);
                    var o = f(d.doc.createElement("SPAN")).addClass("fr-marker").attr("style", "display: none; line-height: 0;").html(V.INVISIBLE_SPACE).get(0);
                    if (n.insertNode(o), o = d.$el.find("span.fr-marker").get(0)) {
                        for (var i = o.nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) f(i).remove(), i = d.$el.find("span.fr-marker").get(0).nextSibling;
                        return d.selection.clear(), d.selection.get().addRange(r), o
                    }
                    return null
                } catch (a) {
                }
            }

            function c() {
                d.$el.find(".fr-marker").remove()
            }

            return {
                place: function p(e, t, n) {
                    var r, o, i;
                    try {
                        var a = e.cloneRange();
                        if (a.collapse(t), a.insertNode(function l(e, t) {
                            var n = f(d.doc.createElement("SPAN"));
                            return n.addClass("fr-marker").attr("data-id", t).attr("data-type", e).attr("style", "display: ".concat(d.browser.safari ? "none" : "inline-block", "; line-height: 0;")).html(V.INVISIBLE_SPACE), n.get(0)
                        }(t, n)), !0 === t) for (i = (r = d.$el.find('span.fr-marker[data-type="true"][data-id="'.concat(n, '"]')).get(0)).nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) f(i).remove(), i = r.nextSibling;
                        if (!0 === t && !e.collapsed) {
                            for (; !d.node.isElement(r.parentNode) && !i;) f(r.parentNode).after(r), i = r.nextSibling;
                            if (i && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
                                for (o = [i]; i = o[0], (o = d.node.contents(i))[0] && d.node.isBlock(o[0]);) ;
                                f(i).prepend(f(r))
                            }
                        }
                        if (!1 === t && !e.collapsed) {
                            if ((i = (r = d.$el.find('span.fr-marker[data-type="false"][data-id="'.concat(n, '"]')).get(0)).previousSibling) && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
                                for (o = [i]; i = o[o.length - 1], (o = d.node.contents(i))[o.length - 1] && d.node.isBlock(o[o.length - 1]);) ;
                                f(i).append(f(r))
                            }
                            (r.parentNode && 0 <= ["TD", "TH"].indexOf(r.parentNode.tagName) || !r.previousSibling && d.node.isBlock(r.parentElement)) && r.parentNode.previousSibling && !r.previousSibling && f(r.parentNode.previousSibling).append(r)
                        }
                        var s = d.$el.find('span.fr-marker[data-type="'.concat(t, '"][data-id="').concat(n, '"]')).get(0);
                        return s && (s.style.display = "none"), s
                    } catch (c) {
                        return null
                    }
                }, insert: l, split: function a() {
                    d.selection.isCollapsed() || d.selection.remove();
                    var e = d.$el.find(".fr-marker").get(0);
                    if (e || (e = l()), !e) return null;
                    var t = d.node.deepestParent(e);
                    if (t || (t = d.node.blockParent(e)) && "LI" !== t.tagName && (t = null), t) if (d.node.isBlock(t) && d.node.isEmpty(t)) "LI" !== t.tagName || t.parentNode.firstElementChild !== t || d.node.isEmpty(t.parentNode) ? f(t).replaceWith('<span class="fr-marker"></span>') : f(t).append('<span class="fr-marker"></span>'); else if (d.cursor.isAtStart(e, t)) f(t).before('<span class="fr-marker"></span>'), f(e).remove(); else if (d.cursor.isAtEnd(e, t)) f(t).after('<span class="fr-marker"></span>'), f(e).remove(); else {
                        for (var n = e, r = "", o = ""; n = n.parentNode, r += d.node.closeTagString(n), o = d.node.openTagString(n) + o, n !== t;) ;
                        f(e).replaceWith('<span id="fr-break"></span>');
                        var i = d.node.openTagString(t) + f(t).html() + d.node.closeTagString(t);
                        i = i.replace(/<span id="fr-break"><\/span>/g, "".concat(r, '<span class="fr-marker"></span>').concat(o)), f(t).replaceWith(i)
                    }
                    return d.$el.find(".fr-marker").get(0)
                }, insertAtPoint: function u(e) {
                    var t, n = e.clientX, r = e.clientY;
                    c();
                    var o = null;
                    if ("undefined" != typeof d.doc.caretPositionFromPoint ? (t = d.doc.caretPositionFromPoint(n, r), (o = d.doc.createRange()).setStart(t.offsetNode, t.offset), o.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d.doc.caretRangeFromPoint && (t = d.doc.caretRangeFromPoint(n, r), (o = d.doc.createRange()).setStart(t.startContainer, t.startOffset), o.setEnd(t.startContainer, t.startOffset)), null !== o && "undefined" != typeof d.win.getSelection) {
                        var i = d.win.getSelection();
                        i.removeAllRanges(), i.addRange(o)
                    } else if ("undefined" != typeof d.doc.body.createTextRange) try {
                        (o = d.doc.body.createTextRange()).moveToPoint(n, r);
                        var a = o.duplicate();
                        a.moveToPoint(n, r), o.setEndPoint("EndToEnd", a), o.select()
                    } catch (s) {
                        return !1
                    }
                    l()
                }, remove: c
            }
        }, V.MODULES.selection = function (T) {
            var y = T.$;

            function s() {
                var e = "";
                return T.win.getSelection ? e = T.win.getSelection() : T.doc.getSelection ? e = T.doc.getSelection() : T.doc.selection && (e = T.doc.selection.createRange().text), e.toString()
            }

            function S() {
                return T.win.getSelection ? T.win.getSelection() : T.doc.getSelection ? T.doc.getSelection() : T.doc.selection.createRange()
            }

            function d(e) {
                var t = S(), n = [];
                if (t && t.getRangeAt && t.rangeCount) {
                    n = [];
                    for (var r = 0; r < t.rangeCount; r++) n.push(t.getRangeAt(r))
                } else n = T.doc.createRange ? [T.doc.createRange()] : [];
                return void 0 !== e ? n[e] : n
            }

            function C() {
                var e = S();
                try {
                    e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear()
                } catch (t) {
                }
            }

            function f(e, t) {
                var n = e;
                return n.nodeType === Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), n.nodeType === Node.TEXT_NODE && (n = n.parentNode), n
            }

            function N() {
                if (T.$wp) {
                    T.markers.remove();
                    var e, t, n = d(), r = [];
                    for (t = 0; t < n.length; t++) if (n[t].startContainer !== T.doc || T.browser.msie) {
                        var o = (e = n[t]).collapsed, i = T.markers.place(e, !0, t), a = T.markers.place(e, !1, t);
                        if (void 0 !== i && i || !o || (y(".fr-marker").remove(), T.selection.setAtEnd(T.el)), T.el.normalize(), T.browser.safari && !o) try {
                            (e = T.doc.createRange()).setStartAfter(i), e.setEndBefore(a), r.push(e)
                        } catch (s) {
                        }
                    }
                    if (T.browser.safari && r.length) for (T.selection.clear(), t = 0; t < r.length; t++) T.selection.get().addRange(r[t])
                }
            }

            function A() {
                var e, t = T.el.querySelectorAll('.fr-marker[data-type="true"]');
                if (!T.$wp) return T.markers.remove(), !1;
                if (0 === t.length) return !1;
                if (T.browser.msie || T.browser.edge) for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
                T.core.hasFocus() || T.browser.msie || T.browser.webkit || T.$el.focus(), C();
                var n = S();
                for (e = 0; e < t.length; e++) {
                    var r = y(t[e]).data("id"), o = t[e], i = T.doc.createRange(),
                        a = T.$el.find('.fr-marker[data-type="false"][data-id="'.concat(r, '"]'));
                    (T.browser.msie || T.browser.edge) && a.css("display", "inline-block");
                    var s = null;
                    if (0 < a.length) {
                        a = a[0];
                        try {
                            for (var l = !1, c = o.nextSibling, d = null; c && c.nodeType === Node.TEXT_NODE && 0 === c.textContent.length;) c = (d = c).nextSibling, y(d).remove();
                            for (var f = a.nextSibling; f && f.nodeType === Node.TEXT_NODE && 0 === f.textContent.length;) f = (d = f).nextSibling, y(d).remove();
                            if (o.nextSibling === a || a.nextSibling === o) {
                                for (var p = o.nextSibling === a ? o : a, u = p === o ? a : o, h = p.previousSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.length;) h = (d = h).previousSibling, y(d).remove();
                                if (h && h.nodeType === Node.TEXT_NODE) for (; h && h.previousSibling && h.previousSibling.nodeType === Node.TEXT_NODE;) h.previousSibling.textContent += h.textContent, h = h.previousSibling, y(h.nextSibling).remove();
                                for (var g = u.nextSibling; g && g.nodeType === Node.TEXT_NODE && 0 === g.length;) g = (d = g).nextSibling, y(d).remove();
                                if (g && g.nodeType === Node.TEXT_NODE) for (; g && g.nextSibling && g.nextSibling.nodeType === Node.TEXT_NODE;) g.nextSibling.textContent = g.textContent + g.nextSibling.textContent, g = g.nextSibling, y(g.previousSibling).remove();
                                if (h && (T.node.isVoid(h) || T.node.isBlock(h)) && (h = null), g && (T.node.isVoid(g) || T.node.isBlock(g)) && (g = null), h && g && h.nodeType === Node.TEXT_NODE && g.nodeType === Node.TEXT_NODE) {
                                    y(o).remove(), y(a).remove();
                                    var m = h.textContent.length;
                                    h.textContent += g.textContent, y(g).remove(), T.opts.htmlUntouched || T.spaces.normalize(h), i.setStart(h, m), i.setEnd(h, m), l = !0
                                } else !h && g && g.nodeType === Node.TEXT_NODE ? (y(o).remove(), y(a).remove(), T.opts.htmlUntouched || T.spaces.normalize(g), s = y(T.doc.createTextNode("\u200b")).get(0), y(g).before(s), i.setStart(g, 0), i.setEnd(g, 0), l = !0) : !g && h && h.nodeType === Node.TEXT_NODE && (y(o).remove(), y(a).remove(), T.opts.htmlUntouched || T.spaces.normalize(h), s = y(T.doc.createTextNode("\u200b")).get(0), y(h).after(s), i.setStart(h, h.textContent.length), i.setEnd(h, h.textContent.length), l = !0)
                            }
                            if (!l) {
                                var v = void 0, b = void 0;
                                b = (T.browser.chrome || T.browser.edge) && o.nextSibling === a ? (v = M(a, i, !0) || i.setStartAfter(a), M(o, i, !1) || i.setEndBefore(o)) : (o.previousSibling === a && (a = (o = a).nextSibling), a.nextSibling && "BR" === a.nextSibling.tagName || !a.nextSibling && T.node.isBlock(o.previousSibling) || o.previousSibling && "BR" === o.previousSibling.tagName || (o.style.display = "inline", a.style.display = "inline", s = y(T.doc.createTextNode("\u200b")).get(0)), v = M(o, i, !0) || y(o).before(s) && i.setStartBefore(o), M(a, i, !1) || y(a).after(s) && i.setEndAfter(a)), "function" == typeof v && v(), "function" == typeof b && b()
                            }
                        } catch (E) {
                        }
                    }
                    s && y(s).remove();
                    try {
                        n.addRange(i)
                    } catch (E) {
                    }
                }
                T.markers.remove()
            }

            function M(e, t, n) {
                var r, o = e.previousSibling, i = e.nextSibling;
                return o && i && o.nodeType === Node.TEXT_NODE && i.nodeType === Node.TEXT_NODE ? (r = o.textContent.length, n ? (i.textContent = o.textContent + i.textContent, y(o).remove(), y(e).remove(), T.opts.htmlUntouched || T.spaces.normalize(i), function () {
                    t.setStart(i, r)
                }) : (o.textContent += i.textContent, y(i).remove(), y(e).remove(), T.opts.htmlUntouched || T.spaces.normalize(o), function () {
                    t.setEnd(o, r)
                })) : o && !i && o.nodeType === Node.TEXT_NODE ? (r = o.textContent.length, n ? (T.opts.htmlUntouched || T.spaces.normalize(o), function () {
                    t.setStart(o, r)
                }) : (T.opts.htmlUntouched || T.spaces.normalize(o), function () {
                    t.setEnd(o, r)
                })) : !(!i || o || i.nodeType !== Node.TEXT_NODE) && (n ? (T.opts.htmlUntouched || T.spaces.normalize(i), function () {
                    t.setStart(i, 0)
                }) : (T.opts.htmlUntouched || T.spaces.normalize(i), function () {
                    t.setEnd(i, 0)
                }))
            }

            function O() {
                for (var e = d(), t = 0; t < e.length; t++) if (!e[t].collapsed) return !1;
                return !0
            }

            function o(e) {
                var t, n, r = !1, o = !1;
                if (T.win.getSelection) {
                    var i = T.win.getSelection();
                    i.rangeCount && ((n = (t = i.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), r = a(n), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), o = a(n))
                } else T.doc.selection && "Control" !== T.doc.selection.type && ((n = (t = T.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), r = a(n), n.moveToElementText(e), n.setEndPoint("StartToEnd", t), o = a(n));
                return {atStart: r, atEnd: o}
            }

            function a(e) {
                return "" === e.toString().replace(/[\u200B-\u200D\uFEFF]/g, "")
            }

            function x(e, t) {
                void 0 === t && (t = !0);
                var n = y(e).html();
                n && n.replace(/\u200b/g, "").length !== n.length && y(e).html(n.replace(/\u200b/g, ""));
                for (var r = T.node.contents(e), o = 0; o < r.length; o++) r[o].nodeType !== Node.ELEMENT_NODE ? y(r[o]).remove() : (x(r[o], 0 === o), 0 === o && (t = !1));
                if (e.nodeType === Node.TEXT_NODE) {
                    var i = y(document.createElement("span")).attr("data-first", "true").attr("data-text", "true");
                    y(e)[0].replaceWith(i[0])
                } else t && y(e).attr("data-first", !0)
            }

            function w() {
                return 0 === y(this).find("fr-inner").length
            }

            function p() {
                try {
                    if (!T.$wp) return !1;
                    for (var e = d(0).commonAncestorContainer; e && !T.node.isElement(e);) e = e.parentNode;
                    return !!T.node.isElement(e)
                } catch (t) {
                    return !1
                }
            }

            function r(e, t) {
                if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
                for (var n = e.firstChild; n && (T.node.isBlock(n) || t && !T.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) n = (e = n).firstChild;
                e.innerHTML = V.MARKERS + e.innerHTML
            }

            function i(e, t) {
                if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
                for (var n = e.lastChild; n && (T.node.isBlock(n) || t && !T.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) n = (e = n).lastChild;
                var r = T.doc.createElement("SPAN");
                for (r.setAttribute("id", "fr-sel-markers"), r.innerHTML = V.MARKERS; e.parentNode && T.opts.htmlAllowedEmptyTags && 0 <= T.opts.htmlAllowedEmptyTags.indexOf(e.tagName.toLowerCase());) e = e.parentNode;
                e.appendChild(r);
                var o = e.querySelector("#fr-sel-markers");
                o.outerHTML = o.innerHTML
            }

            return {
                text: s, get: S, ranges: d, clear: C, element: function l() {
                    var e = S();
                    try {
                        if (e.rangeCount) {
                            var t, n = d(0), r = n.startContainer;
                            if (T.node.isElement(r) && 0 === n.startOffset && r.childNodes.length) for (; r.childNodes.length && r.childNodes[0].nodeType === Node.ELEMENT_NODE;) r = r.childNodes[0];
                            if (r.nodeType === Node.TEXT_NODE && n.startOffset === (r.textContent || "").length && r.nextSibling && (r = r.nextSibling), r.nodeType === Node.ELEMENT_NODE) {
                                var o = !1;
                                if (0 < r.childNodes.length && r.childNodes[n.startOffset]) {
                                    for (t = r.childNodes[n.startOffset]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                    if (t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 1 < r.childNodes.length && 0 < n.startOffset && r.childNodes[n.startOffset - 1]) {
                                        for (t = r.childNodes[n.startOffset - 1]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                        t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0)
                                    }
                                } else !n.collapsed && r.nextSibling && r.nextSibling.nodeType === Node.ELEMENT_NODE && (t = r.nextSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0);
                                !o && 0 < r.childNodes.length && y(r.childNodes[0]).text().replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(r.childNodes[0].tagName) < 0 && (r = r.childNodes[0])
                            }
                            for (; r.nodeType !== Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                            for (var i = r; i && "HTML" !== i.tagName;) {
                                if (i === T.el) return r;
                                i = y(i).parent()[0]
                            }
                        }
                    } catch (a) {
                    }
                    return T.el
                }, endElement: function c() {
                    var e = S();
                    try {
                        if (e.rangeCount) {
                            var t, n = d(0), r = n.endContainer;
                            if (r.nodeType === Node.ELEMENT_NODE) {
                                var o = !1;
                                0 < r.childNodes.length && r.childNodes[n.endOffset] && y(r.childNodes[n.endOffset]).text() === s() ? (r = r.childNodes[n.endOffset], o = !0) : !n.collapsed && r.previousSibling && r.previousSibling.nodeType === Node.ELEMENT_NODE ? (t = r.previousSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0) : !n.collapsed && 0 < r.childNodes.length && r.childNodes[n.endOffset] && (t = r.childNodes[n.endOffset].previousSibling).nodeType === Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 0 < r.childNodes.length && y(r.childNodes[r.childNodes.length - 1]).text() === s() && ["BR", "IMG", "HR"].indexOf(r.childNodes[r.childNodes.length - 1].tagName) < 0 && (r = r.childNodes[r.childNodes.length - 1])
                            }
                            for (r.nodeType === Node.TEXT_NODE && 0 === n.endOffset && r.previousSibling && r.previousSibling.nodeType === Node.ELEMENT_NODE && (r = r.previousSibling); r.nodeType !== Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                            for (var i = r; i && "HTML" !== i.tagName;) {
                                if (i === T.el) return r;
                                i = y(i).parent()[0]
                            }
                        }
                    } catch (a) {
                    }
                    return T.el
                }, save: N, restore: A, isCollapsed: O, isFull: function u() {
                    if (O()) return !1;
                    T.selection.save();
                    var e, t = T.el.querySelectorAll("td, th, img, br");
                    for (e = 0; e < t.length; e++) t[e].nextSibling && (t[e].innerHTML = '<span class="fr-mk">'.concat(V.INVISIBLE_SPACE, "</span>").concat(t[e].innerHTML));
                    var n = !1, r = o(T.el);
                    for (r.atStart && r.atEnd && (n = !0), t = T.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
                    return T.selection.restore(), n
                }, inEditor: p, remove: function $() {
                    if (O()) return !0;
                    var e;

                    function t(e) {
                        for (var t = e.previousSibling; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) {
                            var n = t;
                            t = t.previousSibling, y(n).remove()
                        }
                        return t
                    }

                    function n(e) {
                        for (var t = e.nextSibling; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) {
                            var n = t;
                            t = t.nextSibling, y(n).remove()
                        }
                        return t
                    }

                    N();
                    var r = T.$el.find('.fr-marker[data-type="true"]');
                    for (e = 0; e < r.length; e++) for (var o = r[e]; !(t(o) || T.node.isBlock(o.parentNode) || T.$el.is(o.parentNode) || T.node.hasClass(o.parentNode, "fr-inner"));) y(o.parentNode).before(o);
                    var i = T.$el.find('.fr-marker[data-type="false"]');
                    for (e = 0; e < i.length; e++) {
                        for (var a = i[e]; !(n(a) || T.node.isBlock(a.parentNode) || T.$el.is(a.parentNode) || T.node.hasClass(a.parentNode, "fr-inner"));) y(a.parentNode).after(a);
                        a.parentNode && T.node.isBlock(a.parentNode) && T.node.isEmpty(a.parentNode) && !T.$el.is(a.parentNode) && !T.node.hasClass(a.parentNode, "fr-inner") && T.opts.keepFormatOnDelete && y(a.parentNode).after(a)
                    }
                    if (function E() {
                        for (var e = T.$el.find(".fr-marker"), t = 0; t < e.length; t++) if (y(e[t]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;
                        return !0
                    }()) {
                        !function S(e, t) {
                            var n = T.node.contents(e.get(0));
                            0 <= ["TD", "TH"].indexOf(e.get(0).tagName) && 1 === e.find(".fr-marker").length && (T.node.hasClass(n[0], "fr-marker") || "BR" == n[0].tagName && T.node.hasClass(n[0].nextElementSibling, "fr-marker")) && e.attr("data-del-cell", !0);
                            for (var r = 0; r < n.length; r++) {
                                var o = n[r];
                                T.node.hasClass(o, "fr-marker") ? t = (t + 1) % 2 : t ? 0 < y(o).find(".fr-marker").length ? t = S(y(o), t) : ["TD", "TH"].indexOf(o.tagName) < 0 && !T.node.hasClass(o, "fr-inner") ? !T.opts.keepFormatOnDelete || 0 < T.$el.find("[data-first]").length || T.node.isVoid(o) ? y(o).remove() : x(o) : T.node.hasClass(o, "fr-inner") ? 0 === y(o).find(".fr-inner").length ? y(o).html("<br>") : y(o).find(".fr-inner").filter(w).html("<br>") : (y(o).empty(), y(o).attr("data-del-cell", !0)) : 0 < y(o).find(".fr-marker").length && (t = S(y(o), t))
                            }
                            return t
                        }(T.$el, 0);
                        var s = T.$el.find('[data-first="true"]');
                        if (s.length) T.$el.find(".fr-marker").remove(), s.append(V.INVISIBLE_SPACE + V.MARKERS).removeAttr("data-first"), s.attr("data-text") && s.replaceWith(s.html()); else for (T.$el.find("table").filter(function () {
                            return 0 < y(this).find("[data-del-cell]").length && y(this).find("[data-del-cell]").length === y(this).find("td, th").length
                        }).remove(), T.$el.find("[data-del-cell]").removeAttr("data-del-cell"), r = T.$el.find('.fr-marker[data-type="true"]'), e = 0; e < r.length; e++) {
                            var l = r[e], c = l.nextSibling,
                                d = T.$el.find('.fr-marker[data-type="false"][data-id="'.concat(y(l).data("id"), '"]')).get(0);
                            if (d) {
                                if (l && (!c || c !== d)) {
                                    var f = T.node.blockParent(l), p = T.node.blockParent(d), u = !1, h = !1;
                                    if (f && 0 <= ["UL", "OL"].indexOf(f.tagName) && (u = !(f = null)), p && 0 <= ["UL", "OL"].indexOf(p.tagName) && (h = !(p = null)), y(l).after(d), f !== p) if (null !== f || u) if (null !== p || h || 0 !== y(f).parentsUntil(T.$el, "table").length) f && p && 0 === y(f).parentsUntil(T.$el, "table").length && 0 === y(p).parentsUntil(T.$el, "table").length && !y(f).contains(p) && !y(p).contains(f) && (y(f).append(y(p).html()), y(p).remove()); else {
                                        for (c = f; !c.nextSibling && c.parentNode !== T.el;) c = c.parentNode;
                                        for (c = c.nextSibling; c && "BR" !== c.tagName;) {
                                            var g = c.nextSibling;
                                            y(f).append(c), c = g
                                        }
                                        c && "BR" === c.tagName && y(c).remove()
                                    } else {
                                        var m = T.node.deepestParent(l);
                                        m ? (y(m).after(y(p).html()), y(p).remove()) : 0 === y(p).parentsUntil(T.$el, "table").length && (y(l).next().after(y(p).html()), y(p).remove())
                                    }
                                }
                            } else d = y(l).clone().attr("data-type", !1), y(l).after(d)
                        }
                    }
                    T.$el.find("li:empty").remove(), T.opts.keepFormatOnDelete || T.html.fillEmptyBlocks(), T.html.cleanEmptyTags(!0), T.opts.htmlUntouched || (T.clean.lists(), T.$el.find("li:empty").append("<br>"), T.spaces.normalize());
                    var v = T.$el.find(".fr-marker").last().get(0), b = T.$el.find(".fr-marker").first().get(0);
                    void 0 !== v && void 0 !== b && !v.nextSibling && b.previousSibling && "BR" === b.previousSibling.tagName && T.node.isElement(v.parentNode) && T.node.isElement(b.parentNode) && T.$el.append("<br>"), A()
                }, blocks: function h() {
                    var e, t, n = [], r = S();
                    if (p() && r.rangeCount) {
                        var o = d();
                        for (e = 0; e < o.length; e++) {
                            var i = o[e], a = f(i.startContainer, i.startOffset), s = f(i.endContainer, i.endOffset);
                            (T.node.isBlock(a) || T.node.hasClass(a, "fr-inner")) && n.indexOf(a) < 0 && n.push(a), (t = T.node.blockParent(a)) && n.indexOf(t) < 0 && n.push(t);
                            for (var l = [], c = a; c !== s && c !== T.el;) l.indexOf(c) < 0 && c.children && c.children.length ? (l.push(c), c = c.children[0]) : c.nextSibling ? c = c.nextSibling : c.parentNode && (c = c.parentNode, l.push(c)), T.node.isBlock(c) && l.indexOf(c) < 0 && n.indexOf(c) < 0 && (c !== s || 0 < i.endOffset) && n.push(c);
                            T.node.isBlock(s) && n.indexOf(s) < 0 && 0 < i.endOffset && n.push(s), (t = T.node.blockParent(s)) && n.indexOf(t) < 0 && n.push(t)
                        }
                    }
                    for (e = n.length - 1; 0 < e; e--) y(n[e]).find(n).length && n.splice(e, 1);
                    return n
                }, info: o, setAtEnd: i, setAtStart: r, setBefore: function g(e, t) {
                    void 0 === t && (t = !0);
                    for (var n = e.previousSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) n = n.previousSibling;
                    return n ? (T.node.isBlock(n) ? i(n) : "BR" === n.tagName ? y(n).before(V.MARKERS) : y(n).after(V.MARKERS), !0) : !!t && (T.node.isBlock(e) ? r(e) : y(e).before(V.MARKERS), !0)
                }, setAfter: function m(e, t) {
                    void 0 === t && (t = !0);
                    for (var n = e.nextSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) n = n.nextSibling;
                    return n ? (T.node.isBlock(n) ? r(n) : y(n).before(V.MARKERS), !0) : !!t && (T.node.isBlock(e) ? i(e) : y(e).after(V.MARKERS), !0)
                }, rangeElement: f
            }
        }, Object.assign(V.DEFAULTS, {language: null}), V.LANGUAGE = {}, V.MODULES.language = function (e) {
            var t;
            return {
                _init: function n() {
                    V.LANGUAGE && (t = V.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction)
                }, translate: function r(e) {
                    return t && t.translation[e] && t.translation[e].length ? t.translation[e] : e
                }
            }
        }, Object.assign(V.DEFAULTS, {placeholderText: "Type something"}), V.MODULES.placeholder = function (f) {
            var p = f.$;

            function e() {
                f.$placeholder || function d() {
                    f.$placeholder = p(f.doc.createElement("SPAN")).addClass("fr-placeholder"), f.$wp.append(f.$placeholder)
                }();
                var e = f.opts.iframe ? f.$iframe.prev().outerHeight(!0) : f.$el.prev().outerHeight(!0), t = 0, n = 0,
                    r = 0, o = 0, i = 0, a = 0, s = f.node.contents(f.el),
                    l = p(f.selection.element()).css("text-align");
                if (s.length && s[0].nodeType === Node.ELEMENT_NODE) {
                    var c = p(s[0]);
                    (0 < f.$wp.prev().length || 0 < f.$el.prev().length) && f.ready && (t = f.helpers.getPX(c.css("margin-top")), o = f.helpers.getPX(c.css("padding-top")), n = f.helpers.getPX(c.css("margin-left")), r = f.helpers.getPX(c.css("margin-right")), i = f.helpers.getPX(c.css("padding-left")), a = f.helpers.getPX(c.css("padding-right"))), f.$placeholder.css("font-size", c.css("font-size")), f.$placeholder.css("line-height", c.css("line-height"))
                } else f.$placeholder.css("font-size", f.$el.css("font-size")), f.$placeholder.css("line-height", f.$el.css("line-height"));
                f.$wp.addClass("show-placeholder"), f.$placeholder.css({
                    marginTop: Math.max(f.helpers.getPX(f.$el.css("margin-top")), t) + (e || 0),
                    paddingTop: Math.max(f.helpers.getPX(f.$el.css("padding-top")), o),
                    paddingLeft: Math.max(f.helpers.getPX(f.$el.css("padding-left")), i),
                    marginLeft: Math.max(f.helpers.getPX(f.$el.css("margin-left")), n),
                    paddingRight: Math.max(f.helpers.getPX(f.$el.css("padding-right")), a),
                    marginRight: Math.max(f.helpers.getPX(f.$el.css("margin-right")), r),
                    textAlign: l
                }).text(f.language.translate(f.opts.placeholderText || f.$oel.attr("placeholder") || "")), f.$placeholder.html(f.$placeholder.text().replace(/\n/g, "<br>"))
            }

            function t() {
                f.$wp.removeClass("show-placeholder")
            }

            function n() {
                if (!f.$wp) return !1;
                f.core.isEmpty() ? e() : t()
            }

            return {
                _init: function r() {
                    if (!f.$wp) return !1;
                    f.events.on("init input keydown keyup contentChanged initialized", n)
                }, show: e, hide: t, refresh: n, isVisible: function o() {
                    return !f.$wp || f.node.hasClass(f.$wp.get(0), "show-placeholder")
                }
            }
        }, V.UNICODE_NBSP = String.fromCharCode(160), V.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], V.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], Object.assign(V.DEFAULTS, {
            htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line", "hr"],
            htmlDoNotWrapTags: ["script", "style"],
            htmlSimpleAmpersand: !1,
            htmlIgnoreCSSProperties: [],
            htmlExecuteScripts: !0
        }), V.MODULES.html = function (w) {
            var p = w.$;

            function d() {
                return w.opts.enter === V.ENTER_P ? "p" : w.opts.enter === V.ENTER_DIV ? "div" : w.opts.enter === V.ENTER_BR ? null : void 0
            }

            function s(e, t) {
                return !(!e || e === w.el) && (t ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName) || s(e.parentNode, t) : -1 !== ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName))
            }

            function i(e) {
                var t, n = [], r = [];
                if (e) {
                    var o = w.el.querySelectorAll(".fr-marker");
                    for (t = 0; t < o.length; t++) {
                        var i = w.node.blockParent(o[t]) || o[t];
                        if (i) {
                            var a = i.nextSibling, s = i.previousSibling;
                            i && r.indexOf(i) < 0 && w.node.isBlock(i) && r.push(i), s && w.node.isBlock(s) && r.indexOf(s) < 0 && r.push(s), a && w.node.isBlock(a) && r.indexOf(a) < 0 && r.push(a)
                        }
                    }
                } else r = w.el.querySelectorAll(u());
                var l = u();
                for (l += ",".concat(V.VOID_ELEMENTS.join(",")), l += ", .fr-inner", l += ",".concat(w.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)"), t = r.length - 1; 0 <= t; t--) if (!(r[t].textContent && 0 < r[t].textContent.replace(/\u200B|\n/g, "").length || 0 < r[t].querySelectorAll(l).length)) {
                    for (var c = w.node.contents(r[t]), d = !1, f = 0; f < c.length; f++) if (c[f].nodeType !== Node.COMMENT_NODE && c[f].textContent && 0 < c[f].textContent.replace(/\u200B|\n/g, "").length) {
                        d = !0;
                        break
                    }
                    d || n.push(r[t])
                }
                return n
            }

            function u() {
                return V.BLOCK_TAGS.join(", ")
            }

            function e(e) {
                var t, n, r = p.merge([], V.VOID_ELEMENTS);
                r = p.merge(r, w.opts.htmlAllowedEmptyTags), r = void 0 === e ? p.merge(r, V.BLOCK_TAGS) : p.merge(r, V.NO_DELETE_TAGS), t = w.el.querySelectorAll("*:empty:not(".concat(r.join("):not("), "):not(.fr-marker):not(template)"));
                do {
                    n = !1;
                    for (var o = 0; o < t.length; o++) 0 !== t[o].attributes.length && void 0 === t[o].getAttribute("href") || (t[o].parentNode.removeChild(t[o]), n = !0);
                    t = w.el.querySelectorAll("*:empty:not(".concat(r.join("):not("), "):not(.fr-marker):not(template)"))
                } while (t.length && n)
            }

            function a(e, t) {
                var n = d();
                if (t && (n = "div"), n) {
                    for (var r = w.doc.createDocumentFragment(), o = null, i = !1, a = e.firstChild, s = !1; a;) {
                        var l = a.nextSibling;
                        if (a.nodeType === Node.ELEMENT_NODE && (w.node.isBlock(a) || 0 <= w.opts.htmlDoNotWrapTags.indexOf(a.tagName.toLowerCase()) && !w.node.hasClass(a, "fr-marker"))) o = null, r.appendChild(a.cloneNode(!0)); else if (a.nodeType !== Node.ELEMENT_NODE && a.nodeType !== Node.TEXT_NODE) o = null, r.appendChild(a.cloneNode(!0)); else if ("BR" === a.tagName) null === o ? (o = w.doc.createElement(n), s = !0, t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0)), o.appendChild(a.cloneNode(!0)), r.appendChild(o)) : !1 === i && (o.appendChild(w.doc.createElement("br")), t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0))), o = null; else {
                            var c = a.textContent;
                            a.nodeType !== Node.TEXT_NODE || 0 < c.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || c.replace(/(^ *)|( *$)/g, "").length && c.indexOf("\n") < 0 ? (null === o && (o = w.doc.createElement(n), s = !0, t && o.setAttribute("class", "fr-temp-div"), r.appendChild(o), i = !1), o.appendChild(a.cloneNode(!0)), i || w.node.hasClass(a, "fr-marker") || a.nodeType === Node.TEXT_NODE && 0 === c.replace(/ /g, "").length || (i = !0)) : s = !0
                        }
                        a = l
                    }
                    s && (e.innerHTML = "", e.appendChild(r))
                }
            }

            function l(e, t) {
                for (var n = e.length - 1; 0 <= n; n--) a(e[n], t)
            }

            function t(e, t, n, r, o) {
                if (!w.$wp) return !1;
                void 0 === e && (e = !1), void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === o && (o = !1);
                var i = w.$wp.scrollTop();
                a(w.el, e), r && l(w.el.querySelectorAll(".fr-inner"), e), t && l(w.el.querySelectorAll("td, th"), e), n && l(w.el.querySelectorAll("blockquote"), e), o && l(w.el.querySelectorAll("li"), e), i !== w.$wp.scrollTop() && w.$wp.scrollTop(i)
            }

            function n(e) {
                if (void 0 === e && (e = w.el), e && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e.tagName)) return !1;
                for (var t = w.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, w.node.filter(function (e) {
                    return null !== e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)
                }), !1); t.nextNode();) {
                    var n = t.currentNode;
                    if (!s(n.parentNode, !0)) {
                        var r = w.node.isBlock(n.parentNode) || w.node.isElement(n.parentNode),
                            o = n.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                        if (r) {
                            var i = n.previousSibling, a = n.nextSibling;
                            i && a && " " === o ? o = w.node.isBlock(i) && w.node.isBlock(a) ? "" : " " : (i || (o = o.replace(/^ */, "")), a || (o = o.replace(/ *$/, "")))
                        }
                        n.textContent = o
                    }
                }
            }

            function r(e, t, n) {
                var r = new RegExp(t, "gi").exec(e);
                return r ? r[n] : null
            }

            function $(e) {
                var t = e.doctype, n = "<!DOCTYPE html>";
                return t && (n = "<!DOCTYPE ".concat(t.name).concat(t.publicId ? ' PUBLIC "'.concat(t.publicId, '"') : "").concat(!t.publicId && t.systemId ? " SYSTEM" : "").concat(t.systemId ? ' "'.concat(t.systemId, '"') : "", ">")), n
            }

            function c(e) {
                var t = e.parentNode;
                if (t && (w.node.isBlock(t) || w.node.isElement(t)) && ["TD", "TH"].indexOf(t.tagName) < 0) {
                    for (var n = e.previousSibling, r = e.nextSibling; n && (n.nodeType === Node.TEXT_NODE && 0 === n.textContent.replace(/\n|\r/g, "").length || w.node.hasClass(n, "fr-tmp"));) n = n.previousSibling;
                    if (r) return !1;
                    n && t && "BR" !== n.tagName && !w.node.isBlock(n) && !r && 0 < t.textContent.replace(/\u200B/g, "").length && 0 < n.textContent.length && !w.node.hasClass(n, "fr-marker") && (w.el === t && !r && w.opts.enter === V.ENTER_BR && w.browser.msie || e.parentNode.removeChild(e))
                } else !t || w.node.isBlock(t) || w.node.isElement(t) || e.previousSibling || e.nextSibling || !w.node.isDeletable(e.parentNode) || c(e.parentNode)
            }

            function h() {
                w.opts.htmlUntouched || (e(), t(), n(), w.spaces.normalize(null, !0), w.html.fillEmptyBlocks(), w.clean.lists(), w.clean.tables(), w.clean.toHTML5(), w.html.cleanBRs()), w.selection.restore(), o(), w.placeholder.refresh()
            }

            function o() {
                w.node.isEmpty(w.el) && (null !== d() ? w.el.querySelector(u()) || w.el.querySelector("".concat(w.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || (w.core.hasFocus() ? (w.$el.html("<".concat(d(), ">").concat(V.MARKERS, "<br/></").concat(d(), ">")), w.selection.restore()) : w.$el.html("<".concat(d(), "><br/></").concat(d(), ">"))) : w.el.querySelector("*:not(.fr-marker):not(br)") || (w.core.hasFocus() ? (w.$el.html("".concat(V.MARKERS, "<br/>")), w.selection.restore()) : w.$el.html("<br/>")))
            }

            function g(e, t) {
                return r(e, "<".concat(t, "[^>]*?>([\\w\\W]*)</").concat(t, ">"), 1)
            }

            function m(e, t) {
                var n = p("<div ".concat(r(e, "<".concat(t, "([^>]*?)>"), 1) || "", ">"));
                return w.node.rawAttributes(n.get(0))
            }

            function v(e) {
                return (r(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ")
            }

            function b(e, t) {
                w.opts.htmlExecuteScripts ? e.html(t) : e.get(0).innerHTML = t
            }

            function L(e) {
                var t;
                (t = /:not\(([^)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
                var n = 100 * (e.match(/(#[^\s+>~.[:]+)/g) || []).length + 10 * (e.match(/(\[[^]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s+>~.[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s+>~.[:]+)/g) || []).length + (e.match(/(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
                return n += ((e = (e = e.replace(/[*\s+>~]/g, " ")).replace(/[#.]/g, " ")).match(/([^\s+>~.[:]+)/g) || []).length
            }

            function D(e) {
                if (w.events.trigger("html.processGet", [e]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), e && e.nodeType === Node.ELEMENT_NODE) {
                    var t, n = e.querySelectorAll('[class=""],[style=""]');
                    for (t = 0; t < n.length; t++) {
                        var r = n[t];
                        "" === r.getAttribute("class") && r.removeAttribute("class"), "" === r.getAttribute("style") && r.removeAttribute("style")
                    }
                    if ("BR" === e.tagName) c(e); else {
                        var o = e.querySelectorAll("br");
                        for (t = 0; t < o.length; t++) c(o[t])
                    }
                }
            }

            function k(e, t) {
                return e[3] - t[3]
            }

            function B() {
                for (var e = w.el.querySelectorAll("input, textarea"), t = 0; t < e.length; t++) "checkbox" !== e[t].type && "radio" !== e[t].type || (e[t].checked ? e[t].setAttribute("checked", e[t].checked) : w.$(e[t]).removeAttr("checked")), e[t].getAttribute("value") && e[t].setAttribute("value", e[t].value)
            }

            function f(e) {
                var t = w.doc.createElement("div");
                return t.innerHTML = e, null !== t.querySelector(u())
            }

            function E(e) {
                var t = null;
                if (void 0 === e && (t = w.selection.element()), w.opts.keepFormatOnDelete) return !1;
                var n, r,
                    o = t ? (t.textContent.match(/\u200B/g) || []).length - t.querySelectorAll(".fr-marker").length : 0;
                if ((w.el.textContent.match(/\u200B/g) || []).length - w.el.querySelectorAll(".fr-marker").length === o) return !1;
                do {
                    r = !1, n = w.el.querySelectorAll("*:not(.fr-marker)");
                    for (var i = 0; i < n.length; i++) {
                        var a = n[i];
                        if (t !== a) {
                            var s = a.textContent;
                            0 === a.children.length && 1 === s.length && 8203 === s.charCodeAt(0) && "TD" !== a.tagName && (p(a).remove(), r = !0)
                        }
                    }
                } while (r)
            }

            function S() {
                E(), w.placeholder && setTimeout(w.placeholder.refresh, 0)
            }

            return {
                defaultTag: d, isPreformatted: s, emptyBlocks: i, emptyBlockTagsQuery: function T() {
                    return "".concat(V.BLOCK_TAGS.join(":empty, "), ":empty")
                }, blockTagsQuery: u, fillEmptyBlocks: function y(e) {
                    var t = i(e);
                    w.node.isEmpty(w.el) && w.opts.enter === V.ENTER_BR && t.push(w.el);
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        "false" === r.getAttribute("contenteditable") || r.querySelector("".concat(w.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || w.node.isVoid(r) || "TABLE" !== r.tagName && "TBODY" !== r.tagName && "TR" !== r.tagName && "UL" !== r.tagName && "OL" !== r.tagName && r.appendChild(w.doc.createElement("br"))
                    }
                    if (w.browser.msie && w.opts.enter === V.ENTER_BR) {
                        var o = w.node.contents(w.el);
                        o.length && o[o.length - 1].nodeType === Node.TEXT_NODE && w.$el.append("<br>")
                    }
                }, cleanEmptyTags: e, cleanWhiteTags: E, cleanBlankSpaces: n, blocks: function C() {
                    return w.$el.get(0).querySelectorAll(u())
                }, getDoctype: $, set: function N(e) {
                    var t = w.clean.html((e || "").trim(), [], [], w.opts.fullPage);
                    if (w.opts.fullPage) {
                        var n = g(t, "body") || (0 <= t.indexOf("<body") ? "" : t), r = m(t, "body"),
                            o = g(t, "head") || "<title></title>", i = m(t, "head"), a = p("<div>");
                        a.append(o).contents().each(function () {
                            (this.nodeType === Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this)
                        });
                        var s = a.html().trim();
                        o = p("<div>").append(o).contents().map(function () {
                            return this.nodeType === Node.COMMENT_NODE ? "\x3c!--".concat(this.nodeValue, "--\x3e") : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : ""
                        }).toArray().join("");
                        var l = v(t), c = m(t, "html");
                        b(w.$el, "".concat(s, "\n").concat(n)), w.node.clearAttributes(w.el), w.$el.attr(r), w.$el.addClass("fr-view"), w.$el.attr("spellcheck", w.opts.spellcheck), w.$el.attr("dir", w.opts.direction), b(w.$head, o), w.node.clearAttributes(w.$head.get(0)), w.$head.attr(i), w.node.clearAttributes(w.$html.get(0)), w.$html.attr(c), w.iframe_document.doctype.parentNode.replaceChild(function f(e, t) {
                            var n = e.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
                            return n ? t.implementation.createDocumentType(n[1], n[3], n[4]) : t.implementation.createDocumentType("html")
                        }(l, w.iframe_document), w.iframe_document.doctype)
                    } else b(w.$el, t);
                    var d = w.edit.isDisabled();
                    w.edit.on(), w.core.injectStyle(w.opts.iframeDefaultStyle + w.opts.iframeStyle), h(), w.opts.useClasses || (w.$el.find("[fr-original-class]").each(function () {
                        this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class")
                    }), w.$el.find("[fr-original-style]").each(function () {
                        this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style")
                    })), d && w.edit.off(), w.events.trigger("html.set"), w.events.trigger("charCounter.update")
                }, syncInputs: B, get: function _(e, t) {
                    if (!w.$wp) return w.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                    var n = "";
                    w.events.trigger("html.beforeGet");
                    var r, o, i = [], a = {}, s = [];
                    if (B(), !w.opts.useClasses && !t) {
                        var l = new RegExp("^".concat(w.opts.htmlIgnoreCSSProperties.join("$|^"), "$"), "gi");
                        for (r = 0; r < w.doc.styleSheets.length; r++) {
                            var c = void 0, d = 0;
                            try {
                                c = w.doc.styleSheets[r].cssRules, w.doc.styleSheets[r].ownerNode && "STYLE" === w.doc.styleSheets[r].ownerNode.nodeType && (d = 1)
                            } catch (x) {
                            }
                            if (c) for (var f = 0, p = c.length; f < p; f++) if (c[f].selectorText && 0 < c[f].style.cssText.length) {
                                var u = c[f].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":"),
                                    h = void 0;
                                try {
                                    h = w.el.querySelectorAll(u)
                                } catch (x) {
                                    h = []
                                }
                                for (o = 0; o < h.length; o++) {
                                    !h[o].getAttribute("fr-original-style") && h[o].getAttribute("style") ? (h[o].setAttribute("fr-original-style", h[o].getAttribute("style")), i.push(h[o])) : h[o].getAttribute("fr-original-style") || (h[o].setAttribute("fr-original-style", ""), i.push(h[o])), a[h[o]] || (a[h[o]] = {});
                                    for (var g = 1e3 * d + L(c[f].selectorText), m = c[f].style.cssText.split(";"), v = 0; v < m.length; v++) {
                                        var b = m[v].trim().split(":")[0];
                                        if (b && !b.match(l) && (a[h[o]][b] || (a[h[o]][b] = 0) <= (h[o].getAttribute("fr-original-style") || "").indexOf("".concat(b, ":")) && (a[h[o]][b] = 1e4), g >= a[h[o]][b] && (a[h[o]][b] = g, m[v].trim().length))) {
                                            var E = m[v].trim().split(":");
                                            E.splice(0, 1), s.push([h[o], b.trim(), E.join(":").trim(), g])
                                        }
                                    }
                                }
                            }
                        }
                        for (s.sort(k), r = 0; r < s.length; r++) {
                            var S = s[r];
                            S[0].style[S[1]] = S[2]
                        }
                        for (r = 0; r < i.length; r++) if (i[r].getAttribute("class") && (i[r].setAttribute("fr-original-class", i[r].getAttribute("class")), i[r].removeAttribute("class")), 0 < (i[r].getAttribute("fr-original-style") || "").trim().length) {
                            var T = i[r].getAttribute("fr-original-style").split(";");
                            for (o = 0; o < T.length; o++) if (0 < T[o].indexOf(":")) {
                                var y = T[o].split(":"), C = y[0];
                                y.splice(0, 1), i[r].style[C.trim()] = y.join(":").trim()
                            }
                        }
                    }
                    if (w.node.isEmpty(w.el)) w.opts.fullPage && (n = $(w.iframe_document), n += "<html".concat(w.node.attributes(w.$html.get(0)), ">").concat(w.$html.find("head").get(0).outerHTML, "<body></body></html>")); else if (void 0 === e && (e = !1), w.opts.fullPage) {
                        n = $(w.iframe_document), w.$el.removeClass("fr-view");
                        var N = w.opts.heightMin, A = w.opts.height, M = w.opts.heightMax;
                        w.opts.heightMin = null, w.opts.height = null, w.opts.heightMax = null, w.size.refresh(), n += "<html".concat(w.node.attributes(w.$html.get(0)), ">").concat(w.$html.html(), "</html>"), w.opts.heightMin = N, w.opts.height = A, w.opts.heightMax = M, w.size.refresh(), w.$el.addClass("fr-view")
                    } else n = w.$el.html();
                    if (!w.opts.useClasses && !t) for (r = 0; r < i.length; r++) i[r].getAttribute("fr-original-class") && (i[r].setAttribute("class", i[r].getAttribute("fr-original-class")), i[r].removeAttribute("fr-original-class")), null !== i[r].getAttribute("fr-original-style") && void 0 !== i[r].getAttribute("fr-original-style") ? (0 !== i[r].getAttribute("fr-original-style").length ? i[r].setAttribute("style", i[r].getAttribute("fr-original-style")) : i[r].removeAttribute("style"), i[r].removeAttribute("fr-original-style")) : i[r].removeAttribute("style");
                    w.opts.fullPage && (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), w.opts.htmlSimpleAmpersand && (n = n.replace(/&amp;/gi, "&")), w.events.trigger("html.afterGet"), e || (n = n.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n = w.clean.invisibleSpaces(n), n = w.clean.exec(n, D);
                    var O = w.events.chainTrigger("html.get", n);
                    return "string" == typeof O && (n = O), n = (n = n.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (e) {
                        return e.replace(/<br>/g, "\n")
                    })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="')
                }, getSelected: function A() {
                    function e(e, t) {
                        for (; t && (t.nodeType === Node.TEXT_NODE || !w.node.isBlock(t)) && !w.node.isElement(t) && !w.node.hasClass(t, "fr-inner");) t && t.nodeType !== Node.TEXT_NODE && p(e).wrapInner(w.node.openTagString(t) + w.node.closeTagString(t)), t = t.parentNode;
                        t && e.innerHTML === t.innerHTML ? e.innerHTML = t.outerHTML : -1 != t.innerText.indexOf(e.innerHTML) && (e.innerHTML = w.node.openTagString(t) + t.innerHTML + w.node.closeTagString(t))
                    }

                    var t, n, r = "";
                    if ("undefined" != typeof w.win.getSelection) {
                        w.browser.mozilla && (w.selection.save(), 1 < w.$el.find('.fr-marker[data-type="false"]').length && (w.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), w.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), w.$el.find(".fr-marker").not('[data-id="0"]').remove()), w.selection.restore());
                        for (var o = w.selection.ranges(), i = 0; i < o.length; i++) {
                            var a = document.createElement("div");
                            a.appendChild(o[i].cloneContents()), e(a, (n = t = void 0, n = null, w.win.getSelection ? (t = w.win.getSelection()) && t.rangeCount && (n = t.getRangeAt(0).commonAncestorContainer).nodeType !== Node.ELEMENT_NODE && (n = n.parentNode) : (t = w.doc.selection) && "Control" !== t.type && (n = t.createRange().parentElement()), null !== n && (0 <= p(n).parents().toArray().indexOf(w.el) || n === w.el) ? n : null)), 0 < p(a).find(".fr-element").length && (a = w.el), r += a.innerHTML
                        }
                    } else "undefined" != typeof w.doc.selection && "Text" === w.doc.selection.type && (r = w.doc.selection.createRange().htmlText);
                    return r
                }, insert: function M(e, t, n) {
                    var r;
                    if (w.selection.isCollapsed() || w.selection.remove(), r = t ? e : w.clean.html(e), e.indexOf('class="fr-marker"') < 0 && (r = function a(e) {
                        var t = w.doc.createElement("div");
                        return t.innerHTML = e, w.selection.setAtEnd(t, !0), t.innerHTML
                    }(r)), w.node.isEmpty(w.el) && !w.opts.keepFormatOnDelete && f(r)) w.el.innerHTML = r; else {
                        var o = w.markers.insert();
                        if (o) {
                            w.node.isLastSibling(o) && p(o).parent().hasClass("fr-deletable") && p(o).insertAfter(p(o).parent());
                            var i = w.node.blockParent(o);
                            if ((f(r) || n) && (w.node.deepestParent(o) || i && "LI" === i.tagName)) {
                                if (i && "LI" === i.tagName && (r = function s(e) {
                                    if (!w.html.defaultTag()) return e;
                                    var t = w.doc.createElement("div");
                                    t.innerHTML = e;
                                    for (var n = t.querySelectorAll(":scope > ".concat(w.html.defaultTag())), r = n.length - 1; 0 <= r; r--) {
                                        var o = n[r];
                                        w.node.isBlock(o.previousSibling) || (o.previousSibling && !w.node.isEmpty(o) && p("<br>").insertAfter(o.previousSibling), o.outerHTML = o.innerHTML)
                                    }
                                    return t.innerHTML
                                }(r)), !(o = w.markers.split())) return !1;
                                o.outerHTML = r
                            } else o.outerHTML = r
                        } else w.el.innerHTML += r
                    }
                    h(), w.keys.positionCaret(), w.events.trigger("html.inserted")
                }, wrap: t, unwrap: function O() {
                    w.$el.find("div.fr-temp-div").each(function () {
                        this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && p(this).before("<br>"), p(this).attr("data-empty") || !this.nextSibling || w.node.isBlock(this.nextSibling) && !p(this.nextSibling).hasClass("fr-temp-div") ? p(this).replaceWith(p(this).html()) : p(this).replaceWith("".concat(p(this).html(), "<br>"))
                    }), w.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function () {
                        return "" === p(this).attr("class")
                    }).removeAttr("class")
                }, escapeEntities: function x(e) {
                    return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;")
                }, checkIfEmpty: o, extractNode: g, extractNodeAttrs: m, extractDoctype: v, cleanBRs: function R() {
                    for (var e = w.el.getElementsByTagName("br"), t = 0; t < e.length; t++) c(e[t])
                }, _init: function H() {
                    w.$wp && (w.events.on("mouseup", S), w.events.on("keydown", S), w.events.on("contentChanged", o))
                }, _setHtml: b
            }
        }, V.ENTER_P = 0, V.ENTER_DIV = 1, V.ENTER_BR = 2, V.KEYCODE = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            SPACE: 32,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            FF_SEMICOLON: 59,
            FF_EQUALS: 61,
            QUESTION_MARK: 63,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            META: 91,
            NUM_ZERO: 96,
            NUM_ONE: 97,
            NUM_TWO: 98,
            NUM_THREE: 99,
            NUM_FOUR: 100,
            NUM_FIVE: 101,
            NUM_SIX: 102,
            NUM_SEVEN: 103,
            NUM_EIGHT: 104,
            NUM_NINE: 105,
            NUM_MULTIPLY: 106,
            NUM_PLUS: 107,
            NUM_MINUS: 109,
            NUM_PERIOD: 110,
            NUM_DIVISION: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            FF_HYPHEN: 173,
            SEMICOLON: 186,
            DASH: 189,
            EQUALS: 187,
            COMMA: 188,
            HYPHEN: 189,
            PERIOD: 190,
            SLASH: 191,
            APOSTROPHE: 192,
            TILDE: 192,
            SINGLE_QUOTE: 222,
            OPEN_SQUARE_BRACKET: 219,
            BACKSLASH: 220,
            CLOSE_SQUARE_BRACKET: 221,
            IME: 229
        }, Object.assign(V.DEFAULTS, {enter: V.ENTER_P, multiLine: !0, tabSpaces: 0}), V.MODULES.keys = function (d) {
            var f, n, r, o = d.$, p = !1;

            function u(e) {
                if (d.selection.isCollapsed()) if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && d.cursor.backspace(), d.helpers.isIOS()) {
                    var t = d.selection.ranges(0);
                    t.deleteContents(), t.insertNode(document.createTextNode("\u200b")), d.selection.get().modify("move", "forward", "character")
                } else ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && e.preventDefault(), e.stopPropagation(); else e.preventDefault(), e.stopPropagation(), d.selection.remove();
                d.placeholder.refresh()
            }

            function h(e) {
                ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && e.preventDefault(), e.stopPropagation(), "" === d.selection.text() && "IMG" != d.selection.element().tagName ? d.cursor.del() : d.selection.remove(), d.placeholder.refresh()
            }

            function e() {
                if (d.browser.mozilla && d.selection.isCollapsed() && !p) {
                    var e = d.selection.ranges(0), t = e.startContainer, n = e.startOffset;
                    t && t.nodeType === Node.TEXT_NODE && n <= t.textContent.length && 0 < n && 32 === t.textContent.charCodeAt(n - 1) && (d.selection.save(), d.spaces.normalize(), d.selection.restore())
                }
            }

            function t() {
                d.selection.isFull() && setTimeout(function () {
                    var e = d.html.defaultTag();
                    e ? d.$el.html("<".concat(e, ">").concat(V.MARKERS, "<br/></").concat(e, ">")) : d.$el.html("".concat(V.MARKERS, "<br/>")), d.selection.restore(), d.placeholder.refresh(), d.button.bulkRefresh(), d.undo.saveStep()
                }, 0)
            }

            function i() {
                p = !1
            }

            function a() {
                p = !1
            }

            function g() {
                var e = d.html.defaultTag();
                e ? d.$el.html("<".concat(e, ">").concat(V.MARKERS, "<br/></").concat(e, ">")) : d.$el.html("".concat(V.MARKERS, "<br/>")), d.selection.restore()
            }

            function m(e, t) {
                if ((-1 < e.innerHTML.indexOf("<span") || -1 < e.parentElement.innerHTML.indexOf("<span") || -1 < e.parentElement.parentElement.innerHTML.indexOf("<span")) && (e.classList.contains("fr-img-space-wrap") || e.parentElement.classList.contains("fr-img-space-wrap") || e.parentElement.parentElement.classList.contains("fr-img-space-wrap"))) {
                    if (o(e.parentElement).is("p")) {
                        var n = e.parentElement.innerHTML;
                        return (n = n.replace(/<br>/g, "")).length < 1 ? e.parentElement.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != n && " " != n && "Backspace" == t.key ? u(t) : "&nbsp;" != n && " " != n && "Delete" == t.key && h(t), !0
                    }
                    if (o(e).is("p")) {
                        var r = e.innerHTML.replace(/<br>/g, "");
                        return r.length < 1 ? e.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != r && " " != r && "Backspace" == t.key ? u(t) : "&nbsp;" != r && " " != r && "Delete" == t.key && h(t), !0
                    }
                }
                return !1
            }

            function s(e) {
                var t = d.selection.element();
                if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
                if (e && b(e.which)) return !0;
                d.events.disableBlur();
                var n = e.which;
                if (16 === n) return !0;
                if ((f = n) === V.KEYCODE.IME) return p = !0;
                p = !1;
                var r = E(n) && !v(e) && !e.altKey, o = n === V.KEYCODE.BACKSPACE || n === V.KEYCODE.DELETE;
                if ((d.selection.isFull() && !d.opts.keepFormatOnDelete && !d.placeholder.isVisible() || o && d.placeholder.isVisible() && d.opts.keepFormatOnDelete) && (r || o) && (g(), !E(n))) return e.preventDefault(), !0;
                if (n === V.KEYCODE.ENTER) e.shiftKey || t.classList.contains("fr-inner") || t.parentElement.classList.contains("fr-inner") ? function i(e) {
                    e.preventDefault(), e.stopPropagation(), d.opts.multiLine && (d.selection.isCollapsed() || d.selection.remove(), d.cursor.enter(!0))
                }(e) : function a(e) {
                    d.opts.multiLine ? (d.helpers.isIOS() || (e.preventDefault(), e.stopPropagation()), d.selection.isCollapsed() || d.selection.remove(), d.cursor.enter()) : (e.preventDefault(), e.stopPropagation())
                }(e); else if (n === V.KEYCODE.BACKSPACE && (e.metaKey || e.ctrlKey)) !function s() {
                    setTimeout(function () {
                        d.events.disableBlur(), d.events.focus()
                    }, 0)
                }(); else if (n !== V.KEYCODE.BACKSPACE || v(e) || e.altKey) if (n !== V.KEYCODE.DELETE || v(e) || e.altKey || e.shiftKey) n === V.KEYCODE.SPACE ? function l(e) {
                    var t = d.selection.element();
                    if (!d.helpers.isMobile() && t && "A" === t.tagName) {
                        e.preventDefault(), e.stopPropagation(), d.selection.isCollapsed() || d.selection.remove();
                        var n = d.markers.insert();
                        if (n) {
                            var r = n.previousSibling;
                            !n.nextSibling && n.parentNode && "A" === n.parentNode.tagName ? (n.parentNode.insertAdjacentHTML("afterend", "&nbsp;".concat(V.MARKERS)), n.parentNode.removeChild(n)) : (r && r.nodeType === Node.TEXT_NODE && 1 === r.textContent.length && 160 === r.textContent.charCodeAt(0) ? r.textContent += " " : n.insertAdjacentHTML("beforebegin", "&nbsp;"), n.outerHTML = V.MARKERS), d.selection.restore()
                        }
                    }
                }(e) : n === V.KEYCODE.TAB ? function c(e) {
                    if (0 < d.opts.tabSpaces) if (d.selection.isCollapsed()) {
                        d.undo.saveStep(), e.preventDefault(), e.stopPropagation();
                        for (var t = "", n = 0; n < d.opts.tabSpaces; n++) t += "&nbsp;";
                        d.html.insert(t), d.placeholder.refresh(), d.undo.saveStep()
                    } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? d.commands.outdent() : d.commands.indent()
                }(e) : v(e) || !E(e.which) || d.selection.isCollapsed() || e.ctrlKey || e.altKey || d.selection.remove(); else {
                    if (m(t, e)) return e.preventDefault(), void e.stopPropagation();
                    d.placeholder.isVisible() ? (d.opts.keepFormatOnDelete || g(), e.preventDefault(), e.stopPropagation()) : h(e)
                } else {
                    if (m(t, e)) return e.preventDefault(), void e.stopPropagation();
                    d.placeholder.isVisible() ? (d.opts.keepFormatOnDelete || g(), e.preventDefault(), e.stopPropagation()) : u(e)
                }
                d.events.enableBlur()
            }

            function l() {
                if (!d.$wp) return !0;
                var e;
                d.opts.height || d.opts.heightMax ? (e = d.position.getBoundingRect().top, (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top), e > d.$wp.offset().top - d.helpers.scrollTop() + d.$wp.height() - 20 && d.$wp.scrollTop(e + d.$wp.scrollTop() - (d.$wp.height() + d.$wp.offset().top) + d.helpers.scrollTop() + 20)) : (e = d.position.getBoundingRect().top, d.opts.toolbarBottom && (e += d.opts.toolbarStickyOffset), (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top, e -= d.helpers.scrollTop()), (e += d.opts.toolbarStickyOffset) > d.o_win.innerHeight - 20 && o(d.o_win).scrollTop(e + d.helpers.scrollTop() - d.o_win.innerHeight + 20), e = d.position.getBoundingRect().top, d.opts.toolbarBottom || (e -= d.opts.toolbarStickyOffset), (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top, e -= d.helpers.scrollTop()), e < 100 && o(d.o_win).scrollTop(e + d.helpers.scrollTop() - 100))
            }

            function c(e) {
                var t = d.selection.element();
                if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
                if (e && 0 === e.which && f && (e.which = f), d.helpers.isAndroid() && d.browser.mozilla) return !0;
                if (p) return !1;
                if (e && d.helpers.isIOS() && e.which === V.KEYCODE.ENTER && d.doc.execCommand("undo"), !d.selection.isCollapsed()) return !0;
                if (e && (e.which === V.KEYCODE.META || e.which === V.KEYCODE.CTRL)) return !0;
                if (e && b(e.which)) return !0;
                if (e && !d.helpers.isIOS() && (e.which === V.KEYCODE.ENTER || e.which === V.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !d.browser.msie)) try {
                    l()
                } catch (r) {
                }
                var n = d.selection.element();
                (function o(e) {
                    if (!e) return !1;
                    var t = e.innerHTML;
                    return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length)
                })(n) && !d.node.hasClass(n, "fr-marker") && "IFRAME" !== n.tagName && function i(e) {
                    return !d.helpers.isIOS() || 0 === ((e.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length
                }(n) && (d.selection.save(), function a(e) {
                    for (var t = d.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, d.node.filter(function (e) {
                        return /\u200B/gi.test(e.textContent)
                    }), !1); t.nextNode();) {
                        var n = t.currentNode;
                        n.textContent = n.textContent.replace(/\u200B/gi, "")
                    }
                }(n), d.selection.restore())
            }

            function v(e) {
                if (-1 !== navigator.userAgent.indexOf("Mac OS X")) {
                    if (e.metaKey && !e.altKey) return !0
                } else if (e.ctrlKey && !e.altKey) return !0;
                return !1
            }

            function b(e) {
                if (e >= V.KEYCODE.ARROW_LEFT && e <= V.KEYCODE.ARROW_DOWN) return !0
            }

            function E(e) {
                if (e >= V.KEYCODE.ZERO && e <= V.KEYCODE.NINE) return !0;
                if (e >= V.KEYCODE.NUM_ZERO && e <= V.KEYCODE.NUM_MULTIPLY) return !0;
                if (e >= V.KEYCODE.A && e <= V.KEYCODE.Z) return !0;
                if (d.browser.webkit && 0 === e) return !0;
                switch (e) {
                    case V.KEYCODE.SPACE:
                    case V.KEYCODE.QUESTION_MARK:
                    case V.KEYCODE.NUM_PLUS:
                    case V.KEYCODE.NUM_MINUS:
                    case V.KEYCODE.NUM_PERIOD:
                    case V.KEYCODE.NUM_DIVISION:
                    case V.KEYCODE.SEMICOLON:
                    case V.KEYCODE.FF_SEMICOLON:
                    case V.KEYCODE.DASH:
                    case V.KEYCODE.EQUALS:
                    case V.KEYCODE.FF_EQUALS:
                    case V.KEYCODE.COMMA:
                    case V.KEYCODE.PERIOD:
                    case V.KEYCODE.SLASH:
                    case V.KEYCODE.APOSTROPHE:
                    case V.KEYCODE.SINGLE_QUOTE:
                    case V.KEYCODE.OPEN_SQUARE_BRACKET:
                    case V.KEYCODE.BACKSLASH:
                    case V.KEYCODE.CLOSE_SQUARE_BRACKET:
                        return !0;
                    default:
                        return !1
                }
            }

            function S(e) {
                var t = e.which;
                if (v(e) || 37 <= t && t <= 40 || !E(t) && t !== V.KEYCODE.DELETE && t !== V.KEYCODE.BACKSPACE && t !== V.KEYCODE.ENTER && t !== V.KEYCODE.IME) return !0;
                n || (r = d.snapshot.get(), d.undo.canDo() || d.undo.saveStep()), clearTimeout(n), n = setTimeout(function () {
                    n = null, d.undo.saveStep()
                }, Math.max(250, d.opts.typingTimer))
            }

            function T(e) {
                var t = e.which;
                if (v(e) || 37 <= t && t <= 40) return !0;
                r && n ? (d.undo.saveStep(r), r = null) : void 0 !== t && 0 !== t || r || n || d.undo.saveStep()
            }

            function y(e) {
                if (e && "BR" === e.tagName) return !1;
                try {
                    return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 === e.childNodes.length && e.childNodes[0].getAttribute && ("false" === e.childNodes[0].getAttribute("contenteditable") || d.node.hasClass(e.childNodes[0], "fr-img-caption"))
                } catch (t) {
                    return !1
                }
            }

            function C(e) {
                var t = d.el.childNodes, n = d.html.defaultTag(), r = d.node.blockParent(d.selection.blocks()[0]);
                return r && "TR" == r.tagName && r.getAttribute("contenteditable") == undefined && (r = r.closest("table")), !d.node.isEditable(e.target) || r && "false" === r.getAttribute("contenteditable") ? d.toolbar.disable() : d.toolbar.enable(), !(!e.target || e.target === d.el) || (0 === t.length || void (t[0].offsetHeight + t[0].offsetTop <= e.offsetY ? y(t[t.length - 1]) && (n ? d.$el.append("<".concat(n, ">").concat(V.MARKERS, "<br></").concat(n, ">")) : d.$el.append("".concat(V.MARKERS, "<br>")), d.selection.restore(), l()) : e.offsetY <= 10 && y(t[0]) && (n ? d.$el.prepend("<".concat(n, ">").concat(V.MARKERS, "<br></").concat(n, ">")) : d.$el.prepend("".concat(V.MARKERS, "<br>")), d.selection.restore(), l())))
            }

            function N() {
                n && clearTimeout(n)
            }

            return {
                _init: function A() {
                    d.events.on("keydown", S), d.events.on("input", e), d.events.on("mousedown", a), d.events.on("keyup input", T), d.events.on("keypress", i), d.events.on("keydown", s), d.events.on("keyup", c), d.events.on("destroy", N), d.events.on("html.inserted", c), d.events.on("cut", t), d.opts.multiLine && d.events.on("click", C)
                }, ctrlKey: v, isCharacter: E, isArrow: b, forceUndo: function M() {
                    n && (clearTimeout(n), d.undo.saveStep(), r = null)
                }, isIME: function O() {
                    return p
                }, isBrowserAction: function x(e) {
                    var t = e.which;
                    return v(e) || t === V.KEYCODE.F5
                }, positionCaret: l
            }
        }, Object.assign(V.DEFAULTS, {
            pastePlain: !1,
            pasteDeniedTags: ["colgroup", "col", "meta"],
            pasteDeniedAttrs: ["class", "id"],
            pasteAllowedStyleProps: [".*"],
            pasteAllowLocalImages: !1
        }), V.MODULES.paste = function (M) {
            var a, s, i, O, x = M.$;

            function n(e, t) {
                try {
                    M.win.localStorage.setItem("fr-copied-html", e), M.win.localStorage.setItem("fr-copied-text", t)
                } catch (n) {
                }
            }

            function e(e) {
                var t = M.html.getSelected();
                n(t, x(M.doc.createElement("div")).html(t).text()), "cut" === e.type && (M.undo.saveStep(), setTimeout(function () {
                    M.selection.save(), M.html.wrap(), M.selection.restore(), M.events.focus(), M.undo.saveStep()
                }, 0))
            }

            var l = !1;

            function t(e) {
                if ("INPUT" === e.target.nodeName && "text" === e.target.type) return !0;
                if (M.edit.isDisabled()) return !1;
                if (c(e.target)) return !1;
                if (l) return !1;
                if (e.originalEvent && (e = e.originalEvent), !1 === M.events.trigger("paste.before", [e])) return e.preventDefault(), !1;
                if (e && e.clipboardData && e.clipboardData.getData) {
                    var t = "", n = e.clipboardData.types;
                    if (M.helpers.isArray(n)) for (var r = 0; r < n.length; r++) t += "".concat(n[r], ";"); else t = n;
                    if (a = "", /text\/rtf/.test(t) && (s = e.clipboardData.getData("text/rtf")), /text\/html/.test(t) && !M.browser.safari ? a = e.clipboardData.getData("text/html") : /text\/rtf/.test(t) && M.browser.safari ? a = s : /public.rtf/.test(t) && M.browser.safari && (a = e.clipboardData.getData("text/rtf")), "" !== a) return d(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
                    a = null
                }
                return function o() {
                    M.selection.save(), M.events.disableBlur(), a = null, i ? (i.html(""), M.browser.edge && M.opts.iframe && M.$el.append(i)) : (i = x('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), M.browser.webkit || M.browser.mozilla ? (i.css("top", M.$sc.scrollTop()), M.$el.after(i)) : M.browser.edge && M.opts.iframe ? M.$el.append(i) : M.$box.after(i), M.events.on("destroy", function () {
                        i.remove()
                    }));
                    var e;
                    M.helpers.isIOS() && M.$sc && (e = M.$sc.scrollTop());
                    M.opts.iframe && M.$el.attr("contenteditable", "false");
                    i.focus(), M.helpers.isIOS() && M.$sc && M.$sc.scrollTop(e);
                    M.win.setTimeout(d, 1)
                }(), !1
            }

            function c(e) {
                return e && "false" === e.contentEditable
            }

            function r(e) {
                if (e.originalEvent && (e = e.originalEvent), c(e.target)) return !1;
                if (e && e.dataTransfer && e.dataTransfer.getData) {
                    var t = "", n = e.dataTransfer.types;
                    if (M.helpers.isArray(n)) for (var r = 0; r < n.length; r++) t += "".concat(n[r], ";"); else t = n;
                    if (a = "", /text\/rtf/.test(t) && (s = e.dataTransfer.getData("text/rtf")), /text\/html/.test(t) ? a = e.dataTransfer.getData("text/html") : /text\/rtf/.test(t) && M.browser.safari ? a = s : /text\/plain/.test(t) && !this.browser.mozilla && (a = M.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== a) {
                        M.keys.forceUndo(), O = M.snapshot.get(), M.selection.save(), M.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
                        var o = M.markers.insertAtPoint(e);
                        if (M.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), M.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), M.selection.restore(), M.selection.remove(), M.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), !1 !== o) {
                            var i = M.el.querySelector(".fr-marker");
                            return x(i).replaceWith(V.MARKERS), M.selection.restore(), d(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1
                        }
                    } else a = null
                }
            }

            function d() {
                M.opts.iframe && M.$el.attr("contenteditable", "true"), M.browser.edge && M.opts.iframe && M.$box.after(i), O || (M.keys.forceUndo(), O = M.snapshot.get()), a || (a = i.get(0).innerHTML, M.selection.restore(), M.events.enableBlur());
                var e = a.match(/(class="?Mso|class='?Mso|class="?Xl|class='?Xl|class=Xl|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument|LibreOffice)/gi),
                    t = M.events.chainTrigger("paste.beforeCleanup", a);
                t && "string" == typeof t && (a = t), (!e || e && !1 !== M.events.trigger("paste.wordPaste", [a])) && o(a, e)
            }

            function w(e) {
                for (var t = "", n = 0; n++ < e;) t += "&nbsp;";
                return t
            }

            function o(e, t, n) {
                var r, o = null, i = null;
                if (0 <= e.toLowerCase().indexOf("<body")) {
                    var a = "";
                    0 <= e.indexOf("<style") && (a = e.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), e = (e = a + e.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2")
                }
                var s = !1;
                0 <= e.indexOf('id="docs-internal-guid') && (e = e.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), s = !0), 0 <= e.indexOf('content="Sheets"') && (e = e.replace(/width:0px;/g, ""));
                var l = !1;
                if (!t) if ((l = function T(e) {
                    var t = null;
                    try {
                        t = M.win.localStorage.getItem("fr-copied-text")
                    } catch (n) {
                    }
                    return !(!t || x("<div>").html(e).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") !== t.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, ""))
                }(e)) && (e = M.win.localStorage.getItem("fr-copied-html")), l) e = M.clean.html(e, M.opts.pasteDeniedTags, M.opts.pasteDeniedAttrs); else {
                    var c = M.opts.htmlAllowedStyleProps;
                    M.opts.htmlAllowedStyleProps = M.opts.pasteAllowedStyleProps, M.opts.htmlAllowComments = !1, e = (e = (e = e.replace(/<span class="Apple-tab-span">\s*<\/span>/g, w(M.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function (e, t) {
                        return w(t.length * (M.opts.tabSpaces || 4))
                    })).replace(/\t/g, w(M.opts.tabSpaces || 4)), e = M.clean.html(e, M.opts.pasteDeniedTags, M.opts.pasteDeniedAttrs), M.opts.htmlAllowedStyleProps = c, M.opts.htmlAllowComments = !0, e = (e = (e = $(e)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "")
                }
                !t || M.wordPaste && n || (0 === (e = e.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (e = "<table>".concat(e, "</table>")), e = $(e = function y(e) {
                    var t;
                    e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if !supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if !supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                    var n, r = ["style", "script", "applet", "embed", "noframes", "noscript"];
                    for (t = 0; t < r.length; t++) {
                        var o = new RegExp("<".concat(r[t], ".*?").concat(r[t], "(.*?)>"), "gi");
                        e = e.replace(o, "")
                    }
                    for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>"); (e = (n = e).replace(/<[^/>][^>]*><\/[^>]+>/gi, "")) !== n;) ;
                    e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e = (e = (e = M.clean.html(e, M.opts.pasteDeniedTags, M.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                    var i = M.o_doc.createElement("div");
                    i.innerHTML = e;
                    var a = i.querySelectorAll("li[data-indent]");
                    for (t = 0; t < a.length; t++) {
                        var s = a[t], l = s.previousElementSibling;
                        if (l && "LI" === l.tagName) {
                            var c = l.querySelector(":scope > ul, :scope > ol");
                            c || (c = document.createElement("ul"), l.appendChild(c)), c.appendChild(s)
                        } else s.removeAttribute("data-indent")
                    }
                    return M.html.cleanBlankSpaces(i), e = i.innerHTML
                }(e))), M.opts.pastePlain && !l && (e = function C(e) {
                    var t, n = null, r = M.doc.createElement("div");
                    r.innerHTML = e;
                    var o = r.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                    for (t = 0; t < o.length; t++) (n = o[t]).outerHTML = "<".concat(M.html.defaultTag() || "DIV", ">").concat(n.innerHTML, "</").concat(M.html.defaultTag() || "DIV", ">");
                    for (t = (o = r.querySelectorAll("*:not(".concat("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not("), ")"))).length - 1; 0 <= t; t--) (n = o[t]).outerHTML = n.innerHTML;
                    return function i(e) {
                        for (var t = M.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && t[n].nodeType !== Node.ELEMENT_NODE ? t[n].parentNode.removeChild(t[n]) : i(t[n])
                    }(r), r.innerHTML
                }(e));
                var d = M.events.chainTrigger("paste.afterCleanup", e);
                if ("string" == typeof d && (e = d), "" !== e) {
                    var f = M.o_doc.createElement("div");
                    0 <= (f.innerHTML = e).indexOf("<body>") ? (M.html.cleanBlankSpaces(f), M.spaces.normalize(f, !0)) : M.spaces.normalize(f);
                    var p = f.getElementsByTagName("span");
                    for (r = p.length - 1; 0 <= r; r--) {
                        var u = p[r];
                        0 === u.attributes.length && (u.outerHTML = u.innerHTML)
                    }
                    if (!0 === M.opts.linkAlwaysBlank) {
                        var h = f.getElementsByTagName("a");
                        for (r = h.length - 1; 0 <= r; r--) {
                            var g = h[r];
                            g.getAttribute("target") || g.setAttribute("target", "_blank")
                        }
                    }
                    var m = M.selection.element(), v = !1;
                    if (m && x(m).parentsUntil(M.el, "ul, ol").length && (v = !0), v) {
                        var b = f.children;
                        1 === b.length && 0 <= ["OL", "UL"].indexOf(b[0].tagName) && (b[0].outerHTML = b[0].innerHTML)
                    }
                    if (!s) {
                        var E = f.getElementsByTagName("br");
                        for (r = E.length - 1; 0 <= r; r--) {
                            var S = E[r];
                            M.node.isBlock(S.previousSibling) && S.parentNode.removeChild(S)
                        }
                    }
                    if (M.opts.enter === V.ENTER_BR) for (r = (o = f.querySelectorAll("p, div")).length - 1; 0 <= r; r--) 0 === (i = o[r]).attributes.length && (i.outerHTML = i.innerHTML + (i.nextSibling && !M.node.isEmpty(i) ? "<br>" : "")); else if (M.opts.enter === V.ENTER_DIV) for (r = (o = f.getElementsByTagName("p")).length - 1; 0 <= r; r--) 0 === (i = o[r]).attributes.length && (i.outerHTML = "<div>".concat(i.innerHTML, "</div>")); else M.opts.enter === V.ENTER_P && 1 === f.childNodes.length && "P" === f.childNodes[0].tagName && 0 === f.childNodes[0].attributes.length && (f.childNodes[0].outerHTML = f.childNodes[0].innerHTML);
                    e = f.innerHTML, l && (e = function N(e) {
                        var t, n = M.o_doc.createElement("div");
                        n.innerHTML = e;
                        var r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(V.VOID_ELEMENTS.join("):not("), "):not(").concat(M.opts.htmlAllowedEmptyTags.join("):not("), ")"));
                        for (; r.length;) {
                            for (t = 0; t < r.length; t++) r[t].parentNode.removeChild(r[t]);
                            r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(V.VOID_ELEMENTS.join("):not("), "):not(").concat(M.opts.htmlAllowedEmptyTags.join("):not("), ")"))
                        }
                        return n.innerHTML
                    }(e)), M.html.insert(e, !0)
                }
                !function A() {
                    M.events.trigger("paste.after")
                }(), M.undo.saveStep(O), O = null, M.undo.saveStep()
            }

            function f(e) {
                for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1);
                return e
            }

            function $(e) {
                var t, n = M.o_doc.createElement("div");
                n.innerHTML = e;
                for (var r = f(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); r.length;) {
                    var o = r[r.length - 1];
                    if (M.html.defaultTag() && "div" !== M.html.defaultTag()) o.querySelector(M.html.blockTagsQuery()) ? o.outerHTML = o.innerHTML : o.outerHTML = "<".concat(M.html.defaultTag(), ">").concat(o.innerHTML, "</").concat(M.html.defaultTag(), ">"); else {
                        var i = o.querySelectorAll("*");
                        !i.length || "BR" !== i[i.length - 1].tagName && 0 === o.innerText.length ? o.outerHTML = o.innerHTML + (o.nextSibling ? "<br>" : "") : !i.length || "BR" !== i[i.length - 1].tagName || i[i.length - 1].nextSibling ? o.outerHTML = o.innerHTML + (o.nextSibling ? "<br>" : "") : o.outerHTML = o.innerHTML
                    }
                    r = f(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")))
                }
                for (r = f(Array.prototype.slice.call(n.querySelectorAll("div:not([style])"))); r.length;) {
                    for (t = 0; t < r.length; t++) {
                        var a = r[t], s = a.innerHTML.replace(/\u0009/gi, "").trim();
                        a.outerHTML = s
                    }
                    r = f(Array.prototype.slice.call(n.querySelectorAll("div:not([style])")))
                }
                return n.innerHTML
            }

            function p() {
                M.el.removeEventListener("copy", e), M.el.removeEventListener("cut", e), M.el.removeEventListener("paste", t)
            }

            return {
                _init: function u() {
                    M.el.addEventListener("copy", e), M.el.addEventListener("cut", e), M.el.addEventListener("paste", t, {capture: !0}), M.events.on("drop", r), M.browser.msie && M.browser.version < 11 && (M.events.on("mouseup", function (e) {
                        2 === e.button && (setTimeout(function () {
                            l = !1
                        }, 50), l = !0)
                    }, !0), M.events.on("beforepaste", t)), M.events.on("destroy", p)
                }, cleanEmptyTagsAndDivs: $, getRtfClipboard: function h() {
                    return s
                }, saveCopiedText: n, clean: o
            }
        }, Object.assign(V.DEFAULTS, {
            shortcutsEnabled: [],
            shortcutsHint: !0
        }), V.SHORTCUTS_MAP = {}, V.RegisterShortcut = function (e, t, n, r, o, i) {
            V.SHORTCUTS_MAP[(o ? "^" : "") + (i ? "@" : "") + e] = {
                cmd: t,
                val: n,
                letter: r,
                shift: o,
                option: i
            }, V.DEFAULTS.shortcutsEnabled.push(t)
        }, V.RegisterShortcut(V.KEYCODE.E, "show", null, "E", !1, !1), V.RegisterShortcut(V.KEYCODE.B, "bold", null, "B", !1, !1), V.RegisterShortcut(V.KEYCODE.I, "italic", null, "I", !1, !1), V.RegisterShortcut(V.KEYCODE.U, "underline", null, "U", !1, !1), V.RegisterShortcut(V.KEYCODE.S, "strikeThrough", null, "S", !1, !1), V.RegisterShortcut(V.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), V.RegisterShortcut(V.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), V.RegisterShortcut(V.KEYCODE.Z, "undo", null, "Z", !1, !1), V.RegisterShortcut(V.KEYCODE.Z, "redo", null, "Z", !0, !1), V.RegisterShortcut(V.KEYCODE.Y, "redo", null, "Y", !1, !1), V.MODULES.shortcuts = function (s) {
            var r = null;
            var l = !1;

            function e(e) {
                if (!s.core.hasFocus()) return !0;
                var t = e.which, n = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
                if ("keyup" === e.type && l && t !== V.KEYCODE.META) return l = !1;
                "keydown" === e.type && (l = !1);
                var r = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + t,
                    o = s.node.blockParent(s.selection.blocks()[0]);
                if (o && "TR" == o.tagName && o.getAttribute("contenteditable") == undefined && (o = o.closest("table")), n && V.SHORTCUTS_MAP[r] && (!o || "false" !== o.getAttribute("contenteditable"))) {
                    var i = V.SHORTCUTS_MAP[r].cmd;
                    if (i && 0 <= s.opts.shortcutsEnabled.indexOf(i)) {
                        var a = V.SHORTCUTS_MAP[r].val;
                        if (!1 === s.events.trigger("shortcut", [e, i, a])) return !(l = !0);
                        if (i && (s.commands[i] || V.COMMANDS[i] && V.COMMANDS[i].callback)) return e.preventDefault(), e.stopPropagation(), "keydown" === e.type && ((s.commands[i] || V.COMMANDS[i].callback)(), l = !0), !1
                    }
                }
            }

            return {
                _init: function t() {
                    s.events.on("keydown", e, !0), s.events.on("keyup", e, !0)
                }, get: function o(e) {
                    if (!s.opts.shortcutsHint) return null;
                    if (!r) for (var t in r = {}, V.SHORTCUTS_MAP) Object.prototype.hasOwnProperty.call(V.SHORTCUTS_MAP, t) && 0 <= s.opts.shortcutsEnabled.indexOf(V.SHORTCUTS_MAP[t].cmd) && (r["".concat(V.SHORTCUTS_MAP[t].cmd, ".").concat(V.SHORTCUTS_MAP[t].val || "")] = {
                        shift: V.SHORTCUTS_MAP[t].shift,
                        option: V.SHORTCUTS_MAP[t].option,
                        letter: V.SHORTCUTS_MAP[t].letter
                    });
                    var n = r[e];
                    return n ? (s.helpers.isMac() ? String.fromCharCode(8984) : "".concat(s.language.translate("Ctrl"), "+")) + (n.shift ? s.helpers.isMac() ? String.fromCharCode(8679) : "".concat(s.language.translate("Shift"), "+") : "") + (n.option ? s.helpers.isMac() ? String.fromCharCode(8997) : "".concat(s.language.translate("Alt"), "+") : "") + n.letter : null
                }
            }
        }, V.MODULES.snapshot = function (l) {
            function n(e) {
                for (var t = e.parentNode.childNodes, n = 0, r = null, o = 0; o < t.length; o++) {
                    if (r) {
                        var i = t[o].nodeType === Node.TEXT_NODE && "" === t[o].textContent,
                            a = r.nodeType === Node.TEXT_NODE && t[o].nodeType === Node.TEXT_NODE,
                            s = r.nodeType === Node.TEXT_NODE && "" === r.textContent;
                        i || a || s || n++
                    }
                    if (t[o] === e) return n;
                    r = t[o]
                }
            }

            function o(e) {
                var t = [];
                if (!e.parentNode) return [];
                for (; !l.node.isElement(e);) t.push(n(e)), e = e.parentNode;
                return t.reverse()
            }

            function i(e, t) {
                for (; e && e.nodeType === Node.TEXT_NODE;) {
                    var n = e.previousSibling;
                    n && n.nodeType === Node.TEXT_NODE && (t += n.textContent.length), e = n
                }
                return t
            }

            function c(e) {
                for (var t = l.el, n = 0; n < e.length; n++) t = t.childNodes[e[n]];
                return t
            }

            function r(e, t) {
                try {
                    var n = c(t.scLoc), r = t.scOffset, o = c(t.ecLoc), i = t.ecOffset, a = l.doc.createRange();
                    a.setStart(n, r), a.setEnd(o, i), e.addRange(a)
                } catch (s) {
                }
            }

            return {
                get: function a() {
                    var e, t = {};
                    if (l.events.trigger("snapshot.before"), t.html = (l.$wp ? l.$el.html() : l.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l.$wp && l.selection.inEditor() && l.core.hasFocus()) for (var n = l.selection.ranges(), r = 0; r < n.length; r++) t.ranges.push({
                        scLoc: o((e = n[r]).startContainer),
                        scOffset: i(e.startContainer, e.startOffset),
                        ecLoc: o(e.endContainer),
                        ecOffset: i(e.endContainer, e.endOffset)
                    });
                    return l.events.trigger("snapshot.after", [t]), t
                }, restore: function s(e) {
                    l.$el.html() !== e.html && (l.opts.htmlExecuteScripts ? l.$el.html(e.html) : l.el.innerHTML = e.html);
                    var t = l.selection.get();
                    l.selection.clear(), l.events.focus(!0);
                    for (var n = 0; n < e.ranges.length; n++) r(t, e.ranges[n])
                }, equal: function d(e, t) {
                    return e.html === t.html && (!l.core.hasFocus() || JSON.stringify(e.ranges) === JSON.stringify(t.ranges))
                }
            }
        }, V.MODULES.undo = function (n) {
            function e(e) {
                var t = e.which;
                n.keys.ctrlKey(e) && (t === V.KEYCODE.Z && e.shiftKey && e.preventDefault(), t === V.KEYCODE.Z && e.preventDefault())
            }

            var t = null;

            function r() {
                if (n.undo_stack && !n.undoing) for (; n.undo_stack.length > n.undo_index;) n.undo_stack.pop()
            }

            function o() {
                n.undo_index = 0, n.undo_stack = []
            }

            function i() {
                n.undo_stack = []
            }

            return {
                _init: function a() {
                    o(), n.events.on("initialized", function () {
                        t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "")
                    }), n.events.on("blur", function () {
                        n.el.querySelector(".fr-dragging") || n.undo.saveStep()
                    }), n.events.on("keydown", e), n.events.on("destroy", i)
                }, run: function s() {
                    if (1 < n.undo_index) {
                        n.undoing = !0;
                        var e = n.undo_stack[--n.undo_index - 1];
                        clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.undo"), n.undoing = !1
                    }
                }, redo: function l() {
                    if (n.undo_index < n.undo_stack.length) {
                        n.undoing = !0;
                        var e = n.undo_stack[n.undo_index++];
                        clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.redo"), n.undoing = !1
                    }
                }, canDo: function c() {
                    return !(0 === n.undo_stack.length || n.undo_index <= 1)
                }, canRedo: function d() {
                    return n.undo_index !== n.undo_stack.length
                }, dropRedo: r, reset: o, saveStep: function f(e) {
                    !n.undo_stack || n.undoing || n.el.querySelector(".fr-marker") || (void 0 === e ? (e = n.snapshot.get(), n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e) || (r(), n.undo_stack.push(e), n.undo_index++, e.html !== t && (n.events.trigger("contentChanged"), t = e.html))) : (r(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e : (n.undo_stack.push(e), n.undo_index++)))
                }
            }
        }, Object.assign(V.DEFAULTS, {
            height: null,
            heightMax: null,
            heightMin: null,
            width: null
        }), V.MODULES.size = function (e) {
            function t() {
                n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), e.$iframe.height(e.$el.outerHeight(!0))
            }

            function n() {
                e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), e.$wp.css("overflow", "")), e.opts.height ? (e.$wp.css("height", e.opts.height), e.$wp.css("overflow", "auto"), e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) : (e.$wp.css("height", ""), e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), e.opts.width && e.$box.width(e.opts.width)
            }

            return {
                _init: function r() {
                    if (!e.$wp) return !1;
                    n(), e.$iframe && (e.events.on("keyup keydown", function () {
                        setTimeout(t, 0)
                    }, !0), e.events.on("commands.after html.set init initialized paste.after", t))
                }, syncIframe: t, refresh: n
            }
        }, Object.assign(V.DEFAULTS, {
            documentReady: !1,
            editorClass: null,
            typingTimer: 500,
            iframe: !1,
            requestWithCORS: !0,
            requestWithCredentials: !1,
            requestHeaders: {},
            useClasses: !0,
            spellcheck: !0,
            iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:20px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
            iframeStyle: "",
            iframeStyleFiles: [],
            direction: "auto",
            zIndex: 1,
            tabIndex: null,
            disableRightClick: !1,
            scrollableContainer: "body",
            keepFormatOnDelete: !1,
            theme: null
        }), V.MODULES.core = function (a) {
            var r = a.$;

            function n() {
                if (a.$box.addClass("fr-box".concat(a.opts.editorClass ? " ".concat(a.opts.editorClass) : "")), a.$box.attr("role", "application"), a.$wp.addClass("fr-wrapper"), a.opts.documentReady && a.$box.addClass("fr-document"), function o() {
                    a.opts.iframe || a.$el.addClass("fr-element fr-view")
                }(), a.opts.iframe) {
                    a.$iframe.addClass("fr-iframe"), a.$el.addClass("fr-view");
                    for (var e = 0; e < a.o_doc.styleSheets.length; e++) {
                        var t = void 0;
                        try {
                            t = a.o_doc.styleSheets[e].cssRules
                        } catch (i) {
                        }
                        if (t) for (var n = 0, r = t.length; n < r; n++) !t[n].selectorText || 0 !== t[n].selectorText.indexOf(".fr-view") && 0 !== t[n].selectorText.indexOf(".fr-element") || 0 < t[n].style.cssText.length && (0 === t[n].selectorText.indexOf(".fr-view") ? a.opts.iframeStyle += "".concat(t[n].selectorText.replace(/\.fr-view/g, "body"), "{").concat(t[n].style.cssText, "}") : a.opts.iframeStyle += "".concat(t[n].selectorText.replace(/\.fr-element/g, "body"), "{").concat(t[n].style.cssText, "}"))
                    }
                }
                "auto" !== a.opts.direction && a.$box.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(a.opts.direction)), a.$el.attr("dir", a.opts.direction), a.$wp.attr("dir", a.opts.direction), 1 < a.opts.zIndex && a.$box.css("z-index", a.opts.zIndex), a.opts.theme && a.$box.addClass("".concat(a.opts.theme, "-theme")), a.opts.tabIndex = a.opts.tabIndex || a.$oel.attr("tabIndex"), a.opts.tabIndex && a.$el.attr("tabIndex", a.opts.tabIndex)
            }

            return {
                _init: function o() {
                    if (V.INSTANCES.push(a), function e() {
                        a.drag_support = {
                            filereader: "undefined" != typeof FileReader,
                            formdata: Boolean(a.win.FormData),
                            progress: "upload" in new XMLHttpRequest
                        }
                    }(), a.$wp) {
                        n(), a.html.set(a._original_html), a.$el.attr("spellcheck", a.opts.spellcheck), a.helpers.isMobile() && (a.$el.attr("autocomplete", a.opts.spellcheck ? "on" : "off"), a.$el.attr("autocorrect", a.opts.spellcheck ? "on" : "off"), a.$el.attr("autocapitalize", a.opts.spellcheck ? "on" : "off")), a.opts.disableRightClick && a.events.$on(a.$el, "contextmenu", function (e) {
                            if (2 === e.button) return e.preventDefault(), e.stopPropagation(), !1
                        });
                        try {
                            a.doc.execCommand("styleWithCSS", !1, !1)
                        } catch (t) {
                        }
                    }
                    "TEXTAREA" === a.$oel.get(0).tagName && (a.events.on("contentChanged", function () {
                        a.$oel.val(a.html.get())
                    }), a.events.on("form.submit", function () {
                        a.$oel.val(a.html.get())
                    }), a.events.on("form.reset", function () {
                        a.html.set(a._original_html)
                    }), a.$oel.val(a.html.get())), a.helpers.isIOS() && a.events.$on(a.$doc, "selectionchange", function () {
                        a.$doc.get(0).hasFocus() || a.$win.get(0).focus()
                    }), a.events.trigger("init"), a.opts.autofocus && !a.opts.initOnClick && a.$wp && a.events.on("initialized", function () {
                        a.events.focus(!0)
                    })
                }, destroy: function t(e) {
                    "TEXTAREA" === a.$oel.get(0).tagName && a.$oel.val(e), a.$box && a.$box.removeAttr("role"), a.$wp && ("TEXTAREA" === a.$oel.get(0).tagName ? (a.$el.html(""), a.$wp.html(""), a.$box.replaceWith(a.$oel), a.$oel.show()) : (a.$wp.replaceWith(e), a.$el.html(""), a.$box.removeClass("fr-view fr-ltr fr-box ".concat(a.opts.editorClass || "")), a.opts.theme && a.$box.addClass("".concat(a.opts.theme, "-theme")))), this.$wp = null, this.$el = null, this.el = null, this.$box = null
                }, isEmpty: function e() {
                    return a.node.isEmpty(a.el)
                }, getXHR: function i(e, t) {
                    var n = new XMLHttpRequest;
                    for (var r in n.open(t, e, !0), a.opts.requestWithCredentials && (n.withCredentials = !0), a.opts.requestHeaders) Object.prototype.hasOwnProperty.call(a.opts.requestHeaders, r) && n.setRequestHeader(r, a.opts.requestHeaders[r]);
                    return n
                }, injectStyle: function s(e) {
                    if (a.opts.iframe) {
                        a.$head.find("style[data-fr-style], link[data-fr-style]").remove(), a.$head.append('<style data-fr-style="true">'.concat(e, "</style>"));
                        for (var t = 0; t < a.opts.iframeStyleFiles.length; t++) {
                            var n = r('<link data-fr-style="true" rel="stylesheet" href="'.concat(a.opts.iframeStyleFiles[t], '">'));
                            n.get(0).addEventListener("load", a.size.syncIframe), a.$head.append(n)
                        }
                    }
                }, hasFocus: function l() {
                    return a.browser.mozilla && a.helpers.isMobile() ? a.selection.inEditor() : a.node.hasFocus(a.el) || 0 < a.$el.find("*:focus").length
                }, sameInstance: function c(e) {
                    if (!e) return !1;
                    var t = e.data("instance");
                    return !!t && t.id === a.id
                }
            }
        }, V.POPUP_TEMPLATES = {"text.edit": "[_EDIT_]"}, V.RegisterTemplate = function (e, t) {
            V.POPUP_TEMPLATES[e] = t
        }, V.MODULES.popups = function (f) {
            var d = f.$;
            f.shared.popups || (f.shared.popups = {});
            var p, u = f.shared.popups;

            function h(e, t) {
                t.isVisible() || (t = f.$sc), t.is(u[e].data("container")) || (u[e].data("container", t), t.append(u[e]))
            }

            function a() {
                d(this).toggleClass("fr-not-empty", !0)
            }

            function s() {
                var e = d(this);
                e.toggleClass("fr-not-empty", "" !== e.val())
            }

            function g(e) {
                return u[e] && f.node.hasClass(u[e], "fr-active") && f.core.sameInstance(u[e]) || !1
            }

            function m(e) {
                for (var t in u) if (Object.prototype.hasOwnProperty.call(u, t) && g(t) && (void 0 === e || u[t].data("instance") === e)) return u[t];
                return !1
            }

            function n(e) {
                var t = null;
                if ((t = "string" != typeof e ? e : u[e]) && f.node.hasClass(t, "fr-active") && (t.removeClass("fr-active fr-above"), f.events.trigger("popups.hide.".concat(e)), f.$tb && (1 < f.opts.zIndex ? f.$tb.css("zIndex", f.opts.zIndex + 1) : f.$tb.css("zIndex", "")), f.events.disableBlur(), t.find("input, textarea, button").each(function () {
                    this === this.ownerDocument.activeElement && this.blur()
                }), t.find("input, textarea").attr("disabled", "disabled"), p)) for (var n = 0; n < p.length; n++) d(p[n]).removeClass("fr-btn-active-popup")
            }

            function v(e) {
                for (var t in void 0 === e && (e = []), u) Object.prototype.hasOwnProperty.call(u, t) && e.indexOf(t) < 0 && n(t)
            }

            function t() {
                f.shared.exit_flag = !0
            }

            function b() {
                f.shared.exit_flag = !1
            }

            function i() {
                return f.shared.exit_flag
            }

            function l(e, t) {
                var n, r = function c(e, t) {
                    var n = V.POPUP_TEMPLATES[e];
                    if (!n) return null;
                    for (var r in "function" == typeof n && (n = n.apply(f)), t) Object.prototype.hasOwnProperty.call(t, r) && (n = n.replace("[_".concat(r.toUpperCase(), "_]"), t[r]));
                    return n
                }(e, t), o = d(f.doc.createElement("DIV"));
                if (!r) return o.addClass("fr-popup fr-empty"), (n = d("body").first()).append(o), o.data("container", n), u[e] = o;
                o.addClass("fr-popup".concat(f.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(f.opts.toolbarInline ? " fr-inline" : "")), o.html(r), f.opts.theme && o.addClass("".concat(f.opts.theme, "-theme")), 1 < f.opts.zIndex && (!f.opts.editInPopup && f.$tb ? f.$tb.css("z-index", f.opts.zIndex + 2) : o.css("z-index", f.opts.zIndex + 2)), "auto" !== f.opts.direction && o.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(f.opts.direction)), o.find("input, textarea").attr("dir", f.opts.direction).attr("disabled", "disabled"), (n = d("body").first()).append(o), o.data("container", n);
                var i = (u[e] = o).find(".fr-color-hex-layer");
                if (0 < i.length) {
                    var a = f.helpers.getPX(o.find(".fr-color-set > span").css("width")),
                        s = f.helpers.getPX(i.css("paddingLeft")), l = f.helpers.getPX(i.css("paddingRight"));
                    i.css("width", a * f.opts.colorsStep + s + l)
                }
                return f.button.bindCommands(o, !1), o
            }

            function E(r) {
                var o = u[r];
                return {
                    _windowResize: function () {
                        var e = o.data("instance") || f;
                        !e.helpers.isMobile() && o.isVisible() && (e.events.disableBlur(), e.popups.hide(r), e.events.enableBlur())
                    }, _inputFocus: function (e) {
                        var t = o.data("instance") || f, n = d(e.currentTarget);
                        if (n.is("input:file") && n.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function () {
                            t.events.enableBlur()
                        }, 100), t.helpers.isMobile()) {
                            var r = d(t.o_win).scrollTop();
                            setTimeout(function () {
                                d(t.o_win).scrollTop(r)
                            }, 0)
                        }
                    }, _inputBlur: function (e) {
                        var t = o.data("instance") || f, n = d(e.currentTarget);
                        n.is("input:file") && n.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement !== this && d(this).isVisible() && (t.events.blurActive() && t.events.trigger("blur"), t.events.enableBlur())
                    }, _editorKeydown: function (e) {
                        var t = o.data("instance") || f;
                        t.keys.ctrlKey(e) || e.which === V.KEYCODE.ALT || e.which === V.KEYCODE.ESC || (g(r) && o.findVisible(".fr-back").length ? t.button.exec(o.findVisible(".fr-back").first()) : e.which !== V.KEYCODE.ALT && t.popups.hide(r))
                    }, _preventFocus: function (e) {
                        var t = o.data("instance") || f,
                            n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                        "mouseup" === e.type || d(n).is(":focus") || t.events.disableBlur(), "mouseup" !== e.type || d(n).hasClass("fr-command") || 0 < d(n).parents(".fr-command").length || d(n).hasClass("fr-dropdown-content") || f.button.hideActiveDropdowns(o), (f.browser.safari || f.browser.mozilla) && "mousedown" === e.type && d(n).is("input[type=file]") && t.events.disableBlur();
                        var r = "input, textarea, button, select, label, .fr-command";
                        if (n && !d(n).is(r) && 0 === d(n).parents(r).length) return e.stopPropagation(), !1;
                        n && d(n).is(r) && e.stopPropagation(), b()
                    }, _editorMouseup: function () {
                        o.isVisible() && i() && 0 < o.findVisible("input:focus, textarea:focus, button:focus, select:focus").length && f.events.disableBlur()
                    }, _windowMouseup: function (e) {
                        if (!f.core.sameInstance(o)) return !0;
                        var t = o.data("instance") || f;
                        o.isVisible() && i() && (e.stopPropagation(), t.markers.remove(), t.popups.hide(r), b())
                    }, _windowKeydown: function (e) {
                        if (!f.core.sameInstance(o)) return !0;
                        var t = o.data("instance") || f, n = e.which;
                        if (V.KEYCODE.ESC === n) {
                            if (t.popups.isVisible(r) && t.opts.toolbarInline) return e.stopPropagation(), t.popups.isVisible(r) && (o.findVisible(".fr-back").length ? (t.button.exec(o.findVisible(".fr-back").first()), t.accessibility.focusPopupButton(o)) : o.findVisible(".fr-dismiss").length ? t.button.exec(o.findVisible(".fr-dismiss").first()) : (t.popups.hide(r), t.toolbar.showInline(null, !0), t.accessibility.focusPopupButton(o))), !1;
                            if (t.popups.isVisible(r)) return o.findVisible(".fr-back").length ? (t.button.exec(o.findVisible(".fr-back").first), t.accessibility.focusPopupButton(o)) : o.findVisible(".fr-dismiss").length ? t.button.exec(o.findVisible(".fr-dismiss").first()) : (t.popups.hide(r), t.accessibility.focusPopupButton(o)), !1
                        }
                    }, _repositionPopup: function () {
                        if (!f.opts.height && !f.opts.heightMax || f.opts.toolbarInline) return !0;
                        if (f.$wp && g(r) && o.parent().get(0) === f.$sc.get(0)) {
                            var e = o.offset().top - f.$wp.offset().top, t = f.$wp.outerHeight();
                            f.node.hasClass(o.get(0), "fr-above") && (e += o.outerHeight()), t < e || e < 0 ? o.addClass("fr-hidden") : o.removeClass("fr-hidden")
                        }
                    }
                }
            }

            function c(e, t) {
                f.events.on("mouseup", e._editorMouseup, !0), f.$wp && f.events.on("keydown", e._editorKeydown), f.events.on("focus", function () {
                    u[t].removeClass("focused")
                }), f.events.on("blur", function () {
                    m() && f.markers.remove(), f.helpers.isMobile() ? u[t].hasClass("focused") ? (v(), u[t].removeClass("focused")) : u[t].addClass("focused") : u[t].find("iframe").length || v()
                }), f.$wp && !f.helpers.isMobile() && f.events.$on(f.$wp, "scroll.popup".concat(t), e._repositionPopup), f.events.on("window.mouseup", e._windowMouseup, !0), f.events.on("window.keydown", e._windowKeydown, !0), u[t].data("inst".concat(f.id), !0), f.events.on("destroy", function () {
                    f.core.sameInstance(u[t]) && (d("body").first().append(u[t]), u[t].removeClass("fr-active"))
                }, !0)
            }

            function S() {
                var e = d(this).prev().children().first();
                e.attr("checked", !e.attr("checked"))
            }

            function e() {
                for (var e in u) if (Object.prototype.hasOwnProperty.call(u, e)) {
                    var t = u[e];
                    t && (t.html("").removeData().remove(), u[e] = null)
                }
                u = []
            }

            return f.shared.exit_flag = !1, {
                _init: function r() {
                    f.events.on("shared.destroy", e, !0), f.events.on("window.mousedown", t), f.events.on("window.touchmove", b), f.events.$on(d(f.o_win), "scroll", b), f.events.on("mousedown", function (e) {
                        m() && (e.stopPropagation(), f.$el.find(".fr-marker").remove(), t(), f.events.disableBlur())
                    })
                }, create: function T(e, t) {
                    var n = l(e, t), r = E(e);
                    c(r, e), f.events.$on(n, "mousedown mouseup touchstart touchend touch", "*", r._preventFocus, !0), f.events.$on(n, "focus", "input, textarea, button, select", r._inputFocus, !0), f.events.$on(n, "blur", "input, textarea, button, select", r._inputBlur, !0);
                    var o = n.find("input, textarea");
                    return function i(e) {
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t], r = d(n);
                            0 === r.next().length && r.attr("placeholder") && (r.after('<label for="'.concat(r.attr("id"), '">').concat(r.attr("placeholder"), "</label>")), r.attr("placeholder", ""))
                        }
                    }(o), f.events.$on(o, "focus", a), f.events.$on(o, "blur change", s), f.events.$on(n, "click", ".fr-checkbox + label", S), f.accessibility.registerPopup(e), f.helpers.isIOS() && f.events.$on(n, "touchend", "label", function () {
                        d("#".concat(d(this).attr("for"))).prop("checked", function (e, t) {
                            return !t
                        })
                    }, !0), f.events.$on(d(f.o_win), "resize", r._windowResize, !0), n
                }, get: function o(e) {
                    var t = u[e];
                    return t && !t.data("inst".concat(f.id)) && c(E(e), e), t
                }, show: function y(e, t, n, r, o) {
                    if (g(e) || (m() && 0 < f.$el.find(".fr-marker").length ? (f.events.disableBlur(), f.selection.restore()) : m() || (f.events.disableBlur(), f.events.focus(), f.events.enableBlur())), v([e]), !u[e]) return !1;
                    var i = f.button.getButtons(".fr-dropdown.fr-active");
                    i.removeClass("fr-active").attr("aria-expanded", !1).parents(".fr-toolbar").css("zIndex", "").find("> .fr-dropdown-wrapper").css("height", ""), i.next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), u[e].data("instance", f), f.$tb && f.$tb.data("instance", f);
                    var a = g(e);
                    u[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                    var s = u[e].data("container");
                    if (function d(e, t) {
                        t.isVisible() || (t = f.$sc), t.contains([u[e].get(0)]) || t.append(u[e])
                    }(e, s), f.opts.toolbarInline && s && f.$tb && s.get(0) === f.$tb.get(0) && (h(e, f.$sc), n = f.$tb.offset().top - f.helpers.getPX(f.$tb.css("margin-top")), t = f.$tb.offset().left + f.$tb.outerWidth() / 2, f.node.hasClass(f.$tb.get(0), "fr-above") && n && (n += f.$tb.outerHeight()), r = 0), s = u[e].data("container"), f.opts.iframe && !r && !a) {
                        var l = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-top")),
                            c = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-left"));
                        t && (t -= f.$iframe.offset().left + c), n && (n -= f.$iframe.offset().top + l)
                    }
                    s.is(f.$tb) ? f.$tb.css("zIndex", (f.opts.zIndex || 1) + 4) : u[e].css("zIndex", (f.opts.zIndex || 1) + 4), f.opts.toolbarBottom && s && f.$tb && s.get(0) === f.$tb.get(0) && (u[e].addClass("fr-above"), n && (n -= u[e].outerHeight())), o && (t -= u[e].width() / 2), t + u[e].outerWidth() > f.$sc.offset().left + f.$sc.width() && (t -= t + u[e].outerWidth() - f.$sc.offset().left - f.$sc.width()), t < f.$sc.offset().left && "rtl" === f.opts.direction && (t = f.$sc.offset().left), u[e].removeClass("fr-active"), f.position.at(t, n, u[e], r || 0), u[e].addClass("fr-active"), a || f.accessibility.focusPopup(u[e]), f.opts.toolbarInline && f.toolbar.hide(), f.$tb && (p = f.$tb.find(".fr-btn-active-popup")), f.events.trigger("popups.show.".concat(e)), E(e)._repositionPopup(), b()
                }, hide: n, onHide: function C(e, t) {
                    f.events.on("popups.hide.".concat(e), t)
                }, hideAll: v, setContainer: h, refresh: function N(e) {
                    u[e].data("instance", f), f.events.trigger("popups.refresh.".concat(e));
                    for (var t = u[e].find(".fr-command"), n = 0; n < t.length; n++) {
                        var r = d(t[n]);
                        0 === r.parents(".fr-dropdown-menu").length && f.button.refresh(r)
                    }
                }, onRefresh: function A(e, t) {
                    f.events.on("popups.refresh.".concat(e), t)
                }, onShow: function M(e, t) {
                    f.events.on("popups.show.".concat(e), t)
                }, isVisible: g, areVisible: m
            }
        }, V.MODULES.accessibility = function (f) {
            var p = f.$, i = !0;

            function l(t) {
                t && t.length && !f.$el.find('[contenteditable="true"]').is(":focus") && (t.data("blur-event-set") || t.parents(".fr-popup").length || (f.events.$on(t, "blur", function () {
                    var e = t.parents(".fr-toolbar, .fr-popup").data("instance") || f;
                    e.events.blurActive() && !f.core.hasFocus() && e.events.trigger("blur"), setTimeout(function () {
                        e.events.enableBlur()
                    }, 100)
                }, !0), t.data("blur-event-set", !0)), (t.parents(".fr-toolbar, .fr-popup").data("instance") || f).events.disableBlur(), t.get(0).focus(), f.shared.$f_el = t)
            }

            function u(e, t) {
                var n = t ? "last" : "first", r = s(g(e))[n]();
                if (r.length) return l(r), !0
            }

            function a(e) {
                return e.is("input, textarea, select") && t(), f.events.disableBlur(), e.get(0).focus(), !0
            }

            function h(e, t) {
                var n = e.find("input, textarea, button, select").filter(function () {
                    return p(this).isVisible()
                }).not(":disabled");
                if ((n = t ? n.last() : n.first()).length) return a(n);
                if (f.shared.with_kb) {
                    var r = e.findVisible(".fr-active-item").first();
                    if (r.length) return a(r);
                    var o = e.findVisible("[tabIndex]").first();
                    if (o.length) return a(o)
                }
            }

            function t() {
                0 === f.$el.find(".fr-marker").length && f.core.hasFocus() && f.selection.save()
            }

            function c() {
                var e = f.popups.areVisible();
                if (e) {
                    var t = e.find(".fr-buttons");
                    return t.find("button:focus, .fr-group span:focus").length ? !u(e.data("instance").$tb) : !u(t)
                }
                return !u(f.$tb)
            }

            function d() {
                var e = null;
                return f.shared.$f_el.is(".fr-dropdown.fr-active") ? e = f.shared.$f_el : f.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = f.shared.$f_el.closest(".fr-dropdown-menu").prev()), e
            }

            function s(e) {
                for (var t = -1, n = 0; n < e.length; n++) p(e[n]).hasClass("fr-open") && (t = n);
                var r = e.index(f.$tb.find(".fr-more-toolbar.fr-expanded > button.fr-command").first());
                if (0 < r && -1 !== t) {
                    var o = e.slice(r, e.length), i = (e = e.slice(0, r)).slice(0, t + 1), a = e.slice(t + 1, e.length);
                    e = i;
                    for (var s = 0; s < o.length; s++) e.push(o[s]);
                    for (var l = 0; l < a.length; l++) e.push(a[l])
                }
                return e
            }

            function g(e) {
                return e.findVisible("button:not(.fr-disabled), .fr-group span.fr-command").filter(function (e) {
                    var t = p(e).parents(".fr-more-toolbar");
                    return 0 === t.length || 0 < t.length && t.hasClass("fr-expanded")
                })
            }

            function n(e, t, n) {
                if (f.shared.$f_el) {
                    var r = d();
                    r && (f.button.click(r), f.shared.$f_el = r);
                    var o = s(g(e)), i = o.index(f.shared.$f_el);
                    if (0 === i && !n || i === o.length - 1 && n) {
                        var a;
                        if (t) {
                            if (e.parent().is(".fr-popup")) a = !h(e.parent().children().not(".fr-buttons"), !n);
                            !1 === a && (f.shared.$f_el = null)
                        }
                        t && !1 === a || u(e, !n)
                    } else l(p(o.get(i + (n ? 1 : -1))));
                    return !1
                }
            }

            function m(e, t) {
                return n(e, t, !0)
            }

            function v(e, t) {
                return n(e, t)
            }

            function b(e) {
                if (f.shared.$f_el) {
                    var t;
                    if (f.shared.$f_el.is(".fr-dropdown.fr-active")) return l(t = e ? f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), !1;
                    if (f.shared.$f_el.is("a.fr-command")) return (t = e ? f.shared.$f_el.closest("li").nextAllVisible().first().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest("li").prevAllVisible().first().find(".fr-command:not(.fr-disabled)").first()).length || (t = e ? f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), l(t), !1
                }
            }

            function E() {
                if (f.shared.$f_el) {
                    if (f.shared.$f_el.hasClass("fr-dropdown")) f.button.click(f.shared.$f_el); else if (f.shared.$f_el.is("button.fr-back")) {
                        f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus());
                        var e = f.popups.areVisible(f);
                        e && (f.shared.with_kb = !1), f.button.click(f.shared.$f_el), T(e)
                    } else {
                        if (f.events.disableBlur(), f.button.click(f.shared.$f_el), f.shared.$f_el.attr("data-group-name")) {
                            var t = f.$tb.find('.fr-more-toolbar[data-name="'.concat(f.shared.$f_el.attr("data-group-name"), '"]')),
                                n = f.shared.$f_el;
                            t.hasClass("fr-expanded") && (n = t.findVisible("button:not(.fr-disabled)").first()), n && l(n)
                        } else if (f.shared.$f_el.attr("data-popup")) {
                            var r = f.popups.areVisible(f);
                            r && r.data("popup-button", f.shared.$f_el)
                        } else if (f.shared.$f_el.attr("data-modal")) {
                            var o = f.modals.areVisible(f);
                            o && o.data("modal-button", f.shared.$f_el)
                        }
                        f.shared.$f_el = null
                    }
                    return !1
                }
            }

            function S() {
                f.shared.$f_el && (f.events.disableBlur(), f.shared.$f_el.blur(), f.shared.$f_el = null), !1 !== f.events.trigger("toolbar.focusEditor") && (f.events.disableBlur(), f.$el.get(0).focus(), f.events.focus())
            }

            function o(r) {
                r && r.length && (f.events.$on(r, "keydown", function (e) {
                    if (!p(e.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                    var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                    f.shared.with_kb = !0;
                    var n = t.accessibility.exec(e, r);
                    return f.shared.with_kb = !1, n
                }, !0), f.events.$on(r, "mouseenter", "[tabIndex]", function (e) {
                    var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                    if (!i) return e.stopPropagation(), void e.preventDefault();
                    var n = p(e.currentTarget);
                    t.shared.$f_el && t.shared.$f_el.not(n) && t.accessibility.focusEditor()
                }, !0), f.$tb && f.events.$on(f.$tb, "transitionend", ".fr-more-toolbar", function () {
                    f.shared.$f_el = p(document.activeElement)
                }))
            }

            function T(e) {
                var t = e.data("popup-button");
                t && setTimeout(function () {
                    l(t), e.data("popup-button", null)
                }, 0)
            }

            function y(e) {
                var t = f.popups.areVisible(e);
                t && t.data("popup-button", null)
            }

            function e(e) {
                var t = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
                if (e.which !== V.KEYCODE.F10 || t || e.shiftKey || !e.altKey) return !0;
                f.shared.with_kb = !0;
                var n = f.popups.areVisible(f), r = !1;
                return n && (r = h(n.children().not(".fr-buttons"))), r || c(), f.shared.with_kb = !1, e.preventDefault(), e.stopPropagation(), !1
            }

            return {
                _init: function r() {
                    f.$wp ? f.events.on("keydown", e, !0) : f.events.$on(f.$win, "keydown", e, !0), f.events.on("mousedown", function (e) {
                        y(f), f.shared.$f_el && f.el.isSameNode(f.shared.$f_el[0]) && (f.accessibility.restoreSelection(), e.stopPropagation(), f.events.disableBlur(), f.shared.$f_el = null)
                    }, !0), f.events.on("blur", function () {
                        f.shared.$f_el = null, y(f)
                    }, !0)
                },
                registerPopup: function C(e) {
                    var t = f.popups.get(e), n = function r(c) {
                        var d = f.popups.get(c);
                        return {
                            _tiKeydown: function (e) {
                                var t = d.data("instance") || f;
                                if (!1 === t.events.trigger("popup.tab", [e])) return !1;
                                var n = e.which, r = d.find(":focus").first();
                                if (V.KEYCODE.TAB === n) {
                                    e.preventDefault();
                                    var o = d.children().not(".fr-buttons"),
                                        i = o.findVisible("input, textarea, button, select").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                                        a = i.indexOf(this) + (e.shiftKey ? -1 : 1);
                                    if (0 <= a && a < i.length) return t.events.disableBlur(), p(i[a]).focus(), e.stopPropagation(), !1;
                                    var s = d.find(".fr-buttons");
                                    if (s.length && u(s, Boolean(e.shiftKey))) return e.stopPropagation(), !1;
                                    if (h(o)) return e.stopPropagation(), !1
                                } else {
                                    if (V.KEYCODE.ENTER !== n || !e.target || "TEXTAREA" === e.target.tagName) return V.KEYCODE.ESC === n ? (e.preventDefault(), e.stopPropagation(), t.accessibility.restoreSelection(), t.popups.isVisible(c) && d.findVisible(".fr-back").length ? (t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(d.findVisible(".fr-back").first()), T(d)) : t.popups.isVisible(c) && d.findVisible(".fr-dismiss").length ? t.button.exec(d.findVisible(".fr-dismiss").first()) : (t.popups.hide(c), t.opts.toolbarInline && t.toolbar.showInline(null, !0), T(d)), !1) : V.KEYCODE.SPACE === n && (r.is(".fr-submit") || r.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(r), !0) : t.keys.isBrowserAction(e) ? void e.stopPropagation() : r.is("input[type=text], textarea") ? void e.stopPropagation() : V.KEYCODE.SPACE === n && (r.is(".fr-link-attr") || r.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(), !1);
                                    var l = null;
                                    0 < d.findVisible(".fr-submit").length ? l = d.findVisible(".fr-submit").first() : d.findVisible(".fr-dismiss").length && (l = d.findVisible(".fr-dismiss").first()), l && (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(l))
                                }
                            }, _tiMouseenter: function () {
                                var e = d.data("instance") || f;
                                y(e)
                            }
                        }
                    }(e);
                    o(t.find(".fr-buttons")), f.events.$on(t, "mouseenter", "tabIndex", n._tiMouseenter, !0), f.events.$on(t.children().not(".fr-buttons"), "keydown", "[tabIndex]", n._tiKeydown, !0), f.popups.onHide(e, function () {
                        (t.data("instance") || f).accessibility.restoreSelection()
                    }), f.popups.onShow(e, function () {
                        i = !1, setTimeout(function () {
                            i = !0
                        }, 0)
                    })
                },
                registerToolbar: o,
                focusToolbarElement: l,
                focusToolbar: u,
                focusContent: h,
                focusPopup: function N(r) {
                    var o = r.children().not(".fr-buttons");
                    o.data("mouseenter-event-set") || (f.events.$on(o, "mouseenter", "[tabIndex]", function (e) {
                        var t = r.data("instance") || f;
                        if (!i) return e.stopPropagation(), void e.preventDefault();
                        var n = o.find(":focus").first();
                        n.length && !n.is("input, button, textarea, select") && (t.events.disableBlur(), n.blur(), t.events.disableBlur(), t.events.focus())
                    }), o.data("mouseenter-event-set", !0)), !h(o) && f.shared.with_kb && u(r.find(".fr-buttons"))
                },
                focusModal: function A(e) {
                    f.core.hasFocus() || (f.events.disableBlur(), f.events.focus()), f.accessibility.saveSelection(), f.events.disableBlur(), f.el.blur(), f.selection.clear(), f.events.disableBlur(), f.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]").first().focus()
                },
                focusEditor: S,
                focusPopupButton: T,
                focusModalButton: function M(e) {
                    var t = e.data("modal-button");
                    t && setTimeout(function () {
                        l(t), e.data("modal-button", null)
                    }, 0)
                },
                hasFocus: function O() {
                    return null !== f.shared.$f_el
                },
                exec: function x(e, t) {
                    var n = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey, r = e.which, o = !1;
                    return r !== V.KEYCODE.TAB || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_RIGHT || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.TAB || n || !e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_LEFT || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_UP || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ARROW_DOWN || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ENTER && r !== V.KEYCODE.SPACE || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.ESC || n || e.shiftKey || e.altKey ? r !== V.KEYCODE.F10 || n || e.shiftKey || !e.altKey || (o = c()) : o = function i(e) {
                        if (f.shared.$f_el) {
                            var t = d();
                            return t ? (f.button.click(t), l(t)) : e.parent().findVisible(".fr-back").length ? (f.shared.with_kb = !1, f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus()), f.button.exec(e.parent().findVisible(".fr-back")).first(), T(e.parent())) : f.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (f.accessibility.restoreSelection(), f.shared.$f_el = null, !1 !== f.events.trigger("toolbar.esc") && (f.popups.hide(e.parent()), f.opts.toolbarInline && f.toolbar.showInline(null, !0), T(e.parent()))) : S()), !1
                        }
                    }(t) : o = E() : o = function a() {
                        return f.shared.$f_el && f.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? E() : b(!0)
                    }() : o = function s() {
                        return b()
                    }() : o = v(t) : o = v(t, !0) : o = m(t) : o = m(t, !0), f.shared.$f_el || void 0 !== o || (o = !0), !o && f.keys.isBrowserAction(e) && (o = !0), !!o || (e.preventDefault(), e.stopPropagation(), !1)
                },
                saveSelection: t,
                restoreSelection: function w() {
                    f.$el.find(".fr-marker").length && (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur())
                }
            }
        }, Object.assign(V.DEFAULTS, {tooltips: !0}), V.MODULES.tooltip = function (i) {
            var a = i.$;

            function r() {
                i.helpers.isMobile() || i.$tooltip && i.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed")
            }

            function o(e, t) {
                if (!i.helpers.isMobile() && (e.data("title") || e.data("title", e.attr("title")), e.data("title"))) {
                    i.$tooltip || function o() {
                        i.opts.tooltips && !i.helpers.isMobile() && (i.shared.$tooltip ? i.$tooltip = i.shared.$tooltip : (i.shared.$tooltip = a(i.doc.createElement("DIV")).addClass("fr-tooltip"), i.$tooltip = i.shared.$tooltip, i.opts.theme && i.$tooltip.addClass("".concat(i.opts.theme, "-theme")), a(i.o_doc).find("body").first().append(i.$tooltip)), i.events.on("shared.destroy", function () {
                            i.$tooltip.html("").removeData().remove(), i.$tooltip = null
                        }, !0))
                    }(), e.removeAttr("title"), i.$tooltip.text(i.language.translate(e.data("title"))), i.$tooltip.addClass("fr-visible");
                    var n = e.offset().left + (e.outerWidth() - i.$tooltip.outerWidth()) / 2;
                    n < 0 && (n = 0), n + i.$tooltip.outerWidth() > a(i.o_win).width() && (n = a(i.o_win).width() - i.$tooltip.outerWidth()), void 0 === t && (t = i.opts.toolbarBottom), e.offset().top - a(window).scrollTop() + e.outerHeight() + 10 >= a(window).height() && (t = !0);
                    var r = t ? e.offset().top - i.$tooltip.height() : e.offset().top + e.outerHeight();
                    i.$tooltip.css("position", ""), i.$tooltip.css("left", n), i.$tooltip.css("top", Math.ceil(r)), "static" !== a(i.o_doc).find("body").first().css("position") ? (i.$tooltip.css("margin-left", -a(i.o_doc).find("body").first().offset().left), i.$tooltip.css("margin-top", -a(i.o_doc).find("body").first().offset().top)) : (i.$tooltip.css("margin-left", ""), i.$tooltip.css("margin-top", ""))
                }
            }

            return {
                hide: r, to: o, bind: function s(e, t, n) {
                    i.opts.tooltips && !i.helpers.isMobile() && (i.events.$on(e, "mouseover", t, function (e) {
                        i.node.hasClass(e.currentTarget, "fr-disabled") || i.edit.isDisabled() || o(a(e.currentTarget), n)
                    }, !0), i.events.$on(e, "mouseout ".concat(i._mousedown, " ").concat(i._mouseup), t, function () {
                        r()
                    }, !0))
                }
            }
        }, V.TOOLBAR_VISIBLE_BUTTONS = 3, V.MODULES.button = function (g) {
            var h = g.$, a = [];
            (g.opts.toolbarInline || g.opts.toolbarContainer) && (g.shared.buttons || (g.shared.buttons = []), a = g.shared.buttons);
            var s = [];

            function l(e, t, n) {
                for (var r = h(), o = 0; o < e.length; o++) {
                    var i = h(e[o]);
                    if (i.is(t) && (r = r.add(i)), n && i.is(".fr-dropdown")) {
                        var a = i.next().find(t);
                        r = r.add(a)
                    }
                }
                return r
            }

            function m(e, t) {
                var n, r = h();
                if (!e) return r;
                for (n in r = (r = r.add(l(a, e, t))).add(l(s, e, t)), g.shared.popups) if (Object.prototype.hasOwnProperty.call(g.shared.popups, n)) {
                    var o = g.shared.popups[n].children().find(e);
                    r = r.add(o)
                }
                for (n in g.shared.modals) if (Object.prototype.hasOwnProperty.call(g.shared.modals, n)) {
                    var i = g.shared.modals[n].$modal.find(e);
                    r = r.add(i)
                }
                return r
            }

            function o(e) {
                var t = e.next(), n = g.node.hasClass(e.get(0), "fr-active"), r = m(".fr-dropdown.fr-active").not(e),
                    o = e.parents(".fr-toolbar, .fr-popup").data("instance") || g;
                o.helpers.isIOS() && !o.el.querySelector(".fr-marker") && (o.selection.save(), o.selection.clear(), o.selection.restore()), t.parents(".fr-more-toolbar").addClass("fr-overflow-visible");
                var i = 0, a = 0, s = t.find("> .fr-dropdown-wrapper");
                if (!n) {
                    var l = e.data("cmd");
                    t.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), V.COMMANDS[l] && V.COMMANDS[l].refreshOnShow && V.COMMANDS[l].refreshOnShow.apply(o, [e, t]), t.css("left", e.offset().left - e.parents(".fr-btn-wrap, .fr-toolbar, .fr-buttons").offset().left - ("rtl" === g.opts.direction ? t.width() - e.outerWidth() : 0)), t.addClass("test-height"), i = t.outerHeight(), a = g.helpers.getPX(s.css("max-height")), t.removeClass("test-height"), t.css("top", "").css("bottom", "");
                    var c = e.outerHeight() / 10;
                    if (!g.opts.toolbarBottom && t.offset().top + e.outerHeight() + i < h(g.o_doc).height()) t.css("top", e.position().top + e.outerHeight() - c); else {
                        var d = 0, f = e.parents(".fr-more-toolbar");
                        0 < f.length && (d = f.first().height()), t.css("bottom", e.parents(".fr-popup, .fr-toolbar").first().height() - d - e.position().top)
                    }
                }
                (e.addClass("fr-blink").toggleClass("fr-active"), e.hasClass("fr-options")) && e.prev().toggleClass("fr-expanded");
                e.hasClass("fr-active") ? (t.attr("aria-hidden", !1), e.attr("aria-expanded", !0), function u(e, t, n) {
                    n <= t && e.parent().css("overflow", "auto"), e.css("height", Math.min(t, n))
                }(s, i, a)) : (t.attr("aria-hidden", !0).css("overflow", ""), e.attr("aria-expanded", !1), s.css("height", "")), setTimeout(function () {
                    e.removeClass("fr-blink")
                }, 300), t.css("margin-left", ""), t.offset().left + t.outerWidth() > g.$sc.offset().left + g.$sc.width() && t.css("margin-left", -(t.offset().left + t.outerWidth() - g.$sc.offset().left - g.$sc.width())), t.offset().left < g.$sc.offset().left && "rtl" === g.opts.direction && t.css("margin-left", g.$sc.offset().left), r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e.parents(".fr-popup").length || g.opts.toolbarInline || (g.node.hasClass(e.get(0), "fr-active") ? g.$tb.css("zIndex", (g.opts.zIndex || 1) + 4) : g.$tb.css("zIndex", ""));
                var p = t.find("a.fr-command.fr-active").first();
                g.helpers.isMobile() || (p.length ? (g.accessibility.focusToolbarElement(p), s.scrollTop(Math.abs(p.parents(".fr-dropdown-content").offset().top - p.offset().top) - p.offset().top)) : (g.accessibility.focusToolbarElement(e), s.scrollTop(0)))
            }

            function i(e) {
                e.addClass("fr-blink"), setTimeout(function () {
                    e.removeClass("fr-blink")
                }, 500);
                for (var t = e.data("cmd"), n = []; void 0 !== e.data("param".concat(n.length + 1));) n.push(e.data("param".concat(n.length + 1)));
                var r = m(".fr-dropdown.fr-active");
                r.length && (r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n)
            }

            function t(e) {
                var t = e.parents(".fr-popup, .fr-toolbar").data("instance");
                if (0 === e.parents(".fr-popup").length && e.data("popup") && !e.hasClass("fr-btn-active-popup") && e.addClass("fr-btn-active-popup"), 0 !== e.parents(".fr-popup").length || e.data("popup") || t.popups.hideAll(), t.popups.areVisible() && !t.popups.areVisible(t)) {
                    for (var n = 0; n < V.INSTANCES.length; n++) V.INSTANCES[n] !== t && V.INSTANCES[n].popups && V.INSTANCES[n].popups.areVisible() && V.INSTANCES[n].$el.find(".fr-marker").remove();
                    t.popups.hideAll()
                }
                g.node.hasClass(e.get(0), "fr-dropdown") ? o(e) : (!function r(e) {
                    i(e)
                }(e), V.COMMANDS[e.data("cmd")] && !1 !== V.COMMANDS[e.data("cmd")].refreshAfterCallback && t.button.bulkRefresh())
            }

            function c(e) {
                t(h(e.currentTarget))
            }

            function d(e) {
                var t = e.find(".fr-dropdown.fr-active");
                t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), t.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t.prev().removeClass("fr-expanded"))
            }

            function f(e) {
                e.preventDefault(), e.stopPropagation()
            }

            function p(e) {
                if (e.stopPropagation(), !g.helpers.isMobile()) return !1
            }

            function v(e) {
                var t = 1 < arguments.length && arguments[1] !== undefined ? arguments[1] : {},
                    n = 2 < arguments.length ? arguments[2] : undefined;
                if (g.helpers.isMobile() && !1 === t.showOnMobile) return "";
                var r = t.displaySelection;
                "function" == typeof r && (r = r(g));
                var o = "";
                if ("options" !== t.type) if (r) {
                    var i = "function" == typeof t.defaultSelection ? t.defaultSelection(g) : t.defaultSelection;
                    o = '<span style="width:'.concat(t.displaySelectionWidth || 100, 'px">').concat(g.language.translate(i || t.title), "</span>")
                } else o = g.icon.create(t.icon || e), o += '<span class="fr-sr-only">'.concat(g.language.translate(t.title) || "", "</span>");
                var a = t.popup ? ' data-popup="true"' : "", s = t.modal ? ' data-modal="true"' : "",
                    l = g.shortcuts.get("".concat(e, "."));
                l = l ? " (".concat(l, ")") : "";
                var c = "".concat(e, "-").concat(g.id), d = "dropdown-menu-".concat(c),
                    f = '<button id="'.concat(c, '"').concat(t.more_btn ? ' data-group-name="'.concat(c, '" ') : "", 'type="button" tabIndex="-1" role="button"').concat(t.toggle ? ' aria-pressed="false"' : "").concat("dropdown" === t.type || "options" === t.type ? ' aria-controls="'.concat(d, '" aria-expanded="false" aria-haspopup="true"') : "").concat(t.disabled ? ' aria-disabled="true"' : "", ' title="').concat(g.language.translate(t.title) || "").concat(l, '" class="fr-command fr-btn').concat("dropdown" === t.type || "options" == t.type ? " fr-dropdown" : "").concat("options" == t.type ? " fr-options" : "").concat("more" == t.type ? " fr-more" : "").concat(t.displaySelection ? " fr-selection" : "").concat(t.back ? " fr-back" : "").concat(t.disabled ? " fr-disabled" : "").concat(n ? "" : " fr-hidden", '" data-cmd="').concat(e, '"').concat(a).concat(s, ">").concat(o, "</button>");
                if ("dropdown" === t.type || "options" === t.type) {
                    var p = '<div id="'.concat(d, '" class="fr-dropdown-menu" role="listbox" aria-labelledby="').concat(c, '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">');
                    p += function u(e, t) {
                        var n = "";
                        if (t.html) "function" == typeof t.html ? n += t.html.call(g) : n += t.html; else {
                            var r = t.options;
                            for (var o in "function" == typeof r && (r = r()), n += '<ul class="fr-dropdown-list" role="presentation">', r) if (Object.prototype.hasOwnProperty.call(r, o)) {
                                var i = g.shortcuts.get("".concat(e, ".").concat(o));
                                i = i ? '<span class="fr-shortcut">'.concat(i, "</span>") : "", n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'.concat("options" === t.type ? e.replace(/Options/g, "") : e, '" data-param1="').concat(o, '" title="').concat(r[o], '">').concat(g.language.translate(r[o]), "</a></li>")
                            }
                            n += "</ul>"
                        }
                        return n
                    }(e, t), f += p += "</div></div></div>"
                }
                return t.hasOptions && t.hasOptions.apply(g) && (f = '<div class="fr-btn-wrap">'.concat(f, " ").concat(v(e + "Options", Object.assign({}, t, {
                    type: "options",
                    hasOptions: !1
                }), n), "  </div>")), f
            }

            function e(o) {
                var i = g.$tb && g.$tb.data("instance") || g;
                if (!1 === g.events.trigger("buttons.refresh")) return !0;
                setTimeout(function () {
                    for (var e = i.selection.inEditor() && i.core.hasFocus(), t = 0; t < o.length; t++) {
                        var n = h(o[t]), r = n.data("cmd");
                        0 === n.parents(".fr-popup").length ? e || V.COMMANDS[r] && V.COMMANDS[r].forcedRefresh ? i.button.refresh(n) : g.node.hasClass(n.get(0), "fr-dropdown") || (n.removeClass("fr-active"), n.attr("aria-pressed") && n.attr("aria-pressed", !1)) : n.parents(".fr-popup").isVisible() && i.button.refresh(n)
                    }
                }, 0)
            }

            function n() {
                e(a), e(s)
            }

            function r() {
                a = [], s = []
            }

            g.shared.popup_buttons || (g.shared.popup_buttons = []), s = g.shared.popup_buttons;
            var u = null;

            function b() {
                clearTimeout(u), u = setTimeout(n, 50)
            }

            return {
                _init: function E() {
                    g.opts.toolbarInline ? g.events.on("toolbar.show", n) : (g.events.on("mouseup", b), g.events.on("keyup", b), g.events.on("blur", b), g.events.on("focus", b), g.events.on("contentChanged", b), g.helpers.isMobile() && g.events.$on(g.$doc, "selectionchange", n)), g.events.on("shared.destroy", r)
                }, build: v, buildList: function S(e, t) {
                    for (var n = "", r = 0; r < e.length; r++) {
                        var o = e[r], i = V.COMMANDS[o];
                        i && "undefined" != typeof i.plugin && g.opts.pluginsEnabled.indexOf(i.plugin) < 0 || (i ? n += v(o, i, void 0 === t || 0 <= t.indexOf(o)) : "|" === o ? n += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" === o && (n += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'))
                    }
                    return n
                }, buildGroup: function T(e) {
                    var t = "", n = "";
                    for (var r in e) {
                        var o = e[r];
                        if (o.buttons) {
                            for (var i = "", a = "", s = 0, l = "left", c = V.TOOLBAR_VISIBLE_BUTTONS, d = 0; d < o.buttons.length; d++) {
                                var f = o.buttons[d], p = V.COMMANDS[f];
                                p || ("|" == f ? i += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == f && (i += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')), !p || p && "undefined" != typeof p.plugin && g.opts.pluginsEnabled.indexOf(p.plugin) < 0 || (e[r].align !== undefined && (l = e[r].align), e[r].buttonsVisible !== undefined && (c = e[r].buttonsVisible), e.showMoreButtons && c <= s ? a += v(f, p, !0) : i += v(f, p, !0), s++)
                            }
                            if (e.showMoreButtons && c < s) {
                                var u = r, h = V.COMMANDS[u];
                                h.more_btn = !0, i += v(u, h, !0)
                            }
                            t += '<div class="fr-btn-grp fr-float-'.concat(l, '">').concat(i, "</div>"), e.showMoreButtons && 0 < a.length && (n += '<div class="fr-more-toolbar" data-name="'.concat(r + "-" + g.id, '">').concat(a, "</div>"))
                        }
                    }
                    return g.opts.toolbarBottom ? "".concat(n, '<div class="fr-newline"></div>').concat(t) : "".concat(t, '<div class="fr-newline"></div>').concat(n)
                }, bindCommands: function y(t, e) {
                    g.events.bindClick(t, ".fr-command:not(.fr-disabled)", c), g.events.$on(t, "".concat(g._mousedown, " ").concat(g._mouseup, " ").concat(g._move), ".fr-dropdown-menu", f, !0), g.events.$on(t, "".concat(g._mousedown, " ").concat(g._mouseup, " ").concat(g._move), ".fr-dropdown-menu .fr-dropdown-wrapper", p, !0);
                    var n = t.get(0).ownerDocument, r = "defaultView" in n ? n.defaultView : n.parentWindow;

                    function o(e) {
                        (!e || e.type === g._mouseup && e.target !== h("html").get(0) || "keydown" === e.type && (g.keys.isCharacter(e.which) && !g.keys.ctrlKey(e) || e.which === V.KEYCODE.ESC)) && d(t)
                    }

                    g.events.$on(h(r), "".concat(g._mouseup, " resize keydown"), o, !0), g.opts.iframe && g.events.$on(g.$win, g._mouseup, o, !0), g.node.hasClass(t.get(0), "fr-popup") ? h.merge(s, t.find(".fr-btn").toArray()) : h.merge(a, t.find(".fr-btn").toArray()), g.tooltip.bind(t, ".fr-btn, .fr-title", e)
                }, refresh: function C(e) {
                    var t, n = e.parents(".fr-popup, .fr-toolbar").data("instance") || g, r = e.data("cmd");
                    g.node.hasClass(e.get(0), "fr-dropdown") ? t = e.next() : (e.removeClass("fr-active"), e.attr("aria-pressed") && e.attr("aria-pressed", !1)), V.COMMANDS[r] && V.COMMANDS[r].refresh ? V.COMMANDS[r].refresh.apply(n, [e, t]) : g.refresh[r] && n.refresh[r](e, t)
                }, bulkRefresh: n, exec: i, click: t, hideActiveDropdowns: d, addButtons: function N(e) {
                    for (var t = 0; t < e.length; t++) a.push(e)
                }, getButtons: m, getPosition: function A(e) {
                    var t = e.offset().left, n = g.opts.toolbarBottom ? 10 : e.outerHeight() - 10;
                    return {left: t, top: e.offset().top + n}
                }
            }
        }, V.ICON_TEMPLATES = {
            font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
            font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
            font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
            font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
            font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>',
            text: '<span style="text-align: center;">[NAME]</span>',
            image: "<img src=[SRC] alt=[ALT] />",
            svg: '<svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="[PATH]"/></svg>',
            empty: " "
        }, V.ICONS = {
            bold: {NAME: "bold", SVG_KEY: "bold"},
            italic: {NAME: "italic", SVG_KEY: "italic"},
            underline: {NAME: "underline", SVG_KEY: "underline"},
            strikeThrough: {NAME: "strikethrough", SVG_KEY: "strikeThrough"},
            subscript: {NAME: "subscript", SVG_KEY: "subscript"},
            superscript: {NAME: "superscript", SVG_KEY: "superscript"},
            color: {NAME: "tint", SVG_KEY: "textColor"},
            outdent: {NAME: "outdent", SVG_KEY: "outdent"},
            indent: {NAME: "indent", SVG_KEY: "indent"},
            undo: {NAME: "rotate-left", FA5NAME: "undo", SVG_KEY: "undo"},
            redo: {NAME: "rotate-right", FA5NAME: "redo", SVG_KEY: "redo"},
            insertHR: {NAME: "minus", SVG_KEY: "horizontalLine"},
            clearFormatting: {NAME: "eraser", SVG_KEY: "clearFormatting"},
            selectAll: {NAME: "mouse-pointer", SVG_KEY: "selectAll"},
            moreText: {NAME: "ellipsis-v", SVG_KEY: "textMore"},
            moreParagraph: {NAME: "ellipsis-v", SVG_KEY: "paragraphMore"},
            moreRich: {NAME: "ellipsis-v", SVG_KEY: "insertMore"},
            moreMisc: {NAME: "ellipsis-v", SVG_KEY: "more"}
        }, V.DefineIconTemplate = function (e, t) {
            V.ICON_TEMPLATES[e] = t
        }, V.DefineIcon = function (e, t) {
            V.ICONS[e] = t
        }, Object.assign(V.DEFAULTS, {iconsTemplate: "svg"}), V.MODULES.icon = function (o) {
            return {
                create: function i(n) {
                    var e = null, r = V.ICONS[n];
                    if (void 0 !== r) {
                        var t = r.template || V.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate;
                        t && t.apply && (t = t.apply(o)), r.FA5NAME || (r.FA5NAME = r.NAME), "svg" !== t || r.PATH || (r.PATH = V.SVG[r.SVG_KEY] || ""), t && (t = V.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function (e, t) {
                            return "NAME" === t ? r[t] || n : r[t]
                        }))
                    }
                    return e || n
                }, getTemplate: function r(e) {
                    var t = V.ICONS[e], n = o.opts.iconsTemplate;
                    return void 0 !== t ? n = t.template || V.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate : n
                }
            }
        }, V.SVG = {
            add: "M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z",
            advancedImageEditor: "M3,17v2h6v-2H3z M3,5v2h10V5H3z M13,21v-2h8v-2h-8v-2h-2v6H13z M7,9v2H3v2h4v2h2V9H7z M21,13v-2H11v2H21z M15,9h2V7h4V5h-4  V3h-2V9z",
            alignCenter: "M9,18h6v-2H9V18z M6,11v2h12v-2H6z M3,6v2h18V6H3z",
            alignJustify: "M3,18h18v-2H3V18z M3,11v2h18v-2H3z M3,6v2h18V6H3z",
            alignLeft: "M3,18h6v-2H3V18z M3,11v2h12v-2H3z M3,6v2h18V6H3z",
            alignRight: "M15,18h6v-2h-6V18z M9,11v2h12v-2H9z M3,6v2h18V6H3z",
            anchors: "M16,4h-4H8C6.9,4,6,4.9,6,6v4v10l6-2.6l6,2.6V10V6C18,4.9,17.1,4,16,4z M16,17l-4-1.8L8,17v-7V6h4h4v4V17z",
            back: "M20 11L7.83 11 11.425 7.405 10.01 5.991 5.416 10.586 5.414 10.584 4 11.998 4.002 12 4 12.002 5.414 13.416 5.416 13.414 10.01 18.009 11.425 16.595 7.83 13 20 13 20 13 20 11 20 11Z",
            backgroundColor: "M9.91752,12.24082l7.74791-5.39017,1.17942,1.29591-6.094,7.20747L9.91752,12.24082M7.58741,12.652l4.53533,4.98327a.93412.93412,0,0,0,1.39531-.0909L20.96943,8.7314A.90827.90827,0,0,0,20.99075,7.533l-2.513-2.76116a.90827.90827,0,0,0-1.19509-.09132L7.809,11.27135A.93412.93412,0,0,0,7.58741,12.652ZM2.7939,18.52772,8.41126,19.5l1.47913-1.34617-3.02889-3.328Z",
            blockquote: "M10.31788,5l.93817,1.3226A12.88271,12.88271,0,0,0,8.1653,9.40125a5.54242,5.54242,0,0,0-.998,3.07866v.33733q.36089-.04773.66067-.084a4.75723,4.75723,0,0,1,.56519-.03691,2.87044,2.87044,0,0,1,2.11693.8427,2.8416,2.8416,0,0,1,.8427,2.09274,3.37183,3.37183,0,0,1-.8898,2.453A3.143,3.143,0,0,1,8.10547,19,3.40532,3.40532,0,0,1,5.375,17.7245,4.91156,4.91156,0,0,1,4.30442,14.453,9.3672,9.3672,0,0,1,5.82051,9.32933,14.75716,14.75716,0,0,1,10.31788,5Zm8.39243,0,.9369,1.3226a12.88289,12.88289,0,0,0-3.09075,3.07865,5.54241,5.54241,0,0,0-.998,3.07866v.33733q.33606-.04773.63775-.084a4.91773,4.91773,0,0,1,.58938-.03691,2.8043,2.8043,0,0,1,2.1042.83,2.89952,2.89952,0,0,1,.80578,2.10547,3.42336,3.42336,0,0,1-.86561,2.453A3.06291,3.06291,0,0,1,16.49664,19,3.47924,3.47924,0,0,1,13.742,17.7245,4.846,4.846,0,0,1,12.64721,14.453,9.25867,9.25867,0,0,1,14.17476,9.3898,15.26076,15.26076,0,0,1,18.71031,5Z",
            bold: "M15.25,11.8h0A3.68,3.68,0,0,0,17,9a3.93,3.93,0,0,0-3.86-4H6.65V19h7a3.74,3.74,0,0,0,3.7-3.78V15.1A3.64,3.64,0,0,0,15.25,11.8ZM8.65,7h4.2a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61,2.23,2.23,0,0,1-.63.09H8.65Zm4.6,10H8.65V13h4.6a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61A2.23,2.23,0,0,1,13.25,17Z",
            cellBackground: "M16.6,12.4L7.6,3.5L6.2,4.9l2.4,2.4l-5.2,5.2c-0.6,0.6-0.6,1.5,0,2.1l5.5,5.5c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4  l5.5-5.5C17.2,14,17.2,13,16.6,12.4z M5.2,13.5L10,8.7l4.8,4.8H5.2z M19,15c0,0-2,2.2-2,3.5c0,1.1,0.9,2,2,2s2-0.9,2-2  C21,17.2,19,15,19,15z",
            cellBorderColor: "M22,22H2v2h20V22z",
            cellOptions: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M9.5,6.5h5V9h-5V6.5z M8,17.5H4  c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z   M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4  c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0V9z",
            cellStyle: "M20,19.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L12.3,17h3.8l1.7-3.5l1.4,3.5H23L20,19.9z M20,5H4C2.9,5,2,5.9,2,7v10  c0,1.1,0.9,2,2,2h7.5l-0.6-0.6L10,17.5H9.5V15h5.4l1.1-2.3v-2.2h4.5v3H20l0.6,1.5H22V7C22,5.9,21.1,5,20,5z M3.5,7  c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0.1,0h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M4,17.5c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0-0.1v-2H8v2.5H4  z M14.5,9h-5V6.5h5V9z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0.1V9z",
            clearFormatting: "M11.48,10.09l-1.2-1.21L8.8,7.41,6.43,5,5.37,6.1,8.25,9,4.66,19h2l1.43-4h5.14l1.43,4h2l-.89-2.51L18.27,19l1.07-1.06L14.59,13.2ZM8.8,13l.92-2.56L12.27,13Zm.56-7.15L9.66,5h2l1.75,4.9Z",
            close: "M13.4,12l5.6,5.6L17.6,19L12,13.4L6.4,19L5,17.6l5.6-5.6L5,6.4L6.4,5l5.6,5.6L17.6,5L19,6.4L13.4,12z",
            codeView: "M9.4,16.6,4.8,12,9.4,7.4,8,6,2,12l6,6Zm5.2,0L19.2,12,14.6,7.4,16,6l6,6-6,6Z",
            cogs: "M18.877 12.907a6.459 6.459 0 0 0 0 -1.814l1.952 -1.526a0.468 0.468 0 0 0 0.111 -0.593l-1.851 -3.2a0.461 0.461 0 0 0 -0.407 -0.231 0.421 0.421 0 0 0 -0.157 0.028l-2.3 0.925a6.755 6.755 0 0 0 -1.563 -0.907l-0.352 -2.452a0.451 0.451 0 0 0 -0.453 -0.388h-3.7a0.451 0.451 0 0 0 -0.454 0.388L9.347 5.588A7.077 7.077 0 0 0 7.783 6.5l-2.3 -0.925a0.508 0.508 0 0 0 -0.166 -0.028 0.457 0.457 0 0 0 -0.4 0.231l-1.851 3.2a0.457 0.457 0 0 0 0.111 0.593l1.952 1.526A7.348 7.348 0 0 0 5.063 12a7.348 7.348 0 0 0 0.064 0.907L3.175 14.433a0.468 0.468 0 0 0 -0.111 0.593l1.851 3.2a0.461 0.461 0 0 0 0.407 0.231 0.421 0.421 0 0 0 0.157 -0.028l2.3 -0.925a6.74 6.74 0 0 0 1.564 0.907L9.7 20.864a0.451 0.451 0 0 0 0.454 0.388h3.7a0.451 0.451 0 0 0 0.453 -0.388l0.352 -2.452a7.093 7.093 0 0 0 1.563 -0.907l2.3 0.925a0.513 0.513 0 0 0 0.167 0.028 0.457 0.457 0 0 0 0.4 -0.231l1.851 -3.2a0.468 0.468 0 0 0 -0.111 -0.593Zm-0.09 2.029l-0.854 1.476 -2.117 -0.852 -0.673 0.508a5.426 5.426 0 0 1 -1.164 0.679l-0.795 0.323 -0.33 2.269h-1.7l-0.32 -2.269 -0.793 -0.322a5.3 5.3 0 0 1 -1.147 -0.662L8.2 15.56l-2.133 0.86 -0.854 -1.475 1.806 -1.411 -0.1 -0.847c-0.028 -0.292 -0.046 -0.5 -0.046 -0.687s0.018 -0.4 0.045 -0.672l0.106 -0.854L5.217 9.064l0.854 -1.475 2.117 0.851 0.673 -0.508a5.426 5.426 0 0 1 1.164 -0.679l0.8 -0.323 0.331 -2.269h1.7l0.321 2.269 0.792 0.322a5.3 5.3 0 0 1 1.148 0.661l0.684 0.526 2.133 -0.859 0.853 1.473 -1.8 1.421 0.1 0.847a5 5 0 0 1 0.046 0.679c0 0.193 -0.018 0.4 -0.045 0.672l-0.106 0.853ZM12 14.544A2.544 2.544 0 1 1 14.546 12 2.552 2.552 0 0 1 12 14.544Z",
            columns: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z M20.5,17  c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0  V9z",
            edit: "M17,11.2L12.8,7L5,14.8V19h4.2L17,11.2z M7,16.8v-1.5l5.6-5.6l1.4,1.5l-5.6,5.6H7z M13.5,6.3l0.7-0.7c0.8-0.8,2.1-0.8,2.8,0  c0,0,0,0,0,0L18.4,7c0.8,0.8,0.8,2,0,2.8l-0.7,0.7L13.5,6.3z",
            exitFullscreen: "M5,16H8v3h2V14H5ZM8,8H5v2h5V5H8Zm6,11h2V16h3V14H14ZM16,8V5H14v5h5V8Z",
            fontAwesome: "M18.99018,13.98212V7.52679c-.08038-1.21875-1.33929-.683-1.33929-.683-2.933,1.39282-4.36274.61938-5.85938.15625a6.23272,6.23272,0,0,0-2.79376-.20062l-.00946.004A1.98777,1.98777,0,0,0,7.62189,5.106a.984.984,0,0,0-.17517-.05432c-.02447-.0055-.04882-.01032-.0736-.0149A.9565.9565,0,0,0,7.1908,5H6.82539a.9565.9565,0,0,0-.18232.0368c-.02472.00458-.04907.0094-.07348.01484a.985.985,0,0,0-.17523.05438,1.98585,1.98585,0,0,0-.573,3.49585v9.394A1.004,1.004,0,0,0,6.82539,19H7.1908a1.00406,1.00406,0,0,0,1.00409-1.00409V15.52234c3.64221-1.09827,5.19709.64282,7.09888.57587a5.57291,5.57291,0,0,0,3.25446-1.05805A1.2458,1.2458,0,0,0,18.99018,13.98212Z",
            fontFamily: "M16,19h2L13,5H11L6,19H8l1.43-4h5.14Zm-5.86-6L12,7.8,13.86,13Z",
            fontSize: "M20.75,19h1.5l-3-10h-1.5l-3,10h1.5L17,16.5h3Zm-3.3-4,1.05-3.5L19.55,15Zm-5.7,4h2l-5-14h-2l-5,14h2l1.43-4h5.14ZM5.89,13,7.75,7.8,9.61,13Z",
            fullscreen: "M7,14H5v5h5V17H7ZM5,10H7V7h3V5H5Zm12,7H14v2h5V14H17ZM14,5V7h3v3h2V5Z",
            help: "M11,17h2v2h-2V17z M12,5C9.8,5,8,6.8,8,9h2c0-1.1,0.9-2,2-2s2,0.9,2,2c0,2-3,1.7-3,5v1h2v-1c0-2.2,3-2.5,3-5  C16,6.8,14.2,5,12,5z",
            horizontalLine: "M5,12h14 M19,11H5v2h14V11z",
            imageAltText: "M19,7h-6v12h-2V7H5V5h6h2h6V7z",
            imageCaption: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z M22,22H2v2h20V22z",
            imageClass: "M9.5,13.4l-2.9-2.9h3.8L12.2,7l1.4,3.5h3.8l-3,2.9l0.9,3.6L12,15.1L8.8,17L9.5,13.4z M22,6v12c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,6H4v12h16V8.8V6z",
            imageDisplay: "M3,5h18v2H3V5z M13,9h8v2h-8V9z M13,13h8v2h-8V13z M3,17h18v2H3V17z M3,9h8v6H3V9z",
            imageManager: "M20,6h-7l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V6h6.2l2,2H20V18z   M18,16l-3.8-5H14l-2.9,3.8L9,12.1L6,16H18z M10,9.5C10,8.7,9.3,8,8.5,8S7,8.7,7,9.5S7.7,11,8.5,11S10,10.3,10,9.5z",
            imageSize: "M16.9,4c-0.3,0-0.5,0.2-0.8,0.3L3.3,13c-0.9,0.6-1.1,1.9-0.5,2.8l2.2,3.3c0.4,0.7,1.2,1,2,0.8c0.3,0,0.5-0.2,0.8-0.3  L20.7,11c0.9-0.6,1.1-1.9,0.5-2.8l-2.2-3.3C18.5,4.2,17.7,3.9,16.9,4L16.9,4z M16.9,9.9L18.1,9l-2-2.9L17,5.6c0.1,0,0.1-0.1,0.2-0.1  c0.2,0,0.4,0,0.5,0.2L19.9,9c0.2,0.2,0.1,0.5-0.1,0.7L7,18.4c-0.1,0-0.1,0.1-0.2,0.1c-0.2,0-0.4,0-0.5-0.2L4.1,15  c-0.2-0.2-0.1-0.5,0.1-0.7L5,13.7l2,2.9l1.2-0.8l-2-2.9L7.5,12l1.1,1.7l1.2-0.8l-1.1-1.7l1.2-0.8l2,2.9l1.2-0.8l-2-2.9l1.2-0.8  l1.1,1.7l1.2-0.8l-1.1-1.7L14.9,7L16.9,9.9z",
            indent: "M3,9v6l3-3L3,9z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z",
            inlineClass: "M9.9,13.313A1.2,1.2,0,0,1,9.968,13H6.277l1.86-5.2,1.841,5.148A1.291,1.291,0,0,1,11.212,12h.426l-2.5-7h-2l-5,14h2l1.43-4H9.9Zm2.651,6.727a2.884,2.884,0,0,1-.655-2.018v-2.71A1.309,1.309,0,0,1,13.208,14h3.113a3.039,3.039,0,0,1,2,1.092s1.728,1.818,2.964,2.928a1.383,1.383,0,0,1,.318,1.931,1.44,1.44,0,0,1-.19.215l-3.347,3.31a1.309,1.309,0,0,1-1.832.258h0a1.282,1.282,0,0,1-.258-.257l-1.71-1.728Zm2.48-3.96a.773.773,0,1,0,.008,0Z",
            inlineStyle: "M11.88,15h.7l.7-1.7-3-8.3h-2l-5,14h2l1.4-4Zm-4.4-2,1.9-5.2,1.9,5.2ZM15.4,21.545l3.246,1.949-.909-3.637L20.72,17H16.954l-1.429-3.506L13.837,17H10.071l2.857,2.857-.779,3.637Z",
            insertEmbed: "M20.73889,15.45929a3.4768,3.4768,0,0,0-5.45965-.28662L9.5661,12.50861a3.49811,3.49811,0,0,0-.00873-1.01331l5.72174-2.66809a3.55783,3.55783,0,1,0-.84527-1.81262L8.70966,9.6839a3.50851,3.50851,0,1,0,.0111,4.63727l5.7132,2.66412a3.49763,3.49763,0,1,0,6.30493-1.526ZM18.00745,5.01056A1.49993,1.49993,0,1,1,16.39551,6.3894,1.49994,1.49994,0,0,1,18.00745,5.01056ZM5.99237,13.49536a1.49989,1.49989,0,1,1,1.61194-1.37878A1.49982,1.49982,0,0,1,5.99237,13.49536Zm11.78211,5.494a1.49993,1.49993,0,1,1,1.61193-1.37885A1.49987,1.49987,0,0,1,17.77448,18.98932Z",
            insertFile: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z",
            insertImage: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z",
            insertLink: "M11,17H7A5,5,0,0,1,7,7h4V9H7a3,3,0,0,0,0,6h4ZM17,7H13V9h4a3,3,0,0,1,0,6H13v2h4A5,5,0,0,0,17,7Zm-1,4H8v2h8Z",
            insertMore: "M16.5,13h-6v6h-2V13h-6V11h6V5h2v6h6Zm5,4.5A1.5,1.5,0,1,1,20,16,1.5,1.5,0,0,1,21.5,17.5Zm0-4A1.5,1.5,0,1,1,20,12,1.5,1.5,0,0,1,21.5,13.5Zm0-4A1.5,1.5,0,1,1,20,8,1.5,1.5,0,0,1,21.5,9.5Z",
            insertTable: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M9.5,13.5v-3  h5v3H9.5z M14.5,15v2.5h-5V15H14.5z M9.5,9V6.5h5V9H9.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M3.5,17  v-2H8v2.5H4C3.7,17.5,3.5,17.3,3.5,17z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M16,9V6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16z",
            insertVideo: "M15,8v8H5V8H15m2,2.5V7a1,1,0,0,0-1-1H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V13.5l2.29,2.29A1,1,0,0,0,21,15.08V8.91a1,1,0,0,0-1.71-.71Z",
            upload: "M12 6.66667a4.87654 4.87654 0 0 1 4.77525 3.92342l0.29618 1.50268 1.52794 0.10578a2.57021 2.57021 0 0 1 -0.1827 5.13478H6.5a3.49774 3.49774 0 0 1 -0.3844 -6.97454l1.06682 -0.11341L7.678 9.29387A4.86024 4.86024 0 0 1 12 6.66667m0 -2A6.871 6.871 0 0 0 5.90417 8.37 5.49773 5.49773 0 0 0 6.5 19.33333H18.41667a4.57019 4.57019 0 0 0 0.32083 -9.13A6.86567 6.86567 0 0 0 12 4.66667Zm0.99976 7.2469h1.91406L11.99976 9 9.08618 11.91357h1.91358v3H11V16h2V14h-0.00024Z",
            italic: "M11.76,9h2l-2.2,10h-2Zm1.68-4a1,1,0,1,0,1,1,1,1,0,0,0-1-1Z",
            search: "M15.5 14h-0.79l-0.28 -0.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09 -0.59 4.23 -1.57l0.27 0.28v0.79l5 4.99L20.49 19l-4.99 -5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
            lineHeight: "M6.25,7h2.5L5.25,3.5,1.75,7h2.5V17H1.75l3.5,3.5L8.75,17H6.25Zm4-2V7h12V5Zm0,14h12V17h-12Zm0-6h12V11h-12Z",
            linkStyles: "M19,17.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L11.3,15h3.8l1.7-3.5l1.4,3.5H22L19,17.9z M20,12c0,0.3-0.1,0.7-0.2,1h2.1  c0.1-0.3,0.1-0.6,0.1-1c0-2.8-2.2-5-5-5h-4v2h4C18.7,9,20,10.3,20,12z M14.8,11H8v2h3.3h2.5L14.8,11z M9.9,16.4L8.5,15H7  c-1.7,0-3-1.3-3-3s1.3-3,3-3h4V7H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h3.5L9.9,16.4z",
            mention: "M12.4,5c-4.1,0-7.5,3.4-7.5,7.5S8.3,20,12.4,20h3.8v-1.5h-3.8c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6v1.1  c0,0.6-0.5,1.2-1.1,1.2s-1.1-0.6-1.1-1.2v-1.1c0-2.1-1.7-3.8-3.8-3.8s-3.7,1.7-3.7,3.8s1.7,3.8,3.8,3.8c1,0,2-0.4,2.7-1.1  c0.5,0.7,1.3,1.1,2.2,1.1c1.5,0,2.6-1.2,2.6-2.7v-1.1C19.9,8.4,16.6,5,12.4,5z M12.4,14.7c-1.2,0-2.3-1-2.3-2.2s1-2.3,2.3-2.3  s2.3,1,2.3,2.3S13.6,14.7,12.4,14.7z",
            more: "M13.5,17c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,16.2,13.5,17z M13.5,12c0,0.8-0.7,1.5-1.5,1.5 s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,11.2,13.5,12z M13.5,7c0,0.8-0.7,1.5-1.5,1.5S10.5,7.8,10.5,7s0.7-1.5,1.5-1.5 S13.5,6.2,13.5,7z",
            openLink: "M17,17H7V7h3V5H7C6,5,5,6,5,7v10c0,1,1,2,2,2h10c1,0,2-1,2-2v-3h-2V17z M14,5v2h1.6l-5.8,5.8l1.4,1.4L17,8.4V10h2V5H14z",
            orderedList: "M2.5,16h2v.5h-1v1h1V18h-2v1h3V15h-3Zm1-7h1V5h-2V6h1Zm-1,2H4.3L2.5,13.1V14h3V13H3.7l1.8-2.1V10h-3Zm5-5V8h14V6Zm0,12h14V16H7.5Zm0-5h14V11H7.5Z",
            outdent: "M3,12l3,3V9L3,12z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z",
            pageBreaker: "M3,9v6l3-3L3,9z M21,9H8V4h2v3h9V4h2V9z M21,20h-2v-3h-9v3H8v-5h13V20z M11,13H8v-2h3V13z M16,13h-3v-2h3V13z M21,13h-3v-2  h3V13z",
            paragraphFormat: "M10.15,5A4.11,4.11,0,0,0,6.08,8.18,4,4,0,0,0,10,13v6h2V7h2V19h2V7h2V5ZM8,9a2,2,0,0,1,2-2v4A2,2,0,0,1,8,9Z",
            paragraphMore: "M7.682,5a4.11,4.11,0,0,0-4.07,3.18,4,4,0,0,0,3.11,4.725h0l.027.005a3.766,3.766,0,0,0,.82.09v6h2V7h2V19h2V7h2V5ZM5.532,9a2,2,0,0,1,2-2v4A2,2,0,0,1,5.532,9Zm14.94,8.491a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,17.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,13.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,9.491Z",
            paragraphStyle: "M4,9c0-1.1,0.9-2,2-2v4C4.9,11,4,10.1,4,9z M16.7,20.5l3.2,1.9L19,18.8l3-2.9h-3.7l-1.4-3.5L15.3,16h-3.8l2.9,2.9l-0.9,3.6  L16.7,20.5z M10,17.4V19h1.6L10,17.4z M6.1,5c-1.9,0-3.6,1.3-4,3.2c-0.5,2.1,0.8,4.2,2.9,4.7c0,0,0,0,0,0h0.2C5.5,13,5.8,13,6,13v6  h2V7h2v7h2V7h2V5H6.1z",
            pdfExport: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z M16.3,13.5  c-0.2-0.6-1.1-0.8-2.6-0.8c-0.1,0-0.1,0-0.2,0c-0.3-0.3-0.8-0.9-1-1.2c-0.2-0.2-0.3-0.3-0.4-0.6c0.2-0.7,0.2-1,0.3-1.5  c0.1-0.9,0-1.6-0.2-1.8c-0.4-0.2-0.7-0.2-0.9-0.2c-0.1,0-0.3,0.2-0.7,0.7c-0.2,0.7-0.1,1.8,0.6,2.8c-0.2,0.8-0.7,1.6-1,2.4  c-0.8,0.2-1.5,0.7-1.9,1.1c-0.7,0.7-0.9,1.1-0.7,1.6c0,0.3,0.2,0.6,0.7,0.6c0.3-0.1,0.3-0.2,0.7-0.3c0.6-0.3,1.2-1.7,1.7-2.4  c0.8-0.2,1.7-0.3,2-0.3c0.1,0,0.3,0,0.6,0c0.8,0.8,1.2,1.1,1.8,1.2c0.1,0,0.2,0,0.3,0c0.3,0,0.8-0.1,1-0.6  C16.4,14.1,16.4,13.9,16.3,13.5z M8.3,15.7c-0.1,0.1-0.2,0.1-0.2,0.1c0-0.1,0-0.3,0.6-0.8c0.2-0.2,0.6-0.3,0.9-0.7  C9,15,8.6,15.5,8.3,15.7z M11.3,9c0-0.1,0.1-0.2,0.1-0.2S11.6,9,11.5,10c0,0.1,0,0.3-0.1,0.7C11.3,10.1,11,9.5,11.3,9z M10.9,13.1  c0.2-0.6,0.6-1,0.7-1.5c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.2,0.3,0.7,0.7,0.9C12.2,12.8,11.6,13,10.9,13.1z M15.2,14.1  c-0.1,0-0.1,0-0.2,0c-0.2,0-0.7-0.2-1-0.7c1.1,0,1.6,0.2,1.6,0.6C15.5,14.1,15.4,14.1,15.2,14.1z",
            print: "M16.1,17c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1s-0.4,1-1,1C16.5,18,16.1,17.6,16.1,17z M22,15v4c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h1V5c0-1.1,0.9-2,2-2h7.4L19,7.6V13h1C21.1,13,22,13.9,22,15z M7,13h10V9h-4V5H7V13z M20,15H4  v4h16V15z",
            redo: "M13.6,9.4c1.7,0.3,3.2,0.9,4.6,2L21,8.5v7h-7l2.7-2.7C13,10.1,7.9,11,5.3,14.7c-0.2,0.3-0.4,0.5-0.5,0.8L3,14.6  C5.1,10.8,9.3,8.7,13.6,9.4z",
            removeTable: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z",
            remove: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z",
            replaceImage: "M16,5v3H4v2h12v3l4-4L16,5z M8,19v-3h12v-2H8v-3l-4,4L8,19z",
            row: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M16,6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16V6.5z M9.5,6.5h5V9h-5V6.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.5  v-2H8V17.5z M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z",
            selectAll: "M5,7h2V5C5.9,5,5,5.9,5,7z M5,11h2V9H5V11z M9,19h2v-2H9V19z M5,11h2V9H5V11z M15,5h-2v2h2V5z M17,5v2h2C19,5.9,18.1,5,17,5  z M7,19v-2H5C5,18.1,5.9,19,7,19z M5,15h2v-2H5V15z M11,5H9v2h2V5z M13,19h2v-2h-2V19z M17,11h2V9h-2V11z M17,19c1.1,0,2-0.9,2-2h-2  V19z M17,11h2V9h-2V11z M17,15h2v-2h-2V15z M13,19h2v-2h-2V19z M13,7h2V5h-2V7z M9,15h6V9H9V15z M11,11h2v2h-2V11z",
            smile: "M11.991,3A9,9,0,1,0,21,12,8.99557,8.99557,0,0,0,11.991,3ZM12,19a7,7,0,1,1,7-7A6.99808,6.99808,0,0,1,12,19Zm3.105-5.2h1.503a4.94542,4.94542,0,0,1-9.216,0H8.895a3.57808,3.57808,0,0,0,6.21,0ZM7.5,9.75A1.35,1.35,0,1,1,8.85,11.1,1.35,1.35,0,0,1,7.5,9.75Zm6.3,0a1.35,1.35,0,1,1,1.35,1.35A1.35,1.35,0,0,1,13.8,9.75Z",
            spellcheck: "M19.1,13.6l-5.6,5.6l-2.7-2.7l-1.4,1.4l4.1,4.1l7-7L19.1,13.6z M10.8,13.7l2.7,2.7l0.8-0.8L10.5,5h-2l-5,14h2l1.4-4h2.6  L10.8,13.7z M9.5,7.8l1.9,5.2H7.6L9.5,7.8z",
            star: "M12.1,7.7l1,2.5l0.4,0.9h1h2.4l-2.1,2l-0.6,0.6l0.2,0.9l0.6,2.3l-2.2-1.3L12,15.2l-0.8,0.5L9,17l0.5-2.5l0.1-0.8L9,13.1  l-2-2h2.5h0.9l0.4-0.8L12.1,7.7 M12.2,4L9.5,9.6H3.4L8,14.2L6.9,20l5.1-3.1l5.3,3.1l-1.5-5.8l4.8-4.6h-6.1L12.2,4L12.2,4z",
            strikeThrough: "M3,12.20294H21v1.5H16.63422a3.59782,3.59782,0,0,1,.34942,1.5929,3.252,3.252,0,0,1-1.31427,2.6997A5.55082,5.55082,0,0,1,12.20251,19a6.4421,6.4421,0,0,1-2.62335-.539,4.46335,4.46335,0,0,1-1.89264-1.48816,3.668,3.668,0,0,1-.67016-2.15546V14.704h.28723v-.0011h.34149v.0011H9.02v.11334a2.18275,2.18275,0,0,0,.85413,1.83069,3.69,3.69,0,0,0,2.32836.67926,3.38778,3.38778,0,0,0,2.07666-.5462,1.73346,1.73346,0,0,0,.7013-1.46655,1.69749,1.69749,0,0,0-.647-1.43439,3.00525,3.00525,0,0,0-.27491-.17725H3ZM16.34473,7.05981A4.18163,4.18163,0,0,0,14.6236,5.5462,5.627,5.627,0,0,0,12.11072,5,5.16083,5.16083,0,0,0,8.74719,6.06213,3.36315,3.36315,0,0,0,7.44006,8.76855a3.22923,3.22923,0,0,0,.3216,1.42786h2.59668c-.08338-.05365-.18537-.10577-.25269-.16064a1.60652,1.60652,0,0,1-.65283-1.30036,1.79843,1.79843,0,0,1,.68842-1.5108,3.12971,3.12971,0,0,1,1.96948-.55243,3.04779,3.04779,0,0,1,2.106.6687,2.35066,2.35066,0,0,1,.736,1.83258v.11341h2.00317V9.17346A3.90013,3.90013,0,0,0,16.34473,7.05981Z",
            subscript: "M10.4,12l3.6,3.6L12.6,17L9,13.4L5.4,17L4,15.6L7.6,12L4,8.4L5.4,7L9,10.6L12.6,7L14,8.4L10.4,12z M18.31234,19.674  l1.06812-1.1465c0.196-0.20141,0.37093-0.40739,0.5368-0.6088c0.15975-0.19418,0.30419-0.40046,0.432-0.617  c0.11969-0.20017,0.21776-0.41249,0.29255-0.6334c0.07103-0.21492,0.10703-0.43986,0.10662-0.66621  c0.00297-0.28137-0.04904-0.56062-0.1531-0.82206c-0.09855-0.24575-0.25264-0.46534-0.45022-0.6416  c-0.20984-0.18355-0.45523-0.32191-0.72089-0.40646c-0.63808-0.19005-1.3198-0.17443-1.94851,0.04465  c-0.28703,0.10845-0.54746,0.2772-0.76372,0.49487c-0.20881,0.20858-0.37069,0.45932-0.47483,0.73548  c-0.10002,0.26648-0.15276,0.54838-0.15585,0.833l-0.00364,0.237H17.617l0.00638-0.22692  c0.00158-0.12667,0.01966-0.25258,0.05377-0.37458c0.03337-0.10708,0.08655-0.20693,0.15679-0.29437  c0.07105-0.08037,0.15959-0.14335,0.25882-0.1841c0.22459-0.08899,0.47371-0.09417,0.7018-0.01458  c0.0822,0.03608,0.15559,0.08957,0.21509,0.15679c0.06076,0.07174,0.10745,0.15429,0.13761,0.24333  c0.03567,0.10824,0.05412,0.22141,0.05469,0.33538c-0.00111,0.08959-0.0118,0.17881-0.0319,0.26612  c-0.02913,0.10428-0.07076,0.20465-0.124,0.29893c-0.07733,0.13621-0.1654,0.26603-0.26338,0.38823  c-0.13438,0.17465-0.27767,0.34226-0.42929,0.50217l-2.15634,2.35315V21H21v-1.326H18.31234z",
            superscript: "M10.4,12,14,15.6,12.6,17,9,13.4,5.4,17,4,15.6,7.6,12,4,8.4,5.4,7,9,10.6,12.6,7,14,8.4Zm8.91234-3.326,1.06812-1.1465c.196-.20141.37093-.40739.5368-.6088a4.85745,4.85745,0,0,0,.432-.617,3.29,3.29,0,0,0,.29255-.6334,2.11079,2.11079,0,0,0,.10662-.66621,2.16127,2.16127,0,0,0-.1531-.82206,1.7154,1.7154,0,0,0-.45022-.6416,2.03,2.03,0,0,0-.72089-.40646,3.17085,3.17085,0,0,0-1.94851.04465,2.14555,2.14555,0,0,0-.76372.49487,2.07379,2.07379,0,0,0-.47483.73548,2.446,2.446,0,0,0-.15585.833l-.00364.237H18.617L18.62338,5.25a1.45865,1.45865,0,0,1,.05377-.37458.89552.89552,0,0,1,.15679-.29437.70083.70083,0,0,1,.25882-.1841,1.00569,1.00569,0,0,1,.7018-.01458.62014.62014,0,0,1,.21509.15679.74752.74752,0,0,1,.13761.24333,1.08893,1.08893,0,0,1,.05469.33538,1.25556,1.25556,0,0,1-.0319.26612,1.34227,1.34227,0,0,1-.124.29893,2.94367,2.94367,0,0,1-.26338.38823,6.41629,6.41629,0,0,1-.42929.50217L17.19709,8.92642V10H22V8.674Z",
            symbols: "M15.77493,16.98885a8.21343,8.21343,0,0,0,1.96753-2.57651,7.34824,7.34824,0,0,0,.6034-3.07618A6.09092,6.09092,0,0,0,11.99515,5a6.13347,6.13347,0,0,0-4.585,1.79187,6.417,6.417,0,0,0-1.756,4.69207,6.93955,6.93955,0,0,0,.622,2.97415,8.06587,8.06587,0,0,0,1.949,2.53076H5.41452V19h5.54114v-.04331h-.00147V16.84107a5.82825,5.82825,0,0,1-2.2052-2.2352A6.40513,6.40513,0,0,1,7.97672,11.447,4.68548,4.68548,0,0,1,9.07785,8.19191a3.73232,3.73232,0,0,1,2.9173-1.22462,3.76839,3.76839,0,0,1,2.91241,1.21489,4.482,4.482,0,0,1,1.11572,3.154,6.71141,6.71141,0,0,1-.75384,3.24732,5.83562,5.83562,0,0,1-2.22357,2.25759v2.11562H13.0444V19h5.54108V16.98885Z",
            tags: "M8.9749 7.47489a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8.9749 7.47489Zm3.78866 -3.12713L16.5362 8.12041l0.33565 0.33564 2.77038 2.77038a2.01988 2.01988 0 0 1 0.59 1.42 1.95518 1.95518 0 0 1 -0.5854 1.40455l0.00044 0.00043 -5.59583 5.59583 -0.00043 -0.00044a1.95518 1.95518 0 0 1 -1.40455 0.5854 1.98762 1.98762 0 0 1 -1.41 -0.58L8.45605 16.87185l-0.33564 -0.33565L4.35777 12.77357a1.99576 1.99576 0 0 1 -0.59 -1.42V9.36358l0 -3.59582a2.00579 2.00579 0 0 1 2 -2l3.59582 0h1.98995A1.98762 1.98762 0 0 1 12.76356 4.34776ZM15.46186 9.866l-0.33564 -0.33564L11.36359 5.76776H5.76776v5.59583L9.866 15.46186l2.7794 2.7794 5.5878 -5.60385 -0.001 -0.001Z",
            tableHeader: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  l0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M14.5,17.5h-5V15h5V17.5z M14.5,13.5h-5v-3h5V13.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5l0,0  H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9h-4.4H16h-1.5h-5H8H7.9H3.5V7c0-0.3,0.2-0.5,0.4-0.5l0,0h4l0,0h8.2l0,0H20  c0.3,0,0.5,0.2,0.5,0.4l0,0V9z",
            tableStyle: "M20.0171,19.89752l.9,3.6-3.2-1.9-3.3,1.9.8-3.6-2.9-2.9h3.8l1.7-3.5,1.4,3.5h3.8ZM20,5H4A2.00591,2.00591,0,0,0,2,7V17a2.00591,2.00591,0,0,0,2,2h7.49115l-.58826-.58826L9.99115,17.5H9.5V14.9975h5.36511L16,12.66089V10.5h4.5v3h-.52783l.599,1.4975H22V7A2.00591,2.00591,0,0,0,20,5ZM3.5,7A.4724.4724,0,0,1,4,6.5H8V9H3.5Zm0,3.5H8v3H3.5Zm.5,7a.4724.4724,0,0,1-.5-.5V15H8v2.5Zm10.5-4h-5v-3h5Zm0-4.5h-5V6.5h5Zm6,0H16V6.5h4a.4724.4724,0,0,1,.5.5Z",
            textColor: "M15.2,13.494s-3.6,3.9-3.6,6.3a3.65,3.65,0,0,0,7.3.1v-.1C18.9,17.394,15.2,13.494,15.2,13.494Zm-1.47-1.357.669-.724L12.1,5h-2l-5,14h2l1.43-4h2.943A24.426,24.426,0,0,1,13.726,12.137ZM11.1,7.8l1.86,5.2H9.244Z",
            textMore: "M13.55,19h2l-5-14h-2l-5,14h2l1.4-4h5.1Zm-5.9-6,1.9-5.2,1.9,5.2Zm12.8,4.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,17.5Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,13.5Zm0-4A1.5,1.5,0,1,1,18.95,8,1.5,1.5,0,0,1,20.45,9.5Z",
            underline: "M19,20v2H5V20Zm-3-6.785a4,4,0,0,1-5.74,3.4A3.75,3.75,0,0,1,8,13.085V5.005H6v8.21a6,6,0,0,0,8,5.44,5.851,5.851,0,0,0,4-5.65v-8H16ZM16,5v0h2V5ZM8,5H6v0H8Z",
            undo: "M10.4,9.4c-1.7,0.3-3.2,0.9-4.6,2L3,8.5v7h7l-2.7-2.7c3.7-2.6,8.8-1.8,11.5,1.9c0.2,0.3,0.4,0.5,0.5,0.8l1.8-0.9  C18.9,10.8,14.7,8.7,10.4,9.4z",
            unlink: "M14.4,11l1.6,1.6V11H14.4z M17,7h-4v1.9h4c1.7,0,3.1,1.4,3.1,3.1c0,1.3-0.8,2.4-1.9,2.8l1.4,1.4C21,15.4,22,13.8,22,12  C22,9.2,19.8,7,17,7z M2,4.3l3.1,3.1C3.3,8.1,2,9.9,2,12c0,2.8,2.2,5,5,5h4v-1.9H7c-1.7,0-3.1-1.4-3.1-3.1c0-1.6,1.2-2.9,2.8-3.1  L8.7,11H8v2h2.7l2.3,2.3V17h1.7l4,4l1.4-1.4L3.4,2.9L2,4.3z",
            unorderedList: "M4,10.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,10.5,4,10.5z M4,5.5C3.2,5.5,2.5,6.2,2.5,7  S3.2,8.5,4,8.5S5.5,7.8,5.5,7S4.8,5.5,4,5.5z M4,15.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,15.5,4,15.5z   M7.5,6v2h14V6H7.5z M7.5,18h14v-2h-14V18z M7.5,13h14v-2h-14V13z",
            verticalAlignBottom: "M16,13h-3V3h-2v10H8l4,4L16,13z M3,19v2h18v-2H3z",
            verticalAlignMiddle: "M3,11v2h18v-2H3z M8,18h3v3h2v-3h3l-4-4L8,18z M16,6h-3V3h-2v3H8l4,4L16,6z",
            verticalAlignTop: "M8,11h3v10h2V11h3l-4-4L8,11z M21,5V3H3v2H21z"
        }, V.MODULES.modals = function (l) {
            var a = l.$;
            l.shared.modals || (l.shared.modals = {});
            var o, c = l.shared.modals;

            function e() {
                for (var e in c) if (Object.prototype.hasOwnProperty.call(c, e)) {
                    var t = c[e];
                    t && t.$modal && t.$modal.removeData().remove()
                }
                o && o.removeData().remove(), c = {}
            }

            function s(e, t) {
                if (c[e]) {
                    var n = c[e].$modal, r = n.data("instance") || l;
                    r.events.enableBlur(), n.hide(), o.hide(), a(r.o_doc).find("body").first().removeClass("prevent-scroll fr-mobile"), n.removeClass("fr-active"), t || (r.accessibility.restoreSelection(), r.events.trigger("modals.hide"))
                }
            }

            function n(e) {
                var t;
                if ("string" == typeof e) {
                    if (!c[e]) return;
                    t = c[e].$modal
                } else t = e;
                return t && l.node.hasClass(t, "fr-active") && l.core.sameInstance(t) || !1
            }

            return {
                _init: function t() {
                    l.events.on("shared.destroy", e, !0)
                }, get: function r(e) {
                    return c[e]
                }, create: function d(n, e, t) {
                    if (e = '<div class="fr-modal-head-line">'.concat(e, "</div>"), l.shared.$overlay || (l.shared.$overlay = a(l.doc.createElement("DIV")).addClass("fr-overlay"), a("body").first().append(l.shared.$overlay)), o = l.shared.$overlay, l.opts.theme && o.addClass("".concat(l.opts.theme, "-theme")), !c[n]) {
                        var r = function i(e, t) {
                            var n = '<div tabIndex="-1" class="fr-modal'.concat(l.opts.theme ? " ".concat(l.opts.theme, "-theme") : "", '"><div class="fr-modal-wrapper">'),
                                r = '<button title="'.concat(l.language.translate("Cancel"), '" class="fr-command fr-btn fr-modal-close"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="').concat(V.SVG.close, '"/></svg></button>');
                            n += '<div class="fr-modal-head">'.concat(e).concat(r, "</div>"), n += '<div tabIndex="-1" class="fr-modal-body">'.concat(t, "</div>"), n += "</div></div>";
                            var o = a(l.doc.createElement("DIV"));
                            return o.html(n), o.find("> .fr-modal")
                        }(e, t);
                        c[n] = {
                            $modal: r,
                            $head: r.find(".fr-modal-head"),
                            $body: r.find(".fr-modal-body")
                        }, l.helpers.isMobile() || r.addClass("fr-desktop"), a("body").first().append(r), l.events.$on(r, "click", ".fr-modal-close", function () {
                            s(n)
                        }, !0), c[n].$body.css("margin-top", c[n].$head.outerHeight()), l.events.$on(r, "keydown", function (e) {
                            var t = e.which;
                            return t === V.KEYCODE.ESC ? (s(n), l.accessibility.focusModalButton(r), !1) : !(!a(e.currentTarget).is("input[type=text], textarea") && t !== V.KEYCODE.ARROW_UP && t !== V.KEYCODE.ARROW_DOWN && !l.keys.isBrowserAction(e) && (e.preventDefault(), e.stopPropagation(), 1))
                        }, !0), s(n, !0)
                    }
                    return c[n]
                }, show: function i(e) {
                    if (c[e]) {
                        var t = c[e].$modal;
                        t.data("instance", l), t.show(), o.show(), a(l.o_doc).find("body").first().addClass("prevent-scroll"), l.helpers.isMobile() && a(l.o_doc).find("body").first().addClass("fr-mobile"), t.addClass("fr-active"), l.accessibility.focusModal(t)
                    }
                }, hide: s, resize: function f(e) {
                    if (c[e]) {
                        var t = c[e], n = t.$modal, r = t.$body, o = l.o_win.innerHeight,
                            i = n.find(".fr-modal-wrapper"),
                            a = o - i.outerHeight(!0) + (i.height() - (r.outerHeight(!0) - r.height())), s = "auto";
                        a < r.get(0).scrollHeight && (s = a), r.height(s)
                    }
                }, isVisible: n, areVisible: function p(e) {
                    for (var t in c) if (Object.prototype.hasOwnProperty.call(c, t) && n(t) && (void 0 === e || c[t].$modal.data("instance") === e)) return c[t].$modal;
                    return !1
                }
            }
        }, V.MODULES.position = function (S) {
            var T = S.$;

            function o() {
                var e = S.selection.ranges(0).getBoundingClientRect();
                if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
                    var t = !1;
                    0 === S.$el.find(".fr-marker").length && (S.selection.save(), t = !0);
                    var n = S.$el.find(".fr-marker").first();
                    n.css("display", "inline"), n.css("line-height", "");
                    var r = n.offset(), o = n.outerHeight();
                    n.css("display", "none"), n.css("line-height", 0), (e = {}).left = r && r.left, e.width = 0, e.height = o, e.top = r && r.top - (S.helpers.isMobile() && !S.helpers.isIOS() || S.opts.iframe ? 0 : S.helpers.scrollTop()), e.right = 1, e.bottom = 1, e.ok = !0, t && S.selection.restore()
                }
                return e
            }

            function i(e, t, n, r) {
                var o = n.data("container");
                if (!o || "BODY" === o.get(0).tagName && "static" === o.css("position") || (e && (e -= o.offset().left), t && (t -= o.offset().top), "BODY" !== o.get(0).tagName ? (e && (e += o.get(0).scrollLeft), t && (t += o.get(0).scrollTop)) : "absolute" === o.css("position") && (e && (e += o.position().left), t && (t += o.position().top))), S.opts.iframe && o && S.$tb && o.get(0) !== S.$tb.get(0)) {
                    var i = S.helpers.getPX(S.$wp.find(".fr-iframe").css("padding-top")),
                        a = S.helpers.getPX(S.$wp.find(".fr-iframe").css("padding-left"));
                    e && (e += S.$iframe.offset().left + a), t && (t += S.$iframe.offset().top + i)
                }
                var s = function l(e, t) {
                    var n = e.outerWidth(!0);
                    return t + n > S.$sc.get(0).clientWidth - 10 && (t = S.$sc.get(0).clientWidth - n - 10), t < 0 && (t = 10), t
                }(n, e);
                e && n.css("left", s), t && n.css("top", function c(e, t, n) {
                    var r = e.outerHeight(!0);
                    if (!S.helpers.isMobile() && S.$tb && e.parent().get(0) !== S.$tb.get(0)) {
                        var o = e.parent().offset().top, i = t - r - (n || 0);
                        e.parent().get(0) === S.$sc.get(0) && (o -= e.parent().position().top);
                        var a = S.$sc.get(0).clientHeight;
                        o + t + r > S.$sc.offset().top + a && 0 < e.parent().offset().top + i && 0 < i ? i > S.$wp.scrollTop() && (t = i, e.addClass("fr-above")) : e.removeClass("fr-above")
                    }
                    return t
                }(n, t, r))
            }

            function t(e) {
                var n = T(e), t = n.is(".fr-sticky-on"), r = n.data("sticky-top"), o = n.data("sticky-scheduled");
                if (void 0 === r) {
                    n.data("sticky-top", 0);
                    var i = T('<div class="fr-sticky-dummy" style="height: '.concat(n.outerHeight(), 'px;"></div>'));
                    S.$box.prepend(i)
                } else S.$box.find(".fr-sticky-dummy").css("height", n.outerHeight());
                if (S.core.hasFocus() || 0 < S.$tb.findVisible("input:focus").length) {
                    var a = S.helpers.scrollTop(),
                        s = Math.min(Math.max(a - S.$tb.parent().offset().top, 0), S.$tb.parent().outerHeight() - n.outerHeight());
                    if (s !== r && s !== o && (clearTimeout(n.data("sticky-timeout")), n.data("sticky-scheduled", s), n.outerHeight() < a - S.$tb.parent().offset().top && n.addClass("fr-opacity-0"), n.data("sticky-timeout", setTimeout(function () {
                        var e = S.helpers.scrollTop(),
                            t = Math.min(Math.max(e - S.$tb.parent().offset().top, 0), S.$tb.parent().outerHeight() - n.outerHeight());
                        0 < t && "BODY" === S.$tb.parent().get(0).tagName && (t += S.$tb.parent().position().top), t !== r && (n.css("top", Math.max(t, 0)), n.data("sticky-top", t), n.data("sticky-scheduled", t)), n.removeClass("fr-opacity-0")
                    }, 100))), !t) {
                        var l = S.$tb.parent(), c = l.get(0).offsetWidth - l.get(0).clientWidth;
                        n.css("top", "0"), n.width(l.width() - c), n.addClass("fr-sticky-on"), S.$box.addClass("fr-sticky-box")
                    }
                } else clearTimeout(T(e).css("sticky-timeout")), n.css("top", "0"), n.css("position", ""), n.css("width", ""), n.data("sticky-top", 0), n.removeClass("fr-sticky-on"), S.$box.removeClass("fr-sticky-box")
            }

            function n(e) {
                if (e.offsetWidth) {
                    var t = T(e), n = t.outerHeight(), r = t.data("sticky-position"),
                        o = T("body" === S.opts.scrollableContainer ? S.o_win : S.opts.scrollableContainer).outerHeight(),
                        i = 0, a = 0;
                    "body" !== S.opts.scrollableContainer && (i = S.$sc.offset().top, a = T(S.o_win).outerHeight() - i - o);
                    var s = "body" === S.opts.scrollableContainer ? S.helpers.scrollTop() : i,
                        l = t.is(".fr-sticky-on");
                    t.data("sticky-parent") || t.data("sticky-parent", t.parent());
                    var c = t.data("sticky-parent"), d = c.offset().top, f = c.outerHeight();
                    if (t.data("sticky-offset") ? S.$box.find(".fr-sticky-dummy").css("height", "".concat(n, "px")) : (t.data("sticky-offset", !0), t.after('<div class="fr-sticky-dummy" style="height: '.concat(n, 'px;"></div>'))), !r) {
                        var p = "auto" !== t.css("top") || "auto" !== t.css("bottom");
                        p || t.css("position", "fixed"), r = {
                            top: S.node.hasClass(t.get(0), "fr-top"),
                            bottom: S.node.hasClass(t.get(0), "fr-bottom")
                        }, p || t.css("position", ""), t.data("sticky-position", r), t.data("top", S.node.hasClass(t.get(0), "fr-top") ? t.css("top") : "auto"), t.data("bottom", S.node.hasClass(t.get(0), "fr-bottom") ? t.css("bottom") : "auto")
                    }
                    var u = S.helpers.getPX(t.data("top")), h = S.helpers.getPX(t.data("bottom")),
                        g = r.top && function b() {
                            return d < s + u && s + u <= d + f - n
                        }() && (S.helpers.isInViewPort(S.$sc.get(0)) || "body" === S.opts.scrollableContainer),
                        m = r.bottom && function E() {
                            return d + n < s + o - h && s + o - h < d + f
                        }();
                    if (g || m) {
                        var v = c.get(0).offsetWidth - c.get(0).clientWidth;
                        t.css("width", "".concat(c.get(0).getBoundingClientRect().width - v, "px")), l || (t.addClass("fr-sticky-on"), t.removeClass("fr-sticky-off"), t.css("top") && ("auto" !== t.data("top") ? t.css("top", S.helpers.getPX(t.data("top")) + i) : t.data("top", "auto")), t.css("bottom") && ("auto" !== t.data("bottom") ? t.css("bottom", S.helpers.getPX(t.data("bottom")) + a) : t.css("bottom", "auto")))
                    } else S.node.hasClass(t.get(0), "fr-sticky-off") || (t.css("width", ""), t.removeClass("fr-sticky-on"), t.addClass("fr-sticky-off"), t.css("top") && "auto" !== t.data("top") && r.top && t.css("top", 0), t.css("bottom") && "auto" !== t.data("bottom") && r.bottom && t.css("bottom", 0))
                }
            }

            function r() {
                if (S.helpers.requestAnimationFrame()(r), !1 !== S.events.trigger("position.refresh")) for (var e = 0; e < S._stickyElements.length; e++) t(S._stickyElements[e])
            }

            function a() {
                if (S._stickyElements) for (var e = 0; e < S._stickyElements.length; e++) n(S._stickyElements[e])
            }

            return {
                _init: function s() {
                    !function e() {
                        S._stickyElements = [], S.helpers.isIOS() ? (r(), S.events.$on(T(S.o_win), "scroll", function () {
                            if (S.core.hasFocus()) for (var e = 0; e < S._stickyElements.length; e++) {
                                var t = T(S._stickyElements[e]), n = t.parent(), r = S.helpers.scrollTop();
                                t.outerHeight() < r - n.offset().top && (t.addClass("fr-opacity-0"), t.data("sticky-top", -1), t.data("sticky-scheduled", -1))
                            }
                        }, !0)) : ("body" !== S.opts.scrollableContainer && S.events.$on(T(S.opts.scrollableContainer), "scroll", a, !0), S.events.$on(T(S.o_win), "scroll", a, !0), S.events.$on(T(S.o_win), "resize", a, !0), S.events.on("initialized", a), S.events.on("focus", a), S.events.$on(T(S.o_win), "resize", "textarea", a, !0)), S.events.on("destroy", function () {
                            S._stickyElements = []
                        })
                    }()
                }, forSelection: function l(e) {
                    var t = o();
                    e.css({top: 0, left: 0});
                    var n = t.top + t.height,
                        r = t.left + t.width / 2 - e.get(0).offsetWidth / 2 + S.helpers.scrollLeft();
                    S.opts.iframe || (n += S.helpers.scrollTop()), i(r, n, e, t.height)
                }, addSticky: function c(e) {
                    e.addClass("fr-sticky"), S.helpers.isIOS() && e.addClass("fr-sticky-ios"), e.removeClass("fr-sticky"), S._stickyElements.push(e.get(0))
                }, refresh: a, at: i, getBoundingRect: o
            }
        }, V.MODULES.refresh = function (l) {
            var c = l.$;

            function o(e, t) {
                e.toggleClass("fr-disabled", t).attr("aria-disabled", t)
            }

            function e(e) {
                var t = l.$tb.find('.fr-more-toolbar[data-name="'.concat(e.attr("data-group-name"), '"]')),
                    n = function s(e, t) {
                        var n = 0, r = t.find("> .fr-command, > .fr-btn-wrap");
                        r.each(function (e, t) {
                            n += c(t).outerWidth()
                        });
                        var o, i = l.helpers.getPX(c(r[0]).css("margin-left")),
                            a = l.helpers.getPX(c(r[0]).css("margin-right"));
                        o = "rtl" === l.opts.direction ? l.$tb.outerWidth() - e.offset().left + l.$tb.offset().left - (n + e.outerWidth() + r.length * (i + a)) / 2 : e.offset().left - l.$tb.offset().left - (n - e.outerWidth() + r.length * (i + a)) / 2;
                        o + n + r.length * (i + a) > l.$tb.outerWidth() && (o -= (n + r.length * (i + a) - e.outerWidth()) / 2);
                        o < 0 && (o = 0);
                        return o
                    }(e, t);
                "rtl" === l.opts.direction ? t.css("padding-right", n) : t.css("padding-left", n)
            }

            return {
                undo: function t(e) {
                    o(e, !l.undo.canDo())
                }, redo: function n(e) {
                    o(e, !l.undo.canRedo())
                }, outdent: function i(e) {
                    if (l.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                    for (var t = l.selection.blocks(), n = 0; n < t.length; n++) {
                        var r = "rtl" === l.opts.direction || "rtl" === c(t[n]).css("direction") ? "margin-right" : "margin-left";
                        if ("LI" === t[n].tagName || "LI" === t[n].parentNode.tagName) return o(e, !1), !0;
                        if (0 < l.helpers.getPX(c(t[n]).css(r))) return o(e, !1), !0
                    }
                    o(e, !0)
                }, indent: function a(e) {
                    if (l.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                    for (var t = l.selection.blocks(), n = 0; n < t.length; n++) {
                        for (var r = t[n].previousSibling; r && r.nodeType === Node.TEXT_NODE && 0 === r.textContent.length;) r = r.previousSibling;
                        if ("LI" !== t[n].tagName || r) return o(e, !1), !0;
                        o(e, !0)
                    }
                }, moreText: e, moreParagraph: e, moreMisc: e, moreRich: e
            }
        }, Object.assign(V.DEFAULTS, {
            attribution: !0,
            toolbarBottom: !1,
            toolbarButtons: null,
            toolbarButtonsXS: null,
            toolbarButtonsSM: null,
            toolbarButtonsMD: null,
            toolbarContainer: null,
            toolbarInline: !1,
            toolbarSticky: !0,
            toolbarStickyOffset: 0,
            toolbarVisibleWithoutSelection: !1
        }), V.TOOLBAR_BUTTONS = {
            moreText: {buttons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "textColor", "backgroundColor", "inlineClass", "inlineStyle", "clearFormatting"]},
            moreParagraph: {buttons: ["alignLeft", "alignCenter", "formatOLSimple", "alignRight", "alignJustify", "formatOL", "formatUL", "paragraphFormat", "paragraphStyle", "lineHeight", "outdent", "indent", "quote"]},
            moreRich: {buttons: ["insertLink", "insertImage", "insertVideo", "insertTable", "emoticons", "fontAwesome", "specialCharacters", "embedly", "insertFile", "insertHR"]},
            moreMisc: {
                buttons: ["undo", "redo", "fullscreen", "print", "getPDF", "spellChecker", "selectAll", "html", "help"],
                align: "right",
                buttonsVisible: 2
            }
        }, V.TOOLBAR_BUTTONS_MD = null, (V.TOOLBAR_BUTTONS_SM = {}).moreText = Object.assign({}, V.TOOLBAR_BUTTONS.moreText, {buttonsVisible: 2}), V.TOOLBAR_BUTTONS_SM.moreParagraph = Object.assign({}, V.TOOLBAR_BUTTONS.moreParagraph, {buttonsVisible: 2}), V.TOOLBAR_BUTTONS_SM.moreRich = Object.assign({}, V.TOOLBAR_BUTTONS.moreRich, {buttonsVisible: 2}), V.TOOLBAR_BUTTONS_SM.moreMisc = Object.assign({}, V.TOOLBAR_BUTTONS.moreMisc, {buttonsVisible: 2}), (V.TOOLBAR_BUTTONS_XS = {}).moreText = Object.assign({}, V.TOOLBAR_BUTTONS.moreText, {buttonsVisible: 0}), V.TOOLBAR_BUTTONS_XS.moreParagraph = Object.assign({}, V.TOOLBAR_BUTTONS.moreParagraph, {buttonsVisible: 0}), V.TOOLBAR_BUTTONS_XS.moreRich = Object.assign({}, V.TOOLBAR_BUTTONS.moreRich, {buttonsVisible: 0}), V.TOOLBAR_BUTTONS_XS.moreMisc = Object.assign({}, V.TOOLBAR_BUTTONS.moreMisc, {buttonsVisible: 2}), V.POWERED_BY = '<a id="logo" href="https://froala.com/wysiwyg-editor" target="_blank" title="Froala WYSIWYG HTML Editor"><span>Powered by</span><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 822.8 355.33"><defs><style>.fr-logo{fill:#b1b2b7;}</style></defs><title>Froala</title><path class="fr-logo" d="M123.58,78.65A16.16,16.16,0,0,0,111.13,73H16.6C7.6,73,0,80.78,0,89.94V128.3a16.45,16.45,0,0,0,32.9,0V104.14h78.5A15.63,15.63,0,0,0,126.87,91.2,15.14,15.14,0,0,0,123.58,78.65Z"/><path class="fr-logo" d="M103.54,170a16.05,16.05,0,0,0-11.44-4.85H15.79A15.81,15.81,0,0,0,0,180.93v88.69a16.88,16.88,0,0,0,5,11.92,16,16,0,0,0,11.35,4.7h.17a16.45,16.45,0,0,0,16.41-16.6v-73.4H92.2A15.61,15.61,0,0,0,107.89,181,15.1,15.1,0,0,0,103.54,170Z"/><path class="fr-logo" d="M233,144.17c-5.29-6.22-16-7.52-24.14-7.52-16.68,0-28.72,7.71-36.5,23.47v-5.67a16.15,16.15,0,1,0-32.3,0v115.5a16.15,16.15,0,1,0,32.3,0v-38.7c0-19.09,3.5-63.5,35.9-63.5a44.73,44.73,0,0,1,5.95.27h.12c12.79,1.2,20.06-2.73,21.6-11.69C236.76,151.48,235.78,147.39,233,144.17Z"/><path class="fr-logo" d="M371.83,157c-13.93-13.11-32.9-20.33-53.43-20.33S279,143.86,265.12,157c-14.67,13.88-22.42,32.82-22.42,54.77,0,21.68,8,41.28,22.4,55.2,13.92,13.41,32.85,20.8,53.3,20.8s39.44-7.38,53.44-20.79c14.55-13.94,22.56-33.54,22.56-55.21S386.39,170.67,371.83,157Zm-9.73,54.77c0,25.84-18.38,44.6-43.7,44.6s-43.7-18.76-43.7-44.6c0-25.15,18.38-43.4,43.7-43.4S362.1,186.59,362.1,211.74Z"/><path class="fr-logo" d="M552.7,138.14a16.17,16.17,0,0,0-16,16.3v1C526.41,143.85,509,136.64,490,136.64c-19.83,0-38.19,7.24-51.69,20.4C424,171,416.4,190,416.4,212c0,21.61,7.78,41.16,21.9,55,13.56,13.33,31.92,20.67,51.7,20.67,18.83,0,36.29-7.41,46.7-19.37v1.57a16.15,16.15,0,1,0,32.3,0V154.44A16.32,16.32,0,0,0,552.7,138.14Zm-16.3,73.6c0,30.44-22.81,44.3-44,44.3-24.57,0-43.1-19-43.1-44.3s18.13-43.4,43.1-43.4C513.73,168.34,536.4,183.55,536.4,211.74Z"/><path class="fr-logo" d="M623.5,61.94a16.17,16.17,0,0,0-16,16.3v191.7a16.15,16.15,0,1,0,32.3,0V78.24A16.32,16.32,0,0,0,623.5,61.94Z"/><path class="fr-logo" d="M806.5,138.14a16.17,16.17,0,0,0-16,16.3v1c-10.29-11.63-27.74-18.84-46.7-18.84-19.83,0-38.19,7.24-51.69,20.4-14.33,14-21.91,33-21.91,55,0,21.61,7.78,41.16,21.9,55,13.56,13.33,31.92,20.67,51.7,20.67,18.83,0,36.29-7.41,46.7-19.37v1.57a16.15,16.15,0,1,0,32.3,0V154.44A16.32,16.32,0,0,0,806.5,138.14Zm-16.3,73.6c0,30.44-22.81,44.3-44,44.3-24.57,0-43.1-19-43.1-44.3s18.13-43.4,43.1-43.4C767.53,168.34,790.2,183.55,790.2,211.74Z"/></svg></a>', V.MODULES.toolbar = function (m) {
            var v, b = m.$, t = [];

            function e(e) {
                var n = {};
                if (Array.isArray(e)) {
                    if (!Array.isArray(e[0])) {
                        for (var t = [], r = [], o = 0; o < e.length; o++) "|" === e[o] || "-" === e[o] ? (0 < r.length && t.push(r), r = []) : r.push(e[o]);
                        0 < r.length && t.push(r), e = t
                    }
                    e.forEach(function (e, t) {
                        n["group".concat(t + 1)] = {buttons: e}
                    }), n.showMoreButtons = !1
                } else "object" !== M(e) || Array.isArray(e) || ((n = e).showMoreButtons = !0);
                return n
            }

            function E() {
                var e = m.helpers.screenSize();
                return t[v = e]
            }

            function S() {
                for (var e = m.$tb.find(".fr-more-toolbar"), c = "", t = 0; t < e.length; t++) {
                    var d = b(e[t]);
                    d.hasClass("fr-expanded") ? function () {
                        var n = m.helpers.getPX(d.css("padding-left")), e = d.find("> .fr-command, > .fr-btn-wrap"),
                            t = b(e[0]), r = m.helpers.getPX(t.css("margin-left")),
                            o = m.helpers.getPX(t.css("margin-right")), i = m.helpers.getPX(t.css("margin-top")),
                            a = m.helpers.getPX(t.css("margin-bottom"));
                        if (e.each(function (e, t) {
                            n += b(t).outerWidth() + r + o
                        }), m.$tb.outerWidth() < n) {
                            var s = Math.floor(n / m.$tb.outerWidth());
                            n += s * (n / d[0].childElementCount), s = Math.ceil(n / m.$tb.outerWidth());
                            var l = (m.helpers.getPX(t.css("height")) + i + a) * s;
                            d.css("height", l), c = l
                        }
                    }() : d.css("height", "")
                }
                m.$tb.css("padding-bottom", c)
            }

            function r() {
                if (v !== m.helpers.screenSize()) {
                    var e = E(), t = b(), n = b();
                    for (var r in m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").addClass("fr-hidden"), function g() {
                        for (var t = m.$tb.find(".fr-btn-grp, .fr-more-toolbar"), r = function r(e) {
                            var n = b(t[e]);
                            n.children().each(function (e, t) {
                                n.before(t)
                            }), n.remove()
                        }, e = 0; e < t.length; e++) r(e)
                    }(), e) {
                        var o = e[r];
                        if (o.buttons) {
                            var i = void 0, a = 0, s = 3,
                                l = b('<div class="fr-btn-grp fr-float-'.concat(e[r].align ? e[r].align : "left", '"></div>'));
                            e.showMoreButtons && (i = b('<div class="fr-more-toolbar"></div>').data("name", "".concat(r, "-").concat(m.id)));
                            for (var c = 0; c < o.buttons.length; c++) {
                                o.buttonsVisible !== undefined && (s = o.buttonsVisible);
                                var d = m.$tb.find('> .fr-command[data-cmd="' + o.buttons[c] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + o.buttons[c] + '"]'),
                                    f = null;
                                m.node.hasClass(d.next().get(0), "fr-dropdown-menu") && (f = d.next()), m.node.hasClass(d.next().get(0), "fr-options") && (d.removeClass("fr-hidden"), d.next().removeClass("fr-hidden"), d = d.parent()), d.removeClass("fr-hidden"), e.showMoreButtons && s <= a ? (i.append(d), f && i.append(f)) : (l.append(d), f && l.append(f)), a++
                            }
                            if (e.showMoreButtons && s < a) {
                                var p = m.$tb.find('.fr-command[data-cmd="'.concat(r, '"]'));
                                if (0 < p.length) p.removeClass("fr-hidden fr-open"); else {
                                    var u = r, h = V.COMMANDS[u];
                                    h.more_btn = !0, p = b(m.button.build(u, h, !0)), m.button.addButtons(p)
                                }
                                l.append(p)
                            }
                            t.push(l), e.showMoreButtons && n.push(i)
                        }
                    }
                    m.opts.toolbarBottom ? (m.$tb.append(n), m.$tb.find(".fr-newline").remove(), m.$tb.append('<div class="fr-newline"></div>'), m.$tb.append(t)) : (m.$tb.append(t), m.$tb.find(".fr-newline").remove(), m.$tb.append('<div class="fr-newline"></div>'), m.$tb.append(n)), m.$tb.removeClass("fr-toolbar-open"), m.$box.removeClass("fr-toolbar-open"), m.events.trigger("codeView.toggle")
                }
                S()
            }

            function n(e, t) {
                setTimeout(function () {
                    if ((!e || e.which != V.KEYCODE.ESC) && m.selection.inEditor() && m.core.hasFocus() && !m.popups.areVisible() && "false" != b(m.selection.blocks()[0]).closest("table").attr("contenteditable") && (m.opts.toolbarVisibleWithoutSelection || !m.selection.isCollapsed() && !m.keys.isIME() || t)) {
                        if (m.$tb.data("instance", m), !1 === m.events.trigger("toolbar.show", [e])) return;
                        m.$tb.show(), m.opts.toolbarContainer || m.position.forSelection(m.$tb), 1 < m.opts.zIndex ? m.$tb.css("z-index", m.opts.zIndex + 1) : m.$tb.css("z-index", null)
                    }
                }, 0)
            }

            function o(e) {
                return (!e || "blur" !== e.type || document.activeElement !== m.el) && (!(!e || "keydown" !== e.type || !m.keys.ctrlKey(e)) || (!!m.button.getButtons(".fr-dropdown.fr-active").next().find(m.o_doc.activeElement).length || void (!1 !== m.events.trigger("toolbar.hide") && m.$tb.hide())))
            }

            t[V.XS] = e(m.opts.toolbarButtonsXS || m.opts.toolbarButtons || V.TOOLBAR_BUTTONS_XS || V.TOOLBAR_BUTTONS || []), t[V.SM] = e(m.opts.toolbarButtonsSM || m.opts.toolbarButtons || V.TOOLBAR_BUTTONS_SM || V.TOOLBAR_BUTTONS || []), t[V.MD] = e(m.opts.toolbarButtonsMD || m.opts.toolbarButtons || V.TOOLBAR_BUTTONS_MD || V.TOOLBAR_BUTTONS || []), t[V.LG] = e(m.opts.toolbarButtons || V.TOOLBAR_BUTTONS || []);
            var i = null;

            function a(e) {
                clearTimeout(i), e && e.which === V.KEYCODE.ESC || (i = setTimeout(n, m.opts.typingTimer))
            }

            function s() {
                m.events.on("window.mousedown", o), m.events.on("keydown", o), m.events.on("blur", o), m.events.$on(m.$tb, "transitionend", ".fr-more-toolbar", function () {
                    m.position.forSelection(m.$tb)
                }), m.helpers.isMobile() || m.events.on("window.mouseup", n), m.helpers.isMobile() ? m.helpers.isIOS() || (m.events.on("window.touchend", n), m.browser.mozilla && setInterval(n, 200)) : m.events.on("window.keyup", a), m.events.on("keydown", function (e) {
                    e && e.which === V.KEYCODE.ESC && o()
                }), m.events.on("keydown", function (e) {
                    if (e.which === V.KEYCODE.ALT) return e.stopPropagation(), !1
                }, !0), m.events.$on(m.$wp, "scroll.toolbar", n), m.events.on("commands.after", n), m.helpers.isMobile() && (m.events.$on(m.$doc, "selectionchange", a), m.events.$on(m.$doc, "orientationchange", n))
            }

            function l() {
                m.$tb.html("").removeData().remove(), m.$tb = null, m.$second_tb && (m.$second_tb.html("").removeData().remove(), m.$second_tb = null)
            }

            function c() {
                m.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), m.$box.find(".fr-sticky-dummy").remove()
            }

            function d() {
                m.opts.theme && m.$tb.addClass("".concat(m.opts.theme, "-theme")), 1 < m.opts.zIndex && m.$tb.css("z-index", m.opts.zIndex + 1), "auto" !== m.opts.direction && m.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(m.opts.direction)), m.helpers.isMobile() ? m.$tb.addClass("fr-mobile") : m.$tb.addClass("fr-desktop"), m.opts.toolbarContainer ? (m.opts.toolbarInline && (s(), o()), m.opts.toolbarBottom ? m.$tb.addClass("fr-bottom") : m.$tb.addClass("fr-top")) : function e() {
                    m.opts.toolbarInline ? (m.$sc.append(m.$tb), m.$tb.data("container", m.$sc), m.$tb.addClass("fr-inline"), s(), m.opts.toolbarBottom = !1) : (m.opts.toolbarBottom && !m.helpers.isIOS() ? (m.$box.append(m.$tb), m.$tb.addClass("fr-bottom"), m.$box.addClass("fr-bottom")) : (m.opts.toolbarBottom = !1, m.$box.prepend(m.$tb), m.$tb.addClass("fr-top"), m.$box.addClass("fr-top")), m.$tb.addClass("fr-basic"), m.opts.toolbarSticky && (m.opts.toolbarStickyOffset && (m.opts.toolbarBottom ? m.$tb.css("bottom", m.opts.toolbarStickyOffset) : m.$tb.css("top", m.opts.toolbarStickyOffset)), m.position.addSticky(m.$tb)))
                }(), function t() {
                    var e = m.button.buildGroup(E());
                    m.$tb.append(e), S(), m.button.bindCommands(m.$tb)
                }(), function n() {
                    m.events.$on(b(m.o_win), "resize", r), m.events.$on(b(m.o_win), "orientationchange", r)
                }(), m.accessibility.registerToolbar(m.$tb), m.events.$on(m.$tb, "".concat(m._mousedown, " ").concat(m._mouseup), function (e) {
                    var t = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    if (t && "INPUT" !== t.tagName && !m.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1
                }, !0), m.helpers.isMobile() && m.events.$on(m.$tb, "click", function () {
                    m.$el.focus()
                }), m.events.$on(m.$tb, "transitionend", ".fr-more-toolbar", function () {
                    m.$box.hasClass("fr-fullscreen") && (m.opts.height = m.o_win.innerHeight - (m.opts.toolbarInline ? 0 : m.$tb.outerHeight() + (m.$second_tb ? m.$second_tb.outerHeight() : 0)), m.size.refresh())
                })
            }

            var f = !1;
            return {
                _init: function p() {
                    if (m.$sc = b(m.opts.scrollableContainer).first(), !m.$wp) return !1;
                    m.opts.toolbarInline || m.opts.toolbarBottom || (m.$second_tb = b(m.doc.createElement("div")).attr("class", "second-toolbar"), m.$box.append(m.$second_tb), (!1 !== m.ul || m.opts.attribution) && m.$second_tb.prepend(V.POWERED_BY)), m.opts.toolbarContainer ? (m.shared.$tb ? (m.$tb = m.shared.$tb, m.opts.toolbarInline && s()) : (m.shared.$tb = b(m.doc.createElement("DIV")), m.shared.$tb.addClass("fr-toolbar"), m.$tb = m.shared.$tb, b(m.opts.toolbarContainer).append(m.$tb), d(), m.$tb.data("instance", m)), m.opts.toolbarInline ? m.$box.addClass("fr-inline") : m.$box.addClass("fr-basic"), m.events.on("focus", function () {
                        m.$tb.data("instance", m)
                    }, !0), m.opts.toolbarInline = !1) : m.opts.toolbarInline ? (m.$box.addClass("fr-inline"), m.shared.$tb ? (m.$tb = m.shared.$tb, s()) : (m.shared.$tb = b(m.doc.createElement("DIV")), m.shared.$tb.addClass("fr-toolbar"), m.$tb = m.shared.$tb, d())) : (m.$box.addClass("fr-basic"), m.$tb = b(m.doc.createElement("DIV")), m.$tb.addClass("fr-toolbar"), d(), m.$tb.data("instance", m)), m.events.on("destroy", c, !0), m.events.on(m.opts.toolbarInline || m.opts.toolbarContainer ? "shared.destroy" : "destroy", l, !0), m.events.on("edit.on", function () {
                        m.$tb.removeClass("fr-disabled").removeAttr("aria-disabled")
                    }), m.events.on("edit.off", function () {
                        m.$tb.addClass("fr-disabled").attr("aria-disabled", !0)
                    }), function e() {
                        m.events.on("shortcut", function (e, t, n) {
                            var r;
                            if (t && !n ? r = m.$tb.find('.fr-command[data-cmd="'.concat(t, '"]')) : t && n && (r = m.$tb.find('.fr-command[data-cmd="'.concat(t, '"][data-param1="').concat(n, '"]'))), r.length && (e.preventDefault(), e.stopPropagation(), r.parents(".fr-toolbar").data("instance", m), "keydown" === e.type)) return m.button.exec(r), !1
                        })
                    }()
                }, hide: o, show: function u() {
                    if (!1 === m.events.trigger("toolbar.show")) return !1;
                    m.$tb.show()
                }, showInline: n, disable: function h() {
                    !f && m.$tb && (m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), f = !0)
                }, enable: function g() {
                    f && m.$tb && (m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), f = !1), m.button.bulkRefresh()
                }, setMoreToolbarsHeight: S
            }
        };
        var c = ["scroll", "wheel", "touchmove", "touchstart", "touchend"], d = ["webkit", "moz", "ms", "o"],
            f = ["transitionend"], o = document.createElement("div").style,
            i = ["Webkit", "Moz", "ms", "O", "css", "style"], s = {visibility: "hidden", display: "block"},
            r = ["focus", "blur", "click"], a = {}, l = function l(e, t) {
                return {
                    altKey: e.altKey,
                    bubbles: e.bubbles,
                    cancelable: e.cancelable,
                    changedTouches: e.changedTouches,
                    ctrlKey: e.ctrlKey,
                    detail: e.detail,
                    eventPhase: e.eventPhase,
                    metaKey: e.metaKey,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    shiftKey: e.shiftKey,
                    view: e.view,
                    "char": e["char"],
                    key: e.key,
                    keyCode: e.keyCode,
                    button: e.button,
                    buttons: e.buttons,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    offsetX: e.offsetX,
                    offsetY: e.offsetY,
                    pointerId: e.pointerId,
                    pointerType: e.pointerType,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    targetTouches: e.targetTouches,
                    toElement: e.toElement,
                    touches: e.touches,
                    type: e.type,
                    which: e.which,
                    target: e.target,
                    currentTarget: t,
                    originalEvent: e,
                    stopPropagation: function () {
                        e.stopPropagation()
                    },
                    stopImmediatePropagation: function () {
                        e.stopImmediatePropagation()
                    },
                    preventDefault: function () {
                        -1 === c.indexOf(e.type) && e.preventDefault()
                    }
                }
            }, p = function p(e) {
                return e.ownerDocument && e.ownerDocument.body.contains(e) || "#document" === e.nodeName || "HTML" === e.nodeName || e === window
            }, u = function u(n, r) {
                return function (e) {
                    var t = e.target;
                    if (r) for (r = g(r); t && t !== this;) t.matches && t.matches(g(r)) && n.call(t, l(e, t)), t = t.parentNode; else p(t) && n.call(t, l(e, t))
                }
            }, h = function h(e, t) {
                return new b(e, t)
            }, g = function g(e) {
                return e && "string" == typeof e ? e.replace(/^\s*>/g, ":scope >").replace(/,\s*>/g, ", :scope >") : e
            }, m = function m(e) {
                return "function" == typeof e && "number" != typeof e.nodeType
            }, v = h;
        h.fn = h.prototype = {
            constructor: h, length: 0, contains: function (e) {
                if (!e) return !1;
                if (Array.isArray(e)) {
                    for (var t = 0; t < e.length; t++) if (this.contains(e[t]) && this != e[t]) return !0;
                    return !1
                }
                for (var n = 0; n < this.length; n++) for (var r = e; r;) {
                    if (r == this[n] || r[0] && r[0].isEqualNode(this[n])) return !0;
                    r = r.parentNode
                }
                return !1
            }, findVisible: function (e) {
                for (var t = this.find(e), n = t.length - 1; 0 <= n; n--) v(t[n]).isVisible() || t.splice(n, 1);
                return t
            }, formatParams: function (t) {
                var e = "".concat(Object.keys(t).map(function (e) {
                    return "".concat(e, "=").concat(encodeURIComponent(t[e]))
                }).join("&"));
                return e || ""
            }, ajax: function (t) {
                var n = new XMLHttpRequest, e = this.formatParams(t.data);
                for (var r in "GET" === t.method.toUpperCase() && (t.url = e ? t.url + "?" + e : t.url), n.open(t.method, t.url, !0), t.withCredentials && (n.withCredentials = !0), t.crossDomain && n.setRequestHeader("Access-Control-Allow-Origin", "*"), t.headers) Object.prototype.hasOwnProperty.call(t.headers, r) && n.setRequestHeader(r, t.headers[r]);
                Object.prototype.hasOwnProperty.call(t.headers, "Content-Type") || ("json" === t.dataType ? n.setRequestHeader("Content-Type", "application/json") : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), n.onload = function () {
                    if (200 == n.status) {
                        var e = n.responseText;
                        "json" === t.dataType && (e = JSON.parse(e)), t.done(e, n.status, n)
                    } else t.fail(n)
                }, n.send(e)
            }, prevAll: function () {
                var e = v();
                if (!this[0]) return e;
                for (var t = this[0]; t && t.previousSibling;) t = t.previousSibling, e.push(t);
                return e
            }, index: function (e) {
                return e ? "string" == typeof e ? [].indexOf.call(v(e), this[0]) : [].indexOf.call(this, e.length ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, isVisible: function () {
                return !!this[0] && !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length)
            }, toArray: function () {
                return [].slice.call(this)
            }, get: function (e) {
                return null == e ? [].slice.call(this) : e < 0 ? this[e + this.length] : this[e]
            }, pushStack: function (e) {
                var t = h.merge(this.constructor(), e);
                return t.prevObject = this, t
            }, wrapAll: function (e) {
                var t;
                return this[0] && (m(e) && (e = e.call(this[0])), t = h(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            }, wrapInner: function (e) {
                if ("string" == typeof e) {
                    for (var t = e.split(" "), n = 0; n < t.length && 0 === t[n].trim().length;) n++;
                    if (n < t.length && (v(e).length && t[n].trim() === v(e)[0].tagName && (e = document.createElement(t[n].trim())), n++), "string" != typeof e) for (var r = v(e); n < t.length; n++) {
                        t[n] = t[n].trim();
                        var o = t[n].split("=");
                        r.attr(o[0], o[1].replace('"', ""))
                    }
                }
                for (; !this[0].firstChild && this[0].firstChild !== e;) e.appendChild(this[0].firstChild)
            }, wrap: function (t) {
                var n = m(t);
                return this.each(function (e) {
                    v(this).wrapAll(n ? t.call(this, e) : t)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    this.nodeName && this.nodeName.toLowerCase() === name.toLowerCase() || h(this).replaceWith(this.childNodes)
                })
            }, grep: function (e, t, n) {
                for (var r = [], o = 0, i = e.length, a = !n; o < i; o++) !t(e[o], o) !== a && r.push(e[o]);
                return r
            }, map: function (n) {
                return this.pushStack(h.map(this, function (e, t) {
                    return n.call(e, t, e)
                }))
            }, slice: function () {
                return this.pushStack([].slice.apply(this, arguments))
            }, each: function (e) {
                if (this.length) for (var t = 0; t < this.length && !1 !== e.call(this[t], t, this[t]); t++) ;
                return this
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (e) {
                var t = this.length, n = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= n && n < t ? [this[n]] : [])
            }, empty: function () {
                for (var e = 0; e < this.length; e++) this[e].innerHTML = ""
            }, contents: function () {
                for (var e = v(), t = 0; t < this.length; t++) for (var n = this[t].childNodes, r = 0; r < n.length; r++) e.push(n[r]);
                return e
            }, attr: function (e, t) {
                if ("object" === M(e)) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && null !== e[n] && this.attr(n, e[n]);
                    return this
                }
                if (void 0 === t) return 0 === this.length || !this[0].getAttribute && "checked" !== e ? undefined : "checked" === e ? this[0].checked : "tagName" === e ? this[0].tagName : this[0].getAttribute(e);
                if ("checked" === e) for (var r = 0; r < this.length; r++) this[r].checked = t; else if ("tagName" === e) for (var o = 0; o < this.length; o++) this[o].tagName = t; else for (var i = 0; i < this.length; i++) this[i].setAttribute(e, t);
                return this
            }, removeAttr: function (e) {
                for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute(e);
                return this
            }, hide: function () {
                return this.css("display", "none"), this
            }, show: function () {
                return this.css("display", "block"), this
            }, focus: function () {
                return this.length && this[0].focus(), this
            }, blur: function () {
                return this.length && this[0].blur(), this
            }, data: function (e, t) {
                if (void 0 !== t) {
                    for (var n = 0; n < this.length; n++) "object" !== M(this[n]["data-" + e] = t) && "function" != typeof t && this[n].setAttribute && this[n].setAttribute("data-" + e, t);
                    return this
                }
                if (void 0 !== t) return this.attr("data-" + e, t);
                if (0 === this.length) return undefined;
                for (var r = 0; r < this.length; r++) {
                    var o = this[r]["data-" + e];
                    if (null == o && this[r].getAttribute && (o = this[r].getAttribute("data-" + e)), void 0 !== o && null != o) return o
                }
                return undefined
            }, removeData: function (e) {
                for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute("data-" + e), this[t]["data-" + e] = null;
                return this
            }, getCorrectStyleName: function (e) {
                if (!a[e]) {
                    var t;
                    e in o && (t = e);
                    for (var n = e[0].toUpperCase() + e.slice(1), r = i.length; r--;) (e = i[r] + n) in o && (t = e);
                    a[e] = t
                }
                return a[e]
            }, css: function (e, t) {
                if (void 0 !== t) {
                    if (0 === this.length) return this;
                    ("string" != typeof t || "" === t.trim() || isNaN(t)) && "number" != typeof t || !/(margin)|(padding)|(height)|(width)|(top)|(left)|(right)|(bottom)/gi.test(e) || /(line-height)/gi.test(e) || (t += "px");
                    for (var n = 0; n < this.length; n++) e = v(this).getCorrectStyleName(e), this[n].style[e] = t;
                    return this
                }
                if ("string" == typeof e) {
                    if (0 === this.length) return undefined;
                    var r = this[0].ownerDocument || document, o = r.defaultView || r.parentWindow;
                    return e = v(this).getCorrectStyleName(e), o.getComputedStyle(this[0])[e]
                }
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && this.css(i, e[i]);
                return this
            }, toggleClass: function (e, t) {
                if (1 < e.split(" ").length) {
                    for (var n = e.split(" "), r = 0; r < n.length; r++) this.toggleClass(n[r], t);
                    return this
                }
                for (var o = 0; o < this.length; o++) void 0 === t ? this[o].classList.contains(e) ? this[o].classList.remove(e) : this[o].classList.add(e) : t ? this[o].classList.contains(e) || this[o].classList.add(e) : this[o].classList.contains(e) && this[o].classList.remove(e);
                return this
            }, addClass: function (e) {
                if (0 === e.length) return this;
                if (1 < e.split(" ").length) {
                    for (var t = e.split(" "), n = 0; n < t.length; n++) this.addClass(t[n]);
                    return this
                }
                for (var r = 0; r < this.length; r++) this[r].classList.add(e);
                return this
            }, removeClass: function (e) {
                if (1 < e.split(" ").length) {
                    for (var t = e.split(" "), n = 0; n < t.length; n++) t[n] = t[n].trim(), t[n].length && this.removeClass(t[n]);
                    return this
                }
                for (var r = 0; r < this.length; r++) e.length && this[r].classList.remove(e);
                return this
            }, getClass: function (e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }, stripAndCollapse: function (e) {
                return (e.match(/[^\x20\t\r\n\f]+/g) || []).join(" ")
            }, hasClass: function (e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++];) if (1 === n.nodeType && -1 < (" " + v(this).stripAndCollapse(v(this).getClass(n)) + " ").indexOf(t)) return !0;
                return !1
            }, scrollTop: function (e) {
                if (void 0 === e) return 0 === this.length ? undefined : this[0] === document ? document.documentElement.scrollTop : this[0].scrollTop;
                for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(document.documentElement.scrollLeft, e) : this[t].scrollTop = e
            }, scrollLeft: function (e) {
                if (void 0 === e) return 0 === this.length ? undefined : this[0] === document ? document.documentElement.scrollLeft : this[0].scrollLeft;
                for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(e, document.documentElement.scrollTop) : this[t].scrollLeft = e
            }, on: function (e, t, n) {
                if (1 < e.split(" ").length) {
                    for (var r = e.split(" "), o = 0; o < r.length; o++) if (-1 !== f.indexOf(e)) for (var i = 0; i < d.length; i++) this.on(d[i] + e[0].toUpperCase() + e.slice(1), t, n); else this.on(r[o], t, n);
                    return this
                }
                n = "function" == typeof t ? u(t, null) : u(n, t);
                for (var a = 0; a < this.length; a++) {
                    var s = v(this[a]);
                    s.data("events") || s.data("events", []), s.data("events").push([e, n]);
                    var l = e.split(".");
                    l = l[0], 0 <= c.indexOf(l) ? s.get(0).addEventListener(l, n, {passive: !0}) : s.get(0).addEventListener(l, n)
                }
            }, off: function (e) {
                if (1 < e.split(" ").length) {
                    for (var t = e.split(" "), n = 0; n < t.length; n++) this.off(t[n]);
                    return this
                }
                for (var r = 0; r < this.length; r++) {
                    var o = v(this[r]);
                    if (o.data("events")) {
                        var i = e.split(".");
                        i = i[0];
                        for (var a = o.data("events") || [], s = a.length - 1; 0 <= s; s--) {
                            var l = a[s];
                            l[0] == e && (o.get(0).removeEventListener(i, l[1]), a.splice(s, 1))
                        }
                    }
                }
            }, trigger: function (e) {
                for (var t = 0; t < this.length; t++) {
                    var n = void 0;
                    "function" == typeof Event ? n = 0 <= e.search(/^mouse/g) ? new MouseEvent(e, {
                        view: window,
                        cancelable: !0,
                        bubbles: !0
                    }) : new Event(e) : 0 <= e.search(/^mouse/g) ? (n = document.createEvent("MouseEvents")).initMouseEvent(e, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null) : (n = document.createEvent("Event")).initEvent(e, !0, !0), 0 <= r.indexOf(e) && "function" == typeof this[t][e] ? this[t][e]() : this[t].dispatchEvent(n)
                }
            }, triggerHandler: function () {
            }, val: function (e) {
                if (void 0 === e) return this[0].value;
                for (var t = 0; t < this.length; t++) this[t].value = e;
                return this
            }, siblings: function () {
                return v(this[0]).parent().children().not(this)
            }, find: function (e) {
                var t = v();
                if ("string" != typeof e) {
                    for (var n = 0; n < e.length; n++) for (var r = 0; r < this.length; r++) if (this[r] !== e[n] && v(this[r]).contains(e[n])) {
                        t.push(e[n]);
                        break
                    }
                    return t
                }
                var o = function o(e) {
                    return "object" === ("undefined" == typeof HTMLElement ? "undefined" : M(HTMLElement)) ? e instanceof HTMLElement : e && "object" === M(e) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
                };
                e = g(e);
                for (var i = 0; i < this.length; i++) if (this[i].querySelectorAll) {
                    var a = [];
                    e && "string" == typeof e ? a = this[i].querySelectorAll(e) : o(e) && (a = [e]);
                    for (var s = 0; s < a.length; s++) t.push(a[s])
                }
                return t
            }, children: function () {
                for (var e = v(), t = 0; t < this.length; t++) for (var n = this[t].children, r = 0; r < n.length; r++) e.push(n[r]);
                return e
            }, not: function (e) {
                if ("string" == typeof e) for (var t = this.length - 1; 0 <= t; t--) this[t].matches(e) && this.splice(t, 1); else if (e instanceof h) {
                    for (var n = this.length - 1; 0 <= n; n--) for (var r = 0; r < e.length; r++) if (this[n] === e[r]) {
                        this.splice(n, 1);
                        break
                    }
                } else for (var o = this.length - 1; 0 <= o; o--) this[o] === e[0] && this.splice(o, 1);
                return this
            }, add: function (e) {
                for (var t = 0; t < e.length; t++) this.push(e[t]);
                return this
            }, closest: function (e) {
                for (var t = 0; t < this.length; t++) {
                    var n = this[t].closest && this[t].closest(e);
                    if (n) return v(n)
                }
                return v()
            }, html: function (e) {
                if (void 0 === e) return 0 === this.length ? undefined : this[0].innerHTML;
                if ("string" == typeof e) for (var t = 0; t < this.length; t++) {
                    this[t].innerHTML = e;
                    for (var n = this[t].children, r = this[t].ownerDocument || document, o = 0; o < n.length; o++) if ("SCRIPT" === n[o].tagName) {
                        var i = r.createElement("script");
                        i.innerHTML = n[o].innerHTML, r.head.appendChild(i).parentNode.removeChild(i)
                    }
                } else {
                    this[0].innerHTML = "", this.append(e[0]);
                    var a = this[0].ownerDocument || document;
                    if ("SCRIPT" === e[0].tagName) {
                        var s = a.createElement("script");
                        s.innerHTML = e[0].innerHTML, a.head.appendChild(s).parentNode.removeChild(s)
                    }
                }
                return this
            }, text: function (e) {
                if (!e) return this.length ? this[0].textContent : "";
                for (var t = 0; t < this.length; t++) this[t].textContent = e
            }, after: function e(t) {
                if (t) if ("string" == typeof t) for (var n = 0; n < this.length; n++) {
                    var e = this[n];
                    if (e.nodeType != Node.ELEMENT_NODE) {
                        var r = e.ownerDocument.createElement("SPAN");
                        v(e).after(r), v(r).after(t).remove()
                    } else e.insertAdjacentHTML("afterend", t)
                } else {
                    var o = this[0];
                    if (o.nextSibling) if (t instanceof h) for (var i = 0; i < t.length; i++) o.nextSibling.parentNode.insertBefore(t[i], o.nextSibling); else o.nextSibling.parentNode.insertBefore(t, o.nextSibling); else v(o.parentNode).append(t)
                }
                return this
            }, clone: function (e) {
                for (var t = v(), n = 0; n < this.length; n++) t.push(this[n].cloneNode(e));
                return t
            }, replaceWith: function (e) {
                if ("string" == typeof e) for (var t = 0; t < this.length; t++) this[t].parentNode && (this[t].outerHTML = e); else if (e.length) for (var n = 0; n < this.length; n++) this.replaceWith(e[n]); else this.after(e).remove()
            }, insertBefore: function (e) {
                return v(e).before(this[0]), this
            }, before: function e(t) {
                if (t instanceof h) {
                    for (var n = 0; n < t.length; n++) this.before(t[n]);
                    return this
                }
                if (t) if ("string" == typeof t) for (var r = 0; r < this.length; r++) {
                    var e = this[r];
                    if (e.nodeType != Node.ELEMENT_NODE) {
                        var o = e.ownerDocument.createElement("SPAN");
                        v(e).before(o), v(o).before(t).remove()
                    } else e.parentNode && e.insertAdjacentHTML("beforebegin", t)
                } else {
                    var i = this[0];
                    if (i.parentNode) if (t instanceof h) for (var a = 0; a < t.length; a++) i.parentNode.insertBefore(t[a], i); else i.parentNode.insertBefore(t, i)
                }
                return this
            }, append: function (e) {
                if (0 == this.length) return this;
                if ("string" == typeof e) for (var t = 0; t < this.length; t++) {
                    var n = this[t], r = n.ownerDocument.createElement("SPAN");
                    v(n).append(r), v(r).after(e).remove()
                } else if (e instanceof h || Array.isArray(e)) for (var o = 0; o < e.length; o++) this.append(e[o]); else "function" != typeof e && this[0].appendChild(e);
                return this
            }, prepend: function (e) {
                if (0 == this.length) return this;
                if ("string" == typeof e) for (var t = 0; t < this.length; t++) {
                    var n = this[t], r = n.ownerDocument.createElement("SPAN");
                    v(n).prepend(r), v(r).before(e).remove()
                } else if (e instanceof h) for (var o = 0; o < e.length; o++) this.prepend(e[o]); else {
                    var i = this[0];
                    i.firstChild ? i.firstChild ? i.insertBefore(e, i.firstChild) : i.appendChild(e) : v(i).append(e)
                }
                return this
            }, remove: function () {
                for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            }, prev: function () {
                return this.length && this[0].previousElementSibling ? v(this[0].previousElementSibling) : v()
            }, next: function () {
                return this.length && this[0].nextElementSibling ? v(this[0].nextElementSibling) : v()
            }, nextAllVisible: function () {
                return this.next()
            }, prevAllVisible: function () {
                return this.prev()
            }, outerHeight: function (e) {
                if (0 === this.length) return undefined;
                var t = this[0];
                if (t === t.window) return t.innerHeight;
                var n = {}, r = this.isVisible();
                if (!r) for (var o in s) n[o] = t.style[o], t.style[o] = s[o];
                var i = t.offsetHeight;
                if (e && (i += parseInt(v(t).css("marginTop")) + parseInt(v(t).css("marginBottom"))), !r) for (var a in s) t.style[a] = n[a];
                return i
            }, outerWidth: function (e) {
                if (0 === this.length) return undefined;
                var t = this[0];
                if (t === t.window) return t.outerWidth;
                var n = {}, r = this.isVisible();
                if (!r) for (var o in s) n[o] = t.style[o], t.style[o] = s[o];
                var i = t.offsetWidth;
                if (e && (i += parseInt(v(t).css("marginLeft")) + parseInt(v(t).css("marginRight"))), !r) for (var a in s) t.style[a] = n[a];
                return i
            }, width: function (e) {
                if (e === undefined) return this[0] instanceof HTMLDocument ? this[0].body.offsetWidth : this[0].offsetWidth;
                this[0].style.width = e + "px"
            }, height: function (e) {
                var t = this[0];
                if (e === undefined) {
                    if (t instanceof HTMLDocument) {
                        var n = t.documentElement;
                        return Math.max(t.body.scrollHeight, n.scrollHeight, t.body.offsetHeight, n.offsetHeight, n.clientHeight)
                    }
                    return t.offsetHeight
                }
                t.style.height = e + "px"
            }, is: function (e) {
                return 0 !== this.length && ("string" == typeof e && this[0].matches ? this[0].matches(e) : e instanceof h ? this[0] == e[0] : this[0] == e)
            }, parent: function () {
                return 0 === this.length ? v() : v(this[0].parentNode)
            }, parents: function (e) {
                for (var t = v(), n = 0; n < this.length; n++) for (var r = this[n].parentNode; r && r != document && r.matches;) e ? r.matches(e) && t.push(r) : t.push(r), r = r.parentNode;
                return t
            }, parentsUntil: function (e, t) {
                var n = v();
                e instanceof h && 0 < e.length && (e = e[0]);
                for (var r = 0; r < this.length; r++) for (var o = this[r].parentNode; o && o != document && o.matches && o != e && this[r] != e && ("string" != typeof e || !o.matches(e));) t ? o.matches(t) && n.push(o) : n.push(o), o = o.parentNode;
                return n
            }, insertAfter: function (e) {
                var t = e.parent()[0];
                t && t.insertBefore(this[0], e[0].nextElementSibling)
            }, filter: function (e) {
                var t = v();
                if ("function" == typeof e) for (var n = 0; n < this.length; n++) e.call(this[n], this[n]) && t.push(this[n]); else if ("string" == typeof e) for (var r = 0; r < this.length; r++) this[r].matches(e) && t.push(this[r]);
                return t
            }, offset: function () {
                var e = this[0].getBoundingClientRect(), t = this[0].ownerDocument.defaultView;
                return {top: e.top + t.pageYOffset, left: e.left + t.pageXOffset}
            }, position: function () {
                return {left: this[0].offsetLeft, top: this[0].offsetTop}
            }, push: [].push, splice: [].splice
        }, h.extend = function (e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++) if (arguments[t]) for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
            return e
        }, h.merge = function (e, t) {
            for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
            return e.length = o, e
        }, h.map = function (e, t, n) {
            var r, o, i = 0, a = [];
            if (Array.isArray(e)) for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && a.push(o); else for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
            return [].concat.apply([], a)
        };
        var b = function b(e, t) {
            if (!e) return this;
            if ("string" == typeof e && "<" === e[0]) {
                var n = document.createElement("DIV");
                return n.innerHTML = e, v(n.firstElementChild)
            }
            if (t = t instanceof h ? t[0] : t, "string" != typeof e) return e instanceof h ? e : (this[0] = e, this.length = 1, this);
            e = g(e);
            for (var r = (t || document).querySelectorAll(e), o = 0; o < r.length; o++) this[o] = r[o];
            return this.length = r.length, this
        };
        b.prototype = h.prototype;
        var E = V;

        function S() {
            this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = h(this.doc), this.$win = h(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(E.PLUGINS)), this.opts.initOnClick ? (this.load(E.MODULES), this.$el.on("touchstart.init", function () {
                h(this).data("touched", !0)
            }), this.$el.on("touchmove.init", function () {
                h(this).removeData("touched")
            }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", function r(e) {
                if ("touchend" === e.type && !this.$el.data("touched")) return !0;
                if (1 === e.which || !e.which) {
                    this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(E.MODULES), this.load(E.PLUGINS);
                    var t = e.originalEvent && e.originalEvent.originalTarget;
                    if (t && "IMG" === t.tagName && h(t).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" === e.type && this.image && e.originalEvent && e.originalEvent.target && h(e.originalEvent.target).is("img")) {
                        var n = this;
                        setTimeout(function () {
                            n.image.edit(h(e.originalEvent.target))
                        }, 100)
                    }
                    this.ready = !0, this.events.trigger("initialized")
                }
            }.bind(this)), this.events.trigger("initializationDelayed")) : (this.load(E.MODULES), this.load(E.PLUGINS), h(this.o_win).scrollTop(this.c_scroll), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"))
        }

        return E.Bootstrap = function (e, t, n) {
            this.id = ++E.ID, this.$ = h;
            var r = {};
            "function" == typeof t && (n = t, t = {}), n && (t.events || (t.events = {}), t.events.initialized = n), t && t.documentReady && (r.toolbarButtons = [["fullscreen", "undo", "redo", "getPDF", "print"], ["bold", "italic", "underline", "textColor", "backgroundColor", "clearFormatting"], ["alignLeft", "alignCenter", "alignRight", "alignJustify"], ["formatOL", "formatUL", "indent", "outdent"], ["paragraphFormat"], ["fontFamily"], ["fontSize"], ["insertLink", "insertImage", "quote"]], r.paragraphFormatSelection = !0, r.fontFamilySelection = !0, r.fontSizeSelection = !0, r.placeholderText = "", r.quickInsertEnabled = !1, r.charCounterCount = !1), this.opts = Object.assign({}, Object.assign({}, E.DEFAULTS, r, "object" === M(t) && t));
            var o = JSON.stringify(this.opts);
            E.OPTS_MAPPING[o] = E.OPTS_MAPPING[o] || this.id, this.sid = E.OPTS_MAPPING[o], E.SHARED[this.sid] = E.SHARED[this.sid] || {}, this.shared = E.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = h(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow, this.c_scroll = h(this.o_win).scrollTop(), this._init()
        }, E.Bootstrap.prototype._init = function () {
            var e = this.$oel.get(0).tagName;
            this.$oel.closest("label").length;
            var t = function () {
                "TEXTAREA" !== e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = h('<iframe src="about:blank" frameBorder="0">'), this.$wp = h("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.iframe_document = this.$iframe.get(0).contentWindow.document, this.$el = h(this.iframe_document.querySelector("body")), this.el = this.$el.get(0), this.$head = h(this.iframe_document.querySelector("head")), this.$html = h(this.iframe_document.querySelector("html"))) : (this.$el = h(this.o_doc.createElement("DIV")), this.el = this.$el.get(0), this.$wp = h(this.o_doc.createElement("DIV")).append(this.$el), this.$box.html(this.$wp)), setTimeout(S.bind(this), 0)
            }.bind(this), n = function () {
                this.$box = h("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val();
                var e = this;
                this.$oel.parents("form").on("submit.".concat(this.id), function () {
                    e.events.trigger("form.submit")
                }), this.$oel.parents("form").on("reset.".concat(this.id), function () {
                    e.events.trigger("form.reset")
                }), t()
            }.bind(this), r = function () {
                this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, setTimeout(S.bind(this), 0)
            }.bind(this), o = function () {
                this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, setTimeout(S.bind(this), 0)
            }.bind(this), i = function () {
                this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function (e) {
                    e.preventDefault()
                }), setTimeout(S.bind(this), 0)
            }.bind(this);
            this.opts.editInPopup ? i() : "TEXTAREA" === e ? n() : "A" === e ? r() : "IMG" === e ? o() : "BUTTON" === e || "INPUT" === e ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, i()) : t()
        }, E.Bootstrap.prototype.load = function (e) {
            for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
                if (this[t]) continue;
                if (E.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue;
                if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" === t)) return !1
            }
        }, E.Bootstrap.prototype.destroy = function () {
            this.destrying = !0, this.shared.count--, this.events && this.events.$off();
            var e = this.html && this.html.get();
            if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events && (this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", [], !0)), 0 === this.shared.count) {
                for (var t in this.shared) Object.prototype.hasOwnProperty.call(this.shared, t) && (this.shared[t] = null, E.SHARED[this.sid][t] = null);
                delete E.SHARED[this.sid]
            }
            this.$oel.parents("form").off(".".concat(this.id)), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core && this.core.destroy(e), E.INSTANCES.splice(E.INSTANCES.indexOf(this), 1)
        }, V
    });

});

;/*!node_modules/froala-editor/js/plugins/align.min.js*/
amis.define('c54224f', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (n, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(n.FroalaEditor)
    }(this, function (i) {
        "use strict";
        (i = i && i.hasOwnProperty("default") ? i["default"] : i).PLUGINS.align = function (a) {
            var l = a.$;
            return {
                apply: function r(n) {
                    var t = a.selection.element();
                    if (l(t).parents(".fr-img-caption").length) l(t).css("text-align", n); else {
                        a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();
                        for (var e = a.selection.blocks(), i = 0; i < e.length; i++) l(e[i]).css("text-align", n).removeClass("fr-temp-div"), "" === l(e[i]).attr("class") && l(e[i]).removeAttr("class"), "" === l(e[i]).attr("style") && l(e[i]).removeAttr("style");
                        a.selection.save(), a.html.unwrap(), a.selection.restore()
                    }
                }, refresh: function i(n) {
                    var t = a.selection.blocks();
                    if (t.length) {
                        var e = a.helpers.getAlignment(l(t[0]));
                        n.find("> *").first().replaceWith(a.icon.create("align-".concat(e)))
                    }
                }, refreshOnShow: function o(n, t) {
                    var e = a.selection.blocks();
                    if (e.length) {
                        var i = a.helpers.getAlignment(l(e[0]));
                        t.find('a.fr-command[data-param1="'.concat(i, '"]')).addClass("fr-active").attr("aria-selected", !0)
                    }
                }, refreshForToolbar: function s(n) {
                    var t = a.selection.blocks();
                    if (t.length) {
                        var e = a.helpers.getAlignment(l(t[0]));
                        e = e.charAt(0).toUpperCase() + e.slice(1), "align".concat(e) === n.attr("data-cmd") && n.addClass("fr-active")
                    }
                }
            }
        }, i.DefineIcon("align", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), i.DefineIcon("align-left", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), i.DefineIcon("align-right", {
            NAME: "align-right",
            SVG_KEY: "alignRight"
        }), i.DefineIcon("align-center", {
            NAME: "align-center",
            SVG_KEY: "alignCenter"
        }), i.DefineIcon("align-justify", {
            NAME: "align-justify",
            SVG_KEY: "alignJustify"
        }), i.RegisterCommand("align", {
            type: "dropdown",
            title: "Align",
            options: {left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify"},
            html: function () {
                var n = '<ul class="fr-dropdown-list" role="presentation">', t = i.COMMANDS.align.options;
                for (var e in t) t.hasOwnProperty(e) && (n += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align"data-param1="\n        '.concat(e, '" title="').concat(this.language.translate(t[e]), '">').concat(this.icon.create("align-".concat(e)), '<span class="fr-sr-only">\n        ').concat(this.language.translate(t[e]), "</span></a></li>"));
                return n += "</ul>"
            },
            callback: function (n, t) {
                this.align.apply(t)
            },
            refresh: function (n) {
                this.align.refresh(n)
            },
            refreshOnShow: function (n, t) {
                this.align.refreshOnShow(n, t)
            },
            plugin: "align"
        }), i.RegisterCommand("alignLeft", {
            type: "button",
            icon: "align-left",
            title: "Align Left",
            callback: function () {
                this.align.apply("left")
            },
            refresh: function (n) {
                this.align.refreshForToolbar(n)
            },
            plugin: "align"
        }), i.RegisterCommand("alignRight", {
            type: "button",
            icon: "align-right",
            title: "Align Right",
            callback: function () {
                this.align.apply("right")
            },
            refresh: function (n) {
                this.align.refreshForToolbar(n)
            },
            plugin: "align"
        }), i.RegisterCommand("alignCenter", {
            type: "button",
            icon: "align-center",
            title: "Align Center",
            callback: function () {
                this.align.apply("center")
            },
            refresh: function (n) {
                this.align.refreshForToolbar(n)
            },
            plugin: "align"
        }), i.RegisterCommand("alignJustify", {
            type: "button",
            icon: "align-justify",
            title: "Align Justify",
            callback: function () {
                this.align.apply("justify")
            },
            refresh: function (n) {
                this.align.refreshForToolbar(n)
            },
            plugin: "align"
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/colors.min.js*/
amis.define('c5748df', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (o, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(o.FroalaEditor)
    }(this, function (k) {
        "use strict";
        k = k && k.hasOwnProperty("default") ? k["default"] : k, Object.assign(k.POPUP_TEMPLATES, {
            "textColor.picker": "[_BUTTONS_][_TEXT_COLORS_][_CUSTOM_COLOR_]",
            "backgroundColor.picker": "[_BUTTONS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]"
        }), Object.assign(k.DEFAULTS, {
            colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
            colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
            colorsStep: 7,
            colorsHEXInput: !0,
            colorsButtons: ["colorsBack", "|", "-"]
        }), k.PLUGINS.colors = function (g) {
            var E = g.$,
                l = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer- \n  '.concat(g.id, '"><div class="fr-input-line"><input maxlength="7" id="[ID]"\n  type="text" placeholder="').concat(g.language.translate("HEX Color"), '" \n  tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button \n  type="button" class="fr-command fr-submit" data-cmd="[COMMAND]" tabIndex="2" role="button">\n  ').concat(g.language.translate("OK"), "</button></div></div>");

            function s(o) {
                for (var t = "text" === o ? g.opts.colorsText : g.opts.colorsBackground, r = '<div class="fr-color-set fr-'.concat(o, '-color fr-selected-set">'), e = 0; e < t.length; e++) 0 !== e && e % g.opts.colorsStep == 0 && (r += "<br>"), "REMOVE" !== t[e] ? r += '<span class="fr-command fr-select-color" style="background:'.concat(t[e], ';" \n        tabIndex="-1" aria-selected="false" role="button" data-cmd="apply').concat(o, 'Color" \n        data-param1="').concat(t[e], '"><span class="fr-sr-only"> ').concat(g.language.translate("Color")).concat(t[e], " \n        &nbsp;&nbsp;&nbsp;</span></span>") : r += '<span class="fr-command fr-select-color" data-cmd="apply'.concat(o, 'Color"\n         tabIndex="-1" role="button" data-param1="REMOVE" \n         title="').concat(g.language.translate("Clear Formatting"), '">').concat(g.icon.create("remove"), ' \n        <span class="fr-sr-only"> ').concat(g.language.translate("Clear Formatting"), " </span></span>");
                return "".concat(r, "</div>")
            }

            function i(o) {
                var t, r = g.popups.get("".concat(o, "Color.picker")), e = E(g.selection.element());
                t = "background" === o ? "background-color" : "color";
                var c = r.find(".fr-".concat(o, "-color .fr-select-color"));
                for (c.find(".fr-selected-color").remove(), c.removeClass("fr-active-item"), c.not('[data-param1="REMOVE"]').attr("aria-selected", !1); e.get(0) !== g.el;) {
                    if ("transparent" !== e.css(t) && "rgba(0, 0, 0, 0)" !== e.css(t)) {
                        var a = r.find(".fr-".concat(o, '-color .fr-select-color[data-param1="').concat(g.helpers.RGBToHex(e.css(t)), '"]'));
                        a.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'), a.addClass("fr-active-item").attr("aria-selected", !0);
                        break
                    }
                    e = e.parent()
                }
                !function n(o) {
                    var t = g.popups.get("".concat(o, "Color.picker")),
                        r = t.find(".fr-".concat(o, "-color .fr-active-item")).attr("data-param1"),
                        e = t.find(".fr-color-hex-layer input");
                    r || (r = "");
                    e.length && E(e.val(r).input).trigger("change")
                }(o)
            }

            function e(o) {
                "REMOVE" !== o ? g.format.applyStyle("background-color", g.helpers.HEXtoRGB(o)) : g.format.removeStyle("background-color"), g.popups.hide("backgroundColor.picker")
            }

            function c(o) {
                "REMOVE" !== o ? g.format.applyStyle("color", g.helpers.HEXtoRGB(o)) : g.format.removeStyle("color"), g.popups.hide("textColor.picker")
            }

            return {
                showColorsPopup: function p(o) {
                    var t = g.$tb.find('.fr-command[data-cmd="'.concat(o, '"]')),
                        r = g.popups.get("".concat(o, ".picker"));
                    if (r || (r = function n(o) {
                        var t = "";
                        g.opts.toolbarInline && 0 < g.opts.colorsButtons.length && (t += '<div class="fr-buttons fr-colors-buttons fr-tabs">\n        '.concat(g.button.buildList(g.opts.colorsButtons), "\n        </div>"));
                        var r, e = "";
                        r = "textColor" === o ? (g.opts.colorsHEXInput && (e = l.replace(/\[ID\]/g, "fr-color-hex-layer-text-".concat(g.id)).replace(/\[COMMAND\]/g, "customTextColor")), {
                            buttons: t,
                            text_colors: s("text"),
                            custom_color: e
                        }) : (g.opts.colorsHEXInput && (e = l.replace(/\[ID\]/g, "fr-color-hex-layer-background-".concat(g.id)).replace(/\[COMMAND\]/g, "customBackgroundColor")), {
                            buttons: t,
                            background_colors: s("background"),
                            custom_color: e
                        });
                        var c = g.popups.create("".concat(o, ".picker"), r);
                        return function a(C, b) {
                            g.events.on("popup.tab", function (o) {
                                var t = E(o.currentTarget);
                                if (!g.popups.isVisible(b) || !t.is("span")) return !0;
                                var r = o.which, e = !0;
                                if (k.KEYCODE.TAB === r) {
                                    var c = C.find(".fr-buttons");
                                    e = !g.accessibility.focusToolbar(c, !!o.shiftKey)
                                } else if (k.KEYCODE.ARROW_UP === r || k.KEYCODE.ARROW_DOWN === r || k.KEYCODE.ARROW_LEFT === r || k.KEYCODE.ARROW_RIGHT === r) {
                                    if (t.is("span.fr-select-color")) {
                                        var a = t.parent().find("span.fr-select-color"), n = a.index(t),
                                            l = g.opts.colorsStep, s = Math.floor(a.length / l), i = n % l,
                                            p = Math.floor(n / l), u = p * l + i, d = s * l;
                                        k.KEYCODE.ARROW_UP === r ? u = ((u - l) % d + d) % d : k.KEYCODE.ARROW_DOWN === r ? u = (u + l) % d : k.KEYCODE.ARROW_LEFT === r ? u = ((u - 1) % d + d) % d : k.KEYCODE.ARROW_RIGHT === r && (u = (u + 1) % d);
                                        var f = E(a.get(u));
                                        g.events.disableBlur(), f.focus(), e = !1
                                    }
                                } else k.KEYCODE.ENTER === r && (g.button.exec(t), e = !1);
                                return !1 === e && (o.preventDefault(), o.stopPropagation()), e
                            }, !0)
                        }(c, "".concat(o, ".picker")), c
                    }(o)), !r.hasClass("fr-active")) if (g.popups.setContainer("".concat(o, ".picker"), g.$tb), i("textColor" === o ? "text" : "background"), t.isVisible()) {
                        var e = g.button.getPosition(t), c = e.left, a = e.top;
                        g.popups.show("".concat(o, ".picker"), c, a, t.outerHeight())
                    } else g.position.forSelection(r), g.popups.show("".concat(o, ".picker"))
                }, background: e, customColor: function a(o) {
                    var t = g.popups.get("".concat(o, "Color.picker")).find(".fr-color-hex-layer input");
                    if (t.length) {
                        var r = t.val();
                        "background" === o ? e(r) : c(r)
                    }
                }, text: c, back: function o() {
                    g.popups.hide("textColor.picker"), g.popups.hide("backgroundColor.picker"), g.toolbar.showInline()
                }
            }
        }, k.DefineIcon("textColor", {
            NAME: "tint",
            SVG_KEY: "textColor"
        }), k.RegisterCommand("textColor", {
            title: "Text Color",
            undo: !1,
            focus: !0,
            refreshOnCallback: !1,
            popup: !0,
            callback: function () {
                this.popups.isVisible("textColor.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("textColor.picker")) : this.colors.showColorsPopup("textColor")
            }
        }), k.RegisterCommand("applytextColor", {
            undo: !0, callback: function (o, t) {
                this.colors.text(t)
            }
        }), k.RegisterCommand("customTextColor", {
            title: "OK", undo: !0, callback: function () {
                this.colors.customColor("text")
            }
        }), k.DefineIcon("backgroundColor", {
            NAME: "paint-brush",
            SVG_KEY: "backgroundColor"
        }), k.RegisterCommand("backgroundColor", {
            title: "Background Color",
            undo: !1,
            focus: !0,
            refreshOnCallback: !1,
            popup: !0,
            callback: function () {
                this.popups.isVisible("backgroundColor.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("backgroundColor.picker")) : this.colors.showColorsPopup("backgroundColor")
            }
        }), k.RegisterCommand("applybackgroundColor", {
            undo: !0, callback: function (o, t) {
                this.colors.background(t)
            }
        }), k.RegisterCommand("customBackgroundColor", {
            title: "OK", undo: !0, callback: function () {
                this.colors.customColor("background")
            }
        }), k.DefineIcon("colorsBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), k.RegisterCommand("colorsBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.colors.back()
            }
        }), k.DefineIcon("remove", {NAME: "eraser", SVG_KEY: "remove"})
    });

});

;/*!node_modules/froala-editor/js/plugins/char_counter.min.js*/
amis.define('8e07b58', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], e) : e(t.FroalaEditor)
    }(this, function (i) {
        "use strict";
        i = i && i.hasOwnProperty("default") ? i["default"] : i, Object.assign(i.DEFAULTS, {
            charCounterMax: -1,
            charCounterCount: !0
        }), i.PLUGINS.charCounter = function (n) {
            var r, e = n.$, o = function o() {
                return (n.el.textContent || "").replace(/\u200B/g, "").length
            };

            function t(t) {
                if (n.opts.charCounterMax < 0) return !0;
                if (o() < n.opts.charCounterMax) return !0;
                var e = t.which;
                return !(!n.keys.ctrlKey(t) && n.keys.isCharacter(e) || e === i.KEYCODE.IME) || (t.preventDefault(), t.stopPropagation(), n.events.trigger("charCounter.exceeded"), !1)
            }

            function a(t) {
                return n.opts.charCounterMax < 0 ? t : e("<div>").html(t).text().length + o() <= n.opts.charCounterMax ? t : (n.events.trigger("charCounter.exceeded"), "")
            }

            function c() {
                if (n.opts.charCounterCount) {
                    var t = o() + (0 < n.opts.charCounterMax ? "/" + n.opts.charCounterMax : "");
                    r.text("".concat(n.language.translate("Characters"), " : ").concat(t)), n.opts.toolbarBottom && r.css("margin-bottom", n.$tb.outerHeight(!0));
                    var e = n.$wp.get(0).offsetWidth - n.$wp.get(0).clientWidth;
                    0 <= e && ("rtl" == n.opts.direction ? r.css("margin-left", e) : r.css("margin-right", e))
                }
            }

            return {
                _init: function u() {
                    return !!n.$wp && !!n.opts.charCounterCount && ((r = e(document.createElement("span")).attr("class", "fr-counter")).css("bottom", n.$wp.css("border-bottom-width")), n.$second_tb && n.$second_tb.append(r), n.events.on("keydown", t, !0), n.events.on("paste.afterCleanup", a), n.events.on("keyup contentChanged input", function () {
                        n.events.trigger("charCounter.update")
                    }), n.events.on("charCounter.update", c), n.events.trigger("charCounter.update"), void n.events.on("destroy", function () {
                        e(n.o_win).off("resize.char".concat(n.id)), r.removeData().remove(), r = null
                    }))
                }, count: o
            }
        }
    });

});

;/*!node_modules/froala-editor/js/plugins/code_view.min.js*/
amis.define('a28273e', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {
            codeMirror: window.CodeMirror,
            codeMirrorOptions: {
                lineNumbers: !0,
                tabMode: "indent",
                indentWithTabs: !0,
                lineWrapping: !0,
                mode: "text/html",
                tabSize: 2
            },
            codeBeautifierOptions: {
                end_with_newline: !0,
                indent_inner_html: !0,
                extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"],
                brace_style: "expand",
                indent_char: "\t",
                indent_size: 1,
                wrap_line_length: 0
            },
            codeViewKeepActiveButtons: ["fullscreen"]
        }), e.PLUGINS.codeView = function (c) {
            var d, f, h = c.$, p = function p() {
                return c.$box.hasClass("fr-code-view")
            };

            function u() {
                return f ? f.getValue() : d.val()
            }

            function g() {
                p() && (f && f.setSize(null, c.opts.height ? c.opts.height : "auto"), c.opts.heightMin || c.opts.height ? (c.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", c.opts.heightMin || c.opts.height), d.css("height", c.opts.height)) : c.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", ""))
            }

            var m, b = !1;

            function v() {
                p() && c.events.trigger("blur")
            }

            function w() {
                p() && b && c.events.trigger("focus")
            }

            function o(e) {
                d || (!function l() {
                    d = h('<textarea class="fr-code" tabIndex="-1">'), c.$wp.append(d), d.attr("dir", c.opts.direction), c.$box.hasClass("fr-basic") || (m = h('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch'.concat(c.helpers.isMobile() ? "" : " fr-desktop", '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>')), c.$box.append(m), c.events.bindClick(c.$box, "a.html-switch", function () {
                        c.events.trigger("commands.before", ["html"]), M(!1), c.events.trigger("commands.after", ["html"])
                    }));
                    var e = function e() {
                        return !p()
                    };
                    c.events.on("buttons.refresh", e), c.events.on("copy", e, !0), c.events.on("cut", e, !0), c.events.on("paste", e, !0), c.events.on("destroy", x, !0), c.events.on("html.set", function () {
                        p() && M(!0)
                    }), c.events.on("codeView.update", g), c.events.on("codeView.toggle", function () {
                        c.$box.hasClass("fr-code-view") && M()
                    }), c.events.on("form.submit", function () {
                        p() && (c.html.set(u()), c.events.trigger("contentChanged", [], !0))
                    }, !0)
                }(), !f && c.opts.codeMirror ? ((f = c.opts.codeMirror.fromTextArea(d.get(0), c.opts.codeMirrorOptions)).on("blur", v), f.on("focus", w)) : (c.events.$on(d, "keydown keyup change input", function () {
                    c.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = "".concat(this.scrollHeight, "px"))
                }), c.events.$on(d, "blur", v), c.events.$on(d, "focus", w))), c.undo.saveStep(), c.html.cleanEmptyTags(), c.html.cleanWhiteTags(!0), c.core.hasFocus() && (c.core.isEmpty() || (c.selection.save(), c.$el.find('.fr-marker[data-type="true"]').first().replaceWith('<span class="fr-tmp fr-sm">F</span>'), c.$el.find('.fr-marker[data-type="false"]').last().replaceWith('<span class="fr-tmp fr-em">F</span>')));
                var t = c.html.get(!1, !0);
                c.$el.find("span.fr-tmp").remove(), c.$box.toggleClass("fr-code-view", !0);
                var r, o, n = !1;
                if (c.core.hasFocus() && (n = !0, c.events.disableBlur(), c.$el.blur()), t = (t = t.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM")).replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"), c.codeBeautifier && !t.includes("fr-embedly") && (t = c.codeBeautifier.run(t, c.opts.codeBeautifierOptions)), f) {
                    r = t.indexOf("FROALA-SM"), (o = t.indexOf("FROALA-EM")) < r ? r = o : o -= 9;
                    var s = (t = t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).substring(0, r).length - t.substring(0, r).replace(/\n/g, "").length,
                        i = t.substring(0, o).length - t.substring(0, o).replace(/\n/g, "").length;
                    r = t.substring(0, r).length - t.substring(0, t.substring(0, r).lastIndexOf("\n") + 1).length, o = t.substring(0, o).length - t.substring(0, t.substring(0, o).lastIndexOf("\n") + 1).length, f.setSize(null, c.opts.height ? c.opts.height : "auto"), c.opts.heightMin && c.$box.find(".CodeMirror-scroll").css("min-height", c.opts.heightMin), f.setValue(t), b = !n, f.focus(), b = !0, f.setSelection({
                        line: s,
                        ch: r
                    }, {line: i, ch: o}), f.refresh(), f.clearHistory()
                } else {
                    r = t.indexOf("FROALA-SM"), o = t.indexOf("FROALA-EM") - 9, c.opts.heightMin && d.css("min-height", c.opts.heightMin), c.opts.height && d.css("height", c.opts.height), c.opts.heightMax && d.css("max-height", c.opts.height || c.opts.heightMax), d.val(t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
                    var a = h(c.o_doc).scrollTop();
                    b = !n, d.focus(), b = !0, d.get(0).setSelectionRange(r, o), h(c.o_doc).scrollTop(a)
                }
                c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").not(e).filter(function () {
                    return c.opts.codeViewKeepActiveButtons.indexOf(h(this).data("cmd")) < 0
                }).addClass("fr-disabled").attr("aria-disabled", !0), e.addClass("fr-active").attr("aria-pressed", !0), !c.helpers.isMobile() && c.opts.toolbarInline && c.toolbar.hide()
            }

            function M(e) {
                void 0 === e && (e = !p());
                var t = c.$tb.find('.fr-command[data-cmd="html"]');
                e ? (c.popups.hideAll(), o(t)) : (c.$box.toggleClass("fr-code-view", !1), function r(e) {
                    var t = u();
                    c.html.set(t), c.$el.blur(), c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").not(e).removeClass("fr-disabled").attr("aria-disabled", !1), e.removeClass("fr-active").attr("aria-pressed", !1), c.selection.setAtStart(c.el), c.selection.restore(), c.placeholder.refresh(), c.undo.saveStep()
                }(t), c.events.trigger("codeView.update"))
            }

            function x() {
                p() && M(!1), f && f.toTextArea(), d.val("").removeData().remove(), d = null, m && (m.remove(), m = null)
            }

            return {
                _init: function e() {
                    if (c.events.on("focus", function () {
                        c.opts.toolbarContainer && function t() {
                            var e = c.$tb.find('.fr-command[data-cmd="html"]');
                            p() ? (c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").not(e).filter(function () {
                                return c.opts.codeViewKeepActiveButtons.indexOf(h(this).data("cmd")) < 0
                            }).addClass("fr-disabled").attr("aria-disabled", !1), e.addClass("fr-active").attr("aria-pressed", !1)) : (c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").not(e).removeClass("fr-disabled").attr("aria-disabled", !1), e.removeClass("fr-active").attr("aria-pressed", !1))
                        }()
                    }), !c.$wp) return !1
                }, toggle: M, isActive: p, get: u
            }
        }, e.RegisterCommand("html", {
            title: "Code View",
            undo: !1,
            focus: !1,
            forcedRefresh: !0,
            toggle: !0,
            callback: function () {
                this.codeView.toggle()
            },
            plugin: "codeView"
        }), e.DefineIcon("html", {NAME: "code", SVG_KEY: "codeView"})
    });

});

;/*!node_modules/froala-editor/js/plugins/draggable.min.js*/
amis.define('73ed191', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (c) {
        "use strict";
        c = c && c.hasOwnProperty("default") ? c["default"] : c, Object.assign(c.DEFAULTS, {dragInline: !0}), c.PLUGINS.draggable = function (g) {
            var d = g.$;

            function e(e) {
                return !(!e.originalEvent || !e.originalEvent.target || e.originalEvent.target.nodeType !== Node.TEXT_NODE) || (e.target && "A" === e.target.tagName && 1 === e.target.childNodes.length && "IMG" === e.target.childNodes[0].tagName && (e.target = e.target.childNodes[0]), d(e.target).hasClass("fr-draggable") ? (g.undo.canDo() || g.undo.saveStep(), g.opts.dragInline ? g.$el.attr("contenteditable", !0) : g.$el.attr("contenteditable", !1), g.opts.toolbarInline && g.toolbar.hide(), d(e.target).addClass("fr-dragging"), g.browser.msie || g.browser.edge || g.selection.clear(), void e.originalEvent.dataTransfer.setData("text", "Froala")) : (e.preventDefault(), !1))
            }

            var p, v = function v(e) {
                return !(e && ("HTML" === e.tagName || "BODY" === e.tagName || g.node.isElement(e)))
            };

            function m(e, t, r) {
                if (g.opts.iframe) {
                    var n = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-top")),
                        a = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-left"));
                    e += g.$iframe.offset().top + n, t += g.$iframe.offset().left + a
                }
                p.offset().top !== e && p.css("top", e), p.offset().left !== t && p.css("left", t), p.width() !== r && p.css("width", r)
            }

            function t(e) {
                e.originalEvent.dataTransfer.dropEffect = "move", g.opts.dragInline ? (!function r() {
                    for (var e = null, t = 0; t < c.INSTANCES.length; t++) if ((e = c.INSTANCES[t].$el.find(".fr-dragging")).length) return e.get(0)
                }() || g.browser.msie || g.browser.edge) && e.preventDefault() : (e.preventDefault(), function f(e) {
                    var t = g.doc.elementFromPoint(e.originalEvent.pageX - g.win.pageXOffset, e.originalEvent.pageY - g.win.pageYOffset);
                    if (!v(t)) {
                        for (var r = 0, n = t; !v(n) && n === t && 0 < e.originalEvent.pageY - g.win.pageYOffset - r;) r++, n = g.doc.elementFromPoint(e.originalEvent.pageX - g.win.pageXOffset, e.originalEvent.pageY - g.win.pageYOffset - r);
                        (!v(n) || p && 0 === g.$el.find(n).length && n !== p.get(0)) && (n = null);
                        for (var a = 0, o = t; !v(o) && o === t && e.originalEvent.pageY - g.win.pageYOffset + a < d(g.doc).height();) a++, o = g.doc.elementFromPoint(e.originalEvent.pageX - g.win.pageXOffset, e.originalEvent.pageY - g.win.pageYOffset + a);
                        (!v(o) || p && 0 === g.$el.find(o).length && o !== p.get(0)) && (o = null), t = null === o && n ? n : o && null === n ? o : o && n ? r < a ? n : o : null
                    }
                    if (d(t).hasClass("fr-drag-helper")) return !1;
                    if (t && !g.node.isBlock(t) && (t = g.node.blockParent(t)), t && 0 <= ["TD", "TH", "TR", "THEAD", "TBODY"].indexOf(t.tagName) && (t = d(t).parents("table").get(0)), t && 0 <= ["LI"].indexOf(t.tagName) && (t = d(t).parents("UL, OL").get(0)), t && !d(t).hasClass("fr-drag-helper")) {
                        var i;
                        p || (c.$draggable_helper || (c.$draggable_helper = d(document.createElement("div")).attr("class", "fr-drag-helper")), p = c.$draggable_helper, g.events.on("shared.destroy", function () {
                            p.html("").removeData().remove(), p = null
                        }, !0)), i = e.originalEvent.pageY < d(t).offset().top + d(t).outerHeight() / 2;
                        var l = d(t), s = 0;
                        i || 0 !== l.next().length ? (i || (l = l.next()), "before" === p.data("fr-position") && l.is(p.data("fr-tag")) || (0 < l.prev().length && (s = parseFloat(l.prev().css("margin-bottom")) || 0), s = Math.max(s, parseFloat(l.css("margin-top")) || 0), m(l.offset().top - s / 2 - g.$box.offset().top, l.offset().left - g.win.pageXOffset - g.$box.offset().left, l.width()), p.data("fr-position", "before"))) : "after" === p.data("fr-position") && l.is(p.data("fr-tag")) || (s = parseFloat(l.css("margin-bottom")) || 0, m(l.offset().top + d(t).height() + s / 2 - g.$box.offset().top, l.offset().left - g.win.pageXOffset - g.$box.offset().left, l.width()), p.data("fr-position", "after")), p.data("fr-tag", l), p.addClass("fr-visible"), g.$box.append(p)
                    } else p && 0 < g.$box.find(p).length && p.removeClass("fr-visible")
                }(e))
            }

            function r(e) {
                e.originalEvent.dataTransfer.dropEffect = "move", g.opts.dragInline || e.preventDefault()
            }

            function n(e) {
                g.$el.attr("contenteditable", !0);
                var t = g.$el.find(".fr-dragging");
                p && p.hasClass("fr-visible") && g.$box.find(p).length ? a(e) : t.length && (e.preventDefault(), e.stopPropagation()), p && g.$box.find(p).length && p.removeClass("fr-visible"), t.removeClass("fr-dragging")
            }

            function a(e) {
                var t, r;
                g.$el.attr("contenteditable", !0);
                for (var n = 0; n < c.INSTANCES.length; n++) if ((t = c.INSTANCES[n].$el.find(".fr-dragging")).length) {
                    r = c.INSTANCES[n];
                    break
                }
                if (t.length) {
                    if (e.preventDefault(), e.stopPropagation(), p && p.hasClass("fr-visible") && g.$box.find(p).length) p.data("fr-tag")[p.data("fr-position")]('<span class="fr-marker"></span>'), p.removeClass("fr-visible"); else if (!1 === g.markers.insertAtPoint(e.originalEvent)) return !1;
                    if (t.removeClass("fr-dragging"), !1 === (t = g.events.chainTrigger("element.beforeDrop", t))) return !1;
                    var a = t;
                    if (t.parent().is("A") && 1 === t.parent().get(0).childNodes.length && (a = t.parent()), g.core.isEmpty()) g.events.focus(); else g.$el.find(".fr-marker").replaceWith(c.MARKERS), g.selection.restore();
                    if (r === g || g.undo.canDo() || g.undo.saveStep(), g.core.isEmpty()) g.$el.html(a); else {
                        var o = g.markers.insert();
                        0 === a.find(o).length ? d(o).replaceWith(a) : 0 === t.find(o).length && d(o).replaceWith(t), t.after(c.MARKERS), g.selection.restore()
                    }
                    return g.popups.hideAll(), g.selection.save(), g.$el.find(g.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").not(g.opts.htmlAllowedEmptyTags.join(",")).remove(), g.html.wrap(), g.html.fillEmptyBlocks(), g.selection.restore(), g.undo.saveStep(), g.opts.iframe && g.size.syncIframe(), r !== g && (r.popups.hideAll(), r.$el.find(r.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), r.html.wrap(), r.html.fillEmptyBlocks(), r.undo.saveStep(), r.events.trigger("element.dropped"), r.opts.iframe && r.size.syncIframe()), g.events.trigger("element.dropped", [a]), !1
                }
                p && p.removeClass("fr-visible"), g.undo.canDo() || g.undo.saveStep(), setTimeout(function () {
                    g.undo.saveStep()
                }, 0)
            }

            function o(e) {
                if (e && "DIV" === e.tagName && g.node.hasClass(e, "fr-drag-helper")) e.parentNode.removeChild(e); else if (e && e.nodeType === Node.ELEMENT_NODE) for (var t = e.querySelectorAll("div.fr-drag-helper"), r = 0; r < t.length; r++) t[r].parentNode.removeChild(t[r])
            }

            return {
                _init: function i() {
                    g.opts.enter === c.ENTER_BR && (g.opts.dragInline = !0), g.events.on("dragstart", e, !0), g.events.on("dragover", t, !0), g.events.on("dragenter", r, !0), g.events.on("document.dragend", n, !0), g.events.on("document.drop", n, !0), g.events.on("drop", a, !0), g.events.on("html.processGet", o)
                }
            }
        }
    });

});

;/*!node_modules/froala-editor/js/plugins/entities.min.js*/
amis.define('9f4df6a', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, a) {
        "object" == typeof exports && "undefined" != typeof module ? a(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], a) : a(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;"}), e.PLUGINS.entities = function (i) {
            var n, o, l = i.$;

            function r(e) {
                var a = e.textContent;
                if (a.match(n)) {
                    for (var t = "", r = 0; r < a.length; r++) o[a[r]] ? t += o[a[r]] : t += a[r];
                    e.textContent = t
                }
            }

            function u(e) {
                if (e && 0 <= ["STYLE", "SCRIPT", "svg", "IFRAME"].indexOf(e.tagName)) return !0;
                for (var a = i.node.contents(e), t = 0; t < a.length; t++) a[t].nodeType === Node.TEXT_NODE ? r(a[t]) : u(a[t]);
                return e.nodeType === Node.TEXT_NODE && r(e), !1
            }

            var c = function c(e) {
                return 0 === e.length ? "" : i.clean.exec(e, u).replace(/\&amp;/g, "&")
            };
            return {
                _init: function s() {
                    i.opts.htmlSimpleAmpersand || (i.opts.entities = "".concat(i.opts.entities, "&amp;"));
                    var e = l(document.createElement("div")).html(i.opts.entities).text(),
                        a = i.opts.entities.split(";");
                    o = {}, n = "";
                    for (var t = 0; t < e.length; t++) {
                        var r = e.charAt(t);
                        o[r] = "".concat(a[t], ";"), n += "\\".concat(r + (t < e.length - 1 ? "|" : ""))
                    }
                    n = new RegExp("(".concat(n, ")"), "g"), i.events.on("html.get", c, !0)
                }
            }
        }
    });

});

;/*!node_modules/froala-editor/js/plugins/font_family.min.js*/
amis.define('f336663', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {
            fontFamily: {
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana"
            }, fontFamilySelection: !1, fontFamilyDefaultSelection: "Font Family"
        }), e.PLUGINS.fontFamily = function (o) {
            var i = o.$;

            function r(e) {
                var t = e.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
                return i(this).grep(t, function (e) {
                    return 0 < e.length
                })
            }

            function f(e, t) {
                for (var n = 0; n < e.length; n++) for (var a = 0; a < t.length; a++) if (e[n].toLowerCase() === t[a].toLowerCase()) return [n, a];
                return null
            }

            function n() {
                var e = r(i(o.selection.element()).css("font-family")), t = [];
                for (var n in o.opts.fontFamily) if (o.opts.fontFamily.hasOwnProperty(n)) {
                    var a = f(e, r(n));
                    a && t.push([n, a])
                }
                return 0 === t.length ? null : (t.sort(function (e, t) {
                    var n = e[1][0] - t[1][0];
                    return 0 === n ? e[1][1] - t[1][1] : n
                }), t[0][0])
            }

            return {
                apply: function t(e) {
                    o.format.applyStyle("font-family", e)
                }, refreshOnShow: function a(e, t) {
                    t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="'.concat(n(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                }, refresh: function l(e) {
                    if (o.opts.fontFamilySelection) {
                        var t = i(o.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                        e.find("> span").text(o.opts.fontFamily[n()] || t[0] || o.language.translate(o.opts.fontFamilyDefaultSelection))
                    }
                }
            }
        }, e.RegisterCommand("fontFamily", {
            type: "dropdown", displaySelection: function (e) {
                return e.opts.fontFamilySelection
            }, defaultSelection: function (e) {
                return e.opts.fontFamilyDefaultSelection
            }, displaySelectionWidth: 120, html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontFamily;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="'.concat(n, '" \n        style="font-family: ').concat(n, '" title="').concat(t[n], '">').concat(t[n], "</a></li>"));
                return e += "</ul>"
            }, title: "Font Family", callback: function (e, t) {
                this.fontFamily.apply(t)
            }, refresh: function (e) {
                this.fontFamily.refresh(e)
            }, refreshOnShow: function (e, t) {
                this.fontFamily.refreshOnShow(e, t)
            }, plugin: "fontFamily"
        }), e.DefineIcon("fontFamily", {NAME: "font", SVG_KEY: "fontFamily"})
    });

});

;/*!node_modules/froala-editor/js/plugins/font_size.min.js*/
amis.define('b1a619e', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], e) : e(t.FroalaEditor)
    }(this, function (t) {
        "use strict";
        t = t && t.hasOwnProperty("default") ? t["default"] : t, Object.assign(t.DEFAULTS, {
            fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"],
            fontSizeSelection: !1,
            fontSizeDefaultSelection: "12",
            fontSizeUnit: "px"
        }), t.PLUGINS.fontSize = function (o) {
            var i = o.$;
            return {
                apply: function e(t) {
                    o.format.applyStyle("font-size", t)
                }, refreshOnShow: function a(t, e) {
                    var n = i(o.selection.element()).css("font-size");
                    "pt" === o.opts.fontSizeUnit && (n = "".concat(Math.round(72 * parseFloat(n, 10) / 96), "pt")), e.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), e.find('.fr-command[data-param1="'.concat(n, '"]')).addClass("fr-active").attr("aria-selected", !0)
                }, refresh: function n(t) {
                    if (o.opts.fontSizeSelection) {
                        var e = o.helpers.getPX(i(o.selection.element()).css("font-size"));
                        "pt" === o.opts.fontSizeUnit && (e = "".concat(Math.round(72 * parseFloat(e, 10) / 96), "pt")), t.find("> span").text(e)
                    }
                }
            }
        }, t.RegisterCommand("fontSize", {
            type: "dropdown", title: "Font Size", displaySelection: function (t) {
                return t.opts.fontSizeSelection
            }, displaySelectionWidth: 30, defaultSelection: function (t) {
                return t.opts.fontSizeDefaultSelection
            }, html: function () {
                for (var t = '<ul class="fr-dropdown-list" role="presentation">', e = this.opts.fontSize, n = 0; n < e.length; n++) {
                    var o = e[n];
                    t += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="'.concat(o).concat(this.opts.fontSizeUnit, '" title="').concat(o, '">').concat(o, "</a></li>")
                }
                return t += "</ul>"
            }, callback: function (t, e) {
                this.fontSize.apply(e)
            }, refresh: function (t) {
                this.fontSize.refresh(t)
            }, refreshOnShow: function (t, e) {
                this.fontSize.refreshOnShow(t, e)
            }, plugin: "fontSize"
        }), t.DefineIcon("fontSize", {NAME: "text-height", SVG_KEY: "fontSize"})
    });

});

;/*!node_modules/froala-editor/js/plugins/forms.min.js*/
amis.define('0549905', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], e) : e(t.FroalaEditor)
    }(this, function (t) {
        "use strict";
        t = t && t.hasOwnProperty("default") ? t["default"] : t, Object.assign(t.POPUP_TEMPLATES, {
            "forms.edit": "[_BUTTONS_]",
            "forms.update": "[_BUTTONS_][_TEXT_LAYER_]"
        }), Object.assign(t.DEFAULTS, {
            formEditButtons: ["inputStyle", "inputEdit"],
            formStyles: {"fr-rounded": "Rounded", "fr-large": "Large"},
            formMultipleStyles: !0,
            formUpdateButtons: ["inputBack", "|"]
        }), t.PLUGINS.forms = function (s) {
            var u, r = s.$;

            function e(t) {
                s.selection.clear(), r(this).data("mousedown", !0)
            }

            function o(t) {
                r(this).data("mousedown") && (t.stopPropagation(), r(this).removeData("mousedown"), f(u = this)), t.preventDefault()
            }

            function n() {
                s.$el.find("input, textarea, button").removeData("mousedown")
            }

            function a() {
                r(this).removeData("mousedown")
            }

            function p() {
                return u || null
            }

            function f(t) {
                if (-1 == ["checkbox", "radio"].indexOf(t.type)) {
                    var e = s.popups.get("forms.edit");
                    e || (e = function i() {
                        var t = "";
                        0 < s.opts.formEditButtons.length && (t = '<div class="fr-buttons">'.concat(s.button.buildList(s.opts.formEditButtons), "</div>"));
                        var e = {buttons: t}, o = s.popups.create("forms.edit", e);
                        return s.$wp && s.events.$on(s.$wp, "scroll.link-edit", function () {
                            p() && s.popups.isVisible("forms.edit") && f(p())
                        }), o
                    }());
                    var o = r(u = t);
                    s.popups.refresh("forms.edit"), s.popups.setContainer("forms.edit", s.$sc);
                    var n = o.offset().left + o.outerWidth() / 2, a = o.offset().top + o.outerHeight();
                    s.popups.show("forms.edit", n, a, o.outerHeight())
                }
            }

            function i() {
                var t = s.popups.get("forms.update"), e = p();
                if (e) {
                    var o = r(e);
                    o.is("button") ? t.find('input[type="text"][name="text"]').val(o.text()) : o.is("input[type=button]") || o.is("input[type=submit]") || o.is("input[type=reset]") ? t.find('input[type="text"][name="text"]').val(o.val()) : t.find('input[type="text"][name="text"]').val(o.attr("placeholder"))
                }
                t.find('input[type="text"][name="text"]').trigger("change")
            }

            function d() {
                u = null
            }

            function l(t) {
                if (t) return s.popups.onRefresh("forms.update", i), s.popups.onHide("forms.update", d), !0;
                var e = "";
                1 <= s.opts.formUpdateButtons.length && (e = '<div class="fr-buttons">'.concat(s.button.buildList(s.opts.formUpdateButtons), "</div>"));
                var o = 0, n = {
                    buttons: e,
                    text_layer: '<div class="fr-forms-text-layer fr-layer fr-active"> \n    <div class="fr-input-line"><input name="text" type="text" placeholder="Text" tabIndex=" '.concat(++o, ' "></div>\n    <div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="updateInput" href="#" tabIndex="').concat(2, '" type="button">').concat(s.language.translate("Update"), "</button></div></div>")
                };
                return s.popups.create("forms.update", n)
            }

            return {
                _init: function c() {
                    !function t() {
                        s.events.$on(s.$el, s._mousedown, "input, textarea, button", e), s.events.$on(s.$el, s._mouseup, "input, textarea, button", o), s.events.$on(s.$el, "touchmove", "input, textarea, button", a), s.events.$on(s.$el, s._mouseup, n), s.events.$on(s.$win, s._mouseup, n), l(!0)
                    }(), s.events.$on(s.$el, "submit", "form", function (t) {
                        return t.preventDefault(), !1
                    })
                }, updateInput: function m() {
                    var t = s.popups.get("forms.update"), e = p();
                    if (e) {
                        var o = r(e), n = t.find('input[type="text"][name="text"]').val() || "";
                        o.is("button") ? n.length ? o.text(n) : o.text("\u200b") : -1 != ["button", "submit", "reset"].indexOf(e.type) ? o.attr("value", n) : o.attr("placeholder", n), s.popups.hide("forms.update"), f(e)
                    }
                }, getInput: p, applyStyle: function v(t, e, o) {
                    void 0 === e && (e = s.opts.formStyles), void 0 === o && (o = s.opts.formMultipleStyles);
                    var n = p();
                    if (!n) return !1;
                    if (!o) {
                        var a = Object.keys(e);
                        a.splice(a.indexOf(t), 1), r(n).removeClass(a.join(" "))
                    }
                    r(n).toggleClass(t)
                }, showUpdatePopup: function h() {
                    var t = p();
                    if (t) {
                        var e = r(t), o = s.popups.get("forms.update");
                        o || (o = l()), s.popups.isVisible("forms.update") || s.popups.refresh("forms.update"), s.popups.setContainer("forms.update", s.$sc);
                        var n = e.offset().left + e.outerWidth() / 2, a = e.offset().top + e.outerHeight();
                        s.popups.show("forms.update", n, a, e.outerHeight())
                    }
                }, showEditPopup: f, back: function b() {
                    s.events.disableBlur(), s.selection.restore(), s.events.enableBlur();
                    var t = p();
                    t && s.$wp && ("BUTTON" === t.tagName && s.selection.restore(), f(t))
                }
            }
        }, t.RegisterCommand("updateInput", {
            undo: !1, focus: !1, title: "Update", callback: function () {
                this.forms.updateInput()
            }
        }), t.DefineIcon("inputStyle", {
            NAME: "magic",
            SVG_KEY: "inlineStyle"
        }), t.RegisterCommand("inputStyle", {
            title: "Style", type: "dropdown", html: function () {
                var t = '<ul class="fr-dropdown-list">', e = this.opts.formStyles;
                for (var o in e) e.hasOwnProperty(o) && (t += '<li><a class="fr-command" tabIndex="-1" data-cmd="inputStyle" data-param1="'.concat(o, '">').concat(this.language.translate(e[o]), "</a></li>"));
                return t += "</ul>"
            }, callback: function (t, e) {
                var o = this.forms.getInput();
                o && (this.forms.applyStyle(e), this.forms.showEditPopup(o))
            }, refreshOnShow: function (t, e) {
                var o = this.$, n = this.forms.getInput();
                if (n) {
                    var a = o(n);
                    e.find(".fr-command").each(function () {
                        var t = o(this).data("param1");
                        o(this).toggleClass("fr-active", a.hasClass(t))
                    })
                }
            }
        }), t.DefineIcon("inputEdit", {
            NAME: "edit",
            SVG_KEY: "edit"
        }), t.RegisterCommand("inputEdit", {
            title: "Edit Button",
            undo: !1,
            refreshAfterCallback: !1,
            callback: function () {
                this.forms.showUpdatePopup()
            }
        }), t.DefineIcon("inputBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), t.RegisterCommand("inputBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.forms.back()
            }
        }), t.RegisterCommand("updateInput", {
            undo: !1, focus: !1, title: "Update", callback: function () {
                this.forms.updateInput()
            }
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/fullscreen.min.js*/
amis.define('693ad90', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        (e = e && e.hasOwnProperty("default") ? e["default"] : e).PLUGINS.fullscreen = function (s) {
            var t, r, o, n, i = s.$, a = function a() {
                return s.$box.hasClass("fr-fullscreen")
            };

            function l() {
                if (s.helpers.isIOS() && s.core.hasFocus()) return s.$el.blur(), setTimeout(c, 250), !1;
                t = s.helpers.scrollTop(), s.$box.toggleClass("fr-fullscreen"), i("body").first().toggleClass("fr-fullscreen"), s.helpers.isMobile() && (s.$tb.data("parent", s.$tb.parent()), s.$box.prepend(s.$tb), s.$tb.data("sticky-dummy") && s.$tb.after(s.$tb.data("sticky-dummy"))), r = s.opts.height, o = s.opts.heightMax, n = s.opts.z_index, s.opts.height = s.o_win.innerHeight - (s.opts.toolbarInline ? 0 : s.$tb.outerHeight() + (s.$second_tb ? s.$second_tb.outerHeight() : 0)), s.opts.zIndex = 2147483641, s.opts.heightMax = null, s.size.refresh(), s.opts.toolbarInline && s.toolbar.showInline();
                for (var e = s.$box.parent(); !e.first().is("body");) e.addClass("fr-fullscreen-wrapper"), e = e.parent();
                s.opts.toolbarContainer && s.$box.prepend(s.$tb), s.events.trigger("charCounter.update"), s.events.trigger("codeView.update"), s.$win.trigger("scroll")
            }

            function f() {
                if (s.helpers.isIOS() && s.core.hasFocus()) return s.$el.blur(), setTimeout(c, 250), !1;
                s.$box.toggleClass("fr-fullscreen"), i("body").first().toggleClass("fr-fullscreen"), s.$tb.data("parent") && s.$tb.data("parent").prepend(s.$tb), s.$tb.data("sticky-dummy") && s.$tb.after(s.$tb.data("sticky-dummy")), s.opts.height = r, s.opts.heightMax = o, s.opts.zIndex = n, s.size.refresh(), i(s.o_win).scrollTop(t), s.opts.toolbarInline && s.toolbar.showInline(), s.events.trigger("charCounter.update"), s.opts.toolbarSticky && s.opts.toolbarStickyOffset && (s.opts.toolbarBottom ? s.$tb.css("bottom", s.opts.toolbarStickyOffset).data("bottom", s.opts.toolbarStickyOffset) : s.$tb.css("top", s.opts.toolbarStickyOffset).data("top", s.opts.toolbarStickyOffset));
                for (var e = s.$box.parent(); !e.first().is("body");) e.removeClass("fr-fullscreen-wrapper"), e = e.parent();
                s.opts.toolbarContainer && i(s.opts.toolbarContainer).append(s.$tb), i(s.o_win).trigger("scroll"), s.events.trigger("codeView.update")
            }

            function c() {
                a() ? f() : l(), d(s.$tb.find('.fr-command[data-cmd="fullscreen"]'));
                var e = s.$tb.find('.fr-command[data-cmd="moreText"]'),
                    t = s.$tb.find('.fr-command[data-cmd="moreParagraph"]'),
                    r = s.$tb.find('.fr-command[data-cmd="moreRich"]'),
                    o = s.$tb.find('.fr-command[data-cmd="moreMisc"]');
                e.length && s.refresh.moreText(e), t.length && s.refresh.moreParagraph(t), r.length && s.refresh.moreRich(r), o.length && s.refresh.moreMisc(o)
            }

            function d(e) {
                var t = a();
                e.toggleClass("fr-active", t).attr("aria-pressed", t), e.find("> *").not(".fr-sr-only").replaceWith(t ? s.icon.create("fullscreenCompress") : s.icon.create("fullscreen"))
            }

            return {
                _init: function e() {
                    if (!s.$wp) return !1;
                    s.events.$on(i(s.o_win), "resize", function () {
                        a() && (f(), l())
                    }), s.events.on("toolbar.hide", function () {
                        if (a() && s.helpers.isMobile()) return !1
                    }), s.events.on("position.refresh", function () {
                        if (s.helpers.isIOS()) return !a()
                    }), s.events.on("destroy", function () {
                        a() && f()
                    }, !0)
                }, toggle: c, refresh: d, isActive: a
            }
        }, e.RegisterCommand("fullscreen", {
            title: "Fullscreen",
            undo: !1,
            focus: !1,
            accessibilityFocus: !0,
            forcedRefresh: !0,
            toggle: !0,
            callback: function () {
                this.fullscreen.toggle()
            },
            refresh: function (e) {
                this.fullscreen.refresh(e)
            },
            plugin: "fullscreen"
        }), e.DefineIcon("fullscreen", {
            NAME: "expand",
            SVG_KEY: "fullscreen"
        }), e.DefineIcon("fullscreenCompress", {NAME: "compress", SVG_KEY: "exitFullscreen"})
    });

});

;/*!node_modules/froala-editor/js/plugins/help.min.js*/
amis.define('bb21efb', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {
            helpSets: [{
                title: "Inline Editor",
                commands: [{val: "OSkeyE", desc: "Show the editor"}]
            }, {
                title: "Common actions",
                commands: [{val: "OSkeyC", desc: "Copy"}, {val: "OSkeyX", desc: "Cut"}, {
                    val: "OSkeyV",
                    desc: "Paste"
                }, {val: "OSkeyZ", desc: "Undo"}, {val: "OSkeyShift+Z", desc: "Redo"}, {
                    val: "OSkeyK",
                    desc: "Insert Link"
                }, {val: "OSkeyP", desc: "Insert Image"}]
            }, {
                title: "Basic Formatting",
                commands: [{val: "OSkeyA", desc: "Select All"}, {val: "OSkeyB", desc: "Bold"}, {
                    val: "OSkeyI",
                    desc: "Italic"
                }, {val: "OSkeyU", desc: "Underline"}, {val: "OSkeyS", desc: "Strikethrough"}, {
                    val: "OSkey]",
                    desc: "Increase Indent"
                }, {val: "OSkey[", desc: "Decrease Indent"}]
            }, {
                title: "Quote",
                commands: [{val: "OSkey'", desc: "Increase quote level"}, {
                    val: "OSkeyShift+'",
                    desc: "Decrease quote level"
                }]
            }, {
                title: "Image / Video",
                commands: [{val: "OSkey+", desc: "Resize larger"}, {val: "OSkey-", desc: "Resize smaller"}]
            }, {
                title: "Table",
                commands: [{val: "Alt+Space", desc: "Select table cell"}, {
                    val: "Shift+Left/Right arrow",
                    desc: "Extend selection one cell"
                }, {val: "Shift+Up/Down arrow", desc: "Extend selection one row"}]
            }, {
                title: "Navigation",
                commands: [{val: "OSkey/", desc: "Shortcuts"}, {
                    val: "Alt+F10",
                    desc: "Focus popup / toolbar"
                }, {val: "Esc", desc: "Return focus to previous position"}]
            }]
        }), e.PLUGINS.help = function (c) {
            var a, o = c.$, s = "help";
            return {
                _init: function e() {
                }, show: function d() {
                    if (!a) {
                        var e = "<h4>".concat(c.language.translate("Shortcuts"), "</h4>"), t = function n() {
                            for (var e = '<div class="fr-help-modal">', t = 0; t < c.opts.helpSets.length; t++) {
                                var l = c.opts.helpSets[t], a = "<table>";
                                a += "<thead><tr><th>".concat(c.language.translate(l.title), "</th></tr></thead>"), a += "<tbody>";
                                for (var o = 0; o < l.commands.length; o++) {
                                    var s = l.commands[o];
                                    a += "<tr>", a += "<td>".concat(c.language.translate(s.desc), "</td>"), a += "<td>".concat(s.val.replace("OSkey", c.helpers.isMac() ? "&#8984;" : "Ctrl+"), "</td>"), a += "</tr>"
                                }
                                e += a += "</tbody></table>"
                            }
                            return e += "</div>"
                        }(), l = c.modals.create(s, e, t);
                        a = l.$modal, c.events.$on(o(c.o_win), "resize", function () {
                            c.modals.resize(s)
                        })
                    }
                    c.modals.show(s), c.modals.resize(s)
                }, hide: function t() {
                    c.modals.hide(s)
                }
            }
        }, e.DefineIcon("help", {
            NAME: "question",
            SVG_KEY: "help"
        }), e.RegisterShortcut(e.KEYCODE.SLASH, "help", null, "/"), e.RegisterCommand("help", {
            title: "Help",
            icon: "help",
            undo: !1,
            focus: !1,
            modal: !0,
            callback: function () {
                this.help.show()
            },
            plugin: "help",
            showOnMobile: !1
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/image.min.js*/
amis.define('80447f4', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (_e) {
        "use strict";

        function Le(e) {
            return (Le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        _e = _e && _e.hasOwnProperty("default") ? _e["default"] : _e, Object.assign(_e.POPUP_TEMPLATES, {
            "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
            "image.edit": "[_BUTTONS_]",
            "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
            "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
        }), Object.assign(_e.DEFAULTS, {
            imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
            imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
            imageAltButtons: ["imageBack", "|"],
            imageSizeButtons: ["imageBack", "|"],
            imageUpload: !0,
            imageUploadURL: null,
            imageCORSProxy: "https://cors-anywhere.froala.com",
            imageUploadRemoteUrls: !0,
            imageUploadParam: "file",
            imageUploadParams: {},
            imageUploadToS3: !1,
            imageUploadMethod: "POST",
            imageMaxSize: 10485760,
            imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
            imageResize: !0,
            imageResizeWithPercent: !1,
            imageRoundPercent: !1,
            imageDefaultWidth: 300,
            imageDefaultAlign: "center",
            imageDefaultDisplay: "block",
            imageSplitHTML: !1,
            imageStyles: {"fr-rounded": "Rounded", "fr-bordered": "Bordered", "fr-shadow": "Shadow"},
            imageMove: !0,
            imageMultipleStyles: !0,
            imageTextNear: !0,
            imagePaste: !0,
            imagePasteProcess: !1,
            imageMinWidth: 16,
            imageOutputSize: !1,
            imageDefaultMargin: 5,
            imageAddNewLine: !1
        }), _e.PLUGINS.image = function (g) {
            var c, l, f, p, o, a, d = g.$, s = "https://i.froala.com/upload", t = !1, i = 1, m = 2, u = 3, h = 4, v = 5,
                b = 6, n = {};

            function y() {
                var e = g.popups.get("image.insert").find(".fr-image-by-url-layer input");
                e.val(""), c && e.val(c.attr("src")), e.trigger("change")
            }

            function r() {
                var e = g.popups.get("image.edit");
                if (e || (e = P()), e) {
                    var t = we();
                    Ce() && (t = t.find(".fr-img-wrap")), g.popups.setContainer("image.edit", g.$sc), g.popups.refresh("image.edit");
                    var a = t.offset().left + t.outerWidth() / 2, i = t.offset().top + t.outerHeight();
                    c.hasClass("fr-uploading") ? O() : g.popups.show("image.edit", a, i, t.outerHeight(), !0)
                }
            }

            function w() {
                k()
            }

            function C(e) {
                0 < e.parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption").first());
                var t = e.hasClass("fr-dib") ? "block" : e.hasClass("fr-dii") ? "inline" : null,
                    a = e.hasClass("fr-fil") ? "left" : e.hasClass("fr-fir") ? "right" : ue(e);
                me(e, t, a), e.removeClass("fr-dib fr-dii fr-fir fr-fil")
            }

            function A() {
                for (var e, t = "IMG" == g.el.tagName ? [g.el] : g.el.querySelectorAll("img"), a = 0; a < t.length; a++) {
                    var i = d(t[a]);
                    !g.opts.htmlUntouched && g.opts.useClasses ? ((g.opts.imageDefaultAlign || g.opts.imageDefaultDisplay) && (0 < (e = i).parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption").first()), e.hasClass("fr-dii") || e.hasClass("fr-dib") || (e.addClass("fr-fi".concat(ue(e)[0])), e.addClass("fr-di".concat(he(e)[0])), e.css("margin", ""), e.css("float", ""), e.css("display", ""), e.css("z-index", ""), e.css("position", ""), e.css("overflow", ""), e.css("vertical-align", ""))), g.opts.imageTextNear || (0 < i.parents(".fr-img-caption").length ? i.parents(".fr-img-caption").first().removeClass("fr-dii").addClass("fr-dib") : i.removeClass("fr-dii").addClass("fr-dib"))) : g.opts.htmlUntouched || g.opts.useClasses || (g.opts.imageDefaultAlign || g.opts.imageDefaultDisplay) && C(i), g.opts.iframe && i.on("load", g.size.syncIframe)
                }
            }

            function E(e) {
                void 0 === e && (e = !0);
                var t, a = Array.prototype.slice.call(g.el.querySelectorAll("img")), i = [];
                for (t = 0; t < a.length; t++) if (i.push(a[t].getAttribute("src")), d(a[t]).toggleClass("fr-draggable", g.opts.imageMove), "" === a[t].getAttribute("class") && a[t].removeAttribute("class"), "" === a[t].getAttribute("style") && a[t].removeAttribute("style"), a[t].parentNode && a[t].parentNode.parentNode && g.node.hasClass(a[t].parentNode.parentNode, "fr-img-caption")) {
                    var n = a[t].parentNode.parentNode;
                    g.browser.mozilla || n.setAttribute("contenteditable", !1), n.setAttribute("draggable", !1), n.classList.add("fr-draggable");
                    var r = a[t].nextSibling;
                    r && !g.browser.mozilla && r.setAttribute("contenteditable", !0)
                }
                if (o) for (t = 0; t < o.length; t++) i.indexOf(o[t].getAttribute("src")) < 0 && g.events.trigger("image.removed", [d(o[t])]);
                if (o && e) {
                    var s = [];
                    for (t = 0; t < o.length; t++) s.push(o[t].getAttribute("src"));
                    for (t = 0; t < a.length; t++) s.indexOf(a[t].getAttribute("src")) < 0 && g.events.trigger("image.loaded", [d(a[t])])
                }
                o = a
            }

            function S() {
                if (l || function s() {
                    var e;
                    g.shared.$image_resizer ? (l = g.shared.$image_resizer, p = g.shared.$img_overlay, g.events.on("destroy", function () {
                        d("body").first().append(l.removeClass("fr-active"))
                    }, !0)) : (g.shared.$image_resizer = d(document.createElement("div")).attr("class", "fr-image-resizer"), l = g.shared.$image_resizer, g.events.$on(l, "mousedown", function (e) {
                        e.stopPropagation()
                    }, !0), g.opts.imageResize && (l.append(R("nw") + R("ne") + R("sw") + R("se")), g.shared.$img_overlay = d(document.createElement("div")).attr("class", "fr-image-overlay"), p = g.shared.$img_overlay, e = l.get(0).ownerDocument, d(e).find("body").first().append(p)));
                    g.events.on("shared.destroy", function () {
                        l.html("").removeData().remove(), l = null, g.opts.imageResize && (p.remove(), p = null)
                    }, !0), g.helpers.isMobile() || g.events.$on(d(g.o_win), "resize", function () {
                        c && !c.hasClass("fr-uploading") ? pe(!0) : c && (S(), ve(), O(!1))
                    });
                    if (g.opts.imageResize) {
                        e = l.get(0).ownerDocument, g.events.$on(l, g._mousedown, ".fr-handler", x), g.events.$on(d(e), g._mousemove, $), g.events.$on(d(e.defaultView || e.parentWindow), g._mouseup, U), g.events.$on(p, "mouseleave", U);
                        var i = 1, n = null, r = 0;
                        g.events.on("keydown", function (e) {
                            if (c) {
                                var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                    a = e.which;
                                (a !== n || 200 < e.timeStamp - r) && (i = 1), (a == _e.KEYCODE.EQUALS || g.browser.mozilla && a == _e.KEYCODE.FF_EQUALS) && t && !e.altKey ? i = ee.call(this, e, 1, 1, i) : (a == _e.KEYCODE.HYPHEN || g.browser.mozilla && a == _e.KEYCODE.FF_HYPHEN) && t && !e.altKey ? i = ee.call(this, e, 2, -1, i) : g.keys.ctrlKey(e) || a != _e.KEYCODE.ENTER || (c.before("<br>"), T(c)), n = a, r = e.timeStamp
                            }
                        }, !0), g.events.on("keyup", function () {
                            i = 1
                        })
                    }
                }(), !c) return !1;
                var e = g.$wp || g.$sc;
                e.append(l), l.data("instance", g);
                var t = e.scrollTop() - ("static" != e.css("position") ? e.offset().top : 0),
                    a = e.scrollLeft() - ("static" != e.css("position") ? e.offset().left : 0);
                a -= g.helpers.getPX(e.css("border-left-width")), t -= g.helpers.getPX(e.css("border-top-width")), g.$el.is("img") && g.$sc.is("body") && (a = t = 0);
                var i = we();
                Ce() && (i = i.find(".fr-img-wrap"));
                var n = 0, r = 0;
                g.opts.iframe && (n = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-top")), r = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-left"))), l.css("top", (g.opts.iframe ? i.offset().top + n : i.offset().top + t) - 1).css("left", (g.opts.iframe ? i.offset().left + r : i.offset().left + a) - 1).css("width", i.get(0).getBoundingClientRect().width).css("height", i.get(0).getBoundingClientRect().height).addClass("fr-active")
            }

            function R(e) {
                return '<div class="fr-handler fr-h'.concat(e, '"></div>')
            }

            function D(e) {
                Ce() ? c.parents(".fr-img-caption").css("width", e) : c.css("width", e)
            }

            function x(e) {
                if (!g.core.sameInstance(l)) return !0;
                if (e.preventDefault(), e.stopPropagation(), g.$el.find("img.fr-error").left) return !1;
                g.undo.canDo() || g.undo.saveStep();
                var t = e.pageX || e.originalEvent.touches[0].pageX;
                if ("mousedown" == e.type) {
                    var a = g.$oel.get(0).ownerDocument, i = a.defaultView || a.parentWindow, n = !1;
                    try {
                        n = i.location != i.parent.location && !(i.$ && i.$.FE)
                    } catch (o) {
                    }
                    n && i.frameElement && (t += g.helpers.getPX(d(i.frameElement).offset().left) + i.frameElement.clientLeft)
                }
                (f = d(this)).data("start-x", t), f.data("start-width", c.width()), f.data("start-height", c.height());
                var r = c.width();
                if (g.opts.imageResizeWithPercent) {
                    var s = c.parentsUntil(g.$el, g.html.blockTagsQuery()).get(0) || g.el;
                    r = (r / d(s).outerWidth() * 100).toFixed(2) + "%"
                }
                D(r), p.show(), g.popups.hideAll(), de()
            }

            function $(e) {
                if (!g.core.sameInstance(l)) return !0;
                var t;
                if (f && c) {
                    if (e.preventDefault(), g.$el.find("img.fr-error").left) return !1;
                    var a = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
                    if (!a) return !1;
                    var i = a - f.data("start-x"), n = f.data("start-width");
                    if ((f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (i = 0 - i), g.opts.imageResizeWithPercent) {
                        var r = c.parentsUntil(g.$el, g.html.blockTagsQuery()).get(0) || g.el;
                        n = ((n + i) / d(r).outerWidth() * 100).toFixed(2), g.opts.imageRoundPercent && (n = Math.round(n)), D("".concat(n, "%")), (t = Ce() ? (g.helpers.getPX(c.parents(".fr-img-caption").css("width")) / d(r).outerWidth() * 100).toFixed(2) : (g.helpers.getPX(c.css("width")) / d(r).outerWidth() * 100).toFixed(2)) === n || g.opts.imageRoundPercent || D("".concat(t, "%")), c.css("height", "").removeAttr("height")
                    } else n + i >= g.opts.imageMinWidth && (D(n + i), t = Ce() ? g.helpers.getPX(c.parents(".fr-img-caption").css("width")) : g.helpers.getPX(c.css("width"))), t !== n + i && D(t), ((c.attr("style") || "").match(/(^height:)|(; *height:)/) || c.attr("height")) && (c.css("height", f.data("start-height") * c.width() / f.data("start-width")), c.removeAttr("height"));
                    S(), g.events.trigger("image.resize", [ye()])
                }
            }

            function U(e) {
                if (!g.core.sameInstance(l)) return !0;
                if (f && c) {
                    if (e && e.stopPropagation(), g.$el.find("img.fr-error").left) return !1;
                    f = null, p.hide(), S(), r(), g.undo.saveStep(), g.events.trigger("image.resizeEnd", [ye()])
                } else l.removeClass("fr-active")
            }

            function I(e, t, a) {
                g.edit.on(), c && c.addClass("fr-error"), n[e] ? B(g.language.translate(n[e])) : B(g.language.translate("Something went wrong. Please try again.")), !c && a && te(a), g.events.trigger("image.error", [{
                    code: e,
                    message: n[e]
                }, t, a])
            }

            function P(e) {
                if (e) return g.$wp && g.events.$on(g.$wp, "scroll.image-edit", function () {
                    c && g.popups.isVisible("image.edit") && (g.events.disableBlur(), r())
                }), !0;
                var t = "";
                if (0 < g.opts.imageEditButtons.length) {
                    var a = {buttons: t += '<div class="fr-buttons"> \n        '.concat(g.button.buildList(g.opts.imageEditButtons), "\n        </div>")};
                    return g.popups.create("image.edit", a)
                }
                return !1
            }

            function O(e) {
                var t = g.popups.get("image.insert");
                if (t || (t = X()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), c) {
                    var a = we();
                    g.popups.setContainer("image.insert", g.$sc);
                    var i = a.offset().left, n = a.offset().top + a.height();
                    g.popups.show("image.insert", i, n, a.outerHeight())
                }
                void 0 === e && N(g.language.translate("Uploading"), 0)
            }

            function k(e) {
                var t = g.popups.get("image.insert");
                if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || g.$el.find("img.fr-error").length)) {
                    if (g.events.focus(), g.$el.find("img.fr-error").length && (g.$el.find("img.fr-error").remove(), g.undo.saveStep(), g.undo.run(), g.undo.dropRedo()), !g.$wp && c) {
                        var a = c;
                        pe(!0), g.selection.setAfter(a.get(0)), g.selection.restore()
                    }
                    g.popups.hide("image.insert")
                }
            }

            function N(e, t) {
                var a = g.popups.get("image.insert");
                if (a) {
                    var i = a.find(".fr-image-progress-bar-layer");
                    i.find("h3").text(e + (t ? " ".concat(t, "%") : "")), i.removeClass("fr-error"), t ? (i.find("div").removeClass("fr-indeterminate"), i.find("div > span").css("width", "".concat(t, "%"))) : i.find("div").addClass("fr-indeterminate")
                }
            }

            function B(e) {
                O();
                var t = g.popups.get("image.insert").find(".fr-image-progress-bar-layer");
                t.addClass("fr-error");
                var a = t.find("h3");
                a.text(e), g.events.disableBlur(), a.focus()
            }

            function T(e) {
                fe.call(e.get(0))
            }

            function _() {
                var e = d(this);
                g.popups.hide("image.insert"), e.removeClass("fr-uploading"), e.next().is("br") && e.next().remove(), T(e), g.events.trigger("image.loaded", [e])
            }

            function L(s, e, o, l, f) {
                l && "string" == typeof l && (l = g.$(l)), g.edit.off(), N(g.language.translate("Loading image")), e && (s = g.helpers.sanitizeURL(s));
                var t = new Image;
                t.onload = function () {
                    var e, t;
                    if (l) {
                        g.undo.canDo() || l.hasClass("fr-uploading") || g.undo.saveStep();
                        var a = l.data("fr-old-src");
                        l.data("fr-image-pasted") && (a = null), g.$wp ? ((e = l.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), a && l.attr("src", a), l.replaceWith(e)) : e = l;
                        for (var i = e.get(0).attributes, n = 0; n < i.length; n++) {
                            var r = i[n];
                            0 === r.nodeName.indexOf("data-") && e.removeAttr(r.nodeName)
                        }
                        if (void 0 !== o) for (t in o) o.hasOwnProperty(t) && "link" != t && e.attr("data-".concat(t), o[t]);
                        e.on("load", _), e.attr("src", s), g.edit.on(), E(!1), g.undo.saveStep(), g.events.disableBlur(), g.$el.blur(), g.events.trigger(a ? "image.replaced" : "image.inserted", [e, f])
                    } else e = Y(s, o, _), E(!1), g.undo.saveStep(), g.events.disableBlur(), g.$el.blur(), g.events.trigger("image.inserted", [e, f])
                }, t.onerror = function () {
                    I(i)
                }, O(g.language.translate("Loading image")), t.src = s
            }

            function M(e) {
                N(g.language.translate("Loading image"));
                var t = this.status, a = this.response, i = this.responseXML, n = this.responseText;
                try {
                    if (g.opts.imageUploadToS3) if (201 == t) {
                        var r = function o(e) {
                            try {
                                var t = d(e).find("Location").text(), a = d(e).find("Key").text();
                                return !1 === g.events.trigger("image.uploadedToS3", [t, a, e], !0) ? (g.edit.on(), !1) : t
                            } catch (i) {
                                return I(h, e), !1
                            }
                        }(i);
                        r && L(r, !1, [], e, a || i)
                    } else I(h, a || i, e); else if (200 <= t && t < 300) {
                        var s = function l(e) {
                            try {
                                if (!1 === g.events.trigger("image.uploaded", [e], !0)) return g.edit.on(), !1;
                                var t = JSON.parse(e);
                                return t.link ? t : (I(m, e), !1)
                            } catch (a) {
                                return I(h, e), !1
                            }
                        }(n);
                        s && L(s.link, !1, s, e, a || n)
                    } else I(u, a || n, e)
                } catch (f) {
                    I(h, a || n, e)
                }
            }

            function z() {
                I(h, this.response || this.responseText || this.responseXML)
            }

            function K(e) {
                if (e.lengthComputable) {
                    var t = e.loaded / e.total * 100 | 0;
                    N(g.language.translate("Uploading"), t)
                }
            }

            function Y(e, t, a) {
                var i, n = d(document.createElement("img")).attr("src", e);
                if (t && void 0 !== t) for (i in t) t.hasOwnProperty(i) && "link" != i && (" data-".concat(i, '="').concat(t[i], '"'), n.attr("data-str".concat(i), t[i]));
                var r = g.opts.imageDefaultWidth;
                r && "auto" != r && (r = g.opts.imageResizeWithPercent ? "100%" : "".concat(r, "px")), n.attr("style", r ? "width: ".concat(r, ";") : ""), me(n, g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign), n.on("load", a), n.on("error", a), g.edit.on(), g.events.focus(!0), g.selection.restore(), g.undo.saveStep(), g.opts.imageSplitHTML ? g.markers.split() : g.markers.insert(), g.html.wrap();
                var s = g.$el.find(".fr-marker");
                return s.length ? (s.parent().is("hr") && s.parent().after(s), g.node.isLastSibling(s) && s.parent().hasClass("fr-deletable") && s.insertAfter(s.parent()), s.replaceWith(n)) : g.$el.append(n), g.selection.clear(), n
            }

            function W() {
                g.edit.on(), k(!0)
            }

            function G(e, t) {
                if (void 0 !== e && 0 < e.length) {
                    if (!1 === g.events.trigger("image.beforeUpload", [e, t])) return !1;
                    var a, i = e[0];
                    if ((null === g.opts.imageUploadURL || g.opts.imageUploadURL == s) && !g.opts.imageUploadToS3) return function o(n, r) {
                        var s = new FileReader;
                        s.onload = function () {
                            var e = s.result;
                            if (s.result.indexOf("svg+xml") < 0) {
                                for (var t = atob(s.result.split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));
                                e = window.URL.createObjectURL(new Blob([new Uint8Array(a)], {type: n.type})), g.image.insert(e, !1, null, r)
                            }
                        }, O(), s.readAsDataURL(n)
                    }(i, t || c), !1;
                    if (i.name || (i.name = (new Date).getTime() + "." + (i.type || "image/jpeg").replace(/image\//g, "")), i.size > g.opts.imageMaxSize) return I(v), !1;
                    if (g.opts.imageAllowedTypes.indexOf(i.type.replace(/image\//g, "")) < 0) return I(b), !1;
                    if (g.drag_support.formdata && (a = g.drag_support.formdata ? new FormData : null), a) {
                        var n;
                        if (!1 !== g.opts.imageUploadToS3) for (n in a.append("key", g.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (i.name || "untitled")), a.append("success_action_status", "201"), a.append("X-Requested-With", "xhr"), a.append("Content-Type", i.type), g.opts.imageUploadToS3.params) g.opts.imageUploadToS3.params.hasOwnProperty(n) && a.append(n, g.opts.imageUploadToS3.params[n]);
                        for (n in g.opts.imageUploadParams) g.opts.imageUploadParams.hasOwnProperty(n) && a.append(n, g.opts.imageUploadParams[n]);
                        a.append(g.opts.imageUploadParam, i, i.name);
                        var r = g.opts.imageUploadURL;
                        g.opts.imageUploadToS3 && (r = g.opts.imageUploadToS3.uploadURL ? g.opts.imageUploadToS3.uploadURL : "https://".concat(g.opts.imageUploadToS3.region, ".amazonaws.com/").concat(g.opts.imageUploadToS3.bucket)), function l(t, a, e, n) {
                            function r() {
                                var e = d(this);
                                e.off("load"), e.addClass("fr-uploading"), e.next().is("br") && e.next().remove(), g.placeholder.refresh(), T(e), S(), O(), g.edit.off(), t.onload = function () {
                                    M.call(t, e)
                                }, t.onerror = z, t.upload.onprogress = K, t.onabort = W, d(e.off("abortUpload")).on("abortUpload", function () {
                                    4 != t.readyState && (t.abort(), n ? (n.attr("src", n.data("fr-old-src")), n.removeClass("fr-uploading")) : e.remove(), pe(!0))
                                }), t.send(a)
                            }

                            var s = new FileReader;
                            s.onload = function () {
                                var e = s.result;
                                if (s.result.indexOf("svg+xml") < 0) {
                                    for (var t = atob(s.result.split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));
                                    e = window.URL.createObjectURL(new Blob([new Uint8Array(a)], {type: "image/jpeg"}))
                                }
                                n ? (n.on("load", r), n.on("error", function () {
                                    r(), d(this).off("error")
                                }), g.edit.on(), g.undo.saveStep(), n.data("fr-old-src", n.attr("src")), n.attr("src", e)) : Y(e, null, r)
                            }, s.readAsDataURL(e)
                        }(g.core.getXHR(r, g.opts.imageUploadMethod), a, i, t || c)
                    }
                }
            }

            function H(e) {
                if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption")
            }

            function V(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files && t.files.length) {
                    var a = t.files[0];
                    if (a && a.type && -1 !== a.type.indexOf("image") && 0 <= g.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, ""))) {
                        if (!g.opts.imageUpload) return e.preventDefault(), e.stopPropagation(), !1;
                        g.markers.remove(), g.markers.insertAtPoint(e.originalEvent), g.$el.find(".fr-marker").replaceWith(_e.MARKERS), 0 === g.$el.find(".fr-marker").length && g.selection.setAtEnd(g.el), g.popups.hideAll();
                        var i = g.popups.get("image.insert");
                        i || (i = X()), g.popups.setContainer("image.insert", g.$sc);
                        var n = e.originalEvent.pageX, r = e.originalEvent.pageY;
                        if (g.opts.iframe) {
                            var s = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-top")),
                                o = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-left"));
                            r += g.$iframe.offset().top + s, n += g.$iframe.offset().left + o
                        }
                        return g.popups.show("image.insert", n, r), O(), 0 <= g.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, "")) ? (pe(!0), G(t.files)) : I(b), e.preventDefault(), e.stopPropagation(), !1
                    }
                }
            }

            function X(e) {
                if (e) return g.popups.onRefresh("image.insert", y), g.popups.onHide("image.insert", w), !0;
                var t, a, i = "";
                g.opts.imageUpload || -1 === g.opts.imageInsertButtons.indexOf("imageUpload") || g.opts.imageInsertButtons.splice(g.opts.imageInsertButtons.indexOf("imageUpload"), 1);
                var n = g.button.buildList(g.opts.imageInsertButtons);
                "" !== n && (i = '<div class="fr-buttons fr-tabs">'.concat(n, "</div>"));
                var r = g.opts.imageInsertButtons.indexOf("imageUpload"),
                    s = g.opts.imageInsertButtons.indexOf("imageByURL"), o = "";
                0 <= r && (t = " fr-active", 0 <= s && s < r && (t = ""), o = '<div class="fr-image-upload-layer'.concat(t, ' fr-layer" id="fr-image-upload-layer-').concat(g.id, '"><strong>').concat(g.language.translate("Drop image"), "</strong><br>(").concat(g.language.translate("or click"), ')<div class="fr-form"><input type="file" accept="image/').concat(g.opts.imageAllowedTypes.join(", image/").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-').concat(g.id, '" role="button"></div></div>'));
                var l = "";
                0 <= s && (t = " fr-active", 0 <= r && r < s && (t = ""), l = '<div class="fr-image-by-url-layer'.concat(t, ' fr-layer" id="fr-image-by-url-layer-').concat(g.id, '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-').concat(g.id, '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">').concat(g.language.translate("Insert"), "</button></div></div>"));
                var f = {
                    buttons: i,
                    upload_layer: o,
                    by_url_layer: l,
                    progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>'
                };
                return 1 <= g.opts.imageInsertButtons.length && (a = g.popups.create("image.insert", f)), g.$wp && g.events.$on(g.$wp, "scroll", function () {
                    c && g.popups.isVisible("image.insert") && ve()
                }), function p(i) {
                    g.events.$on(i, "dragover dragenter", ".fr-image-upload-layer", function (e) {
                        return d(this).addClass("fr-drop"), (g.browser.msie || g.browser.edge) && e.preventDefault(), !1
                    }, !0), g.events.$on(i, "dragleave dragend", ".fr-image-upload-layer", function (e) {
                        return d(this).removeClass("fr-drop"), (g.browser.msie || g.browser.edge) && e.preventDefault(), !1
                    }, !0), g.events.$on(i, "drop", ".fr-image-upload-layer", function (e) {
                        e.preventDefault(), e.stopPropagation(), d(this).removeClass("fr-drop");
                        var t = e.originalEvent.dataTransfer;
                        if (t && t.files) {
                            var a = i.data("instance") || g;
                            a.events.disableBlur(), a.image.upload(t.files), a.events.enableBlur()
                        }
                    }, !0), g.helpers.isIOS() && g.events.$on(i, "touchstart", '.fr-image-upload-layer input[type="file"]', function () {
                        d(this).trigger("click")
                    }, !0), g.events.$on(i, "change", '.fr-image-upload-layer input[type="file"]', function () {
                        if (this.files) {
                            var e = i.data("instance") || g;
                            e.events.disableBlur(), i.find("input:focus").blur(), e.events.enableBlur(), e.image.upload(this.files, c)
                        }
                        d(this).val("")
                    }, !0)
                }(a), a
            }

            function F() {
                c && g.popups.get("image.alt").find("input").val(c.attr("alt") || "").trigger("change")
            }

            function j() {
                var e = g.popups.get("image.alt");
                e || (e = q()), k(), g.popups.refresh("image.alt"), g.popups.setContainer("image.alt", g.$sc);
                var t = we();
                Ce() && (t = t.find(".fr-img-wrap"));
                var a = t.offset().left + t.outerWidth() / 2, i = t.offset().top + t.outerHeight();
                g.popups.show("image.alt", a, i, t.outerHeight(), !0)
            }

            function q(e) {
                if (e) return g.popups.onRefresh("image.alt", F), !0;
                var t = {
                    buttons: '<div class="fr-buttons fr-tabs">'.concat(g.button.buildList(g.opts.imageAltButtons), "</div>"),
                    alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'.concat(g.id, '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-').concat(g.id, '" type="text" placeholder="').concat(g.language.translate("Alternative Text"), '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">').concat(g.language.translate("Update"), "</button></div></div>")
                }, a = g.popups.create("image.alt", t);
                return g.$wp && g.events.$on(g.$wp, "scroll.image-alt", function () {
                    c && g.popups.isVisible("image.alt") && j()
                }), a
            }

            function Q() {
                var e = g.popups.get("image.size");
                if (c) if (Ce()) {
                    var t = c.parent();
                    t.get(0).style.width || (t = c.parent().parent()), e.find('input[name="width"]').val(t.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height).trigger("change")
                } else e.find('input[name="width"]').val(c.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(c.get(0).style.height).trigger("change")
            }

            function J() {
                var e = g.popups.get("image.size");
                e || (e = Z()), k(), g.popups.refresh("image.size"), g.popups.setContainer("image.size", g.$sc);
                var t = we();
                Ce() && (t = t.find(".fr-img-wrap"));
                var a = t.offset().left + t.outerWidth() / 2, i = t.offset().top + t.outerHeight();
                g.popups.show("image.size", a, i, t.outerHeight(), !0)
            }

            function Z(e) {
                if (e) return g.popups.onRefresh("image.size", Q), !0;
                var t = {
                    buttons: '<div class="fr-buttons fr-tabs">'.concat(g.button.buildList(g.opts.imageSizeButtons), "</div>"),
                    size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'.concat(g.id, '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-\'').concat(g.id, '" type="text" name="width" placeholder="').concat(g.language.translate("Width"), '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height').concat(g.id, '" type="text" name="height" placeholder="').concat(g.language.translate("Height"), '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">').concat(g.language.translate("Update"), "</button></div></div>")
                }, a = g.popups.create("image.size", t);
                return g.$wp && g.events.$on(g.$wp, "scroll.image-size", function () {
                    c && g.popups.isVisible("image.size") && J()
                }), a
            }

            function ee(e, t, a, i) {
                return e.pageX = t, x.call(this, e), e.pageX = e.pageX + a * Math.floor(Math.pow(1.1, i)), $.call(this, e), U.call(this, e), ++i
            }

            function te(e) {
                (e = e || we()) && !1 !== g.events.trigger("image.beforeRemove", [e]) && (g.popups.hideAll(), be(), pe(!0), g.undo.canDo() || g.undo.saveStep(), e.get(0) == g.el ? e.removeAttr("src") : (e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? (g.selection.setBefore(e.get(0).parentNode) || g.selection.setAfter(e.get(0).parentNode) || e.parent().after(_e.MARKERS), d(e.get(0).parentNode).remove()) : (g.selection.setBefore(e.get(0)) || g.selection.setAfter(e.get(0)) || e.after(_e.MARKERS), e.remove()), g.html.fillEmptyBlocks(), g.selection.restore()), g.undo.saveStep())
            }

            function ae(e) {
                var t = e.which;
                if (c && (t == _e.KEYCODE.BACKSPACE || t == _e.KEYCODE.DELETE)) return e.preventDefault(), e.stopPropagation(), te(), !1;
                if (c && t == _e.KEYCODE.ESC) {
                    var a = c;
                    return pe(!0), g.selection.setAfter(a.get(0)), g.selection.restore(), e.preventDefault(), !1
                }
                if (!c || t != _e.KEYCODE.ARROW_LEFT && t != _e.KEYCODE.ARROW_RIGHT) return c && t === _e.KEYCODE.TAB ? (e.preventDefault(), e.stopPropagation(), pe(!0), !1) : c && t != _e.KEYCODE.F10 && !g.keys.isBrowserAction(e) ? (e.preventDefault(), e.stopPropagation(), !1) : void 0;
                var i = c.get(0);
                return pe(!0), t == _e.KEYCODE.ARROW_LEFT ? g.selection.setBefore(i) : g.selection.setAfter(i), g.selection.restore(), e.preventDefault(), !1
            }

            function ie(e) {
                if (e && "IMG" == e.tagName) {
                    if (g.node.hasClass(e, "fr-uploading") || g.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : g.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), e.parentNode && e.parentNode.parentNode && g.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
                        var t = e.parentNode.parentNode;
                        t.removeAttribute("contenteditable"), t.removeAttribute("draggable"), t.classList.remove("fr-draggable");
                        var a = e.nextSibling;
                        a && a.removeAttribute("contenteditable")
                    }
                } else if (e && e.nodeType == Node.ELEMENT_NODE) for (var i = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), n = 0; n < i.length; n++) ie(i[n])
            }

            function ne(e) {
                if (!1 === g.events.trigger("image.beforePasteUpload", [e])) return !1;
                c = d(e), S(), r(), ve(), O(), c.on("load", function () {
                    var t = [];
                    S(), d(g.popups.get("image.insert").get(0)).find("div.fr-active.fr-error").length < 1 && O(), d(this).data("events").find(function (e) {
                        "load" === e[0] && t.push(e)
                    }), t.length <= 1 && d(this).off("load")
                });
                for (var t = d(e).attr("src").split(","), a = atob(t[1]), i = [], n = 0; n < a.length; n++) i.push(a.charCodeAt(n));
                G([new Blob([new Uint8Array(i)], {type: t[0].replace(/data\:/g, "").replace(/;base64/g, "")})], c)
            }

            function re() {
                g.opts.imagePaste ? g.$el.find("img[data-fr-image-pasted]").each(function (e, i) {
                    if (g.opts.imagePasteProcess) {
                        var t = g.opts.imageDefaultWidth;
                        t && "auto" != t && (t += g.opts.imageResizeWithPercent ? "%" : "px"), d(i).css("width", t).removeClass("fr-dii fr-dib fr-fir fr-fil"), me(d(i), g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign)
                    }
                    if (0 === i.src.indexOf("data:")) ne(i); else if (0 === i.src.indexOf("blob:") || 0 === i.src.indexOf("http") && g.opts.imageUploadRemoteUrls && g.opts.imageCORSProxy) {
                        var a = new Image;
                        a.crossOrigin = "Anonymous", a.onload = function () {
                            var e, t = g.o_doc.createElement("CANVAS"), a = t.getContext("2d");
                            t.height = this.naturalHeight, t.width = this.naturalWidth, a.drawImage(this, 0, 0), setTimeout(function () {
                                ne(i)
                            }, 0), e = 2e3 < this.naturalWidth || 1500 < this.naturalHeight ? "jpeg" : "png", i.src = t.toDataURL("image/".concat(e))
                        }, a.src = (0 === i.src.indexOf("blob:") ? "" : "".concat(g.opts.imageCORSProxy, "/")) + i.src
                    } else 0 !== i.src.indexOf("http") || 0 === i.src.indexOf("https://mail.google.com/mail") ? (g.selection.save(), d(i).remove(), g.selection.restore()) : d(i).removeAttr("data-fr-image-pasted")
                }) : g.$el.find("img[data-fr-image-pasted]").remove()
            }

            function se(e) {
                var t = e.target.result, a = g.opts.imageDefaultWidth;
                a && "auto" != a && (a += g.opts.imageResizeWithPercent ? "%" : "px"), g.undo.saveStep(), g.html.insert('<img data-fr-image-pasted="true" src="'.concat(t, '"').concat(a ? ' style="width: '.concat(a, ';"') : "", ">"));
                var i = g.$el.find('img[data-fr-image-pasted="true"]');
                i && me(i, g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign), g.events.trigger("paste.after")
            }

            function oe(e) {
                if (e && e.clipboardData && e.clipboardData.items) {
                    var t = null;
                    if (e.clipboardData.types && -1 != [].indexOf.call(e.clipboardData.types, "text/rtf") || e.clipboardData.getData("text/rtf")) t = e.clipboardData.items[0].getAsFile(); else for (var a = 0; a < e.clipboardData.items.length && !(t = e.clipboardData.items[a].getAsFile()); a++) ;
                    if (t) return function i(e) {
                        var t = new FileReader;
                        t.onload = se, t.readAsDataURL(e)
                    }(t), !1
                }
            }

            function le(e) {
                return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ')
            }

            function fe(e) {
                if ("false" == d(this).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                if (e && "touchend" == e.type && a) return !0;
                if (e && g.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
                for (var t = 0; t < _e.INSTANCES.length; t++) _e.INSTANCES[t] != g && _e.INSTANCES[t].events.trigger("image.hideResizer");
                g.toolbar.disable(), e && (e.stopPropagation(), e.preventDefault()), g.helpers.isMobile() && (g.events.disableBlur(), g.$el.blur(), g.events.enableBlur()), g.opts.iframe && g.size.syncIframe(), c = d(this), be(), S(), r(), g.browser.msie ? (g.popups.areVisible() && g.events.disableBlur(), g.win.getSelection && (g.win.getSelection().removeAllRanges(), g.win.getSelection().addRange(g.doc.createRange()))) : g.selection.clear(), g.helpers.isIOS() && (g.events.disableBlur(), g.$el.blur()), g.button.bulkRefresh(), g.events.trigger("video.hideResizer")
            }

            function pe(e) {
                c && (function t() {
                    return ge
                }() || !0 === e) && (g.toolbar.enable(), l.removeClass("fr-active"), g.popups.hide("image.edit"), c = null, de(), f = null, p && p.hide())
            }

            n[i] = "Image cannot be loaded from the passed link.", n[m] = "No link in upload response.", n[u] = "Error during file upload.", n[h] = "Parsing response failed.", n[v] = "File is too large.", n[b] = "Image file type is invalid.", n[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
            var ge = !(n[8] = "Image file is corrupted.");

            function ce() {
                ge = !0
            }

            function de() {
                ge = !1
            }

            function me(e, t, a) {
                !g.opts.htmlUntouched && g.opts.useClasses ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"), a && e.addClass("fr-fi".concat(a[0])), t && e.addClass("fr-di".concat(t[0]))) : "inline" == t ? (e.css({
                    display: "inline-block",
                    verticalAlign: "bottom",
                    margin: g.opts.imageDefaultMargin
                }), "center" == a ? e.css({
                    "float": "none",
                    marginBottom: "",
                    marginTop: "",
                    maxWidth: "calc(100% - ".concat(2 * g.opts.imageDefaultMargin, "px)"),
                    textAlign: "center"
                }) : "left" == a ? e.css({
                    "float": "left",
                    marginLeft: 0,
                    maxWidth: "calc(100% - ".concat(g.opts.imageDefaultMargin, "px)"),
                    textAlign: "left"
                }) : e.css({
                    "float": "right",
                    marginRight: 0,
                    maxWidth: "calc(100% - ".concat(g.opts.imageDefaultMargin, "px)"),
                    textAlign: "right"
                })) : "block" == t && (e.css({
                    display: "block",
                    "float": "none",
                    verticalAlign: "top",
                    margin: "".concat(g.opts.imageDefaultMargin, "px auto"),
                    textAlign: "center"
                }), "left" == a ? e.css({marginLeft: 0, textAlign: "left"}) : "right" == a && e.css({
                    marginRight: 0,
                    textAlign: "right"
                }))
            }

            function ue(e) {
                if (void 0 === e && (e = we()), e) {
                    if (e.hasClass("fr-fil")) return "left";
                    if (e.hasClass("fr-fir")) return "right";
                    if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center";
                    var t = e.css("float");
                    if (e.css("float", "none"), "block" == e.css("display")) {
                        if (e.css("float", ""), e.css("float") != t && e.css("float", t), 0 === parseInt(e.css("margin-left"), 10)) return "left";
                        if (0 === parseInt(e.css("margin-right"), 10)) return "right"
                    } else {
                        if (e.css("float", ""), e.css("float") != t && e.css("float", t), "left" == e.css("float")) return "left";
                        if ("right" == e.css("float")) return "right"
                    }
                }
                return "center"
            }

            function he(e) {
                void 0 === e && (e = we());
                var t = e.css("float");
                return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline")
            }

            function ve() {
                var e = g.popups.get("image.insert");
                e || (e = X()), g.popups.isVisible("image.insert") || (k(), g.popups.refresh("image.insert"), g.popups.setContainer("image.insert", g.$sc));
                var t = we();
                Ce() && (t = t.find(".fr-img-wrap"));
                var a = t.offset().left + t.outerWidth() / 2, i = t.offset().top + t.outerHeight();
                g.popups.show("image.insert", a, i, t.outerHeight(!0), !0)
            }

            function be() {
                if (c) {
                    g.events.disableBlur(), g.selection.clear();
                    var e = g.doc.createRange();
                    e.selectNode(c.get(0)), g.browser.msie && e.collapse(!0), g.selection.get().addRange(e), g.events.enableBlur()
                }
            }

            function ye() {
                return c
            }

            function we() {
                return Ce() ? c.parents(".fr-img-caption").first() : c
            }

            function Ce() {
                return !!c && 0 < c.parents(".fr-img-caption").length
            }

            return {
                _init: function Ae() {
                    var i;
                    (function e() {
                        g.events.$on(g.$el, g._mousedown, "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', function (e) {
                            if ("false" == d(this).parents("contenteditable").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                            g.helpers.isMobile() || g.selection.clear(), t = !0, g.popups.areVisible() && g.events.disableBlur(), g.browser.msie && (g.events.disableBlur(), g.$el.attr("contenteditable", !1)), g.draggable || "touchstart" == e.type || e.preventDefault(), e.stopPropagation()
                        }), g.events.$on(g.$el, g._mousedown, ".fr-img-caption .fr-inner", function (e) {
                            g.core.hasFocus() || g.events.focus(), e.stopPropagation()
                        }), g.events.$on(g.$el, "paste", ".fr-img-caption .fr-inner", function (e) {
                            g.toolbar.hide(), e.stopPropagation()
                        }), g.events.$on(g.$el, g._mouseup, "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', function (e) {
                            if ("false" == d(this).parents("contenteditable").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                            t && (t = !1, e.stopPropagation(), g.browser.msie && (g.$el.attr("contenteditable", !0), g.events.enableBlur()))
                        }), g.events.on("keyup", function (e) {
                            if (e.shiftKey && "" === g.selection.text().replace(/\n/g, "") && g.keys.isArrow(e.which)) {
                                var t = g.selection.element(), a = g.selection.endElement();
                                t && "IMG" == t.tagName ? T(d(t)) : a && "IMG" == a.tagName && T(d(a))
                            }
                        }, !0), g.events.on("drop", V), g.events.on("element.beforeDrop", H), g.events.on("window.mousedown", ce), g.events.on("window.touchmove", de), g.events.on("mouseup window.mouseup", function () {
                            if (c) return pe(), !1;
                            de()
                        }), g.events.on("commands.mousedown", function (e) {
                            0 < e.parents(".fr-toolbar").length && pe()
                        }), g.events.on("image.resizeEnd", function () {
                            g.opts.iframe && g.size.syncIframe()
                        }), g.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function () {
                            pe(!(t = !1))
                        }), g.events.on("modals.hide", function () {
                            c && (be(), g.selection.clear())
                        }), g.events.on("image.resizeEnd", function () {
                            g.win.getSelection && T(c)
                        }), g.opts.imageAddNewLine && g.events.on("image.inserted", function (e) {
                            var t = e.get(0);
                            for (t.nextSibling && "BR" === t.nextSibling.tagName && (t = t.nextSibling); t && !g.node.isElement(t);) t = g.node.isLastSibling(t) ? t.parentNode : null;
                            g.node.isElement(t) && (g.opts.enter === _e.ENTER_BR ? e.after("<br>") : d(g.node.blockParent(e.get(0))).after("<".concat(g.html.defaultTag(), "><br></").concat(g.html.defaultTag(), ">")))
                        })
                    })(), "IMG" == g.el.tagName && g.$el.addClass("fr-view"), g.events.$on(g.$el, g.helpers.isMobile() && !g.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', fe), g.helpers.isMobile() && (g.events.$on(g.$el, "touchstart", "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', function () {
                        a = !1
                    }), g.events.$on(g.$el, "touchmove", function () {
                        a = !0
                    })), g.$wp ? (g.events.on("window.keydown keydown", ae, !0), g.events.on("keyup", function (e) {
                        if (c && e.which == _e.KEYCODE.ENTER) return !1
                    }, !0), g.events.$on(g.$el, "keydown", function () {
                        var e = g.selection.element();
                        (e.nodeType === Node.TEXT_NODE || "BR" == e.tagName && g.node.isLastSibling(e)) && (e = e.parentNode), g.node.hasClass(e, "fr-inner") || (g.node.hasClass(e, "fr-img-caption") || (e = d(e).parents(".fr-img-caption").get(0)), g.node.hasClass(e, "fr-img-caption") && (d(e).after(_e.INVISIBLE_SPACE + _e.MARKERS), g.selection.restore()))
                    })) : g.events.$on(g.$win, "keydown", ae), g.events.on("toolbar.esc", function () {
                        if (c) {
                            if (g.$wp) g.events.disableBlur(), g.events.focus(); else {
                                var e = c;
                                pe(!0), g.selection.setAfter(e.get(0)), g.selection.restore()
                            }
                            return !1
                        }
                    }, !0), g.events.on("toolbar.focusEditor", function () {
                        if (c) return !1
                    }, !0), g.events.on("window.cut window.copy", function (e) {
                        if (c && g.popups.isVisible("image.edit") && !g.popups.get("image.edit").find(":focus").length) {
                            var t = we();
                            Ce() ? (t.before(_e.START_MARKER), t.after(_e.END_MARKER), g.selection.restore(), g.paste.saveCopiedText(t.get(0).outerHTML, t.text())) : (be(), g.paste.saveCopiedText(c.get(0).outerHTML, c.attr("alt"))), "copy" == e.type ? setTimeout(function () {
                                T(c)
                            }) : (pe(!0), g.undo.saveStep(), setTimeout(function () {
                                g.undo.saveStep()
                            }, 0))
                        }
                    }, !0), g.browser.msie && g.events.on("keydown", function (e) {
                        if (!g.selection.isCollapsed() || !c) return !0;
                        var t = e.which;
                        t == _e.KEYCODE.C && g.keys.ctrlKey(e) ? g.events.trigger("window.copy") : t == _e.KEYCODE.X && g.keys.ctrlKey(e) && g.events.trigger("window.cut")
                    }), g.events.$on(d(g.o_win), "keydown", function (e) {
                        var t = e.which;
                        if (c && t == _e.KEYCODE.BACKSPACE) return e.preventDefault(), !1
                    }), g.events.$on(g.$win, "keydown", function (e) {
                        var t = e.which;
                        c && c.hasClass("fr-uploading") && t == _e.KEYCODE.ESC && c.trigger("abortUpload")
                    }), g.events.on("destroy", function () {
                        c && c.hasClass("fr-uploading") && c.trigger("abortUpload")
                    }), g.events.on("paste.before", oe), g.events.on("paste.beforeCleanup", le), g.events.on("paste.after", re), g.events.on("html.set", A), g.events.on("html.inserted", A), A(), g.events.on("destroy", function () {
                        o = []
                    }), g.events.on("html.processGet", ie), g.opts.imageOutputSize && g.events.on("html.beforeGet", function () {
                        i = g.el.querySelectorAll("img");
                        for (var e = 0; e < i.length; e++) {
                            var t = i[e].style.width || d(i[e]).width(), a = i[e].style.height || d(i[e]).height();
                            t && i[e].setAttribute("width", "".concat(t).replace(/px/, "")), a && i[e].setAttribute("height", "".concat(a).replace(/px/, ""))
                        }
                    }), g.opts.iframe && g.events.on("image.loaded", g.size.syncIframe), g.$wp && (E(), g.events.on("contentChanged", E)), g.events.$on(d(g.o_win), "orientationchange.image", function () {
                        setTimeout(function () {
                            c && T(c)
                        }, 100)
                    }), P(!0), X(!0), Z(!0), q(!0), g.events.on("node.remove", function (e) {
                        if ("IMG" == e.get(0).tagName) return te(e), !1
                    })
                },
                showInsertPopup: function Ee() {
                    var e = g.$tb.find('.fr-command[data-cmd="insertImage"]'), t = g.popups.get("image.insert");
                    if (t || (t = X()), k(), !t.hasClass("fr-active")) if (g.popups.refresh("image.insert"), g.popups.setContainer("image.insert", g.$tb), e.isVisible()) {
                        var a = g.button.getPosition(e), i = a.left, n = a.top;
                        g.popups.show("image.insert", i, n, e.outerHeight())
                    } else g.position.forSelection(t), g.popups.show("image.insert")
                },
                showLayer: function Se(e) {
                    var t, a, i = g.popups.get("image.insert");
                    if (c || g.opts.toolbarInline) {
                        if (c) {
                            var n = we();
                            Ce() && (n = n.find(".fr-img-wrap")), a = n.offset().top + n.outerHeight(), t = n.offset().left
                        }
                    } else {
                        var r = g.$tb.find('.fr-command[data-cmd="insertImage"]');
                        t = r.offset().left, a = r.offset().top + (g.opts.toolbarBottom ? 10 : r.outerHeight() - 10)
                    }
                    !c && g.opts.toolbarInline && (a = i.offset().top - g.helpers.getPX(i.css("margin-top")), i.hasClass("fr-above") && (a += i.outerHeight())), i.find(".fr-layer").removeClass("fr-active"), i.find(".fr-".concat(e, "-layer")).addClass("fr-active"), g.popups.show("image.insert", t, a, c ? c.outerHeight() : 0), g.accessibility.focusPopup(i)
                },
                refreshUploadButton: function Re(e) {
                    var t = g.popups.get("image.insert");
                    t && t.find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                },
                refreshByURLButton: function De(e) {
                    var t = g.popups.get("image.insert");
                    t && t.find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                },
                upload: G,
                insertByURL: function xe() {
                    var e = g.popups.get("image.insert").find(".fr-image-by-url-layer input");
                    if (0 < e.val().length) {
                        O(), N(g.language.translate("Loading image"));
                        var t = e.val().trim();
                        if (g.opts.imageUploadRemoteUrls && g.opts.imageCORSProxy && g.opts.imageUpload) {
                            var a = new XMLHttpRequest;
                            a.onload = function () {
                                200 == this.status ? G([new Blob([this.response], {type: this.response.type || "image/png"})], c) : I(i)
                            }, a.onerror = function () {
                                L(t, !0, [], c)
                            }, a.open("GET", "".concat(g.opts.imageCORSProxy, "/").concat(t), !0), a.responseType = "blob", a.send()
                        } else L(t, !0, [], c);
                        e.val(""), e.blur()
                    }
                },
                align: function $e(e) {
                    var t = we();
                    t.removeClass("fr-fir fr-fil"), !g.opts.htmlUntouched && g.opts.useClasses ? "left" == e ? t.addClass("fr-fil") : "right" == e && t.addClass("fr-fir") : me(t, he(), e), be(), S(), r(), g.selection.clear()
                },
                refreshAlign: function Ue(e) {
                    c && e.find("> *").first().replaceWith(g.icon.create("image-align-".concat(ue())))
                },
                refreshAlignOnShow: function Ie(e, t) {
                    c && t.find('.fr-command[data-param1="'.concat(ue(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                },
                display: function Pe(e) {
                    var t = we();
                    t.removeClass("fr-dii fr-dib"), !g.opts.htmlUntouched && g.opts.useClasses ? "inline" == e ? t.addClass("fr-dii") : "block" == e && t.addClass("fr-dib") : me(t, e, ue()), be(), S(), r(), g.selection.clear()
                },
                refreshDisplayOnShow: function Oe(e, t) {
                    c && t.find('.fr-command[data-param1="'.concat(he(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                },
                replace: ve,
                back: function e() {
                    c ? (g.events.disableBlur(), d(".fr-popup input:focus").blur(), T(c)) : (g.events.disableBlur(), g.selection.restore(), g.events.enableBlur(), g.popups.hide("image.insert"), g.toolbar.showInline())
                },
                get: ye,
                getEl: we,
                insert: L,
                showProgressBar: O,
                remove: te,
                hideProgressBar: k,
                applyStyle: function ke(e, t, a) {
                    if (void 0 === t && (t = g.opts.imageStyles), void 0 === a && (a = g.opts.imageMultipleStyles), !c) return !1;
                    var i = we();
                    if (!a) {
                        var n = Object.keys(t);
                        n.splice(n.indexOf(e), 1), i.removeClass(n.join(" "))
                    }
                    "object" == Le(t[e]) ? (i.removeAttr("style"), i.css(t[e].style)) : i.toggleClass(e), T(c)
                },
                showAltPopup: j,
                showSizePopup: J,
                setAlt: function Ne(e) {
                    if (c) {
                        var t = g.popups.get("image.alt");
                        c.attr("alt", e || t.find("input").val() || ""), t.find("input:focus").blur(), T(c)
                    }
                },
                setSize: function Be(e, t) {
                    if (c) {
                        var a = g.popups.get("image.size");
                        e = e || a.find('input[name="width"]').val() || "", t = t || a.find('input[name="height"]').val() || "";
                        var i = /^[\d]+((px)|%)*$/g;
                        c.removeAttr("width").removeAttr("height"), e.match(i) ? c.css("width", e) : c.css("width", ""), t.match(i) ? c.css("height", t) : c.css("height", ""), Ce() && (c.parents(".fr-img-caption").removeAttr("width").removeAttr("height"), e.match(i) ? c.parents(".fr-img-caption").css("width", e) : c.parents(".fr-img-caption").css("width", ""), t.match(i) ? c.parents(".fr-img-caption").css("height", t) : c.parents(".fr-img-caption").css("height", "")), a && a.find("input:focus").blur(), T(c)
                    }
                },
                toggleCaption: function Te() {
                    var e;
                    if (c && !Ce()) {
                        (e = c).parent().is("a") && (e = c.parent());
                        var t, a,
                            i = c.parents("ul") && 0 < c.parents("ul").length ? c.parents("ul") : c.parents("ol") && 0 < c.parents("ol").length ? c.parents("ol") : [];
                        if (0 < i.length) {
                            var n = i.find("li").length, r = c.parents("li"), s = document.createElement("li");
                            n - 1 === r.index() && (i.append(s), s.innerHTML = "&nbsp;")
                        }
                        e.attr("style") && (a = -1 < (t = e.attr("style").split(":")).indexOf("width") ? t[t.indexOf("width") + 1].replace(";", "") : "");
                        var o = g.opts.imageResizeWithPercent ? (-1 < a.indexOf("px") ? null : a) || "100%" : c.width() + "px";
                        e.wrap('<div class="fr-img-space-wrap"><span ' + (g.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + c.attr("class") + '" style="' + (g.opts.useClasses ? "" : e.attr("style")) + '" draggable="false"></span><p class="fr-img-space-wrap2">&nbsp;</p></div>'), e.wrap('<span class="fr-img-wrap"></span>'), c.after('<span class="fr-inner"'.concat(g.browser.mozilla ? "" : ' contenteditable="true"', ">").concat(_e.START_MARKER).concat(g.language.translate("Image Caption")).concat(_e.END_MARKER, "</span>")), c.removeAttr("class").removeAttr("style").removeAttr("width"), c.parents(".fr-img-caption").css("width", o), pe(!0), g.selection.restore()
                    } else e = we(), c.insertAfter(e), c.attr("class", e.attr("class").replace("fr-img-caption", "")).attr("style", e.attr("style")), e.remove(), T(c)
                },
                hasCaption: Ce,
                exitEdit: pe,
                edit: T
            }
        }, _e.DefineIcon("insertImage", {
            NAME: "image",
            SVG_KEY: "insertImage"
        }), _e.RegisterShortcut(_e.KEYCODE.P, "insertImage", null, "P"), _e.RegisterCommand("insertImage", {
            title: "Insert Image",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function () {
                this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup()
            },
            plugin: "image"
        }), _e.DefineIcon("imageUpload", {
            NAME: "upload",
            SVG_KEY: "upload"
        }), _e.RegisterCommand("imageUpload", {
            title: "Upload Image",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function () {
                this.image.showLayer("image-upload")
            },
            refresh: function (e) {
                this.image.refreshUploadButton(e)
            }
        }), _e.DefineIcon("imageByURL", {
            NAME: "link",
            SVG_KEY: "insertLink"
        }), _e.RegisterCommand("imageByURL", {
            title: "By URL", undo: !1, focus: !1, toggle: !0, callback: function () {
                this.image.showLayer("image-by-url")
            }, refresh: function (e) {
                this.image.refreshByURLButton(e)
            }
        }), _e.RegisterCommand("imageInsertByURL", {
            title: "Insert Image",
            undo: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.image.insertByURL()
            },
            refresh: function (e) {
                this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert"))
            }
        }), _e.DefineIcon("imageDisplay", {
            NAME: "star",
            SVG_KEY: "imageDisplay"
        }), _e.RegisterCommand("imageDisplay", {
            title: "Display",
            type: "dropdown",
            options: {inline: "Inline", block: "Break Text"},
            callback: function (e, t) {
                this.image.display(t)
            },
            refresh: function (e) {
                this.opts.imageTextNear || e.addClass("fr-hidden")
            },
            refreshOnShow: function (e, t) {
                this.image.refreshDisplayOnShow(e, t)
            }
        }), _e.DefineIcon("image-align", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), _e.DefineIcon("image-align-left", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), _e.DefineIcon("image-align-right", {
            NAME: "align-right",
            SVG_KEY: "alignRight"
        }), _e.DefineIcon("image-align-center", {
            NAME: "align-justify",
            SVG_KEY: "alignCenter"
        }), _e.DefineIcon("imageAlign", {
            NAME: "align-justify",
            SVG_KEY: "alignJustify"
        }), _e.RegisterCommand("imageAlign", {
            type: "dropdown",
            title: "Align",
            options: {left: "Align Left", center: "None", right: "Align Right"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = _e.COMMANDS.imageAlign.options;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.icon.create("image-align-".concat(a)), '<span class="fr-sr-only">').concat(this.language.translate(t[a]), "</span></a></li>"));
                return e += "</ul>"
            },
            callback: function (e, t) {
                this.image.align(t)
            },
            refresh: function (e) {
                this.image.refreshAlign(e)
            },
            refreshOnShow: function (e, t) {
                this.image.refreshAlignOnShow(e, t)
            }
        }), _e.DefineIcon("imageReplace", {
            NAME: "exchange",
            FA5NAME: "exchange-alt",
            SVG_KEY: "replaceImage"
        }), _e.RegisterCommand("imageReplace", {
            title: "Replace",
            undo: !1,
            focus: !1,
            popup: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.image.replace()
            }
        }), _e.DefineIcon("imageRemove", {
            NAME: "trash",
            SVG_KEY: "remove"
        }), _e.RegisterCommand("imageRemove", {
            title: "Remove", callback: function () {
                this.image.remove()
            }
        }), _e.DefineIcon("imageBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), _e.RegisterCommand("imageBack", {
            title: "Back", undo: !1, focus: !1, back: !0, callback: function () {
                this.image.back()
            }, refresh: function (e) {
                this.$;
                this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
            }
        }), _e.RegisterCommand("imageDismissError", {
            title: "OK", undo: !1, callback: function () {
                this.image.hideProgressBar(!0)
            }
        }), _e.DefineIcon("imageStyle", {
            NAME: "magic",
            SVG_KEY: "imageClass"
        }), _e.RegisterCommand("imageStyle", {
            title: "Style", type: "dropdown", html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.imageStyles;
                for (var a in t) if (t.hasOwnProperty(a)) {
                    var i = t[a];
                    "object" == Le(i) && (i = i.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="'.concat(a, '">').concat(this.language.translate(i), "</a></li>")
                }
                return e += "</ul>"
            }, callback: function (e, t) {
                this.image.applyStyle(t)
            }, refreshOnShow: function (e, t) {
                var a = this.$, i = this.image.getEl();
                i && t.find(".fr-command").each(function () {
                    var e = a(this).data("param1"), t = i.hasClass(e);
                    a(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        }), _e.DefineIcon("imageAlt", {
            NAME: "info",
            SVG_KEY: "imageAltText"
        }), _e.RegisterCommand("imageAlt", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Alternative Text",
            callback: function () {
                this.image.showAltPopup()
            }
        }), _e.RegisterCommand("imageSetAlt", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function () {
                this.image.setAlt()
            }
        }), _e.DefineIcon("imageSize", {
            NAME: "arrows-alt",
            SVG_KEY: "imageSize"
        }), _e.RegisterCommand("imageSize", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Change Size",
            callback: function () {
                this.image.showSizePopup()
            }
        }), _e.RegisterCommand("imageSetSize", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function () {
                this.image.setSize()
            }
        }), _e.DefineIcon("imageCaption", {
            NAME: "commenting",
            FA5NAME: "comment-alt",
            SVG_KEY: "imageCaption"
        }), _e.RegisterCommand("imageCaption", {
            undo: !0,
            focus: !1,
            title: "Image Caption",
            refreshAfterCallback: !0,
            callback: function () {
                this.image.toggleCaption()
            },
            refresh: function (e) {
                this.image.get() && e.toggleClass("fr-active", this.image.hasCaption())
            }
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/inline_class.min.js*/
amis.define('3c88fdf', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (n, a) {
        "object" == typeof exports && "undefined" != typeof module ? a(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], a) : a(n.FroalaEditor)
    }(this, function (n) {
        "use strict";
        n = n && n.hasOwnProperty("default") ? n["default"] : n, Object.assign(n.DEFAULTS, {
            inlineClasses: {
                "fr-class-code": "Code",
                "fr-class-highlighted": "Highlighted",
                "fr-class-transparency": "Transparent"
            }
        }), n.PLUGINS.inlineClass = function (e) {
            var i = e.$;
            return {
                apply: function a(n) {
                    e.format.toggle("span", {"class": n})
                }, refreshOnShow: function s(n, a) {
                    a.find(".fr-command").each(function () {
                        var n = i(this).data("param1"), a = e.format.is("span", {"class": n});
                        i(this).toggleClass("fr-active", a).attr("aria-selected", a)
                    })
                }
            }
        }, n.RegisterCommand("inlineClass", {
            type: "dropdown", title: "Inline Class", html: function () {
                var n = '<ul class="fr-dropdown-list" role="presentation">', a = this.opts.inlineClasses;
                for (var e in a) a.hasOwnProperty(e) && (n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineClass" data-param1="'.concat(e, '" title="').concat(a[e], '">').concat(a[e], "</a></li>"));
                return n += "</ul>"
            }, callback: function (n, a) {
                this.inlineClass.apply(a)
            }, refreshOnShow: function (n, a) {
                this.inlineClass.refreshOnShow(n, a)
            }, plugin: "inlineClass"
        }), n.DefineIcon("inlineClass", {NAME: "tag", SVG_KEY: "inlineClass"})
    });

});

;/*!node_modules/froala-editor/js/plugins/inline_style.min.js*/
amis.define('0b107ab', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {
            inlineStyles: {
                "Big Red": "font-size: 20px; color: red;",
                "Small Blue": "font-size: 14px; color: blue;"
            }
        }), e.PLUGINS.inlineStyle = function (i) {
            return {
                apply: function a(e) {
                    for (var t = e.split(";"), n = 0; n < t.length; n++) {
                        var l = t[n].split(":");
                        t[n].length && 2 == l.length && i.format.applyStyle(l[0].trim(), l[1].trim())
                    }
                }
            }
        }, e.RegisterCommand("inlineStyle", {
            type: "dropdown", html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.inlineStyles;
                for (var n in t) if (t.hasOwnProperty(n)) {
                    var l = t[n] + (-1 === t[n].indexOf("display:block;") ? " display:block;" : "");
                    e += '<li role="presentation"><span style="'.concat(l, '" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="').concat(t[n], '" title="').concat(this.language.translate(n), '">').concat(this.language.translate(n), "</a></span></li>")
                }
                return e += "</ul>"
            }, title: "Inline Style", callback: function (e, t) {
                this.inlineStyle.apply(t)
            }, plugin: "inlineStyle"
        }), e.DefineIcon("inlineStyle", {NAME: "paint-brush", SVG_KEY: "inlineStyle"})
    });

});

;/*!node_modules/froala-editor/js/plugins/line_breaker.min.js*/
amis.define('f8844f6', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (b) {
        "use strict";
        b = b && b.hasOwnProperty("default") ? b["default"] : b, Object.assign(b.DEFAULTS, {
            lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly", "img"],
            lineBreakerOffset: 15,
            lineBreakerHorizontalOffset: 10
        }), b.PLUGINS.lineBreaker = function (g) {
            var v, t, a, m = g.$;

            function f(e, t) {
                var n, r, a, o, i, s, f, l;
                if (null == e) i = (o = t.parent()).offset().top, n = (f = t.offset().top) - Math.min((f - i) / 2, g.opts.lineBreakerOffset), a = o.outerWidth(), r = o.offset().left; else if (null == t) (s = (o = e.parent()).offset().top + o.outerHeight()) < (l = e.offset().top + e.outerHeight()) && (s = (o = m(o).parent()).offset().top + o.outerHeight()), n = l + Math.min(Math.abs(s - l) / 2, g.opts.lineBreakerOffset), a = o.outerWidth(), r = o.offset().left; else {
                    o = e.parent();
                    var p = e.offset().top + e.height(), u = t.offset().top;
                    if (u < p) return !1;
                    n = (p + u) / 2, a = o.outerWidth(), r = o.offset().left
                }
                if (g.opts.iframe) {
                    var c = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-top")),
                        d = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-left"));
                    r += g.$iframe.offset().left - g.helpers.scrollLeft() + d, n += g.$iframe.offset().top - g.helpers.scrollTop() + c
                }
                g.$box.append(v), v.css("top", n - g.win.pageYOffset), v.css("left", r - g.win.pageXOffset), v.css("width", a), v.data("tag1", e), v.data("tag2", t), v.addClass("fr-visible").data("instance", g)
            }

            function l(e) {
                if (e) {
                    var t = m(e);
                    if (0 === g.$el.find(t).length) return null;
                    if (e.nodeType != Node.TEXT_NODE && t.is(g.opts.lineBreakerTags.join(","))) return t;
                    if (0 < t.parents(g.opts.lineBreakerTags.join(",")).length) return e = t.parents(g.opts.lineBreakerTags.join(",")).get(0), 0 !== g.$el.find(m(e)).length && m(e).is(g.opts.lineBreakerTags.join(",")) ? m(e) : null
                }
                return null
            }

            function o(e, t) {
                var n = g.doc.elementFromPoint(e, t);
                return n && !m(n).closest(".fr-line-breaker").length && !g.node.isElement(n) && n != g.$wp.get(0) && function r(e) {
                    if ("undefined" != typeof e.inFroalaWrapper) return e.inFroalaWrapper;
                    for (var t = e; e.parentNode && e.parentNode !== g.$wp.get(0);) e = e.parentNode;
                    return t.inFroalaWrapper = e.parentNode == g.$wp.get(0), t.inFroalaWrapper
                }(n) ? n : null
            }

            function i(e, t, n) {
                for (var r = n, a = null; r <= g.opts.lineBreakerOffset && !a;) (a = o(e, t - r)) || (a = o(e, t + r)), r += n;
                return a
            }

            function p(e, t, n) {
                for (var r = null, a = 100; !r && e > g.$box.offset().left && e < g.$box.offset().left + g.$box.outerWidth() && 0 < a;) (r = o(e, t)) || (r = i(e, t, 5)), "left" == n ? e -= g.opts.lineBreakerHorizontalOffset : e += g.opts.lineBreakerHorizontalOffset, a -= g.opts.lineBreakerHorizontalOffset;
                return r
            }

            function n(e) {
                var t = a = null, n = null,
                    r = g.doc.elementFromPoint(e.pageX - g.win.pageXOffset, e.pageY - g.win.pageYOffset);
                (t = r && ("HTML" == r.tagName || "BODY" == r.tagName || g.node.isElement(r) || 0 <= (r.getAttribute("class") || "").indexOf("fr-line-breaker")) ? ((n = i(e.pageX - g.win.pageXOffset, e.pageY - g.win.pageYOffset, 1)) || (n = p(e.pageX - g.win.pageXOffset - g.opts.lineBreakerHorizontalOffset, e.pageY - g.win.pageYOffset, "left")), n || (n = p(e.pageX - g.win.pageXOffset + g.opts.lineBreakerHorizontalOffset, e.pageY - g.win.pageYOffset, "right")), l(n)) : l(r)) ? function s(e, t) {
                    var n, r, a = e.offset().top, o = e.offset().top + e.outerHeight();
                    if (Math.abs(o - t) <= g.opts.lineBreakerOffset || Math.abs(t - a) <= g.opts.lineBreakerOffset) if (Math.abs(o - t) < Math.abs(t - a)) {
                        for (var i = (r = e.get(0)).nextSibling; i && i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length;) i = i.nextSibling;
                        if (!i) return f(e, null), !0;
                        if (n = l(i)) return f(e, n), !0
                    } else {
                        if (!(r = e.get(0)).previousSibling) return f(null, e), !0;
                        if (n = l(r.previousSibling)) return f(n, e), !0
                    }
                    v.removeClass("fr-visible").removeData("instance")
                }(t, e.pageY) : g.core.sameInstance(v) && v.removeClass("fr-visible").removeData("instance")
            }

            function r(e) {
                return !(v.hasClass("fr-visible") && !g.core.sameInstance(v)) && (g.popups.areVisible() || g.el.querySelector(".fr-selected-cell") ? (v.removeClass("fr-visible"), !0) : void (!1 !== t || g.edit.isDisabled() || (a && clearTimeout(a), a = setTimeout(n, 30, e))))
            }

            function s() {
                a && clearTimeout(a), v && v.hasClass("fr-visible") && v.removeClass("fr-visible").removeData("instance")
            }

            var u = function u() {
                t = !0, s()
            }, c = function c() {
                t = !1
            };

            function d(e) {
                e.preventDefault();
                var t = v.data("instance") || g;
                v.removeClass("fr-visible").removeData("instance");
                var n = v.data("tag1"), r = v.data("tag2"), a = g.html.defaultTag();
                null == n ? a && "TD" != r.parent().get(0).tagName && 0 === r.parents(a).length ? r.before("<".concat(a, ">").concat(b.MARKERS, "<br></").concat(a, ">")) : r.before("".concat(b.MARKERS, "<br>")) : a && "TD" != n.parent().get(0).tagName && 0 === n.parents(a).length ? n.after("<".concat(a, ">").concat(b.MARKERS, "<br></").concat(a, ">")) : n.after("".concat(b.MARKERS, "<br>")), t.selection.restore(), g.toolbar.enable()
            }

            return {
                _init: function h() {
                    if (!g.$wp) return !1;
                    !function e() {
                        g.shared.$line_breaker || (g.shared.$line_breaker = m(document.createElement("div")).attr("class", "fr-line-breaker").html('<a class="fr-floating-btn" role="button" tabIndex="-1" title="'.concat(g.language.translate("Break"), '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="17" y="7" width="2" height="8"/><rect x="10" y="13" width="7" height="2"/><path d="M10.000,10.000 L10.000,18.013 L5.000,14.031 L10.000,10.000 Z"/></svg></a>'))), v = g.shared.$line_breaker, g.events.on("shared.destroy", function () {
                            v.html("").removeData().remove(), v = null
                        }, !0), g.events.on("destroy", function () {
                            v.removeData("instance").removeClass("fr-visible"), m("body").first().append(v), clearTimeout(a)
                        }, !0), g.events.$on(v, "mousemove", function (e) {
                            e.stopPropagation()
                        }, !0), g.events.bindClick(v, "a", d)
                    }(), t = !1, g.events.$on(g.$win, "mousemove", r), g.events.$on(m(g.win), "scroll", s), g.events.on("popups.show.table.edit", s), g.events.on("commands.after", s), g.events.$on(m(g.win), "mousedown", u), g.events.$on(m(g.win), "mouseup", c)
                }
            }
        }
    });

});

;/*!node_modules/froala-editor/js/plugins/line_height.min.js*/
amis.define('3380b99', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {
            lineHeights: {
                Default: "",
                Single: "1",
                1.15: "1.15",
                1.5: "1.5",
                Double: "2"
            }
        }), e.PLUGINS.lineHeight = function (n) {
            var o = n.$;
            return {
                _init: function e() {
                }, apply: function a(e) {
                    n.selection.save(), n.html.wrap(!0, !0, !0, !0), n.selection.restore();
                    var t = n.selection.blocks();
                    t.length && o(t[0]).parent().is("td") && n.format.applyStyle("line-height", e.toString()), n.selection.save();
                    for (var i = 0; i < t.length; i++) o(t[i]).css("line-height", e), "" === o(t[i]).attr("style") && o(t[i]).removeAttr("style");
                    n.html.unwrap(), n.selection.restore()
                }, refreshOnShow: function r(e, t) {
                    var i = n.selection.blocks();
                    if (i.length) {
                        var l = o(i[0]);
                        t.find(".fr-command").each(function () {
                            var e = o(this).data("param1"), t = l.attr("style"),
                                i = 0 <= (t || "").indexOf("line-height: " + e + ";");
                            if (t) {
                                var n = t.substring(t.indexOf("line-height")), a = n.substr(0, n.indexOf(";")),
                                    r = a && a.split(":")[1];
                                r && r.length || "Default" !== l.text() || (i = !0)
                            }
                            t && -1 !== t.indexOf("line-height") || "" !== e || (i = !0), o(this).toggleClass("fr-active", i).attr("aria-selected", i)
                        })
                    }
                }
            }
        }, e.RegisterCommand("lineHeight", {
            type: "dropdown", html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.lineHeights;
                for (var i in t) t.hasOwnProperty(i) && (e += '<li role="presentation"><a class="fr-command '.concat(i, '" tabIndex="-1" role="option" data-cmd="lineHeight" data-param1="').concat(t[i], '" title="').concat(this.language.translate(i), '">').concat(this.language.translate(i), "</a></li>"));
                return e += "</ul>"
            }, title: "Line Height", callback: function (e, t) {
                this.lineHeight.apply(t)
            }, refreshOnShow: function (e, t) {
                this.lineHeight.refreshOnShow(e, t)
            }, plugin: "lineHeight"
        }), e.DefineIcon("lineHeight", {NAME: "arrows-v", FA5NAME: "arrows-alt-v", SVG_KEY: "lineHeight"})
    });

});

;/*!node_modules/froala-editor/js/plugins/link.min.js*/
amis.define('124909a', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (y) {
        "use strict";
        y = y && y.hasOwnProperty("default") ? y["default"] : y, Object.assign(y.POPUP_TEMPLATES, {
            "link.edit": "[_BUTTONS_]",
            "link.insert": "[_BUTTONS_][_INPUT_LAYER_]"
        }), Object.assign(y.DEFAULTS, {
            linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"],
            linkInsertButtons: ["linkBack", "|", "linkList"],
            linkAttributes: {},
            linkAutoPrefix: "http://",
            linkStyles: {"fr-green": "Green", "fr-strong": "Thick"},
            linkMultipleStyles: !0,
            linkConvertEmailAddress: !0,
            linkAlwaysBlank: !1,
            linkAlwaysNoFollow: !1,
            linkNoOpener: !0,
            linkNoReferrer: !0,
            linkList: [{text: "Froala", href: "https://froala.com", target: "_blank"}, {
                text: "Google",
                href: "https://google.com",
                target: "_blank"
            }, {displayText: "Facebook", href: "https://facebook.com"}],
            linkText: !0
        }), y.PLUGINS.link = function (u) {
            var k = u.$;

            function g() {
                var e = u.image ? u.image.get() : null;
                if (e || !u.$wp) return "A" == u.el.tagName ? u.el : e && e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? e.get(0).parentNode : void 0;
                var t = u.selection.ranges(0).commonAncestorContainer;
                try {
                    t && (t.contains && t.contains(u.el) || !u.el.contains(t) || u.el == t) && (t = null)
                } catch (r) {
                    t = null
                }
                if (t && "A" === t.tagName) return t;
                var n = u.selection.element(), i = u.selection.endElement();
                "A" == n.tagName || u.node.isElement(n) || (n = k(n).parentsUntil(u.$el, "a").first().get(0)), "A" == i.tagName || u.node.isElement(i) || (i = k(i).parentsUntil(u.$el, "a").first().get(0));
                try {
                    i && (i.contains && i.contains(u.el) || !u.el.contains(i) || u.el == i) && (i = null)
                } catch (r) {
                    i = null
                }
                try {
                    n && (n.contains && n.contains(u.el) || !u.el.contains(n) || u.el == n) && (n = null)
                } catch (r) {
                    n = null
                }
                return i && i == n && "A" == i.tagName ? (u.browser.msie || u.helpers.isMobile()) && (u.selection.info(n).atEnd || u.selection.info(n).atStart) ? null : n : null
            }

            function h() {
                var e, t, n, i, r = u.image ? u.image.get() : null, a = [];
                if (r) "A" == r.get(0).parentNode.tagName && a.push(r.get(0).parentNode); else if (u.win.getSelection) {
                    var l = u.win.getSelection();
                    if (l.getRangeAt && l.rangeCount) {
                        i = u.doc.createRange();
                        for (var s = 0; s < l.rangeCount; ++s) if ((t = (e = l.getRangeAt(s)).commonAncestorContainer) && 1 != t.nodeType && (t = t.parentNode), t && "a" == t.nodeName.toLowerCase()) a.push(t); else {
                            n = t.getElementsByTagName("a");
                            for (var o = 0; o < n.length; ++o) i.selectNodeContents(n[o]), i.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < i.compareBoundaryPoints(e.START_TO_END, e) && a.push(n[o])
                        }
                    }
                } else if (u.doc.selection && "Control" != u.doc.selection.type) if ("a" == (t = (e = u.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()) a.push(t); else {
                    n = t.getElementsByTagName("a"), i = u.doc.body.createTextRange();
                    for (var p = 0; p < n.length; ++p) i.moveToElementText(n[p]), -1 < i.compareEndPoints("StartToEnd", e) && i.compareEndPoints("EndToStart", e) < 1 && a.push(n[p])
                }
                return a
            }

            function m(r) {
                if (u.core.hasFocus()) {
                    if (a(), r && "keyup" === r.type && (r.altKey || r.which == y.KEYCODE.ALT)) return !0;
                    setTimeout(function () {
                        if (!r || r && (1 == r.which || "mouseup" != r.type)) {
                            var e = g(), t = u.image ? u.image.get() : null;
                            if (e && !t) {
                                if (u.image) {
                                    var n = u.node.contents(e);
                                    if (1 == n.length && "IMG" == n[0].tagName) {
                                        var i = u.selection.ranges(0);
                                        return 0 === i.startOffset && 0 === i.endOffset ? k(e).before(y.MARKERS) : k(e).after(y.MARKERS), u.selection.restore(), !1
                                    }
                                }
                                r && r.stopPropagation(), l(e)
                            }
                        }
                    }, u.helpers.isIOS() ? 100 : 0)
                }
            }

            function l(e) {
                var t = u.popups.get("link.edit");
                t || (t = function a() {
                    var e = "";
                    1 <= u.opts.linkEditButtons.length && ("A" == u.el.tagName && 0 <= u.opts.linkEditButtons.indexOf("linkRemove") && u.opts.linkEditButtons.splice(u.opts.linkEditButtons.indexOf("linkRemove"), 1), e = '<div class="fr-buttons">'.concat(u.button.buildList(u.opts.linkEditButtons), "</div>"));
                    var t = {buttons: e}, n = u.popups.create("link.edit", t);
                    u.$wp && u.events.$on(u.$wp, "scroll.link-edit", function () {
                        g() && u.popups.isVisible("link.edit") && l(g())
                    });
                    return n
                }());
                var n = k(e);
                u.popups.isVisible("link.edit") || u.popups.refresh("link.edit"), u.popups.setContainer("link.edit", u.$sc);
                var i = n.offset().left + n.outerWidth() / 2, r = n.offset().top + n.outerHeight();
                u.popups.show("link.edit", i, r, n.outerHeight(), !0)
            }

            function a() {
                u.popups.hide("link.edit")
            }

            function o() {
                var e = u.popups.get("link.insert"), t = g();
                if (t) {
                    var n, i, r = k(t), a = e.find('input.fr-link-attr[type="text"]'),
                        l = e.find('input.fr-link-attr[type="checkbox"]');
                    for (n = 0; n < a.length; n++) (i = k(a[n])).val(r.attr(i.attr("name") || ""));
                    for (l.attr("checked", !1), n = 0; n < l.length; n++) i = k(l[n]), r.attr(i.attr("name")) == i.data("checked") && i.attr("checked", !0);
                    e.find('input.fr-link-attr[type="text"][name="text"]').val(r.text())
                } else e.find('input.fr-link-attr[type="text"]').val(""), e.find('input.fr-link-attr[type="checkbox"]').attr("checked", !1), e.find('input.fr-link-attr[type="text"][name="text"]').val(u.selection.text());
                e.find("input.fr-link-attr").trigger("change"), (u.image ? u.image.get() : null) ? e.find('.fr-link-attr[name="text"]').parent().hide() : e.find('.fr-link-attr[name="text"]').parent().show()
            }

            function s(e) {
                if (e) return u.popups.onRefresh("link.insert", o), !0;
                var t = "";
                1 <= u.opts.linkInsertButtons.length && (t = '<div class="fr-buttons fr-tabs">'.concat(u.button.buildList(u.opts.linkInsertButtons), "</div>"));
                var n = "", i = 0;
                for (var r in n = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-'.concat(u.id, '">'), n += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-'.concat(u.id, '" name="href" type="text" class="fr-link-attr" placeholder="').concat(u.language.translate("URL"), '" tabIndex="').concat(++i, '"></div>'), u.opts.linkText && (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-'.concat(u.id, '" name="text" type="text" class="fr-link-attr" placeholder="').concat(u.language.translate("Text"), '" tabIndex="').concat(++i, '"></div>')), u.opts.linkAttributes) if (u.opts.linkAttributes.hasOwnProperty(r)) {
                    var a = u.opts.linkAttributes[r];
                    n += '<div class="fr-input-line"><input name="'.concat(r, '" type="text" class="fr-link-attr" placeholder="').concat(u.language.translate(a), '" tabIndex="').concat(++i, '"></div>')
                }
                u.opts.linkAlwaysBlank || (n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-'.concat(u.id, '" tabIndex="').concat(++i, '"><span>').concat('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>', '</span></span><label id="fr-label-target-').concat(u.id, '">').concat(u.language.translate("Open in new tab"), "</label></div>"));
                var l = {
                    buttons: t,
                    input_layer: n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="'.concat(++i, '" type="button">').concat(u.language.translate("Insert"), "</button></div></div>")
                }, s = u.popups.create("link.insert", l);
                return u.$wp && u.events.$on(u.$wp, "scroll.link-insert", function () {
                    (u.image ? u.image.get() : null) && u.popups.isVisible("link.insert") && f(), u.popups.isVisible("link.insert") && c()
                }), s
            }

            function p(e, t, n) {
                if (void 0 === n && (n = {}), !1 === u.events.trigger("link.beforeInsert", [e, t, n])) return !1;
                var i = u.image ? u.image.get() : null;
                i || "A" == u.el.tagName ? "A" == u.el.tagName && u.$el.focus() : (u.selection.restore(), u.popups.hide("link.insert"));
                var r = e;
                u.opts.linkConvertEmailAddress && u.helpers.isEmail(e) && !/^mailto:.*/i.test(e) && (e = "mailto:".concat(e));
                if ("" === u.opts.linkAutoPrefix || new RegExp("^(" + y.LinkProtocols.join("|") + "):.", "i").test(e) || /^data:image.*/i.test(e) || /^(https?:|ftps?:|file:|)\/\//i.test(e) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) || ["/", "{", "[", "#", "(", "."].indexOf((e || "")[0]) < 0 && (e = u.opts.linkAutoPrefix + u.helpers.sanitizeURL(e)), e = u.helpers.sanitizeURL(e), u.opts.linkAlwaysBlank && (n.target = "_blank"), u.opts.linkAlwaysNoFollow && (n.rel = "nofollow"), u.helpers.isEmail(r) && (n.target = null, n.rel = null), "_blank" == n.target ? (u.opts.linkNoOpener && (n.rel ? n.rel += " noopener" : n.rel = "noopener"), u.opts.linkNoReferrer && (n.rel ? n.rel += " noreferrer" : n.rel = "noreferrer")) : null == n.target && (n.rel ? n.rel = n.rel.replace(/noopener/, "").replace(/noreferrer/, "") : n.rel = null), t = t || "", e === u.opts.linkAutoPrefix) return u.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"), u.events.trigger("link.bad", [r]), !1;
                var a, l = g();
                if (l) {
                    if ((a = k(l)).attr("href", e), 0 < t.length && a.text() != t && !i) {
                        for (var s = a.get(0); 1 === s.childNodes.length && s.childNodes[0].nodeType == Node.ELEMENT_NODE;) s = s.childNodes[0];
                        k(s).text(t)
                    }
                    for (var o in i || a.prepend(y.START_MARKER).append(y.END_MARKER), n) n[o] ? a.attr(o, n[o]) : a.removeAttr(o);
                    i || u.selection.restore()
                } else {
                    i ? (i.wrap('<a href="'.concat(e, '"></a>')), u.image.hasCaption() && i.parent().append(i.parents(".fr-img-caption").find(".fr-inner"))) : (u.format.remove("a"), u.selection.isCollapsed() ? (t = 0 === t.length ? r : t, u.html.insert('<a href="'.concat(e, '">').concat(y.START_MARKER).concat(t.replace(/&/g, "&amp;").replace(/</, "&lt;", ">", "&gt;")).concat(y.END_MARKER, "</a>")), u.selection.restore()) : 0 < t.length && t != u.selection.text().replace(/\n/g, "") ? (u.selection.remove(), u.html.insert('<a href="'.concat(e, '">').concat(y.START_MARKER).concat(t.replace(/&/g, "&amp;")).concat(y.END_MARKER, "</a>")), u.selection.restore()) : (!function d() {
                        if (!u.selection.isCollapsed()) {
                            u.selection.save();
                            for (var e = u.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); e.length;) {
                                var t = k(e.pop());
                                t.removeClass("fr-unprocessed");
                                var n = u.node.deepestParent(t.get(0));
                                if (n) {
                                    for (var i = t.get(0), r = "", a = ""; i = i.parentNode, u.node.isBlock(i) || (r += u.node.closeTagString(i), a = u.node.openTagString(i) + a), i != n;) ;
                                    var l = u.node.openTagString(t.get(0)) + t.html() + u.node.closeTagString(t.get(0));
                                    t.replaceWith('<span id="fr-break"></span>');
                                    var s = n.outerHTML;
                                    s = (s = s.replace(/<span id="fr-break"><\/span>/g, r + l + a)).replace(a + r, ""), n.outerHTML = s
                                }
                                e = u.$el.find(".fr-marker.fr-unprocessed").toArray()
                            }
                            u.html.cleanEmptyTags(), u.selection.restore()
                        }
                    }(), u.format.apply("a", {href: e})));
                    for (var p = h(), c = 0; c < p.length; c++) (a = k(p[c])).attr(n), a.removeAttr("_moz_dirty");
                    1 == p.length && u.$wp && !i && (k(p[0]).prepend(y.START_MARKER).append(y.END_MARKER), u.selection.restore())
                }
                if (i) {
                    var f = u.popups.get("link.insert");
                    f && f.find("input:focus").blur(), u.image.edit(i)
                } else m()
            }

            function c() {
                a();
                var e = g();
                if (e) {
                    var t = u.popups.get("link.insert");
                    t || (t = s()), u.popups.isVisible("link.insert") || (u.popups.refresh("link.insert"), u.selection.save(), u.helpers.isMobile() && (u.events.disableBlur(), u.$el.blur(), u.events.enableBlur())), u.popups.setContainer("link.insert", u.$sc);
                    var n = (u.image ? u.image.get() : null) || k(e), i = n.offset().left + n.outerWidth() / 2,
                        r = n.offset().top + n.outerHeight();
                    u.popups.show("link.insert", i, r, n.outerHeight(), !0)
                }
            }

            function f() {
                var e = u.image ? u.image.getEl() : null;
                if (e) {
                    var t = u.popups.get("link.insert");
                    u.image.hasCaption() && (e = e.find(".fr-img-wrap")), t || (t = s()), o(), u.popups.setContainer("link.insert", u.$sc);
                    var n = e.offset().left + e.outerWidth() / 2, i = e.offset().top + e.outerHeight();
                    u.popups.show("link.insert", n, i, e.outerHeight(), !0)
                }
            }

            return {
                _init: function e() {
                    u.events.on("keyup", function (e) {
                        e.which != y.KEYCODE.ESC && m(e)
                    }), u.events.on("window.mouseup", m), u.events.$on(u.$el, "click", "a", function (e) {
                        u.edit.isDisabled() && e.preventDefault()
                    }), u.helpers.isMobile() && u.events.$on(u.$doc, "selectionchange", m), s(!0), "A" == u.el.tagName && u.$el.addClass("fr-view"), u.events.on("toolbar.esc", function () {
                        if (u.popups.isVisible("link.edit")) return u.events.disableBlur(), u.events.focus(), !1
                    }, !0)
                }, remove: function n() {
                    var e = g(), t = u.image ? u.image.get() : null;
                    if (!1 === u.events.trigger("link.beforeRemove", [e])) return !1;
                    t && e ? (t.unwrap(), u.image.edit(t)) : e && (u.selection.save(), k(e).replaceWith(k(e).html()), u.selection.restore(), a())
                }, showInsertPopup: function d() {
                    var e = u.$tb.find('.fr-command[data-cmd="insertLink"]'), t = u.popups.get("link.insert");
                    if (t || (t = s()), !t.hasClass("fr-active")) if (u.popups.refresh("link.insert"), u.popups.setContainer("link.insert", u.$tb || u.$sc), e.isVisible()) {
                        var n = u.button.getPosition(e), i = n.left, r = n.top;
                        u.popups.show("link.insert", i, r, e.outerHeight())
                    } else u.position.forSelection(t), u.popups.show("link.insert")
                }, usePredefined: function v(e) {
                    var t, n, i = u.opts.linkList[e], r = u.popups.get("link.insert"),
                        a = r.find('input.fr-link-attr[type="text"]'),
                        l = r.find('input.fr-link-attr[type="checkbox"]');
                    for (i.rel && (r.rel = i.rel), n = 0; n < a.length; n++) i[(t = k(a[n])).attr("name")] ? (t.val(i[t.attr("name")]), t.toggleClass("fr-not-empty", !0)) : "text" != t.attr("name") && t.val("");
                    for (n = 0; n < l.length; n++) (t = k(l[n])).attr("checked", t.data("checked") == i[t.attr("name")]);
                    u.accessibility.focusPopup(r)
                }, insertCallback: function b() {
                    var e, t, n = u.popups.get("link.insert"), i = n.find('input.fr-link-attr[type="text"]'),
                        r = n.find('input.fr-link-attr[type="checkbox"]'),
                        a = (i.filter('[name="href"]').val() || "").trim(), l = i.filter('[name="text"]').val(), s = {};
                    for (t = 0; t < i.length; t++) e = k(i[t]), ["href", "text"].indexOf(e.attr("name")) < 0 && (s[e.attr("name")] = e.val());
                    for (t = 0; t < r.length; t++) (e = k(r[t])).is(":checked") ? s[e.attr("name")] = e.data("checked") : s[e.attr("name")] = e.data("unchecked") || null;
                    n.rel && (s.rel = n.rel);
                    var o = u.helpers.scrollTop();
                    p(a, l, s), k(u.o_win).scrollTop(o)
                }, insert: p, update: c, get: g, allSelected: h, back: function t() {
                    u.image && u.image.get() ? u.image.back() : (u.events.disableBlur(), u.selection.restore(), u.events.enableBlur(), g() && u.$wp ? (u.selection.restore(), a(), m()) : "A" == u.el.tagName ? (u.$el.focus(), m()) : (u.popups.hide("link.insert"), u.toolbar.showInline()))
                }, imageLink: f, applyStyle: function E(e, t, n) {
                    void 0 === n && (n = u.opts.linkMultipleStyles), void 0 === t && (t = u.opts.linkStyles);
                    var i = g();
                    if (!i) return !1;
                    if (!n) {
                        var r = Object.keys(t);
                        r.splice(r.indexOf(e), 1), k(i).removeClass(r.join(" "))
                    }
                    k(i).toggleClass(e), m()
                }
            }
        }, y.DefineIcon("insertLink", {
            NAME: "link",
            SVG_KEY: "insertLink"
        }), y.RegisterShortcut(y.KEYCODE.K, "insertLink", null, "K"), y.RegisterCommand("insertLink", {
            title: "Insert Link",
            undo: !1,
            focus: !0,
            refreshOnCallback: !1,
            popup: !0,
            callback: function () {
                this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup()
            },
            plugin: "link"
        }), y.DefineIcon("linkOpen", {
            NAME: "external-link",
            FA5NAME: "external-link-alt",
            SVG_KEY: "openLink"
        }), y.RegisterCommand("linkOpen", {
            title: "Open Link", undo: !1, refresh: function (e) {
                this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
            }, callback: function () {
                var e = this.link.get();
                e && (-1 !== e.href.indexOf("mailto:") ? this.o_win.open(e.href).close() : (e.target || (e.target = "_self"), this.browser.msie || this.browser.edge ? this.o_win.open(e.href, e.target) : this.o_win.open(e.href, e.target, "noopener")), this.popups.hide("link.edit"))
            }, plugin: "link"
        }), y.DefineIcon("linkEdit", {
            NAME: "edit",
            SVG_KEY: "edit"
        }), y.RegisterCommand("linkEdit", {
            title: "Edit Link",
            undo: !1,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function () {
                this.link.update()
            },
            refresh: function (e) {
                this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
            },
            plugin: "link"
        }), y.DefineIcon("linkRemove", {
            NAME: "unlink",
            SVG_KEY: "unlink"
        }), y.RegisterCommand("linkRemove", {
            title: "Unlink", callback: function () {
                this.link.remove()
            }, refresh: function (e) {
                this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
            }, plugin: "link"
        }), y.DefineIcon("linkBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), y.RegisterCommand("linkBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.link.back()
            },
            refresh: function (e) {
                var t = this.link.get() && this.doc.hasFocus();
                (this.image ? this.image.get() : null) || t || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
            },
            plugin: "link"
        }), y.DefineIcon("linkList", {
            NAME: "search",
            SVG_KEY: "search"
        }), y.RegisterCommand("linkList", {
            title: "Choose Link",
            type: "dropdown",
            focus: !1,
            undo: !1,
            refreshAfterCallback: !1,
            html: function () {
                for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkList, n = 0; n < t.length; n++) e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="'.concat(n, '">').concat(t[n].displayText || t[n].text, "</a></li>");
                return e += "</ul>"
            },
            callback: function (e, t) {
                this.link.usePredefined(t)
            },
            plugin: "link"
        }), y.RegisterCommand("linkInsert", {
            focus: !1, refreshAfterCallback: !1, callback: function () {
                this.link.insertCallback()
            }, refresh: function (e) {
                this.link.get() ? e.text(this.language.translate("Update")) : e.text(this.language.translate("Insert"))
            }, plugin: "link"
        }), y.DefineIcon("imageLink", {
            NAME: "link",
            SVG_KEY: "insertLink"
        }), y.RegisterCommand("imageLink", {
            title: "Insert Link",
            undo: !1,
            focus: !1,
            popup: !0,
            callback: function () {
                this.link.imageLink()
            },
            refresh: function (e) {
                var t;
                this.link.get() ? ((t = e.prev()).hasClass("fr-separator") && t.removeClass("fr-hidden"), e.addClass("fr-hidden")) : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"), e.removeClass("fr-hidden"))
            },
            plugin: "link"
        }), y.DefineIcon("linkStyle", {
            NAME: "magic",
            SVG_KEY: "linkStyles"
        }), y.RegisterCommand("linkStyle", {
            title: "Style", type: "dropdown", html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkStyles;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="'.concat(n, '">').concat(this.language.translate(t[n]), "</a></li>"));
                return e += "</ul>"
            }, callback: function (e, t) {
                this.link.applyStyle(t)
            }, refreshOnShow: function (e, t) {
                var n = this.$, i = this.link.get();
                if (i) {
                    var r = n(i);
                    t.find(".fr-command").each(function () {
                        var e = n(this).data("param1"), t = r.hasClass(e);
                        n(this).toggleClass("fr-active", t).attr("aria-selected", t)
                    })
                }
            }, refresh: function (e) {
                this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
            }, plugin: "link"
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/lists.min.js*/
amis.define('0a183d8', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (f) {
        "use strict";
        f = f && f.hasOwnProperty("default") ? f["default"] : f, Object.assign(f.DEFAULTS, {listAdvancedTypes: !0}), f.PLUGINS.lists = function (p) {
            var d = p.$;

            function g(e) {
                return '<span class="fr-open-'.concat(e.toLowerCase(), '"></span>')
            }

            function m(e) {
                return '<span class="fr-close-'.concat(e.toLowerCase(), '"></span>')
            }

            function o(e, t) {
                !function c(e, t) {
                    for (var a = [], n = 0; n < e.length; n++) {
                        var r = e[n].parentNode;
                        "LI" == e[n].tagName && r.tagName != t && a.indexOf(r) < 0 && a.push(r)
                    }
                    for (var o = a.length - 1; 0 <= o; o--) {
                        var i = d(a[o]);
                        i.replaceWith("<".concat(t.toLowerCase(), " ").concat(p.node.attributes(i.get(0)), ">").concat(i.html(), "</").concat(t.toLowerCase(), ">"))
                    }
                }(e, t);
                var a, n = p.html.defaultTag(), r = null;
                e.length && (a = "rtl" == p.opts.direction || "rtl" == d(e[0]).css("direction") ? "margin-right" : "margin-left");
                for (var o = 0; o < e.length; o++) if ("TD" != e[o].tagName && "TH" != e[o].tagName && "LI" != e[o].tagName) {
                    var i = p.helpers.getPX(d(e[o]).css(a)) || 0;
                    (e[o].style.marginLeft = null) === r && (r = i);
                    var s = 0 < r ? "<".concat(t, ' style="').concat(a, ": ").concat(r, 'px ">') : "<".concat(t, ">"),
                        l = "</".concat(t, ">");
                    for (i -= r; 0 < i / p.opts.indentMargin;) s += "</".concat(t, ">"), l += l, i -= p.opts.indentMargin;
                    n && e[o].tagName.toLowerCase() == n ? d(e[o]).replaceWith("".concat(s, "<li").concat(p.node.attributes(e[o]), ">").concat(d(e[o]).html(), "</li>").concat(l)) : d(e[o]).wrap("".concat(s, "<li></li>").concat(l))
                }
                p.clean.lists()
            }

            function i(e) {
                var t, a;
                for (t = e.length - 1; 0 <= t; t--) for (a = t - 1; 0 <= a; a--) if (d(e[a]).find(e[t]).length || e[a] == e[t]) {
                    e.splice(t, 1);
                    break
                }
                var n = [];
                for (t = 0; t < e.length; t++) {
                    var r = d(e[t]), o = e[t].parentNode, i = r.attr("class");
                    if (r.before(m(o.tagName)), "LI" == o.parentNode.tagName) r.before(m("LI")), r.after(g("LI")); else {
                        var s = "";
                        i && (s += ' class="'.concat(i, '"'));
                        var l = "rtl" == p.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left";
                        p.helpers.getPX(d(o).css(l)) && 0 <= (d(o).attr("style") || "").indexOf("".concat(l, ":")) && (s += ' style="'.concat(l, ":").concat(p.helpers.getPX(d(o).css(l)), 'px;"')), p.html.defaultTag() && 0 === r.find(p.html.blockTagsQuery()).length && r.wrapInner(p.html.defaultTag() + s), p.node.isEmpty(r.get(0), !0) || 0 !== r.find(p.html.blockTagsQuery()).length || r.append("<br>"), r.append(g("LI")), r.prepend(m("LI"))
                    }
                    r.after(g(o.tagName)), "LI" == o.parentNode.tagName && (o = o.parentNode.parentNode), n.indexOf(o) < 0 && n.push(o)
                }
                for (t = 0; t < n.length; t++) {
                    var c = d(n[t]), f = c.html();
                    f = (f = f.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), c.replaceWith(p.node.openTagString(c.get(0)) + f + p.node.closeTagString(c.get(0)))
                }
                p.$el.find("li:empty").remove(), p.$el.find("ul:empty, ol:empty").remove(), p.clean.lists(), p.html.wrap()
            }

            function s(e) {
                p.selection.save();
                for (var t = 0; t < e.length; t++) {
                    var a = e[t].previousSibling;
                    if (a) {
                        var n = d(e[t]).find("> ul, > ol").last().get(0);
                        if (n) {
                            var r = d(document.createElement("li"));
                            d(n).prepend(r);
                            for (var o = p.node.contents(e[t])[0]; o && !p.node.isList(o);) {
                                var i = o.nextSibling;
                                r.append(o), o = i
                            }
                            d(a).append(d(n)), d(e[t]).remove()
                        } else {
                            var s = d(a).find("> ul, > ol").last().get(0);
                            if (s) d(s).append(d(e[t])); else {
                                var l = d("<".concat(e[t].parentNode.tagName, ">"));
                                d(a).append(l), l.append(d(e[t]))
                            }
                        }
                    }
                }
                p.clean.lists(), p.selection.restore()
            }

            function l(e) {
                p.selection.save(), i(e), p.selection.restore()
            }

            function e(e) {
                if ("indent" == e || "outdent" == e) {
                    var t = !1, a = p.selection.blocks(), n = [], r = a[0].previousSibling || a[0].parentElement;
                    if ("outdent" == e) {
                        if ("LI" == r.tagName || "LI" != r.parentNode.tagName) return
                    } else if (!a[0].previousSibling || "LI" != a[0].previousSibling.tagName) return;
                    for (var o = 0; o < a.length; o++) "LI" == a[o].tagName ? (t = !0, n.push(a[o])) : "LI" == a[o].parentNode.tagName && (t = !0, n.push(a[o].parentNode));
                    t && ("indent" == e ? s(n) : l(n))
                }
            }

            return {
                _init: function t() {
                    p.events.on("commands.after", e), p.events.on("keydown", function (e) {
                        if (e.which == f.KEYCODE.TAB) {
                            for (var t = p.selection.blocks(), a = [], n = 0; n < t.length; n++) "LI" == t[n].tagName ? a.push(t[n]) : "LI" == t[n].parentNode.tagName && a.push(t[n].parentNode);
                            if (1 < a.length || a.length && (p.selection.info(a[0]).atStart || p.node.isEmpty(a[0]))) return e.preventDefault(), e.stopPropagation(), e.shiftKey ? l(a) : s(a), !1
                        }
                    }, !0)
                }, format: function c(e, t) {
                    var a, n;
                    for (p.html.syncInputs(), p.selection.save(), p.html.wrap(!0, !0, !0, !0), p.selection.restore(), n = p.selection.blocks(), a = 0; a < n.length; a++) "LI" != n[a].tagName && "LI" == n[a].parentNode.tagName && (n[a] = n[a].parentNode);
                    if (p.selection.save(), function r(e, t) {
                        for (var a = !0, n = 0; n < e.length; n++) {
                            if ("LI" != e[n].tagName) return !1;
                            e[n].parentNode.tagName != t && (a = !1)
                        }
                        return a
                    }(n, e) ? t || i(n) : o(n, e), p.html.unwrap(), p.selection.restore(), t = t || "default") {
                        for (n = p.selection.blocks(), a = 0; a < n.length; a++) "LI" != n[a].tagName && "LI" == n[a].parentNode.tagName && (n[a] = n[a].parentNode);
                        for (a = 0; a < n.length; a++) "LI" == n[a].tagName && (d(n[a].parentNode).css("list-style-type", "default" === t ? "" : t), 0 === (d(n[a].parentNode).attr("style") || "").length && d(n[a].parentNode).removeAttr("style"))
                    }
                }, refresh: function r(e, t) {
                    var a = d(p.selection.element());
                    if (a.get(0) != p.el) {
                        var n = a.get(0);
                        (n = "LI" != n.tagName && n.firstElementChild && "LI" != n.firstElementChild.tagName ? a.parents("li").get(0) : "LI" == n.tagName || n.firstElementChild ? n.firstElementChild && "LI" == n.firstElementChild.tagName ? a.get(0).firstChild : a.get(0) : a.parents("li").get(0)) && n.parentNode.tagName == t && p.el.contains(n.parentNode) && e.addClass("fr-active")
                    }
                }
            }
        }, f.DefineIcon("formatOLSimple", {
            NAME: "list-ol",
            SVG_KEY: "orderedList"
        }), f.RegisterCommand("formatOLSimple", {
            title: "Ordered List",
            type: "button",
            options: {"default": "Default", circle: "Circle", disc: "Disc", square: "Square"},
            refresh: function (e) {
                this.lists.refresh(e, "OL")
            },
            callback: function (e, t) {
                this.lists.format("OL", t)
            },
            plugin: "lists"
        }), f.RegisterCommand("formatUL", {
            title: "Unordered List",
            type: "button",
            hasOptions: function () {
                return this.opts.listAdvancedTypes
            },
            options: {"default": "Default", circle: "Circle", disc: "Disc", square: "Square"},
            refresh: function (e) {
                this.lists.refresh(e, "UL")
            },
            callback: function (e, t) {
                this.lists.format("UL", t)
            },
            plugin: "lists"
        }), f.RegisterCommand("formatOL", {
            title: "Ordered List",
            hasOptions: function () {
                return this.opts.listAdvancedTypes
            },
            options: {
                "default": "Default",
                "lower-alpha": "Lower Alpha",
                "lower-greek": "Lower Greek",
                "lower-roman": "Lower Roman",
                "upper-alpha": "Upper Alpha",
                "upper-roman": "Upper Roman"
            },
            refresh: function (e) {
                this.lists.refresh(e, "OL")
            },
            callback: function (e, t) {
                this.lists.format("OL", t)
            },
            plugin: "lists"
        }), f.DefineIcon("formatUL", {
            NAME: "list-ul",
            SVG_KEY: "unorderedList"
        }), f.DefineIcon("formatOL", {NAME: "list-ol", SVG_KEY: "orderedList"})
    });

});

;/*!node_modules/froala-editor/js/plugins/paragraph_format.min.js*/
amis.define('cf912ed', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (a, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(a.FroalaEditor)
    }(this, function (a) {
        "use strict";
        a = a && a.hasOwnProperty("default") ? a["default"] : a, Object.assign(a.DEFAULTS, {
            paragraphFormat: {
                N: "Normal",
                H1: "Heading 1",
                H2: "Heading 2",
                H3: "Heading 3",
                H4: "Heading 4",
                PRE: "Code"
            }, paragraphFormatSelection: !1, paragraphDefaultSelection: "Paragraph Format"
        }), a.PLUGINS.paragraphFormat = function (h) {
            var f = h.$;

            function g(a, t) {
                var e = h.html.defaultTag();
                if (t && t.toLowerCase() != e) if (0 < a.find("ul, ol").length) {
                    var r = f("<" + t + ">");
                    a.prepend(r);
                    for (var n = h.node.contents(a.get(0))[0]; n && ["UL", "OL"].indexOf(n.tagName) < 0;) {
                        var o = n.nextSibling;
                        r.append(n), n = o
                    }
                } else a.html("<" + t + ">" + a.html() + "</" + t + ">")
            }

            return {
                apply: function c(a) {
                    "N" == a && (a = h.html.defaultTag()), h.selection.save(), h.html.wrap(!0, !0, !h.opts.paragraphFormat.BLOCKQUOTE, !0, !0), h.selection.restore();
                    var t, e, r, n, o, i, l, p, s = h.selection.blocks();
                    h.selection.save(), h.$el.find("pre").attr("skip", !0);
                    for (var d = 0; d < s.length; d++) if (s[d].tagName != a && !h.node.isList(s[d])) {
                        var m = f(s[d]);
                        "LI" == s[d].tagName ? g(m, a) : "LI" == s[d].parentNode.tagName && s[d] ? (i = m, l = a, p = h.html.defaultTag(), l && l.toLowerCase() != p || (l = 'div class="fr-temp-div"'), i.replaceWith(f("<" + l + ">").html(i.html()))) : 0 <= ["TD", "TH"].indexOf(s[d].parentNode.tagName) ? (r = m, n = a, o = h.html.defaultTag(), n || (n = 'div class="fr-temp-div"' + (h.node.isEmpty(r.get(0), !0) ? ' data-empty="true"' : "")), n.toLowerCase() == o ? (h.node.isEmpty(r.get(0), !0) || r.append("<br/>"), r.replaceWith(r.html())) : r.replaceWith(f("<" + n + ">").html(r.html()))) : (t = m, (e = a) || (e = 'div class="fr-temp-div"' + (h.node.isEmpty(t.get(0), !0) ? ' data-empty="true"' : "")), "H1" != e && "H2" != e && "H3" != e && "H4" != e && "H5" != e || !h.node.attributes(t.get(0)).includes("font-size:") ? t.replaceWith(f("<" + e + " " + h.node.attributes(t.get(0)) + ">").html(t.html()).removeAttr("data-empty")) : t.replaceWith(f("<" + e + " " + h.node.attributes(t.get(0)).replace(/font-size:[0-9]+px;?/, "") + ">").html(t.html()).removeAttr("data-empty")))
                    }
                    h.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function () {
                        f(this).prev().append("<br>" + f(this).html()), f(this).remove()
                    }), h.$el.find("pre").removeAttr("skip"), h.html.unwrap(), h.selection.restore()
                }, refreshOnShow: function i(a, t) {
                    var e = h.selection.blocks();
                    if (e.length) {
                        var r = e[0], n = "N", o = h.html.defaultTag();
                        r.tagName.toLowerCase() != o && r != h.el && (n = r.tagName), t.find('.fr-command[data-param1="' + n + '"]').addClass("fr-active").attr("aria-selected", !0)
                    } else t.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0)
                }, refresh: function o(a) {
                    if (h.opts.paragraphFormatSelection) {
                        var t = h.selection.blocks();
                        if (t.length) {
                            var e = t[0], r = "N", n = h.html.defaultTag();
                            e.tagName.toLowerCase() != n && e != h.el && (r = e.tagName), 0 <= ["LI", "TD", "TH"].indexOf(r) && (r = "N"), a.find(">span").text(h.language.translate(h.opts.paragraphFormat[r]))
                        } else a.find(">span").text(h.language.translate(h.opts.paragraphFormat.N))
                    }
                }
            }
        }, a.RegisterCommand("paragraphFormat", {
            type: "dropdown", displaySelection: function (a) {
                return a.opts.paragraphFormatSelection
            }, defaultSelection: function (a) {
                return a.language.translate(a.opts.paragraphDefaultSelection)
            }, displaySelectionWidth: 80, html: function () {
                var a = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.paragraphFormat;
                for (var e in t) if (t.hasOwnProperty(e)) {
                    var r = this.shortcuts.get("paragraphFormat." + e);
                    r = r ? '<span class="fr-shortcut">' + r + "</span>" : "", a += '<li role="presentation"><' + ("N" == e ? this.html.defaultTag() || "DIV" : e) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + e + '" title="' + this.language.translate(t[e]) + '">' + this.language.translate(t[e]) + "</a></" + ("N" == e ? this.html.defaultTag() || "DIV" : e) + "></li>"
                }
                return a += "</ul>"
            }, title: "Paragraph Format", callback: function (a, t) {
                this.paragraphFormat.apply(t)
            }, refresh: function (a) {
                this.paragraphFormat.refresh(a)
            }, refreshOnShow: function (a, t) {
                this.paragraphFormat.refreshOnShow(a, t)
            }, plugin: "paragraphFormat"
        }), a.DefineIcon("paragraphFormat", {NAME: "paragraph", SVG_KEY: "paragraphFormat"})
    });

});

;/*!node_modules/froala-editor/js/plugins/paragraph_style.min.js*/
amis.define('823b46e', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (a, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], e) : e(a.FroalaEditor)
    }(this, function (a) {
        "use strict";
        a = a && a.hasOwnProperty("default") ? a["default"] : a, Object.assign(a.DEFAULTS, {
            paragraphStyles: {
                "fr-text-gray": "Gray",
                "fr-text-bordered": "Bordered",
                "fr-text-spaced": "Spaced",
                "fr-text-uppercase": "Uppercase"
            }, paragraphMultipleStyles: !0
        }), a.PLUGINS.paragraphStyle = function (n) {
            var i = n.$;
            return {
                _init: function a() {
                }, apply: function p(a, e, t) {
                    void 0 === e && (e = n.opts.paragraphStyles), void 0 === t && (t = n.opts.paragraphMultipleStyles);
                    var r = "";
                    t || ((r = Object.keys(e)).splice(r.indexOf(a), 1), r = r.join(" ")), n.selection.save(), n.html.wrap(!0, !0, !0, !0), n.selection.restore();
                    var s = n.selection.blocks();
                    n.selection.save();
                    for (var o = i(s[0]).hasClass(a), l = 0; l < s.length; l++) i(s[l]).removeClass(r).toggleClass(a, !o), i(s[l]).hasClass("fr-temp-div") && i(s[l]).removeClass("fr-temp-div"), "" === i(s[l]).attr("class") && i(s[l]).removeAttr("class");
                    n.html.unwrap(), n.selection.restore()
                }, refreshOnShow: function s(a, e) {
                    var t = n.selection.blocks();
                    if (t.length) {
                        var r = i(t[0]);
                        e.find(".fr-command").each(function () {
                            var a = i(this).data("param1"), e = r.hasClass(a);
                            i(this).toggleClass("fr-active", e).attr("aria-selected", e)
                        })
                    }
                }
            }
        }, a.RegisterCommand("paragraphStyle", {
            type: "dropdown", html: function () {
                var a = '<ul class="fr-dropdown-list" role="presentation">', e = this.opts.paragraphStyles;
                for (var t in e) e.hasOwnProperty(t) && (a += '<li role="presentation"><a class="fr-command '.concat(t, '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="').concat(t, '" title="').concat(this.language.translate(e[t]), '">').concat(this.language.translate(e[t]), "</a></li>"));
                return a += "</ul>"
            }, title: "Paragraph Style", callback: function (a, e) {
                this.paragraphStyle.apply(e)
            }, refreshOnShow: function (a, e) {
                this.paragraphStyle.refreshOnShow(a, e)
            }, plugin: "paragraphStyle"
        }), a.DefineIcon("paragraphStyle", {NAME: "magic", SVG_KEY: "paragraphStyle"})
    });

});

;/*!node_modules/froala-editor/js/plugins/print.min.js*/
amis.define('0226bb9', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {html2pdf: window.html2pdf}), e.PLUGINS.print = function (a) {
            return {
                run: function e() {
                    !function l(e) {
                        var t = a.html.get(), n = null;
                        a.shared.print_iframe ? n = a.shared.print_iframe : ((n = document.createElement("iframe")).name = "fr-print", n.style.position = "fixed", n.style.top = "0", n.style.left = "-9999px", n.style.height = "100%", n.style.width = "0", n.style.overflow = "hidden", n.style["z-index"] = "2147483647", n.style.tabIndex = "-1", a.events.on("shared.destroy", function () {
                            n.remove()
                        }), a.shared.print_iframe = n);
                        try {
                            document.body.removeChild(n)
                        } catch (d) {
                        }
                        document.body.appendChild(n);
                        var i = function i() {
                            e(), n.removeEventListener("load", i)
                        };
                        n.addEventListener("load", i);
                        var o = n.contentWindow;
                        o.document.open(), o.document.write("<!DOCTYPE html><html " + (a.opts.documentReady ? 'style="margin: 0; padding: 0;"' : "") + "><head><title>" + document.title + "</title>"), Array.prototype.forEach.call(document.querySelectorAll("style"), function (e) {
                            e = e.cloneNode(!0), o.document.write(e.outerHTML)
                        });
                        var r = document.querySelectorAll("link[rel=stylesheet]");
                        Array.prototype.forEach.call(r, function (e) {
                            var t = document.createElement("link");
                            t.rel = e.rel, t.href = e.href, t.media = "print", t.type = "text/css", t.media = "all", o.document.write(t.outerHTML)
                        }), o.document.write('</head><body style="height:auto;text-align: ' + ("rtl" == a.opts.direction ? "right" : "left") + "; direction: " + a.opts.direction + "; " + (a.opts.documentReady ? " padding: 2cm; width: 17cm; margin: 0;" : "") + '"><div class="fr-view">'), o.document.write(t), o.document.write("</div></body></html>"), o.document.close()
                    }(function () {
                        setTimeout(function () {
                            a.events.disableBlur(), window.frames["fr-print"].focus(), window.frames["fr-print"].print(), a.$win.get(0).focus(), a.events.disableBlur(), a.events.focus()
                        }, 0)
                    })
                }, toPDF: function t() {
                    a.opts.html2pdf && (a.$el.css("text-align", "left"), a.opts.html2pdf().set({
                        margin: [10, 20],
                        html2canvas: {useCORS: !0}
                    }).from(a.el).save(), setTimeout(function () {
                        a.$el.css("text-align", "")
                    }, 100))
                }
            }
        }, e.DefineIcon("print", {NAME: "print", SVG_KEY: "print"}), e.RegisterCommand("print", {
            title: "Print",
            undo: !1,
            focus: !1,
            plugin: "print",
            callback: function () {
                this.print.run()
            }
        }), e.DefineIcon("getPDF", {
            NAME: "file-pdf-o",
            FA5NAME: "file-pdf",
            SVG_KEY: "pdfExport"
        }), e.RegisterCommand("getPDF", {
            title: "Download PDF",
            type: "button",
            focus: !1,
            undo: !1,
            callback: function () {
                this.print.toPDF()
            }
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/quick_insert.min.js*/
amis.define('c13021d', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (p) {
        "use strict";
        p = p && p.hasOwnProperty("default") ? p["default"] : p, Object.assign(p.DEFAULTS, {
            quickInsertButtons: ["image", "video", "embedly", "table", "ul", "ol", "hr"],
            quickInsertTags: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"],
            quickInsertEnabled: !0
        }), p.QUICK_INSERT_BUTTONS = {}, p.DefineIcon("quickInsert", {
            SVG_KEY: "add",
            template: "svg"
        }), p.RegisterQuickInsertButton = function (e, t) {
            p.QUICK_INSERT_BUTTONS[e] = Object.assign({undo: !0}, t)
        }, p.RegisterQuickInsertButton("image", {
            icon: "insertImage",
            requiredPlugin: "image",
            title: "Insert Image",
            undo: !1,
            callback: function () {
                var e = this, t = e.$;
                e.shared.$qi_image_input || (e.shared.$qi_image_input = t(document.createElement("input")).attr("accept", "image/" + e.opts.imageAllowedTypes.join(", image/").toLowerCase()).attr("name", "quickInsertImage".concat(this.id)).attr("style", "display: none;").attr("type", "file"), t("body").first().append(e.shared.$qi_image_input), e.events.$on(e.shared.$qi_image_input, "change", function () {
                    var e = t(this).data("inst");
                    this.files && (e.quickInsert.hide(), e.image.upload(this.files)), t(this).val("")
                }, !0)), e.$qi_image_input = e.shared.$qi_image_input, e.helpers.isMobile() && e.selection.save(), e.events.disableBlur(), e.$qi_image_input.data("inst", e)[0].click()
            }
        }), p.RegisterQuickInsertButton("video", {
            icon: "insertVideo",
            requiredPlugin: "video",
            title: "Insert Video",
            undo: !1,
            callback: function () {
                var e = prompt(this.language.translate("Paste the URL of the video you want to insert."));
                e && this.video.insertByURL(e)
            }
        }), p.RegisterQuickInsertButton("embedly", {
            icon: "embedly",
            requiredPlugin: "embedly",
            title: "Embed URL",
            undo: !1,
            callback: function () {
                var e = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
                e && this.embedly.add(e)
            }
        }), p.RegisterQuickInsertButton("table", {
            icon: "insertTable",
            requiredPlugin: "table",
            title: "Insert Table",
            callback: function () {
                this.table.insert(2, 2)
            }
        }), p.RegisterQuickInsertButton("ol", {
            icon: "formatOL",
            requiredPlugin: "lists",
            title: "Ordered List",
            callback: function () {
                this.lists.format("OL")
            }
        }), p.RegisterQuickInsertButton("ul", {
            icon: "formatUL",
            requiredPlugin: "lists",
            title: "Unordered List",
            callback: function () {
                this.lists.format("UL")
            }
        }), p.RegisterQuickInsertButton("hr", {
            icon: "insertHR",
            title: "Insert Horizontal Line",
            callback: function () {
                this.commands.insertHR()
            }
        }), p.PLUGINS.quickInsert = function (r) {
            var a, l, c = r.$;

            function n(e) {
                var t, n, i;
                (t = e.offset().top - r.$box.offset().top, n = (r.$iframe && r.$iframe.offset().left || 0) + e.offset().left < a.outerWidth() ? e.offset().left + a.outerWidth() : 0 - a.outerWidth(), r.opts.enter != p.ENTER_BR) ? i = (a.outerHeight() - e.outerHeight()) / 2 : (c(document.createElement("span")).html(p.INVISIBLE_SPACE).insertAfter(e), i = (a.outerHeight() - e.next().outerHeight()) / 2, e.next().remove());
                if (r.opts.iframe) {
                    var s = r.helpers.getPX(r.$wp.find(".fr-iframe").css("padding-top"));
                    t += r.$iframe.offset().top + s
                }
                a.hasClass("fr-on") && 0 <= t && l.css("top", t - i), 0 <= t && t - Math.abs(i) <= r.$box.outerHeight() - e.outerHeight() ? (a.hasClass("fr-hidden") && (a.hasClass("fr-on") && u(), a.removeClass("fr-hidden")), a.css("top", t - i)) : a.hasClass("fr-visible") && (a.addClass("fr-hidden"), d()), a.css("left", n)
            }

            function s(e) {
                a || function t() {
                    r.shared.$quick_insert || (r.shared.$quick_insert = c(document.createElement("div")).attr("class", "fr-quick-insert").html('<a class="fr-floating-btn" role="button" tabIndex="-1" title="'.concat(r.language.translate("Quick Insert"), '">').concat(r.icon.create("quickInsert"), "</a>")));
                    a = r.shared.$quick_insert, r.tooltip.bind(r.$box, ".fr-quick-insert > a.fr-floating-btn"), r.events.on("destroy", function () {
                        c("body").first().append(a.removeClass("fr-on")), l && (d(), c("body").first().append(l.css("left", -9999).css("top", -9999)))
                    }, !0), r.events.on("shared.destroy", function () {
                        a.html("").removeData().remove(), a = null, l && (l.html("").removeData().remove(), l = null)
                    }, !0), r.events.on("commands.before", o), r.events.on("commands.after", function () {
                        r.popups.areVisible() || i()
                    }), r.events.bindClick(r.$box, ".fr-quick-insert > a", u), r.events.bindClick(r.$box, ".fr-qi-helper > a.fr-btn", function (e) {
                        var t = c(e.currentTarget).data("cmd");
                        if (!1 === r.events.trigger("quickInsert.commands.before", [t])) return !1;
                        p.QUICK_INSERT_BUTTONS[t].callback.apply(r, [e.currentTarget]), p.QUICK_INSERT_BUTTONS[t].undo && r.undo.saveStep(), r.events.trigger("quickInsert.commands.after", [t]), r.quickInsert.hide()
                    }), r.events.$on(r.$wp, "scroll", f), r.events.$on(r.$tb, "transitionend", ".fr-more-toolbar", f)
                }(), a.hasClass("fr-on") && d(), r.$box.append(a), n(e), a.data("tag", e), a.addClass("fr-visible")
            }

            function i() {
                if (r.core.hasFocus()) {
                    var e = r.selection.element();
                    if (r.opts.enter == p.ENTER_BR || r.node.isBlock(e) || (e = r.node.blockParent(e)), r.opts.enter == p.ENTER_BR && !r.node.isBlock(e)) {
                        var t = r.node.deepestParent(e);
                        t && (e = t)
                    }
                    var n = function n() {
                        return r.opts.enter != p.ENTER_BR && r.node.isEmpty(e) && 0 <= r.opts.quickInsertTags.indexOf(e.tagName.toLowerCase())
                    }, i = function i() {
                        return r.opts.enter == p.ENTER_BR && ("BR" == e.tagName && (!e.previousSibling || "BR" == e.previousSibling.tagName || r.node.isBlock(e.previousSibling)) || r.node.isEmpty(e) && (!e.previousSibling || "BR" == e.previousSibling.tagName || r.node.isBlock(e.previousSibling)) && (!e.nextSibling || "BR" == e.nextSibling.tagName || r.node.isBlock(e.nextSibling)))
                    };
                    e && (n() || i()) ? a && a.data("tag").is(c(e)) && a.hasClass("fr-on") ? d() : r.selection.isCollapsed() && s(c(e)) : o()
                }
            }

            function o() {
                a && (a.hasClass("fr-on") && d(), a.removeClass("fr-visible fr-on"), a.css("left", -9999).css("top", -9999))
            }

            function u(e) {
                if (e && e.preventDefault(), a.hasClass("fr-on") && !a.hasClass("fr-hidden")) d(); else {
                    if (!r.shared.$qi_helper) {
                        for (var t = r.opts.quickInsertButtons, n = '<div class="fr-qi-helper">', i = 0, s = 0; s < t.length; s++) {
                            var o = p.QUICK_INSERT_BUTTONS[t[s]];
                            o && (!o.requiredPlugin || p.PLUGINS[o.requiredPlugin] && 0 <= r.opts.pluginsEnabled.indexOf(o.requiredPlugin)) && (n += '<a class="fr-btn fr-floating-btn" role="button" title="'.concat(r.language.translate(o.title), '" tabIndex="-1" data-cmd="').concat(t[s], '" style="transition-delay: ').concat(.025 * i++, 's;">').concat(r.icon.create(o.icon), "</a>"))
                        }
                        n += "</div>", r.shared.$qi_helper = c(n), r.tooltip.bind(r.shared.$qi_helper, "a.fr-btn"), r.events.$on(r.shared.$qi_helper, "mousedown", function (e) {
                            e.preventDefault()
                        }, !0)
                    }
                    l = r.shared.$qi_helper, r.$box.append(l), setTimeout(function () {
                        l.css("top", parseFloat(a.css("top"))), l.css("left", parseFloat(a.css("left")) + a.outerWidth()), l.find("a").addClass("fr-size-1"), a.addClass("fr-on")
                    }, 10)
                }
            }

            function d() {
                var n = r.$box.find(".fr-qi-helper");
                n.length && function () {
                    for (var t = n.find("a"), e = 0; e < t.length; e++) !function (e) {
                        setTimeout(function () {
                            n.children().eq(t.length - 1 - e).removeClass("fr-size-1")
                        }, 25 * e)
                    }(e);
                    setTimeout(function () {
                        n.css("left", -9999), a && !a.hasClass("fr-hidden") && a.removeClass("fr-on")
                    }, 25 * e)
                }()
            }

            function f() {
                a.hasClass("fr-visible") && n(a.data("tag"))
            }

            return {
                _init: function e() {
                    if (!r.$wp || !r.opts.quickInsertEnabled) return !1;
                    r.popups.onShow("image.edit", o), r.events.on("mouseup", i), r.helpers.isMobile() && r.events.$on(c(r.o_doc), "selectionchange", i), r.events.on("blur", o), r.events.on("keyup", i), r.events.on("keydown", function () {
                        setTimeout(function () {
                            i()
                        }, 0)
                    })
                }, hide: o
            }
        }
    });

});

;/*!node_modules/froala-editor/js/plugins/quote.min.js*/
amis.define('a67aae6', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        (e = e && e.hasOwnProperty("default") ? e["default"] : e).PLUGINS.quote = function (r) {
            var a = r.$;

            function c(e) {
                for (; e.parentNode && e.parentNode != r.el;) e = e.parentNode;
                return e
            }

            return {
                apply: function t(e) {
                    r.selection.save(), r.html.wrap(!0, !0, !0, !0), r.selection.restore(), "increase" == e ? function n() {
                        var e, t = r.selection.blocks();
                        for (e = 0; e < t.length; e++) t[e] = c(t[e]);
                        r.selection.save();
                        var o = a(document.createElement("blockquote"));
                        for (o.insertBefore(t[0]), e = 0; e < t.length; e++) o.append(t[e]);
                        r.html.unwrap(), r.selection.restore()
                    }() : "decrease" == e && function o() {
                        var e, t = r.selection.blocks();
                        for (e = 0; e < t.length; e++) "BLOCKQUOTE" != t[e].tagName && (t[e] = a(t[e]).parentsUntil(r.$el, "BLOCKQUOTE").get(0));
                        for (r.selection.save(), e = 0; e < t.length; e++) t[e] && a(t[e]).replaceWith(t[e].innerHTML);
                        r.html.unwrap(), r.selection.restore()
                    }()
                }
            }
        }, e.RegisterShortcut(e.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"), e.RegisterShortcut(e.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0), e.RegisterCommand("quote", {
            title: "Quote",
            type: "dropdown",
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = {increase: "Increase", decrease: "Decrease"};
                for (var o in t) if (t.hasOwnProperty(o)) {
                    var n = this.shortcuts.get("quote.".concat(o));
                    e += '<li role="presentation"><a class="fr-command fr-active '.concat(o, '" tabIndex="-1" role="option" data-cmd="quote" data-param1="').concat(o, '" title="').concat(t[o], '">').concat(this.language.translate(t[o])).concat(n ? '<span class="fr-shortcut">'.concat(n, "</span>") : "", "</a></li>")
                }
                return e += "</ul>"
            },
            callback: function (e, t) {
                this.quote.apply(t)
            },
            plugin: "quote"
        }), e.DefineIcon("quote", {NAME: "quote-left", SVG_KEY: "blockquote"})
    });

});

;/*!node_modules/froala-editor/js/plugins/save.min.js*/
amis.define('6007122', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (e) {
        "use strict";
        e = e && e.hasOwnProperty("default") ? e["default"] : e, Object.assign(e.DEFAULTS, {
            saveInterval: 1e4,
            saveURL: null,
            saveParams: {},
            saveParam: "body",
            saveMethod: "POST"
        }), e.PLUGINS.save = function (i) {
            var v = i.$, e = null, f = null, t = !1, u = 1, l = 2, s = {};

            function c(e, t) {
                i.events.trigger("save.error", [{code: e, message: s[e]}, t])
            }

            function a(e) {
                void 0 === e && (e = i.html.get());
                var a = e, t = i.events.trigger("save.before", [e]);
                if (!1 === t) return !1;
                if ("string" == typeof t && (e = t), i.opts.saveURL) {
                    var s = {};
                    for (var n in i.opts.saveParams) if (i.opts.saveParams.hasOwnProperty(n)) {
                        var o = i.opts.saveParams[n];
                        s[n] = "function" == typeof o ? o.call(this) : o
                    }
                    var r = {};
                    r[i.opts.saveParam] = e, v(this).ajax({
                        method: i.opts.saveMethod,
                        url: i.opts.saveURL,
                        data: Object.assign(r, s),
                        crossDomain: i.opts.requestWithCORS,
                        withCredentials: i.opts.requestWithCredentials,
                        headers: i.opts.requestHeaders,
                        done: function (e, t, s) {
                            f = a, i.events.trigger("save.after", [e])
                        },
                        fail: function (e) {
                            c(l, e.response || e.responseText)
                        }
                    })
                } else c(u)
            }

            function n() {
                clearTimeout(e), e = setTimeout(function () {
                    var e = i.html.get();
                    (f != e || t) && (t = !1, a(f = e))
                }, 0)
            }

            return s[u] = "Missing saveURL option.", s[l] = "Something went wrong during save.", {
                _init: function o() {
                    i.opts.saveInterval && (f = i.html.get(), i.events.on("contentChanged", function () {
                        setTimeout(n, i.opts.saveInterval)
                    }), i.events.on("keydown destroy", function () {
                        clearTimeout(e)
                    }))
                }, save: a, reset: function r() {
                    n(), t = !1
                }, force: function d() {
                    t = !0
                }
            }
        }, e.DefineIcon("save", {NAME: "floppy-o", FA5NAME: "save"}), e.RegisterCommand("save", {
            title: "Save",
            undo: !1,
            focus: !1,
            refreshAfterCallback: !1,
            callback: function () {
                this.save.save()
            },
            plugin: "save"
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/special_characters.min.js*/
amis.define('70939b9', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (c, E) {
        "object" == typeof exports && "undefined" != typeof module ? E(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], E) : E(c.FroalaEditor)
    }(this, function (t) {
        "use strict";
        t = t && t.hasOwnProperty("default") ? t["default"] : t, Object.assign(t.DEFAULTS, {
            specialCharactersSets: [{
                title: "Latin",
                "char": "&iexcl;",
                list: [{"char": "&iexcl;", desc: "INVERTED EXCLAMATION MARK"}, {
                    "char": "&cent;",
                    desc: "CENT SIGN"
                }, {"char": "&pound;", desc: "POUND SIGN"}, {
                    "char": "&curren;",
                    desc: "CURRENCY SIGN"
                }, {"char": "&yen;", desc: "YEN SIGN"}, {"char": "&brvbar;", desc: "BROKEN BAR"}, {
                    "char": "&sect;",
                    desc: "SECTION SIGN"
                }, {"char": "&uml;", desc: "DIAERESIS"}, {"char": "&copy;", desc: "COPYRIGHT SIGN"}, {
                    "char": "&trade;",
                    desc: "TRADEMARK SIGN"
                }, {"char": "&ordf;", desc: "FEMININE ORDINAL INDICATOR"}, {
                    "char": "&laquo;",
                    desc: "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK"
                }, {"char": "&not;", desc: "NOT SIGN"}, {"char": "&reg;", desc: "REGISTERED SIGN"}, {
                    "char": "&macr;",
                    desc: "MACRON"
                }, {"char": "&deg;", desc: "DEGREE SIGN"}, {
                    "char": "&plusmn;",
                    desc: "PLUS-MINUS SIGN"
                }, {"char": "&sup2;", desc: "SUPERSCRIPT TWO"}, {
                    "char": "&sup3;",
                    desc: "SUPERSCRIPT THREE"
                }, {"char": "&acute;", desc: "ACUTE ACCENT"}, {
                    "char": "&micro;",
                    desc: "MICRO SIGN"
                }, {"char": "&para;", desc: "PILCROW SIGN"}, {
                    "char": "&middot;",
                    desc: "MIDDLE DOT"
                }, {"char": "&cedil;", desc: "CEDILLA"}, {"char": "&sup1;", desc: "SUPERSCRIPT ONE"}, {
                    "char": "&ordm;",
                    desc: "MASCULINE ORDINAL INDICATOR"
                }, {"char": "&raquo;", desc: "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK"}, {
                    "char": "&frac14;",
                    desc: "VULGAR FRACTION ONE QUARTER"
                }, {"char": "&frac12;", desc: "VULGAR FRACTION ONE HALF"}, {
                    "char": "&frac34;",
                    desc: "VULGAR FRACTION THREE QUARTERS"
                }, {"char": "&iquest;", desc: "INVERTED QUESTION MARK"}, {
                    "char": "&Agrave;",
                    desc: "LATIN CAPITAL LETTER A WITH GRAVE"
                }, {"char": "&Aacute;", desc: "LATIN CAPITAL LETTER A WITH ACUTE"}, {
                    "char": "&Acirc;",
                    desc: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX"
                }, {"char": "&Atilde;", desc: "LATIN CAPITAL LETTER A WITH TILDE"}, {
                    "char": "&Auml;",
                    desc: "LATIN CAPITAL LETTER A WITH DIAERESIS "
                }, {"char": "&Aring;", desc: "LATIN CAPITAL LETTER A WITH RING ABOVE"}, {
                    "char": "&AElig;",
                    desc: "LATIN CAPITAL LETTER AE"
                }, {"char": "&Ccedil;", desc: "LATIN CAPITAL LETTER C WITH CEDILLA"}, {
                    "char": "&Egrave;",
                    desc: "LATIN CAPITAL LETTER E WITH GRAVE"
                }, {"char": "&Eacute;", desc: "LATIN CAPITAL LETTER E WITH ACUTE"}, {
                    "char": "&Ecirc;",
                    desc: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX"
                }, {"char": "&Euml;", desc: "LATIN CAPITAL LETTER E WITH DIAERESIS"}, {
                    "char": "&Igrave;",
                    desc: "LATIN CAPITAL LETTER I WITH GRAVE"
                }, {"char": "&Iacute;", desc: "LATIN CAPITAL LETTER I WITH ACUTE"}, {
                    "char": "&Icirc;",
                    desc: "LATIN CAPITAL LETTER I WITH CIRCUMFLEX"
                }, {"char": "&Iuml;", desc: "LATIN CAPITAL LETTER I WITH DIAERESIS"}, {
                    "char": "&ETH;",
                    desc: "LATIN CAPITAL LETTER ETH"
                }, {"char": "&Ntilde;", desc: "LATIN CAPITAL LETTER N WITH TILDE"}, {
                    "char": "&Ograve;",
                    desc: "LATIN CAPITAL LETTER O WITH GRAVE"
                }, {"char": "&Oacute;", desc: "LATIN CAPITAL LETTER O WITH ACUTE"}, {
                    "char": "&Ocirc;",
                    desc: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX"
                }, {"char": "&Otilde;", desc: "LATIN CAPITAL LETTER O WITH TILDE"}, {
                    "char": "&Ouml;",
                    desc: "LATIN CAPITAL LETTER O WITH DIAERESIS"
                }, {"char": "&times;", desc: "MULTIPLICATION SIGN"}, {
                    "char": "&Oslash;",
                    desc: "LATIN CAPITAL LETTER O WITH STROKE"
                }, {"char": "&Ugrave;", desc: "LATIN CAPITAL LETTER U WITH GRAVE"}, {
                    "char": "&Uacute;",
                    desc: "LATIN CAPITAL LETTER U WITH ACUTE"
                }, {"char": "&Ucirc;", desc: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX"}, {
                    "char": "&Uuml;",
                    desc: "LATIN CAPITAL LETTER U WITH DIAERESIS"
                }, {"char": "&Yacute;", desc: "LATIN CAPITAL LETTER Y WITH ACUTE"}, {
                    "char": "&THORN;",
                    desc: "LATIN CAPITAL LETTER THORN"
                }, {"char": "&szlig;", desc: "LATIN SMALL LETTER SHARP S"}, {
                    "char": "&agrave;",
                    desc: "LATIN SMALL LETTER A WITH GRAVE"
                }, {"char": "&aacute;", desc: "LATIN SMALL LETTER A WITH ACUTE "}, {
                    "char": "&acirc;",
                    desc: "LATIN SMALL LETTER A WITH CIRCUMFLEX"
                }, {"char": "&atilde;", desc: "LATIN SMALL LETTER A WITH TILDE"}, {
                    "char": "&auml;",
                    desc: "LATIN SMALL LETTER A WITH DIAERESIS"
                }, {"char": "&aring;", desc: "LATIN SMALL LETTER A WITH RING ABOVE"}, {
                    "char": "&aelig;",
                    desc: "LATIN SMALL LETTER AE"
                }, {"char": "&ccedil;", desc: "LATIN SMALL LETTER C WITH CEDILLA"}, {
                    "char": "&egrave;",
                    desc: "LATIN SMALL LETTER E WITH GRAVE"
                }, {"char": "&eacute;", desc: "LATIN SMALL LETTER E WITH ACUTE"}, {
                    "char": "&ecirc;",
                    desc: "LATIN SMALL LETTER E WITH CIRCUMFLEX"
                }, {"char": "&euml;", desc: "LATIN SMALL LETTER E WITH DIAERESIS"}, {
                    "char": "&igrave;",
                    desc: "LATIN SMALL LETTER I WITH GRAVE"
                }, {"char": "&iacute;", desc: "LATIN SMALL LETTER I WITH ACUTE"}, {
                    "char": "&icirc;",
                    desc: "LATIN SMALL LETTER I WITH CIRCUMFLEX"
                }, {"char": "&iuml;", desc: "LATIN SMALL LETTER I WITH DIAERESIS"}, {
                    "char": "&eth;",
                    desc: "LATIN SMALL LETTER ETH"
                }, {"char": "&ntilde;", desc: "LATIN SMALL LETTER N WITH TILDE"}, {
                    "char": "&ograve;",
                    desc: "LATIN SMALL LETTER O WITH GRAVE"
                }, {"char": "&oacute;", desc: "LATIN SMALL LETTER O WITH ACUTE"}, {
                    "char": "&ocirc;",
                    desc: "LATIN SMALL LETTER O WITH CIRCUMFLEX"
                }, {"char": "&otilde;", desc: "LATIN SMALL LETTER O WITH TILDE"}, {
                    "char": "&ouml;",
                    desc: "LATIN SMALL LETTER O WITH DIAERESIS"
                }, {"char": "&divide;", desc: "DIVISION SIGN"}, {
                    "char": "&oslash;",
                    desc: "LATIN SMALL LETTER O WITH STROKE"
                }, {"char": "&ugrave;", desc: "LATIN SMALL LETTER U WITH GRAVE"}, {
                    "char": "&uacute;",
                    desc: "LATIN SMALL LETTER U WITH ACUTE"
                }, {"char": "&ucirc;", desc: "LATIN SMALL LETTER U WITH CIRCUMFLEX"}, {
                    "char": "&uuml;",
                    desc: "LATIN SMALL LETTER U WITH DIAERESIS"
                }, {"char": "&yacute;", desc: "LATIN SMALL LETTER Y WITH ACUTE"}, {
                    "char": "&thorn;",
                    desc: "LATIN SMALL LETTER THORN"
                }, {"char": "&yuml;", desc: "LATIN SMALL LETTER Y WITH DIAERESIS"}]
            }, {
                title: "Greek",
                "char": "&Alpha;",
                list: [{"char": "&Alpha;", desc: "GREEK CAPITAL LETTER ALPHA"}, {
                    "char": "&Beta;",
                    desc: "GREEK CAPITAL LETTER BETA"
                }, {"char": "&Gamma;", desc: "GREEK CAPITAL LETTER GAMMA"}, {
                    "char": "&Delta;",
                    desc: "GREEK CAPITAL LETTER DELTA"
                }, {"char": "&Epsilon;", desc: "GREEK CAPITAL LETTER EPSILON"}, {
                    "char": "&Zeta;",
                    desc: "GREEK CAPITAL LETTER ZETA"
                }, {"char": "&Eta;", desc: "GREEK CAPITAL LETTER ETA"}, {
                    "char": "&Theta;",
                    desc: "GREEK CAPITAL LETTER THETA"
                }, {"char": "&Iota;", desc: "GREEK CAPITAL LETTER IOTA"}, {
                    "char": "&Kappa;",
                    desc: "GREEK CAPITAL LETTER KAPPA"
                }, {"char": "&Lambda;", desc: "GREEK CAPITAL LETTER LAMBDA"}, {
                    "char": "&Mu;",
                    desc: "GREEK CAPITAL LETTER MU"
                }, {"char": "&Nu;", desc: "GREEK CAPITAL LETTER NU"}, {
                    "char": "&Xi;",
                    desc: "GREEK CAPITAL LETTER XI"
                }, {"char": "&Omicron;", desc: "GREEK CAPITAL LETTER OMICRON"}, {
                    "char": "&Pi;",
                    desc: "GREEK CAPITAL LETTER PI"
                }, {"char": "&Rho;", desc: "GREEK CAPITAL LETTER RHO"}, {
                    "char": "&Sigma;",
                    desc: "GREEK CAPITAL LETTER SIGMA"
                }, {"char": "&Tau;", desc: "GREEK CAPITAL LETTER TAU"}, {
                    "char": "&Upsilon;",
                    desc: "GREEK CAPITAL LETTER UPSILON"
                }, {"char": "&Phi;", desc: "GREEK CAPITAL LETTER PHI"}, {
                    "char": "&Chi;",
                    desc: "GREEK CAPITAL LETTER CHI"
                }, {"char": "&Psi;", desc: "GREEK CAPITAL LETTER PSI"}, {
                    "char": "&Omega;",
                    desc: "GREEK CAPITAL LETTER OMEGA"
                }, {"char": "&alpha;", desc: "GREEK SMALL LETTER ALPHA"}, {
                    "char": "&beta;",
                    desc: "GREEK SMALL LETTER BETA"
                }, {"char": "&gamma;", desc: "GREEK SMALL LETTER GAMMA"}, {
                    "char": "&delta;",
                    desc: "GREEK SMALL LETTER DELTA"
                }, {"char": "&epsilon;", desc: "GREEK SMALL LETTER EPSILON"}, {
                    "char": "&zeta;",
                    desc: "GREEK SMALL LETTER ZETA"
                }, {"char": "&eta;", desc: "GREEK SMALL LETTER ETA"}, {
                    "char": "&theta;",
                    desc: "GREEK SMALL LETTER THETA"
                }, {"char": "&iota;", desc: "GREEK SMALL LETTER IOTA"}, {
                    "char": "&kappa;",
                    desc: "GREEK SMALL LETTER KAPPA"
                }, {"char": "&lambda;", desc: "GREEK SMALL LETTER LAMBDA"}, {
                    "char": "&mu;",
                    desc: "GREEK SMALL LETTER MU"
                }, {"char": "&nu;", desc: "GREEK SMALL LETTER NU"}, {
                    "char": "&xi;",
                    desc: "GREEK SMALL LETTER XI"
                }, {"char": "&omicron;", desc: "GREEK SMALL LETTER OMICRON"}, {
                    "char": "&pi;",
                    desc: "GREEK SMALL LETTER PI"
                }, {"char": "&rho;", desc: "GREEK SMALL LETTER RHO"}, {
                    "char": "&sigmaf;",
                    desc: "GREEK SMALL LETTER FINAL SIGMA"
                }, {"char": "&sigma;", desc: "GREEK SMALL LETTER SIGMA"}, {
                    "char": "&tau;",
                    desc: "GREEK SMALL LETTER TAU"
                }, {"char": "&upsilon;", desc: "GREEK SMALL LETTER UPSILON"}, {
                    "char": "&phi;",
                    desc: "GREEK SMALL LETTER PHI"
                }, {"char": "&chi;", desc: "GREEK SMALL LETTER CHI"}, {
                    "char": "&psi;",
                    desc: "GREEK SMALL LETTER PSI"
                }, {"char": "&omega;", desc: "GREEK SMALL LETTER OMEGA"}, {
                    "char": "&thetasym;",
                    desc: "GREEK THETA SYMBOL"
                }, {"char": "&upsih;", desc: "GREEK UPSILON WITH HOOK SYMBOL"}, {
                    "char": "&straightphi;",
                    desc: "GREEK PHI SYMBOL"
                }, {"char": "&piv;", desc: "GREEK PI SYMBOL"}, {
                    "char": "&Gammad;",
                    desc: "GREEK LETTER DIGAMMA"
                }, {"char": "&gammad;", desc: "GREEK SMALL LETTER DIGAMMA"}, {
                    "char": "&varkappa;",
                    desc: "GREEK KAPPA SYMBOL"
                }, {"char": "&varrho;", desc: "GREEK RHO SYMBOL"}, {
                    "char": "&straightepsilon;",
                    desc: "GREEK LUNATE EPSILON SYMBOL"
                }, {"char": "&backepsilon;", desc: "GREEK REVERSED LUNATE EPSILON SYMBOL"}]
            }, {
                title: "Cyrillic",
                "char": "&#x400",
                list: [{"char": "&#x400", desc: "CYRILLIC CAPITAL LETTER IE WITH GRAVE"}, {
                    "char": "&#x401",
                    desc: "CYRILLIC CAPITAL LETTER IO"
                }, {"char": "&#x402", desc: "CYRILLIC CAPITAL LETTER DJE"}, {
                    "char": "&#x403",
                    desc: "CYRILLIC CAPITAL LETTER GJE"
                }, {"char": "&#x404", desc: "CYRILLIC CAPITAL LETTER UKRAINIAN IE"}, {
                    "char": "&#x405",
                    desc: "CYRILLIC CAPITAL LETTER DZE"
                }, {"char": "&#x406", desc: "CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I"}, {
                    "char": "&#x407",
                    desc: "CYRILLIC CAPITAL LETTER YI"
                }, {"char": "&#x408", desc: "CYRILLIC CAPITAL LETTER JE"}, {
                    "char": "&#x409",
                    desc: "CYRILLIC CAPITAL LETTER LJE"
                }, {"char": "&#x40A", desc: "CYRILLIC CAPITAL LETTER NJE"}, {
                    "char": "&#x40B",
                    desc: "CYRILLIC CAPITAL LETTER TSHE"
                }, {"char": "&#x40C", desc: "CYRILLIC CAPITAL LETTER KJE"}, {
                    "char": "&#x40D",
                    desc: "CYRILLIC CAPITAL LETTER I WITH GRAVE"
                }, {"char": "&#x40E", desc: "CYRILLIC CAPITAL LETTER SHORT U"}, {
                    "char": "&#x40F",
                    desc: "CYRILLIC CAPITAL LETTER DZHE"
                }, {"char": "&#x410", desc: "CYRILLIC CAPITAL LETTER A"}, {
                    "char": "&#x411",
                    desc: "CYRILLIC CAPITAL LETTER BE"
                }, {"char": "&#x412", desc: "CYRILLIC CAPITAL LETTER VE"}, {
                    "char": "&#x413",
                    desc: "CYRILLIC CAPITAL LETTER GHE"
                }, {"char": "&#x414", desc: "CYRILLIC CAPITAL LETTER DE"}, {
                    "char": "&#x415",
                    desc: "CYRILLIC CAPITAL LETTER IE"
                }, {"char": "&#x416", desc: "CYRILLIC CAPITAL LETTER ZHE"}, {
                    "char": "&#x417",
                    desc: "CYRILLIC CAPITAL LETTER ZE"
                }, {"char": "&#x418", desc: "CYRILLIC CAPITAL LETTER I"}, {
                    "char": "&#x419",
                    desc: "CYRILLIC CAPITAL LETTER SHORT I"
                }, {"char": "&#x41A", desc: "CYRILLIC CAPITAL LETTER KA"}, {
                    "char": "&#x41B",
                    desc: "CYRILLIC CAPITAL LETTER EL"
                }, {"char": "&#x41C", desc: "CYRILLIC CAPITAL LETTER EM"}, {
                    "char": "&#x41D",
                    desc: "CYRILLIC CAPITAL LETTER EN"
                }, {"char": "&#x41E", desc: "CYRILLIC CAPITAL LETTER O"}, {
                    "char": "&#x41F",
                    desc: "CYRILLIC CAPITAL LETTER PE"
                }, {"char": "&#x420", desc: "CYRILLIC CAPITAL LETTER ER"}, {
                    "char": "&#x421",
                    desc: "CYRILLIC CAPITAL LETTER ES"
                }, {"char": "&#x422", desc: "CYRILLIC CAPITAL LETTER TE"}, {
                    "char": "&#x423",
                    desc: "CYRILLIC CAPITAL LETTER U"
                }, {"char": "&#x424", desc: "CYRILLIC CAPITAL LETTER EF"}, {
                    "char": "&#x425",
                    desc: "CYRILLIC CAPITAL LETTER HA"
                }, {"char": "&#x426", desc: "CYRILLIC CAPITAL LETTER TSE"}, {
                    "char": "&#x427",
                    desc: "CYRILLIC CAPITAL LETTER CHE"
                }, {"char": "&#x428", desc: "CYRILLIC CAPITAL LETTER SHA"}, {
                    "char": "&#x429",
                    desc: "CYRILLIC CAPITAL LETTER SHCHA"
                }, {"char": "&#x42A", desc: "CYRILLIC CAPITAL LETTER HARD SIGN"}, {
                    "char": "&#x42B",
                    desc: "CYRILLIC CAPITAL LETTER YERU"
                }, {"char": "&#x42C", desc: "CYRILLIC CAPITAL LETTER SOFT SIGN"}, {
                    "char": "&#x42D",
                    desc: "CYRILLIC CAPITAL LETTER E"
                }, {"char": "&#x42E", desc: "CYRILLIC CAPITAL LETTER YU"}, {
                    "char": "&#x42F",
                    desc: "CYRILLIC CAPITAL LETTER YA"
                }, {"char": "&#x430", desc: "CYRILLIC SMALL LETTER A"}, {
                    "char": "&#x431",
                    desc: "CYRILLIC SMALL LETTER BE"
                }, {"char": "&#x432", desc: "CYRILLIC SMALL LETTER VE"}, {
                    "char": "&#x433",
                    desc: "CYRILLIC SMALL LETTER GHE"
                }, {"char": "&#x434", desc: "CYRILLIC SMALL LETTER DE"}, {
                    "char": "&#x435",
                    desc: "CYRILLIC SMALL LETTER IE"
                }, {"char": "&#x436", desc: "CYRILLIC SMALL LETTER ZHE"}, {
                    "char": "&#x437",
                    desc: "CYRILLIC SMALL LETTER ZE"
                }, {"char": "&#x438", desc: "CYRILLIC SMALL LETTER I"}, {
                    "char": "&#x439",
                    desc: "CYRILLIC SMALL LETTER SHORT I"
                }, {"char": "&#x43A", desc: "CYRILLIC SMALL LETTER KA"}, {
                    "char": "&#x43B",
                    desc: "CYRILLIC SMALL LETTER EL"
                }, {"char": "&#x43C", desc: "CYRILLIC SMALL LETTER EM"}, {
                    "char": "&#x43D",
                    desc: "CYRILLIC SMALL LETTER EN"
                }, {"char": "&#x43E", desc: "CYRILLIC SMALL LETTER O"}, {
                    "char": "&#x43F",
                    desc: "CYRILLIC SMALL LETTER PE"
                }, {"char": "&#x440", desc: "CYRILLIC SMALL LETTER ER"}, {
                    "char": "&#x441",
                    desc: "CYRILLIC SMALL LETTER ES"
                }, {"char": "&#x442", desc: "CYRILLIC SMALL LETTER TE"}, {
                    "char": "&#x443",
                    desc: "CYRILLIC SMALL LETTER U"
                }, {"char": "&#x444", desc: "CYRILLIC SMALL LETTER EF"}, {
                    "char": "&#x445",
                    desc: "CYRILLIC SMALL LETTER HA"
                }, {"char": "&#x446", desc: "CYRILLIC SMALL LETTER TSE"}, {
                    "char": "&#x447",
                    desc: "CYRILLIC SMALL LETTER CHE"
                }, {"char": "&#x448", desc: "CYRILLIC SMALL LETTER SHA"}, {
                    "char": "&#x449",
                    desc: "CYRILLIC SMALL LETTER SHCHA"
                }, {"char": "&#x44A", desc: "CYRILLIC SMALL LETTER HARD SIGN"}, {
                    "char": "&#x44B",
                    desc: "CYRILLIC SMALL LETTER YERU"
                }, {"char": "&#x44C", desc: "CYRILLIC SMALL LETTER SOFT SIGN"}, {
                    "char": "&#x44D",
                    desc: "CYRILLIC SMALL LETTER E"
                }, {"char": "&#x44E", desc: "CYRILLIC SMALL LETTER YU"}, {
                    "char": "&#x44F",
                    desc: "CYRILLIC SMALL LETTER YA"
                }, {"char": "&#x450", desc: "CYRILLIC SMALL LETTER IE WITH GRAVE"}, {
                    "char": "&#x451",
                    desc: "CYRILLIC SMALL LETTER IO"
                }, {"char": "&#x452", desc: "CYRILLIC SMALL LETTER DJE"}, {
                    "char": "&#x453",
                    desc: "CYRILLIC SMALL LETTER GJE"
                }, {"char": "&#x454", desc: "CYRILLIC SMALL LETTER UKRAINIAN IE"}, {
                    "char": "&#x455",
                    desc: "CYRILLIC SMALL LETTER DZE"
                }, {"char": "&#x456", desc: "CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I"}, {
                    "char": "&#x457",
                    desc: "CYRILLIC SMALL LETTER YI"
                }, {"char": "&#x458", desc: "CYRILLIC SMALL LETTER JE"}, {
                    "char": "&#x459",
                    desc: "CYRILLIC SMALL LETTER LJE"
                }, {"char": "&#x45A", desc: "CYRILLIC SMALL LETTER NJE"}, {
                    "char": "&#x45B",
                    desc: "CYRILLIC SMALL LETTER TSHE"
                }, {"char": "&#x45C", desc: "CYRILLIC SMALL LETTER KJE"}, {
                    "char": "&#x45D",
                    desc: "CYRILLIC SMALL LETTER I WITH GRAVE"
                }, {"char": "&#x45E", desc: "CYRILLIC SMALL LETTER SHORT U"}, {
                    "char": "&#x45F",
                    desc: "CYRILLIC SMALL LETTER DZHE"
                }]
            }, {
                title: "Punctuation",
                "char": "&ndash;",
                list: [{"char": "&ndash;", desc: "EN DASH"}, {"char": "&mdash;", desc: "EM DASH"}, {
                    "char": "&lsquo;",
                    desc: "LEFT SINGLE QUOTATION MARK"
                }, {"char": "&rsquo;", desc: "RIGHT SINGLE QUOTATION MARK"}, {
                    "char": "&sbquo;",
                    desc: "SINGLE LOW-9 QUOTATION MARK"
                }, {"char": "&ldquo;", desc: "LEFT DOUBLE QUOTATION MARK"}, {
                    "char": "&rdquo;",
                    desc: "RIGHT DOUBLE QUOTATION MARK"
                }, {"char": "&bdquo;", desc: "DOUBLE LOW-9 QUOTATION MARK"}, {
                    "char": "&dagger;",
                    desc: "DAGGER"
                }, {"char": "&Dagger;", desc: "DOUBLE DAGGER"}, {"char": "&bull;", desc: "BULLET"}, {
                    "char": "&hellip;",
                    desc: "HORIZONTAL ELLIPSIS"
                }, {"char": "&permil;", desc: "PER MILLE SIGN"}, {"char": "&prime;", desc: "PRIME"}, {
                    "char": "&Prime;",
                    desc: "DOUBLE PRIME"
                }, {"char": "&lsaquo;", desc: "SINGLE LEFT-POINTING ANGLE QUOTATION MARK"}, {
                    "char": "&rsaquo;",
                    desc: "SINGLE RIGHT-POINTING ANGLE QUOTATION MARK"
                }, {"char": "&oline;", desc: "OVERLINE"}, {"char": "&frasl;", desc: "FRACTION SLASH"}]
            }, {
                title: "Currency",
                "char": "&#x20A0",
                list: [{"char": "&#x20A0", desc: "EURO-CURRENCY SIGN"}, {
                    "char": "&#x20A1",
                    desc: "COLON SIGN"
                }, {"char": "&#x20A2", desc: "CRUZEIRO SIGN"}, {
                    "char": "&#x20A3",
                    desc: "FRENCH FRANC SIGN"
                }, {"char": "&#x20A4", desc: "LIRA SIGN"}, {"char": "&#x20A5", desc: "MILL SIGN"}, {
                    "char": "&#x20A6",
                    desc: "NAIRA SIGN"
                }, {"char": "&#x20A7", desc: "PESETA SIGN"}, {
                    "char": "&#x20A8",
                    desc: "RUPEE SIGN"
                }, {"char": "&#x20A9", desc: "WON SIGN"}, {
                    "char": "&#x20AA",
                    desc: "NEW SHEQEL SIGN"
                }, {"char": "&#x20AB", desc: "DONG SIGN"}, {"char": "&#x20AC", desc: "EURO SIGN"}, {
                    "char": "&#x20AD",
                    desc: "KIP SIGN"
                }, {"char": "&#x20AE", desc: "TUGRIK SIGN"}, {
                    "char": "&#x20AF",
                    desc: "DRACHMA SIGN"
                }, {"char": "&#x20B0", desc: "GERMAN PENNY SYMBOL"}, {
                    "char": "&#x20B1",
                    desc: "PESO SIGN"
                }, {"char": "&#x20B2", desc: "GUARANI SIGN"}, {
                    "char": "&#x20B3",
                    desc: "AUSTRAL SIGN"
                }, {"char": "&#x20B4", desc: "HRYVNIA SIGN"}, {
                    "char": "&#x20B5",
                    desc: "CEDI SIGN"
                }, {"char": "&#x20B6", desc: "LIVRE TOURNOIS SIGN"}, {
                    "char": "&#x20B7",
                    desc: "SPESMILO SIGN"
                }, {"char": "&#x20B8", desc: "TENGE SIGN"}, {"char": "&#x20B9", desc: "INDIAN RUPEE SIGN"}]
            }, {
                title: "Arrows",
                "char": "&#x2190",
                list: [{"char": "&#x2190", desc: "LEFTWARDS ARROW"}, {
                    "char": "&#x2191",
                    desc: "UPWARDS ARROW"
                }, {"char": "&#x2192", desc: "RIGHTWARDS ARROW"}, {
                    "char": "&#x2193",
                    desc: "DOWNWARDS ARROW"
                }, {"char": "&#x2194", desc: "LEFT RIGHT ARROW"}, {
                    "char": "&#x2195",
                    desc: "UP DOWN ARROW"
                }, {"char": "&#x2196", desc: "NORTH WEST ARROW"}, {
                    "char": "&#x2197",
                    desc: "NORTH EAST ARROW"
                }, {"char": "&#x2198", desc: "SOUTH EAST ARROW"}, {
                    "char": "&#x2199",
                    desc: "SOUTH WEST ARROW"
                }, {"char": "&#x219A", desc: "LEFTWARDS ARROW WITH STROKE"}, {
                    "char": "&#x219B",
                    desc: "RIGHTWARDS ARROW WITH STROKE"
                }, {"char": "&#x219C", desc: "LEFTWARDS WAVE ARROW"}, {
                    "char": "&#x219D",
                    desc: "RIGHTWARDS WAVE ARROW"
                }, {"char": "&#x219E", desc: "LEFTWARDS TWO HEADED ARROW"}, {
                    "char": "&#x219F",
                    desc: "UPWARDS TWO HEADED ARROW"
                }, {"char": "&#x21A0", desc: "RIGHTWARDS TWO HEADED ARROW"}, {
                    "char": "&#x21A1",
                    desc: "DOWNWARDS TWO HEADED ARROW"
                }, {"char": "&#x21A2", desc: "LEFTWARDS ARROW WITH TAIL"}, {
                    "char": "&#x21A3",
                    desc: "RIGHTWARDS ARROW WITH TAIL"
                }, {"char": "&#x21A4", desc: "LEFTWARDS ARROW FROM BAR"}, {
                    "char": "&#x21A5",
                    desc: "UPWARDS ARROW FROM BAR"
                }, {"char": "&#x21A6", desc: "RIGHTWARDS ARROW FROM BAR"}, {
                    "char": "&#x21A7",
                    desc: "DOWNWARDS ARROW FROM BAR"
                }, {"char": "&#x21A8", desc: "UP DOWN ARROW WITH BASE"}, {
                    "char": "&#x21A9",
                    desc: "LEFTWARDS ARROW WITH HOOK"
                }, {"char": "&#x21AA", desc: "RIGHTWARDS ARROW WITH HOOK"}, {
                    "char": "&#x21AB",
                    desc: "LEFTWARDS ARROW WITH LOOP"
                }, {"char": "&#x21AC", desc: "RIGHTWARDS ARROW WITH LOOP"}, {
                    "char": "&#x21AD",
                    desc: "LEFT RIGHT WAVE ARROW"
                }, {"char": "&#x21AE", desc: "LEFT RIGHT ARROW WITH STROKE"}, {
                    "char": "&#x21AF",
                    desc: "DOWNWARDS ZIGZAG ARROW"
                }, {"char": "&#x21B0", desc: "UPWARDS ARROW WITH TIP LEFTWARDS"}, {
                    "char": "&#x21B1",
                    desc: "UPWARDS ARROW WITH TIP RIGHTWARDS"
                }, {"char": "&#x21B2", desc: "DOWNWARDS ARROW WITH TIP LEFTWARDS"}, {
                    "char": "&#x21B3",
                    desc: "DOWNWARDS ARROW WITH TIP RIGHTWARDS"
                }, {"char": "&#x21B4", desc: "RIGHTWARDS ARROW WITH CORNER DOWNWARDS"}, {
                    "char": "&#x21B5",
                    desc: "DOWNWARDS ARROW WITH CORNER LEFTWARDS"
                }, {"char": "&#x21B6", desc: "ANTICLOCKWISE TOP SEMICIRCLE ARROW"}, {
                    "char": "&#x21B7",
                    desc: "CLOCKWISE TOP SEMICIRCLE ARROW"
                }, {"char": "&#x21B8", desc: "NORTH WEST ARROW TO LONG BAR"}, {
                    "char": "&#x21B9",
                    desc: "LEFTWARDS ARROW TO BAR OVER RIGHTWARDS ARROW TO BAR"
                }, {"char": "&#x21BA", desc: "ANTICLOCKWISE OPEN CIRCLE ARROW"}, {
                    "char": "&#x21BB",
                    desc: "CLOCKWISE OPEN CIRCLE ARROW"
                }, {"char": "&#x21BC", desc: "LEFTWARDS HARPOON WITH BARB UPWARDS"}, {
                    "char": "&#x21BD",
                    desc: "LEFTWARDS HARPOON WITH BARB DOWNWARDS"
                }, {"char": "&#x21BE", desc: "UPWARDS HARPOON WITH BARB RIGHTWARDS"}, {
                    "char": "&#x21BF",
                    desc: "UPWARDS HARPOON WITH BARB LEFTWARDS"
                }, {"char": "&#x21C0", desc: "RIGHTWARDS HARPOON WITH BARB UPWARDS"}, {
                    "char": "&#x21C1",
                    desc: "RIGHTWARDS HARPOON WITH BARB DOWNWARDS"
                }, {"char": "&#x21C2", desc: "DOWNWARDS HARPOON WITH BARB RIGHTWARDS"}, {
                    "char": "&#x21C3",
                    desc: "DOWNWARDS HARPOON WITH BARB LEFTWARDS"
                }, {"char": "&#x21C4", desc: "RIGHTWARDS ARROW OVER LEFTWARDS ARROW"}, {
                    "char": "&#x21C5",
                    desc: "UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW"
                }, {"char": "&#x21C6", desc: "LEFTWARDS ARROW OVER RIGHTWARDS ARROW"}, {
                    "char": "&#x21C7",
                    desc: "LEFTWARDS PAIRED ARROWS"
                }, {"char": "&#x21C8", desc: "UPWARDS PAIRED ARROWS"}, {
                    "char": "&#x21C9",
                    desc: "RIGHTWARDS PAIRED ARROWS"
                }, {"char": "&#x21CA", desc: "DOWNWARDS PAIRED ARROWS"}, {
                    "char": "&#x21CB",
                    desc: "LEFTWARDS HARPOON OVER RIGHTWARDS HARPOON"
                }, {"char": "&#x21CC", desc: "RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON"}, {
                    "char": "&#x21CD",
                    desc: "LEFTWARDS DOUBLE ARROW WITH STROKE"
                }, {"char": "&#x21CE", desc: "LEFT RIGHT DOUBLE ARROW WITH STROKE"}, {
                    "char": "&#x21CF",
                    desc: "RIGHTWARDS DOUBLE ARROW WITH STROKE"
                }, {"char": "&#x21D0", desc: "LEFTWARDS DOUBLE ARROW"}, {
                    "char": "&#x21D1",
                    desc: "UPWARDS DOUBLE ARROW"
                }, {"char": "&#x21D2", desc: "RIGHTWARDS DOUBLE ARROW"}, {
                    "char": "&#x21D3",
                    desc: "DOWNWARDS DOUBLE ARROW"
                }, {"char": "&#x21D4", desc: "LEFT RIGHT DOUBLE ARROW"}, {
                    "char": "&#x21D5",
                    desc: "UP DOWN DOUBLE ARROW"
                }, {"char": "&#x21D6", desc: "NORTH WEST DOUBLE ARROW"}, {
                    "char": "&#x21D7",
                    desc: "NORTH EAST DOUBLE ARROW"
                }, {"char": "&#x21D8", desc: "SOUTH EAST DOUBLE ARROW"}, {
                    "char": "&#x21D9",
                    desc: "SOUTH WEST DOUBLE ARROW"
                }, {"char": "&#x21DA", desc: "LEFTWARDS TRIPLE ARROW"}, {
                    "char": "&#x21DB",
                    desc: "RIGHTWARDS TRIPLE ARROW"
                }, {"char": "&#x21DC", desc: "LEFTWARDS SQUIGGLE ARROW"}, {
                    "char": "&#x21DD",
                    desc: "RIGHTWARDS SQUIGGLE ARROW"
                }, {"char": "&#x21DE", desc: "UPWARDS ARROW WITH DOUBLE STROKE"}, {
                    "char": "&#x21DF",
                    desc: "DOWNWARDS ARROW WITH DOUBLE STROKE"
                }, {"char": "&#x21E0", desc: "LEFTWARDS DASHED ARROW"}, {
                    "char": "&#x21E1",
                    desc: "UPWARDS DASHED ARROW"
                }, {"char": "&#x21E2", desc: "RIGHTWARDS DASHED ARROW"}, {
                    "char": "&#x21E3",
                    desc: "DOWNWARDS DASHED ARROW"
                }, {"char": "&#x21E4", desc: "LEFTWARDS ARROW TO BAR"}, {
                    "char": "&#x21E5",
                    desc: "RIGHTWARDS ARROW TO BAR"
                }, {"char": "&#x21E6", desc: "LEFTWARDS WHITE ARROW"}, {
                    "char": "&#x21E7",
                    desc: "UPWARDS WHITE ARROW"
                }, {"char": "&#x21E8", desc: "RIGHTWARDS WHITE ARROW"}, {
                    "char": "&#x21E9",
                    desc: "DOWNWARDS WHITE ARROW"
                }, {"char": "&#x21EA", desc: "UPWARDS WHITE ARROW FROM BAR"}, {
                    "char": "&#x21EB",
                    desc: "UPWARDS WHITE ARROW ON PEDESTAL"
                }, {"char": "&#x21EC", desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH HORIZONTAL BAR"}, {
                    "char": "&#x21ED",
                    desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH VERTICAL BAR"
                }, {"char": "&#x21EE", desc: "UPWARDS WHITE DOUBLE ARROW"}, {
                    "char": "&#x21EF",
                    desc: "UPWARDS WHITE DOUBLE ARROW ON PEDESTAL"
                }, {"char": "&#x21F0", desc: "RIGHTWARDS WHITE ARROW FROM WALL"}, {
                    "char": "&#x21F1",
                    desc: "NORTH WEST ARROW TO CORNER"
                }, {"char": "&#x21F2", desc: "SOUTH EAST ARROW TO CORNER"}, {
                    "char": "&#x21F3",
                    desc: "UP DOWN WHITE ARROW"
                }, {"char": "&#x21F4", desc: "RIGHT ARROW WITH SMALL CIRCLE"}, {
                    "char": "&#x21F5",
                    desc: "DOWNWARDS ARROW LEFTWARDS OF UPWARDS ARROW"
                }, {"char": "&#x21F6", desc: "THREE RIGHTWARDS ARROWS"}, {
                    "char": "&#x21F7",
                    desc: "LEFTWARDS ARROW WITH VERTICAL STROKE"
                }, {"char": "&#x21F8", desc: "RIGHTWARDS ARROW WITH VERTICAL STROKE"}, {
                    "char": "&#x21F9",
                    desc: "LEFT RIGHT ARROW WITH VERTICAL STROKE"
                }, {"char": "&#x21FA", desc: "LEFTWARDS ARROW WITH DOUBLE VERTICAL STROKE"}, {
                    "char": "&#x21FB",
                    desc: "RIGHTWARDS ARROW WITH DOUBLE VERTICAL STROKE"
                }, {"char": "&#x21FC", desc: "LEFT RIGHT ARROW WITH DOUBLE VERTICAL STROKE"}, {
                    "char": "&#x21FD",
                    desc: "LEFTWARDS OPEN-HEADED ARROW"
                }, {"char": "&#x21FE", desc: "RIGHTWARDS OPEN-HEADED ARROW"}, {
                    "char": "&#x21FF",
                    desc: "LEFT RIGHT OPEN-HEADED ARROW"
                }]
            }, {
                title: "Math",
                "char": "&forall;",
                list: [{"char": "&forall;", desc: "FOR ALL"}, {
                    "char": "&part;",
                    desc: "PARTIAL DIFFERENTIAL"
                }, {"char": "&exist;", desc: "THERE EXISTS"}, {
                    "char": "&empty;",
                    desc: "EMPTY SET"
                }, {"char": "&nabla;", desc: "NABLA"}, {"char": "&isin;", desc: "ELEMENT OF"}, {
                    "char": "&notin;",
                    desc: "NOT AN ELEMENT OF"
                }, {"char": "&ni;", desc: "CONTAINS AS MEMBER"}, {
                    "char": "&prod;",
                    desc: "N-ARY PRODUCT"
                }, {"char": "&sum;", desc: "N-ARY SUMMATION"}, {
                    "char": "&minus;",
                    desc: "MINUS SIGN"
                }, {"char": "&lowast;", desc: "ASTERISK OPERATOR"}, {
                    "char": "&radic;",
                    desc: "SQUARE ROOT"
                }, {"char": "&prop;", desc: "PROPORTIONAL TO"}, {"char": "&infin;", desc: "INFINITY"}, {
                    "char": "&ang;",
                    desc: "ANGLE"
                }, {"char": "&and;", desc: "LOGICAL AND"}, {"char": "&or;", desc: "LOGICAL OR"}, {
                    "char": "&cap;",
                    desc: "INTERSECTION"
                }, {"char": "&cup;", desc: "UNION"}, {"char": "&int;", desc: "INTEGRAL"}, {
                    "char": "&there4;",
                    desc: "THEREFORE"
                }, {"char": "&sim;", desc: "TILDE OPERATOR"}, {
                    "char": "&cong;",
                    desc: "APPROXIMATELY EQUAL TO"
                }, {"char": "&asymp;", desc: "ALMOST EQUAL TO"}, {
                    "char": "&ne;",
                    desc: "NOT EQUAL TO"
                }, {"char": "&equiv;", desc: "IDENTICAL TO"}, {
                    "char": "&le;",
                    desc: "LESS-THAN OR EQUAL TO"
                }, {"char": "&ge;", desc: "GREATER-THAN OR EQUAL TO"}, {
                    "char": "&sub;",
                    desc: "SUBSET OF"
                }, {"char": "&sup;", desc: "SUPERSET OF"}, {
                    "char": "&nsub;",
                    desc: "NOT A SUBSET OF"
                }, {"char": "&sube;", desc: "SUBSET OF OR EQUAL TO"}, {
                    "char": "&supe;",
                    desc: "SUPERSET OF OR EQUAL TO"
                }, {"char": "&oplus;", desc: "CIRCLED PLUS"}, {
                    "char": "&otimes;",
                    desc: "CIRCLED TIMES"
                }, {"char": "&perp;", desc: "UP TACK"}]
            }, {
                title: "Misc",
                "char": "&spades;",
                list: [{"char": "&spades;", desc: "BLACK SPADE SUIT"}, {
                    "char": "&clubs;",
                    desc: "BLACK CLUB SUIT"
                }, {"char": "&hearts;", desc: "BLACK HEART SUIT"}, {
                    "char": "&diams;",
                    desc: "BLACK DIAMOND SUIT"
                }, {"char": "&#x2669", desc: "QUARTER NOTE"}, {
                    "char": "&#x266A",
                    desc: "EIGHTH NOTE"
                }, {"char": "&#x266B", desc: "BEAMED EIGHTH NOTES"}, {
                    "char": "&#x266C",
                    desc: "BEAMED SIXTEENTH NOTES"
                }, {"char": "&#x266D", desc: "MUSIC FLAT SIGN"}, {
                    "char": "&#x266E",
                    desc: "MUSIC NATURAL SIGN"
                }, {"char": "&#x2600", desc: "BLACK SUN WITH RAYS"}, {
                    "char": "&#x2601",
                    desc: "CLOUD"
                }, {"char": "&#x2602", desc: "UMBRELLA"}, {"char": "&#x2603", desc: "SNOWMAN"}, {
                    "char": "&#x2615",
                    desc: "HOT BEVERAGE"
                }, {"char": "&#x2618", desc: "SHAMROCK"}, {"char": "&#x262F", desc: "YIN YANG"}, {
                    "char": "&#x2714",
                    desc: "HEAVY CHECK MARK"
                }, {"char": "&#x2716", desc: "HEAVY MULTIPLICATION X"}, {
                    "char": "&#x2744",
                    desc: "SNOWFLAKE"
                }, {"char": "&#x275B", desc: "HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT"}, {
                    "char": "&#x275C",
                    desc: "HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT"
                }, {"char": "&#x275D", desc: "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT"}, {
                    "char": "&#x275E",
                    desc: "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT"
                }, {"char": "&#x2764", desc: "HEAVY BLACK HEART"}]
            }], specialCharButtons: ["specialCharBack", "|"]
        }), Object.assign(t.POPUP_TEMPLATES, {specialCharacters: "[_BUTTONS_][_CUSTOM_LAYER_]"}), t.PLUGINS.specialCharacters = function (W) {
            var N = W.$, T = W.opts.specialCharactersSets[0], L = W.opts.specialCharactersSets, a = "";

            function I() {
                return '\n        <div class="fr-buttons fr-tabs fr-tabs-scroll">\n          '.concat(function E(c, T) {
                    var R = "";
                    return c.forEach(function (c) {
                        var E = {
                            elementClass: c.title === T.title ? "fr-active fr-active-tab" : "",
                            title: c.title,
                            dataParam1: c.title,
                            desc: c["char"]
                        };
                        R += '<button class="fr-command fr-btn fr-special-character-category '.concat(E.elementClass, '" title="').concat(E.title, '" data-cmd="setSpecialCharacterCategory" data-param1="').concat(E.dataParam1, '"><span>').concat(E.desc, "</span></button>")
                    }), R
                }(L, T), '\n        </div>\n        <div class="fr-icon-container fr-sc-container">\n          ').concat(function R(c) {
                    var T = "";
                    return c.list.forEach(function (c) {
                        var E = {dataParam1: c["char"], title: c.desc, splCharValue: c["char"]};
                        T += '<span class="fr-command fr-special-character fr-icon" role="button" \n      data-cmd="insertSpecialCharacter" data-param1="'.concat(E.dataParam1, '" \n      title="').concat(E.title, '">').concat(E.splCharValue, "</span>")
                    }), T
                }(T), "\n        </div>")
            }

            return {
                setSpecialCharacterCategory: function R(E) {
                    T = L.filter(function (c) {
                        return c.title === E
                    })[0], function c() {
                        W.popups.get("specialCharacters").html(a + I())
                    }()
                }, showSpecialCharsPopup: function e() {
                    var c = W.popups.get("specialCharacters");
                    if (c || (c = function A() {
                        W.opts.toolbarInline && 0 < W.opts.specialCharButtons.length && (a = '<div class="fr-buttons fr-tabs">'.concat(W.button.buildList(W.opts.specialCharButtons), "</div>"));
                        var c = {buttons: a, custom_layer: I()}, E = W.popups.create("specialCharacters", c);
                        return function T(S) {
                            W.events.on("popup.tab", function (c) {
                                var E = N(c.currentTarget);
                                if (!W.popups.isVisible("specialCharacters") || !E.is("span, a")) return !0;
                                var T, R, L, A = c.which;
                                if (t.KEYCODE.TAB == A) {
                                    if (E.is("span.fr-icon") && c.shiftKey || E.is("a") && !c.shiftKey) {
                                        var a = S.find(".fr-buttons");
                                        T = !W.accessibility.focusToolbar(a, !!c.shiftKey)
                                    }
                                    if (!1 !== T) {
                                        var I = S.find("span.fr-icon:focus").first().concat(S.findVisible(" span.fr-icon").first().concat(S.find("a")));
                                        E.is("span.fr-icon") && (I = I.not("span.fr-icon:not(:focus)")), R = I.index(E), R = c.shiftKey ? ((R - 1) % I.length + I.length) % I.length : (R + 1) % I.length, L = I.get(R), W.events.disableBlur(), L.focus(), T = !1
                                    }
                                } else if (t.KEYCODE.ARROW_UP == A || t.KEYCODE.ARROW_DOWN == A || t.KEYCODE.ARROW_LEFT == A || t.KEYCODE.ARROW_RIGHT == A) {
                                    if (E.is("span.fr-icon")) {
                                        var e = E.parent().find("span.fr-icon");
                                        R = e.index(E);
                                        var r = 11, s = Math.floor(e.length / r), h = R % r, d = Math.floor(R / r),
                                            C = d * r + h, O = s * r;
                                        t.KEYCODE.ARROW_UP == A ? C = ((C - r) % O + O) % O : t.KEYCODE.ARROW_DOWN == A ? C = (C + r) % O : t.KEYCODE.ARROW_LEFT == A ? C = ((C - 1) % O + O) % O : t.KEYCODE.ARROW_RIGHT == A && (C = (C + 1) % O), L = N(e.get(C)), W.events.disableBlur(), L.focus(), T = !1
                                    }
                                } else t.KEYCODE.ENTER == A && (E.is("a") ? E[0].click() : W.button.exec(E), T = !1);
                                return !1 === T && (c.preventDefault(), c.stopPropagation()), T
                            }, !0)
                        }(E), E
                    }()), !c.hasClass("fr-active")) {
                        W.popups.refresh("specialCharacters"), W.popups.setContainer("specialCharacters", W.$tb);
                        var E = W.$tb.find('.fr-command[data-cmd="specialCharacters"]'), T = W.button.getPosition(E),
                            R = T.left, L = T.top;
                        W.popups.show("specialCharacters", R, L, outerHeight)
                    }
                }, back: function c() {
                    W.popups.hide("specialCharacters"), W.toolbar.showInline()
                }
            }
        }, t.DefineIcon("specialCharacters", {
            NAME: "dollar-sign",
            SVG_KEY: "symbols"
        }), t.RegisterCommand("specialCharacters", {
            title: "Special Characters",
            icon: "specialCharacters",
            undo: !1,
            focus: !1,
            popup: !0,
            refreshAfterCallback: !1,
            plugin: "specialCharacters",
            showOnMobile: !0,
            callback: function () {
                this.popups.isVisible("specialCharacters") ? (this.$el.find(".fr-marker") && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("specialCharacters")) : this.specialCharacters.showSpecialCharsPopup()
            }
        }), t.RegisterCommand("insertSpecialCharacter", {
            callback: function (c, E) {
                this.undo.saveStep(), this.html.insert(E), this.undo.saveStep(), this.popups.hide("specialCharacters")
            }
        }), t.RegisterCommand("setSpecialCharacterCategory", {
            undo: !1, focus: !1, callback: function (c, E) {
                this.specialCharacters.setSpecialCharacterCategory(E)
            }
        }), t.DefineIcon("specialCharBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), t.RegisterCommand("specialCharBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.specialCharacters.back()
            }
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/table.min.js*/
amis.define('f73f87d', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (me) {
        "use strict";
        me = me && me.hasOwnProperty("default") ? me["default"] : me, Object.assign(me.POPUP_TEMPLATES, {
            "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
            "table.edit": "[_BUTTONS_]",
            "table.colors": "[_BUTTONS_][_COLORS_][_CUSTOM_COLOR_]"
        }), Object.assign(me.DEFAULTS, {
            tableInsertMaxSize: 10,
            tableEditButtons: ["tableHeader", "tableRemove", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
            tableInsertButtons: ["tableBack", "|"],
            tableResizer: !0,
            tableDefaultWidth: "100%",
            tableResizerOffset: 5,
            tableResizingLimit: 30,
            tableColorsButtons: ["tableBack", "|"],
            tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
            tableColorsStep: 7,
            tableCellStyles: {"fr-highlighted": "Highlighted", "fr-thick": "Thick"},
            tableStyles: {"fr-dashed-borders": "Dashed Borders", "fr-alternate-rows": "Alternate Rows"},
            tableCellMultipleStyles: !0,
            tableMultipleStyles: !0,
            tableInsertHelper: !0,
            tableInsertHelperOffset: 15
        }), me.PLUGINS.table = function (R) {
            var O, f, n, r, l, o, A, x = R.$;

            function h() {
                var e = _();
                if (e) {
                    var t = R.popups.get("table.edit");
                    if (t || (t = p()), t) {
                        R.popups.setContainer("table.edit", R.$sc);
                        var a = S(e), l = a.left + (a.right - a.left) / 2, n = a.bottom;
                        R.popups.show("table.edit", l, n, a.bottom - a.top, !0), R.edit.isDisabled() && (1 < Z().length && R.toolbar.disable(), R.$el.removeClass("fr-no-selection"), R.edit.on(), R.button.bulkRefresh(), R.selection.setAtEnd(R.$el.find(".fr-selected-cell").last().get(0)), R.selection.restore())
                    }
                }
            }

            function s() {
                var e = _();
                if (e) {
                    var t = R.popups.get("table.colors");
                    t || (t = function o() {
                        var e = "";
                        0 < R.opts.tableColorsButtons.length && (e = '<div class="fr-buttons fr-tabs">'.concat(R.button.buildList(R.opts.tableColorsButtons), "</div>"));
                        var t = "";
                        R.opts.colorsHEXInput && (t = '<div class="fr-color-hex-layer fr-table-colors-hex-layer fr-active fr-layer" id="fr-table-colors-hex-layer-'.concat(R.id, '"><div class="fr-input-line"><input maxlength="7" id="fr-table-colors-hex-layer-text-').concat(R.id, '" type="text" placeholder="').concat(R.language.translate("HEX Color"), '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="tableCellBackgroundCustomColor" tabIndex="2" role="button">').concat(R.language.translate("OK"), "</button></div></div>"));
                        var a = {
                            buttons: e, colors: function n() {
                                for (var e = '<div class="fr-color-set fr-table-colors">', t = 0; t < R.opts.tableColors.length; t++) 0 !== t && t % R.opts.tableColorsStep == 0 && (e += "<br>"), "REMOVE" != R.opts.tableColors[t] ? e += '<span class="fr-command" style="background: '.concat(R.opts.tableColors[t], ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="').concat(R.opts.tableColors[t], '"><span class="fr-sr-only">').concat(R.language.translate("Color"), " ").concat(R.opts.tableColors[t], "&nbsp;&nbsp;&nbsp;</span></span>") : e += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="'.concat(R.language.translate("Clear Formatting"), '">').concat(R.icon.create("tableColorRemove"), '<span class="fr-sr-only">').concat(R.language.translate("Clear Formatting"), "</span></span>");
                                return e += "</div>"
                            }(), custom_color: t
                        }, l = R.popups.create("table.colors", a);
                        return R.events.$on(R.$wp, "scroll.table-colors", function () {
                            R.popups.isVisible("table.colors") && s()
                        }), function r(u) {
                            R.events.on("popup.tab", function (e) {
                                var t = x(e.currentTarget);
                                if (!R.popups.isVisible("table.colors") || !t.is("span")) return !0;
                                var a = e.which, l = !0;
                                if (me.KEYCODE.TAB == a) {
                                    var n = u.find(".fr-buttons");
                                    l = !R.accessibility.focusToolbar(n, !!e.shiftKey)
                                } else if (me.KEYCODE.ARROW_UP == a || me.KEYCODE.ARROW_DOWN == a || me.KEYCODE.ARROW_LEFT == a || me.KEYCODE.ARROW_RIGHT == a) {
                                    var r = t.parent().find("span.fr-command"), o = r.index(t), s = R.opts.colorsStep,
                                        i = Math.floor(r.length / s), f = o % s, c = Math.floor(o / s), d = c * s + f,
                                        p = i * s;
                                    me.KEYCODE.ARROW_UP == a ? d = ((d - s) % p + p) % p : me.KEYCODE.ARROW_DOWN == a ? d = (d + s) % p : me.KEYCODE.ARROW_LEFT == a ? d = ((d - 1) % p + p) % p : me.KEYCODE.ARROW_RIGHT == a && (d = (d + 1) % p);
                                    var h = x(r.get(d));
                                    R.events.disableBlur(), h.focus(), l = !1
                                } else me.KEYCODE.ENTER == a && (R.button.exec(t), l = !1);
                                return !1 === l && (e.preventDefault(), e.stopPropagation()), l
                            }, !0)
                        }(l), l
                    }()), R.popups.setContainer("table.colors", R.$sc);
                    var a = S(e), l = (a.left + a.right) / 2, n = a.bottom;
                    !function r() {
                        var e = R.popups.get("table.colors"), t = R.$el.find(".fr-selected-cell").first(),
                            a = R.helpers.RGBToHex(t.css("background-color")),
                            l = e.find(".fr-table-colors-hex-layer input");
                        e.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), e.find('span[data-param1="'.concat(a, '"]')).addClass("fr-selected-color fr-active-item"), l.val(a).trigger("change")
                    }(), R.popups.show("table.colors", l, n, a.bottom - a.top, !0)
                }
            }

            function i() {
                0 === Z().length && R.toolbar.enable()
            }

            function c(e) {
                if (e) return R.popups.onHide("table.insert", function () {
                    R.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseover")
                }), !0;
                var t = "";
                0 < R.opts.tableInsertButtons.length && (t = '<div class="fr-buttons fr-tabs">'.concat(R.button.buildList(R.opts.tableInsertButtons), "</div>"));
                var a = {
                    buttons: t, rows_columns: function r() {
                        for (var e = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', t = 1; t <= R.opts.tableInsertMaxSize; t++) {
                            for (var a = 1; a <= R.opts.tableInsertMaxSize; a++) {
                                var l = "inline-block";
                                2 < t && !R.helpers.isMobile() && (l = "none");
                                var n = "fr-table-cell ";
                                1 == t && 1 == a && (n += " hover"), e += '<span class="fr-command '.concat(n, '" tabIndex="-1" data-cmd="tableInsert" data-row="').concat(t, '" data-col="').concat(a, '" data-param1="').concat(t, '" data-param2="').concat(a, '" style="display: ').concat(l, ';" role="button"><span></span><span class="fr-sr-only">').concat(t, " &times; ").concat(a, "&nbsp;&nbsp;&nbsp;</span></span>")
                            }
                            e += '<div class="new-line"></div>'
                        }
                        return e += "</div></div>"
                    }()
                }, l = R.popups.create("table.insert", a);
                return R.events.$on(l, "mouseover", ".fr-table-size .fr-select-table-size .fr-table-cell", function (e) {
                    d(x(e.currentTarget))
                }, !0), function n(e) {
                    R.events.$on(e, "focus", "[tabIndex]", function (e) {
                        var t = x(e.currentTarget);
                        d(t)
                    }), R.events.on("popup.tab", function (e) {
                        var t = x(e.currentTarget);
                        if (!R.popups.isVisible("table.insert") || !t.is("span, a")) return !0;
                        var a, l = e.which;
                        if (me.KEYCODE.ARROW_UP == l || me.KEYCODE.ARROW_DOWN == l || me.KEYCODE.ARROW_LEFT == l || me.KEYCODE.ARROW_RIGHT == l) {
                            if (t.is("span.fr-table-cell")) {
                                var n = t.parent().find("span.fr-table-cell"), r = n.index(t),
                                    o = R.opts.tableInsertMaxSize, s = r % o, i = Math.floor(r / o);
                                me.KEYCODE.ARROW_UP == l ? i = Math.max(0, i - 1) : me.KEYCODE.ARROW_DOWN == l ? i = Math.min(R.opts.tableInsertMaxSize - 1, i + 1) : me.KEYCODE.ARROW_LEFT == l ? s = Math.max(0, s - 1) : me.KEYCODE.ARROW_RIGHT == l && (s = Math.min(R.opts.tableInsertMaxSize - 1, s + 1));
                                var f = i * o + s, c = x(n.get(f));
                                d(c), R.events.disableBlur(), c.focus(), a = !1
                            }
                        } else me.KEYCODE.ENTER == l && (R.button.exec(t), a = !1);
                        return !1 === a && (e.preventDefault(), e.stopPropagation()), a
                    }, !0)
                }(l), l
            }

            function d(e) {
                var t = e.data("row");
                null !== t && (t = parseInt(t));
                var a = e.data("col");
                null !== a && (a = parseInt(a));
                var l = e.parent();
                l.siblings(".fr-table-size-info").html("".concat(t, " &times; ").concat(a)), l.find("> span").removeClass("hover fr-active-item");
                for (var n = 1; n <= R.opts.tableInsertMaxSize; n++) for (var r = 0; r <= R.opts.tableInsertMaxSize; r++) {
                    var o = l.find('> span[data-row="'.concat(n, '"][data-col="').concat(r, '"]'));
                    n <= t && r <= a ? o.addClass("hover") : n <= t + 1 || n <= 2 && !R.helpers.isMobile() ? o.css("display", "inline-block") : 2 < n && !R.helpers.isMobile() && o.css("display", "none")
                }
                e.addClass("fr-active-item")
            }

            function p(e) {
                if (e) return R.popups.onHide("table.edit", i), !0;
                if (0 < R.opts.tableEditButtons.length) {
                    var t = {buttons: '<div class="fr-buttons">'.concat(R.button.buildList(R.opts.tableEditButtons), "</div>")},
                        a = R.popups.create("table.edit", t);
                    return R.events.$on(R.$wp, "scroll.table-edit", function () {
                        R.popups.isVisible("table.edit") && h()
                    }), a
                }
                return !1
            }

            function u() {
                if (0 < Z().length) {
                    var e = Q();
                    R.selection.setBefore(e.get(0)) || R.selection.setAfter(e.get(0)), R.selection.restore(), R.popups.hide("table.edit"), e.remove(), R.toolbar.enable()
                }
            }

            function b(e) {
                var t = Q();
                if (0 < t.length) {
                    if (0 < R.$el.find("th.fr-selected-cell").length && "above" == e) return;
                    var a, l, n, r = _(), o = M(r);
                    if (null == o) return;
                    l = "above" == e ? o.min_i : o.max_i;
                    var s = "<tr>";
                    for (a = 0; a < r[l].length; a++) {
                        if ("below" == e && l < r.length - 1 && r[l][a] == r[l + 1][a] || "above" == e && 0 < l && r[l][a] == r[l - 1][a]) {
                            if (0 === a || 0 < a && r[l][a] != r[l][a - 1]) {
                                var i = x(r[l][a]);
                                i.attr("rowspan", parseInt(i.attr("rowspan"), 10) + 1)
                            }
                        } else s += '<td style="' + x(r[l][a]).attr("style") + '" ><br></td>'
                    }
                    s += "</tr>", n = 0 < R.$el.find("th.fr-selected-cell").length && "below" == e ? x(t.find("tbody").not(t.find("> table tbody"))) : x(t.find("tr").not(t.find("> table tr")).get(l)), "below" == e ? "TBODY" == n.attr("tagName") ? n.prepend(s) : n[0].parentNode && n[0].insertAdjacentHTML("afterend", s) : "above" == e && (n.before(s), R.popups.isVisible("table.edit") && h())
                }
            }

            function g(e, t, a) {
                var l, n, r, o, s, i = 0, f = _(a);
                if (e < (t = Math.min(t, f[0].length - 1))) for (n = e; n <= t; n++) if (!(e < n && f[0][n] == f[0][n - 1]) && 1 < (o = Math.min(parseInt(f[0][n].getAttribute("colspan"), 10) || 1, t - e + 1)) && f[0][n] == f[0][n + 1]) for (i = o - 1, l = 1; l < f.length; l++) if (f[l][n] != f[l - 1][n]) {
                    for (r = n; r < n + o; r++) if (1 < (s = parseInt(f[l][r].getAttribute("colspan"), 10) || 1) && f[l][r] == f[l][r + 1]) r += i = Math.min(i, s - 1); else if (!(i = Math.max(0, i - 1))) break;
                    if (!i) break
                }
                i && v(f, i, "colspan", 0, f.length - 1, e, t)
            }

            function m(e, t, a) {
                var l, n, r, o, s, i = 0, f = _(a);
                if (e < (t = Math.min(t, f.length - 1))) for (l = e; l <= t; l++) if (!(e < l && f[l][0] == f[l - 1][0]) && 1 < (o = Math.min(parseInt(f[l][0].getAttribute("rowspan"), 10) || 1, t - e + 1)) && f[l][0] == f[l + 1][0]) for (i = o - 1, n = 1; n < f[0].length; n++) if (f[l][n] != f[l][n - 1]) {
                    for (r = l; r < l + o; r++) if (1 < (s = parseInt(f[r][n].getAttribute("rowspan"), 10) || 1) && f[r][n] == f[r + 1][n]) r += i = Math.min(i, s - 1); else if (!(i = Math.max(0, i - 1))) break;
                    if (!i) break
                }
                i && v(f, i, "rowspan", e, t, 0, f[0].length - 1)
            }

            function v(e, t, a, l, n, r, o) {
                var s, i, f;
                for (s = l; s <= n; s++) for (i = r; i <= o; i++) l < s && e[s][i] == e[s - 1][i] || r < i && e[s][i] == e[s][i - 1] || 1 < (f = parseInt(e[s][i].getAttribute(a), 10) || 1) && (1 < f - t ? e[s][i].setAttribute(a, f - t) : e[s][i].removeAttribute(a))
            }

            function w(e, t, a, l, n) {
                m(e, t, n), g(a, l, n)
            }

            function t(e) {
                var t = R.$el.find(".fr-selected-cell");
                "REMOVE" != e ? t.css("background-color", R.helpers.HEXtoRGB(e)) : t.css("background-color", ""), h()
            }

            function _(e) {
                var f = [];
                return null == (e = e || null) && 0 < Z().length && (e = Q()), e && e.findVisible("tr").not(e.find("> table tr")).each(function (s, e) {
                    var t = x(e), i = 0;
                    t.find("> th, > td").each(function (e, t) {
                        for (var a = x(t), l = parseInt(a.attr("colspan"), 10) || 1, n = parseInt(a.attr("rowspan"), 10) || 1, r = s; r < s + n; r++) for (var o = i; o < i + l; o++) f[r] || (f[r] = []), f[r][o] ? i++ : f[r][o] = t;
                        i += l
                    })
                }), f
            }

            function $(e, t) {
                for (var a = 0; a < t.length; a++) for (var l = 0; l < t[a].length; l++) if (t[a][l] == e) return {
                    row: a,
                    col: l
                }
            }

            function D(e, t, a) {
                for (var l = e + 1, n = t + 1; l < a.length;) {
                    if (a[l][t] != a[e][t]) {
                        l--;
                        break
                    }
                    l++
                }
                for (l == a.length && l--; n < a[e].length;) {
                    if (a[e][n] != a[e][t]) {
                        n--;
                        break
                    }
                    n++
                }
                return n == a[e].length && n--, {row: l, col: n}
            }

            function C() {
                R.el.querySelector(".fr-cell-fixed") && R.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), R.el.querySelector(".fr-cell-handler") && R.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler")
            }

            function E() {
                var e = R.$el.find(".fr-selected-cell");
                0 < e.length && e.each(function () {
                    var e = x(this);
                    e.removeClass("fr-selected-cell"), "" === e.attr("class") && e.removeAttr("class")
                }), C()
            }

            function y() {
                R.events.disableBlur(), R.selection.clear(), R.$el.addClass("fr-no-selection"), R.$el.blur(), R.events.enableBlur()
            }

            function M(e) {
                var t = R.$el.find(".fr-selected-cell");
                if (0 < t.length) {
                    var a, l = e.length, n = 0, r = e[0].length, o = 0;
                    for (a = 0; a < t.length; a++) {
                        var s = $(t[a], e), i = D(s.row, s.col, e);
                        l = Math.min(s.row, l), n = Math.max(i.row, n), r = Math.min(s.col, r), o = Math.max(i.col, o)
                    }
                    return {min_i: l, max_i: n, min_j: r, max_j: o}
                }
                return null
            }

            function S(e) {
                var t = M(e);
                if (null != t) {
                    var a = x(e[t.min_i][t.min_j]), l = x(e[t.min_i][t.max_j]), n = x(e[t.max_i][t.min_j]);
                    return {
                        left: a.length && a.offset().left,
                        right: l.length && l.offset().left + l.outerWidth(),
                        top: a.length && a.offset().top,
                        bottom: n.length && n.offset().top + n.outerHeight()
                    }
                }
            }

            function I(e, t) {
                if (x(e).is(t)) E(), x(e).addClass("fr-selected-cell"); else {
                    y(), R.edit.off();
                    var a = _(), l = $(e, a), n = $(t, a), r = function h(e, t, a, l, n) {
                        var r, o, s, i, f = e, c = t, d = a, p = l;
                        for (r = f; r <= c; r++) (1 < (parseInt(x(n[r][d]).attr("rowspan"), 10) || 1) || 1 < (parseInt(x(n[r][d]).attr("colspan"), 10) || 1)) && (i = D((s = $(n[r][d], n)).row, s.col, n), f = Math.min(s.row, f), c = Math.max(i.row, c), d = Math.min(s.col, d), p = Math.max(i.col, p)), (1 < (parseInt(x(n[r][p]).attr("rowspan"), 10) || 1) || 1 < (parseInt(x(n[r][p]).attr("colspan"), 10) || 1)) && (i = D((s = $(n[r][p], n)).row, s.col, n), f = Math.min(s.row, f), c = Math.max(i.row, c), d = Math.min(s.col, d), p = Math.max(i.col, p));
                        for (o = d; o <= p; o++) (1 < (parseInt(x(n[f][o]).attr("rowspan"), 10) || 1) || 1 < (parseInt(x(n[f][o]).attr("colspan"), 10) || 1)) && (i = D((s = $(n[f][o], n)).row, s.col, n), f = Math.min(s.row, f), c = Math.max(i.row, c), d = Math.min(s.col, d), p = Math.max(i.col, p)), (1 < (parseInt(x(n[c][o]).attr("rowspan"), 10) || 1) || 1 < (parseInt(x(n[c][o]).attr("colspan"), 10) || 1)) && (i = D((s = $(n[c][o], n)).row, s.col, n), f = Math.min(s.row, f), c = Math.max(i.row, c), d = Math.min(s.col, d), p = Math.max(i.col, p));
                        return f == e && c == t && d == a && p == l ? {
                            min_i: e,
                            max_i: t,
                            min_j: a,
                            max_j: l
                        } : h(f, c, d, p, n)
                    }(Math.min(l.row, n.row), Math.max(l.row, n.row), Math.min(l.col, n.col), Math.max(l.col, n.col), a);
                    E(), e.classList.add("fr-cell-fixed"), t.classList.add("fr-cell-handler");
                    for (var o = r.min_i; o <= r.max_i; o++) for (var s = r.min_j; s <= r.max_j; s++) x(a[o][s]).addClass("fr-selected-cell")
                }
            }

            function N(e) {
                var t = null, a = x(e.target);
                return "TD" == e.target.tagName || "TH" == e.target.tagName ? t = e.target : 0 < a.closest("th", a.closest("thead")[0]).length ? t = a.closest("th", a.closest("thead")[0]).get(0) : 0 < a.closest("td", a.closest("tr")[0]).length && (t = a.closest("td", a.closest("tr")[0]).get(0)), -1 === R.$el.html.toString().search(t) ? null : t
            }

            function T() {
                E(), R.popups.hide("table.edit")
            }

            function e(e) {
                var t = N(e);
                if ("false" == x(t).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                if (0 < Z().length && !t && T(), !R.edit.isDisabled() || R.popups.isVisible("table.edit")) if (1 != e.which || 1 == e.which && R.helpers.isMac() && e.ctrlKey) (3 == e.which || 1 == e.which && R.helpers.isMac() && e.ctrlKey) && t && T(); else if (r = !0, t) {
                    0 < Z().length && !e.shiftKey && T(), e.stopPropagation(), R.events.trigger("image.hideResizer"), R.events.trigger("video.hideResizer"), n = !0;
                    var a = t.tagName.toLowerCase();
                    e.shiftKey && 0 < R.$el.find("".concat(a, ".fr-selected-cell")).length ? x(R.$el.find("".concat(a, ".fr-selected-cell")).closest("table")).is(x(t).closest("table")) ? I(l, t) : y() : ((R.keys.ctrlKey(e) || e.shiftKey) && (1 < Z().length || 0 === x(t).find(R.selection.element()).length && !x(t).is(R.selection.element())) && y(), l = t, 0 < R.opts.tableEditButtons.length && I(l, l))
                }
            }

            function a(e) {
                if (!R.edit.isDisabled() && R.popups.areVisible()) return !0;
                if (n || R.$tb.is(e.target) || R.$tb.is(x(e.target).closest(".fr-toolbar")) || (0 < Z().length && R.toolbar.enable(), E()), !(1 != e.which || 1 == e.which && R.helpers.isMac() && e.ctrlKey)) {
                    if (r = !1, n) n = !1, N(e) || 1 != Z().length ? 0 < Z().length && (R.selection.isCollapsed() ? h() : (E(), R.edit.on())) : E();
                    if (A) {
                        A = !1, O.removeClass("fr-moving"), R.$el.removeClass("fr-no-selection"), R.edit.on();
                        var t = parseFloat(O.css("left")) + R.opts.tableResizerOffset + R.$wp.offset().left;
                        R.opts.iframe && (t -= R.$iframe.offset().left), O.data("release-position", t), O.removeData("max-left"), O.removeData("max-right"), function C() {
                            var e = O.data("origin"), t = O.data("release-position");
                            if (e !== t) {
                                var a = O.data("first"), l = O.data("second"), n = O.data("table"), r = n.outerWidth();
                                if (R.undo.canDo() || R.undo.saveStep(), null != a && null != l) {
                                    var o, s, i, f = _(n), c = [], d = [], p = [], h = [];
                                    for (o = 0; o < f.length; o++) s = x(f[o][a]), i = x(f[o][l]), c[o] = s.outerWidth(), p[o] = i.outerWidth(), d[o] = c[o] / r * 100, h[o] = p[o] / r * 100;
                                    for (o = 0; o < f.length; o++) if (s = x(f[o][a]), i = x(f[o][l]), f[o][a] != f[o][l]) {
                                        var u = (d[o] * (c[o] + t - e) / c[o]).toFixed(4);
                                        s.css("width", u + "%"), i.css("width", (d[o] + h[o] - u).toFixed(4) + "%")
                                    }
                                } else {
                                    var b, g = n.parent(), m = r / g.width() * 100,
                                        v = (parseInt(n.css("margin-left"), 10) || 0) / g.width() * 100,
                                        w = (parseInt(n.css("margin-right"), 10) || 0) / g.width() * 100;
                                    "rtl" == R.opts.direction && 0 === l || "rtl" != R.opts.direction && 0 !== l ? (b = (r + t - e) / r * m, n.css("margin-right", "calc(100% - ".concat(Math.round(b).toFixed(4), "% - ").concat(Math.round(v).toFixed(4), "%)"))) : ("rtl" == R.opts.direction && 0 !== l || "rtl" != R.opts.direction && 0 === l) && (b = (r - t + e) / r * m, n.css("margin-left", "calc(100% - ".concat(Math.round(b).toFixed(4), "% - ").concat(Math.round(w).toFixed(4), "%)"))), n.css("width", "".concat(Math.round(b).toFixed(4), "%"))
                                }
                                R.selection.restore(), R.undo.saveStep(), R.events.trigger("table.resized", [n.get(0)])
                            }
                            O.removeData("origin"), O.removeData("release-position"), O.removeData("first"), O.removeData("second"), O.removeData("table")
                        }(), Y()
                    }
                }
            }

            function K(e) {
                if (R.events.$on(x("input"), "click", ee), !0 === n && 0 < R.opts.tableEditButtons.length) {
                    if (x(e.currentTarget).closest("table").is(Q())) {
                        if ("TD" == e.currentTarget.tagName && 0 === R.$el.find("th.fr-selected-cell").length) return void I(l, e.currentTarget);
                        if ("TH" == e.currentTarget.tagName && 0 === R.$el.find("td.fr-selected-cell").length) return void I(l, e.currentTarget)
                    }
                    y()
                }
            }

            function B(e, t, a, l) {
                for (var n, r = t; r != R.el && "TD" != r.tagName && "TH" != r.tagName && ("up" == l ? n = r.previousElementSibling : "down" == l && (n = r.nextElementSibling), !n);) r = r.parentNode;
                "TD" == r.tagName || "TH" == r.tagName ? function o(e, t) {
                    for (var a = e; a && "TABLE" != a.tagName && a.parentNode != R.el;) a = a.parentNode;
                    if (a && "TABLE" == a.tagName) {
                        var l = _(x(a));
                        "up" == t ? z($(e, l), a, l) : "down" == t && k($(e, l), a, l)
                    }
                }(r, l) : n && ("up" == l && R.selection.setAtEnd(n), "down" == l && R.selection.setAtStart(n))
            }

            function z(e, t, a) {
                0 < e.row ? R.selection.setAtEnd(a[e.row - 1][e.col]) : B(0, t, 0, "up")
            }

            function k(e, t, a) {
                var l = parseInt(a[e.row][e.col].getAttribute("rowspan"), 10) || 1;
                e.row < a.length - l ? R.selection.setAtStart(a[e.row + l][e.col]) : B(0, t, 0, "down")
            }

            function Y() {
                O && (O.find("div").css("opacity", 0), O.css("top", 0), O.css("left", 0), O.css("height", 0), O.find("div").css("height", 0), O.hide())
            }

            function W() {
                f && f.removeClass("fr-visible").css("left", "-9999px")
            }

            function L(e, t) {
                var a = x(t), l = a.closest("table"), n = l.parent();
                if (t && "TD" != t.tagName && "TH" != t.tagName && (0 < a.closest("td").length ? t = a.closest("td") : 0 < a.closest("th").length && (t = a.closest("th"))), !t || "TD" != t.tagName && "TH" != t.tagName) O && a.get(0) != O.get(0) && a.parent().get(0) != O.get(0) && R.core.sameInstance(O) && Y(); else {
                    if (a = x(t), 0 === R.$el.find(a).length) return !1;
                    var r = a.offset().left - 1, o = r + a.outerWidth();
                    if (Math.abs(e.pageX - r) <= R.opts.tableResizerOffset || Math.abs(o - e.pageX) <= R.opts.tableResizerOffset) {
                        var s, i, f, c, d, p = _(l), h = $(t, p), u = D(h.row, h.col, p), b = l.offset().top,
                            g = l.outerHeight() - 1;
                        "rtl" != R.opts.direction ? e.pageX - r <= R.opts.tableResizerOffset ? (f = r, 0 < h.col ? (c = r - j(h.col - 1, p) + R.opts.tableResizingLimit, d = r + j(h.col, p) - R.opts.tableResizingLimit, s = h.col - 1, i = h.col) : (s = null, i = 0, c = l.offset().left - 1 - parseInt(l.css("margin-left"), 10), d = l.offset().left - 1 + l.width() - p[0].length * R.opts.tableResizingLimit)) : o - e.pageX <= R.opts.tableResizerOffset && (f = o, u.col < p[u.row].length && p[u.row][u.col + 1] ? (c = o - j(u.col, p) + R.opts.tableResizingLimit, d = o + j(u.col + 1, p) - R.opts.tableResizingLimit, s = u.col, i = u.col + 1) : (s = u.col, i = null, c = l.offset().left - 1 + p[0].length * R.opts.tableResizingLimit, d = n.offset().left - 1 + n.width() + parseFloat(n.css("padding-left")))) : o - e.pageX <= R.opts.tableResizerOffset ? (f = o, 0 < h.col ? (c = o - j(h.col, p) + R.opts.tableResizingLimit, d = o + j(h.col - 1, p) - R.opts.tableResizingLimit, s = h.col, i = h.col - 1) : (s = null, i = 0, c = l.offset().left + p[0].length * R.opts.tableResizingLimit, d = n.offset().left - 1 + n.width() + parseFloat(n.css("padding-left")))) : e.pageX - r <= R.opts.tableResizerOffset && (f = r, u.col < p[u.row].length && p[u.row][u.col + 1] ? (c = r - j(u.col + 1, p) + R.opts.tableResizingLimit, d = r + j(u.col, p) - R.opts.tableResizingLimit, s = u.col + 1, i = u.col) : (s = u.col, i = null, c = n.offset().left + parseFloat(n.css("padding-left")), d = l.offset().left - 1 + l.width() - p[0].length * R.opts.tableResizingLimit)), O || function E() {
                            R.shared.$table_resizer || (R.shared.$table_resizer = x(document.createElement("div")).attr("class", "fr-table-resizer").html("<div></div>")), O = R.shared.$table_resizer, R.events.$on(O, "mousedown", function (e) {
                                return !R.core.sameInstance(O) || (0 < Z().length && T(), 1 == e.which ? (R.selection.save(), A = !0, O.addClass("fr-moving"), y(), R.edit.off(), O.find("div").css("opacity", 1), !1) : void 0)
                            }), R.events.$on(O, "mousemove", function (e) {
                                if (!R.core.sameInstance(O)) return !0;
                                A && (R.opts.iframe && (e.pageX -= R.$iframe.offset().left), G(e))
                            }), R.events.on("shared.destroy", function () {
                                O.html("").removeData().remove(), O = null
                            }, !0), R.events.on("destroy", function () {
                                R.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), x("body").first().append(O.hide())
                            }, !0)
                        }(), O.data("table", l), O.data("first", s), O.data("second", i), O.data("instance", R), R.$wp.append(O);
                        var m = f - R.win.pageXOffset - R.opts.tableResizerOffset - R.$wp.offset().left,
                            v = b - R.$wp.offset().top + R.$wp.scrollTop();
                        if (R.opts.iframe) {
                            var w = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-top")),
                                C = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-left"));
                            m += R.$iframe.offset().left + C, v += R.$iframe.offset().top + w, c += R.$iframe.offset().left, d += R.$iframe.offset().left
                        }
                        O.data("max-left", c), O.data("max-right", d), O.data("origin", f - R.win.pageXOffset), O.css("top", v), O.css("left", m), O.css("height", g), O.find("div").css("height", g), O.css("padding-left", R.opts.tableResizerOffset), O.css("padding-right", R.opts.tableResizerOffset), O.show()
                    } else R.core.sameInstance(O) && Y()
                }
            }

            function F(e, t) {
                if (R.$box.find(".fr-line-breaker").isVisible()) return !1;
                f || q(), R.$box.append(f), f.data("instance", R);
                var a, l = x(t).find("tr").first(), n = e.pageX, r = 0, o = 0;
                if (R.opts.iframe) {
                    var s = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-top")),
                        i = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-left"));
                    r += R.$iframe.offset().left - R.helpers.scrollLeft() + i, o += R.$iframe.offset().top - R.helpers.scrollTop() + s
                }
                l.find("th, td").each(function () {
                    var e = x(this);
                    return e.offset().left <= n && n < e.offset().left + e.outerWidth() / 2 ? (a = parseInt(f.find("a").css("width"), 10), f.css("top", o + e.offset().top - R.$box.offset().top - a - 5), f.css("left", r + e.offset().left - R.$box.offset().left - a / 2), f.data("selected-cell", e), f.data("position", "before"), f.addClass("fr-visible"), !1) : e.offset().left + e.outerWidth() / 2 <= n && n < e.offset().left + e.outerWidth() ? (a = parseInt(f.find("a").css("width"), 10), f.css("top", o + e.offset().top - R.$box.offset().top - a - 5), f.css("left", r + e.offset().left - R.$box.offset().left + e.outerWidth() - a / 2), f.data("selected-cell", e), f.data("position", "after"), f.addClass("fr-visible"), !1) : void 0
                })
            }

            function H(e, t) {
                if (R.$box.find(".fr-line-breaker").isVisible()) return !1;
                f || q(), R.$box.append(f), f.data("instance", R);
                var a, l = x(t), n = e.pageY, r = 0, o = 0;
                if (R.opts.iframe) {
                    var s = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-top")),
                        i = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-left"));
                    r += R.$iframe.offset().left - R.helpers.scrollLeft() + i, o += R.$iframe.offset().top - R.helpers.scrollTop() + s
                }
                l.find("tr").each(function () {
                    var e = x(this);
                    return e.offset().top <= n && n < e.offset().top + e.outerHeight() / 2 ? (a = parseInt(f.find("a").css("width"), 10), f.css("top", o + e.offset().top - R.$box.offset().top - a / 2), f.css("left", r + e.offset().left - R.$box.offset().left - a - 5), f.data("selected-cell", e.find("td").first()), f.data("position", "above"), f.addClass("fr-visible"), !1) : e.offset().top + e.outerHeight() / 2 <= n && n < e.offset().top + e.outerHeight() ? (a = parseInt(f.find("a").css("width"), 10), f.css("top", o + e.offset().top - R.$box.offset().top + e.outerHeight() - a / 2), f.css("left", r + e.offset().left - R.$box.offset().left - a - 5), f.data("selected-cell", e.find("td").first()), f.data("position", "below"), f.addClass("fr-visible"), !1) : void 0
                })
            }

            function V(e) {
                o = null;
                var t = R.doc.elementFromPoint(e.pageX - R.win.pageXOffset, e.pageY - R.win.pageYOffset);
                R.opts.tableResizer && (!R.popups.areVisible() || R.popups.areVisible() && R.popups.isVisible("table.edit")) && L(e, t), !R.opts.tableInsertHelper || R.popups.areVisible() || R.$tb.hasClass("fr-inline") && R.$tb.isVisible() || function r(e, t) {
                    if (0 === Z().length) {
                        var a, l, n;
                        if (t && ("HTML" == t.tagName || "BODY" == t.tagName || R.node.isElement(t))) for (a = 1; a <= R.opts.tableInsertHelperOffset; a++) {
                            if (l = R.doc.elementFromPoint(e.pageX - R.win.pageXOffset, e.pageY - R.win.pageYOffset + a), x(l).hasClass("fr-tooltip")) return !0;
                            if (l && ("TH" == l.tagName || "TD" == l.tagName || "TABLE" == l.tagName) && (x(l).parents(".fr-wrapper").length || R.opts.iframe) && "false" != x(l).closest("table").attr("contenteditable")) return F(e, x(l).closest("table")), !0;
                            if (n = R.doc.elementFromPoint(e.pageX - R.win.pageXOffset + a, e.pageY - R.win.pageYOffset), x(n).hasClass("fr-tooltip")) return !0;
                            if (n && ("TH" == n.tagName || "TD" == n.tagName || "TABLE" == n.tagName) && (x(n).parents(".fr-wrapper").length || R.opts.iframe) && "false" != x(n).closest("table").attr("contenteditable")) return H(e, x(n).closest("table")), !0
                        }
                        R.core.sameInstance(f) && W()
                    }
                }(e, t)
            }

            function P() {
                if (A) {
                    var e = O.data("table").offset().top - R.win.pageYOffset;
                    if (R.opts.iframe) {
                        var t = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-top"));
                        e += R.$iframe.offset().top - R.helpers.scrollTop() + t
                    }
                    O.css("top", e)
                }
            }

            function j(e, t) {
                var a, l = x(t[0][e]).outerWidth();
                for (a = 1; a < t.length; a++) l = Math.min(l, x(t[a][e]).outerWidth());
                return l
            }

            function X(e, t, a) {
                var l, n = 0;
                for (l = e; l <= t; l++) n += j(l, a);
                return n
            }

            function G(e) {
                if (1 < Z().length && r && y(), !1 === r && !1 === n && !1 === A) o && clearTimeout(o), R.edit.isDisabled() && !R.popups.isVisible("table.edit") || (o = setTimeout(V, 30, e)); else if (A) {
                    var t = e.pageX - R.win.pageXOffset;
                    R.opts.iframe && (t += R.$iframe.offset().left);
                    var a = O.data("max-left"), l = O.data("max-right");
                    a <= t && t <= l ? O.css("left", t - R.opts.tableResizerOffset - R.$wp.offset().left) : t < a && parseFloat(O.css("left"), 10) > a - R.opts.tableResizerOffset ? O.css("left", a - R.opts.tableResizerOffset - R.$wp.offset().left) : l < t && parseFloat(O.css("left"), 10) < l - R.opts.tableResizerOffset && O.css("left", l - R.opts.tableResizerOffset - R.$wp.offset().left)
                } else r && W()
            }

            function U(e) {
                R.node.isEmpty(e.get(0)) ? e.prepend(me.MARKERS) : e.prepend(me.START_MARKER).append(me.END_MARKER)
            }

            function q() {
                R.shared.$ti_helper || (R.shared.$ti_helper = x(document.createElement("div")).attr("class", "fr-insert-helper").html('<a class="fr-floating-btn" role="button" tabIndex="-1" title="'.concat(R.language.translate("Insert"), '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a>')), R.events.bindClick(R.shared.$ti_helper, "a", function () {
                    var e = f.data("selected-cell"), t = f.data("position"), a = f.data("instance") || R;
                    "before" == t ? (R.undo.saveStep(), e.addClass("fr-selected-cell"), a.table.insertColumn(t), e.removeClass("fr-selected-cell"), R.undo.saveStep()) : "after" == t ? (R.undo.saveStep(), e.addClass("fr-selected-cell"), a.table.insertColumn(t), e.removeClass("fr-selected-cell"), R.undo.saveStep()) : "above" == t ? (R.undo.saveStep(), e.addClass("fr-selected-cell"), a.table.insertRow(t), e.removeClass("fr-selected-cell"), R.undo.saveStep()) : "below" == t && (R.undo.saveStep(), e.addClass("fr-selected-cell"), a.table.insertRow(t), e.removeClass("fr-selected-cell"), R.undo.saveStep()), W()
                }), R.events.on("shared.destroy", function () {
                    R.shared.$ti_helper.html("").removeData().remove(), R.shared.$ti_helper = null
                }, !0), R.events.$on(R.shared.$ti_helper, "mousemove", function (e) {
                    e.stopPropagation()
                }, !0), R.events.$on(x(R.o_win), "scroll", function () {
                    W()
                }, !0), R.events.$on(R.$wp, "scroll", function () {
                    W()
                }, !0)), f = R.shared.$ti_helper, R.events.on("destroy", function () {
                    f = null
                }), R.tooltip.bind(R.$box, ".fr-insert-helper > a.fr-floating-btn")
            }

            function J() {
                l = null, clearTimeout(o)
            }

            function Z() {
                return R.el.querySelectorAll(".fr-selected-cell")
            }

            function Q() {
                var e = Z();
                if (e.length) {
                    for (var t = e[0]; t && "TABLE" != t.tagName && t.parentNode != R.el;) t = t.parentNode;
                    return t && "TABLE" == t.tagName ? x(t) : x([])
                }
                return x([])
            }

            function ee(e) {
                n = !1
            }

            return {
                _init: function te() {
                    if (!R.$wp) return !1;
                    if (!R.helpers.isMobile()) {
                        A = n = r = !1, R.events.$on(R.$el, "mousedown", e), R.popups.onShow("image.edit", function () {
                            E(), n = r = !1
                        }), R.popups.onShow("link.edit", function () {
                            E(), n = r = !1
                        }), R.events.on("commands.mousedown", function (e) {
                            0 < e.parents(".fr-toolbar").length && E()
                        }), R.events.$on(R.$el, "mouseover", "th, td", K), R.events.$on(R.$win, "mouseup", a), R.opts.iframe && R.events.$on(x(R.o_win), "mouseup", a), R.events.$on(R.$win, "mousemove", G), R.events.$on(x(R.o_win), "scroll", P), R.events.on("contentChanged", function () {
                            0 < Z().length && (h(), R.$el.find("img").on("load.selected-cells", function () {
                                x(this).off("load.selected-cells"), 0 < Z().length && h()
                            }))
                        }), R.events.$on(x(R.o_win), "resize", function () {
                            E()
                        }), R.events.on("toolbar.esc", function () {
                            if (0 < Z().length) return R.events.disableBlur(), R.events.focus(), !1
                        }, !0), R.events.$on(x(R.o_win), "keydown", function () {
                            r && n && (n = r = !1, R.$el.removeClass("fr-no-selection"), R.edit.on(), R.selection.setAtEnd(R.$el.find(".fr-selected-cell").last().get(0)), R.selection.restore(), E())
                        }), R.events.$on(R.$el, "keydown", function (e) {
                            e.shiftKey ? !1 === function o(e) {
                                var t = Z();
                                if (null != t && 0 < t.length) {
                                    var a, l = _(), n = e.which,
                                        r = $(1 == t.length ? a = t[0] : (a = R.el.querySelector(".fr-cell-fixed"), R.el.querySelector(".fr-cell-handler")), l);
                                    if (me.KEYCODE.ARROW_RIGHT == n) {
                                        if (r.col < l[0].length - 1) return I(a, l[r.row][r.col + 1]), !1
                                    } else if (me.KEYCODE.ARROW_DOWN == n) {
                                        if (r.row < l.length - 1) return I(a, l[r.row + 1][r.col]), !1
                                    } else if (me.KEYCODE.ARROW_LEFT == n) {
                                        if (0 < r.col) return I(a, l[r.row][r.col - 1]), !1
                                    } else if (me.KEYCODE.ARROW_UP == n && 0 < r.row) return I(a, l[r.row - 1][r.col]), !1
                                }
                            }(e) && setTimeout(function () {
                                h()
                            }, 0) : function s(e) {
                                var t = e.which, a = R.selection.blocks();
                                if (a.length && ("TD" == (a = a[0]).tagName || "TH" == a.tagName)) {
                                    for (var l = a; l && "TABLE" != l.tagName && l.parentNode != R.el;) l = l.parentNode;
                                    if (l && "TABLE" == l.tagName && (me.KEYCODE.ARROW_LEFT == t || me.KEYCODE.ARROW_UP == t || me.KEYCODE.ARROW_RIGHT == t || me.KEYCODE.ARROW_DOWN == t) && (0 < Z().length && T(), R.browser.webkit && (me.KEYCODE.ARROW_UP == t || me.KEYCODE.ARROW_DOWN == t))) {
                                        var n = R.selection.ranges(0).startContainer;
                                        if (n.nodeType == Node.TEXT_NODE && (me.KEYCODE.ARROW_UP == t && (n.previousSibling && "BR" !== n.previousSibling.tagName || n.previousSibling && "BR" === n.previousSibling.tagName && n.previousSibling.previousSibling) || me.KEYCODE.ARROW_DOWN == t && (n.nextSibling && "BR" !== n.nextSibling.tagName || n.nextSibling && "BR" === n.nextSibling.tagName && n.nextSibling.nextSibling))) return;
                                        e.preventDefault(), e.stopPropagation();
                                        var r = _(x(l)), o = $(a, r);
                                        return me.KEYCODE.ARROW_UP == t ? z(o, l, r) : me.KEYCODE.ARROW_DOWN == t && k(o, l, r), R.selection.restore(), !1
                                    }
                                }
                            }(e)
                        }), R.events.on("keydown", function (e) {
                            if (!1 === function l(e) {
                                if (e.which == me.KEYCODE.TAB) {
                                    var t;
                                    if (0 < Z().length) t = R.$el.find(".fr-selected-cell").last(); else {
                                        var a = R.selection.element();
                                        "TD" == a.tagName || "TH" == a.tagName ? t = x(a) : a != R.el && (0 < x(a).parentsUntil(R.$el, "td").length ? t = x(a).parents("td").first() : 0 < x(a).parentsUntil(R.$el, "th").length && (t = x(a).parents("th").first()))
                                    }
                                    if (t) return e.preventDefault(), !!(0 === R.selection.get().focusOffset && 0 < x(R.selection.element()).parentsUntil(R.$el, "ol, ul").length && (0 < x(R.selection.element()).closest("li").prev().length || x(R.selection.element()).is("li") && 0 < x(R.selection.element()).prev().length)) || (T(), e.shiftKey ? 0 < t.prev().length ? U(t.prev()) : 0 < t.closest("tr").length && 0 < t.closest("tr").prev().length ? U(t.closest("tr").prev().find("td").last()) : 0 < t.closest("tbody").length && 0 < t.closest("table").find("thead tr").length && U(t.closest("table").find("thead tr th").last()) : 0 < t.next().length ? U(t.next()) : 0 < t.closest("tr").length && 0 < t.closest("tr").next().length ? U(t.closest("tr").next().find("td").first()) : 0 < t.closest("thead").length && 0 < t.closest("table").find("tbody tr").length ? U(t.closest("table").find("tbody tr td").first()) : (t.addClass("fr-selected-cell"), b("below"), E(), U(t.closest("tr").next().find("td").first())), R.selection.restore(), !1)
                                }
                            }(e)) return !1;
                            var t = Z();
                            if (0 < t.length) {
                                if (0 < t.length && R.keys.ctrlKey(e) && e.which == me.KEYCODE.A) return E(), R.popups.isVisible("table.edit") && R.popups.hide("table.edit"), t = [], !0;
                                if (e.which == me.KEYCODE.ESC && R.popups.isVisible("table.edit")) return E(), R.popups.hide("table.edit"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !(t = []);
                                if (1 < t.length && (e.which == me.KEYCODE.BACKSPACE || e.which == me.KEYCODE.DELETE)) {
                                    R.undo.saveStep();
                                    for (var a = 0; a < t.length; a++) x(t[a]).html("<br>"), a == t.length - 1 && x(t[a]).prepend(me.MARKERS);
                                    return R.selection.restore(), R.undo.saveStep(), !(t = [])
                                }
                                if (1 < t.length && e.which != me.KEYCODE.F10 && !R.keys.isBrowserAction(e)) return e.preventDefault(), !(t = [])
                            } else if (!(t = []) === function n(e) {
                                if (e.altKey && e.which == me.KEYCODE.SPACE) {
                                    var t, a = R.selection.element();
                                    if ("TD" == a.tagName || "TH" == a.tagName ? t = a : 0 < x(a).closest("td").length ? t = x(a).closest("td").get(0) : 0 < x(a).closest("th").length && (t = x(a).closest("th").get(0)), t) return e.preventDefault(), I(t, t), h(), !1
                                }
                            }(e)) return !1
                        }, !0);
                        var t = [];
                        R.events.on("html.beforeGet", function () {
                            t = Z();
                            for (var e = 0; e < t.length; e++) t[e].className = (t[e].className || "").replace(/fr-selected-cell/g, "")
                        }), R.events.on("html.afterGet", function () {
                            for (var e = 0; e < t.length; e++) t[e].className = (t[e].className ? t[e].className.trim() + " " : "") + "fr-selected-cell";
                            t = []
                        }), c(!0), p(!0)
                    }
                    R.events.on("destroy", J)
                }, insert: function ae(e, t) {
                    var a, l,
                        n = "<table " + (R.opts.tableDefaultWidth ? 'style="width: ' + R.opts.tableDefaultWidth + ';" ' : "") + 'class="fr-inserted-table"><tbody>',
                        r = 100 / t;
                    for (a = 0; a < e; a++) {
                        for (n += "<tr>", l = 0; l < t; l++) n += "<td" + (R.opts.tableDefaultWidth ? ' style="width: ' + r.toFixed(4) + '%;"' : "") + ">", 0 === a && 0 === l && (n += me.MARKERS), n += "<br></td>";
                        n += "</tr>"
                    }
                    n += "</tbody></table>", R.html.insert(n), R.selection.restore();
                    var o = R.$el.find(".fr-inserted-table");
                    o.removeClass("fr-inserted-table"), R.events.trigger("table.inserted", [o.get(0)])
                }, remove: u, insertRow: b, deleteRow: function le() {
                    var e = Q();
                    if (0 < e.length) {
                        var t, a, l, n = _(), r = M(n);
                        if (null == r) return;
                        if (0 === r.min_i && r.max_i == n.length - 1) u(); else {
                            for (t = r.max_i; t >= r.min_i; t--) {
                                for (l = x(e.find("tr").not(e.find("> table tr")).get(t)), a = 0; a < n[t].length; a++) if (0 === a || n[t][a] != n[t][a - 1]) {
                                    var o = x(n[t][a]);
                                    if (1 < parseInt(o.attr("rowspan"), 10)) {
                                        var s = parseInt(o.attr("rowspan"), 10) - 1;
                                        1 == s ? o.removeAttr("rowspan") : o.attr("rowspan", s)
                                    }
                                    if (t < n.length - 1 && n[t][a] == n[t + 1][a] && (0 === t || n[t][a] != n[t - 1][a])) {
                                        for (var i = n[t][a], f = a; 0 < f && n[t][f] == n[t][f - 1];) f--;
                                        0 === f ? x(e.find("tr").not(e.find("> table tr")).get(t + 1)).prepend(i) : x(n[t + 1][f - 1])[0].parentNode && x(n[t + 1][f - 1])[0].insertAdjacentElement("afterend", i)
                                    }
                                }
                                var c = l.parent();
                                l.remove(), 0 === c.find("tr").length && c.remove(), n = _(e)
                            }
                            w(0, n.length - 1, 0, n[0].length - 1, e), 0 < r.min_i ? R.selection.setAtEnd(n[r.min_i - 1][0]) : R.selection.setAtEnd(n[0][0]), R.selection.restore(), R.popups.hide("table.edit")
                        }
                    }
                }, insertColumn: function ne(i) {
                    var e = Q();
                    if (0 < e.length) {
                        var f, c = _(), t = M(c);
                        f = "before" == i ? t.min_j : t.max_j;
                        var a, d = 100 / c[0].length, p = 100 / (c[0].length + 1);
                        e.find("th, td").each(function () {
                            (a = x(this)).data("old-width", a.outerWidth() / e.outerWidth() * 100)
                        }), e.find("tr").not(e.find("> table tr")).each(function (e) {
                            for (var t, a = x(this), l = 0, n = 0; l - 1 < f;) {
                                if (!(t = a.find("> th, > td").get(n))) {
                                    t = null;
                                    break
                                }
                                t == c[e][l] ? (l += parseInt(x(t).attr("colspan"), 10) || 1, n++) : (l += parseInt(x(c[e][l]).attr("colspan"), 10) || 1, "after" == i && (t = 0 === n ? -1 : a.find("> th, > td").get(n - 1)))
                            }
                            var r, o = x(t);
                            if ("after" == i && f < l - 1 || "before" == i && 0 < f && c[e][f] == c[e][f - 1]) {
                                if (0 === e || 0 < e && c[e][f] != c[e - 1][f]) {
                                    var s = parseInt(o.attr("colspan"), 10) + 1;
                                    o.attr("colspan", s), o.css("width", (o.data("old-width") * p / d + p).toFixed(4) + "%"), o.removeData("old-width")
                                }
                            } else r = 0 < a.find("th").length ? '<th style="width: '.concat(p.toFixed(4), '%;"><br></th>') : '<td style="width: '.concat(p.toFixed(4), '%;"><br></td>'), -1 == t ? a.prepend(r) : null == t ? a.append(r) : "before" == i ? o.before(r) : "after" == i && o[0].parentNode && o[0].insertAdjacentHTML("afterend", r)
                        }), e.find("th, td").each(function () {
                            (a = x(this)).data("old-width") && (a.css("width", (a.data("old-width") * p / d).toFixed(4) + "%"), a.removeData("old-width"))
                        }), R.popups.isVisible("table.edit") && h()
                    }
                }, deleteColumn: function re() {
                    var e = Q();
                    if (0 < e.length) {
                        var t, a, l, n = _(), r = M(n);
                        if (null == r) return;
                        if (0 === r.min_j && r.max_j == n[0].length - 1) u(); else {
                            var o = 0;
                            for (t = 0; t < n.length; t++) for (a = 0; a < n[0].length; a++) (l = x(n[t][a])).hasClass("fr-selected-cell") || (l.data("old-width", l.outerWidth() / e.outerWidth() * 100), (a < r.min_j || a > r.max_j) && (o += l.outerWidth() / e.outerWidth() * 100));
                            for (o /= n.length, a = r.max_j; a >= r.min_j; a--) for (t = 0; t < n.length; t++) if (0 === t || n[t][a] != n[t - 1][a]) if (l = x(n[t][a]), 1 < (parseInt(l.attr("colspan"), 10) || 1)) {
                                var s = parseInt(l.attr("colspan"), 10) - 1;
                                1 == s ? l.removeAttr("colspan") : l.attr("colspan", s), l.css("width", (100 * (l.data("old-width") - j(a, n)) / o).toFixed(4) + "%"), l.removeData("old-width")
                            } else {
                                var i = x(l.parent().get(0));
                                l.remove(), 0 === i.find("> th, > td").length && (0 === i.prev().length || 0 === i.next().length || i.prev().find("> th[rowspan], > td[rowspan]").length < i.prev().find("> th, > td").length) && i.remove()
                            }
                            w(0, n.length - 1, 0, n[0].length - 1, e), 0 < r.min_j ? R.selection.setAtEnd(n[r.min_i][r.min_j - 1]) : R.selection.setAtEnd(n[r.min_i][0]), R.selection.restore(), R.popups.hide("table.edit"), e.find("th, td").each(function () {
                                (l = x(this)).data("old-width") && (l.css("width", (100 * l.data("old-width") / o).toFixed(4) + "%"), l.removeData("old-width"))
                            })
                        }
                    }
                }, mergeCells: function oe() {
                    if (1 < Z().length && (0 === R.$el.find("th.fr-selected-cell").length || 0 === R.$el.find("td.fr-selected-cell").length)) {
                        C();
                        var e, t, a = M(_());
                        if (null == a) return;
                        var l = R.$el.find(".fr-selected-cell"), n = x(l[0]), r = n.parent().find(".fr-selected-cell"),
                            o = n.closest("table"), s = n.html(), i = 0;
                        for (e = 0; e < r.length; e++) i += x(r[e]).outerWidth();
                        for (n.css("width", Math.min(100, i / o.outerWidth() * 100).toFixed(4) + "%"), a.min_j < a.max_j && n.attr("colspan", a.max_j - a.min_j + 1), a.min_i < a.max_i && n.attr("rowspan", a.max_i - a.min_i + 1), e = 1; e < l.length; e++) "<br>" != (t = x(l[e])).html() && "" !== t.html() && (s += "<br>".concat(t.html())), t.remove();
                        n.html(s), R.selection.setAtEnd(n.get(0)), R.selection.restore(), R.toolbar.enable(), m(a.min_i, a.max_i, o);
                        var f = o.find("tr:empty");
                        for (e = f.length - 1; 0 <= e; e--) x(f[e]).remove();
                        g(a.min_j, a.max_j, o), h()
                    }
                }, splitCellVertically: function se() {
                    if (1 == Z().length) {
                        var e = R.$el.find(".fr-selected-cell"), t = parseInt(e.attr("colspan"), 10) || 1,
                            a = e.parent().outerWidth(), l = e.outerWidth(), n = e.clone().html("<br>"), r = _(),
                            o = $(e.get(0), r);
                        if (1 < t) {
                            var s = Math.ceil(t / 2);
                            l = X(o.col, o.col + s - 1, r) / a * 100;
                            var i = X(o.col + s, o.col + t - 1, r) / a * 100;
                            1 < s ? e.attr("colspan", s) : e.removeAttr("colspan"), 1 < t - s ? n.attr("colspan", t - s) : n.removeAttr("colspan"), e.css("width", l.toFixed(4) + "%"), n.css("width", i.toFixed(4) + "%")
                        } else {
                            var f;
                            for (f = 0; f < r.length; f++) if (0 === f || r[f][o.col] != r[f - 1][o.col]) {
                                var c = x(r[f][o.col]);
                                if (!c.is(e)) {
                                    var d = (parseInt(c.attr("colspan"), 10) || 1) + 1;
                                    c.attr("colspan", d)
                                }
                            }
                            l = l / a * 100 / 2, e.css("width", "".concat(l.toFixed(4), "%")), n.css("width", "".concat(l.toFixed(4), "%"))
                        }
                        e[0].parentNode && e[0].insertAdjacentElement("afterend", n[0]), E(), R.popups.hide("table.edit")
                    }
                }, splitCellHorizontally: function ie() {
                    if (1 == Z().length) {
                        var e = R.$el.find(".fr-selected-cell"), t = e.parent(), a = e.closest("table"),
                            l = parseInt(e.attr("rowspan"), 10), n = _(), r = $(e.get(0), n),
                            o = e.clone().html("<br>");
                        if (1 < l) {
                            var s = Math.ceil(l / 2);
                            1 < s ? e.attr("rowspan", s) : e.removeAttr("rowspan"), 1 < l - s ? o.attr("rowspan", l - s) : o.removeAttr("rowspan");
                            for (var i = r.row + s, f = 0 === r.col ? r.col : r.col - 1; 0 <= f && (n[i][f] == n[i][f - 1] || 0 < i && n[i][f] == n[i - 1][f]);) f--;
                            -1 == f ? x(a.find("tr").not(a.find("> table tr")).get(i)).prepend(o) : x(n[i][f])[0].parentNode && x(n[i][f])[0].insertAdjacentElement("afterend", o[0])
                        } else {
                            var c, d = x(document.createElement("tr")).append(o);
                            for (c = 0; c < n[0].length; c++) if (0 === c || n[r.row][c] != n[r.row][c - 1]) {
                                var p = x(n[r.row][c]);
                                p.is(e) || p.attr("rowspan", (parseInt(p.attr("rowspan"), 10) || 1) + 1)
                            }
                            t[0].parentNode && t[0].insertAdjacentElement("afterend", d[0])
                        }
                        E(), R.popups.hide("table.edit")
                    }
                }, addHeader: function fe() {
                    var e = Q();
                    if (0 < e.length && 0 === e.find("th").length) {
                        var t, a = "<thead><tr>", l = 0;
                        for (e.find("tr").first().find("> td").each(function () {
                            var e = x(this);
                            l += parseInt(e.attr("colspan"), 10) || 1
                        }), t = 0; t < l; t++) a += "<th><br></th>";
                        a += "</tr></thead>", e.prepend(a), h()
                    }
                }, removeHeader: function ce() {
                    var e = Q(), t = e.find("thead");
                    if (0 < t.length) if (0 === e.find("tbody tr").length) u(); else if (t.remove(), 0 < Z().length) h(); else {
                        R.popups.hide("table.edit");
                        var a = e.find("tbody tr").first().find("td").first().get(0);
                        a && (R.selection.setAtEnd(a), R.selection.restore())
                    }
                }, setBackground: t, showInsertPopup: function de() {
                    var e = R.$tb.find('.fr-command[data-cmd="insertTable"]'), t = R.popups.get("table.insert");
                    if (t || (t = c()), !t.hasClass("fr-active")) {
                        R.popups.refresh("table.insert"), R.popups.setContainer("table.insert", R.$tb);
                        var a = R.button.getPosition(e), l = a.left, n = a.top;
                        R.popups.show("table.insert", l, n, e.outerHeight())
                    }
                }, showEditPopup: h, showColorsPopup: s, back: function pe() {
                    0 < Z().length ? h() : (R.popups.hide("table.insert"), R.toolbar.showInline())
                }, verticalAlign: function he(e) {
                    R.$el.find(".fr-selected-cell").css("vertical-align", e)
                }, horizontalAlign: function ue(e) {
                    R.$el.find(".fr-selected-cell").css("text-align", e)
                }, applyStyle: function be(e, t, a, l) {
                    if (0 < t.length) {
                        if (!a) {
                            var n = Object.keys(l);
                            n.splice(n.indexOf(e), 1), t.removeClass(n.join(" "))
                        }
                        t.toggleClass(e)
                    }
                }, selectedTable: Q, selectedCells: Z, customColor: function ge() {
                    var e = R.popups.get("table.colors").find(".fr-table-colors-hex-layer input");
                    e.length && t(e.val())
                }, selectCells: I
            }
        }, me.DefineIcon("insertTable", {
            NAME: "table",
            SVG_KEY: "insertTable"
        }), me.RegisterCommand("insertTable", {
            title: "Insert Table",
            undo: !1,
            focus: !0,
            refreshOnCallback: !1,
            popup: !0,
            callback: function () {
                this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup()
            },
            plugin: "table"
        }), me.RegisterCommand("tableInsert", {
            callback: function (e, t, a) {
                this.table.insert(t, a), this.popups.hide("table.insert")
            }
        }), me.DefineIcon("tableHeader", {
            NAME: "header",
            FA5NAME: "heading",
            SVG_KEY: "tableHeader"
        }), me.RegisterCommand("tableHeader", {
            title: "Table Header", focus: !1, toggle: !0, callback: function () {
                this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader()
            }, refresh: function (e) {
                var t = this.table.selectedTable();
                0 < t.length && (0 === t.find("th").length ? e.removeClass("fr-active").attr("aria-pressed", !1) : e.addClass("fr-active").attr("aria-pressed", !0))
            }
        }), me.DefineIcon("tableRows", {
            NAME: "bars",
            SVG_KEY: "row"
        }), me.RegisterCommand("tableRows", {
            type: "dropdown",
            focus: !1,
            title: "Row",
            options: {above: "Insert row above", below: "Insert row below", "delete": "Delete row"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = me.COMMANDS.tableRows.options;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + a + '" title="' + this.language.translate(t[a]) + '">' + this.language.translate(t[a]) + "</a></li>");
                return e += "</ul>"
            },
            callback: function (e, t) {
                "above" == t || "below" == t ? this.table.insertRow(t) : this.table.deleteRow()
            }
        }), me.DefineIcon("tableColumns", {
            NAME: "bars fa-rotate-90",
            SVG_KEY: "columns"
        }), me.RegisterCommand("tableColumns", {
            type: "dropdown",
            focus: !1,
            title: "Column",
            options: {before: "Insert column before", after: "Insert column after", "delete": "Delete column"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = me.COMMANDS.tableColumns.options;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.language.translate(t[a]), "</a></li>"));
                return e += "</ul>"
            },
            callback: function (e, t) {
                "before" == t || "after" == t ? this.table.insertColumn(t) : this.table.deleteColumn()
            }
        }), me.DefineIcon("tableCells", {
            NAME: "square-o",
            FA5NAME: "square",
            SVG_KEY: "cellOptions"
        }), me.RegisterCommand("tableCells", {
            type: "dropdown",
            focus: !1,
            title: "Cell",
            options: {merge: "Merge cells", "vertical-split": "Vertical split", "horizontal-split": "Horizontal split"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = me.COMMANDS.tableCells.options;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.language.translate(t[a]), "</a></li>"));
                return e += "</ul>"
            },
            callback: function (e, t) {
                "merge" == t ? this.table.mergeCells() : "vertical-split" == t ? this.table.splitCellVertically() : this.table.splitCellHorizontally()
            },
            refreshOnShow: function (e, t) {
                1 < this.$el.find(".fr-selected-cell").length ? (t.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (t.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1))
            }
        }), me.DefineIcon("tableRemove", {
            NAME: "trash",
            SVG_KEY: "removeTable"
        }), me.RegisterCommand("tableRemove", {
            title: "Remove Table", focus: !1, callback: function () {
                this.table.remove()
            }
        }), me.DefineIcon("tableStyle", {
            NAME: "paint-brush",
            SVG_KEY: "tableStyle"
        }), me.RegisterCommand("tableStyle", {
            title: "Table Style", type: "dropdown", focus: !1, html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.tableStyles;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.language.translate(t[a]), "</a></li>"));
                return e += "</ul>"
            }, callback: function (e, t) {
                this.table.applyStyle(t, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles)
            }, refreshOnShow: function (e, t) {
                var a = this.$, l = this.$el.find(".fr-selected-cell").closest("table");
                l && t.find(".fr-command").each(function () {
                    var e = a(this).data("param1"), t = l.hasClass(e);
                    a(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        }), me.DefineIcon("tableCellBackground", {
            NAME: "tint",
            SVG_KEY: "cellBackground"
        }), me.RegisterCommand("tableCellBackground", {
            title: "Cell Background",
            focus: !1,
            popup: !0,
            callback: function () {
                this.table.showColorsPopup()
            }
        }), me.RegisterCommand("tableCellBackgroundColor", {
            undo: !0, focus: !1, callback: function (e, t) {
                this.table.setBackground(t)
            }
        }), me.DefineIcon("tableBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), me.RegisterCommand("tableBack", {
            title: "Back", undo: !1, focus: !1, back: !0, callback: function () {
                this.table.back()
            }, refresh: function (e) {
                0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
            }
        }), me.DefineIcon("tableCellVerticalAlign", {
            NAME: "arrows-v",
            FA5NAME: "arrows-alt-v",
            SVG_KEY: "verticalAlignMiddle"
        }), me.RegisterCommand("tableCellVerticalAlign", {
            type: "dropdown",
            focus: !1,
            title: "Vertical Align",
            options: {Top: "Align Top", Middle: "Align Middle", Bottom: "Align Bottom"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = me.COMMANDS.tableCellVerticalAlign.options;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="'.concat(a.toLowerCase(), '" title="').concat(this.language.translate(t[a]), '">').concat(this.language.translate(a), "</a></li>"));
                return e += "</ul>"
            },
            callback: function (e, t) {
                this.table.verticalAlign(t)
            },
            refreshOnShow: function (e, t) {
                t.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0)
            }
        }), me.DefineIcon("tableCellHorizontalAlign", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), me.DefineIcon("align-left", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), me.DefineIcon("align-right", {
            NAME: "align-right",
            SVG_KEY: "alignRight"
        }), me.DefineIcon("align-center", {
            NAME: "align-center",
            SVG_KEY: "alignCenter"
        }), me.DefineIcon("align-justify", {
            NAME: "align-justify",
            SVG_KEY: "alignJustify"
        }), me.RegisterCommand("tableCellHorizontalAlign", {
            type: "dropdown",
            focus: !1,
            title: "Horizontal Align",
            options: {left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = me.COMMANDS.tableCellHorizontalAlign.options;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.icon.create("align-".concat(a)), '<span class="fr-sr-only">').concat(this.language.translate(t[a]), "</span></a></li>"));
                return e += "</ul>"
            },
            callback: function (e, t) {
                this.table.horizontalAlign(t)
            },
            refresh: function (e) {
                var t = this.table.selectedCells(), a = this.$;
                t.length && e.find("> *").first().replaceWith(this.icon.create("align-".concat(this.helpers.getAlignment(a(t[0])))))
            },
            refreshOnShow: function (e, t) {
                t.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell").first()) + '"]').addClass("fr-active").attr("aria-selected", !0)
            }
        }), me.DefineIcon("tableCellStyle", {
            NAME: "magic",
            SVG_KEY: "cellStyle"
        }), me.RegisterCommand("tableCellStyle", {
            title: "Cell Style", type: "dropdown", focus: !1, html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.tableCellStyles;
                for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.language.translate(t[a]), "</a></li>"));
                return e += "</ul>"
            }, callback: function (e, t) {
                this.table.applyStyle(t, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
            }, refreshOnShow: function (e, t) {
                var a = this.$, l = this.$el.find(".fr-selected-cell").first();
                l && t.find(".fr-command").each(function () {
                    var e = a(this).data("param1"), t = l.hasClass(e);
                    a(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        }), me.RegisterCommand("tableCellBackgroundCustomColor", {
            title: "OK", undo: !0, callback: function () {
                this.table.customColor()
            }
        }), me.DefineIcon("tableColorRemove", {NAME: "eraser", SVG_KEY: "remove"})
    });

});

;/*!node_modules/froala-editor/js/plugins/url.min.js*/
amis.define('aaa4c7f', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (r) {
        "use strict";
        (r = r && r.hasOwnProperty("default") ? r["default"] : r).URLRegEx = "(^| |\\u00A0)(".concat(r.LinkRegEx, "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,}))$"), r.PLUGINS.url = function (a) {
            var i = a.$, l = null;

            function t(e, t, n) {
                for (var r = ""; n.length && "." == n[n.length - 1];) r += ".", n = n.substring(0, n.length - 1);
                var o = n;
                if (a.opts.linkConvertEmailAddress) a.helpers.isEmail(o) && !/^mailto:.*/i.test(o) && (o = "mailto:".concat(o)); else if (a.helpers.isEmail(o)) return t + n;
                return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(o) || (o = "//".concat(o)), (t || "") + "<a".concat(a.opts.linkAlwaysBlank ? ' target="_blank"' : "").concat(l ? ' rel="'.concat(l, '"') : "", ' data-fr-linked="true" href="').concat(o, '">').concat(n.replace(/&amp;/g, "&").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "</a>").concat(r)
            }

            var s = function s() {
                return new RegExp(r.URLRegEx, "gi")
            };

            function p(e) {
                return a.opts.linkAlwaysNoFollow && (l = "nofollow"), a.opts.linkAlwaysBlank && (a.opts.linkNoOpener && (l ? l += " noopener" : l = "noopener"), a.opts.linkNoReferrer && (l ? l += " noreferrer" : l = "noreferrer")), e.replace(s(), t)
            }

            function c(e) {
                var t = e.split(" ");
                return t[t.length - 1]
            }

            function n() {
                var e = a.selection.ranges(0), t = e.startContainer;
                if (!t || t.nodeType !== Node.TEXT_NODE || e.startOffset !== (t.textContent || "").length) return !1;
                if (function o(e) {
                    return !!e && ("A" === e.tagName || !(!e.parentNode || e.parentNode == a.el) && o(e.parentNode))
                }(t)) return !1;
                if (s().test(c(t.textContent))) {
                    i(t).before(p(t.textContent));
                    var n = i(t.parentNode).find("a[data-fr-linked]");
                    n.removeAttr("data-fr-linked"), t.parentNode.removeChild(t), a.events.trigger("url.linked", [n.get(0)])
                } else if (t.textContent.split(" ").length <= 2 && t.previousSibling && "A" === t.previousSibling.tagName) {
                    var r = t.previousSibling.innerText + t.textContent;
                    s().test(c(r)) && (i(t.previousSibling).replaceWith(p(r)), t.parentNode.removeChild(t))
                }
            }

            return {
                _init: function e() {
                    a.events.on("keypress", function (e) {
                        !a.selection.isCollapsed() || "." != e.key && ")" != e.key && "(" != e.key || n()
                    }, !0), a.events.on("keydown", function (e) {
                        var t = e.which;
                        !a.selection.isCollapsed() || t != r.KEYCODE.ENTER && t != r.KEYCODE.SPACE || n()
                    }, !0), a.events.on("paste.beforeCleanup", function (e) {
                        if (a.helpers.isURL(e)) {
                            var t = null;
                            return a.opts.linkAlwaysBlank && (a.opts.linkNoOpener && (t ? t += " noopener" : t = "noopener"), a.opts.linkNoReferrer && (t ? t += " noreferrer" : t = "noreferrer")), "<a".concat(a.opts.linkAlwaysBlank ? ' target="_blank"' : "").concat(t ? ' rel="'.concat(t, '"') : "", ' href="').concat(e, '" >').concat(e, "</a>")
                        }
                    })
                }
            }
        }
    });

});

;/*!node_modules/froala-editor/js/plugins/video.min.js*/
amis.define('4fd7922', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (me) {
        "use strict";
        me = me && me.hasOwnProperty("default") ? me["default"] : me, Object.assign(me.POPUP_TEMPLATES, {
            "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]",
            "video.edit": "[_BUTTONS_]",
            "video.size": "[_BUTTONS_][_SIZE_LAYER_]"
        }), Object.assign(me.DEFAULTS, {
            videoAllowedTypes: ["mp4", "webm", "ogg"],
            videoAllowedProviders: [".*"],
            videoDefaultAlign: "center",
            videoDefaultDisplay: "block",
            videoDefaultWidth: 600,
            videoEditButtons: ["videoReplace", "videoRemove", "videoDisplay", "videoAlign", "videoSize"],
            videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed", "videoUpload"],
            videoMaxSize: 52428800,
            videoMove: !0,
            videoResize: !0,
            videoResponsive: !1,
            videoSizeButtons: ["videoBack", "|"],
            videoSplitHTML: !1,
            videoTextNear: !0,
            videoUpload: !0,
            videoUploadMethod: "POST",
            videoUploadParam: "file",
            videoUploadParams: {},
            videoUploadToS3: !1,
            videoUploadURL: null
        }), me.VIDEO_PROVIDERS = [{
            test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,
            url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
            url_text: "https://www.youtube.com/embed/$1?$2",
            html: '<iframe width="640" height="360" src="{url}&wmode=opaque" frameborder="0" allowfullscreen></iframe>',
            provider: "youtube"
        }, {
            test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/,
            url_regex: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?(\/[a-zA-Z0-9_\-]+)?/i,
            url_text: "https://player.vimeo.com/video/$1",
            html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
            provider: "vimeo"
        }, {
            test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
            url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,
            url_text: "https://www.dailymotion.com/embed/video/$1",
            html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
            provider: "dailymotion"
        }, {
            test_regex: /^.+(screen.yahoo.com)\/[^_&]+/,
            url_regex: "",
            url_text: "",
            html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
            provider: "yahoo"
        }, {
            test_regex: /^.+(rutube.ru)\/[^_&]+/,
            url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
            url_text: "https://rutube.ru/play/embed/$1",
            html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
            provider: "rutube"
        }, {
            test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/,
            url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/g,
            url_text: "https://play.vidyard.com/$1",
            html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
            provider: "vidyard"
        }], me.VIDEO_EMBED_REGEX = /^\W*((<iframe(.|\n)*>(\s|\n)*<\/iframe>)|(<embed(.|\n)*>))\W*$/i, me.PLUGINS.video = function (c) {
            var s, f, v, p, i, o, u = c.$, d = "https://i.froala.com/upload", h = 2, g = 3, m = 4, l = 5, b = 6, r = {};

            function y() {
                var e = c.popups.get("video.insert");
                e.find(".fr-video-by-url-layer input").val("").trigger("change");
                var t = e.find(".fr-video-embed-layer textarea");
                t.val("").trigger("change"), (t = e.find(".fr-video-upload-layer input")).val("").trigger("change")
            }

            function n() {
                var e = c.popups.get("video.edit");
                if (e || (e = function r() {
                    var e = "";
                    if (0 < c.opts.videoEditButtons.length) {
                        c.opts.videoResponsive && (-1 < c.opts.videoEditButtons.indexOf("videoSize") && c.opts.videoEditButtons.splice(c.opts.videoEditButtons.indexOf("videoSize"), 1), -1 < c.opts.videoEditButtons.indexOf("videoDisplay") && c.opts.videoEditButtons.splice(c.opts.videoEditButtons.indexOf("videoDisplay"), 1), -1 < c.opts.videoEditButtons.indexOf("videoAlign") && c.opts.videoEditButtons.splice(c.opts.videoEditButtons.indexOf("videoAlign"), 1));
                        var t = {buttons: e += '<div class="fr-buttons"> \n      '.concat(c.button.buildList(c.opts.videoEditButtons), " \n      </div>")},
                            o = c.popups.create("video.edit", t);
                        return c.events.$on(c.$wp, "scroll.video-edit", function () {
                            p && c.popups.isVisible("video.edit") && (c.events.disableBlur(), R(p))
                        }), o
                    }
                    return !1
                }()), e) {
                    c.popups.setContainer("video.edit", c.$sc), c.popups.refresh("video.edit");
                    var t = p.find("iframe, embed, video"), o = t.offset().left + t.outerWidth() / 2,
                        i = t.offset().top + t.outerHeight();
                    c.popups.show("video.edit", o, i, t.outerHeight(), !0)
                }
            }

            function a(e) {
                if (e) return c.popups.onRefresh("video.insert", y), c.popups.onHide("video.insert", q), !0;
                var t = "";
                c.opts.videoUpload || -1 === c.opts.videoInsertButtons.indexOf("videoUpload") || c.opts.videoInsertButtons.splice(c.opts.videoInsertButtons.indexOf("videoUpload"), 1);
                var o = c.button.buildList(c.opts.videoInsertButtons);
                "" !== o && (t = '<div class="fr-buttons">' + o + "</div>");
                var i, r = "", n = c.opts.videoInsertButtons.indexOf("videoUpload"),
                    a = c.opts.videoInsertButtons.indexOf("videoByURL"),
                    s = c.opts.videoInsertButtons.indexOf("videoEmbed");
                0 <= a && (i = " fr-active", (n < a && 0 <= n || s < a && 0 <= s) && (i = ""), r = '<div class="fr-video-by-url-layer fr-layer'.concat(i, '" id="fr-video-by-url-layer-').concat(c.id, '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-').concat(c.id, '" type="text" placeholder="').concat(c.language.translate("Paste in a video URL"), '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">').concat(c.language.translate("Insert"), "</button></div></div>"));
                var d = "";
                0 <= s && (i = " fr-active", (n < s && 0 <= n || a < s && 0 <= a) && (i = ""), d = '<div class="fr-video-embed-layer fr-layer'.concat(i, '" id="fr-video-embed-layer-').concat(c.id, '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text').concat(c.id, '" type="text" placeholder="').concat(c.language.translate("Embedded Code"), '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">').concat(c.language.translate("Insert"), "</button></div></div>"));
                var l = "";
                0 <= n && (i = " fr-active", (s < n && 0 <= s || a < n && 0 <= a) && (i = ""), l = '<div class="fr-video-upload-layer fr-layer'.concat(i, '" id="fr-video-upload-layer-').concat(c.id, '"><strong>').concat(c.language.translate("Drop video"), "</strong><br>(").concat(c.language.translate("or click"), ')<div class="fr-form"><input type="file" accept="video/').concat(c.opts.videoAllowedTypes.join(", video/").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-').concat(c.id, '" role="button"></div></div>'));
                var f = {
                    buttons: t,
                    by_url_layer: r,
                    embed_layer: d,
                    upload_layer: l,
                    progress_bar: '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>'
                }, v = c.popups.create("video.insert", f);
                return function p(i) {
                    c.events.$on(i, "dragover dragenter", ".fr-video-upload-layer", function () {
                        return u(this).addClass("fr-drop"), !1
                    }, !0), c.events.$on(i, "dragleave dragend", ".fr-video-upload-layer", function () {
                        return u(this).removeClass("fr-drop"), !1
                    }, !0), c.events.$on(i, "drop", ".fr-video-upload-layer", function (e) {
                        e.preventDefault(), e.stopPropagation(), u(this).removeClass("fr-drop");
                        var t = e.originalEvent.dataTransfer;
                        if (t && t.files) {
                            var o = i.data("instance") || c;
                            o.events.disableBlur(), o.video.upload(t.files), o.events.enableBlur()
                        }
                    }, !0), c.helpers.isIOS() && c.events.$on(i, "touchstart", '.fr-video-upload-layer input[type="file"]', function () {
                        u(this).trigger("click")
                    }, !0);
                    c.events.$on(i, "change", '.fr-video-upload-layer input[type="file"]', function () {
                        if (this.files) {
                            var e = i.data("instance") || c;
                            e.events.disableBlur(), i.find("input:focus").blur(), e.events.enableBlur(), e.video.upload(this.files)
                        }
                        u(this).val("")
                    }, !0)
                }(v), v
            }

            function w(e) {
                c.events.focus(!0), c.selection.restore();
                var t = !1;
                p && (j(), t = !0), c.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-deletable">'.concat(e, "</span>"), !1, c.opts.videoSplitHTML), c.popups.hide("video.insert");
                var o = c.$el.find(".fr-jiv");
                o.removeClass("fr-jiv"), o.toggleClass("fr-rv", c.opts.videoResponsive), Z(o, c.opts.videoDefaultDisplay, c.opts.videoDefaultAlign), o.toggleClass("fr-draggable", c.opts.videoMove), c.events.trigger(t ? "video.replaced" : "video.inserted", [o])
            }

            function E() {
                var e = u(this);
                c.popups.hide("video.insert"), e.removeClass("fr-uploading"), e.parent().next().is("br") && e.parent().next().remove(), R(e.parent()), c.events.trigger("video.loaded", [e.parent()])
            }

            function C(s, e, l, f, v) {
                c.edit.off(), A("Loading video"), e && (s = c.helpers.sanitizeURL(s));
                var p = function p() {
                    var e, t;
                    if (f) {
                        c.undo.canDo() || f.find("video").hasClass("fr-uploading") || c.undo.saveStep();
                        var o = f.find("video").data("fr-old-src"), i = f.data("fr-replaced");
                        f.data("fr-replaced", !1), c.$wp ? ((e = f.clone(!0)).find("video").removeData("fr-old-src").removeClass("fr-uploading"), e.find("video").off("canplay"), o && f.find("video").attr("src", o), f.replaceWith(e)) : e = f;
                        for (var r = e.find("video").get(0).attributes, n = 0; n < r.length; n++) {
                            var a = r[n];
                            0 === a.nodeName.indexOf("data-") && e.find("video").removeAttr(a.nodeName)
                        }
                        if (void 0 !== l) for (t in l) l.hasOwnProperty(t) && "link" != t && e.find("video").attr("data-".concat(t), l[t]);
                        e.find("video").on("canplay", E), e.find("video").attr("src", s), c.edit.on(), z(), c.undo.saveStep(), c.$el.blur(), c.events.trigger(i ? "video.replaced" : "video.inserted", [e, v])
                    } else e = function d(e, t, o) {
                        var i, r = "";
                        if (t && void 0 !== t) for (i in t) t.hasOwnProperty(i) && "link" != i && (r += " data-".concat(i, '="').concat(t[i], '"'));
                        var n = c.opts.videoDefaultWidth;
                        n && "auto" != n && (n = "".concat(n, "px"));
                        var a = u(document.createElement("span")).attr("contenteditable", "false").attr("draggable", "true").attr("class", "fr-video fr-dv" + c.opts.videoDefaultDisplay[0] + ("center" != c.opts.videoDefaultAlign ? " fr-fv" + c.opts.videoDefaultAlign[0] : "")).html('<video src="' + e + '" ' + r + (n ? ' style="width: ' + n + ';" ' : "") + " controls>" + c.language.translate("Your browser does not support HTML5 video.") + "</video>");
                        a.toggleClass("fr-draggable", c.opts.videoMove), c.edit.on(), c.events.focus(!0), c.selection.restore(), c.undo.saveStep(), c.opts.videoSplitHTML ? c.markers.split() : c.markers.insert();
                        c.html.wrap();
                        var s = c.$el.find(".fr-marker");
                        c.node.isLastSibling(s) && s.parent().hasClass("fr-deletable") && s.insertAfter(s.parent());
                        s.replaceWith(a), c.selection.clear(), a.find("video").get(0).readyState > a.find("video").get(0).HAVE_FUTURE_DATA || c.helpers.isIOS() ? o.call(a.find("video").get(0)) : a.find("video").on("canplaythrough load", o);
                        return a
                    }(s, l, E), z(), c.undo.saveStep(), c.events.trigger("video.inserted", [e, v])
                };
                _("Loading video"), p()
            }

            function _(e) {
                var t = c.popups.get("video.insert");
                if (t || (t = a()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), p) {
                    var o = p.find("video");
                    c.popups.setContainer("video.insert", c.$sc);
                    var i = o.offset().left, r = o.offset().top + o.height();
                    c.popups.show("video.insert", i, r, o.outerHeight())
                }
                void 0 === e && A(c.language.translate("Uploading"), 0)
            }

            function S(e) {
                var t = c.popups.get("video.insert");
                if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || c.$el.find("video.fr-error").length)) {
                    if (c.events.focus(), c.$el.find("video.fr-error").length && (c.$el.find("video.fr-error").parent().remove(), c.undo.saveStep(), c.undo.run(), c.undo.dropRedo()), !c.$wp && p) {
                        var o = p;
                        M(!0), c.selection.setAfter(o.find("video").get(0)), c.selection.restore()
                    }
                    c.popups.hide("video.insert")
                }
            }

            function A(e, t) {
                var o = c.popups.get("video.insert");
                if (o) {
                    var i = o.find(".fr-video-progress-bar-layer");
                    i.find("h3").text(e + (t ? " ".concat(t, "%") : "")), i.removeClass("fr-error"), t ? (i.find("div").removeClass("fr-indeterminate"), i.find("div > span").css("width", "".concat(t, "%"))) : i.find("div").addClass("fr-indeterminate")
                }
            }

            function x(e) {
                _();
                var t = c.popups.get("video.insert").find(".fr-video-progress-bar-layer");
                t.addClass("fr-error");
                var o = t.find("h3");
                o.text(e), c.events.disableBlur(), o.focus()
            }

            function R(e) {
                t.call(e.get(0))
            }

            function D(e) {
                A("Loading video");
                var t = this.status, o = this.response, i = this.responseXML, r = this.responseText;
                try {
                    if (c.opts.videoUploadToS3) if (201 == t) {
                        var n = function s(e) {
                            try {
                                var t = u(e).find("Location").text(), o = u(e).find("Key").text();
                                return !1 === c.events.trigger("video.uploadedToS3", [t, o, e], !0) ? (c.edit.on(), !1) : t
                            } catch (i) {
                                return X(m, e), !1
                            }
                        }(i);
                        n && C(n, !1, [], e, o || i)
                    } else X(m, o || i); else if (200 <= t && t < 300) {
                        var a = function d(e) {
                            try {
                                if (!1 === c.events.trigger("video.uploaded", [e], !0)) return c.edit.on(), !1;
                                var t = JSON.parse(e);
                                return t.link ? t : (X(h, e), !1)
                            } catch (o) {
                                return X(m, e), !1
                            }
                        }(r);
                        a && C(a.link, !1, a, e, o || r)
                    } else X(g, o || r)
                } catch (l) {
                    X(m, o || r)
                }
            }

            function U() {
                X(m, this.response || this.responseText || this.responseXML)
            }

            function B(e) {
                if (e.lengthComputable) {
                    var t = e.loaded / e.total * 100 | 0;
                    A(c.language.translate("Uploading"), t)
                }
            }

            function $() {
                c.edit.on(), S(!0)
            }

            function I(e) {
                if (!c.core.sameInstance(v)) return !0;
                e.preventDefault(), e.stopPropagation();
                var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
                    o = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                if (!t || !o) return !1;
                if ("mousedown" == e.type) {
                    var i = c.$oel.get(0).ownerDocument, r = i.defaultView || i.parentWindow, n = !1;
                    try {
                        n = r.location != r.parent.location && !(r.$ && r.$.FE)
                    } catch (a) {
                    }
                    n && r.frameElement && (t += c.helpers.getPX(u(r.frameElement).offset().left) + r.frameElement.clientLeft, o = e.clientY + c.helpers.getPX(u(r.frameElement).offset().top) + r.frameElement.clientTop)
                }
                c.undo.canDo() || c.undo.saveStep(), (f = u(this)).data("start-x", t), f.data("start-y", o), s.show(), c.popups.hideAll(), Y()
            }

            function k(e) {
                if (!c.core.sameInstance(v)) return !0;
                if (f) {
                    e.preventDefault();
                    var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
                        o = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                    if (!t || !o) return !1;
                    var i = f.data("start-x"), r = f.data("start-y");
                    f.data("start-x", t), f.data("start-y", o);
                    var n = t - i, a = o - r, s = p.find("iframe, embed, video"), d = s.width(), l = s.height();
                    (f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (n = 0 - n), (f.hasClass("fr-hnw") || f.hasClass("fr-hne")) && (a = 0 - a), s.css("width", d + n), s.css("height", l + a), s.removeAttr("width"), s.removeAttr("height"), T()
                }
            }

            function O(e) {
                if (!c.core.sameInstance(v)) return !0;
                f && p && (e && e.stopPropagation(), f = null, s.hide(), T(), n(), c.undo.saveStep())
            }

            function L(e) {
                return '<div class="fr-handler fr-h'.concat(e, '"></div>')
            }

            function P(e, t, o, i) {
                return e.pageX = t, e.pageY = t, I.call(this, e), e.pageX = e.pageX + o * Math.floor(Math.pow(1.1, i)), e.pageY = e.pageY + o * Math.floor(Math.pow(1.1, i)), k.call(this, e), O.call(this, e), ++i
            }

            function z() {
                var e, t = Array.prototype.slice.call(c.el.querySelectorAll("video, .fr-video > *")), o = [];
                for (e = 0; e < t.length; e++) o.push(t[e].getAttribute("src")), u(t[e]).toggleClass("fr-draggable", c.opts.videoMove), "" === t[e].getAttribute("class") && t[e].removeAttribute("class"), "" === t[e].getAttribute("style") && t[e].removeAttribute("style");
                if (i) for (e = 0; e < i.length; e++) o.indexOf(i[e].getAttribute("src")) < 0 && c.events.trigger("video.removed", [u(i[e])]);
                i = t
            }

            function T() {
                v || function a() {
                    var e;
                    if (c.shared.$video_resizer ? (v = c.shared.$video_resizer, s = c.shared.$vid_overlay, c.events.on("destroy", function () {
                        u("body").first().append(v.removeClass("fr-active"))
                    }, !0)) : (c.shared.$video_resizer = u(document.createElement("div")).attr("class", "fr-video-resizer"), v = c.shared.$video_resizer, c.events.$on(v, "mousedown", function (e) {
                        e.stopPropagation()
                    }, !0), c.opts.videoResize && (v.append(L("nw") + L("ne") + L("sw") + L("se")), c.shared.$vid_overlay = u(document.createElement("div")).attr("class", "fr-video-overlay"), s = c.shared.$vid_overlay, e = v.get(0).ownerDocument, u(e).find("body").first().append(s))), c.events.on("shared.destroy", function () {
                        v.html("").removeData().remove(), v = null, c.opts.videoResize && (s.remove(), s = null)
                    }, !0), c.helpers.isMobile() || c.events.$on(u(c.o_win), "resize.video", function () {
                        M(!0)
                    }), c.opts.videoResize) {
                        e = v.get(0).ownerDocument, c.events.$on(v, c._mousedown, ".fr-handler", I), c.events.$on(u(e), c._mousemove, k), c.events.$on(u(e.defaultView || e.parentWindow), c._mouseup, O), c.events.$on(s, "mouseleave", O);
                        var i = 1, r = null, n = 0;
                        c.events.on("keydown", function (e) {
                            if (p) {
                                var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                    o = e.which;
                                (o !== r || 200 < e.timeStamp - n) && (i = 1), (o == me.KEYCODE.EQUALS || c.browser.mozilla && o == me.KEYCODE.FF_EQUALS) && t && !e.altKey ? i = P.call(this, e, 1, 1, i) : (o == me.KEYCODE.HYPHEN || c.browser.mozilla && o == me.KEYCODE.FF_HYPHEN) && t && !e.altKey && (i = P.call(this, e, 2, -1, i)), r = o, n = e.timeStamp
                            }
                        }), c.events.on("keyup", function () {
                            i = 1
                        })
                    }
                }(), (c.$wp || c.$sc).append(v), v.data("instance", c);
                var e = p.find("iframe, embed, video"), t = 0, o = 0;
                c.opts.iframe && (o = c.helpers.getPX(c.$wp.find(".fr-iframe").css("padding-top")), t = c.helpers.getPX(c.$wp.find(".fr-iframe").css("padding-left"))), v.css("top", (c.opts.iframe ? e.offset().top + o - 1 : e.offset().top - c.$wp.offset().top - 1) + c.$wp.scrollTop()).css("left", (c.opts.iframe ? e.offset().left + t - 1 : e.offset().left - c.$wp.offset().left - 1) + c.$wp.scrollLeft()).css("width", e.get(0).getBoundingClientRect().width).css("height", e.get(0).getBoundingClientRect().height).addClass("fr-active")
            }

            function t(e) {
                if (e && "touchend" == e.type && o) return !0;
                if (e && c.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
                if (c.edit.isDisabled()) return !1;
                for (var t = 0; t < me.INSTANCES.length; t++) me.INSTANCES[t] != c && me.INSTANCES[t].events.trigger("video.hideResizer");
                c.toolbar.disable(), c.helpers.isMobile() && (c.events.disableBlur(), c.$el.blur(), c.events.enableBlur()), c.$el.find(".fr-video.fr-active").removeClass("fr-active"), (p = u(this)).addClass("fr-active"), c.opts.iframe && c.size.syncIframe(), Q(), T(), n(), c.selection.clear(), c.button.bulkRefresh(), c.events.trigger("image.hideResizer")
            }

            function M(e) {
                p && (function t() {
                    return c.shared.vid_exit_flag
                }() || !0 === e) && (v.removeClass("fr-active"), c.toolbar.enable(), p.removeClass("fr-active"), p = null, Y())
            }

            function V() {
                c.shared.vid_exit_flag = !0
            }

            function Y() {
                c.shared.vid_exit_flag = !1
            }

            function N(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files && t.files.length) {
                    var o = t.files[0];
                    if (o && o.type && -1 !== o.type.indexOf("video")) {
                        if (!c.opts.videoUpload) return e.preventDefault(), e.stopPropagation(), !1;
                        c.markers.remove(), c.markers.insertAtPoint(e.originalEvent), c.$el.find(".fr-marker").replaceWith(me.MARKERS), c.popups.hideAll();
                        var i = c.popups.get("video.insert");
                        return i || (i = a()), c.popups.setContainer("video.insert", c.$sc), c.popups.show("video.insert", e.originalEvent.pageX, e.originalEvent.pageY), _(), 0 <= c.opts.videoAllowedTypes.indexOf(o.type.replace(/video\//g, "")) ? K(t.files) : X(b), e.preventDefault(), e.stopPropagation(), !1
                    }
                }
            }

            function K(e) {
                if (void 0 !== e && 0 < e.length) {
                    if (!1 === c.events.trigger("video.beforeUpload", [e])) return !1;
                    var t, o = e[0];
                    if ((null === c.opts.videoUploadURL || c.opts.videoUploadURL == d) && !c.opts.videoUploadToS3) return function s(i) {
                        p && p.find("iframe") && p.find("iframe").length && j();
                        var r = new FileReader;
                        r.onload = function () {
                            r.result;
                            for (var e = atob(r.result.split(",")[1]), t = [], o = 0; o < e.length; o++) t.push(e.charCodeAt(o));
                            C(window.URL.createObjectURL(new Blob([new Uint8Array(t)], {type: i.type})), !1, null, p)
                        }, _(), r.readAsDataURL(i)
                    }(o), !1;
                    if (o.size > c.opts.videoMaxSize) return X(l), !1;
                    if (c.opts.videoAllowedTypes.indexOf(o.type.replace(/video\//g, "")) < 0) return X(b), !1;
                    if (c.drag_support.formdata && (t = c.drag_support.formdata ? new FormData : null), t) {
                        var i;
                        if (!1 !== c.opts.videoUploadToS3) for (i in t.append("key", c.opts.videoUploadToS3.keyStart + (new Date).getTime() + "-" + (o.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", o.type), c.opts.videoUploadToS3.params) c.opts.videoUploadToS3.params.hasOwnProperty(i) && t.append(i, c.opts.videoUploadToS3.params[i]);
                        for (i in c.opts.videoUploadParams) c.opts.videoUploadParams.hasOwnProperty(i) && t.append(i, c.opts.videoUploadParams[i]);
                        t.append(c.opts.videoUploadParam, o);
                        var r = c.opts.videoUploadURL;
                        c.opts.videoUploadToS3 && (r = c.opts.videoUploadToS3.uploadURL ? c.opts.videoUploadToS3.uploadURL : "https://".concat(c.opts.videoUploadToS3.region, ".amazonaws.com/").concat(c.opts.videoUploadToS3.bucket));
                        var n = c.core.getXHR(r, c.opts.videoUploadMethod);
                        n.onload = function () {
                            D.call(n, p)
                        }, n.onerror = U, n.upload.onprogress = B, n.onabort = $, _(), c.events.disableBlur(), c.edit.off(), c.events.enableBlur();
                        var a = c.popups.get("video.insert");
                        a && u(a.off("abortUpload")).on("abortUpload", function () {
                            4 != n.readyState && n.abort()
                        }), n.send(t)
                    }
                }
            }

            function X(e, t) {
                c.edit.on(), p && p.find("video").addClass("fr-error"), x(c.language.translate("Something went wrong. Please try again.")), c.events.trigger("video.error", [{
                    code: e,
                    message: r[e]
                }, t])
            }

            function H() {
                if (p) {
                    var e = c.popups.get("video.size"), t = p.find("iframe, embed, video");
                    e.find('input[name="width"]').val(t.get(0).style.width || t.attr("width")).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height || t.attr("height")).trigger("change")
                }
            }

            function G(e) {
                if (e) return c.popups.onRefresh("video.size", H), !0;
                var t = {
                    buttons: '<div class="fr-buttons fr-tabs">'.concat(c.button.buildList(c.opts.videoSizeButtons), "</div>"),
                    size_layer: '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-'.concat(c.id, '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-').concat(c.id, '" type="text" name="width" placeholder="').concat(c.language.translate("Width"), '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-').concat(c.id, '" type="text" name="height" placeholder="').concat(c.language.translate("Height"), '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">').concat(c.language.translate("Update"), "</button></div></div>")
                }, o = c.popups.create("video.size", t);
                return c.events.$on(c.$wp, "scroll", function () {
                    p && c.popups.isVisible("video.size") && (c.events.disableBlur(), R(p))
                }), o
            }

            function F(e) {
                if (void 0 === e && (e = p), e) {
                    if (e.hasClass("fr-fvl")) return "left";
                    if (e.hasClass("fr-fvr")) return "right";
                    if (e.hasClass("fr-dvb") || e.hasClass("fr-dvi")) return "center";
                    if ("block" == e.css("display")) {
                        if ("left" == e.css("text-algin")) return "left";
                        if ("right" == e.css("text-align")) return "right"
                    } else {
                        if ("left" == e.css("float")) return "left";
                        if ("right" == e.css("float")) return "right"
                    }
                }
                return "center"
            }

            function W(e) {
                void 0 === e && (e = p);
                var t = e.css("float");
                return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline")
            }

            function j() {
                if (p && !1 !== c.events.trigger("video.beforeRemove", [p])) {
                    var e = p;
                    c.popups.hideAll(), M(!0), c.selection.setBefore(e.get(0)) || c.selection.setAfter(e.get(0)), e.remove(), c.selection.restore(), c.html.fillEmptyBlocks()
                }
            }

            function q() {
                S()
            }

            function Z(e, t, o) {
                !c.opts.htmlUntouched && c.opts.useClasses ? (e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"), e.addClass("fr-fv".concat(o[0], " fr-dv").concat(t[0]))) : "inline" == t ? (e.css({display: "inline-block"}), "center" == o ? e.css({"float": "none"}) : "left" == o ? e.css({"float": "left"}) : e.css({"float": "right"})) : (e.css({
                    display: "block",
                    clear: "both"
                }), "left" == o ? e.css({textAlign: "left"}) : "right" == o ? e.css({textAlign: "right"}) : e.css({textAlign: "center"}))
            }

            function J() {
                var e = c.$el.find("video").filter(function () {
                    return 0 === u(this).parents("span.fr-video").length
                });
                if (0 != e.length) {
                    e.wrap(u(document.createElement("span")).attr("class", "fr-video fr-deletable").attr("contenteditable", "false")), c.$el.find("embed, iframe").filter(function () {
                        if (c.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src), 0 < u(this).parents("span.fr-video").length) return !1;
                        for (var e = u(this).attr("src"), t = 0; t < me.VIDEO_PROVIDERS.length; t++) {
                            var o = me.VIDEO_PROVIDERS[t];
                            if (o.test_regex.test(e) && new RegExp(c.opts.videoAllowedProviders.join("|")).test(o.provider)) return !0
                        }
                        return !1
                    }).map(function () {
                        return 0 === u(this).parents("object").length ? this : u(this).parents("object").get(0)
                    }).wrap(u(document.createElement("span")).attr("class", "fr-video").attr("contenteditable", "false"));
                    for (var t, o, i, r, n = c.$el.find("span.fr-video, video"), a = 0; a < n.length; a++) {
                        var s = u(n[a]);
                        !c.opts.htmlUntouched && c.opts.useClasses ? ((r = s).hasClass("fr-dvi") || r.hasClass("fr-dvb") || (r.addClass("fr-fv".concat(F(r)[0])), r.addClass("fr-dv".concat(W(r)[0]))), c.opts.videoTextNear || s.removeClass("fr-dvi").addClass("fr-dvb")) : c.opts.htmlUntouched || c.opts.useClasses || (void 0, o = (t = s).hasClass("fr-dvb") ? "block" : t.hasClass("fr-dvi") ? "inline" : null, i = t.hasClass("fr-fvl") ? "left" : t.hasClass("fr-fvr") ? "right" : F(t), Z(t, o, i), t.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl"))
                    }
                    n.toggleClass("fr-draggable", c.opts.videoMove)
                }
            }

            function Q() {
                if (p) {
                    c.selection.clear();
                    var e = c.doc.createRange();
                    e.selectNode(p.get(0)), c.selection.get().addRange(e)
                }
            }

            return r[1] = "Video cannot be loaded from the passed link.", r[h] = "No link in upload response.", r[g] = "Error during file upload.", r[m] = "Parsing response failed.", r[l] = "File is too large.", r[b] = "Video file type is invalid.", r[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", c.shared.vid_exit_flag = !1, {
                _init: function ee() {
                    c.opts.videoResponsive && (c.opts.videoResize = !1), function e() {
                        c.events.on("drop", N, !0), c.events.on("mousedown window.mousedown", V), c.events.on("window.touchmove", Y), c.events.on("mouseup window.mouseup", M), c.events.on("commands.mousedown", function (e) {
                            0 < e.parents(".fr-toolbar").length && M()
                        }), c.events.on("video.hideResizer commands.undo commands.redo element.dropped", function () {
                            M(!0)
                        })
                    }(), c.helpers.isMobile() && (c.events.$on(c.$el, "touchstart", "span.fr-video", function () {
                        o = !1
                    }), c.events.$on(c.$el, "touchmove", function () {
                        o = !0
                    })), c.events.on("html.set", J), J(), c.events.$on(c.$el, "mousedown", "span.fr-video", function (e) {
                        e.stopPropagation(), (c.browser.msie || c.browser.edge) && (e.target.innerText || (e.target.dragDrop(), t.call(this, e)))
                    }), c.events.$on(c.$el, "click touchend", "span.fr-video", function (e) {
                        if (e.target.innerText.length || "false" == u(this).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                        t.call(this, e)
                    }), c.events.on("keydown", function (e) {
                        var t = e.which;
                        return !p || t != me.KEYCODE.BACKSPACE && t != me.KEYCODE.DELETE ? p && t == me.KEYCODE.ESC ? (M(!0), e.preventDefault(), !1) : p && t != me.KEYCODE.F10 && !c.keys.isBrowserAction(e) ? (e.preventDefault(), !1) : void 0 : (e.preventDefault(), j(), c.undo.saveStep(), !1)
                    }, !0), c.events.on("toolbar.esc", function () {
                        if (p) return c.events.disableBlur(), c.events.focus(), !1
                    }, !0), c.events.on("toolbar.focusEditor", function () {
                        if (p) return !1
                    }, !0), c.events.on("keydown", function () {
                        c.$el.find("span.fr-video:empty").remove()
                    }), c.$wp && (z(), c.events.on("contentChanged", z)), a(!0), G(!0)
                }, showInsertPopup: function te() {
                    var e = c.$tb.find('.fr-command[data-cmd="insertVideo"]'), t = c.popups.get("video.insert");
                    if (t || (t = a()), S(), !t.hasClass("fr-active")) if (c.popups.refresh("video.insert"), c.popups.setContainer("video.insert", c.$tb), e.isVisible()) {
                        var o = c.button.getPosition(e), i = o.left, r = o.top;
                        c.popups.show("video.insert", i, r, e.outerHeight())
                    } else c.position.forSelection(t), c.popups.show("video.insert")
                }, showLayer: function oe(e) {
                    var t, o, i = c.popups.get("video.insert");
                    if (!p && !c.opts.toolbarInline) {
                        var r = c.$tb.find('.fr-command[data-cmd="insertVideo"]');
                        t = r.offset().left, o = r.offset().top + (c.opts.toolbarBottom ? 10 : r.outerHeight() - 10)
                    }
                    c.opts.toolbarInline && (o = i.offset().top - c.helpers.getPX(i.css("margin-top")), i.hasClass("fr-above") && (o += i.outerHeight())), i.find(".fr-layer").removeClass("fr-active"), i.find(".fr-".concat(e, "-layer")).addClass("fr-active"), c.popups.show("video.insert", t, o, 0), c.accessibility.focusPopup(i)
                }, refreshByURLButton: function ie(e) {
                    var t = c.popups.get("video.insert");
                    t && t.find(".fr-video-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                }, refreshEmbedButton: function re(e) {
                    var t = c.popups.get("video.insert");
                    t && t.find(".fr-video-embed-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                }, refreshUploadButton: function ne(e) {
                    var t = c.popups.get("video.insert");
                    t && t.find(".fr-video-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                }, upload: K, insertByURL: function ae(e) {
                    void 0 === e && (e = (c.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "").trim());
                    var t = null;
                    if (/^http/.test(e) || (e = "https://".concat(e)), c.helpers.isURL(e)) for (var o = 0; o < me.VIDEO_PROVIDERS.length; o++) {
                        var i = me.VIDEO_PROVIDERS[o];
                        if (i.test_regex.test(e) && new RegExp(c.opts.videoAllowedProviders.join("|")).test(i.provider)) {
                            t = e.replace(i.url_regex, i.url_text), t = i.html.replace(/\{url\}/, t);
                            break
                        }
                    }
                    t ? w(t) : (x(c.language.translate("Something went wrong. Please try again.")), c.events.trigger("video.linkError", [e]))
                }, insertEmbed: function se(e) {
                    void 0 === e && (e = c.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || ""), 0 !== e.length && me.VIDEO_EMBED_REGEX.test(e) ? w(e) : (x(c.language.translate("Something went wrong. Please try again.")), c.events.trigger("video.codeError", [e]))
                }, insert: w, align: function de(e) {
                    p.removeClass("fr-fvr fr-fvl"), !c.opts.htmlUntouched && c.opts.useClasses ? "left" == e ? p.addClass("fr-fvl") : "right" == e && p.addClass("fr-fvr") : Z(p, W(), e), Q(), T(), n(), c.selection.clear()
                }, refreshAlign: function le(e) {
                    if (!p) return !1;
                    e.find(">*").first().replaceWith(c.icon.create("video-align-".concat(F())))
                }, refreshAlignOnShow: function fe(e, t) {
                    p && t.find('.fr-command[data-param1="'.concat(F(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                }, display: function ve(e) {
                    p.removeClass("fr-dvi fr-dvb"), !c.opts.htmlUntouched && c.opts.useClasses ? "inline" == e ? p.addClass("fr-dvi") : "block" == e && p.addClass("fr-dvb") : Z(p, e, F()), Q(), T(), n(), c.selection.clear()
                }, refreshDisplayOnShow: function pe(e, t) {
                    p && t.find('.fr-command[data-param1="'.concat(W(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                }, remove: j, hideProgressBar: S, showSizePopup: function ce() {
                    var e = c.popups.get("video.size");
                    e || (e = G()), S(), c.popups.refresh("video.size"), c.popups.setContainer("video.size", c.$sc);
                    var t = p.find("iframe, embed, video"), o = t.offset().left + t.outerWidth() / 2,
                        i = t.offset().top + t.height();
                    c.popups.show("video.size", o, i, t.height(), !0)
                }, replace: function ue() {
                    var e = c.popups.get("video.insert");
                    e || (e = a()), c.popups.isVisible("video.insert") || (S(), c.popups.refresh("video.insert"), c.popups.setContainer("video.insert", c.$sc));
                    var t = p.offset().left + p.outerWidth() / 2, o = p.offset().top + p.height();
                    c.popups.show("video.insert", t, o, p.outerHeight(), !0)
                }, back: function e() {
                    p ? (c.events.disableBlur(), p[0].click()) : (c.events.disableBlur(), c.selection.restore(), c.events.enableBlur(), c.popups.hide("video.insert"), c.toolbar.showInline())
                }, setSize: function he(e, t) {
                    if (p) {
                        var o = c.popups.get("video.size"), i = p.find("iframe, embed, video");
                        i.css("width", e || o.find('input[name="width"]').val()), i.css("height", t || o.find('input[name="height"]').val()), i.get(0).style.width && i.removeAttr("width"), i.get(0).style.height && i.removeAttr("height"), o.find("input:focus").blur(), setTimeout(function () {
                            p.trigger("click")
                        }, c.helpers.isAndroid() ? 50 : 0)
                    }
                }, get: function ge() {
                    return p
                }, showProgressBar: _
            }
        }, me.RegisterCommand("insertVideo", {
            title: "Insert Video",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function () {
                this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup()
            },
            plugin: "video"
        }), me.DefineIcon("insertVideo", {
            NAME: "video-camera",
            FA5NAME: "camera",
            SVG_KEY: "insertVideo"
        }), me.DefineIcon("videoByURL", {
            NAME: "link",
            SVG_KEY: "insertLink"
        }), me.RegisterCommand("videoByURL", {
            title: "By URL", undo: !1, focus: !1, toggle: !0, callback: function () {
                this.video.showLayer("video-by-url")
            }, refresh: function (e) {
                this.video.refreshByURLButton(e)
            }
        }), me.DefineIcon("videoEmbed", {
            NAME: "code",
            SVG_KEY: "codeView"
        }), me.RegisterCommand("videoEmbed", {
            title: "Embedded Code",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function () {
                this.video.showLayer("video-embed")
            },
            refresh: function (e) {
                this.video.refreshEmbedButton(e)
            }
        }), me.DefineIcon("videoUpload", {
            NAME: "upload",
            SVG_KEY: "upload"
        }), me.RegisterCommand("videoUpload", {
            title: "Upload Video",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function () {
                this.video.showLayer("video-upload")
            },
            refresh: function (e) {
                this.video.refreshUploadButton(e)
            }
        }), me.RegisterCommand("videoInsertByURL", {
            undo: !0, focus: !0, callback: function () {
                this.video.insertByURL()
            }
        }), me.RegisterCommand("videoInsertEmbed", {
            undo: !0, focus: !0, callback: function () {
                this.video.insertEmbed()
            }
        }), me.DefineIcon("videoDisplay", {
            NAME: "star",
            SVG_KEY: "star"
        }), me.RegisterCommand("videoDisplay", {
            title: "Display",
            type: "dropdown",
            options: {inline: "Inline", block: "Break Text"},
            callback: function (e, t) {
                this.video.display(t)
            },
            refresh: function (e) {
                this.opts.videoTextNear || e.addClass("fr-hidden")
            },
            refreshOnShow: function (e, t) {
                this.video.refreshDisplayOnShow(e, t)
            }
        }), me.DefineIcon("video-align", {
            NAME: "align-left",
            SVG_KEY: "align Left"
        }), me.DefineIcon("video-align-left", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), me.DefineIcon("video-align-right", {
            NAME: "align-right",
            SVG_KEY: "alignRight"
        }), me.DefineIcon("video-align-center", {
            NAME: "align-justify",
            SVG_KEY: "alignJustify"
        }), me.DefineIcon("videoAlign", {
            NAME: "align-center",
            SVG_KEY: "alignCenter"
        }), me.RegisterCommand("videoAlign", {
            type: "dropdown",
            title: "Align",
            options: {left: "Align Left", center: "None", right: "Align Right"},
            html: function () {
                var e = '<ul class="fr-dropdown-list" role="presentation">', t = me.COMMANDS.videoAlign.options;
                for (var o in t) t.hasOwnProperty(o) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="'.concat(o, '" title="').concat(this.language.translate(t[o]), '">').concat(this.icon.create("video-align-".concat(o)), '<span class="fr-sr-only">').concat(this.language.translate(t[o]), "</span></a></li>"));
                return e += "</ul>"
            },
            callback: function (e, t) {
                this.video.align(t)
            },
            refresh: function (e) {
                this.video.refreshAlign(e)
            },
            refreshOnShow: function (e, t) {
                this.video.refreshAlignOnShow(e, t)
            }
        }), me.DefineIcon("videoReplace", {
            NAME: "exchange",
            FA5NAME: "exchange-alt",
            SVG_KEY: "replaceImage"
        }), me.RegisterCommand("videoReplace", {
            title: "Replace",
            undo: !1,
            focus: !1,
            popup: !0,
            refreshAfterCallback: !1,
            callback: function () {
                this.video.replace()
            }
        }), me.DefineIcon("videoRemove", {
            NAME: "trash",
            SVG_KEY: "remove"
        }), me.RegisterCommand("videoRemove", {
            title: "Remove", callback: function () {
                this.video.remove()
            }
        }), me.DefineIcon("videoSize", {
            NAME: "arrows-alt",
            SVG_KEY: "imageSize"
        }), me.RegisterCommand("videoSize", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Change Size",
            callback: function () {
                this.video.showSizePopup()
            }
        }), me.DefineIcon("videoBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), me.RegisterCommand("videoBack", {
            title: "Back", undo: !1, focus: !1, back: !0, callback: function () {
                this.video.back()
            }, refresh: function (e) {
                this.video.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
            }
        }), me.RegisterCommand("videoDismissError", {
            title: "OK", undo: !1, callback: function () {
                this.video.hideProgressBar(!0)
            }
        }), me.RegisterCommand("videoSetSize", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function () {
                this.video.setSize()
            }
        })
    });

});

;/*!node_modules/froala-editor/js/plugins/word_paste.min.js*/
amis.define('58e7c51', function (require, exports, module, define) {

    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */

    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(require("6068935")) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor)
    }(this, function (w) {
        "use strict";
        w = w && w.hasOwnProperty("default") ? w["default"] : w, Object.assign(w.DEFAULTS, {
            wordDeniedTags: [],
            wordDeniedAttrs: [],
            wordAllowedStyleProps: ["font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style", "text-indent", "border", "border-.*", "line-height", "list-style-type"],
            wordPasteModal: !0,
            wordPasteKeepFormatting: !0
        }), w.PLUGINS.wordPaste = function (C) {
            var l, n, d = C.$, s = "word_paste", u = {};

            function t(e) {
                var t = C.opts.wordAllowedStyleProps;
                e || (C.opts.wordAllowedStyleProps = []), 0 === n.indexOf("<colgroup>") && (n = "<table>" + n + "</table>"), n = a(n = n.replace(/<span[\n\r ]*style='mso-spacerun:yes'>([\r\n\u00a0 ]*)<\/span>/g, function (e, t) {
                    for (var r = "", i = 0; i++ < t.length;) r += "&nbsp;";
                    return r
                }), C.paste.getRtfClipboard());
                var r = C.doc.createElement("DIV");
                r.innerHTML = n, C.html.cleanBlankSpaces(r), n = r.innerHTML, n = (n = C.paste.cleanEmptyTagsAndDivs(n)).replace(/\u200b/g, ""), function i() {
                    C.modals.hide(s)
                }(), C.paste.clean(n, !0, !0), C.opts.wordAllowedStyleProps = t
            }

            function N(e) {
                e.parentNode && e.parentNode.removeChild(e)
            }

            function p(e, t) {
                if (t(e)) for (var r = e.firstChild; r;) {
                    var i = r, n = r.previousSibling;
                    r = r.nextSibling, p(i, t), i.previousSibling || i.nextSibling || i.parentNode || !r || n === r.previousSibling || !r.parentNode ? i.previousSibling || i.nextSibling || i.parentNode || !r || r.previousSibling || r.nextSibling || r.parentNode || (n ? r = n.nextSibling ? n.nextSibling.nextSibling : null : e.firstChild && (r = e.firstChild.nextSibling)) : r = n ? n.nextSibling : e.firstChild
                }
            }

            function H(e) {
                if (!e.getAttribute("style") || !/mso-list:[\s]*l/gi.test(e.getAttribute("style").replace(/\n/gi, ""))) return !1;
                try {
                    if (!e.querySelector('[style="mso-list:Ignore"]')) return !!(e.outerHTML && 0 <= e.outerHTML.indexOf("\x3c!--[if !supportLists]--\x3e"))
                } catch (t) {
                    return !1
                }
                return !0
            }

            function O(e) {
                return e.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1")
            }

            function I(e, i) {
                var t = e.cloneNode(!0);
                if (-1 !== ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(e.tagName)) {
                    var r = document.createElement(e.tagName.toLowerCase());
                    r.setAttribute("style", e.getAttribute("style")), r.innerHTML = t.innerHTML, t.innerHTML = r.outerHTML
                }
                p(t, function (e) {
                    if (e.nodeType == Node.COMMENT_NODE && (C.browser.msie || C.browser.safari || C.browser.edge)) try {
                        if ("[if !supportLists]" === e.data) {
                            for (e = e.nextSibling; e && e.nodeType !== Node.COMMENT_NODE;) {
                                var t = e.nextSibling;
                                e.parentNode.removeChild(e), e = t
                            }
                            e && e.nodeType == Node.COMMENT_NODE && e.parentNode.removeChild(e)
                        }
                    } catch (r) {
                    }
                    return e.nodeType === Node.ELEMENT_NODE && ("mso-list:\nIgnore" === e.getAttribute("style") && e.setAttribute("style", "mso-list:Ignore"), "mso-list:Ignore" === e.getAttribute("style") && e.parentNode.removeChild(e), e.setAttribute("style", function n(e) {
                        var r = "", i = e.getAttribute("style");
                        i && ["line-height", "font-family", "font-size", "color", "background"].forEach(function (e) {
                            var t = i.match(new RegExp(e + ":.*(;|)"));
                            t && (r += t[0] + ";")
                        });
                        return r
                    }(e)), h(e, i)), !0
                });
                var n = t.innerHTML;
                return n = n.replace(/<!--[\s\S]*?-->/gi, "")
            }

            function y(e, t) {
                for (var r = document.createElement(t), i = 0; i < e.attributes.length; i++) {
                    var n = e.attributes[i].name;
                    r.setAttribute(n, e.getAttribute(n))
                }
                return r.innerHTML = e.innerHTML, e.parentNode.replaceChild(r, e), r
            }

            function A(e) {
                var t = e.getAttribute("align");
                t && (e.style["text-align"] = t, e.removeAttribute("align"))
            }

            function E(e) {
                return e.replace(/\n|\r|\n\r|&quot;/g, "")
            }

            function T(e, t, r) {
                if (t) {
                    var i = e.getAttribute("style");
                    i && ";" !== i.slice(-1) && (i += ";"), t && ";" !== t.slice(-1) && (t += ";"), t = t.replace(/\n/gi, "");
                    var n = null;
                    n = r ? (i || "") + t : t + (i || ""), e.setAttribute("style", n)
                }
            }

            var c = null;

            function f(e, t, r) {
                for (var i = e.split(r), n = 1; n < i.length; n++) {
                    var a = i[n];
                    if (1 < (a = a.split("shplid")).length) {
                        a = a[1];
                        for (var l = "", s = 0; s < a.length && "\\" !== a[s] && "{" !== a[s] && " " !== a[s] && "\r" !== a[s] && "\n" !== a[s];) l += a[s], s++;
                        var o = a.split("bliptag");
                        if (o && o.length < 2) continue;
                        var d = null;
                        if (-1 !== o[0].indexOf("pngblip") ? d = "image/png" : -1 !== o[0].indexOf("jpegblip") && (d = "image/jpeg"), !d) continue;
                        var f = o[1].split("}");
                        if (f && f.length < 2) continue;
                        var g = void 0;
                        if (2 < f.length && -1 !== f[0].indexOf("blipuid")) g = f[1].split(" "); else {
                            if ((g = f[0].split(" ")) && g.length < 2) continue;
                            g.shift()
                        }
                        var u = g.join("");
                        c[t + l] = {image_hex: u, image_type: d}
                    }
                }
            }

            function m(e, t) {
                if (t) {
                    var r;
                    if ("IMG" === e.tagName) {
                        var i = e.getAttribute("src");
                        if (!i || -1 === i.indexOf("file://")) return;
                        if (0 === i.indexOf("file://") && C.helpers.isURL(e.getAttribute("alt"))) return void e.setAttribute("src", e.getAttribute("alt"));
                        (r = u[e.getAttribute("v:shapes")]) || (r = e.getAttribute("v:shapes"), e.parentNode && e.parentNode.parentNode && 0 <= e.parentNode.parentNode.innerHTML.indexOf("msEquation") && (r = null))
                    } else r = e.parentNode.getAttribute("o:spid");
                    if (e.removeAttribute("height"), r) {
                        !function s(e) {
                            c = {}, f(e, "i", "\\shppict"), f(e, "s", "\\shp{")
                        }(t);
                        var n = c[r.substring(7)];
                        if (n) {
                            var a = function o(e) {
                                for (var t = e.match(/[0-9a-f]{2}/gi), r = [], i = 0; i < t.length; i++) r.push(String.fromCharCode(parseInt(t[i], 16)));
                                var n = r.join("");
                                return btoa(n)
                            }(n.image_hex), l = "data:" + n.image_type + ";base64," + a;
                            "IMG" === e.tagName ? (e.src = l, e.setAttribute("data-fr-image-pasted", !0)) : d(e.parentNode).before('<img data-fr-image-pasted="true" src="' + l + '" style="' + e.parentNode.getAttribute("style") + '">').remove()
                        }
                    }
                }
            }

            function h(e, t) {
                var r = e.tagName, i = r.toLowerCase();
                e.firstElementChild && ("I" === e.firstElementChild.tagName ? y(e.firstElementChild, "em") : "B" === e.firstElementChild.tagName && y(e.firstElementChild, "strong"));
                if (-1 !== ["SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT"].indexOf(r)) return N(e), !1;
                for (var n = ["META", "LINK", "XML", "ST1:", "O:", "W:", "FONT"], a = 0; a < n.length; a++) if (-1 !== r.indexOf(n[a])) return e.innerHTML && (e.outerHTML = e.innerHTML), N(e), !1;
                if ("TD" !== r) {
                    var l = e.getAttribute("class") || "MsoNormal";
                    if (t && l) {
                        for (var s = (l = E(l)).split(" "), o = 0; o < s.length; o++) {
                            var d = [], f = "." + s[o];
                            d.push(f), f = i + f, d.push(f);
                            for (var g = 0; g < d.length; g++) t[d[g]] && T(e, t[d[g]])
                        }
                        e.removeAttribute("class")
                    }
                    t && t[i] && T(e, t[i])
                }
                if (-1 !== ["P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"].indexOf(r)) {
                    var u = e.getAttribute("class");
                    if (u && (t && t[r.toLowerCase() + "." + u] && T(e, t[r.toLowerCase() + "." + u]), -1 !== u.toLowerCase().indexOf("mso"))) {
                        var p = E(u);
                        (p = p.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, "")) ? e.setAttribute("class", p) : e.removeAttribute("class")
                    }
                    var c = e.getAttribute("style");
                    if (c) {
                        var m = c.match(/text-align:.+?[; "]{1,1}/gi);
                        m && m[m.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1")
                    }
                    A(e)
                }
                if ("TR" === r && function x(e, t) {
                    C.node.clearAttributes(e);
                    for (var r = e.firstElementChild, i = 0, n = !1, a = null; r;) {
                        r.firstElementChild && -1 !== r.firstElementChild.tagName.indexOf("W:") && (r.innerHTML = r.firstElementChild.innerHTML), (a = r.getAttribute("width")) || n || (n = !0), i += parseInt(a, 10), (!r.firstChild || r.firstChild && r.firstChild.data === w.UNICODE_NBSP) && (r.firstChild && N(r.firstChild), r.innerHTML = "<br>");
                        for (var l = r.firstElementChild, s = 1 === r.children.length; l;) "P" !== l.tagName || H(l) || s && A(l), l = l.nextElementSibling;
                        if (t) {
                            var o = r.getAttribute("class");
                            if (o) {
                                var d = (o = E(o)).match(/xl[0-9]+/gi);
                                if (d) {
                                    var f = "." + d[0];
                                    t[f] && T(r, t[f])
                                }
                            }
                            t.td && T(r, t.td)
                        }
                        var g = r.getAttribute("style");
                        g && (g = E(g)) && ";" !== g.slice(-1) && (g += ";");
                        var u = r.getAttribute("valign");
                        if (!u && g) {
                            var p = g.match(/vertical-align:.+?[; "]{1,1}/gi);
                            p && (u = p[p.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var c = null;
                        if (g) {
                            var m = g.match(/text-align:.+?[; "]{1,1}/gi);
                            m && (c = m[m.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")), "general" === c && (c = null)
                        }
                        var h = null;
                        if (g) {
                            var v = g.match(/background:.+?[; "]{1,1}/gi);
                            v && (h = v[v.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var b = r.getAttribute("colspan"), y = r.getAttribute("rowspan");
                        b && r.setAttribute("colspan", b), y && r.setAttribute("rowspan", y), u && (r.style["vertical-align"] = u), c && (r.style["text-align"] = c), h && (r.style["background-color"] = h), a && r.setAttribute("width", a), r = r.nextElementSibling
                    }
                    for (r = e.firstElementChild; r;) a = r.getAttribute("width"), n ? r.removeAttribute("width") : r.setAttribute("width", 100 * parseInt(a, 10) / i + "%"), r = r.nextElementSibling
                }(e, t), "A" !== r || e.attributes.getNamedItem("href") || e.attributes.getNamedItem("name") || !e.innerHTML || (e.outerHTML = e.innerHTML), "A" == r && e.getAttribute("href") && e.querySelector("img")) for (var h = e.querySelectorAll("span"), v = 0; v < h.length; v++) h[v].innerText || (h[v].outerHTML = h[v].innerHTML);
                if ("TD" !== r && "TH" !== r || e.innerHTML || (e.innerHTML = "<br>"), "TABLE" === r && (e.style.width = e.style.width), e.getAttribute("lang") && e.removeAttribute("lang"), e.getAttribute("style") && -1 !== e.getAttribute("style").toLowerCase().indexOf("mso")) {
                    var b = E(e.getAttribute("style"));
                    (b = b.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, "")) ? e.setAttribute("style", b) : e.removeAttribute("style")
                }
                return !0
            }

            function a(e, t) {
                0 <= e.indexOf("<html") && (e = e.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/i, "$1")), function f(e) {
                    for (var t = e.split("v:shape"), r = 1; r < t.length; r++) {
                        var i = t[r], n = i.split(' id="')[1];
                        if (n && 1 < n.length) {
                            n = n.split('"')[0];
                            var a = i.split(' o:spid="')[1];
                            a && 1 < a.length && (a = a.split('"')[0], u[n] = a)
                        }
                    }
                }(e);
                var r = (new DOMParser).parseFromString(e, "text/html"), i = r.head, n = r.body, s = function g(e) {
                    var t = {}, r = e.getElementsByTagName("style");
                    if (r.length) {
                        var i = r[0].innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);
                        if (i) for (var n = 0; n < i.length; n++) {
                            var a = i[n], l = a.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"),
                                s = a.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
                            l = l.replace(/^[\s]|[\s]$/gm, ""), s = s.replace(/^[\s]|[\s]$/gm, ""), l = l.replace(/\n|\r|\n\r/g, ""), s = s.replace(/\n|\r|\n\r/g, "");
                            for (var o = l.split(", "), d = 0; d < o.length; d++) t[o[d]] = s
                        }
                    }
                    return t
                }(i);
                p(n, function (e) {
                    if (e.nodeType === Node.TEXT_NODE && /\n|\u00a0|\r/.test(e.data)) {
                        if (!/\S| /.test(e.data) && !/[\u00a0]+/.test(e.data)) return e.data === w.UNICODE_NBSP ? (e.data = "\u200b", !0) : 1 === e.data.length && 10 === e.data.charCodeAt(0) ? (e.data = " ", !0) : (N(e), !1);
                        e.data = e.data.replace(/\n|\r/gi, " ")
                    }
                    return !0
                }), p(n, function (e) {
                    return e.nodeType !== Node.ELEMENT_NODE || "V:IMAGEDATA" !== e.tagName && "IMG" !== e.tagName || m(e, t), !0
                });
                for (var a = n.querySelectorAll("ul > ul, ul > ol, ol > ul, ol > ol"), l = a.length - 1; 0 <= l; l--) a[l].previousElementSibling && "LI" === a[l].previousElementSibling.tagName && a[l].previousElementSibling.appendChild(a[l]);
                p(n, function (e) {
                    if (e.nodeType === Node.TEXT_NODE) return e.data = e.data.replace(/<br>(\n|\r)/gi, "<br>"), !1;
                    if (e.nodeType === Node.ELEMENT_NODE) {
                        if (H(e)) {
                            var t = e.parentNode, r = e.previousSibling, i = function M(e, t, r, i) {
                                var n, a, l = /[0-9a-zA-Z]./gi, s = !1, o = navigator.userAgent.toLowerCase();
                                -1 != o.indexOf("safari") && (o = -1 < o.indexOf("chrome") ? 1 : "safari"), e.innerHTML.includes("mso-list:\nIgnore") && (e.innerHTML = e.innerHTML.replace(/mso-list:\nIgnore/gi, "mso-list:Ignore"));
                                var d, f, g, u, p = e.querySelector('span[style="mso-list:Ignore"]');
                                null == p && "safari" == o && (p = e.querySelector('span[lang="PT-BR"]'));
                                var c;
                                p && (s = s || l.test(p.textContent)), null !== p && (c = p.textContent.trim().split(".")[0]), g = 1 == s ? ("1" == (c = p.textContent.trim().split(".")[0]) ? u = "decimal;" : "i" == c ? u = "lower-roman;" : "I" == c ? u = "upper-roman;" : "o" == c ? u = "circle;" : c.match(/^v$/) || (c.match(/^[a-z]$/) || c.match(/^[a-z]\)$/) ? u = "lower-alpha;" : (c.match(/^[A-Z]$/) || c.match(/^[A-Z]\)$/)) && (u = "upper-alpha;")), u = "list-style-type: " + u, "ol") : (null != p && (c = p.textContent.trim().split(".")[0]), "\xa7" == c ? u = "square;" : "\xb7" == c && (u = "disc;"), u = "list-style-type: " + u, "ul");
                                var m, h = "";
                                p == undefined || p.textContent == undefined || isNaN(parseInt(p.textContent.trim().split(".")[1], 10)) || (h = ' class="decimal_type" ');
                                var v, b = O(e), y = e.style.marginLeft;
                                if (y.includes("in") ? (v = "in", y = parseFloat(y) - .5) : y.includes("pt") && (v = "px", y = parseFloat(y) - 10), 1 == b) if (m = u ? "<" + g + ' style = "' + u + "; margin-left:" + y + v + ';">' : "<" + g + ' style="margin-left:' + y + v + ';">', "list-style-type: upper-alpha;" == u) {
                                    var x = c.charCodeAt(0) - 64;
                                    m = u ? "<" + g + h + ' start="' + x + '" style = "' + u + " margin-left:" + y + v + ';">' : "<" + g + ">"
                                } else if ("list-style-type: lower-alpha;" == u) {
                                    var C = c.charCodeAt(0) - 96;
                                    m = u ? "<" + g + h + ' start="' + C + '" style = "' + u + "margin-left:" + y + v + ';">' : "<" + g + ">"
                                } else m = u ? "<" + g + h + ' style = "' + u + ";margin-left:" + y + v + ';">' : "<" + g + ' style="margin-left:' + y + v + ';">'; else if ("list-style-type: upper-alpha;" == u) {
                                    var N = c.charCodeAt(0) - 64;
                                    m = u ? "<" + g + h + ' style = "' + u + ' start="' + N + '">' : "<" + g + ">"
                                } else if ("list-style-type: lower-alpha;" == u) {
                                    var A = c.charCodeAt(0) - 96;
                                    m = u ? "<" + g + h + ' style = "' + u + ' start="' + A + '">' : "<" + g + ">"
                                } else m = u ? "<" + g + h + ' style = "' + u + '">' : "<" + g + ">";
                                for (var E = !1; e;) {
                                    if (!H(e)) {
                                        if (e.outerHTML && 0 < e.outerHTML.indexOf("mso-bookmark") && 0 == (e.textContent || "").length) {
                                            e = e.nextElementSibling;
                                            continue
                                        }
                                        break
                                    }
                                    var T = O(e);
                                    if ((r = r || T) < T) m += (f = M(e, t, T, e.style.marginLeft)).el.outerHTML, e = f.currentNode; else {
                                        if (T < r) break;
                                        e.firstElementChild && e.firstElementChild.firstElementChild && e.firstElementChild.firstElementChild.firstChild && (l.lastIndex = 0), a && a.firstElementChild && a.firstElementChild.firstElementChild && a.firstElementChild.firstElementChild.firstChild && (l.lastIndex = 0, n = l.test(a.firstElementChild.firstElementChild.firstChild.data || a.firstElementChild.firstElementChild.firstChild.firstChild && a.firstElementChild.firstElementChild.firstChild.firstChild.data || ""));
                                        var w = !1;
                                        (!i && !e.style.marginLeft || i && e.style.marginLeft && i === e.style.marginLeft) && (w = !0), i = e.style.marginLeft, w || n === undefined ? (d = I(e, t), e.nextSibling.innerText == undefined || e.nextSibling.innerText == undefined || m.includes('class="decimal_type"') || isNaN(parseInt(e.nextSibling.innerText.trim().split(".")[1], 10)) || (m = m.substring(3, 0) + ' class="decimal_type"' + m.substring(3, m.length)), m += "<li>" + d + "</li>") : (1 == T && (m += "</" + g + ">", E = !0, a = null), m += (f = M(e, t, T, e.style.marginLeft)).el.outerHTML, e = f.currentNode);
                                        var S = e && e.nextElementSibling;
                                        if (S && (a = S.previousElementSibling), e && !H(e)) {
                                            if (e.outerHTML && 0 < e.outerHTML.indexOf("mso-bookmark") && 0 == (e.textContent || "").length) {
                                                e = e.nextElementSibling;
                                                continue
                                            }
                                            break
                                        }
                                        e && e.parentNode && e.parentNode.removeChild(e), e = S
                                    }
                                }
                                E || (m += "</" + g + ">");
                                var L = document.createElement("div");
                                return L.innerHTML = m, {el: L, currentNode: e}
                            }(e, s).el, n = null;
                            return (n = r ? r.nextSibling : t.firstChild) ? t.insertBefore(i, n) : t.appendChild(i), !1
                        }
                        return "FONT" === e.tagName && s["." + e.getAttribute("class")] && (e = y(e, "span")), h(e, s)
                    }
                    if (e.nodeType !== Node.COMMENT_NODE) return !0;
                    if (-1 < e.data.indexOf("[if !supportLineBreakNewLine]")) for (var a = e.nextSibling; a;) (a = e.nextSibling) && N(a), a.data && -1 < a.data.indexOf("[endif]") && (a = null);
                    if (-1 < e.data.indexOf("[if supportFields]") && -1 < e.data.indexOf("FORMCHECKBOX")) {
                        var l = document.createElement("input");
                        l.type = "checkbox", e.parentNode.insertBefore(l, e.nextSibling)
                    }
                    return N(e), !1
                }), p(n, function (e) {
                    if (e.nodeType === Node.ELEMENT_NODE) {
                        var t = e.tagName;
                        if (!e.innerHTML && -1 === ["BR", "IMG", "INPUT"].indexOf(t)) {
                            for (var r = e.parentNode; r && (N(e), !(e = r).innerHTML);) r = e.parentNode;
                            return !1
                        }
                        !function f(e) {
                            var t = e.getAttribute("style");
                            if (t) {
                                (t = E(t)) && ";" !== t.slice(-1) && (t += ";");
                                var r = t.match(/(^|\S+?):.+?;{1,1}/gi);
                                if (r) {
                                    for (var i = {}, n = 0; n < r.length; n++) {
                                        var a = r[n].split(":");
                                        2 === a.length && ("text-align" === a[0] && "SPAN" === e.tagName || (i[a[0]] = a[1]))
                                    }
                                    var l = "";
                                    for (var s in i) if (i.hasOwnProperty(s)) {
                                        if ("font-size" === s && "pt;" === i[s].slice(-3)) {
                                            var o = null;
                                            try {
                                                o = parseFloat(i[s].slice(0, -3), 10)
                                            } catch (d) {
                                                o = null
                                            }
                                            o && (o = Math.round(1.33 * o), i[s] = o + "px;")
                                        }
                                        l += s + ":" + i[s]
                                    }
                                    l && e.setAttribute("style", l)
                                }
                            }
                        }(e)
                    }
                    return !0
                }), p(n, function (e) {
                    if (e && "A" === e.nodeName && "" === e.href) {
                        for (var t = document.createDocumentFragment(); e.firstChild;) t.appendChild(e.firstChild);
                        e.parentNode.replaceChild(t, e)
                    }
                    return !0
                });
                var o = n.outerHTML, d = C.opts.htmlAllowedStyleProps;
                return C.opts.htmlAllowedStyleProps = C.opts.wordAllowedStyleProps, o = C.clean.html(o, C.opts.wordDeniedTags, C.opts.wordDeniedAttrs, !1), C.opts.htmlAllowedStyleProps = d, o
            }

            return {
                _init: function e() {
                    C.events.on("paste.wordPaste", function (e) {
                        return n = e, C.opts.wordPasteModal ? function a() {
                            if (!l) {
                                var e = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + C.language.translate("Word Paste Detected") + "</h4>",
                                    t = function n() {
                                        var e = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">';
                                        return e += '<p style="text-align: left;">' + C.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", e += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + C.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + C.language.translate("Keep") + "</button></div>", e += "</div>"
                                    }(), r = C.modals.create(s, e, t), i = r.$body;
                                l = r.$modal, r.$modal.addClass("fr-middle"), C.events.bindClick(i, "button.fr-remove-word", function () {
                                    var e = l.data("instance") || C;
                                    e.wordPaste.clean()
                                }), C.events.bindClick(i, "button.fr-keep-word", function () {
                                    var e = l.data("instance") || C;
                                    e.wordPaste.clean(!0)
                                }), C.events.$on(d(C.o_win), "resize", function () {
                                    C.modals.resize(s)
                                })
                            }
                            C.modals.show(s), C.modals.resize(s)
                        }() : t(C.opts.wordPasteKeepFormatting), !1
                    })
                }, clean: t, _wordClean: a
            }
        }
    });

});

;/*!node_modules/froala-editor/js/languages/zh_cn.js*/
amis.define("f2df36d", (function (e, i, a, t) {
    /*!
   * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2020 Froala Labs
   */
    var n, o;
    n = this, o = function (e) {
        "use strict";
        (e = e && e.hasOwnProperty("default") ? e.default : e).LANGUAGE.zh_cn = {
            translation: {
                "Type something": "输入内容",
                Bold: "粗体",
                Italic: "斜体",
                Underline: "下划线",
                Strikethrough: "删除线",
                Insert: "插入",
                Delete: "删除",
                Cancel: "取消",
                OK: "确定",
                Back: "后退",
                Remove: "删除",
                More: "更多",
                Update: "更新",
                Style: "样式",
                "Font Family": "字体",
                "Font Size": "字号",
                Colors: "颜色",
                Background: "背景",
                Text: "字体",
                "HEX Color": "十六进制颜色",
                "Paragraph Format": "段落格式",
                Normal: "正文",
                Code: "代码",
                "Heading 1": "标题1",
                "Heading 2": "标题2",
                "Heading 3": "标题3",
                "Heading 4": "标题4",
                "Paragraph Style": "段落样式",
                "Inline Style": "内联样式",
                Align: "对齐方式",
                "Align Left": "左对齐",
                "Align Center": "居中",
                "Align Right": "右对齐",
                "Align Justify": "两端对齐",
                None: "无",
                "Ordered List": "编号",
                "Unordered List": "项目符号",
                "Decrease Indent": "减少缩进量",
                "Increase Indent": "增加缩进量",
                "Insert Link": "插入超链接",
                "Open in new tab": "在新标签页中打开",
                "Open Link": "打开超链接",
                "Edit Link": "编辑超链接",
                Unlink: "删除超链接",
                "Choose Link": "选择超链接",
                "Insert Image": "插入图片",
                "Upload Image": "上传图片",
                "By URL": "通过 URL",
                Browse: "浏览",
                "Drop image": "拖入图片",
                "or click": "或点击",
                "Manage Images": "管理图片",
                Loading: "加载中",
                Deleting: "删除中",
                Tags: "标签",
                "Are you sure? Image will be deleted.": "图片将会被删除，是否确认？",
                Replace: "替换",
                Uploading: "上传中",
                "Loading image": "图片加载中",
                Display: "显示",
                Inline: "嵌入型",
                "Break Text": "上下型环绕",
                "Alternative Text": "替换文字",
                "Change Size": "改变大小",
                Width: "宽度",
                Height: "高度",
                "Something went wrong. Please try again.": "发生错误，请重试。",
                "Image Caption": "图片标题",
                "Advanced Edit": "高级编辑",
                "Insert Video": "插入视频",
                "Embedded Code": "嵌入代码",
                "Paste in a video URL": "粘贴视频网址",
                "Drop video": "拖入视频",
                "Your browser does not support HTML5 video.": "您的浏览器不支持 HTML5 视频。",
                "Upload Video": "上传视频",
                "Insert Table": "插入表格",
                "Table Header": "表头",
                "Remove Table": "删除表格",
                "Table Style": "表格样式",
                "Horizontal Align": "水平对齐方式",
                Row: "行",
                "Insert row above": "在上方插入",
                "Insert row below": "在下方插入",
                "Delete row": "删除行",
                Column: "列",
                "Insert column before": "在左侧插入",
                "Insert column after": "在右侧插入",
                "Delete column": "删除列",
                Cell: "单元格",
                "Merge cells": "合并单元格",
                "Horizontal split": "水平分割",
                "Vertical split": "垂直分割",
                "Cell Background": "单元格背景",
                "Vertical Align": "垂直对齐方式",
                Top: "靠上",
                Middle: "居中",
                Bottom: "靠下",
                "Align Top": "靠上对齐",
                "Align Middle": "居中对齐",
                "Align Bottom": "靠下对齐",
                "Cell Style": "单元格样式",
                "Upload File": "上传文件",
                "Drop file": "拖入文件",
                Emoticons: "表情符号",
                "Grinning face": "露齿笑脸",
                "Grinning face with smiling eyes": "露齿笑到眯起眼",
                "Face with tears of joy": "笑哭",
                "Smiling face with open mouth": "张嘴微笑",
                "Smiling face with open mouth and smiling eyes": "眯眼张嘴微笑",
                "Smiling face with open mouth and cold sweat": "带冷汗的张嘴微笑",
                "Smiling face with open mouth and tightly-closed eyes": "紧闭双眼张嘴微笑",
                "Smiling face with halo": "带光环微笑",
                "Smiling face with horns": "带牛角的微笑",
                "Winking face": "眨眼",
                "Smiling face with smiling eyes": "眯眼微笑",
                "Face savoring delicious food": "馋",
                "Relieved face": "如释重负",
                "Smiling face with heart-shaped eyes": "桃心眼微笑",
                "Smiling face with sunglasses": "戴太阳镜微笑",
                "Smirking face": "得意地笑",
                "Neutral face": "中性脸",
                "Expressionless face": "面无表情",
                "Unamused face": "不高兴",
                "Face with cold sweat": "冷汗",
                "Pensive face": "沉思",
                "Confused face": "迷惑",
                "Confounded face": "困惑",
                "Kissing face": "嘴巴嘟嘟",
                "Face throwing a kiss": "飞吻",
                "Kissing face with smiling eyes": "眯眼接吻",
                "Kissing face with closed eyes": "闭眼接吻",
                "Face with stuck out tongue": "吐舌",
                "Face with stuck out tongue and winking eye": "眨眼吐舌",
                "Face with stuck out tongue and tightly-closed eyes": "眯眼吐舌",
                "Disappointed face": "失望",
                "Worried face": "担心",
                "Angry face": "生气",
                "Pouting face": "撅嘴",
                "Crying face": "大哭",
                "Persevering face": "坚强",
                "Face with look of triumph": "扬眉吐气",
                "Disappointed but relieved face": "失望",
                "Frowning face with open mouth": "皱眉",
                "Anguished face": "痛苦",
                "Fearful face": "害怕",
                "Weary face": "疲惫",
                "Sleepy face": "困了",
                "Tired face": "累了",
                "Grimacing face": "扭曲脸",
                "Loudly crying face": "大哭",
                "Face with open mouth": "张开嘴",
                "Hushed face": "安静",
                "Face with open mouth and cold sweat": "冷汗",
                "Face screaming in fear": "害怕尖叫",
                "Astonished face": "惊讶",
                "Flushed face": "脸红",
                "Sleeping face": "熟睡",
                "Dizzy face": "眩晕",
                "Face without mouth": "没有嘴的脸",
                "Face with medical mask": "口罩脸",
                Break: "换行",
                Subscript: "下标",
                Superscript: "上标",
                Fullscreen: "全屏",
                "Insert Horizontal Line": "插入水平线",
                "Clear Formatting": "清除格式",
                Save: "保存",
                Undo: "撤消",
                Redo: "恢复",
                "Select All": "全选",
                "Code View": "代码视图",
                Quote: "引用",
                Increase: "增加引用级别",
                Decrease: "减少引用级别",
                "Quick Insert": "快速插入",
                "Special Characters": "特殊字符",
                Latin: "拉丁字母",
                Greek: "希腊字母",
                Cyrillic: "西里尔字母",
                Punctuation: "标点",
                Currency: "货币",
                Arrows: "箭头",
                Math: "数学",
                Misc: "杂项",
                Print: "打印",
                "Spell Checker": "拼写检查器",
                Help: "帮助",
                Shortcuts: "快捷键",
                "Inline Editor": "内联编辑器",
                "Show the editor": "显示编辑器",
                "Common actions": "常用操作",
                Copy: "复制",
                Cut: "剪切",
                Paste: "粘贴",
                "Basic Formatting": "基本格式",
                "Increase quote level": "增加引用级别",
                "Decrease quote level": "减少引用级别",
                "Image / Video": "图像/视频",
                "Resize larger": "放大",
                "Resize smaller": "缩小",
                Table: "表格",
                "Select table cell": "选择单元格",
                "Extend selection one cell": "增加选中的单元格",
                "Extend selection one row": "增加选中的行",
                Navigation: "导航",
                "Focus popup / toolbar": "焦点弹出/工具栏",
                "Return focus to previous position": "将焦点返回到上一个位置",
                "Embed URL": "嵌入网址",
                "Paste in a URL to embed": "粘贴要嵌入的网址",
                "The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?": "粘贴的内容来自微软 Word 文档。你想保留还是清除格式？",
                Keep: "保留",
                Clean: "清除",
                "Word Paste Detected": "检测到粘贴自 Word 的内容",
                Characters: "字数统计",
                "More Text": " 更多文字",
                "More Paragraph": "更多段落",
                "More Rich": "更多丰富",
                "More Misc": "更多杂项"
            }, direction: "ltr"
        }
    }, "object" == typeof i && void 0 !== a ? o(e("6068935")) : "function" == typeof t && t.amd ? t(["froala-editor"], o) : o(n.FroalaEditor)
}));
;/*!node_modules/amis-ui/lib/components/RichText.js*/
amis.define("e1c0a64", (function (t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var o = t("4454178"), s = t("9e5f0aa"), r = t("6068935"), d = t("6068935");

    function l(t) {
        return t && "object" == typeof t && "default" in t ? t : {default: t}
    }

    t("c54224f"), t("c5748df"), t("8e07b58"), t("a28273e"), t("73ed191"), t("9f4df6a"), t("f336663"), t("b1a619e"), t("0549905"), t("693ad90"), t("bb21efb"), t("80447f4"), t("3c88fdf"), t("0b107ab"), t("f8844f6"), t("3380b99"), t("124909a"), t("0a183d8"), t("cf912ed"), t("823b46e"), t("0226bb9"), t("c13021d"), t("a67aae6"), t("6007122"), t("70939b9"), t("f73f87d"), t("aaa4c7f"), t("4fd7922"), t("58e7c51"), t("f2df36d");
    var a = l(s), f = l(r), h = l(d), c = function (t) {
        function e(e) {
            var i = t.call(this, e) || this;
            return i.listeningEvents = [], i.element = null, i.editor = null, i.config = {
                immediateReactModelUpdate: !1,
                reactIgnoreAttrs: null
            }, i.editorInitialized = !1, i.INNER_HTML_ATTR = "innerHTML", i.oldModel = null, i
        }

        return o.__extends(e, t), e.prototype.componentDidMount = function () {
            this.createEditor()
        }, e.prototype.componentWillUnmount = function () {
            this.destroyEditor()
        }, e.prototype.componentDidUpdate = function () {
            JSON.stringify(this.oldModel) != JSON.stringify(this.props.model) && this.setContent()
        }, e.prototype.clone = function (t) {
            var e, i = this;
            if (!t) return t;
            if ([Number, String, Boolean].forEach((function (i) {
                t instanceof i && (e = i(t))
            })), void 0 === e) if ("[object Array]" === Object.prototype.toString.call(t)) e = [], t.forEach((function (t, n, o) {
                e[n] = i.clone(t)
            })); else if ("object" == typeof t) if (t.nodeType && "function" == typeof t.cloneNode) e = t.cloneNode(!0); else if (t.prototype) e = t; else if (t instanceof Date) e = new Date(t); else for (var n in e = {}, t) e[n] = i.clone(t[n]); else e = t;
            return e
        }, e.prototype.createEditor = function () {
            var t = this;
            this.editorInitialized || (this.config = this.clone(this.props.config || this.config), this.config = o.__assign({}, this.config), this.element = this.el, this.props.model && (this.element.innerHTML = this.props.model), this.setContent(), this.registerEvent("initialized", this.config.events && this.config.events.initialized), this.config.events || (this.config.events = {}), this.config.events.initialized = function () {
                t.editorInitialized = !0, t.initListeners()
            }, this.editor = new f.default(this.element, this.config))
        }, e.prototype.setContent = function () {
            var t = this;
            (this.props.model || "" == this.props.model) && (this.oldModel = this.props.model, this.editorInitialized ? this.setNormalTagContent() : (this._initEvents || (this._initEvents = []), this._initEvents.push((function () {
                return t.setNormalTagContent()
            }))))
        }, e.prototype.setNormalTagContent = function () {
            var t = this;
            t.editor.html && t.editor.html.set(t.props.model || ""), t.editorInitialized && t.editor.undo && (t.editor.undo.reset(), t.editor.undo.saveStep())
        }, e.prototype.destroyEditor = function () {
            this.element && (this.editor.destroy && this.editor.destroy(), this.listeningEvents.length = 0, this.element = null, this.editorInitialized = !1, this._initEvents = [])
        }, e.prototype.getEditor = function () {
            return this.element ? this.editor : null
        }, e.prototype.updateModel = function () {
            if (this.props.onModelChange) {
                var t = "", e = this.editor.html.get();
                "string" == typeof e && (t = e), this.oldModel = t, this.props.onModelChange(t)
            }
        }, e.prototype.initListeners = function () {
            var t = this;
            if (this.editor.events.on("contentChanged", (function () {
                t.updateModel()
            })), this.config.immediateReactModelUpdate && this.editor.events.on("keyup", (function () {
                t.updateModel()
            })), this._initEvents) for (var e = 0; e < this._initEvents.length; e++) this._initEvents[e].call(this.editor)
        }, e.prototype.registerEvent = function (t, e) {
            t && e && ("initialized" == t ? (this._initEvents || (this._initEvents = []), this._initEvents.push(e)) : (this.config.events || (this.config.events = {}), this.config.events[t] = e))
        }, e.prototype.render = function () {
            var t = this;
            return a.default.createElement("textarea", {
                ref: function (e) {
                    return t.el = e
                }
            }, this.props.children)
        }, e
    }(a.default.Component), p = function (t) {
        function e(e) {
            var i = t.call(this, e) || this;
            return h.default.VIDEO_PROVIDERS = [{
                test_regex: /.*/,
                url_regex: "",
                url_text: "",
                html: '<span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true"><video class="fr-draggable" controls="" data-msg="ok" data-status="0" src="{url}" style="width: 600px;"></video></span>'
            }], i
        }

        return o.__extends(e, t), e.prototype.render = function () {
            return a.default.createElement(c, {
                config: this.props.config,
                model: this.props.model,
                onModelChange: this.props.onModelChange
            })
        }, e
    }(a.default.Component);
    e.default = p
}));