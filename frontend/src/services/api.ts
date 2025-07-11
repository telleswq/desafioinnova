import { Project, CreateProjectDto, UpdateProjectDto, ProjectStatus } from '../types/project';

const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (options?.method === 'DELETE') {
      return;
    }

    return response.json();
  }

  // Listar todos os projetos
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  // Buscar projeto por ID
  async getProject(id: string): Promise<Project> {
    return this.request<Project>(`/projects/${id}`);
  }

  // Criar novo projeto
  async createProject(data: CreateProjectDto): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Atualizar projeto
  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Atualizar status do projeto
  async updateProjectStatus(id: string, status: ProjectStatus): Promise<Project> {
    return this.request<Project>(`/projects/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Remover projeto
  async deleteProject(id: string): Promise<void> {
    await this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();

