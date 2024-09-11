import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const HeaderHome = ({ headerHome }) => {
  const { data, setData, post, put, reset } = useForm({
    title: headerHome ? headerHome.title : '',
    description: headerHome ? headerHome.description : '',
    button_text: headerHome ? headerHome.button_text : '',
    image_url: headerHome ? headerHome.image_url : '',
    whatsapp_link: headerHome ? headerHome.whatsapp_link : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (headerHome) {
      put(`/header-home/${headerHome.id}`);
    } else {
      post('/header-home');
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Manage Header Home</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            className="border p-2 w-full"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">Button Text</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={data.button_text}
            onChange={(e) => setData('button_text', e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={data.image_url}
            onChange={(e) => setData('image_url', e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">WhatsApp Link</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={data.whatsapp_link}
            onChange={(e) => setData('whatsapp_link', e.target.value)}
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4">
          {headerHome ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default HeaderHome;
