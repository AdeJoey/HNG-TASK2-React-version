import React, { useState } from "react";

export default function TicketForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;
    onAdd({
      title,
      description,
      status,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("open");
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ticket title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Ticket description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <button type="submit">Add Ticket</button>
    </form>
  );
}
