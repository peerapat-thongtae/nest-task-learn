"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterTaskDto = void 0;
var class_validator_1 = require("class-validator");
var task_status_enum_1 = require("../enum/task-status.enum");
var FilterTaskDto = /** @class */ (function () {
    function FilterTaskDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(task_status_enum_1.TaskStatus)
    ], FilterTaskDto.prototype, "status");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNotEmpty()
    ], FilterTaskDto.prototype, "search");
    return FilterTaskDto;
}());
exports.FilterTaskDto = FilterTaskDto;
