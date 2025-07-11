import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Plus, Grid3X3, List, AlertCircle } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectForm } from './components/ProjectForm';
import { KanbanBoard } from './components/KanbanBoard';
import { AuthWrapper } from './components/AuthWrapper';
import { useProjects } from './hooks/useProjects';
import { Project, CreateProjectDto, ProjectStatus } from './types/project';
import './App.css';

function ProjectManagement() {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
  } = useProjects();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProject = async (data: CreateProjectDto) => {
    setIsSubmitting(true);
    const success = await createProject(data);
    if (success) {
      setIsFormOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleEditProject = async (data: CreateProjectDto) => {
    if (!editingProject) return;
    
    setIsSubmitting(true);
    const success = await updateProject(editingProject.id, data);
    if (success) {
      setEditingProject(null);
      setIsFormOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      await deleteProject(id);
    }
  };

  const handleStatusChange = async (id: string, status: ProjectStatus) => {
    await updateProjectStatus(id, status);
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black shadow-sm border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Gestão de Projetos
              </h1>
              <p className="text-gray-400 mt-1">
                Gerencie seus projetos de forma eficiente
              </p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4" />
              Novo Projeto
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-black border-red-500/30">
            <TabsTrigger value="kanban" className="flex items-center gap-2 text-gray-400 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <Grid3X3 className="h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2 text-gray-400 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <List className="h-4 w-4" />
              Lista
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-6">
            <KanbanBoard
              projects={projects}
              onEdit={openEditForm}
              onDelete={handleDeleteProject}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Grid3X3 className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-gray-400 mb-4">
                  Comece criando seu primeiro projeto.
                </p>
                <Button onClick={() => setIsFormOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Projeto
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={openEditForm}
                    onDelete={handleDeleteProject}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <ProjectForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingProject ? handleEditProject : handleCreateProject}
        project={editingProject}
        isLoading={isSubmitting}
      />
    </div>
  );
}

function App() {
  return (
    <AuthWrapper>
      <ProjectManagement />
    </AuthWrapper>
  );
}

export default App;

