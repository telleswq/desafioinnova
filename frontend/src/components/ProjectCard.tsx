import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Project, ProjectStatus } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ProjectStatus) => void;
}

const statusColors = {
  [ProjectStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ProjectStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ProjectStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
};

const statusLabels = {
  [ProjectStatus.PENDING]: 'Pendente',
  [ProjectStatus.IN_PROGRESS]: 'Em Progresso',
  [ProjectStatus.COMPLETED]: 'Concluído',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Responsável: {project.responsible}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(project)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(project.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{project.description}</p>
        
        <div className="flex items-center justify-between">
          <Badge 
            className={`${statusColors[project.status]} border`}
            variant="outline"
          >
            {statusLabels[project.status]}
          </Badge>
          
          <div className="flex gap-2">
            {project.status !== ProjectStatus.PENDING && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStatusChange(project.id, ProjectStatus.PENDING)}
              >
                Pendente
              </Button>
            )}
            {project.status !== ProjectStatus.IN_PROGRESS && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStatusChange(project.id, ProjectStatus.IN_PROGRESS)}
              >
                Em Progresso
              </Button>
            )}
            {project.status !== ProjectStatus.COMPLETED && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStatusChange(project.id, ProjectStatus.COMPLETED)}
              >
                Concluído
              </Button>
            )}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 pt-2 border-t">
          <div>Criado em: {formatDate(project.createdAt)}</div>
          <div>Atualizado em: {formatDate(project.updatedAt)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

