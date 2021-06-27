"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJSONResponse = void 0;
var formatJSONResponse = function (statusCode, response) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(response),
    };
};
exports.formatJSONResponse = formatJSONResponse;
//# sourceMappingURL=formatJsonResponse.js.map