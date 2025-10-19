import React, { useState } from "react";
import "./dashboard.css";

const TestDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", description: "" });

  const addEvent = (e) => {
    e.preventDefault();
    console.log("Adding event:", form);
    
    const newEvent = {
      id: Date.now(),
      title: form.title,
      date: form.date,
      description: form.description || "",
    };
    
    setEvents([...events, newEvent]);
    setForm({ title: "", date: "", description: "" });
    setShowForm(false);
    
    console.log("Event added:", newEvent);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h2>Test Dashboard</h2>
      <p>Total Events: {events.length}</p>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        + Create Event
      </button>

      {showForm && (
        <form onSubmit={addEvent} className="event-form">
          <input
            type="text"
            placeholder="Event title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <textarea
            placeholder="Event description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="3"
          />
          <button type="submit">Add Event</button>
        </form>
      )}

      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              margin: '10px',
              color: 'white'
            }}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              {event.description && <p>{event.description}</p>}
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No events yet. Create your first event!</p>
        )}
      </div>
    </div>
  );
};

export default TestDashboard;
