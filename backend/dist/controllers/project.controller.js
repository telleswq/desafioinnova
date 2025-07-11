"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_service_1 = require("../services/project.service");
const create_project_dto_1 = require("../dto/create-project.dto");
const update_project_dto_1 = require("../dto/update-project.dto");
const project_entity_1 = require("../entities/project.entity");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async findAll() {
        return await this.projectService.findAll();
    }
    async findOne(id) {
        return await this.projectService.findOne(id);
    }
    async create(createProjectDto) {
        return await this.projectService.create(createProjectDto);
    }
    async update(id, updateProjectDto) {
        return await this.projectService.update(id, updateProjectDto);
    }
    async updateStatus(id, status) {
        return await this.projectService.updateStatus(id, status);
    }
    async remove(id) {
        await this.projectService.remove(id);
        return {};
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os projetos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de projetos', type: [project_entity_1.Project] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar projeto por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do projeto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Projeto encontrado', type: project_entity_1.Project }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Projeto não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo projeto' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Projeto criado com sucesso', type: project_entity_1.Project }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar projeto' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do projeto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Projeto atualizado com sucesso', type: project_entity_1.Project }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Projeto não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar status do projeto' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do projeto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status atualizado com sucesso', type: project_entity_1.Project }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Projeto não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "remove", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map