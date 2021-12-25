"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TasksService = void 0;
var common_1 = require("@nestjs/common");
var tasks_model_1 = require("./tasks.model");
var uuid = require("uuid");
var TasksService = /** @class */ (function () {
    function TasksService() {
        this.tasks = [];
    }
    TasksService.prototype.getAllTasks = function () {
        return this.tasks;
    };
    TasksService.prototype.getTaskById = function (id) {
        return this.tasks.find(function (task) { return task.id === id; });
    };
    TasksService.prototype.deleteTaskById = function (id) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== id; });
        return true;
    };
    TasksService.prototype.createTask = function (createTaskDto) {
        var title = createTaskDto.title, description = createTaskDto.description;
        var task = {
            id: uuid.v1(),
            title: title,
            description: description,
            status: tasks_model_1.TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    };
    TasksService = __decorate([
        common_1.Injectable()
    ], TasksService);
    return TasksService;
}());
exports.TasksService = TasksService;