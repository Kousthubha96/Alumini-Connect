import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events") // backend URL
      .then((res) => res.json())
      .then((data) => {
        // sort events by date
        const sorted = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sorted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h2 className="logo">Alumni Connect</h2>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/alumni">Alumni</a>
          <a href="/jobs">Jobs</a>
          <a href="/events" className="active">Events</a>
          <a href="/messages">Messages</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <h1>Events</h1>

        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <div className="card" key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default Events;