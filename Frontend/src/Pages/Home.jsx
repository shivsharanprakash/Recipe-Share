import React from 'react'
import Navbar from '../components/Navbar'
import Carsoul from '../components/Carsoul'
import Footer from '../components/Footer'
import Banner from  '../Pages/Banner'


const Home = () => {
  return (
    <>
    <div>
    <div className='container-fluid'>
        <Navbar/>
    </div>
    <div className='container-fluid mt-16 mb-24'>
        <Carsoul/>
    </div>
    <div className='container  mx-auto'>
        <Banner/>
    </div>
    <div className='container-fluid mt-12'>
       <Footer/> 
    </div>
      
    </div>
    </>
  )
}

export default Home
