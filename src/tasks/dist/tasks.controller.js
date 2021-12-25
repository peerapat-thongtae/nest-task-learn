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
var TasksController = /** @class */ (function () {
    function TasksController(tasksService) {
        this.tasksService = tasksService;
    }
    // @Get()
    // getAllTasks(): Task[] {
    //   return this.tasksService.getAllTasks();
    // }
    TasksController.prototype.getTaskById = function (id) {
        return this.tasksService.getTaskById(id);
    };
    // @Delete(':id')
    // deleteTaskById(@Param('id') id: string): boolean {
    //   return this.tasksService.deleteTaskById(id);
    // }
    TasksController.prototype.createTask = function (createTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    };
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], TasksController.prototype, "getTaskById");
    __decorate([
        common_1.Post(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], TasksController.prototype, "createTask");
    TasksController = __decorate([
        common_1.Controller('tasks')
    ], TasksController);
    return TasksController;
}());
exports.TasksController = TasksController;
