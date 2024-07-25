import React from 'react';

const Author = ({ auth }) => {
  return (
    <div className="bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto p-5 bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center md:justify-start">
            <img
              src={auth.image}
              alt={auth.name}
              className="rounded-full h-48 w-48 md:h-60 md:w-60 object-cover border-2"
            />
          </div>
          <div className="md:w-2/3 mt-5 md:mt-0 md:pl-10">
            <h1 className="text-3xl font-bold text-orange-400">{auth.name}</h1>
            <p className="mt-3 text-lg text-gray-200">{auth.description}</p>
            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-green-200">Follow Me:</h2>
              <div className="flex space-x-5 mt-2">
                <a
                  href={auth.twitter}
                  className="text-green-200 hover:text-green-300"
                >
                  Twitter
                </a>
                <a
                  href={auth.linkedin}
                  className="text-green-200 hover:text-green-300"
                >
                  LinkedIn
                </a>
                <a
                  href={auth.website}
                  className="text-green-200 hover:text-green-300"
                >
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
