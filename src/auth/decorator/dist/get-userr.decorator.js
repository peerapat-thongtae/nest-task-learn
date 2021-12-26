"use strict";
exports.__esModule = true;
exports.GetUser = void 0;
var common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator(function (data, req) {
    console.log(data);
    return req.user;
});
