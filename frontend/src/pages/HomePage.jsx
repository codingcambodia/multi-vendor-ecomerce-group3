import React from 'react'
import Header from "../components/Layout/Header";

import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Footer from "../components/Layout/Footer";
import HeroSection from '../components/myComponents/HeroSection';

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      {/* <Hero /> */}
      <HeroSection />
      <Categories />
      <BestDeals />
      {/* <Events /> */}
      <FeaturedProduct />
      {/* <Sponsored /> */}
      <Footer />
    </div>
  )
}

export default HomePage