import React, { useState } from 'react';
import Logo from './Logo';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

type AuthMode = 'login' | 'signup';

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields.');
      return;
    }
    if (mode === 'signup' && name.trim() === '') {
      setError('Please enter your name.');
      return;
    }
    // Mock auth logic: any non-empty credentials will work
    setError('');
    onLoginSuccess();
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-sm w-full bg-surface shadow-xl rounded-2xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
            <Logo className="h-12 text-primary-dark mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-text-primary">
              {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
            </h2>
            <p className="text-text-secondary mt-1">
              {mode === 'login' ? 'Sign in to unlock the best food experience.' : 'Get started with your foodie journey.'}
            </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="animate-fade-in">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Full Name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email Address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="sr-only"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary-dark hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-95"
            >
              {mode === 'login' ? 'LOGIN' : 'SIGN UP'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-text-secondary">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={toggleMode} className="font-medium text-primary hover:underline focus:outline-none">
                {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;