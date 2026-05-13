import AdminDashboard from "../components/admin/AdminDashboard";

export default function AdminPage() {
    return (
        <div>
            <h1>Admin Portal </h1>

            <AdminDashboard />
        </div>
    );
}
import React from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';

// This is the main admin page component that renders the admin dashboard
const AdminPage = () => {
  // Return the AdminDashboard component to display the admin interface
  return <AdminDashboard />;
};

export default AdminPage;
