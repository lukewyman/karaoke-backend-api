"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middify = void 0;
var core_1 = require("@middy/core");
var http_json_body_parser_1 = require("@middy/http-json-body-parser");
var http_cors_1 = require("@middy/http-cors");
var middify = function (handler) {
    return core_1.default(handler).use(http_json_body_parser_1.default()).use(http_cors_1.default());
};
exports.middify = middify;
//# sourceMappingURL=middify.js.map