// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 p-18 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl ">Welcome to my Blog</h1>
        <p className="text-gray-500 text-sm sm:text-xs">
          Here {"you'll"} find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
      </div>
      <Link to="/search" 
      className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
      > 
        View All Posts
      </Link>
    </div>
  );
};

export default Home;
