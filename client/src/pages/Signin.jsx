// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInFaliure,
  signInStart,
} from "../app/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Signin = () => {
  // *useNavigate
  const navigate = useNavigate();

  //  *useStates
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  //* useDispatch (redux)
  const dispatch = useDispatch();

  //* useSelector (redux)
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  // *Functions
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFaliure("Please fill all fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let data = await res.json();
      if (data.success === false) {
        return dispatch(signInFaliure(data.message));
      }
      dispatch(signInSuccess(data));
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
     return dispatch(signInFaliure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link
            to="/"
            className=" whitespace-nowrap font-bold dark:text-white text-4xl"
          >
            <span className="text-emerald-800 px-2 py-1 bg-gradient-to-r from-orange-300 via-red-300 to-pink-400 rounded-lg ">
              {"Aniket's"}
            </span>
            Blog
          </Link>
          <p className=" text-sm mt-5  ">
            This is a demo project . You can Sign in with your email and
            password.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <div className="">
              <Label value="Your Email" className="text-white" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handelChange}
              />
            </div>
            <div className="">
              <Label value="Your Password" className="text-white" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handelChange}
              />
            </div>
            <Button
              gradientDuoTone="redToYellow"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account ?</span>
            <Link to="/signup" className="text-blue-500  hover:underline">
              Sign Up
            </Link>
            <div className="">
              {errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
