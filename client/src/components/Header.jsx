// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../app/theme/themeSlice";
import { signOutSuccess } from "../app/user/userSlice";

const Header = () => {
  //* UseNavigate
  const navigate = useNavigate();

  //* useSelector to authenticate  user and get search query
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  //* search bar setup
  const [searchTerm, setSearchTerm] = React.useState("");
  console.log(searchTerm);
  const location = useLocation();

  //* useEffect
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParam.get(`searchTerm`);
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location]);

  // * handelSubmit

  const handelSubmit = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(location.search);
    urlParam.set(`searchTerm`, searchTerm);
    const searchQuery = urlParam.toString();
    navigate(`/search?${searchQuery}`);
  };
  //*useLocation  to get the current URL pathname
  const path = useLocation().pathname;

  //* useDispatch for theme
  const dispatch = useDispatch();
  //* handelSignout func
  const handelSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        return dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="border-b-2 text-emerald-800">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="text-emerald-800 px-2 py-1 bg-gradient-to-r from-orange-300 via-red-300 to-pink-400 rounded-lg ">
          {"Aniket's"}
        </span>
        Blog
      </Link>
      <form onSubmit={handelSubmit}>
        <TextInput
          type="text"
          placeholder="Search.."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className=" flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline "
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm"> @{currentUser?.username}</span>
              <span className="block text-sm font-medium truncate">
                @{currentUser?.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handelSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
