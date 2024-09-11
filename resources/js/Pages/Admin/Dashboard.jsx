import React from 'react';
import { Link } from '@inertiajs/react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <ul>
        <li>
          <Link href="/header-home" className="text-blue-500">Manage Header Home</Link>
        </li>
        <li>
          <Link href="/hero-flyer" className="text-blue-500">Manage Hero Flyer</Link>
        </li>
        <li>
          <Link href="/hero-company" className="text-blue-500">Manage Hero Company</Link>
        </li>
        {/* Tambahkan link untuk hero sections lainnya */}
      </ul>
    </div>
  );
};

export default Dashboard;
