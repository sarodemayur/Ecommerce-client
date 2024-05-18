import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/Authcontext';

const Hero = () => {
  //const auth = JSON.parse(localStorage.getItem("loggedin"))
  const navigate = useNavigate()
  //const username = JSON.parse(localStorage.getItem("value"))

  const handleNavigate = () => {
     navigate('/productspage')
  }

  const {user, isLoggedIn} = useAuth();

  return (
   <section className='bg-pink-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
     <div className="py-16">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">  
          <div className="md:5/12 lg:w-5/12">
          <Carousel autoPlay infiniteLoop showThumbs={false}>
                <div>
                  <img src='https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg' alt='' />   
                </div>
                <div>
                  <img src='https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg' alt='' />
                </div>
                <div>
                  <img src='https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' alt='' />
                </div>
              </Carousel>
          </div>
          <div className="md:7/12 lg:w-6/12">
            {!isLoggedIn ? (<h2 className='text-2xl text-gray-900 font-bold md:text-4xl'><i>Welcome to the store</i></h2>) : (
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              <i>Welcome {user.username} </i>
            </h2> )}
            <p className="mt-6 text-gray-600">
             You are at the best place for online shopping here you will get Quality Products 
             Trending products in Market at Reasonable price.  
            </p>
            <p className="mt-4 text-gray-600">
              Yow will get Fastest delivery of your product on our platform. seven days return policy
              Best Products. 
            </p>
            <div onClick={handleNavigate} className='text-[25px] cursor-pointer font-bold  text-primary mt-4 underline'>Explore Products</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
