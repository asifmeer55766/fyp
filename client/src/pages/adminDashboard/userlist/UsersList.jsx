import React, { useState, useEffect } from "react";
import { IoPerson, IoPeopleSharp } from "react-icons/io5";
import "./UsersList.scss";

export default function UsersList() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to load user", error);
      }
    };

    fetchUser();
  }, []);

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
              <h3>{user.username}</h3>
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
