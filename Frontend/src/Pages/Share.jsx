import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../context/AuthProvider';

const Share = () => {
  const [authUser] = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
    name: authUser?.name || '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);


  const fetchRecipes = async () => {
    try {
      const token = authUser?.authToken;
      if (!token) {
        console.error('No token found in auth context');
        setError('Authentication required');
        return;
      }
      const response = await fetch('http://localhost:3000/recipes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes || []);
        setError(null);
      } else {
        console.error('Failed to fetch recipes:', response.statusText);
        setError('Failed to fetch recipes');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('An error occurred while fetching recipes');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = authUser?.authToken;
      if (!token) {
        console.error('No token found in auth context');
        setError('Authentication required');
        return;
      }
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newRecipe = await response.json();
        setFormData({
          title: '',
          ingredients: '',
          instructions: '',
          image: '',
          name: authUser?.name || '',
        });
        fetchRecipes();
      } else {
        console.error('Failed to share recipe:', response.status, response.statusText);
        setError('Failed to share recipe');
      }
    } catch (error) {
      console.error('Error sharing recipe:', error);
      setError('An error occurred while sharing the recipe');
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 dark:text-white">
      <div className="mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 mt-10 text-center font-archivo">Share Your Recipes</h1>
       
        <form onSubmit={handleSubmit} className="mb-32 bg-gray-800 rounded-lg shadow-sm shadow-gray-300 p-6 ">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded py-2 px-3 mb-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500 my-2"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border rounded py-2 px-3 mb-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500 "
          />
          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="border rounded py-2 px-3 mb-2 w-full h-24 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
          <textarea
            name="instructions"
            placeholder="Instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="border rounded py-2 px-3 mb-2 w-full h-24 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded py-2 px-3 mb-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            disabled
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded  focus:outline-none mt-2"
          >
            Share Recipe
          </button>
        </form>
      
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Share;
