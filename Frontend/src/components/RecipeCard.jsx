import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
    const [rating, setRating] = useState(recipe.rating || 0);
    const handleRating = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="container">
            <div className="card bg-base-100 w-80 shadow-xl">
                <figure>
                    {recipe.image && (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                    )}
                </figure>
                <div className="card-body p-4">
                    <h2 className="card-title text-xl font-semibold mb-2">{recipe.title}</h2>
                    <div className="flex items-center my-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < rating ? 'text-yellow-500 text-sm cursor-pointer' : 'text-gray-300 text-sm cursor-pointer'}
                                onClick={() => handleRating(i + 1)}
                            />
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm mb-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p className="text-gray-400 text-sm"><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p className="text-gray-400 text-md"><strong>name:</strong> {recipe.name}</p>

                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
