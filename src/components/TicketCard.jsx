import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import "/src/pages/Dashboard.css";

export default function TicketCard({ ticket, onEdit, onDelete }) {
  const statusColors = {
    open: "#4CAF50",
    in_progress: "#FFC107",
    closed: "#9E9E9E",
  };

  return (
    <div
      className="ticket-card"
      style={{ borderLeft: `5px solid ${statusColors[ticket.status]}` }}
    >
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <span
        className="status"
        style={{ color: statusColors[ticket.status] }}
      >
        {ticket.status.replace("_", " ")}
      </span>

      <div className="ticket-actions">
        <button
          aria-label={`Edit ticket ${ticket.title}`}
          onClick={onEdit}
          className="edit-btn"
        >
          <Edit3 size={18} />
        </button>
        <button
          aria-label={`Delete ticket ${ticket.title}`}
          onClick={onDelete}
          className="delete-btn"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
