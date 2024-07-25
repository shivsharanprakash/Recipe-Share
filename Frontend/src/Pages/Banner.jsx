import React, { useEffect, useState } from 'react';
import Cusine from '../components/Cusine'
const Banner = () => {
    const [cusine, setCusine] = useState([]);
    useEffect(() => {
        const getCusine = async () => {
            try {
                const res = await fetch("http://localhost:3000/cusine");
                const data = await res.json();
                setCusine(data); 
            } catch (error) {
                console.log(error); s
            }
        }
        getCusine(); 
    }, []);

    return (
        <div className="container">
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 space-y-2">
            {cusine && cusine.map((item) => (
                <Cusine key={item._id} item={item} /> 
            ))}
        </div>
        </div>
    );
}

export default Banner;
