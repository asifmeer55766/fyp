import React, { useState } from "react";
import { IoCube, IoRocket, IoLaptopOutline } from "react-icons/io5";
import "./AdminSettings.scss";

export default function Settings() {
  const [settings, setSettings] = useState({
    appName: "AI-Assisted System Design Generator",
    theme: "light",
    aiApiKey: "****************",
    enableBackup: true,
    enableNotifications: true,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("✅ Settings saved (dummy). Connect to backend later!");
    // Later: Send settings to backend API
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">⚙️ General Settings</h2>

      <div className="settings-grid">
        {/* App Name */}
        <div className="settings-card">
          <div className="settings-icon">
            <IoLaptopOutline size={32} color="#1565c0" />
          </div>
          <div className="settings-info">
            <label>Application Name</label>
            <input
              type="text"
              name="appName"
              value={settings.appName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Theme */}
        <div className="settings-card">
          <div className="settings-icon">
            <IoCube size={32} color="#2196f3" />
          </div>
          <div className="settings-info">
            <label>Theme</label>
            <select name="theme" value={settings.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* API Key */}
        <div className="settings-card">
          <div className="settings-icon">
            <IoRocket size={32} color="#4cafef" />
          </div>
          <div className="settings-info">
            <label>AI API Key</label>
            <input
              type="password"
              name="aiApiKey"
              value={settings.aiApiKey}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Enable Backup */}
        <div className="settings-card toggle">
          <label>
            <input
              type="checkbox"
              name="enableBackup"
              checked={settings.enableBackup}
              onChange={handleChange}
            />
            Enable Automatic Backup
          </label>
        </div>

        {/* Enable Notifications */}
        <div className="settings-card toggle">
          <label>
            <input
              type="checkbox"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onChange={handleChange}
            />
            Enable Email Notifications
          </label>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
}
