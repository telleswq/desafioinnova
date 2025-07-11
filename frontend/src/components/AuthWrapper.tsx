import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';
import { AuthContext, useAuthProvider } from '../hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const authValue = useAuthProvider();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento 
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleLoginSuccess = () => {
  };

  const handleRegisterSuccess = () => {
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      {!authValue.isAuthenticated ? (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {authMode === 'login' ? (
              <LoginForm
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={() => setAuthMode('register')}
              />
            ) : (
              <RegisterForm
                onRegisterSuccess={handleRegisterSuccess}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black">
          {/* Header info user */}
          <div className="bg-black border-b border-red-500/20 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-white font-medium">{authValue.user?.alias}</p>
                  <p className="text-gray-400 text-sm">{authValue.user?.name}</p>
                </div>
              </div>

              <Button
                onClick={authValue.logout}
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          {children}
        </div>
      )}
    </AuthContext.Provider>
  );
};

