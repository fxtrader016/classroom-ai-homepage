import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Website } from '../types';
import { supabase } from '../lib/supabase';
import { WebsiteForm } from './WebsiteForm';

interface AdminDashboardProps {
  websites: Website[];
  onWebsitesChange: () => void;
}

export function AdminDashboard({ websites, onWebsitesChange }: AdminDashboardProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<Partial<Website> | null>(null);

  const handleSave = async (website: Partial<Website>) => {
    if (isEditing && isEditing !== 'new') {
      await supabase
        .from('websites')
        .update(website)
        .eq('id', isEditing);
    } else {
      await supabase
        .from('websites')
        .insert([website]);
    }
    setIsEditing(null);
    setEditingWebsite(null);
    onWebsitesChange();
  };

  const handleEdit = (website: Website) => {
    setIsEditing(website.id);
    setEditingWebsite(website);
  };

  const handleDelete = async (id: string) => {
    await supabase
      .from('websites')
      .delete()
      .eq('id', id);
    onWebsitesChange();
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Website Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">URL</th>
                <th className="px-4 py-2 text-left">Favicon URL</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website) => (
                <tr key={website.id} className="border-t">
                  <td className="px-4 py-2">{website.title}</td>
                  <td className="px-4 py-2">{website.url}</td>
                  <td className="px-4 py-2">{website.favicon_url || '-'}</td>
                  <td className="px-4 py-2 capitalize">{website.category}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(website)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(website.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => setIsEditing('new')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Website</span>
          </button>
        </div>
      </div>
      {isEditing && (
        <WebsiteForm
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(null);
            setEditingWebsite(null);
          }}
          initialData={editingWebsite || undefined}
        />
      )}
    </div>
  );
}