import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    graduation_year: '',
    current_company: '',
    current_position: '',
    bio: '',
    phone: '',
    location: ''
  });

  // Fetch alumni data
  const fetchAlumni = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/alumni');
      const data = await response.json();
      if (data.success) {
        setAlumni(data.data);
      } else {
        setError('Failed to fetch alumni');
      }
    } catch (err) {
      setError('Error fetching alumni: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = editingAlumni
        ? `http://localhost:5000/api/alumni/${editingAlumni.id}`
        : 'http://localhost:5000/api/alumni';

      const method = editingAlumni ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        fetchAlumni(); // Refresh the list
        setShowAddForm(false);
        setEditingAlumni(null);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          graduation_year: '',
          current_company: '',
          current_position: '',
          bio: '',
          phone: '',
          location: ''
        });
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  // Handle edit
  const handleEdit = (alumniMember) => {
    setEditingAlumni(alumniMember);
    setFormData({
      first_name: alumniMember.first_name || '',
      last_name: alumniMember.last_name || '',
      email: alumniMember.email || '',
      graduation_year: alumniMember.graduation_year || '',
      current_company: alumniMember.current_company || '',
      current_position: alumniMember.current_position || '',
      bio: alumniMember.bio || '',
      phone: alumniMember.phone || '',
      location: alumniMember.location || ''
    });
    setShowAddForm(true);
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this alumni?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/alumni/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchAlumni(); // Refresh the list
      } else {
        setError('Failed to delete alumni');
      }
    } catch (err) {
      setError('Error deleting alumni: ' + err.message);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAlumni(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      graduation_year: '',
      current_company: '',
      current_position: '',
      bio: '',
      phone: '',
      location: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-['Inter']">
      {/* Header */}
      <nav className="bg-[#2F5DAA] p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">Alumni Connect - Admin Dashboard</h1>
          <Link to="/" className="text-white hover:text-gray-200">Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2C2C2C]">Alumni Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#3B6FD8] hover:bg-[#2F5DAA] text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add New Alumni'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingAlumni ? 'Edit Alumni' : 'Add New Alumni'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Graduation Year</label>
                <input
                  type="number"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Current Company</label>
                <input
                  type="text"
                  name="current_company"
                  value={formData.current_company}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Current Position</label>
                <input
                  type="text"
                  name="current_position"
                  value={formData.current_position}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#3B6FD8]"
                />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-[#3B6FD8] hover:bg-[#2F5DAA] text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  {editingAlumni ? 'Update Alumni' : 'Add Alumni'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Alumni List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-[#2C2C2C]">Alumni List ({alumni.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graduation Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alumni.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.first_name} {member.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.graduation_year || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.current_company || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {alumni.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No alumni found. Click "Add New Alumni" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;