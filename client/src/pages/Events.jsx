import React, { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch events
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
    // Refresh events every 30 seconds
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter events
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.event_type === filter);

  // Sort by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.event_date) - new Date(b.event_date);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Events</h1>
          <p className="text-xl text-gray-600">Connect with fellow alumni and grow your network</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('networking')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'networking'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            Networking
          </button>
          <button
            onClick={() => setFilter('seminar')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'seminar'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            Seminars
          </button>
          <button
            onClick={() => setFilter('workshop')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'workshop'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            Workshops
          </button>
          <button
            onClick={() => setFilter('social')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'social'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            Social
          </button>
          <button
            onClick={() => setFilter('career-fair')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'career-fair'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            Career Fairs
          </button>
        </div>

        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">No Events Found</h2>
            <p className="text-gray-600">Check back soon for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden">
                {/* Event Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">{event.title}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2">
                      {event.event_type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description || 'No description provided'}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    {/* Date & Time */}
                    <div className="flex items-center text-gray-700">
                      <span className="text-lg mr-3">📅</span>
                      <div>
                        <p className="font-medium">
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-gray-600">
                          {new Date(event.event_date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-700">
                      <span className="text-lg mr-3">📍</span>
                      <p className="font-medium">{event.location}</p>
                    </div>

                    {/* Attendees */}
                    {event.max_attendees && (
                      <div className="flex items-center text-gray-700">
                        <span className="text-lg mr-3">👥</span>
                        <p className="font-medium">Max {event.max_attendees} attendees</p>
                      </div>
                    )}

                    {/* Creator */}
                    <div className="flex items-center text-gray-600 pt-2">
                      <span className="text-lg mr-3">👤</span>
                      <p className="text-xs">
                        by {event.creator_first_name} {event.creator_last_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
                    Interested
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
