/**
/* ===================================================
 *  jquery-remote-js-scope.js v1.0.0
 *  https://github.com/xire28/jquery-remote-js-scope
 * ===================================================
 * 
 * Provide a simple way to pass variables to a remote js response
 *
 * Requires
 *   - JQuery 1.8.0 or later (https://github.com/jquery/jquery)
 *
 * Released under the MIT license
 *
 */
(function($, window, document) {
    var name = 'ajax_request_id',
        requests = $.requests = {},
        id = 1
    $(document).ajaxSend(function(e, request, options) {
        if (options.scope) {
            requests[id] = options.scope
            if (options.data instanceof window.FormData) {
                options.data.append(name, id)
            } else {
                switch ($.type(options.data)) {
                    case 'string':
                        options.data += '&' + name + '=' + id;
                        break;
                    case 'object':
                        options.data[name] = id;
                        break;
                }
            }
            requests[id] = options.scope
            id++;
        }
    })
})(jQuery, window, document)