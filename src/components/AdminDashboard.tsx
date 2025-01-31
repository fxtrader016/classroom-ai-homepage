import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, ListRestart } from 'lucide-react';
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
  const [tempOrders, setTempOrders] = useState<{ [key: string]: number }>({});

  // Initialize tempOrders with current display_order values
  useEffect(() => {
    const initialOrders = websites.reduce((acc, website, index) => {
      acc[website.id] = website.display_order || index + 1;
      return acc;
    }, {} as { [key: string]: number });
    setTempOrders(initialOrders);
  }, [websites]);

  const handleSave = async (website: Partial<Website>) => {
    if (isEditing && isEditing !== 'new') {
      await supabase
        .from('websites')
        .update(website)
        .eq('id', isEditing);
    } else {
      const maxOrder = Math.max(...websites.map(w => w.display_order || 0), 0);
      await supabase
        .from('websites')
        .insert([{ ...website, display_order: maxOrder + 1 }]);
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

  const handleOrderChange = (websiteId: string, newOrder: number) => {
    setTempOrders(prev => ({
      ...prev,
      [websiteId]: newOrder
    }));
  };

  const handleReorder = async () => {
    const updates = websites.map(website => 
      supabase
        .from('websites')
        .update({ display_order: tempOrders[website.id] })
        .eq('id', website.id)
    );

    await Promise.all(updates);
    onWebsitesChange();
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Website Management</h2>
          <button
            onClick={handleReorder}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <ListRestart className="h-4 w-4" />
            <span>Reorder List</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Order</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">URL</th>
                <th className="px-4 py-2 text-left">Favicon URL</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                .map((website) => (
                <tr key={website.id} className="border-t">
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      value={tempOrders[website.id] || website.display_order || 0}
                      onChange={(e) => handleOrderChange(website.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </td>
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