"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = exports.InMemoryDataSource = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../entities/project.entity");
exports.InMemoryDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [project_entity_1.Project],
    synchronize: true,
    logging: false,
});
const seedData = async (dataSource) => {
    const projectRepository = dataSource.getRepository(project_entity_1.Project);
    const existingProjects = await projectRepository.count();
    if (existingProjects > 0) {
        return;
    }
    const initialProjects = [
        {
            name: 'Missão X',
            description: 'Operação de alta prioridade',
            responsible: 'Deadpool',
            status: project_entity_1.ProjectStatus.IN_PROGRESS,
        },
        {
            name: 'Projeto X',
            description: 'Desenvolvimento de nova estratégia',
            responsible: 'Tony Stark',
            status: project_entity_1.ProjectStatus.PENDING,
        },
        {
            name: 'Operação X',
            description: 'Missão concluída com sucesso',
            responsible: 'Hulk',
            status: project_entity_1.ProjectStatus.COMPLETED,
        },
    ];
    for (const projectData of initialProjects) {
        const project = projectRepository.create(projectData);
        await projectRepository.save(project);
    }
    console.log('Dados iniciais inseridos com sucesso!');
};
exports.seedData = seedData;
//# sourceMappingURL=in-memory.datasource.js.map