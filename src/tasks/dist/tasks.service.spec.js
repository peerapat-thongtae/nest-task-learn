"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var testing_1 = require("@nestjs/testing");
var task_status_enum_1 = require("./enum/task-status.enum");
var tasks_repository_1 = require("./tasks.repository");
var tasks_service_1 = require("./tasks.service");
var mockTaskRepository = function () { return ({
    getAllTasks: jest.fn(),
    findOne: jest.fn(),
    getTaskById: jest.fn()
}); };
var mockUser = { id: 12, username: 'test' };
describe('TaskService', function () {
    var tasksService;
    var taskRepository;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            tasks_service_1.TasksService,
                            { provide: tasks_repository_1.TaskRepository, useFactory: mockTaskRepository },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    return [4 /*yield*/, module.get(tasks_service_1.TasksService)];
                case 2:
                    tasksService = _a.sent();
                    return [4 /*yield*/, module.get(tasks_repository_1.TaskRepository)];
                case 3:
                    taskRepository = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('get Tasks', function () {
        it('get all tasks from repository', function () { return __awaiter(void 0, void 0, void 0, function () {
            var filters, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskRepository.getAllTasks.mockResolvedValue('someValue');
                        expect(taskRepository.getAllTasks).not.toHaveBeenCalled();
                        filters = {
                            status: task_status_enum_1.TaskStatus.IN_PROGRESS,
                            search: ''
                        };
                        return [4 /*yield*/, tasksService.getAllTasks(filters, mockUser)];
                    case 1:
                        result = _a.sent();
                        expect(taskRepository.getAllTasks).toHaveBeenCalled();
                        expect(result).toEqual('someValue');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('get task by id', function () {
        it('find one and successful', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockTask, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTask = {
                            title: 'test title',
                            description: 'test description'
                        };
                        taskRepository.findOne.mockResolvedValue(mockTask);
                        return [4 /*yield*/, tasksService.getTaskById(1, mockUser)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockTask);
                        expect(taskRepository.findOne).toHaveBeenCalledWith({
                            where: { id: 1, userId: mockUser.id }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('throw error task not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                taskRepository.findOne.mockResolvedValue(null);
                expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(common_1.NotFoundException);
                return [2 /*return*/];
            });
        }); });
    });
});
