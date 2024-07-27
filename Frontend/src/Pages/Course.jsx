import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';

const Course = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await fetch("http://localhost:3000/card");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCards();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto mt-20 mb-20">
          <div className="mt-12 grid grid-cols-1   md:grid-cols-3 gap-8 space-y-2">
            {cards && cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onRatingUpdate={() => {}}
                isFavorite={false} 
                onFavoriteUpdate={() => {}}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Course;
