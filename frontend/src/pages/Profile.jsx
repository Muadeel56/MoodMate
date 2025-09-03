import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts';
import { themeClasses } from '../styles/theme';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    avatar_url: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        avatar_url: user.avatar_url || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Update profile in backend
      const response = await fetch('http://localhost:8000/api/v1/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('moodmate_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateProfile(updatedUser);
        setMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        const error = await response.json();
        setMessage(error.detail || 'Failed to update profile');
      }
    } catch (err) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      avatar_url: user?.avatar_url || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="py-16">
          <div className="text-center">
            <p className={`text-lg ${themeClasses.text.secondary}`}>
              Please log in to view your profile.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <img 
              src={user.avatar_url} 
              alt={user.name} 
              className="w-24 h-24 rounded-full border-4 border-purple-200 mx-auto mb-4"
            />
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary} ${themeClasses.transitions.theme}`}>
              Profile Settings
            </h1>
            <p className={`text-lg ${themeClasses.text.secondary} ${themeClasses.transitions.theme}`}>
              Manage your account information
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                    Name
                  </label>
                  <p className={`text-lg ${themeClasses.text.primary}`}>{user.name}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                    Email
                  </label>
                  <p className={`text-lg ${themeClasses.text.primary}`}>{user.email}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                    Member Since
                  </label>
                  <p className={`text-lg ${themeClasses.text.primary}`}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`w-full py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="avatar_url" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    id="avatar_url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme`}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={`flex-1 py-2 px-4 border border-gray-300 rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-theme`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors`}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile; 