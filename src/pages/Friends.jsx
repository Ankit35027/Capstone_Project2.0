import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Send, Trash2 } from 'lucide-react';

export const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const savedFriends = JSON.parse(localStorage.getItem('workoutFriends') || '[]');
    setFriends(savedFriends);
  }, []);

  const getRandomAvatar = () => {
    const avatars = [
      'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const addFriend = () => {
    if (!newFriendName.trim()) return;

    const newFriend = {
      id: Date.now().toString(),
      name: newFriendName,
      avatar: getRandomAvatar(),
      addedDate: new Date().toISOString()
    };

    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem('workoutFriends', JSON.stringify(updatedFriends));
    setNewFriendName('');
    setShowAddForm(false);
  };

  const removeFriend = (friendId) => {
    const updatedFriends = friends.filter(friend => friend.id !== friendId);
    setFriends(updatedFriends);
    localStorage.setItem('workoutFriends', JSON.stringify(updatedFriends));
  };

  const sendWorkoutInvite = (friendName) => {
    alert(`Workout invitation sent to ${friendName}! 🏋️‍♀️`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Users className="h-8 w-8 mr-3 text-blue-600" />
          My Workout Friends
        </h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Friend
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Friend</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              placeholder="Enter friend's name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addFriend()}
            />
            <button
              onClick={addFriend}
              disabled={!newFriendName.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {friends.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No friends added yet</p>
          <p className="text-gray-400">Start building your fitness community by adding buddies!</p>
        </div>
      ) : (
       
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div key={friend.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200" 
            >
              <div className="flex items-center mb-4">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{friend.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Added {new Date(friend.addedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => sendWorkoutInvite(friend.name)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Invite to Workout
                </button>
                <button
                  onClick={() => removeFriend(friend.id)}
                  className="px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4"  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};