import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const HeroFlyer = ({ heroFlyer }) => {
  const { data, setData, post, put, reset } = useForm({
    image_url: heroFlyer ? heroFlyer.image_url : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (heroFlyer) {
      put(`/hero-flyer/${heroFlyer.id}`);
    } else {
      post('/hero-flyer');
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Manage Hero Flyer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={data.image_url}
            onChange={(e) => setData('image_url', e.target.value)}
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4">
          {heroFlyer ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default HeroFlyer;
