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
exports.TasksController = void 0;
var common_1 = require("@nestjs/common");
var task_status_validation_pipe_1 = require("src/pipes/task-status-validation.pipe");
var TasksController = /** @class */ (function () {
    function TasksController(tasksService) {
        this.tasksService = tasksService;
    }
    TasksController.prototype.getAllTasks = function (filterDto) {
        return this.tasksService.getAllTasks(filterDto);
    };
    TasksController.prototype.getTaskById = function (id) {
        return this.tasksService.getTaskById(id);
    };
    TasksController.prototype.deleteTaskById = function (id) {
        return this.tasksService.deleteTaskById(id);
    };
    TasksController.prototype.createTask = function (createTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    };
    TasksController.prototype.updateTaskStatus = function (id, status) {
        return this.tasksService.updateTaskStatus(id, status);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query(common_1.ValidationPipe))
    ], TasksController.prototype, "getAllTasks");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], TasksController.prototype, "getTaskById");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], TasksController.prototype, "deleteTaskById");
    __decorate([
        common_1.Post(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], TasksController.prototype, "createTask");
    __decorate([
        common_1.Patch(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body('status', task_status_validation_pipe_1.TaskStatusValidationPipe))
    ], TasksController.prototype, "updateTaskStatus");
    TasksController = __decorate([
        common_1.Controller('tasks')
    ], TasksController);
    return TasksController;
}());
exports.TasksController = TasksController;
