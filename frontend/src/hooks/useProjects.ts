import { useState, useEffect } from 'react';
import { Project, CreateProjectDto, UpdateProjectDto, ProjectStatus } from '../types/project';
import { apiService } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: CreateProjectDto): Promise<Project | null> => {
    try {
      setError(null);
      const newProject = await apiService.createProject(data);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar projeto');
      return null;
    }
  };

  const updateProject = async (id: string, data: UpdateProjectDto): Promise<Project | null> => {
    try {
      setError(null);
      const updatedProject = await apiService.updateProject(id, data);
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar projeto');
      return null;
    }
  };

  const updateProjectStatus = async (id: string, status: ProjectStatus): Promise<Project | null> => {
    try {
      setError(null);
      const updatedProject = await apiService.updateProjectStatus(id, status);
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status do projeto');
      return null;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await apiService.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir projeto');
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
  };
};

