import React, { useEffect, useState } from 'react';
import { WebsiteGrid } from './components/WebsiteGrid';
import { AdminDashboard } from './components/AdminDashboard';
import { Header } from './components/Header';
import { supabase } from './lib/supabase';
import { Website } from './types';
import { fallbackWebsites } from './utils/fallbackData';

export default function App() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fetchWebsites = async () => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('category');
      
      if (error) {
        console.error('Error fetching websites:', error);
        setWebsites(fallbackWebsites as Website[]);
        return;
      }

      if (data) setWebsites(data);
    } catch (err) {
      console.error('Failed to fetch websites:', err);
      setWebsites(fallbackWebsites as Website[]);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isAdmin={isAdmin}
        password={password}
        error={error}
        onPasswordChange={setPassword}
        onAdminLogin={handleAdminLogin}
        onLogout={handleLogout}
      />

      <main className="max-w-[90rem] mx-auto">
        {isAdmin ? (
          <AdminDashboard websites={websites} onWebsitesChange={fetchWebsites} />
        ) : (
          <WebsiteGrid websites={websites} />
        )}
      </main>
    </div>
  );
}