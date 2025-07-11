import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, Lock, LogIn } from 'lucide-react';
import { LoginDto } from '../types/auth';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onSwitchToRegister,
}) => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await login(formData);

      if (response.success) {
        setMessage({ type: 'success', text: response.message });
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro interno. Tente novamente!' });
    }
  };

  const handleInputChange = (field: keyof LoginDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md bg-black border-red-500/30 shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <LogIn className="w-6 h-6 text-red-500" />
          Login de Herói
        </CardTitle>
        <p className="text-gray-400 text-sm">Entre com suas credenciais</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <Alert
              className={`${
                message.type === 'error'
                  ? 'border-red-500 bg-red-900/20'
                  : 'border-green-500 bg-green-900/20'
              }`}
            >
              <AlertDescription
                className={message.type === 'error' ? 'text-red-200' : 'text-green-200'}
              >
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="deadpool@gmail.com"
              required
              className="bg-black border-red-500/30 text-white placeholder-gray-500 focus:border-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="••••••"
              required
              className="bg-black border-red-500/30 text-white placeholder-gray-500 focus:border-red-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? (
              'Entrando...'
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </>
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Registre-se aqui
              </button>
            </p>
          </div>

        </form>
      </CardContent>
    </Card>
  );
};

