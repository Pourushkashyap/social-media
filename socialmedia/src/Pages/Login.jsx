import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      const res = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include', // important for cookies
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      if(res.ok){
         Navigate('/front', { replace: true });
      }
      alert(data.message);
    } else {
      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username, // assuming you login with email
          password: formData.password,
        }),
        credentials: 'include', // important for cookies
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      if(res.ok) Navigate('/front', { replace: true });
      alert(data.message);
    }

    setFormData({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  } catch (err) {
    alert(err.message || 'Something went wrong!');
  }
};

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  };

  // Logout functionality (simulated)
  const handleLogout = () => {
    console.log('Logged out');
    // Add logout logic here (e.g., clear session, redirect)
    setFormData({ name: '', username: '', email: '', password: '', confirmPassword: '' });
    setIsSignUp(false); // Reset to sign-in mode
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required={isSignUp}
                />
             
                
              </div>
              <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
            </>
          )}
          {/* {
            isSignUp && (
               <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div> 
            )
          } */}
          {/* <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required={isSignUp}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
       
        <p className="mt-4 text-center text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={toggleForm}
            className="ml-1 text-blue-400 hover:text-blue-300 font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;