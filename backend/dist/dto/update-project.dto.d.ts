import { ProjectStatus } from '../entities/project.entity';
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    responsible?: string;
    status?: ProjectStatus;
}
