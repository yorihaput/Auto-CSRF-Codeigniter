/*
 * auto-csrf.js
 * version: 2.0.2
 * author: Yori Hadi Putra <yori.haput@gmail.com>
 * license: MIT
 * https://github.com/yorihaput/Auto-CSRF-Codeigniter
 */
((_r, _af, _ff) => {
    "use strict";
    if (_r.csrf_name !== undefined) {
        if (_r.csrf_value != undefined) localStorage.setItem(_r.csrf_name, _r.csrf_value);

        if (_r.jQuery !== undefined) {
            _af(_r.csrf_name, _r.csrf_value, _r.jQuery.ajaxPrefilter);
            _r.jQuery(document).ajaxComplete(function (e, x, s) {
                localStorage.setItem(_r.csrf_name, x.getResponseHeader('resp-hash'));
            });
        }
        _ff(_r.csrf_name, _r.csrf_value);
    } else {
        console.error("CSRF_NAME variable undefined please define this variable first");
    }
})(this, function (_cn, _cv, _ap, _as) {
    "use strict";
    _ap(function (o) {
        if (o.type.toLowerCase() === "post") {
            _cv = localStorage.getItem(_cn);
            if (o.processData == false && o.data.constructor.name == 'FormData') {
                o.data.append(_cn, _cv);
            } else {
                o.data = o.data || "";
                o.data += o.data ? "&" : "";
                o.data += _cn + "=" + encodeURIComponent(_cv);
            }
        }
    });
}, function (_cn, _cv) {
    document.addEventListener('DOMContentLoaded', function (e) {
        for (let el of document.forms) {
            el.addEventListener('submit', function (e) {
                _cv = localStorage.getItem(_cn);
                if (typeof el[_cn] != 'undefined') {
                    el[_cn].value = _cv;
                } else {
                    let x = document.createElement("input");
                    x.setAttribute("name", _cn);
                    x.setAttribute("type", "hidden");
                    x.setAttribute("value", _cv);
                    el.appendChild(x);
                }
            });

            el._submit = el.submit;
            el.submit = function () {
                this.dispatchEvent(new Event('submit'));
                this._submit();
            }
        }
    }, false);

    let _fetch = window.fetch;
    window.fetch = (input, init = {}) => {
        if (init.headers && init.headers["Content-Type"] && init.headers["Content-Type"] == "application/json") {
            if (init.method && init.method.toLowerCase() == 'post') {
                try {
                    let _body = JSON.parse(init.body);
                    _body[_cn] = _cv;
                    init.body = JSON.stringify(_body);
                } catch (error) { console.error(error); }
            }
        }
        return _fetch(input, init);
    }
});
