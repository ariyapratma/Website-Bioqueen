// resources/js/Pages/EditHeaderHome.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const EditHeaderHome = ({ headerHome }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: headerHome.title,
    description: headerHome.description
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/header-home/${headerHome.id}`);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Edit Header Home</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {processing ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditHeaderHome;
