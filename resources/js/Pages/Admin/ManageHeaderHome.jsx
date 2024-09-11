import React from 'react';
import { Link } from '@inertiajs/react';

const ManageHeaderHome = ({ headerHomes }) => {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Manage Header Home</h1>
      
      <div className="mb-6">
        <Link
          href="/header-home/create"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Header
        </Link>
      </div>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp Link</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {headerHomes.map((home) => (
            <tr key={home.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{home.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{home.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{home.image_url}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{home.whatsapp_link}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/header-home/${home.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageHeaderHome;
