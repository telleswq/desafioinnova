import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    updateStatus(id: string, status: ProjectStatus): Promise<Project>;
    remove(id: string): Promise<object>;
}
