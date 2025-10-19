import React from "react";
import "./eventcard.css";

const EventCard = ({ event, onDelete }) => {
  if (!event) {
    return <div className="event-card">Invalid event data</div>;
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getEventStatus = (dateString) => {
    try {
      const eventDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        return 'Past';
      } else if (eventDate.getTime() === today.getTime()) {
        return 'Today';
      } else {
        return 'Upcoming';
      }
    } catch (error) {
      return 'Unknown';
    }
  };

  const status = getEventStatus(event.date);

  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-icon">📅</div>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
        {onDelete && (
          <button 
            className="delete-btn"
            onClick={() => onDelete(event._id)}
            title="Delete event"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="event-content">
        <h3>{event.title || 'Untitled Event'}</h3>
        {event.description && <p className="event-description">{event.description}</p>}
        
        <div className="event-details">
          <div className="event-date">
            <span className="detail-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          {event.time && (
            <div className="event-time">
              <span className="detail-icon">⏰</span>
              <span>{event.time}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
