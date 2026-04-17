import React, { useState, useEffect } from 'react';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    event_type: 'networking',
    max_attendees: ''
  });

  // Fetch events data
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      } else {
        setError('Failed to fetch events');
      }
    } catch (err) {
      setError('Error fetching events: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
      const url = editingEvent
        ? `http://localhost:5000/api/events/${editingEvent.id}`
        : 'http://localhost:5000/api/events';

      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        fetchEvents(); // Refresh the list
        setShowAddForm(false);
        setEditingEvent(null);
        setFormData({
          title: '',
          description: '',
          event_date: '',
          location: '',
          event_type: 'networking',
          max_attendees: ''
        });
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  // Handle edit
  const handleEdit = (event) => {
    setEditingEvent(event);
    const eventDate = event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '';
    setFormData({
      title: event.title || '',
      description: event.description || '',
      event_date: eventDate,
      location: event.location || '',
      event_type: event.event_type || 'networking',
      max_attendees: event.max_attendees || ''
    });
    setShowAddForm(true);
  };

  // Handle delete
  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: 'DELETE',
        });
        const data = await response.json();

        if (data.success) {
          fetchEvents(); // Refresh the list
        } else {
          setError(data.message || 'Failed to delete event');
        }
      } catch (err) {
        setError('Error deleting event: ' + err.message);
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      event_type: 'networking',
      max_attendees: ''
    });
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading events...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          {showAddForm ? 'Cancel' : 'Add New Event'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Annual Alumni Meetup"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time <span className="text-red-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., University Hall"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="networking">Networking</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                  <option value="social">Social</option>
                  <option value="career-fair">Career Fair</option>
                </select>
              </div>

              {/* Max Attendees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="max_attendees"
                  value={formData.max_attendees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event description..."
              />
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Attendees</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-600">
                    No events found. Create one to get started!
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50 transition-all">
                    <td className="px-6 py-3 text-sm text-gray-900 font-medium">{event.title}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(event.event_date).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{event.location}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {event.event_type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {event.max_attendees ? `${event.max_attendees}` : 'Unlimited'}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
