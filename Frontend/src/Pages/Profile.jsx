import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthProvider';
import RecipeCard from '../components/RecipeCard';

const Profile = () => {
  const [authUser] = useAuth();
  const [userName, setUserName] = useState('User Name');
  const [bio, setBio] = useState('Food enthusiast and home chef. Sharing my favorite recipes and discovering new ones!');
  const [isEditing, setIsEditing] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
    name: authUser?.name || '',
  });
  useEffect(() => {
    fetchUserProfile();
    fetchUserRecipes();
    fetchFavoriteRecipes();
  }, []);

  const fetchUserProfile = async () => {
    const token = authUser?.authToken;
    if (!token) {
      console.error("No token found, authorization denied");
      setError('Authentication required');
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/user/getuserprofile", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        setUserProfile(data);
        setUserName(data.name);
      } else {
        console.error("Failed to fetch user profile:", response.statusText);
        setError('Failed to fetch user profile');
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError('An error occurred while fetching user profile');
    }
  };



  const fetchUserRecipes = async () => {
    const token = authUser?.authToken;
    if (!token) {
      console.error('No token found in auth context');
      setError('Authentication required');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/recipes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserRecipes(data.recipes || []);
        setError(null);
      } else {
        console.error('Failed to fetch user recipes:', response.statusText);
        setError('Failed to fetch user recipes');
      }
    } catch (error) {
      console.error('Error fetching user recipes:', error);
      setError('An error occurred while fetching user recipes');
    }
  };


  const fetchFavoriteRecipes = async () => {
    const token = authUser?.authToken;
    if (!token) {
      console.error('No token found in auth context');
      setError('Authentication required');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFavoriteRecipes(data || []);
        setError(null);
      } else {
        console.error('Failed to fetch favorite recipes');
        setError('Failed to fetch favorite recipes');
      }
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
      setError('An error occurred while fetching favorite recipes');
    }
  };

  const handleRatingUpdate = (updatedRecipe) => {
    if (!updatedRecipe || !updatedRecipe._id) {
      console.error('Invalid recipe data:', updatedRecipe);
      return;
    }
    setUserRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      )
    );
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.map((recipe) =>
        recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      )
    );
  };

  const handleFavoriteUpdate = (updatedFavorite) => {
    if (!updatedFavorite || !updatedFavorite._id) {
      console.error('Invalid favorite data:', updatedFavorite);
      return;
    }
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe._id !== updatedFavorite._id)
    );
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10 text-white">
      <div className="max-w-6xl mx-auto p-5 bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center md:justify-start">
            <img
              src="https://img.freepik.com/premium-photo/neon-icon-women-security-guard-black-background-3d-rendering-illustration_567294-1481.jpg?ga=GA1.1.1129495211.1714569937&semt=ais_user"
              alt="User"
              className="rounded-full h-48 w-48 md:h-60 md:w-60 object-cover border-2"
            />
          </div>
          <div className="md:w-2/3 mt-5 md:mt-6 md:pl-10 ">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-3xl font-bold text-indigo-400 bg-gray-800 border-b-2 border-indigo-400 focus:outline-none "
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-3 text-lg text-gray-300 bg-gray-800 border-b-2 border-indigo-400 focus:outline-none w-full h-32"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-poppins font-bold text-orange-400">{userName}</h1>
                <p className="mt-3 text-lg font-fredoka text-green-200">{bio}</p>
              </div>
            )}
            <div className="mt-5">
              {isEditing ? (
                <button
                  onClick={handleSaveClick}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        <hr className='mt-12' />

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-200 ml-4 font-serif">Your Recipes</h2>
          <div className="flex-wrap gap-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-10 space-y-4 md:space-y-0">
            {userRecipes.length > 0 ? (
              userRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
        <hr className='mt-8' />

        <div className="mt-10">
          <h2 className="text-3xl  font-bold text-gray-200 ml-4 font-serif">Most Favorite Rcipes</h2>
          <div className="flex-wrap gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 space-y-4 md:space-y-0">
            {favoriteRecipes.length > 0 ? (
              favoriteRecipes.map((recipe) => (
                <div key={recipe._id} className="w-full md:w-1/2 lg:w-1/3">
                  <Card
                    card={recipe}
                    onRatingUpdate={handleRatingUpdate}
                    onFavoriteUpdate={handleFavoriteUpdate}
                    isFavorite={true}
                  />
                </div>
              ))
            ) : (
              <p>No favorite recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
