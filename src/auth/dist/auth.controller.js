"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    AuthController.prototype.signUp = function (authCredentials) {
        return this.authService.signUp(authCredentials);
    };
    AuthController.prototype.signIn = function (authCredentials) {
        return this.authService.signIn(authCredentials);
    };
    AuthController.prototype.test = function (req) {
        console.log(req);
    };
    __decorate([
        common_1.Post('signup'),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], AuthController.prototype, "signUp");
    __decorate([
        common_1.Post('signin'),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], AuthController.prototype, "signIn");
    __decorate([
        common_1.Post('test'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Req())
    ], AuthController.prototype, "test");
    AuthController = __decorate([
        common_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
