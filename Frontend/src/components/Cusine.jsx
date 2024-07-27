import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Cuisine = ({ 
  item, 
  onRatingUpdate = () => {}, 
  isFavorite = false, 
  onFavoriteUpdate = () => {} 
}) => {
  const [rating, setRating] = useState(item.rating || 0);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleRating = async (newRating) => {
    setRating(newRating);
    onRatingUpdate(item._id, newRating);
  };

  const handleFavorite = async () => {
    const storedUser = JSON.parse(localStorage.getItem('User'));
    const token = storedUser?.authToken;

    if (!token) {
      alert("To Add Favorite item please Login");
      console.error('No token found in localStorage');
      return;
    }

    if (!item._id) {
      console.error('Item ID is missing');
      return;
    }

    try {
      if (favorite) {
        const response = await fetch(`http://localhost:3000/favorites/${item._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          onFavoriteUpdate({ _id: item._id });
          setFavorite(false);
        } else {
          console.error('Failed to remove from favorites:', data.message);
        }
      } else {
        const response = await fetch(`http://localhost:3000/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(item)
        });
        const data = await response.json();
        if (response.ok) {
          onFavoriteUpdate(data.card);
          setFavorite(true);
        } else {
          console.error('Failed to add to favorites:', data.message);
        }
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className="card bg-base-100 w-80 shadow-xl rounded-lg overflow-hidden max-h-[28rem]">
        <figure>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-archivo text-orange-400">{item.title}</h2>
            <div onClick={handleFavorite} className="cursor-pointer">
              {favorite ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-400 text-lg" />
              )}
            </div>
          </div>
          <div className="flex items-center my-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleRating(i + 1)}
              />
            ))}
          </div>
          <p className="text-gray-300 text-sm mt-2 font-fredoka ">{item.description}</p>
          <div className="mt-2">
            <p className="font-semibold text-gray-200 font-poppins ">{item.author}</p>
          </div>
          <a href={item.link} className="btn btn-primary mt-2 text-xs">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

Cuisine.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    link: PropTypes.string,
    rating: PropTypes.number
  }).isRequired,
  onRatingUpdate: PropTypes.func,
  onFavoriteUpdate: PropTypes.func,
  isFavorite: PropTypes.bool
};

export default Cuisine;
