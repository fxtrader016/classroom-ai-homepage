import React from 'react';
import { Lock, LogOut } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  password: string;
  error: string;
  onPasswordChange: (value: string) => void;
  onAdminLogin: (e: React.FormEvent) => void;
  onLogout: () => void;
}

export function Header({
  isAdmin,
  password,
  error,
  onPasswordChange,
  onAdminLogin,
  onLogout
}: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Tools & Websites</h1>
            <p className="text-gray-600 mt-1">by: Mohamed AIT MOUS</p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="https://lustrous-lily-6afd8b.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              مستكشف المهن
            </a>
            {!isAdmin ? (
              <form onSubmit={onAdminLogin} className="flex space-x-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Admin password"
                  className="px-3 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  <Lock className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </form>
            ) : (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </header>
  );
}