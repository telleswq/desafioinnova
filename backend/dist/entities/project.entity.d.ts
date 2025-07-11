export declare enum ProjectStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Project {
    id: string;
    name: string;
    description: string;
    responsible: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}
