import React from "react";
import HomePage from "@/components/HomePages/HomeHero";
import FoodCategory from "@/components/HomePages/FoodCatagery";
import OurChefs from "@/components/HomePages/OurChefs";
import ChooseFromMenu from "@/components/HomePages/HomeMenu";
import Aboutus from "@/components/HomePages/AboutUs";
<<<<<<< HEAD
import BlogPost from "@/components/HomePages/BlogPosts";
import Datafetch from "@/app/Datafetch";

=======
import TestimonialsSection from "@/components/HomePages/Testimonial";
import BlogPost from "@/components/HomePages/BlogPosts";
import DataFetch from "@/app/DataFetch";
>>>>>>> 3684ca6 (home)

const Home = () => {
  return (
    <div>
      {/* Header component for the top section of the page */}
      <HomePage />

<<<<<<< HEAD
=======
{/* Header component for the top section of the page */}
<DataFetch />
>>>>>>> 3684ca6 (home)
      {/* About component to display about us section */}
      <Aboutus />

      {/* Categories component to display various categories */}
      <FoodCategory />

      {/* Choose from menu component to display menu items */}
      <ChooseFromMenu />

      {/* Our Chefs component to display the chefs */}
      <OurChefs />

<<<<<<< HEAD
     
=======
      {/* Testimonial component to display testimonial section */}
      <TestimonialsSection />
>>>>>>> 3684ca6 (home)

      {/* Blog post component to display blog posts */}
      <BlogPost />
    </div>
  );
};

<<<<<<< HEAD
const Dat = () => {
  return (
    <div>
      <h1>Data will be displayed here</h1>
    </div>
  );
};

export default Datafetch;
=======
export default Home;
>>>>>>> 3684ca6 (home)
