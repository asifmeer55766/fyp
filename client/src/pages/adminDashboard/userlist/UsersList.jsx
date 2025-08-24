import React, { useState } from "react";
import { IoPerson, IoPeopleSharp } from "react-icons/io5";
import "./UsersList.scss";

export default function UsersList() {
  // Dummy users (replace with DB/API later)
  const [users] = useState([
    {
      _id: "u1",
      name: "Ali Khan",
      email: "ali.khan@example.com",
      role: "admin",
      createdAt: "2025-07-01",
    },
    {
      _id: "u2",
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      createdAt: "2025-07-10",
    },
    {
      _id: "u3",
      name: "Bilal Hussain",
      email: "bilal.hussain@example.com",
      createdAt: "2025-07-10",
    },
  ]);

  return (
    <div className="users-container">
      <h2 className="users-title">👥 Registered Users</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-icon">
              {user.role === "admin" ? (
                <IoPeopleSharp size={40} color="#1565c0" />
              ) : (
                <IoPerson size={40} color="#2196f3" />
              )}
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span className={`role ${user.role}`}>{user.role}</span>
              <small>
                Registered: {new Date(user.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
