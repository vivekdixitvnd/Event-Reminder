import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create your account</h2>
          <p className="auth-subtitle">Start organizing events and never miss a reminder</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Full name" 
              autoComplete="name"
              required 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email address" 
              autoComplete="email"
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              autoComplete="new-password"
              required 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Confirm password" 
              autoComplete="new-password"
              required 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <div className="auth-meta">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
