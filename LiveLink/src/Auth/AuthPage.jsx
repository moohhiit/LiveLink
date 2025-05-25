
import React, { useState } from 'react';

const AuthPage = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    if (email && password) {
      onAuthSuccess(email); 
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
          <span
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-blue-500 cursor-pointer font-medium"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
