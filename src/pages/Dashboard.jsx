import React, { useState } from "react";
import TicketCard from "../components/TicketCard";
import TicketForm from "../components/TicketForm";
import { motion, AnimatePresence } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [feedback, setFeedback] = useState("");

  const addTicket = (newTicket) => {
    const id = Date.now();
    setTickets([...tickets, { id, ...newTicket }]);
    showFeedback("✅ Ticket added successfully!");
  };

  const deleteTicket = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
    showFeedback("🗑️ Ticket deleted.");
  };

  const startEdit = (ticket) => setEditingTicket(ticket);

  const updateTicket = (updated) => {
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTicket(null);
    showFeedback("✏️ Ticket updated successfully!");
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  return (
    <motion.section
      className="dashboard-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative Circles */}
      <div className="circle circle-a"></div>
      <div className="circle circle-b"></div>

      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p>Manage and track your tickets efficiently</p>
        {feedback && <p className="feedback-text">{feedback}</p>}
      </header>

      {/* Tickets Section */}
      <section className="tickets-section">
        <h2>Manage Tickets</h2>

        <div className="tickets-content">
          {/* Ticket Form (Left Side) */}
          <motion.div
            className="ticket-form-container"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {editingTicket ? (
              <EditTicketForm
                ticket={editingTicket}
                onSave={updateTicket}
                onCancel={() => setEditingTicket(null)}
              />
            ) : (
              <TicketForm onAdd={addTicket} />
            )}
          </motion.div>

          {/* Ticket List (Right Side) */}
          <motion.div
            className="ticket-list"
            layout
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TicketCard
                      ticket={ticket}
                      onEdit={() => startEdit(ticket)}
                      onDelete={() => deleteTicket(ticket.id)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="empty-text"
                >
                  No tickets yet. Add one to get started!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.section>
  );
}

// Inline Edit Form
function EditTicketForm({ ticket, onSave, onCancel }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...ticket, title, description, status });
  };

  return (
    <motion.form
      className="ticket-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={title}
        placeholder="Ticket Title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <div className="edit-actions">
        <button type="submit">Save</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </motion.form>
  );
}
