import { DataSource } from 'typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';

export const InMemoryDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [Project],
  synchronize: true,
  logging: false,
});

// Dados iniciais banco 
export const seedData = async (dataSource: DataSource) => {
  const projectRepository = dataSource.getRepository(Project);

  // Verificar se já existem dados
  const existingProjects = await projectRepository.count();
  if (existingProjects > 0) {
    return;
  }

  const initialProjects = [
    {
      name: 'Missão X',
      description: 'Operação de alta prioridade',
      responsible: 'Deadpool',
      status: ProjectStatus.IN_PROGRESS,
    },
    {
      name: 'Projeto X',
      description: 'Desenvolvimento de nova estratégia',
      responsible: 'Tony Stark',
      status: ProjectStatus.PENDING,
    },
    {
      name: 'Operação X',
      description: 'Missão concluída com sucesso',
      responsible: 'Hulk',
      status: ProjectStatus.COMPLETED,
    },
  ];

  for (const projectData of initialProjects) {
    const project = projectRepository.create(projectData);
    await projectRepository.save(project);
  }

  console.log('Dados iniciais inseridos com sucesso!');
};

