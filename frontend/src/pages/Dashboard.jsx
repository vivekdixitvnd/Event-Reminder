import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import { eventsAPI } from "../utils/api";
import "./dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Load events on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await eventsAPI.getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading events from backend:", error);
      setError(error.message || "Error loading events");
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const payload = {
        title: form.title,
        date: form.date,
        description: form.description || "",
      };
      const created = await eventsAPI.createEvent(payload);
      setEvents([...events, created]);
      setForm({ title: "", date: "", description: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding event to backend:", error);
      setError(error.message || "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setError("");
      await eventsAPI.deleteEvent(id);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error("Error deleting event from backend:", error);
      setError(error.message || "Failed to delete event");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p className="muted">Welcome, {user?.name || user?.email || 'User'}</p>
        </div>
        <div className="header-actions">
          <div className="stats-pill">Total events: {events.length}</div>
          <button
            className="add-btn"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            aria-controls="create-event-card"
          >
            {showForm ? 'Close' : '+ Create Event'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={addEvent} className="event-form" id="create-event-card">
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
          <button type="submit" className="secondary-btn">Add Event</button>
        </form>
      )}

      <div>
        
        <div className="event-grid">
          {events.length > 0 ? (
            events
              .slice()
              .reverse()
              .map((event) => (
                <EventCard 
                  key={event._id} 
                  event={event} 
                  onDelete={deleteEvent}
                />
              ))
          ) : (
            <p className="muted">No events yet. Create your first event!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
