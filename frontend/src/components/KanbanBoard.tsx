import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Project, ProjectStatus } from '../types/project';

interface KanbanBoardProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ProjectStatus) => void;
}

const statusColumns = [
  {
    status: ProjectStatus.PENDING,
    title: 'Pendente',
    color: 'bg-black border-red-500/30',
    headerColor: 'bg-red-900/50 text-red-200',
  },
  {
    status: ProjectStatus.IN_PROGRESS,
    title: 'Em Progresso',
    color: 'bg-black border-red-500/30',
    headerColor: 'bg-red-900/50 text-red-200',
  },
  {
    status: ProjectStatus.COMPLETED,
    title: 'Concluído',
    color: 'bg-black border-red-500/30',
    headerColor: 'bg-red-900/50 text-red-200',
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projects,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getProjectsByStatus = (status: ProjectStatus) => {
    return projects.filter(project => project.status === status);
  };

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    onStatusChange(projectId, newStatus);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {statusColumns.map(column => {
        const columnProjects = getProjectsByStatus(column.status);
        
        return (
          <div key={column.status} className={`rounded-lg border-2 ${column.color} p-4`}>
            <div className={`rounded-md px-3 py-2 mb-4 ${column.headerColor}`}>
              <h3 className="font-semibold text-center">
                {column.title} ({columnProjects.length})
              </h3>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {columnProjects.map(project => (
                <Card key={project.id} className="bg-black border-red-500/30 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-sm font-medium leading-tight text-white">
                        {project.name}
                      </CardTitle>
                      <p className="text-xs text-gray-400">
                        {project.responsible}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black border-red-500/30">
                        <DropdownMenuItem onClick={() => onEdit(project)} className="text-gray-200 hover:bg-red-900/50">
                          <Edit className="mr-2 h-3 w-3" />
                          Editar
                        </DropdownMenuItem>
                        {column.status !== ProjectStatus.PENDING && (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(project.id, ProjectStatus.PENDING)}
                            className="text-gray-200 hover:bg-red-900/50"
                          >
                            Mover para Pendente
                          </DropdownMenuItem>
                        )}
                        {column.status !== ProjectStatus.IN_PROGRESS && (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(project.id, ProjectStatus.IN_PROGRESS)}
                            className="text-gray-200 hover:bg-red-900/50"
                          >
                            Mover para Em Progresso
                          </DropdownMenuItem>
                        )}
                        {column.status !== ProjectStatus.COMPLETED && (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(project.id, ProjectStatus.COMPLETED)}
                            className="text-gray-200 hover:bg-red-900/50"
                          >
                            Mover para Concluído
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => onDelete(project.id)}
                          className="text-red-400 hover:bg-red-900/50"
                        >
                          <Trash2 className="mr-2 h-3 w-3" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      <div>Criado: {formatDate(project.createdAt)}</div>
                      <div>Atualizado: {formatDate(project.updatedAt)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {columnProjects.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-8">
                  Nenhum projeto nesta coluna
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

