/*
 * auto-csrf.js
 * version: 1.0.0
 * author: Yori Hadi Putra <yori.haput@gmail.com>
 * license: MIT
 * https://github.com/yorihaput/Auto-CSRF-Codeigniter
 */
((_r, _af, _ff) => {
    "use strict";
    if(document.cookie.get == undefined) {
        document.cookie.__proto__.get = function(name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        }
    }

    if(_r.csrf_name !== undefined) {
        if(_r.csrf_value == undefined) _r.csrf_value = document.cookie.get(csrf_name);
        if(_r.jQuery !== undefined) {
            _af(_r.csrf_name, _r.csrf_value, _r.jQuery.ajaxPrefilter);
        }
        _ff(_r.csrf_name, _r.csrf_value);
    }else{
        console.error("CSRF_NAME variable undefined please define this variable first");
    }
})(this, function(_cn, _cv, _ap) {
    "use strict";
    _ap(function(o){
        if (o.type.toLowerCase() === "post") {
            _cv = document.cookie.get(_cn);
            if(o.processData == false && o.data.constructor.name == 'FormData'){
                o.data.append(_cn, _cv);
            }else{
                o.data = o.data || "";
                o.data += o.data?"&":"";
                o.data += _cn + "=" + encodeURIComponent(_cv);
            }
        }
    });
}, function(_cn, _cv) {
    document.addEventListener('DOMContentLoaded', function(e) {
        for(let el of document.forms) {
            el.addEventListener('submit', function(e) {
                _cv = document.cookie.get(_cn);
                if(typeof el[_cn] != 'undefined') {
                    el[_cn].value =_cv;
                }else{
                    let x = document.createElement("input");
                    x.setAttribute("name", _cn);
                    x.setAttribute("type", "hidden");
                    x.setAttribute("value", _cv);
                    el.appendChild(x);
                }
            });

            el._submit = el.submit;
            el.submit = function() {
                this.dispatchEvent(new Event('submit'));
                this._submit();
            }
        }
    }, false);
});
