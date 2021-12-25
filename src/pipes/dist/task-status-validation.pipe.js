"use strict";
exports.__esModule = true;
exports.TaskStatusValidationPipe = void 0;
var common_1 = require("@nestjs/common");
var task_status_enum_1 = require("src/tasks/enum/task-status.enum");
var TaskStatusValidationPipe = /** @class */ (function () {
    function TaskStatusValidationPipe() {
        this.allowedStatuses = [
            task_status_enum_1.TaskStatus.OPEN,
            task_status_enum_1.TaskStatus.IN_PROGRESS,
            task_status_enum_1.TaskStatus.DONE,
        ];
    }
    TaskStatusValidationPipe.prototype.transform = function (value) {
        console.log(value);
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(value + " is invalid status");
        }
        return value;
    };
    TaskStatusValidationPipe.prototype.isStatusValid = function (status) {
        var idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    };
    return TaskStatusValidationPipe;
}());
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
