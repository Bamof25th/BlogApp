import { Button, Select, Spinner, TextInput } from "flowbite-react";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSideBarData] = useState({
    searchTerm: "",
    order: "desc",
    catagory: "uncatagorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("order");
    const catagoryFromUrl = urlParams.get("catagory");

    if (searchTermFromUrl || sortFromUrl || catagoryFromUrl) {
      setSideBarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        order: sortFromUrl,
        catagory: catagoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);
  // Handles the event of clicking on
  //   console.log(sidebarData);
  const handelChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "order") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sidebarData, order: order });
    }
    if (e.target.id === "catagory") {
      const catagory = e.target.value || "uncategorized";
      setSideBarData({ ...sidebarData, catagory });
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.order);
    urlParams.set("catagory", sidebarData.catagory);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handelShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setSideBarData(...posts, ...data.posts);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7 border border-b md:border-r md:min-h-screen border-gray-400">
        <form className="flex flex-col gap-8" onSubmit={handelSubmit}>
          <div className="flex items-center gap-2 ">
            <label className=" whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handelChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className=" whitespace-nowrap font-semibold">Sort:</label>
            <Select
              onChange={handelChange}
              value={sidebarData.sort}
              className=""
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className=" whitespace-nowrap font-semibold">
              Category:
            </label>
            <Select
              onChange={handelChange}
              value={sidebarData.category}
              className=""
              id="catagory"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">ReactJs</option>
              <option value="javascript">Javascript</option>
              <option value="nextjs">NextJs</option>
              <option value="football">Football</option>
              <option value="anime">Anime</option>
              <option value="tech">Tech</option>
              <option value="others">Others</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full  ">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 m-5">
          Post Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No Posts Found!</p>
          )}
          {loading && (
            <div className="flex justify-center items-center min-h-screen">
              <Spinner size="xl" />
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard post={post} key={post._id} />)}
          {showMore && (
            <button
              onClick={handelShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
